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

export class ServiceS0203_SAMPLE_COST {
    // SERVICE: EDT_KZZ_SAMPLE_COST
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KZZ_SAMPLE_COST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST(
                        $datas: [I_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
                    ) {
                        mgrInsert_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KZZ_SAMPLE_COST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0203_SAMPLE_COST(
                        $datas: I_S0203_SAMPLE_COST!
                    ) {
                        mgrUpdate_S0203_SAMPLE_COST(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0203_SAMPLE_COST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KZZ_SAMPLE_COST_END(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0203_SAMPLE_COST_END(
                        $datas: I_S0203_SAMPLE_COST!
                    ) {
                        mgrUpdate_S0203_SAMPLE_COST_END(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0203_SAMPLE_COST_END;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KZZ_SAMPLE_COST_SPW_3D(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0203_SAMPLE_COST_SPW_3D(
                        $datas: I_S0203_SAMPLE_COST!
                    ) {
                        mgrUpdate_S0203_SAMPLE_COST_SPW_3D(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0203_SAMPLE_COST_SPW_3D;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KZZ_SAMPLE_COST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST(
                        $datas: [I_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST!]!
                    ) {
                        mgrDelete_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0203_SAMPLE_COST_EDT_KZZ_SAMPLE_COST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_STYLE

    async mgrQueryTBL_KCD_STYLE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE(
                        $data: I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST!
                    ) {
                        mgrQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE(data: $data) {
                            id
                            SAMPLE_SEQ
                            BUYER_NAME
                            STYLE_NAME
                            ORDER_CD
                            ORG_DUE_DATE
                            DUE_DATE
                            TOTAL_COST
                            PATT_USER
                            PATT_COST
                            PATT_COST_NAME
                            PATT_AMT
                            ORDER_QTY
                            SEW_USER
                            SEW_COST
                            SEW_COST_NAME
                            SEW_AMT
                            WELDING_COST
                            WELDING_AMT
                            SUB_PATT_COST
                            SUB_SEW_COST
                            SUB_WELDING_COST
                            BUYER_CD
                            STYLE_CD
                            WORK_TYPE_NAME
                            WORK_TYPE
                            WORK_KIND_NAME
                            WORK_KIND
                            REPAIR_QTY
                            REPAIR_COST
                            REMARK
                            ETC_AMOUNT
                            SAMPLE_TYPE
                            SAMPLE_END_FLAG
                            SAMPLE_END_FLAG_N
                            SAMPLE_END_DATE
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                            CONFIRM_FLAG
                            SAMPLE_CD
                            PATT_GRADE
                            SEW_GRADE
                            FC_PRICE
                            PATT_LOSS
                            PATT_LOSS_NAME
                            PATT_LOSS_TIME
                            SEW_LOSS
                            SEW_LOSS_NAME
                            SEW_LOSS_TIME
                            PATT_REMARK
                            SEW_REMARK
                            PATT
                            SEW
                            WELDING
                            PATT_FLAG
                            SEW_FLAG
                            WELDING_FLAG
                            PATT3D_USER
                            PATT3D_COST
                            PATT3D_AMT
                            WORK3D_USER
                            WORK3D_COST
                            WORK3D_COST_NAME
                            WORK3D_AMT
                            COLOR3D_COST
                            PATT3D
                            WORK3D
                            COLOR3D_QTY
                            COLOR3D_AMT
                            PATT_COST_CODE
                            SEW_COST_CODE
                            PATT_LOSS_CODE
                            SEW_LOSS_CODE
                            PATT3D_COST_CODE
                            WORK3D_COST_CODE
                            CUTTING_USER
                            COMPLETE_USER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "marQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE:" +
                    data.mgrQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE.length,
            );
            return data.mgrQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_KCD_STYLE_BUYER_CD(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0203_KCD_STYLE_BUYER_CD(
                        $data: I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST!
                    ) {
                        mgrQuery_S0203_KCD_STYLE_BUYER_CD(data: $data) {
                            STYLE_CD
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0203_KCD_STYLE_BUYER_CD;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_1(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0203_REPORT_1(
                        $data: I_S0203_SAMPLE_COST_QRY_KZZ_SAMPLE_COST!
                    ) {
                        mgrQuery_S0203_REPORT_1(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            return data.mgrQuery_S0203_REPORT_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuerySAMPLE_COST_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0203_SAMPLE_COST_CODE {
                        mgrQuery_S0203_SAMPLE_COST_CODE {
                            WORK_KIND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            WORK_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            ORDER_CD {
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
                            PATT_LOSS {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SEW_LOSS {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PATT_USER {
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
                            PATT_COST {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SEW_USER {
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
                            SEW_COST {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CUTTING_USER {
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
                            COMPLETE_USER {
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
                            PATT3D_COST {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PATT3D_USER {
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
                            WORK3D_COST {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            WORK3D_USER {
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
                        }
                    }
                `,
            });
            console.log(
                "marQuery_S0203_SAMPLE_COST_TBL_KCD_STYLE:" +
                    data.mgrQuery_S0203_SAMPLE_COST_CODE.WORK3D_COST.length,
            );
            return data.mgrQuery_S0203_SAMPLE_COST_CODE;
        } catch (e) {
            return e;
        }
    }
}
