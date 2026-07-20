/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_PLAN_ORDER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PLAN_ORDER {
                        allQueryKSV_ORDER_PLAN_ORDER {
                            id
                            USER_ID
                            YYMM
                            BUYER_CD
                            ORDER_CD
                            LINE_TYPE
                            ORDER_QTY
                            ORDER_AMT
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CM_PRICE
                            CM_AMT
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_PLAN_ORDER:",
                JSON.stringify(data.allQueryKSV_ORDER_PLAN_ORDER.length),
            );
            return data.allQueryKSV_ORDER_PLAN_ORDER;
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
                    query MgrKsvOrderPlanOrderQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderPlanOrderQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            YYMM
                            BUYER_CD
                            ORDER_CD
                            LINE_TYPE
                            ORDER_QTY
                            ORDER_AMT
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CM_PRICE
                            CM_AMT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_PLAN_ORDER:",
                JSON.stringify(data.mgrKsvOrderPlanOrderQuery.length),
            );
            return data.mgrKsvOrderPlanOrderQuery;
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
                    mutation CreateKSV_ORDER_PLAN_ORDER(
                        $userId: String
                        $yymm: String
                        $buyerCd: String
                        $orderCd: String
                        $lineType: String
                        $orderQty: Float
                        $orderAmt: Float
                        $factoryCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $cmPrice: Float
                        $cmAmt: Float
                    ) {
                        createKSV_ORDER_PLAN_ORDER(
                            USER_ID: $userId
                            YYMM: $yymm
                            BUYER_CD: $buyerCd
                            ORDER_CD: $orderCd
                            LINE_TYPE: $lineType
                            ORDER_QTY: $orderQty
                            ORDER_AMT: $orderAmt
                            FACTORY_CD: $factoryCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            CM_PRICE: $cmPrice
                            CM_AMT: $cmAmt
                        ) {
                            USER_ID
                            YYMM
                            BUYER_CD
                            ORDER_CD
                            LINE_TYPE
                            ORDER_QTY
                            ORDER_AMT
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CM_PRICE
                            CM_AMT
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    yymm: argData.YYMM,
                    buyerCd: argData.BUYER_CD,
                    orderCd: argData.ORDER_CD,
                    lineType: argData.LINE_TYPE,
                    orderQty: argData.ORDER_QTY,
                    orderAmt: argData.ORDER_AMT,
                    factoryCd: argData.FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    cmPrice: argData.CM_PRICE,
                    cmAmt: argData.CM_AMT,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_ORDER INSERT:",
                JSON.stringify(data.createKSV_ORDER_PLAN_ORDER),
            );
            return data.createKSV_ORDER_PLAN_ORDER;
        } catch (e) {
            console.log(
                "KSV_ORDER_PLAN_ORDER INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_ORDER_PLAN_ORDER(
                        $updateKsvOrderPlanOrderId: Int!
                        $userId: String
                        $yymm: String
                        $buyerCd: String
                        $orderCd: String
                        $lineType: String
                        $orderQty: Float
                        $orderAmt: Float
                        $factoryCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $cmPrice: Float
                        $cmAmt: Float
                    ) {
                        updateKSV_ORDER_PLAN_ORDER(
                            id: $updateKsvOrderPlanOrderId
                            USER_ID: $userId
                            YYMM: $yymm
                            BUYER_CD: $buyerCd
                            ORDER_CD: $orderCd
                            LINE_TYPE: $lineType
                            ORDER_QTY: $orderQty
                            ORDER_AMT: $orderAmt
                            FACTORY_CD: $factoryCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            CM_PRICE: $cmPrice
                            CM_AMT: $cmAmt
                        ) {
                            id
                            USER_ID
                            YYMM
                            BUYER_CD
                            ORDER_CD
                            LINE_TYPE
                            ORDER_QTY
                            ORDER_AMT
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CM_PRICE
                            CM_AMT
                        }
                    }
                `,
                variables: {
                    updateKsvOrderPlanOrderId: argData.id,
                    userId: argData.USER_ID,
                    yymm: argData.YYMM,
                    buyerCd: argData.BUYER_CD,
                    orderCd: argData.ORDER_CD,
                    lineType: argData.LINE_TYPE,
                    orderQty: argData.ORDER_QTY,
                    orderAmt: argData.ORDER_AMT,
                    factoryCd: argData.FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    cmPrice: argData.CM_PRICE,
                    cmAmt: argData.CM_AMT,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_ORDER UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PLAN_ORDER),
            );
            return data.updateKSV_ORDER_PLAN_ORDER;
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
                    mutation DeleteKSV_ORDER_PLAN_ORDER(
                        $deleteKsvOrderPlanOrderId: Int!
                    ) {
                        deleteKSV_ORDER_PLAN_ORDER(
                            id: $deleteKsvOrderPlanOrderId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderPlanOrderId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_ORDER DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PLAN_ORDER),
            );
            return data.deleteKSV_ORDER_PLAN_ORDER;
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
                    mutation MgrKsvOrderPlanOrderDeletes(
                        $ids: [InputMgrKsvOrderPlanOrderDeletes!]!
                    ) {
                        mgrKsvOrderPlanOrderDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_PLAN_ORDER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
