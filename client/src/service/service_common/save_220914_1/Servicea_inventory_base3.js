/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_inventory_base3 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory_base3 {
                        allQuerya_inventory_base3 {
                            id
                            po_cd
                            matl_cd
                            usd_price
                        }
                    }
                `,
            });
            console.log(
                "a_inventory_base3:",
                JSON.stringify(data.allQuerya_inventory_base3.length),
            );
            return data.allQuerya_inventory_base3;
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
                    query MgrAInventoryBase3Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryBase3Query(
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
                "a_inventory_base3:",
                JSON.stringify(data.mgrAInventoryBase3Query.length),
            );
            return data.mgrAInventoryBase3Query;
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
                    mutation Createa_inventory_base3(
                        $poCd: String
                        $matlCd: String
                        $usdPrice: Float
                    ) {
                        createa_inventory_base3(
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
                "a_inventory_base3 INSERT:",
                JSON.stringify(data.createa_inventory_base3),
            );
            return data.createa_inventory_base3;
        } catch (e) {
            console.log("a_inventory_base3 INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_inventory_base3(
                        $updateAInventoryBase3Id: Int!
                        $poCd: String
                        $matlCd: String
                        $usdPrice: Float
                    ) {
                        updatea_inventory_base3(
                            id: $updateAInventoryBase3Id
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
                    updateAInventoryBase3Id: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    usdPrice: argData.usd_price,
                },
            });
            console.log(
                "a_inventory_base3 UPDATE:",
                JSON.stringify(data.updatea_inventory_base3),
            );
            return data.updatea_inventory_base3;
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
                    mutation Deletea_inventory_base3(
                        $deleteAInventoryBase3Id: Int!
                    ) {
                        deletea_inventory_base3(id: $deleteAInventoryBase3Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryBase3Id: argData.id,
                },
            });
            console.log(
                "a_inventory_base3 DELETE:",
                JSON.stringify(data.deletea_inventory_base3),
            );
            return data.deletea_inventory_base3;
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
                    mutation MgrAInventoryBase3Deletes(
                        $ids: [InputMgrAInventoryBase3Deletes!]!
                    ) {
                        mgrAInventoryBase3Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_inventory_base3 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
