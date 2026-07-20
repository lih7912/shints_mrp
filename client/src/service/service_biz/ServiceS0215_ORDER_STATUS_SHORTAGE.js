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

export class ServiceS0215_ORDER_STATUS_SHORTAGE {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_STS_END(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0215_STS_END($datas: [I_S0215_5!]!) {
                        mgrUpdate_S0215_STS_END(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0215_STS_END;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_STS_SAVE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0215_STS_SAVE($datas: [I_S0215_5!]!) {
                        mgrInsert_S0215_STS_SAVE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0215_STS_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_STS_CANCEL(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0215_STS_CANCEL($datas: [I_S0215_5!]!) {
                        mgrInsert_S0215_STS_CANCEL(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0215_STS_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BVT_SAVE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0215_BVT_SAVE($datas: [I_S0215_5!]!) {
                        mgrInsert_S0215_BVT_SAVE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0215_BVT_SAVE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST
    async mgrQueryTBL_KSV_ORDER_MST_CODE(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query ORDER_DATE {
                        mgrQuery_S0215_ORDER_STATUS_SHORTAGE_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            END_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            SHIP_DATE {
                                CD_CODE
                                CD_NAME
                            }
                            BUYER_TEAM {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "mgrQuery_S0215_ORDER_STATUS_SHORTAGE_CODE:" +
                    data.mgrQuery_S0215_ORDER_STATUS_SHORTAGE_CODE.BUYER_CD
                        .length,
            );
            return data.mgrQuery_S0215_ORDER_STATUS_SHORTAGE_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MST(
                        $data: I_S0215_ORDER_STATUS_SHORTAGE_QRY_KSV_ORDER_MST!
                    ) {
                        mgrQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            SHIP_CNT
                            BAL
                            AGREED_QTY1
                            AGREED_QTY2
                            AGREED_QTY3
                            SHIP_DATE
                            CONF
                            CONFIRM_AMT
                            U_PRICE
                            FC_PRICE
                            ORDER_STATUS_N
                            STS_REMARK
                            FACTORY_REMARK
                            CHARGED_SUP
                            CHARGED_BUYER
                            CHARGED_STS
                            REMARK
                            END_FLAG
                            END_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "marQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST
                        .length,
            );
            return data.mgrQuery_S0215_ORDER_STATUS_SHORTAGE_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryS0215_2($data: I_S0215_2!) {
                        mgrQueryS0215_2(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            TOT_CNT
                            SHIP_CNT
                            DIFF_CNT
                            VMD_QTY
                            VMD_SUB_QTY
                            SMD_QTY
                            MAX_SHIP_DATE
                            CONFIRM_USER
                            CONFIRM_AMT
                            USD_PRICE
                            FC_PRICE
                            ORDER_STATUS_NAME
                            STS_COMMENT
                            BVT_COMMENT
                            SUP_QTY
                            BUYER_QTY
                            STS_QTY
                            REMARK
                            END_FLAG
                            END_DATE
                            ORDER_END_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQueryS0215_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_REPORT(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryS0215_EXCEL_REPORT($data: I_S0215_2!) {
                        mgrQueryS0215_EXCEL_REPORT(data: $data) {
                            id
                            CODE
                            FILE_NAME
                            URL
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            return data.mgrQueryS0215_EXCEL_REPORT;
        } catch (e) {
            return e;
        }
    }
}
