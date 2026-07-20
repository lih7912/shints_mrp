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

import { ServiceLib } from '../service/service_lib/ServiceLib';
import { ServiceS0440_FREIGHT_REGIST } from '../service/service_biz/ServiceS0440_FREIGHT_REGIST';
import { ServiceS030505_PO_RECORD_MATL_ADD } from '../service/service_biz/ServiceS030505_PO_RECORD_MATL_ADD';

import './page_common.scss';

const S0440_FREIGHT_REGIST = () => {

        let emptyKCD_CODE = {
            id: 0,
            CD_GROUP: '',
            CD_CODE: '',
            CD_NAME: '',
            CD_FLAG: '',
        };

        const serviceLib = new ServiceLib();
        serviceLib.loginConfirm();
        const serviceS0440_FREIGHT_REGIST = new ServiceS0440_FREIGHT_REGIST();
        const serviceS030505_PO_RECORD_MATL_ADD = new ServiceS030505_PO_RECORD_MATL_ADD();

        const toast = useRef(null);

        /* splitter 관련 */
        const [styleVal, setStyleVal] = useState({
            width: '65vw'
        });
        const onCall = (e) => {
            const rVal = {};
            rVal.width = e.sizes[0] + 'vw';
            setStyleVal(rVal);
            console.log(e);
        }

        // dialog
        const [urlIframe, setUrlIframe] = useState('');
        const [createDialog, setCreateDialog] = useState(false);
        const hideDialog = () => {
            setCreateDialog(false);
        }

        const [createDialogMatl, setCreateDialogMatl] = useState(false);
        const hideDialogMatl = () => {
            setCreateDialogMatl(false);
            setDatasTBL_KSV_PO_MRP4([]);
            setSelectedTBL_KSV_PO_MRP4([]);
        }

        const process_APPLY_MATL_ADD = () => {
            setCreateDialogMatl(false);
            setSelectedTBL_KSV_PO_MRP4([]);
        }

        const popup_MATL_ADD = () => {
            
            setCreateDialogMatl(true);
        }

        // Search

        // Search KSV_STOCK_MEM

        const search_LIST_1 = (argData) => {

            var tObj = {};

            if (argData && argData.S_READY_DATE) tObj = {
                ...argData
            };
            else tObj = {
                ...dataQRY_KSV_PO_MRP
            };

            setDatasTBL_KSV_PO_MRP([]);
            setSelectedTBL_KSV_PO_MRP([]);

            setLoadingTBL_KSV_PO_MRP(true);

            // 2_1
            serviceS0440_FREIGHT_REGIST.mgrQuery_LIST_1(tObj).then(data => {
                setLoadingTBL_KSV_PO_MRP(false);
                if (typeof data.graphQLErrors === 'undefined') {
                    const filtered = data.filter(row => !String(row.SHIPMENT_CD ?? row.shipment_cd ?? "").trim());
                    var tArray = filtered.map((col, i) => {
                        var tObj = {
                            ...col
                        };
                        tObj.id = i + 1;
                        return (tObj);
                    });
                    setDatasTBL_KSV_PO_MRP(tArray);
                } else {
                    console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                     
                }
            });

        }

        const search_LIST_2 = () => {

            var tObj = {};
            tObj.BUYER_CD = '';

            setLoadingTBL_KSV_PO_MRP2(true);

            // 3_1
            serviceS0440_FREIGHT_REGIST.mgrQuery_LIST_2(tObj).then(data => {
                setLoadingTBL_KSV_PO_MRP2(false);
                if (typeof data.graphQLErrors === 'undefined') {
                    var tArray = data.map((col, i) => {
                        var tObj = {
                            ...col
                        };
                        tObj.id = i + 1;
                        return (tObj);
                    });
                    setDatasTBL_KSV_PO_MRP2(tArray);
                } else {
                    console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                     
                }
            });
        }

        const process_RESET = () => {
            resetEDT_KSV_PO_MRP();
            setDatasTBL_KSV_PO_MRP4([]);
            setSelectedTBL_KSV_PO_MRP4([]);
        }

        const process_ADD_SHIP = () => {
            if (selectedTBL_KSV_PO_MRP.length <= 0 || selectedTBL_KSV_PO_MRP2.length <= 0) {
                return;
            }

            var _tObj0 = {
                ...selectedTBL_KSV_PO_MRP2[0]
            };

            var tInput = {
                ...dataEDT_KSV_PO_MRP
            };
            tInput.COST = parseFloat(tInput.COST);
            tInput.SHIPMENT_CD = _tObj0.SHIPMENT_CD;
            tInput.REG_USER = serviceLib.getUserInfo().USER_ID;

            var tObjs = selectedTBL_KSV_PO_MRP.map((col, i) => {
                var tObj = {
                    ...col
                };
                if (typeof tObj.__typename !== 'undefined') delete tObj.__typename;
                if (typeof tObj.id !== 'undefined') delete tObj.id;
                return (tObj);
            });

            serviceS0440_FREIGHT_REGIST.mgrInsert_ADD_SHIP(tInput, tObjs).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {
                    console.log("mgrInsert_STOCK_IN call => " + data[0].CODE);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success:Stock_in',
                        detail: data[0].CODE,
                        life: 3000
                    });
                    resetEDT_KSV_PO_MRP();
                    if (data[0].CODE.includes('SUCC')) {
                        search_LIST_1();
                        search_LIST_2();
                    }
                } else {
                    // console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                    toast.current.show({
                        severity: 'success',
                        summary: 'Fail:Stock_in',
                        detail: '',
                        life: 3000
                    });
                     
                }
            });
        }

        const process_ALL_SELECT = () => {
            if (selectedTBL_KSV_PO_MRP2.length === datasTBL_KSV_PO_MRP2.length) {
                setSelectedTBL_KSV_PO_MRP2([]);
            } else {
                setSelectedTBL_KSV_PO_MRP2(datasTBL_KSV_PO_MRP2);
            }
        }

        function isBlank(v) {
            if (!v) return true;

            console.log(v);
            if (v === null || v === undefined) return true;
            if (typeof v === 'string') return v.trim() === '';
            if (Array.isArray(v)) return v.length === 0;
            return false; // 숫자 0 등은 유효값으로 봄
        }

        function alertMissing(label) {
            alert(`${label} is required.`);
        }

        const process_INSERT_SHIPMENT = () => {
            var tInput = {
                ...dataEDT_KSV_PO_MRP
            };
            tInput.STSOUT_CD = '';

            console.log(tInput);

            if (isBlank(tInput.SHIP_MODE)) {
                alertMissing('Ship Mode');
                return;
            }

            if (isBlank(tInput.SHIP_DATE)) {
                alertMissing('Ready Date');
                return;
            }

            if (isBlank(tInput.PAYMENT)) {
                alertMissing('Payment');
                return;
            }

            if (isBlank(tInput.ORIGIN_PORT)) {
                alertMissing('Origin');
                return;
            }

            if (isBlank(tInput.DESTINATION)) {
                alertMissing('Destination');
                return;
            }

            if (isBlank(tInput.DESC)) {
                alertMissing('Description');
                return;
            }

            if (isBlank(tInput.CT_NO)) {
                alertMissing('C/T#');
                return;
            }

            if (isBlank(tInput.WEIGHT)) {
                alertMissing('Weight');
                return;
            }

            if (isBlank(tInput.SENDER)) {
                alertMissing('Sender');
                return;
            }

            // DESTINATION이 3RD가 아닐 때 RECEIVER 필수
            if (tInput.DESTINATION !== '3RD' && isBlank(tInput.RECEIVER)) {
                alertMissing('Receiver');
                return;
            }

            // DESTINATION이 3RD일 때 ETC_DESTINATION 필수
            if (tInput.DESTINATION === '3RD' && isBlank(tInput.ETC_DESTINATION)) {
                alertMissing('Receiver');
                return;
            }

            if (isBlank(tInput.BUYER_CD)) {
                alertMissing('Buyer');
                return;
            }

            if (isBlank(tInput.TARGET_ETA)) {
                alertMissing('Target ETA');
                return;
            }

            if (tInput.SHIP_MODE === '4' || tInput.SHIP_MODE === '5') {
                if (!tInput.REMARK) {
                   alert (`You must input REMARK when selecting DHL, FEDEX`);
                   return;
                }
            } 

            var tMatls = [];
            datasTBL_KSV_PO_MRP4.forEach((col, i) => {
                var tObj = {};
                tObj.MATL_CD = col.MATL_CD;
                tObj.PO_QTY = col.PO_QTY;
                if (parseFloat(tObj.PO_QTY) > 0) tMatls.push(tObj);
                else {
                    alert(`PO_QTY must be greater than 0.`);
                    return;
                }
            });

            serviceS0440_FREIGHT_REGIST.mgrInsert_SHIPMENT(tInput, tMatls).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data[0].CODE.includes('SUCC')) {
                        search_LIST_1();
                        // resetEDT_KSV_PO_MRP();
                        ;
                    }
                } else {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Fail:Stock_in',
                        detail: '',
                        life: 3000
                    });
                }
            });
        }

        const process_UPDATE_SHIPMENT = () => {
            var tInput = {
                ...dataEDT_KSV_PO_MRP
            };

            switch (true) {
                case isBlank(tInput.SHIP_MODE):
                    alertMissing('Ship Mode');
                    return;

                case isBlank(tInput.SHIP_DATE):
                    alertMissing('Ready Date');
                    return;

                case isBlank(tInput.PAYMENT):
                    alertMissing('Payment');
                    return;

                case isBlank(tInput.ORIGIN_PORT):
                    alertMissing('Origin');
                    return;

                case isBlank(tInput.DESTINATION):
                    alertMissing('Destination');
                    return;

                case isBlank(tInput.DESC):
                    alertMissing('Description');
                    return;

                case isBlank(tInput.CT_NO):
                    alertMissing('C/T#');
                    return;

                case isBlank(tInput.WEIGHT):
                    alertMissing('Weight');
                    return;

                case isBlank(tInput.SENDER):
                    alertMissing('Sender');
                    return;

                case isBlank(tInput.RECEIVER):
                    if (tInput.DESTINATION !== '3RD') {
                        alertMissing(`Receiver(${tInput.DESTINATION})`);
                        return;
                    }
                    // alertMissing('Receiver');
                    // return;

                case isBlank(tInput.BUYER_CD):
                    alertMissing(`Buyer(${tInput.BUYER_CD})`);
                    return;

                case isBlank(tInput.TARGET_ETA):
                    alertMissing('Target ETA');
                    return;

                default:
                    break;
            }

            var tMatls = [];
            datasTBL_KSV_PO_MRP4.forEach((col, i) => {
                var tObj = {};
                tObj.MATL_CD = col.MATL_CD;
                tObj.PO_QTY = col.PO_QTY;
                if (parseFloat(tObj.PO_QTY) > 0) tMatls.push(tObj);
                else {
                    alert(`PO_QTY must be greater than 0.`);
                    return;
                }
            });

            serviceS0440_FREIGHT_REGIST.mgrUpdate_SHIPMENT(tInput, tMatls).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data[0].CODE.includes('SUCC')) {
                        search_LIST_1();
                        // resetEDT_KSV_PO_MRP();
                        ;
                    }
                } else {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Fail:Stock_in',
                        detail: '',
                        life: 3000
                    });
                }
            });
        }

        const process_DELETE_SHIPMENT = () => {

            if (selectedTBL_KSV_PO_MRP.length <= 0) {
                alert('작업할 데이타를 선택하세요<br><br>Choose the data you want to work with');
                return;
            }

            var tArray = [];
            selectedTBL_KSV_PO_MRP.forEach((col, i) => {
                var tObj = {};
                tObj.STSOUT_CD = col.STSOUT_CD;
                tArray.push(tObj);
            });

            serviceS0440_FREIGHT_REGIST.mgrDelete_SHIPMENT(tArray).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {
                    if (data.length > 0) alert(data[0].CODE);
                    if (data[0].CODE.includes('SUCC')) {
                        search_LIST_1();
                        // resetEDT_KSV_PO_MRP();
                        ;
                    }
                } else {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Fail:Stock_in',
                        detail: '',
                        life: 3000
                    });
                }
            });
        }

        /* QRY KSV_PO_MRP*/

        /* QRY KSV_PO_MRP*/
        let emptyQRY_KSV_PO_MRP = {
            S_READY_DATE: '',
            E_READY_DATE: '',
            ORIGIN_PORT: '',
        };

        const [dataQRY_KSV_PO_MRP, setDataQRY_KSV_PO_MRP] = useState(emptyQRY_KSV_PO_MRP);

        const onCalChangeQRY_KSV_PO_MRP_S_READY_DATE = (e, name) => {
            let val1 = e.value || '';
            let val = '';
            if (val1 === '') {
                val = '';
            } else {
                val = getDateVal(val1);
            }

            let _dataQRY_KSV_PO_MRP = {
                ...dataQRY_KSV_PO_MRP
            };
            _dataQRY_KSV_PO_MRP[`${name}`] = val;
            setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        }

        const onCalChangeQRY_KSV_PO_MRP_E_READY_DATE = (e, name) => {
            let val1 = e.value || '';
            let val = '';
            if (val1 === '') {
                val = '';
            } else {
                val = getDateVal(val1);
            }

            let _dataQRY_KSV_PO_MRP = {
                ...dataQRY_KSV_PO_MRP
            };
            _dataQRY_KSV_PO_MRP[`${name}`] = val;
            setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);

        }

        const [datasQRY_KSV_PO_MRP_ORIGIN_PORT, setDatasQRY_KSV_PO_MRP_ORIGIN_PORT] = useState([]);
        const [dataQRY_KSV_PO_MRP_ORIGIN_PORT, setDataQRY_KSV_PO_MRP_ORIGIN_PORT] = useState({});

        const editQRY_KSV_PO_MRP_ORIGIN_PORT = (argValue) => {
            let _dataQRY_KSV_PO_MRP_ORIGIN_PORT = datasQRY_KSV_PO_MRP_ORIGIN_PORT.filter(val => val.CD_CODE === argValue);
            setDataQRY_KSV_PO_MRP_ORIGIN_PORT(_dataQRY_KSV_PO_MRP_ORIGIN_PORT[0]);
        }

        const onDropdownChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataQRY_KSV_PO_MRP = {
                ...dataQRY_KSV_PO_MRP
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
            setDataQRY_KSV_PO_MRP_ORIGIN_PORT(e.value);
        }

        const onInputChangeQRY_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP = {
                ...dataQRY_KSV_PO_MRP
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP(_dataQRY_KSV_PO_MRP);
        }

        /* QRY KSV_PO_MRP*/
        let emptyQRY_KSV_PO_MRP2 = {
            IN_QTY: '',
        };
        const [dataQRY_KSV_PO_MRP2, setDataQRY_KSV_PO_MRP2] = useState(emptyQRY_KSV_PO_MRP2);

        const onInputChangeQRY_KSV_PO_MRP2_IN_QTY = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP2 = {
                ...dataQRY_KSV_PO_MRP2
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP2[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP2[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP2[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP2(_dataQRY_KSV_PO_MRP2);
        }

        /* QRY KSV_PO_MRP*/
        let emptyQRY_KSV_PO_MRP1 = {
            BUYER_CD: '',
            PO_CD: '',
            VENDOR_CD: '',
            MRP_DATE: '',
        };

        const [dataQRY_KSV_PO_MRP1, setDataQRY_KSV_PO_MRP1] = useState(emptyQRY_KSV_PO_MRP1);

        const [datasQRY_KSV_PO_MRP1_BUYER_CD, setDatasQRY_KSV_PO_MRP1_BUYER_CD] = useState([]);
        const [dataQRY_KSV_PO_MRP1_BUYER_CD, setDataQRY_KSV_PO_MRP1_BUYER_CD] = useState({});

        const editQRY_KSV_PO_MRP1_BUYER_CD = (argValue) => {
            let _dataQRY_KSV_PO_MRP1_BUYER_CD = datasQRY_KSV_PO_MRP1_BUYER_CD.filter(val => val.BUYER_CD === argValue);
            setDataQRY_KSV_PO_MRP1_BUYER_CD(_dataQRY_KSV_PO_MRP1_BUYER_CD[0]);
        }

        const onDropdownChangeQRY_KSV_PO_MRP1_BUYER_CD = (e, name) => {
            let val = (e.value && e.value.BUYER_CD) || '';

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
            }

            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
            setDataQRY_KSV_PO_MRP1_BUYER_CD(e.value);
        }

        const onInputChangeQRY_KSV_PO_MRP1_USER_ID = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        }

        const onInputChangeQRY_KSV_PO_MRP1_PO_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        }

        const onInputChangeQRY_KSV_PO_MRP1_VENDOR_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP1[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
        }

        const onCalChangeQRY_KSV_PO_MRP1_MRP_DATE = (e, name) => {
            let val1 = e.value || '';
            let val = '';
            if (val1 === '') {
                val = '';
            } else {
                val = getDateVal(val1);
            }

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };
            _dataQRY_KSV_PO_MRP1[`${name}`] = val;
            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);

        }

        const [datasQRY_KSV_PO_MRP1_PO_CD, setDatasQRY_KSV_PO_MRP1_PO_CD] = useState([]);
        const [dataQRY_KSV_PO_MRP1_PO_CD, setDataQRY_KSV_PO_MRP1_PO_CD] = useState({});

        const editQRY_KSV_PO_MRP1_PO_CD = (argValue) => {
            let _dataQRY_KSV_PO_MRP1_PO_CD = datasQRY_KSV_PO_MRP1_PO_CD.filter(val => val.PO_CD === argValue);
            setDataQRY_KSV_PO_MRP1_PO_CD(_dataQRY_KSV_PO_MRP1_PO_CD[0]);
        }

        const onDropdownChangeQRY_KSV_PO_MRP1_PO_CD = (e, name) => {
            let val = (e.value && e.value.PO_CD) || '';

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
            }

            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
            setDataQRY_KSV_PO_MRP1_PO_CD(e.value);
        }

        const [datasQRY_KSV_PO_MRP1_PU_STATUS, setDatasQRY_KSV_PO_MRP1_PU_STATUS] = useState([]);
        const [dataQRY_KSV_PO_MRP1_PU_STATUS, setDataQRY_KSV_PO_MRP1_PU_STATUS] = useState({});

        const editQRY_KSV_PO_MRP1_PU_STATUS = (argValue) => {
            let _dataQRY_KSV_PO_MRP1_PU_STATUS = datasQRY_KSV_PO_MRP1_PU_STATUS.filter(val => val.PU_STATUS === argValue);
            setDataQRY_KSV_PO_MRP1_PU_STATUS(_dataQRY_KSV_PO_MRP1_PU_STATUS[0]);
        }

        const onDropdownChangeQRY_KSV_PO_MRP1_PU_STATUS = (e, name) => {
            let val = (e.value && e.value.PU_STATUS) || '';

            let _dataQRY_KSV_PO_MRP1 = {
                ...dataQRY_KSV_PO_MRP1
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP1[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP1[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP1[`${name}`] = parseInt(val);
            }

            setDataQRY_KSV_PO_MRP1(_dataQRY_KSV_PO_MRP1);
            setDataQRY_KSV_PO_MRP1_PU_STATUS(e.value);
        }

        /* TABLE KSV_PO_MRP*/
        // DEFINE DATAGRID : TBL_KSV_PO_MRP
        let emptyTBL_KSV_PO_MRP = {
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

        const [loadingTBL_KSV_PO_MRP, setLoadingTBL_KSV_PO_MRP] = useState(false);

        const [datasTBL_KSV_PO_MRP, setDatasTBL_KSV_PO_MRP] = useState([]);
        const dt_TBL_KSV_PO_MRP = useRef(null);
        const [dataTBL_KSV_PO_MRP, setDataTBL_KSV_PO_MRP] = useState(emptyTBL_KSV_PO_MRP);
        const [selectedTBL_KSV_PO_MRP, setSelectedTBL_KSV_PO_MRP] = useState([]);
        const [flagSelectModeTBL_KSV_PO_MRP, setFlagSelectModeTBL_KSV_PO_MRP] = useState(false);

        // DATAGRID CODE : TBL_KSV_PO_MRP
        const searchRefreshTBL_KSV_PO_MRP = () => {
            clearSelectedTBL_KSV_PO_MRP();
            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
        }

        const editTBL_KSV_PO_MRP = (argData) => {}

        const onRowSelect_TBL_KSV_PO_MRP = (argData0) => {
            var argData = {
                ...argData0.data
            };
        }

        const onRowClickTBL_KSV_PO_MRP = (event) => {
            var argData = {
                ...event.data
            };

            var tObj = {
                ...dataEDT_KSV_PO_MRP
            };

            console.log(argData);

            tObj.SHIP_MODE = argData.SHIP_MODE;
            tObj.CT_NO = argData.CT_QTY;

            tObj.SENDER = argData.SENDER;
            tObj.RECEIVER = argData.RECEIVER;

            let target = argData.SENDER;
            let idx = datasEDT_KSV_PO_MRP_SENDER.findIndex(item => item?.USER_ID === target);
            setDataEDT_KSV_PO_MRP_SENDER(datasEDT_KSV_PO_MRP_SENDER[idx]);

            target = argData.RECEIVER
            idx = datasEDT_KSV_PO_MRP_RECEIVER.findIndex(item => item.USER_ID === target);
            setDataEDT_KSV_PO_MRP_RECEIVER(datasEDT_KSV_PO_MRP_RECEIVER[idx]);
            
            tObj.SHIP_DATE = argData.READY_DATE;
            tObj.WEIGHT = argData.WEIGHT;
            tObj.PAYMENT = argData.PAYMENT;
            tObj.CBM = argData.CBM;
            tObj.BUYER_CD = argData.BUYER_CD;
            tObj.ORIGIN_PORT = argData.ORIGIN_PORT;
            if (argData.ORIGIN_PORT === '3RD') {
                setIsHiddenOrigin(false);
            } else {
                setIsHiddenOrigin(true);
            }
            tObj.ETC_ORIGIN = argData.ORG_ORIGIN_PORT;
            tObj.DESTINATION = argData.DESTINATION;
            if (argData.DESTINATION === '3RD') {
                setIsHiddenDest(false);
            } else {
                setIsHiddenDest(true);
            }
            tObj.ETC_DESTINATION = argData.ORG_DESTINATION;
            tObj.AMOUNT = argData.AMOUNT;
            tObj.SHIP_LINE = '';
            tObj.DESC = argData.DESCRIPTION;
            tObj.BL_NO = argData.BL_NO;
            tObj.REMARK = argData.REMARK;
            tObj.TARGET_ETA = argData.TARGET_ETA;
            tObj.STSOUT_CD = argData.STSOUT_CD;

            console.log(tObj);
            setDataEDT_KSV_PO_MRP(tObj);

            editEDT_KSV_PO_MRP_SHIP_MODE(tObj.SHIP_MODE);
            editEDT_KSV_PO_MRP_DESTINATION(tObj.DESTINATION);
            editEDT_KSV_PO_MRP_ORIGIN_PORT(tObj.ORIGIN_PORT);
            editEDT_KSV_PO_MRP_PAYMENT(tObj.PAYMENT);
            editEDT_KSV_PO_MRP_BUYER_CD(tObj.BUYER_CD);

            setDatasTBL_KSV_PO_MRP4(argData.MATL_INFO);

        }

        const searchTBL_KSV_PO_MRP = () => {
            clearSelectedTBL_KSV_PO_MRP();

            serviceS0440_FREIGHT_REGIST.mgrQueryTBL_KSV_PO_MRP(dataQRY_KSV_PO_MRP).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {
                    console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP() call => " + data.length);
                    setDatasTBL_KSV_PO_MRP(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP()error => " + JSON.stringify(data.graphQLErrors));
                     
                }
            });

            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP
        }

        const clearSelectedTBL_KSV_PO_MRP = () => {
            setSelectedTBL_KSV_PO_MRP([]);
            setFlagSelectModeTBL_KSV_PO_MRP(false);
        }

        const findIndexByIdTBL_KSV_PO_MRP = (id) => {
            let index = -1;
            for (let i = 0; i < datasTBL_KSV_PO_MRP.length; i++) {
                if (datasTBL_KSV_PO_MRP[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        

        

        const exportExcelTBL_KSV_PO_MRP = () => {
            import('xlsx').then(xlsx => {
                const cleanedData = datasTBL_KSV_PO_MRP.map(({
                    __typename,
                    ...rest
                }) => rest);
                const worksheet = xlsx.utils.json_to_sheet(cleanedData);
                const workbook = {
                    Sheets: {
                        'data': worksheet
                    },
                    SheetNames: ['data']
                };
                const excelBuffer = xlsx.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array'
                });
                saveAsExcelFileTBL_KSV_PO_MRP(excelBuffer, 'Freight Reg');
            });

        }

        const saveAsExcelFileTBL_KSV_PO_MRP = (buffer, fileName) => {
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

        /* TABLE KSV_PO_MRP*/
        // DEFINE DATAGRID : TBL_KSV_PO_MRP1
        let emptyTBL_KSV_PO_MRP1 = {
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

        const [loadingTBL_KSV_PO_MRP1, setLoadingTBL_KSV_PO_MRP1] = useState(false);

        const [datasTBL_KSV_PO_MRP1, setDatasTBL_KSV_PO_MRP1] = useState([]);
        const dt_TBL_KSV_PO_MRP1 = useRef(null);
        const [dataTBL_KSV_PO_MRP1, setDataTBL_KSV_PO_MRP1] = useState(emptyTBL_KSV_PO_MRP1);
        const [selectedTBL_KSV_PO_MRP1, setSelectedTBL_KSV_PO_MRP1] = useState([]);
        const [flagSelectModeTBL_KSV_PO_MRP1, setFlagSelectModeTBL_KSV_PO_MRP1] = useState(false);

        // DATAGRID CODE : TBL_KSV_PO_MRP1
        const searchRefreshTBL_KSV_PO_MRP1 = () => {
            clearSelectedTBL_KSV_PO_MRP1();
            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
        }

        const editTBL_KSV_PO_MRP1 = (argData) => {}

        const onRowClick1TBL_KSV_PO_MRP1 = (argData0) => {

            var argData = {};

            if (typeof argData0.length !== 'undefined') {
                argData = argData0[0];
            } else {
                argData = argData0;
            }

            let argTBL_KSV_PO_MRP1 = argData;
            editTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
            setDataTBL_KSV_PO_MRP1(argTBL_KSV_PO_MRP1);
        }

        const onRowClickTBL_KSV_PO_MRP1 = (event) => {

            let argTBL_KSV_PO_MRP1 = event.data;
            if (flagSelectModeTBL_KSV_PO_MRP1) return;

            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
        }

        const searchTBL_KSV_PO_MRP1 = () => {
            clearSelectedTBL_KSV_PO_MRP1();

            serviceS0440_FREIGHT_REGIST.mgrQueryTBL_KSV_PO_MRP1(dataQRY_KSV_PO_MRP).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {
                    console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP1() call => " + data.length);
                    setDatasTBL_KSV_PO_MRP1(data);
                } else {
                    // var tStr = data.graphQLErrors[0].message;
                    console.log("ServiceNawooAll.mgrQueryTBL_KSV_PO_MRP1()error => " + JSON.stringify(data.graphQLErrors));
                     
                }
            });

            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP1
        }

        const clearSelectedTBL_KSV_PO_MRP1 = () => {
            setSelectedTBL_KSV_PO_MRP1([]);
            setFlagSelectModeTBL_KSV_PO_MRP1(false);
        }

        const findIndexByIdTBL_KSV_PO_MRP1 = (id) => {
            let index = -1;
            for (let i = 0; i < datasTBL_KSV_PO_MRP1.length; i++) {
                if (datasTBL_KSV_PO_MRP1[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        

        

        const exportExcelTBL_KSV_PO_MRP1 = () => {

            import('xlsx').then(xlsx => {
                const worksheet = xlsx.utils.json_to_sheet(datasTBL_KSV_PO_MRP1);
                const workbook = {
                    Sheets: {
                        'data': worksheet
                    },
                    SheetNames: ['data']
                };
                const excelBuffer = xlsx.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array'
                });
                saveAsExcelFileTBL_KSV_PO_MRP1(excelBuffer, '스타일목록');
            });

        }

        const saveAsExcelFileTBL_KSV_PO_MRP1 = (buffer, fileName) => {

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

        /* TABLE KSV_PO_MRP*/
        // DEFINE DATAGRID : TBL_KSV_PO_MRP2
        let emptyTBL_KSV_PO_MRP2 = {
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

        const [loadingTBL_KSV_PO_MRP2, setLoadingTBL_KSV_PO_MRP2] = useState(false);

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

        const editTBL_KSV_PO_MRP2 = (argData) => {}

        const onRowClick1TBL_KSV_PO_MRP2 = (argData0) => {

            var argData = {};

            if (typeof argData0.length !== 'undefined') {
                argData = argData0[0];
            } else {
                argData = argData0;
            }

            let argTBL_KSV_PO_MRP2 = argData;
            editTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);
            setDataTBL_KSV_PO_MRP2(argTBL_KSV_PO_MRP2);

            setDataEDT_KSV_PO_MRP((prev) => ({...prev, SHIP_MODE: argData.SHIP_MODE, PLACE_CD: argData.PLACE_CD, BL_FILE: argData.BL_FILE, ORIGIN_PORT: argData.ORIGIN_PORT, SHIP_LINE: argData.SHIP_LINE, BL_NO: argData.BL_NO, CONTAINER_NO: argData.CONTAINER_NO, CI_FILE: argData.CI_FILE, SINGAPORE_COMBINE: argData.IS_SINGAPORE, COST: argData.COST, PL_FILE: argData.PL_FILE, ETD: argData.ETD, DESTINATION: argData.DESTINATION}));

            editEDT_KSV_PO_MRP_SHIP_LINE(argData.SHIP_LINE);
            editEDT_KSV_PO_MRP_SHIP_MODE(argData.SHIP_MODE);
            editEDT_KSV_PO_MRP_PLACE_CD(argData.PLACE_CD);
            editEDT_KSV_PO_MRP_DESTINATION(argData.DESTINATION);

        }

        const onRowClickTBL_KSV_PO_MRP2 = (event) => {

            let argTBL_KSV_PO_MRP2 = event.data;
            if (flagSelectModeTBL_KSV_PO_MRP2) return;

            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP2
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
                const workbook = {
                    Sheets: {
                        'data': worksheet
                    },
                    SheetNames: ['data']
                };
                const excelBuffer = xlsx.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array'
                });
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

        const onCellEditCompleteKSV_PO_MRP2 = (e) => {

            let {
                rowData,
                newValue,
                field,
                originalEvent: event
            } = e;

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
                rowData.MOQ_PRICE = serviceLib.getFloat(parseFloat(rowData.MOQ_AMT / rowData.PO_QTY), 4);
                rowData.PO_PRICE = rowData.MASTER_PRICE + rowData.MOQ_PRICE + rowData.FREIGHT_PRICE + rowData.OTHER_PRICE;
                rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);
            }
            if (field === 'FREIGHT_AMT') {
                rowData.FREIGHT_PRICE = serviceLib.getFloat(parseFloat(rowData.FREIGHT_AMT / rowData.PO_QTY), 4);
                rowData.PO_PRICE = rowData.MASTER_PRICE + rowData.MOQ_PRICE + rowData.FREIGHT_PRICE + rowData.OTHER_PRICE;
                rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);
            }
            if (field === 'OTHER_AMT') {
                rowData.OTHER_PRICE = serviceLib.getFloat(parseFloat(rowData.OTHER_AMT / rowData.PO_QTY), 4);
                rowData.PO_PRICE = rowData.MASTER_PRICE + rowData.MOQ_PRICE + rowData.FREIGHT_PRICE + rowData.OTHER_PRICE;
                rowData.PO_PRICE = serviceLib.getFloat(rowData.PO_PRICE, 4);
            }

            var _dataTBL_KSV_PO_MRP2 = {
                ...dataTBL_KSV_PO_MRP2
            };
            setDataTBL_KSV_PO_MRP2(rowData);
        }

        const cellEditorKSV_PO_MRP2 = (options) => {
            return textEditor(options);
        }

        const textEditor = (options) => {
            return < InputText type = "text"
            value = {
                options.value
            }
            onChange = {
                (e) => options.editorCallback(e.target.value)
            }
            />;
        }

        /* QRY KSV_PO_MRP*/
        let emptyEDT_KSV_PO_MRP = {
            SHIP_MODE: '',
            CT_NO: '1',
            SENDER: '',

            SHIP_DATE: '',
            WEIGHT: '',
            RECEIVER: '',

            PAYMENT: '2',
            CBM: '',
            BUYER_CD: '',

            ORIGIN_PORT: '',
            ETC_ORIGIN: '',
            TARGET_ETA: '',

            DESTINATION: '',
            ETC_DESTINATION: '',
            AMOUNT: '0',

            SHIP_LINE: '',
            DESC: '',

            BL_NO: '',
            REMARK: '',

            PLACE_CD: '',
            STSOUT_CD: '',

            PO_CD: '',
            ORDER_CD: '',
        };

        const [dataEDT_KSV_PO_MRP, setDataEDT_KSV_PO_MRP] = useState(emptyEDT_KSV_PO_MRP);

        const resetEDT_KSV_PO_MRP = (argData) => {
            var tObj = {
                ...emptyEDT_KSV_PO_MRP
            };
            setDataEDT_KSV_PO_MRP(tObj);
            editEDT_KSV_PO_MRP_PAYMENT('');
            editEDT_KSV_PO_MRP_SHIP_LINE('');
            editEDT_KSV_PO_MRP_SHIP_MODE('');
            editEDT_KSV_PO_MRP_PLACE_CD('');
            editEDT_KSV_PO_MRP_DESTINATION('');
            editEDT_KSV_PO_MRP_ORIGIN_PORT('');
            editEDT_KSV_PO_MRP_BUYER_CD('');
        }

        const [datasEDT_KSV_PO_MRP_SHIP_MODE, setDatasEDT_KSV_PO_MRP_SHIP_MODE] = useState([]);
        const [dataEDT_KSV_PO_MRP_SHIP_MODE, setDataEDT_KSV_PO_MRP_SHIP_MODE] = useState({});

        const editEDT_KSV_PO_MRP_SHIP_MODE = (argValue) => {
            let _dataEDT_KSV_PO_MRP_SHIP_MODE = datasEDT_KSV_PO_MRP_SHIP_MODE.filter(val => val.CD_CODE === argValue);
            setDataEDT_KSV_PO_MRP_SHIP_MODE(_dataEDT_KSV_PO_MRP_SHIP_MODE[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_SHIP_MODE(e.value);
        }

        const [datasEDT_KSV_PO_MRP_PAYMENT, setDatasEDT_KSV_PO_MRP_PAYMENT] = useState([]);
        const [dataEDT_KSV_PO_MRP_PAYMENT, setDataEDT_KSV_PO_MRP_PAYMENT] = useState({});

        const editEDT_KSV_PO_MRP_PAYMENT = (argValue) => {
            let _dataEDT_KSV_PO_MRP_PAYMENT = datasEDT_KSV_PO_MRP_PAYMENT.filter(val => val.CD_CODE === argValue);
            setDataEDT_KSV_PO_MRP_PAYMENT(_dataEDT_KSV_PO_MRP_PAYMENT[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_PAYMENT = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_PAYMENT(e.value);
        }

        const onInputChangeEDT_KSV_PO_MRP_AMOUNT = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_ETC_ORIGIN = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

             _dataEDT_KSV_PO_MRP[`${name}`] = val;

            console.log(_dataEDT_KSV_PO_MRP, name, typeof tTypeVal);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_ETC_DESTINATION = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            _dataEDT_KSV_PO_MRP[`${name}`] = val;

            console.log(_dataEDT_KSV_PO_MRP, name);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_CT_NO = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_SENDER = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onCalChangeEDT_KSV_PO_MRP_TARGET_ETA = (e, name) => {
            let val1 = e.value || '';
            let val = '';
            if (val1 === '') {
                val = '';
            } else {
                val = getDateVal(val1);
            }

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };
            _dataEDT_KSV_PO_MRP[`${name}`] = val;
            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onCalChangeEDT_KSV_PO_MRP_SHIP_DATE = (e, name) => {
            let val1 = e.value || '';
            let val = '';
            if (val1 === '') {
                val = '';
            } else {
                val = getDateVal(val1);
            }

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };
            _dataEDT_KSV_PO_MRP[`${name}`] = val;
            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_WEIGHT = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_RECEIVER = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const [datasEDT_KSV_PO_MRP_SHIP_LINE, setDatasEDT_KSV_PO_MRP_SHIP_LINE] = useState([]);
        const [dataEDT_KSV_PO_MRP_SHIP_LINE, setDataEDT_KSV_PO_MRP_SHIP_LINE] = useState({});

        const editEDT_KSV_PO_MRP_SHIP_LINE = (argValue) => {
            let _dataEDT_KSV_PO_MRP_SHIP_LINE = datasEDT_KSV_PO_MRP_SHIP_LINE.filter(val => val.CD_CODE === argValue);
            setDataEDT_KSV_PO_MRP_SHIP_LINE(_dataEDT_KSV_PO_MRP_SHIP_LINE[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_SHIP_LINE = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_SHIP_LINE(e.value);
        }

        const onInputChangeEDT_KSV_PO_MRP_CBM = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_PO_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_ORDER_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const [datasEDT_KSV_PO_MRP_BUYER_CD, setDatasEDT_KSV_PO_MRP_BUYER_CD] = useState([]);
        const [dataEDT_KSV_PO_MRP_BUYER_CD, setDataEDT_KSV_PO_MRP_BUYER_CD] = useState({});

        const editEDT_KSV_PO_MRP_BUYER_CD = (argValue) => {
            let _dataEDT_KSV_PO_MRP_BUYER_CD = datasEDT_KSV_PO_MRP_BUYER_CD.filter(val => val.BUYER_CD === argValue);
            setDataEDT_KSV_PO_MRP_BUYER_CD(_dataEDT_KSV_PO_MRP_BUYER_CD[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_BUYER_CD = (e, name) => {
            let val = (e.value && e.value.BUYER_CD) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_BUYER_CD(e.value);
        }

        const [datasEDT_KSV_PO_MRP_ORIGIN_PORT, setDatasEDT_KSV_PO_MRP_ORIGIN_PORT] = useState([]);
        const [dataEDT_KSV_PO_MRP_ORIGIN_PORT, setDataEDT_KSV_PO_MRP_ORIGIN_PORT] = useState({});

        const editEDT_KSV_PO_MRP_ORIGIN_PORT = (argValue) => {
            let _dataEDT_KSV_PO_MRP_ORIGIN_PORT = datasEDT_KSV_PO_MRP_ORIGIN_PORT.filter(val => val.CD_CODE === argValue);
            setDataEDT_KSV_PO_MRP_ORIGIN_PORT(_dataEDT_KSV_PO_MRP_ORIGIN_PORT[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            if (e.value.CD_NAME === '3RD') {
                setIsHiddenOrigin(false);
            } else {
                setIsHiddenOrigin(true);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_ORIGIN_PORT(e.value);
        }

        const [dataEDT_KSV_PO_MRP_SENDER, setDataEDT_KSV_PO_MRP_SENDER] = useState({});
        const [datasEDT_KSV_PO_MRP_SENDER, setDatasEDT_KSV_PO_MRP_SENDER] = useState([]);

        const onDropdownChangeEDT_KSV_PO_MRP_SENDER = (e, name) => {
            let val = e.value.USER_ID;
            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_SENDER(e.value);
        }

        const [dataEDT_KSV_PO_MRP_RECEIVER, setDataEDT_KSV_PO_MRP_RECEIVER] = useState({});
        const [datasEDT_KSV_PO_MRP_RECEIVER, setDatasEDT_KSV_PO_MRP_RECEIVER] = useState([]);

        const onDropdownChangeEDT_KSV_PO_MRP_RECEIVER = (e, name) => {
            let val = e.value.USER_ID;

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_RECEIVER(e.value);
        }

        const [datasEDT_KSV_PO_MRP_DESTINATION, setDatasEDT_KSV_PO_MRP_DESTINATION] = useState([]);
        const [dataEDT_KSV_PO_MRP_DESTINATION, setDataEDT_KSV_PO_MRP_DESTINATION] = useState({});

        const editEDT_KSV_PO_MRP_DESTINATION = (argValue) => {
            let _dataEDT_KSV_PO_MRP_DESTINATION = datasEDT_KSV_PO_MRP_DESTINATION.filter(val => val.CD_CODE === argValue);
            setDataEDT_KSV_PO_MRP_DESTINATION(_dataEDT_KSV_PO_MRP_DESTINATION[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_DESTINATION = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            if (e.value.CD_NAME === '3RD') {
                setIsHiddenDest(false);
                _dataEDT_KSV_PO_MRP.RECEIVER = '';
                setDataEDT_KSV_PO_MRP_RECEIVER('');
            } else {
                setIsHiddenDest(true);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_DESTINATION(e.value);
        }

        const onInputChangeEDT_KSV_PO_MRP_BL_NO = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_DESC = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const onInputChangeEDT_KSV_PO_MRP_REMARK = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string") _dataEDT_KSV_PO_MRP[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
        }

        const [datasEDT_KSV_PO_MRP_PLACE_CD, setDatasEDT_KSV_PO_MRP_PLACE_CD] = useState([]);
        const [dataEDT_KSV_PO_MRP_PLACE_CD, setDataEDT_KSV_PO_MRP_PLACE_CD] = useState({});

        const editEDT_KSV_PO_MRP_PLACE_CD = (argValue) => {
            let _dataEDT_KSV_PO_MRP_PLACE_CD = datasEDT_KSV_PO_MRP_PLACE_CD.filter(val => val.PLACE_CD === argValue);
            setDataEDT_KSV_PO_MRP_PLACE_CD(_dataEDT_KSV_PO_MRP_PLACE_CD[0]);
        }

        const onDropdownChangeEDT_KSV_PO_MRP_PLACE_CD = (e, name) => {
            let val = (e.value && e.value.PLACE_CD) || '';

            let _dataEDT_KSV_PO_MRP = {
                ...dataEDT_KSV_PO_MRP
            };

            let tTypeVal = _dataEDT_KSV_PO_MRP[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataEDT_KSV_PO_MRP[`${name}`] = parseInt(val);
            }

            setDataEDT_KSV_PO_MRP(_dataEDT_KSV_PO_MRP);
            setDataEDT_KSV_PO_MRP_PLACE_CD(e.value);
        }

        ///
        /**TABLE KSV_ORDER_MST1 */
        // DEFINE DATAGRID : TBL_KSV_PO_MRP4
        let emptyTBL_KSV_PO_MRP4 = {
            MATL_CD: '',
            MATL_NAME: '',
            COLOR: '',
            SPEC: '',
            MATL_PRICE: '0',
            CURR_CD: '',
            UNIT: '',
            COL1: '0',
            PO_QTY: '0',
            CD_NAME: '',
            REASON_TYPE: '',
            FARE_TYPE: '',
            REMARK: '',
            VENDOR_NAME: '',
            COL2: '',
            USE_PO_TYPE: '',
            PO_CD: '',
            PO_SEQ: '0',
            ORDER_CD: '',
            MRP_SEQ: '0',
            MATL_SEQ: '0',
            COL3: '',
            STOCK_IDX: '',
            VENDOR_CD: ''
        };

        const [datasTBL_KSV_PO_MRP4, setDatasTBL_KSV_PO_MRP4] = useState([]);
        const dt_TBL_KSV_PO_MRP4 = useRef(null);
        const [dataTBL_KSV_PO_MRP4, setDataTBL_KSV_PO_MRP4] = useState(emptyTBL_KSV_PO_MRP4);
        const [selectedTBL_KSV_PO_MRP4, setSelectedTBL_KSV_PO_MRP4] = useState([]);
        const [flagSelectModeTBL_KSV_PO_MRP4, setFlagSelectModeTBL_KSV_PO_MRP4] = useState(false);
        const [loadingTBL_KSV_PO_MRP4, setLoadingTBL_KSV_PO_MRP4] = useState(false);

        // DATAGRID CODE : TBL_KSV_PO_MRP4
        const searchRefreshTBL_KSV_PO_MRP4 = () => {
            clearSelectedTBL_KSV_PO_MRP4();
        }
        const editTBL_KSV_PO_MRP4 = (argData) => {}
        const onRowClick1TBL_KSV_PO_MRP4 = (argData0) => {
            var argData = {};
            if (typeof argData0.length !== 'undefined') {
                argData = argData0[0];
            } else {
                argData = argData0;
            }
            let argTBL_KSV_PO_MRP4 = argData;
            editTBL_KSV_PO_MRP4(argTBL_KSV_PO_MRP4);
            setDataTBL_KSV_PO_MRP4(argTBL_KSV_PO_MRP4);
        }
        const onRowClickTBL_KSV_PO_MRP4 = (event) => {
            let argTBL_KSV_PO_MRP4 = event.data;
            if (flagSelectModeTBL_KSV_PO_MRP4) return;
            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP4
        }
        const searchTBL_KSV_PO_MRP4 = () => {
            //
        }
        const clearSelectedTBL_KSV_PO_MRP4 = () => {
            setSelectedTBL_KSV_PO_MRP4([]);
            setFlagSelectModeTBL_KSV_PO_MRP4(false);
        }
        const findIndexByIdTBL_KSV_PO_MRP4 = (id) => {
            let index = -1;
            for (let i = 0; i < datasTBL_KSV_PO_MRP4.length; i++) {
                if (datasTBL_KSV_PO_MRP4[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        }
        const exportExcelTBL_KSV_PO_MRP4 = () => {
            
        }
        const saveAsExcelFileTBL_KSV_PO_MRP4 = (buffer, fileName) => {
            
        }
        //

        /**TABLE KSV_R_MST */
        // DEFINE DATAGRID : TBL_KSV_PO_MRP41
        let emptyTBL_KSV_PO_MRP41 = {
            id: 0,
            MATL_CD: '',
            MATL_NAME: '',
            COLOR: '',
            SPEC: '',
            MATL_PRICE: '',
            CURR_CD: '',
            UNIT: '',
            PO_QTY: '',
            USE_PO_TYPE_NAME: '',
            USE_PO_TYPE: '',
            REASON_TYPE: '',
            FARE_TYPE: '',
            REMARK: '',
            VENDOR_NAME: '',
            PO_SEQ: '',
            ORDER_CD: '',
            STOCK_IDX: '',

        };

        const [datasTBL_KSV_PO_MRP41, setDatasTBL_KSV_PO_MRP41] = useState([]);
        const dt_TBL_KSV_PO_MRP41 = useRef(null);
        const [dataTBL_KSV_PO_MRP41, setDataTBL_KSV_PO_MRP41] = useState(emptyTBL_KSV_PO_MRP41);
        const [selectedTBL_KSV_PO_MRP41, setSelectedTBL_KSV_PO_MRP41] = useState([]);
        const [flagSelectModeTBL_KSV_PO_MRP41, setFlagSelectModeTBL_KSV_PO_MRP41] = useState(false);
        const [loadingTBL_KSV_PO_MRP41, setLoadingTBL_KSV_PO_MRP41] = useState(false);

        // DATAGRID CODE : TBL_KSV_PO_MRP41
        const searchMATL_MST = () => {
            var tObj = {
                ...dataQRY_KSV_PO_MRP4
            };

            if (tObj.MATL_CD === '' && tObj.MATL_NAME === '' && tObj.COLOR === '' &&
                tObj.SPEC === '') {
                alert('Matl Cd, Matl Name, Color, Spec중 하나는 필수입력값 입니다.<br><br>One of Matl Cd, Matl Name, Color, and Spec is a required input value.');
                return;
            }

            clearSelectedTBL_KSV_PO_MRP41();
            setDatasTBL_KSV_PO_MRP41([]);
            setLoadingTBL_KSV_PO_MRP41(true);

            serviceS030505_PO_RECORD_MATL_ADD.mgrQueryTBL_KCD_MATL_MST(dataQRY_KSV_PO_MRP4).then(data => {
                setLoadingTBL_KSV_PO_MRP41(false);
                if (typeof data.graphQLErrors === 'undefined') {
                    if (data.length > 0) {
                        setDatasTBL_KSV_PO_MRP41(
                            data.map((col, i) => ({
                                ...col,
                                id: i + 1,
                            }))
                        );
                    }
                } else {
                    console.log("ServiceMgrKCD_VENDOR.mgr1KcdBuyer error => " + JSON.stringify(data.graphQLErrors));
                     
                }
            });
        }

        const matlRemove = () => {
            if (datasTBL_KSV_PO_MRP4.length === selectedTBL_KSV_PO_MRP4.length) {
                alert('모든 자재를 삭제할 수는 없습니다<br><br>Not all materials can be deleted');
                return;
            }
            let updatedData = datasTBL_KSV_PO_MRP4
                .filter(item => !selectedTBL_KSV_PO_MRP4.some(selected => selected.id === item.id))
                .map((item, index) => ({
                    ...item,
                    id: index + 1
                }));
            setDatasTBL_KSV_PO_MRP4(updatedData);
        }

        const addMaterial = () => {
            if (selectedTBL_KSV_PO_MRP41.length <= 0) {
                alert('추가할 자재를 선택하십시요<br><br>Select the material you want to add');
                return;
            }
            let _tArray = [...datasTBL_KSV_PO_MRP4]; // 기존 데이터 복사
            selectedTBL_KSV_PO_MRP41.forEach((srcRow) => {
                var tCheck = 0;
                _tArray.forEach((col1, i1) => {
                    if (col1.MATL_CD === srcRow.MATL_CD) tCheck = 1;
                });
                if (tCheck === 0) _tArray.push(srcRow);
            });
            const tArray = _tArray.map((col, i) => ({
                ...col,
                id: i + 1
            }));
            setDatasTBL_KSV_PO_MRP4(tArray);
        }
        const searchRefreshTBL_KSV_PO_MRP41 = () => {
            clearSelectedTBL_KSV_PO_MRP41();
        }
        const editTBL_KSV_PO_MRP41 = (argData) => {}
        const onRowClick1TBL_KSV_PO_MRP41 = (argData0) => {
            var argData = {};
            if (typeof argData0?.length !== 'undefined') {
                argData = argData0[0];
            } else {
                argData = argData0;
            }
            let argTBL_KSV_PO_MRP41 = argData;
            editTBL_KSV_PO_MRP41(argTBL_KSV_PO_MRP41);
            setDataTBL_KSV_PO_MRP41(argTBL_KSV_PO_MRP41);
        }
        const onRowClickTBL_KSV_PO_MRP41 = (event) => {
            let argTBL_KSV_PO_MRP41 = event.data;
            if (flagSelectModeTBL_KSV_PO_MRP41) return;
            // Service : NawooAll:mgrQueryTBL_KSV_PO_MRP41
        }
        const searchTBL_KSV_PO_MRP41 = () => {
            clearSelectedTBL_KSV_PO_MRP41();
        }
        const clearSelectedTBL_KSV_PO_MRP41 = () => {
            setSelectedTBL_KSV_PO_MRP41([]);
            setFlagSelectModeTBL_KSV_PO_MRP41(false);
        }
        const findIndexByIdTBL_KSV_PO_MRP41 = (id) => {
            let index = -1;
            for (let i = 0; i < datasTBL_KSV_PO_MRP41.length; i++) {
                if (datasTBL_KSV_PO_MRP41[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        }
        const exportExcelTBL_KSV_PO_MRP41 = () => {}
        const saveAsExcelFileTBL_KSV_PO_MRP41 = (buffer, fileName) => {}
        const onChangeTextEdit = (e, options) => {
            options.editorCallback(e.target.value);
        }
        const handleFocus = (event) => event.target.select();
        const cellEditorTBL_KSV_PO_MRP4 = (options) => {
            return < InputText type = "text"
            value = {
                options.value
            }
            onChange = {
                (e) => onChangeTextEdit(e, options)
            }
            onFocus = {
                handleFocus
            }
            />;
        };
        const cellEditorTBL_KSV_PO_MRP41 = (options) => {
            return < InputText type = "text"
            value = {
                options.value
            }
            onChange = {
                (e) => onChangeTextEdit(e, options)
            }
            onFocus = {
                handleFocus
            }
            />;
        };
        const onCellEditCompleteTBL_KSV_PO_MRP4 = (e) => {
            const { rowData, newValue, field, originalEvent } = e;

            setDatasTBL_KSV_PO_MRP4((prev) => {
                let idx = prev.findIndex((r) => r === rowData);
                if (idx === -1) {
                const keyName = 'id' in rowData ? 'id' : ('SEQ' in rowData ? 'SEQ' : null);
                if (keyName) idx = prev.findIndex((r) => r[keyName] === rowData[keyName]);
                }
                if (idx === -1) return prev;

                const next = [...prev];
                next[idx] = { ...next[idx], [field]: newValue };
                return next;
            });
        };
        const onCellEditCompleteTBL_KSV_PO_MRP41 = (e) => {
            const { rowData, newValue, field, originalEvent } = e;

            setDatasTBL_KSV_PO_MRP41((prev) => {
                let idx = prev.findIndex((r) => r === rowData);
                if (idx === -1) {
                const keyName = 'id' in rowData ? 'id' : ('SEQ' in rowData ? 'SEQ' : null);
                if (keyName) idx = prev.findIndex((r) => r[keyName] === rowData[keyName]);
                }
                if (idx === -1) return prev;

                const next = [...prev];
                next[idx] = { ...next[idx], [field]: newValue };
                return next;
            });
        };

        /* QRY KSV_PO_MST1*/
        let emptyQRY_KSV_PO_MRP4 = {
            MATL_CD: "",
            MATL_NAME: "",
            COLOR: "",
            SPEC: "",
            VENDOR_CD: "",
            FACTORY_CD: "",
        };

        const [dataQRY_KSV_PO_MRP4, setDataQRY_KSV_PO_MRP4] = useState(emptyQRY_KSV_PO_MRP4);
        const onInputChangeQRY_KSV_PO_MRP4_MATL_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP4[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
        }
        const onInputChangeQRY_KSV_PO_MRP4_MATL_NAME = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP4[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
        }

        const onInputChangeQRY_KSV_PO_MRP4_COLOR = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP4[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
        }

        const onInputChangeQRY_KSV_PO_MRP4_SPEC = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP4[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
        }

        const [datasQRY_KSV_PO_MRP4_FACTORY_CD, setDatasQRY_KSV_PO_MRP4_FACTORY_CD] = useState([]);
        const [dataQRY_KSV_PO_MRP4_FACTORY_CD, setDataQRY_KSV_PO_MRP4_FACTORY_CD] = useState({});

        const editQRY_KSV_PO_MRP4_FACTORY_CD = (argValue) => {
            let _dataQRY_KSV_PO_MRP4_FACTORY_CD = datasQRY_KSV_PO_MRP4_FACTORY_CD.filter(val => val.FACTORY_CD === argValue);
            setDataQRY_KSV_PO_MRP4_FACTORY_CD(_dataQRY_KSV_PO_MRP4_FACTORY_CD[0]);
        }

        const onDropdownChangeQRY_KSV_PO_MRP4_FACTORY_CD = (e, name) => {
            let val = (e.value && e.value.FACTORY_CD) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP4[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);
            }

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
            setDataQRY_KSV_PO_MRP4_FACTORY_CD(e.value);
        }

        const onInputChangeQRY_KSV_PO_MRP4_FACTORY_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP4[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
        }

        const [datasQRY_KSV_PO_MRP4_VENDOR_CD, setDatasQRY_KSV_PO_MRP4_VENDOR_CD] = useState([]);
        const [dataQRY_KSV_PO_MRP4_VENDOR_CD, setDataQRY_KSV_PO_MRP4_VENDOR_CD] = useState({});

        const editQRY_KSV_PO_MRP4_VENDOR_CD = (argValue) => {
            let _dataQRY_KSV_PO_MRP4_VENDOR_CD = datasQRY_KSV_PO_MRP4_VENDOR_CD.filter(val => val.CD_CODE === argValue);
            setDataQRY_KSV_PO_MRP4_VENDOR_CD(_dataQRY_KSV_PO_MRP4_VENDOR_CD[0]);
        }

        const onDropdownChangeQRY_KSV_PO_MRP4_VENDOR_CD = (e, name) => {
            let val = (e.value && e.value.CD_CODE) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP4[`${name}`] = String(val);
            } else if (typeof tTypeVal === "number" && typeof val === "string") {
                _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);
            }

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
            setDataQRY_KSV_PO_MRP4_VENDOR_CD(e.value);
        }

        const onKeyPressQRY_KSV_PO_MRP4_VENDOR_CD = (e, name) => {
            if (e.key === 'Enter') {
                console.log(e);
                search_QRY_VENDOR(e.target.value);
                // process_SEARCH_VENDOR();
                // search_LIST_1();
            }
        }

        const onInputChangeQRY_KSV_PO_MRP4_VENDOR_CD = (e, name) => {
            let val = (e.target && e.target.value) || '';

            let _dataQRY_KSV_PO_MRP4 = {
                ...dataQRY_KSV_PO_MRP4
            };

            let tTypeVal = _dataQRY_KSV_PO_MRP4[`${name}`];
            if (typeof tTypeVal === "string") _dataQRY_KSV_PO_MRP4[`${name}`] = val;
            else if (typeof tTypeVal === "number") _dataQRY_KSV_PO_MRP4[`${name}`] = parseInt(val);

            setDataQRY_KSV_PO_MRP4(_dataQRY_KSV_PO_MRP4);
        }

        useEffect(() => {

            let tPoCd = '';

            var tUrls = window.location.href.split('?');
            if (tUrls.length <= 1) {
               ;
            } else { 
              var tParams1 = tUrls[1].split('&');
              var tParams2 = tParams1.map((col, i) => {
                 var tObj = {};
                 var tCols = col.split('=');
                 if (tCols[0].includes('PO_CD')) {
                   tObj.key = tCols[0];
                   tObj.value= tCols[1];
                   tPoCd = tObj.value;
                 }
              });
            }

            var tObj = {};
            serviceS0440_FREIGHT_REGIST.mgrQuery_CODE(tObj).then(data => {
                if (typeof data.graphQLErrors === 'undefined') {

                    var tSaveObj = {};
                    if (tPoCd) {
                        tSaveObj = JSON.parse(sessionStorage.getItem('S0516_SEND_ETP_INFO'));
                        console.log(tSaveObj);
                    }

                    var tUserInfo = serviceLib.getUserInfo();
                    var tRetDate = serviceLib.getCurrDate().substring(0, 8);

                    var tEdit = {
                        ...dataEDT_KSV_PO_MRP
                    };
                    tEdit.SHIP_DATE = tRetDate;
                    //tEdit.SENDER = tUserInfo.USER_ID; 
                    if (tPoCd && tSaveObj.PO_CD)  {
                        tEdit.SHIP_MODE = tSaveObj.SHIP_MODE;
                        tEdit.CT_NO = tSaveObj.CT_NO;
                        tEdit.PAYMENT = tSaveObj.PAYMENT;
                        tEdit.BUYER_CD = tSaveObj.BUYER_CD;
                        tEdit.ORIGIN_PORT = tSaveObj.ORIGIN_PORT;
                        tEdit.DESTINATION = tSaveObj.DESTINATION;
                        tEdit.DESC = tSaveObj.DESC;
                        tEdit.REMARK = tSaveObj.REMARK;
                        tEdit.PO_CD = tSaveObj.PO_CD;
                        tEdit.ORDER_CD = tSaveObj.ORDER_CD;
                        setDatasTBL_KSV_PO_MRP4(tSaveObj.DATAS);
                    }
                    setDataEDT_KSV_PO_MRP(tEdit);

                    setDatasEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE);
                    if (tPoCd) setDataEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[1]);
                    else  setDataEDT_KSV_PO_MRP_SHIP_MODE(data.SHIP_MODE[0]);

                    setDatasEDT_KSV_PO_MRP_PAYMENT(data.PAYMENT);
                    setDataEDT_KSV_PO_MRP_PAYMENT(data.PAYMENT[2]);

                    setDatasEDT_KSV_PO_MRP_BUYER_CD(data.BUYER_CD);
                    if (tPoCd) {
                        var tTmp = {};
                        data.BUYER_CD.forEach((col9, i9) => {
                            if (col9.BUYER_CD === tSaveObj.BUYER_CD) tTmp = { ...col9 };
                        });
                        if (tTmp.BUYER_CD) setDataEDT_KSV_PO_MRP_BUYER_CD(tTmp);
                    } else setDataEDT_KSV_PO_MRP_BUYER_CD(data.BUYER_CD[0]);

                    setDatasEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN);
                    if (tPoCd) {
                        var tTmp = {};
                        data.ORIGIN.forEach((col9, i9) => {
                            if (col9.CD_CODE === tSaveObj.ORIGIN_PORT) tTmp = { ...col9 };
                        });
                        if (tTmp.CD_CODE) setDataEDT_KSV_PO_MRP_ORIGIN_PORT(tTmp);
                    } else setDataEDT_KSV_PO_MRP_ORIGIN_PORT(data.ORIGIN[0]);

                    setDatasEDT_KSV_PO_MRP_DESTINATION(data.DESTINATION);
                    if (tPoCd) {
                        var tTmp = {};
                        data.DESTINATION.forEach((col9, i9) => {
                            if (col9.CD_CODE === tSaveObj.DESTINATION) tTmp = { ...col9 };
                        });
                        if (tTmp.CD_CODE) setDataEDT_KSV_PO_MRP_DESTINATION(tTmp);
                    } else setDataEDT_KSV_PO_MRP_DESTINATION(data.ORIGIN[0]);

                    setDatasEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE);
                    setDataEDT_KSV_PO_MRP_SHIP_LINE(data.SHIP_LINE[0]);

                    setDatasEDT_KSV_PO_MRP_SENDER(data.USER_ID);
                    setDatasEDT_KSV_PO_MRP_RECEIVER(data.USER_ID);

                    const list = Array.isArray(data?.USER_ID) ? data.USER_ID : [];
                    setDatasEDT_KSV_PO_MRP_SENDER(list);

                    const norm = (v: unknown) => String(v ?? '').trim().toLowerCase();
                    const target = norm(tUserInfo?.USER_ID);

                    const idx = list.findIndex(item => norm(item?.USER_ID) === target);

                    const fallbackIndex = list.length > 1 ? 1 : (list.length > 0 ? 0 : -1);
                    const useIndex = idx >= 0 ? idx : fallbackIndex;

                    setDataEDT_KSV_PO_MRP_SENDER(useIndex >= 0 ? list[useIndex] : null);

                    var tEdit = {
                        ...dataEDT_KSV_PO_MRP
                    };
                    tEdit.SHIP_DATE = tRetDate;
                    tEdit.SENDER = list[useIndex].USER_ID; 
                    //tEdit.SENDER = tUserInfo.USER_ID;
                    if (tPoCd && tSaveObj.PO_CD)  {
                        tEdit.SHIP_MODE = tSaveObj.SHIP_MODE;
                        tEdit.CT_NO = tSaveObj.CT_NO;
                        tEdit.PAYMENT = tSaveObj.PAYMENT;
                        tEdit.BUYER_CD = tSaveObj.BUYER_CD;
                        tEdit.ORIGIN_PORT = tSaveObj.ORIGIN_PORT;
                        tEdit.DESTINATION = tSaveObj.DESTINATION;
                        tEdit.DESC = tSaveObj.DESC;
                        tEdit.REMARK = tSaveObj.REMARK;
                        tEdit.PO_CD = tSaveObj.PO_CD;
                        tEdit.ORDER_CD = tSaveObj.ORDER_CD;
                        setDatasTBL_KSV_PO_MRP4(tSaveObj.DATAS);
                    }
                    setDataEDT_KSV_PO_MRP(tEdit);

                    // setDataEDT_KSV_PO_MRP({...dataEDT_KSV_PO_MRP, SENDER: list[useIndex].USER_ID});
                    

                } else {
                    console.log("mgrQuery_PO_CD error => " + JSON.stringify(data.graphQLErrors));
                }
            });

            search_LIST_1();
            // search_LIST_2();

        }, []);

        const blankFn = () => {}

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
            return value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
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

        const [isHiddenOrigin, setIsHiddenOrigin] = useState(true);
        const [isHiddenDest, setIsHiddenDest] = useState(true);

    return (

        <div className="af-div-main" >

            <div className="af-div-first" style={{ width: '123rem', height: '3rem' }}>
                <span className="af-span-3-0" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Ready Date </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Calendar showButtonBar style={{ width: '10rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataQRY_KSV_PO_MRP.S_READY_DATE)} onChange={(e) => onCalChangeQRY_KSV_PO_MRP_S_READY_DATE(e, 'S_READY_DATE')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '12rem' }}>
                    <p className="af-span-p" style={{ width: '1rem' }}> ~ </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Calendar showButtonBar style={{ width: '10rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataQRY_KSV_PO_MRP.E_READY_DATE)} onChange={(e) => onCalChangeQRY_KSV_PO_MRP_E_READY_DATE(e, 'E_READY_DATE')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Origin </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <InputText style={{ width: '10rem' }} id="id_BL_FILE" value={dataQRY_KSV_PO_MRP.ORIGIN_PORT} onChange={(e) => onInputChangeQRY_KSV_PO_MRP_ORIGIN_PORT(e, 'ORIGIN_PORT')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Search" className="p-button-text" onClick={search_LIST_1} />
                    </div>
                </span>
            </div>

            <div className="af-div-first" style={{ width: '123rem', height: '33rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_PO_MRP} size="small" value={datasTBL_KSV_PO_MRP}
                    tableStyle={{tableLayout:'fixed'}}
                    loading={loadingTBL_KSV_PO_MRP}
                    metaKeySelection={false}
                    showGridlines selectionMode="checkbox"
                    resizableColumns columnResizeMode="expand"
                    selection={selectedTBL_KSV_PO_MRP}
                    onSelectionChange={(e) => { setSelectedTBL_KSV_PO_MRP(e.value); }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP}
                    dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="360px" >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false}  headerClassName='t-header' headerStyle={{ width: '3rem' }}></AFColumn>
                    <AFColumn field="READY_DATE" headerClassName='t-header' header="Ready Date" style={{ width: '8rem',flexBasis:'auto' }} body={rowData => serviceLib.dateFormatHMS(rowData.READY_DATE)} ></AFColumn>
                    <AFColumn field="TARGET_ETD" headerClassName='t-header' header="ETD(T)" style={{ width: '6rem',flexBasis:'auto' }} body={rowData => serviceLib.dateFormatHMS(rowData.TARGET_ETD)} ></AFColumn>
                    <AFColumn field="TARGET_ETA" headerClassName='t-header' header="ETA(T)" style={{ width: '6rem',flexBasis:'auto' }} body={rowData => serviceLib.dateFormatHMS(rowData.TARGET_ETA)} ></AFColumn>
                    <AFColumn field="BUYER_CD" headerClassName='t-header' header="Buyer#" style={{ width: '8rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="SHIP_MODE_N" headerClassName='t-header' header="Ship Mode" style={{ width: '8rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="ORIGIN_PORT" headerClassName='t-header' header="Origin" style={{ width: '8rem',flexBasis:'auto' }} body={ r => r.ORIGIN_PORT === '3RD' ? `${r.ORIGIN_PORT} (${r.ORG_ORIGIN_PORT})` : `${r.ORIGIN_PORT}` } ></AFColumn>
                    <AFColumn field="DESTINATION" headerClassName='t-header' header="Destination" style={{ width: '10rem',flexBasis:'auto' }} body={ r => r.DESTINATION === '3RD' ? `${r.DESTINATION} (${r.ORG_DESTINATION})` : `${r.DESTINATION}` } ></AFColumn>
                    <AFColumn field="REG_USER" headerClassName='t-header' header="Sender" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="RECEIVER" headerClassName='t-header' header="Receiver" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="DESCRIPTION" headerClassName='t-header' header="Description" style={{ width: '8rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="PO_CD2" headerClassName='t-header' header="PO#" style={{ width: '8rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="CT_QTY" headerClassName='t-header' header="C/T#" style={{ width: '4rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.CT_QTY, 2)} ></AFColumn>
                    <AFColumn field="WEIGHT" headerClassName='t-header' header="Weight" style={{ width: '4rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.WEIGHT, 2)} ></AFColumn>
                    <AFColumn field="CBM" headerClassName='t-header' header="CBM" style={{ width: '4rem',flexBasis:'auto' }} bodyStyle={{ textAlign:'right'}} body = {rowData => serviceLib.numWithCommas(rowData.CBM, 2)} ></AFColumn>
                    <AFColumn field="REMARK" headerClassName='t-header' header="Remark" style={{ width: '8rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="STSOUT_CD" headerClassName='t-header' header="Stsout#" style={{ width: '8rem',flexBasis:'auto' }} ></AFColumn>
                    
                </AFDataTable>
            </div>

            <div className="af-div-first" style={{ width: '123rem', height: '19rem' }}>
                <span className="af-span-3-0" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Ship Mode </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Dropdown style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_SHIP_MODE} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_SHIP_MODE(e, 'SHIP_MODE')} options={datasEDT_KSV_PO_MRP_SHIP_MODE} optionLabel="CD_NAME" placeholder="" ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *C/T# </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <InputText style={{ width: '10rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.CT_NO} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_CT_NO(e, 'CT_NO')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '70rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Amount </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <InputText style={{ width: '10rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.AMOUNT} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_AMOUNT(e, 'AMOUNT')} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Ready Date </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Calendar showButtonBar style={{ width: '10rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataEDT_KSV_PO_MRP.SHIP_DATE)} onChange={(e) => onCalChangeEDT_KSV_PO_MRP_SHIP_DATE(e, 'SHIP_DATE')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color: 'red' }}> *Weight </p>
                    <div className="af-span-div" style={{ width: '7rem' }}>
                        <InputText style={{ width: '7rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.WEIGHT} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_WEIGHT(e, 'WEIGHT')} />
                    </div>
                    <p className="af-span-p" style={{ width: '2rem' }}> Kg </p>
                </span>
                <span className="af-span-3" style={{ width: '70rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> BL# </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <InputText style={{ width: '10rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.BL_NO} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_BL_NO(e, 'BL_NO')} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Payment </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Dropdown style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_PAYMENT} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_PAYMENT(e, 'PAYMENT')} options={datasEDT_KSV_PO_MRP_PAYMENT} optionLabel="CD_NAME" placeholder="" ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> CBM </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <InputText style={{ width: '10rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.CBM} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_CBM(e, 'CBM')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '70rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Buyer </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Dropdown style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_BUYER_CD} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_BUYER_CD(e, 'BUYER_CD')} options={datasEDT_KSV_PO_MRP_BUYER_CD} optionLabel="BUYER_CD" placeholder=" " filter ></Dropdown>
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Origin </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Dropdown style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_ORIGIN_PORT} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_ORIGIN_PORT(e, 'ORIGIN_PORT')} options={datasEDT_KSV_PO_MRP_ORIGIN_PORT} optionLabel="CD_NAME" placeholder="" ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Sender </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        {/*<InputText style={{ width: '10rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.SENDER} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_SENDER(e, 'SENDER')} />*/}
                        <Dropdown disabled={!isHiddenOrigin} style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_SENDER} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_SENDER(e, 'SENDER')} options={datasEDT_KSV_PO_MRP_SENDER} optionLabel="USER_ID" placeholder="" filter></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '18rem' }}>
                    <div className="af-span-div" style={{ width: '17rem' }}>
                        <InputText style={{ width: '17rem', visibility: isHiddenOrigin ? 'hidden' : 'visible' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.ETC_ORIGIN} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_ETC_ORIGIN(e, 'ETC_ORIGIN')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '51rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> PO# </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        
                        <InputText style={{ width: '17rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.PO_CD} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_PO_CD(e, 'PO_CD')} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Destination </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Dropdown style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_DESTINATION} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_DESTINATION(e, 'DESTINATION')} options={datasEDT_KSV_PO_MRP_DESTINATION} optionLabel="CD_NAME" placeholder="" ></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '18rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Receiver </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Dropdown disabled={!isHiddenDest}  style={{ width: '10rem' }} id="id_SHIP_MODE" value={dataEDT_KSV_PO_MRP_RECEIVER} onChange={(e) => onDropdownChangeEDT_KSV_PO_MRP_RECEIVER(e, 'RECEIVER')} options={datasEDT_KSV_PO_MRP_RECEIVER} optionLabel="USER_ID" placeholder="" filter></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '18rem' }}>
                    <div className="af-span-div" style={{ width: '17rem' }}>
                        <InputText style={{ width: '17rem', visibility: isHiddenDest ? 'hidden' : 'visible' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.ETC_DESTINATION} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_ETC_DESTINATION(e, 'ETC_DESTINATION')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '51rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Order# </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        
                        <InputText style={{ width: '17rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.ORDER_CD} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_ORDER_CD(e, 'ORDER_CD')} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '36rem' }}>
                    <p className="af-span-p" style={{ width: '7rem', color:'red' }}> *Description </p>
                    <div className="af-span-div" style={{ width: '28rem' }}>
                        <InputText style={{ width: '28rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.DESC} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_DESC(e, 'DESC')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '70rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' , color:'red'}}> *Target ETA </p>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Calendar showButtonBar style={{ width: '10rem' }} dateFormat="yy-mm-dd" id="id_ETA" value={changeDateVal(dataEDT_KSV_PO_MRP.TARGET_ETA)} onChange={(e) => onCalChangeEDT_KSV_PO_MRP_TARGET_ETA(e, 'TARGET_ETA')} />
                    </div>
                </span>
                

                <span className="af-span-3" style={{ width: '36rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Remark </p>
                    <div className="af-span-div" style={{ width: '28rem' }}>
                        <InputText style={{ width: '28rem' }} id="id_BL_FILE" value={dataEDT_KSV_PO_MRP.REMARK} onChange={(e) => onInputChangeEDT_KSV_PO_MRP_REMARK(e, 'REMARK')} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Insert" className="p-button-text" onClick={process_INSERT_SHIPMENT} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Update" className="p-button-text" onClick={process_UPDATE_SHIPMENT} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Delete" className="p-button-text" onClick={process_DELETE_SHIPMENT} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Reset" className="p-button-text" onClick={process_RESET} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Excel" className="p-button-text green" onClick={exportExcelTBL_KSV_PO_MRP} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div" style={{ width: '10rem' }}>
                        <Button style={{ display: 'inline-block', width: '10rem' }} label="Matl Add" className="p-button-text orange" onClick={popup_MATL_ADD} />
                    </div>
                </span>
            </div>
            <div className="af-div-first" style={{ width: '123rem', height: '30rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_PO_MRP4} editMode="cell" size="small" value={datasTBL_KSV_PO_MRP4}
                    loading={loadingTBL_KSV_PO_MRP4}
                    tableStyle={{tableLayout:'fixed'}}
                    resizableColumns columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines selectionMode="multiple"
                    selection={selectedTBL_KSV_PO_MRP4}
                    onSelectionChange={(e) => { setFlagSelectModeTBL_KSV_PO_MRP4(true); setSelectedTBL_KSV_PO_MRP4(e.value); onRowClick1TBL_KSV_PO_MRP4(e.value); }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP4} dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="260px" >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false}  headerClassName='t-header' headerStyle={{ width: '3rem' }}></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName='t-header' header="Matl Cd" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName='t-header' header="Description" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName='t-header' header="Color" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName='t-header' header="Spec" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName='t-header' header="Price" style={{ width: '6rem' ,flexBasis:'auto'}}></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName='t-header' header="Curr" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName='t-header' header="Unit" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName='t-header' header="Ship Qty" style={{ width: '6rem',flexBasis:'auto', color:'green' }} editor={(options) => cellEditorTBL_KSV_PO_MRP4(options)} onCellEditComplete={onCellEditCompleteTBL_KSV_PO_MRP4}></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName='t-header' header="Supplier" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    
                </AFDataTable>
            </div>

            <Toast ref={toast} />

            <Dialog visible={createDialog} position="top-right" style={{ width: '98vw' }} header="" modal={true} className="p-fluid" onHide={hideDialog}>
            </Dialog>

            <Dialog visible={createDialogMatl} position="mid-center" style={{ overflow:'hidden', width: '122rem', height: '60rem', marginLeft: '0rem', marginTop: '0rem', paddingLeft:'0rem', paddingTop:'0rem' }} header="Matl Add" modal={true} className="p-fluid" onHide={hideDialogMatl}>
            <div className="af-div-first" style={{ width: '120rem', height: '3rem' }}>
                <span className="af-span-3" style={{ width: '11rem' }}>
                    <div className="af-span-div-btn" style={{ width: '10rem' }}>
                        <Button label="Apply" style={{ width:'10rem'}} className="p-button-text" onClick={process_APPLY_MATL_ADD} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '11rem' }}>
                    <div className="af-span-div-btn" style={{ width: '10rem' }}>
                        <Button label="Exit" style={{ width:'10rem'}} className="p-button-text" onClick={hideDialogMatl} />
                    </div>
                </span>
            </div>
            <div className="af-div-first" style={{ width: '120rem', height: '24rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_PO_MRP4} editMode="cell" size="small" value={datasTBL_KSV_PO_MRP4}
                    loading={loadingTBL_KSV_PO_MRP4}
                    tableStyle={{tableLayout:'fixed'}}
                    resizableColumns columnResizeMode="expand"
                    metaKeySelection={false}
                    showGridlines selectionMode="multiple"
                    selection={selectedTBL_KSV_PO_MRP4}
                    onSelectionChange={(e) => { setFlagSelectModeTBL_KSV_PO_MRP4(true); setSelectedTBL_KSV_PO_MRP4(e.value); onRowClick1TBL_KSV_PO_MRP4(e.value); }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP4} dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="260px" >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false}  headerClassName='t-header' headerStyle={{ width: '3rem' }}></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName='t-header' header="Matl Cd" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName='t-header' header="Description" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName='t-header' header="Color" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName='t-header' header="Spec" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName='t-header' header="Price" style={{ width: '6rem' ,flexBasis:'auto'}}></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName='t-header' header="Curr" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName='t-header' header="Unit" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName='t-header' header="Ship Qty" style={{ width: '6rem',flexBasis:'auto', color:'green' }} editor={(options) => cellEditorTBL_KSV_PO_MRP4(options)} onCellEditComplete={onCellEditCompleteTBL_KSV_PO_MRP4}></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName='t-header' header="Supplier" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    
                </AFDataTable>
            </div>

            <div className="af-div-first" style={{ width: '120rem', height: '6rem' }}>
                <span className="af-span-3-0" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Matl# </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{  width: '9rem' }} id="id_MATL_CD" value={dataQRY_KSV_PO_MRP4.MATL_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP4_MATL_CD(e, 'MATL_CD')} />
                    </div>
                 </span>
                <span className="af-span-3-0" style={{ width: '34rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Desc </p>
                    <div className="af-span-div" style={{ width: '26rem' }}>
                       <InputText style={{ width: '26rem' }} id="id_MATL_NAME" value={dataQRY_KSV_PO_MRP4.MATL_NAME} onChange={(e) => onInputChangeQRY_KSV_PO_MRP4_MATL_NAME(e, 'MATL_NAME')} />
                    </div>
                 </span>
                <span className="af-span-3-0" style={{ width: '26rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Color </p>
                    <div className="af-span-div" style={{ width: '18rem' }}>
                       <InputText style={{ width: '18rem' }} id="id_COLOR" value={dataQRY_KSV_PO_MRP4.COLOR} onChange={(e) => onInputChangeQRY_KSV_PO_MRP4_COLOR(e, 'COLOR')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '35rem' }}>
                    <div className="af-span-div-btn" style={{ width: '10rem' }}>
                        <Button label="Matl Inquiry" style={{ width:'10rem'}} className="p-button-text" onClick={searchMATL_MST} />
                    </div>
                </span>

                <span className="af-span-3" style={{ width: '17rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Supplier </p>
                    <div className="af-span-div" style={{ width: '9rem' }}>
                       <InputText style={{ width: '9rem' }} id="id_SPEC" value={dataQRY_KSV_PO_MRP4.VENDOR_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP4_VENDOR_CD(e, 'VENDOR_CD')} />
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '34rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Spec </p>
                    <div className="af-span-div" style={{ width: '26rem' }}>
                       <InputText style={{ width: '26rem' }} id="id_SPEC" value={dataQRY_KSV_PO_MRP4.SPEC} onChange={(e) => onInputChangeQRY_KSV_PO_MRP4_SPEC(e, 'SPEC')} />
                    </div>
                 </span>
                <span className="af-span-3" style={{ width: '26rem' }}>
                    <p className="af-span-p" style={{ width: '7rem' }}> Factory# </p>
                    <div className="af-span-div" style={{ width: '18rem' }}>
                       {/*<InputText style={{ width: '18rem' }} value={dataQRY_KSV_PO_MRP4.FACTORY_CD} onChange={(e) => onInputChangeQRY_KSV_PO_MRP4_FACTORY_CD(e, 'FACTORY_CD')} />*/}
                       <Dropdown style={{ width: '18rem' }} id="id_FACTORY_CD" value={dataQRY_KSV_PO_MRP4_FACTORY_CD} onChange={(e) => onDropdownChangeQRY_KSV_PO_MRP4_FACTORY_CD(e, 'FACTORY_CD')} optionLabel="FACTORY_NAME" options={datasQRY_KSV_PO_MRP4_FACTORY_CD}></Dropdown>
                    </div>
                </span>
                <span className="af-span-3" style={{ width: '11rem' }}>
                    <div className="af-span-div-btn" style={{ width: '10rem' }}>
                        <Button label="Matl Add" style={{width:'10rem'}}  className="p-button-text" onClick={addMaterial} />
                    </div>
                </span>
                <span className="af-span-3-0" style={{ width: '11rem' }}>
                    <div className="af-span-div-btn" style={{ width: '10rem' }}>
                         <Button label="Reset" style={{width: '10rem'}} className="p-button-text"  />
                    </div>
                </span>
            </div>

            <div className="af-div-first" style={{ width: '120rem', height: '20rem' }}>
                <AFDataTable preventUnrelatedRerender ref={dt_TBL_KSV_PO_MRP41} editMode="cell" size="small" value={datasTBL_KSV_PO_MRP41}
                    tableStyle={{tableLayout:'fixed'}}
                    loading={loadingTBL_KSV_PO_MRP41}
                    resizableColumns columnResizeMode="expand"
                    showGridlines selectionMode="checkbox"
                    selection={selectedTBL_KSV_PO_MRP41}
                    onSelectionChange={(e) => { setFlagSelectModeTBL_KSV_PO_MRP41(true); setSelectedTBL_KSV_PO_MRP41(e.value); onRowClick1TBL_KSV_PO_MRP41(e.value); }}
                    onRowClick={onRowClickTBL_KSV_PO_MRP41} dataKey="id" className="datatable-responsive"
                    virtualScrollerOptions={{ itemSize: 20 }}
                    emptyMessage=" " //header={headerTBL_KSV_PO_MRP1}
                    responsiveLayout="scroll"
                    scrollable scrollHeight="20rem" >
                    <AFColumn selectionMode="multiple" field="__checkbox__" reorderable={false}  headerClassName='t-header' headerStyle={{ width: '3rem' }}></AFColumn>
                    <AFColumn field="MATL_CD" headerClassName='t-header' header="Matl Cd" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_NAME" headerClassName='t-header' header="Description" style={{ width: '15rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="COLOR" headerClassName='t-header' header="Color" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="SPEC" headerClassName='t-header' header="Spec" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_PRICE" headerClassName='t-header' header="Price" style={{ width: '6rem' ,flexBasis:'auto'}}></AFColumn>
                    <AFColumn field="CURR_CD" headerClassName='t-header' header="Curr" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="UNIT" headerClassName='t-header' header="Unit" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="STOCK_QTY" headerClassName='t-header' header="Stock Qty" style={{ width: '6rem' ,flexBasis:'auto'}}></AFColumn>
                    <AFColumn field="PO_QTY" headerClassName='t-header' header="Po Qty" style={{ color:'green', width: '6rem',flexBasis:'auto' }} editor={(options) => cellEditorTBL_KSV_PO_MRP41(options)} onCellEditComplete={onCellEditCompleteTBL_KSV_PO_MRP41} ></AFColumn>
                    <AFColumn field="PO_TYPE_NAME" headerClassName='t-header' header="Po Type" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="VENDOR_NAME" headerClassName='t-header' header="Supplier" style={{ width: '14rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="STOCK_STATUS" headerClassName='t-header' header="Stock.S" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="USE_PO_CD" headerClassName='t-header' header="Use Po Cd" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="USE_PO_SEQ" headerClassName='t-header' header="Use Po Seq" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="USE_ORDER_CD" headerClassName='t-header' header="Use Order" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="REASON_TYPE" headerClassName='t-header' header="Reason Type" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="FARE_TYPE" headerClassName='t-header' header="Fare Type" style={{ width: '6rem',flexBasis:'auto' }}  ></AFColumn>
                    <AFColumn field="REMARK" headerClassName='t-header' header="Remark" style={{ width: '10rem' ,flexBasis:'auto'}}  ></AFColumn>
                    <AFColumn field="USE_PO_TYPE" headerClassName='t-header' header="Use Po Type.S" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="USE_MRP_SEQ" headerClassName='t-header' header="Use Mrp Seq" style={{ width: '6rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="USE_MATL_SEQ" headerClassName='t-header' header="Use Matl Seq" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="MATL_SEQ" headerClassName='t-header' header="Matl Seq" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="FACTORY_CD" headerClassName='t-header' header="Factory#" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="STOCK_IDX" headerClassName='t-header' header="Stock Idx" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                    <AFColumn field="ORDER_CD" headerClassName='t-header' header="Order Cd" style={{ width: '10rem',flexBasis:'auto' }} ></AFColumn>
                </AFDataTable>
            </div>
            </Dialog>

        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(S0440_FREIGHT_REGIST, comparisonFn);

