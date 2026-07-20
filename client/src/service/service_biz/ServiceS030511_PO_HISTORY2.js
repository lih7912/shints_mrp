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

export class ServiceS030511_PO_HISTORY2 {
    // SERVICE: TBL_KSV_PO_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_KSV_ORDER_MST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030511_1($data: I_S030511_1!) {
                        mgrQueryS030511_1(data: $data) {
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_CD
                            QTY_TYPE
                            TOT_QTY
                            MINI_QTY
                            ORDERS {
                                ORDER_CD
                                SUM_QTY
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log("mgrQueryS030511_1:" + data.mgrQueryS030511_1.length);
            return data.mgrQueryS030511_1;
        } catch (e) {
            return e;
        }
    }
}
