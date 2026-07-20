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

export class ServiceS0216_SALES_MATL_PLAN_QRY {
    // SERVICE: TBL_KSV_ORDER_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    ///
    async mgrQuery_EXCEL_PRINT(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0216_EXCEL_PRINT(
                        $data: I_S0216_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0216_EXCEL_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0216_EXCEL_PRINT;
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
                    query MgrQuery_S0216_EXCEL_PRINT_TOT(
                        $data: I_S0216_SALES_MATL_PLAN_LIST_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0216_EXCEL_PRINT_TOT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0216_EXCEL_PRINT_TOT;
        } catch (e) {
            return e;
        }
    }

    ///

    async mgrInsert_INSERT(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0216_INSERT(
                        $datas: I_S0216_INSERT_1!
                        $datas1: [I_S0216_INSERT_2!]!
                    ) {
                        mgrInsert_S0216_INSERT(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                },
            });
            return data.mgrInsert_S0216_INSERT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0216_DELETE(
                        $datas: I_S0216_INSERT_1!
                        $datas1: [I_S0216_INSERT_2!]!
                    ) {
                        mgrInsert_S0216_DELETE(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                },
            });
            return data.mgrInsert_S0216_DELETE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_COPY_YEAR(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0216_COPY_YEAR(
                        $datas: I_S0216_INSERT_1!
                        $datas1: [I_S0216_INSERT_2!]!
                    ) {
                        mgrInsert_S0216_COPY_YEAR(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                },
            });
            return data.mgrInsert_S0216_COPY_YEAR;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_RECALC(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0216_RECALC($datas: I_S0216_INSERT_1!) {
                        mgrInsert_S0216_RECALC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0216_RECALC;
        } catch (e) {
            return e;
        }
    }

    ///

    async mgrQueryTBL_KSV_ORDER_MST_CODE(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query BUYER_CD {
                        mgrQuery_S0216_CODE {
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
                            COLLECTION {
                                COLLECTION
                                COLLECTION_N
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            LINE_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            YY {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            MM {
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
            return data.mgrQuery_S0216_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MST(
                        $data: I_S0216_SALES_MATL_PLAN_QRY_QRY_KSV_ORDER_PLAN!
                    ) {
                        mgrQuery_S0216_LIST1(
                            data: $data
                        ) {
                            LINE_TYPE
                            LINE_TYPE_N
                            YYMM
                            PLAN_QTY
                            PLAN_PRICE
                            PLAN_AMT
                            CM_PRICE
                            CM_AMT
                            CURR_CD
                            USER_ID
                            ORDER_QTY
                            ORDER_AMT
                            CURR_CM_AMT
                            OLD_ORDER_QTY
                            OLD_ORDER_AMT
                            OLD_CM_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQuery_S0216_LIST1;
        } catch (e) {
            return e;
        }
    }
}
