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

export class ServiceS0104_KCD_NATION {
    // SERVICE: EDT_KCD_NATION
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KCD_NATION(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0104_KCD_NATION_EDT_KCD_NATION(
                        $datas: [I_S0104_KCD_NATION_EDT_KCD_NATION!]!
                    ) {
                        mgrInsert_S0104_KCD_NATION_EDT_KCD_NATION(
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
            return data.mgrInsert_S0104_KCD_NATION_EDT_KCD_NATION;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_NATION(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0104_KCD_NATION_EDT_KCD_NATION(
                        $datas: [I_S0104_KCD_NATION_EDT_KCD_NATION!]!
                    ) {
                        mgrUpdate_S0104_KCD_NATION_EDT_KCD_NATION(
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
            return data.mgrUpdate_S0104_KCD_NATION_EDT_KCD_NATION;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_NATION(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0104_KCD_NATION_EDT_KCD_NATION(
                        $datas: [I_S0104_KCD_NATION_EDT_KCD_NATION!]!
                    ) {
                        mgrDelete_S0104_KCD_NATION_EDT_KCD_NATION(
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
            return data.mgrDelete_S0104_KCD_NATION_EDT_KCD_NATION;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_NATION

    async mgrQueryTBL_KCD_NATION(argQRY_KCD_NATION) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_NATION(
                        $data: I_S0104_KCD_NATION_QRY_KCD_NATION!
                    ) {
                        mgrQuery_S0104_KCD_NATION_TBL_KCD_NATION(data: $data) {
                            id
                            NAT_CD
                            NAT_NAME
                            STATUS_NAME
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_NATION,
                },
            });
            console.log(
                "marQuery_S0104_KCD_NATION_TBL_KCD_NATION:" +
                    data.mgrQuery_S0104_KCD_NATION_TBL_KCD_NATION.length,
            );
            return data.mgrQuery_S0104_KCD_NATION_TBL_KCD_NATION;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_NATION_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query ExampleQuery {
                        mgrQuery_S0104_KCD_NATION_CODE {
                            STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0104_KCD_NATION_CODE:" +
                    data.mgrQuery_S0104_KCD_NATION_CODE.STATUS_CD.length,
            );
            return data.mgrQuery_S0104_KCD_NATION_CODE;
        } catch (e) {
            return e;
        }
    }
}
