/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRP_COMBINED {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRP_COMBINED {
                        allQueryKSV_PO_MRP_COMBINED {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            PO_MATL_CD
                            PO_MRP_SEQ
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            REASON_TYPE
                            FARE_TYPE
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            MT_SHIP_QTY
                            MT_CUT_DATE
                            MT_ETD
                            MT_ETA
                            MT_DELAY_REASON
                            MT_DELIVERY_TYPE
                            MT_FARE_TYPE
                            MT_REMARK
                            TEMP_PRICE
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRP_COMBINED:",
                JSON.stringify(data.allQueryKSV_PO_MRP_COMBINED.length),
            );
            return data.allQueryKSV_PO_MRP_COMBINED;
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
                    query MgrKsvPoMrpCombinedQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrpCombinedQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            PO_MATL_CD
                            PO_MRP_SEQ
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            REASON_TYPE
                            FARE_TYPE
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            MT_SHIP_QTY
                            MT_CUT_DATE
                            MT_ETD
                            MT_ETA
                            MT_DELAY_REASON
                            MT_DELIVERY_TYPE
                            MT_FARE_TYPE
                            MT_REMARK
                            TEMP_PRICE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRP_COMBINED:",
                JSON.stringify(data.mgrKsvPoMrpCombinedQuery.length),
            );
            return data.mgrKsvPoMrpCombinedQuery;
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
                    mutation CreateKSV_PO_MRP_COMBINED(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $matlPrice: Float
                        $useSize: String
                        $useQty: Float
                        $poQty: Float
                        $befPoQty: Float
                        $diffQty: Float
                        $diffPoType: String
                        $changeReason: String
                        $usePoType: String
                        $poMatlCd: String
                        $poMrpSeq: Int
                        $currCd: String
                        $totAmt: Float
                        $currDate: String
                        $usdAmt: Float
                        $reasonType: String
                        $fareType: String
                        $remark: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $stockIdx: String
                        $mtShipQty: Float
                        $mtCutDate: String
                        $mtEtd: String
                        $mtEta: String
                        $mtDelayReason: String
                        $mtDeliveryType: String
                        $mtFareType: String
                        $mtRemark: String
                        $tempPrice: String
                    ) {
                        createKSV_PO_MRP_COMBINED(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            USE_SIZE: $useSize
                            USE_QTY: $useQty
                            PO_QTY: $poQty
                            BEF_PO_QTY: $befPoQty
                            DIFF_QTY: $diffQty
                            DIFF_PO_TYPE: $diffPoType
                            CHANGE_REASON: $changeReason
                            USE_PO_TYPE: $usePoType
                            PO_MATL_CD: $poMatlCd
                            PO_MRP_SEQ: $poMrpSeq
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            CURR_DATE: $currDate
                            USD_AMT: $usdAmt
                            REASON_TYPE: $reasonType
                            FARE_TYPE: $fareType
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            stock_idx: $stockIdx
                            MT_SHIP_QTY: $mtShipQty
                            MT_CUT_DATE: $mtCutDate
                            MT_ETD: $mtEtd
                            MT_ETA: $mtEta
                            MT_DELAY_REASON: $mtDelayReason
                            MT_DELIVERY_TYPE: $mtDeliveryType
                            MT_FARE_TYPE: $mtFareType
                            MT_REMARK: $mtRemark
                            TEMP_PRICE: $tempPrice
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            PO_MATL_CD
                            PO_MRP_SEQ
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            REASON_TYPE
                            FARE_TYPE
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            MT_SHIP_QTY
                            MT_CUT_DATE
                            MT_ETD
                            MT_ETA
                            MT_DELAY_REASON
                            MT_DELIVERY_TYPE
                            MT_FARE_TYPE
                            MT_REMARK
                            TEMP_PRICE
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    useSize: argData.USE_SIZE,
                    useQty: argData.USE_QTY,
                    poQty: argData.PO_QTY,
                    befPoQty: argData.BEF_PO_QTY,
                    diffQty: argData.DIFF_QTY,
                    diffPoType: argData.DIFF_PO_TYPE,
                    changeReason: argData.CHANGE_REASON,
                    usePoType: argData.USE_PO_TYPE,
                    poMatlCd: argData.PO_MATL_CD,
                    poMrpSeq: argData.PO_MRP_SEQ,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    currDate: argData.CURR_DATE,
                    usdAmt: argData.USD_AMT,
                    reasonType: argData.REASON_TYPE,
                    fareType: argData.FARE_TYPE,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stockIdx: argData.stock_idx,
                    mtShipQty: argData.MT_SHIP_QTY,
                    mtCutDate: argData.MT_CUT_DATE,
                    mtEtd: argData.MT_ETD,
                    mtEta: argData.MT_ETA,
                    mtDelayReason: argData.MT_DELAY_REASON,
                    mtDeliveryType: argData.MT_DELIVERY_TYPE,
                    mtFareType: argData.MT_FARE_TYPE,
                    mtRemark: argData.MT_REMARK,
                    tempPrice: argData.TEMP_PRICE,
                },
            });
            console.log(
                "KSV_PO_MRP_COMBINED INSERT:",
                JSON.stringify(data.createKSV_PO_MRP_COMBINED),
            );
            return data.createKSV_PO_MRP_COMBINED;
        } catch (e) {
            console.log("KSV_PO_MRP_COMBINED INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MRP_COMBINED(
                        $updateKsvPoMrpCombinedId: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $matlPrice: Float
                        $useSize: String
                        $useQty: Float
                        $poQty: Float
                        $befPoQty: Float
                        $diffQty: Float
                        $diffPoType: String
                        $changeReason: String
                        $usePoType: String
                        $poMatlCd: String
                        $poMrpSeq: Int
                        $currCd: String
                        $totAmt: Float
                        $currDate: String
                        $usdAmt: Float
                        $reasonType: String
                        $fareType: String
                        $remark: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $stockIdx: String
                        $mtShipQty: Float
                        $mtCutDate: String
                        $mtEtd: String
                        $mtEta: String
                        $mtDelayReason: String
                        $mtDeliveryType: String
                        $mtFareType: String
                        $mtRemark: String
                        $tempPrice: String
                    ) {
                        updateKSV_PO_MRP_COMBINED(
                            id: $updateKsvPoMrpCombinedId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            USE_SIZE: $useSize
                            USE_QTY: $useQty
                            PO_QTY: $poQty
                            BEF_PO_QTY: $befPoQty
                            DIFF_QTY: $diffQty
                            DIFF_PO_TYPE: $diffPoType
                            CHANGE_REASON: $changeReason
                            USE_PO_TYPE: $usePoType
                            PO_MATL_CD: $poMatlCd
                            PO_MRP_SEQ: $poMrpSeq
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            CURR_DATE: $currDate
                            USD_AMT: $usdAmt
                            REASON_TYPE: $reasonType
                            FARE_TYPE: $fareType
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            stock_idx: $stockIdx
                            MT_SHIP_QTY: $mtShipQty
                            MT_CUT_DATE: $mtCutDate
                            MT_ETD: $mtEtd
                            MT_ETA: $mtEta
                            MT_DELAY_REASON: $mtDelayReason
                            MT_DELIVERY_TYPE: $mtDeliveryType
                            MT_FARE_TYPE: $mtFareType
                            MT_REMARK: $mtRemark
                            TEMP_PRICE: $tempPrice
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            PO_MATL_CD
                            PO_MRP_SEQ
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            REASON_TYPE
                            FARE_TYPE
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            MT_SHIP_QTY
                            MT_CUT_DATE
                            MT_ETD
                            MT_ETA
                            MT_DELAY_REASON
                            MT_DELIVERY_TYPE
                            MT_FARE_TYPE
                            MT_REMARK
                            TEMP_PRICE
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrpCombinedId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    useSize: argData.USE_SIZE,
                    useQty: argData.USE_QTY,
                    poQty: argData.PO_QTY,
                    befPoQty: argData.BEF_PO_QTY,
                    diffQty: argData.DIFF_QTY,
                    diffPoType: argData.DIFF_PO_TYPE,
                    changeReason: argData.CHANGE_REASON,
                    usePoType: argData.USE_PO_TYPE,
                    poMatlCd: argData.PO_MATL_CD,
                    poMrpSeq: argData.PO_MRP_SEQ,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    currDate: argData.CURR_DATE,
                    usdAmt: argData.USD_AMT,
                    reasonType: argData.REASON_TYPE,
                    fareType: argData.FARE_TYPE,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stockIdx: argData.stock_idx,
                    mtShipQty: argData.MT_SHIP_QTY,
                    mtCutDate: argData.MT_CUT_DATE,
                    mtEtd: argData.MT_ETD,
                    mtEta: argData.MT_ETA,
                    mtDelayReason: argData.MT_DELAY_REASON,
                    mtDeliveryType: argData.MT_DELIVERY_TYPE,
                    mtFareType: argData.MT_FARE_TYPE,
                    mtRemark: argData.MT_REMARK,
                    tempPrice: argData.TEMP_PRICE,
                },
            });
            console.log(
                "KSV_PO_MRP_COMBINED UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRP_COMBINED),
            );
            return data.updateKSV_PO_MRP_COMBINED;
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
                    mutation DeleteKSV_PO_MRP_COMBINED(
                        $deleteKsvPoMrpCombinedId: Int!
                    ) {
                        deleteKSV_PO_MRP_COMBINED(
                            id: $deleteKsvPoMrpCombinedId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrpCombinedId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRP_COMBINED DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRP_COMBINED),
            );
            return data.deleteKSV_PO_MRP_COMBINED;
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
                    mutation MgrKsvPoMrpCombinedDeletes(
                        $ids: [InputMgrKsvPoMrpCombinedDeletes!]!
                    ) {
                        mgrKsvPoMrpCombinedDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRP_COMBINED DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
