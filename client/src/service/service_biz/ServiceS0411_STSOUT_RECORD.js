/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0411_STSOUT_RECORD {
    // SERVICE: EDT_KSV_STOCK_OUT
    async mgrInsert_OUTPUT_STOCK_OUT(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0411_5(
                        $datas: [I_S0411_5!]!
                        $datas1: I_S0411_5_1!
                    ) {
                        mgrInsert_S0411_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0411_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_OUTPUT_STOCK_OUT2(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0411_6(
                        $datas: [I_S0411_6!]!
                        $datas1: I_S0411_6_1!
                    ) {
                        mgrInsert_S0411_6(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0411_6;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT(
                        $datas: [I_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrUpdate_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT(
                        $datas: [I_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrDelete_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0411_STSOUT_RECORD_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_OUT
    async mgrQuery_CODE(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0411_CODE($data: I_S0411_1_1!) {
                        mgrQueryS0411_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CHARGE1 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DELIVERY_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            FROM_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            OUT_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_CD
                            }
                            REASON_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            RECEIVER {
                                RECEIVER_ID
                                USER_NAME
                                FACTORY_CD
                                id
                            }
                            USER_ID {
                                USER_ID
                                USER_NAME
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            VENDOR_TYPE {
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
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log(
                "mgrQueryS0411_CODE:" + data.mgrQueryS0411_CODE.PO_CD.length,
            );
            return data.mgrQueryS0411_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE_1(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0411_CODE_1($data: I_S0411_CODE_1!) {
                        mgrQueryS0411_CODE_1(data: $data) {
                            MAX_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log(
                "mgrQueryS0411_CODE:" + data.mgrQueryS0411_CODE_1.MAX_SEQ,
            );
            return data.mgrQueryS0411_CODE_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_STOCK_OUT(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0411_1_1($data: I_S0411_1_1!) {
                        mgrQueryS0411_1_1(data: $data) {
                            PO_CD
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            IN_DATE
                            INFAC_QTY
                            REMAIN_QTY
                            OUT_QTY
                            IN_TYPE_NAME
                            MATL_CD
                            IN_TYPE
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            REG_USER
                            VENDOR_CD
                            VENDOR_TYPE
                            MATL_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log("mgrQueryS0411_1_1:" + data.mgrQueryS0411_1_1.length);
            return data.mgrQueryS0411_1_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_OUT2

    async mgrQueryTBL_KSV_STOCK_OUT2(argQRY_KSV_STOCK_OUT2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0411_1_2($data: I_S0411_1_2!) {
                        mgrQueryS0411_1_2(data: $data) {
                            USE_MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            STOCK_QTY
                            OUT_QTY
                            VENDOR_NAME
                            FACTORY
                            OUTPUT_FLAG
                            STOCK_IDX
                            USE_DATETIME
                            FACTORY_CD
                            USE_PO_CD
                            USE_ORDER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_OUT2,
                },
            });
            console.log("mgrQueryS0411_1_2:" + data.mgrQueryS0411_1_2.length);
            return data.mgrQueryS0411_1_2;
        } catch (e) {
            return e;
        }
    }
}
