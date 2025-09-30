(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__140a91e5._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.js [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
const ENV_COOKIES = (("TURBOPACK compile-time value", "sid,access_token,refresh_token") || "").split(",").map((s)=>s.trim()).filter(Boolean);
const DEFAULT_COOKIES = [
    "sid",
    "access_token",
    "accessToken",
    "jwt",
    "token",
    "refresh_token"
];
const AUTH_COOKIES = [
    ...new Set([
        ...ENV_COOKIES,
        ...DEFAULT_COOKIES
    ])
];
function hasAnyAuthCookie(req) {
    return AUTH_COOKIES.some((name)=>{
        const v = req.cookies.get(name)?.value;
        return v && String(v).length > 10;
    });
}
function middleware(req) {
    if (hasAnyAuthCookie(req)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    const url = new URL(req.url);
    const to = new URL("/auth/login", req.url);
    to.searchParams.set("redirect", url.pathname + url.search);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(to);
}
const config = {
    matcher: [
        "/admin/:path*",
        "/hr/:path*",
        "/approvals/:path*",
        "/me/:path*",
        "/dashboard/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__140a91e5._.js.map