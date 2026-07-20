/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_USERMENU {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_USERMENU {
                        allQuerySCD_USERMENU {
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
                "SCD_USERMENU:",
                JSON.stringify(data.allQuerySCD_USERMENU.length),
            );
            return data.allQuerySCD_USERMENU;
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
                    query MgrScdUsermenuQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdUsermenuQuery(
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
                "SCD_USERMENU:",
                JSON.stringify(data.mgrScdUsermenuQuery.length),
            );
            return data.mgrScdUsermenuQuery;
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
                    mutation CreateSCD_USERMENU(
                        $userId: String
                        $menuId: String
                        $authFlag: String
                        $updFlag: String
                    ) {
                        createSCD_USERMENU(
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
                "SCD_USERMENU INSERT:",
                JSON.stringify(data.createSCD_USERMENU),
            );
            return data.createSCD_USERMENU;
        } catch (e) {
            console.log("SCD_USERMENU INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_USERMENU(
                        $updateScdUsermenuId: Int!
                        $userId: String
                        $menuId: String
                        $authFlag: String
                        $updFlag: String
                    ) {
                        updateSCD_USERMENU(
                            id: $updateScdUsermenuId
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
                    updateScdUsermenuId: argData.id,
                    userId: argData.USER_ID,
                    menuId: argData.MENU_ID,
                    authFlag: argData.AUTH_FLAG,
                    updFlag: argData.UPD_FLAG,
                },
            });
            console.log(
                "SCD_USERMENU UPDATE:",
                JSON.stringify(data.updateSCD_USERMENU),
            );
            return data.updateSCD_USERMENU;
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
                    mutation DeleteSCD_USERMENU($deleteScdUsermenuId: Int!) {
                        deleteSCD_USERMENU(id: $deleteScdUsermenuId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdUsermenuId: argData.id,
                },
            });
            console.log(
                "SCD_USERMENU DELETE:",
                JSON.stringify(data.deleteSCD_USERMENU),
            );
            return data.deleteSCD_USERMENU;
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
                    mutation MgrScdUsermenuDeletes(
                        $ids: [InputMgrScdUsermenuDeletes!]!
                    ) {
                        mgrScdUsermenuDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_USERMENU DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
