/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0408_MATL_PRICE_UPDATE {
    async mgrInsert_MATL_PRICE_UPDATE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0408_5($datas: [I_S0408_5!]!) {
                        mgrInsert_S0408_5(datas: $datas) {
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
                "mgrInsert_S0408_5 call succeed: " + data.mgrInsert_S0408_5,
            );
            return data.mgrInsert_S0408_5;
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
                    query MgrQueryS0408_3_1($data: I_S0408_3_1!) {
                        mgrQueryS0408_3_1(data: $data) {
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log(
                "mgrQueryS0408_3_1:" + data.mgrQueryS0408_3_1.PO_CD.length,
            );
            return data.mgrQueryS0408_3_1;
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
                    query MgrQueryS0408_3_2($data: I_S0408_3_2!) {
                        mgrQueryS0408_3_2(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log("mgrQueryS0408_3_2:" + data.mgrQueryS0408_3_2.length);
            return data.mgrQueryS0408_3_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_MATL_PRICE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0408_3($data: I_S0408_3!) {
                        mgrQueryS0408_3(data: $data) {
                            PO_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            PO_QTY
                            CURR_CD
                            TYPE
                            BEF_PRICE
                            SALE_PRICE
                            MATL_PRICE
                            MATL_NEGO_PRICE
                            RATE
                            SALE_NEOG_PRICE
                            BALANCE
                            REMARK
                            CONF_NAME
                            TEMP_PRICE
                            CONF_FLAG
                            MATL_SEQ
                            VENDOR_NAME
                            MAX_MATL_SEQ
                            MAX_SALE_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log("mgrQueryS0408_3:" + data.mgrQueryS0408_3.length);
            return data.mgrQueryS0408_3;
        } catch (e) {
            return e;
        }
    }
}
