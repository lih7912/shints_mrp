/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_BUYER_CONSIGNEE {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER_CONSIGNEE {
                        allQueryKCD_BUYER_CONSIGNEE {
                            id
                            BUYER_CD
                            DESTINATION
                            CONSIGNEE
                            NOTIFY
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER_CONSIGNEE:",
                JSON.stringify(data.allQueryKCD_BUYER_CONSIGNEE.length),
            );
            return data.allQueryKCD_BUYER_CONSIGNEE;
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
                    query MgrKcdBuyerConsigneeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerConsigneeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            DESTINATION
                            CONSIGNEE
                            NOTIFY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER_CONSIGNEE:",
                JSON.stringify(data.mgrKcdBuyerConsigneeQuery.length),
            );
            return data.mgrKcdBuyerConsigneeQuery;
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
                    mutation CreateKCD_BUYER_CONSIGNEE(
                        $buyerCd: String
                        $destination: String
                        $consignee: String
                        $notify: String
                    ) {
                        createKCD_BUYER_CONSIGNEE(
                            BUYER_CD: $buyerCd
                            DESTINATION: $destination
                            CONSIGNEE: $consignee
                            NOTIFY: $notify
                        ) {
                            BUYER_CD
                            DESTINATION
                            CONSIGNEE
                            NOTIFY
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    destination: argData.DESTINATION,
                    consignee: argData.CONSIGNEE,
                    notify: argData.NOTIFY,
                },
            });
            console.log(
                "KCD_BUYER_CONSIGNEE INSERT:",
                JSON.stringify(data.createKCD_BUYER_CONSIGNEE),
            );
            return data.createKCD_BUYER_CONSIGNEE;
        } catch (e) {
            console.log("KCD_BUYER_CONSIGNEE INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_BUYER_CONSIGNEE(
                        $updateKcdBuyerConsigneeId: Int!
                        $buyerCd: String
                        $destination: String
                        $consignee: String
                        $notify: String
                    ) {
                        updateKCD_BUYER_CONSIGNEE(
                            id: $updateKcdBuyerConsigneeId
                            BUYER_CD: $buyerCd
                            DESTINATION: $destination
                            CONSIGNEE: $consignee
                            NOTIFY: $notify
                        ) {
                            id
                            BUYER_CD
                            DESTINATION
                            CONSIGNEE
                            NOTIFY
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerConsigneeId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    destination: argData.DESTINATION,
                    consignee: argData.CONSIGNEE,
                    notify: argData.NOTIFY,
                },
            });
            console.log(
                "KCD_BUYER_CONSIGNEE UPDATE:",
                JSON.stringify(data.updateKCD_BUYER_CONSIGNEE),
            );
            return data.updateKCD_BUYER_CONSIGNEE;
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
                    mutation DeleteKCD_BUYER_CONSIGNEE(
                        $deleteKcdBuyerConsigneeId: Int!
                    ) {
                        deleteKCD_BUYER_CONSIGNEE(
                            id: $deleteKcdBuyerConsigneeId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerConsigneeId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER_CONSIGNEE DELETE:",
                JSON.stringify(data.deleteKCD_BUYER_CONSIGNEE),
            );
            return data.deleteKCD_BUYER_CONSIGNEE;
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
                    mutation MgrKcdBuyerConsigneeDeletes(
                        $ids: [InputMgrKcdBuyerConsigneeDeletes!]!
                    ) {
                        mgrKcdBuyerConsigneeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BUYER_CONSIGNEE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
