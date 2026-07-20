import React, { useRef, forwardRef, useState, useEffect, useLayoutEffect, useMemo, Children } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { AFColumn } from "./AFColumn";

// 컬럼 순서 저장/복원 (컬럼 순서만 로컬스토리지 사용; 스크롤은 메모리 전용)
function getColumnOrderStorageKey(fieldsKey) {
    return `afDataTableColumnOrder_${fieldsKey}`;
}

// 활성 탭 내 마운트된 표들이 자신의 키를 등록/해제하기 위한 유틸
function registerActiveKey(storageKey) {
    if (!storageKey) return;
    if (!window.__AF_ACTIVE_KEYS) window.__AF_ACTIVE_KEYS = new Set();
    window.__AF_ACTIVE_KEYS.add(storageKey);
}

function unregisterActiveKey(storageKey) {
    if (window.__AF_ACTIVE_KEYS) window.__AF_ACTIVE_KEYS.delete(storageKey);
}

const AFDataTableBase = forwardRef(function AFDataTable(props, ref) {
    const disableSort = props.disableSort ?? false;
    const keyboardNavigation = props.keyboardNavigation ?? true;
    const rememberScroll = props.rememberScroll ?? true; // 스크롤 위치 기억(메모리) 기본 ON
    const freezeColumnWidthOnScroll = props.freezeColumnWidthOnScroll ?? true;
    const totalRowCount = Array.isArray(props.value) ? props.value.length : 0;
    const autoUseVirtualScroller = props.autoUseVirtualScroller ?? true;
    const autoVirtualScrollerThreshold = props.autoVirtualScrollerThreshold ?? 500;
    const shouldAutoUseVirtualScroller =
        autoUseVirtualScroller &&
        props.useVirtualScroller === undefined &&
        props.virtualScrollerOptions === undefined &&
        totalRowCount >= autoVirtualScrollerThreshold;
    const useVirtualScroller =
        props.useVirtualScroller !== undefined
            ? props.useVirtualScroller
            : props.virtualScrollerOptions !== undefined || shouldAutoUseVirtualScroller;
    const mergedTableStyle = { width: "100%", ...(props.style || {}) };
    const mergedInnerTableStyle = { ...(props.tableStyle || {}) };
    const resolvedVirtualScrollerOptions = useVirtualScroller
        ? props.virtualScrollerOptions ?? { itemSize: 20 }
        : undefined;

    function normalizeColumnWidth(widthValue) {
        const numericWidth = Number.parseFloat(String(widthValue ?? ""));
        if (!Number.isFinite(numericWidth) || numericWidth <= 0) return "30px";
        return `${Math.max(30, Math.round(numericWidth))}px`;
    }

    const [sortField, setSortField] = useState(props.sortField || null);
    const [sortOrder, setSortOrder] = useState(props.sortOrder || 1);
    const sortFieldRef = useRef(props.sortField || null);
    const sortOrderRef = useRef(props.sortOrder || 1);
    const suppressRowSelectionRef = useRef(false);
    const checkboxAnchorKeyRef = useRef(null);
    const checkboxClickedKeyRef = useRef(null);
    const checkboxShiftPressedRef = useRef(false);
    const checkboxClickOriginRef = useRef(false);
    const [isFindDialogVisible, setIsFindDialogVisible] = useState(false);
    const [findKeyword, setFindKeyword] = useState("");
    const [findResults, setFindResults] = useState([]);
    const [currentFindResultIndex, setCurrentFindResultIndex] = useState(-1);
    const lastExecutedFindKeywordRef = useRef("");

    const effSortField = props.sortField !== undefined ? props.sortField : sortField;
    const effSortOrder = props.sortOrder !== undefined ? props.sortOrder : sortOrder;
    const resolvedCompareSelectionBy =
        props.compareSelectionBy ??
        (props.selectionMode === "checkbox" && props.dataKey ? "equals" : undefined);

    const dtRef = useRef(null);
    const toastRef = useRef(null);
    const findDialogRef = useRef(null);
    const onSelectionChangeRef = useRef(props.onSelectionChange);
    const onRowSelectRef = useRef(props.onRowSelect);
    const onRowUnselectRef = useRef(props.onRowUnselect);
    const onRowClickRef = useRef(props.onRowClick);
    const onSortRef = useRef(props.onSort);

    useEffect(() => {
        onSelectionChangeRef.current = props.onSelectionChange;
    }, [props.onSelectionChange]);

    useEffect(() => {
        onRowSelectRef.current = props.onRowSelect;
    }, [props.onRowSelect]);

    useEffect(() => {
        onRowUnselectRef.current = props.onRowUnselect;
    }, [props.onRowUnselect]);

    useEffect(() => {
        onRowClickRef.current = props.onRowClick;
    }, [props.onRowClick]);

    useEffect(() => {
        onSortRef.current = props.onSort;
    }, [props.onSort]);

    function focusFindInput() {
        const attemptFocus = () => {
            const input = findDialogRef.current?.querySelector("input");
            if (!input?.focus) return false;

            input.focus({ preventScroll: true });
            if (typeof input.select === "function") input.select();
            return true;
        };

        requestAnimationFrame(() => {
            if (attemptFocus()) return;
            setTimeout(() => {
                requestAnimationFrame(() => {
                    attemptFocus();
                });
            }, 0);
        });
    }

    function getStableColumnKey(child, idx) {
        const explicitColumnKey = child?.props?.columnKey;
        if (explicitColumnKey !== null && explicitColumnKey !== undefined && explicitColumnKey !== "") {
            return String(explicitColumnKey);
        }

        const field = child?.props?.field;
        if (field !== null && field !== undefined && field !== "") return String(field);

        const header = child?.props?.header;
        if (typeof header === "string" || typeof header === "number") return `header:${String(header)}`;

        return `col:${idx}`;
    }

    const { childrenArr, lastIndex, validColumnIds, validColumnIdSet, idToChildMap, fieldToIdMap, checkboxColumnId } =
        useMemo(() => {
            const localChildrenArr = Children.toArray(props.children);
            const localLastIndex = localChildrenArr.length - 1;
            const afChildren = localChildrenArr.filter((c) => c?.type === AFColumn);

            const rawColumnIds = afChildren.map((child, idx) => getStableColumnKey(child, idx));
            const idCountMap = new Map();
            const localValidColumnIds = rawColumnIds.map((id) => {
                const nextCount = (idCountMap.get(id) || 0) + 1;
                idCountMap.set(id, nextCount);
                return nextCount === 1 ? id : `${id}__dup${nextCount}`;
            });

            const localValidColumnIdSet = new Set(localValidColumnIds);
            const localIdToChildMap = new Map(localValidColumnIds.map((id, idx) => [id, afChildren[idx]]));
            const localFieldToIdMap = new Map();
            afChildren.forEach((child, idx) => {
                const field = child?.props?.field;
                if (field !== null && field !== undefined && field !== "") {
                    localFieldToIdMap.set(field, localValidColumnIds[idx]);
                }
            });

            return {
                childrenArr: localChildrenArr,
                lastIndex: localLastIndex,
                validColumnIds: localValidColumnIds,
                validColumnIdSet: localValidColumnIdSet,
                idToChildMap: localIdToChildMap,
                fieldToIdMap: localFieldToIdMap,
                checkboxColumnId: localFieldToIdMap.get("__checkbox__"),
            };
        }, [props.children]);

    const orderKey = validColumnIds.join("|");
    const storageKey = getColumnOrderStorageKey(orderKey);

    const [columnOrderIds, setColumnOrderIds] = useState(validColumnIds);
    const [lockedWidthById, setLockedWidthById] = useState({});
    const hasCapturedInitialWidthsRef = useRef(false);

    // 컬럼 폭이 아직 측정되지 않은 동안은 "auto"로 두어 브라우저가 내용에 맞게 컬럼 폭을 결정하게 함;
    // 측정이 끝나면 "fixed"로 전환해 폭을 고정.
    const autoFitTableLayout =
        freezeColumnWidthOnScroll && Object.keys(lockedWidthById).length === 0 ? "auto" : "fixed";
    const resolvedInnerTableStyle = { tableLayout: autoFitTableLayout, ...mergedInnerTableStyle };

    function sanitizeOrderedIds(ids) {
        const seen = new Set();
        const filtered = (Array.isArray(ids) ? ids : [])
            .filter((id) => id !== null && id !== undefined && validColumnIdSet.has(id))
            .filter((id) => {
                if (seen.has(id)) return false;
                seen.add(id);
                return true;
            });

        // 체크박스 컬럼은 항상 첫 위치로 고정
        if (checkboxColumnId && validColumnIdSet.has(checkboxColumnId)) {
            const withoutCheckbox = filtered.filter((id) => id !== checkboxColumnId);
            return [checkboxColumnId, ...withoutCheckbox];
        }

        return filtered;
    }

    function getOrderedIds(orderedIds) {
        const normalized = sanitizeOrderedIds(orderedIds);

        // 누락된 컬럼은 현재 순서를 따라 뒤에 보강
        const baseIdOrder = columnOrderIds.length > 0 ? sanitizeOrderedIds(columnOrderIds) : validColumnIds;
        const fullIdOrder = [...normalized, ...baseIdOrder.filter((id) => !normalized.includes(id))];

        return fullIdOrder;
    }

    function handleColumnResizeEnd(e) {
        const resizedColumnId =
            e?.column?.props?.columnKey ||
            e?.column?.props?.field ||
            e?.column?.props?.header;

        if (!resizedColumnId) return;

        const nextWidth = normalizeColumnWidth(e?.element?.getBoundingClientRect?.().width);
        setLockedWidthById((current) => ({
            ...current,
            [String(resizedColumnId)]: nextWidth,
        }));
    }

    useEffect(() => {
        hasCapturedInitialWidthsRef.current = false;
        setLockedWidthById({});
    }, [orderKey]);

    // 데이터가 바뀔 때마다 컬럼 폭을 내용에 맞게 자동 재측정
    useEffect(() => {
        hasCapturedInitialWidthsRef.current = false;
        setLockedWidthById({});
    }, [props.value]);

    useEffect(() => {
        registerActiveKey(storageKey);
        return () => unregisterActiveKey(storageKey);
    }, [storageKey]);

    // === 스크롤 저장/복원 (메모리 전용) ===
    const scrollElRef = useRef(null); // 스크롤 엘리먼트 캐시
    const savedScrollTopRef = useRef(0); // 직전 scrollTop
    const savedScrollHeightRef = useRef(0); // 직전 컨텐츠 총 높이(스크롤 높이)
    const spacerElRef = useRef(null); // 빈 배열일 때 추가하는 spacer
    const rafLockRef = useRef(false); // rAF 스로틀용

    // 스크롤 엘리먼트 찾기 (가상 스크롤 > 일반 스크롤)
    function getScrollElement() {
        const container = dtRef.current?.container || dtRef.current?.getElement?.();
        if (!container) return null;

        let el = container.querySelector(".p-virtualscroller");
        if (el) return el;

        el = container.querySelector(".p-datatable-wrapper");
        if (el) return el;

        el = container.querySelector('[style*="overflow"]');
        return el || null;
    }

    function ensureSpacer(el) {
        if (!spacerElRef.current) {
            const d = document.createElement("div");
            d.className = "af-scroll-spacer";
            d.style.width = "1px";
            d.style.visibility = "hidden";
            d.style.pointerEvents = "none";
            el.appendChild(d);
            spacerElRef.current = d;
        }
        return spacerElRef.current;
    }

    function removeSpacer() {
        const el = scrollElRef.current;
        const sp = spacerElRef.current;
        if (el && sp && sp.parentNode === el) {
            el.removeChild(sp);
        }
        spacerElRef.current = null;
    }

    // 마운트 시 스크롤 이벤트 바인딩 (메모리에만 저장)
    useLayoutEffect(() => {
        if (!rememberScroll) return;

        const el = getScrollElement();
        scrollElRef.current = el;
        if (!el) return;

        savedScrollTopRef.current = el.scrollTop || 0;
        savedScrollHeightRef.current = el.scrollHeight || 0;

        const onScroll = () => {
            if (rafLockRef.current) return;
            rafLockRef.current = true;
            requestAnimationFrame(() => {
                rafLockRef.current = false;
                if (!scrollElRef.current) return;
                const el2 = scrollElRef.current;
                savedScrollTopRef.current = el2.scrollTop || 0;
                const h = el2.scrollHeight || 0;
                if (h > savedScrollHeightRef.current) {
                    savedScrollHeightRef.current = h;
                }
            });
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            el.removeEventListener("scroll", onScroll);
            if (scrollElRef.current === el) scrollElRef.current = null;
            removeSpacer();
        };
    }, [rememberScroll]);

    useEffect(() => {
        registerActiveKey(storageKey);
        return () => unregisterActiveKey(storageKey);
    }, [storageKey]);

    // 저장된 컬럼 순서 반영
    useEffect(() => {
        const localChildren = Children.toArray(props.children).filter((c) => c?.type === AFColumn);
        const localRawColumnIds = localChildren.map((child, idx) => getStableColumnKey(child, idx));
        const localIdCountMap = new Map();
        const localValidColumnIds = localRawColumnIds.map((id) => {
            const nextCount = (localIdCountMap.get(id) || 0) + 1;
            localIdCountMap.set(id, nextCount);
            return nextCount === 1 ? id : `${id}__dup${nextCount}`;
        });
        const localValidColumnIdSet = new Set(localValidColumnIds);
        const localFieldToIdMap = new Map();
        localChildren.forEach((child, idx) => {
            const field = child?.props?.field;
            if (field !== null && field !== undefined && field !== "") {
                localFieldToIdMap.set(field, localValidColumnIds[idx]);
            }
        });
        const localCheckboxColumnId = localFieldToIdMap.get("__checkbox__");

        const localSanitizeOrderedIds = (ids) => {
            const seen = new Set();
            const filtered = (Array.isArray(ids) ? ids : [])
                .filter((id) => id !== null && id !== undefined && localValidColumnIdSet.has(id))
                .filter((id) => {
                    if (seen.has(id)) return false;
                    seen.add(id);
                    return true;
                });

            if (localCheckboxColumnId && localValidColumnIdSet.has(localCheckboxColumnId)) {
                const withoutCheckbox = filtered.filter((id) => id !== localCheckboxColumnId);
                return [localCheckboxColumnId, ...withoutCheckbox];
            }

            return filtered;
        };

        const localGetOrderedIds = (orderedIds) => {
            const normalized = localSanitizeOrderedIds(orderedIds);
            return [...normalized, ...localValidColumnIds.filter((id) => !normalized.includes(id))];
        };

        const data = localStorage.getItem(storageKey);
        const saved = data ? JSON.parse(data) : null;
        const normalizedSaved = localSanitizeOrderedIds(
            Array.isArray(saved)
                ? saved
                      .map((v) => (v === "__null__" ? null : v))
                      .map((v) => {
                          if (v === null || v === undefined) return null;
                          // Backward compatibility with previously persisted prefixed IDs.
                          if (typeof v === "string" && v.startsWith("field:")) {
                              const legacyField = v.slice("field:".length);
                              if (localFieldToIdMap.has(legacyField)) return localFieldToIdMap.get(legacyField);
                          }
                          if (typeof v === "string" && v.startsWith("columnKey:")) {
                              const legacyColumnKey = v.slice("columnKey:".length);
                              if (localValidColumnIdSet.has(legacyColumnKey)) return legacyColumnKey;
                          }
                          if (localValidColumnIdSet.has(v)) return v;
                          if (typeof v === "string" && localFieldToIdMap.has(v)) return localFieldToIdMap.get(v);
                          return null;
                      })
                : [],
        );

        if (saved) {
            setColumnOrderIds(localGetOrderedIds(normalizedSaved));
        } else {
            setColumnOrderIds(localValidColumnIds);
        }
    }, [storageKey, props.children]);

    function handleHeaderDblClick(field) {
        const curField = sortFieldRef.current;
        const curOrder = sortOrderRef.current;
        const nextOrder = curField === field && curOrder === 1 ? -1 : 1;

        sortFieldRef.current = field;
        sortOrderRef.current = nextOrder;

        onSortRef.current?.({ sortField: field, sortOrder: nextOrder });

        if (props.sortField === undefined) setSortField(field);
        if (props.sortOrder === undefined) setSortOrder(nextOrder);
    }

    function toSearchText(v) {
        if (v === null || v === undefined) return "";
        if (typeof v === "string") return v;
        if (typeof v === "number" || typeof v === "boolean" || typeof v === "bigint") return String(v);
        if (v instanceof Date) return v.toISOString();

        try {
            return JSON.stringify(v);
        } catch {
            return String(v);
        }
    }

    function moveToRowByIndex(rowIndex) {
        requestAnimationFrame(() => {
            const el = getScrollElement();
            if (!el) return;

            const virtualItemSize = Number(resolvedVirtualScrollerOptions?.itemSize);
            if (useVirtualScroller && Number.isFinite(virtualItemSize) && virtualItemSize > 0) {
                el.scrollTop = rowIndex * virtualItemSize;
                return;
            }

            const container = dtRef.current?.container || dtRef.current?.getElement?.();
            const rows = container?.querySelectorAll?.(".p-datatable-tbody > tr");
            if (rows && rowIndex >= 0 && rowIndex < rows.length) {
                rows[rowIndex].scrollIntoView({ block: "center" });
                return;
            }

            const firstRow = rows?.[0];
            const estimatedRowHeight = Math.max(20, Math.ceil(firstRow?.getBoundingClientRect?.().height || 20));
            el.scrollTop = rowIndex * estimatedRowHeight;
        });
    }

    function executeFind() {
        const keyword = findKeyword.trim().toLowerCase();
        if (!keyword) {
            lastExecutedFindKeywordRef.current = "";
            setFindResults([]);
            setCurrentFindResultIndex(-1);
            return;
        }

        const rows = Array.isArray(props.value) ? props.value : [];
        const matched = [];

        rows.forEach((row, rowIndex) => {
            const values = row && typeof row === "object" ? Object.values(row) : [row];
            const hasMatch = values.some((v) => toSearchText(v).toLowerCase().includes(keyword));
            if (hasMatch) matched.push({ rowIndex, row });
        });

        lastExecutedFindKeywordRef.current = keyword;
        setFindResults(matched);
        if (matched.length > 0) {
            setCurrentFindResultIndex(0);
            moveToRowByIndex(matched[0].rowIndex);
        } else {
            setCurrentFindResultIndex(-1);
        }
    }

    function moveFindResult(step) {
        if (findResults.length === 0) return;
        const nextIndex = (currentFindResultIndex + step + findResults.length) % findResults.length;
        setCurrentFindResultIndex(nextIndex);
        moveToRowByIndex(findResults[nextIndex].rowIndex);
    }

    function closeFindDialog() {
        setIsFindDialogVisible(false);
        setFindKeyword("");
        setFindResults([]);
        setCurrentFindResultIndex(-1);
        lastExecutedFindKeywordRef.current = "";
    }

    const currentFindResult =
        currentFindResultIndex >= 0 && currentFindResultIndex < findResults.length
            ? findResults[currentFindResultIndex]
            : null;
    const normalizedFindKeyword = findKeyword.trim().toLowerCase();

    function getFindCellClass(rowData, field) {
        if (!isFindDialogVisible || !field || !normalizedFindKeyword) return "";

        const text = toSearchText(rowData?.[field]).toLowerCase();
        if (!text.includes(normalizedFindKeyword)) return "";

        return currentFindResult?.row === rowData ? "af-find-current-cell" : "af-find-match-cell";
    }

    // 전체 테이블 내용을 텍스트로 만들어 클립보드에 복사
    function copyTableToClipboard() {
        const rows = Array.isArray(props.value) ? props.value : [];

        const headers = [];
        headers.push("#");

        const dataColumns = orderedIds.map((id) => idToChildMap.get(id)).filter((c) => c && c.type === AFColumn);
        dataColumns.forEach((col) => {
            const h = col.props.header;
            if (typeof h === "string" || typeof h === "number") {
                headers.push(String(h));
            } else {
                headers.push(String(col.props.field ?? ""));
            }
        });

        const lines = [];
        lines.push(headers.join("\t"));

        const firstIndex = props.first ?? 0;

        rows.forEach((row, rowIndex) => {
            const cells = [];
            cells.push(String(rowIndex + 1 + firstIndex));
            dataColumns.forEach((col) => {
                const field = col.props.field;
                const v = field ? row[field] : "";
                cells.push(v == null ? "" : String(v));
            });
            lines.push(cells.join("\t"));
        });

        const text = lines.join("\n");

        try {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.top = "-9999px";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);

            toastRef.current?.show({
                severity: "info",
                summary: "Copied to clipboard",
                life: 1500,
            });
        } catch (err) {
            toastRef.current?.show({
                severity: "error",
                summary: "Copy failed",
                detail: "Clipboard permission denied",
                life: 2000,
            });
        }
    }

    // AFColumn → Column 변환
    const orderedIds = useMemo(() => getOrderedIds(columnOrderIds), [columnOrderIds, validColumnIds, checkboxColumnId]);
    const isFindHighlightActive = isFindDialogVisible && Boolean(normalizedFindKeyword);
    const transformedChildren = useMemo(() => orderedIds.map((columnId, idx) => {
        const child = idToChildMap.get(columnId);
        if (!child || child.type !== AFColumn) return child;

        const baseStyle = child.props.style || {};
        const width = baseStyle.width;
        const lockedWidth = freezeColumnWidthOnScroll ? lockedWidthById[columnId] : null;

        const isForceWidth = child.props.forceWidth === true;

        let style;
        const resolvedMinWidth =
            baseStyle.minWidth !== undefined && baseStyle.minWidth !== null
                ? baseStyle.minWidth
                : "30px";

        if (isForceWidth && width) {
            // width 강제 고정(forceWidth는 measured lock보다 우선)
            style = {
                ...baseStyle,
                width: width,
                minWidth: width,
                maxWidth: width,
                flex: "0 0 auto",
                height: "15px",
            };
        } else if (lockedWidth) {
            style = {
                ...baseStyle,
                width: lockedWidth,
                minWidth: resolvedMinWidth,
                flex: "0 0 auto",
                height: "15px",
            };
        } else {
            const flexStyle = idx === lastIndex ? { flex: "1 1 0", minWidth: 0 } : { flex: "0 0 auto" };

            style = { ...flexStyle, ...baseStyle, minWidth: resolvedMinWidth, height: "15px" };
        }

        const headerNode = (
            <span
                style={{
                    display: "inline-block",
                    width: "calc(100% - 8px)",
                    paddingRight: "8px",
                    cursor: "pointer",
                    userSelect: "none",
                    boxSizing: "border-box",
                }}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={(e) => {
                    e.stopPropagation();
                    if (!disableSort) handleHeaderDblClick(child.props.field);
                }}>
                {child.props.header}
            </span>
        );

        const colProps = {};
        for (const p in child.props) {
            if (p !== "sortable" && Object.prototype.hasOwnProperty.call(child.props, p)) {
                colProps[p] = child.props[p];
            }
        }

        const originalBodyClassName = colProps.bodyClassName;
        if (isFindHighlightActive) {
            colProps.bodyClassName = (rowData, options) => {
                const base =
                    typeof originalBodyClassName === "function"
                        ? originalBodyClassName(rowData, options)
                        : originalBodyClassName;
                const merged = [];

                if (typeof base === "string" && base.trim()) merged.push(base.trim());

                const findClass = getFindCellClass(rowData, child.props.field);
                if (findClass) merged.push(findClass);

                return merged.join(" ");
            };
        }

        // body 스타일: 헤더와 동일한 width 고정
        const bodyStyle = isForceWidth && width ? {
            width: width,
            minWidth: width,
            maxWidth: width,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        } : lockedWidth ? {
            width: lockedWidth,
            minWidth: resolvedMinWidth,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        } : {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        };
        
        if (!colProps.bodyStyle) {
            colProps.bodyStyle = bodyStyle;
        } else if (typeof colProps.bodyStyle === 'function') {
            const origBodyStyle = colProps.bodyStyle;
            colProps.bodyStyle = (rowData, options) => {
                const orig = origBodyStyle(rowData, options);
                return { ...bodyStyle, ...orig };
            };
        } else {
            colProps.bodyStyle = { ...bodyStyle, ...colProps.bodyStyle };
        }

        if (!colProps.columnKey) {
            colProps.columnKey = columnId;
        }

        const isSelectionColumn = Boolean(child.props.selectionMode);
        const resolvedHeader = isSelectionColumn ? child.props.header : headerNode;

        return <Column key={columnId} {...colProps} header={resolvedHeader} style={style} headerStyle={style} />;
    }), [
        orderedIds,
        idToChildMap,
        freezeColumnWidthOnScroll,
        lockedWidthById,
        lastIndex,
        disableSort,
        isFindHighlightActive,
        currentFindResult,
        normalizedFindKeyword,
    ]);

    // 키보드 네비게이션
    function handleKeyDown(e) {
        if (!keyboardNavigation) return;

        const key = e.key;
        if (
            key !== "ArrowLeft" &&
            key !== "ArrowRight" &&
            key !== "ArrowUp" &&
            key !== "ArrowDown" &&
            key !== "Enter"
        ) {
            return;
        }

        const container = e.currentTarget;
        const editingTd = container.querySelector("td.p-cell-editing");
        if (!editingTd) return;

        const row = editingTd.parentElement;
        const rows = Array.from(row.parentElement.children);
        const cols = Array.from(row.children);

        const rowIndex = rows.indexOf(row);
        const colIndex = cols.indexOf(editingTd);

        let nextCell = null;
        if (key === "ArrowRight") {
            nextCell = cols[colIndex + 1];
        } else if (key === "ArrowLeft") {
            nextCell = cols[colIndex - 1];
        } else if (key === "ArrowDown" || key === "Enter") {
            nextCell = rows[rowIndex + 1]?.children[colIndex];
        } else if (key === "ArrowUp") {
            nextCell = rows[rowIndex - 1]?.children[colIndex];
        }

        if (nextCell) {
            e.preventDefault();

            const currentInput = editingTd.querySelector(
                "input:not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true'], .p-inputtext, .p-dropdown, .p-inputnumber input, .p-multiselect, .p-autocomplete input",
            );
            if (currentInput?.blur) {
                currentInput.blur();
            }

            suppressRowSelectionRef.current = true;
            setTimeout(() => {
                try {
                    nextCell.click();

                    /*
                    const input = nextCell.querySelector(
                        "input:not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true'], .p-inputtext, .p-dropdown, .p-inputnumber input, .p-multiselect, .p-autocomplete input",
                    );

                    if (input?.focus) {
                        input.focus({ preventScroll: true });
                        if (typeof input.select === "function") {
                            input.select();
                        } else if (typeof input.setSelectionRange === "function" && typeof input.value === "string") {
                            input.setSelectionRange(0, input.value.length);
                        }
                        return;
                    }
                        */

                    if (nextCell?.focus) {
                        if (!nextCell.hasAttribute?.("tabindex")) {
                            nextCell.setAttribute?.("tabindex", "-1");
                        }
                        nextCell.focus({ preventScroll: true });
                    }
                } finally {
                    suppressRowSelectionRef.current = false;
                }
            }, 0);
        }
    }

    function getRowKey(row) {
        const dataKey = props.dataKey;
        if (!row || !dataKey) return null;
        const keyVal = row[dataKey];
        if (keyVal === null || keyVal === undefined || keyVal === "") return null;
        return String(keyVal);
    }

    function buildShiftRangeSelection(currentSelection, allRows, anchorKey, clickedKey) {
        if (!Array.isArray(allRows) || allRows.length === 0) return currentSelection;

        const startIdx = allRows.findIndex((row) => getRowKey(row) === anchorKey);
        const endIdx = allRows.findIndex((row) => getRowKey(row) === clickedKey);
        if (startIdx < 0 || endIdx < 0) return currentSelection;

        const from = Math.min(startIdx, endIdx);
        const to = Math.max(startIdx, endIdx);

        const selectedMap = new Map();
        (Array.isArray(currentSelection) ? currentSelection : []).forEach((row) => {
            const key = getRowKey(row);
            if (key !== null) selectedMap.set(key, row);
        });

        for (let i = from; i <= to; i += 1) {
            const row = allRows[i];
            const key = getRowKey(row);
            if (key !== null) selectedMap.set(key, row);
        }

        return Array.from(selectedMap.values());
    }

    function inferClickedRowKeyFromEvent(allRows, originalEvent) {
        const target = originalEvent?.target;
        if (!target) return null;

        const tr = target.closest?.("tr");
        if (!tr) return null;

        const candidates = [
            tr.getAttribute?.("data-ri"),
            tr.getAttribute?.("data-p-rowindex"),
            tr.dataset?.ri,
            tr.dataset?.pRowindex,
        ];

        for (const candidate of candidates) {
            const idx = parseInt(candidate, 10);
            if (!Number.isNaN(idx) && idx >= 0 && idx < allRows.length) {
                return getRowKey(allRows[idx]);
            }
        }

        return null;
    }

    function captureCheckboxInteraction(e) {
        const clickedKey = getRowKey(e?.data);
        if (clickedKey !== null) {
            checkboxClickedKeyRef.current = clickedKey;
        }
        checkboxShiftPressedRef.current = Boolean(e?.originalEvent?.shiftKey);
    }

    function isCheckboxDrivenSelectionEvent(originalEvent) {
        const target = originalEvent?.target;
        if (!target) return false;

        if (target.closest?.(".p-checkbox")) return true;

        const td = target.closest?.("td");
        if (td?.querySelector?.(".p-checkbox")) return true;

        const th = target.closest?.("th");
        if (th?.querySelector?.(".p-checkbox")) return true;

        return false;
    }

    function handleSelectionChange(e) {
        const isCheckboxOrigin = checkboxClickOriginRef.current;
        checkboxClickOriginRef.current = false;

        if (
            props.selectionMode === "checkbox" &&
            props.autoCheckboxOnRowClick === false &&
            !(isCheckboxOrigin || isCheckboxDrivenSelectionEvent(e?.originalEvent))
        ) {
            checkboxClickedKeyRef.current = null;
            checkboxShiftPressedRef.current = false;
            return;
        }

        const baseValue = Array.isArray(e?.value) ? e.value : [];
        const allRows = Array.isArray(props.value) ? props.value : [];
        const clickedKey =
            checkboxClickedKeyRef.current ??
            inferClickedRowKeyFromEvent(allRows, e?.originalEvent);
        const isShiftPressed =
            checkboxShiftPressedRef.current || Boolean(e?.originalEvent?.shiftKey);
        const isShiftRange =
            isShiftPressed &&
            checkboxAnchorKeyRef.current !== null &&
            clickedKey !== null;

        if (isShiftRange) {
            const rangedValue = buildShiftRangeSelection(
                baseValue,
                allRows,
                checkboxAnchorKeyRef.current,
                clickedKey,
            );
            onSelectionChangeRef.current?.({ ...e, value: rangedValue });
            checkboxAnchorKeyRef.current = clickedKey;
            checkboxClickedKeyRef.current = null;
            checkboxShiftPressedRef.current = false;
            return;
        }

        onSelectionChangeRef.current?.(e);

        if (clickedKey !== null) {
            const selectedKeySet = new Set(baseValue.map((row) => getRowKey(row)).filter((key) => key !== null));
            const isChecked = selectedKeySet.has(clickedKey);
            if (isChecked) {
                checkboxAnchorKeyRef.current = clickedKey;
            }
        }

        checkboxClickedKeyRef.current = null;
        checkboxShiftPressedRef.current = false;
    }

    function handleRowSelect(e) {
        captureCheckboxInteraction(e);
        onRowSelectRef.current?.(e);
    }

    function handleRowUnselect(e) {
        captureCheckboxInteraction(e);
        onRowUnselectRef.current?.(e);
    }

    // 나머지 props 추출
    const rest = {};
    for (const k in props) {
        if (
            k !== "children" &&
            k !== "keyboardNavigation" &&
            k !== "rememberScroll" &&
            k !== "freezeColumnWidthOnScroll" &&
            k !== "useVirtualScroller" &&
            k !== "header" &&
            Object.prototype.hasOwnProperty.call(props, k)
        ) {
            rest[k] = props[k];
        }
    }

    const totalCount = totalRowCount;

    const outerTopBar = (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0 1rem 0 0",
                fontWeight: "bold",
                marginTop: "-0.5rem",
                color: "gray",
                fontSize: "0.9rem",
            }}>
            <div>
                <i>Total {totalCount.toLocaleString()}</i>
            </div>
            <button
                type="button"
                title="Find in table"
                onClick={() => setIsFindDialogVisible(true)}
                style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    border: "none",
                    background: "transparent",
                    boxShadow: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1f2937",
                    opacity: 1,
                    marginTop: "-0.5rem",
                    paddingTop: "0.5rem"
                }}>
                <i className="pi pi-search" style={{ fontSize: "0.95rem", color: "#1f2937" }} />
            </button>
        </div>
    );

    const findDialogFooter = (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", gap: "0.4rem" }}>
                <Button
                    type="button"
                    label="Prev"
                    className="p-button-text"
                    style={{ fontSize: "1.12rem", minWidth: "6.2rem", height: "2.25rem" }}
                    onClick={() => moveFindResult(-1)}
                    disabled={findResults.length === 0}
                />
                <Button
                    type="button"
                    label="Next"
                    className="p-button-text"
                    style={{ fontSize: "1.12rem", minWidth: "6.2rem", height: "2.25rem" }}
                    onClick={() => moveFindResult(1)}
                    disabled={findResults.length === 0}
                />
            </div>
            <Button
                type="button"
                label="Close"
                className="p-button-text"
                style={{ fontSize: "1.12rem", minWidth: "6.2rem", height: "2.25rem" }}
                onClick={closeFindDialog}
            />
        </div>
    );

    // 순번 렌더링 함수
    const indexBodyTemplate = (rowData, options) => {
        return <span>{options.rowIndex + 1 + (props.first ?? 0)}</span>;
    };

    // 순번 헤더 클릭 핸들러
    const handleIndexHeaderClick = (e) => {
        e.stopPropagation();
        copyTableToClipboard();
    };

    // 순번 컬럼 정의
    const indexColumn = (
        <Column
            key="__index"
            header={
                <div
                    style={{
                        textAlign: "center",
                        cursor: "pointer",
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    title="Copy table to clipboard"
                    onClick={handleIndexHeaderClick}>
                    <i
                        className="pi pi-copy"
                        style={{
                            fontSize: "0.9rem",
                            color: "#555",
                        }}
                    />
                </div>
            }
            body={indexBodyTemplate}
            style={{
                width: "30px",
                minWidth: "30px",
                maxWidth: "30px",
                textAlign: "center",
            }}
            headerStyle={{
                backgroundColor: "#f0f0f0",
                width: "30px",
                minWidth: "30px",
                maxWidth: "30px",
            }}
            bodyStyle={{
                textAlign: "center",
                backgroundColor: "#f0f0f0",
                width: "30px",
                minWidth: "30px",
                maxWidth: "30px",
            }}
            exportable={false}
            reorderable={false}
        />
    );

    // === value 변경 시 스크롤 복원 및 spacer 관리 ===
    useEffect(() => {
        if (!rememberScroll) return;

        requestAnimationFrame(() => {
            if (!scrollElRef.current) {
                scrollElRef.current = getScrollElement();
            }
            const el = scrollElRef.current;
            if (!el) return;

            const rows = Array.isArray(rest.value) ? rest.value.length : 0;

            if (rows === 0) {
                const sp = ensureSpacer(el);

                const minH = Math.max(
                    savedScrollHeightRef.current || 0,
                    (savedScrollTopRef.current || 0) + el.clientHeight + 1,
                );
                sp.style.height = `${minH}px`;

                el.scrollTop = savedScrollTopRef.current || 0;
            } else {
                removeSpacer();
                savedScrollHeightRef.current = el.scrollHeight || savedScrollHeightRef.current;
                el.scrollTop = savedScrollTopRef.current || 0;
            }
        });
    }, [rememberScroll, rest.value]);

    // 첫 렌더(첫 페이지) 기준 헤더 폭을 측정해 컬럼 폭을 고정
    useLayoutEffect(() => {
        if (!freezeColumnWidthOnScroll) return;
        if (hasCapturedInitialWidthsRef.current) return;
        if (Object.keys(lockedWidthById).length > 0) return;

        requestAnimationFrame(() => {
            if (hasCapturedInitialWidthsRef.current) return;

            const container = dtRef.current?.container || dtRef.current?.getElement?.();
            if (!container) return;

            const headerCells = Array.from(container.querySelectorAll(".p-datatable-thead > tr > th"));
            if (headerCells.length < orderedIds.length + 1) return;

            const measured = {};
            orderedIds.forEach((id, idx) => {
                const th = headerCells[idx + 1]; // 첫 번째는 순번 컬럼
                if (!th) return;

                const width = Math.ceil(th.getBoundingClientRect().width);
                if (width > 0) {
                    measured[id] = `${width}px`;
                }
            });

            if (Object.keys(measured).length > 0) {
                hasCapturedInitialWidthsRef.current = true;
                setLockedWidthById(measured);
            }
        });
    }, [freezeColumnWidthOnScroll, lockedWidthById, orderedIds, props.value]);

    return (
        <>
            <Toast ref={toastRef} />
            <Dialog
                header="Find In Table"
                visible={isFindDialogVisible}
                style={{ width: "28rem" }}
                contentStyle={{ fontSize: "1.22rem" }}
                onShow={focusFindInput}
                onHide={closeFindDialog}
                footer={findDialogFooter}>
                <div ref={findDialogRef} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <InputText
                        value={findKeyword}
                        onChange={(e) => setFindKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== "Enter") return;

                            e.preventDefault();

                            const keyword = findKeyword.trim().toLowerCase();
                            if (keyword && keyword === lastExecutedFindKeywordRef.current && findResults.length > 0) {
                                moveFindResult(1);
                                return;
                            }

                            executeFind();
                        }}
                        placeholder="Type keyword"
                        style={{ width: "100%", fontSize: "1.22rem", height: "2.45rem" }}
                    />
                    <button
                        type="button"
                        title="Search"
                        onClick={executeFind}
                        style={{
                            height: "2.45rem",
                            width: "2.45rem",
                            border: "none",
                            background: "transparent",
                            boxShadow: "none",
                            cursor: "pointer",
                            padding: 0,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#1f2937",
                            opacity: 1,
                        }}>
                        <i className="pi pi-search" style={{ fontSize: "1.18rem", color: "#1f2937" }} />
                    </button>
                </div>
                <div style={{ marginTop: "0.8rem", fontSize: "1.22rem", color: "#555" }}>
                    {findKeyword.trim()
                        ? `Matched: ${findResults.length.toLocaleString()}`
                        : "Enter a keyword to search all table data."}
                </div>
                <div style={{ marginTop: "0.4rem", fontSize: "1.14rem", color: "#444" }}>
                    {currentFindResult
                        ? `Current row: ${currentFindResult.rowIndex + 1}`
                        : findResults.length > 0
                          ? "Select Prev/Next"
                          : "No active result"}
                </div>
            </Dialog>
            <style>{`
                .af-find-match-cell {
                    background-color: #fff9d6 !important;
                }
                .af-find-current-cell {
                    background-color: #ffe7a8 !important;
                    font-weight: 600;
                }
                .p-datatable .p-datatable-tbody > tr.p-highlight > td {
                    background-color: #c0d7e5 !important;
                    color: black !important;
                }
                .p-datatable .p-datatable-tbody > tr.p-highlight > td .p-inputtext,
                .p-datatable .p-datatable-tbody > tr.p-highlight > td input {
                    background-color: #c0d7e5 !important;
                }
            `}</style>
            {outerTopBar}
            <DataTable
                {...rest}
                style={mergedTableStyle}
                tableStyle={resolvedInnerTableStyle}
                scrollHeight="flex"
                onSelectionChange={handleSelectionChange}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                selectionMode="checkbox"
                compareSelectionBy={resolvedCompareSelectionBy}
                scrollable
                sortField={effSortField}
                sortOrder={effSortOrder}
                reorderableColumns
                onColumnResizeEnd={handleColumnResizeEnd}
                virtualScrollerOptions={resolvedVirtualScrollerOptions}
                emptyMessage="No results found."
                onSort={(e) => {
                    onSortRef.current?.(e);
                    if (props.sortField === undefined) setSortField(e.sortField);
                    if (props.sortOrder === undefined) setSortOrder(e.sortOrder);
                }}
                onColReorder={(e) => {
                    const reorderedIds = sanitizeOrderedIds(
                        e.columns.map(
                            (col) =>
                                col?.props?.columnKey ||
                                (col?.props?.field ? col.props.field : null),
                        ),
                    );

                    const currentIdOrder = getOrderedIds(columnOrderIds);
                    const newOrder = [
                        ...reorderedIds,
                        ...currentIdOrder.filter((id) => !reorderedIds.includes(id)),
                    ];

                    setColumnOrderIds(getOrderedIds(newOrder));
                    hasCapturedInitialWidthsRef.current = false;
                    setLockedWidthById({});

                    toastRef.current?.show({
                        severity: "info",
                        summary: "Reordered columns saved.",
                    });
                    localStorage.setItem(storageKey, JSON.stringify(newOrder));
                }}
                ref={(node) => {
                    dtRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                    try {
                        const el = node?.getElement?.() || node?.container;
                        if (el) el.setAttribute?.("data-af-key", storageKey);
                    } catch {}
                }}
                onRowClick={(e) => {
                    if (suppressRowSelectionRef.current) return;

                    const target = e?.originalEvent?.target;
                    const clickedRowKey = getRowKey(e?.data);
                    const isEditingInteraction = Boolean(
                        target?.closest?.(
                            "td.p-cell-editing, .p-cell-editor, input, textarea, .p-inputtext, .p-dropdown, .p-calendar",
                        ),
                    );

                    if (isEditingInteraction) {
                        onRowClickRef.current?.(e);
                        return;
                    }

                    if (props.selectionMode === "checkbox") {
                        const clickedTd = target?.closest?.("td");
                        const checkboxInTd = clickedTd?.querySelector?.('input[type="checkbox"]');
                        const checkboxBoxInTd = clickedTd?.querySelector?.(".p-checkbox-box");
                        
                        // 체크박스 셀을 클릭했으면 아무것도 하지 않음
                        if (checkboxInTd || checkboxBoxInTd) {
                            e?.originalEvent?.preventDefault?.();
                            e?.originalEvent?.stopPropagation?.();
                            return;
                        }

                        const shouldAutoCheckboxOnRowClick =
                            props.autoCheckboxOnRowClick !== false;
                        const clickedOnCheckboxUi = Boolean(
                            target?.closest?.(".p-checkbox"),
                        );
                        checkboxClickOriginRef.current = clickedOnCheckboxUi;

                        if (clickedRowKey !== null) {
                            checkboxClickedKeyRef.current = clickedRowKey;
                            checkboxShiftPressedRef.current = Boolean(e?.originalEvent?.shiftKey);
                        }

                        if (!shouldAutoCheckboxOnRowClick) {
                            e?.originalEvent?.preventDefault?.();
                            e?.originalEvent?.stopPropagation?.();
                        }

                        // Clicked on a non-checkbox cell — do not toggle checkbox
                        onRowClickRef.current?.(e);
                        return;
                    }

                    onRowClickRef.current?.(e);
                }}>
                {indexColumn}
                {transformedChildren}
            </DataTable>
        </>
    );
});

