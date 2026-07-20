/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { AFDataTable } from "../components/AFDataTable";
import { AFColumn } from "../components/AFColumn";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { ServiceS0107_KCD_SIZEMST } from "../service/service_biz/ServiceS0107_KCD_SIZEMST";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { ScrollPanel } from "primereact/scrollpanel";
import { ServiceLib } from "../service/service_lib/ServiceLib";

import { TabView, TabPanel } from "primereact/tabview";

const MgrKcdSizeMst = () => {
    let emptyKCD_SIZE_MST = {
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

    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

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
    const [dataKCD_SIZE_MST, setDataKCD_SIZE_MST] = useState(emptyKCD_SIZE_MST);

    const [selectedKCD_SIZE_MST, setSelectedKCD_SIZE_MST] = useState([]);
    const [createDialog, setCreateDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteDatasDialog, setDeleteDatasDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [flagModal, setFlagModal] = useState(false);
    const [flagSelectMode, setFlagSelectMode] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const dt_KCD_SIZE_MST = useRef(null);

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: "65vw" });

    const search_LIST_1 = () => {
        console.log(qrySizeStatusCD);
        var tInput = {};
        // if (typeof dataQryStatus.CD_CODE === 'undefined') tInput.STATUS_CD = '';
        // else tInput.STATUS_CD = dataQryStatus.CD_CODE;
        tInput.STATUS_CD = qrySizeStatusCD == " " ? "" : qrySizeStatusCD;
        tInput.BUYER_CD =
            dataQryBuyerCd.BUYER_CD == undefined
                ? ""
                : dataQryBuyerCd.BUYER_CD == " "
                  ? ""
                  : dataQryBuyerCd.BUYER_CD;

        tInput.SIZE_GROUP = dataQrySizeGroup;
        tInput.SIZE_MEMBER = qrySizeMember;

        console.log(tInput);

        setDatasKCD_SIZE_MST([]);
        setSelectedKCD_SIZE_MST([]);
        resetKCD_SIZE_MST();
        setLoadingKCD_SIZE_MST(true);

        serviceS0107_KCD_SIZEMST.mgrQuery_LIST_1(tInput).then((data) => {
            setLoadingKCD_SIZE_MST(false);
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                console.log(
                    "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length,
                );
                // console.log(data)
                setDatasKCD_SIZE_MST(data);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });
    };

    function hasConsecutiveCommas(str) {
        return /,{2,}/.test(str); // 콤마가 2개 이상 연속되면 true
    }
    const process_INSERT = () => {
        if (dataKCD_SIZE_MST.SIZE_MEMBER.toLowerCase().includes("xx")) {
            alert("XX는 사용할 수 없습니다.<br><br>XX cannot be used.");
            return;
        }

        if (
            hasConsecutiveCommas(
                dataKCD_SIZE_MST.SIZE_MEMBER.replaceAll(" ", ""),
            )
        ) {
            alert("비어있는 SIZE(연속된 COMMA)가 있습니다.<br><br>There is an empty SIZE (consecutive COMMA).");
            return;
        }

        //알파벳 연속 세 글자 방지

        //중복 체크
        let sizeArr = dataKCD_SIZE_MST.SIZE_MEMBER.toLowerCase().split(",");
        let setSize = new Set(sizeArr);

        if (sizeArr.length != setSize.size) {
            alert("중복된 사이즈는 입력할 수 없습니다.<br><br>Duplicate sizes cannot be entered.");
            return;
        }

        if (!dataKCD_SIZE_MST.id) {
            process_INSERT_SIZEMST();
        } else {
            alert("RESET 후 항목을 입력해주세요.<br><br>Please enter the items after RESET.");
            return;
        }
    };

    const process_UPDATE = () => {
        if (dataKCD_SIZE_MST.SIZE_MEMBER.toLowerCase().includes("xx")) {
            alert("XX는 사용할 수 없습니다.<br><br>XX cannot be used.");
            return;
        }

        if (
            hasConsecutiveCommas(
                dataKCD_SIZE_MST.SIZE_MEMBER.replaceAll(" ", ""),
            )
        ) {
            alert("비어있는 SIZE(연속된 COMMA)가 있습니다.<br><br>There is an empty SIZE (consecutive COMMA).");
            return;
        }

        //중복 체크
        let sizeArr = dataKCD_SIZE_MST.SIZE_MEMBER.toLowerCase().split(",");
        let setSize = new Set(sizeArr);

        if (sizeArr.length != setSize.size) {
            alert("중복된 사이즈는 입력할 수 없습니다.<br><br>Duplicate sizes cannot be entered.");
            return;
        }

        if (dataKCD_SIZE_MST.id > 0) {
            process_UPDATE_SIZEMST();
        } else {
            alert("SIZE를 선택 후 UPDATE해주세요.<br><br>Please select SIZE and UPDATE.");
            return;
        }
    };

    const process_INSERT_SIZEMST = () => {
        var tInData1 = { ...dataKCD_SIZE_MST };
        delete tInData1.__typename;
        tInData1.REG_USER = serviceLib.getUserInfo().USER_ID;

        console.log(tInData1);

        serviceS0107_KCD_SIZEMST
            .mgrInsert_INSERT_SIZEMST(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) alert(data[0].CODE);
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Insert SizeMst",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_UPDATE_SIZEMST = () => {
        console.log("update");
        var tInData1 = { ...dataKCD_SIZE_MST };
        delete tInData1.__typename;
        delete tInData1.BUYER_NAME;

        tInData1.REG_USER = serviceLib.getUserInfo().USER_ID;

        console.log(tInData1);

        serviceS0107_KCD_SIZEMST
            .mgrInsert_UPDATE_SIZEMST(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        if (data.length > 0) alert(data[0].CODE);
                        // console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Update SizeMst",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    const process_DELETE_SIZEMST = () => {
        var tInData1 = { ...dataKCD_SIZE_MST };
        delete tInData1.__typename;
        delete tInData1.BUYER_NAME;

        console.log(tInData1);

        serviceS0107_KCD_SIZEMST
            .mgrInsert_DELETE_SIZEMST(tInData1)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    if (typeof data.length === "undefined") {
                    } else {
                        console.log(
                            "ServiceMgrKCD_BUYER.mgr1KcdStyle call => " +
                                data.length,
                        );
                        toast.current.show({
                            severity: "success",
                            summary: "SUCCEED:Update SizeMst",
                            detail: data[0].CODE,
                            life: 3000,
                        });
                        search_LIST_1();
                    }
                } else {
                    console.log(
                        "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                            JSON.stringify(data.graphQLErrors),
                    );
                    toast.current.show({
                        severity: "success",
                        summary: "ERROR:Update SizeMst",
                        detail: "",
                        life: 3000,
                    });
                }
            });
    };

    /* */

    const serviceLib = new ServiceLib();
    serviceLib.loginConfirm();
    const serviceS0107_KCD_SIZEMST = new ServiceS0107_KCD_SIZEMST();

    useEffect(() => {
        var _tObj = {};
        _tObj.BUYER_CD = "";
        _tObj.STATUS_CD = "";

        serviceS0107_KCD_SIZEMST.mgrQuery_CODE(_tObj).then((data) => {
            console.log(data);
            if (typeof data.graphQLErrors === "undefined") {
                let arr = [...data.STATUS_CD];

                arr.shift();
                console.log(arr);
                setDatasKCD_SIZE_MST_STATUS_CD(arr);
                setDataKCD_SIZE_MST_STATUS_CD(arr[0]);

                setDatasKCD_SIZE_MST_BUYER_CD(data.BUYER_CD);
                setDataKCD_SIZE_MST_BUYER_CD(data.BUYER_CD[0]);
            } else {
                console.log(
                    "ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " +
                        JSON.stringify(data.graphQLErrors),
                );
            }
        });

        search_LIST_1();
    }, []);

    const clearSelected = () => {
        setSelectedKCD_SIZE_MST([]);
        setFlagSelectMode(false);
    };

    const searchKCD_SIZE_MST = () => {
        clearSelected();
    };

    const resetKCD_SIZE_MST = () => {
        clearSelected();
        //clearSelectedKCD_SIZE_MST();
        setDataKCD_SIZE_MST(emptyKCD_SIZE_MST);
        // setDatasKCD_SIZE_MST([]);
        dataKCD_SIZE_MST.id = 0;
        editKCD_SIZE_MST(emptyKCD_SIZE_MST);
    };

    const editKCD_SIZE_MST = (argKCD_SIZE_MST) => {
        clearSelected();
        setDataKCD_SIZE_MST({ ...argKCD_SIZE_MST });

        let _regSTATUS_CD = datasKCD_SIZE_MST_STATUS_CD.filter(
            (val) => val.CD_CODE === argKCD_SIZE_MST.STATUS_CD,
        );
        setDataKCD_SIZE_MST_STATUS_CD(_regSTATUS_CD[0]);

        let _tArray = datasKCD_SIZE_MST_BUYER_CD.filter(
            (val) => val.BUYER_CD === argKCD_SIZE_MST.BUYER_CD,
        );
        setDataKCD_SIZE_MST_BUYER_CD(_tArray[0]);

        setCreateDialog(true);
    };

    const onRowClick1 = (argData) => {
        let argKCD_SIZE_MST = argData;
        // editKCD_SIZE_MST(argKCD_SIZE_MST);
    };

    const onRowClick = (event) => {
        console.log(event.data);
        let argKCD_SIZE_MST = event.data;
        // if (flagSelectMode) return;
        console.log(
            "RowClick =>" +
                argKCD_SIZE_MST.id +
                "," +
                argKCD_SIZE_MST.STATUS_CD,
        );
        editKCD_SIZE_MST(argKCD_SIZE_MST);
    };

    // Edit
    const onInputChangeKCD_SIZE_MST_SIZE_GROUP = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };

        let tTypeVal = _dataKCD_SIZE_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_SIZE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_SIZE_MST[`${name}`] = parseInt(val);

        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onInputChangeKCD_SIZE_MST_SIZE_GROUP_NAME = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };

        let tTypeVal = _dataKCD_SIZE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataKCD_SIZE_MST[`${name}`] = val.replaceAll(" ", "");
        else if (typeof tTypeVal === "number")
            _dataKCD_SIZE_MST[`${name}`] = parseInt(val);

        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onInputChangeKCD_SIZE_MST_SIZE_MEMBER = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };

        let tTypeVal = _dataKCD_SIZE_MST[`${name}`];
        if (typeof tTypeVal === "string")
            _dataKCD_SIZE_MST[`${name}`] = val.replaceAll(" ", "");
        else if (typeof tTypeVal === "number")
            _dataKCD_SIZE_MST[`${name}`] = parseInt(val);

        let count = val.split(",").length;

        if (val == "") count = 0;
        _dataKCD_SIZE_MST["SIZE_CNT"] = count;

        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onInputChangeKCD_SIZE_MST_SIZE_CNT = (e, name) => {
        let val = (e.target && e.target.value) || "";

        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };

        let tTypeVal = _dataKCD_SIZE_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataKCD_SIZE_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number")
            _dataKCD_SIZE_MST[`${name}`] = parseInt(val);

        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    // Qry
    const onInputChangeQrySizeGroup = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setDataQrySizeGroup(val.replaceAll(" ", ""));
    };

    const onQrySizeGroupKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            searchKCD_SIZE_MST();
        }
    };

    const onDropdownChangeKCD_SIZE_MST_STATUS_CD = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || "";
        setDataKCD_SIZE_MST_STATUS_CD(e.value);
        setQrySizeStatusCD(val);

        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        _dataKCD_SIZE_MST[`${name}`] = String(val);
        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onDropdownChangeKCD_SIZE_MST_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || "";
        setDataKCD_SIZE_MST_BUYER_CD(e.value);

        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        _dataKCD_SIZE_MST[`${name}`] = String(val);
        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onInputChangeQryBuyerCd = (e, name) => {
        let val = (e.target && e.target.value) || "";
        console.log(val);
        setDataQryBuyerCd(val);
    };

    const onInputChangeQrySizeMember = (e, name) => {
        let val = (e.target && e.target.value) || "";
        setQrySizeMember(val.replaceAll(" ", ""));
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
                let EXCEL_TYPE =
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                let EXCEL_EXTENSION = ".xlsx";
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });

                module.default.saveAs(
                    data,
                    fileName +
                        "_export_" +
                        new Date().getTime() +
                        EXCEL_EXTENSION,
                );
            }
        });
    };

    const onQryEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log("enter press here! ");
            search_LIST_1();
        }
    };

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
                            value={dataKCD_SIZE_MST_STATUS_CD}
                            onChange={(e) =>
                                onDropdownChangeKCD_SIZE_MST_STATUS_CD(e, " ")
                            }
                            options={datasKCD_SIZE_MST_STATUS_CD}
                            optionLabel="CD_NAME"
                            placeholder=""
                            editable
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "20rem" }}>
                    <p className="af-span-p" style={{ width: "7rem" }}>Buyer</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <Dropdown
                            style={{ width: "12rem" }}
                            id="id_STATUS_CD"
                            value={dataQryBuyerCd}
                            onChange={(e) =>
                                onInputChangeQryBuyerCd(e, "QryBuyerCd")
                            }
                            options={datasKCD_SIZE_MST_BUYER_CD}
                            optionLabel="BUYER_NAME"
                            placeholder=""
                            filter
                        ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "22rem" }}>
                    <p className="af-span-p" style={{ width: "9rem" }}>Size Group</p>
                    <div className="af-span-div" style={{ width: "12rem" }}>
                        <InputText
                            style={{ width: "12rem" }}
                            type="search"
                            onChange={(e) =>
                                onInputChangeQrySizeGroup(e, "QrySizeGroup")
                            }
                            placeholder=""
                            onKeyPress={(e) => onQryEnterKeyPress(e)}
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
                            onChange={(e) =>
                                onInputChangeQrySizeMember(e, "QryBuyerCd")
                            }
                            onKeyPress={(e) => onQrySizeGroupKeyPress(e)}
                        />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: "6rem" }}>
                    <div className="af-span-div-btn" style={{ width: "5rem" }}>
                        <Tooltip
                            className="menuCodeTooltip"
                            target={`#btnSearch`}
                            content={`Alt+S`}
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
                        console.log(
                            "selected length:" + selectedKCD_SIZE_MST.length,
                        );
                        onRowClick1(e.value);
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
                    <AFColumn field="BUYER_NAME" headerClassName="t-header" header="Buyer" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SIZE_GROUP_NAME" headerClassName="t-header" header="Size Group" style={{ width: "8rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SIZE_CNT" headerClassName="t-header" header="Total" bodyClassName="col-right " style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="SIZE_MEMBER" headerClassName="t-header" header="Size Contents" style={{ width: "40rem", flexBasis: "auto" }} ></AFColumn>
                    <AFColumn field="STATUS_CD_N" headerClassName="t-header" header="Status" style={{ width: "5rem", flexBasis: "auto" }} ></AFColumn>
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
                            onChange={(e) =>
                                onInputChangeKCD_SIZE_MST_SIZE_GROUP(
                                    e,
                                    "SIZE_GROUP",
                                )
                            }
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
                        ></Dropdown>
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
                            onChange={(e) =>
                                onInputChangeKCD_SIZE_MST_SIZE_GROUP_NAME(
                                    e,
                                    "SIZE_GROUP_NAME",
                                )
                            }
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
                            onChange={(e) =>
                                onInputChangeKCD_SIZE_MST_SIZE_MEMBER(
                                    e,
                                    "SIZE_MEMBER",
                                )
                            }
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
                            onChange={(e) =>
                                onInputChangeKCD_SIZE_MST_SIZE_CNT(
                                    e,
                                    "SIZE_CNT",
                                )
                            }
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
                        ></Dropdown>
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
