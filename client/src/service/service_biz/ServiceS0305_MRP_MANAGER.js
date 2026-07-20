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

export class ServiceS0305_MRP_MANAGER {
    // SERVICE: TBL_KSV_PO_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async processPoEnd(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_PO_END($datas: I_S0305_3_PO_MST!) {
                        mgrInsert_S0305_PO_END(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_S0305_MAKE_ORDER_MRP  call succeed: " + data.mgrInsert_S0305_MAKE_ORDER_MRP);
            return data.mgrInsert_S0305_PO_END;
        } catch (e) {
            console.log("async mgrInsert_S0305_PO_END call error: ");
            return e;
        }
    }
    async processPoCancel(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_PO_CANCEL(
                        $datas: I_S0305_3_PO_MST!
                    ) {
                        mgrInsert_S0305_PO_CANCEL(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_S0305_MAKE_ORDER_MRP  call succeed: " + data.mgrInsert_S0305_MAKE_ORDER_MRP);
            return data.mgrInsert_S0305_PO_CANCEL;
        } catch (e) {
            console.log("async mgrInsert_S0305_PO_CANCEL call error: ");
            return e;
        }
    }

    async processPoSettle(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_PO_SETTLE(
                        $datas: I_S0305_3_PO_MST!
                    ) {
                        mgrInsert_S0305_PO_SETTLE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_S0305_MAKE_ORDER_MRP  call succeed: " + data.mgrInsert_S0305_MAKE_ORDER_MRP);
            return data.mgrInsert_S0305_PO_SETTLE;
        } catch (e) {
            console.log("async mgrInsert_S0305_PO_SETTLE call error: ");
            return e;
        }
    }

    async processPurchaseRequest(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_PURCHASE_REQUEST(
                        $datas: [I_S0305_3_PO_MST!]!
                    ) {
                        mgrInsert_S0305_PURCHASE_REQUEST(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_S0305_MAKE_ORDER_MRP  call succeed: " + data.mgrInsert_S0305_MAKE_ORDER_MRP);
            return data.mgrInsert_S0305_PURCHASE_REQUEST;
        } catch (e) {
            console.log("async mgrInsert_S0305_PO_SETTLE call error: ");
            return e;
        }
    }

    async makeOrderMrp(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_MAKE_ORDER_MRP(
                        $datas: I_S0305_3_MAKE_ORDER_MRP!
                    ) {
                        mgrInsert_S0305_MAKE_ORDER_MRP(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_S0305_MAKE_ORDER_MRP  call succeed: " + data.mgrInsert_S0305_MAKE_ORDER_MRP);
            return data.mgrInsert_S0305_MAKE_ORDER_MRP;
        } catch (e) {
            console.log("async mgrInsert_S0305_MAKE_ORDER_MRP call error: ");
            return e;
        }
    }

    async adjustLoss(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_ADJUST_LOSS(
                        $datas: I_S0305_3_PO_ADJUST!
                    ) {
                        mgrInsert_S0305_ADJUST_LOSS(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_S0305_ADJUST_LOSS  call succeed: " + data.mgrInsert_S0305_ADJUST_LOSS);
            return data.mgrInsert_S0305_ADJUST_LOSS;
        } catch (e) {
            console.log("async mgrInsert_S0305_ADJUST_LOSS call error: ");
            return e;
        }
    }

    async adjustLoss_mrp_by_order(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0305_ADJUST_LOSS_MRP_BY_ORDER(
                        $datas: I_S0305_3_PO_ADJUST2!
                    ) {
                        mgrInsert_S0305_ADJUST_LOSS_MRP_BY_ORDER(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0305_ADJUST_LOSS_MRP_BY_ORDER;
        } catch (e) {
            console.log(
                "async mgrInsert_S0305_ADJUST_LOSS_MRP_BY_ORDER call error: ",
            );
            return e;
        }
    }

    async mgrQueryTBL_KSV_PO_MST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST(
                        $data: I_S0305_MRP_MANAGER_QRY_KSV_PO_MST!
                    ) {
                        mgrQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST(data: $data) {
                            PO_STATUS_NAME
                            PO_STATUS
                            PO_SEQ
                            BUYER_NAME
                            BUYER_CD
                            PO_TYPE_NAME
                            PO_TYPE
                            PO_CD
                            TARGET_ETA
                            REG_DATETIME
                            REG_USER
                            UPD_DATETIME
                            UPD_USER
                            MRP_PACK_FLAG
                            DOMESTIC_FLAG
                            IMPORT_FLAG
                            FACTORY_FLAG
                            FACTORY2_FLAG
                            FACTORY3_FLAG
                            FACTORY4_FLAG
                            FACTORY5_FLAG
                            FACTORY_CD
                            FACTORY_NAME
                            WORK_STATUS
                            REQ_STATUS
                            P_STATUS_CD
                            MATL_DUE_DATE
                            DUE_DATE
                            PURCHASE_REQUEST
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "marQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST.length,
            );
            return data.mgrQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryCODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_MRP_MANAGER_CODE {
                        mgrQuery_S0305_MRP_MANAGER_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                                BUYER_ABBR
                                BUYER_TEAM
                                SHINTS_USER
                                USER_NAME
                                EMAIL
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                COMM_FLAG
                                SALES_TEAM
                                NAT_CD
                                BANK_CD
                                STS_FLAG
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                NEOE_BUYER_CD_MOM
                                NEOE_BUYER_CD
                                NEOE_A23
                                loss_flag
                                glove_flag
                                MOM_CD
                                BUYER_TYPE
                                PAY_RULE
                                id
                            }
                            PO_STATUS {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            REG_USER {
                                USER_ID
                                USER_NAME
                            }
                        }
                    }
                `,
            });
            console.log(
                "marQuery_S0305_MRP_MANAGER_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S0305_MRP_MANAGER_CODE.BUYER_CD.length,
            );
            return data.mgrQuery_S0305_MRP_MANAGER_CODE;
        } catch (e) {
            console.log(`S0305 gql error:${e.message}`);
            return e;
        }
    }

    async mgrQuery_ORDER_LIST(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_4_1($data: I_S020701_4_1!) {
                        mgrQueryS020701_4_1(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                            ORDER_STATUS_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS020701_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_MRP_CNT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_ORDER_MRP_CNT(
                        $data: I_S0305_ORDER_MRP_CNT!
                    ) {
                        mgrQuery_S0305_ORDER_MRP_CNT(data: $data) {
                            ORDER_MRP_CNT
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0305_ORDER_MRP_CNT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_WORK_STATUS(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_WORK_STATUS(
                        $data: I_S0305_WORK_STATUS!
                    ) {
                        mgrQuery_S0305_WORK_STATUS(data: $data) {
                            PO_CD
                            PO_SEQ
                            WORK_STATUS
                            JOB_CNT
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0305_WORK_STATUS;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_SEQ_LIST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_REPORT_SEQ_LIST(
                        $data: I_S0305_REPORT_SEQ_LIST!
                    ) {
                        mgrQuery_S0305_REPORT_SEQ_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            return data.mgrQuery_S0305_REPORT_SEQ_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_SEQ_LIST2(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_REPORT_SEQ_LIST2(
                        $data: I_S0305_REPORT_SEQ_LIST!
                    ) {
                        mgrQuery_S0305_REPORT_SEQ_LIST2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            return data.mgrQuery_S0305_REPORT_SEQ_LIST2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_STOCK_LOG(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_REPORT_STOCK_LOG(
                        $data: I_S0305_REPORT_SEQ_LIST!
                    ) {
                        mgrQuery_S0305_REPORT_STOCK_LOG(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            return data.mgrQuery_S0305_REPORT_STOCK_LOG;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_US_LIST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0305_REPORT_US_LIST(
                        $data: I_S0305_REPORT_US_LIST!
                    ) {
                        mgrQuery_S0305_REPORT_US_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            return data.mgrQuery_S0305_REPORT_US_LIST;
        } catch (e) {
            return e;
        }
    }
}
