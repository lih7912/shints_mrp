/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_MATL_CD_REP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MATL_CD_REP {
                        allQueryKCD_MATL_CD_REP {
                            id
                            MATL_CD
                            REP_MATL_CD
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KCD_MATL_CD_REP:",
                JSON.stringify(data.allQueryKCD_MATL_CD_REP.length),
            );
            return data.allQueryKCD_MATL_CD_REP;
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
                    query MgrKcdMatlCdRepQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlCdRepQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_CD
                            REP_MATL_CD
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MATL_CD_REP:",
                JSON.stringify(data.mgrKcdMatlCdRepQuery.length),
            );
            return data.mgrKcdMatlCdRepQuery;
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
                    mutation CreateKCD_MATL_CD_REP(
                        $matlCd: String
                        $repMatlCd: String
                        $regUser: String
                    ) {
                        createKCD_MATL_CD_REP(
                            MATL_CD: $matlCd
                            REP_MATL_CD: $repMatlCd
                            REG_USER: $regUser
                        ) {
                            MATL_CD
                            REP_MATL_CD
                            REG_USER
                        }
                    }
                `,
                variables: {
                    matlCd: argData.MATL_CD,
                    repMatlCd: argData.REP_MATL_CD,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KCD_MATL_CD_REP INSERT:",
                JSON.stringify(data.createKCD_MATL_CD_REP),
            );
            return data.createKCD_MATL_CD_REP;
        } catch (e) {
            console.log("KCD_MATL_CD_REP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_MATL_CD_REP(
                        $updateKcdMatlCdRepId: Int!
                        $matlCd: String
                        $repMatlCd: String
                        $regUser: String
                    ) {
                        updateKCD_MATL_CD_REP(
                            id: $updateKcdMatlCdRepId
                            MATL_CD: $matlCd
                            REP_MATL_CD: $repMatlCd
                            REG_USER: $regUser
                        ) {
                            id
                            MATL_CD
                            REP_MATL_CD
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKcdMatlCdRepId: argData.id,
                    matlCd: argData.MATL_CD,
                    repMatlCd: argData.REP_MATL_CD,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KCD_MATL_CD_REP UPDATE:",
                JSON.stringify(data.updateKCD_MATL_CD_REP),
            );
            return data.updateKCD_MATL_CD_REP;
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
                    mutation DeleteKCD_MATL_CD_REP(
                        $deleteKcdMatlCdRepId: Int!
                    ) {
                        deleteKCD_MATL_CD_REP(id: $deleteKcdMatlCdRepId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlCdRepId: argData.id,
                },
            });
            console.log(
                "KCD_MATL_CD_REP DELETE:",
                JSON.stringify(data.deleteKCD_MATL_CD_REP),
            );
            return data.deleteKCD_MATL_CD_REP;
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
                    mutation MgrKcdMatlCdRepDeletes(
                        $ids: [InputMgrKcdMatlCdRepDeletes!]!
                    ) {
                        mgrKcdMatlCdRepDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_CD_REP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
