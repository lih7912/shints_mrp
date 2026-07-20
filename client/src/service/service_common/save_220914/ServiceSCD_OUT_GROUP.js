/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_OUT_GROUP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_OUT_GROUP {
                        allQuerySCD_OUT_GROUP {
                            id
                            OUT_NO
                            OUT_KIND
                            OUT_CODE
                        }
                    }
                `,
            });
            console.log(
                "SCD_OUT_GROUP:",
                JSON.stringify(data.allQuerySCD_OUT_GROUP.length),
            );
            return data.allQuerySCD_OUT_GROUP;
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
                    query MgrScdOutGroupQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdOutGroupQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            OUT_NO
                            OUT_KIND
                            OUT_CODE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_OUT_GROUP:",
                JSON.stringify(data.mgrScdOutGroupQuery.length),
            );
            return data.mgrScdOutGroupQuery;
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
                    mutation CreateSCD_OUT_GROUP(
                        $outNo: Int
                        $outKind: String
                        $outCode: String
                    ) {
                        createSCD_OUT_GROUP(
                            OUT_NO: $outNo
                            OUT_KIND: $outKind
                            OUT_CODE: $outCode
                        ) {
                            OUT_NO
                            OUT_KIND
                            OUT_CODE
                        }
                    }
                `,
                variables: {
                    outNo: argData.OUT_NO,
                    outKind: argData.OUT_KIND,
                    outCode: argData.OUT_CODE,
                },
            });
            console.log(
                "SCD_OUT_GROUP INSERT:",
                JSON.stringify(data.createSCD_OUT_GROUP),
            );
            return data.createSCD_OUT_GROUP;
        } catch (e) {
            console.log("SCD_OUT_GROUP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_OUT_GROUP(
                        $updateScdOutGroupId: Int!
                        $outNo: Int
                        $outKind: String
                        $outCode: String
                    ) {
                        updateSCD_OUT_GROUP(
                            id: $updateScdOutGroupId
                            OUT_NO: $outNo
                            OUT_KIND: $outKind
                            OUT_CODE: $outCode
                        ) {
                            id
                            OUT_NO
                            OUT_KIND
                            OUT_CODE
                        }
                    }
                `,
                variables: {
                    updateScdOutGroupId: argData.id,
                    outNo: argData.OUT_NO,
                    outKind: argData.OUT_KIND,
                    outCode: argData.OUT_CODE,
                },
            });
            console.log(
                "SCD_OUT_GROUP UPDATE:",
                JSON.stringify(data.updateSCD_OUT_GROUP),
            );
            return data.updateSCD_OUT_GROUP;
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
                    mutation DeleteSCD_OUT_GROUP($deleteScdOutGroupId: Int!) {
                        deleteSCD_OUT_GROUP(id: $deleteScdOutGroupId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdOutGroupId: argData.id,
                },
            });
            console.log(
                "SCD_OUT_GROUP DELETE:",
                JSON.stringify(data.deleteSCD_OUT_GROUP),
            );
            return data.deleteSCD_OUT_GROUP;
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
                    mutation MgrScdOutGroupDeletes(
                        $ids: [InputMgrScdOutGroupDeletes!]!
                    ) {
                        mgrScdOutGroupDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_OUT_GROUP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
