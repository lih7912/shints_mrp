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

export class ServiceS0105_KCD_HSCODE {
    // SERVICE: EDT_KCD_HSCODE

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KCD_HSCODE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
                        $datas: [I_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
                    ) {
                        mgrInsert_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
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
            return data.mgrInsert_S0105_KCD_HSCODE_EDT_KCD_HSCODE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_HSCODE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
                        $datas: [I_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
                    ) {
                        mgrUpdate_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
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
            return data.mgrUpdate_S0105_KCD_HSCODE_EDT_KCD_HSCODE;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_HSCODE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
                        $datas: [I_S0105_KCD_HSCODE_EDT_KCD_HSCODE!]!
                    ) {
                        mgrDelete_S0105_KCD_HSCODE_EDT_KCD_HSCODE(
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
            return data.mgrDelete_S0105_KCD_HSCODE_EDT_KCD_HSCODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_HSCODE

    async mgrQueryTBL_KCD_HSCODE(argQRY_KCD_HSCODE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_HSCODE(
                        $data: I_S0105_KCD_HSCODE_QRY_KCD_HSCODE!
                    ) {
                        mgrQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE(data: $data) {
                            id
                            HS_NO
                            HS_CD
                            HS_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_HSCODE,
                },
            });
            console.log(
                "marQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE:" +
                    data.mgrQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE.length,
            );
            return data.mgrQuery_S0105_KCD_HSCODE_TBL_KCD_HSCODE;
        } catch (e) {
            return e;
        }
    }
}
