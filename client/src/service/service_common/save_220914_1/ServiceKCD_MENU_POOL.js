/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_MENU_POOL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MENU_POOL {
                        allQueryKCD_MENU_POOL {
                            id
                            CD_CODE
                            MENU_ID
                            MENU_NAME
                            MENU_NUM
                            NM_TYPE
                            P
                        }
                    }
                `,
            });
            console.log(
                "KCD_MENU_POOL:",
                JSON.stringify(data.allQueryKCD_MENU_POOL.length),
            );
            return data.allQueryKCD_MENU_POOL;
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
                    query MgrKcdMenuPoolQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMenuPoolQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CD_CODE
                            MENU_ID
                            MENU_NAME
                            MENU_NUM
                            NM_TYPE
                            P
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MENU_POOL:",
                JSON.stringify(data.mgrKcdMenuPoolQuery.length),
            );
            return data.mgrKcdMenuPoolQuery;
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
                    mutation CreateKCD_MENU_POOL(
                        $cdCode: String!
                        $menuId: String!
                        $menuName: String!
                        $menuNum: Int!
                        $nmType: String!
                        $p: String!
                    ) {
                        createKCD_MENU_POOL(
                            CD_CODE: $cdCode
                            MENU_ID: $menuId
                            MENU_NAME: $menuName
                            MENU_NUM: $menuNum
                            NM_TYPE: $nmType
                            P: $p
                        ) {
                            CD_CODE
                            MENU_ID
                            MENU_NAME
                            MENU_NUM
                            NM_TYPE
                            P
                        }
                    }
                `,
                variables: {
                    cdCode: argData.CD_CODE,
                    menuId: argData.MENU_ID,
                    menuName: argData.MENU_NAME,
                    menuNum: argData.MENU_NUM,
                    nmType: argData.NM_TYPE,
                    p: argData.P,
                },
            });
            console.log(
                "KCD_MENU_POOL INSERT:",
                JSON.stringify(data.createKCD_MENU_POOL),
            );
            return data.createKCD_MENU_POOL;
        } catch (e) {
            console.log("KCD_MENU_POOL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_MENU_POOL(
                        $updateKcdMenuPoolId: Int!
                        $cdCode: String!
                        $menuId: String!
                        $menuName: String!
                        $menuNum: Int!
                        $nmType: String!
                        $p: String!
                    ) {
                        updateKCD_MENU_POOL(
                            id: $updateKcdMenuPoolId
                            CD_CODE: $cdCode
                            MENU_ID: $menuId
                            MENU_NAME: $menuName
                            MENU_NUM: $menuNum
                            NM_TYPE: $nmType
                            P: $p
                        ) {
                            id
                            CD_CODE
                            MENU_ID
                            MENU_NAME
                            MENU_NUM
                            NM_TYPE
                            P
                        }
                    }
                `,
                variables: {
                    updateKcdMenuPoolId: argData.id,
                    cdCode: argData.CD_CODE,
                    menuId: argData.MENU_ID,
                    menuName: argData.MENU_NAME,
                    menuNum: argData.MENU_NUM,
                    nmType: argData.NM_TYPE,
                    p: argData.P,
                },
            });
            console.log(
                "KCD_MENU_POOL UPDATE:",
                JSON.stringify(data.updateKCD_MENU_POOL),
            );
            return data.updateKCD_MENU_POOL;
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
                    mutation DeleteKCD_MENU_POOL($deleteKcdMenuPoolId: Int!) {
                        deleteKCD_MENU_POOL(id: $deleteKcdMenuPoolId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMenuPoolId: argData.id,
                },
            });
            console.log(
                "KCD_MENU_POOL DELETE:",
                JSON.stringify(data.deleteKCD_MENU_POOL),
            );
            return data.deleteKCD_MENU_POOL;
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
                    mutation MgrKcdMenuPoolDeletes(
                        $ids: [InputMgrKcdMenuPoolDeletes!]!
                    ) {
                        mgrKcdMenuPoolDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MENU_POOL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
