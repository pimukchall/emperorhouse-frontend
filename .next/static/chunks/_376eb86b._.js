(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/roles/RolesTable.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoleFormDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal/Modal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/stateful-button.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const inputCx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
function RoleFormDialog(param) {
    let { open, onClose, initial, onSubmit, loading = false, error = "" } = param;
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        name: "",
        labelTh: "",
        labelEn: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleFormDialog.useEffect": ()=>{
            var _initial_id, _initial_name, _initial_labelTh, _initial_labelEn;
            setForm({
                id: (_initial_id = initial === null || initial === void 0 ? void 0 : initial.id) !== null && _initial_id !== void 0 ? _initial_id : null,
                name: (_initial_name = initial === null || initial === void 0 ? void 0 : initial.name) !== null && _initial_name !== void 0 ? _initial_name : "",
                labelTh: (_initial_labelTh = initial === null || initial === void 0 ? void 0 : initial.labelTh) !== null && _initial_labelTh !== void 0 ? _initial_labelTh : "",
                labelEn: (_initial_labelEn = initial === null || initial === void 0 ? void 0 : initial.labelEn) !== null && _initial_labelEn !== void 0 ? _initial_labelEn : ""
            });
        }
    }["RoleFormDialog.useEffect"], [
        initial,
        open
    ]);
    const isEdit = !!form.id;
    const footer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "rounded-md border px-4 py-2 text-sm dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-60",
                onClick: onClose,
                disabled: loading,
                children: "ยกเลิก"
            }, void 0, false, {
                fileName: "[project]/components/roles/RolesTable.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                loading: loading,
                onClick: ()=>onSubmit(form),
                className: "rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80 disabled:opacity-60",
                children: "บันทึก"
            }, void 0, false, {
                fileName: "[project]/components/roles/RolesTable.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/roles/RolesTable.jsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
    var _initial_name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        title: isEdit ? "แก้ไข Role: ".concat((_initial_name = initial === null || initial === void 0 ? void 0 : initial.name) !== null && _initial_name !== void 0 ? _initial_name : "") : "สร้าง Role ใหม่",
        footer: footer,
        size: "md",
        dismissable: !loading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                !!error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-md border border-rose-200 bg-rose-50 dark:border-rose-900/40 dark:bg-rose-950/50 px-3 py-2 text-sm text-rose-700 dark:text-rose-300",
                    children: String(error)
                }, void 0, false, {
                    fileName: "[project]/components/roles/RolesTable.jsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: "name (unique)"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RolesTable.jsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inputCx,
                            value: form.name,
                            onChange: (e)=>setForm((s)=>({
                                        ...s,
                                        name: e.target.value
                                    })),
                            placeholder: "เช่น admin, user, hr.manager",
                            disabled: isEdit
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RolesTable.jsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/roles/RolesTable.jsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: "labelTh"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RolesTable.jsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inputCx,
                            value: form.labelTh,
                            onChange: (e)=>setForm((s)=>({
                                        ...s,
                                        labelTh: e.target.value
                                    })),
                            placeholder: "ชื่อภาษาไทย"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RolesTable.jsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/roles/RolesTable.jsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: "labelEn"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RolesTable.jsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inputCx,
                            value: form.labelEn,
                            onChange: (e)=>setForm((s)=>({
                                        ...s,
                                        labelEn: e.target.value
                                    })),
                            placeholder: "English label"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RolesTable.jsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/roles/RolesTable.jsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/roles/RolesTable.jsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/roles/RolesTable.jsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(RoleFormDialog, "D6Ht2IPE1iAdypFxekL9BTWCHuc=");
_c = RoleFormDialog;
var _c;
__turbopack_context__.k.register(_c, "RoleFormDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/roles/RoleFormDialog.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoleFormDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/modal/Modal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/stateful-button.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const inputCx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
function RoleFormDialog(param) {
    let { open, onClose, initial, onSubmit, loading = false, error = "" } = param;
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        name: "",
        labelTh: "",
        labelEn: ""
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoleFormDialog.useEffect": ()=>{
            var _initial_id, _initial_name, _initial_labelTh, _initial_labelEn;
            setForm({
                id: (_initial_id = initial === null || initial === void 0 ? void 0 : initial.id) !== null && _initial_id !== void 0 ? _initial_id : null,
                name: (_initial_name = initial === null || initial === void 0 ? void 0 : initial.name) !== null && _initial_name !== void 0 ? _initial_name : "",
                labelTh: (_initial_labelTh = initial === null || initial === void 0 ? void 0 : initial.labelTh) !== null && _initial_labelTh !== void 0 ? _initial_labelTh : "",
                labelEn: (_initial_labelEn = initial === null || initial === void 0 ? void 0 : initial.labelEn) !== null && _initial_labelEn !== void 0 ? _initial_labelEn : ""
            });
        }
    }["RoleFormDialog.useEffect"], [
        initial,
        open
    ]);
    const isEdit = !!form.id;
    const footer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "rounded-md border px-4 py-2 text-sm dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-60",
                onClick: onClose,
                disabled: loading,
                children: "ยกเลิก"
            }, void 0, false, {
                fileName: "[project]/components/roles/RoleFormDialog.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$stateful$2d$button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                loading: loading,
                onClick: ()=>onSubmit(form),
                className: "rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80 disabled:opacity-60",
                children: "บันทึก"
            }, void 0, false, {
                fileName: "[project]/components/roles/RoleFormDialog.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/roles/RoleFormDialog.jsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
    var _initial_name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$modal$2f$Modal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        open: open,
        onClose: onClose,
        title: isEdit ? "แก้ไข Role: ".concat((_initial_name = initial === null || initial === void 0 ? void 0 : initial.name) !== null && _initial_name !== void 0 ? _initial_name : "") : "สร้าง Role ใหม่",
        footer: footer,
        size: "md",
        dismissable: !loading,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                !!error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-md border border-rose-200 bg-rose-50 dark:border-rose-900/40 dark:bg-rose-950/50 px-3 py-2 text-sm text-rose-700 dark:text-rose-300",
                    children: String(error)
                }, void 0, false, {
                    fileName: "[project]/components/roles/RoleFormDialog.jsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: "name (unique)"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RoleFormDialog.jsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inputCx,
                            value: form.name,
                            onChange: (e)=>setForm((s)=>({
                                        ...s,
                                        name: e.target.value
                                    })),
                            placeholder: "เช่น admin, user, hr.manager",
                            disabled: isEdit
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RoleFormDialog.jsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/roles/RoleFormDialog.jsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: "labelTh"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RoleFormDialog.jsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inputCx,
                            value: form.labelTh,
                            onChange: (e)=>setForm((s)=>({
                                        ...s,
                                        labelTh: e.target.value
                                    })),
                            placeholder: "ชื่อภาษาไทย"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RoleFormDialog.jsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/roles/RoleFormDialog.jsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm",
                            children: "labelEn"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RoleFormDialog.jsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: inputCx,
                            value: form.labelEn,
                            onChange: (e)=>setForm((s)=>({
                                        ...s,
                                        labelEn: e.target.value
                                    })),
                            placeholder: "English label"
                        }, void 0, false, {
                            fileName: "[project]/components/roles/RoleFormDialog.jsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/roles/RoleFormDialog.jsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/roles/RoleFormDialog.jsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/roles/RoleFormDialog.jsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(RoleFormDialog, "D6Ht2IPE1iAdypFxekL9BTWCHuc=");
_c = RoleFormDialog;
var _c;
__turbopack_context__.k.register(_c, "RoleFormDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/roles.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRole",
    ()=>createRole,
    "deleteRole",
    ()=>deleteRole,
    "listRoles",
    ()=>listRoles,
    "updateRole",
    ()=>updateRole
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
// ช่วยแปลงผลลัพธ์ให้รองรับทั้ง {ok,data} หรือ array ตรง ๆ
function unwrapList(res) {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res === null || res === void 0 ? void 0 : res.data)) return res.data;
    return [];
}
async function listRoles() {
    let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _params_q, _params_page, _params_limit, _params_sortBy, _params_sort;
    const search = new URLSearchParams({
        q: (_params_q = params.q) !== null && _params_q !== void 0 ? _params_q : "",
        page: String((_params_page = params.page) !== null && _params_page !== void 0 ? _params_page : 1),
        limit: String((_params_limit = params.limit) !== null && _params_limit !== void 0 ? _params_limit : 200),
        sortBy: (_params_sortBy = params.sortBy) !== null && _params_sortBy !== void 0 ? _params_sortBy : "id",
        sort: (_params_sort = params.sort) !== null && _params_sort !== void 0 ? _params_sort : "asc"
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/roles?".concat(search.toString()));
    return unwrapList(res);
}
async function createRole(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/roles", {
        method: "POST",
        body: payload
    });
}
async function updateRole(id, payload) {
    if (!id) throw new Error("Missing role id");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/roles/".concat(id), {
        method: "PUT",
        body: payload
    });
}
async function deleteRole(id) {
    if (!id) throw new Error("Missing role id");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/roles/".concat(id), {
        method: "DELETE"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/roles/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminRolesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roles$2f$RolesTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/roles/RolesTable.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roles$2f$RoleFormDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/roles/RoleFormDialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/roles.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AdminRolesPage() {
    _s();
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dialogOpen, setDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // {id,name,labelTh,labelEn}
    // debounce ค้นหา
    const debouncedQ = useDebounce(q, 300);
    async function load() {
        setLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listRoles"])({
                q: debouncedQ,
                page: 1,
                limit: 200,
                sortBy: "id",
                sort: "asc"
            });
            setItems((res === null || res === void 0 ? void 0 : res.data) || []);
            setError("");
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "โหลดไม่สำเร็จ");
            setItems([]);
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminRolesPage.useEffect": ()=>{
            load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ 
        }
    }["AdminRolesPage.useEffect"], [
        debouncedQ
    ]);
    function openNew() {
        setEditing(null);
        setDialogOpen(true);
    }
    function openEdit(row) {
        setEditing({
            id: row.id,
            name: row.name,
            labelTh: row.labelTh,
            labelEn: row.labelEn
        });
        setDialogOpen(true);
    }
    async function handleSubmit(form) {
        try {
            setSaving(true);
            if (form.id) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateRole"])(form.id, {
                    labelTh: form.labelTh || null,
                    labelEn: form.labelEn || null
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRole"])({
                    name: form.name,
                    labelTh: form.labelTh || null,
                    labelEn: form.labelEn || null
                });
            }
            setDialogOpen(false);
            await load();
        } catch (e) {
            var _e_data;
            alert((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.message) || e.message || "บันทึกไม่สำเร็จ");
        } finally{
            setSaving(false);
        }
    }
    async function handleDelete(row) {
        if (!confirm('ลบ role "'.concat(row.name, '" ?'))) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$roles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteRole"])(row.id); // ใช้ id แทน name
            await load();
        } catch (e) {
            var _e_data;
            alert((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.message) || e.message || "ลบไม่สำเร็จ");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100",
                        children: "Roles"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/roles/page.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-52 rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
                                placeholder: "ค้นหา role",
                                value: q,
                                onChange: (e)=>setQ(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/roles/page.jsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "hidden sm:inline-flex items-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-80",
                                onClick: openNew,
                                children: "+ สร้างใหม่"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/roles/page.jsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/roles/page.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/roles/page.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roles$2f$RolesTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                items: items,
                loading: loading,
                error: error,
                onEdit: openEdit,
                onDelete: handleDelete
            }, void 0, false, {
                fileName: "[project]/app/admin/roles/page.jsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: openNew,
                className: "sm:hidden fixed bottom-5 right-5 z-40 rounded-full h-12 w-12 shadow-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xl leading-none",
                "aria-label": "สร้างใหม่",
                children: "+"
            }, void 0, false, {
                fileName: "[project]/app/admin/roles/page.jsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$roles$2f$RoleFormDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: dialogOpen,
                onClose: ()=>setDialogOpen(false),
                initial: editing,
                onSubmit: handleSubmit,
                loading: saving
            }, void 0, false, {
                fileName: "[project]/app/admin/roles/page.jsx",
                lineNumber: 96,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/roles/page.jsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_s(AdminRolesPage, "cEu6e+pfd4BCkOyJv148P9Fr8do=", false, function() {
    return [
        useDebounce
    ];
});
_c = AdminRolesPage;
// ——— utils: debounce hook ———
function useDebounce(value) {
    let delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 300;
    _s1();
    const [v, setV] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebounce.useEffect": ()=>{
            const t = setTimeout({
                "useDebounce.useEffect.t": ()=>setV(value)
            }["useDebounce.useEffect.t"], delay);
            return ({
                "useDebounce.useEffect": ()=>clearTimeout(t)
            })["useDebounce.useEffect"];
        }
    }["useDebounce.useEffect"], [
        value,
        delay
    ]);
    return v;
}
_s1(useDebounce, "+XKCVDzd8rrunExeVW+YMgDw4yY=");
var _c;
__turbopack_context__.k.register(_c, "AdminRolesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_376eb86b._.js.map