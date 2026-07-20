/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS040501_COMBINED_PO_MANAGER {
    // SERVICE: TBL_KSV_PO_MEM

    async mgrQuery_PU_POOL(argQRY_KSV_PO_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040501_1($data: I_S040501_1!) {
                        mgrQueryS040501_1(data: $data) {
                            BUYER_CD
                            PO_CD
                            PO_SEQ
                            VENDOR_NAME
                            COL1
                            PU_CD
                            BUYER_NAME
                            VENDOR_CD
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MEM,
                },
            });
            console.log("mgrQueryS040501_1:" + data.mgrQueryS040501_1.length);
            return data.mgrQueryS040501_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MEM1

    async mgrQueryTBL_KSV_PO_MST(argQRY_KSV_PO_MEM1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040501_1_sub($data: I_S040501_1_sub!) {
                        mgrQueryS040501_1_sub(data: $data) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_QTY
                            MRP_SEQ
                            VENDOR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MEM1,
                },
            });
            console.log(
                "mgrQueryS040501_1_sub:" + data.mgrQueryS040501_1_sub.length,
            );
            return data.mgrQueryS040501_1_sub;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MEM2

    async mgrQuery_PU_MST(argQRY_KSV_PO_MEM2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040501_2_1($data: I_S040501_2_1!) {
                        mgrQueryS040501_2_1(data: $data) {
                            PU_CD
                            BUYER_NAME
                            VENDOR_NAME
                            PU_DATE
                            BUYER_CD
                            VENDOR_CD
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MEM2,
                },
            });
            console.log(
                "mgrQueryS040501_2_1:" + data.mgrQueryS040501_2_1.length,
            );
            return data.mgrQueryS040501_2_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MEM3

    async mgrQuery_PU_MEM(argQRY_KSV_PO_MEM3) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040501_2_sub($data: I_S040501_2_sub!) {
                        mgrQueryS040501_2_sub(data: $data) {
                            PO_CD
                            PO_SEQ
                            PU_CD
                            VENDOR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MEM3,
                },
            });
            console.log(
                "mgrQueryS040501_2_sub:" + data.mgrQueryS040501_2_sub.length,
            );
            return data.mgrQueryS040501_2_sub;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MEM4

    async mgrQuery_CODE(argQRY_KSV_PO_MEM4) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040501_CODE($data: I_S040501_1!) {
                        mgrQueryS040501_CODE(data: $data) {
                            PU_CD {
                                PU_CD
                                VENDOR_CD
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MEM4,
                },
            });
            console.log(
                "mgrQueryS040501_CODE:" + data.mgrQueryS040501_CODE.length,
            );
            return data.mgrQueryS040501_CODE;
        } catch (e) {
            return e;
        }
    }
}
