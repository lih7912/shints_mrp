/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_CURRENCY {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_CURRENCY {
                        allQueryKCD_CURRENCY {
                            id
                            CURR_CD
                            START_DATE
                            USD_RATE
                            WON_AMT
                            WON_AMT2
                        }
                    }
                `,
            });
            console.log(
                "KCD_CURRENCY:",
                JSON.stringify(data.allQueryKCD_CURRENCY.length),
            );
            return data.allQueryKCD_CURRENCY;
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
                    query MgrKcdCurrencyQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCurrencyQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CURR_CD
                            START_DATE
                            USD_RATE
                            WON_AMT
                            WON_AMT2
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_CURRENCY:",
                JSON.stringify(data.mgrKcdCurrencyQuery.length),
            );
            return data.mgrKcdCurrencyQuery;
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
                    mutation CreateKCD_CURRENCY(
                        $currCd: String
                        $startDate: String
                        $usdRate: Float
                        $wonAmt: Float
                        $wonAmt2: Float
                    ) {
                        createKCD_CURRENCY(
                            CURR_CD: $currCd
                            START_DATE: $startDate
                            USD_RATE: $usdRate
                            WON_AMT: $wonAmt
                            WON_AMT2: $wonAmt2
                        ) {
                            CURR_CD
                            START_DATE
                            USD_RATE
                            WON_AMT
                            WON_AMT2
                        }
                    }
                `,
                variables: {
                    currCd: argData.CURR_CD,
                    startDate: argData.START_DATE,
                    usdRate: argData.USD_RATE,
                    wonAmt: argData.WON_AMT,
                    wonAmt2: argData.WON_AMT2,
                },
            });
            console.log(
                "KCD_CURRENCY INSERT:",
                JSON.stringify(data.createKCD_CURRENCY),
            );
            return data.createKCD_CURRENCY;
        } catch (e) {
            console.log("KCD_CURRENCY INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_CURRENCY(
                        $updateKcdCurrencyId: Int!
                        $currCd: String
                        $startDate: String
                        $usdRate: Float
                        $wonAmt: Float
                        $wonAmt2: Float
                    ) {
                        updateKCD_CURRENCY(
                            id: $updateKcdCurrencyId
                            CURR_CD: $currCd
                            START_DATE: $startDate
                            USD_RATE: $usdRate
                            WON_AMT: $wonAmt
                            WON_AMT2: $wonAmt2
                        ) {
                            id
                            CURR_CD
                            START_DATE
                            USD_RATE
                            WON_AMT
                            WON_AMT2
                        }
                    }
                `,
                variables: {
                    updateKcdCurrencyId: argData.id,
                    currCd: argData.CURR_CD,
                    startDate: argData.START_DATE,
                    usdRate: argData.USD_RATE,
                    wonAmt: argData.WON_AMT,
                    wonAmt2: argData.WON_AMT2,
                },
            });
            console.log(
                "KCD_CURRENCY UPDATE:",
                JSON.stringify(data.updateKCD_CURRENCY),
            );
            return data.updateKCD_CURRENCY;
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
                    mutation DeleteKCD_CURRENCY($deleteKcdCurrencyId: Int!) {
                        deleteKCD_CURRENCY(id: $deleteKcdCurrencyId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCurrencyId: argData.id,
                },
            });
            console.log(
                "KCD_CURRENCY DELETE:",
                JSON.stringify(data.deleteKCD_CURRENCY),
            );
            return data.deleteKCD_CURRENCY;
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
                    mutation MgrKcdCurrencyDeletes(
                        $ids: [InputMgrKcdCurrencyDeletes!]!
                    ) {
                        mgrKcdCurrencyDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_CURRENCY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
