/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_CURR_COM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_CURR_COM {
                        allQueryKCD_CURR_COM {
                            id
                            START_DATE
                            CURR_CD
                            CURR_AMT
                            USD_RATE
                        }
                    }
                `,
            });
            console.log(
                "KCD_CURR_COM:",
                JSON.stringify(data.allQueryKCD_CURR_COM.length),
            );
            return data.allQueryKCD_CURR_COM;
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
                    query MgrKcdCurrComQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCurrComQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            START_DATE
                            CURR_CD
                            CURR_AMT
                            USD_RATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_CURR_COM:",
                JSON.stringify(data.mgrKcdCurrComQuery.length),
            );
            return data.mgrKcdCurrComQuery;
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
                    mutation CreateKCD_CURR_COM(
                        $startDate: String
                        $currCd: String
                        $currAmt: Float
                        $usdRate: Float
                    ) {
                        createKCD_CURR_COM(
                            START_DATE: $startDate
                            CURR_CD: $currCd
                            CURR_AMT: $currAmt
                            USD_RATE: $usdRate
                        ) {
                            START_DATE
                            CURR_CD
                            CURR_AMT
                            USD_RATE
                        }
                    }
                `,
                variables: {
                    startDate: argData.START_DATE,
                    currCd: argData.CURR_CD,
                    currAmt: argData.CURR_AMT,
                    usdRate: argData.USD_RATE,
                },
            });
            console.log(
                "KCD_CURR_COM INSERT:",
                JSON.stringify(data.createKCD_CURR_COM),
            );
            return data.createKCD_CURR_COM;
        } catch (e) {
            console.log("KCD_CURR_COM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_CURR_COM(
                        $updateKcdCurrComId: Int!
                        $startDate: String
                        $currCd: String
                        $currAmt: Float
                        $usdRate: Float
                    ) {
                        updateKCD_CURR_COM(
                            id: $updateKcdCurrComId
                            START_DATE: $startDate
                            CURR_CD: $currCd
                            CURR_AMT: $currAmt
                            USD_RATE: $usdRate
                        ) {
                            id
                            START_DATE
                            CURR_CD
                            CURR_AMT
                            USD_RATE
                        }
                    }
                `,
                variables: {
                    updateKcdCurrComId: argData.id,
                    startDate: argData.START_DATE,
                    currCd: argData.CURR_CD,
                    currAmt: argData.CURR_AMT,
                    usdRate: argData.USD_RATE,
                },
            });
            console.log(
                "KCD_CURR_COM UPDATE:",
                JSON.stringify(data.updateKCD_CURR_COM),
            );
            return data.updateKCD_CURR_COM;
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
                    mutation DeleteKCD_CURR_COM($deleteKcdCurrComId: Int!) {
                        deleteKCD_CURR_COM(id: $deleteKcdCurrComId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCurrComId: argData.id,
                },
            });
            console.log(
                "KCD_CURR_COM DELETE:",
                JSON.stringify(data.deleteKCD_CURR_COM),
            );
            return data.deleteKCD_CURR_COM;
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
                    mutation MgrKcdCurrComDeletes(
                        $ids: [InputMgrKcdCurrComDeletes!]!
                    ) {
                        mgrKcdCurrComDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_CURR_COM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
