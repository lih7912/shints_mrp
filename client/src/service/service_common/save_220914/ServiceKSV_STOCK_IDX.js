/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_IDX {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_IDX {
                        allQueryKSV_STOCK_IDX {
                            id
                            fac
                            idx
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_IDX:",
                JSON.stringify(data.allQueryKSV_STOCK_IDX.length),
            );
            return data.allQueryKSV_STOCK_IDX;
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
                    query MgrKsvStockIdxQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockIdxQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            fac
                            idx
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_IDX:",
                JSON.stringify(data.mgrKsvStockIdxQuery.length),
            );
            return data.mgrKsvStockIdxQuery;
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
                    mutation CreateKSV_STOCK_IDX($fac: String, $idx: Int) {
                        createKSV_STOCK_IDX(fac: $fac, idx: $idx) {
                            fac
                            idx
                        }
                    }
                `,
                variables: {
                    fac: argData.fac,
                    idx: argData.idx,
                },
            });
            console.log(
                "KSV_STOCK_IDX INSERT:",
                JSON.stringify(data.createKSV_STOCK_IDX),
            );
            return data.createKSV_STOCK_IDX;
        } catch (e) {
            console.log("KSV_STOCK_IDX INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_IDX(
                        $updateKsvStockIdxId: Int!
                        $fac: String
                        $idx: Int
                    ) {
                        updateKSV_STOCK_IDX(
                            id: $updateKsvStockIdxId
                            fac: $fac
                            idx: $idx
                        ) {
                            id
                            fac
                            idx
                        }
                    }
                `,
                variables: {
                    updateKsvStockIdxId: argData.id,
                    fac: argData.fac,
                    idx: argData.idx,
                },
            });
            console.log(
                "KSV_STOCK_IDX UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_IDX),
            );
            return data.updateKSV_STOCK_IDX;
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
                    mutation DeleteKSV_STOCK_IDX($deleteKsvStockIdxId: Int!) {
                        deleteKSV_STOCK_IDX(id: $deleteKsvStockIdxId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockIdxId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_IDX DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_IDX),
            );
            return data.deleteKSV_STOCK_IDX;
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
                    mutation MgrKsvStockIdxDeletes(
                        $ids: [InputMgrKsvStockIdxDeletes!]!
                    ) {
                        mgrKsvStockIdxDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_IDX DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
