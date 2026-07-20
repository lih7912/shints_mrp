/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_AAAA {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_AAAA {
                        allQueryKCD_AAAA {
                            id
                            version
                        }
                    }
                `,
            });
            console.log(
                "KCD_AAAA:",
                JSON.stringify(data.allQueryKCD_AAAA.length),
            );
            return data.allQueryKCD_AAAA;
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
                    query MgrKcdAaaaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdAaaaQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            version
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_AAAA:",
                JSON.stringify(data.mgrKcdAaaaQuery.length),
            );
            return data.mgrKcdAaaaQuery;
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
                    mutation CreateKCD_AAAA($version: String) {
                        createKCD_AAAA(version: $version) {
                            version
                        }
                    }
                `,
                variables: {
                    version: argData.version,
                },
            });
            console.log(
                "KCD_AAAA INSERT:",
                JSON.stringify(data.createKCD_AAAA),
            );
            return data.createKCD_AAAA;
        } catch (e) {
            console.log("KCD_AAAA INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_AAAA(
                        $updateKcdAaaaId: Int!
                        $version: String
                    ) {
                        updateKCD_AAAA(
                            id: $updateKcdAaaaId
                            version: $version
                        ) {
                            id
                            version
                        }
                    }
                `,
                variables: {
                    updateKcdAaaaId: argData.id,
                    version: argData.version,
                },
            });
            console.log(
                "KCD_AAAA UPDATE:",
                JSON.stringify(data.updateKCD_AAAA),
            );
            return data.updateKCD_AAAA;
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
                    mutation DeleteKCD_AAAA($deleteKcdAaaaId: Int!) {
                        deleteKCD_AAAA(id: $deleteKcdAaaaId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdAaaaId: argData.id,
                },
            });
            console.log(
                "KCD_AAAA DELETE:",
                JSON.stringify(data.deleteKCD_AAAA),
            );
            return data.deleteKCD_AAAA;
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
                    mutation MgrKcdAaaaDeletes(
                        $ids: [InputMgrKcdAaaaDeletes!]!
                    ) {
                        mgrKcdAaaaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_AAAA DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
