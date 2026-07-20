/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicesysdiagrams {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerysysdiagrams {
                        allQuerysysdiagrams {
                            id
                            name
                            principal_id
                            diagram_id
                            version
                        }
                    }
                `,
            });
            console.log(
                "sysdiagrams:",
                JSON.stringify(data.allQuerysysdiagrams.length),
            );
            return data.allQuerysysdiagrams;
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
                    query MgrSysdiagramsQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSysdiagramsQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            name
                            principal_id
                            diagram_id
                            version
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "sysdiagrams:",
                JSON.stringify(data.mgrSysdiagramsQuery.length),
            );
            return data.mgrSysdiagramsQuery;
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
                    mutation Createsysdiagrams(
                        $name: String!
                        $principalId: Int!
                        $diagramId: Int!
                        $version: Int
                    ) {
                        createsysdiagrams(
                            name: $name
                            principal_id: $principalId
                            diagram_id: $diagramId
                            version: $version
                        ) {
                            name
                            principal_id
                            diagram_id
                            version
                        }
                    }
                `,
                variables: {
                    name: argData.name,
                    principalId: argData.principal_id,
                    diagramId: argData.diagram_id,
                    version: argData.version,
                },
            });
            console.log(
                "sysdiagrams INSERT:",
                JSON.stringify(data.createsysdiagrams),
            );
            return data.createsysdiagrams;
        } catch (e) {
            console.log("sysdiagrams INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatesysdiagrams(
                        $updateSysdiagramsId: Int!
                        $name: String!
                        $principalId: Int!
                        $diagramId: Int!
                        $version: Int
                    ) {
                        updatesysdiagrams(
                            id: $updateSysdiagramsId
                            name: $name
                            principal_id: $principalId
                            diagram_id: $diagramId
                            version: $version
                        ) {
                            id
                            name
                            principal_id
                            diagram_id
                            version
                        }
                    }
                `,
                variables: {
                    updateSysdiagramsId: argData.id,
                    name: argData.name,
                    principalId: argData.principal_id,
                    diagramId: argData.diagram_id,
                    version: argData.version,
                },
            });
            console.log(
                "sysdiagrams UPDATE:",
                JSON.stringify(data.updatesysdiagrams),
            );
            return data.updatesysdiagrams;
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
                    mutation Deletesysdiagrams($deleteSysdiagramsId: Int!) {
                        deletesysdiagrams(id: $deleteSysdiagramsId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSysdiagramsId: argData.id,
                },
            });
            console.log(
                "sysdiagrams DELETE:",
                JSON.stringify(data.deletesysdiagrams),
            );
            return data.deletesysdiagrams;
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
                    mutation MgrSysdiagramsDeletes(
                        $ids: [InputMgrSysdiagramsDeletes!]!
                    ) {
                        mgrSysdiagramsDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("sysdiagrams DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
