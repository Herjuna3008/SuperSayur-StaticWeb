(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": ()=>connect,
    "setHooks": ()=>setHooks,
    "subscribeToUpdate": ()=>subscribeToUpdate
});
function connect(param) {
    let { addMessageListener, sendMessage, onUpdateError = console.error } = param;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: (param)=>{
            let [chunkPath, callback] = param;
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        var _updateA_modules;
        const deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        const addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        const added = new Set([
            ...(_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : [],
            ...(_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : []
        ]);
        var _updateA_deleted, _updateB_deleted;
        const deleted = new Set([
            ...(_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : [],
            ...(_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        const modules = new Set([
            ...(_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : [],
            ...(_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : []
        ]);
        var _updateB_deleted1;
        for (const moduleId of (_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/components/Navbar.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Navbar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const navLinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/company-profile",
        label: "Company Profile"
    },
    {
        href: "/faq",
        label: "FAQ"
    },
    {
        href: "/jangkauan-pengiriman",
        label: "Jangkauan"
    },
    {
        href: "/product",
        label: "Produk"
    },
    {
        href: "/terms",
        label: "Terms"
    },
    {
        href: "/contact",
        label: "Contact"
    }
];
function Navbar() {
    _s();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const checkWidth = {
                "Navbar.useEffect.checkWidth": ()=>setIsMobile(window.innerWidth < 900)
            }["Navbar.useEffect.checkWidth"];
            checkWidth();
            window.addEventListener("resize", checkWidth);
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener("resize", checkWidth)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-white flex justify-between items-center px-6 py-4 shadow-sm z-40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "https://ik.imagekit.io/hexocdn/Logo%20Super%20Sayur@300x.png?updatedAt=1753571167387",
                                alt: "Logo",
                                className: "h-10 w-auto"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "text-2xl font-bold tracking-tight text-green-700 whitespace-nowrap hover:text-green-600 transition-colors duration-200",
                                children: "SuperSayur"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/contact",
                        className: "bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-2 transition shadow",
                        children: "Whatsapp"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.js",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-50 bg-[#f6f6f0] border-b border-green-100 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4",
                        children: [
                            !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex justify-center gap-8 items-center h-16",
                                children: navLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "relative px-2 py-2 text-lg font-medium text-[#78826b] transition group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.js",
                                                lineNumber: 59,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute left-0 bottom-0 w-full h-1 bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Navbar.js",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.href, true, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 54,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center h-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            window.scrollBy({
                                                top: 200,
                                                left: 0,
                                                behavior: "smooth"
                                            });
                                            setMobileOpen((v)=>!v);
                                        },
                                        className: "text-3xl text-green-800",
                                        "aria-label": "Open Menu",
                                        children: mobileOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiX"], {}, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.js",
                                            lineNumber: 79,
                                            columnNumber: 31
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiMenu"], {}, void 0, false, {
                                            fileName: "[project]/src/components/Navbar.js",
                                            lineNumber: 79,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.js",
                                        lineNumber: 71,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Navbar.js",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed top-[72px] left-0 w-full bg-[#f6f6f0] shadow-lg z-50 transition-all duration-400 ease-in-out overflow-hidden\n              ".concat(mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0", "\n            "),
                        style: {
                            transitionProperty: "max-height,opacity"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex flex-col gap-3 px-8 py-4",
                            children: navLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "text-lg font-semibold text-[#78826b] px-2 py-3 rounded hover:bg-green-100 transition",
                                    onClick: ()=>setMobileOpen(false),
                                    children: item.label
                                }, item.href, false, {
                                    fileName: "[project]/src/components/Navbar.js",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.js",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.js",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.js",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Navbar, "Eyt50dwCUxHZludzzhRvVRxK+jM=");
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Footer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Footer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [client] (ecmascript)");
;
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative bg-white pt-10 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 bottom-0 h-full w-1/2 pointer-events-none grayscale",
                style: {
                    backgroundImage: "url('https://i.postimg.cc/sx6RRtK2/Layer-1-300x.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left bottom",
                    backgroundSize: "contain",
                    opacity: 0.2,
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Footer.js",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-12 md:gap-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-1 flex-col md:flex-row gap-10 md:gap-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 font-bold mb-3 tracking-widest",
                                        children: "ABOUT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 24,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/company-profile",
                                                    className: "hover:text-green-700",
                                                    children: "Company Profile"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 26,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 26,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/faq",
                                                    className: "hover:text-green-700",
                                                    children: "FAQ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 27,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 27,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/jangkauan-pengiriman",
                                                    className: "hover:text-green-700",
                                                    children: "Jangkauan Pengiriman"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 28,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 28,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/terms",
                                                    className: "hover:text-green-700",
                                                    children: "Terms & Conditions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 29,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 29,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/contact",
                                                    className: "hover:text-green-700",
                                                    children: "Contact"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 30,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 30,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 font-bold mb-3 tracking-widest",
                                        children: "BUSINESS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "mailto:info@pasarsegarsupplier.com",
                                                    className: "hover:text-green-700",
                                                    children: "Become a Partner"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 36,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 36,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/product",
                                                    className: "hover:text-green-700",
                                                    children: "Order in Bulk"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 37,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 37,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 font-bold mb-3 tracking-widest",
                                        children: "HELP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/faq",
                                                    className: "hover:text-green-700",
                                                    children: "Help Center"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 43,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 43,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/terms",
                                                    className: "hover:text-green-700",
                                                    children: "Terms & Conditions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 44,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 44,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/contact",
                                                    className: "hover:text-green-700",
                                                    children: "Privacy Policy"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 45,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 45,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 font-bold mb-3 tracking-widest",
                                        children: "FOLLOW US"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://facebook.com/",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                "aria-label": "Facebook",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaFacebook"], {
                                                    className: "w-6 h-6 text-blue-700 hover:text-green-900"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 52,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://instagram.com/",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                "aria-label": "Instagram",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaInstagram"], {
                                                    className: "w-6 h-6 text-pink-500 hover:text-pink-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 55,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 54,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://youtube.com/",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                "aria-label": "YouTube",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaYoutube"], {
                                                    className: "w-6 h-6 text-red-600 hover:text-red-700"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Footer.js",
                                                    lineNumber: 58,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Footer.js",
                                                lineNumber: 57,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer.js",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col items-start md:items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-bold text-green-600 mb-1",
                                children: "Belanja Segar Makin Mudah!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-gray-500 mb-4",
                                children: "Pesan sayur & daging dari mana saja, kapan saja."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/contact",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "inline-block bg-green-600 text-white px-7 py-3 rounded-full font-semibold shadow hover:bg-green-700 hover:scale-105 transition-transform text-lg mt-6",
                                    children: "Hubungi via WhatsApp"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Footer.js",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer.js",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer.js",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-500 text-gray-100 text-center text-sm py-4 mt-8 relative z-10",
                children: [
                    "© 2025 SuperSayur. All rights reserved.",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-green-100 opacity-80",
                        children: "Developed by SuperSayur Team"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer.js",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer.js",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ProductCard.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ProductCard
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function ProductCard(param) {
    let { product } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transform transition-transform hover:scale-105 duration-300 animate-fadeIn group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: product.image_url || "https://source.unsplash.com/400x300/?vegetable",
                    alt: product.name,
                    className: "h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductCard.js",
                    lineNumber: 5,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductCard.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-lg mb-1",
                        children: [
                            product.name,
                            " 1Kg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductCard.js",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.js",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductCard.js",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductCard.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/product.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Products
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Navbar.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const categories = [
    {
        key: "all",
        name: "Semua"
    },
    {
        key: "sayuran",
        name: "Sayur"
    },
    {
        key: "daging",
        name: "Daging"
    },
    {
        key: "seafood",
        name: "Seafood"
    }
];
function Products() {
    _s();
    const [allProducts, setAllProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            "id": 1,
            "name": "Brokoli",
            "category": "sayuran",
            "image_url": "https://cdn.pixabay.com/photo/2016/06/11/15/33/broccoli-1450274_640.png"
        },
        {
            "id": 2,
            "name": "Bayam",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2025/6/BabyBayamHydroponicAstroGoods200gram56372b12312b44349a3c79c76a52156a900x900removebgpreview_adc5fec5-007a-4aeb-90c8-4051c93cbb9b_900x900.png"
        },
        {
            "id": 3,
            "name": "Baby Pakcoy",
            "category": "sayuran",
            "image_url": "https://elementor.merkulov.design/wp-content/uploads/2021/10/product-1-768x559.png"
        },
        {
            "id": 4,
            "name": "Buncis",
            "category": "sayuran",
            "image_url": "https://images.finegardening.com/app/uploads/2019/10/27224302/25247-e1567103117482-700x361-700x361.png"
        },
        {
            "id": 5,
            "name": "Baby Buncis",
            "category": "sayuran",
            "image_url": "https://asset.kompas.com/crops/YVrgMwYNzcRdYhg_UG1MLe7m1oA=/0x32:500x365/1200x800/data/photo/2023/04/08/64310402284bd.jpg"
        },
        {
            "id": 6,
            "name": "Baby Kailan",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover12_cb35df8c-42da-4df9-9747-a57ff86415d7_900x900.png"
        },
        {
            "id": 7,
            "name": "Rawit Merah",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//102/MTA-10881389/hypermart_cabe-rawit-merah-100-gr_full01.jpg"
        },
        {
            "id": 8,
            "name": "Cabe Rawit Hijau",
            "category": "sayuran",
            "image_url": "https://asparindogrosir.com/uploads/product/1679904011.png"
        },
        {
            "id": 9,
            "name": "Cabe Merah Keriting",
            "category": "sayuran",
            "image_url": "https://i0.wp.com/raisa.aeonstore.id/wp-content/uploads/2023/04/805353.jpg?fit=800%2C800&ssl=1"
        },
        {
            "id": 10,
            "name": "Cabe Merah Besar",
            "category": "sayuran",
            "image_url": "https://cantina-canggu.com/cdn/shop/products/longchili_530x@2x.jpg?v=1593338464"
        },
        {
            "id": 11,
            "name": "Cabe Hijau Kriting",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/15_07_2022_01_54_32_cabe_hijau_keritingg.jpg"
        },
        {
            "id": 12,
            "name": "Cabe Hijau Besar",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/12/CabeHijauBesar21_6ab56069-d9cc-48c6-b757-21f28b254f95_900x900.jpg"
        },
        {
            "id": 13,
            "name": "Cabe Rawit Merah Blitar",
            "category": "sayuran",
            "image_url": "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/06/05/FotoJet-28-3224431605.jpg"
        },
        {
            "id": 14,
            "name": "Cabe Rawit Merah Blitar Petik",
            "category": "sayuran",
            "image_url": "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/8/21/107b72fd-a57c-43dd-9c60-dae7ae0e600c.jpg"
        },
        {
            "id": 15,
            "name": "Cabe Rawit Hijau Petik",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-44047166/no_brand_cabe_rawit_hijau_petik_250_gr_full01_nm8kskdi.jpg"
        },
        {
            "id": 16,
            "name": "Cahesim Pahit",
            "category": "sayuran",
            "image_url": "https://sayurbox-blog-stage.s3.amazonaws.com/uploads/2020/03/caisimm-org-1080.jpg"
        },
        {
            "id": 17,
            "name": "Cahesim",
            "category": "sayuran",
            "image_url": "https://allofresh.id/blog/wp-content/uploads/2023/03/caisim-adalah-scaled.jpg"
        },
        {
            "id": 18,
            "name": "Cuciwis",
            "category": "sayuran",
            "image_url": "https://images.tokopedia.net/img/cache/700/product-1/2020/4/1/71621648/71621648_ae91c898-8eb5-4038-a669-d3b625bd5f56_700_700"
        },
        {
            "id": 19,
            "name": "Celery Stick",
            "category": "sayuran",
            "image_url": "https://vivregourmet.com/wp-content/uploads/2020/07/Celery-Stick.png"
        },
        {
            "id": 20,
            "name": "Daun Wansui / Daun Ketumbar",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-50716774/oem_daun_wansui-_daun_ketumbar_segar_1_kg_full01_gcqjv4we.jpg"
        },
        {
            "id": 21,
            "name": "Daun Kemangi",
            "category": "sayuran",
            "image_url": "https://bnp.jambiprov.go.id/wp-content/uploads/2023/08/Manfaat-daun-kemangi.png"
        },
        {
            "id": 22,
            "name": "Daun Bawang",
            "category": "sayuran",
            "image_url": "https://drivethru.klikindomaret.com/tk30/wp-content/uploads/sites/33/2021/05/daun-bawang.jpg"
        },
        {
            "id": 23,
            "name": "Daun Pisang",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover114_100fc87d-21aa-4c83-a9fc-6896f0eff283_900x900.png"
        },
        {
            "id": 24,
            "name": "Daun Pepaya Jepang",
            "category": "sayuran",
            "image_url": "https://kecipir.id/cdn/shop/files/Daunpepayakebunsalampage1.jpg?v=1712291248"
        },
        {
            "id": 25,
            "name": "Daun Parsley",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//103/MTA-8498091/afcbandung_daun_parsley_peterseli_sayur_parseli_segar_100gr_full01_cuqw7ik5.jpg"
        },
        {
            "id": 26,
            "name": "Daun Pandan",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover46_f0ee7e7e-abe3-4103-aadb-8300beb5711f_900x900.png"
        },
        {
            "id": 27,
            "name": "Daun Mint",
            "category": "sayuran",
            "image_url": "https://puskesmasmeninting-dikes.lombokbaratkab.go.id/media/crop/2025/05/05/57-20250505-111814-883880.jpg"
        },
        {
            "id": 28,
            "name": "Daun Melinjo",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1613996169/attached_image/inilah-5-manfaat-daun-melinjo-untuk-kesehatan-tubuh.jpg"
        },
        {
            "id": 29,
            "name": "Daun Seledri",
            "category": "sayuran",
            "image_url": "https://desagrogol.gunungkidulkab.go.id/assets/files/dokumen/SELEDRI.jpg"
        },
        {
            "id": 30,
            "name": "Daun Singkong",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLo5dpZJWvdPsGbp0HVBB5MkOMOsKvJWi-9Q&s"
        },
        {
            "id": 31,
            "name": "Daun Kucai",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1606097410/attached_image/7-manfaat-kucai-yang-belum-banyak-diketahui.jpg"
        },
        {
            "id": 32,
            "name": "Horenso",
            "category": "sayuran",
            "image_url": "https://sayurbox-blog-stage.s3.amazonaws.com/uploads/2020/01/horenzo-org-500.jpg"
        },
        {
            "id": 33,
            "name": "Jeruk Nipis",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rhS7MHPP_r6kO07p05mVUUuR2mFEfFYC8Q&s"
        },
        {
            "id": 34,
            "name": "Jeruk Nipis Kuning",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/16_11_2020_03_20_28_JERUK_NIPIS_KUNING.jpg"
        },
        {
            "id": 35,
            "name": "Jagung Manis",
            "category": "sayuran",
            "image_url": "https://pasarsegar.co.id/wp-content/uploads/2020/06/jagungmanis.jpeg"
        },
        {
            "id": 36,
            "name": "Jagung Muda",
            "category": "sayuran",
            "image_url": "https://asset.kompas.com/crops/_Ui0WRQgp4qFbMUR13EUIovxywo=/100x98:900x632/1200x800/data/photo/2023/04/25/6447c89e49faa.jpg"
        },
        {
            "id": 37,
            "name": "Jagung Manis Kupas",
            "category": "sayuran",
            "image_url": "https://sosialita.tanahlautkab.go.id/assets/uploads/webp/fotoproduk/crop/PL1Frm8j20230330121521.jpeg.webp"
        },
        {
            "id": 38,
            "name": "Jamur Champingnon",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/100/MTA-162448291/no_brand_jamur_champignon_-_jamur_kancing_-_mushroom_champignon_full02_r5g1f543.jpg"
        },
        {
            "id": 39,
            "name": "Jamur Merang",
            "category": "sayuran",
            "image_url": "https://www.greeners.co/wp-content/uploads/2020/06/Jamur-Merang-Jamur-Pangan-Favorit-Bergizi-Tinggi-2.jpg"
        },
        {
            "id": 40,
            "name": "Jamur Kuping",
            "category": "sayuran",
            "image_url": "https://sufarm.id/storage/2022/09/Jamur-Kuping-Copy-2.png"
        },
        {
            "id": 41,
            "name": "Jengkol",
            "category": "sayuran",
            "image_url": "https://www.kebunindo.com/wp-content/uploads/2024/11/jengkol.webp"
        },
        {
            "id": 42,
            "name": "Jamur Shimeji",
            "category": "sayuran",
            "image_url": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/11/28091909/Ini-7-Manfaat-Jamur-Shimeji-yang-bagi-Kesehatan-dan-Cara-Mengolahnya.jpg.webp"
        },
        {
            "id": 43,
            "name": "Jeruk Limo",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//103/MTA-8395924/afcbandung_buah_jeruk_limau_jeruk_limo_untuk_sambal_500gr_full02_s32bpi7w.jpg"
        },
        {
            "id": 44,
            "name": "Jamur Shitake",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/Slide1CoverJamurShitake200gr_4ae1c99a-1fb8-4f3f-a397-2e0fe710998e_900x900.png"
        },
        {
            "id": 45,
            "name": "Jamur Tiram",
            "category": "sayuran",
            "image_url": "https://umsu.ac.id/health/wp-content/uploads/2024/03/Manfaat-Jamur-Tiram-yang-Tidak-Boleh-Dilewatkan.jpg"
        },
        {
            "id": 46,
            "name": "Kol",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1715673884/attached_image/kol-putih-ketahui-nutrisi-dan-6-manfaatnya.jpg"
        },
        {
            "id": 47,
            "name": "Kembang Kol",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//101/MTA-13595456/greenfresh_kembang_kol_-_bunga_kol_-500_gr-_full01_lkio86e1.jpg"
        },
        {
            "id": 48,
            "name": "Kol Ungu",
            "category": "sayuran",
            "image_url": "https://tribratanews.polri.go.id/web/image/blog.post/72963/image"
        },
        {
            "id": 49,
            "name": "Kangkung",
            "category": "sayuran",
            "image_url": "https://pasarsegar.co.id/wp-content/uploads/2021/02/kangkung.jpg"
        },
        {
            "id": 50,
            "name": "Kentang Rendang",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/08_12_2018_02_22_38_KENTANG_RENDANG.jpg"
        },
        {
            "id": 51,
            "name": "Kentang AB",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/07_12_2018_06_10_35_KENTANG_B.jpg"
        },
        {
            "id": 52,
            "name": "Kacang Tanah Kulit",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-38532612/none_kentang_full01_c11d1145.jpg"
        },
        {
            "id": 53,
            "name": "Kelapa Tua Utuh",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/13_02_2024_11_02_19_22_02_2022_09_59_03_kelapa_tua_utuh_kupas1.jpg"
        },
        {
            "id": 54,
            "name": "Kacang Panjang",
            "category": "sayuran",
            "image_url": "https://kecipir.com/cdn/shop/products/34bdf6212eda0204e2b8629e37764c02_ad14a6cb-b5d8-4a3c-ad1d-a124903215a2.jpg?v=1710923449"
        },
        {
            "id": 55,
            "name": "Kecipir",
            "category": "sayuran",
            "image_url": "https://umsu.ac.id/health/wp-content/uploads/2024/04/Kandungan-dan-Manfaat-Kecipir-Untuk-Kesehatan-Tubuh.jpg"
        },
        {
            "id": 56,
            "name": "Lobak",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1638863853/attached_image/manfaat-lobak-dari-obat-herba-hingga-menjadi-teman-diet.jpg"
        },
        {
            "id": 57,
            "name": "Leunca",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1716548564/attached_image/leunca-ini-kandungan-nutrisi-dan-manfaatnya-untuk-kesehatan.jpg"
        },
        {
            "id": 58,
            "name": "Labu Acar",
            "category": "sayuran",
            "image_url": "https://yoline.co.id/media/products/ProductLabusiamacar_kg.png"
        },
        {
            "id": 59,
            "name": "Labu",
            "category": "sayuran",
            "image_url": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2024/08/27055207/Ini-Manfaat-Labu-dan-Kandungan-Nutrisinya-yang-Melimpah.jpg.webp"
        },
        {
            "id": 60,
            "name": "Lettuce Romaine",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCS_jTmAlQlt4K-cjMd_5LRgRIzkSDVMd1fQ&s"
        },
        {
            "id": 61,
            "name": "Lettuce Head",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4su0JzKDDRf6SAd8N6dz0LJwfaionhh8o8Q&s"
        },
        {
            "id": 62,
            "name": "Melinjo",
            "category": "sayuran",
            "image_url": "https://cdn1-production-images-kly.akamaized.net/26Z9CiI4jlGByaN85TIkCBvf2-Y=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1456817/original/025426200_1483453209-Segudang-Manfaat-Kulit-Melinjo.jpg"
        },
        {
            "id": 63,
            "name": "Nangka",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//99/MTA-50857720/oem_sayur_nangka_muda_potong_segar_1-2_kg_-_500_gram_full01_djneb5r9.jpg"
        },
        {
            "id": 64,
            "name": "Oyong",
            "category": "sayuran",
            "image_url": "https://static.mooimom.id/media/mamapedia/h0ENc77Y--main-image.jpg"
        },
        {
            "id": 65,
            "name": "Okra",
            "category": "sayuran",
            "image_url": "https://cdn.britannica.com/60/157660-050-99656755/Okra-fruits-section.jpg"
        },
        {
            "id": 66,
            "name": "Paprika Kuning",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover38_853bf83c-05e5-4d90-89ec-9621c068de5c_900x900.png"
        },
        {
            "id": 67,
            "name": "Paprika Merah",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkK1PxY6uoB3kHupflaS9QI4b9CVN29TRGQ&s"
        },
        {
            "id": 68,
            "name": "Paprika Hijau",
            "category": "sayuran",
            "image_url": "https://raisa.aeonstore.id/wp-content/uploads/2023/04/806718.jpg"
        },
        {
            "id": 69,
            "name": "Pare",
            "category": "sayuran",
            "image_url": "https://ners.unair.ac.id/site/images/Lihat/manfaat-pare.png"
        },
        {
            "id": 70,
            "name": "Pakchoy",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-52415950/no-brand_sayur-pakcoy-besar-200gr-ikat_full01.jpg"
        },
        {
            "id": 71,
            "name": "Pepaya Sayur",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-3095967/cari_sayur_cari_sayur_-_pepaya_sayur_-0-9_-_1-1_kg-_full01_hq4d1lkb.jpeg"
        },
        {
            "id": 72,
            "name": "Pucuk Labu",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS217FxK0LniYQHndbdbW5CLAk_do0ODmjy3g&s"
        },
        {
            "id": 73,
            "name": "Sawi Putih",
            "category": "sayuran",
            "image_url": "https://allofresh.id/blog/wp-content/uploads/2023/04/manfaat-sawi-putih-4.jpg"
        },
        {
            "id": 74,
            "name": "Siomak",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-35757114/dunia_sayur_online_siomak_250_gram_full01_h7cy4py4.jpg"
        },
        {
            "id": 75,
            "name": "Selada",
            "category": "sayuran",
            "image_url": "https://manfaat.co.id/wp-content/uploads/2015/04/manfaat-selada-air.jpg"
        },
        {
            "id": 76,
            "name": "Selada Air",
            "category": "sayuran",
            "image_url": "https://awsimages.detik.net.id/community/media/visual/2022/01/02/resep-tumis-selada-air-bumbu-ulek_169.jpeg?w=600&q=90"
        },
        {
            "id": 77,
            "name": "Tomat",
            "category": "sayuran",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg"
        },
        {
            "id": 78,
            "name": "Tomat Cherry",
            "category": "sayuran",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZjRuhlVNh_ZjVVtYZPK5DZzjk1LI4iOOGoA&s"
        },
        {
            "id": 79,
            "name": "Tomat Hijau",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-8205248/afcbandung_sayur_tomat_hijau_segar_tomat_ijo_500gr_full01_ojyq5sy3.jpg"
        },
        {
            "id": 80,
            "name": "Timun Kyuri",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/5/1Cover68_0fcd8d66-6e3e-4af9-a02d-09625a758f5e_900x900.png"
        },
        {
            "id": 81,
            "name": "Timun Acar",
            "category": "sayuran",
            "image_url": "https://image.astronauts.cloud/product-images/2024/12/timun_bcddcfd5-dd5f-4e27-9931-e421dd7a5bf1_900x897.jpg"
        },
        {
            "id": 82,
            "name": "Terong Hijau",
            "category": "sayuran",
            "image_url": "https://pasarsegar.co.id/wp-content/uploads/2022/01/251.jpg"
        },
        {
            "id": 83,
            "name": "Terong",
            "category": "sayuran",
            "image_url": "https://harianmuba.bacakoran.co/upload/8b4d53001aa50ed604332a840c56e169.jpg"
        },
        {
            "id": 84,
            "name": "Timun SP",
            "category": "sayuran",
            "image_url": "https://cdn.ralali.id/assets/img/Libraries/DESTRA-AGRO-Timun-SP-1-Kg_CzXTsOJ6seCnFCRh_1583239194.jpg"
        },
        {
            "id": 85,
            "name": "Wortel Brastagi",
            "category": "sayuran",
            "image_url": "https://lapakbuah.com/wp-content/uploads/2021/10/wortel.jpg"
        },
        {
            "id": 86,
            "name": "Wortel Lokal",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//97/MTA-11885281/dunia_sayur_online_wortel_lokal_250_gram_full01_j4szms2y.jpg"
        },
        {
            "id": 87,
            "name": "Zukini",
            "category": "sayuran",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//98/MTA-26592046/dunia_sayur_online_labu_zukini_-_zucchini_-_cukini_250_gram_full01_pdsvrdin.jpg"
        },
        {
            "id": 88,
            "name": "Bunga Lawang",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/07_01_2022_05_29_24_09_03_2020_02_25_51_bunga_lawang_cs.jpg"
        },
        {
            "id": 89,
            "name": "Buah Asam",
            "category": "sayuran",
            "image_url": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1638927245/attached_image/manfaat-asam-jawa-tidak-seasam-rasanya.jpg"
        },
        {
            "id": 90,
            "name": "Cabe Kering",
            "category": "sayuran",
            "image_url": "https://d27xm72ryhvga.cloudfront.net/product/21_02_2022_11_35_12_cabe_merah_besar_kering.jpg"
        },
        {
            "id": 91,
            "name": "Cengkeh",
            "category": "sayuran",
            "image_url": "https://klikpositif.com/wp-content/uploads/2022/01/Bukan-Sekadar-Bumbu-Masak-Ini-Manfaat-Cengkeh-Bagi-Kesehatan-KlikPositif-221021014315.jpeg"
        },
        {
            "id": 92,
            "name": "Daun Jeruk",
            "category": "sayuran",
            "image_url": "https://sumateraekspres.bacakoran.co/upload/4a3d5912b7658f4b132943b8d8161af9.jpeg"
        },
        {
            "id": 93,
            "name": "Daun Salam",
            "category": "sayuran",
            "image_url": "https://dash.naturalfarm.id/uploads/article/manfaat-daun-salam-untuk-kesehatan-dan-kelezatan-kuliner-55-1700407116.jpeg"
        },
        {
            "id": 94,
            "name": "Ebi",
            "category": "sayuran",
            "image_url": "https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/04/Ebi.jpg?fit=600%2C390&ssl=1"
        },
        {
            "id": 95,
            "name": "Jinten",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img249.jpg"
        },
        {
            "id": 96,
            "name": "Jahe Merah",
            "category": "sayuran",
            "image_url": "https://desagrogol.gunungkidulkab.go.id/assets/files/artikel/sedang_1724401632JAHE%20MERAH.jpg"
        },
        {
            "id": 97,
            "name": "Jahe",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img257.jpg"
        },
        {
            "id": 100,
            "name": "Keluwek",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img263.jpg"
        },
        {
            "id": 101,
            "name": "Ketumbar",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img265.jpg"
        },
        {
            "id": 102,
            "name": "Kencur",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img267.jpg"
        },
        {
            "id": 103,
            "name": "Kemiri Pecah",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img269.jpg"
        },
        {
            "id": 104,
            "name": "Kemiri",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img271.jpg"
        },
        {
            "id": 105,
            "name": "Kayu Manis",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img273.jpg"
        },
        {
            "id": 106,
            "name": "Kunyit",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img275.jpg"
        },
        {
            "id": 107,
            "name": "Lengkuas",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img277.jpg"
        },
        {
            "id": 108,
            "name": "Lada",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 109,
            "name": "Sereh",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 110,
            "name": "Temukunci",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 111,
            "name": "Temulawak",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img279.jpg"
        },
        {
            "id": 112,
            "name": "Bawang Putih",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img290.jpg"
        },
        {
            "id": 113,
            "name": "Bawang Putih Kupas",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img292.jpg"
        },
        {
            "id": 114,
            "name": "Bawang Putih Kating",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img294.jpg"
        },
        {
            "id": 115,
            "name": "Bawang Putih Iris",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img296.jpg"
        },
        {
            "id": 116,
            "name": "Bawang Merah",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img298.jpg"
        },
        {
            "id": 117,
            "name": "Bawang Merah Super",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img300.jpg"
        },
        {
            "id": 118,
            "name": "Bawang Merah Kupas",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img302.jpg"
        },
        {
            "id": 119,
            "name": "Bawang Merah Iris",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img304.jpg"
        },
        {
            "id": 120,
            "name": "Bawang Bombay",
            "category": "sayuran",
            "image_url": "https://berkahsegar.com/assets/images/shop/img306.jpg"
        },
        {
            "id": 121,
            "name": "Dada fillet",
            "category": "daging",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//96/MTA-12077942/afcbandung_daging_ayam_fillet_dada_ayam_500gr_filet_dada_ayam_boneless_500gr_full01_h80zkn14.jpg"
        },
        {
            "id": 122,
            "name": "Paha fillet",
            "category": "daging",
            "image_url": "https://image.astronauts.cloud/product-images/2025/4/pahabonelessayamorganik250gr01_d8950d05-8f23-4962-a83f-c2c6f42704bd_900x900.jpg"
        },
        {
            "id": 123,
            "name": "Paha utuh",
            "category": "daging",
            "image_url": "https://www.sinarpahalautama.com/image-product/img25-1571205581.jpg"
        },
        {
            "id": 124,
            "name": "Ceker",
            "category": "daging",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-RQCS0WXMRqH8R8Als37GmyzoPN5byRThQ&s"
        },
        {
            "id": 125,
            "name": "Sayap",
            "category": "daging",
            "image_url": "https://awsimages.detik.net.id/community/media/visual/2021/09/19/resep-sayap-ayam-panggang-bumbu-kecap-pedas_43.jpeg?w=480"
        },
        {
            "id": 126,
            "name": "Paha kulit",
            "category": "daging",
            "image_url": "https://nindyautama.com/wp-content/uploads/2019/01/fillet-paha-ayam-kulit.webp"
        },
        {
            "id": 127,
            "name": "Trimingan",
            "category": "daging",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDj-25Pnaw_S3ziGvvKv8MssRrfe0wBbpWUg&s"
        },
        {
            "id": 128,
            "name": "Paha bawah",
            "category": "daging",
            "image_url": "https://www.sinarpahalautama.com/image-product/img28-1571220116.jpg"
        },
        {
            "id": 129,
            "name": "Leher",
            "category": "daging",
            "image_url": "https://harumikitchen.com/cdn/shop/files/neck-01.png?v=1748919563"
        },
        {
            "id": 130,
            "name": "Kerongkongan",
            "category": "daging",
            "image_url": "https://yubissayur.com/wp-content/uploads/2020/09/ayam-kerongkongan.jpg"
        },
        {
            "id": 131,
            "name": "Udang Vaname",
            "category": "seafood",
            "image_url": "https://webicdn.com/sdirmember/27/26283/produk/26283_product_1505121550.jpg"
        },
        {
            "id": 132,
            "name": "Cumi Utuh / Cumi Fillet",
            "category": "seafood",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeH6CCqThyO_nDEk4TamlTQKoMgv_oIBho9Q&s"
        },
        {
            "id": 133,
            "name": "Kepiting Soka",
            "category": "seafood",
            "image_url": "https://trubus.id/wp-content/uploads/2023/01/Menghasilkan-Kepiting-Berkualitas-dengan-Budidaya-yang-Tepat.jpg"
        },
        {
            "id": 134,
            "name": "Fillet Ikan Kakap",
            "category": "seafood",
            "image_url": "https://image.astronauts.cloud/product-images/2025/6/IkanKakapMerahFillet132838cf6cd4243ed8cfa92d7d5df815d900x900removebgpreview_0df4be63-ecad-49de-a4cb-374edc20f2dc_900x900.png"
        },
        {
            "id": 135,
            "name": "Fillet Ikan Dori",
            "category": "seafood",
            "image_url": "https://cvmamora.com/wp-content/uploads/2017/12/Dori-Fillet-3.jpg"
        },
        {
            "id": 136,
            "name": "Ikan Tuna (loin/fillet)",
            "category": "seafood",
            "image_url": "https://cvmamora.com/wp-content/uploads/2021/01/Loin-Tuna.jpg"
        },
        {
            "id": 137,
            "name": "Bandeng / Ikan Bandeng",
            "category": "seafood",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9KXhPA_43xSGkU9JkxXf3WHg_jb9RC4A1g&s"
        },
        {
            "id": 138,
            "name": "Scallop / Kerang",
            "category": "seafood",
            "image_url": "https://www.thoughtco.com/thmb/WcDZOJXyz_3oXv64g6IGl5izvGc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Scallop-showing-adductor-muscle-Ryoji-Yoshimoto-Aflo-getty-56a5f80e5f9b58b7d0df5201.jpg"
        },
        {
            "id": 139,
            "name": "Kerang Mussel / Kerang Laut",
            "category": "seafood",
            "image_url": "https://id.fisheryfood.com/uploads/202029232/frozen-mussel47176915048.jpg"
        }
    ]);
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const validCategoryKeys = categories.map((cat)=>cat.key);
    // Sync state dengan hash di URL
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Products.useEffect": ()=>{
            function syncCategoryWithHash() {
                // Ambil hash (tanpa #)
                let hash = (window.location.hash || "").replace("#", "");
                if (!hash) hash = "all";
                if (!validCategoryKeys.includes(hash)) {
                    // Jika gak valid fallback ke all & update URL
                    window.location.hash = "all";
                    setCategory("all");
                } else {
                    setCategory(hash);
                }
            }
            // Jalankan sekali saat mount (initial load)
            syncCategoryWithHash();
            // Jalankan setiap hash berubah
            window.addEventListener("hashchange", syncCategoryWithHash);
            // Cleanup
            return ({
                "Products.useEffect": ()=>window.removeEventListener("hashchange", syncCategoryWithHash)
            })["Products.useEffect"];
        }
    }["Products.useEffect"], []);
    // Saat klik kategori, update hash (dan otomatis update state lewat useEffect)
    function handleCategoryClick(catKey) {
        window.location.hash = catKey;
    // Jangan setCategory langsung, biar useEffect yang handle (biar selalu sync)
    }
    // Filter produk by kategori dan pencarian
    const filteredProducts = allProducts.filter((prod)=>{
        const matchCategory = category === "all" || prod.category === category;
        const matchSearch = prod.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "Daftar Produk | SuperSayur"
                }, void 0, false, {
                    fileName: "[project]/src/pages/product.js",
                    lineNumber: 888,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 887,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 890,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen bg-gray-50 pb-20 animate-fadeIn",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "max-w-6xl mx-auto px-4 py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center",
                            children: "Daftar Produk"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 893,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-center justify-between gap-4 mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleCategoryClick(cat.key),
                                            className: "px-5 py-2 rounded-full font-medium border transition\n                    ".concat(category === cat.key ? "bg-green-600 text-white shadow" : "bg-white text-green-700 border-green-200 hover:bg-green-100"),
                                            children: cat.name
                                        }, cat.key, false, {
                                            fileName: "[project]/src/pages/product.js",
                                            lineNumber: 898,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/product.js",
                                    lineNumber: 896,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Cari produk…",
                                    className: "border border-green-300 rounded-full px-5 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition",
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/product.js",
                                    lineNumber: 910,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 895,
                            columnNumber: 11
                        }, this),
                        filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-16 text-center text-gray-400 text-lg",
                            children: "Produk tidak ditemukan."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 920,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                            children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    product: product
                                }, product.id, false, {
                                    fileName: "[project]/src/pages/product.js",
                                    lineNumber: 924,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 922,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-16 text-center text-black font-semibold",
                            children: "Hubungi Admin untuk melihat produk secara lengkap."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/product.js",
                            lineNumber: 928,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/product.js",
                    lineNumber: 892,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 891,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/product.js",
                lineNumber: 931,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Products, "+JO4AN55HK6wvZqNDWRZ7aO8ukk=");
_c = Products;
var _c;
__turbopack_context__.k.register(_c, "Products");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/product.js [client] (ecmascript)\" } [client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/product";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/product.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/product\" }": ((__turbopack_context__) => {
"use strict";

var { m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/product.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8c33a117._.js.map