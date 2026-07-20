/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0504_FACTORY_INPUT_LIST {
    // SERVICE: TBL_KSV_STOCK_FACIN
    async mgrInsert_UPDATE_LOCATION(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0504_5_LOCATION($datas: [I_S0504_5!]!) {
                        mgrUpdate_S0504_5_LOCATION(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0504_5_LOCATIOn;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_CANCEL_FACIN(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0504_5_CANCEL($datas: [I_S0504_5!]!) {
                        mgrInsert_S0504_5_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0504_5_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0504_CODE($data: I_S0504_1!) {
                        mgrQueryS0504_CODE(data: $data) {
                            VENDOR_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0504_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0504_2($data: I_S0504_2!) {
                        mgrQueryS0504_2(data: $data) {
                            STSOUT_CD
                            PO_CD
                            IN_DATE
                            DELIVERY
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            COL1
                            COL2
                            IN_QTY
                            SHORTAGE_QTY
                            DEFECT_QTY
                            ERR_QTY
                            LOCATION
                            MATL_CD
                            VENDOR_TYPE
                            BUYER_NAME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0504_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0504_3($data: I_S0504_3!) {
                        mgrQueryS0504_3(data: $data) {
                            PO_CD
                            IN_DATE
                            DELIVERY
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            COL2
                            IN_QTY
                            ERR_QTY
                            LOCATION
                            MATL_CD
                            VENDOR_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0504_3;
        } catch (e) {
            return e;
        }
    }
}
