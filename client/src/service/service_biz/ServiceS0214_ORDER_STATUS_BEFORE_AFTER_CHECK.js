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

export class ServiceS0214_ORDER_STATUS_BEFORE_AFTER_CHECK {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_END(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0214_5_END($datas: [I_S0214_5!]!) {
                        mgrUpdate_S0214_5_END(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0214_5_END;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MST_CODE(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE {
                        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE {
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
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE:" +
                    data.mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE
                        .BUYER_CD.length,
            );
            return data.mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_CODE;
        } catch (e) {
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
                    query QmgrQueryTBL_KSV_ORDER_MST(
                        $data: I_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            filename
                            FILE_NAME
                            FILE_URL
                            datas {
                                ORDER_CD
                                STATUS
                                STYLE_NAME
                                TOT_CNT
                                SHIP_CNT
                                SHIP_DATE
                                USD_PRICE
                                ORD_AMT
                                COMM_AMT
                                MATL_AMT
                                MATL_PRICE
                                FC_PRICE
                                ETC_AMT
                                ETC_PRICE
                                TOT_AMT
                                TOT_PRICE
                                RATE
                                KIND
                                COMMISSION
                                FC_BEF
                                ORDER_STATUS_NAME
                                ORDER_STATUS
                                REMARK
                                FACTORY_CD
                                LINE_CHARGE_PRICE
                                END_DATETIME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQueryS0214_2($data: I_S0214_2!) {
                        mgrQueryS0214_2(data: $data) {
                            ORDER_CD
                            STATUS
                            STYLE_NAME
                            TOT_CNT
                            SHIP_CNT
                            SHIP_DATE
                            USD_PRICE
                            MATL_AMT
                            FC_PRICE
                            ETC_AMT
                            COMMISSION
                            FC_BEF
                            ORDER_STATUS_NAME
                            ORDER_STATUS
                            REMARK
                            FACTORY_CD
                            LINE_CHARGE_PRICE
                            END_DATETIME
                            DW_BEF_COST
                            MAX_SHIP_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQueryS0214_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT5(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQuery_S0214_EXCEL_REPORT5(
                        $data: I_S0214_ORDER_STATUS_BEFORE_AFTER_CHECK_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0214_EXCEL_REPORT5(data: $data) {
                            id
                            CODE
                            FILE_NAME
                            URL
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0214_EXCEL_REPORT5;
        } catch (e) {
            return e;
        }
    }
}
