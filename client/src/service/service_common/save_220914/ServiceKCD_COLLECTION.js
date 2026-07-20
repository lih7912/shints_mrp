/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_COLLECTION {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_COLLECTION {
                        allQueryKCD_COLLECTION {
                            id
                            COLLECTION
                        }
                    }
                `,
            });
            console.log(
                "KCD_COLLECTION:",
                JSON.stringify(data.allQueryKCD_COLLECTION.length),
            );
            return data.allQueryKCD_COLLECTION;
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
                    query MgrKcdCollectionQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCollectionQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            COLLECTION
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_COLLECTION:",
                JSON.stringify(data.mgrKcdCollectionQuery.length),
            );
            return data.mgrKcdCollectionQuery;
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
                    mutation CreateKCD_COLLECTION($collection: String) {
                        createKCD_COLLECTION(COLLECTION: $collection) {
                            COLLECTION
                        }
                    }
                `,
                variables: {
                    collection: argData.COLLECTION,
                },
            });
            console.log(
                "KCD_COLLECTION INSERT:",
                JSON.stringify(data.createKCD_COLLECTION),
            );
            return data.createKCD_COLLECTION;
        } catch (e) {
            console.log("KCD_COLLECTION INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_COLLECTION(
                        $updateKcdCollectionId: Int!
                        $collection: String
                    ) {
                        updateKCD_COLLECTION(
                            id: $updateKcdCollectionId
                            COLLECTION: $collection
                        ) {
                            id
                            COLLECTION
                        }
                    }
                `,
                variables: {
                    updateKcdCollectionId: argData.id,
                    collection: argData.COLLECTION,
                },
            });
            console.log(
                "KCD_COLLECTION UPDATE:",
                JSON.stringify(data.updateKCD_COLLECTION),
            );
            return data.updateKCD_COLLECTION;
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
                    mutation DeleteKCD_COLLECTION(
                        $deleteKcdCollectionId: Int!
                    ) {
                        deleteKCD_COLLECTION(id: $deleteKcdCollectionId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCollectionId: argData.id,
                },
            });
            console.log(
                "KCD_COLLECTION DELETE:",
                JSON.stringify(data.deleteKCD_COLLECTION),
            );
            return data.deleteKCD_COLLECTION;
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
                    mutation MgrKcdCollectionDeletes(
                        $ids: [InputMgrKcdCollectionDeletes!]!
                    ) {
                        mgrKcdCollectionDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_COLLECTION DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
