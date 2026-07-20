/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_ORG_REASON {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_ORG_REASON {
                        allQueryKSV_STOCK_ORG_REASON {
                            id
                            STOCK_IDX
                            REASON_REMARK
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_ORG_REASON:",
                JSON.stringify(data.allQueryKSV_STOCK_ORG_REASON.length),
            );
            return data.allQueryKSV_STOCK_ORG_REASON;
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
                    query MgrKsvStockOrgReasonQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockOrgReasonQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STOCK_IDX
                            REASON_REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_ORG_REASON:",
                JSON.stringify(data.mgrKsvStockOrgReasonQuery.length),
            );
            return data.mgrKsvStockOrgReasonQuery;
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
                    mutation CreateKSV_STOCK_ORG_REASON(
                        $stockIdx: String
                        $reasonRemark: String
                    ) {
                        createKSV_STOCK_ORG_REASON(
                            STOCK_IDX: $stockIdx
                            REASON_REMARK: $reasonRemark
                        ) {
                            STOCK_IDX
                            REASON_REMARK
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.STOCK_IDX,
                    reasonRemark: argData.REASON_REMARK,
                },
            });
            console.log(
                "KSV_STOCK_ORG_REASON INSERT:",
                JSON.stringify(data.createKSV_STOCK_ORG_REASON),
            );
            return data.createKSV_STOCK_ORG_REASON;
        } catch (e) {
            console.log(
                "KSV_STOCK_ORG_REASON INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_STOCK_ORG_REASON(
                        $updateKsvStockOrgReasonId: Int!
                        $stockIdx: String
                        $reasonRemark: String
                    ) {
                        updateKSV_STOCK_ORG_REASON(
                            id: $updateKsvStockOrgReasonId
                            STOCK_IDX: $stockIdx
                            REASON_REMARK: $reasonRemark
                        ) {
                            id
                            STOCK_IDX
                            REASON_REMARK
                        }
                    }
                `,
                variables: {
                    updateKsvStockOrgReasonId: argData.id,
                    stockIdx: argData.STOCK_IDX,
                    reasonRemark: argData.REASON_REMARK,
                },
            });
            console.log(
                "KSV_STOCK_ORG_REASON UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_ORG_REASON),
            );
            return data.updateKSV_STOCK_ORG_REASON;
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
                    mutation DeleteKSV_STOCK_ORG_REASON(
                        $deleteKsvStockOrgReasonId: Int!
                    ) {
                        deleteKSV_STOCK_ORG_REASON(
                            id: $deleteKsvStockOrgReasonId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockOrgReasonId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_ORG_REASON DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_ORG_REASON),
            );
            return data.deleteKSV_STOCK_ORG_REASON;
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
                    mutation MgrKsvStockOrgReasonDeletes(
                        $ids: [InputMgrKsvStockOrgReasonDeletes!]!
                    ) {
                        mgrKsvStockOrgReasonDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_ORG_REASON DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
