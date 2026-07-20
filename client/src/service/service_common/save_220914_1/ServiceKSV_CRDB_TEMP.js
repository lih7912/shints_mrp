/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CRDB_TEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CRDB_TEMP {
                        allQueryKSV_CRDB_TEMP {
                            id
                            USER_ID
                            CRDB_CD
                            CHARGER
                            STATUS_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_CRDB_TEMP:",
                JSON.stringify(data.allQueryKSV_CRDB_TEMP.length),
            );
            return data.allQueryKSV_CRDB_TEMP;
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
                    query MgrKsvCrdbTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCrdbTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            CRDB_CD
                            CHARGER
                            STATUS_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CRDB_TEMP:",
                JSON.stringify(data.mgrKsvCrdbTempQuery.length),
            );
            return data.mgrKsvCrdbTempQuery;
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
                    mutation CreateKSV_CRDB_TEMP(
                        $userId: String
                        $crdbCd: String
                        $charger: String
                        $statusCd: String
                    ) {
                        createKSV_CRDB_TEMP(
                            USER_ID: $userId
                            CRDB_CD: $crdbCd
                            CHARGER: $charger
                            STATUS_CD: $statusCd
                        ) {
                            USER_ID
                            CRDB_CD
                            CHARGER
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    crdbCd: argData.CRDB_CD,
                    charger: argData.CHARGER,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "KSV_CRDB_TEMP INSERT:",
                JSON.stringify(data.createKSV_CRDB_TEMP),
            );
            return data.createKSV_CRDB_TEMP;
        } catch (e) {
            console.log("KSV_CRDB_TEMP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CRDB_TEMP(
                        $updateKsvCrdbTempId: Int!
                        $userId: String
                        $crdbCd: String
                        $charger: String
                        $statusCd: String
                    ) {
                        updateKSV_CRDB_TEMP(
                            id: $updateKsvCrdbTempId
                            USER_ID: $userId
                            CRDB_CD: $crdbCd
                            CHARGER: $charger
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            CRDB_CD
                            CHARGER
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    updateKsvCrdbTempId: argData.id,
                    userId: argData.USER_ID,
                    crdbCd: argData.CRDB_CD,
                    charger: argData.CHARGER,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "KSV_CRDB_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_CRDB_TEMP),
            );
            return data.updateKSV_CRDB_TEMP;
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
                    mutation DeleteKSV_CRDB_TEMP($deleteKsvCrdbTempId: Int!) {
                        deleteKSV_CRDB_TEMP(id: $deleteKsvCrdbTempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCrdbTempId: argData.id,
                },
            });
            console.log(
                "KSV_CRDB_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_CRDB_TEMP),
            );
            return data.deleteKSV_CRDB_TEMP;
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
                    mutation MgrKsvCrdbTempDeletes(
                        $ids: [InputMgrKsvCrdbTempDeletes!]!
                    ) {
                        mgrKsvCrdbTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CRDB_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
