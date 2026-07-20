/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_IMPCHARGE_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_IMPCHARGE_MEM {
                        allQueryKSV_IMPCHARGE_MEM {
                            id
                            INVOICE_NO
                            ORDER_CD
                            SEQ
                            SHIP_QTY
                            SHIP_PRICE
                            ORD_PRICE
                            DIFF_PRICE
                            TOT_AMT
                            PO_CD
                            FACTORY_CD
                            COUNTRY
                            SHIP_DATE
                            SHIP_PTYPE
                            NAT_CD
                            DELIVERY_TYPE
                        }
                    }
                `,
            });
            console.log(
                "KSV_IMPCHARGE_MEM:",
                JSON.stringify(data.allQueryKSV_IMPCHARGE_MEM.length),
            );
            return data.allQueryKSV_IMPCHARGE_MEM;
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
                    query MgrKsvImpchargeMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvImpchargeMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            ORDER_CD
                            SEQ
                            SHIP_QTY
                            SHIP_PRICE
                            ORD_PRICE
                            DIFF_PRICE
                            TOT_AMT
                            PO_CD
                            FACTORY_CD
                            COUNTRY
                            SHIP_DATE
                            SHIP_PTYPE
                            NAT_CD
                            DELIVERY_TYPE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_IMPCHARGE_MEM:",
                JSON.stringify(data.mgrKsvImpchargeMemQuery.length),
            );
            return data.mgrKsvImpchargeMemQuery;
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
                    mutation CreateKSV_IMPCHARGE_MEM(
                        $invoiceNo: String
                        $orderCd: String
                        $seq: Int
                        $shipQty: Float
                        $shipPrice: Float
                        $ordPrice: Float
                        $diffPrice: Float
                        $totAmt: Float
                        $poCd: String
                        $factoryCd: String
                        $country: String
                        $shipDate: String
                        $shipPtype: String
                        $natCd: String
                        $deliveryType: String
                    ) {
                        createKSV_IMPCHARGE_MEM(
                            INVOICE_NO: $invoiceNo
                            ORDER_CD: $orderCd
                            SEQ: $seq
                            SHIP_QTY: $shipQty
                            SHIP_PRICE: $shipPrice
                            ORD_PRICE: $ordPrice
                            DIFF_PRICE: $diffPrice
                            TOT_AMT: $totAmt
                            PO_CD: $poCd
                            FACTORY_CD: $factoryCd
                            COUNTRY: $country
                            SHIP_DATE: $shipDate
                            SHIP_PTYPE: $shipPtype
                            NAT_CD: $natCd
                            DELIVERY_TYPE: $deliveryType
                        ) {
                            INVOICE_NO
                            ORDER_CD
                            SEQ
                            SHIP_QTY
                            SHIP_PRICE
                            ORD_PRICE
                            DIFF_PRICE
                            TOT_AMT
                            PO_CD
                            FACTORY_CD
                            COUNTRY
                            SHIP_DATE
                            SHIP_PTYPE
                            NAT_CD
                            DELIVERY_TYPE
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    orderCd: argData.ORDER_CD,
                    seq: argData.SEQ,
                    shipQty: argData.SHIP_QTY,
                    shipPrice: argData.SHIP_PRICE,
                    ordPrice: argData.ORD_PRICE,
                    diffPrice: argData.DIFF_PRICE,
                    totAmt: argData.TOT_AMT,
                    poCd: argData.PO_CD,
                    factoryCd: argData.FACTORY_CD,
                    country: argData.COUNTRY,
                    shipDate: argData.SHIP_DATE,
                    shipPtype: argData.SHIP_PTYPE,
                    natCd: argData.NAT_CD,
                    deliveryType: argData.DELIVERY_TYPE,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MEM INSERT:",
                JSON.stringify(data.createKSV_IMPCHARGE_MEM),
            );
            return data.createKSV_IMPCHARGE_MEM;
        } catch (e) {
            console.log("KSV_IMPCHARGE_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_IMPCHARGE_MEM(
                        $updateKsvImpchargeMemId: Int!
                        $invoiceNo: String
                        $orderCd: String
                        $seq: Int
                        $shipQty: Float
                        $shipPrice: Float
                        $ordPrice: Float
                        $diffPrice: Float
                        $totAmt: Float
                        $poCd: String
                        $factoryCd: String
                        $country: String
                        $shipDate: String
                        $shipPtype: String
                        $natCd: String
                        $deliveryType: String
                    ) {
                        updateKSV_IMPCHARGE_MEM(
                            id: $updateKsvImpchargeMemId
                            INVOICE_NO: $invoiceNo
                            ORDER_CD: $orderCd
                            SEQ: $seq
                            SHIP_QTY: $shipQty
                            SHIP_PRICE: $shipPrice
                            ORD_PRICE: $ordPrice
                            DIFF_PRICE: $diffPrice
                            TOT_AMT: $totAmt
                            PO_CD: $poCd
                            FACTORY_CD: $factoryCd
                            COUNTRY: $country
                            SHIP_DATE: $shipDate
                            SHIP_PTYPE: $shipPtype
                            NAT_CD: $natCd
                            DELIVERY_TYPE: $deliveryType
                        ) {
                            id
                            INVOICE_NO
                            ORDER_CD
                            SEQ
                            SHIP_QTY
                            SHIP_PRICE
                            ORD_PRICE
                            DIFF_PRICE
                            TOT_AMT
                            PO_CD
                            FACTORY_CD
                            COUNTRY
                            SHIP_DATE
                            SHIP_PTYPE
                            NAT_CD
                            DELIVERY_TYPE
                        }
                    }
                `,
                variables: {
                    updateKsvImpchargeMemId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    orderCd: argData.ORDER_CD,
                    seq: argData.SEQ,
                    shipQty: argData.SHIP_QTY,
                    shipPrice: argData.SHIP_PRICE,
                    ordPrice: argData.ORD_PRICE,
                    diffPrice: argData.DIFF_PRICE,
                    totAmt: argData.TOT_AMT,
                    poCd: argData.PO_CD,
                    factoryCd: argData.FACTORY_CD,
                    country: argData.COUNTRY,
                    shipDate: argData.SHIP_DATE,
                    shipPtype: argData.SHIP_PTYPE,
                    natCd: argData.NAT_CD,
                    deliveryType: argData.DELIVERY_TYPE,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MEM UPDATE:",
                JSON.stringify(data.updateKSV_IMPCHARGE_MEM),
            );
            return data.updateKSV_IMPCHARGE_MEM;
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
                    mutation DeleteKSV_IMPCHARGE_MEM(
                        $deleteKsvImpchargeMemId: Int!
                    ) {
                        deleteKSV_IMPCHARGE_MEM(id: $deleteKsvImpchargeMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvImpchargeMemId: argData.id,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MEM DELETE:",
                JSON.stringify(data.deleteKSV_IMPCHARGE_MEM),
            );
            return data.deleteKSV_IMPCHARGE_MEM;
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
                    mutation MgrKsvImpchargeMemDeletes(
                        $ids: [InputMgrKsvImpchargeMemDeletes!]!
                    ) {
                        mgrKsvImpchargeMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_IMPCHARGE_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
