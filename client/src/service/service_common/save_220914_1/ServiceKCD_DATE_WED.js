/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_DATE_WED {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_DATE_WED {
                        allQueryKCD_DATE_WED {
                            id
                            WED_DATE
                        }
                    }
                `,
            });
            console.log(
                "KCD_DATE_WED:",
                JSON.stringify(data.allQueryKCD_DATE_WED.length),
            );
            return data.allQueryKCD_DATE_WED;
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
                    query MgrKcdDateWedQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdDateWedQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            WED_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_DATE_WED:",
                JSON.stringify(data.mgrKcdDateWedQuery.length),
            );
            return data.mgrKcdDateWedQuery;
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
                    mutation CreateKCD_DATE_WED($wedDate: String) {
                        createKCD_DATE_WED(WED_DATE: $wedDate) {
                            WED_DATE
                        }
                    }
                `,
                variables: {
                    wedDate: argData.WED_DATE,
                },
            });
            console.log(
                "KCD_DATE_WED INSERT:",
                JSON.stringify(data.createKCD_DATE_WED),
            );
            return data.createKCD_DATE_WED;
        } catch (e) {
            console.log("KCD_DATE_WED INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_DATE_WED(
                        $updateKcdDateWedId: Int!
                        $wedDate: String
                    ) {
                        updateKCD_DATE_WED(
                            id: $updateKcdDateWedId
                            WED_DATE: $wedDate
                        ) {
                            id
                            WED_DATE
                        }
                    }
                `,
                variables: {
                    updateKcdDateWedId: argData.id,
                    wedDate: argData.WED_DATE,
                },
            });
            console.log(
                "KCD_DATE_WED UPDATE:",
                JSON.stringify(data.updateKCD_DATE_WED),
            );
            return data.updateKCD_DATE_WED;
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
                    mutation DeleteKCD_DATE_WED($deleteKcdDateWedId: Int!) {
                        deleteKCD_DATE_WED(id: $deleteKcdDateWedId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdDateWedId: argData.id,
                },
            });
            console.log(
                "KCD_DATE_WED DELETE:",
                JSON.stringify(data.deleteKCD_DATE_WED),
            );
            return data.deleteKCD_DATE_WED;
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
                    mutation MgrKcdDateWedDeletes(
                        $ids: [InputMgrKcdDateWedDeletes!]!
                    ) {
                        mgrKcdDateWedDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_DATE_WED DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
