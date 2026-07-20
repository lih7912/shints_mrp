/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_V_CUSTOM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_V_CUSTOM {
                        allQueryKCD_V_CUSTOM {
                            id
                            V_CUSTOM_CD
                            V_CUSTOM_NAME
                        }
                    }
                `,
            });
            console.log(
                "KCD_V_CUSTOM:",
                JSON.stringify(data.allQueryKCD_V_CUSTOM.length),
            );
            return data.allQueryKCD_V_CUSTOM;
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
                    query MgrKcdVCustomQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdVCustomQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            V_CUSTOM_CD
                            V_CUSTOM_NAME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_V_CUSTOM:",
                JSON.stringify(data.mgrKcdVCustomQuery.length),
            );
            return data.mgrKcdVCustomQuery;
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
                    mutation CreateKCD_V_CUSTOM(
                        $vCustomCd: String
                        $vCustomName: String
                    ) {
                        createKCD_V_CUSTOM(
                            V_CUSTOM_CD: $vCustomCd
                            V_CUSTOM_NAME: $vCustomName
                        ) {
                            V_CUSTOM_CD
                            V_CUSTOM_NAME
                        }
                    }
                `,
                variables: {
                    vCustomCd: argData.V_CUSTOM_CD,
                    vCustomName: argData.V_CUSTOM_NAME,
                },
            });
            console.log(
                "KCD_V_CUSTOM INSERT:",
                JSON.stringify(data.createKCD_V_CUSTOM),
            );
            return data.createKCD_V_CUSTOM;
        } catch (e) {
            console.log("KCD_V_CUSTOM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_V_CUSTOM(
                        $updateKcdVCustomId: Int!
                        $vCustomCd: String
                        $vCustomName: String
                    ) {
                        updateKCD_V_CUSTOM(
                            id: $updateKcdVCustomId
                            V_CUSTOM_CD: $vCustomCd
                            V_CUSTOM_NAME: $vCustomName
                        ) {
                            id
                            V_CUSTOM_CD
                            V_CUSTOM_NAME
                        }
                    }
                `,
                variables: {
                    updateKcdVCustomId: argData.id,
                    vCustomCd: argData.V_CUSTOM_CD,
                    vCustomName: argData.V_CUSTOM_NAME,
                },
            });
            console.log(
                "KCD_V_CUSTOM UPDATE:",
                JSON.stringify(data.updateKCD_V_CUSTOM),
            );
            return data.updateKCD_V_CUSTOM;
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
                    mutation DeleteKCD_V_CUSTOM($deleteKcdVCustomId: Int!) {
                        deleteKCD_V_CUSTOM(id: $deleteKcdVCustomId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdVCustomId: argData.id,
                },
            });
            console.log(
                "KCD_V_CUSTOM DELETE:",
                JSON.stringify(data.deleteKCD_V_CUSTOM),
            );
            return data.deleteKCD_V_CUSTOM;
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
                    mutation MgrKcdVCustomDeletes(
                        $ids: [InputMgrKcdVCustomDeletes!]!
                    ) {
                        mgrKcdVCustomDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_V_CUSTOM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
