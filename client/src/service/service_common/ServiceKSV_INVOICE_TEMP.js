/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_INVOICE_TEMP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVOICE_TEMP {
                        allQueryKSV_INVOICE_TEMP {
                            id
                            BUYER_CD
                            CURR_CD
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVOICE_TEMP:",
                JSON.stringify(data.allQueryKSV_INVOICE_TEMP.length),
            );
            return data.allQueryKSV_INVOICE_TEMP;
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
                    query MgrKsvInvoiceTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInvoiceTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            CURR_CD
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVOICE_TEMP:",
                JSON.stringify(data.mgrKsvInvoiceTempQuery.length),
            );
            return data.mgrKsvInvoiceTempQuery;
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
                    mutation CreateKSV_INVOICE_TEMP(
                        $buyerCd: String
                        $currCd: String
                        $regUser: String
                    ) {
                        createKSV_INVOICE_TEMP(
                            BUYER_CD: $buyerCd
                            CURR_CD: $currCd
                            REG_USER: $regUser
                        ) {
                            BUYER_CD
                            CURR_CD
                            REG_USER
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    currCd: argData.CURR_CD,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KSV_INVOICE_TEMP INSERT:",
                JSON.stringify(data.createKSV_INVOICE_TEMP),
            );
            return data.createKSV_INVOICE_TEMP;
        } catch (e) {
            console.log("KSV_INVOICE_TEMP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVOICE_TEMP(
                        $updateKsvInvoiceTempId: Int!
                        $buyerCd: String
                        $currCd: String
                        $regUser: String
                    ) {
                        updateKSV_INVOICE_TEMP(
                            id: $updateKsvInvoiceTempId
                            BUYER_CD: $buyerCd
                            CURR_CD: $currCd
                            REG_USER: $regUser
                        ) {
                            id
                            BUYER_CD
                            CURR_CD
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKsvInvoiceTempId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    currCd: argData.CURR_CD,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KSV_INVOICE_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_INVOICE_TEMP),
            );
            return data.updateKSV_INVOICE_TEMP;
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
                    mutation DeleteKSV_INVOICE_TEMP(
                        $deleteKsvInvoiceTempId: Int!
                    ) {
                        deleteKSV_INVOICE_TEMP(id: $deleteKsvInvoiceTempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInvoiceTempId: argData.id,
                },
            });
            console.log(
                "KSV_INVOICE_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_INVOICE_TEMP),
            );
            return data.deleteKSV_INVOICE_TEMP;
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
                    mutation MgrKsvInvoiceTempDeletes(
                        $ids: [InputMgrKsvInvoiceTempDeletes!]!
                    ) {
                        mgrKsvInvoiceTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVOICE_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
