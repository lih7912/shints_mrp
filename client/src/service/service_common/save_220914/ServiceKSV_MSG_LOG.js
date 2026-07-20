/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_MSG_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_MSG_LOG {
                        allQueryKSV_MSG_LOG {
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
                "KSV_MSG_LOG:",
                JSON.stringify(data.allQueryKSV_MSG_LOG.length),
            );
            return data.allQueryKSV_MSG_LOG;
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
                    query MgrKsvMsgLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvMsgLogQuery(
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
                "KSV_MSG_LOG:",
                JSON.stringify(data.mgrKsvMsgLogQuery.length),
            );
            return data.mgrKsvMsgLogQuery;
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
                    mutation CreateKSV_MSG_LOG(
                        $userId: String
                        $msg: String
                        $readFlag: String
                        $readDatetime: String
                        $sendUser: String
                        $sendDatetime: String
                        $statusCd: String
                    ) {
                        createKSV_MSG_LOG(
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
                "KSV_MSG_LOG INSERT:",
                JSON.stringify(data.createKSV_MSG_LOG),
            );
            return data.createKSV_MSG_LOG;
        } catch (e) {
            console.log("KSV_MSG_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_MSG_LOG(
                        $updateKsvMsgLogId: Int!
                        $userId: String
                        $msg: String
                        $readFlag: String
                        $readDatetime: String
                        $sendUser: String
                        $sendDatetime: String
                        $statusCd: String
                    ) {
                        updateKSV_MSG_LOG(
                            id: $updateKsvMsgLogId
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
                    updateKsvMsgLogId: argData.id,
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
                "KSV_MSG_LOG UPDATE:",
                JSON.stringify(data.updateKSV_MSG_LOG),
            );
            return data.updateKSV_MSG_LOG;
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
                    mutation DeleteKSV_MSG_LOG($deleteKsvMsgLogId: Int!) {
                        deleteKSV_MSG_LOG(id: $deleteKsvMsgLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvMsgLogId: argData.id,
                },
            });
            console.log(
                "KSV_MSG_LOG DELETE:",
                JSON.stringify(data.deleteKSV_MSG_LOG),
            );
            return data.deleteKSV_MSG_LOG;
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
                    mutation MgrKsvMsgLogDeletes(
                        $ids: [InputMgrKsvMsgLogDeletes!]!
                    ) {
                        mgrKsvMsgLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_MSG_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
