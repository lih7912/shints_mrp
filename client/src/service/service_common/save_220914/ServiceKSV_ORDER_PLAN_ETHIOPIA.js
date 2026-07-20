/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_PLAN_ETHIOPIA {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PLAN_ETHIOPIA {
                        allQueryKSV_ORDER_PLAN_ETHIOPIA {
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
                "KSV_ORDER_PLAN_ETHIOPIA:",
                JSON.stringify(data.allQueryKSV_ORDER_PLAN_ETHIOPIA.length),
            );
            return data.allQueryKSV_ORDER_PLAN_ETHIOPIA;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderPlanEthiopiaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderPlanEthiopiaQuery(
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
                "KSV_ORDER_PLAN_ETHIOPIA:",
                JSON.stringify(data.mgrKsvOrderPlanEthiopiaQuery.length),
            );
            return data.mgrKsvOrderPlanEthiopiaQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_ORDER_PLAN_ETHIOPIA(
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
                        createKSV_ORDER_PLAN_ETHIOPIA(
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
                "KSV_ORDER_PLAN_ETHIOPIA INSERT:",
                JSON.stringify(data.createKSV_ORDER_PLAN_ETHIOPIA),
            );
            return data.createKSV_ORDER_PLAN_ETHIOPIA;
        } catch (e) {
            console.log(
                "KSV_ORDER_PLAN_ETHIOPIA INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_PLAN_ETHIOPIA(
                        $updateKsvOrderPlanEthiopiaId: Int!
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
                        updateKSV_ORDER_PLAN_ETHIOPIA(
                            id: $updateKsvOrderPlanEthiopiaId
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
                    updateKsvOrderPlanEthiopiaId: argData.id,
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
                "KSV_ORDER_PLAN_ETHIOPIA UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PLAN_ETHIOPIA),
            );
            return data.updateKSV_ORDER_PLAN_ETHIOPIA;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_ORDER_PLAN_ETHIOPIA(
                        $deleteKsvOrderPlanEthiopiaId: Int!
                    ) {
                        deleteKSV_ORDER_PLAN_ETHIOPIA(
                            id: $deleteKsvOrderPlanEthiopiaId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderPlanEthiopiaId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_ETHIOPIA DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PLAN_ETHIOPIA),
            );
            return data.deleteKSV_ORDER_PLAN_ETHIOPIA;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
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
                    mutation MgrKsvOrderPlanEthiopiaDeletes(
                        $ids: [InputMgrKsvOrderPlanEthiopiaDeletes!]!
                    ) {
                        mgrKsvOrderPlanEthiopiaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_ORDER_PLAN_ETHIOPIA DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
