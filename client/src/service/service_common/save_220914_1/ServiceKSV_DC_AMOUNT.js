/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_DC_AMOUNT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_DC_AMOUNT {
                        allQueryKSV_DC_AMOUNT {
                            id
                            END_DATE
                            PAY_DATE
                            VENDOR_CD
                            DC_AMOUNT
                            DN_AMOUNT
                            CURR_CD
                            BILL_FLAG
                            BILL_DATE
                            CRDB_CD
                            buy_date
                            CALC_FLAG
                            TT_FLAG
                            PUR_FACTORY
                            PAY_REPORT
                            CURR_RATE
                            KRW_AMOUNT
                        }
                    }
                `,
            });
            console.log(
                "KSV_DC_AMOUNT:",
                JSON.stringify(data.allQueryKSV_DC_AMOUNT.length),
            );
            return data.allQueryKSV_DC_AMOUNT;
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
                    query MgrKsvDcAmountQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvDcAmountQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            END_DATE
                            PAY_DATE
                            VENDOR_CD
                            DC_AMOUNT
                            DN_AMOUNT
                            CURR_CD
                            BILL_FLAG
                            BILL_DATE
                            CRDB_CD
                            buy_date
                            CALC_FLAG
                            TT_FLAG
                            PUR_FACTORY
                            PAY_REPORT
                            CURR_RATE
                            KRW_AMOUNT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_DC_AMOUNT:",
                JSON.stringify(data.mgrKsvDcAmountQuery.length),
            );
            return data.mgrKsvDcAmountQuery;
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
                    mutation CreateKSV_DC_AMOUNT(
                        $endDate: String
                        $payDate: String
                        $vendorCd: String
                        $dcAmount: Float
                        $dnAmount: Float
                        $currCd: String
                        $billFlag: String
                        $billDate: String
                        $crdbCd: String
                        $buyDate: String
                        $calcFlag: String
                        $ttFlag: String
                        $purFactory: String
                        $payReport: String
                        $currRate: Float
                        $krwAmount: Float
                    ) {
                        createKSV_DC_AMOUNT(
                            END_DATE: $endDate
                            PAY_DATE: $payDate
                            VENDOR_CD: $vendorCd
                            DC_AMOUNT: $dcAmount
                            DN_AMOUNT: $dnAmount
                            CURR_CD: $currCd
                            BILL_FLAG: $billFlag
                            BILL_DATE: $billDate
                            CRDB_CD: $crdbCd
                            buy_date: $buyDate
                            CALC_FLAG: $calcFlag
                            TT_FLAG: $ttFlag
                            PUR_FACTORY: $purFactory
                            PAY_REPORT: $payReport
                            CURR_RATE: $currRate
                            KRW_AMOUNT: $krwAmount
                        ) {
                            END_DATE
                            PAY_DATE
                            VENDOR_CD
                            DC_AMOUNT
                            DN_AMOUNT
                            CURR_CD
                            BILL_FLAG
                            BILL_DATE
                            CRDB_CD
                            buy_date
                            CALC_FLAG
                            TT_FLAG
                            PUR_FACTORY
                            PAY_REPORT
                            CURR_RATE
                            KRW_AMOUNT
                        }
                    }
                `,
                variables: {
                    endDate: argData.END_DATE,
                    payDate: argData.PAY_DATE,
                    vendorCd: argData.VENDOR_CD,
                    dcAmount: argData.DC_AMOUNT,
                    dnAmount: argData.DN_AMOUNT,
                    currCd: argData.CURR_CD,
                    billFlag: argData.BILL_FLAG,
                    billDate: argData.BILL_DATE,
                    crdbCd: argData.CRDB_CD,
                    buyDate: argData.buy_date,
                    calcFlag: argData.CALC_FLAG,
                    ttFlag: argData.TT_FLAG,
                    purFactory: argData.PUR_FACTORY,
                    payReport: argData.PAY_REPORT,
                    currRate: argData.CURR_RATE,
                    krwAmount: argData.KRW_AMOUNT,
                },
            });
            console.log(
                "KSV_DC_AMOUNT INSERT:",
                JSON.stringify(data.createKSV_DC_AMOUNT),
            );
            return data.createKSV_DC_AMOUNT;
        } catch (e) {
            console.log("KSV_DC_AMOUNT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_DC_AMOUNT(
                        $updateKsvDcAmountId: Int!
                        $endDate: String
                        $payDate: String
                        $vendorCd: String
                        $dcAmount: Float
                        $dnAmount: Float
                        $currCd: String
                        $billFlag: String
                        $billDate: String
                        $crdbCd: String
                        $buyDate: String
                        $calcFlag: String
                        $ttFlag: String
                        $purFactory: String
                        $payReport: String
                        $currRate: Float
                        $krwAmount: Float
                    ) {
                        updateKSV_DC_AMOUNT(
                            id: $updateKsvDcAmountId
                            END_DATE: $endDate
                            PAY_DATE: $payDate
                            VENDOR_CD: $vendorCd
                            DC_AMOUNT: $dcAmount
                            DN_AMOUNT: $dnAmount
                            CURR_CD: $currCd
                            BILL_FLAG: $billFlag
                            BILL_DATE: $billDate
                            CRDB_CD: $crdbCd
                            buy_date: $buyDate
                            CALC_FLAG: $calcFlag
                            TT_FLAG: $ttFlag
                            PUR_FACTORY: $purFactory
                            PAY_REPORT: $payReport
                            CURR_RATE: $currRate
                            KRW_AMOUNT: $krwAmount
                        ) {
                            id
                            END_DATE
                            PAY_DATE
                            VENDOR_CD
                            DC_AMOUNT
                            DN_AMOUNT
                            CURR_CD
                            BILL_FLAG
                            BILL_DATE
                            CRDB_CD
                            buy_date
                            CALC_FLAG
                            TT_FLAG
                            PUR_FACTORY
                            PAY_REPORT
                            CURR_RATE
                            KRW_AMOUNT
                        }
                    }
                `,
                variables: {
                    updateKsvDcAmountId: argData.id,
                    endDate: argData.END_DATE,
                    payDate: argData.PAY_DATE,
                    vendorCd: argData.VENDOR_CD,
                    dcAmount: argData.DC_AMOUNT,
                    dnAmount: argData.DN_AMOUNT,
                    currCd: argData.CURR_CD,
                    billFlag: argData.BILL_FLAG,
                    billDate: argData.BILL_DATE,
                    crdbCd: argData.CRDB_CD,
                    buyDate: argData.buy_date,
                    calcFlag: argData.CALC_FLAG,
                    ttFlag: argData.TT_FLAG,
                    purFactory: argData.PUR_FACTORY,
                    payReport: argData.PAY_REPORT,
                    currRate: argData.CURR_RATE,
                    krwAmount: argData.KRW_AMOUNT,
                },
            });
            console.log(
                "KSV_DC_AMOUNT UPDATE:",
                JSON.stringify(data.updateKSV_DC_AMOUNT),
            );
            return data.updateKSV_DC_AMOUNT;
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
                    mutation DeleteKSV_DC_AMOUNT($deleteKsvDcAmountId: Int!) {
                        deleteKSV_DC_AMOUNT(id: $deleteKsvDcAmountId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvDcAmountId: argData.id,
                },
            });
            console.log(
                "KSV_DC_AMOUNT DELETE:",
                JSON.stringify(data.deleteKSV_DC_AMOUNT),
            );
            return data.deleteKSV_DC_AMOUNT;
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
                    mutation MgrKsvDcAmountDeletes(
                        $ids: [InputMgrKsvDcAmountDeletes!]!
                    ) {
                        mgrKsvDcAmountDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_DC_AMOUNT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
