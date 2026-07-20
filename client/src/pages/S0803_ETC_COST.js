import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ServiceLib } from '../service/service_lib/ServiceLib';
import { analyzeFrm206Invoice, cancelFrm206, createFrm206, createFrm206DeleteApproval, createFrm206ExpenseApproval, createFrm206HrEtcEntries, createFrm206InsuranceEntries, fetchFrm206GwInfo, fetchFrm206InsuranceMappings, fetchFrm206LoadTemplateDetail, fetchFrm206Banks, fetchFrm206Detail, fetchFrm206Options, fetchFrm206Rows, fetchFrm206SellingExpensePerformance, finishFrm206Sending, resetFrm206GwInfo, updateFrm206, uploadFrm206HrEtcExcel, uploadFrm206InsuranceExcel } from '../service/service_biz/ServiceS0803_ETC_COST';
import { AFDataTable } from '../components/AFDataTable';
import { AFColumn } from '../components/AFColumn';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import '../App.scss';



const frm206Statuses = [
'ALL',
'등록',
'상신',
'취소',
'종결',
'삭제요청',
'삭제완료',
'전표',
'송금',
'반려',
'보관'];


const formatDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDefaultFrm206Filters = () => {
  const today = new Date();
  const previousMonth = new Date(today);
  const nextMonth = new Date(today);
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return {
    dateType: 'document',
    fromDate: formatDateInputValue(previousMonth),
    toDate: formatDateInputValue(nextMonth),
    status: 'ALL',
    costCenter: '',
    account: '',
    supplier: ''
  };
};

const createEmptyFrm206Form = () => ({
  id: '',
  status: '신규',
  statusCode: '0',
  documentDate: new Date().toISOString().slice(0, 10),
  requestDate: new Date().toISOString().slice(0, 10),
  requestMonth: new Date().toISOString().slice(0, 7),
  costCenterCode: '',
  accountCode: '',
  currency: '',
  amount: '',
  vat: '',
  total: '',
  minAmount: '',
  actualAmount: '',
  supplierCode: '',
  bankCode: '',
  remark: '',
  actOption: '없음',
  actRemark: '',
  taxCode: '1',
  payTypeCode: '2',
  requestTypeCode: '0',
  cardCode: '0',
  bankName: '',
  accountNo: '',
  bankAccountName: '',
  swiftCode: '',
  bankBranch: ''
});


const defaultFrm206Options = {
  costCenters: [],
  accounts: [],
  suppliers: [],
  costCenterOptions: [],
  accountOptions: [],
  supplierOptions: [],
  currencies: ['KRW', 'USD', 'EUR', 'JPY', 'GBP'],
  actOptions: ['없음', '수기입력', 'DebitNote', 'CreditNote', '원천징수'],
  payTypeOptions: [
  { value: '2', label: '일반(국내-금)' },
  { value: '3', label: '일반(국외-수)' },
  { value: '1', label: '긴급' },
  { value: '4', label: '월마감' }],

  requestTypeOptions: [
  { value: '0', label: '일반' },
  { value: '1', label: '자동이체' },
  { value: '2', label: '현금요청' },
  { value: '3', label: '현장납부' }],

  taxTypeOptions: [
  { value: '1', label: '과세' },
  { value: '2', label: '면세/영세율' },
  { value: '3', label: 'INVOICE/고지서' }],

  cardOptions: [
  { value: '0', label: '가능' },
  { value: '1', label: '불가' }]

};
const bufferedEditorKeys = ['remark', 'total', 'amount', 'vat'];
const hrEtcAllowedParts = ['M01', 'M02'];
const hrEtcModeOptions = {
  quick: { value: 'quick', label: '퀵서비스', apiType: 'QUICK_SERVICE' },
  mro: { value: 'mro', label: 'MRO', apiType: 'MRO' }
};
const createDefaultHrEtcForm = () => ({
  documentDate: new Date().toISOString().slice(0, 10),
  requestDate: new Date().toISOString().slice(0, 10),
  amount: '',
  vat: '',
  total: ''
});
const insuranceTypeGroup1 = ['단체보험', '내일채움'];
const insuranceTypeGroup2 = ['국민연금', '건강보험', '고용보험', '산재보험'];
const formatMonthInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};
const getInsuranceRequestDateGroup1 = (monthValue) => monthValue ? `${monthValue}-25` : '';
const getInsuranceRequestDateGroup2 = (monthValue) => {
  if (!monthValue) {
    return '';
  }
  const [yearText, monthText] = monthValue.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return '';
  }
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return `${String(nextYear)}-${String(nextMonth).padStart(2, '0')}-10`;
};
const createDefaultInsuranceForm = () => {
  const today = new Date();
  const targetMonth = formatMonthInputValue(today);
  return {
    targetMonth,
    documentDate: formatDateInputValue(today),
    requestDateGroup1: getInsuranceRequestDateGroup1(targetMonth),
    requestDateGroup2: getInsuranceRequestDateGroup2(targetMonth)
  };
};
const getBufferedEditorValue = (targetForm, key) => String((targetForm === null || targetForm === void 0 ? void 0 : targetForm[key]) ?? '');
const toLoadTemplateOption = (row) => {
  const fallbackTitle = [row.supplierName, row.accountName, row.costCenterName].filter(Boolean).join(' / ');
  return {
    id: row.id,
    title: row.title || fallbackTitle || row.id
  };
};
const INLINE_STYLE_ID = 'frm206-inline-style';
const INLINE_STYLE_TEXT = ".frm206-page {\n  display: grid;\n  grid-template-rows: auto minmax(0, 1fr);\n  gap: 12px;\n  min-width: 0;\n  height: 100%;\n  min-height: 0;\n}\n\n.content-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 12px;\n  min-height: 0;\n}\n\n.content-grid--editing {\n  grid-template-columns: minmax(0, 1.7fr) minmax(360px, 0.95fr);\n}\n\n.panel {\n  min-width: 0;\n  background: #ffffff;\n  border: 1px solid #d9dfec;\n  border-radius: 16px;\n  box-shadow: 0 12px 30px rgba(80, 103, 140, 0.08);\n}\n\n.search-panel,\n.detail-panel,\n.panel {\n  padding: 14px 16px;\n}\n\n.list-panel,\n.editor-panel {\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n\n.editor-panel {\n  overflow: hidden;\n}\n\n.panel__title-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n\n.panel__title-row h2 {\n  margin: 0;\n  font-size: 15px;\n}\n\n.panel__title-row--end {\n  justify-content: flex-end;\n}\n\n.panel__actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.panel__meta,\n.panel__note {\n  color: #7d879b;\n  font-size: 12px;\n}\n\n.dev-user-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: end;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n\n.dev-user-fields {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: end;\n}\n\n.panel__note {\n  margin: 12px 0 0;\n  line-height: 1.5;\n}\n\n.panel__success {\n  margin: 0 0 10px;\n  color: #1f7a46;\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.editor-panel__header {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  margin-bottom: 0;\n  padding-bottom: 10px;\n  background: #ffffff;\n}\n\n.editor-panel__body {\n  flex: 1 1 auto;\n  overflow: auto;\n  min-height: 0;\n  padding-top: 12px;\n}\n\n.load-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: end;\n  margin-bottom: 12px;\n}\n\n.load-row__field {\n  width: min(420px, 100%);\n}\n\n.action-groups {\n  display: grid;\n  grid-template-columns: 1.3fr 1fr 1.4fr;\n  gap: 10px;\n  margin-top: 12px;\n}\n\n.action-group {\n  min-width: 0;\n  padding: 10px 12px;\n  border: 1px solid #d9dfec;\n  border-radius: 14px;\n  background: #f8faff;\n}\n\n.action-group h3 {\n  margin: 0 0 8px;\n  color: #556073;\n  font-size: 12px;\n}\n\n.action-group__buttons {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  align-items: end;\n}\n\n.action-group__date {\n  min-width: 170px;\n}\n\n.search-grid,\n.editor-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 10px 12px;\n}\n\n.search-grid {\n  grid-template-columns: minmax(220px, 1.15fr) repeat(3, minmax(0, 1fr));\n}\n\n.editor-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.field {\n  display: grid;\n  gap: 6px;\n  min-width: 0;\n}\n\n.field > span {\n  color: #556073;\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.field--compact {\n  min-width: 120px;\n}\n\n.field > small {\n  color: #7d879b;\n  font-size: 11px;\n}\n\n.field input,\n.field select,\n.field textarea {\n  width: 100%;\n  min-width: 0;\n  border: 1px solid #cfd7e6;\n  border-radius: 10px;\n  background: #f8faff;\n  color: #1c2434;\n  font: inherit;\n}\n\n.field input,\n.field select {\n  height: 38px;\n  padding: 0 10px;\n}\n\n.field input[type='number'] {\n  text-align: right;\n}\n\n.field textarea {\n  padding: 10px;\n  resize: vertical;\n}\n\n.field input:focus,\n.field select:focus,\n.field textarea:focus {\n  outline: none;\n  border-color: #6d77e8;\n  box-shadow: 0 0 0 3px rgba(109, 119, 232, 0.14);\n}\n\n.field input[readonly],\n.field textarea[readonly] {\n  background: #f1f4f9;\n}\n\n.field input:disabled,\n.field select:disabled,\n.field textarea:disabled {\n  background: #f1f4f9;\n  color: #7d879b;\n}\n\n.field--full {\n  grid-column: 1 / -1;\n}\n\n.combo-field {\n  position: relative;\n}\n\n.combo-field input {\n  width: 100%;\n  padding-right: 30px;\n}\n\n.combo-field__arrow {\n  position: absolute;\n  top: 50%;\n  right: 10px;\n  transform: translateY(-50%);\n  color: #77839b;\n  font-size: 10px;\n  pointer-events: none;\n}\n\n.field--radio {\n  grid-column: span 2;\n}\n\n.search-grid > .field--radio {\n  grid-column: span 1;\n}\n\n.field__radios {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px 14px;\n  min-height: 32px;\n  align-items: center;\n  padding: 0 2px;\n}\n\n.search-grid .field__radios {\n  gap: 8px 10px;\n}\n\n.field__radios label {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  color: #394252;\n  font-size: 12px;\n}\n\n.field__radios input[type='radio'] {\n  width: 13px;\n  height: 13px;\n  margin: 0;\n}\n\n.field__radios--compact {\n  gap: 10px 14px;\n  min-height: auto;\n  padding: 4px 0 0;\n}\n\n.field__radios--compact label {\n  font-size: 12px;\n}\n\n.calc-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 14px;\n  padding-top: 2px;\n}\n\n.link-button {\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #3659c9;\n  font: inherit;\n  font-size: 12px;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.link-button:disabled {\n  color: #92a0bf;\n  cursor: default;\n  text-decoration: none;\n}\n\n.table-wrap {\n  flex: 1 1 auto;\n  width: 100%;\n  max-width: 100%;\n  min-height: 0;\n  overflow: auto;\n  border: 1px solid #e3e8f2;\n  border-radius: 12px;\n}\n\n.af-table-wrap .af-datatable__wrap {\n  overflow: auto;\n  min-width: 100%;\n}\n\n.af-table-wrap .af-datatable__table {\n  width: 100%;\n  min-width: 1140px;\n  border-collapse: collapse;\n  background: #ffffff;\n}\n\n.af-table-wrap .af-datatable__table thead th,\n.af-table-wrap .af-datatable__table tbody td {\n  padding: 6px 8px;\n  border-right: 1px solid #d8dfe9;\n  border-bottom: 1px solid #d8dfe9;\n  font-size: 11px;\n  text-align: left;\n  white-space: nowrap;\n}\n\n.af-table-wrap .af-datatable__table thead th {\n  position: sticky;\n  top: 0;\n  background: #eceff3;\n  color: #465468;\n  font-size: 11px;\n  z-index: 1;\n}\n\n.af-table-wrap .af-datatable__table tbody tr {\n  cursor: pointer;\n  transition: background-color 0.18s ease;\n}\n\n.af-table-wrap .af-datatable__table tbody tr:hover,\n.af-table-wrap .af-datatable__table tbody tr.is-checked {\n  background: #f7f9ff;\n}\n\n.af-table-wrap .af-datatable__checkbox {\n  width: 32px;\n  min-width: 32px;\n  text-align: center !important;\n  background: #f1f3f6;\n}\n\n.af-table-wrap .af-datatable__checkbox input {\n  width: 14px;\n  height: 14px;\n  accent-color: #6973e5;\n}\n\n.af-table-wrap .af-datatable__index {\n  width: 28px;\n  min-width: 28px;\n  text-align: center !important;\n  color: #6b7688;\n  background: #f1f3f6 !important;\n}\n\n.af-table-wrap .af-datatable__empty {\n  text-align: center !important;\n  color: #7a8599;\n}\n\n.af-table-wrap .t-header {\n  font-weight: 700;\n}\n\n.af-table-wrap .sort-button {\n  font-size: 11px;\n  font-weight: 700;\n  color: #465468;\n}\n\n.frm206-table {\n  width: 100%;\n  min-width: 1140px;\n  border-collapse: collapse;\n  background: #ffffff;\n}\n\n.frm206-table th,\n.frm206-table td {\n  padding: 9px 10px;\n  border-bottom: 1px solid #edf1f7;\n  font-size: 12px;\n  text-align: left;\n  white-space: nowrap;\n}\n\n.checkbox-column {\n  width: 36px;\n  min-width: 36px;\n  text-align: center !important;\n}\n\n.checkbox-column input {\n  width: 15px;\n  height: 15px;\n  accent-color: #6973e5;\n}\n\n.frm206-table th {\n  position: sticky;\n  top: 0;\n  background: #f3f6fb;\n  color: #516078;\n  font-size: 11px;\n  z-index: 1;\n}\n\n.sort-button {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.frm206-table tbody tr {\n  cursor: pointer;\n  transition: background-color 0.18s ease;\n}\n\n.frm206-table tbody tr:hover {\n  background: #f7f9ff;\n}\n\n.frm206-table tbody tr.is-selected {\n  background: #eef2ff;\n}\n\n.frm206-table .is-number {\n  text-align: right;\n}\n\n.af-table-wrap .is-text {\n  text-align: left !important;\n}\n\n.af-table-wrap .is-number {\n  text-align: right !important;\n}\n\n.af-table-wrap .is-center {\n  text-align: center !important;\n}\n\n.table-empty {\n  text-align: center !important;\n  color: #7a8599;\n}\n\n.summary-bar {\n  flex: 0 0 auto;\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  margin-top: 12px;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: #f4f7fc;\n  color: #4c5669;\n  font-size: 12px;\n}\n\n.bank-selector {\n  gap: 8px;\n}\n\n.bank-selector__header {\n  display: grid;\n  gap: 2px;\n  padding: 10px 12px;\n  border: 1px solid #d8def0;\n  border-radius: 12px;\n  background: #f8faff;\n}\n\n.bank-selector__header strong {\n  color: #1d2535;\n  font-size: 12px;\n  line-height: 1.5;\n  word-break: break-all;\n}\n\n.bank-selector__header span {\n  color: #7d879b;\n  font-size: 11px;\n}\n\n.bank-table-wrap {\n  overflow: auto;\n  border: 1px solid #e3e8f2;\n  border-radius: 12px;\n  max-height: 182px;\n}\n\n.bank-table {\n  width: 100%;\n  min-width: 720px;\n  border-collapse: collapse;\n  background: #ffffff;\n}\n\n.bank-table th,\n.bank-table td {\n  padding: 8px 10px;\n  border-bottom: 1px solid #edf1f7;\n  font-size: 12px;\n  white-space: nowrap;\n  text-align: left;\n}\n\n.bank-table th {\n  background: #f3f6fb;\n  color: #516078;\n  font-size: 11px;\n}\n\n.bank-table tbody tr {\n  cursor: pointer;\n}\n\n.bank-table tbody tr:hover {\n  background: #f7f9ff;\n}\n\n.bank-table tbody tr.is-selected {\n  background: #eef2ff;\n}\n\n.bank-table-empty {\n  padding: 14px 12px;\n  border: 1px solid #e3e8f2;\n  border-radius: 12px;\n  background: #fbfcfe;\n  color: #7d879b;\n  font-size: 12px;\n}\n\n.detail-form {\n  display: grid;\n  gap: 6px;\n}\n\n.detail-form__row {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 18px;\n}\n\n.detail-form__row--title {\n  margin-top: 2px;\n}\n\n.detail-form__spacer {\n  height: 10px;\n}\n\n.detail-cell {\n  display: grid;\n  grid-template-columns: 78px minmax(0, 1fr);\n  align-items: center;\n  gap: 8px;\n}\n\n.detail-cell--full {\n  grid-template-columns: 78px minmax(0, 1fr);\n}\n\n.detail-cell--split {\n  grid-template-columns: 78px 82px minmax(0, 1fr);\n}\n\n.detail-cell--combo {\n  grid-template-columns: 78px minmax(0, 1fr) 56px;\n}\n\n.detail-cell--empty {\n  visibility: hidden;\n}\n\n.detail-cell__label {\n  color: #1d2535;\n  font-size: 12px;\n  text-align: right;\n}\n\n.detail-cell__value {\n  min-height: 28px;\n  padding: 5px 8px;\n  border: 1px solid #d5dbe8;\n  background: #f9fbfe;\n  color: #1d2535;\n  font-size: 12px;\n  line-height: 1.4;\n  word-break: break-word;\n}\n\n.detail-cell__value--code,\n.detail-cell__value--short {\n  text-align: center;\n}\n\n.detail-cell__value--number {\n  text-align: right;\n}\n\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 18px;\n  background: rgba(15, 23, 42, 0.45);\n  z-index: 20;\n}\n\n.modal-panel {\n  width: min(760px, 100%);\n  max-height: calc(100vh - 36px);\n  overflow: auto;\n  padding: 18px;\n  background: #ffffff;\n  border: 1px solid #d9dfec;\n  border-radius: 18px;\n  box-shadow: 0 24px 60px rgba(32, 45, 72, 0.2);\n}\n\n.modal-panel--small {\n  width: min(520px, 100%);\n}\n\n.modal-panel__header {\n  position: sticky;\n  top: 0;\n  padding-bottom: 10px;\n  background: #ffffff;\n}\n\n.button {\n  height: 34px;\n  padding: 0 14px;\n  border: 1px solid transparent;\n  border-radius: 9px;\n  font: inherit;\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.button--primary {\n  background: linear-gradient(135deg, #5c66d6, #7882f1);\n  color: #ffffff;\n}\n\n.button--ghost {\n  border-color: #b7c7ef;\n  background: #eef4ff;\n  color: #3452a5;\n}\n\n.button--excel {\n  background: linear-gradient(135deg, #1d9b57, #39b86f);\n  color: #ffffff;\n}\n\n.button--analysis {\n  margin-right: 6px;\n}\n\n.analysis-modal {\n  display: grid;\n  gap: 12px;\n}\n\n.status-chip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 48px;\n  height: 22px;\n  padding: 0 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.status-chip--등록,\n.status-chip--삭제완료 {\n  background: #e9f7ef;\n  color: #1f7a46;\n}\n\n.status-chip--종결,\n.status-chip--전표 {\n  background: #fff4dd;\n  color: #9b6700;\n}\n\n.status-chip--송금 {\n  background: #ffe6e6;\n  color: #b23434;\n}\n\n.status-chip--상신,\n.status-chip--삭제요청,\n.status-chip--취소,\n.status-chip--반려 {\n  background: #edf1f8;\n  color: #55627a;\n}\n\n.panel__error {\n  margin: 0 0 10px;\n  color: #b23434;\n  font-size: 12px;\n  font-weight: 700;\n}\n\n@media (max-width: 1200px) {\n  .content-grid,\n  .content-grid--editing {\n    grid-template-columns: 1fr;\n  }\n\n  .editor-panel {\n    max-height: 42vh;\n  }\n}\n\n@media (max-width: 920px) {\n  .dev-user-bar,\n  .panel__title-row,\n  .summary-bar,\n  .bank-selector__header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .action-groups {\n    grid-template-columns: 1fr;\n  }\n\n  .search-grid,\n  .editor-grid,\n    .detail-form__row {\n      grid-template-columns: 1fr;\n      gap: 8px;\n    }\n\n    .field--radio,\n    .field--full {\n      grid-column: 1 / -1;\n    }\n\n  .modal-backdrop {\n    padding: 12px;\n  }\n}\n\n@media (max-width: 640px) {\n  .search-grid,\n  .editor-grid,\n    .bank-preview {\n      grid-template-columns: 1fr;\n    }\n\n  .calc-links {\n    flex-direction: column;\n    gap: 4px;\n  }\n}\n\r\n\r\n.button--approval {\r\n  background: #d97a12;\r\n  border-color: #d97a12;\r\n  color: #ffffff;\r\n}\r\n\r\n.field__radios--vendor {\r\n  gap: 12px;\r\n}\r\n\r\n.field__radio-item {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 2px;\r\n}\r\n\r\n.field .p-dropdown {\r\n  width: 100%;\r\n  min-width: 0;\r\n  height: 38px;\r\n  border-radius: 4px !important;\r\n}\r\n\r\n.field .p-dropdown .p-dropdown-label {\r\n  padding-top: 9px;\r\n  padding-bottom: 9px;\r\n  font-size: 12px;\r\n}\r\n\r\n.field .p-radiobutton .p-radiobutton-box {\r\n  border-radius: 2px !important;\r\n}\r\n\r\n.table-wrap .p-datatable {\r\n  width: 100%;\r\n}\r\n\r\n.table-wrap .p-datatable-wrapper {\r\n  width: 100%;\r\n  overflow: auto !important;\r\n}\r\n\r\n.table-wrap .p-datatable-table {\r\n  width: 100%;\r\n  min-width: 1500px;\r\n}\r\n\r\n.table-wrap .p-datatable .p-datatable-thead > tr > th,\r\n.table-wrap .p-datatable .p-datatable-tbody > tr > td {\r\n  padding: 0.22rem 0.45rem;\r\n  font-size: 11px;\r\n}\r\n\r\n.table-wrap .p-datatable .p-datatable-tbody > tr {\r\n  height: 1.55rem;\r\n}\r\n\r\n\r\n.af-table-wrap .p-datatable {\r\n  height: 100%;\r\n}\r\n\r\n.af-table-wrap .p-datatable-scrollable-wrapper,\r\n.af-table-wrap .p-datatable-scrollable-view {\r\n  border-radius: 0 !important;\r\n}\r\n\r\n.af-table-wrap .p-datatable .p-datatable-header,\r\n.af-table-wrap .p-datatable .p-datatable-footer {\r\n  border-radius: 0 !important;\r\n}\r\n\r\n.af-table-wrap .p-datatable .p-datatable-wrapper::-webkit-scrollbar {\r\n  height: 10px;\r\n  width: 10px;\r\n}\r\n\r\n\n/* final vendor override */\n.panel,\n.action-group,\n.table-wrap,\n.summary-bar,\n.bank-selector__header,\n.bank-table-wrap,\n.bank-table-empty,\n.modal-panel,\n.field input,\n.field select,\n.field textarea,\n.field .p-dropdown,\n.field .p-inputtext,\n.field .p-calendar .p-inputtext,\n.field .p-dropdown-panel,\n.button,\n.button--ghost,\n.button--primary,\n.button--excel,\n.button--approval {\n  border-radius: 0 !important;\n}\n\n.panel,\n.modal-panel {\n  box-shadow: none !important;\n}\n\n.button,\n.button--primary,\n.button--ghost,\n.button--excel,\n.button--approval {\n  min-width: 54px;\n  height: 24px !important;\n  padding: 0 10px !important;\n  font-size: 10px !important;\n  line-height: 22px !important;\n}\n\n.button--ghost {\n  background: #6670e8 !important;\n  border-color: #6670e8 !important;\n  color: #ffffff !important;\n}\n\n.button--approval {\n  background: #d97a12 !important;\n  border-color: #d97a12 !important;\n  color: #ffffff !important;\n}\n\n.table-wrap {\n  overflow: hidden !important;\n}\n\n.af-table-wrap,\n.af-table-wrap .p-datatable,\n.af-table-wrap .p-datatable-scrollable-wrapper,\n.af-table-wrap .p-datatable-scrollable-view,\n.af-table-wrap .p-datatable-wrapper {\n  width: 100% !important;\n  max-width: 100% !important;\n}\n\n.af-table-wrap .p-datatable-scrollable-wrapper,\n.af-table-wrap .p-datatable-scrollable-view {\n  overflow: hidden !important;\n}\n\n.af-table-wrap .p-datatable-wrapper {\n  overflow: auto !important;\n}\n\n.af-table-wrap .p-datatable-table {\n  width: 100% !important;\n  min-width: 1500px !important;\n}\r\n\n/* final button/header tuning */\n.af-table-wrap .p-datatable .p-datatable-thead > tr > th,\n.af-table-wrap .p-datatable .p-sortable-column,\n.af-table-wrap .sort-button,\n.af-table-wrap .t-header {\n  color: #000000 !important;\n}\n\n.button,\n.button--primary,\n.button--ghost,\n.button--excel,\n.button--approval {\n  min-width: 44px !important;\n  height: 24px !important;\n  padding: 0 8px !important;\n  font-size: 10px !important;\n  line-height: 22px !important;\n  border-radius: 6px !important;\n}\n\n.panel,\n.action-group,\n.table-wrap,\n.summary-bar,\n.bank-selector__header,\n.bank-table-wrap,\n.bank-table-empty,\n.modal-panel,\n.field input,\n.field select,\n.field textarea,\n.field .p-dropdown,\n.field .p-inputtext,\n.field .p-calendar .p-inputtext,\n.field .p-dropdown-panel {\n  border-radius: 0 !important;\n}\r\n\n/* final button polish */\n.button,\n.button--primary,\n.button--ghost,\n.button--excel,\n.button--approval {\n  min-width: 38px !important;\n  height: 22px !important;\n  padding: 0 7px !important;\n  font-size: 10px !important;\n  line-height: 20px !important;\n  border-radius: 7px !important;\n}\n\n.button--primary,\n.button--ghost,\n.button--ghost:not(:disabled),\n.button--excel,\n.button--excel:not(:disabled) {\n  background: #6670e8 !important;\n  border-color: #6670e8 !important;\n  color: #ffffff !important;\n}\n\n.button--approval,\n.button--approval:not(:disabled) {\n  background: #d97a12 !important;\n  border-color: #d97a12 !important;\n  color: #ffffff !important;\n}\n\n.button:disabled,\n.button--primary:disabled,\n.button--ghost:disabled,\n.button--excel:disabled,\n.button--approval:disabled {\n  opacity: 0.55 !important;\n}\r\n\r\n\r\n";

