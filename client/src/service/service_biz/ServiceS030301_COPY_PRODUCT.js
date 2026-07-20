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

export class ServiceS030301_COPY_PRODUCT {
    // SERVICE: TBL_KCD_STYLE

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_ADD_PROD(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030301_ADD_PROD(
                        $datas: I_S030301_ADD_PROD1!
                        $datas1: [I_S030301_ADD_PROD2!]!
                    ) {
                        mgrInsert_S030301_ADD_PROD(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S030301_ADD_PROD;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DEL_PROD(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030301_DEL_PROD(
                        $datas: I_S030301_ADD_PROD1!
                        $datas1: [I_S030301_ADD_PROD2!]!
                    ) {
                        mgrInsert_S030301_DEL_PROD(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S030301_DEL_PROD;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_STYLE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030301_QRY_STYLE(
                        $data: I_S030301_QRY_STYLE!
                    ) {
                        mgrQuery_S030301_QRY_STYLE(data: $data) {
                            STYLE_NAME
                            STYLE_CD
                            BUYER_NAME
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S030301_QRY_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_PROD(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030301_QRY_PROD(
                        $data: I_S030301_QRY_PROD!
                    ) {
                        mgrQuery_S030301_QRY_PROD(data: $data) {
                            STYLE_CD
                            PROD_CD
                            COLOR
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S030301_QRY_PROD;
        } catch (e) {
            return e;
        }
    }
}
