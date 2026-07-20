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

export class ServiceS0423_TAXBILL {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: TBL_KSV_STOCK_IN
    async mgrInsert_TAXBILL(argRetArray) {
        // _5
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0423_TAXBILL($datas: [I_S0423_5!]!) {
                        mgrInsert_S0423_TAXBILL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0423_TAXBILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_TAXBILL_CANCEL(argRetArray) {
        // _5_1
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0423_TAXBILL_CANCEL(
                        $datas: [I_S0423_5!]!
                    ) {
                        mgrInsert_S0423_TAXBILL_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0423_TAXBILL_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BILL_CANCEL(argRetArray) {
        // _5_1
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0423_BILL_CANCEL(
                        $datas: [I_S0423_5!]!
                    ) {
                        mgrInsert_S0423_BILL_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0423_BILL_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_DC(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_UPDATE_DC($datas: [I_S0423_5!]!) {
                        mgrUpdate_S0423_UPDATE_DC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0423_UPDATE_DC;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_PAY_DATE(argRetArray, argPayDate) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_PAY_DATE(
                        $datas: [I_S0423_5!]!
                        $pay_date: String!
                    ) {
                        mgrUpdate_S0423_PAY_DATE(
                            datas: $datas
                            pay_date: $pay_date
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                    pay_date: argPayDate,
                },
            });
            return data.mgrUpdate_S0423_PAY_DATE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_DN(argRetArray, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_UPDATE_DN(
                        $datas: [I_S0423_5!]!
                        $datas1: I_S0423_5_5_1!
                        $datas2: I_S0423_5_5_2!
                    ) {
                        mgrUpdate_S0423_UPDATE_DN(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                    datas1: argData1,
                    datas2: argData2,
                },
            });
            return data.mgrUpdate_S0423_UPDATE_DN;
        } catch (e) {
            console.log(e.message);
            return e;
        }
    }

    async mgrInsert_DELETE_DN(argRetArray, argData1, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0423_DELETE_DN(
                        $datas: [I_S0423_5!]!
                        $datas1: I_S0423_5_5_1!
                        $datas2: I_S0423_5_5_2!
                    ) {
                        mgrDelete_S0423_DELETE_DN(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                    datas1: argData1,
                    datas2: argData2,
                },
            });
            return data.mgrDelete_S0423_DELETE_DN;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_GW(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_GW($datas: [I_S0423_5!]!) {
                        mgrUpdate_S0423_GW(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0423_GW;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_GW_TAXBILL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_GW_TAXBILL($datas: [I_S0423_5!]!) {
                        mgrUpdate_S0423_GW_TAXBILL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0423_GW_TAXBILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_GW_IN(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_GW_IN($datas: [I_S0423_5!]!) {
                        mgrUpdate_S0423_GW_IN(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0423_GW_IN;
        } catch (e) {
            return e;
        }
    }

    ////

    async mgrQuery_CODE(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_CODE($data: I_S0423_1!) {
                        mgrQueryS0423_CODE(data: $data) {
                            VENDOR_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            TAX_KIND {
                                CD_CODE
                                CD_NAME
                            }
                            GW_STATUS {
                                CD_CODE
                                CD_NAME
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0423_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_IN1

    async mgrQuery_LIST_1(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_LIST_1($data: I_S0423_LIST_1!) {
                        mgrQueryS0423_LIST_1(data: $data) {
                            MESSAGE
                            DATAS {
                                VENDOR_TYPE_N
                                TAX_KIND_N
                                BILL_CD
                                VENDOR_NAME
                                INVOICE_DATE
                                PAY_DATE
                                PAY_TYPE_N
                                CURR_CD
                                PO_AMT
                                DEPOSIT_AMT
                                LC_AMT
                                DEBIT_AMT
                                DISCOUNT_AMT
                                VAT_AMT
                                PAID_AMT
                                PAY_AMT
                                BAL_AMT
                                IN_PAY_AMT
                                PAY_TERM
                                TAX_KIND
                                VENDOR_CD
                                VENDOR_TYPE
                                PAY_TYPE
                                REG_USER
                                BILL_FLAG
                                GW_STATUS
                                GW_STATUS_N
                                GW_STATUS_CD
                                GW_STATUS_TAXBILL
                                GW_STATUS_N_TAXBILL
                                GW_STATUS_CD_TAXBILL
                                PAY_BANK
                                BANK_NAME
                                ACCOUNT_NO
                                ACCOUNT_NAME
                                TAXBILL_CD
                                SFTCODE
                                APPROKEY
                                APPROKEY_TAXBILL
                                BAL_DEBIT
                                PAY_REPORT
                                PUR_FACTORY
                                DOCU_NO
                                DOCU_NO_TAXBILL
                                BUY_DATE
                                PUR_APP
                                TT_FLAG
                                COMPANY_CODE
                                INVOICE_NO
                                BILL_END_FLAG
                                CHECK_PO_AMT 
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0423_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_3($data: I_S0423_3!) {
                        mgrQueryS0423_3(data: $data) {
                            PO_CD
                            BUYER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            TOT_QTY
                            IN_QTY
                            IN_CURR_CD
                            IN_PRICE
                            PAY_CURR_CD
                            PAY_PRICE
                            TT_FLAG
                            PAY_AMT
                            END_FLAG
                            END_DATE
                            PAY_DATE
                            BILL_FLAG
                            BILL_DATE
                            VENDOR_NAME
                            PO_SEQ
                            ORDER_CD
                            MRP_SEQ
                            IN_DATETIME
                            MATL_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0423_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_4($data: I_S0423_4!) {
                        mgrQueryS0423_4(data: $data) {
                            CRDB_CD
                            CRDB_SEQ
                            CRDB_DATE
                            COM_NAME
                            CRDB_AMT
                            BALANCE
                            CURR_CD
                            USD_BAL
                            TITLE
                            REG_USER
                            END_DATE
                            REMARK
                            STATUS
                            PO_CD
                            ORDER_CD
                            BANK_CD
                            COM_CD
                            STATUS_CD
                            BUYER_CD
                            BUYER_NAME
                            PAYMENT_PLAN
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0423_4;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4_1(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_4_1($data: I_S0423_4!) {
                        mgrQueryS0423_4_1(data: $data) {
                            END_DATE
                            CRDB_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0423_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_4_REPORT($data: [I_S0423_4_REPORT!]!) {
                        mgrQueryS0423_4_REPORT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0423_4_REPORT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BVT_PAYMENT_REQUEST(
        selectedTBL_KSV_STOCK_IN,
        dataQRY_KSV_STOCK_IN,
    ) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0423_BVT_PAYMENT_REQUEST(
                        $data: [I_S0423_BVT_PAYMENT_REQUEST!]!
                        $qry: I_S0423_BVT_PAYMENT_REQUEST_QRY
                    ) {
                        mgrQueryS0423_BVT_PAYMENT_REQUEST(
                            data: $data
                            qry: $qry
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: selectedTBL_KSV_STOCK_IN,
                    qry: dataQRY_KSV_STOCK_IN,
                },
            });
            return data.mgrQueryS0423_BVT_PAYMENT_REQUEST;
        } catch (e) {
            console.log(
                "GraphQL errors:",
                e.graphQLErrors?.map((x) => x.message),
            );
            console.log(
                "Network error:",
                e.networkError?.result || e.networkError,
            );
            return e;
        }
    }

    async mgrUPDATE_BILL_END(argRetArray) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0423_BILL_END($datas: [I_S0423_5!]!) {
                        mgrUpdate_S0423_BILL_END(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0423_BILL_END;
        } catch (e) {
            console.log(e.message);
            return e;
        }
    }
}
