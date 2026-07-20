/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_ETC_COST_AMT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_ETC_COST_AMT {
                        allQueryKZZ_ETC_COST_AMT {
                            id
                            ETC_CD
                            ETC_SEQ
                            SEQ
                            YY
                            ETC_DATE
                            BUYER_CD
                            ETC_TYPE
                            VAT
                            WITHOUT_TAX
                            ETC_AMOUNT
                            CURR_CD
                            ACCOUNT_CD
                            ACCOUNT
                            ACCOUNT_BANK
                            REMARK
                            END_FLAG
                            END_USER
                            END_DATE
                            REG_USER
                            REG_DATETIME
                            TAX
                            BILL_CD
                            KIND
                            PAY_DATE
                            PAY_TYPE
                        }
                    }
                `,
            });
            console.log(
                "KZZ_ETC_COST_AMT:",
                JSON.stringify(data.allQueryKZZ_ETC_COST_AMT.length),
            );
            return data.allQueryKZZ_ETC_COST_AMT;
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
                    query MgrKzzEtcCostAmtQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzEtcCostAmtQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ETC_CD
                            ETC_SEQ
                            SEQ
                            YY
                            ETC_DATE
                            BUYER_CD
                            ETC_TYPE
                            VAT
                            WITHOUT_TAX
                            ETC_AMOUNT
                            CURR_CD
                            ACCOUNT_CD
                            ACCOUNT
                            ACCOUNT_BANK
                            REMARK
                            END_FLAG
                            END_USER
                            END_DATE
                            REG_USER
                            REG_DATETIME
                            TAX
                            BILL_CD
                            KIND
                            PAY_DATE
                            PAY_TYPE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_ETC_COST_AMT:",
                JSON.stringify(data.mgrKzzEtcCostAmtQuery.length),
            );
            return data.mgrKzzEtcCostAmtQuery;
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
                    mutation CreateKZZ_ETC_COST_AMT(
                        $etcCd: String
                        $etcSeq: Int
                        $seq: Int
                        $yy: Int
                        $etcDate: String
                        $buyerCd: String
                        $etcType: String
                        $vat: Float
                        $withoutTax: Float
                        $etcAmount: Float
                        $currCd: String
                        $accountCd: String
                        $account: String
                        $accountBank: String
                        $remark: String
                        $endFlag: String
                        $endUser: String
                        $endDate: String
                        $regUser: String
                        $regDatetime: String
                        $tax: String
                        $billCd: String
                        $kind: Int
                        $payDate: String
                        $payType: String
                    ) {
                        createKZZ_ETC_COST_AMT(
                            ETC_CD: $etcCd
                            ETC_SEQ: $etcSeq
                            SEQ: $seq
                            YY: $yy
                            ETC_DATE: $etcDate
                            BUYER_CD: $buyerCd
                            ETC_TYPE: $etcType
                            VAT: $vat
                            WITHOUT_TAX: $withoutTax
                            ETC_AMOUNT: $etcAmount
                            CURR_CD: $currCd
                            ACCOUNT_CD: $accountCd
                            ACCOUNT: $account
                            ACCOUNT_BANK: $accountBank
                            REMARK: $remark
                            END_FLAG: $endFlag
                            END_USER: $endUser
                            END_DATE: $endDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            TAX: $tax
                            BILL_CD: $billCd
                            KIND: $kind
                            PAY_DATE: $payDate
                            PAY_TYPE: $payType
                        ) {
                            ETC_CD
                            ETC_SEQ
                            SEQ
                            YY
                            ETC_DATE
                            BUYER_CD
                            ETC_TYPE
                            VAT
                            WITHOUT_TAX
                            ETC_AMOUNT
                            CURR_CD
                            ACCOUNT_CD
                            ACCOUNT
                            ACCOUNT_BANK
                            REMARK
                            END_FLAG
                            END_USER
                            END_DATE
                            REG_USER
                            REG_DATETIME
                            TAX
                            BILL_CD
                            KIND
                            PAY_DATE
                            PAY_TYPE
                        }
                    }
                `,
                variables: {
                    etcCd: argData.ETC_CD,
                    etcSeq: argData.ETC_SEQ,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    etcDate: argData.ETC_DATE,
                    buyerCd: argData.BUYER_CD,
                    etcType: argData.ETC_TYPE,
                    vat: argData.VAT,
                    withoutTax: argData.WITHOUT_TAX,
                    etcAmount: argData.ETC_AMOUNT,
                    currCd: argData.CURR_CD,
                    accountCd: argData.ACCOUNT_CD,
                    account: argData.ACCOUNT,
                    accountBank: argData.ACCOUNT_BANK,
                    remark: argData.REMARK,
                    endFlag: argData.END_FLAG,
                    endUser: argData.END_USER,
                    endDate: argData.END_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    tax: argData.TAX,
                    billCd: argData.BILL_CD,
                    kind: argData.KIND,
                    payDate: argData.PAY_DATE,
                    payType: argData.PAY_TYPE,
                },
            });
            console.log(
                "KZZ_ETC_COST_AMT INSERT:",
                JSON.stringify(data.createKZZ_ETC_COST_AMT),
            );
            return data.createKZZ_ETC_COST_AMT;
        } catch (e) {
            console.log("KZZ_ETC_COST_AMT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_ETC_COST_AMT(
                        $updateKzzEtcCostAmtId: Int!
                        $etcCd: String
                        $etcSeq: Int
                        $seq: Int
                        $yy: Int
                        $etcDate: String
                        $buyerCd: String
                        $etcType: String
                        $vat: Float
                        $withoutTax: Float
                        $etcAmount: Float
                        $currCd: String
                        $accountCd: String
                        $account: String
                        $accountBank: String
                        $remark: String
                        $endFlag: String
                        $endUser: String
                        $endDate: String
                        $regUser: String
                        $regDatetime: String
                        $tax: String
                        $billCd: String
                        $kind: Int
                        $payDate: String
                        $payType: String
                    ) {
                        updateKZZ_ETC_COST_AMT(
                            id: $updateKzzEtcCostAmtId
                            ETC_CD: $etcCd
                            ETC_SEQ: $etcSeq
                            SEQ: $seq
                            YY: $yy
                            ETC_DATE: $etcDate
                            BUYER_CD: $buyerCd
                            ETC_TYPE: $etcType
                            VAT: $vat
                            WITHOUT_TAX: $withoutTax
                            ETC_AMOUNT: $etcAmount
                            CURR_CD: $currCd
                            ACCOUNT_CD: $accountCd
                            ACCOUNT: $account
                            ACCOUNT_BANK: $accountBank
                            REMARK: $remark
                            END_FLAG: $endFlag
                            END_USER: $endUser
                            END_DATE: $endDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            TAX: $tax
                            BILL_CD: $billCd
                            KIND: $kind
                            PAY_DATE: $payDate
                            PAY_TYPE: $payType
                        ) {
                            id
                            ETC_CD
                            ETC_SEQ
                            SEQ
                            YY
                            ETC_DATE
                            BUYER_CD
                            ETC_TYPE
                            VAT
                            WITHOUT_TAX
                            ETC_AMOUNT
                            CURR_CD
                            ACCOUNT_CD
                            ACCOUNT
                            ACCOUNT_BANK
                            REMARK
                            END_FLAG
                            END_USER
                            END_DATE
                            REG_USER
                            REG_DATETIME
                            TAX
                            BILL_CD
                            KIND
                            PAY_DATE
                            PAY_TYPE
                        }
                    }
                `,
                variables: {
                    updateKzzEtcCostAmtId: argData.id,
                    etcCd: argData.ETC_CD,
                    etcSeq: argData.ETC_SEQ,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    etcDate: argData.ETC_DATE,
                    buyerCd: argData.BUYER_CD,
                    etcType: argData.ETC_TYPE,
                    vat: argData.VAT,
                    withoutTax: argData.WITHOUT_TAX,
                    etcAmount: argData.ETC_AMOUNT,
                    currCd: argData.CURR_CD,
                    accountCd: argData.ACCOUNT_CD,
                    account: argData.ACCOUNT,
                    accountBank: argData.ACCOUNT_BANK,
                    remark: argData.REMARK,
                    endFlag: argData.END_FLAG,
                    endUser: argData.END_USER,
                    endDate: argData.END_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    tax: argData.TAX,
                    billCd: argData.BILL_CD,
                    kind: argData.KIND,
                    payDate: argData.PAY_DATE,
                    payType: argData.PAY_TYPE,
                },
            });
            console.log(
                "KZZ_ETC_COST_AMT UPDATE:",
                JSON.stringify(data.updateKZZ_ETC_COST_AMT),
            );
            return data.updateKZZ_ETC_COST_AMT;
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
                    mutation DeleteKZZ_ETC_COST_AMT(
                        $deleteKzzEtcCostAmtId: Int!
                    ) {
                        deleteKZZ_ETC_COST_AMT(id: $deleteKzzEtcCostAmtId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzEtcCostAmtId: argData.id,
                },
            });
            console.log(
                "KZZ_ETC_COST_AMT DELETE:",
                JSON.stringify(data.deleteKZZ_ETC_COST_AMT),
            );
            return data.deleteKZZ_ETC_COST_AMT;
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
                    mutation MgrKzzEtcCostAmtDeletes(
                        $ids: [InputMgrKzzEtcCostAmtDeletes!]!
                    ) {
                        mgrKzzEtcCostAmtDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_ETC_COST_AMT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
