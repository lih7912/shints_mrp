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

export class ServiceS0208_CAPABOOK_RECORD_BVT {
    // SERVICE: EDT_KSV_CAPABOOK_MEM

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrInsert_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrInsert_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_CAPABOOK_MEM(argData, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT!
                        $datas1: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT2!]!
                    ) {
                        mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData2,
                },
            });
            return data.mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_CAPA_REFRESH(argData, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0208_CAPA_REFRESH(
                        $datas: I_S0208_CAPA_REFRESH!
                        $datas1: [I_S0208_CAPA_REFRESH2!]!
                    ) {
                        mgrUpdate_S0208_CAPA_REFRESH(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData2,
                },
            });
            return data.mgrUpdate_S0208_CAPA_REFRESH;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_CAPABOOK_MEM_CANCEL(argData, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_CANCEL(
                        $datas: I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT!
                        $datas1: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_EDT2!]!
                    ) {
                        mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_CANCEL(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData2,
                },
            });
            return data.mgrUpdate_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrDelete_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrDelete_S0208_CAPABOOK_RECORD_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM
    async mgrQueryCAPABOOK_DATE(argQRY_CAPABOOK_DATE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0208_CAPABOOK_RECORD_BVT_DATE(
                        $userId: String!
                    ) {
                        mgrQuery_S0208_CAPABOOK_RECORD_BVT_DATE(
                            USER_ID: $userId
                        ) {
                            BOOK_DATE_BVT
                            BOOK_DATE_ETP
                            NEW_DATE_BVT
                            NEW_DATE_ETP
                            BOOK_DATE_SAMPLE_BVT
                            NEW_DATE_SAMPLE_BVT
                            BOOK_DATE_SAMPLE_ETP
                            NEW_DATE_SAMPLE_ETP
                            BVT_KIND {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            NR {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            FACTORY_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            CAPA_USER {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: {
                    userId: argQRY_CAPABOOK_DATE,
                },
            });
            console.log("Service call =>");
            console.log(data.mgrQuery_S0208_CAPABOOK_RECORD_BVT_DATE);
            return data.mgrQuery_S0208_CAPABOOK_RECORD_BVT_DATE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryCAPABOOK_CODE(argQRY_CAPABOOK_DATE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0208_CODE($userId: String!) {
                        mgrQuery_S0208_CODE(USER_ID: $userId) {
                            BVT_KIND {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            NR {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            FACTORY_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            CAPA_USER {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: {
                    userId: argQRY_CAPABOOK_DATE,
                },
            });
            return data.mgrQuery_S0208_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryCAPABOOK_CODE(argQRY_CAPABOOK_DATE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0208_CODE($userId: String!) {
                        mgrQuery_S0208_CODE(USER_ID: $userId) {
                            BVT_KIND {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            NR {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            FACTORY_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            CAPA_USER {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: {
                    userId: argQRY_CAPABOOK_DATE,
                },
            });
            return data.mgrQuery_S0208_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_CAPABOOK_MEM(argQRY_KSV_CAPABOOK_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM(
                        $data: I_S0208_CAPABOOK_RECORD_BVT_QRY_KSV_CAPABOOK_MEM!
                    ) {
                        mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM(
                            data: $data
                        ) {
                            JOB_CD
                            IN_DATE
                            BUYER_NAME
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            NR
                            QTY
                            MW
                            SHIP_DATE
                            EXF
                            M_ETA
                            ETD
                            APPROVAL_DATE
                            SD
                            FOB
                            EXP_CMPT
                            NEGO_TYPE
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            FTP
                            DTP
                            LAZE
                            BVT_KIND
                            SEQ
                            REMARK
                            S_ETA
                            USAGE
                            USAGE_N
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_CAPABOOK_MEM,
                },
            });
            console.log(
                "marQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM:" +
                    data.mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM
                        .length,
            );
            return data.mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM1

    async mgrQueryTBL_KSV_CAPABOOK_MEM1(argQRY_KSV_CAPABOOK_MEM1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM1(
                        $data: I_S0208_CAPABOOK_RECORD_BVT_QRY_KSV_CAPABOOK_MEM1!
                    ) {
                        mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1(
                            data: $data
                        ) {
                            JOB_CD
                            IN_DATE
                            BUYER_NAME
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            NR
                            QTY
                            MW
                            SHIP_DATE
                            EXF
                            M_ETA
                            ETD
                            APPROVAL_DATE
                            SD
                            FOB
                            EXP_CMPT
                            NEGO_TYPE
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            FTP
                            DTP
                            LAZE
                            BVT_KIND
                            SEQ
                            REMARK
                            S_ETA
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_CAPABOOK_MEM1,
                },
            });
            console.log(
                "marQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1:" +
                    data
                        .mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1
                        .length,
            );
            return data.mgrQuery_S0208_CAPABOOK_RECORD_BVT_TBL_KSV_CAPABOOK_MEM1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_SEARCH_STYLE2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0208_SEARCH_STYLE2(
                        $data: I_S0208_SEARCH_STYLE2!
                    ) {
                        mgrQuery_S0208_SEARCH_STYLE2(data: $data) {
                            BUYER_CD
                            STYLE_CD
                            STYLE_NAME
                            EMBOSSING
                            WASHING
                            TPR
                            DTP
                            DOWN
                            TP
                            FND
                            W
                            LAZE
                            CUT
                            SP
                            FTP
                            EMBRO
                            LTHR
                            BVT_KIND
                            MW
                            DL
                            G
                            S
                            UNIT
                            PURPOSE
                            FABRIC
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0208_SEARCH_STYLE2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_SEARCH_ORDER2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0208_SEARCH_ORDER2(
                        $data: I_S0208_SEARCH_ORDER2!
                    ) {
                        mgrQuery_S0208_SEARCH_ORDER2(data: $data) {
                            CAPA_DATE
                            PO_CD
                            ORDER {
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
                                PI_CD
                                PRICE_TERM
                                CAPA_M_ETA
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
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0208_SEARCH_ORDER2;
        } catch (e) {
            return e;
        }
    }
}
