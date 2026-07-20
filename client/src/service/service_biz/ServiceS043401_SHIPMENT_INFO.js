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

export class ServiceS043401_SHIPMENT_INFO {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_COST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0435_5($datas: I_S0435_5!) {
                        mgrUpdate_S0435_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0435_5;
        } catch (e) {
            console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }

    }

    async mgrUpdate_SHIPMENT_FIX(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_FIX($datas: I_S043401_5!) {
                        mgrUpdate_S043401_5_FIX(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S043401_5_FIX;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_HSCODE(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_HSCODE(
                        $datas: I_S043401_5_HSCODE!
                        $datas1: [I_S043401_5_HSCODE1!]!
                    ) {
                        mgrUpdate_S043401_5_HSCODE(
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
            return data.mgrUpdate_S043401_5_HSCODE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_COMP(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_COMP(
                        $datas: I_S043401_5_COMP!
                        $datas1: [I_S043401_5_COMP1!]!
                    ) {
                        mgrUpdate_S043401_5_COMP(
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
            return data.mgrUpdate_S043401_5_COMP;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_OFFER_SPEC(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_OFFER_SPEC(
                        $datas: I_S043401_5_OFFER_SPEC!
                        $datas1: [I_S043401_5_OFFER_SPEC1!]!
                    ) {
                        mgrUpdate_S043401_5_OFFER_SPEC(
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
            return data.mgrUpdate_S043401_5_OFFER_SPEC;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_REMOVE_ITEM(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_REMOVE_ITEM(
                        $datas: I_S043401_5!
                        $datas1: [I_S043401_5_ITEM!]!
                    ) {
                        mgrUpdate_S043401_5_REMOVE_ITEM(
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
            return data.mgrUpdate_S043401_5_REMOVE_ITEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_SHIPMENT_TRACKING_ID(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_TRACKING_ID(
                        $datas: I_S043401_5!
                    ) {
                        mgrUpdate_S043401_5_TRACKING_ID(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S043401_5_TRACKING_ID;
        } catch (e) {
            return e;
        }
    }

    async mgrDelete_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S043401_5($datas: I_S043401_5!) {
                        mgrDelete_S043401_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S043401_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_SHIPMENT(argInputData, argInputItem) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5(
                        $datas: I_S043401_5!
                        $datas1: [I_S043401_5_ITEM!]!
                    ) {
                        mgrUpdate_S043401_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputItem,
                },
            });
            return data.mgrUpdate_S043401_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_SHIPMENT_TRACKING(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043401_5_1($datas: I_S043401_5_1!) {
                        mgrUpdate_S043401_5_1(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S043401_5_1;
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
                    query MgrQueryS043401_1_CODE {
                        mgrQueryS043401_1_CODE {
                            COMPOSITION {
                                CD_CODE
                                CD_NAME
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                id
                            }
                            SHIP_LINE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                id
                            }
                            SHIP_MODE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            HS_CODE {
                                HS_CD
                                HS_NO
                                HS_NAME
                            }
                            PLACE_CD {
                                PLACE_CD
                                PLACE_NAME
                                PLACE_TYPE
                                DELIVERY_TYPE
                                USER_NAME
                                TEL_NO
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                            DESTINATION {
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
                        }
                    }
                `,
            });
            return data.mgrQueryS043401_1_CODE;
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
                    query MgrQueryS043401_2_1($data: I_S043401_2_1!) {
                        mgrQueryS043401_2_1(data: $data) {
                            REG_USER
                            BUYER_CD
                            BUYER_NAME
                            PO_CD2
                            VENDOR_CD
                            VENDOR_NAME
                            PERMIT
                            TRADE_TERM
                            ORIGIN_PORT
                            EXP_DELIVERY_DATE
                            TARGET_ETA
                            CT_QTY
                            WEIGHT
                            CBM
                            PU_CD
                            STSOUT_CD
                            INVOICE_NO
                            READY_DATE
                            DESTINATION
                            MATL_PRICE
                            OUT_QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043401_2_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_COMP(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043401_2_1_COMP($data: I_S043401_2_1!) {
                        mgrQueryS043401_2_1_COMP(data: $data) {
                            VENDOR_NAME
                            MATL_CD
                            MATL_TYPE
                            MATL_NAME
                            HS_NO
                            HS_NAME
                            HS_CD
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043401_2_1_COMP;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_OFFER_SPEC(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043401_2_1_OFFER_SPEC(
                        $data: I_S043401_2_1!
                    ) {
                        mgrQueryS043401_2_1_OFFER_SPEC(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                            MATL_NAME
                            SPEC
                            OFFER_SPEC
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043401_2_1_OFFER_SPEC;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PL_PRINT(argQRY_KCD_VENDOR) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043401_4_PL_PRINT(
                        $data: I_S043401_4_PL_PRINT!
                    ) {
                        mgrQueryS043401_4_PL_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043401_4_PL_PRINT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_PL_PRINT_EXPRESS(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043401_4_PL_PRINT_EXPRESS(
                        $data: I_S043401_4_PL_PRINT!
                    ) {
                        mgrQueryS043401_4_PL_PRINT_EXPRESS(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043401_4_PL_PRINT_EXPRESS;
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
                    query MgrQueryS043401_3_1($data: I_S043401_3_1!) {
                        mgrQueryS043401_3_1(data: $data) {
                            SHIPMENT_CD
                            SHIP_MODE
                            PLACE_CD
                            ORIGIN_PORT
                            BL_NO
                            ETA
                            ETD
                            CONTAINER_NO
                            REG_USER
                            REG_DATETIME
                            UPD_DATETIME
                            STATUS_CD
                            BL_FILE
                            BL_FILE_URL
                            PL_FILE
                            PL_FILE_URL
                            CI_FILE
                            CI_FILE_URL
                            DESTINATION
                            IS_SINGAPORE
                            TRACKING_ID
                            SHIP_LINE
                            A_ETA
                            F_ETA
                            SHIP_STATUS
                            LOADING_DATE
                            DEPARTURE_DATE
                            ARRIVAL_DATE
                            DISCHARGE_DATE
                            GATEOUT_DATE
                            SHIPPING_COST
                            SHIPPING_COST_CURR
                            IMPORT_COST
                            DUTY_COST
                            FIX_FLAG
                            CLEARANCE_NO
                            REMARK
                            CBM
                            STATUS_N
                            INVOICE_NO
                            DESTINATION_PORT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043401_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_FILE_ADD(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S043401_FILE_ADD(
                        $datas: I_S043401_FILE_INFO!
                    ) {
                        mgrInsert_S043401_FILE_ADD(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S043401_FILE_ADD;
        } catch (e) {
            return e;
        }
    }

    async mgrDelete_FILE_DELETE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S043401_FILE_DELETE(
                        $datas: I_S043401_FILE_INFO!
                    ) {
                        mgrDelete_S043401_FILE_DELETE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S043401_FILE_DELETE;
        } catch (e) {
            return e;
        }
    }
}
