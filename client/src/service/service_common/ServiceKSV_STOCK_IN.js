/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_STOCK_IN {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_IN {
                        allQueryKSV_STOCK_IN {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            IN_QTY
                            TOT_QTY
                            IN_PRICE
                            IN_CURR_CD
                            IN_TYPE
                            IN_STATUS
                            IN_FACTORY_CD
                            OUT_QTY
                            OUT_STATUS
                            PAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PAY_CURR_CD
                            PAY_PRICE
                            EXCH_RATE
                            USD_AMT
                            BILL_FLAG
                            BILL_DATE
                            END_FLAG
                            END_DATE
                            CALC_FLAG
                            PAY_REPORT
                            MIN_FLAG
                            STOCK_QTY
                            FRT_FLAG
                            stock_idx
                            CHECK_END_DATE
                            TT_FLAG
                            REMARK
                            TAX
                            PUR_APP
                            PACK_DATE
                            PACK_EXCH_RATE
                            PACK_USD_AMT
                            PACK_CONFIRM
                            matl_sale_seq
                            BILL_TYPE
                            lc_qty
                            lc_bill_no
                            lc_conf_flag
                            lc_conf_date
                            lc_conf_user
                            vendor_cd
                            buy_date
                            PUR_FACTORY
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_IN:",
                JSON.stringify(data.allQueryKSV_STOCK_IN.length),
            );
            return data.allQueryKSV_STOCK_IN;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockInQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockInQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            IN_QTY
                            TOT_QTY
                            IN_PRICE
                            IN_CURR_CD
                            IN_TYPE
                            IN_STATUS
                            IN_FACTORY_CD
                            OUT_QTY
                            OUT_STATUS
                            PAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PAY_CURR_CD
                            PAY_PRICE
                            EXCH_RATE
                            USD_AMT
                            BILL_FLAG
                            BILL_DATE
                            END_FLAG
                            END_DATE
                            CALC_FLAG
                            PAY_REPORT
                            MIN_FLAG
                            STOCK_QTY
                            FRT_FLAG
                            stock_idx
                            CHECK_END_DATE
                            TT_FLAG
                            REMARK
                            TAX
                            PUR_APP
                            PACK_DATE
                            PACK_EXCH_RATE
                            PACK_USD_AMT
                            PACK_CONFIRM
                            matl_sale_seq
                            BILL_TYPE
                            lc_qty
                            lc_bill_no
                            lc_conf_flag
                            lc_conf_date
                            lc_conf_user
                            vendor_cd
                            buy_date
                            PUR_FACTORY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_IN:",
                JSON.stringify(data.mgrKsvStockInQuery.length),
            );
            return data.mgrKsvStockInQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_STOCK_IN(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inDatetime: String
                        $inQty: Float
                        $totQty: Float
                        $inPrice: Float
                        $inCurrCd: String
                        $inType: String
                        $inStatus: String
                        $inFactoryCd: String
                        $outQty: Float
                        $outStatus: String
                        $payDate: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $payCurrCd: String
                        $payPrice: Float
                        $exchRate: Float
                        $usdAmt: Float
                        $billFlag: String
                        $billDate: String
                        $endFlag: String
                        $endDate: String
                        $calcFlag: String
                        $payReport: String
                        $minFlag: String
                        $stockQty: Float
                        $frtFlag: String
                        $stockIdx: String
                        $checkEndDate: String!
                        $ttFlag: String
                        $remark: String
                        $tax: Float
                        $purApp: String
                        $packDate: String
                        $packExchRate: Float
                        $packUsdAmt: Float
                        $packConfirm: String
                        $matlSaleSeq: Int
                        $billType: String
                        $lcQty: Float
                        $lcBillNo: String
                        $lcConfFlag: String
                        $lcConfDate: String
                        $lcConfUser: String
                        $vendorCd: String
                        $buyDate: String
                        $purFactory: String
                    ) {
                        createKSV_STOCK_IN(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_DATETIME: $inDatetime
                            IN_QTY: $inQty
                            TOT_QTY: $totQty
                            IN_PRICE: $inPrice
                            IN_CURR_CD: $inCurrCd
                            IN_TYPE: $inType
                            IN_STATUS: $inStatus
                            IN_FACTORY_CD: $inFactoryCd
                            OUT_QTY: $outQty
                            OUT_STATUS: $outStatus
                            PAY_DATE: $payDate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PAY_CURR_CD: $payCurrCd
                            PAY_PRICE: $payPrice
                            EXCH_RATE: $exchRate
                            USD_AMT: $usdAmt
                            BILL_FLAG: $billFlag
                            BILL_DATE: $billDate
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            CALC_FLAG: $calcFlag
                            PAY_REPORT: $payReport
                            MIN_FLAG: $minFlag
                            STOCK_QTY: $stockQty
                            FRT_FLAG: $frtFlag
                            stock_idx: $stockIdx
                            CHECK_END_DATE: $checkEndDate
                            TT_FLAG: $ttFlag
                            REMARK: $remark
                            TAX: $tax
                            PUR_APP: $purApp
                            PACK_DATE: $packDate
                            PACK_EXCH_RATE: $packExchRate
                            PACK_USD_AMT: $packUsdAmt
                            PACK_CONFIRM: $packConfirm
                            matl_sale_seq: $matlSaleSeq
                            BILL_TYPE: $billType
                            lc_qty: $lcQty
                            lc_bill_no: $lcBillNo
                            lc_conf_flag: $lcConfFlag
                            lc_conf_date: $lcConfDate
                            lc_conf_user: $lcConfUser
                            vendor_cd: $vendorCd
                            buy_date: $buyDate
                            PUR_FACTORY: $purFactory
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            IN_QTY
                            TOT_QTY
                            IN_PRICE
                            IN_CURR_CD
                            IN_TYPE
                            IN_STATUS
                            IN_FACTORY_CD
                            OUT_QTY
                            OUT_STATUS
                            PAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PAY_CURR_CD
                            PAY_PRICE
                            EXCH_RATE
                            USD_AMT
                            BILL_FLAG
                            BILL_DATE
                            END_FLAG
                            END_DATE
                            CALC_FLAG
                            PAY_REPORT
                            MIN_FLAG
                            STOCK_QTY
                            FRT_FLAG
                            stock_idx
                            CHECK_END_DATE
                            TT_FLAG
                            REMARK
                            TAX
                            PUR_APP
                            PACK_DATE
                            PACK_EXCH_RATE
                            PACK_USD_AMT
                            PACK_CONFIRM
                            matl_sale_seq
                            BILL_TYPE
                            lc_qty
                            lc_bill_no
                            lc_conf_flag
                            lc_conf_date
                            lc_conf_user
                            vendor_cd
                            buy_date
                            PUR_FACTORY
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    inDatetime: argData.IN_DATETIME,
                    inQty: argData.IN_QTY,
                    totQty: argData.TOT_QTY,
                    inPrice: argData.IN_PRICE,
                    inCurrCd: argData.IN_CURR_CD,
                    inType: argData.IN_TYPE,
                    inStatus: argData.IN_STATUS,
                    inFactoryCd: argData.IN_FACTORY_CD,
                    outQty: argData.OUT_QTY,
                    outStatus: argData.OUT_STATUS,
                    payDate: argData.PAY_DATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    payCurrCd: argData.PAY_CURR_CD,
                    payPrice: argData.PAY_PRICE,
                    exchRate: argData.EXCH_RATE,
                    usdAmt: argData.USD_AMT,
                    billFlag: argData.BILL_FLAG,
                    billDate: argData.BILL_DATE,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    calcFlag: argData.CALC_FLAG,
                    payReport: argData.PAY_REPORT,
                    minFlag: argData.MIN_FLAG,
                    stockQty: argData.STOCK_QTY,
                    frtFlag: argData.FRT_FLAG,
                    stockIdx: argData.stock_idx,
                    checkEndDate: argData.CHECK_END_DATE,
                    ttFlag: argData.TT_FLAG,
                    remark: argData.REMARK,
                    tax: argData.TAX,
                    purApp: argData.PUR_APP,
                    packDate: argData.PACK_DATE,
                    packExchRate: argData.PACK_EXCH_RATE,
                    packUsdAmt: argData.PACK_USD_AMT,
                    packConfirm: argData.PACK_CONFIRM,
                    matlSaleSeq: argData.matl_sale_seq,
                    billType: argData.BILL_TYPE,
                    lcQty: argData.lc_qty,
                    lcBillNo: argData.lc_bill_no,
                    lcConfFlag: argData.lc_conf_flag,
                    lcConfDate: argData.lc_conf_date,
                    lcConfUser: argData.lc_conf_user,
                    vendorCd: argData.vendor_cd,
                    buyDate: argData.buy_date,
                    purFactory: argData.PUR_FACTORY,
                },
            });
            console.log(
                "KSV_STOCK_IN INSERT:",
                JSON.stringify(data.createKSV_STOCK_IN),
            );
            return data.createKSV_STOCK_IN;
        } catch (e) {
            console.log("KSV_STOCK_IN INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_STOCK_IN(
                        $updateKsvStockInId: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inDatetime: String
                        $inQty: Float
                        $totQty: Float
                        $inPrice: Float
                        $inCurrCd: String
                        $inType: String
                        $inStatus: String
                        $inFactoryCd: String
                        $outQty: Float
                        $outStatus: String
                        $payDate: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $payCurrCd: String
                        $payPrice: Float
                        $exchRate: Float
                        $usdAmt: Float
                        $billFlag: String
                        $billDate: String
                        $endFlag: String
                        $endDate: String
                        $calcFlag: String
                        $payReport: String
                        $minFlag: String
                        $stockQty: Float
                        $frtFlag: String
                        $stockIdx: String
                        $checkEndDate: String!
                        $ttFlag: String
                        $remark: String
                        $tax: Float
                        $purApp: String
                        $packDate: String
                        $packExchRate: Float
                        $packUsdAmt: Float
                        $packConfirm: String
                        $matlSaleSeq: Int
                        $billType: String
                        $lcQty: Float
                        $lcBillNo: String
                        $lcConfFlag: String
                        $lcConfDate: String
                        $lcConfUser: String
                        $vendorCd: String
                        $buyDate: String
                        $purFactory: String
                    ) {
                        updateKSV_STOCK_IN(
                            id: $updateKsvStockInId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_DATETIME: $inDatetime
                            IN_QTY: $inQty
                            TOT_QTY: $totQty
                            IN_PRICE: $inPrice
                            IN_CURR_CD: $inCurrCd
                            IN_TYPE: $inType
                            IN_STATUS: $inStatus
                            IN_FACTORY_CD: $inFactoryCd
                            OUT_QTY: $outQty
                            OUT_STATUS: $outStatus
                            PAY_DATE: $payDate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PAY_CURR_CD: $payCurrCd
                            PAY_PRICE: $payPrice
                            EXCH_RATE: $exchRate
                            USD_AMT: $usdAmt
                            BILL_FLAG: $billFlag
                            BILL_DATE: $billDate
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            CALC_FLAG: $calcFlag
                            PAY_REPORT: $payReport
                            MIN_FLAG: $minFlag
                            STOCK_QTY: $stockQty
                            FRT_FLAG: $frtFlag
                            stock_idx: $stockIdx
                            CHECK_END_DATE: $checkEndDate
                            TT_FLAG: $ttFlag
                            REMARK: $remark
                            TAX: $tax
                            PUR_APP: $purApp
                            PACK_DATE: $packDate
                            PACK_EXCH_RATE: $packExchRate
                            PACK_USD_AMT: $packUsdAmt
                            PACK_CONFIRM: $packConfirm
                            matl_sale_seq: $matlSaleSeq
                            BILL_TYPE: $billType
                            lc_qty: $lcQty
                            lc_bill_no: $lcBillNo
                            lc_conf_flag: $lcConfFlag
                            lc_conf_date: $lcConfDate
                            lc_conf_user: $lcConfUser
                            vendor_cd: $vendorCd
                            buy_date: $buyDate
                            PUR_FACTORY: $purFactory
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            IN_QTY
                            TOT_QTY
                            IN_PRICE
                            IN_CURR_CD
                            IN_TYPE
                            IN_STATUS
                            IN_FACTORY_CD
                            OUT_QTY
                            OUT_STATUS
                            PAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PAY_CURR_CD
                            PAY_PRICE
                            EXCH_RATE
                            USD_AMT
                            BILL_FLAG
                            BILL_DATE
                            END_FLAG
                            END_DATE
                            CALC_FLAG
                            PAY_REPORT
                            MIN_FLAG
                            STOCK_QTY
                            FRT_FLAG
                            stock_idx
                            CHECK_END_DATE
                            TT_FLAG
                            REMARK
                            TAX
                            PUR_APP
                            PACK_DATE
                            PACK_EXCH_RATE
                            PACK_USD_AMT
                            PACK_CONFIRM
                            matl_sale_seq
                            BILL_TYPE
                            lc_qty
                            lc_bill_no
                            lc_conf_flag
                            lc_conf_date
                            lc_conf_user
                            vendor_cd
                            buy_date
                            PUR_FACTORY
                        }
                    }
                `,
                variables: {
                    updateKsvStockInId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    inDatetime: argData.IN_DATETIME,
                    inQty: argData.IN_QTY,
                    totQty: argData.TOT_QTY,
                    inPrice: argData.IN_PRICE,
                    inCurrCd: argData.IN_CURR_CD,
                    inType: argData.IN_TYPE,
                    inStatus: argData.IN_STATUS,
                    inFactoryCd: argData.IN_FACTORY_CD,
                    outQty: argData.OUT_QTY,
                    outStatus: argData.OUT_STATUS,
                    payDate: argData.PAY_DATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    payCurrCd: argData.PAY_CURR_CD,
                    payPrice: argData.PAY_PRICE,
                    exchRate: argData.EXCH_RATE,
                    usdAmt: argData.USD_AMT,
                    billFlag: argData.BILL_FLAG,
                    billDate: argData.BILL_DATE,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    calcFlag: argData.CALC_FLAG,
                    payReport: argData.PAY_REPORT,
                    minFlag: argData.MIN_FLAG,
                    stockQty: argData.STOCK_QTY,
                    frtFlag: argData.FRT_FLAG,
                    stockIdx: argData.stock_idx,
                    checkEndDate: argData.CHECK_END_DATE,
                    ttFlag: argData.TT_FLAG,
                    remark: argData.REMARK,
                    tax: argData.TAX,
                    purApp: argData.PUR_APP,
                    packDate: argData.PACK_DATE,
                    packExchRate: argData.PACK_EXCH_RATE,
                    packUsdAmt: argData.PACK_USD_AMT,
                    packConfirm: argData.PACK_CONFIRM,
                    matlSaleSeq: argData.matl_sale_seq,
                    billType: argData.BILL_TYPE,
                    lcQty: argData.lc_qty,
                    lcBillNo: argData.lc_bill_no,
                    lcConfFlag: argData.lc_conf_flag,
                    lcConfDate: argData.lc_conf_date,
                    lcConfUser: argData.lc_conf_user,
                    vendorCd: argData.vendor_cd,
                    buyDate: argData.buy_date,
                    purFactory: argData.PUR_FACTORY,
                },
            });
            console.log(
                "KSV_STOCK_IN UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_IN),
            );
            return data.updateKSV_STOCK_IN;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_STOCK_IN($deleteKsvStockInId: Int!) {
                        deleteKSV_STOCK_IN(id: $deleteKsvStockInId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockInId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_IN DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_IN),
            );
            return data.deleteKSV_STOCK_IN;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tObjs = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tOne = argDatas[tIdx];
            var tOneObj = {};
            tOneObj.id = tOne.id;
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.ids = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvStockInDeletes(
                        $ids: [InputMgrKsvStockInDeletes!]!
                    ) {
                        mgrKsvStockInDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_IN DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
