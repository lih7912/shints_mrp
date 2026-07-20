/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_MENU_HELP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MENU_HELP {
                        allQueryKCD_MENU_HELP {
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
                "KCD_MENU_HELP:",
                JSON.stringify(data.allQueryKCD_MENU_HELP.length),
            );
            return data.allQueryKCD_MENU_HELP;
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
                    query MgrKcdMenuHelpQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMenuHelpQuery(
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
                "KCD_MENU_HELP:",
                JSON.stringify(data.mgrKcdMenuHelpQuery.length),
            );
            return data.mgrKcdMenuHelpQuery;
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
                    mutation CreateKCD_MENU_HELP(
                        $menuId: String
                        $descType: String
                        $descSeq: Int
                        $descStr: String
                    ) {
                        createKCD_MENU_HELP(
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
                "KCD_MENU_HELP INSERT:",
                JSON.stringify(data.createKCD_MENU_HELP),
            );
            return data.createKCD_MENU_HELP;
        } catch (e) {
            console.log("KCD_MENU_HELP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_MENU_HELP(
                        $updateKcdMenuHelpId: Int!
                        $menuId: String
                        $descType: String
                        $descSeq: Int
                        $descStr: String
                    ) {
                        updateKCD_MENU_HELP(
                            id: $updateKcdMenuHelpId
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
                    updateKcdMenuHelpId: argData.id,
                    menuId: argData.MENU_ID,
                    descType: argData.DESC_TYPE,
                    descSeq: argData.DESC_SEQ,
                    descStr: argData.DESC_STR,
                },
            });
            console.log(
                "KCD_MENU_HELP UPDATE:",
                JSON.stringify(data.updateKCD_MENU_HELP),
            );
            return data.updateKCD_MENU_HELP;
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
                    mutation DeleteKCD_MENU_HELP($deleteKcdMenuHelpId: Int!) {
                        deleteKCD_MENU_HELP(id: $deleteKcdMenuHelpId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMenuHelpId: argData.id,
                },
            });
            console.log(
                "KCD_MENU_HELP DELETE:",
                JSON.stringify(data.deleteKCD_MENU_HELP),
            );
            return data.deleteKCD_MENU_HELP;
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
                    mutation MgrKcdMenuHelpDeletes(
                        $ids: [InputMgrKcdMenuHelpDeletes!]!
                    ) {
                        mgrKcdMenuHelpDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MENU_HELP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
