/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_MST {
                        allQueryKSV_STOCK_MST {
                            id
                            PO_CD
                            PO_SEQ
                            IN_FACTORY_CD
                            OUT_FACTORY_CD
                            STATUS_CD
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_MST:",
                JSON.stringify(data.allQueryKSV_STOCK_MST.length),
            );
            return data.allQueryKSV_STOCK_MST;
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
                    query MgrKsvStockMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            IN_FACTORY_CD
                            OUT_FACTORY_CD
                            STATUS_CD
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_MST:",
                JSON.stringify(data.mgrKsvStockMstQuery.length),
            );
            return data.mgrKsvStockMstQuery;
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
                    mutation CreateKSV_STOCK_MST(
                        $poCd: String
                        $poSeq: Int
                        $inFactoryCd: String
                        $outFactoryCd: String
                        $statusCd: String
                        $regDatetime: String
                        $regUser: String
                    ) {
                        createKSV_STOCK_MST(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            IN_FACTORY_CD: $inFactoryCd
                            OUT_FACTORY_CD: $outFactoryCd
                            STATUS_CD: $statusCd
                            REG_DATETIME: $regDatetime
                            REG_USER: $regUser
                        ) {
                            PO_CD
                            PO_SEQ
                            IN_FACTORY_CD
                            OUT_FACTORY_CD
                            STATUS_CD
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    inFactoryCd: argData.IN_FACTORY_CD,
                    outFactoryCd: argData.OUT_FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regDatetime: argData.REG_DATETIME,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KSV_STOCK_MST INSERT:",
                JSON.stringify(data.createKSV_STOCK_MST),
            );
            return data.createKSV_STOCK_MST;
        } catch (e) {
            console.log("KSV_STOCK_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_MST(
                        $updateKsvStockMstId: Int!
                        $poCd: String
                        $poSeq: Int
                        $inFactoryCd: String
                        $outFactoryCd: String
                        $statusCd: String
                        $regDatetime: String
                        $regUser: String
                    ) {
                        updateKSV_STOCK_MST(
                            id: $updateKsvStockMstId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            IN_FACTORY_CD: $inFactoryCd
                            OUT_FACTORY_CD: $outFactoryCd
                            STATUS_CD: $statusCd
                            REG_DATETIME: $regDatetime
                            REG_USER: $regUser
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            IN_FACTORY_CD
                            OUT_FACTORY_CD
                            STATUS_CD
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKsvStockMstId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    inFactoryCd: argData.IN_FACTORY_CD,
                    outFactoryCd: argData.OUT_FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regDatetime: argData.REG_DATETIME,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KSV_STOCK_MST UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_MST),
            );
            return data.updateKSV_STOCK_MST;
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
                    mutation DeleteKSV_STOCK_MST($deleteKsvStockMstId: Int!) {
                        deleteKSV_STOCK_MST(id: $deleteKsvStockMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockMstId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_MST DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_MST),
            );
            return data.deleteKSV_STOCK_MST;
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
                    mutation MgrKsvStockMstDeletes(
                        $ids: [InputMgrKsvStockMstDeletes!]!
                    ) {
                        mgrKsvStockMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