function shallowEqualObject(a, b) {
    if (a === b) return true;
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    for (const key of aKeys) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
        if (a[key] !== b[key]) return false;
    }

    return true;
}

function getChildShapeSignature(children) {
    const arr = Children.toArray(children);
    return arr
        .map((child, idx) => {
            if (!child || child.type !== AFColumn) return `other:${idx}`;

            const p = child.props || {};
            const style = p.style || {};

            return [
                "af",
                p.columnKey ?? "",
                p.field ?? "",
                typeof p.header === "string" || typeof p.header === "number"
                    ? String(p.header)
                    : typeof p.header,
                p.selectionMode ?? "",
                p.forceWidth ? "1" : "0",
                style.width ?? "",
                style.minWidth ?? "",
                style.maxWidth ?? "",
            ].join("|");
        })
        .join("::");
}

function shouldPreventUnrelatedRerender(prevProps, nextProps) {
    if (!(prevProps.preventUnrelatedRerender && nextProps.preventUnrelatedRerender)) {
        return false;
    }

    const strictRefKeys = [
        "value",
        "selection",
        "filters",
        "expandedRows",
        "editingRows",
        "frozenValue",
    ];

    for (const key of strictRefKeys) {
        if (prevProps[key] !== nextProps[key]) return false;
    }

    const primitiveKeys = [
        "loading",
        "first",
        "rows",
        "sortField",
        "sortOrder",
        "globalFilter",
        "dataKey",
        "className",
        "scrollHeight",
        "selectionMode",
        "keyboardNavigation",
        "rememberScroll",
        "freezeColumnWidthOnScroll",
        "useVirtualScroller",
        "disableSort",
        "renderDependency",
    ];

    for (const key of primitiveKeys) {
        if (prevProps[key] !== nextProps[key]) return false;
    }

    if (!shallowEqualObject(prevProps.style || {}, nextProps.style || {})) return false;
    if (!shallowEqualObject(prevProps.tableStyle || {}, nextProps.tableStyle || {})) return false;
    if (
        !shallowEqualObject(
            prevProps.virtualScrollerOptions || {},
            nextProps.virtualScrollerOptions || {},
        )
    ) {
        return false;
    }

    if (getChildShapeSignature(prevProps.children) !== getChildShapeSignature(nextProps.children)) {
        return false;
    }

    return true;
}

export const AFDataTable = React.memo(AFDataTableBase, shouldPreventUnrelatedRerender);
