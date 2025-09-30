(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(protected)/admin/users/components/FiltersBar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FiltersBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
function FiltersBar(param) {
    let { roles = [], departments = [], filters } = param;
    const { q, setQ, roleId, setRoleId, departmentId, setDepartmentId, includeDeleted, setIncludeDeleted, onClear } = filters;
    const cx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-700 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-3 sm:grid-cols-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "sm:col-span-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-neutral-600 dark:text-neutral-300",
                            children: "ค้นหา (ชื่อ/อีเมล/โค้ด)"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: q,
                            onChange: (e)=>setQ(e.target.value),
                            placeholder: "พิมพ์คำค้น…",
                            className: cx
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "sm:col-span-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-neutral-600 dark:text-neutral-300",
                            children: "Role"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: roleId,
                            onChange: (e)=>setRoleId(e.target.value),
                            className: cx,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "ทั้งหมด"
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                roles.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: String(r.id),
                                        children: r.name
                                    }, r.id, false, {
                                        fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                                        lineNumber: 28,
                                        columnNumber: 31
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "sm:col-span-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-neutral-600 dark:text-neutral-300",
                            children: "Department"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: departmentId,
                            onChange: (e)=>setDepartmentId(e.target.value),
                            className: cx,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "ทั้งหมด"
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                departments.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: String(d.id),
                                        children: [
                                            d.code,
                                            " · ",
                                            d.nameTh || d.nameEn || "Dept#".concat(d.id)
                                        ]
                                    }, d.id, true, {
                                        fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "sm:col-span-6 flex items-center gap-2 mt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: !!includeDeleted,
                            onChange: (e)=>setIncludeDeleted(e.target.checked),
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-neutral-700 dark:text-neutral-300",
                            children: "แสดงผู้ใช้ที่ถูกลบ (soft-delete)"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sm:col-span-6 flex gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClear,
                        className: "h-9 px-4 rounded-md border hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800",
                        children: "ล้างตัวกรอง"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/components/FiltersBar.jsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = FiltersBar;
var _c;
__turbopack_context__.k.register(_c, "FiltersBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(protected)/admin/users/components/UserForm.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
const EMPLOYEE_TYPES = [
    {
        value: "",
        label: "- ไม่ระบุ -"
    },
    {
        value: "DAILY",
        label: "DAILY (รายวัน)"
    },
    {
        value: "MONTHLY",
        label: "MONTHLY (รายเดือน)"
    }
];
const CONTRACT_TYPES = [
    {
        value: "",
        label: "- ไม่ระบุ -"
    },
    {
        value: "PERMANENT",
        label: "PERMANENT (ประจำ)"
    },
    {
        value: "TEMPORARY",
        label: "TEMPORARY (ชั่วคราว)"
    },
    {
        value: "PROBATION",
        label: "PROBATION (ทดลองงาน)"
    }
];
const GENDERS = [
    {
        value: "",
        label: "- ไม่ระบุ -"
    },
    {
        value: "MALE",
        label: "ชาย"
    },
    {
        value: "FEMALE",
        label: "หญิง"
    },
    {
        value: "OTHER",
        label: "อื่น ๆ"
    }
];
function UserForm(param) {
    let { roles = [], departments = [], organizations = [], form, setForm, isEditing, onSubmit, onCancel, canSubmit = true } = param;
    const hasCurrentOrg = form.orgId && organizations.some((o)=>String(o.id) === String(form.orgId));
    const cx = "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100";
    const note = "text-[11px] text-neutral-500 dark:text-neutral-400 mt-1";
    const needPassword = !isEditing;
    const emailInvalid = !form.email;
    const passwordInvalid = needPassword && (!form.password || form.password.length < 8);
    const roleInvalid = !form.roleId;
    const deptInvalid = !form.departmentId;
    var _form_orgId, _form_employeeType, _form_contractType, _form_gender;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "grid gap-3 sm:grid-cols-3",
        onSubmit: onSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: [
                            "อีเมล ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-rose-600",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 48,
                                columnNumber: 79
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.email,
                        onChange: (e)=>setForm({
                                ...form,
                                email: e.target.value
                            }),
                        className: cx,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    emailInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: note,
                        children: "ต้องกรอกอีเมล"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 50,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            needPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: [
                            "รหัสผ่านเริ่มต้น ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-rose-600",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 55,
                                columnNumber: 92
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "password",
                        value: form.password,
                        onChange: (e)=>setForm({
                                ...form,
                                password: e.target.value
                            }),
                        className: cx,
                        placeholder: "อย่างน้อย 8 ตัว",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this),
                    passwordInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: note,
                        children: "อย่างน้อย 8 ตัวอักษร"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 57,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "ชื่อที่แสดง (nickname)"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.name,
                        onChange: (e)=>setForm({
                                ...form,
                                name: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "ชื่อ (ไทย)"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.firstNameTh,
                        onChange: (e)=>setForm({
                                ...form,
                                firstNameTh: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "นามสกุล (ไทย)"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.lastNameTh,
                        onChange: (e)=>setForm({
                                ...form,
                                lastNameTh: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "ชื่อ (อังกฤษ)"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.firstNameEn,
                        onChange: (e)=>setForm({
                                ...form,
                                firstNameEn: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "นามสกุล (อังกฤษ)"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.lastNameEn,
                        onChange: (e)=>setForm({
                                ...form,
                                lastNameEn: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Employee Code"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: form.employeeCode,
                        onChange: (e)=>setForm({
                                ...form,
                                employeeCode: e.target.value
                            }),
                        className: cx,
                        placeholder: "ถ้าเว้นว่าง ระบบจะสร้างให้อัตโนมัติ"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Organization"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: (_form_orgId = form.orgId) !== null && _form_orgId !== void 0 ? _form_orgId : "",
                        onChange: (e)=>setForm({
                                ...form,
                                orgId: e.target.value || ""
                            }),
                        className: cx,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "- ไม่ระบุ -"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            !hasCurrentOrg && form.orgId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: String(form.orgId),
                                children: form.orgLabel || "Org#".concat(form.orgId)
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 94,
                                columnNumber: 44
                            }, this),
                            organizations.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: String(o.id),
                                    children: [
                                        o.code ? "".concat(o.code, " · ") : "",
                                        o.nameTh || o.nameEn || "Org#".concat(o.id)
                                    ]
                                }, o.id, true, {
                                    fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Employee Type"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: (_form_employeeType = form.employeeType) !== null && _form_employeeType !== void 0 ? _form_employeeType : "",
                        onChange: (e)=>setForm({
                                ...form,
                                employeeType: e.target.value || ""
                            }),
                        className: cx,
                        children: EMPLOYEE_TYPES.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: opt.value,
                                children: opt.label
                            }, opt.value, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 107,
                                columnNumber: 40
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Contract Type"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: (_form_contractType = form.contractType) !== null && _form_contractType !== void 0 ? _form_contractType : "",
                        onChange: (e)=>setForm({
                                ...form,
                                contractType: e.target.value || ""
                            }),
                        className: cx,
                        children: CONTRACT_TYPES.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: opt.value,
                                children: opt.label
                            }, opt.value, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 113,
                                columnNumber: 40
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Gender"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: (_form_gender = form.gender) !== null && _form_gender !== void 0 ? _form_gender : "",
                        onChange: (e)=>setForm({
                                ...form,
                                gender: e.target.value
                            }),
                        className: cx,
                        children: GENDERS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: g.value,
                                children: g.label
                            }, g.value, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 119,
                                columnNumber: 31
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Birth Date"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.birthDate,
                        onChange: (e)=>setForm({
                                ...form,
                                birthDate: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Start Date"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.startDate,
                        onChange: (e)=>setForm({
                                ...form,
                                startDate: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Probation End"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.probationEndDate,
                        onChange: (e)=>setForm({
                                ...form,
                                probationEndDate: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: "Resigned At"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.resignedAt,
                        onChange: (e)=>setForm({
                                ...form,
                                resignedAt: e.target.value
                            }),
                        className: cx
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: [
                            "Role ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-rose-600",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 143,
                                columnNumber: 78
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: form.roleId,
                        onChange: (e)=>setForm({
                                ...form,
                                roleId: e.target.value
                            }),
                        className: cx,
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "- เลือก -"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            roles.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: String(r.id),
                                    children: r.name
                                }, r.id, false, {
                                    fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                    lineNumber: 146,
                                    columnNumber: 29
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    roleInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: note,
                        children: "ต้องเลือก Role"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 148,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-600 dark:text-neutral-300",
                        children: [
                            "Department (Primary) ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-rose-600",
                                children: "*"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 151,
                                columnNumber: 94
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: form.departmentId,
                        onChange: (e)=>setForm({
                                ...form,
                                departmentId: e.target.value
                            }),
                        className: cx,
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "- เลือก -"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            departments.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: String(d.id),
                                    children: [
                                        d.code,
                                        " · ",
                                        d.nameTh || d.nameEn || "Dept#".concat(d.id)
                                    ]
                                }, d.id, true, {
                                    fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                                    lineNumber: 154,
                                    columnNumber: 35
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    deptInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: note,
                        children: "ต้องเลือก Department"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 156,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sm:col-span-3 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: !canSubmit,
                        className: "h-9 px-4 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 disabled:opacity-50",
                        children: isEditing ? "บันทึกการแก้ไข" : "เพิ่ม"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onCancel,
                        className: "h-9 px-4 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                        children: "ล้างฟอร์ม"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/users/components/UserForm.jsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = UserForm;
var _c;
__turbopack_context__.k.register(_c, "UserForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(protected)/admin/users/components/UsersTable.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UsersTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
function UsersTable(param) {
    let { items = [], meta = {
        page: 1,
        pages: 1,
        total: 0
    }, page, setPage, onEdit, onSoftDelete, onRestore, onHardDelete, onResetPassword, onManageDepts } = param;
    const columns = [
        "ID",
        "Email",
        "ชื่อ / Role",
        "Organization",
        "Primary / Others",
        "ลบ?",
        "Actions"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-xl border dark:border-neutral-700 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-neutral-100 dark:bg-neutral-800 sticky top-0 z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: columns.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                        right: c === "Actions",
                                        children: c
                                    }, i, false, {
                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: items.length > 0 ? items.map((u)=>{
                                var _u_role;
                                const pri = u.primaryUserDept;
                                const others = (u.userDepartments || []).filter((d)=>d.id !== (pri === null || pri === void 0 ? void 0 : pri.id) && !d.endedAt);
                                const org = u.organization;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-t dark:border-neutral-700 align-top hover:bg-neutral-50/60 dark:hover:bg-neutral-800/50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            children: u.id
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 39,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            className: "whitespace-nowrap",
                                            children: u.email
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 40,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-medium",
                                                    children: u.name || "".concat(u.firstNameTh || "", " ").concat(u.lastNameTh || "")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                    lineNumber: 42,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-0.5 text-xs text-neutral-600 dark:text-neutral-300",
                                                    children: ((_u_role = u.role) === null || _u_role === void 0 ? void 0 : _u_role.name) || "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                    lineNumber: 43,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 41,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            className: "whitespace-nowrap",
                                            children: org ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    org.code ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: org.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 48,
                                                        columnNumber: 39
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "ORG#",
                                                            org.id
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 48,
                                                        columnNumber: 59
                                                    }, this),
                                                    " · ",
                                                    org.nameTh || org.nameEn || "-"
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-neutral-500",
                                                children: "-"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                lineNumber: 51,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 45,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            children: [
                                                (pri === null || pri === void 0 ? void 0 : pri.department) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "whitespace-nowrap",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: pri.department.code
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                            lineNumber: 57,
                                                            columnNumber: 27
                                                        }, this),
                                                        " · ",
                                                        pri.positionLevel,
                                                        pri.positionName ? " (".concat(pri.positionName, ")") : "",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-green-700",
                                                            children: "Primary"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                            lineNumber: 59,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                    lineNumber: 56,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-neutral-500",
                                                    children: "-"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                    lineNumber: 62,
                                                    columnNumber: 25
                                                }, this),
                                                others.map((d)=>{
                                                    var _d_department;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "whitespace-nowrap text-[12px] text-neutral-700 dark:text-neutral-300",
                                                        children: [
                                                            (_d_department = d.department) === null || _d_department === void 0 ? void 0 : _d_department.code,
                                                            " · ",
                                                            d.positionLevel,
                                                            d.positionName ? " (".concat(d.positionName, ")") : ""
                                                        ]
                                                    }, d.id, true, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 65,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 54,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            children: u.deletedAt ? "Yes" : "-"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 71,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                            right: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-1 justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                                        onClick: ()=>onEdit(u),
                                                        children: "Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 74,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                                        onClick: ()=>onManageDepts(u),
                                                        children: "Manage Depts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 75,
                                                        columnNumber: 25
                                                    }, this),
                                                    !u.deletedAt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                                        className: "text-amber-700",
                                                        onClick: ()=>onSoftDelete(u),
                                                        children: "Soft Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 77,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                                                className: "text-green-700",
                                                                onClick: ()=>onRestore(u),
                                                                children: "Restore"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                                lineNumber: 80,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                                                className: "text-rose-700",
                                                                onClick: ()=>onHardDelete(u),
                                                                children: "Hard Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                                lineNumber: 81,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                                        className: "text-purple-700",
                                                        onClick: ()=>onResetPassword(u),
                                                        children: "Reset Password"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                        lineNumber: 84,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                                lineNumber: 73,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                            lineNumber: 72,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, u.id, true, {
                                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                    lineNumber: 38,
                                    columnNumber: 19
                                }, this);
                            }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                                    colSpan: 7,
                                    className: "px-3 py-6 text-center text-neutral-500",
                                    children: "ไม่พบข้อมูล"
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                    lineNumber: 92,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-neutral-500",
                        children: [
                            "ทั้งหมด ",
                            meta.total,
                            " รายการ"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                disabled: page <= 1,
                                onClick: ()=>setPage((p)=>p - 1),
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: [
                                    "Page ",
                                    meta.page,
                                    " / ",
                                    meta.pages || 1
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                                disabled: page >= (meta.pages || 1),
                                onClick: ()=>setPage((p)=>p + 1),
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = UsersTable;
function GhostButton(param) {
    let { children, className = "", ...rest } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50 ".concat(className),
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c1 = GhostButton;
function Th(param) {
    let { children, right } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "px-3 py-2 ".concat(right ? "text-right" : "text-left", " text-neutral-700 dark:text-neutral-200"),
        children: children
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c2 = Th;
function Td(param) {
    let { children, right, className = "", ...rest } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: "px-3 py-2 ".concat(right ? "text-right" : "", " ").concat(className),
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/components/UsersTable.jsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_c3 = Td;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "UsersTable");
__turbopack_context__.k.register(_c1, "GhostButton");
__turbopack_context__.k.register(_c2, "Th");
__turbopack_context__.k.register(_c3, "Td");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PositionLevels",
    ()=>PositionLevels,
    "default",
    ()=>ManageUserDepartmentsDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const PositionLevels = [
    "STAF",
    "SVR",
    "ASST",
    "MANAGER",
    "MD"
];
const idx = (lv)=>PositionLevels.indexOf(lv);
function ManageUserDepartmentsDialog(param) {
    let { open, onClose, user, departments = [], onChanged } = param;
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const userId = user === null || user === void 0 ? void 0 : user.id;
    const boxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageUserDepartmentsDialog.useEffect": ()=>{
            if (!open) return;
            const onKey = {
                "ManageUserDepartmentsDialog.useEffect.onKey": (e)=>e.key === "Escape" && (onClose === null || onClose === void 0 ? void 0 : onClose())
            }["ManageUserDepartmentsDialog.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "ManageUserDepartmentsDialog.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["ManageUserDepartmentsDialog.useEffect"];
        }
    }["ManageUserDepartmentsDialog.useEffect"], [
        open,
        onClose
    ]);
    async function load() {
        if (!userId) return;
        try {
            const r = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/departments"));
            setItems((r === null || r === void 0 ? void 0 : r.data) || []);
            setError("");
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "โหลดข้อมูลสังกัดไม่สำเร็จ");
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageUserDepartmentsDialog.useEffect": ()=>{
            if (open) load(); /* eslint-disable-line */ 
        }
    }["ManageUserDepartmentsDialog.useEffect"], [
        open,
        userId
    ]);
    async function addAssignment(e) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const departmentId = Number(fd.get("departmentId"));
        const positionLevel = fd.get("positionLevel");
        const positionName = fd.get("positionName") || undefined;
        const setPrimary = fd.get("setPrimary") === "on";
        if (!departmentId || !positionLevel) return;
        setBusy(true);
        try {
            var _e_currentTarget_reset, _e_currentTarget;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/departments"), {
                method: "POST",
                body: {
                    departmentId,
                    positionLevel,
                    positionName,
                    setPrimary
                }
            });
            (_e_currentTarget_reset = (_e_currentTarget = e.currentTarget).reset) === null || _e_currentTarget_reset === void 0 ? void 0 : _e_currentTarget_reset.call(_e_currentTarget);
            await load();
            onChanged === null || onChanged === void 0 ? void 0 : onChanged();
        } catch (err) {
            var _err_data;
            setError((err === null || err === void 0 ? void 0 : (_err_data = err.data) === null || _err_data === void 0 ? void 0 : _err_data.error) || (err === null || err === void 0 ? void 0 : err.message) || "เพิ่มสังกัดไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function setPrimary(udId) {
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/primary/").concat(udId), {
                method: "POST"
            });
            await load();
            onChanged === null || onChanged === void 0 ? void 0 : onChanged();
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "ตั้ง primary ไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function endAssignment(udId) {
        if (!confirm("ปิดสังกัดนี้ (endedAt = ตอนนี้)?")) return;
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/departments/").concat(udId), {
                method: "PATCH",
                body: {
                    endedAt: new Date().toISOString()
                }
            });
            await load();
            onChanged === null || onChanged === void 0 ? void 0 : onChanged();
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "ปิดสังกัดไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function applyLevel(ud, toLevel, positionName) {
        const fromLevel = ud.positionLevel;
        if (!toLevel || toLevel === fromLevel) return savePosition(ud.id, fromLevel, positionName);
        setBusy(true);
        try {
            if (idx(toLevel) > idx(fromLevel)) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/departments/").concat(ud.id, "/promote"), {
                    method: "POST",
                    body: {
                        toLevel,
                        positionName: positionName || undefined
                    }
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/departments/").concat(ud.id, "/demote"), {
                    method: "POST",
                    body: {
                        toLevel,
                        positionName: positionName || undefined
                    }
                });
            }
            await load();
            onChanged === null || onChanged === void 0 ? void 0 : onChanged();
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "อัปเดตระดับไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function savePosition(udId, positionLevel, positionName) {
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(userId, "/departments/").concat(udId), {
                method: "PATCH",
                body: {
                    positionLevel,
                    positionName
                }
            });
            await load();
            onChanged === null || onChanged === void 0 ? void 0 : onChanged();
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "อัปเดตตำแหน่งไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    if (!open) return null;
    const active = items.filter((x)=>!x.endedAt);
    const ended = items.filter((x)=>!!x.endedAt);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
        onClick: ()=>onClose === null || onClose === void 0 ? void 0 : onClose(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: boxRef,
            className: "w-full max-w-4xl rounded-xl bg-white dark:bg-neutral-900 dark:border-neutral-700 border shadow-xl p-4",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-neutral-800 dark:text-neutral-100",
                                    children: "Manage Departments"
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-neutral-600 dark:text-neutral-300",
                                    children: user === null || user === void 0 ? void 0 : user.email
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "px-3 py-1.5 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                            onClick: ()=>onClose === null || onClose === void 0 ? void 0 : onClose(),
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "rounded-lg border dark:border-neutral-700 p-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: "font-medium mb-2",
                            children: "เพิ่มสังกัด"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: "grid gap-3 sm:grid-cols-4",
                            onSubmit: addAssignment,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            children: "Department"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "departmentId",
                                            className: "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "- เลือก -"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                                    lineNumber: 156,
                                                    columnNumber: 17
                                                }, this),
                                                departments.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: d.id,
                                                        children: [
                                                            d.code,
                                                            " · ",
                                                            d.nameTh || d.nameEn || "Dept#".concat(d.id)
                                                        ]
                                                    }, d.id, true, {
                                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                                        lineNumber: 158,
                                                        columnNumber: 19
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 155,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            children: "Position Level"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "positionLevel",
                                            className: "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
                                            required: true,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "- เลือก -"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, this),
                                                PositionLevels.map((lv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: lv,
                                                        children: lv
                                                    }, lv, false, {
                                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                                        lineNumber: 166,
                                                        columnNumber: 46
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs",
                                            children: "Position Name (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "positionName",
                                            className: "mt-1 w-full rounded-md border px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100",
                                            placeholder: "เช่น QMR"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block flex items-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            name: "setPrimary",
                                            className: "scale-110"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: "ตั้งเป็น Primary"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sm:col-span-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: busy,
                                        className: "h-9 px-4 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                                        children: busy ? "Saving..." : "Add assignment"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 152,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 150,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    title: "กำลังใช้งาน (".concat(active.length, ")"),
                    children: [
                        active.map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                x: x,
                                ended: false,
                                onApply: applyLevel,
                                onSetPrimary: setPrimary,
                                onEnd: endAssignment
                            }, x.id, false, {
                                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)),
                        !active.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyRow, {
                            text: "ยังไม่มีสังกัดที่ใช้งาน"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 189,
                            columnNumber: 30
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                    title: "สิ้นสุดแล้ว (".concat(ended.length, ")"),
                    muted: true,
                    children: [
                        ended.map((x)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                x: x,
                                ended: true,
                                onApply: applyLevel
                            }, x.id, false, {
                                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                lineNumber: 193,
                                columnNumber: 30
                            }, this)),
                        !ended.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyRow, {
                            text: "ไม่มีประวัติที่สิ้นสุด"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 194,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 192,
                    columnNumber: 9
                }, this),
                !!error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 text-red-600 text-sm",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 197,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
            lineNumber: 134,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_s(ManageUserDepartmentsDialog, "Wu12IXb8tnjAZoWgCMQCHgLWPHc=");
_c = ManageUserDepartmentsDialog;
function Section(param) {
    let { title, muted = false, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-lg border dark:border-neutral-700 overflow-hidden mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(muted ? "bg-neutral-100 dark:bg-neutral-800" : "bg-sky-50 dark:bg-sky-900/20", " px-3 py-2 text-sm font-medium"),
                children: title
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-neutral-50 dark:bg-neutral-900",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                        children: "Dept"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                        children: "Level / Name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                        children: "Started"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                        children: "Ended"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Th, {
                                        right: true,
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_c1 = Section;
function Row(param) {
    let { x, ended, onApply, onSetPrimary, onEnd } = param;
    _s1();
    const [toLevel, setToLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(x.positionLevel);
    const [pname, setPname] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(x.positionName || "");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Row.useEffect": ()=>{
            setToLevel(x.positionLevel);
            setPname(x.positionName || "");
        }
    }["Row.useEffect"], [
        x.positionLevel,
        x.positionName
    ]);
    const dept = x.department;
    const changed = toLevel !== x.positionLevel || (pname || "") !== (x.positionName || "");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-t dark:border-neutral-700 align-top",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                className: "whitespace-nowrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
                        children: dept === null || dept === void 0 ? void 0 : dept.code
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-700 dark:text-neutral-200",
                        children: (dept === null || dept === void 0 ? void 0 : dept.nameTh) || (dept === null || dept === void 0 ? void 0 : dept.nameEn)
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            className: "border dark:border-neutral-700 rounded-md px-2 py-1 text-sm dark:bg-neutral-800 dark:text-neutral-100",
                            value: toLevel,
                            onChange: (e)=>setToLevel(e.target.value),
                            disabled: ended,
                            title: "เปลี่ยนระดับตำแหน่ง",
                            children: PositionLevels.map((lv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: lv,
                                    children: lv
                                }, lv, false, {
                                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                    lineNumber: 246,
                                    columnNumber: 42
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: "border dark:border-neutral-700 rounded-md px-2 py-1 text-sm dark:bg-neutral-800 dark:text-neutral-100",
                            placeholder: "ตำแหน่ง (เช่น QMR)",
                            value: pname,
                            onChange: (e)=>setPname(e.target.value),
                            disabled: ended
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this),
                        !ended && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            disabled: !changed,
                            onClick: ()=>onApply(x, toLevel, pname),
                            className: "px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-50",
                            children: "Apply"
                        }, void 0, false, {
                            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                className: "whitespace-nowrap",
                children: x.startedAt ? new Date(x.startedAt).toLocaleString() : "-"
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                className: "whitespace-nowrap",
                children: x.endedAt ? new Date(x.endedAt).toLocaleString() : "-"
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Td, {
                right: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-1 justify-end",
                    children: !ended && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            !x.isPrimary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSetPrimary(x.id),
                                className: "px-2 py-1 rounded-md border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                                children: "Set Primary"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                lineNumber: 265,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onEnd(x.id),
                                className: "px-2 py-1 rounded-md border text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/30",
                                children: "End"
                            }, void 0, false, {
                                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                                lineNumber: 269,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
                lineNumber: 260,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
_s1(Row, "ni1gqmR31TyqtvPf9Wj6tFbIyJA=");
_c2 = Row;
function Th(param) {
    let { children, right } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        className: "px-3 py-2 ".concat(right ? "text-right" : "text-left", " text-neutral-700 dark:text-neutral-200"),
        children: children
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
        lineNumber: 281,
        columnNumber: 10
    }, this);
}
_c3 = Th;
function Td(param) {
    let { children, right, className = "" } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        className: "px-3 py-2 ".concat(right ? "text-right" : "", " ").concat(className),
        children: children
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
        lineNumber: 284,
        columnNumber: 10
    }, this);
}
_c4 = Td;
function EmptyRow(param) {
    let { text } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            colSpan: 5,
            className: "px-3 py-6 text-center text-neutral-500",
            children: text
        }, void 0, false, {
            fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
            lineNumber: 289,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx",
        lineNumber: 288,
        columnNumber: 5
    }, this);
}
_c5 = EmptyRow;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "ManageUserDepartmentsDialog");
__turbopack_context__.k.register(_c1, "Section");
__turbopack_context__.k.register(_c2, "Row");
__turbopack_context__.k.register(_c3, "Th");
__turbopack_context__.k.register(_c4, "Td");
__turbopack_context__.k.register(_c5, "EmptyRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(protected)/admin/users/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminUsersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/domains/auth/hooks/useAuth.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$components$2f$FiltersBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(protected)/admin/users/components/FiltersBar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$components$2f$UserForm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(protected)/admin/users/components/UserForm.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$components$2f$UsersTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(protected)/admin/users/components/UsersTable.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$ManageUserDepartmentsDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/(protected)/admin/users/ManageUserDepartmentsDialog.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const PAGE_SIZE = 20;
async function fetchUserDetail(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(id));
}
// helper: ตัดค่าว่างออกจาก payload
function n(v) {
    if (v === undefined || v === null) return undefined;
    if (typeof v === "string" && v.trim() === "") return undefined;
    return v;
}
function AdminUsersPage() {
    _s();
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const isAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasRole"])(user, "admin");
    const [roles, setRoles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [departments, setDepartments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [organizations, setOrganizations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [roleId, setRoleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [departmentId, setDepartmentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [includeDeleted, setIncludeDeleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [meta, setMeta] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        page: 1,
        pages: 1,
        total: 0
    });
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [deptOpen, setDeptOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deptUser, setDeptUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        id: null,
        email: "",
        name: "",
        firstNameTh: "",
        lastNameTh: "",
        firstNameEn: "",
        lastNameEn: "",
        roleId: "",
        departmentId: "",
        password: "",
        orgId: "",
        orgLabel: "",
        employeeCode: "",
        employeeType: "",
        contractType: "",
        gender: "",
        birthDate: "",
        startDate: "",
        probationEndDate: "",
        resignedAt: ""
    });
    const isEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminUsersPage.useMemo[isEditing]": ()=>form.id !== null
    }["AdminUsersPage.useMemo[isEditing]"], [
        form.id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminUsersPage.useEffect": ()=>{
            if (!loading && !isAdmin) {
            // TODO: redirect/guard ถ้าจำเป็น
            }
        }
    }["AdminUsersPage.useEffect"], [
        loading,
        isAdmin
    ]);
    async function loadRef() {
        try {
            const [r1, r2] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/roles?page=1&limit=999"),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/departments?page=1&limit=999")
            ]);
            setRoles((r1 === null || r1 === void 0 ? void 0 : r1.data) || []);
            setDepartments((r2 === null || r2 === void 0 ? void 0 : r2.data) || []);
        } catch (e) {}
        try {
            const r3 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/organizations?page=1&limit=999");
            setOrganizations((r3 === null || r3 === void 0 ? void 0 : r3.data) || []);
        } catch (e) {
            setOrganizations([]);
        }
    }
    async function load() {
        setBusy(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(PAGE_SIZE),
                sortBy: "id",
                sort: "asc"
            });
            if (q) params.set("q", q);
            if (roleId) params.set("roleId", roleId);
            if (departmentId) params.set("departmentId", departmentId);
            if (includeDeleted) params.set("includeDeleted", "1");
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users?".concat(params.toString()));
            setItems((res === null || res === void 0 ? void 0 : res.data) || []);
            setMeta((res === null || res === void 0 ? void 0 : res.meta) || {
                page: 1,
                pages: 1,
                total: 0
            });
            setError("");
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "โหลดข้อมูลไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminUsersPage.useEffect": ()=>{
            loadRef();
        }
    }["AdminUsersPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminUsersPage.useEffect": ()=>{
            load(); /* eslint-disable-next-line */ 
        }
    }["AdminUsersPage.useEffect"], [
        q,
        roleId,
        departmentId,
        includeDeleted,
        page
    ]);
    function resetForm() {
        setForm((s)=>{
            var _roles_find;
            return {
                ...s,
                id: null,
                email: "",
                name: "",
                firstNameTh: "",
                lastNameTh: "",
                firstNameEn: "",
                lastNameEn: "",
                roleId: ((_roles_find = roles.find((r)=>{
                    var _r_name;
                    return ((_r_name = r.name) === null || _r_name === void 0 ? void 0 : _r_name.toLowerCase()) === "user";
                })) === null || _roles_find === void 0 ? void 0 : _roles_find.id) || "",
                departmentId: "",
                password: "",
                orgId: "",
                orgLabel: "",
                employeeCode: "",
                employeeType: "",
                contractType: "",
                gender: "",
                birthDate: "",
                startDate: "",
                probationEndDate: "",
                resignedAt: ""
            };
        });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    // ✅ validate ขั้นต่ำ + sanitize payload
    function buildPayload() {
        const requiredMsg = [];
        if (!form.email) requiredMsg.push("อีเมล");
        if (!isEditing && (!form.password || form.password.length < 8)) requiredMsg.push("รหัสผ่าน (อย่างน้อย 8 ตัว)");
        if (!form.roleId) requiredMsg.push("Role");
        if (!form.departmentId) requiredMsg.push("Department");
        if (requiredMsg.length) {
            throw new Error("กรุณากรอก: ".concat(requiredMsg.join(", ")));
        }
        var _n, _n1, _n2, _n3, _n4, _n5, _n6, _n7;
        const payload = {
            email: form.email,
            name: n(form.name),
            firstNameTh: n(form.firstNameTh),
            lastNameTh: n(form.lastNameTh),
            firstNameEn: n(form.firstNameEn),
            lastNameEn: n(form.lastNameEn),
            roleId: Number(form.roleId),
            departmentId: Number(form.departmentId),
            orgId: n(form.orgId) ? Number(form.orgId) : undefined,
            employeeCode: (_n = n(form.employeeCode)) !== null && _n !== void 0 ? _n : null,
            employeeType: (_n1 = n(form.employeeType)) !== null && _n1 !== void 0 ? _n1 : null,
            contractType: (_n2 = n(form.contractType)) !== null && _n2 !== void 0 ? _n2 : null,
            gender: (_n3 = n(form.gender)) !== null && _n3 !== void 0 ? _n3 : null,
            birthDate: (_n4 = n(form.birthDate)) !== null && _n4 !== void 0 ? _n4 : null,
            startDate: (_n5 = n(form.startDate)) !== null && _n5 !== void 0 ? _n5 : null,
            probationEndDate: (_n6 = n(form.probationEndDate)) !== null && _n6 !== void 0 ? _n6 : null,
            resignedAt: (_n7 = n(form.resignedAt)) !== null && _n7 !== void 0 ? _n7 : null
        };
        if (!isEditing) {
            payload.password = form.password; // สร้างใหม่ต้องส่ง
        }
        return payload;
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setBusy(true);
        try {
            const payload = buildPayload();
            if (isEditing) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(form.id), {
                    method: "PATCH",
                    body: payload
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users", {
                    method: "POST",
                    body: payload
                });
            }
            resetForm();
            load();
        } catch (e2) {
            var _e2_data;
            setError((e2 === null || e2 === void 0 ? void 0 : (_e2_data = e2.data) === null || _e2_data === void 0 ? void 0 : _e2_data.error) || (e2 === null || e2 === void 0 ? void 0 : e2.message) || "บันทึกไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function handleEdit(u) {
        try {
            var _d_organization, _d_role, _d_primaryUserDept_department, _d_primaryUserDept;
            const detail = await fetchUserDetail(u.id);
            const d = (detail === null || detail === void 0 ? void 0 : detail.data) || u;
            const orgIdStr = ((_d_organization = d.organization) === null || _d_organization === void 0 ? void 0 : _d_organization.id) ? String(d.organization.id) : "";
            const orgLabel = d.organization ? "".concat(d.organization.code ? d.organization.code + " · " : "").concat(d.organization.nameTh || d.organization.nameEn || "Org#".concat(d.organization.id)) : "";
            setForm({
                id: d.id,
                email: d.email || "",
                name: d.name || "",
                firstNameTh: d.firstNameTh || "",
                lastNameTh: d.lastNameTh || "",
                firstNameEn: d.firstNameEn || "",
                lastNameEn: d.lastNameEn || "",
                roleId: ((_d_role = d.role) === null || _d_role === void 0 ? void 0 : _d_role.id) || "",
                departmentId: ((_d_primaryUserDept = d.primaryUserDept) === null || _d_primaryUserDept === void 0 ? void 0 : (_d_primaryUserDept_department = _d_primaryUserDept.department) === null || _d_primaryUserDept_department === void 0 ? void 0 : _d_primaryUserDept_department.id) || "",
                password: "",
                orgId: orgIdStr,
                orgLabel,
                employeeCode: d.employeeCode || "",
                employeeType: d.employeeType || "",
                contractType: d.contractType || "",
                gender: d.gender || "",
                birthDate: d.birthDate ? d.birthDate.substring(0, 10) : "",
                startDate: d.startDate ? d.startDate.substring(0, 10) : "",
                probationEndDate: d.probationEndDate ? d.probationEndDate.substring(0, 10) : "",
                resignedAt: d.resignedAt ? d.resignedAt.substring(0, 10) : ""
            });
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "โหลดรายละเอียดผู้ใช้ไม่สำเร็จ");
        }
    }
    async function handleToggleDelete(u) {
        let hard = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (hard ? !confirm("ลบถาวรผู้ใช้ ".concat(u.email, "?")) : !u.deletedAt && !confirm("ลบผู้ใช้ ".concat(u.email, "? (soft delete)"))) return;
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(u.id).concat(hard ? "?hard=1" : ""), {
                method: "DELETE"
            });
            load();
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "ทำรายการไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function handleRestore(u) {
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(u.id, "/restore"), {
                method: "POST"
            });
            load();
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "กู้คืนไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    async function handleResetPassword(u) {
        const newPassword = prompt("ตั้งรหัสผ่านใหม่ (อย่างน้อย 8 ตัว)");
        if (!newPassword) return;
        setBusy(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/users/".concat(u.id, "/reset-password"), {
                method: "POST",
                body: {
                    newPassword
                }
            });
            alert("รีเซ็ตรหัสผ่านแล้ว");
        } catch (e) {
            var _e_data;
            setError((e === null || e === void 0 ? void 0 : (_e_data = e.data) === null || _e_data === void 0 ? void 0 : _e_data.error) || (e === null || e === void 0 ? void 0 : e.message) || "รีเซ็ตรหัสผ่านไม่สำเร็จ");
        } finally{
            setBusy(false);
        }
    }
    function openManageDepts(u) {
        setDeptUser(u);
        setDeptOpen(true);
    }
    const filters = {
        q,
        setQ,
        roleId,
        setRoleId,
        departmentId,
        setDepartmentId,
        includeDeleted,
        setIncludeDeleted,
        onClear: ()=>{
            setQ("");
            setRoleId("");
            setDepartmentId("");
            setIncludeDeleted(false);
            setPage(1);
        }
    };
    // ✅ canSubmit สำหรับส่งให้ปุ่มในฟอร์ม
    const canSubmit = Boolean(form.email && (isEditing || form.password && form.password.length >= 8) && form.roleId && form.departmentId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100",
                    children: "Users"
                }, void 0, false, {
                    fileName: "[project]/app/(protected)/admin/users/page.jsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/page.jsx",
                lineNumber: 286,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$components$2f$FiltersBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                roles: roles,
                departments: departments,
                filters: filters
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/page.jsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-xl border dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-medium mb-3 text-neutral-800 dark:text-neutral-100",
                        children: isEditing ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/page.jsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$components$2f$UserForm$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        roles: roles,
                        departments: departments,
                        organizations: organizations,
                        form: form,
                        setForm: setForm,
                        isEditing: isEditing,
                        onSubmit: handleSubmit,
                        onCancel: resetForm,
                        canSubmit: canSubmit
                    }, void 0, false, {
                        fileName: "[project]/app/(protected)/admin/users/page.jsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(protected)/admin/users/page.jsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$components$2f$UsersTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                items: items,
                meta: meta,
                page: page,
                setPage: setPage,
                onEdit: handleEdit,
                onSoftDelete: (u)=>handleToggleDelete(u, false),
                onRestore: handleRestore,
                onHardDelete: (u)=>handleToggleDelete(u, true),
                onResetPassword: handleResetPassword,
                onManageDepts: openManageDepts
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/page.jsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$protected$292f$admin$2f$users$2f$ManageUserDepartmentsDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: deptOpen,
                onClose: ()=>setDeptOpen(false),
                user: deptUser,
                departments: departments,
                onChanged: ()=>load()
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/page.jsx",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            !!error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-rose-300 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800 p-3 text-sm text-rose-700 dark:text-rose-300",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/(protected)/admin/users/page.jsx",
                lineNumber: 329,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(protected)/admin/users/page.jsx",
        lineNumber: 285,
        columnNumber: 5
    }, this);
}
_s(AdminUsersPage, "+SNfBh+//4PubBx8HUYxUjgZE/k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$domains$2f$auth$2f$hooks$2f$useAuth$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AdminUsersPage;
var _c;
__turbopack_context__.k.register(_c, "AdminUsersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28protected%29_admin_users_450d91be._.js.map