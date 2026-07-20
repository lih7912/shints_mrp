/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_INVOICE_PREBILL {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_PREBILL {
                        allQueryKSV_INVOICE_PREBILL {
                            id
                            REF_NO
                            BUYER_CD
                            TOT_AMT
                            CHARGE
                            BILL_DATE
                            CURR_CD
                            BANK_CD
                            CREDIT_AMT
                            STATUS_CD
                            END_FLAG
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_PREBILL:",
                JSON.stringify(data.allQueryKSV_INVOICE_PREBILL.length),
            );
            return data.allQueryKSV_INVOICE_PREBILL;
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
                    query MgrKsvInvoicePrebillQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoicePrebillQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REF_NO
                            BUYER_CD
                            TOT_AMT
                            CHARGE
                            BILL_DATE
                            CURR_CD
                            BANK_CD
                            CREDIT_AMT
                            STATUS_CD
                            END_FLAG
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_PREBILL:",
                JSON.stringify(data.mgrKsvInvoicePrebillQuery.length),
            );
            return data.mgrKsvInvoicePrebillQuery;
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
                    mutation CreateKSV_INVOICE_PREBILL(
                        $refNo: String
                        $buyerCd: String
                        $totAmt: Float
                        $charge: Float
                        $billDate: String
                        $currCd: String
                        $bankCd: String
                        $creditAmt: Float
                        $statusCd: String
                        $endFlag: String
                        $preFlag: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        createKSV_INVOICE_PREBILL(
                            REF_NO: $refNo
                            BUYER_CD: $buyerCd
                            TOT_AMT: $totAmt
                            CHARGE: $charge
                            BILL_DATE: $billDate
                            CURR_CD: $currCd
                            BANK_CD: $bankCd
                            CREDIT_AMT: $creditAmt
                            STATUS_CD: $statusCd
                            END_FLAG: $endFlag
                            PRE_FLAG: $preFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                        ) {
                            REF_NO
                            BUYER_CD
                            TOT_AMT
                            CHARGE
                            BILL_DATE
                            CURR_CD
                            BANK_CD
                            CREDIT_AMT
                            STATUS_CD
                            END_FLAG
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    refNo: argData.REF_NO,
                    buyerCd: argData.BUYER_CD,
                    totAmt: argData.TOT_AMT,
                    charge: argData.CHARGE,
                    billDate: argData.BILL_DATE,
                    currCd: argData.CURR_CD,
                    bankCd: argData.BANK_CD,
                    creditAmt: argData.CREDIT_AMT,
                    statusCd: argData.STATUS_CD,
                    endFlag: argData.END_FLAG,
                    preFlag: argData.PRE_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KSV_INVOICE_PREBILL INSERT:",
                JSON.stringify(data.createKSV_INVOICE_PREBILL),
            );
            return data.createKSV_INVOICE_PREBILL;
        } catch (e) {
            console.log("KSV_INVOICE_PREBILL INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVOICE_PREBILL(
                        $updateKsvInvoicePrebillId: Int!
                        $refNo: String
                        $buyerCd: String
                        $totAmt: Float
                        $charge: Float
                        $billDate: String
                        $currCd: String
                        $bankCd: String
                        $creditAmt: Float
                        $statusCd: String
                        $endFlag: String
                        $preFlag: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        updateKSV_INVOICE_PREBILL(
                            id: $updateKsvInvoicePrebillId
                            REF_NO: $refNo
                            BUYER_CD: $buyerCd
                            TOT_AMT: $totAmt
                            CHARGE: $charge
                            BILL_DATE: $billDate
                            CURR_CD: $currCd
                            BANK_CD: $bankCd
                            CREDIT_AMT: $creditAmt
                            STATUS_CD: $statusCd
                            END_FLAG: $endFlag
                            PRE_FLAG: $preFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                        ) {
                            id
                            REF_NO
                            BUYER_CD
                            TOT_AMT
                            CHARGE
                            BILL_DATE
                            CURR_CD
                            BANK_CD
                            CREDIT_AMT
                            STATUS_CD
                            END_FLAG
                            PRE_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    updateKsvInvoicePrebillId: argData.id,
                    refNo: argData.REF_NO,
                    buyerCd: argData.BUYER_CD,
                    totAmt: argData.TOT_AMT,
                    charge: argData.CHARGE,
                    billDate: argData.BILL_DATE,
                    currCd: argData.CURR_CD,
                    bankCd: argData.BANK_CD,
                    creditAmt: argData.CREDIT_AMT,
                    statusCd: argData.STATUS_CD,
                    endFlag: argData.END_FLAG,
                    preFlag: argData.PRE_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KSV_INVOICE_PREBILL UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_PREBILL),
            );
            return data.updateKSV_INVOICE_PREBILL;
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
                    mutation DeleteKSV_INVOICE_PREBILL(
                        $deleteKsvInvoicePrebillId: Int!
                    ) {
                        deleteKSV_INVOICE_PREBILL(
                            id: $deleteKsvInvoicePrebillId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoicePrebillId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_PREBILL DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_PREBILL),
            );
            return data.deleteKSV_INVOICE_PREBILL;
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
                    mutation MgrKsvInvoicePrebillDeletes(
                        $ids: [InputMgrKsvInvoicePrebillDeletes!]!
                    ) {
                        mgrKsvInvoicePrebillDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_PREBILL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
