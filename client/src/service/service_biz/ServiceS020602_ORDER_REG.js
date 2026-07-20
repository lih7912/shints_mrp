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

export class ServiceS020602_ORDER_REG {
    // SERVICE: EDT_KSV_ORDER_MST
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
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

    async process_PARTIAL_SHIP(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_PARTIAL_SHIP(
                        $datas: I_S020602_COPY_ORDER!
                    ) {
                        mgrInsert_S020602_PARTIAL_SHIP(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S020602_PARTIAL_SHIP;
        } catch (e) {
            console.log("async mgrInsert_S020602_PARTIAL_SHIP  call error: ");
            return e;
        }
    }

    async mgrUpdate_CANCEL_ORDER(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020602_CANCEL_ORDER(
                        $datas: I_S020602_INSERT_CAPA!
                    ) {
                        mgrUpdate_S020602_CANCEL_ORDER(datas: $datas) {
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
            return data.mgrUpdate_S020602_CANCEL_ORDER;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    async mgrUpdate_CANCEL_STATUS(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020602_CANCEL_STATUS(
                        $datas: I_S020602_INSERT_CAPA!
                    ) {
                        mgrUpdate_S020602_CANCEL_STATUS(datas: $datas) {
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
            return data.mgrUpdate_S020602_CANCEL_STATUS;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    async mgrUpdate_APPROVAL_ORDER(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020602_APPROVAL_ORDER(
                        $datas: I_S020602_INSERT_CAPA!
                    ) {
                        mgrUpdate_S020602_APPROVAL_ORDER(datas: $datas) {
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
            return data.mgrUpdate_S020602_APPROVAL_ORDER;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    async mgrUpdate_END_CONFIRM(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020602_END_CONFIRM(
                        $datas: I_S020602_END_ORDER!
                    ) {
                        mgrUpdate_S020602_END_CONFIRM(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S020602_END_CONFIRM;
        } catch (e) {
            console.log("async mgrInsert_S020602_END_CONFIRM  call error: ");
            return e;
        }
    }

    async mgrInsert_KSV_ORDER_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_ORDER_REG(
                        $datas: I_S020602_ORDER_REG_SAVE!
                    ) {
                        mgrInsert_S020602_ORDER_REG(datas: $datas) {
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
                    data.mgrInsert_S020602_ORDER_REG,
            );
            return data.mgrInsert_S020602_ORDER_REG;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_INSERT_CAPA(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_INSERT_CAPA(
                        $datas: I_S020602_INSERT_CAPA!
                    ) {
                        mgrInsert_S020602_INSERT_CAPA(datas: $datas) {
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
            return data.mgrInsert_S020602_INSERT_CAPA;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    //

    async mgrQueryORDER_REG_QRY(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_ORDER_REG_QRY(
                        $data: I_S020602_ORDER_REG_QRY!
                    ) {
                        mgrQuery_S020602_ORDER_REG_QRY(data: $data) {
                            CODE_SIZE_INFO {
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_NAME
                                SIZE_CNT
                            }
                            CODE_CURRENCY {
                                CURR_CD
                                WON_AMT
                                USD_RATE
                            }
                            CODE_STYLE_CD {
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
                            CODE_FACTORY_CD {
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
                            CODE_BUYER_CD {
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
                            CODE_NAT_CD {
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
                            }
                            CODE_CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_STEP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_ROUND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_REASON {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SIZE_MST {
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_NAME
                                SIZE_CNT
                            }
                            CODE_PRICE_TERM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_CAPA_USER {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_DL_KIND {
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
                    data: argQry,
                },
            });
            console.log(
                "marQueryORDER_REG_QRY:" +
                    data.mgrQuery_S020602_ORDER_REG_QRY.CODE_FACTORY_CD.length,
            );
            return data.mgrQuery_S020602_ORDER_REG_QRY;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_REG_QRY_STYLE_INFO(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_INFO(
                        $data: I_S020602_ORDER_REG_QRY_KCD_STYLE_INFO!
                    ) {
                        mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_INFO(
                            data: $data
                        ) {
                            FILE_INFO {
                                URL
                                FILE_NAME
                            }
                            SIZE_MST {
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_CNT
                                SIZE_NAME
                            }
                            STYLE_CD {
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
                            PROD_MST {
                                PROD_CD
                                STYLE_CD
                                PROD_TYPE
                                COLOR
                                PROD_UNIT
                                COLLECTION
                                YY
                                SEQ
                                SIZE_LOSS
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            console.log(
                "marQueryORDER_REG_QRY_STYLE_INFO:" +
                    data.mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_INFO.STYLE_CD
                        .length,
            );
            return data.mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_INFO;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_REG_QRY_STYLE_LIST(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_LIST(
                        $data: I_S020602_ORDER_REG_QRY_KCD_STYLE_LIST!
                    ) {
                        mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_LIST(
                            data: $data
                        ) {
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
                            BUYER_TEAM
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            return data.mgrQuery_S020602_ORDER_REG_QRY_KCD_STYLE_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ORDER_FILEINFO(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_FILE_INFO(
                        $data: I_S020602_FILE_INFO!
                    ) {
                        mgrQuery_S020602_FILE_INFO(data: $data) {
                            TITLE
                            NAME
                            URL
                            OBJECT_NAME
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            return data.mgrQuery_S020602_FILE_INFO;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_FILE_INFO_SAVE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020601_BUYER_FILE_INFO_SAVE(
                        $datas: I_S020601_BUYER_FILE_INFO_SAVE!
                    ) {
                        mgrInsert_S020601_BUYER_FILE_INFO_SAVE(datas: $datas)
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S020601_BUYER_FILE_INFO_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_FILEINFO(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020601_BUYER_FILEINFO($buyerCd: String!) {
                        mgrQuery_S020601_BUYER_FILEINFO(BUYER_CD: $buyerCd) {
                            id
                            col1
                            col2
                            col3
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            return data.mgrQuery_S020601_BUYER_FILEINFO;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_MODIFY_QRY(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020601_ORDER_MODIFY_QRY(
                        $data: I_S020601_ORDER_MODIFY_QRY!
                    ) {
                        mgrQuery_S020601_ORDER_MODIFY_QRY(data: $data) {
                            FILE_INFO {
                                FILE_NAME
                                URL
                            }
                            CAPA_MEM {
                                BOOK_DATE
                                ORDER_CD
                                M_ETA
                                JOB_CD
                            }
                            ORDER_MST {
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                ETD
                                NAT_CD
                                NAT_NAME
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                                id
                                PRICE_TERM
                                CAPA_M_ETA
                            }
                            ORDER_MST_ARRAY {
                                ORDER_MEM {
                                    ORDER_CD
                                    PROD_CD
                                    ADD_FLAG
                                    PRICE
                                    TOT_CNT
                                    SIZE_CNT
                                    OLD_PROD_CD
                                    end_price
                                    barcode
                                    MID_SIZE
                                    MID_SIZE_QTY
                                    SIZE_LOSS
                                    id
                                    COLOR
                                }
                                ORDER_MST {
                                    ORDER_CD
                                    STYLE_CD
                                    ORDER_TYPE
                                    YY
                                    SEQ
                                    TOT_CNT
                                    ADD_CNT
                                    AVR_PRICE
                                    FC_BEF
                                    FC_PRICE
                                    MATL_AMT
                                    ETC_AMT
                                    COMMISSION
                                    COMM1
                                    COMM2
                                    OVER_FLAG
                                    OVER_QTY
                                    OVER_AMT
                                    OVER_BILL
                                    CURR_CD
                                    USD_PRICE
                                    ORDER_DATE
                                    DUE_DATE
                                    MATL_DUE_DATE
                                    ETD
                                    NAT_CD
                                    NAT_NAME
                                    FACTORY_CD
                                    SIZE_GROUP
                                    ORDER_FLAG
                                    SAMPLE_FLAG
                                    MATL_SALE_FLAG
                                    FAC_LC_FLAG
                                    FAC_TT_FLAG
                                    ORDER_STATUS
                                    END_DATETIME
                                    REMARK
                                    REF_ORDER_NO
                                    REF_NO
                                    REF_Q_OUTER
                                    REF_Q_LINER
                                    REF_ORDER_REQ
                                    REF_COLOR1
                                    REF_COLOR2
                                    REF_SIZE1
                                    REF_SIZE2
                                    REF_QTY1
                                    REF_QTY2
                                    MATL_PAY_FLAG
                                    MATL_PAY_USER
                                    MATL_PAY_DATETIME
                                    FC_NEGO_TYPE
                                    STATUS_CD
                                    REG_USER
                                    REG_DATETIME
                                    UPD_USER
                                    UPD_DATETIME
                                    APPROVAL_USER
                                    APPROVAL_DATETIME
                                    brand
                                    season
                                    krw_flag
                                    krw_matl_amt
                                    margin
                                    frt_check
                                    category
                                    ORG_DUE_DATE
                                    BUYER_TEAM
                                    SAMPLE_COST_FLAG
                                    DL_FLAG
                                    TRADE_PRICE
                                    LINE_CHARGE_PRICE
                                    DUTY
                                    mid_size1
                                    mid_size2
                                    mid_size3
                                    mid_size4
                                    END_STATUS
                                    FC_PRICE2
                                    CANCEL_DATETIME
                                    PO_MATL_AMT
                                    id
                                    PRICE_TERM
                                }
                            }
                            PROD_MST {
                                PROD_CD
                                STYLE_CD
                                PROD_TYPE
                                COLOR
                                PROD_UNIT
                                COLLECTION
                                YY
                                SEQ
                                SIZE_LOSS
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
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
                            CODE_STYLE_CD {
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
                            CODE_FACTORY_CD {
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
                            CODE_BUYER_CD {
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
                            CODE_CURRENCY {
                                WON_AMT
                                WON_AMT2
                                START_DATE
                                CURR_CD
                                USD_RATE
                            }
                            CODE_NAT_CD {
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
                            }
                            CODE_CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_STEP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_ROUND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_REASON {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_PRICE_TERM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_CAPA_USER {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_DL_KIND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SIZE_MST {
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_NAME
                            }
                            IS_CHANGE {
                                CD_CODE
                                CD_NAME
                            }
                            INFO_ORDER_MST {
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                ETD
                                NAT_CD
                                NAT_NAME
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                                id
                                STYLE_NAME
                                ORDER_STATUS_NAME
                                BUYER_NAME
                                SIZE_MEMBER
                            }
                            INFO_ORDER_CMPT {
                                ORDER_CMPT
                            }
                            INFO_PO {
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                CONS_F
                                CONS_A
                                id
                            }
                            INFO_SHIP_CNT {
                                SUM_SHIP_CNT
                            }
                            INFO_SAMPLE_COST {
                                SAMPLE_CD
                                SEQ
                                YY
                                SAMPLE_SEQ
                                ORDER_CD
                                ORDER_QTY
                                STYLE_CD
                                WORK_TYPE
                                REPAIR_QTY
                                PATT_USER
                                PATT_COST
                                PATT_GRADE
                                PATT_REMARK
                                SEW_USER
                                SEW_COST
                                SEW_GRADE
                                SEW_REMARK
                                WELDING_COST
                                SUB_PATT_COST
                                SUB_SEW_COST
                                SUB_WELDING_COST
                                BUYER_CD
                                ETC_AMOUNT
                                REMARK
                                CONFIRM_FLAG
                                PATT_LOSS
                                PATT_LOSS_TIME
                                SEW_LOSS
                                SEW_LOSS_TIME
                                SAMPLE_END_FLAG
                                SAMPLE_END_DATE
                                END_FLAG
                                END_DATE
                                REG_USER
                                REG_DATETIME
                                PATT_FLAG
                                SEW_FLAG
                                WELDING_FLAG
                                PATT3D_USER
                                WORK3D_USER
                                COLOR3D_QTY
                                PATT3D_COST
                                WORK3D_COST
                                SAMPLE_STEP
                                SAMPLE_ROUND
                                SAMPLE_REASON
                                CUTTING_USER
                                COMPLETE_USER
                            }
                            INFO_INVOICE_MEM {
                                SHIP_DATE
                                SHIP_TYPE_NAME
                                SHIP_QTY
                                SALES_PRICE
                                INVOICE_NO
                                DELIVERY_TYPE_NAME
                                SHIP_PRICE
                                SHIP_DATE1
                                COUNTRY
                                SALES_DATE
                                DOCU_NO
                                CURR_CD
                                USD_RATE
                            }
                            INFO_INVOICE_DOCU {
                                SHIP_DATE
                                SHIP_TYPE_NAME
                                SHIP_QTY
                                SALES_PRICE
                                INVOICE_NO
                                DELIVERY_TYPE_NAME
                                SHIP_PRICE
                                SHIP_DATE1
                                COUNTRY
                                SALES_DATE
                                DOCU_NO
                                CURR_CD
                                USD_RATE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            return data.mgrQuery_S020601_ORDER_MODIFY_QRY;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_INFO(argQRY_ORDER_INFO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020401_ORDER_INFO_QRY2(
                        $data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM!
                    ) {
                        mgrQuery_S020401_ORDER_INFO_QRY2(data: $data) {
                            ORDER_MST {
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                NAT_NAME
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                                id
                                STYLE_NAME
                                ORDER_STATUS_NAME
                                BUYER_NAME
                                SIZE_MEMBER
                            }
                            ORDER_CMPT {
                                ORDER_CMPT
                            }
                            PO {
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                CONS_F
                                CONS_A
                                id
                            }
                            SHIP_CNT {
                                SUM_SHIP_CNT
                            }
                            SAMPLE_COST {
                                SAMPLE_CD
                                SEQ
                                YY
                                SAMPLE_SEQ
                                ORDER_CD
                                ORDER_QTY
                                STYLE_CD
                                WORK_TYPE
                                REPAIR_QTY
                                PATT_USER
                                PATT_COST
                                PATT_GRADE
                                PATT_REMARK
                                SEW_USER
                                SEW_COST
                                SEW_GRADE
                                SEW_REMARK
                                WELDING_COST
                                SUB_PATT_COST
                                SUB_SEW_COST
                                SUB_WELDING_COST
                                BUYER_CD
                                ETC_AMOUNT
                                REMARK
                                CONFIRM_FLAG
                                PATT_LOSS
                                PATT_LOSS_TIME
                                SEW_LOSS
                                SEW_LOSS_TIME
                                SAMPLE_END_FLAG
                                SAMPLE_END_DATE
                                END_FLAG
                                END_DATE
                                REG_USER
                                REG_DATETIME
                                PATT_FLAG
                                SEW_FLAG
                                WELDING_FLAG
                                PATT3D_USER
                                WORK3D_USER
                                COLOR3D_QTY
                                PATT3D_COST
                                WORK3D_COST
                                SAMPLE_STEP
                                SAMPLE_ROUND
                                SAMPLE_REASON
                                CUTTING_USER
                                COMPLETE_USER
                            }
                            ORDER_MST_ARRAY {
                                ORDER_CD
                                NAT_CD
                                NAT_NAME
                                DUE_DATE
                                TOT_QTY
                                ORDER_MEM {
                                    ORDER_CD
                                    PROD_CD
                                    ADD_FLAG
                                    PRICE
                                    TOT_CNT
                                    SIZE_CNT
                                    OLD_PROD_CD
                                    end_price
                                    barcode
                                    MID_SIZE
                                    MID_SIZE_QTY
                                    SIZE_LOSS
                                    id
                                    COLOR
                                }
                            }
                            ORDER_MEM {
                                ORDER_CD
                                PROD_CD
                                ADD_FLAG
                                PRICE
                                TOT_CNT
                                SIZE_CNT
                                OLD_PROD_CD
                                end_price
                                barcode
                                MID_SIZE
                                MID_SIZE_QTY
                                SIZE_LOSS
                                id
                                COLOR
                            }
                            INVOICE_MEM {
                                SHIP_DATE
                                SHIP_TYPE_NAME
                                SHIP_QTY
                                SALES_PRICE
                                INVOICE_NO
                                DELIVERY_TYPE_NAME
                                SHIP_PRICE
                                SHIP_DATE1
                            }
                            CODE_FACTORY_CD {
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
                            CODE_NAT_CD {
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
                            }
                            CODE_PATT_USER {
                                USER_ID
                                PASSWD
                                USER_NAME
                                FACTORY_CD
                                PART
                                RANK
                                EMAIL
                                USER_LEVEL
                                STATUS_CD
                                AUTH_KEY
                                ID_RSA
                                TEL_NO
                                EXCEL
                                BUYER_TEAM
                                CELLULAR
                                EMP_NO
                                id
                            }
                            CODE_SEW_USER {
                                USER_ID
                                PASSWD
                                USER_NAME
                                FACTORY_CD
                                PART
                                RANK
                                EMAIL
                                USER_LEVEL
                                STATUS_CD
                                AUTH_KEY
                                ID_RSA
                                TEL_NO
                                EXCEL
                                BUYER_TEAM
                                CELLULAR
                                EMP_NO
                                id
                            }
                            CODE_BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_STEP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_ROUND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_REASON {
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
                    data: argQRY_ORDER_INFO,
                },
            });
            // console.log("marQueryORDER_INFO:" + data.mgrQuery_S020401_ORDER_INFO_QRY2.ORDER_MST.length );
            // console.log("marQueryORDER_INFO:" + tWObj.ORDER_MST.length );

            return data.mgrQuery_S020401_ORDER_INFO_QRY2;
        } catch (e) {
            console.log("marQueryORDER_INFO error:" + e.message);
            return e;
        }
    }

    async mgrQuery_GET_CURR_DATA(argQRY_INFO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_ORDER_REG_GET_CURR_DATA(
                        $data: I_S020602_ORDER_REG_GET_CURR_DATA!
                    ) {
                        mgrQuery_S020602_ORDER_REG_GET_CURR_DATA(data: $data) {
                            USD_RATE
                            WON_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_INFO,
                },
            });
            return data.mgrQuery_S020602_ORDER_REG_GET_CURR_DATA;
        } catch (e) {
            console.log("marQueryORDER_INFO error:" + e.message);
            return e;
        }
    }

    async mgrQuery_GET_CHANGE_INFO(argQRY_INFO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_ORDER_REG_GET_CHANGE_INFO(
                        $data: I_S020602_ORDER_REG_GET_CHANGE_INFO!
                    ) {
                        mgrQuery_S020602_ORDER_REG_GET_CHANGE_INFO(
                            data: $data
                        ) {
                            ORDER_MST {
                                ORDER_CD
                                ORDER_CD1
                                ORDER_CD2
                                FACTORY_CD
                                ORDER_QTY
                                ADD_QTY
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                NAT_NAME
                                CURR_CD
                                FOB
                                FOB_USD
                                SIZE_MEMBER
                                SIZE_GROUP
                                CAPA_USER
                                ORDER_STATUS
                            }
                            ORDER_MST_ARRAY {
                                ORDER_CD
                                TYPE
                                CURR_CD
                                NAT_CD
                                BUYER_PO
                                EXF_DATE
                                ETD_DATE
                                IS_DL
                                ORDER_QTY
                                ADD_QTY
                                MID_SIZE1
                                REMARK1
                                REMARK2
                                NOTE
                                ORDER_MEM {
                                    PROD_CD
                                    ADD_FLAG
                                    COLOR
                                    TOT_CNT
                                    PRICE
                                    SIZE_CNT
                                }
                            }
                            ORDER_MST_ARRAY_OLD {
                                ORDER_CD
                                TYPE
                                CURR_CD
                                NAT_CD
                                BUYER_PO
                                EXF_DATE
                                ETD_DATE
                                IS_DL
                                ORDER_QTY
                                ADD_QTY
                                    MID_SIZE1
                                REMARK1
                                REMARK2
                                NOTE
                                ORDER_MEM {
                                    PROD_CD
                                    ADD_FLAG
                                    COLOR
                                    TOT_CNT
                                    PRICE
                                    SIZE_CNT
                                }
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_INFO,
                },
            });
            console.log(data.mgrQuery_S020602_ORDER_REG_GET_CHANGE_INFO);
            return data.mgrQuery_S020602_ORDER_REG_GET_CHANGE_INFO;
        } catch (e) {
            console.log("mgrQueryORDER_INFO error:" + e.message);
            return e;
        }
    }

    async mgrQuery_EXCEL_END_REPORT(argQRY_INFO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S020602_EXCEL_END_REPORT(
                        $data: I_S020602_EXCEL_END_REPORT!
                    ) {
                        mgrQuery_S020602_EXCEL_END_REPORT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_INFO,
                },
            });
            return data.mgrQuery_S020602_EXCEL_END_REPORT;
        } catch (e) {
            console.log("marQueryORDER_INFO error:" + e.message);
            return e;
        }
    }

    async mgrUpdate_CANCEL_END_REPORT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020602_CANCEL_END_REPORT(
                        $datas: I_S020602_END_ORDER!
                    ) {
                        mgrUpdate_S020602_CANCEL_END_REPORT(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S020602_CANCEL_END_REPORT;
        } catch (e) {
            console.log(
                "async mgrInsert_S020602_CANCEL_END_CONFIRM  call error: ",
            );
            return e;
        }
    }

    async mgrUpdate_END_SHIP(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020602_END_SHIP(
                        $datas: I_S020602_END_ORDER!
                    ) {
                        mgrUpdate_S020602_END_SHIP(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S020602_END_SHIP;
        } catch (e) {
            console.log("async mgrInsert_S020602_END_SHIP  call error: ");
            return e;
        }
    }

    async mgrInsert_FILE_ADD(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_5_FILE_ADD(
                        $datas: I_S020602_5_FILE_INFO!
                    ) {
                        mgrInsert_S020602_5_FILE_ADD(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S020602_5_FILE_ADD;
        } catch (e) {
            console.log("async mgrInsert_S020602_5_FILE_ADD,  call error: ");
            return e;
        }
    }

    async mgrInsert_FILE_UPDATE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_5_FILE_UPDATE(
                        $datas: I_S020602_5_FILE_INFO!
                    ) {
                        mgrInsert_S020602_5_FILE_UPDATE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S020602_5_FILE_UPDATE;
        } catch (e) {
            console.log("async mgrInsert_S020602_5_FILE_ADD,  call error: ");
            return e;
        }
    }

    async mgrInsert_FILE_DELETE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_5_FILE_DELETE(
                        $datas: I_S020602_5_FILE_INFO!
                    ) {
                        mgrInsert_S020602_5_FILE_DELETE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S020602_5_FILE_DELETE;
        } catch (e) {
            console.log("async mgrInsert_S020602_5_FILE_ADD,  call error: ");
            return e;
        }
    }
}
