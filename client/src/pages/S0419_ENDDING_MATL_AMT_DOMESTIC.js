/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { AFDataTable } from '../components/AFDataTable';
import { AFColumn } from '../components/AFColumn';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TabView, TabPanel } from 'primereact/tabview';
import ExcelJS from 'exceljs';

import { ServiceLib } from '../service/service_lib/ServiceLib';
import { ServiceS0419_ENDDING_MATL_AMT_DOMESTIC } from '../service/service_biz/ServiceS0419_ENDDING_MATL_AMT_DOMESTIC';
import { ServiceS043001_STSIN_LIST } from '../service/service_biz/ServiceS043001_STSIN_LIST';
import { ServiceS0423_TAXBILL } from '../service/service_biz/ServiceS0423_TAXBILL';

const moment = require('moment');

import './page_common.scss';

const emptyKCD_CODE = {
    id: 0,
    CD_GROUP: '',
    CD_CODE: '',
    CD_NAME: '',
    CD_FLAG: '',
};

const emptyEDT_KSV_CRDB_MST = {
    CRDB_CD: '',
    PART_AMT: '',
    REST_AMT: '',
    PART_DATE: '',
};

const emptyQRY_KSV_CRDB_MST = {
    CRDB_CD: '',
    VENDOR_CD: '',
    CURR_CD: '',
};

const emptyTBL_KSV_CRDB_MST = {
    id: 0,
    END_DATE: '',
    VENDOR_NAME: '',
    END_AMT: '',
    DC: '',
    DN: '',
    CURR_RATE: '',
    SUPPLIED_VALUE: '',
    VAL: '',
    PAY_AMT: '',
    CURR_CD: '',
    KRW_AMT: '',
    GW: '',
    TAX_BILL: '',
    TT_FLAG: '',
    PAY_DATE: '',
    TAXBILL_DATE: '',
    CALC_FLAG: '',
    PUR_APP: '',
    WARE_NAME: '',
    REMARK: '',
    PAY_REPORT: '',
    PAY_PRICE: '',
    VENDOR_CD: '',
    PAY_TERM: '',
    CALC_FLAG: '',
    CRCB_CD: '',
    WARE_CD: '',

};

const emptyTBL_KSV_CRDB_MST2 = {
    id: 0,
    END_DATE: '',
    VENDOR_NAME: '',
    END_AMT: '',
    DC: '',
    DN: '',
    CURR_RATE: '',
    SUPPLIED_VALUE: '',
    VAL: '',
    PAY_AMT: '',
    CURR_CD: '',
    KRW_AMT: '',
    GW: '',
    TAX_BILL: '',
    TT_FLAG: '',
    PAY_DATE: '',
    TAXBILL_DATE: '',
    CALC_FLAG: '',
    PUR_APP: '',
    WARE_NAME: '',
    REMARK: '',
    PAY_REPORT: '',
    PAY_PRICE: '',
    VENDOR_CD: '',
    PAY_TERM: '',
    CALC_FLAG: '',
    CRCB_CD: '',
    WARE_CD: '',

};

const emptyQRY_KSV_STOCK_MEM = {
    VENDOR_TYPE: "",
    PURCHARGER: "",
    PU_CD: "",
    S_PAY_DATE: "",
    E_PAY_DATE: "",
    S_END_DATE: "",
    E_END_DATE: "",
    S_IN_DATE: "",
    E_IN_DATE: "",

    VENDOR_CD: "",
    BUYER_CD: "",
    PO_CD: "",
    IS_ALL: "",
};

const emptyTBL_KSV_STOCK_IN = {
    id: 0,
    PO_CD: '',
    BUYER: '',
    MATL_CD: '',
    MATL_NAME: '',
    COLOR: '',
    SPEC: '',
    IN_QTY_TOT: '',
    IN_QTY_PAY: '',
    IN_CURR_CD: '',
    IN_PRICE: '',
    PAY_CURR_CD: '',
    PAY_PRICE: '',
    MATL_PRICE: '',
    TT_FLAG: '',
    WARE_NAME: '',
    PAY_AMT: '',
    END_FLAG: '',
    END_DATE: '',
    PAY_DATE: '',
    BILL_FLAG: '',
    BILL_DATE: '',
    VENDOR_NAME: '',
    PO_SEQ: '',
    ORDER_CD: '',
    MRP_SEQ: '',
    IN_DATETIME: '',
    MATL_SEQ: '',
    CALC_FLAG: '',
    VENDOR_CD: '',
    PUR_FACTORY: '',
    PAY_REPORT: '',

};

const emptyTBL_KSV_PO_MRP2 = {
    id: 0,
    OP_KIND: '',
    BUYER_NAME: '',
    BUYER_CD: '',
    PO_CD: '',
    VENDOR_NAME: '',
    VENDOR_CD: '',
    KIND1: '',
    MRP_DATE: '',
    ORDER_DATE: '',
    TARGET_ETA: '',
    READY_DATE: '',
    PI_ISSUE: '',
    PI_FIX: '',
    PI_FILE: '',
    PI_CD: '',
    AMOUNT: '',
    PAY_TYPE: '',
    TERM: '',
    REQUEST_DATE: '',
    BANKCOPY_DATE: '',
    CONFIRM_NO: '',

};

const emptyTBL_KSV_PO_MRP3 = {
};

const emptyEDT_KSV_STOCK_MEM = {
    BILL_CD: "",
    VENDOR_CD: "",
    PAY_BANK: "",
    REG_USER: "",
    INVOICE_DATE: "",
    CURR_CD: "",
    PO_AMT: "",
    DEPOSIT_AMT: "",
    DEBIT_AMT: "",
    DISCOUNT_AMT: "",
    PAY_DATE: "",
    VAT_AMT: "",
    PAY_AMT: "",
    TAX_KIND: "",
    IS_TT: "",
    END_AMT: "",
    PUR_FACTORY: "",
    INVOICE_NO: "",
    PAY_RULE: ""
};

