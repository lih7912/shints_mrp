/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0704_PAYMENT_MATL_AMT {
    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsertEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrInsert_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST(
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
            return data.mgrInsert_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrUpdate_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST(
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
            return data.mgrUpdate_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrDelete_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST(
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
            return data.mgrDelete_S0704_PAYMENT_MATL_AMT_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQueryTBL_KSV_INVOICE_MST(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST(
                        $data: I_S0704_PAYMENT_MATL_AMT_QRY_KSV_INVOICE_MST!
                    ) {
                        mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST(
                            data: $data
                        ) {
                            PAY_DATE
                            VENDOR_NAME
                            CURR_CD
                            AMOUNT
                            TAX
                            TT_FLAG
                            PUR_APP
                            CLOSING
                            TAX_DATE
                            PAY_REPORT
                            VENDOR_CD
                            APPROKEY
                            TAXBILL_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            console.log(
                "marQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST:" +
                    data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST
                        .length,
            );
            return data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQueryTBL_KSV_INVOICE_MST1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST1(
                        $data: I_S0704_PAYMENT_MATL_AMT_QRY_KSV_INVOICE_MST1!
                    ) {
                        mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST1(
                            data: $data
                        ) {
                            PO_CD
                            CURR_CD
                            TOT_AMT
                            PAY_AMT
                            BAL_AMT
                            AMOUNT
                            IN_DATE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            console.log(
                "marQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST1:" +
                    data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST1
                        .length,
            );
            return data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST2

    async mgrQueryTBL_KSV_INVOICE_MST2(argQRY_KSV_INVOICE_MST2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST2(
                        $data: I_S0704_PAYMENT_MATL_AMT_QRY_KSV_INVOICE_MST2!
                    ) {
                        mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST2(
                            data: $data
                        ) {
                            DOCU_NO
                            CURR_CD
                            AMOUNT
                            IN_DATE
                            BUY_DATE
                            TAX_DATE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST2,
                },
            });
            console.log(
                "marQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST2:" +
                    data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST2
                        .length,
            );
            return data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST2;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST3

    async mgrQueryTBL_KSV_INVOICE_MST3(argQRY_KSV_INVOICE_MST3) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST3(
                        $data: I_S0704_PAYMENT_MATL_AMT_QRY_KSV_INVOICE_MST3!
                    ) {
                        mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST3(
                            data: $data
                        ) {
                            PO_CD
                            CURR_CD
                            AMOUNT
                            IN_DATE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST3,
                },
            });
            console.log(
                "marQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST3:" +
                    data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST3
                        .length,
            );
            return data.mgrQuery_S0704_PAYMENT_MATL_AMT_TBL_KSV_INVOICE_MST3;
        } catch (e) {
            return e;
        }
    }
}
