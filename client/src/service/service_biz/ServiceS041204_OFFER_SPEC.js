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

export class ServiceS041204_OFFER_SPEC {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_OFFER_SPEC(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041204_5($datas: [I_S041204_5!]!) {
                        mgrInsert_S041204_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S041204_5;
        } catch (e) {
            return e;
        }
    }

    //

    async mgrQuery_CODE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS041204_CODE($data: I_S041204_1!) {
                        mgrQueryS041204_CODE(data: $data) {
                            MATL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "mgrQueryS041204_CODE:" + data.mgrQueryS041204_CODE.length,
            );
            return data.mgrQueryS041204_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_OFFER_SPEC(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS041204_1($data: I_S041204_1!) {
                        mgrQueryS041204_1(data: $data) {
                            VENDOR_NAME
                            MATL_NAME
                            SPEC
                            OFFER_SPEC
                            VENDOR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS041204_1:" + data.mgrQueryS041204_1.length);
            return data.mgrQueryS041204_1;
        } catch (e) {
            return e;
        }
    }
}
