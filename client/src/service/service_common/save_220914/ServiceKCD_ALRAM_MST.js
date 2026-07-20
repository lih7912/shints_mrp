/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_ALRAM_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_ALRAM_MST {
                        allQueryKCD_ALRAM_MST {
                            id
                            ALRAM_CD
                            ALRAM_TYPE
                            USER_ID
                            MENU_CD
                            QUERY
                            COMMENT
                            STATUS_CD
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KCD_ALRAM_MST:",
                JSON.stringify(data.allQueryKCD_ALRAM_MST.length),
            );
            return data.allQueryKCD_ALRAM_MST;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdAlramMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdAlramMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ALRAM_CD
                            ALRAM_TYPE
                            USER_ID
                            MENU_CD
                            QUERY
                            COMMENT
                            STATUS_CD
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_ALRAM_MST:",
                JSON.stringify(data.mgrKcdAlramMstQuery.length),
            );
            return data.mgrKcdAlramMstQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKCD_ALRAM_MST(
                        $alramCd: String!
                        $alramType: String!
                        $userId: String!
                        $menuCd: String!
                        $query: String!
                        $comment: String!
                        $statusCd: String!
                        $regDatetime: String!
                    ) {
                        createKCD_ALRAM_MST(
                            ALRAM_CD: $alramCd
                            ALRAM_TYPE: $alramType
                            USER_ID: $userId
                            MENU_CD: $menuCd
                            QUERY: $query
                            COMMENT: $comment
                            STATUS_CD: $statusCd
                            REG_DATETIME: $regDatetime
                        ) {
                            ALRAM_CD
                            ALRAM_TYPE
                            USER_ID
                            MENU_CD
                            QUERY
                            COMMENT
                            STATUS_CD
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    alramCd: argData.ALRAM_CD,
                    alramType: argData.ALRAM_TYPE,
                    userId: argData.USER_ID,
                    menuCd: argData.MENU_CD,
                    query: argData.QUERY,
                    comment: argData.COMMENT,
                    statusCd: argData.STATUS_CD,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KCD_ALRAM_MST INSERT:",
                JSON.stringify(data.createKCD_ALRAM_MST),
            );
            return data.createKCD_ALRAM_MST;
        } catch (e) {
            console.log("KCD_ALRAM_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_ALRAM_MST(
                        $updateKcdAlramMstId: Int!
                        $alramCd: String!
                        $alramType: String!
                        $userId: String!
                        $menuCd: String!
                        $query: String!
                        $comment: String!
                        $statusCd: String!
                        $regDatetime: String!
                    ) {
                        updateKCD_ALRAM_MST(
                            id: $updateKcdAlramMstId
                            ALRAM_CD: $alramCd
                            ALRAM_TYPE: $alramType
                            USER_ID: $userId
                            MENU_CD: $menuCd
                            QUERY: $query
                            COMMENT: $comment
                            STATUS_CD: $statusCd
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ALRAM_CD
                            ALRAM_TYPE
                            USER_ID
                            MENU_CD
                            QUERY
                            COMMENT
                            STATUS_CD
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdAlramMstId: argData.id,
                    alramCd: argData.ALRAM_CD,
                    alramType: argData.ALRAM_TYPE,
                    userId: argData.USER_ID,
                    menuCd: argData.MENU_CD,
                    query: argData.QUERY,
                    comment: argData.COMMENT,
                    statusCd: argData.STATUS_CD,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KCD_ALRAM_MST UPDATE:",
                JSON.stringify(data.updateKCD_ALRAM_MST),
            );
            return data.updateKCD_ALRAM_MST;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKCD_ALRAM_MST($deleteKcdAlramMstId: Int!) {
                        deleteKCD_ALRAM_MST(id: $deleteKcdAlramMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdAlramMstId: argData.id,
                },
            });
            console.log(
                "KCD_ALRAM_MST DELETE:",
                JSON.stringify(data.deleteKCD_ALRAM_MST),
            );
            return data.deleteKCD_ALRAM_MST;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
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
                    mutation MgrKcdAlramMstDeletes(
                        $ids: [InputMgrKcdAlramMstDeletes!]!
                    ) {
                        mgrKcdAlramMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_ALRAM_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