const ensureInlineStyle = () => {
  if (typeof document === 'undefined' || document.getElementById(INLINE_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = INLINE_STYLE_ID;
  style.textContent = INLINE_STYLE_TEXT;
  document.head.appendChild(style);
};

const ensureInlineStylePatch = () => {
  const patchId = 'frm206-inline-style-patch';
  if (typeof document === 'undefined' || document.getElementById(patchId)) {
    return;
  }

  const style = document.createElement('style');
  style.id = patchId;
  style.textContent = `
.load-row__field {
  width: 100% !important;
}

.load-row > label.field {
  flex: 0 0 calc((100% - 12px) / 2) !important;
  width: calc((100% - 12px) / 2) !important;
  max-width: calc((100% - 12px) / 2) !important;
}

.load-row__field .p-dropdown {
  width: 100% !important;
  height: 38px !important;
  min-height: 38px !important;
  display: flex !important;
  align-items: center !important;
}

.load-row > .button {
  align-self: flex-end;
  margin-top: 18px;
}

.load-row__field .p-dropdown .p-dropdown-label {
  display: flex !important;
  align-items: center !important;
  height: 36px !important;
  min-height: 36px !important;
  padding: 0 10px !important;
  line-height: 36px !important;
  font-size: 12px !important;
}

.load-row__field .p-dropdown .p-dropdown-trigger {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 36px !important;
  min-height: 36px !important;
}

.button--calc,
.button--calc:not(:disabled) {
  background: #6670e8 !important;
  border-color: #6670e8 !important;
  color: #ffffff !important;
  text-decoration: none !important;
}

.button--calc:disabled {
  opacity: 0.55 !important;
}

.search-panel .button.button--excel,
.search-panel .button.button--excel:not(:disabled) {
  background: #1d9b57 !important;
  border-color: #1d9b57 !important;
  color: #ffffff !important;
}

.gw-search-modal {
  display: grid;
  gap: 12px;
}

.gw-search-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: end;
}

.gw-search-results {
  max-height: 320px;
  overflow: auto;
  border: 1px solid #e3e8f2;
  border-radius: 12px;
}

.gw-search-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
}

.gw-search-table th,
.gw-search-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #edf1f7;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
}

.gw-search-table th {
  position: sticky;
  top: 0;
  background: #f3f6fb;
  color: #516078;
  z-index: 1;
}

.gw-search-empty {
  padding: 16px 12px;
  color: #7d879b;
  font-size: 12px;
}

.expense-performance-modal {
  display: grid;
  gap: 12px;
}

.expense-performance-toolbar {
  display: flex;
  align-items: end;
  gap: 10px;
}

.expense-performance-toolbar .field {
  min-width: 120px;
}

.expense-performance-note {
  margin: 0;
  color: #b23434;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
}

.expense-performance-results {
  max-height: 320px;
  overflow: auto;
  border: 1px solid #e3e8f2;
  border-radius: 12px;
}

.expense-performance-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
}

.expense-performance-table th,
.expense-performance-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #edf1f7;
  font-size: 12px;
  white-space: nowrap;
}

.expense-performance-table th {
  position: sticky;
  top: 0;
  background: #f3f6fb;
  color: #516078;
  text-align: left;
  z-index: 1;
}

.expense-performance-table td.is-number {
  text-align: right;
}

.expense-performance-row--n {
  background: #fff3f6;
}

.expense-performance-row--e {
  background: #ecfbff;
}

.expense-performance-row--r {
  background: #f3fff0;
}

.expense-performance-row--negative td {
  color: #d14d4d;
}

.expense-performance-empty {
  padding: 16px 12px;
  color: #7d879b;
  font-size: 12px;
}

.action-groups--with-hr {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.modal-panel--hr-etc {
  width: min(1280px, 96vw);
  min-width: min(1000px, 96vw);
}

.hr-etc-modal {
  display: grid;
  gap: 14px;
}

.hr-etc-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hr-etc-form {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px 12px;
}

.hr-etc-results {
  max-height: 420px;
  overflow: auto;
  border: 1px solid #e3e8f2;
  border-radius: 12px;
}

.hr-etc-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  background: #ffffff;
}

.hr-etc-table th,
.hr-etc-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #edf1f7;
  font-size: 12px;
  white-space: nowrap;
  text-align: left;
}

.hr-etc-table th {
  position: sticky;
  top: 0;
  background: #f3f6fb;
  color: #516078;
  z-index: 1;
}

.hr-etc-table td.is-number {
  text-align: right;
}

.hr-etc-empty {
  padding: 16px 12px;
  color: #7d879b;
  font-size: 12px;
}

.hr-etc-help {
  margin: 0;
  color: #7d879b;
  font-size: 12px;
  line-height: 1.5;
}

.hr-etc-file-input {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.modal-panel--insurance {
  width: min(1320px, 96vw);
  min-width: min(1000px, 96vw);
}

.insurance-modal {
  display: grid;
  gap: 14px;
}

.insurance-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.insurance-form {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px 12px;
}

.insurance-request-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 12px;
}

.insurance-request-item {
  padding: 10px 12px;
  border: 1px solid #e3e8f2;
  background: #f8faff;
}

.insurance-request-item strong,
.insurance-request-item span {
  display: block;
  font-size: 12px;
  line-height: 1.6;
}

.insurance-request-item strong {
  color: #516078;
}

.insurance-request-item span {
  color: #1d2535;
  font-weight: 700;
}

.insurance-results,
.insurance-mappings {
  max-height: 320px;
  overflow: auto;
  border: 1px solid #e3e8f2;
  border-radius: 12px;
}

.insurance-table,
.insurance-mapping-table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  background: #ffffff;
}

.insurance-table th,
.insurance-table td,
.insurance-mapping-table th,
.insurance-mapping-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #edf1f7;
  font-size: 12px;
  white-space: nowrap;
  text-align: left;
}

.insurance-table th,
.insurance-mapping-table th {
  position: sticky;
  top: 0;
  background: #f3f6fb;
  color: #516078;
  z-index: 1;
}

.insurance-table td.is-number {
  text-align: right;
}

.insurance-empty {
  padding: 16px 12px;
  color: #7d879b;
  font-size: 12px;
}

.insurance-help {
  margin: 0;
  color: #7d879b;
  font-size: 12px;
  line-height: 1.5;
}

.insurance-file-input {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 1180px) {
  .hr-etc-form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .insurance-form,
  .insurance-request-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .hr-etc-form {
    grid-template-columns: 1fr;
  }

  .insurance-form,
  .insurance-request-grid {
    grid-template-columns: 1fr;
  }
}
`;
  document.head.appendChild(style);
};

ensureInlineStylePatch();

let cachedLoginUser = null;

const normalizeLoginInfo = (value) => {
  if (Array.isArray(value)) {
    return value[0] || {};
  }

  return value || {};
};

const getStoredDevUser = () => {
  if (cachedLoginUser) {
    return cachedLoginUser;
  }

  const serviceLib = new ServiceLib();
  if (typeof serviceLib.loginConfirm === 'function') {
    serviceLib.loginConfirm();
  }

  const loginInfo = normalizeLoginInfo(typeof serviceLib.getUserInfo === 'function' ? serviceLib.getUserInfo() : {});
  cachedLoginUser = {
    userId: String(loginInfo.USER_ID ?? ''),
    part: String(loginInfo.PART ?? ''),
    partNm: String(loginInfo.PART_NM ?? loginInfo.PARTNM ?? loginInfo.DEPT_NM ?? loginInfo.DEPTNM ?? loginInfo.TEAM_NM ?? loginInfo.TEAMNM ?? loginInfo.PART ?? '')
  };

  return cachedLoginUser;
};

ensureInlineStyle();
ensureInlineStylePatch();

const formatAmount = (value) => new Intl.NumberFormat('ko-KR', {
  maximumFractionDigits: 2
}).format(value);
const toNumber = (value) => {
  const parsed = Number(value.replace(/,/g, '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
};
const isBlankNumber = (value) => value.trim() === '';
const normalizeAnalysisDate = (value) => {
  const digits = String(value !== null && value !== void 0 ? value : '').replace(/[^0-9]/g, '');
  if (digits.length !== 8) {
    return '';
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};
const isWeekend = (value) => {
  if (!value) {
    return false;
  }
  const date = new Date(`${value}T00:00:00`);
  const day = date.getDay();
  return day === 0 || day === 6;
};
const getLastWeekdayOfMonth = (monthValue, targetDay) => {
  if (!monthValue) {
    return '';
  }
  const [yearText, monthText] = monthValue.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  if (!Number.isFinite(year) || !Number.isFinite(month)) {
    return '';
  }
  const date = new Date(year, month, 0);
  while (date.getDay() !== targetDay) {
    date.setDate(date.getDate() - 1);
  }
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
const normalizeLegacyDateValue = (value) => {
  const digits = String(value ?? '').replace(/[^0-9]/g, '');
  if (digits.length !== 8) {
    return '';
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};
const getMonthValueFromDate = (value) => {
  const normalized = normalizeLegacyDateValue(value);
  return normalized ? normalized.slice(0, 7) : '';
};
const getMonthlyRequestDate = (monthValue, currency) => getLastWeekdayOfMonth(monthValue, currency === 'KRW' ? 5 : 3);
const toFormValues = (detail) => {
  var _a, _b, _c, _d, _e;
  const normalizedDocumentDate = normalizeLegacyDateValue(detail.documentDate);
  const normalizedRequestDate = normalizeLegacyDateValue(detail.requestDate);
  const normalizedRequestMonth = getMonthValueFromDate(detail.requestDate);
  return {
    id: detail.id,
    status: detail.status,
    statusCode: detail.statusCode,
    documentDate: normalizedDocumentDate || detail.documentDate,
    requestDate: normalizedRequestDate || detail.requestDate,
    requestMonth: normalizedRequestMonth,
    costCenterCode: detail.costCenterCode,
    accountCode: detail.accountCode,
    currency: detail.currency,
    amount: String((_a = detail.amount) !== null && _a !== void 0 ? _a : 0),
    vat: String((_b = detail.vat) !== null && _b !== void 0 ? _b : 0),
    total: String((_c = detail.total) !== null && _c !== void 0 ? _c : 0),
    minAmount: String((_d = detail.minAmount) !== null && _d !== void 0 ? _d : 0),
    actualAmount: String((_e = detail.actualAmount) !== null && _e !== void 0 ? _e : 0),
    supplierCode: detail.supplierCode,
    bankCode: detail.bankCode,
    remark: detail.remark,
    actOption: detail.actOption,
    actRemark: detail.actRemark,
    taxCode: detail.taxCode,
    payTypeCode: detail.payTypeCode,
    requestTypeCode: detail.requestTypeCode,
    cardCode: detail.cardCode,
    bankName: detail.bankName,
    accountNo: detail.accountNo,
    bankAccountName: detail.bankAccountName,
    swiftCode: detail.swiftCode,
    bankBranch: detail.bankBranch
  };
};
const toSavePayload = (form) => ({
  documentDate: form.documentDate,
  requestDate: form.payTypeCode === '4' ? getMonthlyRequestDate(form.requestMonth, form.currency) : form.requestDate,
  costCenterCode: form.costCenterCode,
  accountCode: form.accountCode,
  currency: form.currency,
  amount: toNumber(form.amount),
  vat: toNumber(form.vat),
  total: toNumber(form.total),
  minAmount: toNumber(form.minAmount),
  actualAmount: toNumber(form.actualAmount),
  supplierCode: form.supplierCode,
  bankCode: form.bankCode,
  remark: form.remark.trim(),
  actOption: form.actOption,
  actRemark: form.actOption === '없음' ? '' : form.actRemark.trim(),
  taxCode: form.taxCode,
  payTypeCode: form.payTypeCode,
  requestTypeCode: form.requestTypeCode,
  cardCode: form.cardCode
});
const isEditableStatus = (statusCode) => statusCode === '0' || statusCode === '5';
const getDetailValue = (value) => {
  const text = String(value !== null && value !== void 0 ? value : '').trim();
  return text || '-';
};
const escapeHtml = (value) => String(value !== null && value !== void 0 ? value : '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');
const normalizeHrEtcNumberInput = (value) => String(value !== null && value !== void 0 ? value : '').replace(/[^0-9.-]/g, '');
const isHrEtcInvoiceComplete = (formValue) => Boolean(formValue.documentDate && formValue.requestDate && !isBlankNumber(formValue.amount) && !isBlankNumber(formValue.vat) && !isBlankNumber(formValue.total));
const normalizeInsuranceMonthInput = (value) => String(value !== null && value !== void 0 ? value : '').replace(/[^0-9-]/g, '').slice(0, 7);
const isInsuranceUploadReady = (formValue) => Boolean(formValue.targetMonth && formValue.documentDate);
const getRegisteredUserId = (row) => String((row === null || row === void 0 ? void 0 : row.regInfo) || '').split('/')[0].trim().toLowerCase();
const getExpensePerformanceRowClassName = (row) => {
  const classes = [];
  const rowType = String(row.rowType || '').toUpperCase();
  if (rowType) {
    classes.push(`expense-performance-row--${rowType.toLowerCase()}`);
  }
  if (Number(row.remainAmount) < 0) {
    classes.push('expense-performance-row--negative');
  }
  return classes.join(' ');
};
const downloadAoaAsXlsx = async (sheetName, rows, fileName) => {
  const exceljs = await import('exceljs');
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  rows.forEach((row) => {
    worksheet.addRow(row);
  });
  if (rows.length > 0) {
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D9EAF7' }
      };
      cell.font = {
        bold: true
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'CFD7E6' } },
        left: { style: 'thin', color: { argb: 'CFD7E6' } },
        bottom: { style: 'thin', color: { argb: 'CFD7E6' } },
        right: { style: 'thin', color: { argb: 'CFD7E6' } }
      };
    });
  }
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const length = String(cell.value ?? '').length + 2;
      if (length > maxLength) {
        maxLength = length;
      }
    });
    column.width = Math.min(Math.max(maxLength, 12), 24);
  });
  const excelBuffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
};
function Frm206Page() {
  var _a, _b;
  const [filters, setFilters] = useState(() => getDefaultFrm206Filters());
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [checkedIds, setCheckedIds] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [listErrorMessage, setListErrorMessage] = useState('');
  const [editorErrorMessage, setEditorErrorMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [editorMode, setEditorMode] = useState('view');
  const [devUser] = useState(getStoredDevUser());
  const [sortKey, setSortKey] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');
  const [banks, setBanks] = useState([]);
  const [options, setOptions] = useState({
    ...defaultFrm206Options,
    currentUser: {
      userId: getStoredDevUser().userId,
      userName: getStoredDevUser().userId,
      empNo: '',
      part: getStoredDevUser().part,
      cdFlag: getStoredDevUser().part,
      cdName: getStoredDevUser().partNm || getStoredDevUser().part,
      isAdmin: false
    }
  });
  const [form, setForm] = useState(createEmptyFrm206Form());
  const editorInputRefs = useRef(bufferedEditorKeys.reduce((acc, key) => ({
    ...acc,
    [key]: null
  }), {}));
  const [accountingDate, setAccountingDate] = useState(new Date().toISOString().slice(0, 10));
  const [loadTemplates, setLoadTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [analysisFile, setAnalysisFile] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [isGwSearchOpen, setIsGwSearchOpen] = useState(false);
  const [gwSearchText, setGwSearchText] = useState('');
  const [gwSearchRows, setGwSearchRows] = useState([]);
  const [gwSearchLoading, setGwSearchLoading] = useState(false);
  const [gwSearchErrorMessage, setGwSearchErrorMessage] = useState('');
  const [isExpensePerformanceOpen, setIsExpensePerformanceOpen] = useState(false);
  const [expensePerformanceYear, setExpensePerformanceYear] = useState(String(new Date().getFullYear()));
  const [expensePerformanceRows, setExpensePerformanceRows] = useState([]);
  const [expensePerformanceLoading, setExpensePerformanceLoading] = useState(false);
  const [expensePerformanceErrorMessage, setExpensePerformanceErrorMessage] = useState('');
  const [isHrEtcOpen, setIsHrEtcOpen] = useState(false);
  const [hrEtcMode, setHrEtcMode] = useState('quick');
  const [hrEtcForm, setHrEtcForm] = useState(createDefaultHrEtcForm());
  const [hrEtcRows, setHrEtcRows] = useState([]);
  const [hrEtcLoading, setHrEtcLoading] = useState(false);
  const [hrEtcSubmitting, setHrEtcSubmitting] = useState(false);
  const [hrEtcErrorMessage, setHrEtcErrorMessage] = useState('');
  const [hrEtcSuccessMessage, setHrEtcSuccessMessage] = useState('');
  const hrEtcPendingFormRef = useRef(createDefaultHrEtcForm());
  const hrEtcModeRef = useRef('quick');
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [insuranceForm, setInsuranceForm] = useState(createDefaultInsuranceForm());
  const [insuranceRows, setInsuranceRows] = useState([]);
  const [insuranceMappings, setInsuranceMappings] = useState([]);
  const [insuranceLoading, setInsuranceLoading] = useState(false);
  const [insuranceSubmitting, setInsuranceSubmitting] = useState(false);
  const [insuranceMappingsLoading, setInsuranceMappingsLoading] = useState(false);
  const [insuranceErrorMessage, setInsuranceErrorMessage] = useState('');
  const [insuranceSuccessMessage, setInsuranceSuccessMessage] = useState('');
  const insurancePendingFormRef = useRef(createDefaultInsuranceForm());
  const canOpenGwSearch = ['lkj83', 'lih7912', 'won21kr', 'chibumy', 'brandon'].includes(String(options.currentUser.userId || '').toLowerCase());
  const canOpenHrEtc = hrEtcAllowedParts.includes(String(options.currentUser.part || devUser.part || '').toUpperCase());
  const expensePerformanceYearOptions = useMemo(() => {
    return [{ label: '2026', value: '2026' }];
  }, []);
  const sortedRows = useMemo(() => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    return [...rows].sort((left, right) => {
      const leftValue = left[sortKey];
      const rightValue = right[sortKey];
      if (typeof leftValue === 'number' && typeof rightValue === 'number') {
        return (leftValue - rightValue) * direction;
      }
      return String(leftValue).localeCompare(String(rightValue), 'ko-KR', { numeric: true }) * direction;
    });
  }, [rows, sortDirection, sortKey]);
  const selectedRow = (_b = (_a = rows.find((row) => row.id === selectedId)) !== null && _a !== void 0 ? _a : sortedRows.find((row) => row.id === selectedId)) !== null && _b !== void 0 ? _b : null;
  const checkedRows = useMemo(() => rows.filter((row) => checkedIds.includes(row.id)), [checkedIds, rows]);
  const amountSummary = useMemo(() => {
    return checkedRows.reduce((acc, row) => {
      var _a;
      acc[row.currency] = ((_a = acc[row.currency]) !== null && _a !== void 0 ? _a : 0) + row.actualAmount;
      return acc;
    }, {});
  }, [checkedRows]);
  const summaryText = Object.entries(amountSummary)
    .map(([currency, amount]) => `${currency}: ${formatAmount(amount)}`)
    .join('  ');
  const canEditCurrent = editorMode === 'create' || isEditableStatus(form.statusCode);
  const isEditorVisible = editorMode !== 'view';
  const isFormReadOnly = editorMode === 'view';
  const isDeductionDisabled = isFormReadOnly || !form.actOption || form.actOption === '없음';
  const showEditorAlert = (message) => {
    setEditorErrorMessage(message);
    window.alert(message);
  };
  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };
  const isBlockedAllPeriodSearch = (targetFilters) => targetFilters.dateType === 'all' &&
  targetFilters.status === 'ALL' &&
  !targetFilters.costCenter &&
  !targetFilters.account &&
  !targetFilters.supplier;
  const handleDateTypeChange = (value) => {
    const defaultFilters = getDefaultFrm206Filters();
    const nextFilters = value === 'all' ?
    { ...filters, dateType: value, fromDate: '', toDate: '' } :
    { ...filters, dateType: value, fromDate: filters.fromDate || defaultFilters.fromDate, toDate: filters.toDate || defaultFilters.toDate };
    setFilters(nextFilters);
    setCheckedIds([]);
    setIsDetailOpen(false);
    setSaveMessage('');
    setForm(createEmptyFrm206Form());
    setEditorMode('view');
    setBanks([]);
    if (isBlockedAllPeriodSearch(nextFilters)) {
      setRows([]);
      setSelectedId('');
      setListErrorMessage('모든기간 전체조회는 데이터가 많아 지원하지 않습니다. 상태 또는 검색 조건을 지정해 주세요.');
      return;
    }
    void loadRows(nextFilters);
  };
  const syncCalculatedAmounts = (nextForm) => {
    const amountBlank = isBlankNumber(nextForm.amount);
    const vatBlank = isBlankNumber(nextForm.vat);
    const minAmountBlank = isBlankNumber(nextForm.minAmount);
    const amount = toNumber(nextForm.amount);
    const vat = toNumber(nextForm.vat);
    const minAmount = toNumber(nextForm.minAmount);
    const total = amount + vat;
    const actualAmount = total - minAmount;
    const totalText = amountBlank && vatBlank ? '' : String(total);
    const actualAmountText = amountBlank && vatBlank && minAmountBlank ? '' : String(actualAmount);
    return {
      ...nextForm,
      total: totalText,
      actualAmount: actualAmountText
    };
  };
  const loadOptions = useCallback(async () => {
    const data = await fetchFrm206Options(devUser);
    const payTypeMap = new Map((Array.isArray(data.payTypeOptions) ? data.payTypeOptions : []).map((item) => [String(item.value ?? ''), item]));
    const normalizedPayTypeOptions = defaultFrm206Options.payTypeOptions.map((item) => {
      const source = payTypeMap.get(item.value);
      return {
        value: String(source?.value ?? item.value),
        label: item.label
      };
    });
    const normalizedActOptions = (() => {
      const source = Array.isArray(data.actOptions) && data.actOptions.length > 0 ? data.actOptions.map((item) => String(item)) : defaultFrm206Options.actOptions;
      const deduped = Array.from(new Set(['없음', ...source.filter((item) => item && item !== '없음')]));
      return deduped;
    })();
    setOptions({
      ...defaultFrm206Options,
      ...data,
      currencies: Array.isArray(data.currencies) && data.currencies.length > 0 ? data.currencies : defaultFrm206Options.currencies,
      actOptions: normalizedActOptions,
      payTypeOptions: normalizedPayTypeOptions,
      requestTypeOptions: Array.isArray(data.requestTypeOptions) && data.requestTypeOptions.length > 0 ? data.requestTypeOptions : defaultFrm206Options.requestTypeOptions,
      taxTypeOptions: Array.isArray(data.taxTypeOptions) && data.taxTypeOptions.length > 0 ? data.taxTypeOptions : defaultFrm206Options.taxTypeOptions,
      cardOptions: Array.isArray(data.cardOptions) && data.cardOptions.length > 0 ? data.cardOptions : defaultFrm206Options.cardOptions
    });
  }, [devUser]);
  const loadRows = useCallback(async (nextFilters) => {
    setLoading(true);
    setListErrorMessage('');
    try {
      const data = await fetchFrm206Rows(nextFilters, devUser);
      const currentPart = String((options.currentUser.part || devUser.part || '')).toUpperCase();
      const currentUserId = String((options.currentUser.userId || devUser.userId || '')).trim().toLowerCase();
      const filteredData = currentPart === 'M02' ? data.filter((row) => getRegisteredUserId(row) === currentUserId) : data;
      setRows(filteredData);
      setLoadTemplates(filteredData.map(toLoadTemplateOption));
      setSelectedId((current) => {var _a, _b;return filteredData.some((row) => row.id === current) ? current : (_b = (_a = filteredData[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '';});
      setCheckedIds((current) => current.filter((id) => filteredData.some((row) => row.id === id)));
      return filteredData;
    }
    catch (error) {
      setRows([]);
      setLoadTemplates([]);
      setSelectedId('');
      setCheckedIds([]);
      setListErrorMessage(error instanceof Error ? error.message : '조회 중 오류가 발생했습니다.');
      return [];
    } finally
    {
      setLoading(false);
    }
  }, [devUser, options.currentUser.part, options.currentUser.userId]);
  const loadBanks = async (vendorCode, selectedBankCode) => {
    if (!vendorCode) {
      setBanks([]);
      return;
    }
    try {
      const bankRows = await fetchFrm206Banks(vendorCode);
      setBanks(bankRows);
      if (selectedBankCode) {
        const matchedBank = bankRows.find((bank) => bank.code === selectedBankCode);
        if (matchedBank) {
          setForm((current) => ({
            ...current,
            bankCode: matchedBank.code,
            bankName: matchedBank.name,
            accountNo: matchedBank.accountNo,
            bankAccountName: matchedBank.accountName,
            swiftCode: matchedBank.swiftCode,
            bankBranch: matchedBank.branch
          }));
        }
      }
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '은행 목록을 불러오지 못했습니다.');
    }
  };
  const loadDetail = async (id, nextMode = 'view') => {
    if (!id) {
      setForm(createEmptyFrm206Form());
      setBanks([]);
      setDetailData(null);
      setEditorMode(nextMode);
      return;
    }
    setDetailLoading(true);
    setSaveMessage('');
    setEditorErrorMessage('');
    try {
      const detail = await fetchFrm206Detail(id, devUser);
      const nextForm = syncCalculatedAmounts(toFormValues(detail));
      setForm(nextForm);
      setDetailData(detail);
      setEditorMode(nextMode);
      await loadBanks(detail.supplierCode, detail.bankCode);
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '상세 데이터를 불러오지 못했습니다.');
    } finally
    {
      setDetailLoading(false);
    }
  };
  useEffect(() => {
    const defaultFilters = getDefaultFrm206Filters();
    setFilters(defaultFilters);
    void Promise.all([loadOptions(), loadRows(defaultFilters)]).catch((error) => {
      setListErrorMessage(error instanceof Error ? error.message : '초기 데이터 로딩에 실패했습니다.');
    });
  }, [devUser, loadOptions, loadRows]);
  useEffect(() => {
    const bufferedValues = {
      remark: form.remark,
      total: form.total,
      amount: form.amount,
      vat: form.vat
    };
    const syncInputValue = (key) => {
      const element = editorInputRefs.current[key];
      if (!element || document.activeElement === element) {
        return;
      }
      const nextValue = String(bufferedValues[key] ?? '');
      if (element.value !== nextValue) {
        element.value = nextValue;
      }
    };
    bufferedEditorKeys.forEach(syncInputValue);
  }, [form.remark, form.total, form.amount, form.vat]);
  const handleReset = () => {
    const defaultFilters = getDefaultFrm206Filters();
    setFilters(defaultFilters);
    setCheckedIds([]);
    setIsDetailOpen(false);
    setIsGwSearchOpen(false);
    setIsExpensePerformanceOpen(false);
    setSaveMessage('');
    setForm(createEmptyFrm206Form());
    setDetailData(null);
    setEditorMode('view');
    setBanks([]);
    void loadRows(defaultFilters);
  };
  const handleSearch = () => {
    if (isBlockedAllPeriodSearch(filters)) {
      setRows([]);
      setSelectedId('');
      setListErrorMessage('모든기간 전체조회는 데이터가 많아 지원하지 않습니다. 상태 또는 검색 조건을 지정해 주세요.');
      return;
    }
    setCheckedIds([]);
    setIsDetailOpen(false);
    setIsGwSearchOpen(false);
    setIsExpensePerformanceOpen(false);
    setSaveMessage('');
    setForm(createEmptyFrm206Form());
    setDetailData(null);
    setEditorMode('view');
    setBanks([]);
    setAccountingDate(new Date().toISOString().slice(0, 10));
    void loadRows(filters);
  };
  const downloadExcelReport = () => {
    const headers = ['CODE', '상태', '증빙일', '송금요청일', '송금구분', '송금일', '코스트센터', '계정과목', '환종', '실송금액', '거래처', '카드결제', '송금방법구분', '은행코드', 'TITLE'];
    const rowsForExport = sortedRows.map((row) => [
    row.id,
    row.status,
    row.documentDate,
    row.requestDate,
    row.payType,
    row.actualDate || '',
    row.costCenterName,
    row.accountName,
    row.currency,
    formatAmount(row.actualAmount),
    row.supplierName,
    row.cardLabel,
    row.requestMethod,
    row.bankCode,
    row.title]
    );
    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="utf-8" />
        <style>
          table { border-collapse: collapse; font-family: Malgun Gothic, sans-serif; font-size: 12px; }
          th, td { border: 1px solid #cfd7e6; padding: 6px 8px; white-space: nowrap; }
          th { background: #eef3fb; }
          .num { text-align: right; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rowsForExport
    .map((cells) => `<tr>${cells
    .map((cell, index) => `<td class="${index === 9 ? 'num' : ''}">${String(cell !== null && cell !== void 0 ? cell : '')}</td>`)
    .join('')}</tr>`)
    .join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `Frm206_List_${new Date().toISOString().replace(/[:T]/g, '').slice(0, 14)}.xls`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const handleOpenGwSearch = () => {
    setGwSearchText('');
    setGwSearchRows([]);
    setGwSearchErrorMessage('');
    setGwSearchLoading(false);
    setIsGwSearchOpen(true);
  };
  const loadExpensePerformance = useCallback(async (year) => {
    try {
      setExpensePerformanceLoading(true);
      setExpensePerformanceErrorMessage('');
      const rows = await fetchFrm206SellingExpensePerformance(year, devUser);
      setExpensePerformanceRows(rows);
    }
    catch (error) {
      setExpensePerformanceRows([]);
      setExpensePerformanceErrorMessage(error instanceof Error ? error.message : '판관비실적조회 중 오류가 발생했습니다.');
    } finally
    {
      setExpensePerformanceLoading(false);
    }
  }, [devUser]);
  const handleOpenExpensePerformance = useCallback(() => {
    setExpensePerformanceErrorMessage('');
    setExpensePerformanceRows([]);
    setExpensePerformanceYear(String(new Date().getFullYear()));
    setIsExpensePerformanceOpen(true);
  }, []);
  const handleResetHrEtc = useCallback(() => {
    setHrEtcForm(createDefaultHrEtcForm());
    setHrEtcRows([]);
    setHrEtcErrorMessage('');
    setHrEtcSuccessMessage('');
  }, []);
  const handleOpenHrEtc = useCallback((mode) => {
    setHrEtcMode(mode);
    setHrEtcForm(createDefaultHrEtcForm());
    setHrEtcRows([]);
    setHrEtcErrorMessage('');
    setHrEtcSuccessMessage('');
    setHrEtcLoading(false);
    setHrEtcSubmitting(false);
    setIsHrEtcOpen(true);
  }, []);
  const handleDownloadHrEtcTemplate = useCallback(async () => {
    const isMro = hrEtcMode === 'mro';
    const rows = isMro ? [['금액', '부서코드']] : [['요금', '적요(바이어)']];
    const fileName = `${isMro ? 'MRO' : '퀵서비스'}_양식_${new Date().toISOString().replace(/[:T]/g, '').slice(0, 14)}.xlsx`;
    await downloadAoaAsXlsx('Sheet1', rows, fileName);
  }, [hrEtcMode]);
  const handleHrEtcUpload = useCallback(async (file, nextForm = hrEtcForm) => {
    if (!file) {
      return;
    }
    if (!isHrEtcInvoiceComplete(nextForm)) {
      const message = '증빙일, 송금요청일, 계산서 금액(공급가액/부가세/총액)을 먼저 입력해 주세요.';
      setHrEtcErrorMessage(message);
      window.alert(message);
      return;
    }
    try {
      setHrEtcLoading(true);
      setHrEtcErrorMessage('');
      setHrEtcSuccessMessage('');
      if (hrEtcRows.length > 0) {
        setHrEtcRows([]);
      }
      const modeOption = hrEtcModeOptions[hrEtcMode] || hrEtcModeOptions.quick;
      const rows = await uploadFrm206HrEtcExcel(modeOption.apiType, nextForm, file, devUser);
      setHrEtcRows(rows);
      if (rows.length > 0) {
        setHrEtcSuccessMessage(`${modeOption.label} 내역 ${rows.length}건을 불러왔습니다.`);
      } else {
        setHrEtcErrorMessage('업로드 결과가 없습니다. API 응답 형식 또는 엑셀 파싱 결과를 확인해 주세요.');
        setHrEtcSuccessMessage('');
      }
    }
    catch (error) {
      setHrEtcRows([]);
      setHrEtcErrorMessage(error instanceof Error ? error.message : '인사총무 엑셀 업로드 중 오류가 발생했습니다.');
    } finally
    {
      setHrEtcLoading(false);
    }
  }, [devUser, hrEtcForm, hrEtcMode, hrEtcRows.length]);
  const handleHrEtcSubmit = useCallback(async (nextForm = hrEtcForm) => {
    if (hrEtcRows.length === 0) {
      const message = '업로드된 보정 내역이 없습니다.';
      setHrEtcErrorMessage(message);
      window.alert(message);
      return;
    }
    try {
      setHrEtcSubmitting(true);
      setHrEtcErrorMessage('');
      const modeOption = hrEtcModeOptions[hrEtcMode] || hrEtcModeOptions.quick;
      const result = await createFrm206HrEtcEntries(modeOption.apiType, nextForm, hrEtcRows, devUser);
      setHrEtcSuccessMessage(result.message || `${modeOption.label} ETC 입력이 완료되었습니다. (${result.count || hrEtcRows.length}건)`);
      await loadRows(filters);
    }
    catch (error) {
      setHrEtcErrorMessage(error instanceof Error ? error.message : '인사총무 ETC 입력 중 오류가 발생했습니다.');
    } finally
    {
      setHrEtcSubmitting(false);
    }
  }, [devUser, filters, hrEtcForm, hrEtcMode, hrEtcRows, loadRows]);
  const loadInsuranceMappings = useCallback(async () => {
    try {
      setInsuranceMappingsLoading(true);
      const rows = await fetchFrm206InsuranceMappings(devUser);
      setInsuranceMappings(rows);
    }
    catch (error) {
      setInsuranceMappings([]);
      setInsuranceErrorMessage(error instanceof Error ? error.message : '보험료 부서 맵핑을 불러오지 못했습니다.');
    } finally
    {
      setInsuranceMappingsLoading(false);
    }
  }, [devUser]);
  const handleResetInsurance = useCallback(() => {
    setInsuranceForm(createDefaultInsuranceForm());
    setInsuranceRows([]);
    setInsuranceErrorMessage('');
    setInsuranceSuccessMessage('');
  }, []);
  const handleOpenInsurance = useCallback(() => {
    setInsuranceForm(createDefaultInsuranceForm());
    setInsuranceRows([]);
    setInsuranceErrorMessage('');
    setInsuranceSuccessMessage('');
    setInsuranceLoading(false);
    setInsuranceSubmitting(false);
    setIsInsuranceOpen(true);
  }, []);
  const handleInsuranceFormChange = useCallback((key, value) => {
    setInsuranceForm((current) => {
      if (key === 'targetMonth') {
        const nextMonth = normalizeInsuranceMonthInput(value);
        return {
          ...current,
          targetMonth: nextMonth,
          requestDateGroup1: getInsuranceRequestDateGroup1(nextMonth),
          requestDateGroup2: getInsuranceRequestDateGroup2(nextMonth)
        };
      }
      if (key === 'documentDate') {
        return {
          ...current,
          documentDate: value
        };
      }
      return current;
    });
  }, []);
  const handleInsuranceUpload = useCallback(async (file, nextForm = insuranceForm) => {
    if (!file) {
      return;
    }
    if (!isInsuranceUploadReady(nextForm)) {
      const message = '기준월과 증빙일을 먼저 입력해 주세요.';
      setInsuranceErrorMessage(message);
      window.alert(message);
      return;
    }
    try {
      setInsuranceLoading(true);
      setInsuranceErrorMessage('');
      setInsuranceSuccessMessage('');
      if (insuranceRows.length > 0) {
        setInsuranceRows([]);
      }
      const rows = await uploadFrm206InsuranceExcel(nextForm, file, devUser);
      setInsuranceRows(rows);
      if (rows.length > 0) {
        setInsuranceSuccessMessage(`보험료 내역 ${rows.length}건을 불러왔습니다.`);
      } else {
        setInsuranceErrorMessage('업로드 결과가 없습니다. API 응답 형식 또는 엑셀 파싱 결과를 확인해 주세요.');
        setInsuranceSuccessMessage('');
      }
    }
    catch (error) {
      setInsuranceRows([]);
      setInsuranceErrorMessage(error instanceof Error ? error.message : '보험료 엑셀 업로드 중 오류가 발생했습니다.');
    } finally
    {
      setInsuranceLoading(false);
    }
  }, [devUser, insuranceForm, insuranceRows.length]);
  const handleInsuranceSubmit = useCallback(async (nextForm = insuranceForm) => {
    if (insuranceRows.length === 0) {
      const message = '업로드된 보험료 내역이 없습니다.';
      setInsuranceErrorMessage(message);
      window.alert(message);
      return;
    }
    try {
      setInsuranceSubmitting(true);
      setInsuranceErrorMessage('');
      const result = await createFrm206InsuranceEntries(nextForm, insuranceRows, devUser);
      setInsuranceSuccessMessage(result.message || `보험료 ETC 입력이 완료되었습니다. (${result.count || insuranceRows.length}건)`);
      await loadRows(filters);
    }
    catch (error) {
      setInsuranceErrorMessage(error instanceof Error ? error.message : '보험료 ETC 입력 중 오류가 발생했습니다.');
    } finally
    {
      setInsuranceSubmitting(false);
    }
  }, [devUser, filters, insuranceForm, insuranceRows, loadRows]);
const handleDownloadInsuranceTemplate = useCallback(() => {
    const headers = ['표시부서', '등록부서', '국민연금', '건강보험', '고용보험', '산재보험', '단체보험', '내일채움(금액)', '내일채움(명단)'];
    const bodyRows = insuranceMappings.map((row) => [
    row.part1 || '',
    row.part2 || '',
    '',
    '',
    '',
    '',
    '',
    '',
    '']
    );
    void downloadAoaAsXlsx('Sheet1', [headers, ...bodyRows], `보험료_양식_${new Date().toISOString().replace(/[:T]/g, '').slice(0, 14)}.xlsx`);
  }, [insuranceMappings]);
  const handleSearchGwInfo = async () => {
    const searchText = gwSearchText.trim();
    if (!searchText) {
      setGwSearchErrorMessage('품의번호 또는 전자결재번호를 입력해 주세요.');
      return;
    }
    try {
      setGwSearchLoading(true);
      setGwSearchErrorMessage('');
      const rows = await fetchFrm206GwInfo(searchText);
      setGwSearchRows(rows);
    }
    catch (error) {
      setGwSearchRows([]);
      setGwSearchErrorMessage(error instanceof Error ? error.message : '품의번호 조회 중 오류가 발생했습니다.');
    } finally
    {
      setGwSearchLoading(false);
    }
  };
  useEffect(() => {
    if (!isExpensePerformanceOpen || !expensePerformanceYear) {
      return;
    }
    void loadExpensePerformance(expensePerformanceYear);
  }, [expensePerformanceYear, isExpensePerformanceOpen, loadExpensePerformance]);
  useEffect(() => {
    hrEtcModeRef.current = hrEtcMode;
  }, [hrEtcMode]);
  useEffect(() => {
    if (!isInsuranceOpen) {
      return;
    }
    void loadInsuranceMappings();
  }, [isInsuranceOpen, loadInsuranceMappings]);
  useEffect(() => {
    const inputId = 'hr-etc-upload-proxy';
    const existing = document.getElementById(inputId);
    const input = existing || document.createElement('input');
    if (!existing) {
      input.id = inputId;
      input.setAttribute('type', 'file');
      input.setAttribute('accept', '.xls,.xlsx,.csv');
      input.className = 'hr-etc-file-input';
      document.body.appendChild(input);
    }
    const onChange = (event) => {
      const target = event.target;
      const file = target.files && target.files[0] ? target.files[0] : null;
      if (!file) {
        setHrEtcErrorMessage('선택된 파일이 없습니다.');
        setHrEtcSuccessMessage('');
        return;
      }
      setHrEtcErrorMessage('');
      setHrEtcSuccessMessage(`선택 파일: ${file.name}`);
      void handleHrEtcUpload(file, hrEtcPendingFormRef.current);
      target.value = '';
    };
    input.addEventListener('change', onChange);
    return () => {
      input.removeEventListener('change', onChange);
    };
  }, [handleHrEtcUpload]);
  useEffect(() => {
    const inputId = 'insurance-upload-proxy';
    const existing = document.getElementById(inputId);
    const input = existing || document.createElement('input');
    if (!existing) {
      input.id = inputId;
      input.setAttribute('type', 'file');
      input.setAttribute('accept', '.xls,.xlsx,.csv');
      input.className = 'insurance-file-input';
      document.body.appendChild(input);
    }
    const onChange = (event) => {
      const target = event.target;
      const file = target.files && target.files[0] ? target.files[0] : null;
      if (!file) {
        setInsuranceErrorMessage('선택된 파일이 없습니다.');
        setInsuranceSuccessMessage('');
        return;
      }
      setInsuranceErrorMessage('');
      setInsuranceSuccessMessage(`선택 파일: ${file.name}`);
      void handleInsuranceUpload(file, insurancePendingFormRef.current);
      target.value = '';
    };
    input.addEventListener('change', onChange);
    return () => {
      input.removeEventListener('change', onChange);
    };
  }, [handleInsuranceUpload]);
  useEffect(() => {
    const actions = document.querySelector('.panel__actions--end');
    if (!actions) {
      return;
    }
    let button = actions.querySelector('[data-role="expense-performance-button"]');
    if (!button) {
      button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('data-role', 'expense-performance-button');
      button.className = 'button button--ghost';
      button.textContent = '판관비실적조회';
      const resetButton = Array.from(actions.querySelectorAll('button')).find((item) => item.textContent === 'Reset');
      if (resetButton) {
        actions.insertBefore(button, resetButton);
      } else
      {
        actions.appendChild(button);
      }
    }
    button.onclick = handleOpenExpensePerformance;
    return () => {
      if (button) {
        button.onclick = null;
      }
    };
  }, [handleOpenExpensePerformance]);
  useEffect(() => {
    const groups = document.querySelector('.action-groups');
    if (!groups) {
      return;
    }
    const existing = groups.querySelector('[data-role="hr-etc-group"]');
    if (!canOpenHrEtc) {
      groups.classList.remove('action-groups--with-hr');
      groups.style.gridTemplateColumns = '';
      existing === null || existing === void 0 ? void 0 : existing.remove();
      return;
    }
    groups.classList.add('action-groups--with-hr');
    groups.style.gridTemplateColumns = 'repeat(4, minmax(0, 1fr))';
    const section = existing || document.createElement('section');
    section.setAttribute('data-role', 'hr-etc-group');
    section.className = 'action-group';
    section.innerHTML = `
      <h3>인사총무옵션</h3>
      <div class="action-group__buttons">
        <button type="button" class="button button--ghost" data-role="hr-etc-quick">퀵서비스</button>
        <button type="button" class="button button--ghost" data-role="hr-etc-mro">MRO</button>
        <button type="button" class="button button--ghost" data-role="hr-etc-insurance">보험료</button>
      </div>
    `;
    if (!existing) {
      groups.appendChild(section);
    }
    const quickButton = section.querySelector('[data-role="hr-etc-quick"]');
    const mroButton = section.querySelector('[data-role="hr-etc-mro"]');
    const insuranceButton = section.querySelector('[data-role="hr-etc-insurance"]');
    const openQuick = () => handleOpenHrEtc('quick');
    const openMro = () => handleOpenHrEtc('mro');
    const openInsurance = () => handleOpenInsurance();
    quickButton === null || quickButton === void 0 ? void 0 : quickButton.addEventListener('click', openQuick);
    mroButton === null || mroButton === void 0 ? void 0 : mroButton.addEventListener('click', openMro);
    insuranceButton === null || insuranceButton === void 0 ? void 0 : insuranceButton.addEventListener('click', openInsurance);
    return () => {
      quickButton === null || quickButton === void 0 ? void 0 : quickButton.removeEventListener('click', openQuick);
      mroButton === null || mroButton === void 0 ? void 0 : mroButton.removeEventListener('click', openMro);
      insuranceButton === null || insuranceButton === void 0 ? void 0 : insuranceButton.removeEventListener('click', openInsurance);
      if (!canOpenHrEtc) {
        section.remove();
      }
    };
  }, [canOpenHrEtc, handleOpenHrEtc, handleOpenInsurance]);
  useEffect(() => {
    const modalId = 'expense-performance-modal-host';
    const existing = document.getElementById(modalId);
    if (!isExpensePerformanceOpen) {
      existing === null || existing === void 0 ? void 0 : existing.remove();
      return;
    }
    const host = existing || document.createElement('div');
    host.id = modalId;
    host.className = 'modal-backdrop';
    const rowsHtml = expensePerformanceRows.length > 0 ?
    `<table class="expense-performance-table">
              <thead>
                <tr>
                  <th>부서</th>
                  <th>계정과목</th>
                  <th>총예산</th>
                  <th>총지출</th>
                  <th>총잔액</th>
                </tr>
              </thead>
              <tbody>
                ${expensePerformanceRows.map((row) => `<tr class="${getExpensePerformanceRowClassName(row)}">
                      <td>${escapeHtml(row.partName || '-')}</td>
                      <td>${escapeHtml(row.accountName || row.accountCode || '-')}</td>
                      <td class="is-number">${escapeHtml(formatAmount(row.budgetAmount || 0))}</td>
                      <td class="is-number">${escapeHtml(formatAmount(row.expenseAmount || 0))}</td>
                      <td class="is-number">${escapeHtml(formatAmount(row.remainAmount || 0))}</td>
                    </tr>`).join('')}
              </tbody>
            </table>` :
    `<div class="expense-performance-empty">${expensePerformanceLoading ? '조회 중입니다.' : '조회 결과가 없습니다.'}</div>`;
    host.innerHTML = `
          <div class="modal-panel modal-panel--small">
            <div class="modal-panel__header panel__title-row">
              <h2>판관비실적조회</h2>
              <button type="button" class="button button--ghost" data-role="close-expense-performance">닫기</button>
            </div>
            <div class="expense-performance-modal">
              <div class="expense-performance-toolbar">
                <label class="field field--compact">
                  <span>년도</span>
                  <select data-role="expense-performance-year">
                    ${expensePerformanceYearOptions.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === expensePerformanceYear ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}
                  </select>
                </label>
              </div>
              ${expensePerformanceErrorMessage ? `<p class="panel__error">${escapeHtml(expensePerformanceErrorMessage)}</p>` : ''}
              <div class="expense-performance-results">${rowsHtml}</div>
              <p class="expense-performance-note">※ 조회시점에 따라 당월은 물론 직전월까지 실적집계가 정확하지 않을 수 있습니다.</p>
            </div>
          </div>
        `;
    if (!existing) {
      document.body.appendChild(host);
    }
    const close = () => setIsExpensePerformanceOpen(false);
    const closeButton = host.querySelector('[data-role="close-expense-performance"]');
    const yearSelect = host.querySelector('[data-role="expense-performance-year"]');
    const onBackdropClick = (event) => {
      if (event.target === host) {
        close();
      }
    };
    const onYearChange = (event) => {
      const nextYear = String(event.target.value || '');
      setExpensePerformanceYear(nextYear);
    };
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', close);
    yearSelect === null || yearSelect === void 0 ? void 0 : yearSelect.addEventListener('change', onYearChange);
    host.addEventListener('click', onBackdropClick);
    return () => {
      closeButton === null || closeButton === void 0 ? void 0 : closeButton.removeEventListener('click', close);
      yearSelect === null || yearSelect === void 0 ? void 0 : yearSelect.removeEventListener('change', onYearChange);
      host.removeEventListener('click', onBackdropClick);
      if (!isExpensePerformanceOpen) {
        host.remove();
      }
    };
  }, [expensePerformanceErrorMessage, expensePerformanceLoading, expensePerformanceRows, expensePerformanceYear, expensePerformanceYearOptions, isExpensePerformanceOpen]);
  useEffect(() => {
    const modalId = 'hr-etc-modal-host';
    const existing = document.getElementById(modalId);
    if (!isHrEtcOpen) {
      existing === null || existing === void 0 ? void 0 : existing.remove();
      return;
    }
    const host = existing || document.createElement('div');
    const modeOption = hrEtcModeOptions[hrEtcMode] || hrEtcModeOptions.quick;
    host.id = modalId;
    host.className = 'modal-backdrop';
    const rowsHtml = hrEtcRows.length > 0 ?
    `<table class="hr-etc-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>부서코드</th>
            <th>공급가액</th>
            <th>부가세</th>
            <th>총액</th>
          </tr>
        </thead>
        <tbody>
          ${hrEtcRows.map((row, index) => `<tr>
              <td>${escapeHtml(row.rowNo || String(index + 1))}</td>
              <td>${escapeHtml(row.deptCode1 || '-')}</td>
              <td class="is-number">${escapeHtml(formatAmount(row.amount || 0))}</td>
              <td class="is-number">${escapeHtml(formatAmount(row.vat || 0))}</td>
              <td class="is-number">${escapeHtml(formatAmount(row.total || 0))}</td>
            </tr>`).join('')}
        </tbody>
      </table>` :
    `<div class="hr-etc-empty">${hrEtcLoading ? '업로드 중입니다.' : '업로드된 내역이 없습니다.'}</div>`;
    host.innerHTML = `
      <div class="modal-panel modal-panel--hr-etc">
        <div class="modal-panel__header panel__title-row">
          <h2>인사총무옵션 - ${escapeHtml(modeOption.label)}</h2>
          <button type="button" class="button button--ghost" data-role="close-hr-etc">닫기</button>
        </div>
        <div class="hr-etc-modal">
          <div class="hr-etc-toolbar">
            <button type="button" class="button button--ghost" data-role="hr-etc-reset">초기화</button>
            <button type="button" class="button button--ghost" data-role="hr-etc-template">양식다운로드</button>
            <button type="button" class="button button--excel" data-role="hr-etc-upload">${hrEtcLoading ? '업로드 중...' : '엑셀 업로드'}</button>
            <button type="button" class="button button--primary" data-role="hr-etc-submit">${hrEtcSubmitting ? '입력 중...' : 'ETC 입력'}</button>
          </div>
          <div class="hr-etc-form">
            <label class="field">
              <span>증빙일</span>
              <input type="date" value="${escapeHtml(hrEtcForm.documentDate)}" data-role="hr-etc-document-date" />
            </label>
            <label class="field">
              <span>송금요청일</span>
              <input type="date" value="${escapeHtml(hrEtcForm.requestDate)}" data-role="hr-etc-request-date" />
            </label>
            <label class="field">
              <span>공급가액</span>
              <input type="number" value="${escapeHtml(hrEtcForm.amount)}" data-role="hr-etc-amount" />
            </label>
            <label class="field">
              <span>부가세</span>
              <input type="number" value="${escapeHtml(hrEtcForm.vat)}" data-role="hr-etc-vat" />
            </label>
            <label class="field">
              <span>총액</span>
              <input type="number" value="${escapeHtml(hrEtcForm.total)}" data-role="hr-etc-total" />
            </label>
          </div>
          ${hrEtcErrorMessage ? `<p class="panel__error">${escapeHtml(hrEtcErrorMessage)}</p>` : ''}
          ${hrEtcSuccessMessage ? `<p class="panel__success">${escapeHtml(hrEtcSuccessMessage)}</p>` : ''}
          <div class="hr-etc-results">${rowsHtml}</div>
          <p class="hr-etc-help">엑셀 업로드 전 계산서 금액과 날짜를 입력해 주세요. 업로드 시 API에서 보정된 내역을 받아 ETC 입력으로 저장합니다.</p>
        </div>
      </div>
    `;
    if (!existing) {
      document.body.appendChild(host);
    }
    const close = () => setIsHrEtcOpen(false);
    const onBackdropClick = (event) => {
      if (event.target === host) {
        close();
      }
    };
    const closeButton = host.querySelector('[data-role="close-hr-etc"]');
    const resetButton = host.querySelector('[data-role="hr-etc-reset"]');
    const templateButton = host.querySelector('[data-role="hr-etc-template"]');
    const uploadButton = host.querySelector('[data-role="hr-etc-upload"]');
    const submitButton = host.querySelector('[data-role="hr-etc-submit"]');
    const documentInput = host.querySelector('[data-role="hr-etc-document-date"]');
    const requestInput = host.querySelector('[data-role="hr-etc-request-date"]');
    const amountInput = host.querySelector('[data-role="hr-etc-amount"]');
    const vatInput = host.querySelector('[data-role="hr-etc-vat"]');
    const totalInput = host.querySelector('[data-role="hr-etc-total"]');
    const onUploadClick = () => {
      const currentForm = {
        documentDate: documentInput && 'value' in documentInput ? documentInput.value : '',
        requestDate: requestInput && 'value' in requestInput ? requestInput.value : '',
        amount: amountInput && 'value' in amountInput ? normalizeHrEtcNumberInput(amountInput.value) : '',
        vat: vatInput && 'value' in vatInput ? normalizeHrEtcNumberInput(vatInput.value) : '',
        total: totalInput && 'value' in totalInput ? normalizeHrEtcNumberInput(totalInput.value) : ''
      };
      setHrEtcForm(currentForm);
      if (!isHrEtcInvoiceComplete(currentForm)) {
        const message = '증빙일, 송금요청일, 계산서 금액(공급가액/부가세/총액)을 먼저 입력해 주세요.';
        setHrEtcErrorMessage(message);
        window.alert(message);
        return;
      }
      hrEtcPendingFormRef.current = currentForm;
      const uploadProxy = document.getElementById('hr-etc-upload-proxy');
      if (uploadProxy && 'value' in uploadProxy) {
        uploadProxy.value = '';
      }
      uploadProxy === null || uploadProxy === void 0 ? void 0 : uploadProxy.click();
    };
    const onSubmitClick = () => {
      const currentForm = {
        documentDate: documentInput && 'value' in documentInput ? documentInput.value : '',
        requestDate: requestInput && 'value' in requestInput ? requestInput.value : '',
        amount: amountInput && 'value' in amountInput ? normalizeHrEtcNumberInput(amountInput.value) : '',
        vat: vatInput && 'value' in vatInput ? normalizeHrEtcNumberInput(vatInput.value) : '',
        total: totalInput && 'value' in totalInput ? normalizeHrEtcNumberInput(totalInput.value) : ''
      };
      setHrEtcForm(currentForm);
      void handleHrEtcSubmit(currentForm);
    };
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', close);
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', handleResetHrEtc);
    templateButton === null || templateButton === void 0 ? void 0 : templateButton.addEventListener('click', handleDownloadHrEtcTemplate);
    uploadButton === null || uploadButton === void 0 ? void 0 : uploadButton.addEventListener('click', onUploadClick);
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', onSubmitClick);
    host.addEventListener('click', onBackdropClick);
    return () => {
      closeButton === null || closeButton === void 0 ? void 0 : closeButton.removeEventListener('click', close);
      resetButton === null || resetButton === void 0 ? void 0 : resetButton.removeEventListener('click', handleResetHrEtc);
      templateButton === null || templateButton === void 0 ? void 0 : templateButton.removeEventListener('click', handleDownloadHrEtcTemplate);
      uploadButton === null || uploadButton === void 0 ? void 0 : uploadButton.removeEventListener('click', onUploadClick);
      submitButton === null || submitButton === void 0 ? void 0 : submitButton.removeEventListener('click', onSubmitClick);
      host.removeEventListener('click', onBackdropClick);
      if (!isHrEtcOpen) {
        host.remove();
      }
    };
  }, [handleDownloadHrEtcTemplate, handleHrEtcSubmit, handleHrEtcUpload, handleResetHrEtc, hrEtcErrorMessage, hrEtcForm, hrEtcLoading, hrEtcMode, hrEtcRows, hrEtcSubmitting, hrEtcSuccessMessage, isHrEtcOpen]);
  useEffect(() => {
    const modalId = 'insurance-modal-host';
    const existing = document.getElementById(modalId);
    if (!isInsuranceOpen) {
      existing === null || existing === void 0 ? void 0 : existing.remove();
      return;
    }
    const host = existing || document.createElement('div');
    host.id = modalId;
    host.className = 'modal-backdrop';
    const rowsHtml = insuranceRows.length > 0 ?
    `<table class="insurance-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>표시부서</th>
            <th>등록부서</th>
            <th>Type</th>
            <th>금액</th>
            <th>명단</th>
          </tr>
        </thead>
        <tbody>
          ${insuranceRows.map((row, index) => `<tr>
              <td>${escapeHtml(row.rowNo || String(index + 1))}</td>
              <td>${escapeHtml(row.displayPart || '-')}</td>
              <td>${escapeHtml(row.registerPart || '-')}</td>
              <td>${escapeHtml(row.type || '-')}</td>
              <td class="is-number">${escapeHtml(formatAmount(row.amount || 0))}</td>
              <td>${escapeHtml(row.names || '-')}</td>
            </tr>`).join('')}
        </tbody>
      </table>` :
    `<div class="insurance-empty">${insuranceLoading ? '업로드 중입니다.' : '업로드된 보험료 내역이 없습니다.'}</div>`;
    const mappingsHtml = insuranceMappings.length > 0 ?
    `<table class="insurance-mapping-table">
        <thead>
          <tr>
            <th>Seq</th>
            <th>표시부서</th>
            <th>등록부서(STS)</th>
          </tr>
        </thead>
        <tbody>
          ${insuranceMappings.map((row) => `<tr>
              <td>${escapeHtml(row.seq || '-')}</td>
              <td>${escapeHtml(row.part1 || '-')}</td>
              <td>${escapeHtml(row.part2 || '-')}</td>
            </tr>`).join('')}
        </tbody>
      </table>` :
    `<div class="insurance-empty">${insuranceMappingsLoading ? '부서 맵핑을 불러오는 중입니다.' : '등록된 부서 맵핑이 없습니다.'}</div>`;
    host.innerHTML = `
      <div class="modal-panel modal-panel--insurance">
        <div class="modal-panel__header panel__title-row">
          <h2>보험료</h2>
          <button type="button" class="button button--ghost" data-role="close-insurance">닫기</button>
        </div>
        <div class="insurance-modal">
          <div class="insurance-toolbar">
            <button type="button" class="button button--ghost" data-role="insurance-reset">초기화</button>
            <button type="button" class="button button--ghost" data-role="insurance-template">양식다운로드</button>
            <button type="button" class="button button--excel" data-role="insurance-upload">${insuranceLoading ? '업로드 중...' : '엑셀 업로드'}</button>
            <button type="button" class="button button--primary" data-role="insurance-submit">${insuranceSubmitting ? '입력 중...' : 'ETC 입력'}</button>
          </div>
          <div class="insurance-form">
            <label class="field">
              <span>기준월</span>
              <input type="month" value="${escapeHtml(insuranceForm.targetMonth)}" data-role="insurance-target-month" />
            </label>
            <label class="field">
              <span>증빙일</span>
              <input type="date" value="${escapeHtml(insuranceForm.documentDate)}" data-role="insurance-document-date" />
            </label>
          </div>
          <div class="insurance-request-grid">
            <div class="insurance-request-item">
              <strong>${escapeHtml(insuranceTypeGroup1.join(', '))}</strong>
              <span>${escapeHtml(insuranceForm.requestDateGroup1)}</span>
            </div>
            <div class="insurance-request-item">
              <strong>${escapeHtml(insuranceTypeGroup2.join(', '))}</strong>
              <span>${escapeHtml(insuranceForm.requestDateGroup2)}</span>
            </div>
          </div>
          ${insuranceErrorMessage ? `<p class="panel__error">${escapeHtml(insuranceErrorMessage)}</p>` : ''}
          ${insuranceSuccessMessage ? `<p class="panel__success">${escapeHtml(insuranceSuccessMessage)}</p>` : ''}
          <div class="insurance-results">${rowsHtml}</div>
          <div class="insurance-mappings">${mappingsHtml}</div>
          <p class="insurance-help">표시부서는 화면과 비고에 유지되고, 등록부서는 STS 바이어 조회 및 입력 기준으로 사용됩니다.</p>
        </div>
      </div>
    `;
    if (!existing) {
      document.body.appendChild(host);
    }
    const close = () => setIsInsuranceOpen(false);
    const onBackdropClick = (event) => {
      if (event.target === host) {
        close();
      }
    };
    const closeButton = host.querySelector('[data-role="close-insurance"]');
    const resetButton = host.querySelector('[data-role="insurance-reset"]');
    const templateButton = host.querySelector('[data-role="insurance-template"]');
    const uploadButton = host.querySelector('[data-role="insurance-upload"]');
    const submitButton = host.querySelector('[data-role="insurance-submit"]');
    const targetMonthInput = host.querySelector('[data-role="insurance-target-month"]');
    const documentDateInput = host.querySelector('[data-role="insurance-document-date"]');
    const syncCurrentForm = () => ({
      targetMonth: targetMonthInput && 'value' in targetMonthInput ? normalizeInsuranceMonthInput(targetMonthInput.value) : '',
      documentDate: documentDateInput && 'value' in documentDateInput ? documentDateInput.value : '',
      requestDateGroup1: getInsuranceRequestDateGroup1(targetMonthInput && 'value' in targetMonthInput ? normalizeInsuranceMonthInput(targetMonthInput.value) : ''),
      requestDateGroup2: getInsuranceRequestDateGroup2(targetMonthInput && 'value' in targetMonthInput ? normalizeInsuranceMonthInput(targetMonthInput.value) : '')
    });
    const onUploadClick = () => {
      const currentForm = syncCurrentForm();
      setInsuranceForm(currentForm);
      if (!isInsuranceUploadReady(currentForm)) {
        const message = '기준월과 증빙일을 먼저 입력해 주세요.';
        setInsuranceErrorMessage(message);
        window.alert(message);
        return;
      }
      insurancePendingFormRef.current = currentForm;
      const uploadProxy = document.getElementById('insurance-upload-proxy');
      if (uploadProxy && 'value' in uploadProxy) {
        uploadProxy.value = '';
      }
      uploadProxy === null || uploadProxy === void 0 ? void 0 : uploadProxy.click();
    };
    const onSubmitClick = () => {
      const currentForm = syncCurrentForm();
      setInsuranceForm(currentForm);
      void handleInsuranceSubmit(currentForm);
    };
    const bindTextInput = (element, key, eventName = 'blur') => {
      if (!element) {
        return () => undefined;
      }
      const handler = (event) => handleInsuranceFormChange(key, event.target.value);
      element.addEventListener(eventName, handler);
      return () => {
        element.removeEventListener(eventName, handler);
      };
    };
    const cleanupFormBindings = [
    bindTextInput(targetMonthInput, 'targetMonth', 'change'),
    bindTextInput(documentDateInput, 'documentDate')];
    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', close);
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', handleResetInsurance);
    templateButton === null || templateButton === void 0 ? void 0 : templateButton.addEventListener('click', handleDownloadInsuranceTemplate);
    uploadButton === null || uploadButton === void 0 ? void 0 : uploadButton.addEventListener('click', onUploadClick);
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', onSubmitClick);
    host.addEventListener('click', onBackdropClick);
    return () => {
      closeButton === null || closeButton === void 0 ? void 0 : closeButton.removeEventListener('click', close);
      resetButton === null || resetButton === void 0 ? void 0 : resetButton.removeEventListener('click', handleResetInsurance);
      templateButton === null || templateButton === void 0 ? void 0 : templateButton.removeEventListener('click', handleDownloadInsuranceTemplate);
      uploadButton === null || uploadButton === void 0 ? void 0 : uploadButton.removeEventListener('click', onUploadClick);
      submitButton === null || submitButton === void 0 ? void 0 : submitButton.removeEventListener('click', onSubmitClick);
      host.removeEventListener('click', onBackdropClick);
      cleanupFormBindings.forEach((cleanup) => cleanup());
      if (!isInsuranceOpen) {
        host.remove();
      }
    };
  }, [handleDownloadInsuranceTemplate, handleInsuranceFormChange, handleInsuranceSubmit, handleInsuranceUpload, handleResetInsurance, insuranceErrorMessage, insuranceForm, insuranceLoading, insuranceMappings, insuranceMappingsLoading, insuranceRows, insuranceSubmitting, insuranceSuccessMessage, isInsuranceOpen]);
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortKey(key);
    setSortDirection('asc');
  };
  const getSortLabel = (key, label) => {
    if (sortKey !== key) {
      return label;
    }
    return `${label} ${sortDirection === 'asc' ? '▲' : '▼'}`;
  };
  const handleSelectRow = (rowId) => {
    setSelectedId(rowId);
    setEditorErrorMessage('');
  };
  const handleCreateMode = () => {
    setEditorMode('create');
    setSaveMessage('');
    setEditorErrorMessage('');
    setBanks([]);
    setForm(createEmptyFrm206Form());
    setDetailData(null);
    setSelectedTemplateId('');
  };
  const handleEditMode = () => {
    if (!selectedRow) {
      setEditorErrorMessage('수정할 행을 먼저 선택해 주세요.');
      return;
    }
    setIsDetailOpen(false);
    setSaveMessage('');
    setEditorErrorMessage('');
    void loadDetail(selectedRow.id, 'edit');
  };
  const handleOpenDetail = async () => {
    if (!selectedRow) {
      setEditorErrorMessage('상세 조회할 행을 먼저 선택해 주세요.');
      return;
    }
    setEditorErrorMessage('');
    await loadDetail(selectedRow.id, 'view');
    setIsDetailOpen(true);
  };
  const handleFormTextChange = (key, value) => {
    setForm((current) => {
      if (key === 'payTypeCode') {
        if (value === '4') {
          const nextRequestDate = getMonthlyRequestDate(current.requestMonth, current.currency);
          return {
            ...current,
            payTypeCode: value,
            requestDate: nextRequestDate || current.requestDate
          };
        }
        return { ...current, payTypeCode: value };
      }
      if (key === 'currency') {
        if (current.payTypeCode === '4') {
          return {
            ...current,
            currency: value,
            requestDate: getMonthlyRequestDate(current.requestMonth, value) || current.requestDate
          };
        }
        return { ...current, currency: value };
      }
      if (key === 'actOption') {
        if (!value || value === '없음') {
          return syncCalculatedAmounts({
            ...current,
            actOption: value,
            minAmount: '',
            actRemark: ''
          });
        }
        return {
          ...current,
          actOption: value,
          actRemark: value === '원천징수' ? '원천징수' : current.actRemark
        };
      }
      return { ...current, [key]: value };
    });
  };
  const registerEditorInputRef = (key) => (element) => {
    editorInputRefs.current[key] = element;
    if (!element) {
      return;
    }
    const nextValue = getBufferedEditorValue(form, key);
    if (element.value !== nextValue) {
      element.value = nextValue;
    }
  };
  const handleEditorInputBlur = (key) => {
    var _a;
    const draftValue = String(((_a = editorInputRefs.current[key]) === null || _a === void 0 ? void 0 : _a.value) || '');
    if (draftValue === getBufferedEditorValue(form, key)) {
      return;
    }
    if (key === 'remark') {
      handleFormTextChange('remark', draftValue);
      return;
    }
    if (key === 'total') {
      handleTotalChange(draftValue);
      return;
    }
    if (key === 'amount' || key === 'vat') {
      handleMoneyFieldChange(key, draftValue);
    }
  };
  const handleMoneyFieldChange = (key, value) => {
    const normalized = value.replace(/,/g, '').trim();
    const nextValue = normalized === '' ? '' : normalized;
    setForm((current) => syncCalculatedAmounts({ ...current, [key]: nextValue }));
  };
  const handleTotalChange = (value) => {
    const normalized = value.replace(/,/g, '').trim();
    const nextValue = normalized === '' ? '' : normalized;
    setForm((current) => {
      if (nextValue === '') {
        return {
          ...current,
          total: '',
          actualAmount: ''
        };
      }
      const total = toNumber(nextValue);
      const minAmount = toNumber(current.minAmount);
      const actualAmount = total - minAmount;
      return {
        ...current,
        total: String(total),
        actualAmount: String(actualAmount)
      };
    });
  };
  const handleSupplierChange = (supplierCode) => {
    setForm((current) => ({
      ...current,
      supplierCode,
      bankCode: '',
      bankName: '',
      accountNo: '',
      bankAccountName: '',
      swiftCode: '',
      bankBranch: ''
    }));
    void loadBanks(supplierCode);
  };
  const handleEditorLookupDropdownChange = (key, value) => {
    if (key === 'supplierCode') {
      handleSupplierChange(value);
      return;
    }
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };
  const handleRequestMonthChange = (value) => {
    setForm((current) => ({
      ...current,
      requestMonth: value,
      requestDate: getMonthlyRequestDate(value, current.currency) || current.requestDate
    }));
  };
  const handleBankChange = (bankCode) => {
    const selectedBank = banks.find((bank) => bank.code === bankCode);
    setForm((current) => {
      var _a, _b, _c, _d, _e;
      return {
        ...current,
        bankCode,
        bankName: (_a = selectedBank === null || selectedBank === void 0 ? void 0 : selectedBank.name) !== null && _a !== void 0 ? _a : '',
        accountNo: (_b = selectedBank === null || selectedBank === void 0 ? void 0 : selectedBank.accountNo) !== null && _b !== void 0 ? _b : '',
        bankAccountName: (_c = selectedBank === null || selectedBank === void 0 ? void 0 : selectedBank.accountName) !== null && _c !== void 0 ? _c : '',
        swiftCode: (_d = selectedBank === null || selectedBank === void 0 ? void 0 : selectedBank.swiftCode) !== null && _d !== void 0 ? _d : '',
        bankBranch: (_e = selectedBank === null || selectedBank === void 0 ? void 0 : selectedBank.branch) !== null && _e !== void 0 ? _e : ''
      };
    });
  };
  const resolveLookupSelections = () => {
    var _a, _b, _c;
    const resolvedCostCenter = (_a = options.costCenterOptions.find((option) => option.code === form.costCenterCode)) !== null && _a !== void 0 ? _a : null;
    const resolvedAccount = (_b = options.accountOptions.find((option) => option.code === form.accountCode)) !== null && _b !== void 0 ? _b : null;
    const resolvedSupplier = (_c = options.supplierOptions.find((option) => option.code === form.supplierCode)) !== null && _c !== void 0 ? _c : null;
    return {
      resolvedCostCenter,
      resolvedAccount,
      resolvedSupplier
    };
  };
  const validateForm = () => {
    const { resolvedCostCenter, resolvedAccount, resolvedSupplier } = resolveLookupSelections();
    if (!resolvedCostCenter)
    return '코스트센터를 선택해주세요.';
    if (!resolvedSupplier)
    return '거래처를 선택해주세요.';
    if (!resolvedAccount)
    return '계정과목을 선택해주세요.';
    if (!form.bankCode)
    return '은행을 선택해주세요.';
    if (!form.currency)
    return '[환종]을 선택해 주시기 바랍니다.';
    if (!form.actOption)
    return '[차감분류]를 선택해 주시기 바랍니다.';
    if (!form.remark.trim())
    return 'TITLE을 입력해주세요.';
    if (!form.documentDate)
    return '[증빙일 확인요망] 한개의 날짜만 선택해 주세요.';
    if (form.payTypeCode === '4' && !form.requestMonth)
    return '[송금요청월 확인요망] 년월을 선택해 주세요.';
    if (!form.requestDate)
    return '[송금요청일 확인요망] 한개의 날짜만 선택해 주세요.';
    if (isWeekend(form.requestDate))
    return '[송금요청일 확인요망] 업무일에만 송금요청이 가능합니다.';
    const amount = toNumber(form.amount);
    const vat = toNumber(form.vat);
    const total = toNumber(form.total);
    const minAmount = toNumber(form.minAmount);
    const actualAmount = toNumber(form.actualAmount);
    if (Number.isNaN(amount) || Number.isNaN(vat) || Number.isNaN(total) || Number.isNaN(minAmount) || Number.isNaN(actualAmount)) {
      return '금액 입력값을 확인해 주세요.';
    }
    if (total === 0)
    return '[합계금액 확인요망]\n0원은 입력될 수 없습니다.';
    if (amount === 0)
    return '[공급가액 확인요망]\n0원은 입력될 수 없습니다.';
    if (actualAmount === 0)
    return '[실송금액 확인요망]\n0원은 입력될 수 없습니다.';
    if (Math.abs(total - minAmount - actualAmount) > 0.0001) {
      return '[실송금액은 합계금액 + 차감액과 같아야 합니다]';
    }
    return '';
  };
  const handleSave = async () => {
    const validationMessage = validateForm();
    if (validationMessage) {
      showEditorAlert(validationMessage);
      return;
    }
    const { resolvedCostCenter, resolvedAccount, resolvedSupplier } = resolveLookupSelections();
    if (!resolvedCostCenter || !resolvedAccount || !resolvedSupplier) {
      showEditorAlert('입력한 코스트센터, 거래처, 계정과목을 다시 확인해 주세요.');
      return;
    }
    const normalizedForm = {
      ...form,
      costCenterCode: resolvedCostCenter.code,
      accountCode: resolvedAccount.code,
      supplierCode: resolvedSupplier.code
    };
    setForm(normalizedForm);
    const effectiveRequestDate = normalizedForm.payTypeCode === '4' ?
    getMonthlyRequestDate(normalizedForm.requestMonth, normalizedForm.currency) :
    normalizedForm.requestDate;
    const requestDay = new Date(`${effectiveRequestDate}T00:00:00`).getDay();
    const isDomesticOffDay = normalizedForm.payTypeCode === '2' && requestDay !== 5;
    const isOverseasOffDay = normalizedForm.payTypeCode === '3' && requestDay !== 3;
    if (isDomesticOffDay || isOverseasOffDay) {
      const confirmed = await window.confirm('[송금요청일 확인]\n\n지정된 송금일이 아닙니다!\n송금일의 조정이 필요한 경우(계약일,급여일 등)에만\n요청이 가능하며 담당자 확인 후 실제송금일이\n변경 될 수 있습니다.. \n\n계속 하시겠습니까?');
      if (!confirmed) {
        return;
      }
    }
    setSaving(true);
    setEditorErrorMessage('');
    setSaveMessage('');
    try {
      const payload = toSavePayload(normalizedForm);
      const result = editorMode === 'create' ?
      await createFrm206(payload, devUser) :
      await updateFrm206(form.id, payload, devUser);
      setSaveMessage(editorMode === 'create' ? '신규 입력이 완료되었습니다.' : '수정이 완료되었습니다.');
      await loadRows(filters);
      const targetId = result.id;
      setSelectedId(targetId);
      setEditorMode('view');
      setBanks([]);
    }
    catch (error) {
      showEditorAlert(error instanceof Error ? error.message : '저장 중 오류가 발생했습니다.');
    } finally
    {
      setSaving(false);
    }
  };
  const handleCancelEdit = () => {
    setSaveMessage('');
    setEditorErrorMessage('');
    setEditorMode('view');
    setForm(createEmptyFrm206Form());
    setDetailData(null);
    setBanks([]);
    setSelectedTemplateId('');
  };
  const handleLoadTemplate = async () => {
    if (!selectedTemplateId) {
      setEditorErrorMessage('불러올 항목을 선택해 주세요.');
      return;
    }
    try {
      setEditorErrorMessage('');
      const detail = await fetchFrm206LoadTemplateDetail(selectedTemplateId, devUser);
      const preservedId = form.id;
      const preservedStatus = form.status;
      const preservedStatusCode = form.statusCode;
      const preservedDocumentDate = form.documentDate;
      const preservedRequestDate = form.requestDate;
      const preservedRequestMonth = form.requestMonth;
      const nextForm = syncCalculatedAmounts(toFormValues(detail));
      setForm({
        ...nextForm,
        id: preservedId,
        status: preservedStatus,
        statusCode: preservedStatusCode,
        documentDate: preservedDocumentDate,
        requestDate: preservedRequestDate,
        requestMonth: preservedRequestMonth
      });
      await loadBanks(detail.supplierCode, detail.bankCode);
      setSaveMessage('불러오기 항목을 적용했습니다.');
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '불러오기 중 오류가 발생했습니다.');
    }
  };
  const handleAnalyzeInvoice = async () => {
    var _a, _b;
    if (!analysisFile) {
      setEditorErrorMessage('분석할 이미지 파일을 선택해 주세요.');
      return;
    }
    try {
      setAnalysisLoading(true);
      setEditorErrorMessage('');
      const data = await analyzeFrm206Invoice(analysisFile);
      if (!data.RESULT) {
        throw new Error(data.MSG || '계산서분석 처리에 실패했습니다.');
      }
      const businessNo = String((_a = data.TIN) !== null && _a !== void 0 ? _a : '').replace(/[^0-9]/g, '');
      const matchedSuppliers = businessNo ?
      options.supplierOptions.filter((option) => {var _a;return String((_a = option.regNo) !== null && _a !== void 0 ? _a : '').replace(/[^0-9]/g, '') === businessNo;}) :
      [];
      const matchedSupplier = matchedSuppliers.length === 1 ? matchedSuppliers[0] : null;
      const analyzedDocumentDate = normalizeAnalysisDate(data.DATE);
      const nextAmount = data.AMT ? String(data.AMT) : form.amount;
      const nextVat = data.VAT ? String(data.VAT) : form.vat;
      const nextTotal = data.TOT ? String(data.TOT) : form.total;
      const updatedForm = syncCalculatedAmounts({
        ...form,
        documentDate: analyzedDocumentDate || form.documentDate,
        amount: nextAmount,
        vat: nextVat,
        total: nextTotal,
        supplierCode: (_b = matchedSupplier === null || matchedSupplier === void 0 ? void 0 : matchedSupplier.code) !== null && _b !== void 0 ? _b : form.supplierCode
      });
      setForm(updatedForm);
      if (matchedSupplier) {
        await loadBanks(matchedSupplier.code);
      }
      setSaveMessage(matchedSuppliers.length > 1 ?
      '계산서분석 결과를 반영했습니다. 사업자등록번호와 일치하는 거래처가 2건 이상이라 거래처는 자동 선택하지 않았습니다.' :
      '계산서분석 결과를 반영했습니다.');
      setIsAnalysisOpen(false);
      setAnalysisFile(null);
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '계산서분석 중 오류가 발생했습니다.');
    } finally
    {
      setAnalysisLoading(false);
    }
  };
  const handleCancelRequest = async () => {
    if (!selectedRow) {
      setEditorErrorMessage('취소할 행을 먼저 선택해 주세요.');
      return;
    }
    if (!(selectedRow.status === '등록' || selectedRow.status === '삭제완료')) {
      setEditorErrorMessage('[등록] 또는 [삭제완료] 상태만 취소가 가능합니다.');
      return;
    }
    {
      const confirmed = await window.confirm('[취소]처리되면 복구가 불가합니다\n계속 하시겠습니까?');
      if (!confirmed) {
        return;
      }
    }
    try {
      setEditorErrorMessage('');
      setSaveMessage('');
      await cancelFrm206(selectedRow.id, devUser);
      setSaveMessage('취소 처리되었습니다.');
      await loadRows(filters);
      setEditorMode('view');
      setBanks([]);
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '취소 처리 중 오류가 발생했습니다.');
    }
  };
  const buildLegacyApprovalUrl = (approKey, formId) => {
    const normalizedApproKey = approKey.trim();
    const normalizedEmpNo = options.currentUser.empNo.trim();
    if (!normalizedApproKey || !normalizedEmpNo) {
      return '';
    }
    const url = new URL('http://gw.shints.com/KOR_WEBROOT/SRC/CM/TIMS/INDEX.ASPX');
    url.searchParams.set('erp_div', 'OTHER_SIN');
    url.searchParams.set('cd_company', '1000');
    url.searchParams.set('emp_no', normalizedEmpNo);
    url.searchParams.set('appro_key', normalizedApproKey);
    url.searchParams.set('form_id', formId);
    return url.toString();
  };
  const openApprovalWindow = (url, popup) => {
    if (!url) {
      popup === null || popup === void 0 ? void 0 : popup.close();
      return false;
    }
    if (popup && !popup.closed) {
      popup.location.replace(url);
      popup.focus();
      return true;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  };
  const getDeleteApprovalTargetRows = () => {
    const basisRows = checkedIds.length > 0 ? checkedRows : selectedRow ? [selectedRow] : [];
    if (basisRows.length === 0) {
      return [];
    }
    const firstAcDocNo = String(basisRows[0].acDocNo ?? '').trim();
    if (!firstAcDocNo) {
      return basisRows;
    }
    return rows.filter((row) => String(row.acDocNo ?? '').trim() === firstAcDocNo);
  };
  const buildDeleteApprovalConfirmMessage = (targetRows) => {
    if (targetRows.length === 0) {
      return '삭제요청할 항목이 없습니다.';
    }
    const seqText = targetRows.map((row) => row.id).join(', ');
    return `삭제요청 연결 대상: ${seqText}\n계속 진행하시겠습니까?`;
  };
  const handleExpenseApproval = async () => {
    if (checkedIds.length === 0) {
      window.alert('체크된 항목이 없습니다.');
      return;
    }
    const invalidRow = checkedRows.find((row) => !(row.status === '등록' || row.status === '삭제완료'));
    if (invalidRow) {
      window.alert('[등록] 또는 [삭제완료] 상태만 지출결의서를 진행할 수 있습니다.');
      return;
    }
    const popup = window.open('', '_blank');
    try {
      setEditorErrorMessage('');
      const result = await createFrm206ExpenseApproval(checkedIds, devUser);
      const resolvedOpenUrl = result.openUrl.trim() || buildLegacyApprovalUrl(result.approKey, '48');
      setSaveMessage('지출결의서가 생성되었습니다. (' + result.approKey + ')');
      await loadRows(filters);
      if (!openApprovalWindow(resolvedOpenUrl, popup)) {
        showEditorAlert('지출결의서는 생성되었지만 그룹웨어 호출 주소를 만들 수 없습니다. API 서버의 GwBaseUrl 또는 사용자 EMP_NO 설정을 확인해 주세요.');
      }
    }
    catch (error) {
      popup === null || popup === void 0 ? void 0 : popup.close();
      const message = error instanceof Error ? error.message : '지출결의서 생성 중 오류가 발생했습니다.';
      setEditorErrorMessage(message);
      window.alert(message);
    }
  };
  const handleDeleteApproval = async () => {
    const targetRows = getDeleteApprovalTargetRows();
    if (targetRows.length === 0) {
      window.alert('체크된 항목이 없습니다.');
      return;
    }
    const invalidRow = targetRows.find((row) => row.status !== '종결');
    if (invalidRow) {
      window.alert('[종결] 상태만 삭제요청서를 진행할 수 있습니다.');
      return;
    }
    const confirmed = window.confirm(buildDeleteApprovalConfirmMessage(targetRows));
    if (!confirmed) {
      return;
    }
    const popup = window.open('', '_blank');
    try {
      setEditorErrorMessage('');
      const result = await createFrm206DeleteApproval(targetRows.map((row) => row.id), devUser);
      const resolvedOpenUrl = result.openUrl.trim() || buildLegacyApprovalUrl(result.approKey, '71');
      setSaveMessage('삭제요청서가 생성되었습니다. (' + result.approKey + ')');
      await loadRows(filters);
      if (!openApprovalWindow(resolvedOpenUrl, popup)) {
        showEditorAlert('삭제요청서는 생성되었지만 그룹웨어 호출 주소를 만들 수 없습니다. API 서버의 GwBaseUrl 또는 사용자 EMP_NO 설정을 확인해 주세요.');
      }
    }
    catch (error) {
      popup === null || popup === void 0 ? void 0 : popup.close();
      const message = error instanceof Error ? error.message : '삭제요청서 생성 중 오류가 발생했습니다.';
      setEditorErrorMessage(message);
      window.alert(message);
    }
  };
  const handleIssueAccounting = async () => {
    window.alert('개발중..');
  };
  const handleCancelAccountingIssue = async () => {
    window.alert('개발중..');
  };
  const handleFinishSending = async () => {
    if (!selectedRow) {
      setEditorErrorMessage('송금완료 처리할 행을 먼저 선택해 주세요.');
      return;
    }
    try {
      setEditorErrorMessage('');
      const result = await finishFrm206Sending(selectedRow.id, accountingDate, devUser);
      setSaveMessage(`송금 상태가 ${result.status}로 변경되었습니다.`);
      await loadRows(filters);
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '송금완료 처리 중 오류가 발생했습니다.');
    }
  };
  const handleResetGwStatus = async () => {
    const approKey = String((selectedRow === null || selectedRow === void 0 ? void 0 : selectedRow.acDocNo) ?? '').trim();
    if (!selectedRow) {
      setEditorErrorMessage('상태 초기화할 행을 먼저 선택해 주세요.');
      return;
    }
    if (selectedRow.status !== '상신') {
      setEditorErrorMessage('[상신] 상태에서만 상태 초기화가 가능합니다.');
      return;
    }
    if (!approKey) {
      setEditorErrorMessage('전자결재번호(approkey)가 없어 상태 초기화를 진행할 수 없습니다.');
      return;
    }
    try {
      setEditorErrorMessage('');
      setSaveMessage('');
      const result = await resetFrm206GwInfo(approKey);
      setSaveMessage(result.message || `상태가 ${result.status || '등록'}으로 초기화되었습니다.`);
      await loadRows(filters);
    }
    catch (error) {
      setEditorErrorMessage(error instanceof Error ? error.message : '상태 초기화 처리 중 오류가 발생했습니다.');
    }
  };
  const applyAmountFromTotal = () => {
    const total = toNumber(form.total);
    const amount = Math.round(total / 1.1);
    const vat = total - amount;
    setForm((current) => syncCalculatedAmounts({
      ...current,
      amount: String(amount),
      vat: String(vat),
      total: String(total)
    }));
  };
  const copyTotalToAmount = () => {
    const total = toNumber(form.total);
    setForm((current) => syncCalculatedAmounts({
      ...current,
      amount: String(total),
      vat: '0',
      total: String(total)
    }));
  };
  const applyTotalFromAmountAndVat = () => {
    setForm((current) => syncCalculatedAmounts({
      ...current,
      amount: String(toNumber(current.amount)),
      vat: String(toNumber(current.vat))
    }));
  };
  const applyVatFromAmount = () => {
    const amount = toNumber(form.amount);
    const vat = Math.round(amount * 0.1);
    setForm((current) => syncCalculatedAmounts({
      ...current,
      amount: String(amount),
      vat: String(vat)
    }));
  };
  return _jsxs("div", { className: "frm206-page", children: ["      ", _jsxs("section", { className: "panel search-panel", children: [_jsxs("div", { className: "search-grid", children: [_jsxs("label", { className: "field field--radio", children: [_jsx("span", { children: "\uAE30\uAC04\uAD6C\uBD84" }), _jsxs("div", { className: "field__radios field__radios--vendor", children: [_jsxs("div", { className: "field__radio-item", children: [_jsx(RadioButton, { inputId: "frm206-dateType-document", name: "dateType", value: "document", checked: filters.dateType === 'document', onChange: () => handleDateTypeChange('document') }), _jsx("label", { htmlFor: "frm206-dateType-document", children: "\uC99D\uBE59\uC77C" })] }), _jsxs("div", { className: "field__radio-item", children: [_jsx(RadioButton, { inputId: "frm206-dateType-request", name: "dateType", value: "request", checked: filters.dateType === 'request', onChange: () => handleDateTypeChange('request') }), _jsx("label", { htmlFor: "frm206-dateType-request", children: "\uC1A1\uAE08\uC694\uCCAD\uC77C" })] }), _jsxs("div", { className: "field__radio-item", children: [_jsx(RadioButton, { inputId: "frm206-dateType-all", name: "dateType", value: "all", checked: filters.dateType === 'all', onChange: () => handleDateTypeChange('all') }), _jsx("label", { htmlFor: "frm206-dateType-all", children: "\uBAA8\uB4E0\uAE30\uAC04" })] })] })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "From" }), _jsx("input", { type: "date", value: filters.fromDate, disabled: filters.dateType === 'all', onChange: (event) => handleFilterChange('fromDate', event.target.value) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "To" }), _jsx("input", { type: "date", value: filters.toDate, disabled: filters.dateType === 'all', onChange: (event) => handleFilterChange('toDate', event.target.value) })] }), _jsxs("div", { className: "field field--actions", children: [_jsx("span", { children: "\u00A0" }), _jsxs("div", { className: "panel__actions panel__actions--end", children: [_jsx("button", { type: "button", className: "button button--primary", onClick: handleSearch, disabled: loading, children: "\uC870\uD68C" }), _jsx("button", { type: "button", className: "button button--excel", style: { background: "#1d9b57", borderColor: "#1d9b57", color: "#ffffff" }, onClick: downloadExcelReport, disabled: rows.length === 0, children: "Report" }), canOpenGwSearch ? _jsx("button", { type: "button", className: "button button--ghost", onClick: handleOpenGwSearch, children: "\uD488\uC758\uBC88\uD638 \uC870\uD68C" }) : null, _jsx("button", { type: "button", className: "button button--ghost", onClick: handleReset, children: "Reset" })] })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uC0C1\uD0DC" }), _jsx(Dropdown, { value: filters.status, options: frm206Statuses.map((status) => ({ label: status, value: status })), onChange: (event) => handleFilterChange('status', event.value), placeholder: "\uC0C1\uD0DC \uC120\uD0DD" })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uCF54\uC2A4\uD2B8\uC13C\uD130" }), _jsx(Dropdown, { value: filters.costCenter, options: options.costCenterOptions, optionLabel: "name", optionValue: "code", filter: true, showClear: true, placeholder: "\uCF54\uC2A4\uD2B8\uC13C\uD130 \uAC80\uC0C9", onChange: (event) => {var _a;return handleFilterChange('costCenter', String((_a = event.value) !== null && _a !== void 0 ? _a : ''));} })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uACC4\uC815\uACFC\uBAA9" }), _jsx(Dropdown, { value: filters.account, options: options.accountOptions, optionLabel: "name", optionValue: "code", filter: true, showClear: true, placeholder: "\uACC4\uC815\uACFC\uBAA9 \uAC80\uC0C9", onChange: (event) => {var _a;return handleFilterChange('account', String((_a = event.value) !== null && _a !== void 0 ? _a : ''));} })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uAC70\uB798\uCC98" }), _jsx(Dropdown, { value: filters.supplier, options: options.supplierOptions, optionLabel: "name", optionValue: "code", filter: true, showClear: true, placeholder: "\uAC70\uB798\uCC98 \uAC80\uC0C9", onChange: (event) => {var _a;return handleFilterChange('supplier', String((_a = event.value) !== null && _a !== void 0 ? _a : ''));} })] })] }), _jsxs("div", { className: "action-groups", children: [_jsxs("section", { className: "action-group", children: [_jsx("h3", { children: "\uB370\uC774\uD130 \uAD00\uB9AC" }), _jsxs("div", { className: "action-group__buttons", children: [_jsx("button", { type: "button", className: "button button--primary", onClick: handleCreateMode, children: "\uC785\uB825" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleEditMode, disabled: !selectedRow, children: "\uC218\uC815" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleCancelRequest, disabled: !selectedRow, children: "\uCDE8\uC18C" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleOpenDetail, disabled: !selectedRow, children: "\uC815\uBCF4" })] })] }), _jsxs("section", { className: "action-group", children: [_jsx("h3", { children: "\uC804\uC790\uACB0\uC7AC \uC5F0\uB3D9" }), _jsxs("div", { className: "action-group__buttons", children: [_jsx("button", { type: "button", className: "button button--approval", onClick: handleExpenseApproval, children: "\uC9C0\uCD9C\uACB0\uC758\uC11C" }), _jsx("button", { type: "button", className: "button button--approval", onClick: handleDeleteApproval, children: "\uC0AD\uC81C\uC694\uCCAD\uC11C" })] })] }), options.currentUser.isAdmin ? _jsxs("section", { className: "action-group action-group--accounting", children: [_jsx("h3", { children: "\uD68C\uACC4\uC635\uC158" }), _jsxs("div", { className: "action-group__buttons", children: [_jsx("label", { className: "field field--compact action-group__date", children: _jsx("input", { type: "date", value: accountingDate, onChange: (event) => setAccountingDate(event.target.value) }) }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleIssueAccounting, children: "\uBC1C\uD589" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleCancelAccountingIssue, disabled: !selectedRow, children: "\uCDE8\uC18C" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleFinishSending, disabled: !selectedRow, children: "\uC1A1\uAE08\uC644\uB8CC" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleResetGwStatus, disabled: !selectedRow || selectedRow.status !== "\uC0C1\uC2E0", children: "\uC0C1\uD0DC \uCD08\uAE30\uD654" })] })] }) : null] })] }), _jsxs("div", { className: `content-grid${isEditorVisible ? ' content-grid--editing' : ''}`, children: [_jsxs("section", { className: "panel list-panel", children: [_jsx("div", { className: "panel__title-row", children: _jsx("span", { className: "panel__meta" }) }), listErrorMessage ? _jsx("p", { className: "panel__error", children: listErrorMessage }) : null, _jsx("div", { className: "table-wrap af-table-wrap", children: _jsxs(AFDataTable, { size: "small", value: loading ? [] : sortedRows, tableStyle: { tableLayout: 'fixed' }, resizableColumns: true, columnResizeMode: "expand", showGridlines: true, selectionMode: "checkbox", selection: checkedRows, onSelectionChange: (event) => setCheckedIds((event.value || []).map((row) => row.id)), onRowClick: (event) => handleSelectRow(event.data.id), dataKey: "id", loading: loading, emptyMessage: loading ? '조회 중입니다.' : '조회 결과가 없습니다.', responsiveLayout: "scroll", scrollable: true, scrollHeight: "464px", children: [_jsx(AFColumn, { selectionMode: "multiple", field: "__checkbox__", reorderable: false, headerClassName: "t-header", headerStyle: { width: '3rem' } }, "__checkbox__"), _jsx(AFColumn, { field: "id", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('id'), children: getSortLabel('id', 'CODE') }), headerClassName: "t-header", bodyClassName: "is-number", className: "af-col", style: { width: '7rem', minWidth: '7rem' } }, "id"), _jsx(AFColumn, { field: "status", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('status'), children: getSortLabel('status', '상태') }), headerClassName: "t-header", bodyClassName: "is-center", style: { width: '7rem', minWidth: '7rem' }, body: (row) => _jsx("span", { className: `status-chip status-chip--${row.status}`, children: row.status }) }, "status"), _jsx(AFColumn, { field: "documentDate", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('documentDate'), children: getSortLabel('documentDate', '증빙일') }), headerClassName: "t-header", bodyClassName: "is-center", style: { width: '8rem', minWidth: '8rem' } }, "documentDate"), _jsx(AFColumn, { field: "requestDate", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('requestDate'), children: getSortLabel('requestDate', '송금요청일') }), headerClassName: "t-header", bodyClassName: "is-center", style: { width: '8rem', minWidth: '8rem' } }, "requestDate"), _jsx(AFColumn, { field: "payType", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('payType'), children: getSortLabel('payType', '송금구분') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '9rem', minWidth: '9rem' } }, "payType"), _jsx(AFColumn, { field: "actualDate", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('actualDate'), children: getSortLabel('actualDate', '송금일') }), headerClassName: "t-header", bodyClassName: "is-center", style: { width: '8rem', minWidth: '8rem' }, body: (row) => row.actualDate || '-' }, "actualDate"), _jsx(AFColumn, { field: "costCenterName", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('costCenterName'), children: getSortLabel('costCenterName', '코스트센터') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '13rem', minWidth: '13rem' } }, "costCenterName"), _jsx(AFColumn, { field: "accountName", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('accountName'), children: getSortLabel('accountName', '계정과목') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '14rem', minWidth: '14rem' } }, "accountName"), _jsx(AFColumn, { field: "currency", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('currency'), children: getSortLabel('currency', '환종') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '6rem', minWidth: '6rem' } }, "currency"), _jsx(AFColumn, { field: "actualAmount", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('actualAmount'), children: getSortLabel('actualAmount', '실송금액') }), headerClassName: "t-header", bodyClassName: "is-number", style: { width: '9rem', minWidth: '9rem' }, body: (row) => formatAmount(row.actualAmount) }, "actualAmount"), _jsx(AFColumn, { field: "supplierName", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('supplierName'), children: getSortLabel('supplierName', '거래처') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '13rem', minWidth: '13rem' } }, "supplierName"), _jsx(AFColumn, { field: "cardLabel", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('cardLabel'), children: getSortLabel('cardLabel', '카드결제') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '7rem', minWidth: '7rem' } }, "cardLabel"), _jsx(AFColumn, { field: "requestMethod", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('requestMethod'), children: getSortLabel('requestMethod', '송금방법구분') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '10rem', minWidth: '10rem' } }, "requestMethod"), _jsx(AFColumn, { field: "bankCode", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('bankCode'), children: getSortLabel('bankCode', '은행코드') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '8rem', minWidth: '8rem' } }, "bankCode"), _jsx(AFColumn, { field: "title", header: _jsx("button", { type: "button", className: "sort-button", onClick: () => handleSort('title'), children: getSortLabel('title', 'TITLE') }), headerClassName: "t-header", bodyClassName: "is-text", style: { width: '20rem', minWidth: '20rem' } }, "title")] }) }), _jsxs("div", { className: "summary-bar", children: [_jsx("strong", { children: "\uD658\uC885\uBCC4 \uC2E4\uC1A1\uAE08\uC561 \uD569\uACC4" }), _jsx("span", { children: summaryText || '체크된 항목이 없습니다.' })] })] }), isEditorVisible ? _jsxs("section", { className: "panel editor-panel", children: [_jsxs("div", { className: "panel__title-row editor-panel__header", children: [_jsx("h2", { children: editorMode === 'create' ? '신규 입력' : editorMode === 'edit' ? '수정' : '상세 입력' }), _jsxs("div", { className: "panel__actions", children: [_jsx("button", { type: "button", className: "button button--primary button--analysis", onClick: () => setIsAnalysisOpen(true), disabled: isFormReadOnly, children: "\uACC4\uC0B0\uC11C\uBD84\uC11D" }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleSave, disabled: saving || detailLoading || !canEditCurrent, children: saving ? '저장 중...' : '저장' }), _jsx("button", { type: "button", className: "button button--ghost", onClick: handleCancelEdit, children: "\uCDE8\uC18C" })] })] }), _jsxs("div", { className: "editor-panel__body", children: [saveMessage ? _jsx("p", { className: "panel__success", children: saveMessage }) : null, editorErrorMessage ? _jsx("p", { className: "panel__error", children: editorErrorMessage }) : null, detailLoading ? _jsx("p", { className: "panel__meta", children: "\uC0C1\uC138 \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4." }) : null, selectedRow && !isEditableStatus(form.statusCode) ? _jsx("p", { className: "panel__meta", children: "\uD604\uC7AC \uC0C1\uD0DC\uC5D0\uC11C\uB294 \uC800\uC7A5\uC774 \uBE44\uD65C\uC131\uD654\uB429\uB2C8\uB2E4." }) : null, _jsxs("div", { className: "editor-grid", children: [_jsxs("label", { className: "field field--full", children: [_jsx("span", { children: "TITLE" }), _jsx("input", { type: "text", defaultValue: form.remark, ref: registerEditorInputRef('remark'), disabled: isFormReadOnly, onBlur: () => handleEditorInputBlur('remark') })] }), editorMode === 'create' ? _jsxs("div", { className: "load-row field--full", children: [_jsxs("label", { className: "field", children: [_jsx("span", { children: "\uBD88\uB7EC\uC624\uAE30" }), _jsx("div", { className: "p-dropdown p-component p-inputwrapper p-dropdown-clearable", children: _jsx(Dropdown, { value: selectedTemplateId, options: loadTemplates, optionLabel: "title", optionValue: "id", filter: true, showClear: true, placeholder: "\uC120\uD0DD", onChange: (event) => {var _a;return setSelectedTemplateId(String((_a = event.value) !== null && _a !== void 0 ? _a : ""));} }) })] }), _jsx("button", { type: "button", className: "button button--primary", onClick: handleLoadTemplate, children: "\uBD88\uB7EC\uC624\uAE30" })] }) : null, _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uCF54\uC2A4\uD2B8\uC13C\uD130" }), _jsx(Dropdown, { value: form.costCenterCode, options: options.costCenterOptions, optionLabel: "name", optionValue: "code", filter: true, showClear: true, disabled: isFormReadOnly, placeholder: "\uCF54\uC2A4\uD2B8\uC13C\uD130 \uAC80\uC0C9", onChange: (event) => {var _a;return handleEditorLookupDropdownChange('costCenterCode', String((_a = event.value) !== null && _a !== void 0 ? _a : ''));} })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uACC4\uC815\uACFC\uBAA9" }), _jsx(Dropdown, { value: form.accountCode, options: options.accountOptions, optionLabel: "name", optionValue: "code", filter: true, showClear: true, disabled: isFormReadOnly, placeholder: "\uACC4\uC815\uACFC\uBAA9 \uAC80\uC0C9", onChange: (event) => {var _a;return handleEditorLookupDropdownChange('accountCode', String((_a = event.value) !== null && _a !== void 0 ? _a : ''));} })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uAC70\uB798\uCC98" }), _jsx(Dropdown, { value: form.supplierCode, options: options.supplierOptions, optionLabel: "name", optionValue: "code", filter: true, showClear: true, disabled: isFormReadOnly, placeholder: "\uAC70\uB798\uCC98 \uAC80\uC0C9", onChange: (event) => {var _a;return handleEditorLookupDropdownChange('supplierCode', String((_a = event.value) !== null && _a !== void 0 ? _a : ''));} })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uCE74\uB4DC\uACB0\uC81C" }), _jsx("div", { className: "field__radios field__radios--compact", children: options.cardOptions.map((option) => _jsxs("label", { children: [_jsx("input", { type: "radio", name: "cardCode", checked: form.cardCode === option.value, disabled: isFormReadOnly, onChange: () => handleFormTextChange('cardCode', option.value) }), option.label] }, option.value)) })] }), form.supplierCode ? _jsxs("div", { className: "field field--full bank-selector", children: [_jsx("span", { children: "BANK" }), _jsxs("div", { className: "bank-selector__header", children: [_jsx("strong", { children: form.bankCode ?
                  `${form.bankCode} ${form.bankName} ${form.accountNo} ${form.bankAccountName}`.trim() :
                  '계좌번호와 예금주를 확인한 뒤 선택해 주세요.' }), _jsx("span", { children: banks.length > 0 ?
                  '거래처에 연결된 은행 계좌 목록입니다.' :
                  '선택한 거래처의 은행 정보를 불러오지 못했습니다.' })] }), banks.length > 0 ? _jsx("div", { className: "bank-table-wrap", children: _jsxs("table", { className: "bank-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\uC120\uD0DD" }), _jsx("th", { children: "CODE" }), _jsx("th", { children: "\uC740\uD589\uBA85" }), _jsx("th", { children: "\uACC4\uC88C\uBA85" }), _jsx("th", { children: "\uACC4\uC88C\uBC88\uD638" }), _jsx("th", { children: "SWIFT" })] }) }), _jsx("tbody", { children: banks.map((bank) => _jsxs("tr", { className: bank.code === form.bankCode ? 'is-selected' : undefined, onClick: () => handleBankChange(bank.code), children: [_jsx("td", { children: _jsx("input", { type: "radio", name: "selectedBankCode", checked: bank.code === form.bankCode, onChange: () => handleBankChange(bank.code) }) }), _jsx("td", { children: bank.code }), _jsx("td", { children: bank.name }), _jsx("td", { children: bank.accountName }), _jsx("td", { children: bank.accountNo }), _jsx("td", { children: bank.swiftCode || '-' })] }, bank.code)) })] }) }) : _jsx("div", { className: "bank-table-empty", children: "\uC740\uD589 \uC815\uBCF4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })] }) : null, _jsxs("label", { className: "field field--full", children: [_jsx("span", { children: "\uC1A1\uAE08\uBC29\uBC95\uAD6C\uBD84" }), _jsx("div", { className: "field__radios field__radios--compact", children: options.requestTypeOptions.map((option) => _jsxs("label", { children: [_jsx("input", { type: "radio", name: "requestTypeCode", checked: form.requestTypeCode === option.value, disabled: isFormReadOnly, onChange: () => handleFormTextChange('requestTypeCode', option.value) }), option.label] }, option.value)) })] }), _jsxs("label", { className: "field field--full", children: [_jsx("span", { children: "\uC1A1\uAE08\uC77C\uC790\uAD6C\uBD84" }), _jsx("div", { className: "field__radios field__radios--compact", children: options.payTypeOptions.map((option) => _jsxs("label", { children: [_jsx("input", { type: "radio", name: "payTypeCode", checked: form.payTypeCode === option.value, disabled: isFormReadOnly, onChange: () => handleFormTextChange('payTypeCode', option.value) }), option.label] }, option.value)) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uC99D\uBE59\uC77C" }), _jsx("input", { type: "date", value: form.documentDate, disabled: isFormReadOnly, onChange: (event) => handleFormTextChange('documentDate', event.target.value) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: form.payTypeCode === '4' ? '송금요청월' : '송금요청일' }), form.payTypeCode === '4' ? _jsx("input", { type: "month", value: form.requestMonth, disabled: isFormReadOnly, onChange: (event) => handleRequestMonthChange(event.target.value) }) : _jsx("input", { type: "date", value: form.requestDate, disabled: isFormReadOnly, onChange: (event) => handleFormTextChange('requestDate', event.target.value) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uD658\uC885" }), _jsxs("select", { value: form.currency, disabled: isFormReadOnly, onChange: (event) => handleFormTextChange('currency', event.target.value), children: [_jsx("option", { value: "", children: "\uC120\uD0DD" }), options.currencies.map((currency) => _jsx("option", { value: currency, children: currency }, currency))] })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uCC28\uAC10\uBD84\uB958" }), _jsx("select", { value: form.actOption, disabled: isFormReadOnly, onChange: (event) => handleFormTextChange('actOption', event.target.value), children: options.actOptions.map((option) => _jsx("option", { value: option, children: option }, option)) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uD569\uACC4\uAE08\uC561" }), _jsx("input", { type: "number", defaultValue: form.total, ref: registerEditorInputRef('total'), disabled: isFormReadOnly, onBlur: () => handleEditorInputBlur('total') })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uCC28\uAC10\uC561" }), _jsx("input", { type: "number", value: form.minAmount, disabled: isDeductionDisabled, onChange: (event) => handleMoneyFieldChange('minAmount', event.target.value) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uACF5\uAE09\uAC00\uC561" }), _jsx("input", { type: "number", defaultValue: form.amount, ref: registerEditorInputRef('amount'), disabled: isFormReadOnly, onBlur: () => handleEditorInputBlur('amount') })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uCC28\uAC10\uC0AC\uC720" }), _jsx("input", { type: "text", value: form.actRemark, disabled: isDeductionDisabled, onChange: (event) => handleFormTextChange('actRemark', event.target.value) })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "VAT" }), _jsx("input", { type: "number", defaultValue: form.vat, ref: registerEditorInputRef('vat'), disabled: isFormReadOnly, onBlur: () => handleEditorInputBlur('vat') })] }), _jsxs("label", { className: "field", children: [_jsx("span", { children: "\uC2E4\uC1A1\uAE08\uC561" }), _jsx("input", { type: "number", value: form.actualAmount, readOnly: true })] }), _jsxs("label", { className: "field field--full", children: [_jsx("span", { children: "\uC99D\uBE59\uC11C\uB958\uAD6C\uBD84" }), _jsx("div", { className: "field__radios field__radios--compact", children: options.taxTypeOptions.map((option) => _jsxs("label", { children: [_jsx("input", { type: "radio", name: "taxCode", checked: form.taxCode === option.value, disabled: isFormReadOnly, onChange: () => handleFormTextChange('taxCode', option.value) }), option.label] }, option.value)) })] }), _jsx("div", { className: "field field--full field--links", children: _jsxs("div", { className: "calc-links", children: [_jsx("button", { type: "button", className: "button button--ghost button--calc", disabled: isFormReadOnly, onClick: applyAmountFromTotal, children: "VAT \uACC4\uC0B0(\uD569\uACC4\uAE08\uC561 \uAE30\uC900)" }), _jsx("button", { type: "button", className: "button button--ghost button--calc", disabled: isFormReadOnly, onClick: copyTotalToAmount, children: "\uD569\uACC4\uAE08\uC561 = \uACF5\uAE09\uAC00\uC561" }), _jsx("button", { type: "button", className: "button button--ghost button--calc", disabled: isFormReadOnly, onClick: applyTotalFromAmountAndVat, children: "\uACF5\uAE09\uAC00\uC561+VAT = \uD569\uACC4\uAE08\uC561" }), _jsx("button", { type: "button", className: "button button--ghost button--calc", disabled: isFormReadOnly, onClick: applyVatFromAmount, children: "VAT \uACC4\uC0B0(\uACF5\uAE09\uAC00\uC561 \uAE30\uC900)" })] }) })] })] })] }) : null] }), isDetailOpen && detailData ? _jsx("div", { className: "modal-backdrop", onClick: () => setIsDetailOpen(false), children: _jsxs("div", { className: "modal-panel", onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: "modal-panel__header panel__title-row", children: [_jsx("h2", { children: "\uC0C1\uC138\uC815\uBCF4" }), _jsx("button", { type: "button", className: "button button--ghost", onClick: () => setIsDetailOpen(false), children: "\uB2EB\uAE30" })] }), _jsxs("div", { className: "detail-form", children: [_jsxs("div", { className: "detail-form__row detail-form__row--title", children: [_jsxs("div", { className: "detail-cell detail-cell--split", children: [_jsx("span", { className: "detail-cell__label", children: "CODE" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.id) })] }), _jsxs("div", { className: "detail-cell detail-cell--split", children: [_jsx("span", { className: "detail-cell__label", children: "\uC0C1\uD0DC" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.status) })] })] }), _jsx("div", { className: "detail-form__row", children: _jsxs("div", { className: "detail-cell detail-cell--full", children: [_jsx("span", { className: "detail-cell__label", children: "TITLE" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.remark) })] }) }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC99D\uBE59\uC77C" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.documentDate) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC1A1\uAE08\uC694\uCCAD\uC77C" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.requestDate) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC1A1\uAE08\uC77C" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.actualDate) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uCE74\uB4DC\uACB0\uC81C" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.cardLabel) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC1A1\uAE08\uC77C\uC790\uAD6C\uBD84" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.payTypeLabel) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC1A1\uAE08\uBC29\uBC95\uAD6C\uBD84" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.requestTypeLabel) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell detail-cell--combo", children: [_jsx("span", { className: "detail-cell__label", children: "\uCF54\uC2A4\uD2B8\uC13C\uD130" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.costCenterName) }), _jsx("div", { className: "detail-cell__value detail-cell__value--code", children: getDetailValue(detailData.costCenterCode) })] }), _jsxs("div", { className: "detail-cell detail-cell--combo", children: [_jsx("span", { className: "detail-cell__label", children: "\uACC4\uC815\uACFC\uBAA9" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.accountName) }), _jsx("div", { className: "detail-cell__value detail-cell__value--code", children: getDetailValue(detailData.accountCode) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell detail-cell--combo", children: [_jsx("span", { className: "detail-cell__label", children: "\uAC70\uB798\uCC98" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.supplierName) }), _jsx("div", { className: "detail-cell__value detail-cell__value--code", children: getDetailValue(detailData.supplierCode) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC0AC\uC5C5\uC790\uBC88\uD638" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.supplierRegNo) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC740\uD589\uCF54\uB4DC" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.bankCode) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC740\uD589\uBA85" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.bankName) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uACC4\uC88C\uBA85" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.bankAccountName) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uACC4\uC88C\uBC88\uD638" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.accountNo) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "SWIFT\uCF54\uB4DC" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.swiftCode) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC9C0\uC810\uBA85" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.bankBranch) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uD658\uC885" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.currency) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC99D\uBE59\uC11C\uB958\uAD6C\uBD84" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.taxLabel) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uCC28\uAC10\uBC29\uC2DD" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.actOption) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uCC28\uAC10\uC0AC\uC720" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.actRemark) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uACF5\uAE09\uAC00\uC561" }), _jsx("div", { className: "detail-cell__value detail-cell__value--number", children: formatAmount(detailData.amount) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "VAT" }), _jsx("div", { className: "detail-cell__value detail-cell__value--number", children: formatAmount(detailData.vat) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uD569\uACC4\uAE08\uC561" }), _jsx("div", { className: "detail-cell__value detail-cell__value--number", children: formatAmount(detailData.total) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uCC28\uAC10\uC561" }), _jsx("div", { className: "detail-cell__value detail-cell__value--number", children: formatAmount(detailData.minAmount) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC2E4\uC1A1\uAE08\uC561" }), _jsx("div", { className: "detail-cell__value detail-cell__value--number", children: formatAmount(detailData.actualAmount) })] }), _jsx("div", { className: "detail-cell detail-cell--empty" })] }), _jsx("div", { className: "detail-form__spacer" }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell detail-cell--split", children: [_jsx("span", { className: "detail-cell__label", children: "\uC804\uC790\uACB0\uC7AC\uBC88\uD638" }), _jsx("div", { className: "detail-cell__value detail-cell__value--short", children: getDetailValue(detailData.acDocNo) }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.gwInfo) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC804\uD45C\uBC88\uD638" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.billCd) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uB4F1\uB85D\uC815\uBCF4" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.regInfo) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC218\uC815\uC815\uBCF4" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.updInfo) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uADF8\uB8F9\uC6E8\uC5B4" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.gwInfo) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC804\uD45C\uBC1C\uD589" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.issueInfo) })] })] }), _jsxs("div", { className: "detail-form__row", children: [_jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uC1A1\uAE08\uC644\uB8CC" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.sendInfo) })] }), _jsxs("div", { className: "detail-cell", children: [_jsx("span", { className: "detail-cell__label", children: "\uB4F1\uB85D\uBD80\uC11C" }), _jsx("div", { className: "detail-cell__value", children: getDetailValue(detailData.part) })] })] })] })] }) }) : null, isAnalysisOpen ? _jsx("div", { className: "modal-backdrop", onClick: () => setIsAnalysisOpen(false), children: _jsxs("div", { className: "modal-panel modal-panel--small", style: { minHeight: "340px" }, onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: "modal-panel__header panel__title-row", children: [_jsx("h2", { children: "\uACC4\uC0B0\uC11C\uBD84\uC11D" }), _jsx("button", { type: "button", className: "button button--ghost", onClick: () => setIsAnalysisOpen(false), children: "\uB2EB\uAE30" })] }), _jsxs("div", { className: "analysis-modal", children: [_jsx("p", { className: "panel__meta", style: { textAlign: "left", margin: "0" }, children: "\uC138\uAE08\uACC4\uC0B0\uC11C \uC774\uBBF8\uC9C0\uB97C \uC5C5\uB85C\uB4DC\uD558\uBA74 \uC678\uBD80 \uBD84\uC11D API \uACB0\uACFC\uB97C \uBC1B\uC544 \uAC70\uB798\uCC98\uC640 \uAE08\uC561\uC744 \uC790\uB3D9 \uCC44\uC6C1\uB2C8\uB2E4." }), _jsx("p", { style: { color: "#b23434", fontWeight: 700, lineHeight: 1.5, margin: "0", fontSize: "12px", textAlign: "left" }, children: ["\u0041\u0049\uAC00 \uACC4\uC0B0\uC11C\uB97C \uC77D\uC5B4 \uC790\uB3D9 \uC785\uB825\uD558\uC9C0\uB9CC \uC778\uC2DD \uACB0\uACFC\uAC00 \uD2C0\uB9B4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", _jsx("br", {}), "\uC800\uC7A5 \uC804 \uAC70\uB798\uCC98, \uAE08\uC561, \uB0A0\uC9DC\uB97C \uBC18\uB4DC\uC2DC \uD655\uC778\uD574 \uC8FC\uC138\uC694."] }), _jsx("input", { type: "file", accept: "image/*,.pdf", style: { minHeight: "34px", fontSize: "12px", padding: "6px 0" }, onChange: (event) => {var _a, _b;return setAnalysisFile((_b = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null);} }), _jsx("div", { className: "panel__actions", children: _jsx("button", { type: "button", className: "button button--primary", onClick: handleAnalyzeInvoice, disabled: analysisLoading, children: analysisLoading ? '분석 중...' : '분석 실행' }) })] })] }) }) : null, isGwSearchOpen ? _jsx("div", { className: "modal-backdrop", onClick: () => setIsGwSearchOpen(false), children: _jsxs("div", { className: "modal-panel modal-panel--small", onClick: (event) => event.stopPropagation(), children: [_jsxs("div", { className: "modal-panel__header panel__title-row", children: [_jsx("h2", { children: "\uD488\uC758\uBC88\uD638 \uC870\uD68C" }), _jsx("button", { type: "button", className: "button button--ghost", onClick: () => setIsGwSearchOpen(false), children: "\uB2EB\uAE30" })] }), _jsxs("div", { className: "gw-search-modal", children: [_jsxs("div", { className: "gw-search-form", children: [_jsxs("label", { className: "field", children: [_jsx("span", { children: "\uD488\uC758\uBC88\uD638 or \uC804\uC790\uACB0\uC7AC\uBC88\uD638(approkey)" }), _jsx("input", { type: "text", value: gwSearchText, onChange: (event) => setGwSearchText(event.target.value), onKeyDown: (event) => {if (event.key === 'Enter') {event.preventDefault();void handleSearchGwInfo();}} })] }), _jsx("button", { type: "button", className: "button button--primary", onClick: () => {void handleSearchGwInfo();}, disabled: gwSearchLoading, children: gwSearchLoading ? '조회 중...' : '조회' })] }), gwSearchErrorMessage ? _jsx("p", { className: "panel__error", children: gwSearchErrorMessage }) : null, _jsx("div", { className: "gw-search-results", children: gwSearchRows.length > 0 ? _jsxs("table", { className: "gw-search-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "DOC_NO" }), _jsx("th", { children: "APPROKEY" }), _jsx("th", { children: "제목" })] }) }), _jsx("tbody", { children: gwSearchRows.map((row, index) => _jsxs("tr", { children: [_jsx("td", { children: row.docNo || '-' }), _jsx("td", { children: row.approKey || '-' }), _jsx("td", { children: row.title || '-' })] }, index)) })] }) : _jsx("div", { className: "gw-search-empty", children: gwSearchLoading ? '조회 중입니다.' : '조회 결과가 없습니다.' }) })] })] }) }) : null] });
}
export default Frm206Page;
