/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicea_stock_insert {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_stock_insert {
                        allQuerya_stock_insert {
                            id
                            stock_idx
                            matl_cd
                            in_qty
                            matl_seq
                            remark
                            rack
                            mrp_seq
                        }
                    }
                `,
            });
            console.log(
                "a_stock_insert:",
                JSON.stringify(data.allQuerya_stock_insert.length),
            );
            return data.allQuerya_stock_insert;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrAStockInsertQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAStockInsertQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            stock_idx
                            matl_cd
                            in_qty
                            matl_seq
                            remark
                            rack
                            mrp_seq
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_stock_insert:",
                JSON.stringify(data.mgrAStockInsertQuery.length),
            );
            return data.mgrAStockInsertQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Createa_stock_insert(
                        $stockIdx: String
                        $matlCd: String
                        $inQty: Float
                        $matlSeq: Int
                        $remark: String
                        $rack: String
                        $mrpSeq: Int
                    ) {
                        createa_stock_insert(
                            stock_idx: $stockIdx
                            matl_cd: $matlCd
                            in_qty: $inQty
                            matl_seq: $matlSeq
                            remark: $remark
                            rack: $rack
                            mrp_seq: $mrpSeq
                        ) {
                            stock_idx
                            matl_cd
                            in_qty
                            matl_seq
                            remark
                            rack
                            mrp_seq
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.stock_idx,
                    matlCd: argData.matl_cd,
                    inQty: argData.in_qty,
                    matlSeq: argData.matl_seq,
                    remark: argData.remark,
                    rack: argData.rack,
                    mrpSeq: argData.mrp_seq,
                },
            });
            console.log(
                "a_stock_insert INSERT:",
                JSON.stringify(data.createa_stock_insert),
            );
            return data.createa_stock_insert;
        } catch (e) {
            console.log("a_stock_insert INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatea_stock_insert(
                        $updateAStockInsertId: Int!
                        $stockIdx: String
                        $matlCd: String
                        $inQty: Float
                        $matlSeq: Int
                        $remark: String
                        $rack: String
                        $mrpSeq: Int
                    ) {
                        updatea_stock_insert(
                            id: $updateAStockInsertId
                            stock_idx: $stockIdx
                            matl_cd: $matlCd
                            in_qty: $inQty
                            matl_seq: $matlSeq
                            remark: $remark
                            rack: $rack
                            mrp_seq: $mrpSeq
                        ) {
                            id
                            stock_idx
                            matl_cd
                            in_qty
                            matl_seq
                            remark
                            rack
                            mrp_seq
                        }
                    }
                `,
                variables: {
                    updateAStockInsertId: argData.id,
                    stockIdx: argData.stock_idx,
                    matlCd: argData.matl_cd,
                    inQty: argData.in_qty,
                    matlSeq: argData.matl_seq,
                    remark: argData.remark,
                    rack: argData.rack,
                    mrpSeq: argData.mrp_seq,
                },
            });
            console.log(
                "a_stock_insert UPDATE:",
                JSON.stringify(data.updatea_stock_insert),
            );
            return data.updatea_stock_insert;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Deletea_stock_insert($deleteAStockInsertId: Int!) {
                        deletea_stock_insert(id: $deleteAStockInsertId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAStockInsertId: argData.id,
                },
            });
            console.log(
                "a_stock_insert DELETE:",
                JSON.stringify(data.deletea_stock_insert),
            );
            return data.deletea_stock_insert;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                    mutation MgrAStockInsertDeletes(
                        $ids: [InputMgrAStockInsertDeletes!]!
                    ) {
                        mgrAStockInsertDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_stock_insert DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
