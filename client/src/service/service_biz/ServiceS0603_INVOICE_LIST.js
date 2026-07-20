/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0603_INVOICE_LIST {
    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0603_CODE($data: I_S0603_1!) {
                        mgrQueryS0603_CODE(data: $data) {
                            DELIVERY_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            NAT_CD {
                                NAT_CD
                                NAT_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            CURR_CD {
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
                            PAYMENT_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TRADE_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TRADE_TYPE2 {
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
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0603_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0603_2($data: I_S0603_2!) {
                        mgrQueryS0603_2(data: $data) {
                            INVOICE_NO
                            EXT_INVOICE
                            SHIP_DATE
                            DUE_DATE
                            TRANSFER_DATE
                            CURR_CD
                            TOT_AMT
                            ADJ_AMT
                            IN_AMT
                            OA_NEGO
                            REST_AMT
                            REMARK
                            DELIVERY_TYPE_N
                            BUYER_CD
                            BUYER_NAME
                            DOCU_NO
                            NEOE_BUYER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0603_2;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST2

    async mgrQuery_LIST_2(argQRY_KSV_INVOICE_MST2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0603_3($data: I_S0603_3!) {
                        mgrQueryS0603_3(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            STYLE_NAME
                            SHIP_QTY
                            SHIP_PRICE
                            TOT_AMT
                            BUYER_CD
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST2,
                },
            });
            return data.mgrQueryS0603_3;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST3

    async mgrQuery_LIST_3(argQRY_KSV_INVOICE_MST3) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0603_4($data: I_S0603_4!) {
                        mgrQueryS0603_4(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            SHIP_CNT
                            SHIP_PTYPE_N
                            DELIVERY_TYPE_N
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST3,
                },
            });
            return data.mgrQueryS0603_4;
        } catch (e) {
            return e;
        }
    }
}
