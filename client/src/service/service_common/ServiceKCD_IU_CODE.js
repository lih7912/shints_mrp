/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_IU_CODE {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_IU_CODE {
                        allQueryKCD_IU_CODE {
                            id
                            CD_ACCT
                            NM_ACCT
                            CD_DEVIDE
                            NM_DEVIDE
                            FLAG
                        }
                    }
                `,
            });
            console.log(
                "KCD_IU_CODE:",
                JSON.stringify(data.allQueryKCD_IU_CODE.length),
            );
            return data.allQueryKCD_IU_CODE;
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
                    query MgrKcdIuCodeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdIuCodeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CD_ACCT
                            NM_ACCT
                            CD_DEVIDE
                            NM_DEVIDE
                            FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_IU_CODE:",
                JSON.stringify(data.mgrKcdIuCodeQuery.length),
            );
            return data.mgrKcdIuCodeQuery;
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
                    mutation CreateKCD_IU_CODE(
                        $cdAcct: String
                        $nmAcct: String
                        $cdDevide: String
                        $nmDevide: String
                        $flag: String
                    ) {
                        createKCD_IU_CODE(
                            CD_ACCT: $cdAcct
                            NM_ACCT: $nmAcct
                            CD_DEVIDE: $cdDevide
                            NM_DEVIDE: $nmDevide
                            FLAG: $flag
                        ) {
                            CD_ACCT
                            NM_ACCT
                            CD_DEVIDE
                            NM_DEVIDE
                            FLAG
                        }
                    }
                `,
                variables: {
                    cdAcct: argData.CD_ACCT,
                    nmAcct: argData.NM_ACCT,
                    cdDevide: argData.CD_DEVIDE,
                    nmDevide: argData.NM_DEVIDE,
                    flag: argData.FLAG,
                },
            });
            console.log(
                "KCD_IU_CODE INSERT:",
                JSON.stringify(data.createKCD_IU_CODE),
            );
            return data.createKCD_IU_CODE;
        } catch (e) {
            console.log("KCD_IU_CODE INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_IU_CODE(
                        $updateKcdIuCodeId: Int!
                        $cdAcct: String
                        $nmAcct: String
                        $cdDevide: String
                        $nmDevide: String
                        $flag: String
                    ) {
                        updateKCD_IU_CODE(
                            id: $updateKcdIuCodeId
                            CD_ACCT: $cdAcct
                            NM_ACCT: $nmAcct
                            CD_DEVIDE: $cdDevide
                            NM_DEVIDE: $nmDevide
                            FLAG: $flag
                        ) {
                            id
                            CD_ACCT
                            NM_ACCT
                            CD_DEVIDE
                            NM_DEVIDE
                            FLAG
                        }
                    }
                `,
                variables: {
                    updateKcdIuCodeId: argData.id,
                    cdAcct: argData.CD_ACCT,
                    nmAcct: argData.NM_ACCT,
                    cdDevide: argData.CD_DEVIDE,
                    nmDevide: argData.NM_DEVIDE,
                    flag: argData.FLAG,
                },
            });
            console.log(
                "KCD_IU_CODE UPDATE:",
                JSON.stringify(data.updateKCD_IU_CODE),
            );
            return data.updateKCD_IU_CODE;
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
                    mutation DeleteKCD_IU_CODE($deleteKcdIuCodeId: Int!) {
                        deleteKCD_IU_CODE(id: $deleteKcdIuCodeId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdIuCodeId: argData.id,
                },
            });
            console.log(
                "KCD_IU_CODE DELETE:",
                JSON.stringify(data.deleteKCD_IU_CODE),
            );
            return data.deleteKCD_IU_CODE;
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
                    mutation MgrKcdIuCodeDeletes(
                        $ids: [InputMgrKcdIuCodeDeletes!]!
                    ) {
                        mgrKcdIuCodeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_IU_CODE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
