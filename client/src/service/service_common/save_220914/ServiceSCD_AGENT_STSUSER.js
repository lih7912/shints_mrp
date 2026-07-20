/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_AGENT_STSUSER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_AGENT_STSUSER {
                        allQuerySCD_AGENT_STSUSER {
                            id
                            AGENT_CD
                            START_DATE
                            SHINTS_USER
                        }
                    }
                `,
            });
            console.log(
                "SCD_AGENT_STSUSER:",
                JSON.stringify(data.allQuerySCD_AGENT_STSUSER.length),
            );
            return data.allQuerySCD_AGENT_STSUSER;
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
                    query MgrScdAgentStsuserQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdAgentStsuserQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            AGENT_CD
                            START_DATE
                            SHINTS_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_AGENT_STSUSER:",
                JSON.stringify(data.mgrScdAgentStsuserQuery.length),
            );
            return data.mgrScdAgentStsuserQuery;
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
                    mutation CreateSCD_AGENT_STSUSER(
                        $agentCd: String
                        $startDate: String
                        $shintsUser: String
                    ) {
                        createSCD_AGENT_STSUSER(
                            AGENT_CD: $agentCd
                            START_DATE: $startDate
                            SHINTS_USER: $shintsUser
                        ) {
                            AGENT_CD
                            START_DATE
                            SHINTS_USER
                        }
                    }
                `,
                variables: {
                    agentCd: argData.AGENT_CD,
                    startDate: argData.START_DATE,
                    shintsUser: argData.SHINTS_USER,
                },
            });
            console.log(
                "SCD_AGENT_STSUSER INSERT:",
                JSON.stringify(data.createSCD_AGENT_STSUSER),
            );
            return data.createSCD_AGENT_STSUSER;
        } catch (e) {
            console.log("SCD_AGENT_STSUSER INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_AGENT_STSUSER(
                        $updateScdAgentStsuserId: Int!
                        $agentCd: String
                        $startDate: String
                        $shintsUser: String
                    ) {
                        updateSCD_AGENT_STSUSER(
                            id: $updateScdAgentStsuserId
                            AGENT_CD: $agentCd
                            START_DATE: $startDate
                            SHINTS_USER: $shintsUser
                        ) {
                            id
                            AGENT_CD
                            START_DATE
                            SHINTS_USER
                        }
                    }
                `,
                variables: {
                    updateScdAgentStsuserId: argData.id,
                    agentCd: argData.AGENT_CD,
                    startDate: argData.START_DATE,
                    shintsUser: argData.SHINTS_USER,
                },
            });
            console.log(
                "SCD_AGENT_STSUSER UPDATE:",
                JSON.stringify(data.updateSCD_AGENT_STSUSER),
            );
            return data.updateSCD_AGENT_STSUSER;
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
                    mutation DeleteSCD_AGENT_STSUSER(
                        $deleteScdAgentStsuserId: Int!
                    ) {
                        deleteSCD_AGENT_STSUSER(id: $deleteScdAgentStsuserId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdAgentStsuserId: argData.id,
                },
            });
            console.log(
                "SCD_AGENT_STSUSER DELETE:",
                JSON.stringify(data.deleteSCD_AGENT_STSUSER),
            );
            return data.deleteSCD_AGENT_STSUSER;
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
                    mutation MgrScdAgentStsuserDeletes(
                        $ids: [InputMgrScdAgentStsuserDeletes!]!
                    ) {
                        mgrScdAgentStsuserDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_AGENT_STSUSER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
