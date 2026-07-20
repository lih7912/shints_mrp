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
import { ServiceKCD_SIZE_MST } from "../service/service_mgrKcdSizeMst/ServiceKCD_SIZE_MST";
import { ServiceKCD_CODE } from "../service/service_mgrKcdUser/ServiceKCD_CODE";

const MgrKcdSizeMst = () => {
    let emptyKCD_SIZE_MST = {
        id: 0,
        SIZE_GROUP: "",
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

    const [qrySizeGroup, setQrySizeGroup] = useState("");
    const [qrySizeMember, setQrySizeMember] = useState("");

    const [regSTATUS_CD, setRegSTATUS_CD] = useState({});

    const [datasKCD_SIZE_MST, setDatasKCD_SIZE_MST] = useState([]);
    const [datasKCD_CODE_STATUS_CD, setDatasKCD_CODE_STATUS_CD] = useState([]);
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

    useEffect(() => {
        const serviceKCD_SIZE_MST = new ServiceKCD_SIZE_MST();
        serviceKCD_SIZE_MST.getDatasByParamKCD_SIZE_MST("", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_SIZE_MST(data);
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
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const clearSelected = () => {
        setSelectedKCD_SIZE_MST([]);
        setFlagSelectMode(false);
    };

    const openNew = () => {
        clearSelected();
        setDataKCD_SIZE_MST(emptyKCD_SIZE_MST);
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
        const serviceKCD_SIZE_MST = new ServiceKCD_SIZE_MST();
        serviceKCD_SIZE_MST.getDatasByParamKCD_SIZE_MST("", "").then((data) => {
            if (typeof data.graphQLErrors === "undefined") {
                setDatasKCD_SIZE_MST(data);
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

    const searchKCD_SIZE_MST = () => {
        clearSelected();
        setCreateDialog(false);
        let _qryStr = "query value: " + qrySizeGroup + "=>" + qrySizeMember;
        toast.current.show({
            severity: "success",
            summary: "Query",
            detail: _qryStr,
            life: 3000,
        });
        const serviceKCD_SIZE_MST = new ServiceKCD_SIZE_MST();
        serviceKCD_SIZE_MST
            .getDatasByParamKCD_SIZE_MST(qrySizeGroup, qrySizeMember)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    setDatasKCD_SIZE_MST(data);
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

    const copyKCD_SIZE_MST = () => {
        dataKCD_SIZE_MST.id = 0;
        saveKCD_SIZE_MST();
    };

    const saveKCD_SIZE_MST = () => {
        setSubmitted(true);

        if (typeof dataKCD_SIZE_MST.id !== "undefined") {
            let _datasKCD_SIZE_MST = [...datasKCD_SIZE_MST];
            let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };

            const serviceKCD_SIZE_MST = new ServiceKCD_SIZE_MST();
            if (dataKCD_SIZE_MST.id > 0) {
                const index = findIndexById(dataKCD_SIZE_MST.id);
                _dataKCD_SIZE_MST.UPD_DATETIME = getDateYYYYMMDD();
                _datasKCD_SIZE_MST[index] = _dataKCD_SIZE_MST;
                serviceKCD_SIZE_MST
                    .updateDataKCD_SIZE_MST(_dataKCD_SIZE_MST)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            toast.current.show({
                                severity: "success",
                                summary: "Successful",
                                detail: "KCD_SIZE_MST Updated",
                                life: 3000,
                            });
                            serviceKCD_SIZE_MST
                                .getDatasByParamKCD_SIZE_MST("", "")
                                .then((data) => setDatasKCD_SIZE_MST(data));
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
                _dataKCD_SIZE_MST.id = 999999;
                _dataKCD_SIZE_MST.REG_DATETIME = getDateYYYYMMDD();
                _dataKCD_SIZE_MST.UPD_DATETIME = getDateYYYYMMDD();
                _datasKCD_SIZE_MST.push(_dataKCD_SIZE_MST);
                serviceKCD_SIZE_MST
                    .createDataKCD_SIZE_MST(_dataKCD_SIZE_MST)
                    .then((data) => {
                        if (typeof data.graphQLErrors === "undefined") {
                            toast.current.show({
                                severity: "success",
                                summary: "Successful",
                                detail: "KCD_SIZE_MST Created",
                                life: 3000,
                            });
                            serviceKCD_SIZE_MST
                                .getDatasByParamKCD_SIZE_MST("", "")
                                .then((data) => setDatasKCD_SIZE_MST(data));
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

            setDatasKCD_SIZE_MST(_datasKCD_SIZE_MST);
            setCreateDialog(false);
            setDataKCD_SIZE_MST(emptyKCD_SIZE_MST);
        }
    };

    const editKCD_SIZE_MST = (argKCD_SIZE_MST) => {
        clearSelected();
        setDataKCD_SIZE_MST({ ...argKCD_SIZE_MST });

        let _regSTATUS_CD = datasKCD_CODE_STATUS_CD.filter(
            (val) => val.CD_CODE === argKCD_SIZE_MST.STATUS_CD,
        );
        setRegSTATUS_CD(_regSTATUS_CD[0]);

        setCreateDialog(true);
    };

    const onRowClick = (event) => {
        let argKCD_SIZE_MST = event.data;
        if (flagSelectMode) return;
        console.log(
            "RowClick =>" +
                argKCD_SIZE_MST.id +
                "," +
                argKCD_SIZE_MST.STATUS_CD,
        );
        editKCD_SIZE_MST(argKCD_SIZE_MST);
    };

    const confirmDeleteKCD_SIZE_MST = (argKCD_SIZE_MST) => {
        clearSelected();
        setDataKCD_SIZE_MST(argKCD_SIZE_MST);
        setDeleteDialog(true);
    };

    const deleteKCD_SIZE_MST = () => {
        clearSelected();
        const serviceKCD_SIZE_MST = new ServiceKCD_SIZE_MST();
        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        console.log("deleteKCD_SIZE_MST==>" + _dataKCD_SIZE_MST.id);
        serviceKCD_SIZE_MST
            .deleteDataKCD_SIZE_MST(_dataKCD_SIZE_MST)
            .then((data) => {
                if (typeof data.graphQLErrors === "undefined") {
                    toast.current.show({
                        severity: "success",
                        summary: "Successful",
                        detail: "KCD_SIZE_MST DELETE",
                        life: 3000,
                    });
                    serviceKCD_SIZE_MST
                        .getDatasByParamKCD_SIZE_MST("", "")
                        .then((data) => setDatasKCD_SIZE_MST(data));
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

        // setDatasKCD_SIZE_MST(_datasKCD_SIZE_MST);
        setDeleteDialog(false);
        setDataKCD_SIZE_MST(emptyKCD_SIZE_MST);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_SIZE_MST Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < datasKCD_SIZE_MST.length; i++) {
            if (datasKCD_SIZE_MST[i].id === id) {
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

    const deleteSelectedKCD_SIZE_MST = () => {
        const serviceKCD_SIZE_MST = new ServiceKCD_SIZE_MST();
        serviceKCD_SIZE_MST
            .deletesDataKCD_SIZE_MST(selectedKCD_SIZE_MST)
            .then((data) => {
                console.log(JSON.stringify(data));
                if (typeof data.mgrKcdSizeMstDeletes !== "undefined") {
                    toast.current.show({
                        severity: "success",
                        summary: "Successful",
                        detail:
                            "KCD_SIZE_MST DELETS => " +
                            data.mgrKcdSizeMstDeletes.count,
                        life: 3000,
                    });
                    serviceKCD_SIZE_MST
                        .getDatasByParamKCD_SIZE_MST("", "")
                        .then((data) => setDatasKCD_SIZE_MST(data));
                } else if (typeof data.graphQLErrors !== "undefined") {
                    var tStr = data.graphQLErrors[0].message;
                    toast.current.show({
                        severity: "success",
                        summary: "Query Error",
                        detail: tStr,
                        life: 3000,
                    });
                } else {
                    var tStr = data.message;
                    toast.current.show({
                        severity: "success",
                        summary: "Common Error",
                        detail: tStr,
                        life: 3000,
                    });
                }
            });
        setFlagSelectMode(false);
        setDeleteDatasDialog(false);
        setSelectedKCD_SIZE_MST([]);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "KCD_SIZE_MST Deleted",
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

    const onQrySizeGroupChange = (e) => {
        const val = (e.target && e.target.value) || "";
        setQrySizeGroup(val);
    };

    const onQrySizeMemberChange = (e) => {
        const val = (e.target && e.target.value) || "";
        setQrySizeMember(val);
    };

    /*
    const onQryStatusChange = (e) => {
        setQryStatus(e.value);
    }
*/

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        _dataKCD_SIZE_MST[`${name}`] = val;

        if (name === "SIZE_MEMBER") {
            var tCols = _dataKCD_SIZE_MST.SIZE_MEMBER.split(",");
            _dataKCD_SIZE_MST.SIZE_CNT = tCols.length;
        }

        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        _dataKCD_SIZE_MST[`${name}`] = val;

        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    const onDropdownChange = (e, name) => {
        const val = (e.value && e.value.CD_CODE) || "";
        if (name === "STATUS_CD") {
            setRegSTATUS_CD(e.value);
        }
        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        _dataKCD_SIZE_MST[`${name}`] = val;
        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    };

    /*
    const onDropdownChangeFactory = (e, name) => {
        const val = (e.value && e.value.FACTORY_CD) || '';
        setRegFACTORY(e.value);
        let _dataKCD_SIZE_MST = { ...dataKCD_SIZE_MST };
        _dataKCD_SIZE_MST[`${name}`] = val;
        setDataKCD_SIZE_MST(_dataKCD_SIZE_MST);
    }
*/

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
                        disabled={
                            !selectedKCD_SIZE_MST ||
                            !selectedKCD_SIZE_MST.length
                        }
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
                    onClick={() => editKCD_SIZE_MST(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning mt-2"
                    onClick={() => confirmDeleteKCD_SIZE_MST(rowData)}
                />
            </div>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">KCD_SIZE_MST Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => onQrySizeGroupChange(e)}
                    placeholder="Search..."
                />
                <InputText
                    type="search"
                    onInput={(e) => onQrySizeMemberChange(e)}
                    placeholder="Search..."
                />
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
                    onClick={searchKCD_SIZE_MST}
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
                onClick={saveKCD_SIZE_MST}
            />
            <Button
                label="Copy"
                icon="pi pi-check"
                className="p-button-text"
                onClick={copyKCD_SIZE_MST}
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
                onClick={deleteKCD_SIZE_MST}
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
                onClick={deleteSelectedKCD_SIZE_MST}
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
                        value={datasKCD_SIZE_MST}
                        selectionMode="checkbox"
                        selection={selectedKCD_SIZE_MST}
                        onSelectionChange={(e) => {
                            setFlagSelectMode(true);
                            setSelectedKCD_SIZE_MST(e.value);
                            console.log(
                                "selected length:" +
                                    selectedKCD_SIZE_MST.length,
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
                        emptyMessage="No KCD_SIZE_MST found."
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
                            field="SIZE_GROUP"
                            header="사이즈그룹"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="SIZE_MEMBER"
                            header="사이즈내역"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column
                            field="SIZE_CNT"
                            header="갯수"
                            sortable
                            headerStyle={{ width: "14%", minWidth: "10rem" }}
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        visible={createDialog}
                        position="top-right"
                        style={{ width: "40wh" }}
                        header="사이즈관리 Details"
                        modal={flagModal}
                        className="p-fluid"
                        footer={createDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="id_SIZE_GROUP">사이즈 그룹</label>
                            <InputText
                                id="id_SIZE_GROUP"
                                value={dataKCD_SIZE_MST.SIZE_GROUP}
                                onChange={(e) => onInputChange(e, "SIZE_GROUP")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted &&
                                        !dataKCD_SIZE_MST.SIZE_GROUP,
                                })}
                            />
                            {submitted && !dataKCD_SIZE_MST.SIZE_GROUP && (
                                <small className="p-invalid">
                                    SIZE_GROUP is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="id_SIZE_MEMBER">사이즈 내역</label>
                            <InputText
                                id="id_SIZE_MEMBER"
                                value={dataKCD_SIZE_MST.SIZE_MEMBER}
                                onChange={(e) =>
                                    onInputChange(e, "SIZE_MEMBER")
                                }
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted &&
                                        !dataKCD_SIZE_MST.SIZE_MEMBER,
                                })}
                            />
                            {submitted && !dataKCD_SIZE_MST.SIZE_MEMBER && (
                                <small className="p-invalid">
                                    SIZE_MEMBER is required.
                                </small>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="id_SIZE_CNT">갯수 </label>
                            <InputText
                                id="id_SIZE_CNT"
                                value={dataKCD_SIZE_MST.SIZE_CNT}
                                onChange={(e) => onInputChange(e, "SIZE_CNT")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid":
                                        submitted && !dataKCD_SIZE_MST.SIZE_CNT,
                                })}
                            />
                            {submitted && !dataKCD_SIZE_MST.SIZE_CNT && (
                                <small className="p-invalid">
                                    SIZE_CNT is required.
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
                            {dataKCD_SIZE_MST && (
                                <span>
                                    Are you sure you want to delete{" "}
                                    <b>{dataKCD_SIZE_MST.USER_ID}</b>?
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
                            {dataKCD_SIZE_MST && (
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

export default React.memo(MgrKcdSizeMst, comparisonFn);
