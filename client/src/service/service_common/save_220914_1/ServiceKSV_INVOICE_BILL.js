/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_BILL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_BILL {
                        allQueryKSV_INVOICE_BILL {
                            id
                            INVOICE_NO
                            BILL_DATE
                            BILL_AMT
                            CURR_CD
                            REF_NO
                            DEBIT_CD
                            BILL_TYPE
                            START_DATE
                            END_DATE
                            BANK_CD
                            STATUS_CD
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            BILL_AMT_ORG
                            CURRENCY_RATE
                            BUYER_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_BILL:",
                JSON.stringify(data.allQueryKSV_INVOICE_BILL.length),
            );
            return data.allQueryKSV_INVOICE_BILL;
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
                    query MgrKsvInvoiceBillQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceBillQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            BILL_DATE
                            BILL_AMT
                            CURR_CD
                            REF_NO
                            DEBIT_CD
                            BILL_TYPE
                            START_DATE
                            END_DATE
                            BANK_CD
                            STATUS_CD
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            BILL_AMT_ORG
                            CURRENCY_RATE
                            BUYER_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_BILL:",
                JSON.stringify(data.mgrKsvInvoiceBillQuery.length),
            );
            return data.mgrKsvInvoiceBillQuery;
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
                    mutation CreateKSV_INVOICE_BILL(
                        $invoiceNo: String
                        $billDate: String
                        $billAmt: Float
                        $currCd: String
                        $refNo: String
                        $debitCd: String
                        $billType: String
                        $startDate: String
                        $endDate: String
                        $bankCd: String
                        $statusCd: String
                        $preFlag: String
                        $regUser: String
                        $regDatetime: String
                        $billAmtOrg: Float
                        $currencyRate: Float
                        $buyerCd: String
                    ) {
                        createKSV_INVOICE_BILL(
                            INVOICE_NO: $invoiceNo
                            BILL_DATE: $billDate
                            BILL_AMT: $billAmt
                            CURR_CD: $currCd
                            REF_NO: $refNo
                            DEBIT_CD: $debitCd
                            BILL_TYPE: $billType
                            START_DATE: $startDate
                            END_DATE: $endDate
                            BANK_CD: $bankCd
                            STATUS_CD: $statusCd
                            PRE_FLAG: $preFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            BILL_AMT_ORG: $billAmtOrg
                            CURRENCY_RATE: $currencyRate
                            BUYER_CD: $buyerCd
                        ) {
                            INVOICE_NO
                            BILL_DATE
                            BILL_AMT
                            CURR_CD
                            REF_NO
                            DEBIT_CD
                            BILL_TYPE
                            START_DATE
                            END_DATE
                            BANK_CD
                            STATUS_CD
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            BILL_AMT_ORG
                            CURRENCY_RATE
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    billDate: argData.BILL_DATE,
                    billAmt: argData.BILL_AMT,
                    currCd: argData.CURR_CD,
                    refNo: argData.REF_NO,
                    debitCd: argData.DEBIT_CD,
                    billType: argData.BILL_TYPE,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                    bankCd: argData.BANK_CD,
                    statusCd: argData.STATUS_CD,
                    preFlag: argData.PRE_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    billAmtOrg: argData.BILL_AMT_ORG,
                    currencyRate: argData.CURRENCY_RATE,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "KSV_INVOICE_BILL INSERT:",
                JSON.stringify(data.createKSV_INVOICE_BILL),
            );
            return data.createKSV_INVOICE_BILL;
        } catch (e) {
            console.log("KSV_INVOICE_BILL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVOICE_BILL(
                        $updateKsvInvoiceBillId: Int!
                        $invoiceNo: String
                        $billDate: String
                        $billAmt: Float
                        $currCd: String
                        $refNo: String
                        $debitCd: String
                        $billType: String
                        $startDate: String
                        $endDate: String
                        $bankCd: String
                        $statusCd: String
                        $preFlag: String
                        $regUser: String
                        $regDatetime: String
                        $billAmtOrg: Float
                        $currencyRate: Float
                        $buyerCd: String
                    ) {
                        updateKSV_INVOICE_BILL(
                            id: $updateKsvInvoiceBillId
                            INVOICE_NO: $invoiceNo
                            BILL_DATE: $billDate
                            BILL_AMT: $billAmt
                            CURR_CD: $currCd
                            REF_NO: $refNo
                            DEBIT_CD: $debitCd
                            BILL_TYPE: $billType
                            START_DATE: $startDate
                            END_DATE: $endDate
                            BANK_CD: $bankCd
                            STATUS_CD: $statusCd
                            PRE_FLAG: $preFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            BILL_AMT_ORG: $billAmtOrg
                            CURRENCY_RATE: $currencyRate
                            BUYER_CD: $buyerCd
                        ) {
                            id
                            INVOICE_NO
                            BILL_DATE
                            BILL_AMT
                            CURR_CD
                            REF_NO
                            DEBIT_CD
                            BILL_TYPE
                            START_DATE
                            END_DATE
                            BANK_CD
                            STATUS_CD
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            BILL_AMT_ORG
                            CURRENCY_RATE
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceBillId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    billDate: argData.BILL_DATE,
                    billAmt: argData.BILL_AMT,
                    currCd: argData.CURR_CD,
                    refNo: argData.REF_NO,
                    debitCd: argData.DEBIT_CD,
                    billType: argData.BILL_TYPE,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                    bankCd: argData.BANK_CD,
                    statusCd: argData.STATUS_CD,
                    preFlag: argData.PRE_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    billAmtOrg: argData.BILL_AMT_ORG,
                    currencyRate: argData.CURRENCY_RATE,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "KSV_INVOICE_BILL UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_BILL),
            );
            return data.updateKSV_INVOICE_BILL;
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
                    mutation DeleteKSV_INVOICE_BILL(
                        $deleteKsvInvoiceBillId: Int!
                    ) {
                        deleteKSV_INVOICE_BILL(id: $deleteKsvInvoiceBillId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceBillId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_BILL DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_BILL),
            );
            return data.deleteKSV_INVOICE_BILL;
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
                    mutation MgrKsvInvoiceBillDeletes(
                        $ids: [InputMgrKsvInvoiceBillDeletes!]!
                    ) {
                        mgrKsvInvoiceBillDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_BILL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
