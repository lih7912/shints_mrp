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

export class ServiceS051901_FACIN_LIST {
    client;

    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_FACIN(argInputData, argFile) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S051901_5_FACIN(
                        $datas: [I_S051901_5!]!
                        $datas1: I_S051901_5_FILEOBJ!
                    ) {
                        mgrInsert_S051901_5_FACIN(
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
                    datas1: argFile,
                },
            });
            return data.mgrInsert_S051901_5_FACIN;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_CANCEL(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S051901_5_CANCEL(
                        $datas: [I_S051901_5!]!
                    ) {
                        mgrInsert_S051901_5_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S051901_5_CANCEL;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_UPDATE_LOCATION(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S051901_5_LOCATION(
                        $datas: [I_S051901_5!]!
                    ) {
                        mgrUpdate_S051901_5_LOCATION(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S051901_5_LOCATION;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_STSOUT_1(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S051901_5_1(
                        $datas: [I_S051901_5_1!]!
                        $datas1: [I_S051901_5_2!]!
                    ) {
                        mgrInsert_S051901_5_1(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S051901_5_1;
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
                    mutation MgrDelete_S051901_5($datas: I_S051901_5_1!) {
                        mgrDelete_S051901_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S051901_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS051901_1_CODE {
                        mgrQueryS051901_1_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PUR_FACTORY {
                                CD_CODE
                                CD_NAME
                            }
                            PAY_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            STATUS_CD {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS051901_1_CODE;
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
                    query MgrQueryS051901_1_CODE2($data: I_S051901_CODE!) {
                        mgrQueryS051901_1_CODE2(data: $data) {
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
            return data.mgrQueryS051901_1_CODE2;
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
                    query MgrQueryS051901_2($data: I_S051901_2!) {
                        mgrQueryS051901_2(data: $data) {
                            ATA
                            BUYER_CD
                            VENDOR_NAME
                            USER_ID
                            DELIVERY_TYPE
                            DELIVERY_TYPE_N
                            BL_NO
                            CUSTOMS_NO
                            ORIGIN_PORT
                            PO_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            S_OUT_QTY
                            SHORTAGE_QTY
                            DEFECT_QTY
                            FACIN_QTY
                            LOCATION
                            DELIVERY
                            DELIVERY_ORG
                            MOQ
                            WEIGHT
                            CBM
                            CT_NO
                            MC_ID
                            PU_CD
                            STATUS_CD
                            STATUS_CD_N
                            FACTORY_CD
                            FACTORY_CD_N
                            SHIPMENT_CD
                            CLEARANCE_NO
                            SHIP_MODE
                            SHIP_MODE_N
                            STSOUT_CD
                            VENDOR_CD
                            FILE_NAME
                            FILE_URL
                            FACIN_DATE
                            INSPECT_DATE
                            FACIN_CD
                            PACK_CD
                            MOQ_QTY 
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS051901_2;
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
                    query MgrQueryS051901_4_2($data: I_S051901_4_2!) {
                        mgrQueryS051901_4_2(data: $data) {
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
                            PO_QTY
                            STSIN_QTY
                            SHIP_QTY
                            IN_DATETIME
                            BAL_QTY
                            OUT_QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS051901_4_2;
        } catch (e) {
            return e;
        }
    }

    async mgrExport_KeepNewPO(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        const sanitizedDatas = (Array.isArray(argInputData) ? argInputData : []).map((row) => ({
            ATA: row?.ATA ?? "",
            BUYER_CD: row?.BUYER_CD ?? "",
            VENDOR_NAME: row?.VENDOR_NAME ?? "",
            USER_ID: row?.USER_ID ?? "",
            PO_CD: row?.PO_CD ?? "",
            MATL_CD: row?.MATL_CD ?? "",
            MATL_NAME: row?.MATL_NAME ?? "",
            COLOR: row?.COLOR ?? "",
            SPEC: row?.SPEC ?? "",
            UNIT: row?.UNIT ?? "",
            SHORTAGE_QTY: row?.SHORTAGE_QTY ?? "0",
            DEFECT_QTY: row?.DEFECT_QTY ?? "0",
            MOQ: row?.MOQ == null ? 0 : Number(row.MOQ),
            STATUS_CD_N: row?.STATUS_CD_N ?? "",
            DELIVERY: row?.DELIVERY ?? "",
            LOCATION: row?.LOCATION ?? "",
        }));

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrExport_S051901_KeepNewPO(
                        $datas: [I_S051901_KeepNewPoExport!]!
                    ) {
                        mgrExport_S051901_KeepNewPO(datas: $datas) {
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: sanitizedDatas,
                },
                fetchPolicy: "no-cache",
            });
            return data.mgrExport_S051901_KeepNewPO;
        } catch (e) {
            console.log("async mgrExport_KeepNewPO call error: ");
            return e;
        }
    }

    async mgrExport_MoveStock(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        const sanitizedDatas = (Array.isArray(argInputData) ? argInputData : []).map((row) => ({
            ATA: row?.ATA ?? "",
            BUYER_CD: row?.BUYER_CD ?? "",
            VENDOR_NAME: row?.VENDOR_NAME ?? "",
            PO_CD: row?.PO_CD ?? "",
            MATL_CD: row?.MATL_CD ?? "",
            MATL_NAME: row?.MATL_NAME ?? "",
            COLOR: row?.COLOR ?? "",
            SPEC: row?.SPEC ?? "",
            UNIT: row?.UNIT ?? "",
            STATUS_CD: row?.STATUS_CD ?? "",
            STATUS_CD_N: row?.STATUS_CD_N ?? "",
            FACIN_QTY: row?.FACIN_QTY == null ? 0 : Number(row.FACIN_QTY),
            MOQ: row?.MOQ == null ? 0 : Number(row.MOQ),
            DELIVERY: row?.DELIVERY ?? "",
            LOCATION: row?.LOCATION ?? "",
            FACTORY_CD: row?.FACTORY_CD ?? "",
        }));

        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrExport_S051901_MoveStock(
                        $datas: [I_S051901_MoveStockExport!]!
                    ) {
                        mgrExport_S051901_MoveStock(datas: $datas) {
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: sanitizedDatas,
                },
                fetchPolicy: "no-cache",
            });
            return data.mgrExport_S051901_MoveStock;
        } catch (e) {
            console.log("async mgrExport_MoveStock call error: ");
            return e;
        }
    }
}
