/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0801_DOCU_REGIST_DOMESTIC {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_DOCU_REGIST(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0801_5_INSERT_DOCU(
                        $datas: [I_S0801_5!]!
                        $datas1: [I_S0801_5_1!]!
                    ) {
                        mgrInsert_S0801_5_INSERT_DOCU(
                            datas: $datas
                            datas1: $datas1
                        ) {
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
            return data.mgrInsert_S0801_5_INSERT_DOCU;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DOCU_DELETE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0801_5_DELETE_DOCU(
                        $datas: [I_S0801_5!]!
                        $datas1: [I_S0801_5_1!]!
                    ) {
                        mgrInsert_S0801_5_DELETE_DOCU(
                            datas: $datas
                            datas1: $datas1
                        ) {
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
            return data.mgrInsert_S0801_5_DELETE_DOCU;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_PROC_FOC(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0801_5_PROC_FOC(
                        $datas: [I_S0801_5!]!
                        $datas1: [I_S0801_5_1!]!
                    ) {
                        mgrInsert_S0801_5_PROC_FOC(
                            datas: $datas
                            datas1: $datas1
                        ) {
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
            return data.mgrInsert_S0801_5_PROC_FOC;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_TAXBILL(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0801_5_DELETE_TAXBILL(
                        $datas: [I_S0801_5_DELETE_TAXBILL!]!
                    ) {
                        mgrInsert_S0801_5_DELETE_TAXBILL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0801_5_DELETE_TAXBILL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0801_CODE($data: I_S0801_1!) {
                        mgrQueryS0801_CODE(data: $data) {
                            STATUS_CD {
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
                            USER {
                                USER_ID
                                USER_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0801_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0801_2($data: I_S0801_2!) {
                        mgrQueryS0801_2(data: $data) {
                            STATUS_NAME
                            TAX_CD
                            REG_DATE
                            BILL_DATE
                            PAY_DUE_DATE
                            BILL_USER
                            BUYER_CD
                            NEOE_CD_N
                            BUYER_PAY_DUE_DATE
                            NEOE_CD
                            NEOE_BUYER_CD
                            NEOE_BUYER_CD_MOM
                            KRW_PAY_AMOUNT
                            KRW_TAX_AMOUNT
                            KRW_TOT_AMOUNT
                            DOCU_NO
                            ACC_USER
                            ACC_USER_NAME
                            ORDER_USER_ID
                            ORDER_USER_NAME
                            BUYER_EMAIL
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0801_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0801_3($data: I_S0801_3!) {
                        mgrQueryS0801_3(data: $data) {
                            SHIP_DATE
                            INVOICE_NO
                            BUYER_NAME
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            SHIP_QTY
                            PAY_QTY
                            CURR_CD
                            PRICE
                            PAY_AMT
                            KRW_SHIP_AMOUNT
                            KRW_TAX_AMOUNT
                            KRW_TOT_AMOUNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0801_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0801_4($data: I_S0801_4!) {
                        mgrQueryS0801_4(data: $data) {
                            ORDER_CD
                            PROD_CD
                            COLOR
                            PRICE
                            TOT_CNT
                            ORDER_SIZE_CNT
                            SHIP_CNT
                            SHIP_SIZE_CNT
                            SIZE_GROUP
                            SIZE_MEMBER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0801_4;
        } catch (e) {
            return e;
        }
    }
}
