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

export class ServiceS052001_FACOUT_LIST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: TBL_KSV_STOCK_FACIN
    async mgrInsert_UPDATE_LOCATION(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S052001_5_LOCATION(
                        $datas: [I_S052001_5!]!
                    ) {
                        mgrUpdate_S052001_5_LOCATION(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S052001_5_LOCATIOn;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_CANCEL_FACOUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S052001_5_CANCEL(
                        $datas: [I_S052001_5!]!
                    ) {
                        mgrInsert_S052001_5_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S052001_5_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS052001_CODE($data: I_S052001_1!) {
                        mgrQueryS052001_CODE(data: $data) {
                            VENDOR_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS052001_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS052001_2($data: I_S052001_2!) {
                        mgrQueryS052001_2(data: $data) {
                            PO_CD
                            OUT_DATE
                            ORDER_CD
                            VENDOR_NAME
                            MATL_CD
                            OUT_QTY0
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            remark
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            PURPOSE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS052001_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS052001_3($data: I_S052001_3!) {
                        mgrQueryS052001_3(data: $data) {
                            PO_CD
                            IN_DATE
                            DELIVERY
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            COL2
                            IN_QTY
                            ERR_QTY
                            LOCATION
                            MATL_CD
                            VENDOR_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS052001_3;
        } catch (e) {
            return e;
        }
    }
}
