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

export class ServiceS0204_ORDER_LIST {
    // SERVICE: TBL_KSV_ORDER_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_COPY_ORDER(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_COPY_ORDER(
                        $datas: I_S020602_COPY_ORDER!
                    ) {
                        mgrInsert_S020602_COPY_ORDER(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_KSV_ORDER_MST  call succeed: " + data.mgrInsert_S020602_ORDER_REG);
            return data.mgrInsert_S020602_COPY_ORDER;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    async mgrDelete_DELETE_ORDER(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020602_DELETE_ORDER(
                        $datas: I_S020602_INSERT_CAPA!
                    ) {
                        mgrDelete_S020602_DELETE_ORDER(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_KSV_ORDER_MST  call succeed: " + data.mgrInsert_S020602_ORDER_REG);
            return data.mgrDelete_S020602_DELETE_ORDER;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST(
                        $data: I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            datas {
                                PO_CD
                                ORDER_CD
                                BUYER_CD
                                BUYER_NAME
                                REF_ORDER_NO
                                STYLE_NAME
                                STYLE_CD
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                ETD
                                ORDER_QTY
                                TOT_CNT
                                ADD_CNT
                                SHIP_CNT
                                AVR_PRICE
                                CURR_CD
                                USD_PRICE
                                FC_PRICE
                                C_MATL_AMT
                                C_ETC_AMT
                                MARGIN
                                MARGIN2
                                STATUS_NAME
                                END_STATUS
                                REMARK
                                REG_USER
                                FACTORY_NAME
                                FACTORY_CD
                                REF_Q_OUTER
                                REF_Q_LINER
                                ETC_AMT
                                MATL_AMT
                                ORDER_TYPE
                                ORDER_STATUS
                                ORG_DUE_DATE
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                PI_CD
                                PRICE_TERM
                                REMARK
                                BUYER_TEAM_N
                            }
                            message
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "marQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST.length,
            );
            return data.mgrQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_SHEET_NORMAL(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_ORDER_SHEET_NORMAL(
                        $data: I_S0204_ORDER_SHEET_NORMAL!
                    ) {
                        mgrQuery_S0204_ORDER_SHEET_NORMAL(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0204_ORDER_SHEET_NORMAL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_SHEET_COMBINE(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_ORDER_SHEET_COMBINE(
                        $data: I_S0204_ORDER_SHEET_COMBINE!
                    ) {
                        mgrQuery_S0204_ORDER_SHEET_COMBINE(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0204_ORDER_SHEET_COMBINE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_LIST_CODE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_ORDER_LIST_CODE($data: I_S0204_CODE!) {
                        mgrQuery_S0204_ORDER_LIST_CODE(data: $data) {
                            CURR_CD {
                                CD_CODE
                                CD_NAME
                            }
                            STATUS_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_TEAM {
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
                            STYLE {
                                STYLE_CD
                                STYLE_NAME
                                BUYER_CD
                                MW
                                EMBRO
                                TP
                                SP
                                LTHR
                                G
                                W
                                S
                                FND
                                DL
                                DOWN
                                CUT
                                KIND
                                BVT_KIND
                                YY
                                SEQ
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                TPR
                                EMBOSSING
                                WASHING
                                style_kname
                                ss_direct_rate
                                ss_extra_rate
                                ss_retail_rate
                                ss_web_rate
                                ss_nsr_rate
                                ss_webex_rate
                                minus_limit
                                in_exp_date
                                FTP
                                DTP
                                LAZE
                                id
                            }
                            BUYER {
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
                            FACTORY {
                                FACTORY_CD
                                FACTORY_NAME
                                FACTORY_NAME2
                                USER_NAME
                                EMAIL
                                COUNTRY
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                PORT
                                AIRPORT
                                NAT_CD
                                BANK_CD
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                tag_po
                                tag_order
                                place_cd
                                PACK_NAME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            console.log(
                "marQuery_S0204_ORDER_LIST_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S0204_ORDER_LIST_CODE.STATUS_CD.length,
            );
            return data.mgrQuery_S0204_ORDER_LIST_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_LIST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_ORDER_LIST(
                        $data: I_S0204_ORDER_LIST_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0204_ORDER_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0204_ORDER_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_QTY(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_ORDER_QTY(
                        $data: [I_S0204_ORDER_SHEET_NORMAL!]!
                    ) {
                        mgrQuery_S0204_ORDER_QTY(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0204_ORDER_QTY;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_END_ORDER(argIn1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0204_5_END_ORDER(
                        $datas: [I_S0204_5_END_ORDER!]!
                    ) {
                        mgrUpdate_S0204_5_END_ORDER(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                },
            });
            // console.log("mgrInsert_S0205_5 call succeed: " + data.mgrInsert_S0205_5);
            return data.mgrUpdate_S0204_5_END_ORDER;
        } catch (e) {
            // console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_END_ORDER_CANCEL(argIn1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0204_5_END_ORDER_CANCEL(
                        $datas: [I_S0204_5_END_ORDER!]!
                    ) {
                        mgrUpdate_S0204_5_END_ORDER_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                },
            });
            // console.log("mgrInsert_S0205_5 call succeed: " + data.mgrInsert_S0205_5);
            return data.mgrUpdate_S0204_5_END_ORDER_CANCEL;
        } catch (e) {
            // console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrQuery_ORDER_FOB(argInData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0204_KSV_ORDER_FOB(
                        $data: I_S0204_KSV_ORDER_FOB!
                    ) {
                        mgrQuery_S0204_KSV_ORDER_FOB(data: $data) {
                            FOB_SEQ
                            SHIP_QTY
                            FOB
                            FOB100
                        }
                    }
                `,
                variables: {
                    data: argInData,
                },
            });
            return data.mgrQuery_S0204_KSV_ORDER_FOB;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_CHANGE_FOB(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0204_5_CHANGE_FOB(
                        $datas1: I_S0204_5_CHANGE_FOB1!
                        $datas2: [I_S0204_5_CHANGE_FOB2!]!
                    ) {
                        mgrUpdate_S0204_5_CHANGE_FOB(
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argIn1,
                    datas2: argIn2,
                },
            });
            return data.mgrUpdate_S0204_5_CHANGE_FOB;
        } catch (e) {
            // console.log("async mgrUpdate_Change_FOB  call error: ");
            return e;
        }
    }

    async mgrUpdate_UPDATE_DETAIL(argIn1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0204_5_UPDATE_DETAIL(
                        $datas: [I_S0204_5_UPDATE_DETAIL!]!
                    ) {
                        mgrUpdate_S0204_5_UPDATE_DETAIL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                },
            });
            return data.mgrUpdate_S0204_5_UPDATE_DETAIL;
        } catch (e) {
            // console.log("async mgrUpdate_KSV_ORDER_MST  Update Detail: ");
            return e;
        }
    }
}
