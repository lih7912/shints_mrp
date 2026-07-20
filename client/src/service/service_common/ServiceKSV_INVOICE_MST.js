/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_INVOICE_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_MST {
                        allQueryKSV_INVOICE_MST {
                            id
                            INVOICE_NO
                            SHIP_DATE
                            DUE_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DOCU_NO
                            VALUE_FLAG
                            VALUE_USER
                            VALUE_DATETIME
                            FACTORY_CD
                            TRADE_TYPE
                            PAYMENT_TYPE
                            TO_NAME
                            ETA
                            MEASUREMENT
                            GROSS_WEIGHT
                            TOTAL_CTNS
                            BL_NO
                            FORWARDER_NAME
                            FREIGHT_COST
                            AIR_RATE
                            PAYMENT_TERM
                            DHL_NO
                            DOC_REC_DATE
                            DOC_SEND_DATE
                            SHIP_ADV_DATE
                            FULL_DOC_REC_DATE
                            TRANSFER_DATE
                            MANAGE_AMT
                            LICENSE_NO
                            LICENSE_DATE
                            ETC_AMT
                            TRADE_TYPE2
                            VOS_AMT
                            VAT_AMT
                            VAT_DATE
                            org_reg_datetime
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_MST:",
                JSON.stringify(data.allQueryKSV_INVOICE_MST.length),
            );
            return data.allQueryKSV_INVOICE_MST;
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
                    query MgrKsvInvoiceMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            SHIP_DATE
                            DUE_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DOCU_NO
                            VALUE_FLAG
                            VALUE_USER
                            VALUE_DATETIME
                            FACTORY_CD
                            TRADE_TYPE
                            PAYMENT_TYPE
                            TO_NAME
                            ETA
                            MEASUREMENT
                            GROSS_WEIGHT
                            TOTAL_CTNS
                            BL_NO
                            FORWARDER_NAME
                            FREIGHT_COST
                            AIR_RATE
                            PAYMENT_TERM
                            DHL_NO
                            DOC_REC_DATE
                            DOC_SEND_DATE
                            SHIP_ADV_DATE
                            FULL_DOC_REC_DATE
                            TRANSFER_DATE
                            MANAGE_AMT
                            LICENSE_NO
                            LICENSE_DATE
                            ETC_AMT
                            TRADE_TYPE2
                            VOS_AMT
                            VAT_AMT
                            VAT_DATE
                            org_reg_datetime
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_MST:",
                JSON.stringify(data.mgrKsvInvoiceMstQuery.length),
            );
            return data.mgrKsvInvoiceMstQuery;
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
                    mutation CreateKSV_INVOICE_MST(
                        $invoiceNo: String
                        $shipDate: String
                        $dueDate: String
                        $deliveryType: String
                        $buyerCd: String
                        $totAmt: Float
                        $adjAmt: Float
                        $ordAmt: Float
                        $currCd: String
                        $remark: String
                        $extInvoice: String
                        $invoiceType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $docuNo: String
                        $valueFlag: String
                        $valueUser: String
                        $valueDatetime: String
                        $factoryCd: String
                        $tradeType: String
                        $paymentType: String
                        $toName: String
                        $eta: String
                        $measurement: Float
                        $grossWeight: Float
                        $totalCtns: Int
                        $blNo: String
                        $forwarderName: String
                        $freightCost: Float
                        $airRate: Float
                        $paymentTerm: String
                        $dhlNo: String
                        $docRecDate: String
                        $docSendDate: String
                        $shipAdvDate: String
                        $fullDocRecDate: String
                        $transferDate: String
                        $manageAmt: Float
                        $licenseNo: String
                        $licenseDate: String
                        $etcAmt: Float
                        $tradeType2: String
                        $vosAmt: Float
                        $vatAmt: Float
                        $vatDate: String
                        $orgRegDatetime: String
                    ) {
                        createKSV_INVOICE_MST(
                            INVOICE_NO: $invoiceNo
                            SHIP_DATE: $shipDate
                            DUE_DATE: $dueDate
                            DELIVERY_TYPE: $deliveryType
                            BUYER_CD: $buyerCd
                            TOT_AMT: $totAmt
                            ADJ_AMT: $adjAmt
                            ORD_AMT: $ordAmt
                            CURR_CD: $currCd
                            REMARK: $remark
                            EXT_INVOICE: $extInvoice
                            INVOICE_TYPE: $invoiceType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            DOCU_NO: $docuNo
                            VALUE_FLAG: $valueFlag
                            VALUE_USER: $valueUser
                            VALUE_DATETIME: $valueDatetime
                            FACTORY_CD: $factoryCd
                            TRADE_TYPE: $tradeType
                            PAYMENT_TYPE: $paymentType
                            TO_NAME: $toName
                            ETA: $eta
                            MEASUREMENT: $measurement
                            GROSS_WEIGHT: $grossWeight
                            TOTAL_CTNS: $totalCtns
                            BL_NO: $blNo
                            FORWARDER_NAME: $forwarderName
                            FREIGHT_COST: $freightCost
                            AIR_RATE: $airRate
                            PAYMENT_TERM: $paymentTerm
                            DHL_NO: $dhlNo
                            DOC_REC_DATE: $docRecDate
                            DOC_SEND_DATE: $docSendDate
                            SHIP_ADV_DATE: $shipAdvDate
                            FULL_DOC_REC_DATE: $fullDocRecDate
                            TRANSFER_DATE: $transferDate
                            MANAGE_AMT: $manageAmt
                            LICENSE_NO: $licenseNo
                            LICENSE_DATE: $licenseDate
                            ETC_AMT: $etcAmt
                            TRADE_TYPE2: $tradeType2
                            VOS_AMT: $vosAmt
                            VAT_AMT: $vatAmt
                            VAT_DATE: $vatDate
                            org_reg_datetime: $orgRegDatetime
                        ) {
                            INVOICE_NO
                            SHIP_DATE
                            DUE_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DOCU_NO
                            VALUE_FLAG
                            VALUE_USER
                            VALUE_DATETIME
                            FACTORY_CD
                            TRADE_TYPE
                            PAYMENT_TYPE
                            TO_NAME
                            ETA
                            MEASUREMENT
                            GROSS_WEIGHT
                            TOTAL_CTNS
                            BL_NO
                            FORWARDER_NAME
                            FREIGHT_COST
                            AIR_RATE
                            PAYMENT_TERM
                            DHL_NO
                            DOC_REC_DATE
                            DOC_SEND_DATE
                            SHIP_ADV_DATE
                            FULL_DOC_REC_DATE
                            TRANSFER_DATE
                            MANAGE_AMT
                            LICENSE_NO
                            LICENSE_DATE
                            ETC_AMT
                            TRADE_TYPE2
                            VOS_AMT
                            VAT_AMT
                            VAT_DATE
                            org_reg_datetime
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    shipDate: argData.SHIP_DATE,
                    dueDate: argData.DUE_DATE,
                    deliveryType: argData.DELIVERY_TYPE,
                    buyerCd: argData.BUYER_CD,
                    totAmt: argData.TOT_AMT,
                    adjAmt: argData.ADJ_AMT,
                    ordAmt: argData.ORD_AMT,
                    currCd: argData.CURR_CD,
                    remark: argData.REMARK,
                    extInvoice: argData.EXT_INVOICE,
                    invoiceType: argData.INVOICE_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    docuNo: argData.DOCU_NO,
                    valueFlag: argData.VALUE_FLAG,
                    valueUser: argData.VALUE_USER,
                    valueDatetime: argData.VALUE_DATETIME,
                    factoryCd: argData.FACTORY_CD,
                    tradeType: argData.TRADE_TYPE,
                    paymentType: argData.PAYMENT_TYPE,
                    toName: argData.TO_NAME,
                    eta: argData.ETA,
                    measurement: argData.MEASUREMENT,
                    grossWeight: argData.GROSS_WEIGHT,
                    totalCtns: argData.TOTAL_CTNS,
                    blNo: argData.BL_NO,
                    forwarderName: argData.FORWARDER_NAME,
                    freightCost: argData.FREIGHT_COST,
                    airRate: argData.AIR_RATE,
                    paymentTerm: argData.PAYMENT_TERM,
                    dhlNo: argData.DHL_NO,
                    docRecDate: argData.DOC_REC_DATE,
                    docSendDate: argData.DOC_SEND_DATE,
                    shipAdvDate: argData.SHIP_ADV_DATE,
                    fullDocRecDate: argData.FULL_DOC_REC_DATE,
                    transferDate: argData.TRANSFER_DATE,
                    manageAmt: argData.MANAGE_AMT,
                    licenseNo: argData.LICENSE_NO,
                    licenseDate: argData.LICENSE_DATE,
                    etcAmt: argData.ETC_AMT,
                    tradeType2: argData.TRADE_TYPE2,
                    vosAmt: argData.VOS_AMT,
                    vatAmt: argData.VAT_AMT,
                    vatDate: argData.VAT_DATE,
                    orgRegDatetime: argData.org_reg_datetime,
                },
            });
            console.log(
                "KSV_INVOICE_MST INSERT:",
                JSON.stringify(data.createKSV_INVOICE_MST),
            );
            return data.createKSV_INVOICE_MST;
        } catch (e) {
            console.log("KSV_INVOICE_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVOICE_MST(
                        $updateKsvInvoiceMstId: Int!
                        $invoiceNo: String
                        $shipDate: String
                        $dueDate: String
                        $deliveryType: String
                        $buyerCd: String
                        $totAmt: Float
                        $adjAmt: Float
                        $ordAmt: Float
                        $currCd: String
                        $remark: String
                        $extInvoice: String
                        $invoiceType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $docuNo: String
                        $valueFlag: String
                        $valueUser: String
                        $valueDatetime: String
                        $factoryCd: String
                        $tradeType: String
                        $paymentType: String
                        $toName: String
                        $eta: String
                        $measurement: Float
                        $grossWeight: Float
                        $totalCtns: Int
                        $blNo: String
                        $forwarderName: String
                        $freightCost: Float
                        $airRate: Float
                        $paymentTerm: String
                        $dhlNo: String
                        $docRecDate: String
                        $docSendDate: String
                        $shipAdvDate: String
                        $fullDocRecDate: String
                        $transferDate: String
                        $manageAmt: Float
                        $licenseNo: String
                        $licenseDate: String
                        $etcAmt: Float
                        $tradeType2: String
                        $vosAmt: Float
                        $vatAmt: Float
                        $vatDate: String
                        $orgRegDatetime: String
                    ) {
                        updateKSV_INVOICE_MST(
                            id: $updateKsvInvoiceMstId
                            INVOICE_NO: $invoiceNo
                            SHIP_DATE: $shipDate
                            DUE_DATE: $dueDate
                            DELIVERY_TYPE: $deliveryType
                            BUYER_CD: $buyerCd
                            TOT_AMT: $totAmt
                            ADJ_AMT: $adjAmt
                            ORD_AMT: $ordAmt
                            CURR_CD: $currCd
                            REMARK: $remark
                            EXT_INVOICE: $extInvoice
                            INVOICE_TYPE: $invoiceType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            DOCU_NO: $docuNo
                            VALUE_FLAG: $valueFlag
                            VALUE_USER: $valueUser
                            VALUE_DATETIME: $valueDatetime
                            FACTORY_CD: $factoryCd
                            TRADE_TYPE: $tradeType
                            PAYMENT_TYPE: $paymentType
                            TO_NAME: $toName
                            ETA: $eta
                            MEASUREMENT: $measurement
                            GROSS_WEIGHT: $grossWeight
                            TOTAL_CTNS: $totalCtns
                            BL_NO: $blNo
                            FORWARDER_NAME: $forwarderName
                            FREIGHT_COST: $freightCost
                            AIR_RATE: $airRate
                            PAYMENT_TERM: $paymentTerm
                            DHL_NO: $dhlNo
                            DOC_REC_DATE: $docRecDate
                            DOC_SEND_DATE: $docSendDate
                            SHIP_ADV_DATE: $shipAdvDate
                            FULL_DOC_REC_DATE: $fullDocRecDate
                            TRANSFER_DATE: $transferDate
                            MANAGE_AMT: $manageAmt
                            LICENSE_NO: $licenseNo
                            LICENSE_DATE: $licenseDate
                            ETC_AMT: $etcAmt
                            TRADE_TYPE2: $tradeType2
                            VOS_AMT: $vosAmt
                            VAT_AMT: $vatAmt
                            VAT_DATE: $vatDate
                            org_reg_datetime: $orgRegDatetime
                        ) {
                            id
                            INVOICE_NO
                            SHIP_DATE
                            DUE_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DOCU_NO
                            VALUE_FLAG
                            VALUE_USER
                            VALUE_DATETIME
                            FACTORY_CD
                            TRADE_TYPE
                            PAYMENT_TYPE
                            TO_NAME
                            ETA
                            MEASUREMENT
                            GROSS_WEIGHT
                            TOTAL_CTNS
                            BL_NO
                            FORWARDER_NAME
                            FREIGHT_COST
                            AIR_RATE
                            PAYMENT_TERM
                            DHL_NO
                            DOC_REC_DATE
                            DOC_SEND_DATE
                            SHIP_ADV_DATE
                            FULL_DOC_REC_DATE
                            TRANSFER_DATE
                            MANAGE_AMT
                            LICENSE_NO
                            LICENSE_DATE
                            ETC_AMT
                            TRADE_TYPE2
                            VOS_AMT
                            VAT_AMT
                            VAT_DATE
                            org_reg_datetime
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceMstId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    shipDate: argData.SHIP_DATE,
                    dueDate: argData.DUE_DATE,
                    deliveryType: argData.DELIVERY_TYPE,
                    buyerCd: argData.BUYER_CD,
                    totAmt: argData.TOT_AMT,
                    adjAmt: argData.ADJ_AMT,
                    ordAmt: argData.ORD_AMT,
                    currCd: argData.CURR_CD,
                    remark: argData.REMARK,
                    extInvoice: argData.EXT_INVOICE,
                    invoiceType: argData.INVOICE_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    docuNo: argData.DOCU_NO,
                    valueFlag: argData.VALUE_FLAG,
                    valueUser: argData.VALUE_USER,
                    valueDatetime: argData.VALUE_DATETIME,
                    factoryCd: argData.FACTORY_CD,
                    tradeType: argData.TRADE_TYPE,
                    paymentType: argData.PAYMENT_TYPE,
                    toName: argData.TO_NAME,
                    eta: argData.ETA,
                    measurement: argData.MEASUREMENT,
                    grossWeight: argData.GROSS_WEIGHT,
                    totalCtns: argData.TOTAL_CTNS,
                    blNo: argData.BL_NO,
                    forwarderName: argData.FORWARDER_NAME,
                    freightCost: argData.FREIGHT_COST,
                    airRate: argData.AIR_RATE,
                    paymentTerm: argData.PAYMENT_TERM,
                    dhlNo: argData.DHL_NO,
                    docRecDate: argData.DOC_REC_DATE,
                    docSendDate: argData.DOC_SEND_DATE,
                    shipAdvDate: argData.SHIP_ADV_DATE,
                    fullDocRecDate: argData.FULL_DOC_REC_DATE,
                    transferDate: argData.TRANSFER_DATE,
                    manageAmt: argData.MANAGE_AMT,
                    licenseNo: argData.LICENSE_NO,
                    licenseDate: argData.LICENSE_DATE,
                    etcAmt: argData.ETC_AMT,
                    tradeType2: argData.TRADE_TYPE2,
                    vosAmt: argData.VOS_AMT,
                    vatAmt: argData.VAT_AMT,
                    vatDate: argData.VAT_DATE,
                    orgRegDatetime: argData.org_reg_datetime,
                },
            });
            console.log(
                "KSV_INVOICE_MST UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_MST),
            );
            return data.updateKSV_INVOICE_MST;
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
                    mutation DeleteKSV_INVOICE_MST(
                        $deleteKsvInvoiceMstId: Int!
                    ) {
                        deleteKSV_INVOICE_MST(id: $deleteKsvInvoiceMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceMstId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_MST DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_MST),
            );
            return data.deleteKSV_INVOICE_MST;
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
                    mutation MgrKsvInvoiceMstDeletes(
                        $ids: [InputMgrKsvInvoiceMstDeletes!]!
                    ) {
                        mgrKsvInvoiceMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
