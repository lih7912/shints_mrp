/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_FOB_TRADE {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_FOB_TRADE {
                        allQueryKSV_ORDER_FOB_TRADE {
                            id
                            ORDER_CD
                            FOB_SEQ
                            SHIP_QTY
                            FOB
                            FOB100
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_FOB_TRADE:",
                JSON.stringify(data.allQueryKSV_ORDER_FOB_TRADE.length),
            );
            return data.allQueryKSV_ORDER_FOB_TRADE;
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
                    query MgrKsvOrderFobTradeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderFobTradeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            FOB_SEQ
                            SHIP_QTY
                            FOB
                            FOB100
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_FOB_TRADE:",
                JSON.stringify(data.mgrKsvOrderFobTradeQuery.length),
            );
            return data.mgrKsvOrderFobTradeQuery;
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
                    mutation CreateKSV_ORDER_FOB_TRADE(
                        $orderCd: String
                        $fobSeq: Int
                        $shipQty: Int
                        $fob: Float
                        $fob100: Float
                    ) {
                        createKSV_ORDER_FOB_TRADE(
                            ORDER_CD: $orderCd
                            FOB_SEQ: $fobSeq
                            SHIP_QTY: $shipQty
                            FOB: $fob
                            FOB100: $fob100
                        ) {
                            ORDER_CD
                            FOB_SEQ
                            SHIP_QTY
                            FOB
                            FOB100
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    fobSeq: argData.FOB_SEQ,
                    shipQty: argData.SHIP_QTY,
                    fob: argData.FOB,
                    fob100: argData.FOB100,
                },
            });
            console.log(
                "KSV_ORDER_FOB_TRADE INSERT:",
                JSON.stringify(data.createKSV_ORDER_FOB_TRADE),
            );
            return data.createKSV_ORDER_FOB_TRADE;
        } catch (e) {
            console.log("KSV_ORDER_FOB_TRADE INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_FOB_TRADE(
                        $updateKsvOrderFobTradeId: Int!
                        $orderCd: String
                        $fobSeq: Int
                        $shipQty: Int
                        $fob: Float
                        $fob100: Float
                    ) {
                        updateKSV_ORDER_FOB_TRADE(
                            id: $updateKsvOrderFobTradeId
                            ORDER_CD: $orderCd
                            FOB_SEQ: $fobSeq
                            SHIP_QTY: $shipQty
                            FOB: $fob
                            FOB100: $fob100
                        ) {
                            id
                            ORDER_CD
                            FOB_SEQ
                            SHIP_QTY
                            FOB
                            FOB100
                        }
                    }
                `,
                variables: {
                    updateKsvOrderFobTradeId: argData.id,
                    orderCd: argData.ORDER_CD,
                    fobSeq: argData.FOB_SEQ,
                    shipQty: argData.SHIP_QTY,
                    fob: argData.FOB,
                    fob100: argData.FOB100,
                },
            });
            console.log(
                "KSV_ORDER_FOB_TRADE UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_FOB_TRADE),
            );
            return data.updateKSV_ORDER_FOB_TRADE;
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
                    mutation DeleteKSV_ORDER_FOB_TRADE(
                        $deleteKsvOrderFobTradeId: Int!
                    ) {
                        deleteKSV_ORDER_FOB_TRADE(
                            id: $deleteKsvOrderFobTradeId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderFobTradeId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_FOB_TRADE DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_FOB_TRADE),
            );
            return data.deleteKSV_ORDER_FOB_TRADE;
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
                    mutation MgrKsvOrderFobTradeDeletes(
                        $ids: [InputMgrKsvOrderFobTradeDeletes!]!
                    ) {
                        mgrKsvOrderFobTradeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_FOB_TRADE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
