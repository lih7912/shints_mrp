/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_TEAM_EMAIL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_TEAM_EMAIL {
                        allQueryKCD_TEAM_EMAIL {
                            id
                            BUYER_TEAM
                            TEAM_EMAIL
                        }
                    }
                `,
            });
            console.log(
                "KCD_TEAM_EMAIL:",
                JSON.stringify(data.allQueryKCD_TEAM_EMAIL.length),
            );
            return data.allQueryKCD_TEAM_EMAIL;
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
                    query MgrKcdTeamEmailQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdTeamEmailQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_TEAM
                            TEAM_EMAIL
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_TEAM_EMAIL:",
                JSON.stringify(data.mgrKcdTeamEmailQuery.length),
            );
            return data.mgrKcdTeamEmailQuery;
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
                    mutation CreateKCD_TEAM_EMAIL(
                        $buyerTeam: String
                        $teamEmail: String
                    ) {
                        createKCD_TEAM_EMAIL(
                            BUYER_TEAM: $buyerTeam
                            TEAM_EMAIL: $teamEmail
                        ) {
                            BUYER_TEAM
                            TEAM_EMAIL
                        }
                    }
                `,
                variables: {
                    buyerTeam: argData.BUYER_TEAM,
                    teamEmail: argData.TEAM_EMAIL,
                },
            });
            console.log(
                "KCD_TEAM_EMAIL INSERT:",
                JSON.stringify(data.createKCD_TEAM_EMAIL),
            );
            return data.createKCD_TEAM_EMAIL;
        } catch (e) {
            console.log("KCD_TEAM_EMAIL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_TEAM_EMAIL(
                        $updateKcdTeamEmailId: Int!
                        $buyerTeam: String
                        $teamEmail: String
                    ) {
                        updateKCD_TEAM_EMAIL(
                            id: $updateKcdTeamEmailId
                            BUYER_TEAM: $buyerTeam
                            TEAM_EMAIL: $teamEmail
                        ) {
                            id
                            BUYER_TEAM
                            TEAM_EMAIL
                        }
                    }
                `,
                variables: {
                    updateKcdTeamEmailId: argData.id,
                    buyerTeam: argData.BUYER_TEAM,
                    teamEmail: argData.TEAM_EMAIL,
                },
            });
            console.log(
                "KCD_TEAM_EMAIL UPDATE:",
                JSON.stringify(data.updateKCD_TEAM_EMAIL),
            );
            return data.updateKCD_TEAM_EMAIL;
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
                    mutation DeleteKCD_TEAM_EMAIL($deleteKcdTeamEmailId: Int!) {
                        deleteKCD_TEAM_EMAIL(id: $deleteKcdTeamEmailId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdTeamEmailId: argData.id,
                },
            });
            console.log(
                "KCD_TEAM_EMAIL DELETE:",
                JSON.stringify(data.deleteKCD_TEAM_EMAIL),
            );
            return data.deleteKCD_TEAM_EMAIL;
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
                    mutation MgrKcdTeamEmailDeletes(
                        $ids: [InputMgrKcdTeamEmailDeletes!]!
                    ) {
                        mgrKcdTeamEmailDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_TEAM_EMAIL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
