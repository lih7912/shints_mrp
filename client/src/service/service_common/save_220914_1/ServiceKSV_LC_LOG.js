/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_LC_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_LC_LOG {
                        allQueryKSV_LC_LOG {
                            id
                            BANK_CD
                            LOG_DATE
                            LOG_TYPE
                            LOG_WON
                            LC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_LC_LOG:",
                JSON.stringify(data.allQueryKSV_LC_LOG.length),
            );
            return data.allQueryKSV_LC_LOG;
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
                    query MgrKsvLcLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvLcLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BANK_CD
                            LOG_DATE
                            LOG_TYPE
                            LOG_WON
                            LC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_LC_LOG:",
                JSON.stringify(data.mgrKsvLcLogQuery.length),
            );
            return data.mgrKsvLcLogQuery;
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
                    mutation CreateKSV_LC_LOG(
                        $bankCd: String
                        $logDate: String
                        $logType: String
                        $logWon: Float
                        $lcNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_LC_LOG(
                            BANK_CD: $bankCd
                            LOG_DATE: $logDate
                            LOG_TYPE: $logType
                            LOG_WON: $logWon
                            LC_NO: $lcNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            BANK_CD
                            LOG_DATE
                            LOG_TYPE
                            LOG_WON
                            LC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    bankCd: argData.BANK_CD,
                    logDate: argData.LOG_DATE,
                    logType: argData.LOG_TYPE,
                    logWon: argData.LOG_WON,
                    lcNo: argData.LC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_LC_LOG INSERT:",
                JSON.stringify(data.createKSV_LC_LOG),
            );
            return data.createKSV_LC_LOG;
        } catch (e) {
            console.log("KSV_LC_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_LC_LOG(
                        $updateKsvLcLogId: Int!
                        $bankCd: String
                        $logDate: String
                        $logType: String
                        $logWon: Float
                        $lcNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_LC_LOG(
                            id: $updateKsvLcLogId
                            BANK_CD: $bankCd
                            LOG_DATE: $logDate
                            LOG_TYPE: $logType
                            LOG_WON: $logWon
                            LC_NO: $lcNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            BANK_CD
                            LOG_DATE
                            LOG_TYPE
                            LOG_WON
                            LC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvLcLogId: argData.id,
                    bankCd: argData.BANK_CD,
                    logDate: argData.LOG_DATE,
                    logType: argData.LOG_TYPE,
                    logWon: argData.LOG_WON,
                    lcNo: argData.LC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_LC_LOG UPDATE:",
                JSON.stringify(data.updateKSV_LC_LOG),
            );
            return data.updateKSV_LC_LOG;
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
                    mutation DeleteKSV_LC_LOG($deleteKsvLcLogId: Int!) {
                        deleteKSV_LC_LOG(id: $deleteKsvLcLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvLcLogId: argData.id,
                },
            });
            console.log(
                "KSV_LC_LOG DELETE:",
                JSON.stringify(data.deleteKSV_LC_LOG),
            );
            return data.deleteKSV_LC_LOG;
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
                    mutation MgrKsvLcLogDeletes(
                        $ids: [InputMgrKsvLcLogDeletes!]!
                    ) {
                        mgrKsvLcLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_LC_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
