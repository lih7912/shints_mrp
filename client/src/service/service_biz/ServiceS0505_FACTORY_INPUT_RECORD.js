/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0505_FACTORY_INPUT_RECORD {
    // SERVICE: TBL_KSV_STOCK_FACIN
    async mgrInsert_INSERT_FACIN(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0505_5($datas: [I_S0505_5!]!) {
                        mgrInsert_S0505_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0505_5;
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
                    query MgrQueryS0505_CODE($data: I_S0505_1!) {
                        mgrQueryS0505_CODE(data: $data) {
                            DELIVERY {
                                PO_CD
                                IN_DATE
                                MATL_CD
                                IN_QTY
                                ERR_QTY
                                DELIVERY
                                LOCATION
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                id
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            MATL_UNIT {
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
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0505_CODE;
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
                    query MgrQueryS0505_2($data: I_S0505_2!) {
                        mgrQueryS0505_2(data: $data) {
                            DATA1 {
                                VENDOR_NAME
                                PR_NUM
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                CURR_CD
                                MATL_PRICE
                                TOT_CNT
                                ORD_CNT
                                STOCK_QTY
                                REMARK
                                REMARK_BVT
                                VENDOR_TYPE
                                PAY_TERM
                                INPUT
                                STS_OUT_QTY
                            }
                            DATA2 {
                                DELIVERY
                                IN_DATE
                                MATL_CD
                                ETC_TYPE
                                IN_QTY
                            }
                            DATA3 {
                                DELIVERY
                                IN_DATE
                                MATL_CD
                                ETC_TYPE
                                IN_QTY
                            }
                            DATA4 {
                                DELIVERY
                                IN_DATE
                                MATL_CD
                                ETC_TYPE
                                IN_QTY
                            }
                            DATA5 {
                                DELIVERY
                                IN_DATE
                                MATL_CD
                                ETC_TYPE
                                IN_QTY
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0505_2;
        } catch (e) {
            return e;
        }
    }
}
