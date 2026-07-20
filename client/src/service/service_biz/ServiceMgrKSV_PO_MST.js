/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKSV_PO_MST {
    async getMaxSeq(argPoCd, argYY) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMstMaxSeq($poCd: String!, $yy: Int!) {
                        mgrKsvPoMstMaxSeq(PO_CD: $poCd, YY: $yy) {
                            MAX_SEQ
                        }
                    }
                `,
                variables: { poCd: argPoCd, yy: argYY },
            });
            console.log(
                "MGR_KSV_PO_MST:" +
                    argPoCd +
                    "," +
                    argYY +
                    "," +
                    JSON.stringify(data.mgrKsvPoMstMaxSeq),
            );
            return data.mgrKsvPoMstMaxSeq[0].MAX_SEQ;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParamArray(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tInputs = {};
        tInputs.datas = argDatas;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMstQuerys($datas: [InputMgrKsvPoMstQrys!]!) {
                        mgrKsvPoMstQuerys(datas: $datas) {
                            id
                            ORDER_CD
                            STYLE_CD
                            ORDER_TYPE
                            YY
                            SEQ
                            TOT_CNT
                            ADD_CNT
                            AVR_PRICE
                            FC_BEF
                            FC_PRICE
                            MATL_AMT
                            ETC_AMT
                            COMMISSION
                            COMM1
                            COMM2
                            OVER_FLAG
                            OVER_QTY
                            OVER_AMT
                            OVER_BILL
                            CURR_CD
                            USD_PRICE
                            ORDER_DATE
                            DUE_DATE
                            MATL_DUE_DATE
                            NAT_CD
                            FACTORY_CD
                            SIZE_GROUP
                            ORDER_FLAG
                            SAMPLE_FLAG
                            MATL_SALE_FLAG
                            FAC_LC_FLAG
                            FAC_TT_FLAG
                            ORDER_STATUS
                            END_DATETIME
                            REMARK
                            REF_ORDER_NO
                            REF_NO
                            REF_Q_OUTER
                            REF_Q_LINER
                            REF_ORDER_REQ
                            REF_COLOR1
                            REF_COLOR2
                            REF_SIZE1
                            REF_SIZE2
                            REF_QTY1
                            REF_QTY2
                            MATL_PAY_FLAG
                            MATL_PAY_USER
                            MATL_PAY_DATETIME
                            FC_NEGO_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            APPROVAL_USER
                            APPROVAL_DATETIME
                            brand
                            season
                            krw_flag
                            krw_matl_amt
                            margin
                            frt_check
                            category
                            ORG_DUE_DATE
                            BUYER_TEAM
                            SAMPLE_COST_FLAG
                            DL_FLAG
                            TRADE_PRICE
                            LINE_CHARGE_PRICE
                            DUTY
                            mid_size1
                            mid_size2
                            mid_size3
                            mid_size4
                            END_STATUS
                            FC_PRICE2
                            CANCEL_DATETIME
                            PO_MATL_AMT
                            PO_CD
                            STYLE_NAME
                            BUYER_CD
                            BUYER_NAME
                            STATUS_NAME
                            FACTORY_NAME
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "MGR_KSV_PO_MST:",
                JSON.stringify(data.mgrKsvPoMstQuerys.length),
            );
            return data.mgrKsvPoMstQuerys;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(argPoCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMstQuery($name: String!) {
                        mgrKsvPoMstQuery(NAME: $name) {
                            id
                            ORDER_CD
                            STYLE_CD
                            ORDER_TYPE
                            YY
                            SEQ
                            TOT_CNT
                            ADD_CNT
                            AVR_PRICE
                            FC_BEF
                            FC_PRICE
                            MATL_AMT
                            ETC_AMT
                            COMMISSION
                            COMM1
                            COMM2
                            OVER_FLAG
                            OVER_QTY
                            OVER_AMT
                            OVER_BILL
                            CURR_CD
                            USD_PRICE
                            ORDER_DATE
                            DUE_DATE
                            MATL_DUE_DATE
                            NAT_CD
                            FACTORY_CD
                            SIZE_GROUP
                            ORDER_FLAG
                            SAMPLE_FLAG
                            MATL_SALE_FLAG
                            FAC_LC_FLAG
                            FAC_TT_FLAG
                            ORDER_STATUS
                            END_DATETIME
                            REMARK
                            REF_ORDER_NO
                            REF_NO
                            REF_Q_OUTER
                            REF_Q_LINER
                            REF_ORDER_REQ
                            REF_COLOR1
                            REF_COLOR2
                            REF_SIZE1
                            REF_SIZE2
                            REF_QTY1
                            REF_QTY2
                            MATL_PAY_FLAG
                            MATL_PAY_USER
                            MATL_PAY_DATETIME
                            FC_NEGO_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            APPROVAL_USER
                            APPROVAL_DATETIME
                            brand
                            season
                            krw_flag
                            krw_matl_amt
                            margin
                            frt_check
                            category
                            ORG_DUE_DATE
                            BUYER_TEAM
                            SAMPLE_COST_FLAG
                            DL_FLAG
                            TRADE_PRICE
                            LINE_CHARGE_PRICE
                            DUTY
                            mid_size1
                            mid_size2
                            mid_size3
                            mid_size4
                            END_STATUS
                            FC_PRICE2
                            CANCEL_DATETIME
                            PO_MATL_AMT
                            PO_CD
                            STYLE_NAME
                            BUYER_CD
                            BUYER_NAME
                            STATUS_NAME
                            FACTORY_NAME
                        }
                    }
                `,
                variables: { name: argPoCd },
            });
            console.log(
                "MGR_KSV_PO_MST:",
                JSON.stringify(data.mgrKsvPoMstQuery.length),
            );
            return data.mgrKsvPoMstQuery;
        } catch (e) {
            return e;
        }
    }

    async getDatasListPoMst(argPoKind, argPoStatus, argPoCd, argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMstList(
                        $poType: String!
                        $poStatus: String!
                        $poCd: String!
                        $buyerCd: String!
                    ) {
                        mgrKsvPoMstList(
                            PO_TYPE: $poType
                            PO_STATUS: $poStatus
                            PO_CD: $poCd
                            BUYER_CD: $buyerCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            PO_TYPE
                            PO_DATE
                            PO_STATUS
                            MATL_DUE_DATE
                            PROD_DUE_DATE
                            PO_CONF_DATE
                            PLACE_CD
                            CURR_DATE
                            FACTORY_CD
                            DELIVERY_TYPE
                            YY
                            SEQ
                            PO_USER_MAIN
                            PO_USER_SUB
                            CLOSE_FLAG
                            CLOSE_USER
                            CLOSE_DATETIME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            PLAN_FLAG
                            PLAN_ETD
                            PLAN_ETA
                            BVT_FLAG
                            ENTRY
                            ENTRY_DATE
                            NEW_FLAG
                            STOCK_MOVE_DATE
                            ORDER_CD
                            BUYER_CD
                            PO_TYPE_NAME
                            PO_STATUS_NAME
                            FACTORY_NAME
                        }
                    }
                `,

                variables: {
                    poType: argPoKind,
                    poStatus: argPoStatus,
                    poCd: argPoCd,
                    buyerCd: argBuyerCd,
                },
            });
            console.log(
                "MGR_KSV_PO_MST_LIST:",
                JSON.stringify(data.mgrKsvPoMstList.length),
            );
            return data.mgrKsvPoMstList;
        } catch (e) {
            return e;
        }
    }

    async getDatasListPoMem(argPoCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMemList($poCd: String!) {
                        mgrKsvPoMemList(PO_CD: $poCd) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            CONS_F
                            CONS_A
                            STYLE_NAME
                            TOT_CNT
                            ORDER_STATUS_NAME
                            ORDER_DUE_DATE
                        }
                    }
                `,
                variables: { poCd: argPoCd },
            });
            console.log(
                "MGR_KSV_PO_MEM_LIST:",
                JSON.stringify(data.mgrKsvPoMemList.length),
            );
            return data.mgrKsvPoMemList;
        } catch (e) {
            return e;
        }
    }

    async getDatasListPoMrp(argPoCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMrpList($poCd: String!) {
                        mgrKsvPoMrpList(PO_CD: $poCd) {
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
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            VENDOR_NAME
                            USE_PO_TYPE_NAME
                            RACK
                            STOCK_MATL_CD
                            S_STOCK_IDX
                            STOCK_QTY
                        }
                    }
                `,
                variables: { poCd: argPoCd },
            });
            console.log(
                "MGR_KSV_PO_MRP_LIST:",
                JSON.stringify(data.mgrKsvPoMrpList.length),
            );
            return data.mgrKsvPoMrpList;
        } catch (e) {
            return e;
        }
    }

    async getDatasListStockMatl(argMatlCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockMatlList(
                        $matlCd: String!
                        $matlName: String!
                        $color: String!
                        $rack: String!
                        $spec: String!
                        $vendor: String!
                        $factory: String!
                    ) {
                        mgrKsvStockMatlList(
                            MATL_CD: $matlCd
                            MATL_NAME: $matlName
                            COLOR: $color
                            RACK: $rack
                            SPEC: $spec
                            VENDOR: $vendor
                            FACTORY: $factory
                        ) {
                            id
                            STOCK_IDX
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            OUT_QTY
                            FACTORY_CD
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            ORG_STOCK_IDX
                            GROUP_CD
                            REASON_REMARK
                            PLAN_REMARK
                            move_flag
                            temp
                            DEBIT_CD
                            root_idx
                            EXP_DATE
                            REMARK0
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    matlCd: argMatlCd,
                    matlName: "",
                    color: "",
                    rack: "",
                    spec: "",
                    vendor: "",
                    factory: "",
                },
            });
            console.log(
                "MGR_KSV_STOCK_MATL_LIST:",
                JSON.stringify(data.mgrKsvStockMatlList.length),
            );
            return data.mgrKsvStockMatlList;
        } catch (e) {
            return e;
        }
    }

    async getDatasListPoNewList(
        qryPoCd,
        qryPoSeq,
        qryMatlType,
        qryVendorType,
        qryVendorCd,
        qryDESP,
        qryCOLOR,
        qrySPEC,
        qryMATL_CD,
    ) {
        var argPoCd = qryPoCd;

        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoNewList(
                        $poCd: String!
                        $poSeq: Int!
                        $matlType: String!
                        $vendorType: String!
                        $vendorCd: String!
                        $desp: String!
                        $color: String!
                        $spec: String!
                        $matlCd: String!
                    ) {
                        mgrKsvPoNewList(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            MATL_TYPE: $matlType
                            VENDOR_TYPE: $vendorType
                            VENDOR_CD: $vendorCd
                            DESP: $desp
                            COLOR: $color
                            SPEC: $spec
                            MATL_CD: $matlCd
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
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            USE_PO_TYPE_NAME
                            DIFF_PO_TYPE_NAME
                            LEFT_OVER
                            STOCK_QTY1
                        }
                    }
                `,
                variables: {
                    poCd: argPoCd,
                    poSeq: 1,
                    matlType: "",
                    vendorType: "",
                    vendorCd: "",
                    desp: "",
                    color: "",
                    spec: "",
                    matlCd: "",
                },
            });
            console.log(
                "PO_NEW_LIST:",
                JSON.stringify(data.mgrKsvPoNewList.length),
            );
            return data.mgrKsvPoNewList;
        } catch (e) {
            return e;
        }
    }

    async getDatasPoDiffList(argPoCd, argPoSeq) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoDiffList($poCd: String!, $poSeq: Int!) {
                        mgrKsvPoDiffList(PO_CD: $poCd, PO_SEQ: $poSeq) {
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
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            USE_PO_TYPE_NAME
                            DIFF_PO_TYPE_NAME
                            LEFT_OVER
                            STOCK_QTY1
                        }
                    }
                `,
                variables: { poCd: argPoCd, poSeq: argPoSeq },
            });
            console.log(
                "PO_NEW_LIST:",
                JSON.stringify(data.mgrKsvPoDiffList.length),
            );
            return data.mgrKsvPoDiffList;
        } catch (e) {
            return e;
        }
    }

    async processPoFix(argPoCd, argFactoryCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvProcessPoFix(
                        $poCd: String!
                        $factoryCd: String!
                    ) {
                        mgrKsvProcessPoFix(
                            PO_CD: $poCd
                            FACTORY_CD: $factoryCd
                        ) {
                            count
                        }
                    }
                `,
                variables: { poCd: argPoCd, factoryCd: argFactoryCd },
            });
            console.log(
                "processPoFix:",
                JSON.stringify(data.mgrKsvProcessPoFix),
            );
            return data.mgrKsvProcessPoFix;
        } catch (e) {
            return e;
        }
    }

    async processStockCheck(argPoCd, argPoSeq) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvProcessStockCheck($poCd: String!) {
                        mgrKsvProcessStockCheck(PO_CD: $poCd) {
                            count
                        }
                    }
                `,
                variables: { poCd: argPoCd },
            });
            console.log(
                "processStockCheck:",
                JSON.stringify(data.mgrKsvProcessStockCheck),
            );
            return data.mgrKsvProcessStockCheck;
        } catch (e) {
            return e;
        }
    }

    async processMRP(argPoCd, argPoSeq) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvProcessMrp($poCd: String!) {
                        mgrKsvProcessMrp(PO_CD: $poCd) {
                            count
                        }
                    }
                `,
                variables: { poCd: argPoCd },
            });
            console.log("processMRP:", JSON.stringify(data.mgrKsvProcessMrp));
            return data.mgrKsvProcessMrp;
        } catch (e) {
            return e;
        }
    }

    async createsData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tInputs = {};
        tInputs.datas = argDatas;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvPoMstCreates(
                        $datas: [InputMgrKsvPoMstCreates!]!
                    ) {
                        mgrKsvPoMstCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MST CREATES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tArray = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tObj = argDatas[tIdx];
            var tObj0 = {};
            tObj0.id = tObj.id;
            tArray.push(tObj0);
        }

        var tInputs = {};
        tInputs.ids = tArray;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvPoMstDeletes(
                        $ids: [InputMgrKsvPoMstDeletes!]!
                    ) {
                        mgrKsvPoMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MST DELETS:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
