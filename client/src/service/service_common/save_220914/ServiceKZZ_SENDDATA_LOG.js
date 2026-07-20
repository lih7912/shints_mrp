/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_SENDDATA_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_SENDDATA_LOG {
                        allQueryKZZ_SENDDATA_LOG {
                            id
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            SQL1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_SENDDATA_LOG:",
                JSON.stringify(data.allQueryKZZ_SENDDATA_LOG.length),
            );
            return data.allQueryKZZ_SENDDATA_LOG;
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
                    query MgrKzzSenddataLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzSenddataLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            SQL1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_SENDDATA_LOG:",
                JSON.stringify(data.mgrKzzSenddataLogQuery.length),
            );
            return data.mgrKzzSenddataLogQuery;
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
                    mutation CreateKZZ_SENDDATA_LOG(
                        $tableName: String
                        $jobFlag: String
                        $sendFlag: String
                        $sendDatetime: String
                        $key1: String
                        $sql1: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_SENDDATA_LOG(
                            TABLE_NAME: $tableName
                            JOB_FLAG: $jobFlag
                            SEND_FLAG: $sendFlag
                            SEND_DATETIME: $sendDatetime
                            KEY1: $key1
                            SQL1: $sql1
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            TABLE_NAME
                            JOB_FLAG
                            SEND_FLAG
                            SEND_DATETIME
                            KEY1
                            SQL1
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
                    sql1: argData.SQL1,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_SENDDATA_LOG INSERT:",
                JSON.stringify(data.createKZZ_SENDDATA_LOG),
            );
            return data.createKZZ_SENDDATA_LOG;
        } catch (e) {
            console.log("KZZ_SENDDATA_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_SENDDATA_LOG(
                        $updateKzzSenddataLogId: Int!
                        $tableName: String
                        $jobFlag: String
                        $sendFlag: String
                        $sendDatetime: String
                        $key1: String
                        $sql1: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_SENDDATA_LOG(
                            id: $updateKzzSenddataLogId
                            TABLE_NAME: $tableName
                            JOB_FLAG: $jobFlag
                            SEND_FLAG: $sendFlag
                            SEND_DATETIME: $sendDatetime
                            KEY1: $key1
                            SQL1: $sql1
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
                            SQL1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzSenddataLogId: argData.id,
                    tableName: argData.TABLE_NAME,
                    jobFlag: argData.JOB_FLAG,
                    sendFlag: argData.SEND_FLAG,
                    sendDatetime: argData.SEND_DATETIME,
                    key1: argData.KEY1,
                    sql1: argData.SQL1,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_SENDDATA_LOG UPDATE:",
                JSON.stringify(data.updateKZZ_SENDDATA_LOG),
            );
            return data.updateKZZ_SENDDATA_LOG;
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
                    mutation DeleteKZZ_SENDDATA_LOG(
                        $deleteKzzSenddataLogId: Int!
                    ) {
                        deleteKZZ_SENDDATA_LOG(id: $deleteKzzSenddataLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzSenddataLogId: argData.id,
                },
            });
            console.log(
                "KZZ_SENDDATA_LOG DELETE:",
                JSON.stringify(data.deleteKZZ_SENDDATA_LOG),
            );
            return data.deleteKZZ_SENDDATA_LOG;
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
                    mutation MgrKzzSenddataLogDeletes(
                        $ids: [InputMgrKzzSenddataLogDeletes!]!
                    ) {
                        mgrKzzSenddataLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_SENDDATA_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
