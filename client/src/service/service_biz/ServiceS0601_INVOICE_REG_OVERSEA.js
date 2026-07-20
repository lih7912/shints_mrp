/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0601_INVOICE_REG_OVERSEA {
    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsert_INSERT_INVOICE(argData1, argData2, argData3, argData4) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0601_5(
                        $datas1: I_S0601_5_1!
                        $datas2: I_S0601_5_2!
                        $datas3: I_S0601_5_3!
                        $datas4: [I_S0601_5_4!]!
                    ) {
                        mgrInsert_S0601_5(
                            datas1: $datas1
                            datas2: $datas2
                            datas3: $datas3
                            datas4: $datas4
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                    datas2: argData2,
                    datas3: argData3,
                    datas4: argData4,
                },
            });
            return data.mgrInsert_S0601_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_INVOICE(argData1, argData2, argData3, argData4) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0601_5(
                        $datas1: I_S0601_5_1!
                        $datas2: I_S0601_5_2!
                        $datas3: I_S0601_5_3!
                        $datas4: [I_S0601_5_4!]!
                    ) {
                        mgrUpdate_S0601_5(
                            datas1: $datas1
                            datas2: $datas2
                            datas3: $datas3
                            datas4: $datas4
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                    datas2: argData2,
                    datas3: argData3,
                    datas4: argData4,
                },
            });
            return data.mgrUpdate_S0601_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_INVOICE(argData1, argData2, argData3, argData4) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0601_5(
                        $datas1: I_S0601_5_1!
                        $datas2: I_S0601_5_2!
                        $datas3: I_S0601_5_3!
                        $datas4: [I_S0601_5_4!]!
                    ) {
                        mgrDelete_S0601_5(
                            datas1: $datas1
                            datas2: $datas2
                            datas3: $datas3
                            datas4: $datas4
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                    datas2: argData2,
                    datas3: argData3,
                    datas4: argData4,
                },
            });
            return data.mgrDelete_S0601_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_CRDB(argData1, argData2, argData3, argData4) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0601_5_1(
                        $datas1: I_S0601_5_1!
                        $datas2: I_S0601_5_2!
                        $datas3: I_S0601_5_3!
                        $datas4: [I_S0601_5_4!]!
                    ) {
                        mgrInsert_S0601_5_1(
                            datas1: $datas1
                            datas2: $datas2
                            datas3: $datas3
                            datas4: $datas4
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                    datas2: argData2,
                    datas3: argData3,
                    datas4: argData4,
                },
            });
            return data.mgrInsert_S0601_5_1;
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
                    query MgrQueryS0601_CODE($data: I_S0601_1!) {
                        mgrQueryS0601_CODE(data: $data) {
                            DELIVERY_TYPE {
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
                            INVOICE_NO {
                                INVOICE_NO
                                SHIP_DATE
                            }
                            EXT_INVOICE {
                                EXT_INVOICE
                            }
                            LICENSE_NO {
                                LICENSE_NO
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0601_CODE;
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
                    query MgrQueryS0601_2($data: I_S0601_2!) {
                        mgrQueryS0601_2(data: $data) {
                            DATA1 {
                                INVOICE_NO
                                DELIVERY_TYPE
                                SHIP_DATE
                                TOT_AMT
                                ORD_AMT
                                ADJ_AMT
                                BUYER_CD
                                CURR_CD
                                REMARK
                                EXT_INVOICE
                                DOCU_NO
                                FACTORY_CD
                                PAYMENT_TYPE
                                TRADE_TYPE
                                DUE_DATE
                                TRANSFER_DATE
                                MANAGE_AMT
                                ETC_AMT
                                LICENSE_DATE
                                LICENSE_NO
                                TRADE_TYPE2
                                VOS_AMT
                                VAT_AMT
                                VAT_DATE
                                BILL_AMT
                                BILL_TYPE
                                CRDB_CD
                                NEOE_BUYER_CD
                                NEOE_A23
                                BL_NO
                            }
                            DATA2 {
                                BUYER_CD
                                PO_CD
                                ORDER_CD
                                STYLE_NAME
                                SHIP_QTY
                                ORD_PRICE
                                SALES_PRICE
                                SHIP_PRICE
                                DIFF_PRICE
                                TOT_AMT
                                COL1
                                FACTORY_NAME
                                INVOICE_NO
                                SEQ
                                EXFACTORY
                                SHIP_DATE
                                SHIP_PTYPE
                                NAT_CD
                                DELIVERY_TYPE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0601_2;
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
                    query MgrQueryS0601_3($data: I_S0601_3!) {
                        mgrQueryS0601_3(data: $data) {
                            ORDER_CD
                            BUYER_CD
                            NAT_NAME
                            INVOICE_NO
                            PO_CD
                            STYLE_NAME
                            SHIP_PTYPE_N
                            DELIVERY_TYPE_N
                            SHIP_CNT
                            AVR_PRICE
                            FACTORY_NAME
                            FACTORY_CD
                            NAT_CD
                            DELIVERY_TYPE
                            SHIP_PTYPE
                            SHIP_DATE
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0601_3;
        } catch (e) {
            return e;
        }
    }
}
