/* eslint-disable */
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS040102_PURCHASER_INFO {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_UPDATE_MEMO(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S040102_5_UPDATE_MEMO(
                        $datas: I_S040102_5_UPDATE_MEMO!
                    ) {
                        mgrUpdate_S040102_5_UPDATE_MEMO(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S040102_5_UPDATE_MEMO;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_PU_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5($datas: [I_S040102_5!]!) {
                        mgrInsert_S040102_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "mgrInsert_S040102_5 call succeed: " + data.mgrInsert_S040102_5,
            );
            return data.mgrInsert_S040102_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_DEPOSIT(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_INSERT_DEPOSIT(
                        $datas: I_S040102_5_INSERT_DEPOSIT!
                    ) {
                        mgrInsert_S040102_5_INSERT_DEPOSIT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_INSERT_DEPOSIT;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrCancel_DEPOSIT(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_CANCEL_DEPOSIT(
                        $datas: I_S040102_5_INSERT_DEPOSIT!
                    ) {
                        mgrInsert_S040102_5_CANCEL_DEPOSIT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_CANCEL_DEPOSIT;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_LC(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_INSERT_LC(
                        $datas: I_S040102_5_INSERT_LC!
                        $datas1: [I_S040102_5_INSERT_LC_2!]!
                    ) {
                        mgrInsert_S040102_5_INSERT_LC(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                },
            });
            return data.mgrInsert_S040102_5_INSERT_LC;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrCancel_LC(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_CANCEL_LC(
                        $datas: I_S040102_5_INSERT_LC!
                    ) {
                        mgrInsert_S040102_5_CANCEL_LC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_CANCEL_LC;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_PU_MST_1(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_pu_mst(
                        $datas: I_S040102_5_edit!
                        $datas1: [I_S040102_5_tbl1!]!
                        $datas2: [I_S040102_5_tbl2!]!
                    ) {
                        mgrInsert_S040102_5_pu_mst(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                    datas2: argInputData2,
                },
            });
            return data.mgrInsert_S040102_5_pu_mst;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_PU_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S040102_5($datas: I_S040102_5_1!) {
                        mgrDelete_S040102_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S040102_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_MOQ_CONFIRM(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_MOQ_CONFIRM(
                        $datas: [I_S040102_5_tbl2!]!
                    ) {
                        mgrInsert_S040102_5_MOQ_CONFIRM(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_MOQ_CONFIRM;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_MOQ_CANCEL(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_MOQ_CANCEL(
                        $datas: [I_S040102_5_tbl2!]!
                    ) {
                        mgrInsert_S040102_5_MOQ_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_MOQ_CANCEL;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KCD_VENDOR

    async mgrQuery_CODE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_1_CODE {
                        mgrQueryS040102_1_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS040102_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_1_CODE2($data: I_S040102_CODE!) {
                        mgrQueryS040102_1_CODE2(data: $data) {
                            PLACE_CD {
                                PLACE_CD
                                PLACE_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            NORMI {
                                CD_CODE
                                CD_NAME
                            }
                            TRADE_TERM {
                                CD_CODE
                                CD_NAME
                            }
                            SHIP_MODE {
                                CD_CODE
                                CD_NAME
                            }
                            BILL_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            CURR_CD {
                                CD_CODE
                                CD_NAME
                            }
                            ORIGIN_PORT {
                                CD_CODE
                                CD_NAME
                            }
                            PU_STATUS {
                                CD_CODE
                                CD_NAME
                            }
                            VENDOR_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_1_CODE2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_1_CODE3($data: I_S040102_CODE_3!) {
                        mgrQueryS040102_1_CODE3(data: $data) {
                            BANK_CD {
                                BANK_CD
                                BANK_NAME
                            }
                            PAY_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_1_CODE3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_2_1($data: I_S040102_2_1!) {
                        mgrQueryS040102_2_1(data: $data) {
                            PU_STATUS
                            PU_CD
                            VENDOR_CD
                            VENDOR_NAME
                            VENDOR_TYPE
                            VENDOR_TYPE_N
                            REG_USER
                            BUYER_CD
                            BUYER_NAME
                            PAY_TERM
                            PO_CD2
                            MRP_DATE
                            NORMI
                            OVER_SHORT
                            TARGET_ETA
                            CURR_CD
                            PI_NO
                            ORDER_DATE
                            PAY_AMT
                            PI_FILE
                            PI_FILE_URL
                            DUE_DATE
                            BILL_TO
                            EX_FACTORY
                            PAY_DATE
                            PLACE_CD
                            SHIP_TO
                            ORIGIN_PORT
                            TRADE_TERM
                            DEBIT_AMT
                            DEPOSIT_AMT
                            LC_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_2_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_PU_MEM(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_2_PU_MEM($data: I_S040102_2_1!) {
                        mgrQueryS040102_2_PU_MEM(data: $data) {
                            PU_CD
                            PU_SEQ
                            PO_CD
                            PO_SEQ
                            SEND_DATETIME
                            SEND_FILENAME
                            SEND_FILEURL
                            SEND_USER
                            SEND_KIND
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_2_PU_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_3_1($data: I_S040102_3_1!) {
                        mgrQueryS040102_3_1(data: $data) {
                            REG_USER
                            PU_STATUS
                            PU_CD
                            BUYER_CD
                            PO_CD
                            VENDOR_CD
                            VENDOR_NAME
                            MATL_TYPE
                            NORMI
                            MRP_DATE
                            ORDER_DATE
                            PAY_TERM
                            CONTRACT_DELIVERY_DATE
                            EXP_DELIVERY_DATE
                            TARGET_ETA
                            ETA
                            PI_NO
                            PI_FILE
                            STSIN_STATUS
                            STSOUT_STATUS
                            SHIPMENT_STATUS
                            ORIGIN_PORT
                            SHIP_MODE
                            CURR_CD
                            PU_AMT
                            DEPOSIT_AMT
                            LC_AMT
                            PAY_TYPE
                            PAY_DATE
                            GW
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040101_4_1($data: I_S040101_4_1!) {
                        mgrQueryS040101_4_1(data: $data) {
                            PU_MST_NEW {
                                VENDOR_CD
                                VENDOR_NAME
                                VENDOR_MATL_TYPE
                                VENDOR_TYPE
                                VENDOR_TYPE_N
                                PAY_TERM
                                PAY_TYPE
                                PAY_CONDITION
                                OVERSHORT_RATE
                                PO_CD
                                PU_CD
                                PO_QTY
                                MATL_AMT
                                P_PU_CD
                                P_CURR_CD
                                P_PI_NO
                                P_ORDER_DATE
                                P_DUE_DATE
                                P_EX_FACTORY
                                P_NORMI
                                P_BILL_TO
                                P_PAY_DATE
                                P_PLACE_CD
                                P_SHIP_TO
                                ORIGIN_PORT
                                TRADE_TERM
                                BUYER_CD
                                BUYER_NAME
                                MRP_DATE
                                PLAN_FLAG
                                PLAN_ETD
                                FACTORY_CD
                                FACTORY_NAME
                                PROD_DUE_DATE
                                MATL_DUE_DATE
                                STOCK_QTY
                                MRP_QTY
                                OLD_PO_QTY
                            }
                            PU_MST {
                                PU_CD
                                VENDOR_CD
                                BUYER_CD
                                FACTORY_CD
                                PU_DATE
                                REG_USER
                                REG_DATETIME
                                PU_STATUS
                                MATL_TYPE
                                BILL_TO
                                SHIP_TO
                                CURR_CD
                                DEPOSIT_AMT
                                DEPOSIT_FIX
                                LC_FLAG
                                LC_AMT
                                NORMI
                                TRADE_TERM
                                ORDER_DATE
                                DELIVERY_DATE
                                EXP_DELIVERY_DATE
                                PAY_DATE
                                FORWARD
                                PI_NO
                                PI_FILE
                                SHIP_MODE
                                PO_CD2
                                TARGET_ETA
                                PU_TYPE
                                DEPOSIT_GW_STATUS
                                ORIGIN_PORT
                                MEMO
                                PAY_TYPE
                                PAY_CONDITION
                            }
                            STOCK_MEM {
                                PU_STATUS
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                MATL_CD
                                MRP_SEQ
                                MATL_SEQ
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                MRP_QTY
                                MRP_QTY1
                                STOCK_QTY
                                MOQ_QTY
                                PO_QTY
                                BEF_PO_QTY
                                OVER_QTY
                                FOC_QTY
                                LEFTOVER_QTY
                                DIFF_QTY
                                PO_UPDATE_QTY
                                CURR_CD
                                FACTORY_CD
                                MASTER_PRICE
                                SURCHARGE_PRICE
                                SURCHARGE_AMT
                                SURCHARGE_REMARK
                                PO_PRICE
                                PU_CD
                                MRP_QTY2
                                DATAS {
                                    PU_STATUS
                                    PO_CD
                                    PO_SEQ
                                    ORDER_CD
                                    MATL_CD
                                    MRP_SEQ
                                    MATL_SEQ
                                    MATL_NAME
                                    COLOR
                                    SPEC
                                    UNIT
                                    MRP_QTY
                                    MRP_QTY1
                                    STOCK_QTY
                                    MOQ_QTY
                                    PO_QTY
                                    BEF_PO_QTY
                                    OVER_QTY
                                    FOC_QTY
                                    LEFTOVER_QTY
                                    DIFF_QTY
                                    PO_UPDATE_QTY
                                    CURR_CD
                                    FACTORY_CD
                                    MASTER_PRICE
                                    SURCHARGE_PRICE
                                    SURCHARGE_AMT
                                    SURCHARGE_REMARK
                                    PO_PRICE
                                    PU_CD
                                    MRP_QTY2
                                }
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040101_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_STOCK(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_4_3_STOCK(
                        $data: I_S040102_4_3_STOCK!
                    ) {
                        mgrQueryS040102_4_3_STOCK(data: $data) {
                            PO_CD
                            PO_SEQ
                            STOCK_PO_CD
                            STOCK_PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_MATL_CD
                            USE_PO_TYPE_N
                            USE_QTY
                            PO_QTY
                            SUM_QTY
                            VENDOR_NAME
                            STOCK_CHK
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            PO_MRP_SEQ
                            REG_DATETIME
                            STOCK_IDX
                            RACK
                            ROOT_IDX
                            VENDOR_CD
                            MATL_KIND2
                            STATUS_CD
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_4_3_STOCK;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_REVISE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_4_3_REVISE(
                        $data: I_S040102_4_3_REVISE!
                    ) {
                        mgrQueryS040102_4_3_REVISE(data: $data) {
                            DATA1 {
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                USE_PO_TYPE_N
                                USE_QTY
                                PO_QTY
                                OLD_QTY
                                NEW_QTY
                                DIFF_QTY
                                DIFF_PO_TYPE_N
                                VENDOR_NAME
                                MRP_SEQ
                                MATL_SEQ
                                MATL_PRICE
                                CURR_CD
                                USE_SIZE
                                TOT_AMT
                                ORDER_STATUS
                                SEQ
                                USE_PO_TYPE
                                DIFF_PO_TYPE
                                SEND_DATETIME
                            }
                            DATA2 {
                                BUYER_CHK
                                SALES_CHK
                                MATL_CHK
                                CAD_CHK
                                MRP_CHK
                                MRP2_CHK
                                ETC_CHK
                                SEQ_REASON
                                SEQ_COMMENT
                                APPROVAL
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_4_3_REVISE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_LC(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_4_3_LC($data: [I_S040102_4_3_LC!]!) {
                        mgrQueryS040102_4_3_LC(data: $data) {
                            PU_CD
                            PO_CD
                            MATL_CD
                            LC_QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_4_3_LC;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_DEPOSIT(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_4_3_DEPOSIT(
                        $data: [I_S040102_4_3_LC!]!
                    ) {
                        mgrQueryS040102_4_3_DEPOSIT(data: $data) {
                            PU_CD
                            PO_CD
                            MATL_CD
                            LC_QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_4_3_DEPOSIT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3_bak(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_4_1($data: I_S040102_4_1!) {
                        mgrQueryS040102_4_1(data: $data) {
                            FILE_INFO {
                                FILE_KEY
                                TITLE
                                NAME
                                URL
                                OBJECT_NAME
                            }
                            PO_SEQ {
                                PO_SEQ
                            }
                            PU_MST {
                                PU_CD
                                VENDOR_CD
                                BUYER_CD
                                FACTORY_CD
                                PU_DATE
                                REG_USER
                                REG_DATETIME
                                PU_STATUS
                                MATL_TYPE
                                BILL_TO
                                SHIP_TO
                                CURR_CD
                                DEPOSIT_AMT
                                DEPOSIT_FIX
                                LC_FLAG
                                NORMI
                                TRADE_TERM
                                ORDER_DATE
                                DELIVERY_DATE
                                EXP_DELIVERY_DATE
                                PAY_DATE
                                FORWARD
                                PI_NO
                                PI_FILE
                                SHIP_MODE
                                PO_CD2
                                TARGET_ETA
                                PU_TYPE
                                DEPOSIT_GW_STATUS
                                ORIGIN_PORT
                                LC_AMT
                                DEBIT_AMT
                                CRDB_CD
                                OVERSHORT_RATE
                                DUE_DATE
                                EX_FACTORY
                            }
                            STOCK_MEM {
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                MATL_CD
                                MRP_SEQ
                                MATL_SEQ
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                MRP_QTY
                                MRP_QTY1
                                STOCK_QTY
                                MOQ_QTY
                                PO_QTY
                                CURR_CD
                                MASTER_PRICE
                                SURCHARGE_PRICE
                                SURCHARGE_AMT
                                SURCHARGE_REMARK
                                PO_PRICE
                                PU_CD
                                MRP_QTY2
                                DIFF_QTY
                                MIN_CONF_USER
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4(argData) {}

    async mgrQuery_LIST_LOG(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040102_4_LOG($data: I_S040102_4_LOG!) {
                        mgrQueryS040102_4_LOG(data: $data) {
                            PO_SEQ {
                                PO_SEQ
                            }
                            PU_MST {
                                PU_CD
                                VENDOR_CD
                                BUYER_CD
                                FACTORY_CD
                                PU_DATE
                                REG_USER
                                REG_DATETIME
                                PU_STATUS
                                MATL_TYPE
                                BILL_TO
                                SHIP_TO
                                CURR_CD
                                DEPOSIT_AMT
                                DEPOSIT_FIX
                                NORMI
                                TRADE_TERM
                                ORDER_DATE
                                DELIVERY_DATE
                                EXP_DELIVERY_DATE
                                PAY_DATE
                                FORWARD
                                PI_NO
                                PI_FILE
                                SHIP_MODE
                                PO_CD2
                                TARGET_ETA
                                PU_TYPE
                                CRDB_CD
                                DEBIT_AMT
                                LC_AMT
                                OVERSHORT_RATE
                                DUE_DATE
                                EX_FACTORY
                            }
                            STOCK_MEM {
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                MATL_CD
                                MRP_SEQ
                                MATL_SEQ
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                MRP_QTY
                                MRP_QTY1
                                STOCK_QTY
                                MOQ_QTY
                                PO_QTY
                                DIFF_QTY
                                CURR_CD
                                MASTER_PRICE
                                SURCHARGE_PRICE
                                SURCHARGE_AMT
                                SURCHARGE_REMARK
                                PO_PRICE
                                PU_CD
                                MRP_QTY2
                                PU_STATUS
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040102_4_LOG;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PURCHASE_REPORT_FACTORY(argData, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQueryS040102_EXCEL_PURCHASE_FACTORY(
                        $data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
                        $data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
                        $data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
                    ) {
                        mgrQueryS040102_EXCEL_PURCHASE_FACTORY(
                            data: $data
                            data1: $data1
                            data2: $data2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                    data1: argData1,
                    data2: argData2,
                },
            });
            return data.mgrQueryS040102_EXCEL_PURCHASE_FACTORY;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PURCHASE_REPORT_IMPORT(argData, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQueryS040102_EXCEL_PURCHASE_IMPORT(
                        $data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
                        $data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
                        $data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
                    ) {
                        mgrQueryS040102_EXCEL_PURCHASE_IMPORT(
                            data: $data
                            data1: $data1
                            data2: $data2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                    data1: argData1,
                    data2: argData2,
                },
            });
            return data.mgrQueryS040102_EXCEL_PURCHASE_IMPORT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PURCHASE_REPORT_IMPORT_NEW(argData, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQueryS040102_EXCEL_PURCHASE_IMPORT_NEW(
                        $data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
                        $data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
                        $data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
                    ) {
                        mgrQueryS040102_EXCEL_PURCHASE_IMPORT_NEW(
                            data: $data
                            data1: $data1
                            data2: $data2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                    data1: argData1,
                    data2: argData2,
                },
            });
            return data.mgrQueryS040102_EXCEL_PURCHASE_IMPORT_NEW;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PURCHASE_REPORT_YKK(argData, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQueryS040102_EXCEL_PURCHASE_YKK(
                        $data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
                        $data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
                        $data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
                    ) {
                        mgrQueryS040102_EXCEL_PURCHASE_YKK(
                            data: $data
                            data1: $data1
                            data2: $data2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                    data1: argData1,
                    data2: argData2,
                },
            });
            return data.mgrQueryS040102_EXCEL_PURCHASE_YKK;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PURCHASE_REPORT_NORMAL(argData, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQueryS040102_EXCEL_PURCHASE_NORMAL(
                        $data: I_S040102_4_EXCEL_PURCHASE_FACTORY_1!
                        $data1: I_S040102_4_EXCEL_PURCHASE_FACTORY_2!
                        $data2: [I_S040102_4_EXCEL_PURCHASE_FACTORY_3!]!
                    ) {
                        mgrQueryS040102_EXCEL_PURCHASE_NORMAL(
                            data: $data
                            data1: $data1
                            data2: $data2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                    data1: argData1,
                    data2: argData2,
                },
            });
            return data.mgrQueryS040102_EXCEL_PURCHASE_NORMAL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_FILE_ADD(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_FILE_ADD(
                        $datas: I_S040102_5_FILE_INFO!
                    ) {
                        mgrInsert_S040102_5_FILE_ADD(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_FILE_ADD;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_FILE_UPDATE(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_FILE_UPDATE(
                        $datas: I_S040102_5_FILE_INFO!
                    ) {
                        mgrInsert_S040102_5_FILE_UPDATE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_FILE_UPDATE;
        } catch (e) {
            console.log("async mgrInsert_S040102_5_FILE_ADD,  call error: ");
            return e;
        }
    }

    async mgrInsert_FILE_DELETE(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040102_5_FILE_DELETE(
                        $datas: I_S040102_5_FILE_INFO!
                    ) {
                        mgrInsert_S040102_5_FILE_DELETE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S040102_5_FILE_DELETE;
        } catch (e) {
            return e;
        }
    }
}
