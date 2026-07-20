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

export class ServiceS0530_INVOICE_LIST {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_INSERT_ORDER_SHIP(argData, argData1) {
        console.log("INSERT_ORDER_SHI");
        console.log(argData);
        console.log(argData1);

        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0530_5(
                        $datas: [I_S0530_5!]!
                        $datas1: I_S0530_5_1!
                    ) {
                        mgrInsert_S0530_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0530_5;
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
                    query MgrQueryS0530_CODE($data: I_S0530_1!) {
                        mgrQueryS0530_CODE(data: $data) {
                            NAT_CD {
                                NAT_NAME
                                NAT_CD
                            }
                            DELIVERY_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SHIP_MODE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_NAME
                            }
                            FACTORY_CD {
                                FACTORY_CD
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            STYLE_CD {
                                STYLE_CD
                                STYLE_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0530_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_0(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0530_2_LIST0($data: I_S0530_2!) {
                        mgrQueryS0530_2_LIST0(data: $data) {
                            INVOICE_NO
                            BL_NO
                            EXFACTORY
                            ORDER_CD
                            BUYER_CD
                            SHIP_DATE
                            NAT_CD
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_QTY
                            ORDER_QTY
                            BUYER_NAME
                            BL_FILE
                            BL_FILE_URL
                            PL_FILE
                            PL_FILE_URL
                            DEBIT_FILE
                            DELIVERY_TYPE_N
                            SHIP_MODE_N
                            SHIP_AMOUNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0530_2_LIST0;
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
                    query MgrQueryS0530_2($data: I_S0530_2!) {
                        mgrQueryS0530_2(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            BUYER_CD
                            SHIP_DATE
                            NAT_CD
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_QTY
                            ORDER_QTY
                            BUYER_NAME
                            BL_FILE
                            BL_FILE_URL
                            PL_FILE
                            PL_FILE_URL
                            DEBIT_FILE
                            DELIVERY_TYPE_N
                            SHIP_MODE_N
                            SHIP_AMOUNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0530_2;
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
                    query MgrQueryS0530_3($data: I_S0530_3!) {
                        mgrQueryS0530_3(data: $data) {
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
            return data.mgrQueryS0530_3;
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
                    query MgrQueryS0530_4($data: I_S0530_4!) {
                        mgrQueryS0530_4(data: $data) {
                            ORDER_CD
                            PROD_CD
                            COLOR
                            PRICE
                            TOT_CNT
                            ORDER_SIZE_CNT
                            SHIP_CNT
                            BAL_CNT
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
            return data.mgrQueryS0530_4;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_FILE_ADD(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0530_FILE_ADD(
                        $datas: I_S0530_FILE_INFO!
                    ) {
                        mgrInsert_S0530_FILE_ADD(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0530_FILE_ADD;
        } catch (e) {
            return e;
        }
    }
}
