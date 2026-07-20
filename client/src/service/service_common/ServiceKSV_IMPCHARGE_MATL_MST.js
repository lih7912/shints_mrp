/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_IMPCHARGE_MATL_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_IMPCHARGE_MATL_MST {
                        allQueryKSV_IMPCHARGE_MATL_MST {
                            id
                            INVOICE_NO
                            SHIP_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            SUPPLIER
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            customs
                            vat
                            freight
                            clearance
                        }
                    }
                `,
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST:",
                JSON.stringify(data.allQueryKSV_IMPCHARGE_MATL_MST.length),
            );
            return data.allQueryKSV_IMPCHARGE_MATL_MST;
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
                    query MgrKsvImpchargeMatlMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvImpchargeMatlMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            SHIP_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            SUPPLIER
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            customs
                            vat
                            freight
                            clearance
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST:",
                JSON.stringify(data.mgrKsvImpchargeMatlMstQuery.length),
            );
            return data.mgrKsvImpchargeMatlMstQuery;
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
                    mutation CreateKSV_IMPCHARGE_MATL_MST(
                        $invoiceNo: String
                        $shipDate: String
                        $deliveryType: String
                        $buyerCd: String
                        $totAmt: Float
                        $adjAmt: Float
                        $ordAmt: Float
                        $currCd: String
                        $remark: String
                        $extInvoice: String
                        $invoiceType: String
                        $supplier: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $customs: Float
                        $vat: Float
                        $freight: Float
                        $clearance: Float
                    ) {
                        createKSV_IMPCHARGE_MATL_MST(
                            INVOICE_NO: $invoiceNo
                            SHIP_DATE: $shipDate
                            DELIVERY_TYPE: $deliveryType
                            BUYER_CD: $buyerCd
                            TOT_AMT: $totAmt
                            ADJ_AMT: $adjAmt
                            ORD_AMT: $ordAmt
                            CURR_CD: $currCd
                            REMARK: $remark
                            EXT_INVOICE: $extInvoice
                            INVOICE_TYPE: $invoiceType
                            SUPPLIER: $supplier
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            customs: $customs
                            vat: $vat
                            freight: $freight
                            clearance: $clearance
                        ) {
                            INVOICE_NO
                            SHIP_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            SUPPLIER
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            customs
                            vat
                            freight
                            clearance
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    shipDate: argData.SHIP_DATE,
                    deliveryType: argData.DELIVERY_TYPE,
                    buyerCd: argData.BUYER_CD,
                    totAmt: argData.TOT_AMT,
                    adjAmt: argData.ADJ_AMT,
                    ordAmt: argData.ORD_AMT,
                    currCd: argData.CURR_CD,
                    remark: argData.REMARK,
                    extInvoice: argData.EXT_INVOICE,
                    invoiceType: argData.INVOICE_TYPE,
                    supplier: argData.SUPPLIER,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    customs: argData.customs,
                    vat: argData.vat,
                    freight: argData.freight,
                    clearance: argData.clearance,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST INSERT:",
                JSON.stringify(data.createKSV_IMPCHARGE_MATL_MST),
            );
            return data.createKSV_IMPCHARGE_MATL_MST;
        } catch (e) {
            console.log(
                "KSV_IMPCHARGE_MATL_MST INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_IMPCHARGE_MATL_MST(
                        $updateKsvImpchargeMatlMstId: Int!
                        $invoiceNo: String
                        $shipDate: String
                        $deliveryType: String
                        $buyerCd: String
                        $totAmt: Float
                        $adjAmt: Float
                        $ordAmt: Float
                        $currCd: String
                        $remark: String
                        $extInvoice: String
                        $invoiceType: String
                        $supplier: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $customs: Float
                        $vat: Float
                        $freight: Float
                        $clearance: Float
                    ) {
                        updateKSV_IMPCHARGE_MATL_MST(
                            id: $updateKsvImpchargeMatlMstId
                            INVOICE_NO: $invoiceNo
                            SHIP_DATE: $shipDate
                            DELIVERY_TYPE: $deliveryType
                            BUYER_CD: $buyerCd
                            TOT_AMT: $totAmt
                            ADJ_AMT: $adjAmt
                            ORD_AMT: $ordAmt
                            CURR_CD: $currCd
                            REMARK: $remark
                            EXT_INVOICE: $extInvoice
                            INVOICE_TYPE: $invoiceType
                            SUPPLIER: $supplier
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            customs: $customs
                            vat: $vat
                            freight: $freight
                            clearance: $clearance
                        ) {
                            id
                            INVOICE_NO
                            SHIP_DATE
                            DELIVERY_TYPE
                            BUYER_CD
                            TOT_AMT
                            ADJ_AMT
                            ORD_AMT
                            CURR_CD
                            REMARK
                            EXT_INVOICE
                            INVOICE_TYPE
                            SUPPLIER
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            customs
                            vat
                            freight
                            clearance
                        }
                    }
                `,
                variables: {
                    updateKsvImpchargeMatlMstId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    shipDate: argData.SHIP_DATE,
                    deliveryType: argData.DELIVERY_TYPE,
                    buyerCd: argData.BUYER_CD,
                    totAmt: argData.TOT_AMT,
                    adjAmt: argData.ADJ_AMT,
                    ordAmt: argData.ORD_AMT,
                    currCd: argData.CURR_CD,
                    remark: argData.REMARK,
                    extInvoice: argData.EXT_INVOICE,
                    invoiceType: argData.INVOICE_TYPE,
                    supplier: argData.SUPPLIER,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    customs: argData.customs,
                    vat: argData.vat,
                    freight: argData.freight,
                    clearance: argData.clearance,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST UPDATE:",
                JSON.stringify(data.updateKSV_IMPCHARGE_MATL_MST),
            );
            return data.updateKSV_IMPCHARGE_MATL_MST;
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
                    mutation DeleteKSV_IMPCHARGE_MATL_MST(
                        $deleteKsvImpchargeMatlMstId: Int!
                    ) {
                        deleteKSV_IMPCHARGE_MATL_MST(
                            id: $deleteKsvImpchargeMatlMstId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvImpchargeMatlMstId: argData.id,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST DELETE:",
                JSON.stringify(data.deleteKSV_IMPCHARGE_MATL_MST),
            );
            return data.deleteKSV_IMPCHARGE_MATL_MST;
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
                    mutation MgrKsvImpchargeMatlMstDeletes(
                        $ids: [InputMgrKsvImpchargeMatlMstDeletes!]!
                    ) {
                        mgrKsvImpchargeMatlMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
