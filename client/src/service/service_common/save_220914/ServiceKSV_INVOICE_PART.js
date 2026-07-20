/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVOICE_PART {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_PART {
                        allQueryKSV_INVOICE_PART {
                            id
                            INVOICE_NO
                            DUE_DATE
                            PART_AMT
                            PART_SEQ
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_PART:",
                JSON.stringify(data.allQueryKSV_INVOICE_PART.length),
            );
            return data.allQueryKSV_INVOICE_PART;
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
                    query MgrKsvInvoicePartQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoicePartQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            DUE_DATE
                            PART_AMT
                            PART_SEQ
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_PART:",
                JSON.stringify(data.mgrKsvInvoicePartQuery.length),
            );
            return data.mgrKsvInvoicePartQuery;
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
                    mutation CreateKSV_INVOICE_PART(
                        $invoiceNo: String
                        $dueDate: String
                        $partAmt: Float
                        $partSeq: Int
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_INVOICE_PART(
                            INVOICE_NO: $invoiceNo
                            DUE_DATE: $dueDate
                            PART_AMT: $partAmt
                            PART_SEQ: $partSeq
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            INVOICE_NO
                            DUE_DATE
                            PART_AMT
                            PART_SEQ
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    dueDate: argData.DUE_DATE,
                    partAmt: argData.PART_AMT,
                    partSeq: argData.PART_SEQ,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_INVOICE_PART INSERT:",
                JSON.stringify(data.createKSV_INVOICE_PART),
            );
            return data.createKSV_INVOICE_PART;
        } catch (e) {
            console.log("KSV_INVOICE_PART INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVOICE_PART(
                        $updateKsvInvoicePartId: Int!
                        $invoiceNo: String
                        $dueDate: String
                        $partAmt: Float
                        $partSeq: Int
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_INVOICE_PART(
                            id: $updateKsvInvoicePartId
                            INVOICE_NO: $invoiceNo
                            DUE_DATE: $dueDate
                            PART_AMT: $partAmt
                            PART_SEQ: $partSeq
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            INVOICE_NO
                            DUE_DATE
                            PART_AMT
                            PART_SEQ
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvInvoicePartId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    dueDate: argData.DUE_DATE,
                    partAmt: argData.PART_AMT,
                    partSeq: argData.PART_SEQ,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_INVOICE_PART UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_PART),
            );
            return data.updateKSV_INVOICE_PART;
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
                    mutation DeleteKSV_INVOICE_PART(
                        $deleteKsvInvoicePartId: Int!
                    ) {
                        deleteKSV_INVOICE_PART(id: $deleteKsvInvoicePartId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoicePartId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_PART DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_PART),
            );
            return data.deleteKSV_INVOICE_PART;
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
                    mutation MgrKsvInvoicePartDeletes(
                        $ids: [InputMgrKsvInvoicePartDeletes!]!
                    ) {
                        mgrKsvInvoicePartDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_PART DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
