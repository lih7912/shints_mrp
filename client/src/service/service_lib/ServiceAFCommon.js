/* eslint-disable */
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "./ServiceLib";

export class ServiceAFCommon {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // Query
    async mgrQuery_BUYER(argData0) {
        var argData = {};
        argData.SRCH_DATA = argData0;

        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0000_BUYER($data: I_S0000_1!) {
                        mgrQueryS0000_BUYER(data: $data) {
                            BUYER_CD
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0000_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_VENDOR(argData0) {
        var argData = {};
        argData.SRCH_DATA = argData0;

        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0000_VENDOR($data: I_S0000_1!) {
                        mgrQueryS0000_VENDOR(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0000_VENDOR;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_STYLE(argData0) {
        var argData = {};
        argData.SRCH_DATA = argData0;

        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0000_STYLE($data: I_S0000_1!) {
                        mgrQueryS0000_STYLE(data: $data) {
                            STYLE_CD
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0000_STYLE;
        } catch (e) {
            return e;
        }
    }
}
