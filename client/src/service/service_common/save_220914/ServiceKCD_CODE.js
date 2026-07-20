/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_CODE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_CODE {
                        allQueryKCD_CODE {
                            id
                            CD_GROUP
                            CD_CODE
                            CD_NAME
                            CD_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KCD_CODE:",
                JSON.stringify(data.allQueryKCD_CODE.length),
            );
            return data.allQueryKCD_CODE;
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
                    query MgrKcdCodeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCodeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CD_GROUP
                            CD_CODE
                            CD_NAME
                            CD_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_CODE:",
                JSON.stringify(data.mgrKcdCodeQuery.length),
            );
            return data.mgrKcdCodeQuery;
        } catch (e) {
            return e;
        }
    }

    async getDatasGroup(qryGroup) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QryGroupKCD_CODE($cdGroup: String!) {
                        qryGroupKCD_CODE(CD_GROUP: $cdGroup) {
                            id
                            CD_GROUP
                            CD_CODE
                            CD_NAME
                            CD_FLAG
                        }
                    }
                `,
                variables: { cdGroup: qryGroup },
            });
            console.log(
                "KCD_CODE_GROUP:",
                JSON.stringify(data.qryGroupKCD_CODE.length),
            );
            return data.qryGroupKCD_CODE;
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
                    mutation CreateKCD_CODE(
                        $cdGroup: String
                        $cdCode: String
                        $cdName: String
                        $cdFlag: String
                    ) {
                        createKCD_CODE(
                            CD_GROUP: $cdGroup
                            CD_CODE: $cdCode
                            CD_NAME: $cdName
                            CD_FLAG: $cdFlag
                        ) {
                            CD_GROUP
                            CD_CODE
                            CD_NAME
                            CD_FLAG
                        }
                    }
                `,
                variables: {
                    cdGroup: argData.CD_GROUP,
                    cdCode: argData.CD_CODE,
                    cdName: argData.CD_NAME,
                    cdFlag: argData.CD_FLAG,
                },
            });
            console.log(
                "KCD_CODE INSERT:",
                JSON.stringify(data.createKCD_CODE),
            );
            return data.createKCD_CODE;
        } catch (e) {
            console.log("KCD_CODE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_CODE(
                        $updateKcdCodeId: Int!
                        $cdGroup: String
                        $cdCode: String
                        $cdName: String
                        $cdFlag: String
                    ) {
                        updateKCD_CODE(
                            id: $updateKcdCodeId
                            CD_GROUP: $cdGroup
                            CD_CODE: $cdCode
                            CD_NAME: $cdName
                            CD_FLAG: $cdFlag
                        ) {
                            id
                            CD_GROUP
                            CD_CODE
                            CD_NAME
                            CD_FLAG
                        }
                    }
                `,
                variables: {
                    updateKcdCodeId: argData.id,
                    cdGroup: argData.CD_GROUP,
                    cdCode: argData.CD_CODE,
                    cdName: argData.CD_NAME,
                    cdFlag: argData.CD_FLAG,
                },
            });
            console.log(
                "KCD_CODE UPDATE:",
                JSON.stringify(data.updateKCD_CODE),
            );
            return data.updateKCD_CODE;
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
                    mutation DeleteKCD_CODE($deleteKcdCodeId: Int!) {
                        deleteKCD_CODE(id: $deleteKcdCodeId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCodeId: argData.id,
                },
            });
            console.log(
                "KCD_CODE DELETE:",
                JSON.stringify(data.deleteKCD_CODE),
            );
            return data.deleteKCD_CODE;
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
                    mutation MgrKcdCodeDeletes(
                        $ids: [InputMgrKcdCodeDeletes!]!
                    ) {
                        mgrKcdCodeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_CODE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
