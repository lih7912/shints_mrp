/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_GW_FREIGHT {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_GW_FREIGHT {
                        allQueryKCD_GW_FREIGHT {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                        }
                    }
                `,
            });
            console.log(
                "KCD_GW_FREIGHT:",
                JSON.stringify(data.allQueryKCD_GW_FREIGHT.length),
            );
            return data.allQueryKCD_GW_FREIGHT;
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
                    query MgrKcdGwFreightQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdGwFreightQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_GW_FREIGHT:",
                JSON.stringify(data.mgrKcdGwFreightQuery.length),
            );
            return data.mgrKcdGwFreightQuery;
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
                    mutation CreateKCD_GW_FREIGHT(
                        $approkey: String!
                        $docNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                    ) {
                        createKCD_GW_FREIGHT(
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                        ) {
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                        }
                    }
                `,
                variables: {
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                },
            });
            console.log(
                "KCD_GW_FREIGHT INSERT:",
                JSON.stringify(data.createKCD_GW_FREIGHT),
            );
            return data.createKCD_GW_FREIGHT;
        } catch (e) {
            console.log("KCD_GW_FREIGHT INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_GW_FREIGHT(
                        $updateKcdGwFreightId: Int!
                        $approkey: String!
                        $docNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                    ) {
                        updateKCD_GW_FREIGHT(
                            id: $updateKcdGwFreightId
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                        }
                    }
                `,
                variables: {
                    updateKcdGwFreightId: argData.id,
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                },
            });
            console.log(
                "KCD_GW_FREIGHT UPDATE:",
                JSON.stringify(data.updateKCD_GW_FREIGHT),
            );
            return data.updateKCD_GW_FREIGHT;
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
                    mutation DeleteKCD_GW_FREIGHT($deleteKcdGwFreightId: Int!) {
                        deleteKCD_GW_FREIGHT(id: $deleteKcdGwFreightId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdGwFreightId: argData.id,
                },
            });
            console.log(
                "KCD_GW_FREIGHT DELETE:",
                JSON.stringify(data.deleteKCD_GW_FREIGHT),
            );
            return data.deleteKCD_GW_FREIGHT;
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
                    mutation MgrKcdGwFreightDeletes(
                        $ids: [InputMgrKcdGwFreightDeletes!]!
                    ) {
                        mgrKcdGwFreightDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_GW_FREIGHT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
