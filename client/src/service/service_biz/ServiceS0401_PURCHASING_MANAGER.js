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

export class ServiceS0401_PURCHASING_MANAGER {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_UPDATE_END(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0401_UPDATE_END(
                        $datas: [I_S0401_UPDATE_END!]!
                    ) {
                        mgrInsert_S0401_UPDATE_END(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0401_UPDATE_END;
        } catch (e) {
            console.log("async mgrInsert_S0401_UPDATE_END  call error: ");
            return e;
        }
    }

    async mgrInsert_PU_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0401_5($datas: [I_S0401_5!]!) {
                        mgrInsert_S0401_5(datas: $datas) {
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
                "mgrInsert_S0401_5 call succeed: " + data.mgrInsert_S0401_5,
            );
            return data.mgrInsert_S0401_5;
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
                    mutation MgrInsert_S0401_5_3($datas: I_S0401_5_3!) {
                        mgrInsert_S0401_5_3(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("mgrInsert_S0401_5 call succeed: " + data.mgrInsert_S0401_5);
            return data.mgrInsert_S0401_5_3;
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
                    mutation MgrInsert_S0401_5_4($datas: I_S0401_5_4!) {
                        mgrInsert_S0401_5_4(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("mgrInsert_S0401_5 call succeed: " + data.mgrInsert_S0401_5);
            return data.mgrInsert_S0401_5_4;
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
                    mutation MgrInsert_S0401_5_1(
                        $datas: [I_S0401_5_1!]!
                        $datas1: [I_S0401_5_2!]!
                    ) {
                        mgrInsert_S0401_5_1(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0401_5_1;
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
                    mutation MgrDelete_S0401_5($datas: I_S0401_5_1!) {
                        mgrDelete_S0401_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0401_5;
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
                    query MgrQueryS0401_1_CODE0 {
                        mgrQueryS0401_1_CODE0 {
                            PU_STATUS {
                                CD_CODE
                                CD_NAME
                            }
                            VENDOR_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            USER {
                                USER_ID
                                USER_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0401_1_CODE0;
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
                    query MgrQueryS0401_1_CODE2($data: I_S0401_CODE!) {
                        mgrQueryS0401_1_CODE2(data: $data) {
                            PLACE_CD {
                                PLACE_CD
                                PLACE_NAME
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
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0401_1_CODE2;
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
                    query MgrQueryS0401_1_CODE3($data: I_S0401_CODE_3!) {
                        mgrQueryS0401_1_CODE3(data: $data) {
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
            return data.mgrQueryS0401_1_CODE3;
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
                    query MgrQueryS0401_2_1($data: I_S0401_2_1!) {
                        mgrQueryS0401_2_1(data: $data) {
                            BUYER_CD
                            VENDOR_CD
                            MATL_TYPE
                            PO_CD
                            S_MRP_QTY
                            S_PO_QTY
                            S_STOCK_QTY
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
            return data.mgrQueryS0401_2_1;
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
                    query MgrQueryS0401_3_1($data: I_S0401_3_1!) {
                        mgrQueryS0401_3_1(data: $data) {
                            PU_STATUS
                            REG_USER
                            BUYER_CD
                            BUYER_NAME
                            PU_CD
                            PO_CD
                            VENDOR_NAME
                            VENDOR_TYPE
                            VENDOR_TYPE_N
                            MATL_TYPE
                            NORMI
                            MRP_DATE
                            ORDER_DATE
                            DUE_DATE
                            EXPECT_DATE
                            PAY_TERM
                            CURR_CD
                            VENDOR_CD
                            FACTORY_CD
                            TARGET_ETA
                            ETA
                            DEPOSIT_AMT
                            LC_AMT
                            DEBIT_AMT
                            PAY_TYPE
                            PAY_DATE
                            PU_AMT
                            SUM_STS_IN
                            SUM_PAY
                            SUM_STS_OUT
                            SUM_FACIN
                            BAL_STS_IN
                            BAL_PAY
                            BAL_STS_OUT
                            BAL_FACIN
                            MOQ_NOT_CONFIRM
                            SURCHARGE_NOT_CONFIRM
                            MESSAGE
                            PI_FILE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0401_3_1;
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
                    query MgrQueryS0401_4_1($data: I_S0401_4_1!) {
                        mgrQueryS0401_4_1(data: $data) {
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
            return data.mgrQueryS0401_4_1;
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
                    query MgrQueryS0401_4_2($data: I_S0401_4_2!) {
                        mgrQueryS0401_4_2(data: $data) {
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
            return data.mgrQueryS0401_4_2;
        } catch (e) {
            return e;
        }
    }
}
