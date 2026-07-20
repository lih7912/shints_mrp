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

export class ServiceS0531_PENDDING_SHIPMENT {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_INSERT_PENDING(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0531_5_UPDATE_PENDING(
                        $datas: [I_S0531_5!]!
                    ) {
                        mgrInsert_S0531_5_UPDATE_PENDING(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0531_5_UPDATE_PENDING;
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
                    query MgrQueryS0531_CODE($data: I_S0531_1!) {
                        mgrQueryS0531_CODE(data: $data) {
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
            return data.mgrQueryS0531_CODE;
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
                    query MgrQueryS0531_2($data: I_S0531_2!) {
                        mgrQueryS0531_2(data: $data) {
                            END_DATE
                            PENDING_DAYS
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            TOT_CNT
                            SHIP_QTY
                            BAL_QTY
                            CURR_CD
                            ORDER_PRICE
                            PENDING_AMT
                            REMARK
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0531_2;
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
                    query MgrQueryS0531_3($data: I_S0531_3!) {
                        mgrQueryS0531_3(data: $data) {
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
            return data.mgrQueryS0531_3;
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
                    query MgrQueryS0531_4($data: I_S0531_4!) {
                        mgrQueryS0531_4(data: $data) {
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
            return data.mgrQueryS0531_4;
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
                    mutation MgrInsert_S0531_FILE_ADD(
                        $datas: I_S0531_FILE_INFO!
                    ) {
                        mgrInsert_S0531_FILE_ADD(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0531_FILE_ADD;
        } catch (e) {
            return e;
        }
    }
}
