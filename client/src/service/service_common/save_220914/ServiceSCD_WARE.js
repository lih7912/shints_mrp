/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_WARE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_WARE {
                        allQuerySCD_WARE {
                            id
                            WARE_CD
                            WARE_NAME
                            WARE_PLACE
                        }
                    }
                `,
            });
            console.log(
                "SCD_WARE:",
                JSON.stringify(data.allQuerySCD_WARE.length),
            );
            return data.allQuerySCD_WARE;
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
                    query MgrScdWareQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdWareQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            WARE_CD
                            WARE_NAME
                            WARE_PLACE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_WARE:",
                JSON.stringify(data.mgrScdWareQuery.length),
            );
            return data.mgrScdWareQuery;
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
                    mutation CreateSCD_WARE(
                        $wareCd: String
                        $wareName: String
                        $warePlace: String
                    ) {
                        createSCD_WARE(
                            WARE_CD: $wareCd
                            WARE_NAME: $wareName
                            WARE_PLACE: $warePlace
                        ) {
                            WARE_CD
                            WARE_NAME
                            WARE_PLACE
                        }
                    }
                `,
                variables: {
                    wareCd: argData.WARE_CD,
                    wareName: argData.WARE_NAME,
                    warePlace: argData.WARE_PLACE,
                },
            });
            console.log(
                "SCD_WARE INSERT:",
                JSON.stringify(data.createSCD_WARE),
            );
            return data.createSCD_WARE;
        } catch (e) {
            console.log("SCD_WARE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_WARE(
                        $updateScdWareId: Int!
                        $wareCd: String
                        $wareName: String
                        $warePlace: String
                    ) {
                        updateSCD_WARE(
                            id: $updateScdWareId
                            WARE_CD: $wareCd
                            WARE_NAME: $wareName
                            WARE_PLACE: $warePlace
                        ) {
                            id
                            WARE_CD
                            WARE_NAME
                            WARE_PLACE
                        }
                    }
                `,
                variables: {
                    updateScdWareId: argData.id,
                    wareCd: argData.WARE_CD,
                    wareName: argData.WARE_NAME,
                    warePlace: argData.WARE_PLACE,
                },
            });
            console.log(
                "SCD_WARE UPDATE:",
                JSON.stringify(data.updateSCD_WARE),
            );
            return data.updateSCD_WARE;
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
                    mutation DeleteSCD_WARE($deleteScdWareId: Int!) {
                        deleteSCD_WARE(id: $deleteScdWareId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdWareId: argData.id,
                },
            });
            console.log(
                "SCD_WARE DELETE:",
                JSON.stringify(data.deleteSCD_WARE),
            );
            return data.deleteSCD_WARE;
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
                    mutation MgrScdWareDeletes(
                        $ids: [InputMgrScdWareDeletes!]!
                    ) {
                        mgrScdWareDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_WARE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
