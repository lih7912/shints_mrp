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

export class ServiceS041203_COMP_BIN {
    // SERVICE: TBL_KSV_STOCK_OUT
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_COMP_BIN(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041203_5($datas: [I_S041203_5!]!) {
                        mgrInsert_S041203_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S041203_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS041203_CODE($data: I_S041203_1!) {
                        mgrQueryS041203_CODE(data: $data) {
                            COMP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            HS_CODE {
                                HS_NO
                                HS_CD
                                HS_NAME
                                id
                            }
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
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log(
                "mgrQueryS041203_CODE:" + data.mgrQueryS041203_CODE.COMP.length,
            );
            return data.mgrQueryS041203_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_COMP(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS041203_1($data: I_S041203_1!) {
                        mgrQueryS041203_1(data: $data) {
                            VENDOR_NAME
                            MATL_NAME
                            SPEC
                            WIDTH
                            WEIGHT
                            HS_NAME
                            HS_CD
                            COMP1
                            COMP1_PERCENT
                            COMP2
                            COMP2_PERCENT
                            COMP3
                            COMP3_PERCENT
                            COMP4
                            COMP4_PERCENT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log("mgrQueryS041203_1:" + data.mgrQueryS041203_1.length);
            return data.mgrQueryS041203_1;
        } catch (e) {
            return e;
        }
    }
}
