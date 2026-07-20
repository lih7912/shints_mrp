/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_MEM_TEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MEM_TEMP {
                        allQueryKSV_ORDER_MEM_TEMP {
                            id
                            ORDER_CD
                            PROD_CD
                            TOT_CNT
                            SIZE_CNT
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MEM_TEMP:",
                JSON.stringify(data.allQueryKSV_ORDER_MEM_TEMP.length),
            );
            return data.allQueryKSV_ORDER_MEM_TEMP;
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
                    query MgrKsvOrderMemTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMemTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            TOT_CNT
                            SIZE_CNT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MEM_TEMP:",
                JSON.stringify(data.mgrKsvOrderMemTempQuery.length),
            );
            return data.mgrKsvOrderMemTempQuery;
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
                    mutation CreateKSV_ORDER_MEM_TEMP(
                        $orderCd: String
                        $prodCd: String
                        $totCnt: Int
                        $sizeCnt: String
                    ) {
                        createKSV_ORDER_MEM_TEMP(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            TOT_CNT: $totCnt
                            SIZE_CNT: $sizeCnt
                        ) {
                            ORDER_CD
                            PROD_CD
                            TOT_CNT
                            SIZE_CNT
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    totCnt: argData.TOT_CNT,
                    sizeCnt: argData.SIZE_CNT,
                },
            });
            console.log(
                "KSV_ORDER_MEM_TEMP INSERT:",
                JSON.stringify(data.createKSV_ORDER_MEM_TEMP),
            );
            return data.createKSV_ORDER_MEM_TEMP;
        } catch (e) {
            console.log("KSV_ORDER_MEM_TEMP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_MEM_TEMP(
                        $updateKsvOrderMemTempId: Int!
                        $orderCd: String
                        $prodCd: String
                        $totCnt: Int
                        $sizeCnt: String
                    ) {
                        updateKSV_ORDER_MEM_TEMP(
                            id: $updateKsvOrderMemTempId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            TOT_CNT: $totCnt
                            SIZE_CNT: $sizeCnt
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            TOT_CNT
                            SIZE_CNT
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMemTempId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    totCnt: argData.TOT_CNT,
                    sizeCnt: argData.SIZE_CNT,
                },
            });
            console.log(
                "KSV_ORDER_MEM_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MEM_TEMP),
            );
            return data.updateKSV_ORDER_MEM_TEMP;
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
                    mutation DeleteKSV_ORDER_MEM_TEMP(
                        $deleteKsvOrderMemTempId: Int!
                    ) {
                        deleteKSV_ORDER_MEM_TEMP(id: $deleteKsvOrderMemTempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMemTempId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MEM_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MEM_TEMP),
            );
            return data.deleteKSV_ORDER_MEM_TEMP;
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
                    mutation MgrKsvOrderMemTempDeletes(
                        $ids: [InputMgrKsvOrderMemTempDeletes!]!
                    ) {
                        mgrKsvOrderMemTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MEM_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
