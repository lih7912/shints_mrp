/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0710_ORDER_EXPORT_REPORT {
    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQueryTBL_KSV_INVOICE_MST(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST(
                        $data: I_S0710_ORDER_EXPORT_REPORT_QRY_KSV_INVOICE_MST!
                    ) {
                        mgrQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST(
                            data: $data
                        ) {
                            BUYER_NAME
                            MATL_1
                            PROD_1
                            TOT_1
                            MATL_2
                            PROD_2
                            TOT_2
                            MATL_3
                            PROD_3
                            TOT_3
                            MATL_4
                            PROD_4
                            TOT_4
                            MATL_5
                            PROD_5
                            TOT_5
                            MATL_6
                            PROD_6
                            TOT_6
                            MATL_7
                            PROD_7
                            TOT_7
                            MATL_8
                            PROD_8
                            TOT_8
                            MATL_9
                            PROD_9
                            TOT_9
                            MATL_10
                            PROD_10
                            TOT_10
                            MATL_11
                            PROD_11
                            TOT_11
                            MATL_12
                            PROD_12
                            TOT_12
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            console.log(
                "marQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST:" +
                    data.mgrQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST
                        .length,
            );
            return data.mgrQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST;
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
                        $data: I_S0710_ORDER_EXPORT_REPORT_QRY_KSV_INVOICE_MST1!
                    ) {
                        mgrQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST1(
                            data: $data
                        ) {
                            PO_CD
                            BUYER_NAME
                            USD_AMT_1
                            KRW_AMT_1
                            USD_AMT_2
                            KRW_AMT_2
                            USD_AMT_3
                            KRW_AMT_3
                            USD_AMT_4
                            KRW_AMT_4
                            USD_AMT_5
                            KRW_AMT_5
                            USD_AMT_6
                            KRW_AMT_6
                            USD_AMT_7
                            KRW_AMT_7
                            USD_AMT_8
                            KRW_AMT_8
                            USD_AMT_9
                            KRW_AMT_9
                            USD_AMT_10
                            KRW_AMT_10
                            USD_AMT_11
                            KRW_AMT_11
                            USD_AMT_12
                            KRW_AMT_12
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            console.log(
                "marQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST1:" +
                    data.mgrQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST1
                        .length,
            );
            return data.mgrQuery_S0710_ORDER_EXPORT_REPORT_TBL_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }
}
