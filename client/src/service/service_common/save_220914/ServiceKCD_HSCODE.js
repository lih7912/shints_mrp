/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_HSCODE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_HSCODE {
                        allQueryKCD_HSCODE {
                            id
                            HS_NO
                            HS_CD
                            HS_NAME
                        }
                    }
                `,
            });
            console.log(
                "KCD_HSCODE:",
                JSON.stringify(data.allQueryKCD_HSCODE.length),
            );
            return data.allQueryKCD_HSCODE;
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
                    query MgrKcdHscodeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdHscodeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            HS_NO
                            HS_CD
                            HS_NAME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_HSCODE:",
                JSON.stringify(data.mgrKcdHscodeQuery.length),
            );
            return data.mgrKcdHscodeQuery;
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
                    mutation CreateKCD_HSCODE(
                        $hsNo: String
                        $hsCd: String
                        $hsName: String
                    ) {
                        createKCD_HSCODE(
                            HS_NO: $hsNo
                            HS_CD: $hsCd
                            HS_NAME: $hsName
                        ) {
                            HS_NO
                            HS_CD
                            HS_NAME
                        }
                    }
                `,
                variables: {
                    hsNo: argData.HS_NO,
                    hsCd: argData.HS_CD,
                    hsName: argData.HS_NAME,
                },
            });
            console.log(
                "KCD_HSCODE INSERT:",
                JSON.stringify(data.createKCD_HSCODE),
            );
            return data.createKCD_HSCODE;
        } catch (e) {
            console.log("KCD_HSCODE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_HSCODE(
                        $updateKcdHscodeId: Int!
                        $hsNo: String
                        $hsCd: String
                        $hsName: String
                    ) {
                        updateKCD_HSCODE(
                            id: $updateKcdHscodeId
                            HS_NO: $hsNo
                            HS_CD: $hsCd
                            HS_NAME: $hsName
                        ) {
                            id
                            HS_NO
                            HS_CD
                            HS_NAME
                        }
                    }
                `,
                variables: {
                    updateKcdHscodeId: argData.id,
                    hsNo: argData.HS_NO,
                    hsCd: argData.HS_CD,
                    hsName: argData.HS_NAME,
                },
            });
            console.log(
                "KCD_HSCODE UPDATE:",
                JSON.stringify(data.updateKCD_HSCODE),
            );
            return data.updateKCD_HSCODE;
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
                    mutation DeleteKCD_HSCODE($deleteKcdHscodeId: Int!) {
                        deleteKCD_HSCODE(id: $deleteKcdHscodeId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdHscodeId: argData.id,
                },
            });
            console.log(
                "KCD_HSCODE DELETE:",
                JSON.stringify(data.deleteKCD_HSCODE),
            );
            return data.deleteKCD_HSCODE;
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
                    mutation MgrKcdHscodeDeletes(
                        $ids: [InputMgrKcdHscodeDeletes!]!
                    ) {
                        mgrKcdHscodeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_HSCODE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
