/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS020601_ORDER_MODIFY {
    // SERVICE: EDT_KSV_ORDER_MST
    async mgrInsert_KSV_ORDER_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020601_ORDER_MODIFY(
                        $datas: I_S020601_ORDER_MODIFY_SAVE!
                    ) {
                        mgrInsert_S020601_ORDER_MODIFY(datas: $datas) {
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
                    data.mgrInsert_S020601_ORDER_MODIFY,
            );
            return data.mgrInsert_S020601_ORDER_MODIFY;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    //

    async mgrQueryORDER_REG_QRY(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S020601_ORDER_MODIFY_QRY(
                        $data: I_S020601_ORDER_MODIFY_QRY!
                    ) {
                        mgrQuery_S020601_ORDER_MODIFY_QRY(data: $data) {
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
                                CAPA_M_ETA
                                id
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
                                    NAT_CD
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
                                SIZE_CNT
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                            CODE_CURRENCY {
                                CURR_CD
                                START_DATE
                                WON_AMT
                                WON_AMT2
                                USD_RATE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            console.log(
                "marQueryORDER_REG_MODIFY:" +
                    data.mgrQuery_S020601_ORDER_MODIFY_QRY.CODE_FACTORY_CD
                        .length,
            );
            return data.mgrQuery_S020601_ORDER_MODIFY_QRY;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_REG_QRY_STYLE_INFO(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO(
                        $data: I_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO!
                    ) {
                        mgrQuery_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO(
                            data: $data
                        ) {
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
                    data.mgrQuery_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO
                        .STYLE_CD.length,
            );
            return data.mgrQuery_S020601_ORDER_MODIFY_QRY_KCD_STYLE_INFO;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_FILE_INFO_SAVE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
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
            const { loading, error, data } = await client.query({
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
}
