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

export class ServiceS030513_MRP_LIST {
    // SERVICE: TBL_KSV_PO_MST
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_QRY_PO_MRP2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030513_QRY_PO_MRP2(
                        $data: I_S030513_QRY_PO_MRP!
                    ) {
                        mgrQueryS030513_QRY_PO_MRP2(data: $data) {
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
            return data.mgrQueryS030513_QRY_PO_MRP2;
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
                    query MgrQueryS030513_REPORT_1(
                        $data: I_S030513_QRY_PO_MRP!
                    ) {
                        mgrQueryS030513_REPORT_1(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030513_REPORT_1;
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
                    query MgrQueryS030513_REPORT_MRP_LIST(
                        $data: I_S030513_REPORT_MRP_LIST!
                    ) {
                        mgrQueryS030513_REPORT_MRP_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030513_REPORT_MRP_LIST;
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
                    query MgrQueryS030513_REPORT_MRP_LIST2(
                        $data: I_S030513_REPORT_MRP_LIST!
                    ) {
                        mgrQueryS030513_REPORT_MRP_LIST2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030513_REPORT_MRP_LIST2;
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
                    query MgrQueryS030513_REPORT_MRP_LIST3(
                        $data: I_S030513_REPORT_MRP_LIST!
                    ) {
                        mgrQueryS030513_REPORT_MRP_LIST3(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030513_REPORT_MRP_LIST3;
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
                    query MgrQueryS030513_REPORT_ADD_MATL_REQ(
                        $data: I_S030513_QRY_PO_MRP!
                    ) {
                        mgrQueryS030513_REPORT_ADD_MATL_REQ(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS030513_REPORT_ADD_MATL_REQ;
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
                    query MgrQueryS030513_QRY_PO_MRP1(
                        $data: I_S030513_QRY_PO_MRP!
                    ) {
                        mgrQueryS030513_QRY_PO_MRP1(data: $data) {
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
            return data.mgrQueryS030513_QRY_PO_MRP1;
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
                    query MgrQueryS030513_QRY_ORDER(
                        $data: I_S030513_QRY_PO_MRP!
                    ) {
                        mgrQueryS030513_QRY_ORDER(data: $data) {
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
            return data.mgrQueryS030513_QRY_ORDER;
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
                    query MgrQueryS030513_QRY_ORDER_COMBINED(
                        $data: I_S030513_QRY_PO_MRP2!
                    ) {
                        mgrQueryS030513_QRY_ORDER_COMBINED(data: $data) {
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
            return data.mgrQueryS030513_QRY_ORDER_COMBINED;
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
                    query MgrQueryS030513_QRY_SEQ_COMMENT(
                        $data: I_S030513_QRY_PO_MRP!
                    ) {
                        mgrQueryS030513_QRY_SEQ_COMMENT(data: $data) {
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
            return data.mgrQueryS030513_QRY_SEQ_COMMENT;
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
                    query MgrQueryS030513_1($data: I_S030513_1!) {
                        mgrQueryS030513_1(data: $data) {
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
                "marQuery_S030513_MRP_LIST_TBL_KSV_PO_MST:" +
                    data.mgrQueryS030513_1.length,
            );
            return data.mgrQueryS030513_1;
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
                    query MgrQueryS030513_2($data: I_S030513_2!) {
                        mgrQueryS030513_2(data: $data) {
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
                "marQuery_S030513_MRP_LIST_TBL_KSV_PO_MST:" +
                    data.mgrQueryS030513_2.length,
            );
            return data.mgrQueryS030513_2;
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
                    query MgrQueryS030513_1_CODE($data: I_S030513_1!) {
                        mgrQueryS030513_1_CODE(data: $data) {
                            PO_SEQ {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SEQ_REASON {
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
            console.log(
                "marQuery_S030513_MRP_LIST_TBL_KSV_PO_MST:" +
                    data.mgrQueryS030513_1_CODE.PO_SEQ.length,
            );
            return data.mgrQueryS030513_1_CODE;
        } catch (e) {
            return e;
        }
    }
}
