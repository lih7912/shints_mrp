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

export class ServiceS030302_COPY_STYLE {
    // SERVICE: TBL_KCD_STYLE

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KSV_PROD_MEM(argRetArray, argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030302_COPY_STYLE_EDT_KSV_PROD_MEM(
                        $data: I_S030302_COPY_STYLE_SAVE_KEY!
                        $datas: [I_S030302_COPY_STYLE_EDT_KSV_PROD_MEM!]!
                    ) {
                        mgrInsert_S030302_COPY_STYLE_EDT_KSV_PROD_MEM(
                            data: $data
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S030302_COPY_STYLE_EDT_KSV_PROD_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_STYLE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE(
                        $data: I_S030302_COPY_STYLE_QRY_KCD_STYLE!
                    ) {
                        mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE(data: $data) {
                            STYLE_NAME
                            STYLE_CD
                            BUYER_NAME
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "marQuery_S030302_COPY_STYLE_TBL_KCD_STYLE:" +
                    data.mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE.length,
            );
            return data.mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_STYLE_SRC(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE_SRC(
                        $data: I_S030302_COPY_STYLE_QRY_KCD_STYLE!
                    ) {
                        mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE_SRC(
                            data: $data
                        ) {
                            STYLE {
                                STYLE_CD
                                STYLE_NAME
                                BUYER_CD
                                MW
                                EMBRO
                                TP
                                SP
                                LTHR
                                G
                                W
                                S
                                FND
                                DL
                                DOWN
                                CUT
                                KIND
                                BVT_KIND
                                YY
                                SEQ
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                TPR
                                EMBOSSING
                                WASHING
                                style_kname
                                ss_direct_rate
                                ss_extra_rate
                                ss_retail_rate
                                ss_web_rate
                                ss_nsr_rate
                                ss_webex_rate
                                minus_limit
                                in_exp_date
                                FTP
                                DTP
                                LAZE
                                id
                            }
                            PROD_MST {
                                PROD_CD
                                STYLE_CD
                                PROD_TYPE
                                COLOR
                                PROD_UNIT
                                COLLECTION
                                YY
                                SEQ
                                SIZE_LOSS
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "marQuery_S030302_COPY_STYLE_TBL_KCD_STYLE:" +
                    data.mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE_SRC.PROD_MST
                        .length,
            );
            return data.mgrQuery_S030302_COPY_STYLE_TBL_KCD_STYLE_SRC;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PROD_MEM

    async mgrQueryTBL_KSV_PROD_MEM(argQRY_KSV_PROD_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MEM(
                        $data: I_S030302_COPY_STYLE_QRY_KSV_PROD_MEM!
                    ) {
                        mgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MEM(
                            data: $data
                        ) {
                            MATL_TYPE2
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            ADD_LOSS
                            USE_SIZE
                            REMARK
                            BVT_REMARK
                            COUNTRY
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            VENDOR_NAME
                            VENDOR_CD
                            SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MEM,
                },
            });
            console.log(
                "marQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MEM:" +
                    data.mgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MEM.length,
            );
            return data.mgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MRP(argQRY_KSV_PROD_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030302_COPY_STYLE_TBL_KSV_ORDER_MRP(
                        $data: I_S030302_COPY_STYLE_QRY_KSV_ORDER_MRP!
                    ) {
                        mgrQuery_S030302_COPY_STYLE_TBL_KSV_ORDER_MRP(
                            data: $data
                        ) {
                            MATL_TYPE2
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            ADD_LOSS
                            USE_SIZE
                            REMARK
                            BVT_REMARK
                            COUNTRY
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            VENDOR_NAME
                            VENDOR_CD
                            SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MEM,
                },
            });
            return data.mgrQuery_S030302_COPY_STYLE_TBL_KSV_ORDER_MRP;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PROD_MST

    async mgrQueryTBL_KSV_PROD_MST(argQRY_KSV_PROD_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MST(
                        $data: I_S030302_COPY_STYLE_QRY_KSV_PROD_MST!
                    ) {
                        mgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MST(
                            data: $data
                        ) {
                            PROD_TYPE_NAME
                            COLOR
                            COLLECTION
                            PROD_UNIT
                            PROD_CD
                            PROD_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MST,
                },
            });
            console.log(
                "marQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MST:" +
                    data.mgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MST.length,
            );
            return data.mgrQuery_S030302_COPY_STYLE_TBL_KSV_PROD_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_SEARCH_ORDER_MRP(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030302_SEARCH_ORDER_MRP(
                        $data: I_S030302_SEARCH_ORDER_MRP!
                    ) {
                        mgrQuery_S030302_SEARCH_ORDER_MRP(data: $data) {
                            ORDER_CD
                            PROD_CD
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S030302_SEARCH_ORDER_MRP;
        } catch (e) {
            return e;
        }
    }
}
