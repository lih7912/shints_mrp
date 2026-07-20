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

export class ServiceS0439_LC_DEPOSIT {
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
                    mutation MgrInsert_S0439_5($datas: [I_S0439_5!]!) {
                        mgrInsert_S0439_5(datas: $datas) {
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
                "mgrInsert_S0439_5 call succeed: " + data.mgrInsert_S0439_5,
            );
            return data.mgrInsert_S0439_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_PU_MST_1(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0439_5_1(
                        $datas: [I_S0439_5_1!]!
                        $datas1: [I_S0439_5_2!]!
                    ) {
                        mgrInsert_S0439_5_1(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0439_5_1;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_GW(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0439_5($datas: I_S0439_5_1!) {
                        mgrDelete_S0439_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0439_5;
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
                    query MgrQueryS0439_1_CODE {
                        mgrQueryS0439_1_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0439_1_CODE;
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
                    query MgrQueryS0439_1_CODE2($data: I_S0439_CODE!) {
                        mgrQueryS0439_1_CODE2(data: $data) {
                            GW_STATUS {
                                CD_CODE
                                CD_NAME
                            }
                            TYPE {
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
            return data.mgrQueryS0439_1_CODE2;
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
                    query MgrQueryS0439_2_1($data: I_S0439_2_1!) {
                        mgrQueryS0439_2_1(data: $data) {
                            BUYER_CD
                            VENDOR_CD
                            MATL_TYPE
                            PO_CD
                            S_PO_QTY
                            FACTORY_CD
                            MATL_DUE_DATE
                            PROD_DUE_DATE
                            PLAN_FLAG
                            PLAN_ETD
                            PLAN_ETA
                            BUYER_NAME
                            VENDOR_NAME
                            FACTORY_NAME
                            PU_CD2
                            PU_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0439_2_1;
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
                    query MgrQueryS0439_3_1($data: I_S0439_3_1!) {
                        mgrQueryS0439_3_1(data: $data) {
                            PAY_DATE
                            TYPE
                            REG_USER
                            PU_CD
                            VENDOR_NAME
                            CURR_CD
                            PAY_AMOUNT
                            DEPOSIT_AMT
                            DEPOSIT_RATE
                            LC_FLAG
                            LC_RATE
                            LC_AMT
                            DEPOSIT_GW_STATUS
                            DEPOSIT_GW_KEY
                            IN_DATETIME
                            SHIP_MODE
                            SHIP_DATE
                            EXPIRY_DATE
                            LATEST_SHIP_DATE
                            REQUEST_PAY_DATE
                            NEOE_NO
                            PAY_REPORT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0439_3_1;
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
                    query MgrQueryS0439_4_1($data: I_S0439_4_1!) {
                        mgrQueryS0439_4_1(data: $data) {
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
                                MOQ_AMT
                                PO_QTY
                                CURR_CD
                                MASTER_PRICE
                                MOQ_PRICE
                                FREIGHT_PRICE
                                FREIGHT_AMT
                                OTHER_PRICE
                                OTHER_AMT
                                SURCHAGE_REMARK
                                PO_PRICE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0439_4_1;
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
                    query MgrQueryS0439_4_2($data: I_S0439_4_2!) {
                        mgrQueryS0439_4_2(data: $data) {
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
                                ORIGIN_PORT
                                DEPOSIT_GW_STATUS
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
                                SURCHAGE_REMARK
                                PO_PRICE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0439_4_2;
        } catch (e) {
            return e;
        }
    }
}
