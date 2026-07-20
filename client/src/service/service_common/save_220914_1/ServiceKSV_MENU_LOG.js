/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_MENU_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_MENU_LOG {
                        allQueryKSV_MENU_LOG {
                            id
                            MENU_ID
                            USER_ID
                            CLICK_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_MENU_LOG:",
                JSON.stringify(data.allQueryKSV_MENU_LOG.length),
            );
            return data.allQueryKSV_MENU_LOG;
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
                    query MgrKsvMenuLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvMenuLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MENU_ID
                            USER_ID
                            CLICK_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_MENU_LOG:",
                JSON.stringify(data.mgrKsvMenuLogQuery.length),
            );
            return data.mgrKsvMenuLogQuery;
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
                    mutation CreateKSV_MENU_LOG(
                        $menuId: String
                        $userId: String
                        $clickDatetime: String
                    ) {
                        createKSV_MENU_LOG(
                            MENU_ID: $menuId
                            USER_ID: $userId
                            CLICK_DATETIME: $clickDatetime
                        ) {
                            MENU_ID
                            USER_ID
                            CLICK_DATETIME
                        }
                    }
                `,
                variables: {
                    menuId: argData.MENU_ID,
                    userId: argData.USER_ID,
                    clickDatetime: argData.CLICK_DATETIME,
                },
            });
            console.log(
                "KSV_MENU_LOG INSERT:",
                JSON.stringify(data.createKSV_MENU_LOG),
            );
            return data.createKSV_MENU_LOG;
        } catch (e) {
            console.log("KSV_MENU_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_MENU_LOG(
                        $updateKsvMenuLogId: Int!
                        $menuId: String
                        $userId: String
                        $clickDatetime: String
                    ) {
                        updateKSV_MENU_LOG(
                            id: $updateKsvMenuLogId
                            MENU_ID: $menuId
                            USER_ID: $userId
                            CLICK_DATETIME: $clickDatetime
                        ) {
                            id
                            MENU_ID
                            USER_ID
                            CLICK_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvMenuLogId: argData.id,
                    menuId: argData.MENU_ID,
                    userId: argData.USER_ID,
                    clickDatetime: argData.CLICK_DATETIME,
                },
            });
            console.log(
                "KSV_MENU_LOG UPDATE:",
                JSON.stringify(data.updateKSV_MENU_LOG),
            );
            return data.updateKSV_MENU_LOG;
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
                    mutation DeleteKSV_MENU_LOG($deleteKsvMenuLogId: Int!) {
                        deleteKSV_MENU_LOG(id: $deleteKsvMenuLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvMenuLogId: argData.id,
                },
            });
            console.log(
                "KSV_MENU_LOG DELETE:",
                JSON.stringify(data.deleteKSV_MENU_LOG),
            );
            return data.deleteKSV_MENU_LOG;
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
                    mutation MgrKsvMenuLogDeletes(
                        $ids: [InputMgrKsvMenuLogDeletes!]!
                    ) {
                        mgrKsvMenuLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_MENU_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
