/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_SENDETP_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_SENDETP_LOG {
                        allQueryKZZ_SENDETP_LOG {
                            id
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_SENDETP_LOG:",
                JSON.stringify(data.allQueryKZZ_SENDETP_LOG.length),
            );
            return data.allQueryKZZ_SENDETP_LOG;
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
                    query MgrKzzSendetpLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzSendetpLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_SENDETP_LOG:",
                JSON.stringify(data.mgrKzzSendetpLogQuery.length),
            );
            return data.mgrKzzSendetpLogQuery;
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
                    mutation CreateKZZ_SENDETP_LOG(
                        $tableName: String
                        $jobFlag: String
                        $sendFlag: String
                        $sendDatetime: String
                        $key1: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_SENDETP_LOG(
                            TABLE_NAME: $tableName
                            JOB_FLAG: $jobFlag
                            SEND_FLAG: $sendFlag
                            SEND_DATETIME: $sendDatetime
                            KEY1: $key1
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    tableName: argData.TABLE_NAME,
                    jobFlag: argData.JOB_FLAG,
                    sendFlag: argData.SEND_FLAG,
                    sendDatetime: argData.SEND_DATETIME,
                    key1: argData.KEY1,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_SENDETP_LOG INSERT:",
                JSON.stringify(data.createKZZ_SENDETP_LOG),
            );
            return data.createKZZ_SENDETP_LOG;
        } catch (e) {
            console.log("KZZ_SENDETP_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_SENDETP_LOG(
                        $updateKzzSendetpLogId: Int!
                        $tableName: String
                        $jobFlag: String
                        $sendFlag: String
                        $sendDatetime: String
                        $key1: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_SENDETP_LOG(
                            id: $updateKzzSendetpLogId
                            TABLE_NAME: $tableName
                            JOB_FLAG: $jobFlag
                            SEND_FLAG: $sendFlag
                            SEND_DATETIME: $sendDatetime
                            KEY1: $key1
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzSendetpLogId: argData.id,
                    tableName: argData.TABLE_NAME,
                    jobFlag: argData.JOB_FLAG,
                    sendFlag: argData.SEND_FLAG,
                    sendDatetime: argData.SEND_DATETIME,
                    key1: argData.KEY1,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_SENDETP_LOG UPDATE:",
                JSON.stringify(data.updateKZZ_SENDETP_LOG),
            );
            return data.updateKZZ_SENDETP_LOG;
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
                    mutation DeleteKZZ_SENDETP_LOG(
                        $deleteKzzSendetpLogId: Int!
                    ) {
                        deleteKZZ_SENDETP_LOG(id: $deleteKzzSendetpLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzSendetpLogId: argData.id,
                },
            });
            console.log(
                "KZZ_SENDETP_LOG DELETE:",
                JSON.stringify(data.deleteKZZ_SENDETP_LOG),
            );
            return data.deleteKZZ_SENDETP_LOG;
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
                    mutation MgrKzzSendetpLogDeletes(
                        $ids: [InputMgrKzzSendetpLogDeletes!]!
                    ) {
                        mgrKzzSendetpLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_SENDETP_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
