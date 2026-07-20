/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_BVTLINE_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BVTLINE_MST {
                        allQueryKCD_BVTLINE_MST {
                            id
                            LINE_CD
                            LINE_NAME
                            LINE_SEQ
                        }
                    }
                `,
            });
            console.log(
                "KCD_BVTLINE_MST:",
                JSON.stringify(data.allQueryKCD_BVTLINE_MST.length),
            );
            return data.allQueryKCD_BVTLINE_MST;
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
                    query MgrKcdBvtlineMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBvtlineMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            LINE_CD
                            LINE_NAME
                            LINE_SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BVTLINE_MST:",
                JSON.stringify(data.mgrKcdBvtlineMstQuery.length),
            );
            return data.mgrKcdBvtlineMstQuery;
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
                    mutation CreateKCD_BVTLINE_MST(
                        $lineCd: String
                        $lineName: String
                        $lineSeq: Int
                    ) {
                        createKCD_BVTLINE_MST(
                            LINE_CD: $lineCd
                            LINE_NAME: $lineName
                            LINE_SEQ: $lineSeq
                        ) {
                            LINE_CD
                            LINE_NAME
                            LINE_SEQ
                        }
                    }
                `,
                variables: {
                    lineCd: argData.LINE_CD,
                    lineName: argData.LINE_NAME,
                    lineSeq: argData.LINE_SEQ,
                },
            });
            console.log(
                "KCD_BVTLINE_MST INSERT:",
                JSON.stringify(data.createKCD_BVTLINE_MST),
            );
            return data.createKCD_BVTLINE_MST;
        } catch (e) {
            console.log("KCD_BVTLINE_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_BVTLINE_MST(
                        $updateKcdBvtlineMstId: Int!
                        $lineCd: String
                        $lineName: String
                        $lineSeq: Int
                    ) {
                        updateKCD_BVTLINE_MST(
                            id: $updateKcdBvtlineMstId
                            LINE_CD: $lineCd
                            LINE_NAME: $lineName
                            LINE_SEQ: $lineSeq
                        ) {
                            id
                            LINE_CD
                            LINE_NAME
                            LINE_SEQ
                        }
                    }
                `,
                variables: {
                    updateKcdBvtlineMstId: argData.id,
                    lineCd: argData.LINE_CD,
                    lineName: argData.LINE_NAME,
                    lineSeq: argData.LINE_SEQ,
                },
            });
            console.log(
                "KCD_BVTLINE_MST UPDATE:",
                JSON.stringify(data.updateKCD_BVTLINE_MST),
            );
            return data.updateKCD_BVTLINE_MST;
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
                    mutation DeleteKCD_BVTLINE_MST(
                        $deleteKcdBvtlineMstId: Int!
                    ) {
                        deleteKCD_BVTLINE_MST(id: $deleteKcdBvtlineMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBvtlineMstId: argData.id,
                },
            });
            console.log(
                "KCD_BVTLINE_MST DELETE:",
                JSON.stringify(data.deleteKCD_BVTLINE_MST),
            );
            return data.deleteKCD_BVTLINE_MST;
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
                    mutation MgrKcdBvtlineMstDeletes(
                        $ids: [InputMgrKcdBvtlineMstDeletes!]!
                    ) {
                        mgrKcdBvtlineMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BVTLINE_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
