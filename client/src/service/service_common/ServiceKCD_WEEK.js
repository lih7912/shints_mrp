/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_WEEK {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_WEEK {
                        allQueryKCD_WEEK {
                            id
                            WEEK
                            START_DATE
                            END_DATE
                        }
                    }
                `,
            });
            console.log(
                "KCD_WEEK:",
                JSON.stringify(data.allQueryKCD_WEEK.length),
            );
            return data.allQueryKCD_WEEK;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdWeekQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdWeekQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            WEEK
                            START_DATE
                            END_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_WEEK:",
                JSON.stringify(data.mgrKcdWeekQuery.length),
            );
            return data.mgrKcdWeekQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKCD_WEEK(
                        $week: Int
                        $startDate: String
                        $endDate: String
                    ) {
                        createKCD_WEEK(
                            WEEK: $week
                            START_DATE: $startDate
                            END_DATE: $endDate
                        ) {
                            WEEK
                            START_DATE
                            END_DATE
                        }
                    }
                `,
                variables: {
                    week: argData.WEEK,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                },
            });
            console.log(
                "KCD_WEEK INSERT:",
                JSON.stringify(data.createKCD_WEEK),
            );
            return data.createKCD_WEEK;
        } catch (e) {
            console.log("KCD_WEEK INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_WEEK(
                        $updateKcdWeekId: Int!
                        $week: Int
                        $startDate: String
                        $endDate: String
                    ) {
                        updateKCD_WEEK(
                            id: $updateKcdWeekId
                            WEEK: $week
                            START_DATE: $startDate
                            END_DATE: $endDate
                        ) {
                            id
                            WEEK
                            START_DATE
                            END_DATE
                        }
                    }
                `,
                variables: {
                    updateKcdWeekId: argData.id,
                    week: argData.WEEK,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                },
            });
            console.log(
                "KCD_WEEK UPDATE:",
                JSON.stringify(data.updateKCD_WEEK),
            );
            return data.updateKCD_WEEK;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKCD_WEEK($deleteKcdWeekId: Int!) {
                        deleteKCD_WEEK(id: $deleteKcdWeekId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdWeekId: argData.id,
                },
            });
            console.log(
                "KCD_WEEK DELETE:",
                JSON.stringify(data.deleteKCD_WEEK),
            );
            return data.deleteKCD_WEEK;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                    mutation MgrKcdWeekDeletes(
                        $ids: [InputMgrKcdWeekDeletes!]!
                    ) {
                        mgrKcdWeekDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_WEEK DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
