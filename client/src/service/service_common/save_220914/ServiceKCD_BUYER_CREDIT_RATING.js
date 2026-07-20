/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BUYER_CREDIT_RATING {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER_CREDIT_RATING {
                        allQueryKCD_BUYER_CREDIT_RATING {
                            id
                            BUYER_CD
                            CREDIT_RATING
                            CREDIT_EXPIRE
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER_CREDIT_RATING:",
                JSON.stringify(data.allQueryKCD_BUYER_CREDIT_RATING.length),
            );
            return data.allQueryKCD_BUYER_CREDIT_RATING;
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
                    query MgrKcdBuyerCreditRatingQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerCreditRatingQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            CREDIT_RATING
                            CREDIT_EXPIRE
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER_CREDIT_RATING:",
                JSON.stringify(data.mgrKcdBuyerCreditRatingQuery.length),
            );
            return data.mgrKcdBuyerCreditRatingQuery;
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
                    mutation CreateKCD_BUYER_CREDIT_RATING(
                        $buyerCd: String!
                        $creditRating: String!
                        $creditExpire: String!
                        $regDatetime: String!
                        $regUser: String!
                    ) {
                        createKCD_BUYER_CREDIT_RATING(
                            BUYER_CD: $buyerCd
                            CREDIT_RATING: $creditRating
                            CREDIT_EXPIRE: $creditExpire
                            REG_DATETIME: $regDatetime
                            REG_USER: $regUser
                        ) {
                            BUYER_CD
                            CREDIT_RATING
                            CREDIT_EXPIRE
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    creditRating: argData.CREDIT_RATING,
                    creditExpire: argData.CREDIT_EXPIRE,
                    regDatetime: argData.REG_DATETIME,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KCD_BUYER_CREDIT_RATING INSERT:",
                JSON.stringify(data.createKCD_BUYER_CREDIT_RATING),
            );
            return data.createKCD_BUYER_CREDIT_RATING;
        } catch (e) {
            console.log(
                "KCD_BUYER_CREDIT_RATING INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKCD_BUYER_CREDIT_RATING(
                        $updateKcdBuyerCreditRatingId: Int!
                        $buyerCd: String!
                        $creditRating: String!
                        $creditExpire: String!
                        $regDatetime: String!
                        $regUser: String!
                    ) {
                        updateKCD_BUYER_CREDIT_RATING(
                            id: $updateKcdBuyerCreditRatingId
                            BUYER_CD: $buyerCd
                            CREDIT_RATING: $creditRating
                            CREDIT_EXPIRE: $creditExpire
                            REG_DATETIME: $regDatetime
                            REG_USER: $regUser
                        ) {
                            id
                            BUYER_CD
                            CREDIT_RATING
                            CREDIT_EXPIRE
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerCreditRatingId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    creditRating: argData.CREDIT_RATING,
                    creditExpire: argData.CREDIT_EXPIRE,
                    regDatetime: argData.REG_DATETIME,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KCD_BUYER_CREDIT_RATING UPDATE:",
                JSON.stringify(data.updateKCD_BUYER_CREDIT_RATING),
            );
            return data.updateKCD_BUYER_CREDIT_RATING;
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
                    mutation DeleteKCD_BUYER_CREDIT_RATING(
                        $deleteKcdBuyerCreditRatingId: Int!
                    ) {
                        deleteKCD_BUYER_CREDIT_RATING(
                            id: $deleteKcdBuyerCreditRatingId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerCreditRatingId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER_CREDIT_RATING DELETE:",
                JSON.stringify(data.deleteKCD_BUYER_CREDIT_RATING),
            );
            return data.deleteKCD_BUYER_CREDIT_RATING;
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
                    mutation MgrKcdBuyerCreditRatingDeletes(
                        $ids: [InputMgrKcdBuyerCreditRatingDeletes!]!
                    ) {
                        mgrKcdBuyerCreditRatingDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KCD_BUYER_CREDIT_RATING DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
