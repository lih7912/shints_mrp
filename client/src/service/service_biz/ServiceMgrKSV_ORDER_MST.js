/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKSV_ORDER_MST {
    async getMaxSeq(argStyleCd, argYY) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderMstMaxSeq($styleCd: String!, $yy: Int!) {
                        mgrKsvOrderMstMaxSeq(STYLE_CD: $styleCd, YY: $yy) {
                            MAX_SEQ
                        }
                    }
                `,
                variables: { styleCd: argStyleCd, yy: argYY },
            });
            console.log(
                "MGR_KSV_ORDER_MST:" +
                    argStyleCd +
                    "," +
                    argYY +
                    "," +
                    JSON.stringify(data.mgrKsvOrderMstMaxSeq),
            );
            return data.mgrKsvOrderMstMaxSeq[0].MAX_SEQ;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qryName, qryBuyerCd, qryOrderStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderMstQuery(
                        $name: String!
                        $buyerCd: String!
                        $orderStatus: String!
                    ) {
                        mgrKsvOrderMstQuery(
                            NAME: $name
                            BUYER_CD: $buyerCd
                            ORDER_STATUS: $orderStatus
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
                            STYLE_ID
                            STYLE_NAME
                            BUYER_CD
                            BUYER_NAME
                            STATUS_NAME
                            PO_CD
                            SHIP_CNT
                        }
                    }
                `,
                variables: {
                    name: qryName,
                    buyerCd: qryBuyerCd,
                    orderStatus: qryOrderStatus,
                },
            });
            console.log(
                "MGR_KSV_ORDER_MST:",
                JSON.stringify(data.mgrKsvOrderMstQuery.length),
            );
            return data.mgrKsvOrderMstQuery;
        } catch (e) {
            return e;
        }
    }

    async getDatasPoByParam(qryName, qryStyleCd, qryBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderMstPoQuery(
                        $name: String!
                        $styleCd: String!
                        $buyerCd: String!
                    ) {
                        mgrKsvOrderMstPoQuery(
                            NAME: $name
                            STYLE_CD: $styleCd
                            BUYER_CD: $buyerCd
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
                            STYLE_NAME
                            BUYER_CD
                            BUYER_NAME
                            STATUS_NAME
                            FACTORY_NAME
                        }
                    }
                `,
                variables: {
                    name: qryName,
                    styleCd: qryStyleCd,
                    buyerCd: qryBuyerCd,
                },
            });
            console.log(
                "MGR_KSV_ORDER_MST_PO:",
                JSON.stringify(data.mgrKsvOrderMstPoQuery.length),
            );
            return data.mgrKsvOrderMstPoQuery;
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
                    mutation MgrKsvOrderMstCreates(
                        $datas: [InputMgrKsvOrderMstCreates!]!
                    ) {
                        mgrKsvOrderMstCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MST CREATES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
