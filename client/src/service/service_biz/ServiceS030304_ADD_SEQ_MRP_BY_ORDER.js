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

export class ServiceS030304_ADD_SEQ_MRP_BY_ORDER {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: TBL_KSV_ORDER_MEM
    async mgrInsertEDT_KSV_PROD_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER(
                        $datas: [I_S030304_ADD_SEQ_MRP_BY_ORDER!]!
                    ) {
                        mgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S030304_ADD_SEQ_MRP_BY_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MEM(argQRY_KSV_ORDER_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM(
                        $data: I_S030304_ADD_SEQ_MRP_BY_ORDER_QRY_KSV_ORDER_MEM!
                    ) {
                        mgrQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM(
                            data: $data
                        ) {
                            PO_CD
                            PROD_CD
                            ORDER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MEM,
                },
            });
            console.log(
                "marQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM:" +
                    data.mgrQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM
                        .length,
            );
            return data.mgrQuery_S030304_ADD_SEQ_MRP_BY_ORDER_TBL_KSV_ORDER_MEM;
        } catch (e) {
            return e;
        }
    }
}
