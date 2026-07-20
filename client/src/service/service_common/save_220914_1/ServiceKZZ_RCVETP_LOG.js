/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_RCVETP_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_RCVETP_LOG {
                        allQueryKZZ_RCVETP_LOG {
                            id
                            RCV_DATETIME
                            RCV_DATA
                            STATUS_CD
                        }
                    }
                `,
            });
            console.log(
                "KZZ_RCVETP_LOG:",
                JSON.stringify(data.allQueryKZZ_RCVETP_LOG.length),
            );
            return data.allQueryKZZ_RCVETP_LOG;
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
                    query MgrKzzRcvetpLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzRcvetpLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            RCV_DATETIME
                            RCV_DATA
                            STATUS_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_RCVETP_LOG:",
                JSON.stringify(data.mgrKzzRcvetpLogQuery.length),
            );
            return data.mgrKzzRcvetpLogQuery;
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
                    mutation CreateKZZ_RCVETP_LOG(
                        $rcvDatetime: String
                        $rcvData: String
                        $statusCd: String
                    ) {
                        createKZZ_RCVETP_LOG(
                            RCV_DATETIME: $rcvDatetime
                            RCV_DATA: $rcvData
                            STATUS_CD: $statusCd
                        ) {
                            RCV_DATETIME
                            RCV_DATA
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    rcvDatetime: argData.RCV_DATETIME,
                    rcvData: argData.RCV_DATA,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "KZZ_RCVETP_LOG INSERT:",
                JSON.stringify(data.createKZZ_RCVETP_LOG),
            );
            return data.createKZZ_RCVETP_LOG;
        } catch (e) {
            console.log("KZZ_RCVETP_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_RCVETP_LOG(
                        $updateKzzRcvetpLogId: Int!
                        $rcvDatetime: String
                        $rcvData: String
                        $statusCd: String
                    ) {
                        updateKZZ_RCVETP_LOG(
                            id: $updateKzzRcvetpLogId
                            RCV_DATETIME: $rcvDatetime
                            RCV_DATA: $rcvData
                            STATUS_CD: $statusCd
                        ) {
                            id
                            RCV_DATETIME
                            RCV_DATA
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    updateKzzRcvetpLogId: argData.id,
                    rcvDatetime: argData.RCV_DATETIME,
                    rcvData: argData.RCV_DATA,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "KZZ_RCVETP_LOG UPDATE:",
                JSON.stringify(data.updateKZZ_RCVETP_LOG),
            );
            return data.updateKZZ_RCVETP_LOG;
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
                    mutation DeleteKZZ_RCVETP_LOG($deleteKzzRcvetpLogId: Int!) {
                        deleteKZZ_RCVETP_LOG(id: $deleteKzzRcvetpLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzRcvetpLogId: argData.id,
                },
            });
            console.log(
                "KZZ_RCVETP_LOG DELETE:",
                JSON.stringify(data.deleteKZZ_RCVETP_LOG),
            );
            return data.deleteKZZ_RCVETP_LOG;
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
                    mutation MgrKzzRcvetpLogDeletes(
                        $ids: [InputMgrKzzRcvetpLogDeletes!]!
                    ) {
                        mgrKzzRcvetpLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_RCVETP_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
