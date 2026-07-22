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

export class ServiceS080101_DOCU_REGIST_DOMESTIC {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_SAVE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S080101_5(
                        $datas: [I_S080101_5!]!
                        $datas1: I_S080101_5_1!
                    ) {
                        mgrInsert_S080101_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S080101_5;
        } catch (e) {
            return e;
        }
    }

    async PROC_FOC (argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S080101_5_PROC_FOC(
                        $datas: [I_S080101_5_PROC_FOC!]!
                    ) {
                        mgrInsert_S080101_5_PROC_FOC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData
                },
            });
            return data.mgrInsert_S080101_5_PROC_FOC;
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
                    query MgrQueryS080101_CODE($data: I_S080101_1!) {
                        mgrQueryS080101_CODE(data: $data) {
                            NAT_CD {
                                NAT_NAME
                                NAT_CD
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            NEOE_CODE {
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
            return data.mgrQueryS080101_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS080101_2($data: I_S080101_2!) {
                        mgrQueryS080101_2(data: $data) {
                            INVOICE_NO
                            BUYER_CD
                            SHIP_DATE
                            INVOICE_DATE
                            NAT_CD
                            BUYER_NAT_CD
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_QTY
                            ORDER_QTY
                            BUYER_NAME
                            BL_FILE
                            PL_FILE
                            DEBIT_FILE
                            SHIP_MODE_N
                            DELIVERY_TYPE_N
                            SHIP_AMOUNT
                            COST_CONFIRM_USER
                            LICENSE_NO
                            LICENSE_DATE
                            IMPORT_FREIGHT_AMT
                            IMPORT_CLEARANCE_AMT
                            IMPORT_DUTY_AMT
                            REMARK
                            STATUS_NAME
                            ORDER_CD
                            STYLE_NAME
                            PO_CD
                            SHIP_PRICE
                            CURR_CD
                            KRW_SHIP_AMOUNT
                            KRW_TAX_AMOUNT
                            KRW_TOT_AMOUNT
                            KRW_SHIP_PRICE
                            BAL_QTY
                            RATEBASE
                            DUE_DATE
                            INVOICE_CURR_CD
                            INVOICE_SHIP_AMOUNT
                            SALES_PRICE
                            BUYER_EMAIL
                            PRODUCT_TYPE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS080101_2;
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
                    query MgrQueryS080101_3($data: I_S080101_3_TAX!) {
                        mgrQueryS080101_3(data: $data) {
                            TAX_MST {
                                TAX_CD
                                NAT_CD
                                BUYER_CD
                                CURR_CD
                                PAY_AMT
                                USD_AMT
                                KRW_AMT
                                VAT_AMT
                                TOT_AMT
                                RATEBASE
                                BILL_DATE
                                BILL_USER
                                REG_USER
                                REG_DATETIME
                                DOCU_NO
                                BUYER_EMAIL
                            }
                            TAX_MEM {
                                TAX_CD
                                INVOICE_NO
                                ORDER_CD
                                NAT_CD
                                CURR_CD
                                TOT_QTY
                                PAY_QTY
                                PAY_PRICE
                                PAY_AMT
                                USD_AMT
                                KRW_AMT
                                VAT_AMT
                                TOT_AMT
                                RATEBASE
                                BILL_DATE
                                BILL_USER
                                REG_USER
                                REG_DATETIME
                                DUE_DATE
                                BAL_QTY
                                PO_CD
                                STYLE_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS080101_3;
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
                    query MgrQueryS080101_4($data: I_S080101_4!) {
                        mgrQueryS080101_4(data: $data) {
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
            return data.mgrQueryS080101_4;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0801_4_CRDB($data: I_S0801_4_CRDB!) {
                        mgrQueryS0801_4_CRDB(data: $data) {
                            CRDB_CD
                            CRDB_SEQ
                            CRDB_DATE
                            COM_NAME
                            CRDB_AMT
                            BALANCE
                            CURR_CD
                            USD_BAL
                            TITLE
                            REG_USER
                            END_DATE
                            REMARK
                            STATUS
                            PO_CD
                            ORDER_CD
                            BANK_CD
                            COM_CD
                            STATUS_CD
                            BUYER_CD
                            BUYER_NAME
                            PAYMENT_PLAN
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0801_4_CRDB;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_4_1(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0801_4_CRDB_1($data: I_S0801_4_CRDB!) {
                        mgrQueryS0801_4_CRDB_1(data: $data) {
                            END_DATE
                            CRDB_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0801_4_CRDB_1;
        } catch (e) {
            return e;
        }
    }
}
