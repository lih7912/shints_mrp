/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_NEGO {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_NEGO {
                        allQueryKSV_INVOICE_NEGO {
                            id
                            REF_NO
                            TOT_AMT
                            CURR_CD
                            START_DATE
                            END_DATE
                            BILL_DATE
                            DELAY_DAYS
                            DELAY_INTEREST
                            LESS_CHARGE
                            EXCHANGE_COMM
                            HANDLING_CHARGE
                            POSTAGE
                            BANK_CD
                            BUYER_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            FACTORY_CD
                            INVOICE_NEGO_TYPE
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_NEGO:",
                JSON.stringify(data.allQueryKSV_INVOICE_NEGO.length),
            );
            return data.allQueryKSV_INVOICE_NEGO;
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
                    query MgrKsvInvoiceNegoQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceNegoQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REF_NO
                            TOT_AMT
                            CURR_CD
                            START_DATE
                            END_DATE
                            BILL_DATE
                            DELAY_DAYS
                            DELAY_INTEREST
                            LESS_CHARGE
                            EXCHANGE_COMM
                            HANDLING_CHARGE
                            POSTAGE
                            BANK_CD
                            BUYER_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            FACTORY_CD
                            INVOICE_NEGO_TYPE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_NEGO:",
                JSON.stringify(data.mgrKsvInvoiceNegoQuery.length),
            );
            return data.mgrKsvInvoiceNegoQuery;
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
                    mutation CreateKSV_INVOICE_NEGO(
                        $refNo: String
                        $totAmt: Float
                        $currCd: String
                        $startDate: String
                        $endDate: String
                        $billDate: String
                        $delayDays: Int
                        $delayInterest: Float
                        $lessCharge: Float
                        $exchangeComm: Float
                        $handlingCharge: Float
                        $postage: Float
                        $bankCd: String!
                        $buyerCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $factoryCd: String
                        $invoiceNegoType: String
                    ) {
                        createKSV_INVOICE_NEGO(
                            REF_NO: $refNo
                            TOT_AMT: $totAmt
                            CURR_CD: $currCd
                            START_DATE: $startDate
                            END_DATE: $endDate
                            BILL_DATE: $billDate
                            DELAY_DAYS: $delayDays
                            DELAY_INTEREST: $delayInterest
                            LESS_CHARGE: $lessCharge
                            EXCHANGE_COMM: $exchangeComm
                            HANDLING_CHARGE: $handlingCharge
                            POSTAGE: $postage
                            BANK_CD: $bankCd
                            BUYER_CD: $buyerCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            FACTORY_CD: $factoryCd
                            INVOICE_NEGO_TYPE: $invoiceNegoType
                        ) {
                            REF_NO
                            TOT_AMT
                            CURR_CD
                            START_DATE
                            END_DATE
                            BILL_DATE
                            DELAY_DAYS
                            DELAY_INTEREST
                            LESS_CHARGE
                            EXCHANGE_COMM
                            HANDLING_CHARGE
                            POSTAGE
                            BANK_CD
                            BUYER_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            FACTORY_CD
                            INVOICE_NEGO_TYPE
                        }
                    }
                `,
                variables: {
                    refNo: argData.REF_NO,
                    totAmt: argData.TOT_AMT,
                    currCd: argData.CURR_CD,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                    billDate: argData.BILL_DATE,
                    delayDays: argData.DELAY_DAYS,
                    delayInterest: argData.DELAY_INTEREST,
                    lessCharge: argData.LESS_CHARGE,
                    exchangeComm: argData.EXCHANGE_COMM,
                    handlingCharge: argData.HANDLING_CHARGE,
                    postage: argData.POSTAGE,
                    bankCd: argData.BANK_CD,
                    buyerCd: argData.BUYER_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    factoryCd: argData.FACTORY_CD,
                    invoiceNegoType: argData.INVOICE_NEGO_TYPE,
                },
            });
            console.log(
                "KSV_INVOICE_NEGO INSERT:",
                JSON.stringify(data.createKSV_INVOICE_NEGO),
            );
            return data.createKSV_INVOICE_NEGO;
        } catch (e) {
            console.log("KSV_INVOICE_NEGO INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVOICE_NEGO(
                        $updateKsvInvoiceNegoId: Int!
                        $refNo: String
                        $totAmt: Float
                        $currCd: String
                        $startDate: String
                        $endDate: String
                        $billDate: String
                        $delayDays: Int
                        $delayInterest: Float
                        $lessCharge: Float
                        $exchangeComm: Float
                        $handlingCharge: Float
                        $postage: Float
                        $bankCd: String!
                        $buyerCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $factoryCd: String
                        $invoiceNegoType: String
                    ) {
                        updateKSV_INVOICE_NEGO(
                            id: $updateKsvInvoiceNegoId
                            REF_NO: $refNo
                            TOT_AMT: $totAmt
                            CURR_CD: $currCd
                            START_DATE: $startDate
                            END_DATE: $endDate
                            BILL_DATE: $billDate
                            DELAY_DAYS: $delayDays
                            DELAY_INTEREST: $delayInterest
                            LESS_CHARGE: $lessCharge
                            EXCHANGE_COMM: $exchangeComm
                            HANDLING_CHARGE: $handlingCharge
                            POSTAGE: $postage
                            BANK_CD: $bankCd
                            BUYER_CD: $buyerCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            FACTORY_CD: $factoryCd
                            INVOICE_NEGO_TYPE: $invoiceNegoType
                        ) {
                            id
                            REF_NO
                            TOT_AMT
                            CURR_CD
                            START_DATE
                            END_DATE
                            BILL_DATE
                            DELAY_DAYS
                            DELAY_INTEREST
                            LESS_CHARGE
                            EXCHANGE_COMM
                            HANDLING_CHARGE
                            POSTAGE
                            BANK_CD
                            BUYER_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            FACTORY_CD
                            INVOICE_NEGO_TYPE
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceNegoId: argData.id,
                    refNo: argData.REF_NO,
                    totAmt: argData.TOT_AMT,
                    currCd: argData.CURR_CD,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                    billDate: argData.BILL_DATE,
                    delayDays: argData.DELAY_DAYS,
                    delayInterest: argData.DELAY_INTEREST,
                    lessCharge: argData.LESS_CHARGE,
                    exchangeComm: argData.EXCHANGE_COMM,
                    handlingCharge: argData.HANDLING_CHARGE,
                    postage: argData.POSTAGE,
                    bankCd: argData.BANK_CD,
                    buyerCd: argData.BUYER_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    factoryCd: argData.FACTORY_CD,
                    invoiceNegoType: argData.INVOICE_NEGO_TYPE,
                },
            });
            console.log(
                "KSV_INVOICE_NEGO UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_NEGO),
            );
            return data.updateKSV_INVOICE_NEGO;
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
                    mutation DeleteKSV_INVOICE_NEGO(
                        $deleteKsvInvoiceNegoId: Int!
                    ) {
                        deleteKSV_INVOICE_NEGO(id: $deleteKsvInvoiceNegoId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceNegoId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_NEGO DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_NEGO),
            );
            return data.deleteKSV_INVOICE_NEGO;
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
                    mutation MgrKsvInvoiceNegoDeletes(
                        $ids: [InputMgrKsvInvoiceNegoDeletes!]!
                    ) {
                        mgrKsvInvoiceNegoDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_NEGO DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
