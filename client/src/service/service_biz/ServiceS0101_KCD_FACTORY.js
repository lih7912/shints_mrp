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

export class ServiceS0101_KCD_FACTORY {
    // SERVICE: EDT_KCD_FACTORY

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KCD_FACTORY(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
                        $datas: [I_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
                    ) {
                        mgrInsert_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
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
            return data.mgrInsert_S0101_KCD_FACTORY_EDT_KCD_FACTORY;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_FACTORY(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
                        $datas: [I_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
                    ) {
                        mgrUpdate_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
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
            return data.mgrUpdate_S0101_KCD_FACTORY_EDT_KCD_FACTORY;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_FACTORY(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
                        $datas: [I_S0101_KCD_FACTORY_EDT_KCD_FACTORY!]!
                    ) {
                        mgrDelete_S0101_KCD_FACTORY_EDT_KCD_FACTORY(
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
            console.log(data);
            return data.mgrDelete_S0101_KCD_FACTORY_EDT_KCD_FACTORY;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_FACTORY

    async mgrQueryTBL_KCD_FACTORY(argQRY_KCD_FACTORY) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_FACTORY(
                        $data: I_S0101_KCD_FACTORY_QRY_KCD_FACTORY!
                    ) {
                        mgrQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY(
                            data: $data
                        ) {
                            id
                            FACTORY_CD
                            FACTORY_NAME
                            USER_NAME
                            EMAIL
                            TEL_NO
                            FAX_NO
                            NAT_NAME
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            PORT
                            AIRPORT
                            STATUS_NAME
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_FACTORY,
                },
            });
            console.log(
                "marQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY:" +
                    data.mgrQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY.length,
            );
            return data.mgrQuery_S0101_KCD_FACTORY_TBL_KCD_FACTORY;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_FACTORY

    async mgrQueryTBL_KCD_FACTORY_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query ExampleQuery {
                        mgrQuery_S0101_KCD_FACTORY_CODE {
                            STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            NAT_CD {
                                id
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0101_KCD_FACTORY_CODE:" +
                    data.mgrQuery_S0101_KCD_FACTORY_CODE.STATUS_CD.length,
            );
            return data.mgrQuery_S0101_KCD_FACTORY_CODE;
        } catch (e) {
            return e;
        }
    }
}