const S0419_ENDDING_MATL_AMT_DOMESTIC = () => {

    const serviceLib = new ServiceLib(); serviceLib.loginConfirm();
    const serviceS0419_ENDDING_MATL_AMT_DOMESTICRef = useRef(null);
    if (!serviceS0419_ENDDING_MATL_AMT_DOMESTICRef.current) serviceS0419_ENDDING_MATL_AMT_DOMESTICRef.current = new ServiceS0419_ENDDING_MATL_AMT_DOMESTIC();
    const serviceS0419_ENDDING_MATL_AMT_DOMESTIC = serviceS0419_ENDDING_MATL_AMT_DOMESTICRef.current;
    const serviceS043001_STSIN_LISTRef = useRef(null);
    if (!serviceS043001_STSIN_LISTRef.current) serviceS043001_STSIN_LISTRef.current = new ServiceS043001_STSIN_LIST();
    const serviceS043001_STSIN_LIST = serviceS043001_STSIN_LISTRef.current;
    const serviceS0423_TAXBILLRef = useRef(null);
    if (!serviceS0423_TAXBILLRef.current) serviceS0423_TAXBILLRef.current = new ServiceS0423_TAXBILL();
    const serviceS0423_TAXBILL = serviceS0423_TAXBILLRef.current;
 
    const toast = useRef(null);

    /* */
    const [valueQTY, setValueQTY] = useState(0);
    const [valueLC_QTY, setValueLC_QTY] = useState(0);

    const calcSelectRow = (argData) => {

        var tCheck = 0;
        var tSaveObj = {}; 
        var tSelArray = [];
        let tBillCd = '';

        argData.forEach((col, i) => {
            if (col.BILL_CD) tBillCd = col.BILL_CD;
            if (i === 0) {
                tSaveObj = { ...col };
                tSelArray.push(tSaveObj); 
            } else {
                if (tSaveObj.VENDOR_CD !== col.VENDOR_CD) {
                    tCheck = 1;
                }
                tSaveObj = { ...col };
                tSelArray.push(tSaveObj); 
            }
        });

        if (tCheck === 1) {
            alert('동일한 Vendor만 선택가능합니다<br><br>Only the same vendor can be selected');
            setSelectedTBL_KSV_PO_MRP2([]);
            if (argData.length > 0) {
               var tObj = {};
               tObj.BILL_CD = '';
               if (argData[0].BILL_CD) {
                   tObj.BILL_CD = argData[0].BILL_CD;
               }
               computeAmount (tObj, []); 
            }
        } else {
            setSelectedTBL_KSV_PO_MRP2(argData);
            var tObj = {};
            tObj.BILL_CD = ''; 
            if (argData.length > 0) {
                if (argData[0].BILL_CD) tObj.BILL_CD = argData[0].BILL_CD;
                computeAmount (tObj, argData); 
            }
        }
    }

    /* splitter 관련 */
    const [styleVal, setStyleVal] = useState({ width: '123rem', height:'6rem' });
    const setInfoStyle =() => {
        const rVal = { ...styleVal };
        rVal.display = 'none';
        setStyleVal(rVal);
    }

    // Apply Debit 화면 관련 
    const [dataEDT_KSV_CRDB_MST, setDataEDT_KSV_CRDB_MST] = useState(emptyEDT_KSV_CRDB_MST);

    const onInputChangeEDT_KSV_CRDB_MST_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    }

    const onInputChangeEDT_KSV_CRDB_MST_PART_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    }

    const onInputChangeEDT_KSV_CRDB_MST_REST_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };

        let tTypeVal = _dataEDT_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);
    }

    const onCalChangeEDT_KSV_CRDB_MST_PART_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_CRDB_MST = { ...dataEDT_KSV_CRDB_MST };
        _dataEDT_KSV_CRDB_MST[`${name}`] = val;
        setDataEDT_KSV_CRDB_MST(_dataEDT_KSV_CRDB_MST);

    }

    /* QRY KSV_CRDB_MST */
    const [dataQRY_KSV_CRDB_MST, setDataQRY_KSV_CRDB_MST] = useState(emptyQRY_KSV_CRDB_MST);

    const onInputChangeQRY_KSV_CRDB_MST_CRDB_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    }

    const onInputChangeQRY_KSV_CRDB_MST_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    }

    const onInputChangeQRY_KSV_CRDB_MST_CURR_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_CRDB_MST = { ...dataQRY_KSV_CRDB_MST };

        let tTypeVal = _dataQRY_KSV_CRDB_MST[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_CRDB_MST[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_CRDB_MST[`${name}`] = parseInt(val);

        setDataQRY_KSV_CRDB_MST(_dataQRY_KSV_CRDB_MST);
    }

    // TBL_KSV_CRDB_MST
    const [datasTBL_KSV_CRDB_MST, setDatasTBL_KSV_CRDB_MST] = useState([]);
    const dt_TBL_KSV_CRDB_MST = useRef(null);
    const [dataTBL_KSV_CRDB_MST, setDataTBL_KSV_CRDB_MST] = useState(emptyTBL_KSV_CRDB_MST);
    const [selectedTBL_KSV_CRDB_MST, setSelectedTBL_KSV_CRDB_MST] = useState([]);
    const [flagSelectModeTBL_KSV_CRDB_MST, setFlagSelectModeTBL_KSV_CRDB_MST] = useState(false);

    const [loadingTBL_KSV_CRDB_MST, setLoadingTBL_KSV_CRDB_MST] = useState(false);

    // DATAGRID CODE : TBL_KSV_CRDB_MST
    const searchRefreshTBL_KSV_CRDB_MST = () => {
        clearSelectedTBL_KSV_CRDB_MST();
        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST
    }

    const editTBL_KSV_CRDB_MST = (argData) => {
    }

    const onRowClick1TBL_KSV_CRDB_MST = (argData0) => {

        var argData = {};

        if (typeof argData0.length !== 'undefined') {
            if (argData0.length <= 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CRDB_MST = argData;
        editTBL_KSV_CRDB_MST(argTBL_KSV_CRDB_MST);
        setDataTBL_KSV_CRDB_MST(argTBL_KSV_CRDB_MST);
        
        setDatasTBL_KSV_CRDB_MST2([]);
        search_LIST_4_1(argData);
    }

    const onRowClickTBL_KSV_CRDB_MST = (event) => {

        let argTBL_KSV_CRDB_MST = event.data;
        if (flagSelectModeTBL_KSV_CRDB_MST) return;

        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST
    }

    const searchTBL_KSV_CRDB_MST = () => {
        clearSelectedTBL_KSV_CRDB_MST();

        // serviceS0423_TAXBILL.mgrQueryTBL_KSV_CRDB_MST(dataQRY_).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_CRDB_MST() call => " + data.length);
        //         setDatasTBL_KSV_CRDB_MST(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_CRDB_MST()error => " + JSON.stringify(data.graphQLErrors));
        //          
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST
    }

    const clearSelectedTBL_KSV_CRDB_MST = () => {
        setSelectedTBL_KSV_CRDB_MST([]);
        setFlagSelectModeTBL_KSV_CRDB_MST(false);
    }

    const findIndexByIdTBL_KSV_CRDB_MST = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_CRDB_MST.length; i++) {
            if (datasTBL_KSV_CRDB_MST[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    

    const exportExcelTBL_KSV_CRDB_MST = () => {
        
    }

    const saveAsExcelFileTBL_KSV_CRDB_MST = (buffer, fileName) => {
        
    }

    // KSV_CRDB_MST2
    const [datasTBL_KSV_CRDB_MST2, setDatasTBL_KSV_CRDB_MST2] = useState([]);
    const dt_TBL_KSV_CRDB_MST2 = useRef(null);
    const [dataTBL_KSV_CRDB_MST2, setDataTBL_KSV_CRDB_MST2] = useState(emptyTBL_KSV_CRDB_MST2);
    const [selectedTBL_KSV_CRDB_MST2, setSelectedTBL_KSV_CRDB_MST2] = useState([]);
    const [flagSelectModeTBL_KSV_CRDB_MST2, setFlagSelectModeTBL_KSV_CRDB_MST2] = useState(false);
    const [loadingTBL_KSV_CRDB_MST2, setLoadingTBL_KSV_CRDB_MST2] = useState(false);

    // DATAGRID CODE : TBL_KSV_CRDB_MST2
    const searchRefreshTBL_KSV_CRDB_MST2 = () => {
        clearSelectedTBL_KSV_CRDB_MST2();
        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST2
    }

    const editTBL_KSV_CRDB_MST2 = (argData) => {
    }

    const onRowClick1TBL_KSV_CRDB_MST2 = (argData0) => {

        var argData = {};

        if (typeof argData0.length !== 'undefined') {
            if (argData0.length < 0) return;
            argData = argData0[0];
        } else {
            argData = argData0;
        }

        let argTBL_KSV_CRDB_MST2 = argData;
        editTBL_KSV_CRDB_MST2(argTBL_KSV_CRDB_MST2);
        setDataTBL_KSV_CRDB_MST2(argTBL_KSV_CRDB_MST2);
        
    }

    const onRowClickTBL_KSV_CRDB_MST2 = (event) => {

        let argTBL_KSV_CRDB_MST2 = event.data;
        if (flagSelectModeTBL_KSV_CRDB_MST2) return;

        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST2
    }

    const searchTBL_KSV_CRDB_MST2 = () => {
        clearSelectedTBL_KSV_CRDB_MST2();

        // serviceS0423_TAXBILL.mgrQueryTBL_KSV_CRDB_MST2(dataQRY_).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_CRDB_MST2() call => " + data.length);
        //         setDatasTBL_KSV_CRDB_MST2(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_CRDB_MST2()error => " + JSON.stringify(data.graphQLErrors));
        //          
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_CRDB_MST2
    }

    const clearSelectedTBL_KSV_CRDB_MST2 = () => {
        setSelectedTBL_KSV_CRDB_MST2([]);
        setFlagSelectModeTBL_KSV_CRDB_MST2(false);
    }

    const findIndexByIdTBL_KSV_CRDB_MST2 = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_CRDB_MST2.length; i++) {
            if (datasTBL_KSV_CRDB_MST2[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    

    const exportExcelTBL_KSV_CRDB_MST2 = () => {
        
    }

    const saveAsExcelFileTBL_KSV_CRDB_MST2 = (buffer, fileName) => {
        
    }

    // Dialog 
    const [createDialog, setCreateDialog] = useState(false);
    const hideDialog = () => {
       setCreateDialog(false);
    } 

    const popup_UPDATE_DN = () => {
       var tEdtObj = { ...dataEDT_KSV_STOCK_MEM };
       if (tEdtObj.BILL_CD === '') {
           alert('Debit Application is available for registered bills.');
           return;
       }

       search_LIST_4();
       setCreateDialog(true);
    }

    const process_UPDATE_DN = () => { 
       var tArray0 = [ ...selectedTBL_KSV_STOCK_IN ];
       var tArray = []; 

       // tArray: BILL_CD, PAY_DATE, VENDOR_CD, CURR_CD 
       var tEdtObj = { ...dataEDT_KSV_STOCK_MEM };
       var tObj0 = {};
       tObj0.BILL_CD = tEdtObj.BILL_CD;
       tObj0.PAY_DATE = tEdtObj.PAY_DATE;
       tObj0.VENDOR_CD = tEdtObj.VENDOR_CD;
       tObj0.CURR_CD = tEdtObj.CURR_CD;
       tObj0.PUR_FACTORY = tEdtObj.PUR_FACTORY;
       tArray.push(tObj0);

       var tInObj1 = { ...dataEDT_KSV_CRDB_MST };

       
       var tInObj2 = { ...selectedTBL_KSV_CRDB_MST[0] };
       delete tInObj2.id;
       delete tInObj2.__typename;

       alert('Update Dn');

       serviceS0423_TAXBILL.mgrInsert_UPDATE_DN(tArray, tInObj1, tInObj2).then(data => {
              if (typeof data.graphQLErrors === 'undefined') {
                console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes('SUCC')) {
                         setCreateDialog(false);
                    }
                     
                }
              } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                toast.current.show({ severity: 'success', summary: 'FAILED: Taxbill', detail: '', life: 3000 });
              }
       });
    }

    const process_DELETE_DN = () => { 
       var tArray0 = [ ...selectedTBL_KSV_STOCK_IN ];
       var tArray = []; 

       // tArray: BILL_CD, PAY_DATE, VENDOR_CD, CURR_CD 
       var tEdtObj = { ...dataEDT_KSV_STOCK_MEM };
       var tObj0 = {};
       tObj0.BILL_CD = tEdtObj.BILL_CD;
       tObj0.PAY_DATE = tEdtObj.PAY_DATE;
       tObj0.VENDOR_CD = tEdtObj.VENDOR_CD;
       tObj0.CURR_CD = tEdtObj.CURR_CD;
       tArray.push(tObj0);

       var tInObj1 = { ...dataEDT_KSV_CRDB_MST };
       
       var tInObj2 = { ...selectedTBL_KSV_CRDB_MST[0] };
       delete tInObj2.id;
       delete tInObj2.__typename;

       serviceS0423_TAXBILL.mgrInsert_DELETE_DN(tArray, tInObj1, tInObj2).then(data => {
              if (typeof data.graphQLErrors === 'undefined') {
                console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                if (data.length > 0) toast.current.show({ severity: 'success', summary: 'SUCCEED: Taxbill', detail: data[0].CODE, life: 3000 });
              } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                toast.current.show({ severity: 'success', summary: 'FAILED: Taxbill', detail: '', life: 3000 });
              }
       });
    }

    const search_LIST_4 = () => {

       // tArray: BILL_CD, PAY_DATE, VENDOR_CD, CURR_CD 
       var tObj0 = { ...dataEDT_KSV_STOCK_MEM };
      
       var tObj = {};
       tObj.CRDB_CD = '';
       tObj.VENDOR_CD = tObj0.VENDOR_CD;
       tObj.CURR_CD = tObj0.CURR_CD;

       setDatasTBL_KSV_CRDB_MST([]);
       setSelectedTBL_KSV_CRDB_MST([]);
       setDatasTBL_KSV_CRDB_MST2([]);

       // 4 
       serviceS0423_TAXBILL.mgrQuery_LIST_4(tObj).then(data => {
              if (typeof data.graphQLErrors === 'undefined') {
                console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    return (tObj);
                });
                setDatasTBL_KSV_CRDB_MST(tArray);
              } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                 
              }
       });
    }

    const search_LIST_4_1 = (argData) => {
       var tObj = {};
       tObj.CRDB_CD = argData.CRDB_CD;
       tObj.VENDOR_CD = argData.MEESER_CD;
       tObj.CURR_CD = argData.CURR_CD;

       setDatasTBL_KSV_CRDB_MST2([]);
       setSelectedTBL_KSV_CRDB_MST2([]);

       // 4_1 
       serviceS0423_TAXBILL.mgrQuery_LIST_4_1(tObj).then(data => {
              if (typeof data.graphQLErrors === 'undefined') {
                console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                var tMemAmt = 0;
                var tArray = data.map((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tMemAmt += parseFloat(tObj.CRDB_AMT);
                    return (tObj);
                });
                setDatasTBL_KSV_CRDB_MST2(tArray);
                var tRestAmt = parseFloat(argData.CRDB_AMT) - tMemAmt;

                var tObj2 = { ...dataEDT_KSV_CRDB_MST };
                tObj2.CRDB_CD = argData.CRDB_CD;
                tObj2.PART_AMT = String(tRestAmt);
                tObj2.REST_AMT = tObj2.PART_AMT;
                setDataEDT_KSV_CRDB_MST(tObj2);

              } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                 
              }
       });
    }
    // Apply Debit 화면 관련  -End

    //
    const process_RESET  = () => {
        setDataQRY_KSV_STOCK_MEM(emptyQRY_KSV_STOCK_MEM);

        var tArray = [];
        var tObj = {};
        tObj.VENDOR_CD = '';
        tObj.VENDOR_NAME = '';
        setDatasQRY_KSV_STOCK_MEM_VENDOR_CD(tArray);
        setDataQRY_KSV_STOCK_MEM_VENDOR_CD(tArray[0]);
    }

    const process_RESET_EDT  = () => {
        setValueQTY(0);
        setValueLC_QTY(0);

        setDataEDT_KSV_STOCK_MEM(emptyEDT_KSV_STOCK_MEM);
        setDataEDT_KSV_STOCK_MEM_PAY_BANK(datasEDT_KSV_STOCK_MEM_PAY_BANK[0]);
        setDataEDT_KSV_STOCK_MEM_TAX_KIND(datasEDT_KSV_STOCK_MEM_TAX_KIND[0]);

        var tArray = [];
        var tObj = {};
        tObj.VENDOR_CD = '';
        tObj.VENDOR_NAME = '';
        setDatasEDT_KSV_STOCK_MEM_VENDOR_CD(tArray);
        setDataEDT_KSV_STOCK_MEM_VENDOR_CD(tArray[0]);

        var tArray0 = [];
        var tObj0 = {};
        tObj0.BANK_CD = '';
        tObj0.BANK_NAME = '';
        setDatasEDT_KSV_STOCK_MEM_PAY_BANK(tArray0);
        setDataEDT_KSV_STOCK_MEM_PAY_BANK(tArray0[0]);

        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP3([]);

    }

    const popup_DEBIT_NOTE_bak = () => {

        var tInEdit = { ...dataEDT_KSV_STOCK_MEM };

        if (tInEdit.BILL_CD === '') {
            alert('Only those registered in Bill can register Debit.');
            return;
        }
        if (parseFloat(tInEdit.DEBIT_AMT) > 0) {
            alert('There is already a Debit registered for the Bill.');
            return;
        }
        if (parseFloat(tInEdit.PAY_AMT) <= 0) {
            alert('Only those with Pay Amt greater than 0 can be Debit processed');
            return;
        }

        var tInList = [ ...savesTBL_KSV_PO_MRP2 ];

        var tTotAmt = tInEdit.PAY_AMT;
        var tCurrCd = tInEdit.CURR_CD;
        var tVendorCd = tInEdit.VENDOR_CD;
        var tBillNo = tInEdit.BILL_CD;
        var tBuyerCd = '';
        var tBuyerName = '';
        var tFactoryCd = '';
        var tVendorName = '';
        var tOrderCd = '';
        var tPoCd = '';
        var tFlag = 0;
        var tSaveVendorCd = '';
        var tSaveCurrCd = '';
        var tSavePayDate = '';
        tInList.forEach((col, i) => {
            console.log(`${tSaveVendorCd},${col.VENDOR_CD}`);
            console.log(`${tSaveCurrCd},${col.CURR_CD}`);
            console.log(`${tSavePayDate},${col.PAY_DATE}`);
            if (tSaveVendorCd !== '' && col.VENDOR_CD !== tSaveVendorCd) tFlag = 1;
            if (tSaveCurrCd !== '' && col.CURR_CD !== tSaveCurrCd) tFlag = 1;
            if (tSavePayDate !== '' && col.PAY_DATE !== tSavePayDate) tFlag = 1;
            tSaveVendorCd = col.VENDOR_CD;
            tSaveCurrCd = col.CURR_CD;
            tSavePayDate  = col.PAY_DATE;
            tVendorName =  col.VENDOR_NAME;
            tBuyerCd =  col.BUYER_CD;
            tBuyerName =  col.BUYER_NAME;
            tPoCd =  col.PO_CD;
            tFactoryCd =  col.FACTORY_CD;
        });
        if (tFlag === 1) {
            alert('You can only select the same supplier, Curr Cd, and pay date.');
            return;
        }

        var tSaveObj = {};
        tSaveObj.PO_CD = tPoCd;
        tSaveObj.ORDER_CD = '';
        tSaveObj.CURR_CD = tCurrCd;
        tSaveObj.TOT_AMT = String(tTotAmt);
        tSaveObj.VENDOR_CD = tVendorCd;
        tSaveObj.VENDOR_NAME = tVendorName;
        tSaveObj.FACTORY_CD = tFactoryCd;
        tSaveObj.BILL_CD = tBillNo;
        tSaveObj.BUYER_CD = tBuyerCd;
        tSaveObj.BUYER_NAME = tBuyerName;
        window.localStorage.setItem('S0702_DEBIT_NOTE', JSON.stringify(tSaveObj));

        var tUrl2 = `S0702_DEBIT_NOTE?PO_CD=${tPoCd}&ORDER_CD=${tOrderCd}`;
        var tValObj = { key: '6-4', label: 'Debit Note', icon: 'pi pi-fw pi-user-edit',  width:'1365px', height:'675px', url1: 'S0702_DEBIT_NOTE'};
        var tArgObj = { ...tValObj };
        tArgObj.url1 = tUrl2;
        var tFuncObj = {};
        tFuncObj.func = 'call_url'; 
        tFuncObj.message = { ...tArgObj };
        window.parent.postMessage(tFuncObj, "*");
    }

    const search_CODE = (argSearchData, isTaxKind) => {
        var tQryObj = { ...dataQRY_KSV_STOCK_MEM };

        var _tObj = {};
        if (typeof argSearchData.VENDOR_CD !== 'undefined') {
           _tObj.VENDOR_CD = argSearchData.VENDOR_CD;
           _tObj.BUYER_CD = argSearchData.BUYER_CD;
           _tObj.BANK_CD = '';
        } else {
           _tObj.VENDOR_CD = ''; 
           _tObj.BUYER_CD = '';
           _tObj.BANK_CD = '';
        }
        serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrQuery_CODE(_tObj).then(data => {
            if (typeof data.graphQLErrors === 'undefined') {

                if (!isTaxKind) {
                    setDatasQRY_KSV_STOCK_MEM_VENDOR_TYPE(data.VENDOR_TYPE);
                    setDataQRY_KSV_STOCK_MEM_VENDOR_TYPE(data.VENDOR_TYPE[0]);

                    setDatasQRY_KSV_STOCK_MEM_BUYER_CD(data.BUYER_CD);
                    setDataQRY_KSV_STOCK_MEM_BUYER_CD(data.BUYER_CD[0]);

                    setDatasQRY_KSV_STOCK_MEM_VENDOR_CD(data.VENDOR_CD);
                    setDataQRY_KSV_STOCK_MEM_VENDOR_CD(data.VENDOR_CD[0]);

                    if (typeof argSearchData.VENDOR_CD !== 'undefined') {
                        setDatasEDT_KSV_STOCK_MEM_VENDOR_CD(data.VENDOR_CD);
                        var tObj = {};
                        data.VENDOR_CD.forEach((col, i) => { 
                            if (col.VENDOR_CD === argSearchData.VENDOR_CD) 
                                tObj = { ...col };
                        });
                        setDataEDT_KSV_STOCK_MEM_VENDOR_CD(tObj);

                        setDatasEDT_KSV_STOCK_MEM_TAX_KIND(data.TAX_KIND);

                        data.TAX_KIND.shift();
                        data.TAX_KIND.pop(); // 과세(10%) 제거
                        data.TAX_KIND.pop(); // 과세(8%) 제거
                        data.TAX_KIND[1].CD_NAME = '과세(Tax 10%)';
                        data.TAX_KIND[2].CD_NAME = '영세(Tax 0%)';
                        data.TAX_KIND[3].CD_NAME = '면세(Tax free)';

                        let taxKind = [ ...data.TAX_KIND ];
                        setOrgTaxKind(taxKind);

                        var tObj = {};
                        if (argSearchData.BILL_MST.length > 0) {
                            data.TAX_KIND.forEach((col, i) => { 
                                if (col.CD_CODE === argSearchData.BILL_MST[0].TAX_KIND) 
                                    tObj = { ...col };
                            });
                            setDataEDT_KSV_STOCK_MEM_TAX_KIND(tObj);
                        }

                        setDatasEDT_KSV_STOCK_MEM_PUR_FACTORY(data.PUR_FACTORY);
                        tObj = {};
                        data.PUR_FACTORY.forEach((col, i) => { 
                            if (col.WARE_CD === argSearchData.PUR_FACTORY) 
                                tObj = { ...col };
                        });
                        setDataEDT_KSV_STOCK_MEM_PUR_FACTORY(tObj);

                        setDatasEDT_KSV_STOCK_MEM_PAY_BANK(argSearchData.PAY_BANK_ARRAY);
                        tObj = {};
                        argSearchData.PAY_BANK_ARRAY.forEach((col, i) => { 
                            if (col.BANK_CD === argSearchData.BILL_MST[0].PAY_BANK) 
                                tObj = { ...col };
                        });
                        setDataEDT_KSV_STOCK_MEM_PAY_BANK(tObj);

                    } else {
                        setDatasEDT_KSV_STOCK_MEM_VENDOR_CD(data.VENDOR_CD);
                        setDataEDT_KSV_STOCK_MEM_VENDOR_CD(data.VENDOR_CD[0]);

                        setDatasEDT_KSV_STOCK_MEM_PAY_BANK(data.BANK_CD);
                        setDataEDT_KSV_STOCK_MEM_PAY_BANK(data.BANK_CD[0]);
                        
                        data.TAX_KIND.shift();
                        data.TAX_KIND.pop(); // 과세(10%) 제거
                        data.TAX_KIND.pop(); // 과세(8%) 제거
                        data.TAX_KIND[1].CD_NAME = '과세(Tax 10%)';
                        data.TAX_KIND[2].CD_NAME = '영세(Tax 0%)';
                        data.TAX_KIND[3].CD_NAME = '면세(Tax free)';

                        let taxKind = [ ...data.TAX_KIND ];
                        setOrgTaxKind(taxKind);

                        setDatasEDT_KSV_STOCK_MEM_TAX_KIND(taxKind);
                        //setDataEDT_KSV_STOCK_MEM_TAX_KIND(taxKind[0]);

                        setDatasEDT_KSV_STOCK_MEM_PUR_FACTORY(data.PUR_FACTORY);
                        setDataEDT_KSV_STOCK_MEM_PUR_FACTORY(data.PUR_FACTORY[0]);
                    }
                } else {
                    let taxKind = [ ...data.TAX_KIND ];

                    taxKind.shift();

                    setDatasEDT_KSV_STOCK_MEM_TAX_KIND(taxKind);
                    setDataEDT_KSV_STOCK_MEM_TAX_KIND(taxKind[0]);
                }
                
            } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                 
            }
         });
    }

    const search_LIST_2 = (argData) => {

         var tObj = {};
         tObj.PU_CD = argData.PU_CD;
         tObj.STSIN_CD = argData.STSIN_CD;

         setLoadingTBL_KSV_PO_MRP2(true);

         // 4_2
         serviceS043001_STSIN_LIST.mgrQuery_LIST_2(tObj).then(data => {
                  setLoadingTBL_KSV_PO_MRP2(false);
                  if (typeof data.graphQLErrors === 'undefined') {
                    var tArray = data.map((col, i) => {
                        var tObj = { ...col };
                        tObj.id = i + 1;
                        return (tObj);
                    });
                    setDatasTBL_KSV_PO_MRP2(tArray);
                  } else {
                    console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                     
                  }
         });
    }

    const process_CLOSE = async () => {

        var tInEdit = { ...dataEDT_KSV_STOCK_MEM };
        if (tInEdit.BILL_CD !== '') {
            
            var ret = await confirm('Modify the registered BILL. Do you want to proceed?');
            if (!ret) return;
        }
        if (tInEdit.TAX_KIND === '') {
            alert('Tax Kind must be entered.');
            return;
        }

        if (!tInEdit.BILL_CD) {
            if (selectedTBL_KSV_PO_MRP2.length <= 0) return;
        }

        var tInList0 = [];
        if (!tInEdit.BILL_CD) tInList0 = [ ...selectedTBL_KSV_PO_MRP2 ];
        else  tInList0 = [ ...datasTBL_KSV_PO_MRP2 ];

        if (tInEdit.PAY_BANK === '') {
            var tmpObj = { ...tInList0[0] };
            if (tmpObj.VENDOR_TYPE !== '4' && tmpObj.VENDOR_TYPE !== '5') { 
                 alert('You must enter Pay Bank. -1');
                 return;
            }
        }

        var tIdx = 0;
        var tInList  = [];

        var tFlag = 0;
        var tFlag1 = 0;
        var tFlag2 = 0;
        var tSaveVendorCd = '';
        var tSaveCurrCd = '';
        var tSavePayDate = '';
        tInList0.forEach((col, i) => {
            var tObj = { ...col };
            delete tObj.PAY_BANK_ARRAY;
            delete tObj.BILL_MST;
            if (typeof tObj.id !== 'undefined') delete tObj.id;
            if (typeof tObj.__typename !== 'undefined') delete tObj.__typename;
            if (tSaveVendorCd !== '' && col.VENDOR_CD !== tSaveVendorCd) tFlag = 1;
            if (tSaveCurrCd !== '' && col.CURR_CD !== tSaveCurrCd) tFlag = 1;
            // if (tSavePayDate !== '' && col.PAY_DATE !== tSavePayDate) tFlag = 1;
            if (tObj.PAY_BANK === '' || tObj.PAY_BANK === null) tFlag1 = 1;
            if (tObj.BILL_CD !== '') tFlag2 = 1;
            tSaveVendorCd = col.VENDOR_CD;
            tSaveCurrCd = col.CURR_CD;
            tSavePayDate = col.PAY_DATE;
            tInList.push(tObj);
        });
        if (tFlag === 1) {
            // alert('You can only select the same Pay Date, Supplier, and Cur Cd.');
            alert('You can only select the same Supplier, and Cur Cd.');
            return;
        }
        if (tFlag1 === 1) {
            var tmpObj = { ...tInList0[0] };
            
            if (tmpObj.VENDOR_TYPE === '4' || tmpObj.VENDOR_TYPE === '5') ;
            else {
                if (tInEdit.PAY_BANK === '') {
                    alert('You must enter Pay Bank. -2');
                    return;
                }
                 
            }
        }

        tFlag2 = 1;
        /*
        datasTBL_KSV_PO_MRP3.forEach((col, i) => {
            if (col.END_FLAG !== '1') tFlag2 = 1;
        });
        */
        if (tFlag2 === 0) {
            if (tInEdit.BILL_CD) ;
            else {
               alert('It has already been processed as End.');
               return;
            }
        }

        setLoadingTBL_KSV_PO_MRP2 (true);
        serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrInsert_ENDDING_MATL(tInList, tInEdit).then(data => {
            setLoadingTBL_KSV_PO_MRP2 (false);

            setSelectedTBL_KSV_PO_MRP2([]);

            if (typeof data.graphQLErrors === 'undefined') {
                if (data.length > 0) {
                    alert(data[0].CODE);
                    if (data[0].CODE.includes('SUCC')) {
                        

                        if (tInEdit.BILL_CD !== '') {
                            var tObj = { ...emptyQRY_KSV_STOCK_MEM };
                            tObj.S_END_DATE = '20250101'; 
                            tObj.E_END_DATE = '99999999'; 
                            tObj.BILL_CD = tInEdit.BILL_CD 
                            tObj.IS_ALL = '1'; 
                     
                            setLoadingTBL_KSV_PO_MRP2(true);
                            serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrQuery_LIST_1(tObj).then(data => {
                                     setLoadingTBL_KSV_PO_MRP2(false);
                                     if (typeof data.graphQLErrors === 'undefined') {
                                         process_RESET_EDT();
                                         var tArray = [];
                                         data.forEach((col, i ) => {
                                             var tObj = { ...col };
                     
                                             if (tObj.BILL_MST) {
                                                 if (data.length === 1 && tObj.BILL_MST.length === 1) {
                                                     tObj.PO_AMT = tObj.BILL_MST[0].PO_AMT;
                                                     tObj.PAY_AMT = tObj.BILL_MST[0].PAY_AMT;
                                                 }
                                             }
                     
                                             tObj.id = i + 1;
                                             tObj.BILL_CD = tInEdit.BILL_CD;
                                             var tBalAmt = (parseFloat(tObj.PAY_AMT)+parseFloat(tObj.DEPOSIT_AMT)) - parseFloat(tObj.END_AMT);
                                             if (tBalAmt < 0) tBalAmt = 0;
                                             tObj.BAL_AMT  = String(serviceLib.numToFixed(tBalAmt, 2));
                                             tArray.push(tObj);
                                         });
                                         setDatasTBL_KSV_PO_MRP2(tArray);
                                         console.log(tArray);
                                         calcSelectRow(tArray);
                     
                                         if (!tArray.length) {
                                             alert('No data!');
                                             return;
                                         }
                                         
                                         search_CODE(tArray[0]);
                     
                                     } else {
                                         console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                                          
                                     }
                            });
                        } else {
                            var returnBillCd = data[0].CODE.split(':')[1];
                            window.parent.postMessage({
                                func: 'call_url',
                                message: {
                                    key: '3-8',
                                    label: 'Bill Manager',
                                    url1: `S0423_TAXBILL?BILL_CD=${returnBillCd}`,
                                }
                            }, "*");
                            search_ENDDING_MATL();
                        }
                    }
                }

            } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                toast.current.show({ severity: 'success', summary: 'Failed Matl Endding', detail: '', life: 3000 });
            }
        });
    }

    const process_CANCEL = () => {

        
        var m_TT = '';
        var m_PUR_FACTORY = '';

        var tArray0 = [...selectedTBL_KSV_STOCK_IN];
        var tIdx = 0;
        var tArray = [];
        for (tIdx = 0; tIdx < tArray0.length; tIdx++) {
            var tObj0 = { ...tArray0[tIdx] };
            var tObj = {};

            tObj.OP_KIND = 'CANCEL';
            tObj.STSIN_CD = tObj0.STSIN_CD;
            tArray.push(tObj);
        }

        var tArray2 = { ...dataEDT_KSV_STOCK_MEM };

        serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrInsert_ENDDING_MATL(tArray, tArray2).then(data => {
            if (typeof data.graphQLErrors === 'undefined') {
                console.log("ServiceMgrKCD_BUYER.mgr1KcdStyle call => " + data.length);
                toast.current.show({ severity: 'success', summary: 'SUCCESS Matl Endding', detail: data[0].CODE, life: 3000 });
            } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                toast.current.show({ severity: 'success', summary: 'Failed Matl Endding', detail: '', life: 3000 });
            }
        });
    }

    const search_ENDDING_MATL = () => {
        var tObj = { ...dataQRY_KSV_STOCK_MEM };

        Object.keys(tObj).forEach((col, i) => {
            var tVal = tObj[`${col}`];
            console.log(`${col}:${tVal}`);
            if (tObj[`${col}`] === null || tObj[`${col}`] === ' ') {
                tObj[`${col}`] = '';
            }
        });
        tObj.BILL_CD = '';

        // 3_1 

        setSelectedTBL_KSV_PO_MRP2([]);
        setDatasTBL_KSV_PO_MRP2([]);

        setSelectedTBL_KSV_PO_MRP3([]);
        setDatasTBL_KSV_PO_MRP3([]);
        
        setLoadingTBL_KSV_PO_MRP2(true);

        serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrQuery_LIST_1(tObj).then(data => {

            setLoadingTBL_KSV_PO_MRP2(false);

            if (typeof data.graphQLErrors === 'undefined') {
                process_RESET_EDT();
                var tArray = [];
                data.forEach((col, i ) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;

                    var tBalAmt = (parseFloat(tObj.PAY_AMT)+parseFloat(tObj.DEPOSIT_AMT)) - parseFloat(tObj.END_AMT);
                    if (tBalAmt < 0) tBalAmt = 0;
                    tObj.BAL_AMT  = String(serviceLib.numToFixed(tBalAmt, 2));
                    tArray.push(tObj);
                });
                setDatasTBL_KSV_PO_MRP2(tArray);
            } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                 
            }
        });
    }

    const search_LIST_DETAIL = (argEdit, argData) => {

        var tQryArray = []; 
        var tInData = { ...argData[0] };

        argData.forEach((col, i) => {
            var tQryObj = {}; 
            tQryObj.PO_CD = col.PO_CD2;
            tQryObj.PU_CD = col.PU_CD;
            tQryObj.PAY_DATE = col.PAY_DATE;
            tQryObj.END_DATE = col.END_DATE;
            tQryObj.IN_DATE = col.IN_DATE;
            tQryObj.STSIN_CD = col.STSIN_CD;
            tQryObj.CURR_CD = col.CURR_CD;
            tQryObj.VENDOR_CD = col.VENDOR_CD;
            tQryObj.PAY_REPORT = col.PAY_REPORT;
            tQryObj.PUR_APP = col.PUR_APP;
            tQryObj.TT_FLAG = col.TT_FLAG;
            tQryObj.BILL_CD = '';
            if (argEdit.BILL_CD) tQryObj.BILL_CD = argEdit.BILL_CD;
            tQryObj.IN_QTY = col.IN_QTY;
            tQryObj.PURCHARGER = col.PURCHARGER;
            tQryArray.push(tQryObj);
        });

        setSelectedTBL_KSV_PO_MRP3([]);
        setDatasTBL_KSV_PO_MRP3([]);
        
        setLoadingTBL_KSV_PO_MRP3(true);

        serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrQuery_LIST_DETAIL(tQryArray).then(data => {

            setLoadingTBL_KSV_PO_MRP3(false);

            if (typeof data.graphQLErrors === 'undefined') {
                var tArray = [];
                var tTax = '';
                data.datas.forEach((col, i ) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tTax = tObj.TAX;
                    tArray.push(tObj);
                });
                setDatasTBL_KSV_PO_MRP3(tArray);
                setSelectedTBL_KSV_PO_MRP2(argData);

                if (tInData.END_DATE !== '') {
                   var tEdit = { ...argEdit };
                   tEdit.VAT_AMT = tTax;
                   if (data.datas1.length > 0) {
                       tEdit.DEBIT_AMT = data.datas1[0].DN_AMOUNT; 
                       tEdit.DISCOUNT_AMT = data.datas1[0].DC_AMOUNT; 
                   } else {
                       tEdit.DEBIT_AMT = '0'; 
                       tEdit.DISCOUNT_AMT = '0'; 
                   }
                   if (parseFloat(tTax) > 0) {
                       tEdit.TAX_KIND = '1'; // 과세
                       editEDT_KSV_STOCK_MEM_TAX_KIND('1');
                   }

                   var tPoAmt = parseFloat(tEdit.PO_AMT);
                   var tDepositAmt = parseFloat(tEdit.DEPOSIT_AMT);
                   var tDebitAmt = parseFloat(tEdit.DEBIT_AMT);
                   var tDiscountAmt = parseFloat(tEdit.DISCOUNT_AMT);
                   var tVatAmt = parseFloat(tEdit.VAT_AMT);

                   var tPayAmt = tPoAmt - tDepositAmt - tDebitAmt - tDiscountAmt + tVatAmt;
                   tEdit.PAY_AMT = String(serviceLib.numToFixed(tPayAmt, 2)); 

                   setDataEDT_KSV_STOCK_MEM(tEdit);
                }

            } else {
                console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                 
            }
        });
    }

    /*QRY KSV_STOCK_MEM */
    const [dataQRY_KSV_STOCK_MEM, setDataQRY_KSV_STOCK_MEM] = useState(emptyQRY_KSV_STOCK_MEM);

    const [datasQRY_KSV_STOCK_MEM_VENDOR_TYPE, setDatasQRY_KSV_STOCK_MEM_VENDOR_TYPE] = useState([]);
    const [dataQRY_KSV_STOCK_MEM_VENDOR_TYPE, setDataQRY_KSV_STOCK_MEM_VENDOR_TYPE] = useState({});
    const editQRY_KSV_STOCK_MEM_VENDOR_TYPE = (argValue) => {
        let _dataQRY_KSV_STOCK_MEM_VENDOR_TYPE = datasQRY_KSV_STOCK_MEM_VENDOR_TYPE.filter(val => val.CD_CODE === argValue);
        setDataQRY_KSV_STOCK_MEM_VENDOR_TYPE(_dataQRY_KSV_STOCK_MEM_VENDOR_TYPE[0]);
    }

    const [typeIsFactory, setTypeIsFactory] = useState(false);
    const [orgTaxKind, setOrgTaxKind] = useState([]);
    const onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_TYPE = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_VENDOR_TYPE(e.value);

        if (e.value.CD_NAME === 'FACTORY') {
            let factoryTaxKind = 
                [
                    { CD_NAME: '8%', CD_CODE: '8' },
                    { CD_NAME: '10%', CD_CODE: '10' },
                ];
            setDatasEDT_KSV_STOCK_MEM_TAX_KIND(factoryTaxKind)
            setDataEDT_KSV_STOCK_MEM_TAX_KIND(factoryTaxKind[0]);

            let tmpEDIT = { ...dataEDT_KSV_STOCK_MEM };
            tmpEDIT.TAX_KIND = '8';
            setDataEDT_KSV_STOCK_MEM(tmpEDIT);

            setTypeIsFactory(true);
        } else {
            setDatasEDT_KSV_STOCK_MEM_TAX_KIND(orgTaxKind)
            setDataEDT_KSV_STOCK_MEM_TAX_KIND(orgTaxKind[0]);
            setTypeIsFactory(false);
        }
    }

    const onInputChangeQRY_KSV_STOCK_MEM_PURCHARGER = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_PU_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onCheckboxChangeQRY_KSV_STOCK_MEM_IS_ALL = (e, name) => {
        let val = '';
        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        if (e.checked) {
            val = '1';
        } else {
            val = '0';
        }
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onCalChangeQRY_KSV_STOCK_MEM_S_PAY_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);

    }

    const onCalChangeQRY_KSV_STOCK_MEM_E_PAY_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);

    }

    const onCalChangeQRY_KSV_STOCK_MEM_S_END_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);

    }

    const onCalChangeQRY_KSV_STOCK_MEM_E_END_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);

    }

    const onCalChangeQRY_KSV_STOCK_MEM_S_IN_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);

    }

    const onCalChangeQRY_KSV_STOCK_MEM_E_IN_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };
        _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);

    }

    const [datasQRY_KSV_STOCK_MEM_BUYER_CD, setDatasQRY_KSV_STOCK_MEM_BUYER_CD] = useState([]);
    const [dataQRY_KSV_STOCK_MEM_BUYER_CD, setDataQRY_KSV_STOCK_MEM_BUYER_CD] = useState({});
    const editQRY_KSV_STOCK_MEM_BUYER_CD = (argValue) => {
        let _dataQRY_KSV_STOCK_MEM_BUYER_CD = datasQRY_KSV_STOCK_MEM_BUYER_CD.filter(val => val.BUYER_CD === argValue);
        setDataQRY_KSV_STOCK_MEM_BUYER_CD(_dataQRY_KSV_STOCK_MEM_BUYER_CD[0]);
    }
    const onDropdownChangeQRY_KSV_STOCK_MEM_BUYER_CD = (e, name) => {
        let val = (e.value && e.value.BUYER_CD) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_BUYER_CD(e.value);
    }
    const onInputChangeQRY_KSV_STOCK_MEM_BUYER_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_MATL_NAME = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_COLOR = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_PO_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const [datasQRY_KSV_STOCK_MEM_VENDOR_CD, setDatasQRY_KSV_STOCK_MEM_VENDOR_CD] = useState([]);
    const [dataQRY_KSV_STOCK_MEM_VENDOR_CD, setDataQRY_KSV_STOCK_MEM_VENDOR_CD] = useState({});

    const editQRY_KSV_STOCK_MEM_VENDOR_CD = (argValue) => {
        let _dataQRY_KSV_STOCK_MEM_VENDOR_CD = datasQRY_KSV_STOCK_MEM_VENDOR_CD.filter(val => val.VENDOR_CD === argValue);
        setDataQRY_KSV_STOCK_MEM_VENDOR_CD(_dataQRY_KSV_STOCK_MEM_VENDOR_CD[0]);
    }

    const onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
        setDataQRY_KSV_STOCK_MEM_VENDOR_CD(e.value);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_VENDOR_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_MATL_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onInputChangeQRY_KSV_STOCK_MEM_SPEC = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataQRY_KSV_STOCK_MEM = { ...dataQRY_KSV_STOCK_MEM };

        let tTypeVal = _dataQRY_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataQRY_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataQRY_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataQRY_KSV_STOCK_MEM(_dataQRY_KSV_STOCK_MEM);
    }

    const onKeyPressQRY_KSV_STOCK_MEM_VENDOR_CD = (e, name) => {
       if (e.key === 'Enter') {
            var tObj = { ...dataQRY_KSV_STOCK_MEM };
            tObj.VENDOR_CD = e.target.value;
            search_CODE(tObj);
        }
    }

    const onKeyPressQRY_KSV_STOCK_MEM_BUYER_CD = (e, name) => {
       if (e.key === 'Enter') {
            var tObj = { ...dataQRY_KSV_STOCK_MEM };
            tObj.BUYER_CD = e.target.value;
            search_CODE(tObj);
        }
    }

    /* TABLE KSV_STOCK_IN*/
    // DEFINE DATAGRID : TBL_KSV_STOCK_IN
    const [loadingTBL_KSV_STOCK_IN, setLoadingTBL_KSV_STOCK_IN] = useState(false);

    const [datasTBL_KSV_STOCK_IN, setDatasTBL_KSV_STOCK_IN] = useState([]);
    const dt_TBL_KSV_STOCK_IN = useRef(null);
    const [dataTBL_KSV_STOCK_IN, setDataTBL_KSV_STOCK_IN] = useState(emptyTBL_KSV_STOCK_IN);
    const [selectedTBL_KSV_STOCK_IN, setSelectedTBL_KSV_STOCK_IN] = useState([]);
    const [flagSelectModeTBL_KSV_STOCK_IN, setFlagSelectModeTBL_KSV_STOCK_IN] = useState(false);

    // DATAGRID CODE : TBL_KSV_STOCK_IN
    const searchRefreshTBL_KSV_STOCK_IN = () => {
        clearSelectedTBL_KSV_STOCK_IN();
        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN
    }

    const editTBL_KSV_STOCK_IN = (argData) => {
    }

    const onRowClick1TBL_KSV_STOCK_IN = (argData0) => {

        var argData = {};
        var argDataArray = [];

        if (typeof argData0.length !== 'undefined') {
            if (argData0.length <= 0) return;
            argData = argData0[argData0.length-1];
            tCurrCnt = argData0.length;
            argDataArray = [ ...argData0 ];
        } else {
            argData = argData0;
            tCurrCnt = 1;
            argDataArray.push(argData);
        }

        var tPreCnt = selectedTBL_KSV_STOCK_IN.length; 
        var tCurrCnt = 0;

        console.log('click1 : ' + tPreCnt + ',' + tCurrCnt);

        if (tPreCnt > tCurrCnt) {
             var tTotalAmt = 0;
             var tTotalQty = 0;
             argDataArray.forEach((col, i) => {
                    var tObj = { ...col };
                    tObj.id = i + 1;
                    tTotalQty += parseFloat(tObj.IN_QTY);
                    tTotalAmt += parseFloat(tObj.IN_AMT);
             });
             var tObj = { ...dataEDT_KSV_STOCK_MEM };
             tObj.AMOUNT = String(tTotalAmt);
             tObj.QTY = String(tTotalQty);
             setDataEDT_KSV_STOCK_MEM(tObj);
            return;
        }

        let tObj9 = { ...dataEDT_KSV_STOCK_MEM };
        tObj9.BILL_CD = argData.BILL_CD; 
        tObj9.PAY_DATE = argData.PAY_DATE; 
        tObj9.CURR_CD = argData.CURR_CD; 
        if (argData.TT_FLAG === '1') tObj9.IS_TT = '1';
        else tObj9.IS_TT = '0';
        if (argData.LC_FLAG === '1') {
            tObj9.IS_TT = '0';
            tObj9.IS_LC = '1';
        } else {
            tObj9.IS_LC = '0';
        }

        var tTotalAmt = 0;
        var tTotalQty = 0;
        argDataArray.forEach((col, i) => {
            var tObj = { ...col };
            tObj.id = i + 1;
            tTotalQty += parseFloat(tObj.IN_QTY);
            tTotalAmt += parseFloat(tObj.IN_AMT);
        });
        tObj9.AMOUNT = String(tTotalAmt);
        tObj9.QTY = String(tTotalQty);

        tObj9.REG_USER = serviceLib.getUserInfo().USER_ID;
        tObj9.INVOICE_DATE = serviceLib.getCurrDate1();

        setDataEDT_KSV_STOCK_MEM(tObj9);

        // editEDT_KSV_STOCK_MEM_CURR_CD(tObj9.CURR_CD);

        search_LIST_2 (argData);
    }

    const onRowClickTBL_KSV_STOCK_IN = (event) => {

        let argTBL_KSV_STOCK_IN = event.data;
        if (flagSelectModeTBL_KSV_STOCK_IN) return;

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN
    }

    const searchTBL_KSV_STOCK_IN = () => {
        clearSelectedTBL_KSV_STOCK_IN();

        // serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrQueryTBL_KSV_STOCK_IN(dataQRY_).then(data => {
        //     if (typeof data.graphQLErrors === 'undefined') {
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_STOCK_IN() call => " + data.length);
        //         setDatasTBL_KSV_STOCK_IN(data);
        //     } else {
        //         // var tStr = data.graphQLErrors[0].message;
        //         console.log("ServiceNawooAll.mgrQueryTBL_KSV_STOCK_IN()error => " + JSON.stringify(data.graphQLErrors));
        //          
        //     }
        // });

        // Service : NawooAll:mgrQueryTBL_KSV_STOCK_IN
    }

    const clearSelectedTBL_KSV_STOCK_IN = () => {
        setSelectedTBL_KSV_STOCK_IN([]);
        setFlagSelectModeTBL_KSV_STOCK_IN(false);
    }

    const findIndexByIdTBL_KSV_STOCK_IN = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_STOCK_IN.length; i++) {
            if (datasTBL_KSV_STOCK_IN[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    

    const exportExcelTBL_KSV_STOCK_IN = () => {
        
    }

    const saveAsExcelFileTBL_KSV_STOCK_IN = (buffer, fileName) => {
        
    }

    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP2
    const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

    const [savesTBL_KSV_PO_MRP2, setSavesTBL_KSV_PO_MRP2] = useState([]);
    const [datasTBL_KSV_PO_MRP2, setDatasTBL_KSV_PO_MRP2] = useState([]);
    const dt_TBL_KSV_PO_MRP2 = useRef(null);
    const [dataTBL_KSV_PO_MRP2, setDataTBL_KSV_PO_MRP2] = useState(emptyTBL_KSV_PO_MRP2);
    const [selectedTBL_KSV_PO_MRP2, setSelectedTBL_KSV_PO_MRP2] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP2, setFlagSelectModeTBL_KSV_PO_MRP2] = useState(false);

    // DATAGRID CODE : TBL_KSV_PO_MRP2
    const searchRefreshTBL_KSV_PO_MRP2 = () => {
        clearSelectedTBL_KSV_PO_MRP2();
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    }

    const editTBL_KSV_PO_MRP2 = (argData) => {
    }

    const computeAmount = (argData0, argArray) => {

        if (argArray.length <= 0) {
            process_RESET_EDT();
            return;
        }

        var tArray = [ ...argArray ];
        var tSaveArray = [ ...tArray ];

        var argData = {}; 
        if (typeof argData0.CURR_CD !== 'undefined') argData = { ...argData0 }; 
        else  argData = { ...tArray[0] };

        var tTotPoAmt = 0;
        var tTotPayAmt = 0;
        var tTotDepositAmt = 0;
        var tTotLcAmt = 0;
        var tTotEndAmt = 0;

        var tInQty  = 0;
        var tLcQty  = 0;

        var tDebitAmt = 0;
        if (argArray.length > 0)  {
            if (argArray[0].BILL_MST.length > 0) {
               tDebitAmt = argArray[0].BILL_MST[0].DEBIT_AMT;
               console.log(`Debit Amt: ${tDebitAmt} / ${argArray[0].BILL_MST[0].DEBIT_AMT}`);
            }
        }

        tArray.forEach((col, i) => {
            tTotPoAmt += parseFloat(col.PO_AMT);
            tTotDepositAmt += parseFloat(col.DEPOSIT_AMT);
            tTotPayAmt += parseFloat(col.PAY_AMT);
            tTotEndAmt += parseFloat(col.END_AMT);
            if (col.LC_FLAG === '1') {
                tTotLcAmt += parseFloat(col.DEPOSIT_AMT);
            }

            tInQty += parseFloat(col.IN_QTY);
            tLcQty += parseFloat(col.LC_QTY);


        });

        setValueQTY(tInQty);
        setValueLC_QTY(tLcQty);

        var tEdit = { ...dataEDT_KSV_STOCK_MEM };
        const tPayRuleVal =
            argData.PAY_TERM ?? argData.pay_term ?? argData.PAY_RULE ?? '';
        if (!argData.BILL_CD) tEdit.BILL_CD = '';
        else tEdit.BILL_CD = argData.BILL_CD;
        tEdit.CURR_CD = argData.CURR_CD;
        tEdit.PO_AMT = String(serviceLib.numToFixed(tTotPoAmt, 2));
        tEdit.PAY_DATE = argData.PAY_DATE;
        tEdit.VENDOR_CD = argData.VENDOR_CD;
        tEdit.PAY_RULE = tPayRuleVal === '' ? '' : String(tPayRuleVal);
        // tEdit.PAY_BANK = argData.PAY_BANK;
        tEdit.PAY_BANK = argData.PAY_BANK;
        tEdit.DEPOSIT_AMT = String(serviceLib.numToFixed(tTotDepositAmt, 2));
        if (tEdit.DISCOUNT_AMT === '') tEdit.DISCOUNT_AMT = '0';
        // if (tEdit.DEBIT_AMT === '') tEdit.DEBIT_AMT = '0';
        tEdit.DEBIT_AMT = parseFloat(tDebitAmt).toFixed(2);
        var tPayAmt = parseFloat(tEdit.PO_AMT) - parseFloat(tEdit.DEPOSIT_AMT) - parseFloat(tEdit.DISCOUNT_AMT) - parseFloat(tEdit.DEBIT_AMT);
        tEdit.PAY_AMT = String(serviceLib.numToFixed(tPayAmt, 2));
        // tEdit.END_AMT = String(serviceLib.numToFixed(tTotEndAmt, 2));

        if (argData.TT_FLAG === '1') tEdit.IS_TT = '1';
        else tEdit.IS_TT = '0';
        if (argData.LC_FLAG === '1') {
            tEdit.IS_TT = '0';
            tEdit.IS_LC = '1';
        } else {
            tEdit.IS_LC = '0';
        }

        if (argData.VENDOR_TYPE === '3') {   // Import
            tEdit.IS_TT = '1';
            tEdit.VAT_AMT = '0';
            tEdit.TAX_KIND = '4';
            tEdit.PUR_FACTORY = 'FC045';
            editEDT_KSV_STOCK_MEM_TAX_KIND('4');
            editEDT_KSV_STOCK_MEM_PUR_FACTORY('FC045');
        } else if (argData.VENDOR_TYPE === '1') {  // Domestic
            tEdit.IS_TT = '0';
            tEdit.VAT_AMT = '0';
            tEdit.PUR_FACTORY = 'FC045';
            if (argData.PERMIT === 'Y') {
                editEDT_KSV_STOCK_MEM_TAX_KIND('2');
                tEdit.TAX_KIND = '2';
            }  
            else {
                editEDT_KSV_STOCK_MEM_TAX_KIND('3'); 
                tEdit.TAX_KIND = '3';
            }
            editEDT_KSV_STOCK_MEM_PUR_FACTORY('FC045');
        } else if (argData.VENDOR_TYPE === '7') {  // ETC
            editEDT_KSV_STOCK_MEM_TAX_KIND('1');
            tEdit.TAX_KIND = '1';
            tEdit.IS_TT = '0';
            var tVatAmt = tPayAmt * 0.1;
            tEdit.VAT_AMT = String(serviceLib.numToFixed(tVatAmt, 2));
            editEDT_KSV_STOCK_MEM_PUR_FACTORY('');
        } else {
            if (argData.VENDOR_TYPE === '5') {
                tEdit.PUR_FACTORY = 'FC034';
                editEDT_KSV_STOCK_MEM_PUR_FACTORY('FC034');
            } else {
                editEDT_KSV_STOCK_MEM_PUR_FACTORY('');
            }
            tEdit.IS_TT = '0';
            tEdit.VAT_AMT = '0';
            tEdit.TAX_KIND = '0';
            editEDT_KSV_STOCK_MEM_TAX_KIND('');
        }

        if (argData.BILL_MST.length > 0) {
            tEdit.VAT_AMT = argData.BILL_MST[0].VAT_AMT;
            tEdit.TAX_KIND = argData.BILL_MST[0].TAX_KIND;
            tEdit.PAY_AMT = argData.BILL_MST[0].PAY_AMT;
            tEdit.DISCOUNT_AMT = argData.BILL_MST[0].DISCOUNT_AMT;
        }

        tEdit.REG_USER = serviceLib.getUserInfo().USER_ID;
        tEdit.INVOICE_DATE = serviceLib.getCurrDate1();
        if (argData.PUR_FACTORY) {
            tEdit.PUR_FACTORY = argData.PUR_FACTORY;
            editEDT_KSV_STOCK_MEM_PUR_FACTORY(argData.PUR_FACTORY);
        } else {
            ; 
            // editEDT_KSV_STOCK_MEM_PUR_FACTORY(tEdit.PUR_FACTORY);
        }

        setDataEDT_KSV_STOCK_MEM(tEdit); 

        var tArray = [];
        var tSelPayBank = {};
        argData.PAY_BANK_ARRAY.forEach((col, i) => {
            var tObj1 = { ...col };
            if (tObj1.BANK_CD ===  argData.PAY_BANK) tSelPayBank = { ...tObj1 };
            tArray.push(tObj1);
        });
        if (tArray.length > 1) {
            var tObj1 = {};
            tObj1.BANK_CD = '';
            tObj1.BANK_NAME = ' ';
            tArray.unshift(tObj1);
        }
        setDatasEDT_KSV_STOCK_MEM_PAY_BANK(tArray);
        if (typeof tSelPayBank.BANK_CD !== 'undefined') setDataEDT_KSV_STOCK_MEM_PAY_BANK(tSelPayBank);
        else setDataEDT_KSV_STOCK_MEM_PAY_BANK(tArray[0]);

        var tArray1 = [];
        var tObj2 = {};
        tObj2.VENDOR_CD = argData.VENDOR_CD;
        tObj2.VENDOR_NAME = argData.VENDOR_NAME;
        tArray1.push(tObj2);
        setDatasEDT_KSV_STOCK_MEM_VENDOR_CD(tArray1);
        setDataEDT_KSV_STOCK_MEM_VENDOR_CD(tArray1[0]);

        search_LIST_DETAIL(tEdit, tSaveArray);

    }

    const onRowSelectTBL_KSV_PO_MRP2 = (e) => {
        var argData = { ...e.data };

        if (!argData.BILL_CD) {
          ;
        } else {
          var tArray = [];
          datasTBL_KSV_PO_MRP2.forEach((col, i) => {
              if (col.BILL_CD === argData.BILL_CD) tArray.push(col);
          });
          setSelectedTBL_KSV_PO_MRP2(tArray);
        }

        // Factory
        if (argData.VENDOR_TYPE === '5') {
            let factoryTaxKind = 
                [
                    { CD_NAME: '', CD_CODE: '' },
                    { CD_NAME: '8%', CD_CODE: '8' },
                    { CD_NAME: '10%', CD_CODE: '10' },
                ];
            setDatasEDT_KSV_STOCK_MEM_TAX_KIND(factoryTaxKind)
            setDataEDT_KSV_STOCK_MEM_TAX_KIND(factoryTaxKind[0]);
            setTypeIsFactory(true);
        } else {
            setDatasEDT_KSV_STOCK_MEM_TAX_KIND(orgTaxKind)
            setDataEDT_KSV_STOCK_MEM_TAX_KIND(orgTaxKind[0]);
            setTypeIsFactory(false);
        }
    }

    const onRowSelectTBL_KSV_PO_MRP2_bak = (e) => {

        var argData = { ...e.data };

        var tCheck = 0;
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            if (col.VENDOR_NAME !== argData.VENDOR_NAME) tCheck = 1;
        });

        // var tArray = [ ...selectedTBL_KSV_PO_MRP2 ];
        var tArray = [];
        datasTBL_KSV_PO_MRP2.forEach((col, i) => {
                if (col.VENDOR_NAME === argData.VENDOR_NAME &&
                    col.PAY_DATE === argData.PAY_DATE &&
                    col.CURR_CD === argData.CURR_CD &&
                    col.END_DATE === argData.END_DATE) {
                    var tObj = { ...col };
                    tArray.push(tObj);
                 }
        });
        // computeAmount(argData, tArray);

    }

    const onRowUnselectTBL_KSV_PO_MRP2 = (e) => {

        var argData0 = { ...e.data };

        var tArray = [];
        selectedTBL_KSV_PO_MRP2.forEach((col, i) => {
            var tObj = { ...col };
            if (col.id !== argData0.id) tArray.push(tObj);
        });

        // computeAmount({}, tArray);
    }

    const searchTBL_KSV_PO_MRP2 = () => {
        clearSelectedTBL_KSV_PO_MRP2();
        // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
    }

    const clearSelectedTBL_KSV_PO_MRP2 = () => {
        setSelectedTBL_KSV_PO_MRP2([]);
        setFlagSelectModeTBL_KSV_PO_MRP2(false);
    }

    const findIndexByIdTBL_KSV_PO_MRP2 = (id) => {
        let index = -1;
        for (let i = 0; i < datasTBL_KSV_PO_MRP2.length; i++) {
            if (datasTBL_KSV_PO_MRP2[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    

    const exportExcelTBL_KSV_PO_MRP2 = () => {
        
            import('xlsx').then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP2);
                const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
                saveAsExcelFileTBL_KSV_PO_MRP2(excelBuffer, '스타일목록');
            });
        
    }

    const saveAsExcelFileTBL_KSV_PO_MRP2 = (buffer, fileName) => {
        
            import('file-saver').then(module => {
                if (module && module.default) {
                    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                    let EXCEL_EXTENSION = '.xlsx';
                    const data = new Blob([buffer], {
                        type: EXCEL_TYPE
                    });
                    module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
                }
            });
        
    }

    const onRowDoubleClickTBL_KSV_PO_MRP2 = (argData0) => {
        var tVendorName  = '';
        var tColName = '';
        var tKeys = Object.keys(argData0.data);
        tKeys.forEach((col, i) => {
            var tValue = argData0.data[`${col}`];
            if (tValue !== '' && col === 'VENDOR_NAME') {
                if (tValue === argData0.originalEvent.target.innerText) {
                    tVendorName = tValue;
                }
            }
        });

        if (tVendorName !== '') {
            setSelectedTBL_KSV_PO_MRP2([]);
            var tArray = [];
            datasTBL_KSV_PO_MRP2.forEach((col, i) => {
                 var tObj = { ...col };
                 if (tObj.VENDOR_NAME === tVendorName) tArray.push(tObj);
            });
            setSelectedTBL_KSV_PO_MRP2(tArray);

            var argData = { ...tArray[0] };

            // Bank Setting
            var tArray99 = [];
            argData.PAY_BANK_ARRAY.forEach((col, i) => {
                var tObj1 = { ...col };
                tArray99.push(tObj1);
            });
            if (tArray99.length > 1) {
                var tObj1 = {};
                tObj1.BANK_CD = '';
                tObj1.BANK_NAME = ' ';
                tArray99.unshift(tObj1);
                argData.PAY_BANK = '';
            }
            setDatasEDT_KSV_STOCK_MEM_PAY_BANK(tArray99);
            setDataEDT_KSV_STOCK_MEM_PAY_BANK(tArray99[0]);
            // Bank Setting
    
            var tTotPoAmt = 0;
            var tTotPayAmt = 0;
            var tTotDepositAmt = 0;
            var tTotLcAmt = 0;
    
            tArray.forEach((col, i) => {
                tTotPoAmt += parseFloat(col.PO_AMT);
                tTotPayAmt += parseFloat(col.PAY_AMT);
                if (col.LC_FLAG === '1' || parseFloat(col.LC_AMT) > 0) {
                  tTotLcAmt += parseFloat(col.PO_AMT);
                } 
                if (parseFloat(col.DEPOSIT_RATE) > 0) {
                  tTotDepositAmt += parseFloat(col.PO_AMT) * parseFloat(col.DEPOSIT_RATE) / 100.0;
                }
            });
    
            var tEdit = { ...dataEDT_KSV_STOCK_MEM };
            const tPayRuleVal =
                argData.PAY_TERM ?? argData.pay_term ?? argData.PAY_RULE ?? '';
            tEdit.CURR_CD = argData.CURR_CD;
            tEdit.PO_AMT = String(serviceLib.numToFixed(tTotPoAmt, 2));
            tEdit.PAY_DATE = argData.PAY_DATE;
            tEdit.VENDOR_CD = argData.VENDOR_CD;
            tEdit.PAY_RULE = tPayRuleVal === '' ? '' : String(tPayRuleVal);
            tEdit.PAY_BANK = argData.PAY_BANK;
            // tEdit.PAY_BANK = argData.PAY_BANK2;
            if (tTotLcAmt > 0) {
                tEdit.DEPOSIT_AMT = String(serviceLib.numToFixed(tTotLcAmt, 2));
            }
            else if (tTotDepositAmt > 0) {
                tEdit.DEPOSIT_AMT = String(serviceLib.numToFixed(tTotDepositAmt, 2));
            } else {
                tEdit.DEPOSIT_AMT = '0';
            }
            if (tEdit.DISCOUNT_AMT === '') tEdit.DISCOUNT_AMT = '0';
            if (tEdit.DEBIT_AMT === '') tEdit.DEBIT_AMT = '0';
            var tPayAmt = parseFloat(tEdit.PO_AMT) - parseFloat(tEdit.DEPOSIT_AMT) - parseFloat(tEdit.DISCOUNT_AMT) - parseFloat(tEdit.DEBIT_AMT);
            tEdit.PAY_AMT = String(serviceLib.numToFixed(tPayAmt, 2));
    
            if (argData.TT_FLAG === '1') tEdit.IS_TT = '1';
            else tEdit.IS_TT = '0';
            if (argData.LC_FLAG === '1') {
                tEdit.IS_TT = '0';
                tEdit.IS_LC = '1';
            } else {
                tEdit.IS_LC = '0';
            }
    
            tEdit.REG_USER = serviceLib.getUserInfo().USER_ID;
            tEdit.INVOICE_DATE = serviceLib.getCurrDate1();
    
            setDataEDT_KSV_STOCK_MEM(tEdit); 
    
            editEDT_KSV_STOCK_MEM_VENDOR_CD(tEdit.VENDOR_CD);
    
            

        }
    }

    const onCellEditCompleteKSV_PO_MRP2 = (e) => {

        let { rowData, newValue, field, originalEvent: event } = e;

        if (rowData.PO_QTY <= 0) return;
        rowData[field] = serviceLib.getFloat(parseFloat(newValue), 2);

        if (field === 'MOQ_QTY') {
           var tMrpQty = parseFloat(rowData.MRP_QTY);
           // var tStockQty = parseFloat(rowData.STOCK_QTY);
           var tStockQty = 0;
           var tMoqQty = parseFloat(newValue);
           var tLeftOverQty = parseFloat(rowData.LEFTOVER_QTY);
           var tPoQty = tMrpQty - tStockQty + tMoqQty + tLeftOverQty;
           tPoQty = serviceLib.getFloat(tPoQty, 4);
           rowData.PO_QTY = tPoQty;
           rowData.BAL_QTY = rowData.PO_QTY - rowData.STSIN_QTY;
           rowData.IN_QTY = rowData.BAL_QTY;
           rowData.SHIP_QTY = rowData.BAL_QTY;
        }

        if (field === 'LEFTOVER_QTY') {
           var tMrpQty = parseFloat(rowData.MRP_QTY);
           // var tStockQty = parseFloat(rowData.STOCK_QTY);
           var tStockQty = 0;
           var tMoqQty = parseFloat(rowData.MOQ_QTY);
           var tLeftOverQty = parseFloat(newValue);
           var tPoQty = tMrpQty - tStockQty + tMoqQty + tLeftOverQty;
           tPoQty = serviceLib.getFloat(tPoQty, 4);
           rowData.PO_QTY = tPoQty;
           rowData.BAL_QTY = rowData.PO_QTY - rowData.STSIN_QTY;
           rowData.IN_QTY = rowData.BAL_QTY;
           rowData.SHIP_QTY = rowData.BAL_QTY;
        }

        if (field === 'IN_QTY') {
           var tInQty = parseFloat(newValue);
           var tFocQty = parseFloat(rowData.FOC_QTY);
           rowData.SHIP_QTY = tInQty + tFocQty;
        }
        if (field === 'FOC_QTY') {
           var tInQty = parseFloat(rowData.IN_QTY);
           var tFocQty = parseFloat(newValue);
           rowData.SHIP_QTY = tInQty + tFocQty;
        }

        if (field === 'MOQ_AMT') {
           rowData.MOQ_PRICE = serviceLib.getFloat(parseFloat(rowData.MOQ_AMT/ rowData.PO_QTY), 4);
           rowData.PO_PRICE = rowData.MASTER_PRICE + rowData.MOQ_PRICE + rowData.FREIGHT_PRICE + rowData.OTHER_PRICE;
           rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);
        }
        if (field === 'FREIGHT_AMT') {
           rowData.FREIGHT_PRICE = serviceLib.getFloat(parseFloat(rowData.FREIGHT_AMT/ rowData.PO_QTY), 4);
           rowData.PO_PRICE = rowData.MASTER_PRICE + rowData.MOQ_PRICE + rowData.FREIGHT_PRICE + rowData.OTHER_PRICE;
           rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);
        }
        if (field === 'OTHER_AMT') {
           rowData.OTHER_PRICE = serviceLib.getFloat(parseFloat(rowData.OTHER_AMT/ rowData.PO_QTY), 4);
           rowData.PO_PRICE = rowData.MASTER_PRICE + rowData.MOQ_PRICE + rowData.FREIGHT_PRICE + rowData.OTHER_PRICE;
           rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);
        }

        var _dataTBL_KSV_PO_MRP2 = { ...dataTBL_KSV_PO_MRP2 }; 
        setDataTBL_KSV_PO_MRP2(rowData);
    }

    const cellEditorKSV_PO_MRP2 = (options) => {
        return textEditor(options);
    }

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    //
    /* TABLE KSV_PO_MRP*/
    // DEFINE DATAGRID : TBL_KSV_PO_MRP3
    const [loadingTBL_KSV_PO_MRP3, setLoadingTBL_KSV_PO_MRP3] = useState(false);

    const [savesTBL_KSV_PO_MRP3, setSavesTBL_KSV_PO_MRP3] = useState([]);
    const [datasTBL_KSV_PO_MRP3, setDatasTBL_KSV_PO_MRP3] = useState([]);
    const dt_TBL_KSV_PO_MRP3 = useRef(null);
    const [dataTBL_KSV_PO_MRP3, setDataTBL_KSV_PO_MRP3] = useState(emptyTBL_KSV_PO_MRP3);
    const [selectedTBL_KSV_PO_MRP3, setSelectedTBL_KSV_PO_MRP3] = useState([]);
    const [flagSelectModeTBL_KSV_PO_MRP3, setFlagSelectModeTBL_KSV_PO_MRP3] = useState(false);

    //
    useEffect(() => {

        var tRetDate = serviceLib.getCurrDate().substring(0, 8);
        

        var tBillCd = '';
        var tEndDate = '';

        var tUrls = window.location.href.split('?');
        if (tUrls.length <= 1) {
           ;
        } else {
          var tParams1 = tUrls[1].split('&');
          tParams1.forEach((col, i) => {
             var tObj = {};
             var tCols = col.split('=');
             if (tCols[0].includes('BILL_CD')) {
               tObj.key = tCols[0];
               tObj.value= tCols[1];
               tBillCd = tObj.value;
             }
             if (tCols[0].includes('END_DATE')) {
               tObj.key = tCols[0];
               tObj.value= tCols[1];
               tEndDate = tObj.value;
             }
          });
        }

        console.log(tUrls);

        if (tBillCd === '') { 
            search_CODE({});
        } else {

            setInfoStyle();

    
            setSelectedTBL_KSV_PO_MRP2([]);
            setDatasTBL_KSV_PO_MRP2([]);
    
            setSelectedTBL_KSV_PO_MRP3([]);
            setDatasTBL_KSV_PO_MRP3([]);

            var tObj = { ...emptyQRY_KSV_STOCK_MEM };
            tObj.S_END_DATE = tEndDate; 
            tObj.E_END_DATE = tEndDate; 
            tObj.BILL_CD = tBillCd; 
            tObj.IS_ALL = '1'; 

            setLoadingTBL_KSV_PO_MRP2(true);
            serviceS0419_ENDDING_MATL_AMT_DOMESTIC.mgrQuery_LIST_1(tObj).then(data => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === 'undefined') {
                    process_RESET_EDT();
                    var tArray = [];
                    data.forEach((col, i ) => {
                        var tObj = { ...col };

                        if (tObj.BILL_MST) {
                            if (data.length === 1 && tObj.BILL_MST.length === 1) {
                                tObj.PO_AMT = tObj.BILL_MST[0].PO_AMT;
                                tObj.PAY_AMT = tObj.BILL_MST[0].PAY_AMT;
                            }
                        }

                        tObj.id = i + 1;
                        tObj.BILL_CD = tBillCd;
                        var tBalAmt = (parseFloat(tObj.PAY_AMT)+parseFloat(tObj.DEPOSIT_AMT)) - parseFloat(tObj.END_AMT);
                        if (tBalAmt < 0) tBalAmt = 0;
                        tObj.BAL_AMT  = String(serviceLib.numToFixed(tBalAmt, 2));
                        tArray.push(tObj);
                    });
                    setDatasTBL_KSV_PO_MRP2(tArray);
                    console.log(tArray);
                    calcSelectRow(tArray);

                    if (!tArray.length) {
                        alert('No data!');
                        return;
                    }
                    
                    search_CODE(tArray[0]);

                } else {
                    console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                     
                }
            });
        } 

    }, []);

    const blankFn = () => {
    }

    // EDT
    const [dataEDT_KSV_STOCK_MEM, setDataEDT_KSV_STOCK_MEM] = useState(emptyEDT_KSV_STOCK_MEM);

    const onCheckboxChangeEDT_KSV_STOCK_MEM_IS_TT = (e, name) => {
        let val = '';
        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };
        if (e.checked) {
            val = '1';
        } else {
            val = '0';
        }
        _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_BILL_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_INVOICE_NO = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const [datasEDT_KSV_STOCK_MEM_VENDOR_CD, setDatasEDT_KSV_STOCK_MEM_VENDOR_CD] = useState([]);
    const [dataEDT_KSV_STOCK_MEM_VENDOR_CD, setDataEDT_KSV_STOCK_MEM_VENDOR_CD] = useState({});

    const editEDT_KSV_STOCK_MEM_VENDOR_CD = (argValue) => {
        let _dataEDT_KSV_STOCK_MEM_VENDOR_CD = datasEDT_KSV_STOCK_MEM_VENDOR_CD.filter(val => val.VENDOR_CD === argValue);
        setDataEDT_KSV_STOCK_MEM_VENDOR_CD(_dataEDT_KSV_STOCK_MEM_VENDOR_CD[0]);
    }

    const onDropdownChangeEDT_KSV_STOCK_MEM_VENDOR_CD = (e, name) => {
        let val = (e.value && e.value.VENDOR_CD) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
        setDataEDT_KSV_STOCK_MEM_VENDOR_CD(e.value);
    }

    const [datasEDT_KSV_STOCK_MEM_PUR_FACTORY, setDatasEDT_KSV_STOCK_MEM_PUR_FACTORY] = useState([]);
    const [dataEDT_KSV_STOCK_MEM_PUR_FACTORY, setDataEDT_KSV_STOCK_MEM_PUR_FACTORY] = useState({});

    const editEDT_KSV_STOCK_MEM_PUR_FACTORY = (argValue) => {
        let _dataEDT_KSV_STOCK_MEM_PUR_FACTORY = datasEDT_KSV_STOCK_MEM_PUR_FACTORY.filter(val => val.WARE_CD === argValue);
        setDataEDT_KSV_STOCK_MEM_PUR_FACTORY(_dataEDT_KSV_STOCK_MEM_PUR_FACTORY[0]);
    }

    const onDropdownChangeEDT_KSV_STOCK_MEM_PUR_FACTORY = (e, name) => {
        let val = (e.value && e.value.WARE_CD) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
        setDataEDT_KSV_STOCK_MEM_PUR_FACTORY(e.value);
    }

    const [datasEDT_KSV_STOCK_MEM_PAY_BANK, setDatasEDT_KSV_STOCK_MEM_PAY_BANK] = useState([]);
    const [dataEDT_KSV_STOCK_MEM_PAY_BANK, setDataEDT_KSV_STOCK_MEM_PAY_BANK] = useState({});

    const editEDT_KSV_STOCK_MEM_PAY_BANK = (argValue) => {
        console.log('Bank=>' + argValue + ',' + datasEDT_KSV_STOCK_MEM_PAY_BANK.length);
        let _dataEDT_KSV_STOCK_MEM_PAY_BANK = datasEDT_KSV_STOCK_MEM_PAY_BANK.filter(val => val.BANK_CD === argValue);
        setDataEDT_KSV_STOCK_MEM_PAY_BANK(_dataEDT_KSV_STOCK_MEM_PAY_BANK[0]);
        console.log(_dataEDT_KSV_STOCK_MEM_PAY_BANK[0]);
    }

    const onDropdownChangeEDT_KSV_STOCK_MEM_PAY_BANK = (e, name) => {
        let val = (e.value && e.value.BANK_CD) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
        setDataEDT_KSV_STOCK_MEM_PAY_BANK(e.value);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_REG_USER = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onCalChangeEDT_KSV_STOCK_MEM_INVOICE_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };
        _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);

    }

    const onInputChangeEDT_KSV_STOCK_MEM_CURR_CD = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_PO_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_DEPOSIT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_DEBIT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_DISCOUNT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '0';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        var tPoAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.PO_AMT);
        var tDepositAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.DEPOSIT_AMT);
        var tDebitAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.DEBIT_AMT);
        var tDiscountAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.DISCOUNT_AMT);
        var tVatAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.VAT_AMT);
        var tPayAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.PAY_AMT);

        var tOrgPayAmt = tPoAmt - tDepositAmt - tDebitAmt-  tDiscountAmt;
        if (tVatAmt > 0) {
            tVatAmt = tOrgPayAmt * 0.1;
            tVatAmt = tVatAmt.toFixed(2);
        }

        tPayAmt = tOrgPayAmt  + tVatAmt;

        let tEdit = { ..._dataEDT_KSV_STOCK_MEM };
        _dataEDT_KSV_STOCK_MEM.VAT_AMT = String(tVatAmt);
        _dataEDT_KSV_STOCK_MEM.PAY_AMT = String(tPayAmt);
        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onCalChangeEDT_KSV_STOCK_MEM_PAY_DATE = (e, name) => {
        let val1 = e.value || '';
        let val = '';
        if (val1 === '') {
            val = '';
        } else {
            val = getDateVal(val1);
        }

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };
        _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);

    }

    const onInputChangeEDT_KSV_STOCK_MEM_VAT_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const onInputChangeEDT_KSV_STOCK_MEM_PAY_AMT = (e, name) => {
        let val = (e.target && e.target.value) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string") _dataEDT_KSV_STOCK_MEM[`${name}`] = val;
        else if (typeof tTypeVal === "number") _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);

        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
    }

    const [datasEDT_KSV_STOCK_MEM_TAX_KIND, setDatasEDT_KSV_STOCK_MEM_TAX_KIND] = useState([]);
    const [dataEDT_KSV_STOCK_MEM_TAX_KIND, setDataEDT_KSV_STOCK_MEM_TAX_KIND] = useState({});

    const editEDT_KSV_STOCK_MEM_TAX_KIND = (argValue) => {
        let _dataEDT_KSV_STOCK_MEM_TAX_KIND = datasEDT_KSV_STOCK_MEM_TAX_KIND.filter(val => val.CD_CODE === argValue);
        setDataEDT_KSV_STOCK_MEM_TAX_KIND(_dataEDT_KSV_STOCK_MEM_TAX_KIND[0]);
    }

    const onDropdownChangeEDT_KSV_STOCK_MEM_TAX_KIND = (e, name) => {
        let val = (e.value && e.value.CD_CODE) || '';

        let _dataEDT_KSV_STOCK_MEM = { ...dataEDT_KSV_STOCK_MEM };

        let tTypeVal = _dataEDT_KSV_STOCK_MEM[`${name}`];
        if (typeof tTypeVal === "string" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = String(val);
        }
        else if (typeof tTypeVal === "number" && typeof val === "string") {
            _dataEDT_KSV_STOCK_MEM[`${name}`] = parseInt(val);
        }

        var tPoAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.PO_AMT);
        var tDepositAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.DEPOSIT_AMT);
        var tDebitAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.DEBIT_AMT);
        var tDiscountAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.DISCOUNT_AMT);
        var tVatAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.VAT_AMT);
        var tPayAmt = parseFloat(_dataEDT_KSV_STOCK_MEM.PAY_AMT);

        var tOrgPayAmt = tPoAmt - tDepositAmt - tDebitAmt - tDiscountAmt;
        if (val === '1' || val === '10') {
            // tVatAmt = serviceLib.getFloat(tOrgPayAmt * 0.1, 2);
            tVatAmt = parseFloat(tOrgPayAmt) * 0.1;
            tVatAmt = parseFloat(tVatAmt.toFixed(2)); 
            tPayAmt = tOrgPayAmt + tVatAmt;
            _dataEDT_KSV_STOCK_MEM.VAT_AMT = String(tVatAmt);
            _dataEDT_KSV_STOCK_MEM.PAY_AMT = String(tPayAmt);
        } else if (val === '8') {
            // tVatAmt = serviceLib.getFloat(tOrgPayAmt * 0.08, 2);
            tVatAmt = parseFloat(tOrgPayAmt) * 0.08;
            tVatAmt = parseFloat(tVatAmt.toFixed(2)); 
            tPayAmt = tOrgPayAmt + tVatAmt;
            _dataEDT_KSV_STOCK_MEM.VAT_AMT = String(tVatAmt);
            _dataEDT_KSV_STOCK_MEM.PAY_AMT = String(tPayAmt);
        } else {
            tVatAmt = 0;
            tPayAmt = tOrgPayAmt + tVatAmt;
            _dataEDT_KSV_STOCK_MEM.VAT_AMT = String(tVatAmt);
            _dataEDT_KSV_STOCK_MEM.PAY_AMT = String(tPayAmt);
        }
        setDataEDT_KSV_STOCK_MEM(_dataEDT_KSV_STOCK_MEM);
        setDataEDT_KSV_STOCK_MEM_TAX_KIND(e.value);
    }

    // Support Area

    const changeCheckBoxVal = (argVal) => {
        if (argVal === '1') return true;
        else return false;
    }

    const changeDateVal = (argVal) => {
        if (argVal === '') return (argVal);
        var tType = typeof argVal;
        if (tType !== 'string') {
            console.log(tType);
            return null;
        }

        var tYear = parseInt(argVal.substring(0, 4));
        var tMon = parseInt(argVal.substring(4, 6));
        var tDay = parseInt(argVal.substring(6, 8));

        return (new Date(tYear, tMon - 1, tDay));
    }

    const getDateVal = (argVal) => {
        var tDate = argVal;
        var mm = tDate.getMonth() + 1;
        var mm_str = '';
        if (mm > 9) mm_str = mm;
        else mm_str = '0' + mm;

        var dd = tDate.getDate();
        var dd_str = '';
        if (dd > 9) dd_str = dd;
        else dd_str = '0' + dd;

        var hours = tDate.getHours();
        var hours_str = '';
        if (hours > 9) hours_str = hours;
        else hours_str = '0' + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = '';
        if (minutes > 9) minutes_str = minutes;
        else minutes_str = '0' + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = '';
        if (seconds > 9) seconds_str = seconds;
        else seconds_str = '0' + seconds;

        var yyyy = tDate.getFullYear().toString();

        var tRet = yyyy + mm_str + dd_str;
        return (tRet);
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const getDateYYYYMMDD = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = '';
        if (mm > 9) mm_str = mm.toString();
        else mm_str = '0' + mm;

        var dd = tDate.getDate();
        var dd_str = '';
        if (dd > 9) dd_str = dd.toString();
        else dd_str = '0' + dd;

        var hours = tDate.getHours();
        var hours_str = '';
        if (hours > 9) hours_str = hours.toString();
        else hours_str = '0' + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = '';
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = '0' + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = '';
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = '0' + seconds;

        var yyyy = tDate.getFullYear();

        var tRet = yyyy.toString() + mm_str + dd_str + hours_str + minutes_str + seconds_str;
        return (tRet);
    }

    const getDateYYMM = () => {
        var tDate = new Date();
        var mm = tDate.getMonth() + 1;
        var mm_str = '';
        if (mm > 9) mm_str = mm.toString();
        else mm_str = '0' + mm;

        var dd = tDate.getDate();
        var dd_str = '';
        if (dd > 9) dd_str = dd.toString();
        else dd_str = '0' + dd;

        var hours = tDate.getHours();
        var hours_str = '';
        if (hours > 9) hours_str = hours.toString();
        else hours_str = '0' + hours;

        var minutes = tDate.getMinutes();
        var minutes_str = '';
        if (minutes > 9) minutes_str = minutes.toString();
        else minutes_str = '0' + minutes;

        var seconds = tDate.getSeconds();
        var seconds_str = '';
        if (seconds > 9) seconds_str = seconds.toString();
        else seconds_str = '0' + seconds;

        var yyyy = tDate.getFullYear();
        var yyyy_str = yyyy.toString();

        var tRet = yyyy_str.substring(2, 4) + mm_str;
        return (tRet);
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportExcelTBL_KSV_PO_MRP3 = async () => {
        try {
            const rows = datasTBL_KSV_PO_MRP3;

            if (!rows || rows.length === 0) {
                alert('내보낼 데이터가 없습니다.<br><br>There is no data to export.');
                return;
            }

            const COLS = [
                { header: "PU",           key: 'PU_CD',        width: 12 },
                { header: "PO",           key: 'PO_CD',        width: 12 },
                { header: "PO Seq",       key: 'PO_SEQ',       width: 8,  type: 'number',   sum: false },
                { header: "Matl#",        key: 'MATL_CD',      width: 16 },
                { header: "Desc",         key: 'MATL_NAME',    width: 28 },
                { header: "Color",        key: 'COLOR',        width: 16 },
                { header: "Spec",         key: 'SPEC',         width: 18 },
                { header: "Unit",         key: 'UNIT',         width: 8  },
                { header: "TOT Qty",      key: 'TOT_QTY',      width: 12, type: 'number',   sum: true },
                { header: "In Qty",       key: 'IN_QTY',       width: 12, type: 'number',   sum: true },
                { header: "Lc Qty",       key: 'LC_QTY',       width: 12, type: 'number',   sum: true },
                { header: "Curr",         key: 'IN_CURR_CD',   width: 8  },
                { header: "In Price",     key: 'IN_PRICE',     width: 14, type: 'currency', sum: true },
                { header: "In Date",      key: 'IN_DATETIME',  width: 12, type: 'dateTime' },
                { header: "Pay Date",     key: 'PAY_DATE',     width: 12, type: 'date' },
                { header: "End",          key: 'END_FLAG',     width: 8  },
                { header: "End Date",     key: 'END_DATE',     width: 12, type: 'date' }, 
                { header: "Pay Report",   key: 'PAY_REPORT',   width: 12 },
                { header: "Tax",          key: 'TAX',          width: 12, type: 'currency', sum: true },
                { header: "TaxBill",      key: 'CALC_FLAG',    width: 8  },
                { header: "StsIn#",       key: 'STSIN_CD',     width: 14 },
                { header: "Bill#",        key: 'BILL_NO',      width: 14 },
            ];

            const workbook = new ExcelJS.Workbook();
            const ws = workbook.addWorksheet('Material List');
            ws.columns = COLS.map(c => ({ header: c.header, key: c.key, width: c.width }));

            ws.getCell('A1').value = 'Material List';
            ws.getCell('A1').font = { size: 11, bold: true };
            ws.getRow(2); 

            const headerRow = ws.getRow(3);
            COLS.forEach((c, i) => {
                const cell = headerRow.getCell(i + 1);
                cell.value = c.header;
                cell.font = { bold: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCE6F1' } };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = { top:{style:'thin'}, left:{style:'thin'}, bottom:{style:'thin'}, right:{style:'thin'} };
            });
            ws.views = [{ state: 'frozen', ySplit: 3 }];
            ws.autoFilter = { from: { row: 3, column: 1 }, to: { row: 3, column: COLS.length } };

            const firstDataRow = 4;

            const toExcelDate = (v) => {
                if (typeof v === 'string' && /^\d{8}$/.test(v)) {
                    const y = Number(v.slice(0, 4));
                    const m = Number(v.slice(4, 6));
                    const d = Number(v.slice(6, 8));
                    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) return new Date(y, m - 1, d);
                }
                if (v instanceof Date) return v;
                return v ?? '';
            };
            const toExcelDateTime = (v) => {
                if (typeof v === 'string' && /^\d{14}$/.test(v)) {
                    const y = +v.slice(0,4), m = +v.slice(4,6), d = +v.slice(6,8);
                    const hh = +v.slice(8,10), mm = +v.slice(10,12), ss = +v.slice(12,14);
                    if ([y,m,d,hh,mm,ss].every(n => Number.isFinite(n))) return new Date(y, m-1, d, hh, mm, ss);
                }
                return toExcelDate(v);
            };

            rows.forEach(item => {
                const rowObj = {};
                COLS.forEach(col => {
                    let val = item[col.key];
                    switch (col.type) {
                        case 'number': {
                            const n = Number(val);
                            val = Number.isFinite(n) ? n : null;
                            break;
                        }
                        case 'currency': {
                            const n = Number(val);
                            val = Number.isFinite(n) ? n : null;
                            break;
                        }
                        case 'date':
                            val = toExcelDate(val);
                            break;
                        case 'dateTime':
                            val = toExcelDateTime(val);
                            break;
                        default:
                            if (val === undefined || val === null) val = '';
                    }
                    rowObj[col.key] = val;
                });

                const r = ws.addRow(rowObj);
                r.eachCell((cell, cIdx) => {
                    cell.border = { top:{style:'thin'}, left:{style:'thin'}, bottom:{style:'thin'}, right:{style:'thin'} };
                    const t = COLS[cIdx - 1]?.type;
                    if (t === 'currency') {
                        cell.alignment = { horizontal: 'right' };
                        cell.numFmt = '#,##0.00';
                    } else if (t === 'number') {
                        cell.alignment = { horizontal: 'right' };
                        cell.numFmt = '#,##0';
                    } else if (t === 'date' && cell.value instanceof Date) {
                        cell.alignment = { horizontal: 'center' };
                        cell.numFmt = 'yyyy-mm-dd';
                    } else if (t === 'dateTime' && cell.value instanceof Date) {
                        cell.alignment = { horizontal: 'center' };
                        cell.numFmt = 'yyyy-mm-dd';
                    }
                });
            });

            for (let col = 2; col <= 22; col++) {
                const cell = ws.getRow(1).getCell(col);
                cell.value = null;            // 값/수식 제거
            }

            const buf = await workbook.xlsx.writeBuffer();
            const fileName = `PO_MRP3_${new Date().toISOString().replace(/[-:T.]/g, '').slice(0,14)}.xlsx`;
            saveAs(buf, fileName);
        } catch (err) {
            console.error('Excel export error:', err);
            alert('엑셀 내보내기 중 오류가 발생했습니다.<br><br>An error occurred while exporting to Excel.');
        }
    };

    const saveAs = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });
                module.default.saveAs(data, fileName);
            }
        });
    }

    return (

        <div className="af-div-main" >

            <div className="af-div-first" style={styleVal}>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Type </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Dropdown style={{ width: '9rem' }} id="id_VENDOR_CD" filter value={dataQRY_KSV_STOCK_MEM_VENDOR_TYPE} onChange={(e) => onDropdownChangeQRY_KSV_STOCK_MEM_VENDOR_TYPE(e, 'VENDOR_TYPE')} options={datasQRY_KSV_STOCK_MEM_VENDOR_TYPE} optionLabel="CD_NAME" placeholder="" editable filter ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Purchaser </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_COLOR" value={dataQRY_KSV_STOCK_MEM.PURCHARGER} onChange={(e) => onInputChangeQRY_KSV_STOCK_MEM_PURCHARGER(e, 'PURCHARGER')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> PU# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_COLOR" value={dataQRY_KSV_STOCK_MEM.PU_CD} onChange={(e) => onInputChangeQRY_KSV_STOCK_MEM_PU_CD(e, 'PU_CD')} placeholder='PU26-0100,0101'/>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Pay Date </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_IN_DATE" value={changeDateVal(dataQRY_KSV_STOCK_MEM.S_PAY_DATE)} onChange={(e) => onCalChangeQRY_KSV_STOCK_MEM_S_PAY_DATE(e, 'S_PAY_DATE')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <p className="af-span-p" style={{ width: '1rem' }}> ~ </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_IN_DATE" value={changeDateVal(dataQRY_KSV_STOCK_MEM.E_PAY_DATE)} onChange={(e) => onCalChangeQRY_KSV_STOCK_MEM_E_PAY_DATE(e, 'E_PAY_DATE')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
			            <Tooltip className="menuCodeTooltip" target={`#btnSearch`} content={`Alt+S`} position="bottom" />
                       <Button label={<span>Search(<u>S</u>)</span>}  accessKey='S' id="btnSearch" style={{ width: '10rem' }} className="p-button-text" onClick={search_ENDDING_MATL} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                       <Button label="Reset" style={{ width: '10rem' }} className="p-button-text" onClick={process_RESET} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                       <Button label="Excel" style={{ width: '10rem' }} className="p-button-text green" onClick={blankFn} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '32.5rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Supplier </p>
                    <div className="af-span-div" style={{ width: '20.5rem' }}>
                       
                       <InputText style={{ width: '20.5rem' }} id="id_COLOR" value={dataQRY_KSV_STOCK_MEM.VENDOR_CD} onChange={(e) => onInputChangeQRY_KSV_STOCK_MEM_VENDOR_CD(e, 'VENDOR_CD')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Buyer# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       
                       <InputText style={{ width: '9rem' }} id="id_MATL_NAME" value={dataQRY_KSV_STOCK_MEM.BUYER_CD} onChange={(e) => onInputChangeQRY_KSV_STOCK_MEM_BUYER_CD(e, 'BUYER_CD')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> End Date </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_IN_DATE" value={changeDateVal(dataQRY_KSV_STOCK_MEM.S_END_DATE)} onChange={(e) => onCalChangeQRY_KSV_STOCK_MEM_S_END_DATE(e, 'S_END_DATE')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <p className="af-span-p" style={{ width: '1rem' }}> ~ </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_IN_DATE" value={changeDateVal(dataQRY_KSV_STOCK_MEM.E_END_DATE)} onChange={(e) => onCalChangeQRY_KSV_STOCK_MEM_E_END_DATE(e, 'E_END_DATE')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <p className="af-span-p" style={{ width: '2rem' }}> PO# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_COLOR" value={dataQRY_KSV_STOCK_MEM.PO_CD} onChange={(e) => onInputChangeQRY_KSV_STOCK_MEM_PO_CD(e, 'PO_CD')} placeholder='PO26-0100,0101'/>
                    </div>
                </span>
                

                <span className="af-span-3" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> In Date </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_IN_DATE" value={changeDateVal(dataQRY_KSV_STOCK_MEM.S_IN_DATE)} onChange={(e) => onCalChangeQRY_KSV_STOCK_MEM_S_IN_DATE(e, 'S_IN_DATE')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '11rem' }}>
                    <p className="af-span-p" style={{ width: '1rem' }}> ~ </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_IN_DATE" value={changeDateVal(dataQRY_KSV_STOCK_MEM.E_IN_DATE)} onChange={(e) => onCalChangeQRY_KSV_STOCK_MEM_E_IN_DATE(e, 'E_IN_DATE')} />
                    </div>
                </span>

                
            </div>

            <div className="af-div-first" style={{ width: '100%', height: '20rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_PO_MRP2} size="small" value={datasTBL_KSV_PO_MRP2}
                    tableStyle={{tableLayout:'fixed'}}
                    resizableColumns columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP2}
                    metaKeySelection={false}
                    showGridlines selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP2}
                    onRowSelect={onRowSelectTBL_KSV_PO_MRP2} 
                    onRowUnselect={onRowUnselectTBL_KSV_PO_MRP2} 
                    onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP2}
                    onSelectionChange={(e) => { calcSelectRow(e.value); }}
                    dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP2}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="28rem" >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false}  headerClassName='t-header' headerStyle={{ width: '3rem' }}></AFColumn>
                    
                    
                    <AFColumn field="PU_CD" headerClassName='t-header' header="PU#" style={{ width: '8rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="PO_CD2" headerClassName='t-header' header="PO#" style={{ width: '6rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName='t-header' header="Supplier" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="IN_DATE" headerClassName='t-header' header="In Date" style={{ width: '8rem',flexBasis:'auto' }} body={(rowData) => {return moment(rowData.IN_DATE, 'YYYYMMDD').format('YYYY-MM-DD');}}></AFColumn>
                    
                    <AFColumn field="PAY_DATE" headerClassName='t-header' header="Pay Date" style={{ width: '10rem',flexBasis:'auto' }} body={rowData => serviceLib.dateFormatHMS(rowData.PAY_DATE)} ></AFColumn>
                    <AFColumn field="IN_QTY" headerClassName='t-header' header="In Qty" style={{ width: '4rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.IN_QTY, 2)}></AFColumn>
                    <AFColumn field="LC_QTY" headerClassName='t-header' header="Lc Qty" style={{ width: '4rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName='t-header' header="Curr" style={{ width: '4rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="PO_AMT" headerClassName='t-header' header="Po Amt" style={{ width: '10rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.PO_AMT, 4)} ></AFColumn>
                    <AFColumn field="DEPOSIT_AMT" headerClassName='t-header' header="Deposit&L/C" style={{ width: '8rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.DEPOSIT_AMT, 4)} ></AFColumn>
                    <AFColumn field="PAY_AMT" headerClassName='t-header' header="Pay Amount" style={{ width: '10rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.PAY_AMT, 4)} ></AFColumn>
                    
                    <AFColumn field="PURCHARGER" headerClassName='t-header' header="Purchaser" style={{ width: '7rem',flexBasis:'auto' }}></AFColumn>
                    
                    
                    <AFColumn field="COMPANY_CODE" headerClassName='t-header' header="Company" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                </AFDataTable>
            </div>

            <div className="af-div-first" style={{ width: '123rem', height: '10rem' }}>
                <span className="af-span-3-0" style={{ width: '20rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> BILL# </p>
                    <div className="af-span-div" style={{ width: '12rem' }}>
                       <InputText disabled style={{ width: '12rem' }} id="id_COLOR" value={dataEDT_KSV_STOCK_MEM.BILL_CD} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_BILL_CD(e, 'BILL_CD')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '18.5' }}>
                    <p className="af-span-p" style={{ width: '4rem' }}> Supplier </p>
                    <div className="af-span-div" style={{ width: '14rem' }}>
                       <Dropdown disabled style={{ width: '14rem' }}  id="id_VENDOR_CD" filter value={dataEDT_KSV_STOCK_MEM_VENDOR_CD} onChange={(e) => onDropdownChangeEDT_KSV_STOCK_MEM_VENDOR_CD(e, 'VENDOR_CD')} options={datasEDT_KSV_STOCK_MEM_VENDOR_CD} optionLabel="VENDOR_NAME" placeholder="" editable></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '19.5rem' }}>
                    <p className="af-span-p" style={{ width: '5rem' }}> Pay Bank </p>
                    <div className="af-span-div" style={{ width: '14rem' }}>
                       <Dropdown disabled={typeIsFactory} style={{ width: '14rem' }}  id="id_VENDOR_CD" filter value={dataEDT_KSV_STOCK_MEM_PAY_BANK} onChange={(e) => onDropdownChangeEDT_KSV_STOCK_MEM_PAY_BANK(e, 'PAY_BANK')} options={datasEDT_KSV_STOCK_MEM_PAY_BANK} optionLabel="BANK_NAME" placeholder="" editable></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '15rem' }}>
                    <p className="af-span-p" style={{ width: '5rem' }}> Register </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText disabled style={{ width: '9rem' }} id="id_COLOR" value={dataEDT_KSV_STOCK_MEM.REG_USER} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_REG_USER(e, 'REG_USER')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '15rem' }}>
                    <p className="af-span-p" style={{ width: '4rem' }}> Tax Kind </p>
                    <div className="af-span-div" style={{ width: '8rem' }}>
                       <Dropdown style={{ width: '8rem' }}  id="id_VENDOR_CD" filter value={dataEDT_KSV_STOCK_MEM_TAX_KIND} onChange={(e) => onDropdownChangeEDT_KSV_STOCK_MEM_TAX_KIND(e, 'TAX_KIND')} options={datasEDT_KSV_STOCK_MEM_TAX_KIND} optionLabel="CD_NAME" placeholder=" "></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '5rem' }}> PurFactory </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                       <Dropdown style={{ width: '10rem' }}  id="id_VENDOR_CD" filter value={dataEDT_KSV_STOCK_MEM_PUR_FACTORY} onChange={(e) => onDropdownChangeEDT_KSV_STOCK_MEM_PUR_FACTORY(e, 'PUR_FACTORY')} options={datasEDT_KSV_STOCK_MEM_PUR_FACTORY} optionLabel="WARE_NAME" placeholder=""></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ width: '10rem' }} label="Save" className="p-button-text" onClick={process_CLOSE} />
                    </div>
                </span>
                

                <span className="af-span-3" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Invoice Date </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_PAY_DATE" value={changeDateVal(dataEDT_KSV_STOCK_MEM.INVOICE_DATE)} onChange={(e) => onCalChangeEDT_KSV_STOCK_MEM_INVOICE_DATE(e, 'INVOICE_DATE')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '7rem' }}>
                    <p className="af-span-p-0" style={{ width: '6rem' }}> Curr </p>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <p className="af-span-p-0" style={{ width: '11rem' }}> PO Amt </p>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <p className="af-span-p-0" style={{ width: '11rem' }}> Deposit & LC </p>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <p className="af-span-p-0" style={{ width: '11rem' }}> Debit </p>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <p className="af-span-p-0" style={{ width: '11rem' }}> Discount </p>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <p className="af-span-p-0" style={{ width: '11rem' }}> VAT </p>
                </span>
                <span className="af-span-3" style={{ width: '21rem' }}>
                    <p className="af-span-p-0" style={{ width: '11rem' }}> Pay Amt </p>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ width: '10rem' }} label="Debit Apply" className="p-button-text" onClick={popup_UPDATE_DN} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Pay Date </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_PAY_DATE" value={changeDateVal(dataEDT_KSV_STOCK_MEM.PAY_DATE)} onChange={(e) => onCalChangeEDT_KSV_STOCK_MEM_PAY_DATE(e, 'PAY_DATE')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '7rem' }}>
                    <div className="af-span-div" style={{ width: '6rem' }}>
                       <InputText className='text-center' disabled style={{ width: '6rem' }} id="id_COLOR" value={dataEDT_KSV_STOCK_MEM.CURR_CD} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_CURR_CD(e, 'CURR_CD')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <div className="af-span-div" style={{ width: '11rem' }}>
                       <InputText className='text-right' disabled style={{ width: '11rem' }} id="id_COLOR" value={serviceLib.formatNumber(dataEDT_KSV_STOCK_MEM.PO_AMT,4)} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_PO_AMT(e, 'PO_AMT')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <div className="af-span-div" style={{ width: '11rem' }}>
                       <InputText className='text-right' disabled style={{ width: '11rem' }} id="id_COLOR" value={serviceLib.formatNumber(dataEDT_KSV_STOCK_MEM.DEPOSIT_AMT,4)} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_DEPOSIT_AMT(e, 'DEPOSIT_AMT')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <div className="af-span-div" style={{ width: '11rem' }}>
                       <InputText className='text-right' disabled style={{ width: '11rem' }} id="id_COLOR" value={serviceLib.formatNumber(dataEDT_KSV_STOCK_MEM.DEBIT_AMT,4)} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_DEBIT_AMT(e, 'DEBIT_AMT')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <div className="af-span-div" style={{ width: '11rem' }}>
                       <InputText className='text-right' style={{ width: '11rem' }} id="id_COLOR" value={dataEDT_KSV_STOCK_MEM.DISCOUNT_AMT} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_DISCOUNT_AMT(e, 'DISCOUNT_AMT')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '12rem' }}>
                    <div className="af-span-div" style={{ width: '11rem' }}>
                       <InputText className='text-right' disabled style={{ width: '11rem' }} id="id_COLOR" value={serviceLib.formatNumber(dataEDT_KSV_STOCK_MEM.VAT_AMT,4)} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_VAT_AMT(e, 'VAT_AMT')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '21rem' }}>
                    <div className="af-span-div" style={{ width: '11rem' }}>
                       <InputText className='text-right' disabled style={{ width: '11rem' }} id="id_COLOR" value={serviceLib.formatNumber(dataEDT_KSV_STOCK_MEM.PAY_AMT,4)} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_PAY_AMT(e, 'PAY_AMT')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ width: '10rem' }} label="Reset" className="p-button-text" onClick={process_RESET_EDT} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '26rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Invoice# </p>
                    <div className="af-span-div" style={{ width: '19rem' }}>
                       <InputText style={{ width: '19rem' }} id="id_COLOR" value={dataEDT_KSV_STOCK_MEM.INVOICE_NO} onChange={(e) => onInputChangeEDT_KSV_STOCK_MEM_INVOICE_NO(e, 'INVOICE_NO')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '32rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Pay Rule </p>
                    <div className="af-span-div" style={{ width: '25rem' }}>
                       <InputText disabled style={{ width: '25rem' }} id="id_PAY_RULE" value={dataEDT_KSV_STOCK_MEM.PAY_RULE} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '48.5rem' }}></span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                       <Button label="Excel" style={{ width: '10rem' }} className="p-button-text green" onClick={exportExcelTBL_KSV_PO_MRP3} />
                    </div>
                </span>
            </div>

            <div className="af-div-first" style={{ width: '100%', height: '20rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_PO_MRP3} size="small" value={datasTBL_KSV_PO_MRP3}
                    tableStyle={{tableLayout:'fixed'}}
                    resizableColumns columnResizeMode="expand"
                    loading={loadingTBL_KSV_PO_MRP3}
                    metaKeySelection={false}
                    showGridlines selectionMode="multiple"
                    selection={selectedTBL_KSV_PO_MRP3}
                    // onRowSelect={onRowSelectTBL_KSV_PO_MRP3} 
                    // onRowUnselect={onRowUnselectTBL_KSV_PO_MRP3} 
                    // onRowDoubleClick={onRowDoubleClickTBL_KSV_PO_MRP3}
                    onSelectionChange={(e) => { setSelectedTBL_KSV_PO_MRP3(e.value); }}
                    dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP3}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="18rem" >
                    
                    <AFColumn field="PU_CD" headerClassName='t-header' header="PU" style={{ width: '8rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="PO_CD" headerClassName='t-header' header="PO" style={{ width: '6rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="PO_SEQ" headerClassName='t-header' header="PO Seq" style={{ width: '3rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName='t-header' header="Matl#" style={{ width: '8rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName='t-header' header="Desc" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="COLOR" headerClassName='t-header' header="Color" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="SPEC" headerClassName='t-header' header="Spec" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="UNIT" headerClassName='t-header' header="Unit" style={{ width: '4rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="TOT_QTY" headerClassName='t-header' header="TOT Qty" style={{ width: '6rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.TOT_QTY, 2)}></AFColumn>
                    <AFColumn field="IN_QTY" headerClassName='t-header' header="In Qty" style={{ width: '6rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.IN_QTY, 2)}></AFColumn>
                    <AFColumn field="LC_QTY" headerClassName='t-header' header="Lc Qty" style={{ width: '6rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.LC_QTY, 2)}></AFColumn>
                    <AFColumn field="IN_CURR_CD"  headerClassName='t-header' header="Curr" style={{ width: '3rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="IN_PRICE" headerClassName='t-header' header="In Price" style={{ width: '6rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.IN_PRICE, 4)}></AFColumn>
                    <AFColumn field="IN_DATETIME" headerClassName='t-header' header="In Date" style={{ width: '8rem',flexBasis:'auto' }} body={(rowData) => {return moment(rowData.IN_DATETIME, 'YYYYMMDDHHmmss').format('YYYY-MM-DD');}}></AFColumn>
                    <AFColumn field="PAY_DATE" headerClassName='t-header' header="Pay Date" style={{ width: '8rem',flexBasis:'auto' }} body={(rowData) => {return moment(rowData.PAY_DATE, 'YYYYMMDD').format('YYYY-MM-DD');}}></AFColumn>
                    <AFColumn field="END_FLAG"  headerClassName='t-header' header="End" style={{ width: '3rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="END_DATE"  headerClassName='t-header' header="End Date" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="PAY_REPORT"  headerClassName='t-header' header="Pay Report" style={{ width: '10rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="TAX"  headerClassName='t-header' header="Tax" style={{ width: '8rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="CALC_FLAG"  headerClassName='t-header' header="TaxBill" style={{ width: '3rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="STSIN_CD"  headerClassName='t-header' header="StsIn#" style={{ width: '6rem',flexBasis:'auto' }}></AFColumn>
                    <AFColumn field="BILL_NO"  headerClassName='t-header' header="Bill#" style={{ width: '6rem',flexBasis:'auto' }}></AFColumn>
                </AFDataTable>
            </div>

             

            <Toast ref={toast} />

            {/* DN Update SUB 화면 */}
            <Dialog visible={createDialog} position="mid-center" style={{ width: '122rem', height: '62rem' }} header="" modal={true} className="p-fluid" onHide={hideDialog}>

            <div className="af-div-first" style={{ width: '120rem', height: '3rem' }}>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> CRDB# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_CRDB_MST.CRDB_CD} onChange={(e) => onInputChangeQRY_KSV_CRDB_MST_CRDB_CD(e, 'CDRB_CD')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Supplier# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{  width: '9rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_CRDB_MST.VENDOR_CD} onChange={(e) => onInputChangeQRY_KSV_CRDB_MST_VENDOR_CD(e, 'VENDOR_CD')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Curr </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataQRY_KSV_CRDB_MST.CURR_CD} onChange={(e) => onInputChangeQRY_KSV_CRDB_MST_CURR_CD(e, 'CURR_CD')} />
                    </div>
                </span>
            </div>
            <div className="af-div-first" style={{ width: '120rem', height: '26rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_CRDB_MST} size="small" value={datasTBL_KSV_CRDB_MST}
                    tableStyle={{tableLayout:'fixed'}}
                    loading={loadingTBL_KSV_CRDB_MST}
                    resizableColumns columnResizeMode="expand"
                    loading={loadingTBL_KSV_CRDB_MST}
                    showGridlines selectionMode="checkbox"
                    selection={selectedTBL_KSV_CRDB_MST}
                    onSelectionChange={(e) => { setFlagSelectModeTBL_KSV_CRDB_MST(true); setSelectedTBL_KSV_CRDB_MST(e.value); console.log('selected length:' + selectedTBL_KSV_CRDB_MST.length); onRowClick1TBL_KSV_CRDB_MST(e.value); }}
                    onRowClick={onRowClickTBL_KSV_CRDB_MST} dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_CRDB_MST}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="26rem" >
                    <AFColumn className="af-col" style={{width:'6rem'}} field="CRDB_CD" headerClassName='t-header' header="Crdb#" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'2rem'}} field="CRDB_SEQ" headerClassName='t-header' header="Crdb Seq" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="CRDB_DATE" headerClassName='t-header' header="Issue Date" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'10rem'}} field="COM_NAME" headerClassName='t-header' header="Messer" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="CRDB_AMT" headerClassName='t-header' header="Amt" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="BALANCE" headerClassName='t-header' header="Bal" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'3rem'}} field="CURR_CD" headerClassName='t-header' header="Curr" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="USD_BAL" headerClassName='t-header' header="Usd Bal" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'10rem'}} field="TITLE" headerClassName='t-header' header="Title" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="REG_USER" headerClassName='t-header' header="Reg User" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="STOCK_QTY" headerClassName='t-header' header="Stock Qty" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="END_DATE" headerClassName='t-header' header="End date"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'10rem'}} field="REMARK" headerClassName='t-header' header="Remark" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'4rem'}} field="STATUS" headerClassName='t-header' header="Status" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="PO_CD" headerClassName='t-header' header="PO#" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'7rem'}} field="ORDER_CD" headerClassName='t-header' header="Order#"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="BANK" headerClassName='t-header' header="Bank"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="COM_CD" headerClassName='t-header' header="Messer#"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="STATUS_CD" headerClassName='t-header' header="Status#"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'3rem'}} field="BUYER_CD" headerClassName='t-header' header="Buyer#"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'10rem'}} field="BUYER_NAME" headerClassName='t-header' header="Buyer"  ></AFColumn>
                    <AFColumn className="af-col" style={{width:'10rem'}} field="PAYMENT_PLAN" headerClassName='t-header' header="Payment.P"  ></AFColumn>
                </AFDataTable>
            </div>

            <div className="af-div-first" style={{ width: '120rem', height: '3rem' }}>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> CRDB# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataEDT_KSV_CRDB_MST.CRDB_CD} onChange={(e) => onInputChangeEDT_KSV_CRDB_MST_CRDB_CD(e, 'CDRB_CD')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Part Amt </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataEDT_KSV_CRDB_MST.PART_AMT} onChange={(e) => onInputChangeEDT_KSV_CRDB_MST_PART_AMT(e, 'PART_AMT')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Rest Amt </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_TARGET_ETA" value={dataEDT_KSV_CRDB_MST.REST_AMT} onChange={(e) => onInputChangeEDT_KSV_CRDB_MST_REST_AMT(e, 'REST_AMT')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '16rem' }}>
                    <p className="af-span-p" style={{ width: '6rem' }}> Part Date </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <Calendar showButtonBar style={{ width: '9rem' }} dateFormat="yy-mm-dd" id="id_S_PO_DATE" value={changeDateVal(dataEDT_KSV_CRDB_MST.PART_DATE)} onChange={(e) => onCalChangeEDT_KSV_CRDB_MST_PART_DATE(e, 'PART_DATE')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ width: '10rem' }} label="Update Dn" className="p-button-text" onClick={process_UPDATE_DN} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ width: '10rem' }} label="Cancel Dn" className="p-button-text" onClick={process_DELETE_DN} />
                    </div>
                </span>
            </div>

            <div className="af-div-first" style={{ width: '120rem', height: '9rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_CRDB_MST2} size="small" value={datasTBL_KSV_CRDB_MST2}
                    tableStyle={{tableLayout:'fixed'}}
                    resizableColumns columnResizeMode="fit"
                    loading={loadingTBL_KSV_CRDB_MST2}
                    showGridlines selectionMode="checkbox"
                    selection={selectedTBL_KSV_CRDB_MST2}
                    onSelectionChange={(e) => { setFlagSelectModeTBL_KSV_CRDB_MST2(true); setSelectedTBL_KSV_CRDB_MST2(e.value); console.log('selected length:' + selectedTBL_KSV_CRDB_MST2.length); onRowClick1TBL_KSV_CRDB_MST2(e.value); }}
                    onRowClick={onRowClickTBL_KSV_CRDB_MST2} dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_CRDB_MST2}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="9rem" >
                    <AFColumn className="af-col" style={{width:'6rem'}} field="END_DATE" headerClassName='t-header' header="End Date" ></AFColumn>
                    <AFColumn className="af-col" style={{width:'6rem'}} field="CRDB_AMT" headerClassName='t-header' header="Amt" ></AFColumn>
                </AFDataTable>
            </div>

            </Dialog>

        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0419_ENDDING_MATL_AMT_DOMESTIC, comparisonFn);

