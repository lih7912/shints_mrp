/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0406_STSIN_RECORD {
    async mgrInsert_STOCK_IN(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0406_5($datas: [I_S0406_5!]!) {
                        mgrInsert_S0406_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "mgrInsert_S0406_5 call succeed: " + data.mgrInsert_S0406_5,
            );
            return data.mgrInsert_S0406_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KCD_VENDOR

    async mgrQuery_PO_CD(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0406_3_1($data: I_S0406_3_1!) {
                        mgrQueryS0406_3_1(data: $data) {
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log("mgrQueryS0406_3_1:" + data.mgrQueryS0406_3_1.length);
            return data.mgrQueryS0406_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_VENDOR_CD(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0406_3_2($data: I_S0406_3_2!) {
                        mgrQueryS0406_3_2(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log("mgrQueryS0406_3_2:" + data.mgrQueryS0406_3_2.length);
            return data.mgrQueryS0406_3_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_STOCK_IN_PRE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0406_3($data: I_S0406_3!) {
                        mgrQueryS0406_3(data: $data) {
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_PRICE
                            PO_QTY
                            IN_QTY
                            MATL_CD
                            MATL_CONF_FLAG_N
                            CONF_FLAG
                            CURR_CD
                            TEMP_PRICE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log("mgrQueryS0406_3:" + data.mgrQueryS0406_3.length);
            return data.mgrQueryS0406_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_STOCK_IN_WORK(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0406_4_one($data: I_S0406_4_one!) {
                        mgrQueryS0406_4_one(data: $data) {
                            PO_CD
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            BEF_IN_QTY
                            IN_QTY
                            TOT_QTY
                            PO_CD_CNT
                            MIN_FLAG
                            MATL_CD
                            LC_QTY
                            BILL_TYPE
                            PO_SEQ
                            MRP_SEQ
                            VENDOR_CD
                            VENDOR_TYPE
                            REMAIN_QTY
                            TEMP_PRICE
                            MIN_CONF_USER
                            MIN_CONF_DATETIME
                            MIN_STOCK_IDX
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log(
                "mgrQueryS0406_4_one:" + data.mgrQueryS0406_4_one.length,
            );
            return data.mgrQueryS0406_4_one;
        } catch (e) {
            return e;
        }
    }
}
