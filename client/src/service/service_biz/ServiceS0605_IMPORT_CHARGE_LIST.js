/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0605_IMPORT_CHARGE_LIST {
    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0605_CODE($data: I_S0605_1!) {
                        mgrQueryS0605_CODE(data: $data) {
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
                                BUYER_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
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
            return data.mgrQueryS0605_CODE;
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
                    query MgrQueryS0605_2($data: I_S0605_2!) {
                        mgrQueryS0605_2(data: $data) {
                            INVOICE_NO
                            SHIP_DATE
                            CURR_CD
                            ORD_AMT
                            TOT_AMT
                            CUSTOMS
                            VAT
                            FREIGHT
                            CLEARANCE
                            REMARK
                            CD_NAME
                            BUYER_CD
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0605_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0605_3($data: I_S0605_3!) {
                        mgrQueryS0605_3(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            STYLE_NAME
                            SHIP_QTY
                            SHIP_PRICE
                            TOT_AMT
                            BUYER_CD
                            PO_CD
                            ETC_CHARGE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0605_3;
        } catch (e) {
            return e;
        }
    }
}
