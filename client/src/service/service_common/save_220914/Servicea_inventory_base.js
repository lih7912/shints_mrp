/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_inventory_base {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory_base {
                        allQuerya_inventory_base {
                            id
                            po_cd
                            matl_cd
                            usd_price
                        }
                    }
                `,
            });
            console.log(
                "a_inventory_base:",
                JSON.stringify(data.allQuerya_inventory_base.length),
            );
            return data.allQuerya_inventory_base;
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
                    query MgrAInventoryBaseQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryBaseQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            matl_cd
                            usd_price
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_inventory_base:",
                JSON.stringify(data.mgrAInventoryBaseQuery.length),
            );
            return data.mgrAInventoryBaseQuery;
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
                    mutation Createa_inventory_base(
                        $poCd: String
                        $matlCd: String
                        $usdPrice: Float
                    ) {
                        createa_inventory_base(
                            po_cd: $poCd
                            matl_cd: $matlCd
                            usd_price: $usdPrice
                        ) {
                            po_cd
                            matl_cd
                            usd_price
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    usdPrice: argData.usd_price,
                },
            });
            console.log(
                "a_inventory_base INSERT:",
                JSON.stringify(data.createa_inventory_base),
            );
            return data.createa_inventory_base;
        } catch (e) {
            console.log("a_inventory_base INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_inventory_base(
                        $updateAInventoryBaseId: Int!
                        $poCd: String
                        $matlCd: String
                        $usdPrice: Float
                    ) {
                        updatea_inventory_base(
                            id: $updateAInventoryBaseId
                            po_cd: $poCd
                            matl_cd: $matlCd
                            usd_price: $usdPrice
                        ) {
                            id
                            po_cd
                            matl_cd
                            usd_price
                        }
                    }
                `,
                variables: {
                    updateAInventoryBaseId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    usdPrice: argData.usd_price,
                },
            });
            console.log(
                "a_inventory_base UPDATE:",
                JSON.stringify(data.updatea_inventory_base),
            );
            return data.updatea_inventory_base;
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
                    mutation Deletea_inventory_base(
                        $deleteAInventoryBaseId: Int!
                    ) {
                        deletea_inventory_base(id: $deleteAInventoryBaseId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryBaseId: argData.id,
                },
            });
            console.log(
                "a_inventory_base DELETE:",
                JSON.stringify(data.deletea_inventory_base),
            );
            return data.deletea_inventory_base;
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
                    mutation MgrAInventoryBaseDeletes(
                        $ids: [InputMgrAInventoryBaseDeletes!]!
                    ) {
                        mgrAInventoryBaseDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_inventory_base DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
