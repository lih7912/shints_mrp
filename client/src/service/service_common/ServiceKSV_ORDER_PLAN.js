/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_PLAN {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PLAN {
                        allQueryKSV_ORDER_PLAN {
                            id
                            USER_ID
                            YYMM
                            BUYER_CD
                            COLLECTION
                            LINE_TYPE
                            PLAN_QTY
                            PLAN_AMT
                            CM_PRICE
                            CM_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_PLAN:",
                JSON.stringify(data.allQueryKSV_ORDER_PLAN.length),
            );
            return data.allQueryKSV_ORDER_PLAN;
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
                    query MgrKsvOrderPlanQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderPlanQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            YYMM
                            BUYER_CD
                            COLLECTION
                            LINE_TYPE
                            PLAN_QTY
                            PLAN_AMT
                            CM_PRICE
                            CM_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_PLAN:",
                JSON.stringify(data.mgrKsvOrderPlanQuery.length),
            );
            return data.mgrKsvOrderPlanQuery;
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
                    mutation CreateKSV_ORDER_PLAN(
                        $userId: String
                        $yymm: String
                        $buyerCd: String
                        $collection: String
                        $lineType: String
                        $planQty: Float
                        $planAmt: Float
                        $cmPrice: Float
                        $cmAmt: Float
                        $currCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKSV_ORDER_PLAN(
                            USER_ID: $userId
                            YYMM: $yymm
                            BUYER_CD: $buyerCd
                            COLLECTION: $collection
                            LINE_TYPE: $lineType
                            PLAN_QTY: $planQty
                            PLAN_AMT: $planAmt
                            CM_PRICE: $cmPrice
                            CM_AMT: $cmAmt
                            CURR_CD: $currCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            USER_ID
                            YYMM
                            BUYER_CD
                            COLLECTION
                            LINE_TYPE
                            PLAN_QTY
                            PLAN_AMT
                            CM_PRICE
                            CM_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    yymm: argData.YYMM,
                    buyerCd: argData.BUYER_CD,
                    collection: argData.COLLECTION,
                    lineType: argData.LINE_TYPE,
                    planQty: argData.PLAN_QTY,
                    planAmt: argData.PLAN_AMT,
                    cmPrice: argData.CM_PRICE,
                    cmAmt: argData.CM_AMT,
                    currCd: argData.CURR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_PLAN INSERT:",
                JSON.stringify(data.createKSV_ORDER_PLAN),
            );
            return data.createKSV_ORDER_PLAN;
        } catch (e) {
            console.log("KSV_ORDER_PLAN INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_PLAN(
                        $updateKsvOrderPlanId: Int!
                        $userId: String
                        $yymm: String
                        $buyerCd: String
                        $collection: String
                        $lineType: String
                        $planQty: Float
                        $planAmt: Float
                        $cmPrice: Float
                        $cmAmt: Float
                        $currCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKSV_ORDER_PLAN(
                            id: $updateKsvOrderPlanId
                            USER_ID: $userId
                            YYMM: $yymm
                            BUYER_CD: $buyerCd
                            COLLECTION: $collection
                            LINE_TYPE: $lineType
                            PLAN_QTY: $planQty
                            PLAN_AMT: $planAmt
                            CM_PRICE: $cmPrice
                            CM_AMT: $cmAmt
                            CURR_CD: $currCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            USER_ID
                            YYMM
                            BUYER_CD
                            COLLECTION
                            LINE_TYPE
                            PLAN_QTY
                            PLAN_AMT
                            CM_PRICE
                            CM_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderPlanId: argData.id,
                    userId: argData.USER_ID,
                    yymm: argData.YYMM,
                    buyerCd: argData.BUYER_CD,
                    collection: argData.COLLECTION,
                    lineType: argData.LINE_TYPE,
                    planQty: argData.PLAN_QTY,
                    planAmt: argData.PLAN_AMT,
                    cmPrice: argData.CM_PRICE,
                    cmAmt: argData.CM_AMT,
                    currCd: argData.CURR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_PLAN UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PLAN),
            );
            return data.updateKSV_ORDER_PLAN;
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
                    mutation DeleteKSV_ORDER_PLAN($deleteKsvOrderPlanId: Int!) {
                        deleteKSV_ORDER_PLAN(id: $deleteKsvOrderPlanId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderPlanId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PLAN DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PLAN),
            );
            return data.deleteKSV_ORDER_PLAN;
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
                    mutation MgrKsvOrderPlanDeletes(
                        $ids: [InputMgrKsvOrderPlanDeletes!]!
                    ) {
                        mgrKsvOrderPlanDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_PLAN DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
