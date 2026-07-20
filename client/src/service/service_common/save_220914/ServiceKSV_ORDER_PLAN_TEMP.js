/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_PLAN_TEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PLAN_TEMP {
                        allQueryKSV_ORDER_PLAN_TEMP {
                            id
                            BUYER_CD
                            USD_AMT
                            REG_USER
                            FACTORY_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_PLAN_TEMP:",
                JSON.stringify(data.allQueryKSV_ORDER_PLAN_TEMP.length),
            );
            return data.allQueryKSV_ORDER_PLAN_TEMP;
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
                    query MgrKsvOrderPlanTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderPlanTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            USD_AMT
                            REG_USER
                            FACTORY_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_PLAN_TEMP:",
                JSON.stringify(data.mgrKsvOrderPlanTempQuery.length),
            );
            return data.mgrKsvOrderPlanTempQuery;
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
                    mutation CreateKSV_ORDER_PLAN_TEMP(
                        $buyerCd: String
                        $usdAmt: Float
                        $regUser: String
                        $factoryCd: String
                    ) {
                        createKSV_ORDER_PLAN_TEMP(
                            BUYER_CD: $buyerCd
                            USD_AMT: $usdAmt
                            REG_USER: $regUser
                            FACTORY_CD: $factoryCd
                        ) {
                            BUYER_CD
                            USD_AMT
                            REG_USER
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    usdAmt: argData.USD_AMT,
                    regUser: argData.REG_USER,
                    factoryCd: argData.FACTORY_CD,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_TEMP INSERT:",
                JSON.stringify(data.createKSV_ORDER_PLAN_TEMP),
            );
            return data.createKSV_ORDER_PLAN_TEMP;
        } catch (e) {
            console.log("KSV_ORDER_PLAN_TEMP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_PLAN_TEMP(
                        $updateKsvOrderPlanTempId: Int!
                        $buyerCd: String
                        $usdAmt: Float
                        $regUser: String
                        $factoryCd: String
                    ) {
                        updateKSV_ORDER_PLAN_TEMP(
                            id: $updateKsvOrderPlanTempId
                            BUYER_CD: $buyerCd
                            USD_AMT: $usdAmt
                            REG_USER: $regUser
                            FACTORY_CD: $factoryCd
                        ) {
                            id
                            BUYER_CD
                            USD_AMT
                            REG_USER
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    updateKsvOrderPlanTempId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    usdAmt: argData.USD_AMT,
                    regUser: argData.REG_USER,
                    factoryCd: argData.FACTORY_CD,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PLAN_TEMP),
            );
            return data.updateKSV_ORDER_PLAN_TEMP;
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
                    mutation DeleteKSV_ORDER_PLAN_TEMP(
                        $deleteKsvOrderPlanTempId: Int!
                    ) {
                        deleteKSV_ORDER_PLAN_TEMP(
                            id: $deleteKsvOrderPlanTempId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderPlanTempId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PLAN_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PLAN_TEMP),
            );
            return data.deleteKSV_ORDER_PLAN_TEMP;
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
                    mutation MgrKsvOrderPlanTempDeletes(
                        $ids: [InputMgrKsvOrderPlanTempDeletes!]!
                    ) {
                        mgrKsvOrderPlanTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_PLAN_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
