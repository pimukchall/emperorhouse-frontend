"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { canAccess } from "@/access/check";

export default function Guard({ children, fallback = null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await apiFetch("/api/auth/me"); // { ok, user }
        if (!me?.ok || !me?.user) {
          router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`); // ⬅️ เปลี่ยน path
          return;
        }
        const pass = canAccess(me.user, pathname);
        if (!pass) {
          router.replace("/403");
          return;
        }
        if (mounted) setOk(true);
      } catch {
        router.replace("/auth/login");                                                  // ⬅️ เปลี่ยน path
      } finally {
        if (mounted) setLoaded(true);
      }
    })();
    return () => { mounted = false; };
  }, [pathname, router]);

  if (!loaded) return fallback;
  if (!ok) return null;
  return <>{children}</>;
}
