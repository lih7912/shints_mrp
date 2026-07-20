/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0506_FACTORY_OUTPUT_LIST {
    // SERVICE: TBL_KSV_STOCK_FACOUT
    async mgrInsert_CANCEL_FACOUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0506_5($datas: [I_S0506_5!]!) {
                        mgrInsert_S0506_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0506_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_FACOUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0506_CODE($data: I_S0506_1!) {
                        mgrQueryS0506_CODE(data: $data) {
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            VENDOR_TYPE {
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
                    data: argQRY_KSV_STOCK_FACOUT,
                },
            });
            return data.mgrQueryS0506_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_FACOUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0506_2($data: I_S0506_2!) {
                        mgrQueryS0506_2(data: $data) {
                            PO_CD
                            OUT_DATE
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            OUT_QTY
                            MATL_CD
                            VENDOR_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACOUT,
                },
            });
            return data.mgrQueryS0506_2;
        } catch (e) {
            return e;
        }
    }
}
