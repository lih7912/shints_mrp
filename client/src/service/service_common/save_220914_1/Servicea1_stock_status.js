/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea1_stock_status {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya1_stock_status {
                        allQuerya1_stock_status {
                            id
                            stock_idx
                        }
                    }
                `,
            });
            console.log(
                "a1_stock_status:",
                JSON.stringify(data.allQuerya1_stock_status.length),
            );
            return data.allQuerya1_stock_status;
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
                    query MgrA1StockStatusQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrA1StockStatusQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            stock_idx
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a1_stock_status:",
                JSON.stringify(data.mgrA1StockStatusQuery.length),
            );
            return data.mgrA1StockStatusQuery;
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
                    mutation Createa1_stock_status($stockIdx: String) {
                        createa1_stock_status(stock_idx: $stockIdx) {
                            stock_idx
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.stock_idx,
                },
            });
            console.log(
                "a1_stock_status INSERT:",
                JSON.stringify(data.createa1_stock_status),
            );
            return data.createa1_stock_status;
        } catch (e) {
            console.log("a1_stock_status INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea1_stock_status(
                        $updateA1StockStatusId: Int!
                        $stockIdx: String
                    ) {
                        updatea1_stock_status(
                            id: $updateA1StockStatusId
                            stock_idx: $stockIdx
                        ) {
                            id
                            stock_idx
                        }
                    }
                `,
                variables: {
                    updateA1StockStatusId: argData.id,
                    stockIdx: argData.stock_idx,
                },
            });
            console.log(
                "a1_stock_status UPDATE:",
                JSON.stringify(data.updatea1_stock_status),
            );
            return data.updatea1_stock_status;
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
                    mutation Deletea1_stock_status(
                        $deleteA1StockStatusId: Int!
                    ) {
                        deletea1_stock_status(id: $deleteA1StockStatusId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteA1StockStatusId: argData.id,
                },
            });
            console.log(
                "a1_stock_status DELETE:",
                JSON.stringify(data.deletea1_stock_status),
            );
            return data.deletea1_stock_status;
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
                    mutation MgrA1StockStatusDeletes(
                        $ids: [InputMgrA1StockStatusDeletes!]!
                    ) {
                        mgrA1StockStatusDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a1_stock_status DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
