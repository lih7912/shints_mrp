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

export class ServiceS0708_MANAGE_BUYER_INPUT {
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
                    mutation MgrInsert_S0708_5_INSERT_BILL(
                        $datas: I_S0708_5_REF!
                        $datas1: [I_S0708_5_LIST2!]!
                    ) {
                        mgrInsert_S0708_5_INSERT_BILL(
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
            return data.mgrInsert_S0708_5_INSERT_BILL;
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
                    mutation MgrInsert_S0708_5_INSERT_DC(
                        $datas: I_S0708_5_REF!
                        $datas1: [I_S0708_5_LIST3!]!
                    ) {
                        mgrInsert_S0708_5_INSERT_DC(
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
            return data.mgrInsert_S0708_5_INSERT_DC;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_BILL(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0708_5_DELETE_BILL(
                        $datas: [I_S0708_5_LIST4!]!
                    ) {
                        mgrInsert_S0708_5_DELETE_BILL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0708_5_DELETE_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_CREDIT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0708_5_DELETE_CREDIT(
                        $datas: [I_S0708_5_LIST5!]!
                    ) {
                        mgrInsert_S0708_5_DELETE_CREDIT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0708_5_DELETE_CREDIT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_DC(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0708_5_DELETE_DC(
                        $datas: [I_S0708_5_LIST4!]!
                    ) {
                        mgrInsert_S0708_5_DELETE_DC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0708_5_DELETE_DC;
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
                    query MgrQueryS0708_CODE($data: I_S0708_1!) {
                        mgrQueryS0708_CODE(data: $data) {
                            CURR_CD {
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
                            INVOICE_CD {
                                INVOICE_NO
                                SHIP_DATE
                            }
                            BANK_CD {
                                BANK_CD
                                BANK_NAME
                            }
                            INVOICE_NEGO_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            END_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            PRE_TYPE {
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
            return data.mgrQueryS0708_CODE;
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
                    query MgrQueryS0708_LIST_1($data: I_S0708_LIST_1!) {
                        mgrQueryS0708_LIST_1(data: $data) {
                            REF_NO
                            BANK_NAME
                            BUYER_CD
                            BILL_DATE
                            CURR_CD
                            BILL_AMT
                            CHECK_AMT
                            BALANCE
                            END_FLAG
                            PRE_FLAG
                            END_FLAG_N
                            PRE_FLAG_N
                            TOT_AMT
                            CREDIT_AMT
                            CHARGE
                            BUYER_NAME
                            BANK_CD
                            MOM_CD
                            REG_DATETIME
                            REG_USER
                            REMARK
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0708_LIST_1;
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
                    query MgrQueryS0708_LIST_2($data: I_S0708_LIST_2!) {
                        mgrQueryS0708_LIST_2(data: $data) {
                            INVOICE_NO
                            CURR_CD
                            ORG_CURR_CD
                            TOT_AMT
                            TOT_AMT_ORG
                            SHIP_DATE
                            DUE_DATE
                            BALANCE
                            BALANCE_ORG
                            BUYER_NAME
                            BUYER_CD
                            IN_AMT
                            IN_AMT_ORG
                            OA_NEGO
                            OA_NEGO_ORG
                            TAX_TOT_AMT
                            TAX_TOT_AMT_ORG
                            TAX_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0708_LIST_2;
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
                    query MgrQueryS0708_LIST_3($data: I_S0708_LIST_3!) {
                        mgrQueryS0708_LIST_3(data: $data) {
                            CRDB_CD
                            CURR_CD
                            CRDB_AMT
                            END_DATE
                            IN_AMT
                            BALANCE
                            BUYER_NAME
                            REST_AMT
                            VAT_AMT
                            ORG_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0708_LIST_3;
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
                    query MgrQueryS0708_LIST_4($data: I_S0708_LIST_4!) {
                        mgrQueryS0708_LIST_4(data: $data) {
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
            return data.mgrQueryS0708_LIST_4;
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
                    query MgrQueryS0708_LIST_5($data: I_S0708_LIST_5!) {
                        mgrQueryS0708_LIST_5(data: $data) {
                            CREDIT_CD
                            CREDIT_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0708_LIST_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_TT_LIST(refNoList) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0708_EXCEL_TT_LIST(
                        $data: [I_S0708_EXCEL_TT_LIST!]!
                    ) {
                        mgrQueryS0708_EXCEL_TT_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: refNoList,
                },
            });
            return data.mgrQueryS0708_EXCEL_TT_LIST;
        } catch (e) {
            return e;
        }
    }
}
