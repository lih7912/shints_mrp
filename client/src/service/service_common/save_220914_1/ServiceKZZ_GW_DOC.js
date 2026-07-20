/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_GW_DOC {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_GW_DOC {
                        allQueryKZZ_GW_DOC {
                            id
                            APPROKEY
                            TITLE
                            CONTANT
                            BANK
                            CONTANT_CNT
                            FLAG
                        }
                    }
                `,
            });
            console.log(
                "KZZ_GW_DOC:",
                JSON.stringify(data.allQueryKZZ_GW_DOC.length),
            );
            return data.allQueryKZZ_GW_DOC;
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
                    query MgrKzzGwDocQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzGwDocQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            APPROKEY
                            TITLE
                            CONTANT
                            BANK
                            CONTANT_CNT
                            FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_GW_DOC:",
                JSON.stringify(data.mgrKzzGwDocQuery.length),
            );
            return data.mgrKzzGwDocQuery;
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
                    mutation CreateKZZ_GW_DOC(
                        $approkey: String!
                        $title: String!
                        $contant: String!
                        $bank: String
                        $contantCnt: Int!
                        $flag: Int
                    ) {
                        createKZZ_GW_DOC(
                            APPROKEY: $approkey
                            TITLE: $title
                            CONTANT: $contant
                            BANK: $bank
                            CONTANT_CNT: $contantCnt
                            FLAG: $flag
                        ) {
                            APPROKEY
                            TITLE
                            CONTANT
                            BANK
                            CONTANT_CNT
                            FLAG
                        }
                    }
                `,
                variables: {
                    approkey: argData.APPROKEY,
                    title: argData.TITLE,
                    contant: argData.CONTANT,
                    bank: argData.BANK,
                    contantCnt: argData.CONTANT_CNT,
                    flag: argData.FLAG,
                },
            });
            console.log(
                "KZZ_GW_DOC INSERT:",
                JSON.stringify(data.createKZZ_GW_DOC),
            );
            return data.createKZZ_GW_DOC;
        } catch (e) {
            console.log("KZZ_GW_DOC INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_GW_DOC(
                        $updateKzzGwDocId: Int!
                        $approkey: String!
                        $title: String!
                        $contant: String!
                        $bank: String
                        $contantCnt: Int!
                        $flag: Int
                    ) {
                        updateKZZ_GW_DOC(
                            id: $updateKzzGwDocId
                            APPROKEY: $approkey
                            TITLE: $title
                            CONTANT: $contant
                            BANK: $bank
                            CONTANT_CNT: $contantCnt
                            FLAG: $flag
                        ) {
                            id
                            APPROKEY
                            TITLE
                            CONTANT
                            BANK
                            CONTANT_CNT
                            FLAG
                        }
                    }
                `,
                variables: {
                    updateKzzGwDocId: argData.id,
                    approkey: argData.APPROKEY,
                    title: argData.TITLE,
                    contant: argData.CONTANT,
                    bank: argData.BANK,
                    contantCnt: argData.CONTANT_CNT,
                    flag: argData.FLAG,
                },
            });
            console.log(
                "KZZ_GW_DOC UPDATE:",
                JSON.stringify(data.updateKZZ_GW_DOC),
            );
            return data.updateKZZ_GW_DOC;
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
                    mutation DeleteKZZ_GW_DOC($deleteKzzGwDocId: Int!) {
                        deleteKZZ_GW_DOC(id: $deleteKzzGwDocId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzGwDocId: argData.id,
                },
            });
            console.log(
                "KZZ_GW_DOC DELETE:",
                JSON.stringify(data.deleteKZZ_GW_DOC),
            );
            return data.deleteKZZ_GW_DOC;
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
                    mutation MgrKzzGwDocDeletes(
                        $ids: [InputMgrKzzGwDocDeletes!]!
                    ) {
                        mgrKzzGwDocDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_GW_DOC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
