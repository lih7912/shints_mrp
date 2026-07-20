/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS060101_QRY_BILL_AMT {
    // SERVICE: EDT_KSV_INVOICE_BILL
    async mgrInsertEDT_KSV_INVOICE_BILL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL(
                        $datas: [I_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL!]!
                    ) {
                        mgrInsert_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL(
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
            return data.mgrInsert_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_BILL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL(
                        $datas: [I_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL!]!
                    ) {
                        mgrUpdate_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL(
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
            return data.mgrUpdate_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_BILL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL(
                        $datas: [I_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL!]!
                    ) {
                        mgrDelete_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL(
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
            return data.mgrDelete_S060101_QRY_BILL_AMT_EDT_KSV_INVOICE_BILL;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQueryTBL_KSV_INVOICE_MST(argQRY_KSV_INVOICE_BILL) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST(
                        $data: I_S060101_QRY_BILL_AMT_QRY_KSV_INVOICE_BILL!
                    ) {
                        mgrQuery_S060101_QRY_BILL_AMT_TBL_KSV_INVOICE_MST(
                            data: $data
                        ) {
                            BILL_DATE
                            BILL_AMT
                            REF_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_BILL,
                },
            });
            console.log(
                "marQuery_S060101_QRY_BILL_AMT_TBL_KSV_INVOICE_MST:" +
                    data.mgrQuery_S060101_QRY_BILL_AMT_TBL_KSV_INVOICE_MST
                        .length,
            );
            return data.mgrQuery_S060101_QRY_BILL_AMT_TBL_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }
}
