/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import apolloOption_neoe from "../../assets/env_graphql_neoe";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0112_KCD_CURRENCY {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_NEOE_CURRENCY(argData) {
        apolloOption_neoe.cache = new InMemoryCache();
        const client_neoe = new ApolloClient(apolloOption_neoe);

        try {
            const { loading, error, data } = await client_neoe.query({
                query: gql`
                    query MgrQueryneoe_currency($data: I_neoe_currency!) {
                        mgrQueryneoe_currency(data: $data) {
                            CURR_SOUR
                            RATE_BASE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryneoe_currency;
        } catch (e) {
            return e;
        }
    }

    async mgrInsertEDT_KCD_CURRENCY(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
                        $datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
                    ) {
                        mgrInsert_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
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
            return data.mgrInsert_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_CURRENCY(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
                        $datas: [I_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY!]!
                    ) {
                        mgrDelete_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY(
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
            return data.mgrDelete_S0112_KCD_CURRENCY_EDT_KCD_CURRENCY;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_CURRENCY

    async mgrQueryTBL_KCD_CURRENCY_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0112_KCD_CURRENCY_CODE {
                        mgrQuery_S0112_KCD_CURRENCY_CODE {
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0112_KCD_CURRENCY_CODE:" +
                    data.mgrQuery_S0112_KCD_CURRENCY_CODE.CURR_CD.length,
            );
            return data.mgrQuery_S0112_KCD_CURRENCY_CODE;
        } catch (e) {
            console.log("mgrQuery_S0112_KCD_CURRENCY_CODE Error:" + e.message);
            return e;
        }
    }

    async mgrQueryTBL_KCD_CURRENCY(argQRY_KCD_CURRENCY) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_CURRENCY(
                        $data: I_S0112_KCD_CURRENCY_QRY_KCD_CURRENCY!
                    ) {
                        mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY(
                            data: $data
                        ) {
                            CURR_CD
                            START_DATE
                            USD_RATE
                            WON_AMT
                            WON_AMT2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_CURRENCY,
                },
            });
            console.log(
                "marQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY:" +
                    data.mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY.length,
            );
            return data.mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY;
        } catch (e) {
            return e;
        }
    }
    // SERVICE: TBL_KCD_CURRENCY2

    async mgrQueryTBL_KCD_CURRENCY2(argQRY_KCD_CURRENCY2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_CURRENCY2(
                        $data: I_S0112_KCD_CURRENCY_QRY_KCD_CURRENCY2!
                    ) {
                        mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2(
                            data: $data
                        ) {
                            CURR_CD
                            START_DATE
                            USD_RATE
                            WON_AMT
                            WON_AMT2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_CURRENCY2,
                },
            });
            console.log(
                "marQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2:" +
                    data.mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2.length,
            );
            return data.mgrQuery_S0112_KCD_CURRENCY_TBL_KCD_CURRENCY2;
        } catch (e) {
            return e;
        }
    }
}
