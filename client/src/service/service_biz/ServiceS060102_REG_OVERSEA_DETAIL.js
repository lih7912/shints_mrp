/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS060102_REG_OVERSEA_DETAIL {
    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsertEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
                        $datas: [I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrInsert_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
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
            return data.mgrInsert_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
                        $datas: [I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrUpdate_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
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
            return data.mgrUpdate_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
                        $datas: [I_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrDelete_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST(
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
            return data.mgrDelete_S060102_REG_OVERSEA_DETAIL_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }
}
