/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_OFFER_SPEC {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_OFFER_SPEC {
                        allQueryKCD_OFFER_SPEC {
                            id
                            VENDOR_CD
                            MATL_NAME
                            SPEC
                            OFFER_SPEC
                        }
                    }
                `,
            });
            console.log(
                "KCD_OFFER_SPEC:",
                JSON.stringify(data.allQueryKCD_OFFER_SPEC.length),
            );
            return data.allQueryKCD_OFFER_SPEC;
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
                    query MgrKcdOfferSpecQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdOfferSpecQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            VENDOR_CD
                            MATL_NAME
                            SPEC
                            OFFER_SPEC
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_OFFER_SPEC:",
                JSON.stringify(data.mgrKcdOfferSpecQuery.length),
            );
            return data.mgrKcdOfferSpecQuery;
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
                    mutation CreateKCD_OFFER_SPEC(
                        $vendorCd: String
                        $matlName: String
                        $spec: String
                        $offerSpec: String
                    ) {
                        createKCD_OFFER_SPEC(
                            VENDOR_CD: $vendorCd
                            MATL_NAME: $matlName
                            SPEC: $spec
                            OFFER_SPEC: $offerSpec
                        ) {
                            VENDOR_CD
                            MATL_NAME
                            SPEC
                            OFFER_SPEC
                        }
                    }
                `,
                variables: {
                    vendorCd: argData.VENDOR_CD,
                    matlName: argData.MATL_NAME,
                    spec: argData.SPEC,
                    offerSpec: argData.OFFER_SPEC,
                },
            });
            console.log(
                "KCD_OFFER_SPEC INSERT:",
                JSON.stringify(data.createKCD_OFFER_SPEC),
            );
            return data.createKCD_OFFER_SPEC;
        } catch (e) {
            console.log("KCD_OFFER_SPEC INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_OFFER_SPEC(
                        $updateKcdOfferSpecId: Int!
                        $vendorCd: String
                        $matlName: String
                        $spec: String
                        $offerSpec: String
                    ) {
                        updateKCD_OFFER_SPEC(
                            id: $updateKcdOfferSpecId
                            VENDOR_CD: $vendorCd
                            MATL_NAME: $matlName
                            SPEC: $spec
                            OFFER_SPEC: $offerSpec
                        ) {
                            id
                            VENDOR_CD
                            MATL_NAME
                            SPEC
                            OFFER_SPEC
                        }
                    }
                `,
                variables: {
                    updateKcdOfferSpecId: argData.id,
                    vendorCd: argData.VENDOR_CD,
                    matlName: argData.MATL_NAME,
                    spec: argData.SPEC,
                    offerSpec: argData.OFFER_SPEC,
                },
            });
            console.log(
                "KCD_OFFER_SPEC UPDATE:",
                JSON.stringify(data.updateKCD_OFFER_SPEC),
            );
            return data.updateKCD_OFFER_SPEC;
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
                    mutation DeleteKCD_OFFER_SPEC($deleteKcdOfferSpecId: Int!) {
                        deleteKCD_OFFER_SPEC(id: $deleteKcdOfferSpecId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdOfferSpecId: argData.id,
                },
            });
            console.log(
                "KCD_OFFER_SPEC DELETE:",
                JSON.stringify(data.deleteKCD_OFFER_SPEC),
            );
            return data.deleteKCD_OFFER_SPEC;
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
                    mutation MgrKcdOfferSpecDeletes(
                        $ids: [InputMgrKcdOfferSpecDeletes!]!
                    ) {
                        mgrKcdOfferSpecDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_OFFER_SPEC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
