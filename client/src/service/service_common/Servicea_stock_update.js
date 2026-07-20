/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicea_stock_update {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_stock_update {
                        allQuerya_stock_update {
                            id
                            stock_idx
                            remark
                            exp_date
                            reason_remark
                            plan_remark
                            rack
                            debit_cd
                        }
                    }
                `,
            });
            console.log(
                "a_stock_update:",
                JSON.stringify(data.allQuerya_stock_update.length),
            );
            return data.allQuerya_stock_update;
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
                    query MgrAStockUpdateQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAStockUpdateQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            stock_idx
                            remark
                            exp_date
                            reason_remark
                            plan_remark
                            rack
                            debit_cd
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_stock_update:",
                JSON.stringify(data.mgrAStockUpdateQuery.length),
            );
            return data.mgrAStockUpdateQuery;
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
                    mutation Createa_stock_update(
                        $stockIdx: String
                        $remark: String
                        $expDate: String
                        $reasonRemark: String
                        $planRemark: String
                        $rack: String
                        $debitCd: String
                    ) {
                        createa_stock_update(
                            stock_idx: $stockIdx
                            remark: $remark
                            exp_date: $expDate
                            reason_remark: $reasonRemark
                            plan_remark: $planRemark
                            rack: $rack
                            debit_cd: $debitCd
                        ) {
                            stock_idx
                            remark
                            exp_date
                            reason_remark
                            plan_remark
                            rack
                            debit_cd
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.stock_idx,
                    remark: argData.remark,
                    expDate: argData.exp_date,
                    reasonRemark: argData.reason_remark,
                    planRemark: argData.plan_remark,
                    rack: argData.rack,
                    debitCd: argData.debit_cd,
                },
            });
            console.log(
                "a_stock_update INSERT:",
                JSON.stringify(data.createa_stock_update),
            );
            return data.createa_stock_update;
        } catch (e) {
            console.log("a_stock_update INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatea_stock_update(
                        $updateAStockUpdateId: Int!
                        $stockIdx: String
                        $remark: String
                        $expDate: String
                        $reasonRemark: String
                        $planRemark: String
                        $rack: String
                        $debitCd: String
                    ) {
                        updatea_stock_update(
                            id: $updateAStockUpdateId
                            stock_idx: $stockIdx
                            remark: $remark
                            exp_date: $expDate
                            reason_remark: $reasonRemark
                            plan_remark: $planRemark
                            rack: $rack
                            debit_cd: $debitCd
                        ) {
                            id
                            stock_idx
                            remark
                            exp_date
                            reason_remark
                            plan_remark
                            rack
                            debit_cd
                        }
                    }
                `,
                variables: {
                    updateAStockUpdateId: argData.id,
                    stockIdx: argData.stock_idx,
                    remark: argData.remark,
                    expDate: argData.exp_date,
                    reasonRemark: argData.reason_remark,
                    planRemark: argData.plan_remark,
                    rack: argData.rack,
                    debitCd: argData.debit_cd,
                },
            });
            console.log(
                "a_stock_update UPDATE:",
                JSON.stringify(data.updatea_stock_update),
            );
            return data.updatea_stock_update;
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
                    mutation Deletea_stock_update($deleteAStockUpdateId: Int!) {
                        deletea_stock_update(id: $deleteAStockUpdateId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAStockUpdateId: argData.id,
                },
            });
            console.log(
                "a_stock_update DELETE:",
                JSON.stringify(data.deletea_stock_update),
            );
            return data.deletea_stock_update;
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
                    mutation MgrAStockUpdateDeletes(
                        $ids: [InputMgrAStockUpdateDeletes!]!
                    ) {
                        mgrAStockUpdateDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_stock_update DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
