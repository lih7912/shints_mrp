/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS040100_PUR_MONITOR {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_PU_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040100_5($datas: [I_S040100_5!]!) {
                        mgrInsert_S040100_5(datas: $datas) {
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
                "mgrInsert_S040100_5 call succeed: " + data.mgrInsert_S040100_5,
            );
            return data.mgrInsert_S040100_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_DEPOSIT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040100_5_3($datas: I_S040100_5_3!) {
                        mgrInsert_S040100_5_3(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("mgrInsert_S040100_5 call succeed: " + data.mgrInsert_S040100_5);
            return data.mgrInsert_S040100_5_3;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_LC(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040100_5_4($datas: I_S040100_5_4!) {
                        mgrInsert_S040100_5_4(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("mgrInsert_S040100_5 call succeed: " + data.mgrInsert_S040100_5);
            return data.mgrInsert_S040100_5_4;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_PU_MST_1(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S040100_5_pu_mst(
                        $datas: I_S040100_5_edit!
                        $datas1: [I_S040100_5_tbl1!]!
                        $datas2: [I_S040100_5_tbl2!]!
                    ) {
                        mgrInsert_S040100_5_pu_mst(
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
            return data.mgrInsert_S040100_5_pu_mst;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_PU_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S040100_5($datas: I_S040100_5_1!) {
                        mgrDelete_S040100_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S040100_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KCD_VENDOR

    async mgrQuery_CODE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_1_CODE {
                        mgrQueryS040100_1_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS040100_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_1_CODE2($data: I_S040100_CODE!) {
                        mgrQueryS040100_1_CODE2(data: $data) {
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
            return data.mgrQueryS040100_1_CODE2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_1_CODE3($data: I_S040100_CODE_3!) {
                        mgrQueryS040100_1_CODE3(data: $data) {
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
            return data.mgrQueryS040100_1_CODE3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_2_1($data: I_S040100_2_1!) {
                        mgrQueryS040100_2_1(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                            VENDOR_MATL_TYPE
                            VENDOR_TYPE
                            PAY_TERM
                            PAY_TYPE
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
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040100_2_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_3_1($data: I_S040100_3_1!) {
                        mgrQueryS040100_3_1(data: $data) {
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
            return data.mgrQueryS040100_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_4_1($data: I_S040100_4_1!) {
                        mgrQueryS040100_4_1(data: $data) {
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
                                DIFF_QTY
                                PO_UPDATE_QTY
                                CURR_CD
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
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040100_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS040100_4_2($data: I_S040100_4_2!) {
                        mgrQueryS040100_4_2(data: $data) {
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
                                MOQ_PRICE
                                FREIGHT_PRICE
                                OTHER_PRICE
                                SURCHARGE_REMARK
                                PO_PRICE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS040100_4_2;
        } catch (e) {
            return e;
        }
    }
}
