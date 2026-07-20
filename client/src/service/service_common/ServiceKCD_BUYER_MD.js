/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_BUYER_MD {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER_MD {
                        allQueryKCD_BUYER_MD {
                            id
                            BUYER_CD
                            MD
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER_MD:",
                JSON.stringify(data.allQueryKCD_BUYER_MD.length),
            );
            return data.allQueryKCD_BUYER_MD;
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
                    query MgrKcdBuyerMdQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerMdQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            MD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER_MD:",
                JSON.stringify(data.mgrKcdBuyerMdQuery.length),
            );
            return data.mgrKcdBuyerMdQuery;
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
                    mutation CreateKCD_BUYER_MD($buyerCd: String, $md: String) {
                        createKCD_BUYER_MD(BUYER_CD: $buyerCd, MD: $md) {
                            BUYER_CD
                            MD
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    md: argData.MD,
                },
            });
            console.log(
                "KCD_BUYER_MD INSERT:",
                JSON.stringify(data.createKCD_BUYER_MD),
            );
            return data.createKCD_BUYER_MD;
        } catch (e) {
            console.log("KCD_BUYER_MD INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_BUYER_MD(
                        $updateKcdBuyerMdId: Int!
                        $buyerCd: String
                        $md: String
                    ) {
                        updateKCD_BUYER_MD(
                            id: $updateKcdBuyerMdId
                            BUYER_CD: $buyerCd
                            MD: $md
                        ) {
                            id
                            BUYER_CD
                            MD
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerMdId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    md: argData.MD,
                },
            });
            console.log(
                "KCD_BUYER_MD UPDATE:",
                JSON.stringify(data.updateKCD_BUYER_MD),
            );
            return data.updateKCD_BUYER_MD;
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
                    mutation DeleteKCD_BUYER_MD($deleteKcdBuyerMdId: Int!) {
                        deleteKCD_BUYER_MD(id: $deleteKcdBuyerMdId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerMdId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER_MD DELETE:",
                JSON.stringify(data.deleteKCD_BUYER_MD),
            );
            return data.deleteKCD_BUYER_MD;
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
                    mutation MgrKcdBuyerMdDeletes(
                        $ids: [InputMgrKcdBuyerMdDeletes!]!
                    ) {
                        mgrKcdBuyerMdDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BUYER_MD DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
