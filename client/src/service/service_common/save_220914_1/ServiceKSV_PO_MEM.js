/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MEM {
                        allQueryKSV_PO_MEM {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            CONS_F
                            CONS_A
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MEM:",
                JSON.stringify(data.allQueryKSV_PO_MEM.length),
            );
            return data.allQueryKSV_PO_MEM;
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
                    query MgrKsvPoMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            CONS_F
                            CONS_A
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MEM:",
                JSON.stringify(data.mgrKsvPoMemQuery.length),
            );
            return data.mgrKsvPoMemQuery;
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
                    mutation CreateKSV_PO_MEM(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $consF: String
                        $consA: String
                    ) {
                        createKSV_PO_MEM(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            CONS_F: $consF
                            CONS_A: $consA
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            CONS_F
                            CONS_A
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    consF: argData.CONS_F,
                    consA: argData.CONS_A,
                },
            });
            console.log(
                "KSV_PO_MEM INSERT:",
                JSON.stringify(data.createKSV_PO_MEM),
            );
            return data.createKSV_PO_MEM;
        } catch (e) {
            console.log("KSV_PO_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MEM(
                        $updateKsvPoMemId: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $consF: String
                        $consA: String
                    ) {
                        updateKSV_PO_MEM(
                            id: $updateKsvPoMemId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            CONS_F: $consF
                            CONS_A: $consA
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            CONS_F
                            CONS_A
                        }
                    }
                `,
                variables: {
                    updateKsvPoMemId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    consF: argData.CONS_F,
                    consA: argData.CONS_A,
                },
            });
            console.log(
                "KSV_PO_MEM UPDATE:",
                JSON.stringify(data.updateKSV_PO_MEM),
            );
            return data.updateKSV_PO_MEM;
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
                    mutation DeleteKSV_PO_MEM($deleteKsvPoMemId: Int!) {
                        deleteKSV_PO_MEM(id: $deleteKsvPoMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMemId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MEM DELETE:",
                JSON.stringify(data.deleteKSV_PO_MEM),
            );
            return data.deleteKSV_PO_MEM;
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
                    mutation MgrKsvPoMemDeletes(
                        $ids: [InputMgrKsvPoMemDeletes!]!
                    ) {
                        mgrKsvPoMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
