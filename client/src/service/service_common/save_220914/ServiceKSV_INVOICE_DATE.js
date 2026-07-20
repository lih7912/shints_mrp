/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_DATE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_DATE {
                        allQueryKSV_INVOICE_DATE {
                            id
                            INVOICE_NO
                            FACTORY_DATE
                            TRADE_DATE
                            KOREA_DATE
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_DATE:",
                JSON.stringify(data.allQueryKSV_INVOICE_DATE.length),
            );
            return data.allQueryKSV_INVOICE_DATE;
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
                    query MgrKsvInvoiceDateQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceDateQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            FACTORY_DATE
                            TRADE_DATE
                            KOREA_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_DATE:",
                JSON.stringify(data.mgrKsvInvoiceDateQuery.length),
            );
            return data.mgrKsvInvoiceDateQuery;
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
                    mutation CreateKSV_INVOICE_DATE(
                        $invoiceNo: String
                        $factoryDate: String
                        $tradeDate: String
                        $koreaDate: String
                    ) {
                        createKSV_INVOICE_DATE(
                            INVOICE_NO: $invoiceNo
                            FACTORY_DATE: $factoryDate
                            TRADE_DATE: $tradeDate
                            KOREA_DATE: $koreaDate
                        ) {
                            INVOICE_NO
                            FACTORY_DATE
                            TRADE_DATE
                            KOREA_DATE
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    factoryDate: argData.FACTORY_DATE,
                    tradeDate: argData.TRADE_DATE,
                    koreaDate: argData.KOREA_DATE,
                },
            });
            console.log(
                "KSV_INVOICE_DATE INSERT:",
                JSON.stringify(data.createKSV_INVOICE_DATE),
            );
            return data.createKSV_INVOICE_DATE;
        } catch (e) {
            console.log("KSV_INVOICE_DATE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVOICE_DATE(
                        $updateKsvInvoiceDateId: Int!
                        $invoiceNo: String
                        $factoryDate: String
                        $tradeDate: String
                        $koreaDate: String
                    ) {
                        updateKSV_INVOICE_DATE(
                            id: $updateKsvInvoiceDateId
                            INVOICE_NO: $invoiceNo
                            FACTORY_DATE: $factoryDate
                            TRADE_DATE: $tradeDate
                            KOREA_DATE: $koreaDate
                        ) {
                            id
                            INVOICE_NO
                            FACTORY_DATE
                            TRADE_DATE
                            KOREA_DATE
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceDateId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    factoryDate: argData.FACTORY_DATE,
                    tradeDate: argData.TRADE_DATE,
                    koreaDate: argData.KOREA_DATE,
                },
            });
            console.log(
                "KSV_INVOICE_DATE UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_DATE),
            );
            return data.updateKSV_INVOICE_DATE;
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
                    mutation DeleteKSV_INVOICE_DATE(
                        $deleteKsvInvoiceDateId: Int!
                    ) {
                        deleteKSV_INVOICE_DATE(id: $deleteKsvInvoiceDateId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceDateId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_DATE DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_DATE),
            );
            return data.deleteKSV_INVOICE_DATE;
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
                    mutation MgrKsvInvoiceDateDeletes(
                        $ids: [InputMgrKsvInvoiceDateDeletes!]!
                    ) {
                        mgrKsvInvoiceDateDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_DATE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
