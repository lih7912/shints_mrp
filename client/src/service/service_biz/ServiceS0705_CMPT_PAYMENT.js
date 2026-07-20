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

export class ServiceS0705_CMPT_PAYMENT {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_UPDATE_BILL(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0705_5_UPDATE_BILL(
                        $datas: [I_S0705_5!]!
                        $datas1: I_S0705_5_1!
                    ) {
                        mgrInsert_S0705_5_UPDATE_BILL(
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
            return data.mgrInsert_S0705_5_UPDATE_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_SALES(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0705_5_UPDATE_SALES(
                        $datas: [I_S0705_5!]!
                        $datas1: I_S0705_5_1!
                    ) {
                        mgrInsert_S0705_5_UPDATE_SALES(
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
            return data.mgrInsert_S0705_5_UPDATE_SALES;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_CANCEL_BILL(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0705_5_CANCEL_BILL(
                        $datas: [I_S0705_5!]!
                        $datas1: I_S0705_5_1!
                    ) {
                        mgrInsert_S0705_5_CANCEL_BILL(
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
            return data.mgrInsert_S0705_5_CANCEL_BILL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_CANCEL_SALES(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0705_5_CANCEL_SALES(
                        $datas: [I_S0705_5!]!
                        $datas1: I_S0705_5_1!
                    ) {
                        mgrInsert_S0705_5_CANCEL_SALES(
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
            return data.mgrInsert_S0705_5_CANCEL_BILL;
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
                    query MgrQueryS0705_CODE($data: I_S0705_1!) {
                        mgrQueryS0705_CODE(data: $data) {
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            INVOICE_TYPE {
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
            return data.mgrQueryS0705_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PRINT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0705_EXCEL_PRINT(
                        $data: I_S0705_EXCEL_PRINT!
                    ) {
                        mgrQuery_S0705_EXCEL_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0705_EXCEL_PRINT;
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
                    query MgrQueryS0705_3($data: I_S0705_3!) {
                        mgrQueryS0705_3(data: $data) {
                            BUYER_CD
                            INVOICE_NO
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            SHIP_PTYPE_N
                            SHIP_DATE
                            EXFACTORY
                            SHIP_CNT
                            FC_ORD_PRICE
                            FC_BILL_PRICE
                            FC_AMT
                            BILL_CHK_N
                            BILL_FLAG_N
                            BILL_DATE
                            BILL_CHK
                            BILL_FLAG
                            SHIP_PTYPE
                            FC_NEGO_TYPE
                            SCREEN_PRINT
                            HEAT_SILICON
                            EMBROIDERY
                            TPR
                            WELDING
                            QUILTING
                            DIGITAL_PRINT
                            LABEL_PRINT
                            LINE_CHARGE
                            CMPT_TOTAL
                            TOTAL_AMT
                            REMARK
                            TOTAL_CNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0705_3;
        } catch (e) {
            return e;
        }
    }
}
