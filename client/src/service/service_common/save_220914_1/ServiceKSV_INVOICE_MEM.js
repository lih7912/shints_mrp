/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_MEM {
                        allQueryKSV_INVOICE_MEM {
                            id
                            INVOICE_NO
                            ORDER_CD
                            SEQ
                            SHIP_QTY
                            SHIP_PRICE
                            SALES_PRICE
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
                "KSV_INVOICE_MEM:",
                JSON.stringify(data.allQueryKSV_INVOICE_MEM.length),
            );
            return data.allQueryKSV_INVOICE_MEM;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvInvoiceMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            ORDER_CD
                            SEQ
                            SHIP_QTY
                            SHIP_PRICE
                            SALES_PRICE
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
                "KSV_INVOICE_MEM:",
                JSON.stringify(data.mgrKsvInvoiceMemQuery.length),
            );
            return data.mgrKsvInvoiceMemQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_INVOICE_MEM(
                        $invoiceNo: String
                        $orderCd: String
                        $seq: Int
                        $shipQty: Float
                        $shipPrice: Float
                        $salesPrice: Float
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
                        createKSV_INVOICE_MEM(
                            INVOICE_NO: $invoiceNo
                            ORDER_CD: $orderCd
                            SEQ: $seq
                            SHIP_QTY: $shipQty
                            SHIP_PRICE: $shipPrice
                            SALES_PRICE: $salesPrice
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
                            SALES_PRICE
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
                    salesPrice: argData.SALES_PRICE,
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
                "KSV_INVOICE_MEM INSERT:",
                JSON.stringify(data.createKSV_INVOICE_MEM),
            );
            return data.createKSV_INVOICE_MEM;
        } catch (e) {
            console.log("KSV_INVOICE_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVOICE_MEM(
                        $updateKsvInvoiceMemId: Int!
                        $invoiceNo: String
                        $orderCd: String
                        $seq: Int
                        $shipQty: Float
                        $shipPrice: Float
                        $salesPrice: Float
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
                        updateKSV_INVOICE_MEM(
                            id: $updateKsvInvoiceMemId
                            INVOICE_NO: $invoiceNo
                            ORDER_CD: $orderCd
                            SEQ: $seq
                            SHIP_QTY: $shipQty
                            SHIP_PRICE: $shipPrice
                            SALES_PRICE: $salesPrice
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
                            SALES_PRICE
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
                    updateKsvInvoiceMemId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    orderCd: argData.ORDER_CD,
                    seq: argData.SEQ,
                    shipQty: argData.SHIP_QTY,
                    shipPrice: argData.SHIP_PRICE,
                    salesPrice: argData.SALES_PRICE,
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
                "KSV_INVOICE_MEM UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_MEM),
            );
            return data.updateKSV_INVOICE_MEM;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_INVOICE_MEM(
                        $deleteKsvInvoiceMemId: Int!
                    ) {
                        deleteKSV_INVOICE_MEM(id: $deleteKsvInvoiceMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceMemId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_MEM DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_MEM),
            );
            return data.deleteKSV_INVOICE_MEM;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

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
                    mutation MgrKsvInvoiceMemDeletes(
                        $ids: [InputMgrKsvInvoiceMemDeletes!]!
                    ) {
                        mgrKsvInvoiceMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
