/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_ACC_CC {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_ACC_CC {
                        allQueryKZZ_ACC_CC {
                            id
                            CD_SEQ
                            CD_CC
                            NM_CC
                        }
                    }
                `,
            });
            console.log(
                "KZZ_ACC_CC:",
                JSON.stringify(data.allQueryKZZ_ACC_CC.length),
            );
            return data.allQueryKZZ_ACC_CC;
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
                    query MgrKzzAccCcQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzAccCcQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CD_SEQ
                            CD_CC
                            NM_CC
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_ACC_CC:",
                JSON.stringify(data.mgrKzzAccCcQuery.length),
            );
            return data.mgrKzzAccCcQuery;
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
                    mutation CreateKZZ_ACC_CC(
                        $cdSeq: Int!
                        $cdCc: String
                        $nmCc: String
                    ) {
                        createKZZ_ACC_CC(
                            CD_SEQ: $cdSeq
                            CD_CC: $cdCc
                            NM_CC: $nmCc
                        ) {
                            CD_SEQ
                            CD_CC
                            NM_CC
                        }
                    }
                `,
                variables: {
                    cdSeq: argData.CD_SEQ,
                    cdCc: argData.CD_CC,
                    nmCc: argData.NM_CC,
                },
            });
            console.log(
                "KZZ_ACC_CC INSERT:",
                JSON.stringify(data.createKZZ_ACC_CC),
            );
            return data.createKZZ_ACC_CC;
        } catch (e) {
            console.log("KZZ_ACC_CC INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_ACC_CC(
                        $updateKzzAccCcId: Int!
                        $cdSeq: Int!
                        $cdCc: String
                        $nmCc: String
                    ) {
                        updateKZZ_ACC_CC(
                            id: $updateKzzAccCcId
                            CD_SEQ: $cdSeq
                            CD_CC: $cdCc
                            NM_CC: $nmCc
                        ) {
                            id
                            CD_SEQ
                            CD_CC
                            NM_CC
                        }
                    }
                `,
                variables: {
                    updateKzzAccCcId: argData.id,
                    cdSeq: argData.CD_SEQ,
                    cdCc: argData.CD_CC,
                    nmCc: argData.NM_CC,
                },
            });
            console.log(
                "KZZ_ACC_CC UPDATE:",
                JSON.stringify(data.updateKZZ_ACC_CC),
            );
            return data.updateKZZ_ACC_CC;
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
                    mutation DeleteKZZ_ACC_CC($deleteKzzAccCcId: Int!) {
                        deleteKZZ_ACC_CC(id: $deleteKzzAccCcId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzAccCcId: argData.id,
                },
            });
            console.log(
                "KZZ_ACC_CC DELETE:",
                JSON.stringify(data.deleteKZZ_ACC_CC),
            );
            return data.deleteKZZ_ACC_CC;
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
                    mutation MgrKzzAccCcDeletes(
                        $ids: [InputMgrKzzAccCcDeletes!]!
                    ) {
                        mgrKzzAccCcDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_ACC_CC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
