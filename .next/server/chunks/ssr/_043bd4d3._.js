module.exports = [
"[project]/components/ui/background-gradient.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundGradient",
    ()=>BackgroundGradient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
;
;
;
;
const BackgroundGradient = ({ children, className, containerClassName, animate = true })=>{
    const variants = {
        initial: {
            backgroundPosition: "0 50%"
        },
        animate: {
            backgroundPosition: [
                "0, 50%",
                "100% 50%",
                "0 50%"
            ]
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative p-[4px] group", containerClassName),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: animate ? variants : undefined,
                initial: animate ? "initial" : undefined,
                animate: animate ? "animate" : undefined,
                transition: animate ? {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                } : undefined,
                style: {
                    backgroundSize: animate ? "400% 400%" : undefined
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform", " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]")
            }, void 0, false, {
                fileName: "[project]/components/ui/background-gradient.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: animate ? variants : undefined,
                initial: animate ? "initial" : undefined,
                animate: animate ? "animate" : undefined,
                transition: animate ? {
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                } : undefined,
                style: {
                    backgroundSize: animate ? "400% 400%" : undefined
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 rounded-3xl z-[1] will-change-transform", "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]")
            }, void 0, false, {
                fileName: "[project]/components/ui/background-gradient.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative z-10", className),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/background-gradient.jsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/background-gradient.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/modal/NoticeDialog.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NoticeDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal/Modal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const tone = {
    success: {
        ring: "ring-green-200 dark:ring-green-900/40",
        bg: "bg-green-50 dark:bg-green-900/30",
        text: "text-green-800 dark:text-green-100",
        title: "สำเร็จ"
    },
    error: {
        ring: "ring-red-200 dark:ring-red-900/40",
        bg: "bg-red-50 dark:bg-red-900/30",
        text: "text-red-800 dark:text-red-100",
        title: "เกิดข้อผิดพลาด"
    },
    info: {
        ring: "ring-blue-200 dark:ring-blue-900/40",
        bg: "bg-blue-50 dark:bg-blue-900/30",
        text: "text-blue-800 dark:text-blue-100",
        title: "แจ้งเตือน"
    }
};
function normalizeMessage(msg) {
    // 1) ปล่อย ReactNode ผ่านไปได้เลย
    if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(msg)) return msg;
    // 2) string → คืนตรงๆ
    if (typeof msg === "string") return msg;
    // 3) Error instance
    if (msg instanceof Error) return msg.message || "Unexpected error";
    // 4) รูปแบบที่พบบ่อยจาก backend
    const fromCommonShape = msg?.message || msg?.error || msg?.data?.message || msg?.data?.error;
    if (typeof fromCommonShape === "string") return fromCommonShape;
    // 5) fallback: stringify แบบสั้นๆ
    try {
        return JSON.stringify(msg);
    } catch  {
        return "Unknown error";
    }
}
function NoticeDialog({ open, onClose, type = "info", title, message, footerButtons }) {
    const t = tone[type] || tone.info;
    const content = normalizeMessage(message);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        size: "md",
        title: title || t.title,
        footer: footerButtons ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
            onClick: onClose,
            children: "ปิด"
        }, void 0, false, {
            fileName: "[project]/components/modal/NoticeDialog.jsx",
            lineNumber: 71,
            columnNumber: 32
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `rounded-md ${t.bg} ${t.ring} p-3`,
            role: "status",
            "aria-live": "polite",
            children: typeof content === "string" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-sm ${t.text}`,
                children: content
            }, void 0, false, {
                fileName: "[project]/components/modal/NoticeDialog.jsx",
                lineNumber: 76,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `text-sm ${t.text}`,
                children: content
            }, void 0, false, {
                fileName: "[project]/components/modal/NoticeDialog.jsx",
                lineNumber: 78,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/modal/NoticeDialog.jsx",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/modal/NoticeDialog.jsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/domains/auth/components/ChangePasswordDialog.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChangePasswordDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal/Modal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/stateful-button.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$NoticeDialog$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal/NoticeDialog.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ChangePasswordDialog({ open, onClose }) {
    const [currentPassword, setCurrentPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirm, setConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ⬇️ เก็บ error รายฟิลด์
    const [fieldErrors, setFieldErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        currentPassword: "",
        newPassword: "",
        confirm: ""
    });
    // ⬇️ แจ้งรวม
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        type: "info",
        message: ""
    });
    function clearFieldErrors() {
        setFieldErrors({
            currentPassword: "",
            newPassword: "",
            confirm: ""
        });
    }
    // ตรวจฝั่ง client
    function validateLocal() {
        const fe = {
            currentPassword: "",
            newPassword: "",
            confirm: ""
        };
        if (!currentPassword) fe.currentPassword = "กรุณากรอกรหัสผ่านปัจจุบัน";
        if (!newPassword) fe.newPassword = "กรุณากรอกรหัสผ่านใหม่";
        if (newPassword && newPassword.length < 8) fe.newPassword = "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร";
        if (newPassword && confirm && newPassword !== confirm) fe.confirm = "รหัสผ่านใหม่ไม่ตรงกัน";
        setFieldErrors(fe);
        // คืน true ถ้าไม่มี error
        return !Object.values(fe).some(Boolean);
    }
    async function handleSubmit(e) {
        e?.preventDefault();
        clearFieldErrors();
        if (!validateLocal()) {
            setNotice({
                open: true,
                type: "error",
                message: "กรุณาตรวจสอบข้อมูลที่กรอก"
            });
            return;
        }
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/api/auth/change-password", {
                method: "POST",
                body: {
                    currentPassword,
                    newPassword
                }
            });
            // console.log("Body:", { currentPassword, newPassword });
            setNotice({
                open: true,
                type: "success",
                message: "เปลี่ยนรหัสผ่านเรียบร้อย"
            });
        } catch (e) {
            // รองรับ payload จากเซิร์ฟเวอร์ที่มี errors รายฟิลด์
            const msg = e?.data?.message || e?.message || "เปลี่ยนรหัสผ่านไม่สำเร็จ";
            const errors = e?.data?.errors || {};
            setNotice({
                open: true,
                type: "error",
                message: msg
            });
            setFieldErrors((prev)=>({
                    ...prev,
                    currentPassword: errors.currentPassword || prev.currentPassword,
                    newPassword: errors.newPassword || prev.newPassword
                }));
        } finally{
            setBusy(false);
        }
    }
    function handleCloseNotice() {
        // ปิดโมดัลเมื่อสำเร็จ
        if (notice.type === "success") {
            setCurrentPassword("");
            setNewPassword("");
            setConfirm("");
            clearFieldErrors();
            onClose?.();
        }
        setNotice((s)=>({
                ...s,
                open: false
            }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: open,
                onClose: busy ? undefined : onClose,
                title: "เปลี่ยนรหัสผ่าน",
                size: "md",
                footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: onClose,
                            disabled: busy,
                            children: "ยกเลิก"
                        }, void 0, false, {
                            fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            loading: busy,
                            onClick: handleSubmit,
                            children: "บันทึก"
                        }, void 0, false, {
                            fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "cur-pass",
                                    className: "text-sm",
                                    children: "รหัสผ่านปัจจุบัน"
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "cur-pass",
                                    type: "password",
                                    value: currentPassword,
                                    onChange: (e)=>setCurrentPassword(e.target.value),
                                    className: "w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
                                    autoComplete: "current-password",
                                    "aria-invalid": !!fieldErrors.currentPassword
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                fieldErrors.currentPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-600 dark:text-red-400",
                                    children: fieldErrors.currentPassword
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "new-pass",
                                    className: "text-sm",
                                    children: "รหัสผ่านใหม่ (≥ 8)"
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "new-pass",
                                    type: "password",
                                    value: newPassword,
                                    onChange: (e)=>setNewPassword(e.target.value),
                                    className: "w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
                                    minLength: 8,
                                    autoComplete: "new-password",
                                    "aria-invalid": !!fieldErrors.newPassword
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                fieldErrors.newPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-600 dark:text-red-400",
                                    children: fieldErrors.newPassword
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "confirm-pass",
                                    className: "text-sm",
                                    children: "ยืนยันรหัสผ่านใหม่"
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "confirm-pass",
                                    type: "password",
                                    value: confirm,
                                    onChange: (e)=>setConfirm(e.target.value),
                                    className: "w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100",
                                    autoComplete: "new-password",
                                    "aria-invalid": !!fieldErrors.confirm
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                fieldErrors.confirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-600 dark:text-red-400",
                                    children: fieldErrors.confirm
                                }, void 0, false, {
                                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                                    lineNumber: 151,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$NoticeDialog$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: notice.open,
                onClose: handleCloseNotice,
                type: notice.type,
                message: notice.message
            }, void 0, false, {
                fileName: "[project]/domains/auth/components/ChangePasswordDialog.jsx",
                lineNumber: 157,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/SignaturePad.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignaturePad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function SignaturePad({ height = 160, penSize = 2, penColor = "#000000", bgColor = null, onSave }) {
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const drawing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastPt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const [paths, setPaths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]); // เก็บเส้นสำหรับ Undo
    const [currentPath, setCurrentPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // resize ให้พอดีกับความกว้าง container + รองรับ DPR
    function resizeCanvas() {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;
        const dpi = window.devicePixelRatio || 1;
        const cssWidth = wrap.clientWidth;
        const cssHeight = height;
        canvas.width = Math.max(1, Math.floor(cssWidth * dpi));
        canvas.height = Math.max(1, Math.floor(cssHeight * dpi));
        canvas.style.width = cssWidth + "px";
        canvas.style.height = cssHeight + "px";
        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpi, 0, 0, dpi, 0, 0); // scale หนึ่งครั้ง ตาม DPR
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
        ctxRef.current = ctx;
        redrawAll();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        resizeCanvas();
        const onR = ()=>resizeCanvas();
        window.addEventListener("resize", onR);
        return ()=>window.removeEventListener("resize", onR);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        height
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // เปลี่ยนสี/ขนาดปากกาแบบ live
        const ctx = ctxRef.current;
        if (ctx) {
            ctx.strokeStyle = penColor;
            ctx.lineWidth = penSize;
        }
    }, [
        penColor,
        penSize
    ]);
    function getXY(e) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        if (e.touches && e.touches[0]) {
            const t = e.touches[0];
            return {
                x: t.clientX - rect.left,
                y: t.clientY - rect.top
            };
        }
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    function drawLine(from, to) {
        const ctx = ctxRef.current;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }
    function handleDown(e) {
        e.preventDefault();
        drawing.current = true;
        const p = getXY(e);
        lastPt.current = p;
        setCurrentPath([
            {
                x: p.x,
                y: p.y
            }
        ]);
    }
    function handleMove(e) {
        if (!drawing.current) return;
        e.preventDefault();
        const p = getXY(e);
        drawLine(lastPt.current, p);
        lastPt.current = p;
        setCurrentPath((prev)=>[
                ...prev,
                {
                    x: p.x,
                    y: p.y
                }
            ]);
    }
    function handleUp(e) {
        if (!drawing.current) return;
        e.preventDefault();
        drawing.current = false;
        setPaths((prev)=>currentPath.length ? [
                ...prev,
                currentPath
            ] : prev);
        setCurrentPath([]);
    }
    function clearAll() {
        setPaths([]);
        setCurrentPath([]);
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;
        if (bgColor) {
            ctx.save();
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    function undoLast() {
        if (!paths.length) return;
        const copy = paths.slice(0, -1);
        setPaths(copy);
        setCurrentPath([]);
        redrawAll(copy);
    }
    function redrawAll(_paths = paths) {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (!ctx || !canvas) return;
        if (bgColor) {
            ctx.save();
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.save();
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
        for (const path of _paths){
            for(let i = 1; i < path.length; i++){
                const a = path[i - 1];
                const b = path[i];
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }
        ctx.restore();
    }
    async function handleSave() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // สร้าง PNG โปร่งใส (หรือมี bg ตามที่กำหนด)
        canvas.toBlob((blob)=>{
            if (blob && onSave) onSave(blob);
        }, "image/png", 1);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: wrapRef,
                className: "w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: canvasRef,
                    className: "w-full rounded-md border bg-white touch-none select-none",
                    style: {
                        display: "block",
                        height
                    },
                    onMouseDown: handleDown,
                    onMouseMove: handleMove,
                    onMouseUp: handleUp,
                    onMouseLeave: handleUp,
                    onTouchStart: handleDown,
                    onTouchMove: handleMove,
                    onTouchEnd: handleUp
                }, void 0, false, {
                    fileName: "[project]/components/SignaturePad.jsx",
                    lineNumber: 179,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SignaturePad.jsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "px-3 py-1.5 rounded-md border",
                        onClick: clearAll,
                        children: "ล้าง"
                    }, void 0, false, {
                        fileName: "[project]/components/SignaturePad.jsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "px-3 py-1.5 rounded-md border",
                        onClick: undoLast,
                        children: "ย้อนกลับ"
                    }, void 0, false, {
                        fileName: "[project]/components/SignaturePad.jsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    "ขนาดเส้น",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: 1,
                                        max: 6,
                                        defaultValue: penSize,
                                        onChange: (e)=>{
                                            const ctx = ctxRef.current;
                                            if (ctx) ctx.lineWidth = Number(e.target.value) || 2;
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/SignaturePad.jsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SignaturePad.jsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    "สี",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "color",
                                        defaultValue: penColor,
                                        onChange: (e)=>{
                                            const ctx = ctxRef.current;
                                            if (ctx) ctx.strokeStyle = e.target.value;
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/SignaturePad.jsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SignaturePad.jsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "px-3 py-1.5 rounded-md border bg-black text-white",
                                onClick: handleSave,
                                children: "บันทึกลายเซ็น"
                            }, void 0, false, {
                                fileName: "[project]/components/SignaturePad.jsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SignaturePad.jsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SignaturePad.jsx",
                lineNumber: 193,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SignaturePad.jsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/AuthFallbackCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthFallbackCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$background$2d$gradient$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/background-gradient.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function AuthFallbackCard() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-[50vh] items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$background$2d$gradient$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackgroundGradient"], {
            className: "w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-lg dark:border-neutral-800 dark:bg-neutral-950",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-semibold text-neutral-900 dark:text-neutral-100",
                    children: "ไม่พบข้อมูลผู้ใช้"
                }, void 0, false, {
                    fileName: "[project]/components/AuthFallbackCard.jsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm text-neutral-600 dark:text-neutral-400",
                    children: "กรุณาเข้าสู่ระบบใหม่เพื่อเข้าถึงหน้าโปรไฟล์"
                }, void 0, false, {
                    fileName: "[project]/components/AuthFallbackCard.jsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/auth/login",
                    className: "mt-6 inline-block rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
                    children: "ไปที่หน้าเข้าสู่ระบบ"
                }, void 0, false, {
                    fileName: "[project]/components/AuthFallbackCard.jsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AuthFallbackCard.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AuthFallbackCard.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(protected)/me/meClient.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/domains/auth/hooks/useAuth.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/stateful-button.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$background$2d$gradient$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/background-gradient.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$NoticeDialog$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal/NoticeDialog.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$components$2f$ChangePasswordDialog$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/domains/auth/components/ChangePasswordDialog.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SignaturePad$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SignaturePad.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthFallbackCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AuthFallbackCard.jsx [app-ssr] (ecmascript)"); // ✅ import ใหม่
"use client";
;
;
;
;
;
;
;
;
;
;
;
const EMPLOYEE_TYPES = {
    DAILY: "DAILY (รายวัน)",
    MONTHLY: "MONTHLY (รายเดือน)"
};
const CONTRACT_TYPES = {
    PERMANENT: "PERMANENT (ประจำ)",
    TEMPORARY: "TEMPORARY (ชั่วคราว)",
    PROBATION: "PROBATION (ทดลองงาน)"
};
const GENDERS = {
    MALE: "ชาย",
    FEMALE: "หญิง",
    OTHER: "อื่น ๆ"
};
function fmtDate(d) {
    if (!d) return "";
    try {
        const dt = typeof d === "string" ? new Date(d) : d;
        if (Number.isNaN(dt.getTime())) return "";
        return dt.toISOString().slice(0, 10);
    } catch  {
        return "";
    }
}
function MeClient() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, loading, reload } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // ----- Guard ก่อน render -----
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto max-w-5xl p-6 py-30",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-neutral-500",
                children: "กำลังโหลดข้อมูล..."
            }, void 0, false, {
                fileName: "[project]/app/(protected)/me/meClient.jsx",
                lineNumber: 37,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(protected)/me/meClient.jsx",
            lineNumber: 36,
            columnNumber: 7
        }, this);
    }
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "mx-auto max-w-5xl p-6 py-30",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AuthFallbackCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/(protected)/me/meClient.jsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                " "
            ]
        }, void 0, true, {
            fileName: "[project]/app/(protected)/me/meClient.jsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
    // ------------------------------
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        email: "",
        name: "",
        firstNameTh: "",
        lastNameTh: "",
        firstNameEn: "",
        lastNameEn: ""
    });
    const [readonly, setReadonly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        organizationName: "",
        employeeCode: "",
        employeeType: "",
        contractType: "",
        gender: "",
        birthDate: "",
        startDate: "",
        probationEndDate: "",
        resignedAt: "",
        roleName: "",
        primaryDept: null,
        otherDepts: []
    });
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        type: "info",
        message: ""
    });
    const [showChangePass, setShowChangePass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [avatarTick, setAvatarTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [avatarError, setAvatarError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const avatarUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!user?.id) return "";
        const abs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toApiUrl"])(`/api/files/avatar/${user.id}`);
        const sep = abs.includes("?") ? "&" : "?";
        return `${abs}${sep}ts=${avatarTick}`;
    }, [
        user?.id,
        avatarTick
    ]);
    const [signTick, setSignTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [signError, setSignError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const signatureUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!user?.id) return "";
        const abs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toApiUrl"])(`/api/files/signature/${user.id}`);
        const sep = abs.includes("?") ? "&" : "?";
        return `${abs}${sep}ts=${signTick}`;
    }, [
        user?.id,
        signTick
    ]);
    const [showDrawPad, setShowDrawPad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let stop = false;
        (async ()=>{
            if (!user?.id) return;
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/users/${user.id}`);
                const u = res?.data || {};
                if (stop) return;
                setForm({
                    email: u.email || "",
                    name: u.name || "",
                    firstNameTh: u.firstNameTh || "",
                    lastNameTh: u.lastNameTh || "",
                    firstNameEn: u.firstNameEn || "",
                    lastNameEn: u.lastNameEn || ""
                });
                const primary = u.primaryUserDept?.department ? {
                    code: u.primaryUserDept.department.code,
                    nameTh: u.primaryUserDept.department.nameTh,
                    positionLevel: u.primaryUserDept.positionLevel || "",
                    positionName: u.primaryUserDept.positionName || ""
                } : null;
                const others = (u.userDepartments || []).filter((d)=>!d.endedAt && d.id !== u.primaryUserDept?.id).map((d)=>({
                        id: d.id,
                        code: d.department?.code,
                        nameTh: d.department?.nameTh,
                        positionLevel: d.positionLevel || "",
                        positionName: d.positionName || ""
                    }));
                setReadonly({
                    organizationName: u.organization?.nameTh || u.organization?.nameEn || "",
                    employeeCode: u.employeeCode || "",
                    employeeType: EMPLOYEE_TYPES[u.employeeType] || "",
                    contractType: CONTRACT_TYPES[u.contractType] || "",
                    gender: GENDERS[u.gender] || "",
                    birthDate: fmtDate(u.birthDate),
                    startDate: fmtDate(u.startDate),
                    probationEndDate: fmtDate(u.probationEndDate),
                    resignedAt: fmtDate(u.resignedAt),
                    roleName: u.role?.name || "",
                    primaryDept: primary,
                    otherDepts: others
                });
                setAvatarError(false);
                setSignError(false);
                const now = Date.now();
                setAvatarTick(now);
                setSignTick(now);
            } catch (e) {
                if (!stop) setNotice({
                    open: true,
                    type: "error",
                    message: e?.message || "โหลดโปรไฟล์ล้มเหลว"
                });
            }
        })();
        return ()=>{
            stop = true;
        };
    }, [
        user?.id
    ]);
    async function onSubmit(e) {
        e.preventDefault();
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/me", {
                method: "PATCH",
                body: {
                    name: form.name,
                    firstNameTh: form.firstNameTh,
                    lastNameTh: form.lastNameTh,
                    firstNameEn: form.firstNameEn,
                    lastNameEn: form.lastNameEn
                }
            });
            reload?.();
            setNotice({
                open: true,
                type: "success",
                message: "บันทึกโปรไฟล์เรียบร้อย"
            });
        } catch (e) {
            setNotice({
                open: true,
                type: "error",
                message: e?.data?.error || e?.message || "บันทึกไม่สำเร็จ"
            });
        } finally{
            setBusy(false);
        }
    }
    async function uploadFile({ file, field, url, tickSetter, errSetter, okMessage }) {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setNotice({
                open: true,
                type: "error",
                message: "กรุณาเลือกรูปภาพเท่านั้น"
            });
            return;
        }
        const limit = field === "avatar" ? 2 * 1024 * 1024 : 1 * 1024 * 1024;
        if (file.size > limit) {
            setNotice({
                open: true,
                type: "error",
                message: field === "avatar" ? "ขนาดรูปโปรไฟล์ต้องไม่เกิน 2MB" : "ขนาดไฟล์ลายเซ็นต้องไม่เกิน 1MB"
            });
            return;
        }
        try {
            const fd = new FormData();
            fd.append(field, file);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(url, {
                method: "POST",
                body: fd
            });
            errSetter(false);
            tickSetter(Date.now());
            reload?.();
            setNotice({
                open: true,
                type: "success",
                message: okMessage
            });
        } catch (e) {
            setNotice({
                open: true,
                type: "error",
                message: e?.data?.message || e?.data?.error || e?.message || "อัปโหลดไม่สำเร็จ"
            });
        }
    }
    async function onUploadAvatar(file) {
        await uploadFile({
            file,
            field: "avatar",
            url: "/api/files/avatar",
            tickSetter: setAvatarTick,
            errSetter: setAvatarError,
            okMessage: "อัปโหลดรูปโปรไฟล์สำเร็จ"
        });
    }
    async function onUploadSignature(file) {
        await uploadFile({
            file,
            field: "signature",
            url: "/api/files/signature",
            tickSetter: setSignTick,
            errSetter: setSignError,
            okMessage: "อัปโหลดลายเซ็นสำเร็จ"
        });
    }
    const hasPrimary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>!!readonly.primaryDept, [
        readonly.primaryDept
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-5xl p-6 py-30 space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$NoticeDialog$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: notice.open,
                onClose: ()=>setNotice((s)=>({
                            ...s,
                            open: false
                        })),
                type: notice.type,
                message: notice.message
            }, void 0, false, {
                fileName: "[project]/app/(protected)/me/meClient.jsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$components$2f$ChangePasswordDialog$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: showChangePass,
                onClose: ()=>setShowChangePass(false)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/me/meClient.jsx",
                lineNumber: 268,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/me/meClient.jsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_043bd4d3._.js.map