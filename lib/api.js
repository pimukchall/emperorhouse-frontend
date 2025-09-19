const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";  // ex. http://localhost:4000
const PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "";  // ปล่อยว่างถ้า path backend ไม่มี prefix

function joinUrl(base, prefix, path) {
  const b = (base || "").replace(/\/+$/g, "");
  const p = (prefix || "").replace(/^\/+|\/+$/g, "");
  const u = (path || "").replace(/^\/+/g, "");
  const mid = p ? `/${p}` : "";
  return `${b}${mid}/${u}`;
}

export function apiUrl(path) {
  return joinUrl(BASE, PREFIX, path);
}

/**
 * parseResponse: แยกตอบ JSON หรือ text ตาม content-type
 */
async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json") ? await res.json() : await res.text();
  return data;
}

/**
 * apiFetch(path, init, opts)
 * - แนบ cookie เสมอ (credentials: "include")
 * - แปลง body เป็น JSON อัตโนมัติ (ยกเว้นเป็น FormData)
 * - รองรับแนบ Bearer token อัตโนมัติผ่าน opts.getAccessToken()
 * - ถ้าเจอ 401 แล้วมี opts.onUnauthorized() → พยายาม refresh แล้ว retry 1 ครั้ง
 */
export async function apiFetch(
  path,
  init = {},
  {
    getAccessToken,     // () => string | null
    onUnauthorized,     // () => Promise<boolean>  (true = refreshed)
    absoluteUrl = false // ถ้า true แปลว่า path เป็น URL เต็ม ไม่ต้องประกอบ apiUrl
  } = {}
) {
  const url = absoluteUrl ? path : apiUrl(path);

  // เตรียม options
  const opts = {
    credentials: "include",
    cache: "no-store",
    ...init,
    headers: new Headers(init.headers || {}),
  };

  // แนบ Bearer token ถ้ามี
  if (typeof getAccessToken === "function") {
    const t = getAccessToken();
    if (t) opts.headers.set("Authorization", `Bearer ${t}`);
  }

  // แปลง body → JSON (ยกเว้นเป็น FormData)
  if (opts.body && typeof opts.body === "object" && !(opts.body instanceof FormData)) {
    opts.headers.set("content-type", "application/json");
    opts.body = JSON.stringify(opts.body);
  }

  // เรียกจริง
  let res = await fetch(url, opts);
  if (res.status === 401 && typeof onUnauthorized === "function") {
    const ok = await onUnauthorized();
    if (ok) {
      // แนบ token ใหม่ แล้วลองใหม่ 1 ครั้ง
      if (typeof getAccessToken === "function") {
        const t2 = getAccessToken();
        if (t2) opts.headers.set("Authorization", `Bearer ${t2}`);
      }
      res = await fetch(url, opts);
    }
  }

  const data = await parseResponse(res);
  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      (typeof data === "string" ? data : "Request failed");
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export { parseResponse };