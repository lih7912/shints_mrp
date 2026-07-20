/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS041202_CT_QTY_CHECK {
    async mgrInsert_CT_QTY_CHECK(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041202_5($datas: [I_S041202_5!]!) {
                        mgrInsert_S041202_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S041202_5;
        } catch (e) {
            return e;
        }
    }

    //

    async mgrQuery_CT_QTY_CHECK(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS041202_1($data: I_S041202_1!) {
                        mgrQueryS041202_1(data: $data) {
                            VENDOR_NAME
                            PERMIT
                            CT_QTY
                            CT_QTY2
                            TOT
                            VENDOR_CD
                            REG_USER
                            VENDOR_MATL_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS041202_1:" + data.mgrQueryS041202_1.length);
            return data.mgrQueryS041202_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CT_QTY_CHECK_PRE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS041202_2($data: I_S041202_1!) {
                        mgrQueryS041202_2(data: $data) {
                            VENDOR_NAME
                            PERMIT
                            CT_QTY
                            CT_QTY2
                            TOT
                            VENDOR_CD
                            REG_USER
                            VENDOR_MATL_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS041202_2:" + data.mgrQueryS041202_2.length);
            return data.mgrQueryS041202_2;
        } catch (e) {
            return e;
        }
    }
}
