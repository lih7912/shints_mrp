/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_LCBANK {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_LCBANK {
                        allQueryKCD_LCBANK {
                            id
                            BANK_CD
                            BANK_NAME
                            LIMIT_AMT
                            USE_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KCD_LCBANK:",
                JSON.stringify(data.allQueryKCD_LCBANK.length),
            );
            return data.allQueryKCD_LCBANK;
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
                    query MgrKcdLcbankQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdLcbankQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BANK_CD
                            BANK_NAME
                            LIMIT_AMT
                            USE_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_LCBANK:",
                JSON.stringify(data.mgrKcdLcbankQuery.length),
            );
            return data.mgrKcdLcbankQuery;
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
                    mutation CreateKCD_LCBANK(
                        $bankCd: String
                        $bankName: String
                        $limitAmt: Float
                        $useAmt: Float
                        $currCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKCD_LCBANK(
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            LIMIT_AMT: $limitAmt
                            USE_AMT: $useAmt
                            CURR_CD: $currCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            BANK_CD
                            BANK_NAME
                            LIMIT_AMT
                            USE_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    limitAmt: argData.LIMIT_AMT,
                    useAmt: argData.USE_AMT,
                    currCd: argData.CURR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_LCBANK INSERT:",
                JSON.stringify(data.createKCD_LCBANK),
            );
            return data.createKCD_LCBANK;
        } catch (e) {
            console.log("KCD_LCBANK INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_LCBANK(
                        $updateKcdLcbankId: Int!
                        $bankCd: String
                        $bankName: String
                        $limitAmt: Float
                        $useAmt: Float
                        $currCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKCD_LCBANK(
                            id: $updateKcdLcbankId
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            LIMIT_AMT: $limitAmt
                            USE_AMT: $useAmt
                            CURR_CD: $currCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            BANK_CD
                            BANK_NAME
                            LIMIT_AMT
                            USE_AMT
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdLcbankId: argData.id,
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    limitAmt: argData.LIMIT_AMT,
                    useAmt: argData.USE_AMT,
                    currCd: argData.CURR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_LCBANK UPDATE:",
                JSON.stringify(data.updateKCD_LCBANK),
            );
            return data.updateKCD_LCBANK;
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
                    mutation DeleteKCD_LCBANK($deleteKcdLcbankId: Int!) {
                        deleteKCD_LCBANK(id: $deleteKcdLcbankId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdLcbankId: argData.id,
                },
            });
            console.log(
                "KCD_LCBANK DELETE:",
                JSON.stringify(data.deleteKCD_LCBANK),
            );
            return data.deleteKCD_LCBANK;
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
                    mutation MgrKcdLcbankDeletes(
                        $ids: [InputMgrKcdLcbankDeletes!]!
                    ) {
                        mgrKcdLcbankDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_LCBANK DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
