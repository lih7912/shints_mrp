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

export class ServiceS020701_PO_MANAGER {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_PO_MST(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020701_5(
                        $datas: I_S020701_5_1!
                        $datas1: [I_S020701_5_2!]!
                    ) {
                        mgrInsert_S020701_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            console.log(
                "mgrInsert_S020701_5 call succeed: " + data.mgrInsert_S020701_5,
            );
            return data.mgrInsert_S020701_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_REMOVE_ORDER(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020701_5_REMOVE_ORDER(
                        $datas: I_S020701_5_1!
                        $datas1: [I_S020701_5_2!]!
                    ) {
                        mgrInsert_S020701_5_REMOVE_ORDER(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            return data.mgrInsert_S020701_5_REMOVE_ORDER;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_ADD_ORDER(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020701_5_ADD_ORDER(
                        $datas: I_S020701_5_1!
                        $datas1: [I_S020701_5_2!]!
                    ) {
                        mgrInsert_S020701_5_ADD_ORDER(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            return data.mgrInsert_S020701_5_ADD_ORDER;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_PO_MST(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020701_5(
                        $datas: I_S020701_5_1!
                        $datas1: [I_S020701_5_2!]!
                    ) {
                        mgrUpdate_S020701_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            // console.log("mgrInsert_S020701_5 call succeed: " + data.mgrInsert_S020701_5);
            return data.mgrUpdate_S020701_5;
        } catch (e) {
            // console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_PO_MST(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020701_5(
                        $datas: I_S020701_5_1!
                        $datas1: [I_S020701_5_2!]!
                    ) {
                        mgrDelete_S020701_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            // console.log("mgrInsert_S020701_5 call succeed: " + data.mgrInsert_S020701_5);
            return data.mgrDelete_S020701_5;
        } catch (e) {
            // console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KCD_VENDOR

    async mgrQuery_CODE(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_1_CODE {
                        mgrQueryS020701_1_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PI_ORIGIN {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            STATUS_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TOLENCE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PART_SHIP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TRANS_SHIP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS020701_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_2_1($data: I_S020701_2_1!) {
                        mgrQueryS020701_2_1(data: $data) {
                            PO_STATUS_NAME
                            PO_STATUS
                            PO_SEQ
                            BUYER_NAME
                            BUYER_CD
                            PO_TYPE_NAME
                            PO_TYPE
                            PO_CD
                            TARGET_ETA
                            REG_DATETIME
                            REG_USER
                            UPD_DATETIME
                            UPD_USER
                            FACTORY_CD
                            FACTORY_NAME
                            MATL_DUE_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS020701_2_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_4_1($data: I_S020701_4_1!) {
                        mgrQueryS020701_4_1(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                            REG_USER
                            REG_DATETIME
                            ORDER_STATUS_NAME 
                            ORDER_STATUS 
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS020701_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_4_2($data: I_S020701_4_2!) {
                        mgrQueryS020701_4_2(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS020701_4_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_4_3($data: I_S020701_4_3!) {
                        mgrQueryS020701_4_3(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS020701_4_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_4(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS020701_4_4($data: I_S020701_4_4!) {
                        mgrQueryS020701_4_4(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS020701_4_4;
        } catch (e) {
            return e;
        }
    }
}
