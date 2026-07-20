/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_DELAY_ACTION {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_DELAY_ACTION {
                        allQueryKZZ_DELAY_ACTION {
                            id
                            PO_CD
                            SEQ
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            IN_QTY
                            OUT_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            EX_IN_DATE
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            TYPE
                            BUYER_CD
                            ACTION_FLAG
                            ADP_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_DELAY_ACTION:",
                JSON.stringify(data.allQueryKZZ_DELAY_ACTION.length),
            );
            return data.allQueryKZZ_DELAY_ACTION;
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
                    query MgrKzzDelayActionQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzDelayActionQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            SEQ
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            IN_QTY
                            OUT_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            EX_IN_DATE
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            TYPE
                            BUYER_CD
                            ACTION_FLAG
                            ADP_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_DELAY_ACTION:",
                JSON.stringify(data.mgrKzzDelayActionQuery.length),
            );
            return data.mgrKzzDelayActionQuery;
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
                    mutation CreateKZZ_DELAY_ACTION(
                        $poCd: String
                        $seq: Int
                        $matlCd: String
                        $poConfDate: String
                        $orgEtd: String
                        $orgEta: String
                        $needQty: Float
                        $inQty: Float
                        $outQty: Float
                        $remainQty: Float
                        $shipQty: Float
                        $exInDate: String
                        $cutDate: String
                        $etd: String
                        $eta: String
                        $delayReason: String
                        $deliveryType: String
                        $fareType: String
                        $remark: String
                        $type: String
                        $buyerCd: String
                        $actionFlag: String
                        $adpFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_DELAY_ACTION(
                            PO_CD: $poCd
                            SEQ: $seq
                            MATL_CD: $matlCd
                            PO_CONF_DATE: $poConfDate
                            ORG_ETD: $orgEtd
                            ORG_ETA: $orgEta
                            NEED_QTY: $needQty
                            IN_QTY: $inQty
                            OUT_QTY: $outQty
                            REMAIN_QTY: $remainQty
                            SHIP_QTY: $shipQty
                            EX_IN_DATE: $exInDate
                            CUT_DATE: $cutDate
                            ETD: $etd
                            ETA: $eta
                            DELAY_REASON: $delayReason
                            DELIVERY_TYPE: $deliveryType
                            FARE_TYPE: $fareType
                            REMARK: $remark
                            TYPE: $type
                            BUYER_CD: $buyerCd
                            ACTION_FLAG: $actionFlag
                            ADP_FLAG: $adpFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            SEQ
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            IN_QTY
                            OUT_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            EX_IN_DATE
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            TYPE
                            BUYER_CD
                            ACTION_FLAG
                            ADP_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    seq: argData.SEQ,
                    matlCd: argData.MATL_CD,
                    poConfDate: argData.PO_CONF_DATE,
                    orgEtd: argData.ORG_ETD,
                    orgEta: argData.ORG_ETA,
                    needQty: argData.NEED_QTY,
                    inQty: argData.IN_QTY,
                    outQty: argData.OUT_QTY,
                    remainQty: argData.REMAIN_QTY,
                    shipQty: argData.SHIP_QTY,
                    exInDate: argData.EX_IN_DATE,
                    cutDate: argData.CUT_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    delayReason: argData.DELAY_REASON,
                    deliveryType: argData.DELIVERY_TYPE,
                    fareType: argData.FARE_TYPE,
                    remark: argData.REMARK,
                    type: argData.TYPE,
                    buyerCd: argData.BUYER_CD,
                    actionFlag: argData.ACTION_FLAG,
                    adpFlag: argData.ADP_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_DELAY_ACTION INSERT:",
                JSON.stringify(data.createKZZ_DELAY_ACTION),
            );
            return data.createKZZ_DELAY_ACTION;
        } catch (e) {
            console.log("KZZ_DELAY_ACTION INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_DELAY_ACTION(
                        $updateKzzDelayActionId: Int!
                        $poCd: String
                        $seq: Int
                        $matlCd: String
                        $poConfDate: String
                        $orgEtd: String
                        $orgEta: String
                        $needQty: Float
                        $inQty: Float
                        $outQty: Float
                        $remainQty: Float
                        $shipQty: Float
                        $exInDate: String
                        $cutDate: String
                        $etd: String
                        $eta: String
                        $delayReason: String
                        $deliveryType: String
                        $fareType: String
                        $remark: String
                        $type: String
                        $buyerCd: String
                        $actionFlag: String
                        $adpFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_DELAY_ACTION(
                            id: $updateKzzDelayActionId
                            PO_CD: $poCd
                            SEQ: $seq
                            MATL_CD: $matlCd
                            PO_CONF_DATE: $poConfDate
                            ORG_ETD: $orgEtd
                            ORG_ETA: $orgEta
                            NEED_QTY: $needQty
                            IN_QTY: $inQty
                            OUT_QTY: $outQty
                            REMAIN_QTY: $remainQty
                            SHIP_QTY: $shipQty
                            EX_IN_DATE: $exInDate
                            CUT_DATE: $cutDate
                            ETD: $etd
                            ETA: $eta
                            DELAY_REASON: $delayReason
                            DELIVERY_TYPE: $deliveryType
                            FARE_TYPE: $fareType
                            REMARK: $remark
                            TYPE: $type
                            BUYER_CD: $buyerCd
                            ACTION_FLAG: $actionFlag
                            ADP_FLAG: $adpFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            SEQ
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            IN_QTY
                            OUT_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            EX_IN_DATE
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            TYPE
                            BUYER_CD
                            ACTION_FLAG
                            ADP_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzDelayActionId: argData.id,
                    poCd: argData.PO_CD,
                    seq: argData.SEQ,
                    matlCd: argData.MATL_CD,
                    poConfDate: argData.PO_CONF_DATE,
                    orgEtd: argData.ORG_ETD,
                    orgEta: argData.ORG_ETA,
                    needQty: argData.NEED_QTY,
                    inQty: argData.IN_QTY,
                    outQty: argData.OUT_QTY,
                    remainQty: argData.REMAIN_QTY,
                    shipQty: argData.SHIP_QTY,
                    exInDate: argData.EX_IN_DATE,
                    cutDate: argData.CUT_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    delayReason: argData.DELAY_REASON,
                    deliveryType: argData.DELIVERY_TYPE,
                    fareType: argData.FARE_TYPE,
                    remark: argData.REMARK,
                    type: argData.TYPE,
                    buyerCd: argData.BUYER_CD,
                    actionFlag: argData.ACTION_FLAG,
                    adpFlag: argData.ADP_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_DELAY_ACTION UPDATE:",
                JSON.stringify(data.updateKZZ_DELAY_ACTION),
            );
            return data.updateKZZ_DELAY_ACTION;
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
                    mutation DeleteKZZ_DELAY_ACTION(
                        $deleteKzzDelayActionId: Int!
                    ) {
                        deleteKZZ_DELAY_ACTION(id: $deleteKzzDelayActionId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzDelayActionId: argData.id,
                },
            });
            console.log(
                "KZZ_DELAY_ACTION DELETE:",
                JSON.stringify(data.deleteKZZ_DELAY_ACTION),
            );
            return data.deleteKZZ_DELAY_ACTION;
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
                    mutation MgrKzzDelayActionDeletes(
                        $ids: [InputMgrKzzDelayActionDeletes!]!
                    ) {
                        mgrKzzDelayActionDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_DELAY_ACTION DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
