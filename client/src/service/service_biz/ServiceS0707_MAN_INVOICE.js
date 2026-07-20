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

export class ServiceS0707_MAN_INVOICE {
    // SERVICE: EDT_KSV_INVOICE_MST
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_INSERT_CREDIT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0707_5_INSERT_CREDIT(
                        $datas: I_S0707_5_1!
                    ) {
                        mgrInsert_S0707_5_INSERT_CREDIT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0707_5_INSERT_CREDIT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_TT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0707_5_INSERT_TT($datas: I_S0707_5_1!) {
                        mgrInsert_S0707_5_INSERT_TT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0707_5_INSERT_TT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_TT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0707_5_UPDATE_TT($datas: I_S0707_5_1!) {
                        mgrInsert_S0707_5_UPDATE_TT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0707_5_UPDATE_TT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_TT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0707_5_DELETE_TT($datas: I_S0707_5_1!) {
                        mgrInsert_S0707_5_DELETE_TT(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0707_5_DELETE_TT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_INSERT_INVOICE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0707_5_1($datas1: I_S0707_5_2!) {
                        mgrInsert_S0707_5_1(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argRetArray,
                },
            });
            return data.mgrInsert_S0707_5_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0707_CODE($data: I_S0707_1!) {
                        mgrQueryS0707_CODE(data: $data) {
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            INVOICE_CD {
                                INVOICE_NO
                                SHIP_DATE
                            }
                            BANK_CD {
                                BANK_CD
                                BANK_NAME
                            }
                            INVOICE_NEGO_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            END_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            PRE_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0707_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0707_2($data: I_S0707_2!) {
                        mgrQueryS0707_2(data: $data) {
                            REF_NO
                            BANK_NAME
                            BANK_CD
                            BUYER_CD
                            BILL_DATE
                            CURR_CD
                            BILL_AMT
                            CHECK_AMT
                            BALANCE
                            END_FLAG
                            END_FLAG_N
                            PRE_FLAG
                            PRE_FLAG_N
                            TOT_AMT
                            CREDIT_AMT
                            CHARGE
                            BUYER_NAME
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0707_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REF_NO(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0707_2_REF_NO($data: I_S0707_2_REF_NO!) {
                        mgrQueryS0707_2_REF_NO(data: $data) {
                            REF_NO
                            MESSAGE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0707_2_REF_NO;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0707_3($data: I_S0707_3!) {
                        mgrQueryS0707_3(data: $data) {
                            INVOICE_NO
                            BILL_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0707_3;
        } catch (e) {
            return e;
        }
    }
}
