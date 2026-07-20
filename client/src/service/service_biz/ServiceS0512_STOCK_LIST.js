/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0512_STOCK_LIST {
    // SERVICE: EDT_KSV_STOCK_MATL1
    async mgrInsertEDT_KSV_STOCK_MATL1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0512_STOCK_LIST_EDT_KSV_STOCK_MATL1(
                        $datas: [I_S0512_STOCK_LIST_EDT_KSV_STOCK_MATL1!]!
                    ) {
                        mgrInsert_S0512_STOCK_LIST_EDT_KSV_STOCK_MATL1(
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
            return data.mgrInsert_S0512_STOCK_LIST_EDT_KSV_STOCK_MATL1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_MATL

    async mgrQuery_CODE(argQRY_KSV_STOCK_MATL) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0512_CODE($data: I_S0512_1!) {
                        mgrQueryS0512_CODE(data: $data) {
                            MATL_TYPE2 {
                                SEQ
                                MATL_TYPE2
                                BVT_MATL_NAME
                                id
                            }
                            FACTORY_WARE {
                                FACTORY_CD
                                WARE_NAME
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            PO_CD {
                                PO_CD
                                PO_TYPE
                            }
                            STOCK_STATUS_S {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            REASON_REMARK {
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
                    data: argQRY_KSV_STOCK_MATL,
                },
            });
            return data.mgrQueryS0512_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_MATL) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0512_2($data: I_S0512_2!) {
                        mgrQueryS0512_2(data: $data) {
                            MATL_TYPE2
                            FACTORY_NAME
                            STOCK_DATE
                            REG_DATE
                            PO_CD
                            ORDER_CD
                            BUYER_NAME
                            VENDOR_NAME
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            STOCK_STATUS
                            TOTAL_QTY
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            OUT_QTY
                            RACK
                            LOCATION
                            WARE_NAME
                            WARE_DATE
                            WARE_QTY
                            PO_SEQ
                            MRP_SEQ
                            STOCK_IDX
                            ORG_STOCK_IDX
                            ROOT_IDX
                            REMARK
                            EXP_DATE
                            FACTORY_CD
                            MATL_SEQ
                            REASON_REMARK_N
                            PLAN_REMARK
                            MATL_PRICE
                            CURR_CD
                            DEBIT_CD
                            REMARK0
                            REASON_REMARK
                            SL_N
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL,
                },
            });
            return data.mgrQueryS0512_2;
        } catch (e) {
            return e;
        }
    }
}
