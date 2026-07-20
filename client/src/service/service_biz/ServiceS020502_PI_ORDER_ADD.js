/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS020502_PI_ORDER_ADD {
    // SERVICE: TBL_KSV_ORDER_PIMEM

    async mgrQueryTBL_KSV_ORDER_PIMEM(argQRY_KSV_ORDER_PIMEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_PIMEM(
                        $data: I_S020502_PI_ORDER_ADD_QRY_KSV_ORDER_PIMEM!
                    ) {
                        mgrQuery_S020502_PI_ORDER_ADD_TBL_KSV_ORDER_PIMEM(
                            data: $data
                        ) {
                            BUYER_NAME
                            BUYER_CD
                            REF_ORDER_NO
                            ORDER_CD
                            STYLE_CD
                            STYLE_NAME
                            QTY
                            PRICE
                            CURR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_PIMEM,
                },
            });
            console.log(
                "marQuery_S020502_PI_ORDER_ADD_TBL_KSV_ORDER_PIMEM:" +
                    data.mgrQuery_S020502_PI_ORDER_ADD_TBL_KSV_ORDER_PIMEM
                        .length,
            );
            return data.mgrQuery_S020502_PI_ORDER_ADD_TBL_KSV_ORDER_PIMEM;
        } catch (e) {
            return e;
        }
    }
}
