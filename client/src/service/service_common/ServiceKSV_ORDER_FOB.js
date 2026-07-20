/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_FOB {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_FOB {
                        allQueryKSV_ORDER_FOB {
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
                "KSV_ORDER_FOB:",
                JSON.stringify(data.allQueryKSV_ORDER_FOB.length),
            );
            return data.allQueryKSV_ORDER_FOB;
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
                    query MgrKsvOrderFobQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderFobQuery(
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
                "KSV_ORDER_FOB:",
                JSON.stringify(data.mgrKsvOrderFobQuery.length),
            );
            return data.mgrKsvOrderFobQuery;
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
                    mutation CreateKSV_ORDER_FOB(
                        $orderCd: String
                        $fobSeq: Int
                        $shipQty: Int
                        $fob: Float
                        $fob100: Float
                    ) {
                        createKSV_ORDER_FOB(
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
                "KSV_ORDER_FOB INSERT:",
                JSON.stringify(data.createKSV_ORDER_FOB),
            );
            return data.createKSV_ORDER_FOB;
        } catch (e) {
            console.log("KSV_ORDER_FOB INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_FOB(
                        $updateKsvOrderFobId: Int!
                        $orderCd: String
                        $fobSeq: Int
                        $shipQty: Int
                        $fob: Float
                        $fob100: Float
                    ) {
                        updateKSV_ORDER_FOB(
                            id: $updateKsvOrderFobId
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
                    updateKsvOrderFobId: argData.id,
                    orderCd: argData.ORDER_CD,
                    fobSeq: argData.FOB_SEQ,
                    shipQty: argData.SHIP_QTY,
                    fob: argData.FOB,
                    fob100: argData.FOB100,
                },
            });
            console.log(
                "KSV_ORDER_FOB UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_FOB),
            );
            return data.updateKSV_ORDER_FOB;
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
                    mutation DeleteKSV_ORDER_FOB($deleteKsvOrderFobId: Int!) {
                        deleteKSV_ORDER_FOB(id: $deleteKsvOrderFobId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderFobId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_FOB DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_FOB),
            );
            return data.deleteKSV_ORDER_FOB;
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
                    mutation MgrKsvOrderFobDeletes(
                        $ids: [InputMgrKsvOrderFobDeletes!]!
                    ) {
                        mgrKsvOrderFobDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_FOB DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
