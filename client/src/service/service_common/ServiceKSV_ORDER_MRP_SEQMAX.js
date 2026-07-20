/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MRP_SEQMAX {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MRP_SEQMAX {
                        allQueryKSV_ORDER_MRP_SEQMAX {
                            id
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MRP_SEQMAX:",
                JSON.stringify(data.allQueryKSV_ORDER_MRP_SEQMAX.length),
            );
            return data.allQueryKSV_ORDER_MRP_SEQMAX;
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
                    query MgrKsvOrderMrpSeqmaxQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMrpSeqmaxQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MRP_SEQMAX:",
                JSON.stringify(data.mgrKsvOrderMrpSeqmaxQuery.length),
            );
            return data.mgrKsvOrderMrpSeqmaxQuery;
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
                    mutation CreateKSV_ORDER_MRP_SEQMAX(
                        $userId: String
                        $orderCd: String
                        $prodCd: String
                        $orderMrpSeq: Int
                    ) {
                        createKSV_ORDER_MRP_SEQMAX(
                            USER_ID: $userId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ORDER_MRP_SEQ: $orderMrpSeq
                        ) {
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    orderMrpSeq: argData.ORDER_MRP_SEQ,
                },
            });
            console.log(
                "KSV_ORDER_MRP_SEQMAX INSERT:",
                JSON.stringify(data.createKSV_ORDER_MRP_SEQMAX),
            );
            return data.createKSV_ORDER_MRP_SEQMAX;
        } catch (e) {
            console.log(
                "KSV_ORDER_MRP_SEQMAX INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_MRP_SEQMAX(
                        $updateKsvOrderMrpSeqmaxId: Int!
                        $userId: String
                        $orderCd: String
                        $prodCd: String
                        $orderMrpSeq: Int
                    ) {
                        updateKSV_ORDER_MRP_SEQMAX(
                            id: $updateKsvOrderMrpSeqmaxId
                            USER_ID: $userId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ORDER_MRP_SEQ: $orderMrpSeq
                        ) {
                            id
                            USER_ID
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMrpSeqmaxId: argData.id,
                    userId: argData.USER_ID,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    orderMrpSeq: argData.ORDER_MRP_SEQ,
                },
            });
            console.log(
                "KSV_ORDER_MRP_SEQMAX UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MRP_SEQMAX),
            );
            return data.updateKSV_ORDER_MRP_SEQMAX;
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
                    mutation DeleteKSV_ORDER_MRP_SEQMAX(
                        $deleteKsvOrderMrpSeqmaxId: Int!
                    ) {
                        deleteKSV_ORDER_MRP_SEQMAX(
                            id: $deleteKsvOrderMrpSeqmaxId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMrpSeqmaxId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MRP_SEQMAX DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MRP_SEQMAX),
            );
            return data.deleteKSV_ORDER_MRP_SEQMAX;
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
                    mutation MgrKsvOrderMrpSeqmaxDeletes(
                        $ids: [InputMgrKsvOrderMrpSeqmaxDeletes!]!
                    ) {
                        mgrKsvOrderMrpSeqmaxDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MRP_SEQMAX DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
