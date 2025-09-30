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
const ENV_COOKIES = (("TURBOPACK compile-time value", "sid,access_token") || "").split(",").map((s)=>s.trim()).filter(Boolean);
const DEFAULT_COOKIES = [
    "sid",
    "access_token",
    "accessToken",
    "jwt",
    "token",
    "refresh_token"
];
// สุดท้ายใช้ set รวม
const AUTH_COOKIES = [
    ...new Set([
        ...ENV_COOKIES,
        ...DEFAULT_COOKIES
    ])
];
function hasAnyAuthCookie(req) {
    const cookies = req.cookies;
    if (!cookies) return false;
    for (const name of AUTH_COOKIES){
        const v = cookies.get(name)?.value;
        if (v && String(v).length > 10) return true;
    }
    return false;
}
function redirectLogin(req) {
    const url = new URL(req.url);
    const to = new URL("/login", req.url);
    to.searchParams.set("redirect", url.pathname + url.search);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(to);
}
function middleware(req) {
    const { pathname } = new URL(req.url);
    if (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password") || pathname.startsWith("/reset-password") || pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.startsWith("/assets") || /\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map)$/i.test(pathname)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const protectedMatchers = [
        "/admin",
        "/hr",
        "/approvals",
        "/me"
    ];
    const needAuth = protectedMatchers.some((p)=>pathname === p || pathname.startsWith(p + "/"));
    if (!needAuth) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (!hasAnyAuthCookie(req)) {
        if (("TURBOPACK compile-time value", "development") !== "production" && process.env.NEXT_PUBLIC_ALLOW_NOCOOKIE_DEV === "1") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        return redirectLogin(req);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__140a91e5._.js.map