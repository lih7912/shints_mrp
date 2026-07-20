/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_EXCEL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_EXCEL {
                        allQueryKZZ_EXCEL {
                            id
                            USER_ID
                            EX_SEQ
                            EX_TYPE
                        }
                    }
                `,
            });
            console.log(
                "KZZ_EXCEL:",
                JSON.stringify(data.allQueryKZZ_EXCEL.length),
            );
            return data.allQueryKZZ_EXCEL;
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
                    query MgrKzzExcelQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzExcelQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            EX_SEQ
                            EX_TYPE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_EXCEL:",
                JSON.stringify(data.mgrKzzExcelQuery.length),
            );
            return data.mgrKzzExcelQuery;
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
                    mutation CreateKZZ_EXCEL(
                        $userId: String
                        $exSeq: Int
                        $exType: String
                    ) {
                        createKZZ_EXCEL(
                            USER_ID: $userId
                            EX_SEQ: $exSeq
                            EX_TYPE: $exType
                        ) {
                            USER_ID
                            EX_SEQ
                            EX_TYPE
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    exSeq: argData.EX_SEQ,
                    exType: argData.EX_TYPE,
                },
            });
            console.log(
                "KZZ_EXCEL INSERT:",
                JSON.stringify(data.createKZZ_EXCEL),
            );
            return data.createKZZ_EXCEL;
        } catch (e) {
            console.log("KZZ_EXCEL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_EXCEL(
                        $updateKzzExcelId: Int!
                        $userId: String
                        $exSeq: Int
                        $exType: String
                    ) {
                        updateKZZ_EXCEL(
                            id: $updateKzzExcelId
                            USER_ID: $userId
                            EX_SEQ: $exSeq
                            EX_TYPE: $exType
                        ) {
                            id
                            USER_ID
                            EX_SEQ
                            EX_TYPE
                        }
                    }
                `,
                variables: {
                    updateKzzExcelId: argData.id,
                    userId: argData.USER_ID,
                    exSeq: argData.EX_SEQ,
                    exType: argData.EX_TYPE,
                },
            });
            console.log(
                "KZZ_EXCEL UPDATE:",
                JSON.stringify(data.updateKZZ_EXCEL),
            );
            return data.updateKZZ_EXCEL;
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
                    mutation DeleteKZZ_EXCEL($deleteKzzExcelId: Int!) {
                        deleteKZZ_EXCEL(id: $deleteKzzExcelId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzExcelId: argData.id,
                },
            });
            console.log(
                "KZZ_EXCEL DELETE:",
                JSON.stringify(data.deleteKZZ_EXCEL),
            );
            return data.deleteKZZ_EXCEL;
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
                    mutation MgrKzzExcelDeletes(
                        $ids: [InputMgrKzzExcelDeletes!]!
                    ) {
                        mgrKzzExcelDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_EXCEL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
