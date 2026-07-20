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

export class ServiceS0517_STOCK_HISTORY {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: TBL_KSV_STOCK_MATL

    async mgrUpdate_MATL_CD(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0517_5_MATL_CD($datas: I_S0517_5!) {
                        mgrUpdate_S0517_5_MATL_CD(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0517_5_MATL_CD;
        } catch (e) {
            console.log("async mgrUpdate_MATL_CD call error: ");
            return e;
        }
    }

    async mgrUpdate_BUYER_CD(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0517_5_BUYER_CD($datas: I_S0517_5!) {
                        mgrUpdate_S0517_5_BUYER_CD(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0517_5_BUYER_CD;
        } catch (e) {
            console.log("async mgrUpdate_BUYER_CD call error: ");
            return e;
        }
    }

    async mgrUpdate_REMARK(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0517_5_REMARK($datas: I_S0517_5_REMARK!) {
                        mgrUpdate_S0517_5_REMARK(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0517_5_REMARK;
        } catch (e) {
            console.log("async mgrUpdate_REMARK call error: ", e);
            return e;
        }
    }

    async mgrUpdate_QTY(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0517_5_QTY($datas: I_S0517_5_QTY!) {
                        mgrUpdate_S0517_5_QTY(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0517_5_QTY;
        } catch (e) {
            console.log("async mgrUpdate_QTY call error: ", e);
            return e;
        }
    }

    async mgrUpdate_PO_ORDER(argInputData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0517_5_PO_ORDER($datas: I_S0517_5_PO_ORDER!) {
                        mgrUpdate_S0517_5_PO_ORDER(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0517_5_PO_ORDER;
        } catch (e) {
            console.log("async mgrUpdate_PO_ORDER call error: ", e);
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_STOCK_MATL) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0517_CODE($data: I_S0517_1!) {
                        mgrQueryS0517_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PO_CD {
                                PO_CD
                            }
                            ORDER_CD {
                                ORDER_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL,
                },
            });
            return data.mgrQueryS0517_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_MATL) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0517_2($data: I_S0517_2!) {
                        mgrQueryS0517_2(data: $data) {
                            DATAS {
                                STOCK_IDX
                                ORG_STOCK_IDX
                                PO_CD
                                ORDER_CD
                                MATL_CD
                                STOCK_DATE
                                REG_DATETIME
                                STOCK_STATUS_S_N
                                STOCK_STATUS_2
                                STOCK_QTY
                                REMAIN_QTY
                                USE_QTY
                                USE_QTY2
                                OUT_QTY
                                REG_USER
                                REMARK
                                USE_PO_CD
                                USE_PO_SEQ
                                USE_ORDER_CD
                                USE_DATETIME
                            }

                            INFO {
                                MATL_CD
                                STOCK_IDX
                                VENDOR_NAME
                                PO_CD
                                ORDER_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                BUYER_CD
                                STOCK_QTY
                                REMAIN_QTY
                                USE_QTY
                                OUT_QTY
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL,
                },
            });
            return data.mgrQueryS0517_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_EXCEL(argQRY_KSV_STOCK_MATL) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0517_2_EXCEL_PRINT($data: I_S0517_2!) {
                        mgrQueryS0517_2_EXCEL_PRINT(data: $data) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_MATL,
                },
                fetchPolicy: "no-cache",
            });
            return data.mgrQueryS0517_2_EXCEL_PRINT;
        } catch (e) {
            return e;
        }
    }
}
