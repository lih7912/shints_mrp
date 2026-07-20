/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_LOG {
                        allQueryKSV_ORDER_LOG {
                            id
                            ORDER_CD
                            CREATE_USER
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_LOG:",
                JSON.stringify(data.allQueryKSV_ORDER_LOG.length),
            );
            return data.allQueryKSV_ORDER_LOG;
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
                    query MgrKsvOrderLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            CREATE_USER
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_LOG:",
                JSON.stringify(data.mgrKsvOrderLogQuery.length),
            );
            return data.mgrKsvOrderLogQuery;
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
                    mutation CreateKSV_ORDER_LOG(
                        $orderCd: String
                        $createUser: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_LOG(
                            ORDER_CD: $orderCd
                            CREATE_USER: $createUser
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            CREATE_USER
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    createUser: argData.CREATE_USER,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_LOG INSERT:",
                JSON.stringify(data.createKSV_ORDER_LOG),
            );
            return data.createKSV_ORDER_LOG;
        } catch (e) {
            console.log("KSV_ORDER_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_LOG(
                        $updateKsvOrderLogId: Int!
                        $orderCd: String
                        $createUser: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_LOG(
                            id: $updateKsvOrderLogId
                            ORDER_CD: $orderCd
                            CREATE_USER: $createUser
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            CREATE_USER
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderLogId: argData.id,
                    orderCd: argData.ORDER_CD,
                    createUser: argData.CREATE_USER,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_LOG UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_LOG),
            );
            return data.updateKSV_ORDER_LOG;
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
                    mutation DeleteKSV_ORDER_LOG($deleteKsvOrderLogId: Int!) {
                        deleteKSV_ORDER_LOG(id: $deleteKsvOrderLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderLogId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_LOG DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_LOG),
            );
            return data.deleteKSV_ORDER_LOG;
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
                    mutation MgrKsvOrderLogDeletes(
                        $ids: [InputMgrKsvOrderLogDeletes!]!
                    ) {
                        mgrKsvOrderLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
