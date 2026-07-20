/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BUYER_CREDIT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER_CREDIT {
                        allQueryKCD_BUYER_CREDIT {
                            id
                            BUYER_CD
                            CREDIT_PERCENT
                            CREDIT_TIME
                            CREDIT_SEQ
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER_CREDIT:",
                JSON.stringify(data.allQueryKCD_BUYER_CREDIT.length),
            );
            return data.allQueryKCD_BUYER_CREDIT;
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
                    query MgrKcdBuyerCreditQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerCreditQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            CREDIT_PERCENT
                            CREDIT_TIME
                            CREDIT_SEQ
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER_CREDIT:",
                JSON.stringify(data.mgrKcdBuyerCreditQuery.length),
            );
            return data.mgrKcdBuyerCreditQuery;
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
                    mutation CreateKCD_BUYER_CREDIT(
                        $buyerCd: String
                        $creditPercent: String
                        $creditTime: String
                        $creditSeq: Int
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKCD_BUYER_CREDIT(
                            BUYER_CD: $buyerCd
                            CREDIT_PERCENT: $creditPercent
                            CREDIT_TIME: $creditTime
                            CREDIT_SEQ: $creditSeq
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            BUYER_CD
                            CREDIT_PERCENT
                            CREDIT_TIME
                            CREDIT_SEQ
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    creditPercent: argData.CREDIT_PERCENT,
                    creditTime: argData.CREDIT_TIME,
                    creditSeq: argData.CREDIT_SEQ,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KCD_BUYER_CREDIT INSERT:",
                JSON.stringify(data.createKCD_BUYER_CREDIT),
            );
            return data.createKCD_BUYER_CREDIT;
        } catch (e) {
            console.log("KCD_BUYER_CREDIT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_BUYER_CREDIT(
                        $updateKcdBuyerCreditId: Int!
                        $buyerCd: String
                        $creditPercent: String
                        $creditTime: String
                        $creditSeq: Int
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKCD_BUYER_CREDIT(
                            id: $updateKcdBuyerCreditId
                            BUYER_CD: $buyerCd
                            CREDIT_PERCENT: $creditPercent
                            CREDIT_TIME: $creditTime
                            CREDIT_SEQ: $creditSeq
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            BUYER_CD
                            CREDIT_PERCENT
                            CREDIT_TIME
                            CREDIT_SEQ
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerCreditId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    creditPercent: argData.CREDIT_PERCENT,
                    creditTime: argData.CREDIT_TIME,
                    creditSeq: argData.CREDIT_SEQ,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KCD_BUYER_CREDIT UPDATE:",
                JSON.stringify(data.updateKCD_BUYER_CREDIT),
            );
            return data.updateKCD_BUYER_CREDIT;
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
                    mutation DeleteKCD_BUYER_CREDIT(
                        $deleteKcdBuyerCreditId: Int!
                    ) {
                        deleteKCD_BUYER_CREDIT(id: $deleteKcdBuyerCreditId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerCreditId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER_CREDIT DELETE:",
                JSON.stringify(data.deleteKCD_BUYER_CREDIT),
            );
            return data.deleteKCD_BUYER_CREDIT;
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
                    mutation MgrKcdBuyerCreditDeletes(
                        $ids: [InputMgrKcdBuyerCreditDeletes!]!
                    ) {
                        mgrKcdBuyerCreditDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BUYER_CREDIT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
