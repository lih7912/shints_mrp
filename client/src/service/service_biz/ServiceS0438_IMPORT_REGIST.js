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

export class ServiceS0438_IMPORT_REGIST {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_IMPORT_REGIST(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0438_5(
                        $datas: I_S0438_5!
                        $datas1: I_S0438_5_1!
                    ) {
                        mgrInsert_S0438_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0438_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_RETURN(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0438_5_INSERT_RETURN(
                        $datas: I_S0438_5!
                        $datas1: I_S0438_5_1!
                    ) {
                        mgrInsert_S0438_5_INSERT_RETURN(
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
            return data.mgrInsert_S0438_5_INSERT_RETURN;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_END_RETURN(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0438_5_END_RETURN(
                        $datas: I_S0438_5!
                        $datas1: I_S0438_5_1!
                    ) {
                        mgrInsert_S0438_5_END_RETURN(
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
            return data.mgrInsert_S0438_5_END_RETURN;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_EXPORT(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0438_5_INSERT_EXPORT(
                        $datas: I_S0438_5!
                        $datas1: I_S0438_5_1!
                    ) {
                        mgrInsert_S0438_5_INSERT_EXPORT(
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
            return data.mgrInsert_S0438_5_INSERT_EXPORT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_PROCESS_RETURN(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0438_5_PROCESS_RETURN(
                        $datas: I_S0438_5!
                        $datas1: I_S0438_5_1!
                    ) {
                        mgrInsert_S0438_5_PROCESS_RETURN(
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
            return data.mgrInsert_S0438_5_PROCESS_RETURN;
        } catch (e) {
            return e;
        }
    }

    async mgrDelete_IMPORT_CANCEL(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0438_5(
                        $datas: I_S0438_5!
                        $datas1: I_S0438_5_1!
                    ) {
                        mgrDelete_S0438_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrDelete_S0438_5;
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
                    query MgrQueryS0438_CODE($data: I_S0438_1!) {
                        mgrQueryS0438_CODE(data: $data) {
                            KIND {
                                CD_CODE
                                CD_NAME
                            }
                            STATUS_CD {
                                CD_CODE
                                CD_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            CURR_CD {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0438_CODE;
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
                    query MgrQueryS0438_2($data: I_S0438_2!) {
                        mgrQueryS0438_2(data: $data) {
                            KIND
                            FACTORY_NAME
                            STATUS_CD
                            INVOICE_NO
                            BUYER_CD
                            SHIP_DATE
                            NAT_CD
                            NAT_NAME
                            DELIVERY_TYPE
                            BUYER_NAME
                            DELIVERY_TYPE_N
                            LICENSE_NO
                            QTY
                            SHIP_PRICE
                            TOT_AMT
                            ORD_AMT
                            IMP_TOT_AMT
                            IMP_ORD_AMT
                            CURR_CD
                            LICENSE_DATE
                            CONFIRM_USER
                            REMARK
                            IMPORT_FREIGHT_AMT
                            IMPORT_CLEARANCE_AMT
                            IMPORT_DUTY_AMT
                            IMPORT_HANDLING_AMT
                            IMPORT_FREIGHT_AMT1
                            IMPORT_CLEARANCE_AMT1
                            IMPORT_DUTY_AMT1
                            IMPORT_FREIGHT_AMT2
                            IMPORT_CLEARANCE_AMT2
                            IMPORT_DUTY_AMT2
                            DUTY_ITEM
                            RETURN_REMARK
                            DOCU_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0438_2;
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
                    query MgrQueryS0438_3($data: I_S0438_3!) {
                        mgrQueryS0438_3(data: $data) {
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
            return data.mgrQueryS0438_3;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4(argQRY_KSV_STOCK_FACIN) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0438_2_DUTY_MST($data: I_S0438_2_DUTY_MST!) {
                        mgrQueryS0438_2_DUTY_MST(data: $data) {
                            INCOME_NO
                            END_FLAG
                            S_RETURN_AMT
                            RETURN_AMT
                            EXPORT_DATE
                            EXPORT_NO
                            RETURN_DATE
                            RETURN_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0438_2_DUTY_MST;
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
                    query MgrQueryS0438_4($data: I_S0438_4!) {
                        mgrQueryS0438_4(data: $data) {
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
            return data.mgrQueryS0438_4;
        } catch (e) {
            return e;
        }
    }
}
