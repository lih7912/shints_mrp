/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicea_inventory_begin_stock {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory_begin_stock {
                        allQuerya_inventory_begin_stock {
                            id
                            po_cd
                            matl_cd
                            po_qty
                            name
                            out_qty
                            matl_seq
                        }
                    }
                `,
            });
            console.log(
                "a_inventory_begin_stock:",
                JSON.stringify(data.allQuerya_inventory_begin_stock.length),
            );
            return data.allQuerya_inventory_begin_stock;
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
                    query MgrAInventoryBeginStockQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryBeginStockQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            matl_cd
                            po_qty
                            name
                            out_qty
                            matl_seq
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_inventory_begin_stock:",
                JSON.stringify(data.mgrAInventoryBeginStockQuery.length),
            );
            return data.mgrAInventoryBeginStockQuery;
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
                    mutation Createa_inventory_begin_stock(
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                        $name: String
                        $outQty: Float
                        $matlSeq: Int
                    ) {
                        createa_inventory_begin_stock(
                            po_cd: $poCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                            name: $name
                            out_qty: $outQty
                            matl_seq: $matlSeq
                        ) {
                            po_cd
                            matl_cd
                            po_qty
                            name
                            out_qty
                            matl_seq
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                    name: argData.name,
                    outQty: argData.out_qty,
                    matlSeq: argData.matl_seq,
                },
            });
            console.log(
                "a_inventory_begin_stock INSERT:",
                JSON.stringify(data.createa_inventory_begin_stock),
            );
            return data.createa_inventory_begin_stock;
        } catch (e) {
            console.log(
                "a_inventory_begin_stock INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatea_inventory_begin_stock(
                        $updateAInventoryBeginStockId: Int!
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                        $name: String
                        $outQty: Float
                        $matlSeq: Int
                    ) {
                        updatea_inventory_begin_stock(
                            id: $updateAInventoryBeginStockId
                            po_cd: $poCd
                            matl_cd: $matlCd
                            po_qty: $poQty
                            name: $name
                            out_qty: $outQty
                            matl_seq: $matlSeq
                        ) {
                            id
                            po_cd
                            matl_cd
                            po_qty
                            name
                            out_qty
                            matl_seq
                        }
                    }
                `,
                variables: {
                    updateAInventoryBeginStockId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                    name: argData.name,
                    outQty: argData.out_qty,
                    matlSeq: argData.matl_seq,
                },
            });
            console.log(
                "a_inventory_begin_stock UPDATE:",
                JSON.stringify(data.updatea_inventory_begin_stock),
            );
            return data.updatea_inventory_begin_stock;
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
                    mutation Deletea_inventory_begin_stock(
                        $deleteAInventoryBeginStockId: Int!
                    ) {
                        deletea_inventory_begin_stock(
                            id: $deleteAInventoryBeginStockId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryBeginStockId: argData.id,
                },
            });
            console.log(
                "a_inventory_begin_stock DELETE:",
                JSON.stringify(data.deletea_inventory_begin_stock),
            );
            return data.deletea_inventory_begin_stock;
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
                    mutation MgrAInventoryBeginStockDeletes(
                        $ids: [InputMgrAInventoryBeginStockDeletes!]!
                    ) {
                        mgrAInventoryBeginStockDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "a_inventory_begin_stock DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
