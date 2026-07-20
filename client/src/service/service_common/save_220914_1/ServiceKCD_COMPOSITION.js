/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_COMPOSITION {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_COMPOSITION {
                        allQueryKCD_COMPOSITION {
                            id
                            MATL_NAME
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                        }
                    }
                `,
            });
            console.log(
                "KCD_COMPOSITION:",
                JSON.stringify(data.allQueryKCD_COMPOSITION.length),
            );
            return data.allQueryKCD_COMPOSITION;
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
                    query MgrKcdCompositionQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCompositionQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_NAME
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_COMPOSITION:",
                JSON.stringify(data.mgrKcdCompositionQuery.length),
            );
            return data.mgrKcdCompositionQuery;
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
                    mutation CreateKCD_COMPOSITION(
                        $matlName: String
                        $comp1: String
                        $comp1Percent: Int
                        $comp2: String
                        $comp2Percent: Int
                        $comp3: String
                        $comp3Percent: Int
                        $comp4: String
                        $comp4Percent: Int
                    ) {
                        createKCD_COMPOSITION(
                            MATL_NAME: $matlName
                            COMP1: $comp1
                            COMP1_PERCENT: $comp1Percent
                            COMP2: $comp2
                            COMP2_PERCENT: $comp2Percent
                            COMP3: $comp3
                            COMP3_PERCENT: $comp3Percent
                            COMP4: $comp4
                            COMP4_PERCENT: $comp4Percent
                        ) {
                            MATL_NAME
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                        }
                    }
                `,
                variables: {
                    matlName: argData.MATL_NAME,
                    comp1: argData.COMP1,
                    comp1Percent: argData.COMP1_PERCENT,
                    comp2: argData.COMP2,
                    comp2Percent: argData.COMP2_PERCENT,
                    comp3: argData.COMP3,
                    comp3Percent: argData.COMP3_PERCENT,
                    comp4: argData.COMP4,
                    comp4Percent: argData.COMP4_PERCENT,
                },
            });
            console.log(
                "KCD_COMPOSITION INSERT:",
                JSON.stringify(data.createKCD_COMPOSITION),
            );
            return data.createKCD_COMPOSITION;
        } catch (e) {
            console.log("KCD_COMPOSITION INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_COMPOSITION(
                        $updateKcdCompositionId: Int!
                        $matlName: String
                        $comp1: String
                        $comp1Percent: Int
                        $comp2: String
                        $comp2Percent: Int
                        $comp3: String
                        $comp3Percent: Int
                        $comp4: String
                        $comp4Percent: Int
                    ) {
                        updateKCD_COMPOSITION(
                            id: $updateKcdCompositionId
                            MATL_NAME: $matlName
                            COMP1: $comp1
                            COMP1_PERCENT: $comp1Percent
                            COMP2: $comp2
                            COMP2_PERCENT: $comp2Percent
                            COMP3: $comp3
                            COMP3_PERCENT: $comp3Percent
                            COMP4: $comp4
                            COMP4_PERCENT: $comp4Percent
                        ) {
                            id
                            MATL_NAME
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                        }
                    }
                `,
                variables: {
                    updateKcdCompositionId: argData.id,
                    matlName: argData.MATL_NAME,
                    comp1: argData.COMP1,
                    comp1Percent: argData.COMP1_PERCENT,
                    comp2: argData.COMP2,
                    comp2Percent: argData.COMP2_PERCENT,
                    comp3: argData.COMP3,
                    comp3Percent: argData.COMP3_PERCENT,
                    comp4: argData.COMP4,
                    comp4Percent: argData.COMP4_PERCENT,
                },
            });
            console.log(
                "KCD_COMPOSITION UPDATE:",
                JSON.stringify(data.updateKCD_COMPOSITION),
            );
            return data.updateKCD_COMPOSITION;
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
                    mutation DeleteKCD_COMPOSITION(
                        $deleteKcdCompositionId: Int!
                    ) {
                        deleteKCD_COMPOSITION(id: $deleteKcdCompositionId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCompositionId: argData.id,
                },
            });
            console.log(
                "KCD_COMPOSITION DELETE:",
                JSON.stringify(data.deleteKCD_COMPOSITION),
            );
            return data.deleteKCD_COMPOSITION;
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
                    mutation MgrKcdCompositionDeletes(
                        $ids: [InputMgrKcdCompositionDeletes!]!
                    ) {
                        mgrKcdCompositionDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_COMPOSITION DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
