/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS030601_MRP_BY_ORDER_QRY {
    // SERVICE: TBL_KSV_ORDER_MST

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MST(
                        $data: I_S030601_MRP_BY_ORDER_QRY_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S030601_MRP_BY_ORDER_QRY_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            PO_CD
                            ORDER_CD
                            ORDER_STATUS_NAME
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "marQuery_S030601_MRP_BY_ORDER_QRY_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S030601_MRP_BY_ORDER_QRY_TBL_KSV_ORDER_MST
                        .length,
            );
            return data.mgrQuery_S030601_MRP_BY_ORDER_QRY_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }
}
