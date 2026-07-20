/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_VENDOR_BANK {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_VENDOR_BANK {
                        allQueryKCD_VENDOR_BANK {
                            id
                            VENDOR_CD
                            SEQ
                            BANK_CD
                        }
                    }
                `,
            });
            console.log(
                "KCD_VENDOR_BANK:",
                JSON.stringify(data.allQueryKCD_VENDOR_BANK.length),
            );
            return data.allQueryKCD_VENDOR_BANK;
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
                    query MgrKcdVendorBankQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdVendorBankQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            VENDOR_CD
                            SEQ
                            BANK_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_VENDOR_BANK:",
                JSON.stringify(data.mgrKcdVendorBankQuery.length),
            );
            return data.mgrKcdVendorBankQuery;
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
                    mutation CreateKCD_VENDOR_BANK(
                        $vendorCd: String
                        $seq: Int
                        $bankCd: String
                    ) {
                        createKCD_VENDOR_BANK(
                            VENDOR_CD: $vendorCd
                            SEQ: $seq
                            BANK_CD: $bankCd
                        ) {
                            VENDOR_CD
                            SEQ
                            BANK_CD
                        }
                    }
                `,
                variables: {
                    vendorCd: argData.VENDOR_CD,
                    seq: argData.SEQ,
                    bankCd: argData.BANK_CD,
                },
            });
            console.log(
                "KCD_VENDOR_BANK INSERT:",
                JSON.stringify(data.createKCD_VENDOR_BANK),
            );
            return data.createKCD_VENDOR_BANK;
        } catch (e) {
            console.log("KCD_VENDOR_BANK INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_VENDOR_BANK(
                        $updateKcdVendorBankId: Int!
                        $vendorCd: String
                        $seq: Int
                        $bankCd: String
                    ) {
                        updateKCD_VENDOR_BANK(
                            id: $updateKcdVendorBankId
                            VENDOR_CD: $vendorCd
                            SEQ: $seq
                            BANK_CD: $bankCd
                        ) {
                            id
                            VENDOR_CD
                            SEQ
                            BANK_CD
                        }
                    }
                `,
                variables: {
                    updateKcdVendorBankId: argData.id,
                    vendorCd: argData.VENDOR_CD,
                    seq: argData.SEQ,
                    bankCd: argData.BANK_CD,
                },
            });
            console.log(
                "KCD_VENDOR_BANK UPDATE:",
                JSON.stringify(data.updateKCD_VENDOR_BANK),
            );
            return data.updateKCD_VENDOR_BANK;
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
                    mutation DeleteKCD_VENDOR_BANK(
                        $deleteKcdVendorBankId: Int!
                    ) {
                        deleteKCD_VENDOR_BANK(id: $deleteKcdVendorBankId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdVendorBankId: argData.id,
                },
            });
            console.log(
                "KCD_VENDOR_BANK DELETE:",
                JSON.stringify(data.deleteKCD_VENDOR_BANK),
            );
            return data.deleteKCD_VENDOR_BANK;
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
                    mutation MgrKcdVendorBankDeletes(
                        $ids: [InputMgrKcdVendorBankDeletes!]!
                    ) {
                        mgrKcdVendorBankDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_VENDOR_BANK DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
