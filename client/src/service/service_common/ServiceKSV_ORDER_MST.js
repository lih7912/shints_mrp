/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MST {
                        allQueryKSV_ORDER_MST {
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
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MST:",
                JSON.stringify(data.allQueryKSV_ORDER_MST.length),
            );
            return data.allQueryKSV_ORDER_MST;
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
                    query MgrKsvOrderMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
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
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MST:",
                JSON.stringify(data.mgrKsvOrderMstQuery.length),
            );
            return data.mgrKsvOrderMstQuery;
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
                    mutation CreateKSV_ORDER_MST(
                        $orderCd: String
                        $styleCd: String
                        $orderType: String
                        $yy: Int
                        $seq: Int
                        $totCnt: Int
                        $addCnt: Int
                        $avrPrice: Float
                        $fcBef: Float
                        $fcPrice: Float
                        $matlAmt: Float
                        $etcAmt: Float
                        $commission: Float
                        $comm1: Float
                        $comm2: Float
                        $overFlag: String
                        $overQty: Int
                        $overAmt: Float
                        $overBill: String
                        $currCd: String
                        $usdPrice: Float
                        $orderDate: String
                        $dueDate: String
                        $matlDueDate: String
                        $natCd: String
                        $factoryCd: String
                        $sizeGroup: String
                        $orderFlag: String
                        $sampleFlag: String
                        $matlSaleFlag: String
                        $facLcFlag: String
                        $facTtFlag: String
                        $orderStatus: String
                        $endDatetime: String
                        $remark: String
                        $refOrderNo: String
                        $refNo: String
                        $refQOuter: String
                        $refQLiner: String
                        $refOrderReq: String
                        $refColor1: String
                        $refColor2: String
                        $refSize1: String
                        $refSize2: String
                        $refQty1: String
                        $refQty2: String
                        $matlPayFlag: String
                        $matlPayUser: String
                        $matlPayDatetime: String
                        $fcNegoType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $approvalUser: String
                        $approvalDatetime: String
                        $brand: String
                        $season: String
                        $krwFlag: String
                        $krwMatlAmt: Float
                        $margin: Float
                        $frtCheck: String
                        $category: String
                        $orgDueDate: String
                        $buyerTeam: String
                        $sampleCostFlag: String
                        $dlFlag: String
                        $tradePrice: Float
                        $lineChargePrice: Float
                        $duty: Float
                        $midSize1: String
                        $midSize2: String
                        $midSize3: String
                        $midSize4: String
                        $endStatus: String
                        $fcPrice2: Float
                        $cancelDatetime: String
                        $poMatlAmt: Float
                    ) {
                        createKSV_ORDER_MST(
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            ORDER_TYPE: $orderType
                            YY: $yy
                            SEQ: $seq
                            TOT_CNT: $totCnt
                            ADD_CNT: $addCnt
                            AVR_PRICE: $avrPrice
                            FC_BEF: $fcBef
                            FC_PRICE: $fcPrice
                            MATL_AMT: $matlAmt
                            ETC_AMT: $etcAmt
                            COMMISSION: $commission
                            COMM1: $comm1
                            COMM2: $comm2
                            OVER_FLAG: $overFlag
                            OVER_QTY: $overQty
                            OVER_AMT: $overAmt
                            OVER_BILL: $overBill
                            CURR_CD: $currCd
                            USD_PRICE: $usdPrice
                            ORDER_DATE: $orderDate
                            DUE_DATE: $dueDate
                            MATL_DUE_DATE: $matlDueDate
                            NAT_CD: $natCd
                            FACTORY_CD: $factoryCd
                            SIZE_GROUP: $sizeGroup
                            ORDER_FLAG: $orderFlag
                            SAMPLE_FLAG: $sampleFlag
                            MATL_SALE_FLAG: $matlSaleFlag
                            FAC_LC_FLAG: $facLcFlag
                            FAC_TT_FLAG: $facTtFlag
                            ORDER_STATUS: $orderStatus
                            END_DATETIME: $endDatetime
                            REMARK: $remark
                            REF_ORDER_NO: $refOrderNo
                            REF_NO: $refNo
                            REF_Q_OUTER: $refQOuter
                            REF_Q_LINER: $refQLiner
                            REF_ORDER_REQ: $refOrderReq
                            REF_COLOR1: $refColor1
                            REF_COLOR2: $refColor2
                            REF_SIZE1: $refSize1
                            REF_SIZE2: $refSize2
                            REF_QTY1: $refQty1
                            REF_QTY2: $refQty2
                            MATL_PAY_FLAG: $matlPayFlag
                            MATL_PAY_USER: $matlPayUser
                            MATL_PAY_DATETIME: $matlPayDatetime
                            FC_NEGO_TYPE: $fcNegoType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            APPROVAL_USER: $approvalUser
                            APPROVAL_DATETIME: $approvalDatetime
                            brand: $brand
                            season: $season
                            krw_flag: $krwFlag
                            krw_matl_amt: $krwMatlAmt
                            margin: $margin
                            frt_check: $frtCheck
                            category: $category
                            ORG_DUE_DATE: $orgDueDate
                            BUYER_TEAM: $buyerTeam
                            SAMPLE_COST_FLAG: $sampleCostFlag
                            DL_FLAG: $dlFlag
                            TRADE_PRICE: $tradePrice
                            LINE_CHARGE_PRICE: $lineChargePrice
                            DUTY: $duty
                            mid_size1: $midSize1
                            mid_size2: $midSize2
                            mid_size3: $midSize3
                            mid_size4: $midSize4
                            END_STATUS: $endStatus
                            FC_PRICE2: $fcPrice2
                            CANCEL_DATETIME: $cancelDatetime
                            PO_MATL_AMT: $poMatlAmt
                        ) {
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
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    orderType: argData.ORDER_TYPE,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    totCnt: argData.TOT_CNT,
                    addCnt: argData.ADD_CNT,
                    avrPrice: argData.AVR_PRICE,
                    fcBef: argData.FC_BEF,
                    fcPrice: argData.FC_PRICE,
                    matlAmt: argData.MATL_AMT,
                    etcAmt: argData.ETC_AMT,
                    commission: argData.COMMISSION,
                    comm1: argData.COMM1,
                    comm2: argData.COMM2,
                    overFlag: argData.OVER_FLAG,
                    overQty: argData.OVER_QTY,
                    overAmt: argData.OVER_AMT,
                    overBill: argData.OVER_BILL,
                    currCd: argData.CURR_CD,
                    usdPrice: argData.USD_PRICE,
                    orderDate: argData.ORDER_DATE,
                    dueDate: argData.DUE_DATE,
                    matlDueDate: argData.MATL_DUE_DATE,
                    natCd: argData.NAT_CD,
                    factoryCd: argData.FACTORY_CD,
                    sizeGroup: argData.SIZE_GROUP,
                    orderFlag: argData.ORDER_FLAG,
                    sampleFlag: argData.SAMPLE_FLAG,
                    matlSaleFlag: argData.MATL_SALE_FLAG,
                    facLcFlag: argData.FAC_LC_FLAG,
                    facTtFlag: argData.FAC_TT_FLAG,
                    orderStatus: argData.ORDER_STATUS,
                    endDatetime: argData.END_DATETIME,
                    remark: argData.REMARK,
                    refOrderNo: argData.REF_ORDER_NO,
                    refNo: argData.REF_NO,
                    refQOuter: argData.REF_Q_OUTER,
                    refQLiner: argData.REF_Q_LINER,
                    refOrderReq: argData.REF_ORDER_REQ,
                    refColor1: argData.REF_COLOR1,
                    refColor2: argData.REF_COLOR2,
                    refSize1: argData.REF_SIZE1,
                    refSize2: argData.REF_SIZE2,
                    refQty1: argData.REF_QTY1,
                    refQty2: argData.REF_QTY2,
                    matlPayFlag: argData.MATL_PAY_FLAG,
                    matlPayUser: argData.MATL_PAY_USER,
                    matlPayDatetime: argData.MATL_PAY_DATETIME,
                    fcNegoType: argData.FC_NEGO_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    approvalUser: argData.APPROVAL_USER,
                    approvalDatetime: argData.APPROVAL_DATETIME,
                    brand: argData.brand,
                    season: argData.season,
                    krwFlag: argData.krw_flag,
                    krwMatlAmt: argData.krw_matl_amt,
                    margin: argData.margin,
                    frtCheck: argData.frt_check,
                    category: argData.category,
                    orgDueDate: argData.ORG_DUE_DATE,
                    buyerTeam: argData.BUYER_TEAM,
                    sampleCostFlag: argData.SAMPLE_COST_FLAG,
                    dlFlag: argData.DL_FLAG,
                    tradePrice: argData.TRADE_PRICE,
                    lineChargePrice: argData.LINE_CHARGE_PRICE,
                    duty: argData.DUTY,
                    midSize1: argData.mid_size1,
                    midSize2: argData.mid_size2,
                    midSize3: argData.mid_size3,
                    midSize4: argData.mid_size4,
                    endStatus: argData.END_STATUS,
                    fcPrice2: argData.FC_PRICE2,
                    cancelDatetime: argData.CANCEL_DATETIME,
                    poMatlAmt: argData.PO_MATL_AMT,
                },
            });
            console.log(
                "KSV_ORDER_MST INSERT:",
                JSON.stringify(data.createKSV_ORDER_MST),
            );
            return data.createKSV_ORDER_MST;
        } catch (e) {
            console.log("KSV_ORDER_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_MST(
                        $updateKsvOrderMstId: Int!
                        $orderCd: String
                        $styleCd: String
                        $orderType: String
                        $yy: Int
                        $seq: Int
                        $totCnt: Int
                        $addCnt: Int
                        $avrPrice: Float
                        $fcBef: Float
                        $fcPrice: Float
                        $matlAmt: Float
                        $etcAmt: Float
                        $commission: Float
                        $comm1: Float
                        $comm2: Float
                        $overFlag: String
                        $overQty: Int
                        $overAmt: Float
                        $overBill: String
                        $currCd: String
                        $usdPrice: Float
                        $orderDate: String
                        $dueDate: String
                        $matlDueDate: String
                        $natCd: String
                        $factoryCd: String
                        $sizeGroup: String
                        $orderFlag: String
                        $sampleFlag: String
                        $matlSaleFlag: String
                        $facLcFlag: String
                        $facTtFlag: String
                        $orderStatus: String
                        $endDatetime: String
                        $remark: String
                        $refOrderNo: String
                        $refNo: String
                        $refQOuter: String
                        $refQLiner: String
                        $refOrderReq: String
                        $refColor1: String
                        $refColor2: String
                        $refSize1: String
                        $refSize2: String
                        $refQty1: String
                        $refQty2: String
                        $matlPayFlag: String
                        $matlPayUser: String
                        $matlPayDatetime: String
                        $fcNegoType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $approvalUser: String
                        $approvalDatetime: String
                        $brand: String
                        $season: String
                        $krwFlag: String
                        $krwMatlAmt: Float
                        $margin: Float
                        $frtCheck: String
                        $category: String
                        $orgDueDate: String
                        $buyerTeam: String
                        $sampleCostFlag: String
                        $dlFlag: String
                        $tradePrice: Float
                        $lineChargePrice: Float
                        $duty: Float
                        $midSize1: String
                        $midSize2: String
                        $midSize3: String
                        $midSize4: String
                        $endStatus: String
                        $fcPrice2: Float
                        $cancelDatetime: String
                        $poMatlAmt: Float
                    ) {
                        updateKSV_ORDER_MST(
                            id: $updateKsvOrderMstId
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            ORDER_TYPE: $orderType
                            YY: $yy
                            SEQ: $seq
                            TOT_CNT: $totCnt
                            ADD_CNT: $addCnt
                            AVR_PRICE: $avrPrice
                            FC_BEF: $fcBef
                            FC_PRICE: $fcPrice
                            MATL_AMT: $matlAmt
                            ETC_AMT: $etcAmt
                            COMMISSION: $commission
                            COMM1: $comm1
                            COMM2: $comm2
                            OVER_FLAG: $overFlag
                            OVER_QTY: $overQty
                            OVER_AMT: $overAmt
                            OVER_BILL: $overBill
                            CURR_CD: $currCd
                            USD_PRICE: $usdPrice
                            ORDER_DATE: $orderDate
                            DUE_DATE: $dueDate
                            MATL_DUE_DATE: $matlDueDate
                            NAT_CD: $natCd
                            FACTORY_CD: $factoryCd
                            SIZE_GROUP: $sizeGroup
                            ORDER_FLAG: $orderFlag
                            SAMPLE_FLAG: $sampleFlag
                            MATL_SALE_FLAG: $matlSaleFlag
                            FAC_LC_FLAG: $facLcFlag
                            FAC_TT_FLAG: $facTtFlag
                            ORDER_STATUS: $orderStatus
                            END_DATETIME: $endDatetime
                            REMARK: $remark
                            REF_ORDER_NO: $refOrderNo
                            REF_NO: $refNo
                            REF_Q_OUTER: $refQOuter
                            REF_Q_LINER: $refQLiner
                            REF_ORDER_REQ: $refOrderReq
                            REF_COLOR1: $refColor1
                            REF_COLOR2: $refColor2
                            REF_SIZE1: $refSize1
                            REF_SIZE2: $refSize2
                            REF_QTY1: $refQty1
                            REF_QTY2: $refQty2
                            MATL_PAY_FLAG: $matlPayFlag
                            MATL_PAY_USER: $matlPayUser
                            MATL_PAY_DATETIME: $matlPayDatetime
                            FC_NEGO_TYPE: $fcNegoType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            APPROVAL_USER: $approvalUser
                            APPROVAL_DATETIME: $approvalDatetime
                            brand: $brand
                            season: $season
                            krw_flag: $krwFlag
                            krw_matl_amt: $krwMatlAmt
                            margin: $margin
                            frt_check: $frtCheck
                            category: $category
                            ORG_DUE_DATE: $orgDueDate
                            BUYER_TEAM: $buyerTeam
                            SAMPLE_COST_FLAG: $sampleCostFlag
                            DL_FLAG: $dlFlag
                            TRADE_PRICE: $tradePrice
                            LINE_CHARGE_PRICE: $lineChargePrice
                            DUTY: $duty
                            mid_size1: $midSize1
                            mid_size2: $midSize2
                            mid_size3: $midSize3
                            mid_size4: $midSize4
                            END_STATUS: $endStatus
                            FC_PRICE2: $fcPrice2
                            CANCEL_DATETIME: $cancelDatetime
                            PO_MATL_AMT: $poMatlAmt
                        ) {
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
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMstId: argData.id,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    orderType: argData.ORDER_TYPE,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    totCnt: argData.TOT_CNT,
                    addCnt: argData.ADD_CNT,
                    avrPrice: argData.AVR_PRICE,
                    fcBef: argData.FC_BEF,
                    fcPrice: argData.FC_PRICE,
                    matlAmt: argData.MATL_AMT,
                    etcAmt: argData.ETC_AMT,
                    commission: argData.COMMISSION,
                    comm1: argData.COMM1,
                    comm2: argData.COMM2,
                    overFlag: argData.OVER_FLAG,
                    overQty: argData.OVER_QTY,
                    overAmt: argData.OVER_AMT,
                    overBill: argData.OVER_BILL,
                    currCd: argData.CURR_CD,
                    usdPrice: argData.USD_PRICE,
                    orderDate: argData.ORDER_DATE,
                    dueDate: argData.DUE_DATE,
                    matlDueDate: argData.MATL_DUE_DATE,
                    natCd: argData.NAT_CD,
                    factoryCd: argData.FACTORY_CD,
                    sizeGroup: argData.SIZE_GROUP,
                    orderFlag: argData.ORDER_FLAG,
                    sampleFlag: argData.SAMPLE_FLAG,
                    matlSaleFlag: argData.MATL_SALE_FLAG,
                    facLcFlag: argData.FAC_LC_FLAG,
                    facTtFlag: argData.FAC_TT_FLAG,
                    orderStatus: argData.ORDER_STATUS,
                    endDatetime: argData.END_DATETIME,
                    remark: argData.REMARK,
                    refOrderNo: argData.REF_ORDER_NO,
                    refNo: argData.REF_NO,
                    refQOuter: argData.REF_Q_OUTER,
                    refQLiner: argData.REF_Q_LINER,
                    refOrderReq: argData.REF_ORDER_REQ,
                    refColor1: argData.REF_COLOR1,
                    refColor2: argData.REF_COLOR2,
                    refSize1: argData.REF_SIZE1,
                    refSize2: argData.REF_SIZE2,
                    refQty1: argData.REF_QTY1,
                    refQty2: argData.REF_QTY2,
                    matlPayFlag: argData.MATL_PAY_FLAG,
                    matlPayUser: argData.MATL_PAY_USER,
                    matlPayDatetime: argData.MATL_PAY_DATETIME,
                    fcNegoType: argData.FC_NEGO_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    approvalUser: argData.APPROVAL_USER,
                    approvalDatetime: argData.APPROVAL_DATETIME,
                    brand: argData.brand,
                    season: argData.season,
                    krwFlag: argData.krw_flag,
                    krwMatlAmt: argData.krw_matl_amt,
                    margin: argData.margin,
                    frtCheck: argData.frt_check,
                    category: argData.category,
                    orgDueDate: argData.ORG_DUE_DATE,
                    buyerTeam: argData.BUYER_TEAM,
                    sampleCostFlag: argData.SAMPLE_COST_FLAG,
                    dlFlag: argData.DL_FLAG,
                    tradePrice: argData.TRADE_PRICE,
                    lineChargePrice: argData.LINE_CHARGE_PRICE,
                    duty: argData.DUTY,
                    midSize1: argData.mid_size1,
                    midSize2: argData.mid_size2,
                    midSize3: argData.mid_size3,
                    midSize4: argData.mid_size4,
                    endStatus: argData.END_STATUS,
                    fcPrice2: argData.FC_PRICE2,
                    cancelDatetime: argData.CANCEL_DATETIME,
                    poMatlAmt: argData.PO_MATL_AMT,
                },
            });
            console.log(
                "KSV_ORDER_MST UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MST),
            );
            return data.updateKSV_ORDER_MST;
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
                    mutation DeleteKSV_ORDER_MST($deleteKsvOrderMstId: Int!) {
                        deleteKSV_ORDER_MST(id: $deleteKsvOrderMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMstId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MST DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MST),
            );
            return data.deleteKSV_ORDER_MST;
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
                    mutation MgrKsvOrderMstDeletes(
                        $ids: [InputMgrKsvOrderMstDeletes!]!
                    ) {
                        mgrKsvOrderMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
