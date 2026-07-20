/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_inventory_begin_finish {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_inventory_begin_finish {
                        allQuerya_inventory_begin_finish {
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
                "a_inventory_begin_finish:",
                JSON.stringify(data.allQuerya_inventory_begin_finish.length),
            );
            return data.allQuerya_inventory_begin_finish;
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
                    query MgrAInventoryBeginFinishQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAInventoryBeginFinishQuery(
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
                "a_inventory_begin_finish:",
                JSON.stringify(data.mgrAInventoryBeginFinishQuery.length),
            );
            return data.mgrAInventoryBeginFinishQuery;
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
                    mutation Createa_inventory_begin_finish(
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                        $name: String
                    ) {
                        createa_inventory_begin_finish(
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
                "a_inventory_begin_finish INSERT:",
                JSON.stringify(data.createa_inventory_begin_finish),
            );
            return data.createa_inventory_begin_finish;
        } catch (e) {
            console.log(
                "a_inventory_begin_finish INSERT ERROR:",
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
                    mutation Updatea_inventory_begin_finish(
                        $updateAInventoryBeginFinishId: Int!
                        $poCd: String
                        $matlCd: String
                        $poQty: Float
                        $name: String
                    ) {
                        updatea_inventory_begin_finish(
                            id: $updateAInventoryBeginFinishId
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
                    updateAInventoryBeginFinishId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    poQty: argData.po_qty,
                    name: argData.name,
                },
            });
            console.log(
                "a_inventory_begin_finish UPDATE:",
                JSON.stringify(data.updatea_inventory_begin_finish),
            );
            return data.updatea_inventory_begin_finish;
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
                    mutation Deletea_inventory_begin_finish(
                        $deleteAInventoryBeginFinishId: Int!
                    ) {
                        deletea_inventory_begin_finish(
                            id: $deleteAInventoryBeginFinishId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAInventoryBeginFinishId: argData.id,
                },
            });
            console.log(
                "a_inventory_begin_finish DELETE:",
                JSON.stringify(data.deletea_inventory_begin_finish),
            );
            return data.deletea_inventory_begin_finish;
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
                    mutation MgrAInventoryBeginFinishDeletes(
                        $ids: [InputMgrAInventoryBeginFinishDeletes!]!
                    ) {
                        mgrAInventoryBeginFinishDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "a_inventory_begin_finish DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
