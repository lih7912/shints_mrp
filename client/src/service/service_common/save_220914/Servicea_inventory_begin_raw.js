/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_inventory_begin_raw {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory_begin_raw {
                        allQuerya_inventory_begin_raw {
                            id
                            po_cd
                            matl_cd
                            po_qty
                            name
                        }
                    }
                `,
            });
            console.log(
                "a_inventory_begin_raw:",
                JSON.stringify(data.allQuerya_inventory_begin_raw.length),
            );
            return data.allQuerya_inventory_begin_raw;
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
                    query MgrAInventoryBeginRawQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryBeginRawQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            matl_cd
                            po_qty
                            name
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_inventory_begin_raw:",
                JSON.stringify(data.mgrAInventoryBeginRawQuery.length),
            );
            return data.mgrAInventoryBeginRawQuery;
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
                    mutation Createa_inventory_begin_raw(
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                        $name: String
                    ) {
                        createa_inventory_begin_raw(
                            po_cd: $poCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                            name: $name
                        ) {
                            po_cd
                            matl_cd
                            po_qty
                            name
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                    name: argData.name,
                },
            });
            console.log(
                "a_inventory_begin_raw INSERT:",
                JSON.stringify(data.createa_inventory_begin_raw),
            );
            return data.createa_inventory_begin_raw;
        } catch (e) {
            console.log(
                "a_inventory_begin_raw INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation Updatea_inventory_begin_raw(
                        $updateAInventoryBeginRawId: Int!
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                        $name: String
                    ) {
                        updatea_inventory_begin_raw(
                            id: $updateAInventoryBeginRawId
                            po_cd: $poCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                            name: $name
                        ) {
                            id
                            po_cd
                            matl_cd
                            po_qty
                            name
                        }
                    }
                `,
                variables: {
                    updateAInventoryBeginRawId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                    name: argData.name,
                },
            });
            console.log(
                "a_inventory_begin_raw UPDATE:",
                JSON.stringify(data.updatea_inventory_begin_raw),
            );
            return data.updatea_inventory_begin_raw;
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
                    mutation Deletea_inventory_begin_raw(
                        $deleteAInventoryBeginRawId: Int!
                    ) {
                        deletea_inventory_begin_raw(
                            id: $deleteAInventoryBeginRawId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryBeginRawId: argData.id,
                },
            });
            console.log(
                "a_inventory_begin_raw DELETE:",
                JSON.stringify(data.deletea_inventory_begin_raw),
            );
            return data.deletea_inventory_begin_raw;
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
                    mutation MgrAInventoryBeginRawDeletes(
                        $ids: [InputMgrAInventoryBeginRawDeletes!]!
                    ) {
                        mgrAInventoryBeginRawDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_inventory_begin_raw DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
