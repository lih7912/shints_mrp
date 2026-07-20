/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_po_qty {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_po_qty {
                        allQuerya_po_qty {
                            id
                            po_cd
                            mrp_seq
                            matl_cd
                        }
                    }
                `,
            });
            console.log(
                "a_po_qty:",
                JSON.stringify(data.allQuerya_po_qty.length),
            );
            return data.allQuerya_po_qty;
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
                    query MgrAPoQtyQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAPoQtyQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            mrp_seq
                            matl_cd
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_po_qty:",
                JSON.stringify(data.mgrAPoQtyQuery.length),
            );
            return data.mgrAPoQtyQuery;
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
                    mutation Createa_po_qty(
                        $poCd: String
                        $mrpSeq: Int
                        $matlCd: String
                    ) {
                        createa_po_qty(
                            po_cd: $poCd
                            mrp_seq: $mrpSeq
                            matl_cd: $matlCd
                        ) {
                            po_cd
                            mrp_seq
                            matl_cd
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    mrpSeq: argData.mrp_seq,
                    matlCd: argData.matl_cd,
                },
            });
            console.log(
                "a_po_qty INSERT:",
                JSON.stringify(data.createa_po_qty),
            );
            return data.createa_po_qty;
        } catch (e) {
            console.log("a_po_qty INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_po_qty(
                        $updateAPoQtyId: Int!
                        $poCd: String
                        $mrpSeq: Int
                        $matlCd: String
                    ) {
                        updatea_po_qty(
                            id: $updateAPoQtyId
                            po_cd: $poCd
                            mrp_seq: $mrpSeq
                            matl_cd: $matlCd
                        ) {
                            id
                            po_cd
                            mrp_seq
                            matl_cd
                        }
                    }
                `,
                variables: {
                    updateAPoQtyId: argData.id,
                    poCd: argData.po_cd,
                    mrpSeq: argData.mrp_seq,
                    matlCd: argData.matl_cd,
                },
            });
            console.log(
                "a_po_qty UPDATE:",
                JSON.stringify(data.updatea_po_qty),
            );
            return data.updatea_po_qty;
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
                    mutation Deletea_po_qty($deleteAPoQtyId: Int!) {
                        deletea_po_qty(id: $deleteAPoQtyId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAPoQtyId: argData.id,
                },
            });
            console.log(
                "a_po_qty DELETE:",
                JSON.stringify(data.deletea_po_qty),
            );
            return data.deletea_po_qty;
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
                    mutation MgrAPoQtyDeletes($ids: [InputMgrAPoQtyDeletes!]!) {
                        mgrAPoQtyDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_po_qty DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
