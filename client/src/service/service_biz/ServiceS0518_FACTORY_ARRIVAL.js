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

export class ServiceS0518_FACTORY_ARRIVAL {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_CUSTOMER_NO(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0518_5_CUSTOMER_NO(
                        $datas: I_S0518_5_0!
                        $datas1: [I_S0518_5!]!
                    ) {
                        mgrUpdate_S0518_5_CUSTOMER_NO(
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
            return data.mgrUpdate_S0518_5_CUSTOMER_NO;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_UPDATE_ERROR_QTY(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0518_5_UPDATE_ERROR_QTY(
                        $datas: [I_S0518_5_2!]!
                    ) {
                        mgrUpdate_S0518_5_UPDATE_ERROR_QTY(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0518_5_UPDATE_ERROR_QTY;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_INSERT_DOCU(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0518_5_INSERT_DOCU($datas: I_S0518_5!) {
                        mgrUpdate_S0518_5_INSERT_DOCU(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0518_5_INSERT_DOCU;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_ARRIVAL(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0518_5_ARRIVAL(
                        $datas: I_S0518_5_0!
                        $datas1: [I_S0518_5!]!
                        $datas2: [I_S0518_5_FACIN!]!
                    ) {
                        mgrUpdate_S0518_5_ARRIVAL(
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
            return data.mgrUpdate_S0518_5_ARRIVAL;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_FIXED(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0518_5_FIXED(
                        $datas: I_S0518_5_0!
                        $datas1: [I_S0518_5!]!
                    ) {
                        mgrUpdate_S0518_5_FIXED(
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
            return data.mgrUpdate_S0518_5_FIXED;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
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
                    query MgrQueryS0518_1_CODE {
                        mgrQueryS0518_1_CODE {
                            STATUS_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            ORIGIN_PORT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SHIP_MODE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DESTINATION {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0518_1_CODE;
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
                    query MgrQueryS0518_3_1($data: I_S0518_3_1!) {
                        mgrQueryS0518_3_1(data: $data) {
                            ATA
                            A_ETA
                            F_ETA
                            ORIGIN_NATION
                            CLEARANCE_NO
                            FACIN_CNT
                            DELIVERY
                            SHIPMENT_CD
                            STATUS_CD
                            SHIP_STATUS_N
                            REG_DATETIME
                            SHIP_MODE
                            SHIP_MODE_N
                            ORG_ORIGIN_PORT
                            ORG_DESTINATION
                            DESTINATION
                            IS_SINGAPORE
                            BL_NO
                            ETA
                            ETD
                            SHIPPING_COST
                            IMPORT_COST
                            SHIP_LINE
                            PLACE_CD
                            FIX_FLAG
                            TRACKING_ID
                            SHIPGO_STATUS
                            SHIPGO_ETA
                            SHIPGO_ETC1
                            SHIPGO_ETC2
                            SHIPGO_ETC3
                            SHIPGO_ETC4
                            SHIPGO_ETC5
                            UPD_DATETIME
                            INVOICE_NO 
                            REMARK
                            REMARK2
                            S_WEIGHT
                            S_CBM
                            S_CT_QTY
                            FILE_NAME
                            FILE_URL
                            BL_FILE
                            BL_FILE_URL
                            PL_FILE
                            PL_FILE_URL
                            CI_FILE
                            CI_FILE_URL
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0518_3_1;
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
                    query MgrQueryS0518_3_2($data: I_S0518_3_2!) {
                        mgrQueryS0518_3_2(data: $data) {
                            PU_CD
                            STSOUT_CD
                            PACK_CD
                            INVOICE_NO
                            TRADE_TERM
                            READY_DATE
                            ETA
                            ORIGIN_PORT
                            DESTINATION
                            CT_QTY
                            CBM
                            WEIGHT
                            VENDOR_CD
                            BUYER_CD
                            PO_CD
                            PO_SEQ
                            MATL_CD
                            ORDER_CD
                            STSOUT_WEIGHT
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            OUT_QTY
                            ERR_QTY
                            DOCU_NO
                            STSIN_CD
                            STSIN_PRICE
                            HS_CODE
                            BL_NO
                            COMPOSITION
                            CUSTOMS_CODE
                            CUSTOMS_UNIT
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0518_3_2;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_FILE_ADD(argInputData, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0518_5_FILE_ADD(
                        $datas: I_S0518_5_FILE_ADD!
                        $datas1: [I_S0518_5!]!
                    ) {
                        mgrInsert_S0518_5_FILE_ADD(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData2,
                },
            });
            return data.mgrInsert_S0518_5_FILE_ADD;
        } catch (e) {
            return e;
        }
    }
}
