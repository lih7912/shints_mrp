import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
import { Dropdown } from "primereact/dropdown";
import { ServiceKCD_USER } from "../service/service_mgrKcdUser/ServiceKCD_USER";
import { ServiceKCD_USERMENU } from "../service/service_mgrKcdUser/ServiceKCD_USERMENU";
import { ServiceKCD_CODE } from "../service/service_mgrKcdUser/ServiceKCD_CODE";
import { ServiceKCD_FACTORY } from "../service/service_mgrKcdUser/ServiceKCD_FACTORY";

const MgrKcdUser = () => {
    let emptyKCD_USER = {
        id: 0,
        USER_ID: "",
        PASSWD: "",
        USER_NAME: "",
        FACTORY_CD: "",
        PART: "",
        RANK1: "",
        EMAIL: "",
        USER_LEVEL: "",
        STATUS_CD: "",
        AUTH_KEY: "",
        ID_RSA: "",
        TEL_NO: "",
        EXCEL: "",
        BUYER_TEAM: "",
        CELLULAR: "",
        EMP_NO: "",
        FACTORY_NAME: "",
        PART_NAME: "",
        STATUS_NAME: "",
    };

    let emptyKCD_USERMENU = {
        id: 0,
        USER_ID: "",
        MENU_ID: "",
        AUTH_FLAG: "",
        UPD_FLAG: "",
        MENU_NAME: "",
    };

    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

    let emptyKCD_FACTORY = {
        id: 0,
        FACTORY_CD: "",
        FACTORY_NAME: "",
        FACTORY_NAME2: "",
        USER_NAME: "",
        EMAIL: "",
        COUNTRY: "",
        TEL_NO: "",
        FAX_NO: "",
        ZIP_NO: "",
        AUTH_KEY: "",
        ADDR2: "",
        PORT: "",
        AIRPORT: "",
        NAT_CD: "",
        BANK_CD: "",
        STATUS_CD: "",
        ID_RSA: "",
        REG_DATETIME: "",
        UPD_USER: "",
        UPD_DATETIME: "",
        tag_po: "",
        tag_order: "",
        place_cd: "",
        PACK_NAME: "",
    };

    const [qrySearchString, setQrySearchString] = useState("");
    const [qryStatus, setQryStatus] = useState(emptyKCD_CODE);

    const [regSTATUS_CD, setRegSTATUS_CD] = useState({});
    const [regPART, setRegPART] = useState({});
    const [regFACTORY, setRegFACTORY] = useState({});

    const [datasKCD_USER, setDatasKCD_USER] = useState([]);
    const [datasKCD_USERMENU, setDatasKCD_USERMENU] = useState([]);
    const [datasKCD_CODE_STATUS_CD, setDatasKCD_CODE_STATUS_CD] = useState([]);
    const [datasKCD_CODE_PART, setDatasKCD_CODE_PART] = useState([]);
    const [datasKCD_FACTORY, setDatasKCD_FACTORY] = useState([]);
    const [createDialog, setCreateDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteDatasDialog, setDeleteDatasDialog] = useState(false);
    const [dataKCD_USER, setDataKCD_USER] = useState(emptyKCD_USER);
    const [selectedKCD_USER, setSelectedKCD_USER] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [flagModal, setFlagModal] = useState(false);
    const [flagSelectMode, setFlagSelectMode] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const dt_usermenu = useRef(null);

    useEffect(() => {
        const serviceKCD_USER = new ServiceKCD_USER();
        serviceKCD_USER.getDatasByParamKCD_USER("", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_USER(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });

        const serviceKCD_CODE = new ServiceKCD_CODE();
        serviceKCD_CODE.getDatasKCD_CODE_STATUS_CD().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_CODE_STATUS_CD(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
        serviceKCD_CODE.getDatasKCD_CODE_PART().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_CODE_PART(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
        const serviceKCD_FACTORY = new ServiceKCD_FACTORY();
        serviceKCD_FACTORY.getDatasKCD_FACTORY().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_FACTORY(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const clearSelected = () => {
        setSelectedKCD_USER([]);
        setFlagSelectMode(false);
    };

    const openNew = () => {
        clearSelected();
        setDataKCD_USER(emptyKCD_USER);
        setSubmitted(false);
        setCreateDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCreateDialog(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const hideDeleteDatasDialog = () => {
        clearSelected();
        setDeleteDatasDialog(false);
    };

    const searchRefresh = () => {
        clearSelected();
        setCreateDialog(false);
        const serviceKCD_USER = new ServiceKCD_USER();
        serviceKCD_USER.getDatasByParamKCD_USER("", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_USER(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    };

    const searchKCD_USER = () => {
        clearSelected();
        setCreateDialog(false);
        let _qryStr =
            "query value: " + qrySearchString + "=>" + qryStatus.CD_CODE;
        toast.current.show({
            severity: "success",
            summary: "Query",
            detail: _qryStr,
            life: 3000,
        });
        const serviceKCD_USER = new ServiceKCD_USER();
        serviceKCD_USER
            .getDatasByParamKCD_USER(qrySearchString, qryStatus.CD_CODE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKCD_USER(data);
                } else {
                    var tStr = data.graphQLErrors[0].message;
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });
    };

    const copyKCD_USER = () => {
        dataKCD_USER.id = 0;
        saveKCD_USER();
    };

    const saveKCD_USER = () => {
        setSubmitted(true);

        if (typeof dataKCD_USER.id !== "undefined") {
            let _datasKCD_USER = [...datasKCD_USER];
            let _dataKCD_USER = { ...dataKCD_USER };

            const serviceKCD_USER = new ServiceKCD_USER();
            if (dataKCD_USER.id > 0) {
                const index = findIndexById(dataKCD_USER.id);
                _datasKCD_USER[index] = _dataKCD_USER;
                serviceKCD_USER
                    .updateDataKCD_USER(_dataKCD_USER)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            toast.current.show({
                                severity: "success",
                                summary: "Successful",
                                detail: "KCD_USER Updated",
                                life: 3000,
                            });
                            serviceKCD_USER
                                .getDatasByParamKCD_USER("", "")
                                .then((data) => setDatasKCD_USER(data));
                        } else {
                            var tStr = data.graphQLErrors[0].message;
                            toast.current.show({
                                severity: "success",
                                summary: "Query Error",
                                detail: tStr,
                                life: 3000,
                            });
                        }
                    });
            } else {
                _dataKCD_USER.id = 999999;
                _datasKCD_USER.push(_dataKCD_USER);
                serviceKCD_USER
                    .createDataKCD_USER(_dataKCD_USER)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            toast.current.show({
                                severity: "success",
                                summary: "Successful",
                                detail: "KCD_USER Created",
                                life: 3000,
                            });
                            serviceKCD_USER
                                .getDatasByParamKCD_USER("", "")
                                .then((data) => setDatasKCD_USER(data));
                        } else {
                            var tStr = data.graphQLErrors[0].message;
                            toast.current.show({
                                severity: "success",
                                summary: "Query Error",
                                detail: tStr,
                                life: 3000,
                            });
                        }
                    });
                if (datasKCD_USERMENU.length > 0) {
                    const serviceKCD_USERMENU = new ServiceKCD_USERMENU();
                    serviceKCD_USERMENU
                        .insertsDataKCD_USERMENU(
                            _dataKCD_USER.USER_ID,
                            datasKCD_USERMENU,
                        )
                        .then((data) => {
                            if (typeof data.graphQLErrors === "undefined") {
                                toast.current.show({
                                    severity: "success",
                                    summary: "Successful",
                                    detail: "KCD_USERMENU Created",
                                    life: 3000,
                                });
                                serviceKCD_USER
                                    .getDatasByParamKCD_USER("", "")
                                    .then((data) => setDatasKCD_USER(data));
                            } else {
                                var tStr = data.graphQLErrors[0].message;
                                toast.current.show({
                                    severity: "success",
                                    summary: "Query Error",
                                    detail: tStr,
                                    life: 3000,
                                });
                            }
                        });
                }
            }

            setDatasKCD_USER(_datasKCD_USER);
            setCreateDialog(false);
            setDataKCD_USER(emptyKCD_USER);
        }
    };

    const editKCD_USER = (argKCD_USER) => {
        clearSelected();
        setDataKCD_USER({ ...argKCD_USER });
        setDatasKCD_USERMENU([]);

        let _regSTATUS_CD = datasKCD_CODE_STATUS_CD.filter(
            (val) => val.CD_CODE === argKCD_USER.STATUS_CD,
        );
        setRegSTATUS_CD(_regSTATUS_CD[0]);

        let _regPART = datasKCD_CODE_PART.filter(
            (val) => val.CD_CODE === argKCD_USER.PART,
        );
        setRegPART(_regPART[0]);

        let _regFACTORY = datasKCD_FACTORY.filter(
            (val) => val.FACTORY_CD === argKCD_USER.FACTORY_CD,
        );
        setRegFACTORY(_regFACTORY[0]);

        setCreateDialog(true);
    };

    const onRowClick = (event) => {
        let argKCD_USER = event.data;
        if (flagSelectMode) return;
        console.log(
            "RowClick =>" +
                argKCD_USER.id +
                "," +
                argKCD_USER.STATUS_CD +
                "," +
                argKCD_USER.FACTORY_CD +
                "," +
                argKCD_USER.PART,
        );
        editKCD_USER(argKCD_USER);

        const serviceKCD_USERMENU = new ServiceKCD_USERMENU();
        serviceKCD_USERMENU.qryUserIdKCD_USERMENU(argKCD_USER).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_USERMENU(data);
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
    };

    const confirmDeleteKCD_USER = (argKCD_USER) => {
        clearSelected();
        setDataKCD_USER(argKCD_USER);
        setDeleteDialog(true);
    };

    const deleteKCD_USER = () => {
        clearSelected();
        const serviceKCD_USER = new ServiceKCD_USER();
        let _dataKCD_USER = { ...dataKCD_USER };
        console.log("deleteKCD_USER==>" + _dataKCD_USER.id);
        serviceKCD_USER.deleteDataKCD_USER(_dataKCD_USER).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KCD_USER DELETE",
                    life: 3000,
                });
                serviceKCD_USER
                    .getDatasByParamKCD_USER("", "")
                    .then((data) => setDatasKCD_USER(data));
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });

        // setDatasKCD_USER(_datasKCD_USER);
        setDeleteDialog(false);
        setDataKCD_USER(emptyKCD_USER);
        setDatasKCD_USERMENU([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_USER Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < datasKCD_USER.length; i++) {
            if (datasKCD_USER[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const getDateYYYYMMDD = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = "";
        if (mm > 9) mm_str = mm;
        else mm_str = "0" + mm;

        var dd = tDate.getDate();
        var dd_str = "";
        if (dd > 9) dd_str = dd;
        else dd_str = "0" + dd;

        var hours = tDate.getHours();
        var hours_str = "";
        if (hours > 9) hours_str = hours;
        else hours_str = "0" + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = "";
        if (minutes > 9) minutes_str = minutes;
        else minutes_str = "0" + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = "";
        if (seconds > 9) seconds_str = seconds;
        else seconds_str = "0" + seconds;

        var yyyy = tDate.getFullYear();

        var tRet =
            yyyy + mm_str + dd_str + hours_str + minutes_str + seconds_str;
        return tRet;
    };

    const createId = () => {
        let id = "";
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteDatasDialog(true);
    };

    const deleteSelectedKCD_USER = () => {
        const serviceKCD_USER = new ServiceKCD_USER();
        serviceKCD_USER.deletesDataKCD_USER(selectedKCD_USER).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail:
                        "KCD_USER DELETS => " + data.mgrKcdUserDeletes.count,
                    life: 3000,
                });
                serviceKCD_USER
                    .getDatasByParamKCD_USER("", "")
                    .then((data) => setDatasKCD_USER(data));
            } else {
                var tStr = data.graphQLErrors[0].message;
                toast.current.show({
                    severity: "success",
                    summary: "Query Error",
                    detail: tStr,
                    life: 3000,
                });
            }
        });
        setFlagSelectMode(false);
        setDeleteDatasDialog(false);
        setSelectedKCD_USER([]);
        setDatasKCD_USERMENU([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_USER Deleted",
            life: 3000,
        });
    };

    const onCategoryChange = (e) => {
        /*
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
        */
    };

    const onQrySearchStringChange = (e) => {
        const val = (e.target && e.target.value) || "";
        setQrySearchString(val);
    };

    const onQryStatusChange = (e) => {
        setQryStatus(e.value);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _dataKCD_USER = { ...dataKCD_USER };
        _dataKCD_USER[`${name}`] = val;

        setDataKCD_USER(_dataKCD_USER);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _dataKCD_USER = { ...dataKCD_USER };
        _dataKCD_USER[`${name}`] = val;

        setDataKCD_USER(_dataKCD_USER);
    };

    const onDropdownChange = (e, name) => {
        const val = (e.value && e.value.CD_CODE) || "";
        if (name === "STATUS_CD") {
            setRegSTATUS_CD(e.value);
        }
        if (name === "PART") {
            setRegPART(e.value);
        }
        let _dataKCD_USER = { ...dataKCD_USER };
        _dataKCD_USER[`${name}`] = val;
        setDataKCD_USER(_dataKCD_USER);
    };

    const onDropdownChangeFactory = (e, name) => {
        const val = (e.value && e.value.FACTORY_CD) || "";
        setRegFACTORY(e.value);
        let _dataKCD_USER = { ...dataKCD_USER };
        _dataKCD_USER[`${name}`] = val;
        setDataKCD_USER(_dataKCD_USER);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="New"
                        icon="pi pi-plus"
                        className="p-button-success mr-2"
                        onClick={openNew}
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedKCD_USER || !selectedKCD_USER.length}
                    />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload
                    mode="basic"
                    accept="image/*"
                    maxFileSize={1000000}
                    label="Import"
                    chooseLabel="Import"
                    className="mr-2 inline-block"
                />
                <Button
                    label="Export"
                    icon="pi pi-upload"
                    className="p-button-help"
                    onClick={exportCSV}
                />
            </React.Fragment>
        );
    };

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img
                    src={`assets/demo/images/product/${rowData.image}`}
                    alt={rowData.image}
                    className="shadow-2"
                    width="100"
                />
            </>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readonly cancel={false} />
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span
                    className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
                >
                    {rowData.inventoryStatus}
                </span>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editKCD_USER(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning mt-2"
                    onClick={() => confirmDeleteKCD_USER(rowData)}
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">KCD_USER Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => onQrySearchStringChange(e)}
                    placeholder="Search..."
                />
                <Dropdown
                    id="id_qry_status"
                    value={qryStatus}
                    onChange={(e) => onQryStatusChange(e)}
                    options={datasKCD_CODE_STATUS_CD}
                    optionLabel="CD_NAME"
                    placeholder="Select One"
                ></Dropdown>
                <Tooltip
                    className="menuCodeTooltip"
                    target={`#btnSearch`}
                    content={`Alt+S`}
                    position="bottom"
                />
                <Button
                    label={
                        <span>
                            Search(<u>S</u>)
                        </span>
                    }
                    accessKey="S"
                    id="btnSearch"
                    icon="pi pi-search"
                    className="p-button-text"
                    onClick={searchKCD_USER}
                />
                <Button
                    label="Reload"
                    icon="pi pi-refresh"
                    className="p-button-text"
                    onClick={searchRefresh}
                />
            </span>
        </div>
    );

    const header_usermenu = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">KCD_USERMENU Products</h5>
        </div>
    );

    const createDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveKCD_USER}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_USER}
            />
        </>
    );
    const deleteDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKCD_USER}
            />
        </>
    );
    const deleteDatasDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDatasDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedKCD_USER}
            />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={datasKCD_USER}
                        selectionMode="checkbox"
                        selection={selectedKCD_USER}
                        onSelectionChange={(e) => {
                            setFlagSelectMode(true);
                            setSelectedKCD_USER(e.value);
                            console.log(
                                "selected length:" + selectedKCD_USER.length,
                            );
                        }}
                        onRowClick={onRowClick}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        emptyMessage="No KCD_USER found."
                        header={header}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="40vh"
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: "3rem" }}
                        ></Column>
                        <Column
                            field="USER_ID"
                            header="사용자ID"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="PASSWORD"
                            header="비밀번호"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="USER_NAME"
                            header="사용자명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="FACTORY_NAME"
                            header="소속명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="PART_NAME"
                            header="부서명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="EMAIL"
                            header="이메일"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="USER_LEVEL"
                            header="레벨"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="STATUS_CD"
                            header="상태"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        visible={createDialog}
                        position="top-right"
                        style={{ width: "40wh" }}
                        header="은행계좌정보 Details"
                        modal={flagModal}
                        className="p-fluid"
                        footer={createDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="id_USER_ID">사용저ID</label>
                            <InputText
                                id="id_USER_ID"
                                value={dataKCD_USER.USER_ID}
                                onChange={(e) => onInputChange(e, "USER_ID")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.USER_ID,
                                })}
                            />
                            {submitted && !dataKCD_USER.USER_ID && (
                                <small className="p-invalid">
                                    USER_ID is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_PASSWD">비밀번호</label>
                            <InputText
                                id="id_PASSWD"
                                value={dataKCD_USER.PASSWD}
                                onChange={(e) => onInputChange(e, "PASSWD")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.PASSWD,
                                })}
                            />
                            {submitted && !dataKCD_USER.PASSWD && (
                                <small className="p-invalid">
                                    PASSWD is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_USER_NAME">사용자명</label>
                            <InputText
                                id="id_USER_NAME"
                                value={dataKCD_USER.USER_NAME}
                                onChange={(e) => onInputChange(e, "USER_NAME")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.USER_NAME,
                                })}
                            />
                            {submitted && !dataKCD_USER.USER_NAME && (
                                <small className="p-invalid">
                                    USER_NAME is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_FACTORY_CD">소속</label>
                            <Dropdown
                                id="id_FACTORY_CD"
                                value={regFACTORY}
                                onChange={(e) =>
                                    onDropdownChangeFactory(e, "FACTORY_CD")
                                }
                                options={datasKCD_FACTORY}
                                optionLabel="FACTORY_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                            {submitted && !dataKCD_USER.FACTORY_CD && (
                                <small className="p-invalid">
                                    FACTORY_CD is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_PART">부서</label>
                            <Dropdown
                                id="id_PART"
                                value={regPART}
                                onChange={(e) => onDropdownChange(e, "PART")}
                                options={datasKCD_CODE_PART}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                            {submitted && !dataKCD_USER.PART && (
                                <small className="p-invalid">
                                    PART is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_RANK1">레벨</label>
                            <InputText
                                id="id_RANK1"
                                value={dataKCD_USER.RANK1}
                                onChange={(e) => onInputChange(e, "RANK1")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.RANK1,
                                })}
                            />
                            {submitted && !dataKCD_USER.RANK1 && (
                                <small className="p-invalid">
                                    RANK1 is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_EMAIL">EMAIL</label>
                            <InputText
                                id="id_EMAIL"
                                value={dataKCD_USER.EMAIL}
                                onChange={(e) => onInputChange(e, "EMAIL")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.EMAIL,
                                })}
                            />
                            {submitted && !dataKCD_USER.EMAIL && (
                                <small className="p-invalid">
                                    EMAIL is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_USER_LEVEL">레벨</label>
                            <InputText
                                id="id_USER_LEVEL"
                                value={dataKCD_USER.USER_LEVEL}
                                onChange={(e) => onInputChange(e, "USER_LEVEL")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.USER_LEVEL,
                                })}
                            />
                            {submitted && !dataKCD_USER.USER_LEVEL && (
                                <small className="p-invalid">
                                    USER_LEVEL is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_STATUS_CD">상태</label>
                            <Dropdown
                                id="id_STATUS_CD"
                                value={regSTATUS_CD}
                                onChange={(e) =>
                                    onDropdownChange(e, "STATUS_CD")
                                }
                                options={datasKCD_CODE_STATUS_CD}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                            {submitted && !dataKCD_USER.STATUS_CD && (
                                <small className="p-invalid">
                                    STATUS_CD is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_AUTH_KEY">AUTH_KEY</label>
                            <InputText
                                id="id_AUTH_KEY"
                                value={dataKCD_USER.AUTH_KEY}
                                onChange={(e) => onInputChange(e, "AUTH_KEY")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.AUTH_KEY,
                                })}
                            />
                            {submitted && !dataKCD_USER.AUTH_KEY && (
                                <small className="p-invalid">
                                    ADDR is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_ID_RSA">RSA</label>
                            <InputText
                                id="id_ID_RSA"
                                value={dataKCD_USER.ID_RSA}
                                onChange={(e) => onInputChange(e, "ID_RSA")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.ID_RSA,
                                })}
                            />
                            {submitted && !dataKCD_USER.ID_RSA && (
                                <small className="p-invalid">
                                    ID_RSA is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_TEL_NO">전화</label>
                            <InputText
                                id="id_TEL_NO"
                                value={dataKCD_USER.TEL_NO}
                                onChange={(e) => onInputChange(e, "TEL_NO")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.TEL_NO,
                                })}
                            />
                            {submitted && !dataKCD_USER.TEL_NO && (
                                <small className="p-invalid">
                                    TEL_NO is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_EXCEL">EXCEL</label>
                            <InputText
                                id="id_EXCEL"
                                value={dataKCD_USER.EXCEL}
                                onChange={(e) => onInputChange(e, "EXCEL")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.EXCEL,
                                })}
                            />
                            {submitted && !dataKCD_USER.EXCEL && (
                                <small className="p-invalid">
                                    EXCEL is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_BUYER_TEAM">BUYER_TEAM</label>
                            <InputText
                                id="id_BUYER_TEAM"
                                value={dataKCD_USER.BUYER_TEAM}
                                onChange={(e) => onInputChange(e, "BUYER_TEAM")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.BUYER_TEAM,
                                })}
                            />
                            {submitted && !dataKCD_USER.BUYER_TEAM && (
                                <small className="p-invalid">
                                    BUYER_TEAM is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_CELLULAR">CELLULAR</label>
                            <InputText
                                id="id_CELLULAR"
                                value={dataKCD_USER.CELLULAR}
                                onChange={(e) => onInputChange(e, "CELLULAR")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.CELLULAR,
                                })}
                            />
                            {submitted && !dataKCD_USER.CELLULAR && (
                                <small className="p-invalid">
                                    CELLULAR is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_EMP_NO">사원번호</label>
                            <InputText
                                id="id_EMP_NO"
                                value={dataKCD_USER.EMP_NO}
                                onChange={(e) => onInputChange(e, "EMP_NO")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_USER.EMP_NO,
                                })}
                            />
                            {submitted && !dataKCD_USER.EMP_NO && (
                                <small className="p-invalid">
                                    EMP_NO is required.
                                </small>
                            )}
                        </div>
                        <DataTable
                            ref={dt_usermenu}
                            value={datasKCD_USERMENU}
                            dataKey="id"
                            className="datatable-responsive"
                            emptyMessage="No KCD_USERMENU found."
                            header={header_usermenu}
                            responsiveLayout="scroll"
                            scrollable
                            scrollHeight="30vh"
                        >
                            <Column
                                field="MENU_ID"
                                header="메뉴ID"
                                sortable
                                headerStyle={{
                                    width: "14%",
                                    minWidth: "10rem",
                                }}
                            ></Column>
                            <Column
                                field="MENU_NAME"
                                header="메뉴명"
                                sortable
                                headerStyle={{
                                    width: "14%",
                                    minWidth: "10rem",
                                }}
                            ></Column>
                            <Column
                                field="AUTH_FLAG"
                                header="AUTH_FLAG"
                                sortable
                                headerStyle={{
                                    width: "14%",
                                    minWidth: "10rem",
                                }}
                            ></Column>
                            <Column
                                field="UPD_FLAG"
                                header="UPD_FLAG"
                                sortable
                                headerStyle={{
                                    width: "14%",
                                    minWidth: "10rem",
                                }}
                            ></Column>
                        </DataTable>
                    </Dialog>

                    <Dialog
                        visible={deleteDialog}
                        style={{ width: "450px" }}
                        header="Confirm"
                        modal
                        footer={deleteDialogFooter}
                        onHide={hideDeleteDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: "2rem" }}
                            />
                            {dataKCD_USER && (
                                <span>
                                    Are you sure you want to delete{" "}
                                    <b>{dataKCD_USER.USER_ID}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteDatasDialog}
                        style={{ width: "450px" }}
                        header="Confirm"
                        modal
                        footer={deleteDatasDialogFooter}
                        onHide={hideDeleteDatasDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: "2rem" }}
                            />
                            {dataKCD_USER && (
                                <span>
                                    Are you sure you want to delete the selected
                                    products?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MgrKcdUser, comparisonFn);
