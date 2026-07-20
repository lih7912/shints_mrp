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

export class ServiceS030514_PO_LIST {
    // SERVICE: TBL_KSV_PO_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_REPORT_MATL_LIST_NET_QTY(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_MATL_LIST_NET_QTY(
                        $data: I_S030514_REPORT_MATL_LIST_NET_QTY!
                    ) {
                        mgrQueryS030514_REPORT_MATL_LIST_NET_QTY(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_MATL_LIST_NET_QTY;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_ORDER_QTY(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_ORDER_QTY(
                        $data: I_S030514_REPORT_MATL_LIST_NET_QTY!
                    ) {
                        mgrQueryS030514_REPORT_ORDER_QTY(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_ORDER_QTY;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_BUYER_ORDER_QTY(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_BUYER_ORDER_QTY(
                        $data: I_S030514_REPORT_BUYER_ORDER_QTY!
                    ) {
                        mgrQueryS030514_REPORT_BUYER_ORDER_QTY(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_BUYER_ORDER_QTY;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_ORDER_QTY2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_ORDER_QTY2(
                        $data: [I_S030514_REPORT_ORDER_QTY2!]!
                    ) {
                        mgrQueryS030514_REPORT_ORDER_QTY2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_ORDER_QTY2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_PO_MRP2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_PO_MRP2(
                        $data: I_S030514_QRY_PO_MRP!
                    ) {
                        mgrQueryS030514_QRY_PO_MRP2(data: $data) {
                            po_seq
                            order_cd
                            matl_cd
                            matl_name
                            color
                            spec
                            unit
                            org_po_seq
                            po_qty
                            diff_qty
                            diff_po_type_n
                            remark
                            matl_price
                            curr_cd
                            po_amt
                            vendor_name
                            mrp_seq
                            seq_comment
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_PO_MRP2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_1(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_1(
                        $data: I_S030514_QRY_PO_MRP!
                    ) {
                        mgrQueryS030514_REPORT_1(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_MRP_LIST(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_MRP_LIST(
                        $data: I_S030514_REPORT_MRP_LIST!
                    ) {
                        mgrQueryS030514_REPORT_MRP_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_MRP_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_MRP_LIST2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_MRP_LIST2(
                        $data: I_S030514_REPORT_MRP_LIST!
                    ) {
                        mgrQueryS030514_REPORT_MRP_LIST2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_MRP_LIST2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_MRP_LIST3(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_MRP_LIST3(
                        $data: I_S030514_REPORT_MRP_LIST!
                    ) {
                        mgrQueryS030514_REPORT_MRP_LIST3(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_MRP_LIST3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_ADD_MATL_REQ(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_REPORT_ADD_MATL_REQ(
                        $data: I_S030514_QRY_PO_MRP!
                    ) {
                        mgrQueryS030514_REPORT_ADD_MATL_REQ(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_REPORT_ADD_MATL_REQ;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_PO_MRP1(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_PO_MRP1(
                        $data: I_S030514_QRY_PO_MRP!
                    ) {
                        mgrQueryS030514_QRY_PO_MRP1(data: $data) {
                            po_seq
                            order_cd
                            matl_cd
                            matl_name
                            color
                            spec
                            unit
                            use_po_type_n
                            use_qty
                            po_qty
                            diff_qty
                            diff_po_type_n
                            matl_price
                            curr_cd
                            po_amt
                            vendor_name
                            mrp_seq
                            matl_seq
                            reg_datetime
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_PO_MRP1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_ORDER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_ORDER(
                        $data: I_S030514_QRY_PO_MRP!
                    ) {
                        mgrQueryS030514_QRY_ORDER(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            BUYER_NAME
                            DUE_DATE
                            TOT_CNT
                            PO_SEQ
                            ORDER_STATUS
                            MRP_LIST_FILE
                            MRP_LIST_FILE_URL
                            MRP_LIST2_FILE
                            MRP_LIST2_FILE_URL
                            MRP_LIST3_FILE
                            MRP_LIST3_FILE_URL
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_ORDER_COMBINED(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_ORDER_COMBINED(
                        $data: I_S030514_QRY_PO_MRP2!
                    ) {
                        mgrQueryS030514_QRY_ORDER_COMBINED(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            BUYER_NAME
                            DUE_DATE
                            TOT_CNT
                            PO_SEQ
                            ORDER_STATUS
                            MRP_LIST_FILE
                            MRP_LIST_FILE_URL
                            MRP_LIST2_FILE
                            MRP_LIST2_FILE_URL
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_ORDER_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_SEQ_COMMENT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_SEQ_COMMENT(
                        $data: I_S030514_QRY_PO_MRP!
                    ) {
                        mgrQueryS030514_QRY_SEQ_COMMENT(data: $data) {
                            SEQ_COMMENT
                            CHK_BUYER
                            CHK_SALES
                            CHK_MATL
                            CHK_MRP
                            CHK_MRP2
                            CHK_ETC
                            CHK_CAD
                            SEQ_REASON
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_SEQ_COMMENT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_KSV_ORDER_MST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_1($data: I_S030514_1!) {
                        mgrQueryS030514_1(data: $data) {
                            ORDER_CD
                            TOT_CNT
                            DUE_DATE
                            STYLE_CD
                            STYLE_NAME
                            STYLE_MEMBER
                            SIZE_CNTS {
                                SIZE_NAME
                                SIZE_CNT
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "marQuery_S030514_PO_LIST_TBL_KSV_PO_MST:" +
                    data.mgrQueryS030514_1.length,
            );
            return data.mgrQueryS030514_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_KSV_PO_MRP(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_2($data: I_S030514_2!) {
                        mgrQueryS030514_2(data: $data) {
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            ORG_PO_SEQ
                            PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE_NAME
                            REMARK
                            MATL_PRICE
                            CURR_CD
                            MATL_AMT
                            VENDOR_NAME
                            MRP_SEQ
                            SEQ_COMMENT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "marQuery_S030514_PO_LIST_TBL_KSV_PO_MST:" +
                    data.mgrQueryS030514_2.length,
            );
            return data.mgrQueryS030514_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_PO(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_PO($data: I_S030514_QRY_PO!) {
                        mgrQueryS030514_QRY_PO(data: $data) {
                            PO_CD
                            PO_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_PO;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_BUYER(
                        $data: I_S030514_QRY_BUYER!
                    ) {
                        mgrQueryS030514_QRY_BUYER(data: $data) {
                            BUYER_CD
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_PO_BY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_QRY_PO_BY_BUYER(
                        $data: I_S030514_QRY_BUYER!
                    ) {
                        mgrQueryS030514_QRY_PO_BY_BUYER(data: $data) {
                            PO_CD
                            PO_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_QRY_PO_BY_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_CODE($data: I_S030514_CODE!) {
                        mgrQueryS030514_CODE(data: $data) {
                            PO_CD {
                                PO_CD
                                PO_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            ORDER_KIND {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            return data.mgrQueryS030514_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_LIST_1($data: I_S030514_LIST_1!) {
                        mgrQueryS030514_LIST_1(data: $data) {
                            REG_USER
                            PO_CD
                            PO_STATUS
                            PO_DATE
                            VENDOR_NAME
                            PR_NUM
                            MATL_CD
                            COLOR
                            MATL_NAME
                            SPEC
                            UNIT
                            TOT_CNT
                            STOCK_QTY
                            BAL
                            REMARK
                            STOCK_QTY1
                            REMARK1
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_LIST_2($data: I_S030514_LIST_1!) {
                        mgrQueryS030514_LIST_2(data: $data) {
                            FILE_NAME
                            FILE_URL
                            TITLE
                            UPD_DATETIME
                            UPD_USER
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_LIST_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030514_LIST_3($data: I_S030514_LIST_1!) {
                        mgrQueryS030514_LIST_3(data: $data) {
                            FILE_NAME
                            FILE_URL
                            TITLE
                            UPD_DATETIME
                            UPD_USER
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030514_LIST_3;
        } catch (e) {
            return e;
        }
    }

    async mgrMATL_LIST_INSERT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S030514_3_MATL_LIST_INSERT(
                        $data: I_S030514_3!
                    ) {
                        mgrUpdate_S030514_3_MATL_LIST_INSERT(data: $data) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    data: argInputData,
                },
            });
            console.log(
                "async mgrUpdate_S030514_3_MATL_LIST_INSERT  call succeed: " +
                    data.mgrUpdate_S030514_3_MATL_LIST_INSERT,
            );
            return data.mgrUpdate_S030514_3_MATL_LIST_INSERT;
        } catch (e) {
            console.log(
                "async mgrUpdate_S030514_3_MATL_LIST_INSERT  call error: ",
            );
            return e;
        }
    }
}
