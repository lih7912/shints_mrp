/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_PAY_RULE {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_PAY_RULE {
                        allQueryKCD_PAY_RULE {
                            id
                            SEQ
                            CD_CODE
                            REMARK
                            RATE
                            FLAG
                            TERM
                            FN
                            YN_DEFAULT
                            DAYS1
                            PERCENT1
                            DAYS2
                            PERCENT2
                            DAYS3
                            PERCENT3
                        }
                    }
                `,
            });
            console.log(
                "KCD_PAY_RULE:",
                JSON.stringify(data.allQueryKCD_PAY_RULE.length),
            );
            return data.allQueryKCD_PAY_RULE;
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
                    query MgrKcdPayRuleQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdPayRuleQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            SEQ
                            CD_CODE
                            REMARK
                            RATE
                            FLAG
                            TERM
                            FN
                            YN_DEFAULT
                            DAYS1
                            PERCENT1
                            DAYS2
                            PERCENT2
                            DAYS3
                            PERCENT3
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_PAY_RULE:",
                JSON.stringify(data.mgrKcdPayRuleQuery.length),
            );
            return data.mgrKcdPayRuleQuery;
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
                    mutation CreateKCD_PAY_RULE(
                        $seq: Int!
                        $cdCode: Int!
                        $remark: String!
                        $rate: String!
                        $flag: String!
                        $term: Int
                        $fn: String
                        $ynDefault: String
                        $days1: String
                        $percent1: String
                        $days2: String
                        $percent2: String
                        $days3: String
                        $percent3: String
                    ) {
                        createKCD_PAY_RULE(
                            SEQ: $seq
                            CD_CODE: $cdCode
                            REMARK: $remark
                            RATE: $rate
                            FLAG: $flag
                            TERM: $term
                            FN: $fn
                            YN_DEFAULT: $ynDefault
                            DAYS1: $days1
                            PERCENT1: $percent1
                            DAYS2: $days2
                            PERCENT2: $percent2
                            DAYS3: $days3
                            PERCENT3: $percent3
                        ) {
                            SEQ
                            CD_CODE
                            REMARK
                            RATE
                            FLAG
                            TERM
                            FN
                            YN_DEFAULT
                            DAYS1
                            PERCENT1
                            DAYS2
                            PERCENT2
                            DAYS3
                            PERCENT3
                        }
                    }
                `,
                variables: {
                    seq: argData.SEQ,
                    cdCode: argData.CD_CODE,
                    remark: argData.REMARK,
                    rate: argData.RATE,
                    flag: argData.FLAG,
                    term: argData.TERM,
                    fn: argData.FN,
                    ynDefault: argData.YN_DEFAULT,
                    days1: argData.DAYS1,
                    percent1: argData.PERCENT1,
                    days2: argData.DAYS2,
                    percent2: argData.PERCENT2,
                    days3: argData.DAYS3,
                    percent3: argData.PERCENT3,
                },
            });
            console.log(
                "KCD_PAY_RULE INSERT:",
                JSON.stringify(data.createKCD_PAY_RULE),
            );
            return data.createKCD_PAY_RULE;
        } catch (e) {
            console.log("KCD_PAY_RULE INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_PAY_RULE(
                        $updateKcdPayRuleId: Int!
                        $seq: Int!
                        $cdCode: Int!
                        $remark: String!
                        $rate: String!
                        $flag: String!
                        $term: Int
                        $fn: String
                        $ynDefault: String
                        $days1: String
                        $percent1: String
                        $days2: String
                        $percent2: String
                        $days3: String
                        $percent3: String
                    ) {
                        updateKCD_PAY_RULE(
                            id: $updateKcdPayRuleId
                            SEQ: $seq
                            CD_CODE: $cdCode
                            REMARK: $remark
                            RATE: $rate
                            FLAG: $flag
                            TERM: $term
                            FN: $fn
                            YN_DEFAULT: $ynDefault
                            DAYS1: $days1
                            PERCENT1: $percent1
                            DAYS2: $days2
                            PERCENT2: $percent2
                            DAYS3: $days3
                            PERCENT3: $percent3
                        ) {
                            id
                            SEQ
                            CD_CODE
                            REMARK
                            RATE
                            FLAG
                            TERM
                            FN
                            YN_DEFAULT
                            DAYS1
                            PERCENT1
                            DAYS2
                            PERCENT2
                            DAYS3
                            PERCENT3
                        }
                    }
                `,
                variables: {
                    updateKcdPayRuleId: argData.id,
                    seq: argData.SEQ,
                    cdCode: argData.CD_CODE,
                    remark: argData.REMARK,
                    rate: argData.RATE,
                    flag: argData.FLAG,
                    term: argData.TERM,
                    fn: argData.FN,
                    ynDefault: argData.YN_DEFAULT,
                    days1: argData.DAYS1,
                    percent1: argData.PERCENT1,
                    days2: argData.DAYS2,
                    percent2: argData.PERCENT2,
                    days3: argData.DAYS3,
                    percent3: argData.PERCENT3,
                },
            });
            console.log(
                "KCD_PAY_RULE UPDATE:",
                JSON.stringify(data.updateKCD_PAY_RULE),
            );
            return data.updateKCD_PAY_RULE;
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
                    mutation DeleteKCD_PAY_RULE($deleteKcdPayRuleId: Int!) {
                        deleteKCD_PAY_RULE(id: $deleteKcdPayRuleId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdPayRuleId: argData.id,
                },
            });
            console.log(
                "KCD_PAY_RULE DELETE:",
                JSON.stringify(data.deleteKCD_PAY_RULE),
            );
            return data.deleteKCD_PAY_RULE;
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
                    mutation MgrKcdPayRuleDeletes(
                        $ids: [InputMgrKcdPayRuleDeletes!]!
                    ) {
                        mgrKcdPayRuleDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_PAY_RULE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
