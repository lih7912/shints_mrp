/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BVT_WORKDAYS {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BVT_WORKDAYS {
                        allQueryKCD_BVT_WORKDAYS {
                            id
                            WDATE
                            HOLIDAY
                        }
                    }
                `,
            });
            console.log(
                "KCD_BVT_WORKDAYS:",
                JSON.stringify(data.allQueryKCD_BVT_WORKDAYS.length),
            );
            return data.allQueryKCD_BVT_WORKDAYS;
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
                    query MgrKcdBvtWorkdaysQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBvtWorkdaysQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            WDATE
                            HOLIDAY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BVT_WORKDAYS:",
                JSON.stringify(data.mgrKcdBvtWorkdaysQuery.length),
            );
            return data.mgrKcdBvtWorkdaysQuery;
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
                    mutation CreateKCD_BVT_WORKDAYS(
                        $wdate: String
                        $holiday: String
                    ) {
                        createKCD_BVT_WORKDAYS(
                            WDATE: $wdate
                            HOLIDAY: $holiday
                        ) {
                            WDATE
                            HOLIDAY
                        }
                    }
                `,
                variables: {
                    wdate: argData.WDATE,
                    holiday: argData.HOLIDAY,
                },
            });
            console.log(
                "KCD_BVT_WORKDAYS INSERT:",
                JSON.stringify(data.createKCD_BVT_WORKDAYS),
            );
            return data.createKCD_BVT_WORKDAYS;
        } catch (e) {
            console.log("KCD_BVT_WORKDAYS INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_BVT_WORKDAYS(
                        $updateKcdBvtWorkdaysId: Int!
                        $wdate: String
                        $holiday: String
                    ) {
                        updateKCD_BVT_WORKDAYS(
                            id: $updateKcdBvtWorkdaysId
                            WDATE: $wdate
                            HOLIDAY: $holiday
                        ) {
                            id
                            WDATE
                            HOLIDAY
                        }
                    }
                `,
                variables: {
                    updateKcdBvtWorkdaysId: argData.id,
                    wdate: argData.WDATE,
                    holiday: argData.HOLIDAY,
                },
            });
            console.log(
                "KCD_BVT_WORKDAYS UPDATE:",
                JSON.stringify(data.updateKCD_BVT_WORKDAYS),
            );
            return data.updateKCD_BVT_WORKDAYS;
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
                    mutation DeleteKCD_BVT_WORKDAYS(
                        $deleteKcdBvtWorkdaysId: Int!
                    ) {
                        deleteKCD_BVT_WORKDAYS(id: $deleteKcdBvtWorkdaysId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBvtWorkdaysId: argData.id,
                },
            });
            console.log(
                "KCD_BVT_WORKDAYS DELETE:",
                JSON.stringify(data.deleteKCD_BVT_WORKDAYS),
            );
            return data.deleteKCD_BVT_WORKDAYS;
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
                    mutation MgrKcdBvtWorkdaysDeletes(
                        $ids: [InputMgrKcdBvtWorkdaysDeletes!]!
                    ) {
                        mgrKcdBvtWorkdaysDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BVT_WORKDAYS DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
