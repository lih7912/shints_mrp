/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0706_PAYMENT_IMPORT_VENDOR {
    // SERVICE: EDT_KSV_INVOICE_MST1
    async mgrInsertEDT_KSV_INVOICE_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrInsert_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1(
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
            return data.mgrInsert_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrUpdate_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1(
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
            return data.mgrUpdate_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrDelete_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1(
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
            return data.mgrDelete_S0706_PAYMENT_IMPORT_VENDOR_EDT_KSV_INVOICE_MST1;
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
                        $data: I_S0706_PAYMENT_IMPORT_VENDOR_QRY_KSV_INVOICE_MST!
                    ) {
                        mgrQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST(
                            data: $data
                        ) {
                            REF_NO
                            CURR_CD
                            TOT_AMT
                            PAY_AMT
                            BAL_AMT
                            AMOUNT
                            VENDOR_NAME
                            VENDOR_CD
                            NEOE_CD
                            PAY_DATE
                            REMARK
                            STATUS
                            SEQ
                            GW_CODE
                            LC_REF_NO
                            LC_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            console.log(
                "marQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST:" +
                    data
                        .mgrQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST
                        .length,
            );
            return data.mgrQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST;
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
                        $data: I_S0706_PAYMENT_IMPORT_VENDOR_QRY_KSV_INVOICE_MST1!
                    ) {
                        mgrQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST1(
                            data: $data
                        ) {
                            DOCU_NO
                            SEQ
                            CURR_CD
                            AMOUNT
                            PAY_DATE
                            VENDOR_NAME
                            VENDOR_CD
                            TYPE
                            REF_NO
                            LC_REF_NO
                            REMARK
                            NEOE_CD
                            LC_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            console.log(
                "marQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST1:" +
                    data
                        .mgrQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST1
                        .length,
            );
            return data.mgrQuery_S0706_PAYMENT_IMPORT_VENDOR_TBL_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }
}
