/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_SYSTEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_SYSTEM {
                        allQueryKCD_SYSTEM {
                            id
                            SYS_CD
                            SYS_VAL
                        }
                    }
                `,
            });
            console.log(
                "KCD_SYSTEM:",
                JSON.stringify(data.allQueryKCD_SYSTEM.length),
            );
            return data.allQueryKCD_SYSTEM;
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
                    query MgrKcdSystemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdSystemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            SYS_CD
                            SYS_VAL
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_SYSTEM:",
                JSON.stringify(data.mgrKcdSystemQuery.length),
            );
            return data.mgrKcdSystemQuery;
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
                    mutation CreateKCD_SYSTEM($sysCd: String, $sysVal: String) {
                        createKCD_SYSTEM(SYS_CD: $sysCd, SYS_VAL: $sysVal) {
                            SYS_CD
                            SYS_VAL
                        }
                    }
                `,
                variables: {
                    sysCd: argData.SYS_CD,
                    sysVal: argData.SYS_VAL,
                },
            });
            console.log(
                "KCD_SYSTEM INSERT:",
                JSON.stringify(data.createKCD_SYSTEM),
            );
            return data.createKCD_SYSTEM;
        } catch (e) {
            console.log("KCD_SYSTEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_SYSTEM(
                        $updateKcdSystemId: Int!
                        $sysCd: String
                        $sysVal: String
                    ) {
                        updateKCD_SYSTEM(
                            id: $updateKcdSystemId
                            SYS_CD: $sysCd
                            SYS_VAL: $sysVal
                        ) {
                            id
                            SYS_CD
                            SYS_VAL
                        }
                    }
                `,
                variables: {
                    updateKcdSystemId: argData.id,
                    sysCd: argData.SYS_CD,
                    sysVal: argData.SYS_VAL,
                },
            });
            console.log(
                "KCD_SYSTEM UPDATE:",
                JSON.stringify(data.updateKCD_SYSTEM),
            );
            return data.updateKCD_SYSTEM;
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
                    mutation DeleteKCD_SYSTEM($deleteKcdSystemId: Int!) {
                        deleteKCD_SYSTEM(id: $deleteKcdSystemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdSystemId: argData.id,
                },
            });
            console.log(
                "KCD_SYSTEM DELETE:",
                JSON.stringify(data.deleteKCD_SYSTEM),
            );
            return data.deleteKCD_SYSTEM;
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
                    mutation MgrKcdSystemDeletes(
                        $ids: [InputMgrKcdSystemDeletes!]!
                    ) {
                        mgrKcdSystemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_SYSTEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
