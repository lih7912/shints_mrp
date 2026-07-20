/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_MATL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_MATL {
                        allQueryKSV_INVOICE_MATL {
                            id
                            INVOICE_NO
                            PACK_CD
                            OUT_DATE
                            DELIVERY_AMT
                            DELIVERY_WON
                            CURR_DATE
                            DOCU_NO
                            PAYMENT_TYPE
                            TRADE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CURR_CD
                            TRADE_KIND
                            LICENSE_NO
                            LICENSE_DATE
                            BUYER_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_MATL:",
                JSON.stringify(data.allQueryKSV_INVOICE_MATL.length),
            );
            return data.allQueryKSV_INVOICE_MATL;
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
                    query MgrKsvInvoiceMatlQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceMatlQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            PACK_CD
                            OUT_DATE
                            DELIVERY_AMT
                            DELIVERY_WON
                            CURR_DATE
                            DOCU_NO
                            PAYMENT_TYPE
                            TRADE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CURR_CD
                            TRADE_KIND
                            LICENSE_NO
                            LICENSE_DATE
                            BUYER_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_MATL:",
                JSON.stringify(data.mgrKsvInvoiceMatlQuery.length),
            );
            return data.mgrKsvInvoiceMatlQuery;
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
                    mutation CreateKSV_INVOICE_MATL(
                        $invoiceNo: String
                        $packCd: String
                        $outDate: String
                        $deliveryAmt: Float
                        $deliveryWon: Float
                        $currDate: String
                        $docuNo: String
                        $paymentType: String
                        $tradeType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $currCd: String
                        $tradeKind: String
                        $licenseNo: String
                        $licenseDate: String
                        $buyerCd: String
                    ) {
                        createKSV_INVOICE_MATL(
                            INVOICE_NO: $invoiceNo
                            PACK_CD: $packCd
                            OUT_DATE: $outDate
                            DELIVERY_AMT: $deliveryAmt
                            DELIVERY_WON: $deliveryWon
                            CURR_DATE: $currDate
                            DOCU_NO: $docuNo
                            PAYMENT_TYPE: $paymentType
                            TRADE_TYPE: $tradeType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            CURR_CD: $currCd
                            TRADE_KIND: $tradeKind
                            LICENSE_NO: $licenseNo
                            LICENSE_DATE: $licenseDate
                            BUYER_CD: $buyerCd
                        ) {
                            INVOICE_NO
                            PACK_CD
                            OUT_DATE
                            DELIVERY_AMT
                            DELIVERY_WON
                            CURR_DATE
                            DOCU_NO
                            PAYMENT_TYPE
                            TRADE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CURR_CD
                            TRADE_KIND
                            LICENSE_NO
                            LICENSE_DATE
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    packCd: argData.PACK_CD,
                    outDate: argData.OUT_DATE,
                    deliveryAmt: argData.DELIVERY_AMT,
                    deliveryWon: argData.DELIVERY_WON,
                    currDate: argData.CURR_DATE,
                    docuNo: argData.DOCU_NO,
                    paymentType: argData.PAYMENT_TYPE,
                    tradeType: argData.TRADE_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    currCd: argData.CURR_CD,
                    tradeKind: argData.TRADE_KIND,
                    licenseNo: argData.LICENSE_NO,
                    licenseDate: argData.LICENSE_DATE,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "KSV_INVOICE_MATL INSERT:",
                JSON.stringify(data.createKSV_INVOICE_MATL),
            );
            return data.createKSV_INVOICE_MATL;
        } catch (e) {
            console.log("KSV_INVOICE_MATL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVOICE_MATL(
                        $updateKsvInvoiceMatlId: Int!
                        $invoiceNo: String
                        $packCd: String
                        $outDate: String
                        $deliveryAmt: Float
                        $deliveryWon: Float
                        $currDate: String
                        $docuNo: String
                        $paymentType: String
                        $tradeType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $currCd: String
                        $tradeKind: String
                        $licenseNo: String
                        $licenseDate: String
                        $buyerCd: String
                    ) {
                        updateKSV_INVOICE_MATL(
                            id: $updateKsvInvoiceMatlId
                            INVOICE_NO: $invoiceNo
                            PACK_CD: $packCd
                            OUT_DATE: $outDate
                            DELIVERY_AMT: $deliveryAmt
                            DELIVERY_WON: $deliveryWon
                            CURR_DATE: $currDate
                            DOCU_NO: $docuNo
                            PAYMENT_TYPE: $paymentType
                            TRADE_TYPE: $tradeType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            CURR_CD: $currCd
                            TRADE_KIND: $tradeKind
                            LICENSE_NO: $licenseNo
                            LICENSE_DATE: $licenseDate
                            BUYER_CD: $buyerCd
                        ) {
                            id
                            INVOICE_NO
                            PACK_CD
                            OUT_DATE
                            DELIVERY_AMT
                            DELIVERY_WON
                            CURR_DATE
                            DOCU_NO
                            PAYMENT_TYPE
                            TRADE_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            CURR_CD
                            TRADE_KIND
                            LICENSE_NO
                            LICENSE_DATE
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceMatlId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    packCd: argData.PACK_CD,
                    outDate: argData.OUT_DATE,
                    deliveryAmt: argData.DELIVERY_AMT,
                    deliveryWon: argData.DELIVERY_WON,
                    currDate: argData.CURR_DATE,
                    docuNo: argData.DOCU_NO,
                    paymentType: argData.PAYMENT_TYPE,
                    tradeType: argData.TRADE_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    currCd: argData.CURR_CD,
                    tradeKind: argData.TRADE_KIND,
                    licenseNo: argData.LICENSE_NO,
                    licenseDate: argData.LICENSE_DATE,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "KSV_INVOICE_MATL UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_MATL),
            );
            return data.updateKSV_INVOICE_MATL;
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
                    mutation DeleteKSV_INVOICE_MATL(
                        $deleteKsvInvoiceMatlId: Int!
                    ) {
                        deleteKSV_INVOICE_MATL(id: $deleteKsvInvoiceMatlId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceMatlId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_MATL DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_MATL),
            );
            return data.deleteKSV_INVOICE_MATL;
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
                    mutation MgrKsvInvoiceMatlDeletes(
                        $ids: [InputMgrKsvInvoiceMatlDeletes!]!
                    ) {
                        mgrKsvInvoiceMatlDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_MATL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
