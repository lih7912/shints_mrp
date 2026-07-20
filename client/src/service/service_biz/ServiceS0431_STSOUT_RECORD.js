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

export class ServiceS0431_STSOUT_RECORD {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_STSOUT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0431_5($datas: [I_S0431_5!]!) {
                        mgrInsert_S0431_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "mgrInsert_S0431_5 call succeed: " + data.mgrInsert_S0431_5,
            );
            return data.mgrInsert_S0431_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_STSOUT_1(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0431_5_1(
                        $datas: [I_S0431_5_1!]!
                        $datas1: [I_S0431_5_2!]!
                    ) {
                        mgrInsert_S0431_5_1(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argInputData1,
                },
            });
            return data.mgrInsert_S0431_5_1;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_PU_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0431_5($datas: I_S0431_5_1!) {
                        mgrDelete_S0431_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0431_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
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
                    query MgrQueryS0431_1_CODE {
                        mgrQueryS0431_1_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PUR_FACTORY {
                                CD_CODE
                                CD_NAME
                            }
                            PAY_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            ORIGIN_PORT {
                                CD_CODE
                                CD_NAME
                            }
                            SHIP_MODE {
                                CD_CODE
                                CD_NAME
                            }
                            SENDER {
                                USER_ID
                                USER_NAME
                            }
                            RECEIVER {
                                USER_ID
                                USER_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0431_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0431_1_CODE2($data: I_S0431_CODE!) {
                        mgrQueryS0431_1_CODE2(data: $data) {
                            PLACE_CD {
                                PLACE_CD
                                PLACE_NAME
                            }
                            NORMI {
                                CD_CODE
                                CD_NAME
                            }
                            TRADE_TERM {
                                CD_CODE
                                CD_NAME
                            }
                            SHIP_MODE {
                                CD_CODE
                                CD_NAME
                            }
                            BILL_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            CURR_CD {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0431_1_CODE2;
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
                    query MgrQueryS0431_LIST_1($data: [I_S0431_LIST_1!]!) {
                        mgrQueryS0431_LIST_1(data: $data) {
                            PU_STATUS
                            REG_USER
                            BUYER_CD
                            BUYER_NAME
                            PU_CD
                            PO_CD
                            VENDOR_NAME
                            VENDOR_TYPE
                            VENDOR_TYPE_N
                            MATL_TYPE
                            NORMI
                            MRP_DATE
                            ORDER_DATE
                            DUE_DATE
                            EX_FACTORY
                            PAY_TERM
                            CURR_CD
                            VENDOR_CD
                            TARGET_ETA
                            ETA
                            DEPOSIT_AMT
                            LC_AMT
                            PAY_CONDITION
                            PAY_DATE
                            BILL_TO
                            OVER_SHORT
                            PU_AMT
                            STS_IN_AMT
                            STS_OUT_AMT
                            FACIN_AMT
                            MOQ_AMT
                            SURCHARGE_AMT
                            BAL_AMT
                            FACTORY_CD
                            ORIGIN_PORT
                            TRADE_TERM
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0431_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0431_LIST_2($data: [I_S0431_LIST_2!]!) {
                        mgrQueryS0431_LIST_2(data: $data) {
                            BUYER_CD
                            BUYER_NAME
                            VENDOR_CD
                            VENDOR_NAME
                            PU_CD
                            STSIN_CD
                            IN_DATE
                            MATL_CD
                            PO_CD
                            PO_SEQ
                            MATL_SEQ
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            FACTORY_CD
                            SHIP_QTY
                            OUT_QTY
                            BAL_QTY
                            WEIGHT
                            MOQ_QTY
                            SURCHARGE_AMT
                            LEADER_CONFIRM
                            MOQ_CONFIRM
                            SURCHARGE_CONFIRM
                            BILL_TO
                            HS_CD
                            HS_NAME
                            COMP1
                            COMP1_P
                            COMP2
                            COMP2_P
                            COMP3
                            COMP3_P
                            COMP4
                            COMP4_P
                            COMP
                            V_COMP
                            OFFER_SPEC
                            DATAS {
                                BUYER_CD
                                BUYER_NAME
                                VENDOR_CD
                                VENDOR_NAME
                                PU_CD
                                STSIN_CD
                                IN_DATE
                                MATL_CD
                                PO_CD
                                PO_SEQ
                                MATL_SEQ
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                FACTORY_CD
                                SHIP_QTY
                                OUT_QTY
                                BAL_QTY
                                WEIGHT
                                MOQ_QTY
                                SURCHARGE_AMT
                                LEADER_CONFIRM
                                MOQ_CONFIRM
                                SURCHARGE_CONFIRM
                                BILL_TO
                                HS_CD
                                HS_NAME
                                COMP1
                                COMP1_P
                                COMP2
                                COMP2_P
                                COMP3
                                COMP3_P
                                COMP4
                                COMP4_P
                                COMP
                                V_COMP
                                OFFER_SPEC
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0431_LIST_2;
        } catch (e) {
            return e;
        }
    }
}
