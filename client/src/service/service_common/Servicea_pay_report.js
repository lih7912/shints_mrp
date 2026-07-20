/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicea_pay_report {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_pay_report {
                        allQuerya_pay_report {
                            id
                            pay_no
                            buy_Date
                            pay_report
                        }
                    }
                `,
            });
            console.log(
                "a_pay_report:",
                JSON.stringify(data.allQuerya_pay_report.length),
            );
            return data.allQuerya_pay_report;
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
                    query MgrAPayReportQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAPayReportQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            pay_no
                            buy_Date
                            pay_report
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_pay_report:",
                JSON.stringify(data.mgrAPayReportQuery.length),
            );
            return data.mgrAPayReportQuery;
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
                    mutation Createa_pay_report(
                        $payNo: String
                        $buyDate: String
                        $payReport: String
                    ) {
                        createa_pay_report(
                            pay_no: $payNo
                            buy_Date: $buyDate
                            pay_report: $payReport
                        ) {
                            pay_no
                            buy_Date
                            pay_report
                        }
                    }
                `,
                variables: {
                    payNo: argData.pay_no,
                    buyDate: argData.buy_Date,
                    payReport: argData.pay_report,
                },
            });
            console.log(
                "a_pay_report INSERT:",
                JSON.stringify(data.createa_pay_report),
            );
            return data.createa_pay_report;
        } catch (e) {
            console.log("a_pay_report INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatea_pay_report(
                        $updateAPayReportId: Int!
                        $payNo: String
                        $buyDate: String
                        $payReport: String
                    ) {
                        updatea_pay_report(
                            id: $updateAPayReportId
                            pay_no: $payNo
                            buy_Date: $buyDate
                            pay_report: $payReport
                        ) {
                            id
                            pay_no
                            buy_Date
                            pay_report
                        }
                    }
                `,
                variables: {
                    updateAPayReportId: argData.id,
                    payNo: argData.pay_no,
                    buyDate: argData.buy_Date,
                    payReport: argData.pay_report,
                },
            });
            console.log(
                "a_pay_report UPDATE:",
                JSON.stringify(data.updatea_pay_report),
            );
            return data.updatea_pay_report;
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
                    mutation Deletea_pay_report($deleteAPayReportId: Int!) {
                        deletea_pay_report(id: $deleteAPayReportId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAPayReportId: argData.id,
                },
            });
            console.log(
                "a_pay_report DELETE:",
                JSON.stringify(data.deletea_pay_report),
            );
            return data.deletea_pay_report;
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
                    mutation MgrAPayReportDeletes(
                        $ids: [InputMgrAPayReportDeletes!]!
                    ) {
                        mgrAPayReportDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_pay_report DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
