(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useDebounceValue.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDebounceValue",
    ()=>useDebounceValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useDebounceValue(value) {
    let delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 300;
    _s();
    const [v, setV] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebounceValue.useEffect": ()=>{
            const id = setTimeout({
                "useDebounceValue.useEffect.id": ()=>setV(value)
            }["useDebounceValue.useEffect.id"], delay);
            return ({
                "useDebounceValue.useEffect": ()=>clearTimeout(id)
            })["useDebounceValue.useEffect"];
        }
    }["useDebounceValue.useEffect"], [
        value,
        delay
    ]);
    return v;
}
_s(useDebounceValue, "+XKCVDzd8rrunExeVW+YMgDw4yY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useDepartments.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDepartments",
    ()=>useDepartments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounceValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDebounceValue.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useDepartments() {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const qDebounced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounceValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounceValue"])(q, 250);
    const fetchList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDepartments.useCallback[fetchList]": async ()=>{
            setLoading(true);
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/departments?q=".concat(encodeURIComponent(qDebounced), "&page=1&limit=200&sortBy=id&sort=asc"));
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
    }["useDepartments.useCallback[fetchList]"], [
        qDebounced
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDepartments.useEffect": ()=>{
            fetchList();
        }
    }["useDepartments.useEffect"], [
        fetchList
    ]);
    const reload = fetchList;
    const upsert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDepartments.useCallback[upsert]": async (payload)=>{
            var _payload_id;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/departments", {
                method: "POST",
                body: {
                    id: (_payload_id = payload.id) !== null && _payload_id !== void 0 ? _payload_id : null,
                    ...payload
                }
            });
            await reload();
        }
    }["useDepartments.useCallback[upsert]"], [
        reload
    ]);
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDepartments.useCallback[remove]": async (id)=>{
            if (!confirm("ลบรายการนี้?")) return;
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/departments/".concat(id), {
                method: "DELETE"
            });
            await reload();
        }
    }["useDepartments.useCallback[remove]"], [
        reload
    ]);
    return {
        items,
        loading,
        error,
        q,
        setQ,
        reload,
        upsert,
        remove
    };
}
_s(useDepartments, "xnNwYdKqf1HumNaKD+9ETAzfUOE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebounceValue$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounceValue"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=hooks_c160c306._.js.map