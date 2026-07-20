/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_CURR_ACC {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_CURR_ACC {
                        allQueryKCD_CURR_ACC {
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
                "KCD_CURR_ACC:",
                JSON.stringify(data.allQueryKCD_CURR_ACC.length),
            );
            return data.allQueryKCD_CURR_ACC;
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
                    query MgrKcdCurrAccQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCurrAccQuery(
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
                "KCD_CURR_ACC:",
                JSON.stringify(data.mgrKcdCurrAccQuery.length),
            );
            return data.mgrKcdCurrAccQuery;
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
                    mutation CreateKCD_CURR_ACC(
                        $currCd: String
                        $startDate: String
                        $usdRate: Float
                        $wonAmt: Float
                        $wonAmt2: Float
                    ) {
                        createKCD_CURR_ACC(
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
                "KCD_CURR_ACC INSERT:",
                JSON.stringify(data.createKCD_CURR_ACC),
            );
            return data.createKCD_CURR_ACC;
        } catch (e) {
            console.log("KCD_CURR_ACC INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_CURR_ACC(
                        $updateKcdCurrAccId: Int!
                        $currCd: String
                        $startDate: String
                        $usdRate: Float
                        $wonAmt: Float
                        $wonAmt2: Float
                    ) {
                        updateKCD_CURR_ACC(
                            id: $updateKcdCurrAccId
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
                    updateKcdCurrAccId: argData.id,
                    currCd: argData.CURR_CD,
                    startDate: argData.START_DATE,
                    usdRate: argData.USD_RATE,
                    wonAmt: argData.WON_AMT,
                    wonAmt2: argData.WON_AMT2,
                },
            });
            console.log(
                "KCD_CURR_ACC UPDATE:",
                JSON.stringify(data.updateKCD_CURR_ACC),
            );
            return data.updateKCD_CURR_ACC;
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
                    mutation DeleteKCD_CURR_ACC($deleteKcdCurrAccId: Int!) {
                        deleteKCD_CURR_ACC(id: $deleteKcdCurrAccId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdCurrAccId: argData.id,
                },
            });
            console.log(
                "KCD_CURR_ACC DELETE:",
                JSON.stringify(data.deleteKCD_CURR_ACC),
            );
            return data.deleteKCD_CURR_ACC;
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
                    mutation MgrKcdCurrAccDeletes(
                        $ids: [InputMgrKcdCurrAccDeletes!]!
                    ) {
                        mgrKcdCurrAccDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_CURR_ACC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
