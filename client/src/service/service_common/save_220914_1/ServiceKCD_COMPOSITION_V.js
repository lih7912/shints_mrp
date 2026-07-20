/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_COMPOSITION_V {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_COMPOSITION_V {
                        allQueryKCD_COMPOSITION_V {
                            id
                            MATL_NAME
                            COMP1
                            SEQ
                        }
                    }
                `,
            });
            console.log(
                "KCD_COMPOSITION_V:",
                JSON.stringify(data.allQueryKCD_COMPOSITION_V.length),
            );
            return data.allQueryKCD_COMPOSITION_V;
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
                    query MgrKcdCompositionVQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCompositionVQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_NAME
                            COMP1
                            SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_COMPOSITION_V:",
                JSON.stringify(data.mgrKcdCompositionVQuery.length),
            );
            return data.mgrKcdCompositionVQuery;
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
                    mutation CreateKCD_COMPOSITION_V(
                        $matlName: String
                        $comp1: String
                        $seq: Int
                    ) {
                        createKCD_COMPOSITION_V(
                            MATL_NAME: $matlName
                            COMP1: $comp1
                            SEQ: $seq
                        ) {
                            MATL_NAME
                            COMP1
                            SEQ
                        }
                    }
                `,
                variables: {
                    matlName: argData.MATL_NAME,
                    comp1: argData.COMP1,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KCD_COMPOSITION_V INSERT:",
                JSON.stringify(data.createKCD_COMPOSITION_V),
            );
            return data.createKCD_COMPOSITION_V;
        } catch (e) {
            console.log("KCD_COMPOSITION_V INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_COMPOSITION_V(
                        $updateKcdCompositionVId: Int!
                        $matlName: String
                        $comp1: String
                        $seq: Int
                    ) {
                        updateKCD_COMPOSITION_V(
                            id: $updateKcdCompositionVId
                            MATL_NAME: $matlName
                            COMP1: $comp1
                            SEQ: $seq
                        ) {
                            id
                            MATL_NAME
                            COMP1
                            SEQ
                        }
                    }
                `,
                variables: {
                    updateKcdCompositionVId: argData.id,
                    matlName: argData.MATL_NAME,
                    comp1: argData.COMP1,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KCD_COMPOSITION_V UPDATE:",
                JSON.stringify(data.updateKCD_COMPOSITION_V),
            );
            return data.updateKCD_COMPOSITION_V;
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
                    mutation DeleteKCD_COMPOSITION_V(
                        $deleteKcdCompositionVId: Int!
                    ) {
                        deleteKCD_COMPOSITION_V(id: $deleteKcdCompositionVId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCompositionVId: argData.id,
                },
            });
            console.log(
                "KCD_COMPOSITION_V DELETE:",
                JSON.stringify(data.deleteKCD_COMPOSITION_V),
            );
            return data.deleteKCD_COMPOSITION_V;
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
                    mutation MgrKcdCompositionVDeletes(
                        $ids: [InputMgrKcdCompositionVDeletes!]!
                    ) {
                        mgrKcdCompositionVDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_COMPOSITION_V DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
