/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_STOCK_IN_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_IN_MEM {
                        allQueryKSV_STOCK_IN_MEM {
                            id
                            PAY_REPORT
                            END_DATE
                            END_AMOUNT
                            TOTAL_AMOUNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_IN_MEM:",
                JSON.stringify(data.allQueryKSV_STOCK_IN_MEM.length),
            );
            return data.allQueryKSV_STOCK_IN_MEM;
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
                    query MgrKsvStockInMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockInMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PAY_REPORT
                            END_DATE
                            END_AMOUNT
                            TOTAL_AMOUNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_IN_MEM:",
                JSON.stringify(data.mgrKsvStockInMemQuery.length),
            );
            return data.mgrKsvStockInMemQuery;
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
                    mutation CreateKSV_STOCK_IN_MEM(
                        $payReport: String
                        $endDate: String
                        $endAmount: Float
                        $totalAmount: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_STOCK_IN_MEM(
                            PAY_REPORT: $payReport
                            END_DATE: $endDate
                            END_AMOUNT: $endAmount
                            TOTAL_AMOUNT: $totalAmount
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PAY_REPORT
                            END_DATE
                            END_AMOUNT
                            TOTAL_AMOUNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    payReport: argData.PAY_REPORT,
                    endDate: argData.END_DATE,
                    endAmount: argData.END_AMOUNT,
                    totalAmount: argData.TOTAL_AMOUNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_IN_MEM INSERT:",
                JSON.stringify(data.createKSV_STOCK_IN_MEM),
            );
            return data.createKSV_STOCK_IN_MEM;
        } catch (e) {
            console.log("KSV_STOCK_IN_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_STOCK_IN_MEM(
                        $updateKsvStockInMemId: Int!
                        $payReport: String
                        $endDate: String
                        $endAmount: Float
                        $totalAmount: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_STOCK_IN_MEM(
                            id: $updateKsvStockInMemId
                            PAY_REPORT: $payReport
                            END_DATE: $endDate
                            END_AMOUNT: $endAmount
                            TOTAL_AMOUNT: $totalAmount
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PAY_REPORT
                            END_DATE
                            END_AMOUNT
                            TOTAL_AMOUNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvStockInMemId: argData.id,
                    payReport: argData.PAY_REPORT,
                    endDate: argData.END_DATE,
                    endAmount: argData.END_AMOUNT,
                    totalAmount: argData.TOTAL_AMOUNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_IN_MEM UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_IN_MEM),
            );
            return data.updateKSV_STOCK_IN_MEM;
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
                    mutation DeleteKSV_STOCK_IN_MEM(
                        $deleteKsvStockInMemId: Int!
                    ) {
                        deleteKSV_STOCK_IN_MEM(id: $deleteKsvStockInMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockInMemId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_IN_MEM DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_IN_MEM),
            );
            return data.deleteKSV_STOCK_IN_MEM;
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
                    mutation MgrKsvStockInMemDeletes(
                        $ids: [InputMgrKsvStockInMemDeletes!]!
                    ) {
                        mgrKsvStockInMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_IN_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
