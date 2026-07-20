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

export class ServiceS0108_KCD_PLACE {
    // SERVICE: EDT_KCD_PLACE

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KCD_PLACE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0108_KCD_PLACE_EDT_KCD_PLACE(
                        $datas: [I_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
                    ) {
                        mgrInsert_S0108_KCD_PLACE_EDT_KCD_PLACE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0108_KCD_PLACE_EDT_KCD_PLACE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_PLACE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0108_KCD_PLACE_EDT_KCD_PLACE(
                        $datas: [I_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
                    ) {
                        mgrUpdate_S0108_KCD_PLACE_EDT_KCD_PLACE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0108_KCD_PLACE_EDT_KCD_PLACE;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_PLACE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0108_KCD_PLACE_EDT_KCD_PLACE(
                        $datas: [I_S0108_KCD_PLACE_EDT_KCD_PLACE!]!
                    ) {
                        mgrDelete_S0108_KCD_PLACE_EDT_KCD_PLACE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0108_KCD_PLACE_EDT_KCD_PLACE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_PLACE

    async mgrQueryTBL_KCD_PLACE(argQRY_KCD_PLACE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_PLACE(
                        $data: I_S0108_KCD_PLACE_QRY_KCD_PLACE!
                    ) {
                        mgrQuery_S0108_KCD_PLACE_TBL_KCD_PLACE(data: $data) {
                            id
                            PLACE_CD
                            PLACE_NAME
                            USER_NAME
                            TEL_NO
                            EMAIL
                            STATUS_NAME
                            STATUS_CD
                            PLACE_TYPE
                            PLACE_TYPE_NAME
                            DELIVERY_TYPE
                            DELIVERY_TYPE_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_PLACE,
                },
            });
            console.log(
                "marQuery_S0108_KCD_PLACE_TBL_KCD_PLACE:" +
                    data.mgrQuery_S0108_KCD_PLACE_TBL_KCD_PLACE.length,
            );
            return data.mgrQuery_S0108_KCD_PLACE_TBL_KCD_PLACE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_PLACE_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query ExampleQuery {
                        mgrQuery_S0108_KCD_PLACE_CODE {
                            STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            PLACE_TYPE {
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
                "mgrQuery_S0108_KCD_PLACE_CODE:" +
                    data.mgrQuery_S0108_KCD_PLACE_CODE.STATUS_CD.length,
            );
            return data.mgrQuery_S0108_KCD_PLACE_CODE;
        } catch (e) {
            return e;
        }
    }
}
