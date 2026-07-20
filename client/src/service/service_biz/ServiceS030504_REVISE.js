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

export class ServiceS030504_REVISE {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async updateComment(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030504_UPDATE_COMMENT(
                        $datas: I_S030504_MRP_MAKE!
                    ) {
                        mgrInsert_S030504_UPDATE_COMMENT(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030504_MRP_MAKE,
            );
            return data.mgrInsert_S030504_UPDATE_COMMENT;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async updateResp(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030504_UPDATE_RESP(
                        $datas: I_S030504_MRP_MAKE!
                    ) {
                        mgrInsert_S030504_UPDATE_RESP(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030504_MRP_MAKE,
            );
            return data.mgrInsert_S030504_UPDATE_RESP;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async makeMRP(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030504_MRP_MAKE(
                        $datas: I_S030504_MRP_MAKE!
                    ) {
                        mgrInsert_S030504_MRP_MAKE(datas: $datas) {
                            id
                            CODE
                            CODE1
                            CODE2
                            LAST_PO_SEQ
                            NEW_PO_SEQ
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030504_MRP_MAKE,
            );
            return data.mgrInsert_S030504_MRP_MAKE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async changeMRP(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030504_CHANGE_PROC(
                        $datas: I_S030504_MRP_MAKE!
                        $datas1: [I_S030504_CHANGE_1!]!
                        $datas2: [I_S030504_CHANGE_2!]!
                    ) {
                        mgrInsert_S030504_CHANGE_PROC(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                    datas2: argInputData2,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030504_CHANGE_PROC,
            );
            return data.mgrInsert_S030504_CHANGE_PROC;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async resetMRP(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030504_RESET_PROC(
                        $datas: I_S030504_MRP_MAKE!
                        $datas1: [I_S030504_CHANGE_1!]!
                        $datas2: [I_S030504_CHANGE_2!]!
                    ) {
                        mgrInsert_S030504_RESET_PROC(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                    datas2: argInputData2,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030504_RESET_PROC,
            );
            return data.mgrInsert_S030504_RESET_PROC;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async changeCONS(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030504_UPDATE_CONS(
                        $datas: I_S030504_MRP_MAKE!
                        $datas1: I_S030504_CHANGE_2!
                    ) {
                        mgrInsert_S030504_UPDATE_CONS(
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
                    datas1: argInputData1,
                },
            });
            return data.mgrInsert_S030504_UPDATE_CONS;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030504($data: I_S030504!) {
                        mgrQueryS030504(data: $data) {
                            ORDER_CD
                            STYLE_NAME
                            BUYER_NAME
                            TOT_CNT
                            DUE_DATE
                            FACTORY_NAME
                            CONS_F
                            CONS_A
                            FACTORY_CD
                            ORDER_STATUS_N
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log("mgrQueryS030504:" + data.mgrQueryS030504.length);
            return data.mgrQueryS030504;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030504_CODE($data: I_S030504!) {
                        mgrQueryS030504_CODE(data: $data) {
                            PO_SEQ {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SEQ_REASON {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log("mgrQueryS030504:" + data.mgrQueryS030504_CODE.length);
            return data.mgrQueryS030504_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MST

    async mgrQueryTBL_KSV_PO_MST(argData1, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030504_1($data: I_S030504_1!) {
                        mgrQueryS030504_1(data: $data) {
                            DATA1 {
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
                    data: argData1,
                },
            });
            console.log("mgrQueryS030504_1:" + data.mgrQueryS030504_1.length);
            return data.mgrQueryS030504_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_PO_MST_ADJ(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030504_1_1($data: I_S030504_1_1!) {
                        mgrQueryS030504_1_1(data: $data) {
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            USE_PO_TYPE_N
                            PO_QTY
                            USE_QTY
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
                            SEND_DATETIME
                            PO_FACTORY_CD                           
                            PO_FACTORY_CD_N                           
                            STOCK_FACTORY_CD                           
                            STOCK_FACTORY_CD_N                           
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "mgrQueryS030504_1_1:" + data.mgrQueryS030504_1_1.length,
            );
            return data.mgrQueryS030504_1_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MST1

    async mgrQueryTBL_KSV_PO_MST1(argQRY_KSV_PO_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030504_2($data: I_S030504_2!) {
                        mgrQueryS030504_2(data: $data) {
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            DIFF_RE_TYPE
                            DIFF_RE_QTY
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                            bef_po_qty
                            use_stock_qty
                            stock_idx
                            root_idx
                            factory_cd
                            org_po_seq
                            po_matl_cd
                            id
                            DIFF_RE_TYPE_N
                            MATL_NAME
                            COLOR
                            SPEC
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST1,
                },
            });
            console.log("mgrQueryS030504_2:" + data.mgrQueryS030504_2.length);
            return data.mgrQueryS030504_2;
        } catch (e) {
            return e;
        }
    }
}
