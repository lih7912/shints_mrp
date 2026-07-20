/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS030507_NEW_PO_FACTORY_SAMPLE {
    // SERVICE: TBL_KSV_ORDER_MST

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MST(
                        $data: I_S030507_NEW_PO_FACTORY_SAMPLE_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            PO_QTY
                            PO_TYPE
                            VENDOR_NAME
                            USE_PO_TYPE
                            MATL_SEQ
                            ORDER_CD
                            STOCK_IDX
                            FACTORY_CD
                            MRP_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "marQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST:" +
                    data
                        .mgrQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST
                        .length,
            );
            return data.mgrQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST1

    async mgrQueryTBL_KSV_ORDER_MST1(argQRY_KSV_ORDER_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MST1(
                        $data: I_S030507_NEW_PO_FACTORY_SAMPLE_QRY_KSV_ORDER_MST1!
                    ) {
                        mgrQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST1(
                            data: $data
                        ) {
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            STOCK_QTY
                            RACK
                            PO_QTY
                            PO_TYPE
                            VENDOR_NAME
                            USE_PO_TYPE
                            MATL_SEQ
                            ORDER_CD
                            STOCK_IDX
                            FACTORY_CD
                            MRP_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST1,
                },
            });
            console.log(
                "marQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST1:" +
                    data
                        .mgrQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST1
                        .length,
            );
            return data.mgrQuery_S030507_NEW_PO_FACTORY_SAMPLE_TBL_KSV_ORDER_MST1;
        } catch (e) {
            return e;
        }
    }
}
