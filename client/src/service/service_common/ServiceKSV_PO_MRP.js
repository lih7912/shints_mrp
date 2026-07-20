/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PO_MRP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRP {
                        allQueryKSV_PO_MRP {
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
                            use_real_qty
                            use_sum_qty
                            use_int_qty
                            adj_po_qty
                            min_conf_user
                            min_conf_datetime
                            seq_comment
                            org_po_seq
                            upd_ck
                            upd_c1
                            stock_chk
                            sum_qty
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRP:",
                JSON.stringify(data.allQueryKSV_PO_MRP.length),
            );
            return data.allQueryKSV_PO_MRP;
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
                    query MgrKsvPoMrpQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrpQuery(
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
                            use_real_qty
                            use_sum_qty
                            use_int_qty
                            adj_po_qty
                            min_conf_user
                            min_conf_datetime
                            seq_comment
                            org_po_seq
                            upd_ck
                            upd_c1
                            stock_chk
                            sum_qty
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRP:",
                JSON.stringify(data.mgrKsvPoMrpQuery.length),
            );
            return data.mgrKsvPoMrpQuery;
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
                    mutation CreateKSV_PO_MRP(
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
                        $useRealQty: Float
                        $useSumQty: Float
                        $useIntQty: Float
                        $adjPoQty: Float
                        $minConfUser: String
                        $minConfDatetime: String
                        $seqComment: String
                        $orgPoSeq: Int
                        $updCk: String
                        $updC1: Int
                        $stockChk: String
                        $sumQty: Float
                    ) {
                        createKSV_PO_MRP(
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
                            use_real_qty: $useRealQty
                            use_sum_qty: $useSumQty
                            use_int_qty: $useIntQty
                            adj_po_qty: $adjPoQty
                            min_conf_user: $minConfUser
                            min_conf_datetime: $minConfDatetime
                            seq_comment: $seqComment
                            org_po_seq: $orgPoSeq
                            upd_ck: $updCk
                            upd_c1: $updC1
                            stock_chk: $stockChk
                            sum_qty: $sumQty
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
                            use_real_qty
                            use_sum_qty
                            use_int_qty
                            adj_po_qty
                            min_conf_user
                            min_conf_datetime
                            seq_comment
                            org_po_seq
                            upd_ck
                            upd_c1
                            stock_chk
                            sum_qty
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
                    useRealQty: argData.use_real_qty,
                    useSumQty: argData.use_sum_qty,
                    useIntQty: argData.use_int_qty,
                    adjPoQty: argData.adj_po_qty,
                    minConfUser: argData.min_conf_user,
                    minConfDatetime: argData.min_conf_datetime,
                    seqComment: argData.seq_comment,
                    orgPoSeq: argData.org_po_seq,
                    updCk: argData.upd_ck,
                    updC1: argData.upd_c1,
                    stockChk: argData.stock_chk,
                    sumQty: argData.sum_qty,
                },
            });
            console.log(
                "KSV_PO_MRP INSERT:",
                JSON.stringify(data.createKSV_PO_MRP),
            );
            return data.createKSV_PO_MRP;
        } catch (e) {
            console.log("KSV_PO_MRP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_MRP(
                        $updateKsvPoMrpId: Int!
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
                        $useRealQty: Float
                        $useSumQty: Float
                        $useIntQty: Float
                        $adjPoQty: Float
                        $minConfUser: String
                        $minConfDatetime: String
                        $seqComment: String
                        $orgPoSeq: Int
                        $updCk: String
                        $updC1: Int
                        $stockChk: String
                        $sumQty: Float
                    ) {
                        updateKSV_PO_MRP(
                            id: $updateKsvPoMrpId
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
                            use_real_qty: $useRealQty
                            use_sum_qty: $useSumQty
                            use_int_qty: $useIntQty
                            adj_po_qty: $adjPoQty
                            min_conf_user: $minConfUser
                            min_conf_datetime: $minConfDatetime
                            seq_comment: $seqComment
                            org_po_seq: $orgPoSeq
                            upd_ck: $updCk
                            upd_c1: $updC1
                            stock_chk: $stockChk
                            sum_qty: $sumQty
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
                            use_real_qty
                            use_sum_qty
                            use_int_qty
                            adj_po_qty
                            min_conf_user
                            min_conf_datetime
                            seq_comment
                            org_po_seq
                            upd_ck
                            upd_c1
                            stock_chk
                            sum_qty
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrpId: argData.id,
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
                    useRealQty: argData.use_real_qty,
                    useSumQty: argData.use_sum_qty,
                    useIntQty: argData.use_int_qty,
                    adjPoQty: argData.adj_po_qty,
                    minConfUser: argData.min_conf_user,
                    minConfDatetime: argData.min_conf_datetime,
                    seqComment: argData.seq_comment,
                    orgPoSeq: argData.org_po_seq,
                    updCk: argData.upd_ck,
                    updC1: argData.upd_c1,
                    stockChk: argData.stock_chk,
                    sumQty: argData.sum_qty,
                },
            });
            console.log(
                "KSV_PO_MRP UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRP),
            );
            return data.updateKSV_PO_MRP;
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
                    mutation DeleteKSV_PO_MRP($deleteKsvPoMrpId: Int!) {
                        deleteKSV_PO_MRP(id: $deleteKsvPoMrpId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrpId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRP DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRP),
            );
            return data.deleteKSV_PO_MRP;
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
                    mutation MgrKsvPoMrpDeletes(
                        $ids: [InputMgrKsvPoMrpDeletes!]!
                    ) {
                        mgrKsvPoMrpDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
