/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0101_CS_SALE_ORDER {
    // SERVICE: EDT_CS_SALE_ORDER
    async mgrInsertEDT_CS_SALE_ORDER(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER(
                        $datas: [I_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER!]!
                    ) {
                        mgrInsert_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_CS_SALE_ORDER(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER(
                        $datas: [I_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER!]!
                    ) {
                        mgrUpdate_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_CS_SALE_ORDER(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER(
                        $datas: [I_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER!]!
                    ) {
                        mgrDelete_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0101_CS_SALE_ORDER_EDT_CS_SALE_ORDER;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_CS_PRODUCT_SUB1

    async mgrQueryTBL_CS_PRODUCT_SUB1(argQRY_CS_PRODUCT_SUB1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_CS_PRODUCT_SUB1(
                        $data: I_S0101_CS_SALE_ORDER_QRY_CS_PRODUCT_SUB1!
                    ) {
                        mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB1(
                            data: $data
                        ) {
                            id
                            KIND1
                            MODEL1
                            MODEL2
                            AMOUNT
                            QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_CS_PRODUCT_SUB1,
                },
            });
            console.log(
                "marQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB1:" +
                    data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB1
                        .length,
            );
            return data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_CS_PRODUCT_SUB2

    async mgrQueryTBL_CS_PRODUCT_SUB2(argQRY_CS_PRODUCT_SUB2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_CS_PRODUCT_SUB2(
                        $data: I_S0101_CS_SALE_ORDER_QRY_CS_PRODUCT_SUB2!
                    ) {
                        mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB2(
                            data: $data
                        ) {
                            id
                            KIND1
                            MODEL1
                            MODEL2
                            AMOUNT
                            QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_CS_PRODUCT_SUB2,
                },
            });
            console.log(
                "marQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB2:" +
                    data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB2
                        .length,
            );
            return data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_PRODUCT_SUB2;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_CS_SALE_ORDER

    async mgrQueryTBL_CS_SALE_ORDER(argQRY_CS_SALE_ORDER) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_CS_SALE_ORDER(
                        $data: I_S0101_CS_SALE_ORDER_QRY_CS_SALE_ORDER!
                    ) {
                        mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER(
                            data: $data
                        ) {
                            id
                            WORK_DATE
                            WORK_TIME
                            BUYER_NAME
                            MODEL_NAME
                            OPTION1
                            USER_NAME
                            ACCESORY_FLAG
                        }
                    }
                `,
                variables: {
                    data: argQRY_CS_SALE_ORDER,
                },
            });
            console.log(
                "marQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER:" +
                    data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER.length,
            );
            return data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_CS_SALE_ORDER_MODEL_NAME(argOrderType) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_CS_SALE_ORDER_MODEL_NAME(
                        $data: String!
                    ) {
                        mgrQuery_S0101_CS_SALE_ORDER_MODEL_NAME(data: $data) {
                            id
                            CATEGORY
                            KIND1
                            KIND2
                            MODEL1
                            MODEL2
                        }
                    }
                `,
                variables: {
                    data: argOrderType,
                },
            });
            console.log(
                "marQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER:" +
                    data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER.length,
            );
            return data.mgrQuery_S0101_CS_SALE_ORDER_TBL_CS_SALE_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_CS_SALE_ORDER_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query ExampleQuery {
                        mgrQuery_S0101_CS_SALE_ORDER_CODE {
                            USER_NAME {
                                id
                                USER_ID
                                USER_NAME
                            }
                            ORDER_TYPE {
                                id
                                CD_CODE
                                CD_NAME
                            }
                            OPTION1 {
                                id
                                CD_CODE
                                CD_NAME
                            }
                            OPTION2 {
                                id
                                CD_CODE
                                CD_NAME
                            }
                            WORK_USER {
                                id
                                USER_ID
                                USER_NAME
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0101_CS_SALE_ORDER_CODE:" +
                    data.mgrQuery_S0101_CS_SALE_ORDER_CODE.USER_NAME.length,
            );
            return data.mgrQuery_S0101_CS_SALE_ORDER_CODE;
        } catch (e) {
            return e;
        }
    }
}
