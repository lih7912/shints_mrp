/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_style {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_style {
                        allQuerya_style {
                            id
                            no
                            style
                            style_name
                        }
                    }
                `,
            });
            console.log(
                "a_style:",
                JSON.stringify(data.allQuerya_style.length),
            );
            return data.allQuerya_style;
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
                    query MgrAStyleQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAStyleQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            no
                            style
                            style_name
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("a_style:", JSON.stringify(data.mgrAStyleQuery.length));
            return data.mgrAStyleQuery;
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
                    mutation Createa_style(
                        $no: Int
                        $style: String
                        $styleName: String
                    ) {
                        createa_style(
                            no: $no
                            style: $style
                            style_name: $styleName
                        ) {
                            no
                            style
                            style_name
                        }
                    }
                `,
                variables: {
                    no: argData.no,
                    style: argData.style,
                    styleName: argData.style_name,
                },
            });
            console.log("a_style INSERT:", JSON.stringify(data.createa_style));
            return data.createa_style;
        } catch (e) {
            console.log("a_style INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_style(
                        $updateAStyleId: Int!
                        $no: Int
                        $style: String
                        $styleName: String
                    ) {
                        updatea_style(
                            id: $updateAStyleId
                            no: $no
                            style: $style
                            style_name: $styleName
                        ) {
                            id
                            no
                            style
                            style_name
                        }
                    }
                `,
                variables: {
                    updateAStyleId: argData.id,
                    no: argData.no,
                    style: argData.style,
                    styleName: argData.style_name,
                },
            });
            console.log("a_style UPDATE:", JSON.stringify(data.updatea_style));
            return data.updatea_style;
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
                    mutation Deletea_style($deleteAStyleId: Int!) {
                        deletea_style(id: $deleteAStyleId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAStyleId: argData.id,
                },
            });
            console.log("a_style DELETE:", JSON.stringify(data.deletea_style));
            return data.deletea_style;
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
                    mutation MgrAStyleDeletes($ids: [InputMgrAStyleDeletes!]!) {
                        mgrAStyleDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_style DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
