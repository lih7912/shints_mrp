/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0604_IMPORT_CHARGE_RECORD {
    // SERVICE: TBL_KSV_INVOICE_MST
    async mgrInsert_INSERT_IMPCHARGE(argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0604_5($datas1: I_S0604_5_1!) {
                        mgrInsert_S0604_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0604_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_IMPCHARGE(argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0604_5($datas1: I_S0604_5_1!) {
                        mgrUpdate_S0604_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrUpdate_S0604_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_IMPCHARGE(argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0604_5($datas1: I_S0604_5_1!) {
                        mgrDelete_S0604_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrDelete_S0604_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0604_CODE($data: I_S0604_1!) {
                        mgrQueryS0604_CODE(data: $data) {
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
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
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
            return data.mgrQueryS0604_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0604_2($data: I_S0604_2!) {
                        mgrQueryS0604_2(data: $data) {
                            DATA1 {
                                DELIVERY_TYPE
                                SHIP_DATE
                                TOT_AMT
                                ORD_AMT
                                ADJ_AMT
                                BUYER_CD
                                CURR_CD
                                REMARK
                                EXT_INVOICE
                                CUSTOMS
                                VAT
                                FREIGHT
                                CLEARANCE
                            }
                            DATA2 {
                                BUYER_CD
                                PO_CD
                                ORDER_CD
                                STYLE_NAME
                                SHIP_QTY
                                SHIP_PRICE
                                SHIP_AMT
                                TOT_AMT
                                FACTORY_NAME
                                INVOICE_NO
                                SEQ
                                SHIP_DATE
                                SHIP_PTYPE
                                NAT_CD
                                DELIVERY_TYPE
                                IMPORT_ORG
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0604_2;
        } catch (e) {
            return e;
        }
    }
}
