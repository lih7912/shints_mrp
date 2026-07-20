/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_APP_DATA {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_APP_DATA {
                        allQueryKCD_APP_DATA {
                            id
                            PO_CD
                            PAY_DATE
                            TAXBILL_DATE
                            BUY_DATE
                            IN_DATE
                            PAY_CURR_CD
                            VENDOR_CD
                            NEOE_NO
                            REG_USER
                            AMOUNT
                            NEOE_LINE
                            TAXBILL_CD
                        }
                    }
                `,
            });
            console.log(
                "KCD_APP_DATA:",
                JSON.stringify(data.allQueryKCD_APP_DATA.length),
            );
            return data.allQueryKCD_APP_DATA;
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
                    query MgrKcdAppDataQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdAppDataQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PAY_DATE
                            TAXBILL_DATE
                            BUY_DATE
                            IN_DATE
                            PAY_CURR_CD
                            VENDOR_CD
                            NEOE_NO
                            REG_USER
                            AMOUNT
                            NEOE_LINE
                            TAXBILL_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_APP_DATA:",
                JSON.stringify(data.mgrKcdAppDataQuery.length),
            );
            return data.mgrKcdAppDataQuery;
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
                    mutation CreateKCD_APP_DATA(
                        $poCd: String!
                        $payDate: String
                        $taxbillDate: String
                        $buyDate: String
                        $inDate: String
                        $payCurrCd: String
                        $vendorCd: String
                        $neoeNo: String
                        $regUser: String
                        $amount: Float
                        $neoeLine: Int
                        $taxbillCd: String
                    ) {
                        createKCD_APP_DATA(
                            PO_CD: $poCd
                            PAY_DATE: $payDate
                            TAXBILL_DATE: $taxbillDate
                            BUY_DATE: $buyDate
                            IN_DATE: $inDate
                            PAY_CURR_CD: $payCurrCd
                            VENDOR_CD: $vendorCd
                            NEOE_NO: $neoeNo
                            REG_USER: $regUser
                            AMOUNT: $amount
                            NEOE_LINE: $neoeLine
                            TAXBILL_CD: $taxbillCd
                        ) {
                            PO_CD
                            PAY_DATE
                            TAXBILL_DATE
                            BUY_DATE
                            IN_DATE
                            PAY_CURR_CD
                            VENDOR_CD
                            NEOE_NO
                            REG_USER
                            AMOUNT
                            NEOE_LINE
                            TAXBILL_CD
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    payDate: argData.PAY_DATE,
                    taxbillDate: argData.TAXBILL_DATE,
                    buyDate: argData.BUY_DATE,
                    inDate: argData.IN_DATE,
                    payCurrCd: argData.PAY_CURR_CD,
                    vendorCd: argData.VENDOR_CD,
                    neoeNo: argData.NEOE_NO,
                    regUser: argData.REG_USER,
                    amount: argData.AMOUNT,
                    neoeLine: argData.NEOE_LINE,
                    taxbillCd: argData.TAXBILL_CD,
                },
            });
            console.log(
                "KCD_APP_DATA INSERT:",
                JSON.stringify(data.createKCD_APP_DATA),
            );
            return data.createKCD_APP_DATA;
        } catch (e) {
            console.log("KCD_APP_DATA INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_APP_DATA(
                        $updateKcdAppDataId: Int!
                        $poCd: String!
                        $payDate: String
                        $taxbillDate: String
                        $buyDate: String
                        $inDate: String
                        $payCurrCd: String
                        $vendorCd: String
                        $neoeNo: String
                        $regUser: String
                        $amount: Float
                        $neoeLine: Int
                        $taxbillCd: String
                    ) {
                        updateKCD_APP_DATA(
                            id: $updateKcdAppDataId
                            PO_CD: $poCd
                            PAY_DATE: $payDate
                            TAXBILL_DATE: $taxbillDate
                            BUY_DATE: $buyDate
                            IN_DATE: $inDate
                            PAY_CURR_CD: $payCurrCd
                            VENDOR_CD: $vendorCd
                            NEOE_NO: $neoeNo
                            REG_USER: $regUser
                            AMOUNT: $amount
                            NEOE_LINE: $neoeLine
                            TAXBILL_CD: $taxbillCd
                        ) {
                            id
                            PO_CD
                            PAY_DATE
                            TAXBILL_DATE
                            BUY_DATE
                            IN_DATE
                            PAY_CURR_CD
                            VENDOR_CD
                            NEOE_NO
                            REG_USER
                            AMOUNT
                            NEOE_LINE
                            TAXBILL_CD
                        }
                    }
                `,
                variables: {
                    updateKcdAppDataId: argData.id,
                    poCd: argData.PO_CD,
                    payDate: argData.PAY_DATE,
                    taxbillDate: argData.TAXBILL_DATE,
                    buyDate: argData.BUY_DATE,
                    inDate: argData.IN_DATE,
                    payCurrCd: argData.PAY_CURR_CD,
                    vendorCd: argData.VENDOR_CD,
                    neoeNo: argData.NEOE_NO,
                    regUser: argData.REG_USER,
                    amount: argData.AMOUNT,
                    neoeLine: argData.NEOE_LINE,
                    taxbillCd: argData.TAXBILL_CD,
                },
            });
            console.log(
                "KCD_APP_DATA UPDATE:",
                JSON.stringify(data.updateKCD_APP_DATA),
            );
            return data.updateKCD_APP_DATA;
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
                    mutation DeleteKCD_APP_DATA($deleteKcdAppDataId: Int!) {
                        deleteKCD_APP_DATA(id: $deleteKcdAppDataId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdAppDataId: argData.id,
                },
            });
            console.log(
                "KCD_APP_DATA DELETE:",
                JSON.stringify(data.deleteKCD_APP_DATA),
            );
            return data.deleteKCD_APP_DATA;
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
                    mutation MgrKcdAppDataDeletes(
                        $ids: [InputMgrKcdAppDataDeletes!]!
                    ) {
                        mgrKcdAppDataDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_APP_DATA DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
