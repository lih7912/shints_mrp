/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_CREDIT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_CREDIT {
                        allQueryKSV_INVOICE_CREDIT {
                            id
                            REF_NO
                            CREDIT_CD
                            CREDIT_AMT
                            PRE_FLAG
                            BUYER_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_CREDIT:",
                JSON.stringify(data.allQueryKSV_INVOICE_CREDIT.length),
            );
            return data.allQueryKSV_INVOICE_CREDIT;
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
                    query MgrKsvInvoiceCreditQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceCreditQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REF_NO
                            CREDIT_CD
                            CREDIT_AMT
                            PRE_FLAG
                            BUYER_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_CREDIT:",
                JSON.stringify(data.mgrKsvInvoiceCreditQuery.length),
            );
            return data.mgrKsvInvoiceCreditQuery;
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
                    mutation CreateKSV_INVOICE_CREDIT(
                        $refNo: String
                        $creditCd: String
                        $creditAmt: Float
                        $preFlag: String
                        $buyerCd: String
                    ) {
                        createKSV_INVOICE_CREDIT(
                            REF_NO: $refNo
                            CREDIT_CD: $creditCd
                            CREDIT_AMT: $creditAmt
                            PRE_FLAG: $preFlag
                            BUYER_CD: $buyerCd
                        ) {
                            REF_NO
                            CREDIT_CD
                            CREDIT_AMT
                            PRE_FLAG
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    refNo: argData.REF_NO,
                    creditCd: argData.CREDIT_CD,
                    creditAmt: argData.CREDIT_AMT,
                    preFlag: argData.PRE_FLAG,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "KSV_INVOICE_CREDIT INSERT:",
                JSON.stringify(data.createKSV_INVOICE_CREDIT),
            );
            return data.createKSV_INVOICE_CREDIT;
        } catch (e) {
            console.log("KSV_INVOICE_CREDIT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVOICE_CREDIT(
                        $updateKsvInvoiceCreditId: Int!
                        $refNo: String
                        $creditCd: String
                        $creditAmt: Float
                        $preFlag: String
                        $buyerCd: String
                    ) {
                        updateKSV_INVOICE_CREDIT(
                            id: $updateKsvInvoiceCreditId
                            REF_NO: $refNo
                            CREDIT_CD: $creditCd
                            CREDIT_AMT: $creditAmt
                            PRE_FLAG: $preFlag
                            BUYER_CD: $buyerCd
                        ) {
                            id
                            REF_NO
                            CREDIT_CD
                            CREDIT_AMT
                            PRE_FLAG
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceCreditId: argData.id,
                    refNo: argData.REF_NO,
                    creditCd: argData.CREDIT_CD,
                    creditAmt: argData.CREDIT_AMT,
                    preFlag: argData.PRE_FLAG,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "KSV_INVOICE_CREDIT UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_CREDIT),
            );
            return data.updateKSV_INVOICE_CREDIT;
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
                    mutation DeleteKSV_INVOICE_CREDIT(
                        $deleteKsvInvoiceCreditId: Int!
                    ) {
                        deleteKSV_INVOICE_CREDIT(
                            id: $deleteKsvInvoiceCreditId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceCreditId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_CREDIT DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_CREDIT),
            );
            return data.deleteKSV_INVOICE_CREDIT;
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
                    mutation MgrKsvInvoiceCreditDeletes(
                        $ids: [InputMgrKsvInvoiceCreditDeletes!]!
                    ) {
                        mgrKsvInvoiceCreditDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_CREDIT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
