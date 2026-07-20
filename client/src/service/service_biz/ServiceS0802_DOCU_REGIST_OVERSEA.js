/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import apolloOption_neoe from "../../assets/env_graphql_neoe";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0802_DOCU_REGIST_OVERSEA {
    // SERVICE: TBL_KSV_STOCK_FACIN
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_NEOE_INFO(argData) {
        apolloOption_neoe.cache = new InMemoryCache();
        const client_neoe = new ApolloClient(apolloOption_neoe);

        try {
            const { loading, error, data } = await client_neoe.query({
                query: gql`
                    query MgrQuery_neoe_info($data: I_NEOE_INFO!) {
                        mgrQuery_neoe_info(data: $data) {
                            MA_CODEDTL {
                                cd_field
                                cd_sysdef
                                nm_sysdef
                            }
                            MA_EXCHANGE {
                                curr_sour
                                rate_base
                            }
                            FI_MNGD {
                                cd_mngd
                                nm_mngd
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_neoe_info;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DOCU_REGIST(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0802_5_INSERT_DOCU(
                        $datas: [I_S0802_5!]!
                        $datas1: I_S0802_5_1!
                    ) {
                        mgrInsert_S0802_5_INSERT_DOCU(
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
            return data.mgrInsert_S0802_5_INSERT_DOCU;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_INCOME_DATE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0802_5_UPDATE_INCOME_DATE(
                        $datas: [I_S0802_5!]!
                        $datas1: I_S0802_5_1!
                    ) {
                        mgrInsert_S0802_5_UPDATE_INCOME_DATE(
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
            return data.mgrInsert_S0802_5_UPDATE_INCOME_DATE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_DEPOSIT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0802_5_UPDATE_DEPOSIT(
                        $datas: I_S0802_5_DEPOSIT!
                    ) {
                        mgrInsert_S0802_5_UPDATE_DEPOSIT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0802_5_UPDATE_DEPOSIT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_DEPOSIT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0802_5_DELETE_DEPOSIT(
                        $datas: I_S0802_5_DEPOSIT!
                    ) {
                        mgrInsert_S0802_5_DELETE_DEPOSIT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0802_5_DELETE_DEPOSIT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DOCU_DELETE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0802_5_DELETE_DOCU(
                        $datas: [I_S0802_5!]!
                        $datas1: I_S0802_5_1!
                    ) {
                        mgrInsert_S0802_5_DELETE_DOCU(
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
            return data.mgrInsert_S0802_5_DELETE_DOCU;
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
                    query MgrQueryS0802_CODE($data: I_S0802_1!) {
                        mgrQueryS0802_CODE(data: $data) {
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
            return data.mgrQueryS0802_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_DEPOSIT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0802_2_LIST_DEPOSIT(
                        $data: I_S0802_2_LIST_DEPOSIT!
                    ) {
                        mgrQueryS0802_2_LIST_DEPOSIT(data: $data) {
                            CRDB_CD
                            PAY_TO
                            TITLE
                            REMARK
                            USD_BAL
                            ISSUE_DATE
                            CHARGER
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0802_2_LIST_DEPOSIT;
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
                    query MgrQueryS0802_2($data: I_S0802_2!) {
                        mgrQueryS0802_2(data: $data) {
                            STATUS_NAME
                            BUYER_NAME
                            BUYER_CD
                            INVOICE_NO
                            SHIP_DATE
                            DELIVERY_TYPE
                            DELIVERY_TYPE_N
                            SHIP_PTYPE
                            PAYMENT_TERM
                            SHIP_MODE_N
                            CI_NO
                            FROM_PORT
                            FROM_PORT_N
                            TO_PORT
                            TO_PORT_N
                            ORD_AMT
                            TOT_AMT
                            TOT_AMT_WON
                            DOCU_NO
                            DOCU_STATUS
                            CURR_CD
                            VAT_AMT
                            OA_AMT
                            OA_REF_NO
                            OA_DATE
                            TT_AMT
                            TT_REF_NO
                            TT_DATE
                            TT_AMT1
                            TT_REF_NO1
                            TT_DATE1
                            TT_AMT2
                            TT_REF_NO2
                            TT_DATE2
                            TT_AMT3
                            TT_REF_NO3
                            TT_DATE3
                            NEOE_A23
                            NEOE_BUYER_CD
                            INCOME_DATE
                            ATD
                            BUYER_NAT_CD
                            TOT_AMT1
                            INCOME_DATE1
                            TOT_AMT2
                            INCOME_DATE2
                            TOT_AMT3
                            INCOME_DATE3
                            RECEIVED_AMT
                            CRDB_CD
                            DEPOSIT_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_FACIN,
                },
            });
            return data.mgrQueryS0802_2;
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
                    query MgrQueryS0802_3($data: I_S0802_3!) {
                        mgrQueryS0802_3(data: $data) {
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
            return data.mgrQueryS0802_3;
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
                    query MgrQueryS0802_4($data: I_S0802_4!) {
                        mgrQueryS0802_4(data: $data) {
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
            return data.mgrQueryS0802_4;
        } catch (e) {
            return e;
        }
    }
}
