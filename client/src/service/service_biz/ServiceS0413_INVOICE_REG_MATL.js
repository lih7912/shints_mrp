/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0413_INVOICE_REG_MATL {
    async mgrInsert_INSERT_INVOICE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0413_5(
                        $datas: I_S0413_5!
                        $datas1: [I_S0413_5_1!]!
                    ) {
                        mgrInsert_S0413_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0413_5;
        } catch (e) {
            return e;
        }
    }

    //

    async mgrQuery_CODE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0413_CODE($data: I_S0413_1!) {
                        mgrQueryS0413_CODE(data: $data) {
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            INVOICE {
                                INVOICE_NO
                                OUT_DATE
                            }
                            NEOE_KIND {
                                LN_PARTNER
                                CD_PARTNER
                            }
                            PACK_CD {
                                PACK_CD
                            }
                            PAYMENT_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TRADE_KIND {
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
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS0413_CODE:" + data.mgrQueryS0413_CODE.length);
            return data.mgrQueryS0413_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_INVOICE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0413_1($data: I_S0413_1!) {
                        mgrQueryS0413_1(data: $data) {
                            INVOICE {
                                PACK_CD
                                OUT_DATE
                                DELIVERY_AMT
                                DELIVERY_WON
                                CURR_DATE
                                USD_RATE
                                DOCU_NO
                                PAYMENT_TYPE
                                TRADE_TYPE
                                CURR_CD
                                TRADE_KIND
                                LICENSE_NO
                                LICENSE_DATE
                            }
                            INVOICE_1 {
                                DELIVERY_TYPE_N
                                FACTORY_NAME
                                DELIVERY_TYPE
                                OUT_FACTORY_CD
                            }
                            INVOICE_PO {
                                PACK_CD
                                PO_CD
                                PO_AMT
                                DELIVERY_AMT
                                DELIVERY_WON
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            return data.mgrQueryS0413_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_INVOICE_1(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0413_2_1($data: I_S0413_2_1!) {
                        mgrQueryS0413_2_1(data: $data) {
                            DELIVERY_TYPE_N
                            FACTORY_NAME
                            DELIVERY_TYPE
                            OUT_FACTORY_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS041202_2:" + data.mgrQueryS0413_2_1.length);
            return data.mgrQueryS0413_2_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_INVOICE_PO(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0413_3($data: I_S0413_3!) {
                        mgrQueryS0413_3(data: $data) {
                            PACK_CD
                            PO_CD
                            PO_AMT
                            DELIVERY_AMT
                            DELIVERY_WON
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS0413_3:" + data.mgrQueryS0413_3.length);
            return data.mgrQueryS0413_3;
        } catch (e) {
            return e;
        }
    }
}
