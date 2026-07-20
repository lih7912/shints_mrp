/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_DATE_TUE_FRI {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_DATE_TUE_FRI {
                        allQueryKCD_DATE_TUE_FRI {
                            id
                            TUE_FRI_DATE
                        }
                    }
                `,
            });
            console.log(
                "KCD_DATE_TUE_FRI:",
                JSON.stringify(data.allQueryKCD_DATE_TUE_FRI.length),
            );
            return data.allQueryKCD_DATE_TUE_FRI;
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
                    query MgrKcdDateTueFriQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdDateTueFriQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            TUE_FRI_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_DATE_TUE_FRI:",
                JSON.stringify(data.mgrKcdDateTueFriQuery.length),
            );
            return data.mgrKcdDateTueFriQuery;
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
                    mutation CreateKCD_DATE_TUE_FRI($tueFriDate: String) {
                        createKCD_DATE_TUE_FRI(TUE_FRI_DATE: $tueFriDate) {
                            TUE_FRI_DATE
                        }
                    }
                `,
                variables: {
                    tueFriDate: argData.TUE_FRI_DATE,
                },
            });
            console.log(
                "KCD_DATE_TUE_FRI INSERT:",
                JSON.stringify(data.createKCD_DATE_TUE_FRI),
            );
            return data.createKCD_DATE_TUE_FRI;
        } catch (e) {
            console.log("KCD_DATE_TUE_FRI INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_DATE_TUE_FRI(
                        $updateKcdDateTueFriId: Int!
                        $tueFriDate: String
                    ) {
                        updateKCD_DATE_TUE_FRI(
                            id: $updateKcdDateTueFriId
                            TUE_FRI_DATE: $tueFriDate
                        ) {
                            id
                            TUE_FRI_DATE
                        }
                    }
                `,
                variables: {
                    updateKcdDateTueFriId: argData.id,
                    tueFriDate: argData.TUE_FRI_DATE,
                },
            });
            console.log(
                "KCD_DATE_TUE_FRI UPDATE:",
                JSON.stringify(data.updateKCD_DATE_TUE_FRI),
            );
            return data.updateKCD_DATE_TUE_FRI;
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
                    mutation DeleteKCD_DATE_TUE_FRI(
                        $deleteKcdDateTueFriId: Int!
                    ) {
                        deleteKCD_DATE_TUE_FRI(id: $deleteKcdDateTueFriId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdDateTueFriId: argData.id,
                },
            });
            console.log(
                "KCD_DATE_TUE_FRI DELETE:",
                JSON.stringify(data.deleteKCD_DATE_TUE_FRI),
            );
            return data.deleteKCD_DATE_TUE_FRI;
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
                    mutation MgrKcdDateTueFriDeletes(
                        $ids: [InputMgrKcdDateTueFriDeletes!]!
                    ) {
                        mgrKcdDateTueFriDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_DATE_TUE_FRI DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
