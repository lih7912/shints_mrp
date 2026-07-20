/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_CODE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_CODE {
                        allQuerySCD_CODE {
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
                "SCD_CODE:",
                JSON.stringify(data.allQuerySCD_CODE.length),
            );
            return data.allQuerySCD_CODE;
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
                    query MgrScdCodeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdCodeQuery(
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
                "SCD_CODE:",
                JSON.stringify(data.mgrScdCodeQuery.length),
            );
            return data.mgrScdCodeQuery;
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
                    mutation CreateSCD_CODE(
                        $cdGroup: String
                        $cdCode: String
                        $cdName: String
                        $cdFlag: String
                    ) {
                        createSCD_CODE(
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
                "SCD_CODE INSERT:",
                JSON.stringify(data.createSCD_CODE),
            );
            return data.createSCD_CODE;
        } catch (e) {
            console.log("SCD_CODE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_CODE(
                        $updateScdCodeId: Int!
                        $cdGroup: String
                        $cdCode: String
                        $cdName: String
                        $cdFlag: String
                    ) {
                        updateSCD_CODE(
                            id: $updateScdCodeId
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
                    updateScdCodeId: argData.id,
                    cdGroup: argData.CD_GROUP,
                    cdCode: argData.CD_CODE,
                    cdName: argData.CD_NAME,
                    cdFlag: argData.CD_FLAG,
                },
            });
            console.log(
                "SCD_CODE UPDATE:",
                JSON.stringify(data.updateSCD_CODE),
            );
            return data.updateSCD_CODE;
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
                    mutation DeleteSCD_CODE($deleteScdCodeId: Int!) {
                        deleteSCD_CODE(id: $deleteScdCodeId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdCodeId: argData.id,
                },
            });
            console.log(
                "SCD_CODE DELETE:",
                JSON.stringify(data.deleteSCD_CODE),
            );
            return data.deleteSCD_CODE;
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
                    mutation MgrScdCodeDeletes(
                        $ids: [InputMgrScdCodeDeletes!]!
                    ) {
                        mgrScdCodeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_CODE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
