/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0420_ENDDING_MATL_AMT_IMPORT {
    // SERVICE: TBL_KSV_STOCK_IN

    async mgrQueryTBL_KSV_STOCK_IN(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_STOCK_IN(
                        $data: I_S0420_ENDDING_MATL_AMT_IMPORT_QRY_!
                    ) {
                        mgrQuery_S0420_ENDDING_MATL_AMT_IMPORT_TBL_KSV_STOCK_IN(
                            data: $data
                        ) {
                            PO_CD
                            BUYER
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            IN_QTY_TOT
                            IN_QTY_PAY
                            IN_CURR_CD
                            IN_PRICE
                            PAY_CURR_CD
                            PAY_PRICE
                            MATL_PRICE
                            TT_FLAG
                            WARE_NAME
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
                            CALC_FLAG
                            VENDOR_CD
                            PUR_FACTORY
                            PAY_REPORT
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log(
                "marQuery_S0420_ENDDING_MATL_AMT_IMPORT_TBL_KSV_STOCK_IN:" +
                    data.mgrQuery_S0420_ENDDING_MATL_AMT_IMPORT_TBL_KSV_STOCK_IN
                        .length,
            );
            return data.mgrQuery_S0420_ENDDING_MATL_AMT_IMPORT_TBL_KSV_STOCK_IN;
        } catch (e) {
            return e;
        }
    }
}
