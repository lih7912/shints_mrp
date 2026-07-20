/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_GW_TAXBILL_KR {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_GW_TAXBILL_KR {
                        allQueryKCD_GW_TAXBILL_KR {
                            id
                            APPROKEY
                            DOC_NO
                            VENDOR_CD
                            CLOSING_DATE
                            PAY_DATE
                            CURR_CD
                            CURR_INPUT
                            PUR_APP
                            TT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            PUR_FACTORY
                            TAX
                            MINUS_AMOUNT
                            TOT_AMOUNT
                            CURR_RATE
                            KRW_AMOUNT
                            NEOE_NO
                            TAXBILL_DATE
                            TAXBILL_CD
                            PAY_BANK
                        }
                    }
                `,
            });
            console.log(
                "KCD_GW_TAXBILL_KR:",
                JSON.stringify(data.allQueryKCD_GW_TAXBILL_KR.length),
            );
            return data.allQueryKCD_GW_TAXBILL_KR;
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
                    query MgrKcdGwTaxbillKrQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdGwTaxbillKrQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            VENDOR_CD
                            CLOSING_DATE
                            PAY_DATE
                            CURR_CD
                            CURR_INPUT
                            PUR_APP
                            TT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            PUR_FACTORY
                            TAX
                            MINUS_AMOUNT
                            TOT_AMOUNT
                            CURR_RATE
                            KRW_AMOUNT
                            NEOE_NO
                            TAXBILL_DATE
                            TAXBILL_CD
                            PAY_BANK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_GW_TAXBILL_KR:",
                JSON.stringify(data.mgrKcdGwTaxbillKrQuery.length),
            );
            return data.mgrKcdGwTaxbillKrQuery;
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
                    mutation CreateKCD_GW_TAXBILL_KR(
                        $approkey: String
                        $docNo: String
                        $vendorCd: String
                        $closingDate: String
                        $payDate: String
                        $currCd: String
                        $currInput: String
                        $purApp: String
                        $ttFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                        $purFactory: String
                        $tax: Float
                        $minusAmount: Float
                        $totAmount: Float
                        $currRate: Float
                        $krwAmount: Float
                        $neoeNo: String
                        $taxbillDate: String
                        $taxbillCd: String
                        $payBank: String
                    ) {
                        createKCD_GW_TAXBILL_KR(
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            VENDOR_CD: $vendorCd
                            CLOSING_DATE: $closingDate
                            PAY_DATE: $payDate
                            CURR_CD: $currCd
                            CURR_INPUT: $currInput
                            PUR_APP: $purApp
                            TT_FLAG: $ttFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                            PUR_FACTORY: $purFactory
                            TAX: $tax
                            MINUS_AMOUNT: $minusAmount
                            TOT_AMOUNT: $totAmount
                            CURR_RATE: $currRate
                            KRW_AMOUNT: $krwAmount
                            NEOE_NO: $neoeNo
                            TAXBILL_DATE: $taxbillDate
                            TAXBILL_CD: $taxbillCd
                            PAY_BANK: $payBank
                        ) {
                            APPROKEY
                            DOC_NO
                            VENDOR_CD
                            CLOSING_DATE
                            PAY_DATE
                            CURR_CD
                            CURR_INPUT
                            PUR_APP
                            TT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            PUR_FACTORY
                            TAX
                            MINUS_AMOUNT
                            TOT_AMOUNT
                            CURR_RATE
                            KRW_AMOUNT
                            NEOE_NO
                            TAXBILL_DATE
                            TAXBILL_CD
                            PAY_BANK
                        }
                    }
                `,
                variables: {
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    vendorCd: argData.VENDOR_CD,
                    closingDate: argData.CLOSING_DATE,
                    payDate: argData.PAY_DATE,
                    currCd: argData.CURR_CD,
                    currInput: argData.CURR_INPUT,
                    purApp: argData.PUR_APP,
                    ttFlag: argData.TT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                    purFactory: argData.PUR_FACTORY,
                    tax: argData.TAX,
                    minusAmount: argData.MINUS_AMOUNT,
                    totAmount: argData.TOT_AMOUNT,
                    currRate: argData.CURR_RATE,
                    krwAmount: argData.KRW_AMOUNT,
                    neoeNo: argData.NEOE_NO,
                    taxbillDate: argData.TAXBILL_DATE,
                    taxbillCd: argData.TAXBILL_CD,
                    payBank: argData.PAY_BANK,
                },
            });
            console.log(
                "KCD_GW_TAXBILL_KR INSERT:",
                JSON.stringify(data.createKCD_GW_TAXBILL_KR),
            );
            return data.createKCD_GW_TAXBILL_KR;
        } catch (e) {
            console.log("KCD_GW_TAXBILL_KR INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_GW_TAXBILL_KR(
                        $updateKcdGwTaxbillKrId: Int!
                        $approkey: String
                        $docNo: String
                        $vendorCd: String
                        $closingDate: String
                        $payDate: String
                        $currCd: String
                        $currInput: String
                        $purApp: String
                        $ttFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                        $purFactory: String
                        $tax: Float
                        $minusAmount: Float
                        $totAmount: Float
                        $currRate: Float
                        $krwAmount: Float
                        $neoeNo: String
                        $taxbillDate: String
                        $taxbillCd: String
                        $payBank: String
                    ) {
                        updateKCD_GW_TAXBILL_KR(
                            id: $updateKcdGwTaxbillKrId
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            VENDOR_CD: $vendorCd
                            CLOSING_DATE: $closingDate
                            PAY_DATE: $payDate
                            CURR_CD: $currCd
                            CURR_INPUT: $currInput
                            PUR_APP: $purApp
                            TT_FLAG: $ttFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                            PUR_FACTORY: $purFactory
                            TAX: $tax
                            MINUS_AMOUNT: $minusAmount
                            TOT_AMOUNT: $totAmount
                            CURR_RATE: $currRate
                            KRW_AMOUNT: $krwAmount
                            NEOE_NO: $neoeNo
                            TAXBILL_DATE: $taxbillDate
                            TAXBILL_CD: $taxbillCd
                            PAY_BANK: $payBank
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            VENDOR_CD
                            CLOSING_DATE
                            PAY_DATE
                            CURR_CD
                            CURR_INPUT
                            PUR_APP
                            TT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            PUR_FACTORY
                            TAX
                            MINUS_AMOUNT
                            TOT_AMOUNT
                            CURR_RATE
                            KRW_AMOUNT
                            NEOE_NO
                            TAXBILL_DATE
                            TAXBILL_CD
                            PAY_BANK
                        }
                    }
                `,
                variables: {
                    updateKcdGwTaxbillKrId: argData.id,
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    vendorCd: argData.VENDOR_CD,
                    closingDate: argData.CLOSING_DATE,
                    payDate: argData.PAY_DATE,
                    currCd: argData.CURR_CD,
                    currInput: argData.CURR_INPUT,
                    purApp: argData.PUR_APP,
                    ttFlag: argData.TT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                    purFactory: argData.PUR_FACTORY,
                    tax: argData.TAX,
                    minusAmount: argData.MINUS_AMOUNT,
                    totAmount: argData.TOT_AMOUNT,
                    currRate: argData.CURR_RATE,
                    krwAmount: argData.KRW_AMOUNT,
                    neoeNo: argData.NEOE_NO,
                    taxbillDate: argData.TAXBILL_DATE,
                    taxbillCd: argData.TAXBILL_CD,
                    payBank: argData.PAY_BANK,
                },
            });
            console.log(
                "KCD_GW_TAXBILL_KR UPDATE:",
                JSON.stringify(data.updateKCD_GW_TAXBILL_KR),
            );
            return data.updateKCD_GW_TAXBILL_KR;
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
                    mutation DeleteKCD_GW_TAXBILL_KR(
                        $deleteKcdGwTaxbillKrId: Int!
                    ) {
                        deleteKCD_GW_TAXBILL_KR(id: $deleteKcdGwTaxbillKrId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdGwTaxbillKrId: argData.id,
                },
            });
            console.log(
                "KCD_GW_TAXBILL_KR DELETE:",
                JSON.stringify(data.deleteKCD_GW_TAXBILL_KR),
            );
            return data.deleteKCD_GW_TAXBILL_KR;
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
                    mutation MgrKcdGwTaxbillKrDeletes(
                        $ids: [InputMgrKcdGwTaxbillKrDeletes!]!
                    ) {
                        mgrKcdGwTaxbillKrDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_GW_TAXBILL_KR DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
