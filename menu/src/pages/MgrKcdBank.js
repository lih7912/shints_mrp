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
import { ServiceKCD_BANK } from "../service/service_mgrKcdBank/ServiceKCD_BANK";
import { ServiceKCD_CODE } from "../service/service_mgrKcdBank/ServiceKCD_CODE";
import { ServiceKCD_VENDOR } from "../service/service_mgrKcdBank/ServiceKCD_VENDOR";

const MgrKcdBank = () => {
    let emptyKCD_VENDOR = {
        id: 0,
        VENDOR_CD: "",
        VENDOR_NAME: "",
        INVOICE_NAME: "",
        VENDOR_TYPE: "",
        SHINTS_USER: "",
        REG_NO: "",
        PRESIDENT: "",
        USER_NAME: "",
        PART: "",
        RANK1: "",
        EMAIL: "",
        TEL_NO: "",
        FAX_NO: "",
        PAY_TYPE: "",
        PAY_TERM: "",
        LEAD_TIME: "",
        BANK_CD: "",
        NAT_CD: "",
        ZIP_NO: "",
        ADDR1: "",
        ADDR2: "",
        STATUS_CD: "",
        PERMIT: "",
        VENDOR_MATL_TYPE: "",
        REG_USER: "",
        REG_DATETIME: "",
        UPD_USER: "",
        UPD_DATETIME: "",
        BANK1: "",
        BANK2: "",
        GW: "",
        APPROKEY: "",
        BANK_CD2: "",
        BANK_CD3: "",
        NEOE_NO: "",
        REMARK: "",
    };

    let emptyKCD_BANK = {
        id: 0,
        BANK_CD: "",
        BANK_NAME: "",
        ACCOUNT_NO: "",
        SFTCODE: "",
        ADDR1: "",
        ADDR2: "",
        BANK_TYPE: "",
        STATUS_CD: "",
        REG_USER: "",
        REG_DATETIME: "",
        UPD_USER: "",
        UPD_DATETIME: "",
        BANK_BRANCH: "",
        BANK_TYPE1: "",
    };

    let emptyKCD_CODE = {
        id: 0,
        CD_GROUP: "",
        CD_CODE: "",
        CD_NAME: "",
        CD_FLAG: "",
    };

    const [qrySearchString, setQrySearchString] = useState("");
    const [qryStatus, setQryStatus] = useState(emptyKCD_CODE);

    const [regSTATUS_CD, setRegSTATUS_CD] = useState({});
    const [regBANK_TYPE1, setRegBANK_TYPE1] = useState({});

    const [datasKCD_BANK, setDatasKCD_BANK] = useState([]);
    const [datasKCD_VENDOR, setDatasKCD_VENDOR] = useState([]);
    const [datasKCD_CODE_STATUS_CD, setDatasKCD_CODE_STATUS_CD] = useState([]);
    const [datasKCD_CODE_BANK_TYPE1, setDatasKCD_CODE_BANK_TYPE1] = useState(
        [],
    );
    const [createDialog, setCreateDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteDatasDialog, setDeleteDatasDialog] = useState(false);
    const [dataKCD_BANK, setDataKCD_BANK] = useState(emptyKCD_BANK);
    const [selectedKCD_BANK, setSelectedKCD_BANK] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [flagModal, setFlagModal] = useState(false);
    const [flagSelectMode, setFlagSelectMode] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const dt_vendor = useRef(null);

    useEffect(() => {
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK.getDatasKCD_BANK().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_BANK(data);
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
        serviceKCD_CODE.getDatasKCD_CODE_BANK_TYPE1().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_CODE_BANK_TYPE1(data);
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
        setSelectedKCD_BANK([]);
        setFlagSelectMode(false);
    };

    const openNew = () => {
        clearSelected();
        setDataKCD_BANK(emptyKCD_BANK);
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
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK.getDatasKCD_BANK().then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_BANK(data);
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

    const searchKCD_BANK = () => {
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
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK
            .getDatasByParamKCD_BANK(qrySearchString, qryStatus.CD_CODE)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKCD_BANK(data);
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

    const copyKCD_BANK = () => {
        dataKCD_BANK.id = 0;
        saveKCD_BANK();
    };

    const saveKCD_BANK = () => {
        setSubmitted(true);

        if (typeof dataKCD_BANK.id !== "undefined") {
            let _datasKCD_BANK = [...datasKCD_BANK];
            let _dataKCD_BANK = { ...dataKCD_BANK };

            const serviceKCD_BANK = new ServiceKCD_BANK();
            if (dataKCD_BANK.id > 0) {
                const index = findIndexById(dataKCD_BANK.id);
                _dataKCD_BANK.UPD_DATETIME = getDateYYYYMMDD();
                _datasKCD_BANK[index] = _dataKCD_BANK;
                serviceKCD_BANK
                    .updateDataKCD_BANK(_dataKCD_BANK)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            toast.current.show({
                                severity: "success",
                                summary: "Successful",
                                detail: "KCD_BANK Updated",
                                life: 3000,
                            });
                            serviceKCD_BANK
                                .getDatasKCD_BANK()
                                .then((data) => setDatasKCD_BANK(data));
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
                _dataKCD_BANK.id = 999999;
                // _dataKCD_BANK.BANK_CD = createId();
                _dataKCD_BANK.REG_DATETIME = getDateYYYYMMDD();
                _dataKCD_BANK.UPD_DATETIME = getDateYYYYMMDD();
                _datasKCD_BANK.push(_dataKCD_BANK);
                serviceKCD_BANK
                    .createDataKCD_BANK(_dataKCD_BANK)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            toast.current.show({
                                severity: "success",
                                summary: "Successful",
                                detail: "KCD_BANK Created",
                                life: 3000,
                            });
                            serviceKCD_BANK
                                .getDatasKCD_BANK()
                                .then((data) => setDatasKCD_BANK(data));
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

            setDatasKCD_BANK(_datasKCD_BANK);
            setCreateDialog(false);
            setDataKCD_BANK(emptyKCD_BANK);
        }
    };

    const editKCD_BANK = (argKCD_BANK) => {
        clearSelected();
        setDataKCD_BANK({ ...argKCD_BANK });

        let _regSTATUS_CD = datasKCD_CODE_STATUS_CD.filter(
            (val) => val.CD_CODE === argKCD_BANK.STATUS_CD,
        );
        setRegSTATUS_CD(_regSTATUS_CD[0]);

        let _regBANK_TYPE1 = datasKCD_CODE_BANK_TYPE1.filter(
            (val) => val.CD_CODE === argKCD_BANK.BANK_TYPE1,
        );
        setRegBANK_TYPE1(_regBANK_TYPE1[0]);

        setCreateDialog(true);
    };

    const onRowClick = (event) => {
        let argKCD_BANK = event.data;
        if (flagSelectMode) return;
        console.log(
            "RowClick =>" +
                argKCD_BANK.id +
                "," +
                argKCD_BANK.STATUS_CD +
                "," +
                argKCD_BANK.BANK_TYPE1,
        );
        editKCD_BANK(argKCD_BANK);

        const serviceKCD_VENDOR = new ServiceKCD_VENDOR();
        serviceKCD_VENDOR.qryBankCdKCD_VENDOR(argKCD_BANK).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_VENDOR(data);
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

    const confirmDeleteKCD_BANK = (argKCD_BANK) => {
        clearSelected();
        setDataKCD_BANK(argKCD_BANK);
        setDeleteDialog(true);
    };

    const deleteKCD_BANK = () => {
        clearSelected();
        const serviceKCD_BANK = new ServiceKCD_BANK();
        let _dataKCD_BANK = { ...dataKCD_BANK };
        console.log("deleteKCD_BANK==>" + _dataKCD_BANK.id);
        serviceKCD_BANK.deleteDataKCD_BANK(_dataKCD_BANK).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "KCD_BANK DELETE",
                    life: 3000,
                });
                serviceKCD_BANK
                    .getDatasKCD_BANK()
                    .then((data) => setDatasKCD_BANK(data));
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

        // setDatasKCD_BANK(_datasKCD_BANK);
        setDeleteDialog(false);
        setDataKCD_BANK(emptyKCD_BANK);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_BANK Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < datasKCD_BANK.length; i++) {
            if (datasKCD_BANK[i].id === id) {
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

    const deleteSelectedKCD_BANK = () => {
        const serviceKCD_BANK = new ServiceKCD_BANK();
        serviceKCD_BANK.deletesDataKCD_BANK(selectedKCD_BANK).then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail:
                        "KCD_BANK DELETS => " + data.mgrKcdBankDeletes.count,
                    life: 3000,
                });
                serviceKCD_BANK
                    .getDatasKCD_BANK()
                    .then((data) => setDatasKCD_BANK(data));
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
        setSelectedKCD_BANK([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_BANK Deleted",
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
        let _dataKCD_BANK = { ...dataKCD_BANK };
        _dataKCD_BANK[`${name}`] = val;

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _dataKCD_BANK = { ...dataKCD_BANK };
        _dataKCD_BANK[`${name}`] = val;

        setDataKCD_BANK(_dataKCD_BANK);
    };

    const onDropdownChange = (e, name) => {
        const val = (e.value && e.value.CD_CODE) || "";
        if (name === "STATUS_CD") {
            setRegSTATUS_CD(e.value);
        }
        if (name === "BANK_TYPE1") {
            setRegBANK_TYPE1(e.value);
        }
        let _dataKCD_BANK = { ...dataKCD_BANK };
        _dataKCD_BANK[`${name}`] = val;
        setDataKCD_BANK(_dataKCD_BANK);
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
                        disabled={!selectedKCD_BANK || !selectedKCD_BANK.length}
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
                    onClick={() => editKCD_BANK(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning mt-2"
                    onClick={() => confirmDeleteKCD_BANK(rowData)}
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">KCD_BANK Products</h5>
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
                    onClick={searchKCD_BANK}
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

    const header_vendor = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">KCD_VENDOR Products</h5>
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
                onClick={saveKCD_BANK}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_BANK}
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
                onClick={deleteKCD_BANK}
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
                onClick={deleteSelectedKCD_BANK}
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
                        value={datasKCD_BANK}
                        selectionMode="checkbox"
                        selection={selectedKCD_BANK}
                        onSelectionChange={(e) => {
                            setFlagSelectMode(true);
                            setSelectedKCD_BANK(e.value);
                            console.log(
                                "selected length:" + selectedKCD_BANK.length,
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
                        emptyMessage="No KCD_BANK found."
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
                            field="BANK_CD"
                            header="은행코드"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="BANK_NAME"
                            header="은행명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="BANK_BRANCH"
                            header="지점"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="ACCOUNT_NO"
                            header="계좌번호"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="ACCOUNT_NAME"
                            header="계좌명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="SFTCODE"
                            header="Swift코드"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="ADDR1"
                            header="주소1"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="ADDR2"
                            header="주소2"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="STATUS_CD"
                            header="상태"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="REG_USER"
                            header="등록자"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <DataTable
                        ref={dt_vendor}
                        value={datasKCD_VENDOR}
                        dataKey="id"
                        className="datatable-responsive"
                        emptyMessage="No KCD_VENDOR found."
                        header={header_vendor}
                        responsiveLayout="scroll"
                        scrollable
                        scrollHeight="20vh"
                    >
                        <Column
                            field="VENDOR_CD"
                            header="공급사코드"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="VENDOR_NAME"
                            header="공급사명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="INVOICE_NAME"
                            header="인보이스명"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="VENDOR_TYPE"
                            header="공급사타입"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="GW"
                            header="GW"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="NAT_CD"
                            header="국가"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
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
                            <label htmlFor="id_BANK_CD">은행코드</label>
                            <InputText
                                id="id_BANK_CD"
                                value={dataKCD_BANK.BANK_CD}
                                onChange={(e) => onInputChange(e, "BANK_CD")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.BANK_CD,
                                })}
                            />
                            {submitted && !dataKCD_BANK.BANK_CD && (
                                <small className="p-invalid">
                                    BANK_CD is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_BANK_NAME">은행명</label>
                            <InputText
                                id="id_BANK_NAME"
                                value={dataKCD_BANK.BANK_NAME}
                                onChange={(e) => onInputChange(e, "BANK_NAME")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.BANK_NAME,
                                })}
                            />
                            {submitted && !dataKCD_BANK.BANK_NAME && (
                                <small className="p-invalid">
                                    BANK_NAME is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_ACCOUNT_NAME">계좌명</label>
                            <InputText
                                id="id_ACCOUNT_NAME"
                                value={dataKCD_BANK.ACCOUNT_NAME}
                                onChange={(e) =>
                                    onInputChange(e, "ACCOUNT_NAME")
                                }
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.ACCOUNT_NAME,
                                })}
                            />
                            {submitted && !dataKCD_BANK.ACCOUNT_NAME && (
                                <small className="p-invalid">
                                    ACCOUNT_NAME is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_BANK_BRANCH">지점</label>
                            <InputText
                                id="id_BANK_BRANCH"
                                value={dataKCD_BANK.BANK_BRANCH}
                                onChange={(e) =>
                                    onInputChange(e, "BANK_BRANCH")
                                }
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.BANK_BRANCH,
                                })}
                            />
                            {submitted && !dataKCD_BANK.BANK_BRANCH && (
                                <small className="p-invalid">
                                    BANK_BRANCH is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_ACCOUNT_NO">계좌번호</label>
                            <InputText
                                id="id_ACCOUNT_NO"
                                value={dataKCD_BANK.ACCOUNT_NO}
                                onChange={(e) => onInputChange(e, "ACCOUNT_NO")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.ACCOUNT_NO,
                                })}
                            />
                            {submitted && !dataKCD_BANK.ACCOUNT_NO && (
                                <small className="p-invalid">
                                    ACCOUNT_NO is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_SFTCODE">SWIFT Code</label>
                            <InputText
                                id="id_SFTCODE"
                                value={dataKCD_BANK.SFTCODE}
                                onChange={(e) => onInputChange(e, "SFTCODE")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.SFTCODE,
                                })}
                            />
                            {submitted && !dataKCD_BANK.SFTCODE && (
                                <small className="p-invalid">
                                    SFTCODE is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_ADDR1">주소</label>
                            <InputText
                                id="id_ADDR1"
                                value={dataKCD_BANK.ADDR1}
                                onChange={(e) => onInputChange(e, "ADDR1")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.ADDR1,
                                })}
                            />
                            {submitted && !dataKCD_BANK.ADDR1 && (
                                <small className="p-invalid">
                                    ADDR is required.
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
                            {submitted && !dataKCD_BANK.STATUS_CD && (
                                <small className="p-invalid">
                                    STATUS_CD is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_BANK_TYPE1">원화/외화</label>
                            <Dropdown
                                id="id_BANK_TYPE1"
                                value={regBANK_TYPE1}
                                onChange={(e) =>
                                    onDropdownChange(e, "BANK_TYPE1")
                                }
                                options={datasKCD_CODE_BANK_TYPE1}
                                optionLabel="CD_NAME"
                                placeholder="Select One"
                            ></Dropdown>
                            {submitted && !dataKCD_BANK.BANK_TYPE1 && (
                                <small className="p-invalid">
                                    BANK_TYPE1 is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_REG_USER">등록자</label>
                            <InputText
                                id="id_REG_USER"
                                value={dataKCD_BANK.REG_USER}
                                onChange={(e) => onInputChange(e, "REG_USER")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_BANK.REG_USER,
                                })}
                            />
                            {submitted && !dataKCD_BANK.REG_USER && (
                                <small className="p-invalid">
                                    REG_USER is required.
                                </small>
                            )}
                        </div>
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
                            {dataKCD_BANK && (
                                <span>
                                    Are you sure you want to delete{" "}
                                    <b>{dataKCD_BANK.name}</b>?
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
                            {dataKCD_BANK && (
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

export default React.memo(MgrKcdBank, comparisonFn);
