/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0507_FACTORY_OUTPUT_RECORD {
    // SERVICE: TBL_KSV_STOCK_FACIN
    async mgrInsert_INSERT_FACOUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0507_5($datas: [I_S0507_5!]!) {
                        mgrInsert_S0507_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0507_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0507_CODE($data: I_S0507_1!) {
                        mgrQueryS0507_CODE(data: $data) {
                            MATL_UNIT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            ORDER_CD {
                                ORDER_CD
                                id
                            }
                            OUT_DATE {
                                PO_CD
                                OUT_DATE
                                ORDER_CD
                                MATL_CD
                                OUT_QTY
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                remark
                                id
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0507_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0507_2($data: I_S0507_2!) {
                        mgrQueryS0507_2(data: $data) {
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
                                OUT_QTY
                                STOCK_MOVE_QTY
                                PO_QTY
                                ETC_ERROR
                                ETC_SHORTAGE
                                ETC_OTHERS
                                ETC_GUBUN
                                FACOUT_VAL
                                INPUT
                                FAC_IN_QTY
                                FAC_OUT_QTY
                                FAC_ORDER_OUT_QTY
                            }
                            ORDER_OUT_QTY {
                                OUT_DATE
                                ORDER_CD
                                MATL_CD
                                OUT_QTY
                                ETC_TYPE
                            }
                            OUT_DATE_INFO {
                                OUT_DATE
                                ORDER_CD
                                MATL_CD
                                OUT_QTY
                                ETC_TYPE
                            }
                            OUT_QTY {
                                OUT_DATE
                                ORDER_CD
                                MATL_CD
                                OUT_QTY
                                ETC_TYPE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0507_2;
        } catch (e) {
            return e;
        }
    }
}
