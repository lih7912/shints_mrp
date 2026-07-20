/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_USERMENU {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_USERMENU {
                        allQueryKCD_USERMENU {
                            id
                            USER_ID
                            MENU_ID
                            AUTH_FLAG
                            UPD_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KCD_USERMENU:",
                JSON.stringify(data.allQueryKCD_USERMENU.length),
            );
            return data.allQueryKCD_USERMENU;
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
                    query MgrKcdUsermenuQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdUsermenuQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            MENU_ID
                            AUTH_FLAG
                            UPD_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_USERMENU:",
                JSON.stringify(data.mgrKcdUsermenuQuery.length),
            );
            return data.mgrKcdUsermenuQuery;
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
                    mutation CreateKCD_USERMENU(
                        $userId: String
                        $menuId: String
                        $authFlag: String
                        $updFlag: String
                    ) {
                        createKCD_USERMENU(
                            USER_ID: $userId
                            MENU_ID: $menuId
                            AUTH_FLAG: $authFlag
                            UPD_FLAG: $updFlag
                        ) {
                            USER_ID
                            MENU_ID
                            AUTH_FLAG
                            UPD_FLAG
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    menuId: argData.MENU_ID,
                    authFlag: argData.AUTH_FLAG,
                    updFlag: argData.UPD_FLAG,
                },
            });
            console.log(
                "KCD_USERMENU INSERT:",
                JSON.stringify(data.createKCD_USERMENU),
            );
            return data.createKCD_USERMENU;
        } catch (e) {
            console.log("KCD_USERMENU INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_USERMENU(
                        $updateKcdUsermenuId: Int!
                        $userId: String
                        $menuId: String
                        $authFlag: String
                        $updFlag: String
                    ) {
                        updateKCD_USERMENU(
                            id: $updateKcdUsermenuId
                            USER_ID: $userId
                            MENU_ID: $menuId
                            AUTH_FLAG: $authFlag
                            UPD_FLAG: $updFlag
                        ) {
                            id
                            USER_ID
                            MENU_ID
                            AUTH_FLAG
                            UPD_FLAG
                        }
                    }
                `,
                variables: {
                    updateKcdUsermenuId: argData.id,
                    userId: argData.USER_ID,
                    menuId: argData.MENU_ID,
                    authFlag: argData.AUTH_FLAG,
                    updFlag: argData.UPD_FLAG,
                },
            });
            console.log(
                "KCD_USERMENU UPDATE:",
                JSON.stringify(data.updateKCD_USERMENU),
            );
            return data.updateKCD_USERMENU;
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
                    mutation DeleteKCD_USERMENU($deleteKcdUsermenuId: Int!) {
                        deleteKCD_USERMENU(id: $deleteKcdUsermenuId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdUsermenuId: argData.id,
                },
            });
            console.log(
                "KCD_USERMENU DELETE:",
                JSON.stringify(data.deleteKCD_USERMENU),
            );
            return data.deleteKCD_USERMENU;
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
                    mutation MgrKcdUsermenuDeletes(
                        $ids: [InputMgrKcdUsermenuDeletes!]!
                    ) {
                        mgrKcdUsermenuDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_USERMENU DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
