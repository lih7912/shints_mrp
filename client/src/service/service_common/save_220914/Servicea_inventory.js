/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_inventory {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory {
                        allQuerya_inventory {
                            id
                            po_cd
                            order_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
            });
            console.log(
                "a_inventory:",
                JSON.stringify(data.allQuerya_inventory.length),
            );
            return data.allQuerya_inventory;
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
                    query MgrAInventoryQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            order_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_inventory:",
                JSON.stringify(data.mgrAInventoryQuery.length),
            );
            return data.mgrAInventoryQuery;
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
                    mutation Createa_inventory(
                        $poCd: String
                        $orderCd: String
                        $matlCd: String
                        $poQty: Float
                    ) {
                        createa_inventory(
                            po_cd: $poCd
                            order_cd: $orderCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                        ) {
                            po_cd
                            order_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    orderCd: argData.order_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                },
            });
            console.log(
                "a_inventory INSERT:",
                JSON.stringify(data.createa_inventory),
            );
            return data.createa_inventory;
        } catch (e) {
            console.log("a_inventory INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_inventory(
                        $updateAInventoryId: Int!
                        $poCd: String
                        $orderCd: String
                        $matlCd: String
                        $poQty: Float
                    ) {
                        updatea_inventory(
                            id: $updateAInventoryId
                            po_cd: $poCd
                            order_cd: $orderCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                        ) {
                            id
                            po_cd
                            order_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
                variables: {
                    updateAInventoryId: argData.id,
                    poCd: argData.po_cd,
                    orderCd: argData.order_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                },
            });
            console.log(
                "a_inventory UPDATE:",
                JSON.stringify(data.updatea_inventory),
            );
            return data.updatea_inventory;
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
                    mutation Deletea_inventory($deleteAInventoryId: Int!) {
                        deletea_inventory(id: $deleteAInventoryId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryId: argData.id,
                },
            });
            console.log(
                "a_inventory DELETE:",
                JSON.stringify(data.deletea_inventory),
            );
            return data.deletea_inventory;
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
                    mutation MgrAInventoryDeletes(
                        $ids: [InputMgrAInventoryDeletes!]!
                    ) {
                        mgrAInventoryDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_inventory DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
