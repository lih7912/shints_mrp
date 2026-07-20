/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_INVOICE_MATLMEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_MATLMEM {
                        allQueryKSV_INVOICE_MATLMEM {
                            id
                            INVOICE_NO
                            PACK_CD
                            PO_CD
                            PO_AMT
                            DELIVERY_AMT
                            DELIVERY_WON
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_MATLMEM:",
                JSON.stringify(data.allQueryKSV_INVOICE_MATLMEM.length),
            );
            return data.allQueryKSV_INVOICE_MATLMEM;
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
                    query MgrKsvInvoiceMatlmemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceMatlmemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            PACK_CD
                            PO_CD
                            PO_AMT
                            DELIVERY_AMT
                            DELIVERY_WON
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_MATLMEM:",
                JSON.stringify(data.mgrKsvInvoiceMatlmemQuery.length),
            );
            return data.mgrKsvInvoiceMatlmemQuery;
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
                    mutation CreateKSV_INVOICE_MATLMEM(
                        $invoiceNo: String
                        $packCd: String
                        $poCd: String
                        $poAmt: Float
                        $deliveryAmt: Float
                        $deliveryWon: Float
                    ) {
                        createKSV_INVOICE_MATLMEM(
                            INVOICE_NO: $invoiceNo
                            PACK_CD: $packCd
                            PO_CD: $poCd
                            PO_AMT: $poAmt
                            DELIVERY_AMT: $deliveryAmt
                            DELIVERY_WON: $deliveryWon
                        ) {
                            INVOICE_NO
                            PACK_CD
                            PO_CD
                            PO_AMT
                            DELIVERY_AMT
                            DELIVERY_WON
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    packCd: argData.PACK_CD,
                    poCd: argData.PO_CD,
                    poAmt: argData.PO_AMT,
                    deliveryAmt: argData.DELIVERY_AMT,
                    deliveryWon: argData.DELIVERY_WON,
                },
            });
            console.log(
                "KSV_INVOICE_MATLMEM INSERT:",
                JSON.stringify(data.createKSV_INVOICE_MATLMEM),
            );
            return data.createKSV_INVOICE_MATLMEM;
        } catch (e) {
            console.log("KSV_INVOICE_MATLMEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVOICE_MATLMEM(
                        $updateKsvInvoiceMatlmemId: Int!
                        $invoiceNo: String
                        $packCd: String
                        $poCd: String
                        $poAmt: Float
                        $deliveryAmt: Float
                        $deliveryWon: Float
                    ) {
                        updateKSV_INVOICE_MATLMEM(
                            id: $updateKsvInvoiceMatlmemId
                            INVOICE_NO: $invoiceNo
                            PACK_CD: $packCd
                            PO_CD: $poCd
                            PO_AMT: $poAmt
                            DELIVERY_AMT: $deliveryAmt
                            DELIVERY_WON: $deliveryWon
                        ) {
                            id
                            INVOICE_NO
                            PACK_CD
                            PO_CD
                            PO_AMT
                            DELIVERY_AMT
                            DELIVERY_WON
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceMatlmemId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    packCd: argData.PACK_CD,
                    poCd: argData.PO_CD,
                    poAmt: argData.PO_AMT,
                    deliveryAmt: argData.DELIVERY_AMT,
                    deliveryWon: argData.DELIVERY_WON,
                },
            });
            console.log(
                "KSV_INVOICE_MATLMEM UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_MATLMEM),
            );
            return data.updateKSV_INVOICE_MATLMEM;
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
                    mutation DeleteKSV_INVOICE_MATLMEM(
                        $deleteKsvInvoiceMatlmemId: Int!
                    ) {
                        deleteKSV_INVOICE_MATLMEM(
                            id: $deleteKsvInvoiceMatlmemId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceMatlmemId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_MATLMEM DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_MATLMEM),
            );
            return data.deleteKSV_INVOICE_MATLMEM;
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
                    mutation MgrKsvInvoiceMatlmemDeletes(
                        $ids: [InputMgrKsvInvoiceMatlmemDeletes!]!
                    ) {
                        mgrKsvInvoiceMatlmemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_MATLMEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
