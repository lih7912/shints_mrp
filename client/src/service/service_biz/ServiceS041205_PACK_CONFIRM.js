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

export class ServiceS041205_PACK_CONFIRM {
    // SERVICE: EDT_KSV_STOCK_OUT
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
                        $datas: [I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrInsert_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
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
            return data.mgrInsert_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
                        $datas: [I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrUpdate_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
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
            return data.mgrUpdate_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
                        $datas: [I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrDelete_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
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
            return data.mgrDelete_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }
}
