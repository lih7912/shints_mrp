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

export class ServiceS0213_ORDER_REPORT {
    // SERVICE: TBL_KSV_ORDER_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQueryTBL_KSV_ORDER_MST_CODE(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query STYLE_CD {
                        mgrQuery_S0213_ORDER_REPORT_CODE {
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
                            FACTORY_CD {
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
                            MATL_UPDATE
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0213_ORDER_REPORT_CODE:" +
                    data.mgrQuery_S0213_ORDER_REPORT_CODE.BUYER_CD.length,
            );
            return data.mgrQuery_S0213_ORDER_REPORT_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MST(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            ORDER_CD
                            STYLE_NAME
                            DUE_DATE
                            TOT_CNT
                            SHIP_DATE
                            SHIP_CNT
                            AVR_PRICE
                            ORDER_AMT
                            MATL_AMT
                            BVT_LOCAL
                            FC_AMT
                            ETC_AMT
                            COMM_AMT
                            TOT_AMT
                            TOT_PRICE
                            DIFF
                            RATE
                            SHIP_TOT
                            SHIP_RATE
                            FACTORY
                            BUYER
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "marQuery_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST.length,
            );
            return data.mgrQuery_S0213_ORDER_REPORT_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_ORDER_STATUS(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_EXCEL_ORDER_STATUS(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_EXCEL_ORDER_STATUS(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_EXCEL_ORDER_STATUS;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_EXCEL_REPORT2(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_EXCEL_REPORT2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_EXCEL_REPORT2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT4(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_EXCEL_REPORT4(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_EXCEL_REPORT4(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_EXCEL_REPORT4;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT8(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_EXCEL_REPORT8(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_EXCEL_REPORT8(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_EXCEL_REPORT8;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT9(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_EXCEL_REPORT9(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_EXCEL_REPORT9(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_EXCEL_REPORT9;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT10(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_EXCEL_REPORT10(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_EXCEL_REPORT10(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_EXCEL_REPORT10;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_UPDATE_MATLAMT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_UPDATE_MATLAMT(
                        $data: I_S0213_ORDER_REPORT_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0213_UPDATE_MATLAMT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_UPDATE_MATLAMT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_STYLE_BY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_QRY_STYLE_BY_BUYER(
                        $data: I_S0213_QRY_STYLE!
                    ) {
                        mgrQuery_S0213_QRY_STYLE_BY_BUYER(data: $data) {
                            STYLE_CD
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_QRY_STYLE_BY_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_STYLE_BY_NAME(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0213_QRY_STYLE_BY_NAME(
                        $data: I_S0213_QRY_STYLE!
                    ) {
                        mgrQuery_S0213_QRY_STYLE_BY_NAME(data: $data) {
                            STYLE_CD
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0213_QRY_STYLE_BY_NAME;
        } catch (e) {
            return e;
        }
    }
}
