/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_XMD {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_XMD {
                        allQueryKZZ_XMD {
                            id
                            DATE
                            ORIGINAL_AMT
                            OUTSTANDING_AMT
                        }
                    }
                `,
            });
            console.log(
                "KZZ_XMD:",
                JSON.stringify(data.allQueryKZZ_XMD.length),
            );
            return data.allQueryKZZ_XMD;
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
                    query MgrKzzXmdQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzXmdQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            DATE
                            ORIGINAL_AMT
                            OUTSTANDING_AMT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("KZZ_XMD:", JSON.stringify(data.mgrKzzXmdQuery.length));
            return data.mgrKzzXmdQuery;
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
                    mutation CreateKZZ_XMD(
                        $date: String!
                        $originalAmt: Float
                        $outstandingAmt: Float
                    ) {
                        createKZZ_XMD(
                            DATE: $date
                            ORIGINAL_AMT: $originalAmt
                            OUTSTANDING_AMT: $outstandingAmt
                        ) {
                            DATE
                            ORIGINAL_AMT
                            OUTSTANDING_AMT
                        }
                    }
                `,
                variables: {
                    date: argData.DATE,
                    originalAmt: argData.ORIGINAL_AMT,
                    outstandingAmt: argData.OUTSTANDING_AMT,
                },
            });
            console.log("KZZ_XMD INSERT:", JSON.stringify(data.createKZZ_XMD));
            return data.createKZZ_XMD;
        } catch (e) {
            console.log("KZZ_XMD INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_XMD(
                        $updateKzzXmdId: Int!
                        $date: String!
                        $originalAmt: Float
                        $outstandingAmt: Float
                    ) {
                        updateKZZ_XMD(
                            id: $updateKzzXmdId
                            DATE: $date
                            ORIGINAL_AMT: $originalAmt
                            OUTSTANDING_AMT: $outstandingAmt
                        ) {
                            id
                            DATE
                            ORIGINAL_AMT
                            OUTSTANDING_AMT
                        }
                    }
                `,
                variables: {
                    updateKzzXmdId: argData.id,
                    date: argData.DATE,
                    originalAmt: argData.ORIGINAL_AMT,
                    outstandingAmt: argData.OUTSTANDING_AMT,
                },
            });
            console.log("KZZ_XMD UPDATE:", JSON.stringify(data.updateKZZ_XMD));
            return data.updateKZZ_XMD;
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
                    mutation DeleteKZZ_XMD($deleteKzzXmdId: Int!) {
                        deleteKZZ_XMD(id: $deleteKzzXmdId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzXmdId: argData.id,
                },
            });
            console.log("KZZ_XMD DELETE:", JSON.stringify(data.deleteKZZ_XMD));
            return data.deleteKZZ_XMD;
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
                    mutation MgrKzzXmdDeletes($ids: [InputMgrKzzXmdDeletes!]!) {
                        mgrKzzXmdDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_XMD DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
