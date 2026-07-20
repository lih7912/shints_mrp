/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_DELIVERY {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_DELIVERY {
                        allQueryKSV_ORDER_DELIVERY {
                            id
                            ORDER_CD
                            PROD_CD
                            DELIVERY_DATE
                            DELIVERY_CNT
                            SIZE_CNT
                            DELIVERY_NO
                            DELIVERY_PRICE
                            DELIVERY_CURR_CD
                            ISSUE_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DELIVERY_DUE_DATE
                            INVOICE_NO
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_DELIVERY:",
                JSON.stringify(data.allQueryKSV_ORDER_DELIVERY.length),
            );
            return data.allQueryKSV_ORDER_DELIVERY;
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
                    query MgrKsvOrderDeliveryQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderDeliveryQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            DELIVERY_DATE
                            DELIVERY_CNT
                            SIZE_CNT
                            DELIVERY_NO
                            DELIVERY_PRICE
                            DELIVERY_CURR_CD
                            ISSUE_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DELIVERY_DUE_DATE
                            INVOICE_NO
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_DELIVERY:",
                JSON.stringify(data.mgrKsvOrderDeliveryQuery.length),
            );
            return data.mgrKsvOrderDeliveryQuery;
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
                    mutation CreateKSV_ORDER_DELIVERY(
                        $orderCd: String
                        $prodCd: String
                        $deliveryDate: String
                        $deliveryCnt: Int
                        $sizeCnt: String
                        $deliveryNo: String
                        $deliveryPrice: Float
                        $deliveryCurrCd: String
                        $issueDate: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $deliveryDueDate: String
                        $invoiceNo: String
                    ) {
                        createKSV_ORDER_DELIVERY(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            DELIVERY_DATE: $deliveryDate
                            DELIVERY_CNT: $deliveryCnt
                            SIZE_CNT: $sizeCnt
                            DELIVERY_NO: $deliveryNo
                            DELIVERY_PRICE: $deliveryPrice
                            DELIVERY_CURR_CD: $deliveryCurrCd
                            ISSUE_DATE: $issueDate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            DELIVERY_DUE_DATE: $deliveryDueDate
                            INVOICE_NO: $invoiceNo
                        ) {
                            ORDER_CD
                            PROD_CD
                            DELIVERY_DATE
                            DELIVERY_CNT
                            SIZE_CNT
                            DELIVERY_NO
                            DELIVERY_PRICE
                            DELIVERY_CURR_CD
                            ISSUE_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DELIVERY_DUE_DATE
                            INVOICE_NO
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    deliveryDate: argData.DELIVERY_DATE,
                    deliveryCnt: argData.DELIVERY_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    deliveryNo: argData.DELIVERY_NO,
                    deliveryPrice: argData.DELIVERY_PRICE,
                    deliveryCurrCd: argData.DELIVERY_CURR_CD,
                    issueDate: argData.ISSUE_DATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    deliveryDueDate: argData.DELIVERY_DUE_DATE,
                    invoiceNo: argData.INVOICE_NO,
                },
            });
            console.log(
                "KSV_ORDER_DELIVERY INSERT:",
                JSON.stringify(data.createKSV_ORDER_DELIVERY),
            );
            return data.createKSV_ORDER_DELIVERY;
        } catch (e) {
            console.log("KSV_ORDER_DELIVERY INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_DELIVERY(
                        $updateKsvOrderDeliveryId: Int!
                        $orderCd: String
                        $prodCd: String
                        $deliveryDate: String
                        $deliveryCnt: Int
                        $sizeCnt: String
                        $deliveryNo: String
                        $deliveryPrice: Float
                        $deliveryCurrCd: String
                        $issueDate: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $deliveryDueDate: String
                        $invoiceNo: String
                    ) {
                        updateKSV_ORDER_DELIVERY(
                            id: $updateKsvOrderDeliveryId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            DELIVERY_DATE: $deliveryDate
                            DELIVERY_CNT: $deliveryCnt
                            SIZE_CNT: $sizeCnt
                            DELIVERY_NO: $deliveryNo
                            DELIVERY_PRICE: $deliveryPrice
                            DELIVERY_CURR_CD: $deliveryCurrCd
                            ISSUE_DATE: $issueDate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            DELIVERY_DUE_DATE: $deliveryDueDate
                            INVOICE_NO: $invoiceNo
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            DELIVERY_DATE
                            DELIVERY_CNT
                            SIZE_CNT
                            DELIVERY_NO
                            DELIVERY_PRICE
                            DELIVERY_CURR_CD
                            ISSUE_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            DELIVERY_DUE_DATE
                            INVOICE_NO
                        }
                    }
                `,
                variables: {
                    updateKsvOrderDeliveryId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    deliveryDate: argData.DELIVERY_DATE,
                    deliveryCnt: argData.DELIVERY_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    deliveryNo: argData.DELIVERY_NO,
                    deliveryPrice: argData.DELIVERY_PRICE,
                    deliveryCurrCd: argData.DELIVERY_CURR_CD,
                    issueDate: argData.ISSUE_DATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    deliveryDueDate: argData.DELIVERY_DUE_DATE,
                    invoiceNo: argData.INVOICE_NO,
                },
            });
            console.log(
                "KSV_ORDER_DELIVERY UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_DELIVERY),
            );
            return data.updateKSV_ORDER_DELIVERY;
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
                    mutation DeleteKSV_ORDER_DELIVERY(
                        $deleteKsvOrderDeliveryId: Int!
                    ) {
                        deleteKSV_ORDER_DELIVERY(
                            id: $deleteKsvOrderDeliveryId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderDeliveryId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_DELIVERY DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_DELIVERY),
            );
            return data.deleteKSV_ORDER_DELIVERY;
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
                    mutation MgrKsvOrderDeliveryDeletes(
                        $ids: [InputMgrKsvOrderDeliveryDeletes!]!
                    ) {
                        mgrKsvOrderDeliveryDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_DELIVERY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
