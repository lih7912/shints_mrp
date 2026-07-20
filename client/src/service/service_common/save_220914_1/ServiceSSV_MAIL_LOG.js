/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_MAIL_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_MAIL_LOG {
                        allQuerySSV_MAIL_LOG {
                            id
                            USER_ID
                            PO_CD
                            AGENT_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
            });
            console.log(
                "SSV_MAIL_LOG:",
                JSON.stringify(data.allQuerySSV_MAIL_LOG.length),
            );
            return data.allQuerySSV_MAIL_LOG;
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
                    query MgrSsvMailLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvMailLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            PO_CD
                            AGENT_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_MAIL_LOG:",
                JSON.stringify(data.mgrSsvMailLogQuery.length),
            );
            return data.mgrSsvMailLogQuery;
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
                    mutation CreateSSV_MAIL_LOG(
                        $userId: String
                        $poCd: String
                        $agentCd: String
                        $sendEmail: String
                        $sendDatetime: String
                        $sendFlag: String
                        $sendFilename: String
                    ) {
                        createSSV_MAIL_LOG(
                            USER_ID: $userId
                            PO_CD: $poCd
                            AGENT_CD: $agentCd
                            SEND_EMAIL: $sendEmail
                            SEND_DATETIME: $sendDatetime
                            SEND_FLAG: $sendFlag
                            SEND_FILENAME: $sendFilename
                        ) {
                            USER_ID
                            PO_CD
                            AGENT_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    agentCd: argData.AGENT_CD,
                    sendEmail: argData.SEND_EMAIL,
                    sendDatetime: argData.SEND_DATETIME,
                    sendFlag: argData.SEND_FLAG,
                    sendFilename: argData.SEND_FILENAME,
                },
            });
            console.log(
                "SSV_MAIL_LOG INSERT:",
                JSON.stringify(data.createSSV_MAIL_LOG),
            );
            return data.createSSV_MAIL_LOG;
        } catch (e) {
            console.log("SSV_MAIL_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_MAIL_LOG(
                        $updateSsvMailLogId: Int!
                        $userId: String
                        $poCd: String
                        $agentCd: String
                        $sendEmail: String
                        $sendDatetime: String
                        $sendFlag: String
                        $sendFilename: String
                    ) {
                        updateSSV_MAIL_LOG(
                            id: $updateSsvMailLogId
                            USER_ID: $userId
                            PO_CD: $poCd
                            AGENT_CD: $agentCd
                            SEND_EMAIL: $sendEmail
                            SEND_DATETIME: $sendDatetime
                            SEND_FLAG: $sendFlag
                            SEND_FILENAME: $sendFilename
                        ) {
                            id
                            USER_ID
                            PO_CD
                            AGENT_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
                variables: {
                    updateSsvMailLogId: argData.id,
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    agentCd: argData.AGENT_CD,
                    sendEmail: argData.SEND_EMAIL,
                    sendDatetime: argData.SEND_DATETIME,
                    sendFlag: argData.SEND_FLAG,
                    sendFilename: argData.SEND_FILENAME,
                },
            });
            console.log(
                "SSV_MAIL_LOG UPDATE:",
                JSON.stringify(data.updateSSV_MAIL_LOG),
            );
            return data.updateSSV_MAIL_LOG;
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
                    mutation DeleteSSV_MAIL_LOG($deleteSsvMailLogId: Int!) {
                        deleteSSV_MAIL_LOG(id: $deleteSsvMailLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvMailLogId: argData.id,
                },
            });
            console.log(
                "SSV_MAIL_LOG DELETE:",
                JSON.stringify(data.deleteSSV_MAIL_LOG),
            );
            return data.deleteSSV_MAIL_LOG;
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
                    mutation MgrSsvMailLogDeletes(
                        $ids: [InputMgrSsvMailLogDeletes!]!
                    ) {
                        mgrSsvMailLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_MAIL_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
