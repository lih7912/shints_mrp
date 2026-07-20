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

export class ServiceS0607_LC_NEGO {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsert_INSERT_LC_NEGO(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0607_5_INSERT_NEGO(
                        $datas1: I_S0607_5_1!
                    ) {
                        mgrInsert_S0607_5_INSERT_NEGO(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argRetArray,
                },
            });
            return data.mgrInsert_S0607_5_INSERT_NEGO;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_UPDATE_LC_NEGO(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0607_5_UPDATE_NEGO(
                        $datas1: I_S0607_5_1!
                    ) {
                        mgrUpdate_S0607_5_UPDATE_NEGO(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argRetArray,
                },
            });
            return data.mgrUpdate_S0607_5_UPDATE_NEGO;
        } catch (e) {
            return e;
        }
    }

    async mgrDelete_DELETE_LC_NEGO(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0607_5_DELETE_NEGO(
                        $datas1: I_S0607_5_1!
                    ) {
                        mgrDelete_S0607_5_DELETE_NEGO(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argRetArray,
                },
            });
            return data.mgrDelete_S0607_5_DELETE_NEGO;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_LC_INVOICE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0607_5_INSERT_INVOICE(
                        $datas1: I_S0607_5_2!
                    ) {
                        mgrInsert_S0607_5_INSERT_INVOICE(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argRetArray,
                },
            });
            return data.mgrInsert_S0607_5_INSERT_INVOICE;
        } catch (e) {
            return e;
        }
    }

    async mgrDelete_DELETE_LC_INVOICE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0607_5_DELETE_INVOICE(
                        $datas1: I_S0607_5_2!
                    ) {
                        mgrDelete_S0607_5_DELETE_INVOICE(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argRetArray,
                },
            });
            return data.mgrDelete_S0607_5_DELETE_INVOICE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0607_CODE($data: I_S0607_1!) {
                        mgrQueryS0607_CODE(data: $data) {
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            INVOICE_NO {
                                INVOICE_NO
                                INVOICE_NAME
                                INVOICE_AMT
                            }
                            BANK_CD {
                                BANK_CD
                                BANK_NAME
                            }
                            INVOICE_NEGO_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0607_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0607_2($data: I_S0607_2!) {
                        mgrQueryS0607_2(data: $data) {
                            REF_NO
                            TOT_AMT
                            BAL_AMT
                            CURR_CD
                            START_DATE
                            END_DATE
                            BILL_DATE
                            DELAY_DAYS
                            DELAY_INTEREST
                            LESS_CHARGE
                            BANK_NAME
                            BANK_CD
                            BUYER_CD
                            BUYER_NAME
                            EXCHANGE_COMM
                            HANDLING_CHARGE
                            POSTAGE
                            AMT_WON
                            AMT_CURR
                            TOT_AMT2
                            INVOICE_NEGO_TYPE_N
                            INVOICE_NEGO_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0607_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0607_3($data: I_S0607_3!) {
                        mgrQueryS0607_3(data: $data) {
                            INVOICE_NO
                            BILL_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0607_3;
        } catch (e) {
            return e;
        }
    }
}
