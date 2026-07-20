/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_MSG_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_MSG_LOG {
                        allQuerySSV_MSG_LOG {
                            id
                            USER_ID
                            MSG
                            READ_FLAG
                            READ_DATETIME
                            SEND_USER
                            SEND_DATETIME
                            STATUS_CD
                        }
                    }
                `,
            });
            console.log(
                "SSV_MSG_LOG:",
                JSON.stringify(data.allQuerySSV_MSG_LOG.length),
            );
            return data.allQuerySSV_MSG_LOG;
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
                    query MgrSsvMsgLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvMsgLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            MSG
                            READ_FLAG
                            READ_DATETIME
                            SEND_USER
                            SEND_DATETIME
                            STATUS_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_MSG_LOG:",
                JSON.stringify(data.mgrSsvMsgLogQuery.length),
            );
            return data.mgrSsvMsgLogQuery;
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
                    mutation CreateSSV_MSG_LOG(
                        $userId: String
                        $msg: String
                        $readFlag: String
                        $readDatetime: String
                        $sendUser: String
                        $sendDatetime: String
                        $statusCd: String
                    ) {
                        createSSV_MSG_LOG(
                            USER_ID: $userId
                            MSG: $msg
                            READ_FLAG: $readFlag
                            READ_DATETIME: $readDatetime
                            SEND_USER: $sendUser
                            SEND_DATETIME: $sendDatetime
                            STATUS_CD: $statusCd
                        ) {
                            USER_ID
                            MSG
                            READ_FLAG
                            READ_DATETIME
                            SEND_USER
                            SEND_DATETIME
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    msg: argData.MSG,
                    readFlag: argData.READ_FLAG,
                    readDatetime: argData.READ_DATETIME,
                    sendUser: argData.SEND_USER,
                    sendDatetime: argData.SEND_DATETIME,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "SSV_MSG_LOG INSERT:",
                JSON.stringify(data.createSSV_MSG_LOG),
            );
            return data.createSSV_MSG_LOG;
        } catch (e) {
            console.log("SSV_MSG_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_MSG_LOG(
                        $updateSsvMsgLogId: Int!
                        $userId: String
                        $msg: String
                        $readFlag: String
                        $readDatetime: String
                        $sendUser: String
                        $sendDatetime: String
                        $statusCd: String
                    ) {
                        updateSSV_MSG_LOG(
                            id: $updateSsvMsgLogId
                            USER_ID: $userId
                            MSG: $msg
                            READ_FLAG: $readFlag
                            READ_DATETIME: $readDatetime
                            SEND_USER: $sendUser
                            SEND_DATETIME: $sendDatetime
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            MSG
                            READ_FLAG
                            READ_DATETIME
                            SEND_USER
                            SEND_DATETIME
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    updateSsvMsgLogId: argData.id,
                    userId: argData.USER_ID,
                    msg: argData.MSG,
                    readFlag: argData.READ_FLAG,
                    readDatetime: argData.READ_DATETIME,
                    sendUser: argData.SEND_USER,
                    sendDatetime: argData.SEND_DATETIME,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "SSV_MSG_LOG UPDATE:",
                JSON.stringify(data.updateSSV_MSG_LOG),
            );
            return data.updateSSV_MSG_LOG;
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
                    mutation DeleteSSV_MSG_LOG($deleteSsvMsgLogId: Int!) {
                        deleteSSV_MSG_LOG(id: $deleteSsvMsgLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvMsgLogId: argData.id,
                },
            });
            console.log(
                "SSV_MSG_LOG DELETE:",
                JSON.stringify(data.deleteSSV_MSG_LOG),
            );
            return data.deleteSSV_MSG_LOG;
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
                    mutation MgrSsvMsgLogDeletes(
                        $ids: [InputMgrSsvMsgLogDeletes!]!
                    ) {
                        mgrSsvMsgLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_MSG_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
