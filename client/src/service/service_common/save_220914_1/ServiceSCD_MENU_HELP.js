/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_MENU_HELP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_MENU_HELP {
                        allQuerySCD_MENU_HELP {
                            id
                            MENU_ID
                            DESC_TYPE
                            DESC_SEQ
                            DESC_STR
                        }
                    }
                `,
            });
            console.log(
                "SCD_MENU_HELP:",
                JSON.stringify(data.allQuerySCD_MENU_HELP.length),
            );
            return data.allQuerySCD_MENU_HELP;
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
                    query MgrScdMenuHelpQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdMenuHelpQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MENU_ID
                            DESC_TYPE
                            DESC_SEQ
                            DESC_STR
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_MENU_HELP:",
                JSON.stringify(data.mgrScdMenuHelpQuery.length),
            );
            return data.mgrScdMenuHelpQuery;
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
                    mutation CreateSCD_MENU_HELP(
                        $menuId: String
                        $descType: String
                        $descSeq: Int
                        $descStr: String
                    ) {
                        createSCD_MENU_HELP(
                            MENU_ID: $menuId
                            DESC_TYPE: $descType
                            DESC_SEQ: $descSeq
                            DESC_STR: $descStr
                        ) {
                            MENU_ID
                            DESC_TYPE
                            DESC_SEQ
                            DESC_STR
                        }
                    }
                `,
                variables: {
                    menuId: argData.MENU_ID,
                    descType: argData.DESC_TYPE,
                    descSeq: argData.DESC_SEQ,
                    descStr: argData.DESC_STR,
                },
            });
            console.log(
                "SCD_MENU_HELP INSERT:",
                JSON.stringify(data.createSCD_MENU_HELP),
            );
            return data.createSCD_MENU_HELP;
        } catch (e) {
            console.log("SCD_MENU_HELP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_MENU_HELP(
                        $updateScdMenuHelpId: Int!
                        $menuId: String
                        $descType: String
                        $descSeq: Int
                        $descStr: String
                    ) {
                        updateSCD_MENU_HELP(
                            id: $updateScdMenuHelpId
                            MENU_ID: $menuId
                            DESC_TYPE: $descType
                            DESC_SEQ: $descSeq
                            DESC_STR: $descStr
                        ) {
                            id
                            MENU_ID
                            DESC_TYPE
                            DESC_SEQ
                            DESC_STR
                        }
                    }
                `,
                variables: {
                    updateScdMenuHelpId: argData.id,
                    menuId: argData.MENU_ID,
                    descType: argData.DESC_TYPE,
                    descSeq: argData.DESC_SEQ,
                    descStr: argData.DESC_STR,
                },
            });
            console.log(
                "SCD_MENU_HELP UPDATE:",
                JSON.stringify(data.updateSCD_MENU_HELP),
            );
            return data.updateSCD_MENU_HELP;
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
                    mutation DeleteSCD_MENU_HELP($deleteScdMenuHelpId: Int!) {
                        deleteSCD_MENU_HELP(id: $deleteScdMenuHelpId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdMenuHelpId: argData.id,
                },
            });
            console.log(
                "SCD_MENU_HELP DELETE:",
                JSON.stringify(data.deleteSCD_MENU_HELP),
            );
            return data.deleteSCD_MENU_HELP;
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
                    mutation MgrScdMenuHelpDeletes(
                        $ids: [InputMgrScdMenuHelpDeletes!]!
                    ) {
                        mgrScdMenuHelpDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_MENU_HELP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
