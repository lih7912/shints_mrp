/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0501_FACTORY_IO_MAIN {
    // SERVICE: EDT_KSV_FACTORY_IN1
    async mgrInsertEDT_KSV_FACTORY_IN1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0501_FACTORY_IO_MAIN_EDT_KSV_FACTORY_IN1(
                        $datas: [I_S0501_FACTORY_IO_MAIN_EDT_KSV_FACTORY_IN1!]!
                    ) {
                        mgrInsert_S0501_FACTORY_IO_MAIN_EDT_KSV_FACTORY_IN1(
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
            return data.mgrInsert_S0501_FACTORY_IO_MAIN_EDT_KSV_FACTORY_IN1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_FACTORY_IN

    async mgrQuery_CODE(argQRY_KSV_FACTORY_IN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0501_CODE($data: I_S0501_1!) {
                        mgrQueryS0501_CODE(data: $data) {
                            ETC {
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
                            MATL_UNIT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_CD
                                SEQ
                                PO_TYPE
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_FACTORY_IN,
                },
            });
            return data.mgrQueryS0501_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_FACTORY_IN1

    async mgrQuery_PO_INFO(argQRY_KSV_FACTORY_IN1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0501_2_2($data: I_S0501_2_2!) {
                        mgrQueryS0501_2_2(data: $data) {
                            DATA1 {
                                VENDOR_NAME
                                PR_NUM
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                MATL_PRICE
                                CURR_CD
                                TOT_CNT
                                ORD_CNT
                                REMARK
                                REMARK_BVT
                                VENDOR_TYPE
                                PAY_TERM
                                DATE_INFO
                            }
                            DATA2 {
                                OUT_FROM
                                PR_NUM
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                MATL_PRICE
                                CURR_CD
                                OUT_QTY
                                OUT_QTY_2
                                REMARK
                                COL1
                                COL2
                                COL3
                            }
                            FACETC {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            FACIN {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            FACOUT {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            LEFT_OVER_WAIT {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            ORDER {
                                ORDER_CD
                                TOT_CNT
                            }
                            STOCK_MOVE {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            STOCK_USE {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            STS_IN {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            STS_OUT {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                            STS_OUT_STOCK {
                                MATL_CD
                                TOT_QTY
                                STOCK_QTY
                                LEFT_OVER
                                ORDER_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_FACTORY_IN1,
                },
            });
            return data.mgrQueryS0501_2_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_MATL_INFO(argQRY_KSV_FACTORY_IN1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0501_2_2_1($data: I_S0501_2_2_1!) {
                        mgrQueryS0501_2_2_1(data: $data) {
                            COL_1
                            COL_2
                            COL_3
                            COL_4
                            COL_5
                            COL_6
                            COL_7
                            COL_8
                            COL_9
                            COL_10
                            COL_11
                            COL_12
                            COL_13
                            COL_14
                            COL_15
                            COL_16
                            COL_17
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_FACTORY_IN1,
                },
            });
            return data.mgrQueryS0501_2_2_1;
        } catch (e) {
            return e;
        }
    }
}
