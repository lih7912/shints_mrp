/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0511_STOCK_RECORD {
    // SERVICE: EDT_KSV_STOCK_MATL

    async mgrInsert_MOVE_STOCK(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0511_5($datas: [I_S0511_5!]!) {
                        mgrInsert_S0511_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0511_5;
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
                    query MgrQueryS0511_CODE($data: I_S0511_1!) {
                        mgrQueryS0511_CODE(data: $data) {
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            STOCK_STATUS_S {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            STOCK_REMARK {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_CD
                                PO_TYPE
                            }
                            ORDER_CD {
                                ORDER_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL,
                },
            });
            return data.mgrQueryS0511_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_MATL1
    async mgrQuery_LIST_STOCK(argQRY_KSV_STOCK_MATL1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0511_3($data: I_S0511_3!) {
                        mgrQueryS0511_3(data: $data) {
                            MATL_CD
                            ORDER_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            STOCK_QTY
                            REMAIN_QTY
                            STOCK_STATUS
                            RACK
                            LOCATION
                            REASON_REMARK
                            REMARK
                            REMARK0
                            VENDOR_NAME
                            MATL_SEQ
                            STOCK_IDX
                            ROOT_IDX
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL1,
                },
            });
            return data.mgrQueryS0511_3;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_MATL2

    async mgrQuery_LIST_MATL(argQRY_KSV_STOCK_MATL2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0511_2_2($data: I_S0511_2_2!) {
                        mgrQueryS0511_2_2(data: $data) {
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            STOCK_QTY
                            RACK
                            LOCATION
                            REASON_PLAN
                            REMARK
                            VENDOR_NAME
                            MATL_SEQ
                            STATUS_CD
                            VENDOR_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL2,
                },
            });
            return data.mgrQueryS0511_2_2;
        } catch (e) {
            return e;
        }
    }
}
