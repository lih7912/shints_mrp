/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PO_VENDOR {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_VENDOR {
                        allQueryKSV_PO_VENDOR {
                            id
                            PO_CD
                            VENDOR_CD
                            END_DATE
                            CHECK_DATE
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_VENDOR:",
                JSON.stringify(data.allQueryKSV_PO_VENDOR.length),
            );
            return data.allQueryKSV_PO_VENDOR;
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
                    query MgrKsvPoVendorQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoVendorQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            VENDOR_CD
                            END_DATE
                            CHECK_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_VENDOR:",
                JSON.stringify(data.mgrKsvPoVendorQuery.length),
            );
            return data.mgrKsvPoVendorQuery;
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
                    mutation CreateKSV_PO_VENDOR(
                        $poCd: String
                        $vendorCd: String
                        $endDate: String
                        $checkDate: String
                    ) {
                        createKSV_PO_VENDOR(
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                            END_DATE: $endDate
                            CHECK_DATE: $checkDate
                        ) {
                            PO_CD
                            VENDOR_CD
                            END_DATE
                            CHECK_DATE
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    vendorCd: argData.VENDOR_CD,
                    endDate: argData.END_DATE,
                    checkDate: argData.CHECK_DATE,
                },
            });
            console.log(
                "KSV_PO_VENDOR INSERT:",
                JSON.stringify(data.createKSV_PO_VENDOR),
            );
            return data.createKSV_PO_VENDOR;
        } catch (e) {
            console.log("KSV_PO_VENDOR INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_VENDOR(
                        $updateKsvPoVendorId: Int!
                        $poCd: String
                        $vendorCd: String
                        $endDate: String
                        $checkDate: String
                    ) {
                        updateKSV_PO_VENDOR(
                            id: $updateKsvPoVendorId
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                            END_DATE: $endDate
                            CHECK_DATE: $checkDate
                        ) {
                            id
                            PO_CD
                            VENDOR_CD
                            END_DATE
                            CHECK_DATE
                        }
                    }
                `,
                variables: {
                    updateKsvPoVendorId: argData.id,
                    poCd: argData.PO_CD,
                    vendorCd: argData.VENDOR_CD,
                    endDate: argData.END_DATE,
                    checkDate: argData.CHECK_DATE,
                },
            });
            console.log(
                "KSV_PO_VENDOR UPDATE:",
                JSON.stringify(data.updateKSV_PO_VENDOR),
            );
            return data.updateKSV_PO_VENDOR;
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
                    mutation DeleteKSV_PO_VENDOR($deleteKsvPoVendorId: Int!) {
                        deleteKSV_PO_VENDOR(id: $deleteKsvPoVendorId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoVendorId: argData.id,
                },
            });
            console.log(
                "KSV_PO_VENDOR DELETE:",
                JSON.stringify(data.deleteKSV_PO_VENDOR),
            );
            return data.deleteKSV_PO_VENDOR;
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
                    mutation MgrKsvPoVendorDeletes(
                        $ids: [InputMgrKsvPoVendorDeletes!]!
                    ) {
                        mgrKsvPoVendorDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_VENDOR DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
