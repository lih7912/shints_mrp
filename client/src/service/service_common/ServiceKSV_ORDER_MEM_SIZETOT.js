/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MEM_SIZETOT {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MEM_SIZETOT {
                        allQueryKSV_ORDER_MEM_SIZETOT {
                            id
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            SIZE_CNT
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MEM_SIZETOT:",
                JSON.stringify(data.allQueryKSV_ORDER_MEM_SIZETOT.length),
            );
            return data.allQueryKSV_ORDER_MEM_SIZETOT;
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
                    query MgrKsvOrderMemSizetotQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMemSizetotQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            SIZE_CNT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MEM_SIZETOT:",
                JSON.stringify(data.mgrKsvOrderMemSizetotQuery.length),
            );
            return data.mgrKsvOrderMemSizetotQuery;
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
                    mutation CreateKSV_ORDER_MEM_SIZETOT(
                        $userId: String
                        $orderCd: String
                        $prodCd: String
                        $sizeCnt: String
                    ) {
                        createKSV_ORDER_MEM_SIZETOT(
                            USER_ID: $userId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE_CNT: $sizeCnt
                        ) {
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            SIZE_CNT
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    sizeCnt: argData.SIZE_CNT,
                },
            });
            console.log(
                "KSV_ORDER_MEM_SIZETOT INSERT:",
                JSON.stringify(data.createKSV_ORDER_MEM_SIZETOT),
            );
            return data.createKSV_ORDER_MEM_SIZETOT;
        } catch (e) {
            console.log(
                "KSV_ORDER_MEM_SIZETOT INSERT ERROR:",
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
                    mutation UpdateKSV_ORDER_MEM_SIZETOT(
                        $updateKsvOrderMemSizetotId: Int!
                        $userId: String
                        $orderCd: String
                        $prodCd: String
                        $sizeCnt: String
                    ) {
                        updateKSV_ORDER_MEM_SIZETOT(
                            id: $updateKsvOrderMemSizetotId
                            USER_ID: $userId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE_CNT: $sizeCnt
                        ) {
                            id
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            SIZE_CNT
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMemSizetotId: argData.id,
                    userId: argData.USER_ID,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    sizeCnt: argData.SIZE_CNT,
                },
            });
            console.log(
                "KSV_ORDER_MEM_SIZETOT UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MEM_SIZETOT),
            );
            return data.updateKSV_ORDER_MEM_SIZETOT;
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
                    mutation DeleteKSV_ORDER_MEM_SIZETOT(
                        $deleteKsvOrderMemSizetotId: Int!
                    ) {
                        deleteKSV_ORDER_MEM_SIZETOT(
                            id: $deleteKsvOrderMemSizetotId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMemSizetotId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MEM_SIZETOT DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MEM_SIZETOT),
            );
            return data.deleteKSV_ORDER_MEM_SIZETOT;
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
                    mutation MgrKsvOrderMemSizetotDeletes(
                        $ids: [InputMgrKsvOrderMemSizetotDeletes!]!
                    ) {
                        mgrKsvOrderMemSizetotDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MEM_SIZETOT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
