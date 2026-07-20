/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BUYER_TEAM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER_TEAM {
                        allQueryKCD_BUYER_TEAM {
                            id
                            BUYER_CD
                            CHANGED_DATETIME
                            BUYER_TEAM_AF
                            BUYER_TEAM_BF
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER_TEAM:",
                JSON.stringify(data.allQueryKCD_BUYER_TEAM.length),
            );
            return data.allQueryKCD_BUYER_TEAM;
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
                    query MgrKcdBuyerTeamQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerTeamQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            CHANGED_DATETIME
                            BUYER_TEAM_AF
                            BUYER_TEAM_BF
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER_TEAM:",
                JSON.stringify(data.mgrKcdBuyerTeamQuery.length),
            );
            return data.mgrKcdBuyerTeamQuery;
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
                    mutation CreateKCD_BUYER_TEAM(
                        $buyerCd: String!
                        $changedDatetime: String!
                        $buyerTeamAf: String!
                        $buyerTeamBf: String!
                    ) {
                        createKCD_BUYER_TEAM(
                            BUYER_CD: $buyerCd
                            CHANGED_DATETIME: $changedDatetime
                            BUYER_TEAM_AF: $buyerTeamAf
                            BUYER_TEAM_BF: $buyerTeamBf
                        ) {
                            BUYER_CD
                            CHANGED_DATETIME
                            BUYER_TEAM_AF
                            BUYER_TEAM_BF
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    changedDatetime: argData.CHANGED_DATETIME,
                    buyerTeamAf: argData.BUYER_TEAM_AF,
                    buyerTeamBf: argData.BUYER_TEAM_BF,
                },
            });
            console.log(
                "KCD_BUYER_TEAM INSERT:",
                JSON.stringify(data.createKCD_BUYER_TEAM),
            );
            return data.createKCD_BUYER_TEAM;
        } catch (e) {
            console.log("KCD_BUYER_TEAM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_BUYER_TEAM(
                        $updateKcdBuyerTeamId: Int!
                        $buyerCd: String!
                        $changedDatetime: String!
                        $buyerTeamAf: String!
                        $buyerTeamBf: String!
                    ) {
                        updateKCD_BUYER_TEAM(
                            id: $updateKcdBuyerTeamId
                            BUYER_CD: $buyerCd
                            CHANGED_DATETIME: $changedDatetime
                            BUYER_TEAM_AF: $buyerTeamAf
                            BUYER_TEAM_BF: $buyerTeamBf
                        ) {
                            id
                            BUYER_CD
                            CHANGED_DATETIME
                            BUYER_TEAM_AF
                            BUYER_TEAM_BF
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerTeamId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    changedDatetime: argData.CHANGED_DATETIME,
                    buyerTeamAf: argData.BUYER_TEAM_AF,
                    buyerTeamBf: argData.BUYER_TEAM_BF,
                },
            });
            console.log(
                "KCD_BUYER_TEAM UPDATE:",
                JSON.stringify(data.updateKCD_BUYER_TEAM),
            );
            return data.updateKCD_BUYER_TEAM;
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
                    mutation DeleteKCD_BUYER_TEAM($deleteKcdBuyerTeamId: Int!) {
                        deleteKCD_BUYER_TEAM(id: $deleteKcdBuyerTeamId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerTeamId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER_TEAM DELETE:",
                JSON.stringify(data.deleteKCD_BUYER_TEAM),
            );
            return data.deleteKCD_BUYER_TEAM;
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
                    mutation MgrKcdBuyerTeamDeletes(
                        $ids: [InputMgrKcdBuyerTeamDeletes!]!
                    ) {
                        mgrKcdBuyerTeamDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BUYER_TEAM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
