/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS051201_STOCK_QTY_UPDATE_LOG {
    // SERVICE: EDT_KSV_STOCK_MATL1
    async mgrInsertEDT_KSV_STOCK_MATL1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S051201_STOCK_QTY_UPDATE_LOG_EDT_KSV_STOCK_MATL1(
                        $datas: [I_S051201_STOCK_QTY_UPDATE_LOG_EDT_KSV_STOCK_MATL1!]!
                    ) {
                        mgrInsert_S051201_STOCK_QTY_UPDATE_LOG_EDT_KSV_STOCK_MATL1(
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
            return data.mgrInsert_S051201_STOCK_QTY_UPDATE_LOG_EDT_KSV_STOCK_MATL1;
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
                    query MgrQueryS051201_CODE($data: I_S051201_1!) {
                        mgrQueryS051201_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PO_CD {
                                PO_CD
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
            return data.mgrQueryS051201_CODE;
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
                    query MgrQueryS051201_2($data: I_S051201_2!) {
                        mgrQueryS051201_2(data: $data) {
                            SUM_INFO {
                                SUM_STOCK_QTY
                                SUM_REMAIN_QTY
                                SUM_USE_QTY
                                SUM_OUT_QTY
                            }
                            DATA {
                                STOCK_IDX
                                ORG_STOCK_IDX
                                PO_CD
                                ORDER_CD
                                MATL_CD
                                STOCK_DATE
                                REG_DATE
                                STOCK_STATUS_N
                                STOCK_QTY
                                REMAIN_QTY
                                USE_QTY
                                OUT_QTY
                                REG_USER
                                REMARK
                                USE_PO
                                USE_PO_SEQ
                                USE_ORDER
                                USE_POQTY
                                USE_DATETIME
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL,
                },
            });
            return data.mgrQueryS051201_2;
        } catch (e) {
            return e;
        }
    }
}
