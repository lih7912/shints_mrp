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

export class ServiceS0513_SHIPPING_LIST {
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
                    mutation MgrInsert_S0513_5(
                        $datas: [I_S0513_5!]!
                        $datas1: I_S0513_5_1!
                    ) {
                        mgrInsert_S0513_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0513_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_CHECK_REMOVE_ORDER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0513_5_CHECK_REMOVE_ORDER(
                        $datas: I_S0513_5_CHECK_REMOVE_ORDER!
                    ) {
                        mgrInsert_S0513_5_CHECK_REMOVE_ORDER(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0513_5_CHECK_REMOVE_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_REMOVE_ORDER_SHIP(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0513_5_REMOVE_ORDER(
                        $datas: [I_S0513_5_REMOVE_ORDER!]!
                        $datas1: I_S0513_5_1!
                    ) {
                        mgrInsert_S0513_5_REMOVE_ORDER(
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
            return data.mgrInsert_S0513_5_REMOVE_ORDER;
        } catch (e) {
            return e;
        }
    }

    async mgrDelete_DELETE_ORDER_SHIP(argData, argData1) {
        console.log("INSERT_ORDER_SHI");
        console.log(argData);
        console.log(argData1);

        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0513_5(
                        $datas: [I_S0513_5!]!
                        $datas1: I_S0513_5_1!
                    ) {
                        mgrDelete_S0513_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrDelete_S0513_5;
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
                    query MgrQueryS0513_CODE($data: I_S0513_1!) {
                        mgrQueryS0513_CODE(data: $data) {
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
                            PAYMENT_TYPE {
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
            return data.mgrQueryS0513_CODE;
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
                    query MgrQueryS0513_2($data: I_S0513_2!) {
                        mgrQueryS0513_2(data: $data) {
                            REC_COUNT
                            INVOICE_NO
                            BL_NO
                            ORDER_CD
                            BUYER_CD
                            SHIP_DATE
                            NAT_CD
                            NAT_NAME
                            SHIP_PTYPE
                            EXFACTORY
                            DELIVERY_TYPE
                            SHIP_QTY
                            ORDER_QTY
                            BUYER_NAME
                            BL_FILE
                            BL_FILE_URL
                            PL_FILE
                            PL_FILE_URL
                            CI_FILE
                            CI_FILE_URL
                            OTHER_FILE
                            OTHER_FILE_URL
                            BL_FILE2
                            BL_FILE_URL2
                            PL_FILE2
                            PL_FILE_URL2
                            CI_FILE2
                            CI_FILE_URL2
                            OTHER_FILE2
                            OTHER_FILE_URL2
                            DELIVERY_TYPE_N
                            SHIP_MODE_N
                            SHIP_AMOUNT
                            DOCU_NO
                            COMPLETE
                            ATD
                            PAYMENT_TYPE
                            PAYMENT_NAME
                            BILL_AMT
                            OA_NEGO
                            ADJ_AMT
                            ORD_AMT
                            TOT_AMT
                            IS_NON_GARMENT
                            FACTORY_CD 
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_2;
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
                    query MgrQueryS0513_3($data: I_S0513_3!) {
                        mgrQueryS0513_3(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            COLOR
                            PRICE
                            TOT_CNT
                            PROD_CNT
                            SHIP_CNT
                            ORDER_SIZE_CNT
                            PRICE_CNT
                            SHIP_SIZE_CNT
                            TOT_SHIP_SIZE_CNT
                            SIZE_GROUP
                            SIZE_MEMBER
                            CURR_CD
                            SHIP_PRICE
                            SHIP_PRICE2
                            SHIP_AMOUNT
                            STYLE_NAME
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_1(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0513_3_1($data: [I_S0513_3_1!]!) {
                        mgrQueryS0513_3_1(data: $data) {
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            COLOR
                            PRICE
                            TOT_CNT
                            PROD_CNT
                            SHIP_CNT
                            ORDER_SIZE_CNT
                            SHIP_SIZE_CNT
                            TOT_SHIP_SIZE_CNT
                            SIZE_GROUP
                            SIZE_MEMBER
                            CURR_CD
                            SHIP_PRICE
                            SHIP_AMOUNT
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_2(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0513_2_2($data: I_S0513_2_2!) {
                        mgrQueryS0513_2_2(data: $data) {
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            SHIP_QTY
                            FOB
                            SALES_PRICE
                            SHIP_PRICE
                            TOT_AMT
                            FACTORY_NAME
                            INVOICE_NO
                            SEQ
                            SHIP_DATE
                            NAT_CD
                            COUNTRY
                            CURR_CD
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0513_2_2;
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
                    query MgrQueryS0513_4($data: I_S0513_4!) {
                        mgrQueryS0513_4(data: $data) {
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
                            CURR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_4;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0513_4_EXCEL($data: I_S0513_2!) {
                        mgrQueryS0513_4_EXCEL(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_4_EXCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_BY_INVOICE(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0513_4_EXCEL_BY_INVOICE($data: I_S0513_2!) {
                        mgrQueryS0513_4_EXCEL_BY_INVOICE(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_4_EXCEL_BY_INVOICE;
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
                    query MgrQueryS0513_4($data: I_S0513_4!) {
                        mgrQueryS0513_4(data: $data) {
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
                            CURR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0513_4;
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
                    mutation MgrInsert_S0513_FILE_ADD(
                        $datas: I_S0513_FILE_INFO!
                    ) {
                        mgrInsert_S0513_FILE_ADD(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0513_FILE_ADD;
        } catch (e) {
            return e;
        }
    }
}
