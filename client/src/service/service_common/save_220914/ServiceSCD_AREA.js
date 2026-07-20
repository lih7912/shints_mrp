/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_AREA {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_AREA {
                        allQuerySCD_AREA {
                            id
                            AREA1
                            AREA2
                        }
                    }
                `,
            });
            console.log(
                "SCD_AREA:",
                JSON.stringify(data.allQuerySCD_AREA.length),
            );
            return data.allQuerySCD_AREA;
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
                    query MgrScdAreaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdAreaQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            AREA1
                            AREA2
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_AREA:",
                JSON.stringify(data.mgrScdAreaQuery.length),
            );
            return data.mgrScdAreaQuery;
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
                    mutation CreateSCD_AREA($area1: String, $area2: String) {
                        createSCD_AREA(AREA1: $area1, AREA2: $area2) {
                            AREA1
                            AREA2
                        }
                    }
                `,
                variables: {
                    area1: argData.AREA1,
                    area2: argData.AREA2,
                },
            });
            console.log(
                "SCD_AREA INSERT:",
                JSON.stringify(data.createSCD_AREA),
            );
            return data.createSCD_AREA;
        } catch (e) {
            console.log("SCD_AREA INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_AREA(
                        $updateScdAreaId: Int!
                        $area1: String
                        $area2: String
                    ) {
                        updateSCD_AREA(
                            id: $updateScdAreaId
                            AREA1: $area1
                            AREA2: $area2
                        ) {
                            id
                            AREA1
                            AREA2
                        }
                    }
                `,
                variables: {
                    updateScdAreaId: argData.id,
                    area1: argData.AREA1,
                    area2: argData.AREA2,
                },
            });
            console.log(
                "SCD_AREA UPDATE:",
                JSON.stringify(data.updateSCD_AREA),
            );
            return data.updateSCD_AREA;
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
                    mutation DeleteSCD_AREA($deleteScdAreaId: Int!) {
                        deleteSCD_AREA(id: $deleteScdAreaId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdAreaId: argData.id,
                },
            });
            console.log(
                "SCD_AREA DELETE:",
                JSON.stringify(data.deleteSCD_AREA),
            );
            return data.deleteSCD_AREA;
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
                    mutation MgrScdAreaDeletes(
                        $ids: [InputMgrScdAreaDeletes!]!
                    ) {
                        mgrScdAreaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_AREA DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
