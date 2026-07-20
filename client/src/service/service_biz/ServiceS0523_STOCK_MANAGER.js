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

export class ServiceS0523_STOCK_MANAGER {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    normalizeExportStockQuery(dataQRY_KSV_PO_MRP) {
        if (!dataQRY_KSV_PO_MRP) {
            return {};
        }

        const queryData = { ...dataQRY_KSV_PO_MRP };
        delete queryData.ROOT_IDX;
        return queryData;
    }

    async mgrUpdate_STOCK_UPDATE(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0523_5_STOCK_UPDATE(
                        $datas: I_S0523_5!
                    ) {
                        mgrUpdate_S0523_5_STOCK_UPDATE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0523_5_STOCK_UPDATE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_UPDATE_QTY(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0523_5_UPDATE_QTY(
                        $datas: I_S0523_5!
                    ) {
                        mgrUpdate_S0523_5_UPDATE_QTY(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0523_5_UPDATE_QTY;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }


    async mgrUpdate_BATCH_UPDATE(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0523_5_BATCH_UPDATE(
                        $datas: I_S0523_5!
                        $datas1: [I_S0523_5_BATCH!]!
                    ) {
                        mgrUpdate_S0523_5_BATCH_UPDATE(
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
            return data.mgrUpdate_S0523_5_BATCH_UPDATE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_DEFECT_UPDATE(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0523_5_DEFECT_UPDATE(
                        $datas: I_S0523_5!
                    ) {
                        mgrUpdate_S0523_5_DEFECT_UPDATE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0523_5_DEFECT_UPDATE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_FACTORY_UPDATE(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0523_5_FACTORY_UPDATE(
                        $datas: I_S0523_5!
                    ) {
                        mgrUpdate_S0523_5_FACTORY_UPDATE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0523_5_FACTORY_UPDATE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_ADD_SHIP(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0523_5_ADD_SHIP(
                        $datas: I_S0523_5!
                        $datas1: [I_S0523_5_1!]!
                    ) {
                        mgrInsert_S0523_5_ADD_SHIP(
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
            return data.mgrInsert_S0523_5_ADD_SHIP;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0523_5($datas: I_S0523_5!) {
                        mgrDelete_S0523_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0523_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0523_5($datas: I_S0523_5!) {
                        mgrUpdate_S0523_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0523_5;
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
                    mutation MgrUpdate_S0523_5_1($datas: I_S0523_5_1!) {
                        mgrUpdate_S0523_5_1(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0523_5_1;
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
                    query MgrQueryS0523_1_CODE($data: I_S0523_CODE!) {
                        mgrQueryS0523_1_CODE(data: $data) {
                            FACTORY_CD {
                                FACTORY_NAME
                                FACTORY_CD
                            }
                            BUYER_CD {
                                BUYER_NAME
                                BUYER_CD
                            }
                            STOCK_CODE {
                                CD_CODE
                                CD_NAME
                            }
                            PO_CD {
                                CD_CODE
                                CD_NAME
                            }
                            VENDOR_CD {
                                VENDOR_NAME
                                VENDOR_CD
                            }
                            KIND2 {
                                CD_CODE
                                CD_NAME
                            }
                            OWNER_SHIP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            REASON_MAKE {
                                CD_CODE
                                CD_NAME
                            }
                            AUTHORITY {
                                CD_CODE
                                CD_NAME
                            }
                            CONDITION {
                                CD_CODE
                                CD_NAME
                            }
                            MANAGER {
                                CD_CODE
                                CD_NAME
                            }
                            PURPOSE {
                                CD_CODE
                                CD_NAME
                            }
                            REMARK {
                                CD_CODE
                                CD_NAME
                            }
                            WARE_CD {
                                WARE_CD
                                WARE_NAME
                            }
                            STOCK_STATUS_S {
                                CD_CODE
                                CD_NAME
                            }
                            PLAN {
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
            return data.mgrQueryS0523_1_CODE;
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
                    query MgrQueryS0523_2($data: I_S0523_2!) {
                        mgrQueryS0523_2(data: $data) {
                            MESSAGE
                            DATAS {
                                MATL_TYPE_N
                                MATL_TYPE2_N
                                FACTORY_NAME
                                STOCK_DATE
                                REG_DATETIME
                                PO_CD
                                ORDER_CD
                                BUYER_NAME
                                VENDOR_NAME
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                STOCK_STATUS
                                STOCK_STATUS_N
                                STOCK_STATUS_2
                                STOCK_STATUS_2_N
                                STOCK_STATUS_S
                                ORG_QTY
                                STOCK_QTY
                                REMAIN_QTY
                                USE_QTY
                                OUT_QTY
                                RACK
                                LOCATION
                                ORG_STOCK_IDX
                                STOCK_IDX
                                ROOT_IDX
                                REMARK
                                EXP_DATE
                                REASON_REMARK_N
                                PLAN_REMARK
                                DEBIT_CD
                                REMARK0
                                ORG_REASON
                                DEFECT_QTY
                                WAITING_QTY
                                OWNER_SHIP
                                REASON_MAKE
                                AUTHORITY
                                CONDITION
                                MANAGER
                                PURPOSE
                                CHARGER
                                PO_PRICE
                                CURR_CD
                                MATL_TYPE
                                FACTORY_CD
                                BUYER_CD
                                VENDOR_CD
                                PO_SEQ
                                REASON_REMARK
                                MATL_SEQ
                                WARE_CD
                                CRDB_DATE
                                CRDB_AMT
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0523_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1_COUNT(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0523_2_COUNT($data: I_S0523_2!) {
                        mgrQueryS0523_2_COUNT(data: $data) {
                            TOT_CNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0523_2_COUNT;
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
                    query MgrQueryS0523_3_1($data: I_S0523_3_1!) {
                        mgrQueryS0523_3_1(data: $data) {
                            id
                            SHIPMENT_CD
                            SHIP_MODE
                            PLACE_CD
                            ORIGIN_PORT
                            BL_NO
                            ETA
                            CONTAINER_NO
                            BL_FILE
                            PL_FILE
                            CI_FILE
                            DESTINATION
                            IS_SINGAPORE
                            COST
                            SHIP_LINE
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0523_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXPORT_STOCK_LIST(dataQRY_KSV_PO_MRP, datasTBL_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);
        const queryData = this.normalizeExportStockQuery(dataQRY_KSV_PO_MRP);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0523_EXPORT_STOCK_LIST(
                        $data: I_S0523_EXPORT_STOCK_LIST!
                        $grid: [I_S0523_EXPORT_STOCK_GRID!]!
                    ) {
                        mgrQueryS0523_EXPORT_STOCK_LIST(
                            data: $data
                            grid: $grid
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: queryData,
                    grid: datasTBL_KSV_PO_MRP,
                },
            });
            return data.mgrQueryS0523_EXPORT_STOCK_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXPORT_USED_STOCK(dataQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);
        const queryData = this.normalizeExportStockQuery(dataQRY_KSV_PO_MRP);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0523_EXPORT_USED_STOCK(
                        $data: I_S0523_EXPORT_STOCK_LIST!
                    ) {
                        mgrQueryS0523_EXPORT_USED_STOCK(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: queryData,
                },
            });
            return data.mgrQueryS0523_EXPORT_USED_STOCK;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXPORT_PERIOD_BUYER_STOCK(dataQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);
        const queryData = this.normalizeExportStockQuery(dataQRY_KSV_PO_MRP);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0523_EXPORT_PERIOD_BUYER_STOCK(
                        $data: I_S0523_EXPORT_STOCK_LIST!
                    ) {
                        mgrQueryS0523_EXPORT_PERIOD_BUYER_STOCK(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: queryData,
                },
            });
            return data.mgrQueryS0523_EXPORT_PERIOD_BUYER_STOCK;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXPORT_STOCK_LIST2(dataQRY_KSV_PO_MRP, datasTBL_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);
        const queryData = this.normalizeExportStockQuery(dataQRY_KSV_PO_MRP);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0523_EXPORT_STOCK_LIST2(
                        $data: I_S0523_EXPORT_STOCK_LIST!
                        $grid: [I_S0523_EXPORT_STOCK_GRID!]!
                    ) {
                        mgrQueryS0523_EXPORT_STOCK_LIST2(
                            data: $data
                            grid: $grid
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: queryData,
                    grid: datasTBL_KSV_PO_MRP,
                },
            });
            return data.mgrQueryS0523_EXPORT_STOCK_LIST2;
        } catch (e) {
            return e;
        }
    }
}
