/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0409_MATL_PRICE_CHECKIN_PO {
    // SERVICE: EDT_KSV_PO_MRP1
    async mgrInsertEDT_KSV_PO_MRP1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1(
                        $datas: [I_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1!]!
                    ) {
                        mgrInsert_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1(
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
            return data.mgrInsert_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_PO_MRP1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1(
                        $datas: [I_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1!]!
                    ) {
                        mgrUpdate_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1(
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
            return data.mgrUpdate_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_PO_MRP1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1(
                        $datas: [I_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1!]!
                    ) {
                        mgrDelete_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1(
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
            return data.mgrDelete_S0409_MATL_PRICE_CHECKIN_PO_EDT_KSV_PO_MRP1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_VENDOR

    async mgrQueryTBL_KCD_VENDOR(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_VENDOR(
                        $data: I_S0409_MATL_PRICE_CHECKIN_PO_QRY_KCD_VENDOR!
                    ) {
                        mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KCD_VENDOR(
                            data: $data
                        ) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log(
                "marQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KCD_VENDOR:" +
                    data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KCD_VENDOR
                        .length,
            );
            return data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KCD_VENDOR;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MRP

    async mgrQueryTBL_KSV_PO_MRP(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PO_MRP(
                        $data: I_S0409_MATL_PRICE_CHECKIN_PO_QRY_KSV_PO_MRP!
                    ) {
                        mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MRP(
                            data: $data
                        ) {
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            PO_QTY
                            CURR_CD
                            PRICE_TYPE
                            S_PRICE
                            MATL_PRICE
                            MATL_NEGO
                            PERCENT
                            DIFF
                            REMARK
                            TEMP_PRICE
                            CONF_FLAG
                            MATL_SEQ
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log(
                "marQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MRP:" +
                    data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MRP
                        .length,
            );
            return data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MRP;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MST

    async mgrQueryTBL_KSV_PO_MST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PO_MST(
                        $data: I_S0409_MATL_PRICE_CHECKIN_PO_QRY_KSV_PO_MST!
                    ) {
                        mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST(
                            data: $data
                        ) {
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "marQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST
                        .length,
            );
            return data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MST1

    async mgrQueryTBL_KSV_PO_MST1(argQRY_KSV_PO_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PO_MST1(
                        $data: I_S0409_MATL_PRICE_CHECKIN_PO_QRY_KSV_PO_MST1!
                    ) {
                        mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST1(
                            data: $data
                        ) {
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST1,
                },
            });
            console.log(
                "marQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST1:" +
                    data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST1
                        .length,
            );
            return data.mgrQuery_S0409_MATL_PRICE_CHECKIN_PO_TBL_KSV_PO_MST1;
        } catch (e) {
            return e;
        }
    }
}
