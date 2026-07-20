/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0514_SHIPPING_REGIST_BVT_OLD {
    // SERVICE: TBL_KSV_ORDER_SHIP

    async mgrQueryTBL_KSV_ORDER_SHIP(argQRY_KSV_ORDER_SHIP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_SHIP(
                        $data: I_S0514_SHIPPING_REGIST_BVT_OLD_QRY_KSV_ORDER_SHIP!
                    ) {
                        mgrQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP(
                            data: $data
                        ) {
                            ORDER_CD
                            BUYER_NAME
                            STYLE_NAME
                            DUE_DATE
                            ORDER_QTY
                            SHIP_QTY
                            FOB_USD
                            EXFACTORY
                            SHIP_DATE
                            SHIP_PROD_TYPE
                            INVOICE_NO
                            NAT_NAME
                            DELIVERY_TYPE
                            ORDER_STATUS
                            FACTORY_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_SHIP,
                },
            });
            console.log(
                "marQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP:" +
                    data
                        .mgrQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP
                        .length,
            );
            return data.mgrQuery_S0514_SHIPPING_REGIST_BVT_OLD_TBL_KSV_ORDER_SHIP;
        } catch (e) {
            return e;
        }
    }
}
