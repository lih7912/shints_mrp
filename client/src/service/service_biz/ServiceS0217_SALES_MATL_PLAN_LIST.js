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

export class ServiceS0217_SALES_MATL_PLAN_LIST {
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
                    query MgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE {
                        mgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE {
                            S_DATE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            E_DATE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
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
                            USER {
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
                            TEAM {
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
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "mgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE:" +
                    data.mgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE.TEAM.length,
            );
            return data.mgrQuery_S0217_SALES_MATL_PLAN_LIST_CODE;
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
                    query MgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST(
                        $data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            USER_ID
                            USER_NAME
                            BUYER_CD
                            BUYER_NAME
                            COLLECTION
                            CURR_CD
                            TOTAL_QTY
                            TOTAL_AMT
                            LINE_SUM {
                                LINE_TYPE
                                LINE_QTY
                                LINE_AMT
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PRINT(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0217_EXCEL_PRINT(
                        $data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0217_EXCEL_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0217_EXCEL_PRINT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PRINT_QUTER(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0217_EXCEL_PRINT_QUTER(
                        $data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0217_EXCEL_PRINT_QUTER(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0217_EXCEL_PRINT_QUTER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PRINT_TOT(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0217_EXCEL_PRINT_TOT(
                        $data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0217_EXCEL_PRINT_TOT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0217_EXCEL_PRINT_TOT;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST1

    async mgrQueryTBL_KSV_ORDER_MST1(argQRY_KSV_ORDER_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1(
                        $data: I_S0217_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1(
                            data: $data
                        ) {
                            COLLECTION
                            CURR_CD
                            YYMM_SUM {
                                YYMM
                                YYMM_QTY
                                YYMM_AMT
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST1,
                },
            });
            console.log(
                "marQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1:" +
                    data.mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1
                        .length,
            );
            return data.mgrQuery_S0217_SALES_MATL_PLAN_LIST_TBL_KSV_ORDER_MST1;
        } catch (e) {
            return e;
        }
    }
}
