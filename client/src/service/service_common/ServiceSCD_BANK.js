/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceSCD_BANK {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_BANK {
                        allQuerySCD_BANK {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                        }
                    }
                `,
            });
            console.log(
                "SCD_BANK:",
                JSON.stringify(data.allQuerySCD_BANK.length),
            );
            return data.allQuerySCD_BANK;
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
                    query MgrScdBankQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdBankQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_BANK:",
                JSON.stringify(data.mgrScdBankQuery.length),
            );
            return data.mgrScdBankQuery;
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
                    mutation CreateSCD_BANK(
                        $bankCd: String
                        $bankName: String
                        $accountNo: String
                    ) {
                        createSCD_BANK(
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            ACCOUNT_NO: $accountNo
                        ) {
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                        }
                    }
                `,
                variables: {
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    accountNo: argData.ACCOUNT_NO,
                },
            });
            console.log(
                "SCD_BANK INSERT:",
                JSON.stringify(data.createSCD_BANK),
            );
            return data.createSCD_BANK;
        } catch (e) {
            console.log("SCD_BANK INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateSCD_BANK(
                        $updateScdBankId: Int!
                        $bankCd: String
                        $bankName: String
                        $accountNo: String
                    ) {
                        updateSCD_BANK(
                            id: $updateScdBankId
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            ACCOUNT_NO: $accountNo
                        ) {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                        }
                    }
                `,
                variables: {
                    updateScdBankId: argData.id,
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    accountNo: argData.ACCOUNT_NO,
                },
            });
            console.log(
                "SCD_BANK UPDATE:",
                JSON.stringify(data.updateSCD_BANK),
            );
            return data.updateSCD_BANK;
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
                    mutation DeleteSCD_BANK($deleteScdBankId: Int!) {
                        deleteSCD_BANK(id: $deleteScdBankId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdBankId: argData.id,
                },
            });
            console.log(
                "SCD_BANK DELETE:",
                JSON.stringify(data.deleteSCD_BANK),
            );
            return data.deleteSCD_BANK;
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
                    mutation MgrScdBankDeletes(
                        $ids: [InputMgrScdBankDeletes!]!
                    ) {
                        mgrScdBankDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_BANK DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
