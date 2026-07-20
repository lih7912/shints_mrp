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

export class ServiceS0701_CREDIT_NOTE {
    // SERVICE: TBL_KSV_STOCK_IN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_INSERT_CREDIT_NOTE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0701_5_INSERT_CREDIT_NOTE(
                        $datas: I_S0701_5!
                    ) {
                        mgrInsert_S0701_5_INSERT_CREDIT_NOTE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0701_5_INSERT_CREDIT_NOTE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_UPDATE_END_TYPE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0701_5_UPDATE_END_TYPE(
                        $datas: [I_S0701_5_UPDATE_END_TYPE!]!
                    ) {
                        mgrInsert_S0701_5_UPDATE_END_TYPE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0701_5_UPDATE_END_TYPE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_CANCEL_CREDIT_NOTE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0701_5_CANCEL_CREDIT_NOTE(
                        $datas: I_S0701_5!
                    ) {
                        mgrInsert_S0701_5_CANCEL_CREDIT_NOTE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0701_5_CANCEL_CREDIT_NOTE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_UPDATE_CREDIT_NOTE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0701_5_UPDATE_CREDIT_NOTE(
                        $datas: I_S0701_5!
                    ) {
                        mgrInsert_S0701_5_UPDATE_CREDIT_NOTE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0701_5_UPDATE_CREDIT_NOTE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_END_CREDIT_NOTE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0701_5_END_CREDIT_NOTE(
                        $datas: I_S0701_5!
                        $datas1: I_S0701_5_1!
                    ) {
                        mgrInsert_S0701_5_END_CREDIT_NOTE(
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
            return data.mgrInsert_S0701_5_END_CREDIT_NOTE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_CANCEL_END_CREDIT(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0701_5_CANCEL_END_CREDIT(
                        $datas: I_S0701_5!
                        $datas1: [I_S0701_5_CANCEL_END_CREDIT!]!
                    ) {
                        mgrInsert_S0701_5_CANCEL_END_CREDIT(
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
            return data.mgrInsert_S0701_5_CANCEL_END_CREDIT;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_GW_CREDIT_NOTE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0701_5_GW_CREDIT_NOTE(
                        $datas: [I_S0701_5!]!
                    ) {
                        mgrUpdate_S0701_5_GW_CREDIT_NOTE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0701_5_GW_CREDIT_NOTE;
        } catch (e) {
            return e;
        }
    }

    //

    async mgrQuery_CODE(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_CODE($data: I_S0701_1!) {
                        mgrQueryS0701_CODE(data: $data) {
                            FACTORY {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            MESSER {
                                COM_CD
                                COM_NAME
                            }
                            BUYER3 {
                                BUYER_CD
                                BUYER_NAME
                            }
                            USER {
                                USER_NAME
                                USER_ID
                            }
                            DEBIT_STATUS {
                                CD_CODE
                                CD_NAME
                            }
                            DEBIT_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            PAY_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            CURR_CD {
                                CD_CODE
                                CD_NAME
                            }
                            CREDIT_END_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            AUTH {
                                USER_NAME
                                USER_ID
                            }
                            BANK {
                                BANK_CD
                                BANK_NAME
                            }
                            PO_CD {
                                PO_CD
                                PO_DATE
                            }
                            ORDER_CD {
                                ORDER_CD
                                STYLE_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE1(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_CODE1($data: I_S0701_2!) {
                        mgrQueryS0701_CODE1(data: $data) {
                            PO_CD {
                                PO_CD
                                PO_DATE
                            }
                            ORDER_CD {
                                ORDER_CD
                                STYLE_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_CODE1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BANK_BY_BILL_TO(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_BANK_BY_BILL_TO(
                        $data: I_S0701_BANK_BY_BILL_TO!
                    ) {
                        mgrQueryS0701_BANK_BY_BILL_TO(data: $data) {
                            BANK {
                                BANK_CD
                                BANK_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_BANK_BY_BILL_TO;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_IN1

    async mgrQuery_LIST_1(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_2($data: I_S0701_2!) {
                        mgrQueryS0701_2(data: $data) {
                            CHARGER_TEAM
                            CRDB_CD
                            CRDB_SEQ
                            CRDB_DATE
                            MESSER
                            CRDB_AMT
                            END_AMT
                            BALANCE
                            CURR_CD
                            USD_BAL
                            TITLE
                            CHARGER
                            END_DATE
                            REMARK
                            STATUS
                            GW_STATUS
                            PO_CD
                            ORDER_CD
                            BANK_CD
                            BANK_NAME
                            MESSER_CD
                            STATUS_CD
                            BUYER_CD
                            BUYER_NAME
                            PAYMENT_PLAN
                            APPROKEY
                            DOCU_NO
                            END_USER
                            REG_USER
                            DEBIT_TYPE
                            DEBIT_TYPE_NAME
                            LINK_TO
                            END_DATE2
                            BUYER_TEAM
                            CONF_USER
                            END_TYPE_NAME
                            END_TYPE
                            VAT
                            USD_RATE
                            CA_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1_BY_NUMBER(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_2_BY_NUMBER(
                        $data: I_S0701_2_BY_NUMBER!
                    ) {
                        mgrQueryS0701_2_BY_NUMBER(data: $data) {
                            CHARGER_TEAM
                            CRDB_CD
                            CRDB_SEQ
                            CRDB_DATE
                            MESSER
                            CRDB_AMT
                            END_AMT
                            BALANCE
                            CURR_CD
                            USD_BAL
                            TITLE
                            CHARGER
                            END_DATE
                            REMARK
                            STATUS
                            GW_STATUS
                            PO_CD
                            ORDER_CD
                            BANK_CD
                            BANK_NAME
                            MESSER_CD
                            STATUS_CD
                            BUYER_CD
                            BUYER_NAME
                            PAYMENT_PLAN
                            APPROKEY
                            DOCU_NO
                            END_USER
                            REG_USER
                            DEBIT_TYPE
                            DEBIT_TYPE_NAME
                            LINK_TO
                            END_DATE2
                            BUYER_TEAM
                            CONF_USER
                            END_TYPE_NAME
                            END_TYPE
                            VAT
                            USD_RATE
                            CA_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_2_BY_NUMBER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_2_1($data: I_S0701_2_1!) {
                        mgrQueryS0701_2_1(data: $data) {
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            MANAGE_DATE
                            PRE_FLAG
                            END_TYPE
                            VAT
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_2_1;
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
                    query MgrQueryS0701_4($data: I_S0701_4!) {
                        mgrQueryS0701_4(data: $data) {
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
            return data.mgrQueryS0701_4;
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
                    query MgrQueryS0701_4_1($data: I_S0701_4!) {
                        mgrQueryS0701_4_1(data: $data) {
                            END_DATE
                            CRDB_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0701_4_REPORT($data: [I_S0701_4!]!) {
                        mgrQueryS0701_4_REPORT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0701_4_REPORT;
        } catch (e) {
            return e;
        }
    }
}
