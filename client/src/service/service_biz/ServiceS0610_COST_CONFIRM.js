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

export class ServiceS0610_COST_CONFIRM {
    // SERVICE: TBL_KSV_STOCK_FACIN

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_COST_CONFIRM(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0610_5(
                        $datas: [I_S0610_5!]!
                        $datas1: I_S0610_5_1!
                    ) {
                        mgrInsert_S0610_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0610_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_COST_CANCEL(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0610_5_CANCEL(
                        $datas: [I_S0610_5!]!
                        $datas1: I_S0610_5_1!
                    ) {
                        mgrInsert_S0610_5_CANCEL(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0610_5_CANCEL;
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
                    query MgrQueryS0610_CODE($data: I_S0610_1!) {
                        mgrQueryS0610_CODE(data: $data) {
                            TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            BUYER_TEAM {
                                CD_CODE
                                CD_NAME
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0610_CODE;
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
                    query MgrQueryS0610_2($data: I_S0610_2!) {
                        mgrQueryS0610_2(data: $data) {
                            id
                            BUYER_CD
                            COST_DATE
                            PO_CD
                            SHIPMENT_CD
                            INVOICE_NO
                            TYPE
                            TYPE2
                            COST_CURR
                            COST_AMT
                            REG_USER
                            CONFIRM_USER
                            CONFIRM_DATE
                            MATL_NAME
                            MATL_CD
                            BL_NO
                            BL_NO1
                            ETD
                            SHIP_DATE
                            SHIP_DATE1
                            VENDOR_NAME
                            VENDOR_CD
                            PU_CD
                            STSIN_CD
                            DETAIL
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0610_2;
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
                    query MgrQueryS0610_3($data: I_S0610_3!) {
                        mgrQueryS0610_3(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            COLOR
                            PRICE
                            TOT_CNT
                            SHIP_CNT
                            ORDER_SIZE_CNT
                            SHIP_SIZE_CNT
                            SIZE_GROUP
                            SIZE_MEMBER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0610_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0610_4($data: I_S0610_4!) {
                        mgrQueryS0610_4(data: $data) {
                            ORDER_CD
                            PROD_CD
                            COLOR
                            PRICE
                            TOT_CNT
                            ORDER_SIZE_CNT
                            SHIP_CNT
                            SHIP_SIZE_CNT
                            SIZE_GROUP
                            SIZE_MEMBER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0610_4;
        } catch (e) {
            return e;
        }
    }
}
