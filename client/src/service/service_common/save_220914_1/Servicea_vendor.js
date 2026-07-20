/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_vendor {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_vendor {
                        allQuerya_vendor {
                            id
                            vendor_name
                        }
                    }
                `,
            });
            console.log(
                "a_vendor:",
                JSON.stringify(data.allQuerya_vendor.length),
            );
            return data.allQuerya_vendor;
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
                    query MgrAVendorQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAVendorQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            vendor_name
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_vendor:",
                JSON.stringify(data.mgrAVendorQuery.length),
            );
            return data.mgrAVendorQuery;
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
                    mutation Createa_vendor($vendorName: String) {
                        createa_vendor(vendor_name: $vendorName) {
                            vendor_name
                        }
                    }
                `,
                variables: {
                    vendorName: argData.vendor_name,
                },
            });
            console.log(
                "a_vendor INSERT:",
                JSON.stringify(data.createa_vendor),
            );
            return data.createa_vendor;
        } catch (e) {
            console.log("a_vendor INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_vendor(
                        $updateAVendorId: Int!
                        $vendorName: String
                    ) {
                        updatea_vendor(
                            id: $updateAVendorId
                            vendor_name: $vendorName
                        ) {
                            id
                            vendor_name
                        }
                    }
                `,
                variables: {
                    updateAVendorId: argData.id,
                    vendorName: argData.vendor_name,
                },
            });
            console.log(
                "a_vendor UPDATE:",
                JSON.stringify(data.updatea_vendor),
            );
            return data.updatea_vendor;
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
                    mutation Deletea_vendor($deleteAVendorId: Int!) {
                        deletea_vendor(id: $deleteAVendorId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAVendorId: argData.id,
                },
            });
            console.log(
                "a_vendor DELETE:",
                JSON.stringify(data.deletea_vendor),
            );
            return data.deletea_vendor;
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
                    mutation MgrAVendorDeletes(
                        $ids: [InputMgrAVendorDeletes!]!
                    ) {
                        mgrAVendorDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_vendor DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
