/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_inventory_wip {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory_wip {
                        allQuerya_inventory_wip {
                            id
                            po_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
            });
            console.log(
                "a_inventory_wip:",
                JSON.stringify(data.allQuerya_inventory_wip.length),
            );
            return data.allQuerya_inventory_wip;
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
                    query MgrAInventoryWipQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryWipQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_inventory_wip:",
                JSON.stringify(data.mgrAInventoryWipQuery.length),
            );
            return data.mgrAInventoryWipQuery;
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
                    mutation Createa_inventory_wip(
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                    ) {
                        createa_inventory_wip(
                            po_cd: $poCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                        ) {
                            po_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                },
            });
            console.log(
                "a_inventory_wip INSERT:",
                JSON.stringify(data.createa_inventory_wip),
            );
            return data.createa_inventory_wip;
        } catch (e) {
            console.log("a_inventory_wip INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_inventory_wip(
                        $updateAInventoryWipId: Int!
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                    ) {
                        updatea_inventory_wip(
                            id: $updateAInventoryWipId
                            po_cd: $poCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                        ) {
                            id
                            po_cd
                            matl_cd
                            po_qty
                        }
                    }
                `,
                variables: {
                    updateAInventoryWipId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                },
            });
            console.log(
                "a_inventory_wip UPDATE:",
                JSON.stringify(data.updatea_inventory_wip),
            );
            return data.updatea_inventory_wip;
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
                    mutation Deletea_inventory_wip(
                        $deleteAInventoryWipId: Int!
                    ) {
                        deletea_inventory_wip(id: $deleteAInventoryWipId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryWipId: argData.id,
                },
            });
            console.log(
                "a_inventory_wip DELETE:",
                JSON.stringify(data.deletea_inventory_wip),
            );
            return data.deletea_inventory_wip;
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
                    mutation MgrAInventoryWipDeletes(
                        $ids: [InputMgrAInventoryWipDeletes!]!
                    ) {
                        mgrAInventoryWipDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_inventory_wip DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
