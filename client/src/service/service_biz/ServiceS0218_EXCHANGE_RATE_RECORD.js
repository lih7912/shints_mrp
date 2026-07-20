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

export class ServiceS0218_EXCHANGE_RATE_RECORD {
    // SERVICE: EDT_KCD_CURR_COMM1

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KCD_CURR_COMM1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
                        $datas: [I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
                    ) {
                        mgrInsert_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
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
            return data.mgrInsert_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_CURR_COMM1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
                        $datas: [I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
                    ) {
                        mgrUpdate_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
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
            return data.mgrUpdate_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_CURR_COMM1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
                        $datas: [I_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1!]!
                    ) {
                        mgrDelete_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1(
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
            return data.mgrDelete_S0218_EXCHANGE_RATE_RECORD_EDT_KCD_CURR_COMM1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_CURR_COMM

    async mgrQueryTBL_KCD_CURR_COMM(argQRY_KCD_CURR_COMM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_CURR_COMM(
                        $data: I_S0218_EXCHANGE_RATE_RECORD_QRY_KCD_CURR_COMM!
                    ) {
                        mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM(
                            data: $data
                        ) {
                            START_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_CURR_COMM,
                },
            });
            console.log(
                "marQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM:" +
                    data.mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM
                        .length,
            );
            return data.mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_CURR_COMM1

    async mgrQueryTBL_KCD_CURR_COMM1(argQRY_KCD_CURR_COMM1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_CURR_COMM1(
                        $data: I_S0218_EXCHANGE_RATE_RECORD_QRY_KCD_CURR_COMM!
                    ) {
                        mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1(
                            data: $data
                        ) {
                            CD_FLAG
                            CURR_CD
                            START_DATE
                            CURR_AMT
                            USD_RATE
                            CD_CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_CURR_COMM1,
                },
            });
            console.log(
                "marQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1:" +
                    data.mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1
                        .length,
            );
            return data.mgrQuery_S0218_EXCHANGE_RATE_RECORD_TBL_KCD_CURR_COMM1;
        } catch (e) {
            return e;
        }
    }
}
