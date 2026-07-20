/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_NEOE_MNGSUM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_NEOE_MNGSUM {
                        allQueryKZZ_NEOE_MNGSUM {
                            id
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_NEOE_MNGSUM:",
                JSON.stringify(data.allQueryKZZ_NEOE_MNGSUM.length),
            );
            return data.allQueryKZZ_NEOE_MNGSUM;
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
                    query MgrKzzNeoeMngsumQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzNeoeMngsumQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_NEOE_MNGSUM:",
                JSON.stringify(data.mgrKzzNeoeMngsumQuery.length),
            );
            return data.mgrKzzNeoeMngsumQuery;
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
                    mutation CreateKZZ_NEOE_MNGSUM(
                        $userId: String
                        $cdAcct: String
                        $nmAcct: String
                        $cdCode: String
                        $nmCc: String
                        $amAmt: Float
                        $seq: String
                        $regDatetime: String
                    ) {
                        createKZZ_NEOE_MNGSUM(
                            USER_ID: $userId
                            CD_ACCT: $cdAcct
                            NM_ACCT: $nmAcct
                            CD_CODE: $cdCode
                            NM_CC: $nmCc
                            AM_AMT: $amAmt
                            SEQ: $seq
                            REG_DATETIME: $regDatetime
                        ) {
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    cdAcct: argData.CD_ACCT,
                    nmAcct: argData.NM_ACCT,
                    cdCode: argData.CD_CODE,
                    nmCc: argData.NM_CC,
                    amAmt: argData.AM_AMT,
                    seq: argData.SEQ,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM INSERT:",
                JSON.stringify(data.createKZZ_NEOE_MNGSUM),
            );
            return data.createKZZ_NEOE_MNGSUM;
        } catch (e) {
            console.log("KZZ_NEOE_MNGSUM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_NEOE_MNGSUM(
                        $updateKzzNeoeMngsumId: Int!
                        $userId: String
                        $cdAcct: String
                        $nmAcct: String
                        $cdCode: String
                        $nmCc: String
                        $amAmt: Float
                        $seq: String
                        $regDatetime: String
                    ) {
                        updateKZZ_NEOE_MNGSUM(
                            id: $updateKzzNeoeMngsumId
                            USER_ID: $userId
                            CD_ACCT: $cdAcct
                            NM_ACCT: $nmAcct
                            CD_CODE: $cdCode
                            NM_CC: $nmCc
                            AM_AMT: $amAmt
                            SEQ: $seq
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzNeoeMngsumId: argData.id,
                    userId: argData.USER_ID,
                    cdAcct: argData.CD_ACCT,
                    nmAcct: argData.NM_ACCT,
                    cdCode: argData.CD_CODE,
                    nmCc: argData.NM_CC,
                    amAmt: argData.AM_AMT,
                    seq: argData.SEQ,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM UPDATE:",
                JSON.stringify(data.updateKZZ_NEOE_MNGSUM),
            );
            return data.updateKZZ_NEOE_MNGSUM;
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
                    mutation DeleteKZZ_NEOE_MNGSUM(
                        $deleteKzzNeoeMngsumId: Int!
                    ) {
                        deleteKZZ_NEOE_MNGSUM(id: $deleteKzzNeoeMngsumId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzNeoeMngsumId: argData.id,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM DELETE:",
                JSON.stringify(data.deleteKZZ_NEOE_MNGSUM),
            );
            return data.deleteKZZ_NEOE_MNGSUM;
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
                    mutation MgrKzzNeoeMngsumDeletes(
                        $ids: [InputMgrKzzNeoeMngsumDeletes!]!
                    ) {
                        mgrKzzNeoeMngsumDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_NEOE_MNGSUM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
