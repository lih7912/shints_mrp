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

export class ServiceS0709_MANAGE_INVOICE_AMT {
    // SERVICE: EDT_KSV_INVOICE_MST
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_INSERT_BILL(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0709_5_INSERT_BILL(
                        $datas: I_S0709_5_REF!
                        $datas1: [I_S0709_5_LIST2!]!
                    ) {
                        mgrInsert_S0709_5_INSERT_BILL(
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
            return data.mgrInsert_S0709_5_INSERT_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_DC(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0709_5_INSERT_DC(
                        $datas: I_S0709_5_REF!
                        $datas1: [I_S0709_5_LIST3!]!
                    ) {
                        mgrInsert_S0709_5_INSERT_DC(
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
            return data.mgrInsert_S0709_5_INSERT_DC;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELTE_BILL(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0709_5_DELETE_BILL(
                        $datas1: [I_S0709_5_LIST4!]!
                    ) {
                        mgrInsert_S0709_5_DELETE_BILL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0709_5_DELETE_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELTE_DC(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0709_5_DELETE_DC(
                        $datas1: [I_S0709_5_LIST4!]!
                    ) {
                        mgrInsert_S0709_5_DELETE_DC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0709_5_DELETE_DC;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0709_CODE($data: I_S0709_1!) {
                        mgrQueryS0709_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            BANK_CD {
                                BANK_CD
                                BANK_NAME
                            }
                            BILL_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0709_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0709_LIST_1($data: I_S0709_LIST_1!) {
                        mgrQueryS0709_LIST_1(data: $data) {
                            BUYER_CD
                            CURR_CD
                            OVER_DATE
                            ONE_WEEK
                            TWO_WEEK
                            TWO_WEEK_AFTER
                            TOTAL
                            TOTAL_DATE
                            INTEREST
                            DEBIT
                            CREDIT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0709_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0709_LIST_2($data: I_S0709_LIST_2!) {
                        mgrQueryS0709_LIST_2(data: $data) {
                            BUYER_CD
                            INVOICE_NO
                            CURR_CD
                            BALANCE
                            SHIP_DATE
                            DUE_DATE
                            OVER_DATE
                            INTEREST
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0709_LIST_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0709_LIST_3($data: I_S0709_LIST_3!) {
                        mgrQueryS0709_LIST_3(data: $data) {
                            BUYER_CD
                            INVOICE_NO
                            CURR_CD
                            BALANCE
                            REG_DATE
                            END_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0709_LIST_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0709_LIST_4($data: I_S0709_LIST_4!) {
                        mgrQueryS0709_LIST_4(data: $data) {
                            BILL_DATE
                            BILL_AMT
                            INVOICE_NO
                            CURRENCY_RATE
                            REF_NO
                            BILL_AMT_ORG
                            END_DATE
                            BUYER_CD
                            PRE_FLAG
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0709_LIST_4;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_5(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0709_LIST_5($data: I_S0709_LIST_5!) {
                        mgrQueryS0709_LIST_5(data: $data) {
                            CREDIT_CD
                            CREDIT_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0709_LIST_5;
        } catch (e) {
            return e;
        }
    }
}
