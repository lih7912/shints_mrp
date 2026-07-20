/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_BVTLINE_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BVTLINE_MEM {
                        allQueryKCD_BVTLINE_MEM {
                            id
                            LINE_CD
                            KIND_CD
                            KIND_NAME
                            KIND_QTY
                            DAY_QTY
                        }
                    }
                `,
            });
            console.log(
                "KCD_BVTLINE_MEM:",
                JSON.stringify(data.allQueryKCD_BVTLINE_MEM.length),
            );
            return data.allQueryKCD_BVTLINE_MEM;
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
                    query MgrKcdBvtlineMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBvtlineMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            LINE_CD
                            KIND_CD
                            KIND_NAME
                            KIND_QTY
                            DAY_QTY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BVTLINE_MEM:",
                JSON.stringify(data.mgrKcdBvtlineMemQuery.length),
            );
            return data.mgrKcdBvtlineMemQuery;
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
                    mutation CreateKCD_BVTLINE_MEM(
                        $lineCd: String
                        $kindCd: String
                        $kindName: String
                        $kindQty: Float
                        $dayQty: Float
                    ) {
                        createKCD_BVTLINE_MEM(
                            LINE_CD: $lineCd
                            KIND_CD: $kindCd
                            KIND_NAME: $kindName
                            KIND_QTY: $kindQty
                            DAY_QTY: $dayQty
                        ) {
                            LINE_CD
                            KIND_CD
                            KIND_NAME
                            KIND_QTY
                            DAY_QTY
                        }
                    }
                `,
                variables: {
                    lineCd: argData.LINE_CD,
                    kindCd: argData.KIND_CD,
                    kindName: argData.KIND_NAME,
                    kindQty: argData.KIND_QTY,
                    dayQty: argData.DAY_QTY,
                },
            });
            console.log(
                "KCD_BVTLINE_MEM INSERT:",
                JSON.stringify(data.createKCD_BVTLINE_MEM),
            );
            return data.createKCD_BVTLINE_MEM;
        } catch (e) {
            console.log("KCD_BVTLINE_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_BVTLINE_MEM(
                        $updateKcdBvtlineMemId: Int!
                        $lineCd: String
                        $kindCd: String
                        $kindName: String
                        $kindQty: Float
                        $dayQty: Float
                    ) {
                        updateKCD_BVTLINE_MEM(
                            id: $updateKcdBvtlineMemId
                            LINE_CD: $lineCd
                            KIND_CD: $kindCd
                            KIND_NAME: $kindName
                            KIND_QTY: $kindQty
                            DAY_QTY: $dayQty
                        ) {
                            id
                            LINE_CD
                            KIND_CD
                            KIND_NAME
                            KIND_QTY
                            DAY_QTY
                        }
                    }
                `,
                variables: {
                    updateKcdBvtlineMemId: argData.id,
                    lineCd: argData.LINE_CD,
                    kindCd: argData.KIND_CD,
                    kindName: argData.KIND_NAME,
                    kindQty: argData.KIND_QTY,
                    dayQty: argData.DAY_QTY,
                },
            });
            console.log(
                "KCD_BVTLINE_MEM UPDATE:",
                JSON.stringify(data.updateKCD_BVTLINE_MEM),
            );
            return data.updateKCD_BVTLINE_MEM;
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
                    mutation DeleteKCD_BVTLINE_MEM(
                        $deleteKcdBvtlineMemId: Int!
                    ) {
                        deleteKCD_BVTLINE_MEM(id: $deleteKcdBvtlineMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBvtlineMemId: argData.id,
                },
            });
            console.log(
                "KCD_BVTLINE_MEM DELETE:",
                JSON.stringify(data.deleteKCD_BVTLINE_MEM),
            );
            return data.deleteKCD_BVTLINE_MEM;
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
                    mutation MgrKcdBvtlineMemDeletes(
                        $ids: [InputMgrKcdBvtlineMemDeletes!]!
                    ) {
                        mgrKcdBvtlineMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BVTLINE_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
