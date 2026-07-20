/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_abc {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_abc {
                        allQuerya_abc {
                            id
                            data1
                            data2
                            data3
                        }
                    }
                `,
            });
            console.log("a_abc:", JSON.stringify(data.allQuerya_abc.length));
            return data.allQuerya_abc;
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
                    query MgrAAbcQuery($bankName: String!, $statusCd: String!) {
                        mgrAAbcQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            data1
                            data2
                            data3
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("a_abc:", JSON.stringify(data.mgrAAbcQuery.length));
            return data.mgrAAbcQuery;
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
                    mutation Createa_abc(
                        $data1: String
                        $data2: String
                        $data3: String
                    ) {
                        createa_abc(
                            data1: $data1
                            data2: $data2
                            data3: $data3
                        ) {
                            data1
                            data2
                            data3
                        }
                    }
                `,
                variables: {
                    data1: argData.data1,
                    data2: argData.data2,
                    data3: argData.data3,
                },
            });
            console.log("a_abc INSERT:", JSON.stringify(data.createa_abc));
            return data.createa_abc;
        } catch (e) {
            console.log("a_abc INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_abc(
                        $updateAAbcId: Int!
                        $data1: String
                        $data2: String
                        $data3: String
                    ) {
                        updatea_abc(
                            id: $updateAAbcId
                            data1: $data1
                            data2: $data2
                            data3: $data3
                        ) {
                            id
                            data1
                            data2
                            data3
                        }
                    }
                `,
                variables: {
                    updateAAbcId: argData.id,
                    data1: argData.data1,
                    data2: argData.data2,
                    data3: argData.data3,
                },
            });
            console.log("a_abc UPDATE:", JSON.stringify(data.updatea_abc));
            return data.updatea_abc;
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
                    mutation Deletea_abc($deleteAAbcId: Int!) {
                        deletea_abc(id: $deleteAAbcId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAAbcId: argData.id,
                },
            });
            console.log("a_abc DELETE:", JSON.stringify(data.deletea_abc));
            return data.deletea_abc;
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
                    mutation MgrAAbcDeletes($ids: [InputMgrAAbcDeletes!]!) {
                        mgrAAbcDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_abc DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
