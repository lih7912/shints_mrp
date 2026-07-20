/* eslint-disable */
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useRef, useState } from "react";
import { AFColumn } from "../components/AFColumn";
import { AFDataTable } from "../components/AFDataTable";
import { ServiceS0107_KCD_SIZEMST } from "../service/service_biz/ServiceS0107_KCD_SIZEMST";
import { ServiceLib } from "../service/service_lib/ServiceLib";

const EMPTY_KCD_SIZE_MST = {
    id: 0,
    SIZE_GROUP: "",
    SIZE_GROUP_NAME: "",
    SIZE_MEMBER: "",
    SIZE_CNT: 0,
    STATUS_CD: "",
    REG_USER: "",
    REG_DATETIME: "",
    UPD_USER: "",
    UPD_DATETIME: "",
};

const MgrKcdSizeMst = () => {
    const serviceLibRef = useRef(null);
    if (!serviceLibRef.current) {
        serviceLibRef.current = new ServiceLib();
        serviceLibRef.current.loginConfirm();
    }
    const serviceLib = serviceLibRef.current;

    const serviceS0107_KCD_SIZEMSTRef = useRef(null);
    if (!serviceS0107_KCD_SIZEMSTRef.current) serviceS0107_KCD_SIZEMSTRef.current = new ServiceS0107_KCD_SIZEMST();
    const serviceS0107_KCD_SIZEMST = serviceS0107_KCD_SIZEMSTRef.current;

    const [datasQryStatus, setDatasQryStatus] = useState([]);
    const [dataQryStatus, setDataQryStatus] = useState({});

    const [dataQryBuyerCd, setDataQryBuyerCd] = useState("");
    const [dataQrySizeGroup, setDataQrySizeGroup] = useState("");

    const [qrySizeGroup, setQrySizeGroup] = useState("");
    const [qrySizeMember, setQrySizeMember] = useState("");
    const [qrySizeStatusCD, setQrySizeStatusCD] = useState("");

    const [regSTATUS_CD, setRegSTATUS_CD] = useState({});

    const [datasKCD_SIZE_MST_STATUS_CD, setDatasKCD_SIZE_MST_STATUS_CD] =
        useState([]);
    const [dataKCD_SIZE_MST_STATUS_CD, setDataKCD_SIZE_MST_STATUS_CD] =
        useState({});

    const [datasKCD_SIZE_MST_BUYER_CD, setDatasKCD_SIZE_MST_BUYER_CD] =
        useState([]);
    const [dataKCD_SIZE_MST_BUYER_CD, setDataKCD_SIZE_MST_BUYER_CD] = useState(
        {},
    );

    const [loadingKCD_SIZE_MST, setLoadingKCD_SIZE_MST] = useState(false);
    const [datasKCD_SIZE_MST, setDatasKCD_SIZE_MST] = useState([]);
    const [dataKCD_SIZE_MST, setDataKCD_SIZE_MST] =
        useState(EMPTY_KCD_SIZE_MST);

    const [selectedKCD_SIZE_MST, setSelectedKCD_SIZE_MST] = useState([]);
    const [createDialog, setCreateDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteDatasDialog, setDeleteDatasDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [flagModal, setFlagModal] = useState(false);
    const [flagSelectMode, setFlagSelectMode] = useState(false);

    const toast = useRef(null);
    const dt_KCD_SIZE_MST = useRef(null);

    const clearSelected = () => {
        setSelectedKCD_SIZE_MST([]);
        setFlagSelectMode(false);
    };

    const updateSizeMstField = (
        field,
        value,
        { removeSpaces = false, updateCount = false } = {},
    ) => {
        const nextValue =
            typeof value === "string" && removeSpaces
                ? value.replaceAll(" ", "")
                : value;

        setDataKCD_SIZE_MST((prev) => {
            const next = { ...prev, [field]: nextValue };

            if (updateCount) {
                next.SIZE_CNT =
                    nextValue === "" ? 0 : String(nextValue).split(",").length;
            }

            return next;
        });
    };

    const handleDataInputChange =
        (field, options = {}) =>
        (e) => {
            const rawValue = (e.target && e.target.value) || "";

            if (field === "SIZE_CNT") {
                updateSizeMstField(
                    field,
                    Number.parseInt(rawValue, 10) || 0,
                    options,
                );
                return;
            }

            updateSizeMstField(field, rawValue, options);
        };

    const handleQueryInputChange =
        (setter, { removeSpaces = false } = {}) =>
        (e) => {
            const value = (e.target && e.target.value) || "";
            setter(removeSpaces ? value.replaceAll(" ", "") : value);
        };

    const handleSearchOnEnter = (e) => {
        if (e.key === "Enter") {
            search_LIST_1();
        }
    };

    const hasConsecutiveCommas = (str) => /,{2,}/.test(str);

    const validateSizeMember = () => {
        const sizeMember = String(dataKCD_SIZE_MST.SIZE_MEMBER || "");
        const normalizedSizeMember = sizeMember.toLowerCase();
        const compactSizeMember = sizeMember.replaceAll(" ", "");

        if (normalizedSizeMember.includes("xx")) {
            alert("XX는 사용할 수 없습니다.<br><br>XX cannot be used.");
            return false;
        }

        if (hasConsecutiveCommas(compactSizeMember)) {
            alert("비어있는 SIZE(연속된 COMMA)가 있습니다.<br><br>There is an empty SIZE (consecutive COMMA).");
            return false;
        }

        const sizeArr = compactSizeMember
            .toLowerCase()
            .split(",")
            .filter(Boolean);
        const setSize = new Set(sizeArr);

        if (sizeArr.length !== setSize.size) {
            alert("중복된 사이즈는 입력할 수 없습니다.<br><br>Duplicate sizes cannot be entered.");
            return false;
        }

        return true;
    };

    const buildSearchInput = () => ({
        STATUS_CD: qrySizeStatusCD === " " ? "" : qrySizeStatusCD,
        BUYER_CD:
            typeof dataQryBuyerCd?.BUYER_CD === "undefined" ||
            dataQryBuyerCd?.BUYER_CD === " "
                ? ""
                : dataQryBuyerCd.BUYER_CD,
        SIZE_GROUP: dataQrySizeGroup,
        SIZE_MEMBER: qrySizeMember,
    });

    const search_LIST_1 = () => {
        const input = buildSearchInput();

        setDatasKCD_SIZE_MST([]);
        clearSelected();
        setDataKCD_SIZE_MST(EMPTY_KCD_SIZE_MST);
        setLoadingKCD_SIZE_MST(true);

        serviceS0107_KCD_SIZEMST.mgrQuery_LIST_1(input).then((data) => {
            setLoadingKCD_SIZE_MST(false);

            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_SIZE_MST(data);
                return;
            }

            console.log(
                `ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => ${JSON.stringify(data.graphQLErrors)}`,
            );
        });
    };

    const executeMutation = ({
        serviceCall,
        successSummary,
        errorSummary,
        removeBuyerName = false,
    }) => {
        const payload = { ...dataKCD_SIZE_MST };
        delete payload.__typename;

        if (removeBuyerName) {
            delete payload.BUYER_NAME;
        }

        if (!payload.BUYER_CD) {
            alert("buyer가 입력되어야 합니다<br><br>buyer must be entered");
            return;
        }

        payload.REG_USER = serviceLib.getUserInfo().USER_ID;

        serviceCall(payload).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                if (Array.isArray(data) && data.length > 0) {
                    if (successSummary === "ALERT") {
                        alert(data[0].CODE);
                    } else {
                        toast.current.show({
                            severity: "success",
                            summary: successSummary,
                            detail: data[0].CODE,
                            life: 3000,
                        });
                    }
                }
                setDataKCD_SIZE_MST_BUYER_CD({});
                setDataKCD_SIZE_MST(EMPTY_KCD_SIZE_MST);
                search_LIST_1();
                return;
            }

            console.log(
                `ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => ${JSON.stringify(data.graphQLErrors)}`,
            );
            toast.current.show({
                severity: "error",
                summary: errorSummary,
                detail: "",
                life: 3000,
            });
        });
    };

    const process_INSERT_SIZEMST = () => {
        executeMutation({
            serviceCall: serviceS0107_KCD_SIZEMST.mgrInsert_INSERT_SIZEMST.bind(
                serviceS0107_KCD_SIZEMST,
            ),
            successSummary: "ALERT",
            errorSummary: "ERROR:Insert SizeMst",
        });
    };

    const process_UPDATE_SIZEMST = () => {
        executeMutation({
            serviceCall: serviceS0107_KCD_SIZEMST.mgrInsert_UPDATE_SIZEMST.bind(
                serviceS0107_KCD_SIZEMST,
            ),
            successSummary: "ALERT",
            errorSummary: "ERROR:Update SizeMst",
            removeBuyerName: true,
        });
    };

    const process_DELETE_SIZEMST = () => {
        executeMutation({
            serviceCall: serviceS0107_KCD_SIZEMST.mgrInsert_DELETE_SIZEMST.bind(
                serviceS0107_KCD_SIZEMST,
            ),
            successSummary: "SUCCEED:Update SizeMst",
            errorSummary: "ERROR:Update SizeMst",
            removeBuyerName: true,
        });
    };

    const process_INSERT = () => {
        if (!validateSizeMember()) {
            return;
        }

        if (!dataKCD_SIZE_MST.id) {
            process_INSERT_SIZEMST();
            return;
        }

        alert("RESET 후 항목을 입력해주세요.<br><br>Please enter the items after RESET.");
    };

    const process_UPDATE = () => {
        if (!validateSizeMember()) {
            return;
        }

        if (dataKCD_SIZE_MST.id > 0) {
            process_UPDATE_SIZEMST();
            return;
        }

        alert("SIZE를 선택 후 UPDATE해주세요.<br><br>Please select SIZE and UPDATE.");
    };

    useEffect(() => {
        const input = {
            BUYER_CD: "",
            STATUS_CD: "",
        };

        serviceS0107_KCD_SIZEMST.mgrQuery_CODE(input).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                const statusOptions = [...data.STATUS_CD];
                statusOptions.shift();

                setDatasQryStatus(statusOptions);
                setDataQryStatus({});
                setDatasKCD_SIZE_MST_STATUS_CD(statusOptions);
                setDataKCD_SIZE_MST_STATUS_CD(statusOptions[0] || {});

                setDatasKCD_SIZE_MST_BUYER_CD(data.BUYER_CD);
                setDataKCD_SIZE_MST_BUYER_CD(data.BUYER_CD[0] || {});
                return;
            }

            console.log(
                `ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => ${JSON.stringify(data.graphQLErrors)}`,
            );
        });

        search_LIST_1();
    }, []);

    const resetKCD_SIZE_MST = () => {
        clearSelected();
        setDataKCD_SIZE_MST(EMPTY_KCD_SIZE_MST);
        setDataKCD_SIZE_MST_BUYER_CD(datasKCD_SIZE_MST_BUYER_CD[0]);
        setDataKCD_SIZE_MST_STATUS_CD(datasKCD_SIZE_MST_STATUS_CD[0]);
    };

    const editKCD_SIZE_MST = (row) => {
        clearSelected();
        setDataKCD_SIZE_MST({ ...row });

        const selectedStatus = datasKCD_SIZE_MST_STATUS_CD.find(
            (item) => item.CD_CODE === row.STATUS_CD,
        );
        setDataKCD_SIZE_MST_STATUS_CD(selectedStatus || {});

        const selectedBuyer = datasKCD_SIZE_MST_BUYER_CD.find(
            (item) => item.BUYER_CD === row.BUYER_CD,
        );
        setDataKCD_SIZE_MST_BUYER_CD(selectedBuyer || {});

        setCreateDialog(true);
    };

    const onRowClick = (event) => {
        editKCD_SIZE_MST(event.data);
    };

    const onDropdownChangeKCD_SIZE_MST_STATUS_CD = (e, name) => {
        const value = (e.value && e.value.CD_CODE) || "";
        setDataKCD_SIZE_MST_STATUS_CD(e.value || {});

        if (name === "STATUS_CD") {
            updateSizeMstField(name, String(value));
            return;
        }

        setQrySizeStatusCD(value);
    };

    const onDropdownChangeKCD_SIZE_MST_BUYER_CD = (e, name) => {
        const value = (e.value && e.value.BUYER_CD) || "";
        setDataKCD_SIZE_MST_BUYER_CD(e.value || {});
        updateSizeMstField(name, String(value));
    };

    const onInputChangeQryBuyerCd = (e) => {
        setDataQryBuyerCd(e.value || "");
    };

    const exportExcel = () => {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(datasKCD_SIZE_MST);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "사이즈목록");
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], { type: EXCEL_TYPE });

                module.default.saveAs(
                    data,
                    `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`,
                );
            }
        });
    };

    const queryStatusValue =
        datasQryStatus.find((item) => item.CD_CODE === qrySizeStatusCD) || null;

    return (
        <div className="af-div-main">
            <div
                className="af-div-first"
                style={{ width: "123rem", height: "3rem" }}
            >
                <span className="af-span-3-0" style={{ width: "19rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "11rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={queryStatusValue}
                            onChange={(e) =>
                                onDropdownChangeKCD_SIZE_MST_STATUS_CD(e, " ")
                            }
                            options={datasQryStatus}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_STATUS_CD"
                            value={dataQryBuyerCd}
                            onChange={onInputChangeQryBuyerCd}
                            options={datasKCD_SIZE_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Size Group</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            type="search"
                            onChange={handleQueryInputChange(
                                setDataQrySizeGroup,
                                { removeSpaces: true },
                            )}
                            placeholder=""
                            onKeyPress={handleSearchOnEnter}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "31rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Size Contents</p>
                    <div className="af-span-div" style={{ width: "21rem" }}>
                        <InputText
                            style={{ width: "21rem" }}
                            type="search"
                            placeholder=""
                            onChange={handleQueryInputChange(setQrySizeMember, {
                                removeSpaces: true,
                            })}
                            onKeyPress={handleSearchOnEnter}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target="#btnSearch"
                            content="Alt+S"
                            position="bottom"
                        />
                        <Button
                            style={{ width: "5rem" }}
                            label={
                                <span>
                                    Search(<u>S</u>)
                                </span>
                            }
                            accessKey="S"
                            id="btnSearch"
                            className="p-button-text"
                            onClick={search_LIST_1}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Excel"
                            className="p-button-text green"
                            onClick={exportExcel}
                        />
                    </div>
                </span>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "38rem" }}
            >
                <AFDataTable preventUnrelatedRerender
                    ref={dt_KCD_SIZE_MST}
                    tableStyle={{ tableLayout: "fixed" }}
                    value={datasKCD_SIZE_MST}
                    size="small"
                    resizableColumns
                    columnResizeMode="expand"
                    showGridlines
                    loading={loadingKCD_SIZE_MST}
                    selectionMode="checkbox"
                    selection={selectedKCD_SIZE_MST}
                    onSelectionChange={(e) => {
                        setFlagSelectMode(true);
                        setSelectedKCD_SIZE_MST(e.value);
                    }}
                    onRowClick={onRowClick}
                    dataKey="id"
                    className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" "
                    responsiveLayout="scroll"
                    scrollable
                    scrollHeight="414px"
                >
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "8rem", flexBasis: "auto" }} />
                    <AFColumn field="SIZE_GROUP_NAME" headerClassName="t-header" header="Size Group" style={{ width: "8rem", flexBasis: "auto" }} />
                    <AFColumn field="SIZE_CNT" headerClassName="t-header" header="Total" bodyClassName="col-right " style={{ width: "5rem", flexBasis: "auto" }} />
                    <AFColumn field="SIZE_MEMBER" headerClassName="t-header" header="Size Contents" style={{ width: "40rem", flexBasis: "auto" }} />
                    <AFColumn field="STATUS_CD_N" headerClassName="t-header" header="Status" style={{ width: "5rem", flexBasis: "auto" }} />
                </AFDataTable>
            </div>

            <div
                className="af-div-first"
                style={{ width: "123rem", height: "20rem" }}
            >
                <span className="af-span-3-0" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Size#</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <InputText
                            disabled
                            style={{ width: "10rem" }}
                            id="id_SIZE_GROUP"
                            value={dataKCD_SIZE_MST.SIZE_GROUP}
                            onChange={handleDataInputChange("SIZE_GROUP")}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "120rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "9rem", color: "red" }}
                    >*Buyer#</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <Dropdown
                            style={{ width: "23rem" }}
                            id="id_STATUS_CD"
                            value={dataKCD_SIZE_MST_BUYER_CD}
                            onChange={(e) =>
                                onDropdownChangeKCD_SIZE_MST_BUYER_CD(
                                    e,
                                    "BUYER_CD",
                                )
                            }
                            options={datasKCD_SIZE_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "120rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "9rem", color: "red" }}
                    >*Size Group</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <InputText
                            style={{ width: "23rem" }}
                            id="id_SIZE_GROUP"
                            value={dataKCD_SIZE_MST.SIZE_GROUP_NAME}
                            onChange={handleDataInputChange("SIZE_GROUP_NAME", {
                                removeSpaces: true,
                            })}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "120rem" }}>
                    <p
                        className="af-span-p"
                        style={{ width: "9rem", color: "red" }}
                    >*Size Content</p>
                    <div className="af-span-div" style={{ width: "71rem" }}>
                        <InputText
                            style={{ width: "71rem" }}
                            placeholder="EX) 2XS,XS,S,M,L,XL,2XL (XXS,XXL 금지)"
                            id="id_SIZE_MEMBER"
                            value={dataKCD_SIZE_MST.SIZE_MEMBER}
                            onChange={handleDataInputChange("SIZE_MEMBER", {
                                removeSpaces: true,
                                updateCount: true,
                            })}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Total</p>
                    <div className="af-span-div" style={{ width: "23rem" }}>
                        <InputText
                            style={{ width: "23rem" }}
                            id="id_SIZE_CNT"
                            value={dataKCD_SIZE_MST.SIZE_CNT}
                            onChange={handleDataInputChange("SIZE_CNT")}
                            disabled
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "120rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Status</p>
                    <div className="af-span-div" style={{ width: "10rem" }}>
                        <Dropdown
                            style={{ width: "10rem" }}
                            id="id_STATUS_CD"
                            value={dataKCD_SIZE_MST_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeKCD_SIZE_MST_STATUS_CD(
                                    e,
                                    "STATUS_CD",
                                )
                            }
                            options={datasKCD_SIZE_MST_STATUS_CD}
                            optionLabel="CD_NAME"
                            editable
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Insert"
                            className="p-button-text"
                            onClick={process_INSERT}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Update"
                            className="p-button-text"
                            onClick={process_UPDATE}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Reset"
                            className="p-button-text"
                            onClick={resetKCD_SIZE_MST}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Button
                            style={{ width: "5rem" }}
                            label="Delete"
                            className="p-button-text"
                            onClick={process_DELETE_SIZEMST}
                        />
                    </div>
                </span>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MgrKcdSizeMst, comparisonFn);
