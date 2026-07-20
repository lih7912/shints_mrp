/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_STAT_END {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_STAT_END {
                        allQueryKZZ_STAT_END {
                            id
                            STAT_ID
                            YY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_STAT_END:",
                JSON.stringify(data.allQueryKZZ_STAT_END.length),
            );
            return data.allQueryKZZ_STAT_END;
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
                    query MgrKzzStatEndQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzStatEndQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STAT_ID
                            YY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_STAT_END:",
                JSON.stringify(data.mgrKzzStatEndQuery.length),
            );
            return data.mgrKzzStatEndQuery;
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
                    mutation CreateKZZ_STAT_END(
                        $statId: String
                        $yy: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_STAT_END(
                            STAT_ID: $statId
                            YY: $yy
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            STAT_ID
                            YY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    statId: argData.STAT_ID,
                    yy: argData.YY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_STAT_END INSERT:",
                JSON.stringify(data.createKZZ_STAT_END),
            );
            return data.createKZZ_STAT_END;
        } catch (e) {
            console.log("KZZ_STAT_END INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_STAT_END(
                        $updateKzzStatEndId: Int!
                        $statId: String
                        $yy: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_STAT_END(
                            id: $updateKzzStatEndId
                            STAT_ID: $statId
                            YY: $yy
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            STAT_ID
                            YY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzStatEndId: argData.id,
                    statId: argData.STAT_ID,
                    yy: argData.YY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_STAT_END UPDATE:",
                JSON.stringify(data.updateKZZ_STAT_END),
            );
            return data.updateKZZ_STAT_END;
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
                    mutation DeleteKZZ_STAT_END($deleteKzzStatEndId: Int!) {
                        deleteKZZ_STAT_END(id: $deleteKzzStatEndId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzStatEndId: argData.id,
                },
            });
            console.log(
                "KZZ_STAT_END DELETE:",
                JSON.stringify(data.deleteKZZ_STAT_END),
            );
            return data.deleteKZZ_STAT_END;
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
                    mutation MgrKzzStatEndDeletes(
                        $ids: [InputMgrKzzStatEndDeletes!]!
                    ) {
                        mgrKzzStatEndDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_STAT_END DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
