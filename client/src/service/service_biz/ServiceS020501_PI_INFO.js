/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS020501_PI_INFO {
    // SERVICE: EDT_KSV_ORDER_PIMST
    async mgrInsertEDT_KSV_ORDER_PIMST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020501_PI_INFO_EDT_KSV_ORDER_PIMST(
                        $datas: [I_S020501_PI_INFO_EDT_KSV_ORDER_PIMST!]!
                    ) {
                        mgrInsert_S020501_PI_INFO_EDT_KSV_ORDER_PIMST(
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
            return data.mgrInsert_S020501_PI_INFO_EDT_KSV_ORDER_PIMST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_PIMST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020501_PI_INFO_EDT_KSV_ORDER_PIMST(
                        $datas: [I_S020501_PI_INFO_EDT_KSV_ORDER_PIMST!]!
                    ) {
                        mgrUpdate_S020501_PI_INFO_EDT_KSV_ORDER_PIMST(
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
            return data.mgrUpdate_S020501_PI_INFO_EDT_KSV_ORDER_PIMST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_PIMST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020501_PI_INFO_EDT_KSV_ORDER_PIMST(
                        $datas: [I_S020501_PI_INFO_EDT_KSV_ORDER_PIMST!]!
                    ) {
                        mgrDelete_S020501_PI_INFO_EDT_KSV_ORDER_PIMST(
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
            return data.mgrDelete_S020501_PI_INFO_EDT_KSV_ORDER_PIMST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_PIMST

    async mgrQueryTBL_KSV_ORDER_PIMST(argQRY_KSV_ORDER_PIMST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_PIMST(
                        $data: I_S020501_PI_INFO_QRY_KSV_ORDER_PIMST!
                    ) {
                        mgrQuery_S020501_PI_INFO_TBL_KSV_ORDER_PIMST(
                            data: $data
                        ) {
                            REF_ORDER_NO
                            ORDER_CD
                            STYLE_NAME
                            TOT_CNT
                            UNIT
                            TERM
                            UNIT_PRICE
                            AMOUNT
                            CURR_CD
                            ETD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_PIMST,
                },
            });
            console.log(
                "marQuery_S020501_PI_INFO_TBL_KSV_ORDER_PIMST:" +
                    data.mgrQuery_S020501_PI_INFO_TBL_KSV_ORDER_PIMST.length,
            );
            return data.mgrQuery_S020501_PI_INFO_TBL_KSV_ORDER_PIMST;
        } catch (e) {
            return e;
        }
    }
}
