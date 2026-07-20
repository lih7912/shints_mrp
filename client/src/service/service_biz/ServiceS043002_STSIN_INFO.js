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

export class ServiceS043002_STSIN_INFO {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_STSIN(argList1, argList2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043002_5(
                        $datas: I_S043002_5_UPDATE_MST!
                        $datas1: [I_S043002_5_UPDATE_MEM!]!
                    ) {
                        mgrUpdate_S043002_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argList1,
                    datas1: argList2,
                },
            });
            return data.mgrUpdate_S043002_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_STS_FULLIN(argEdit, argList1, argList2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S043002_5_fullin(
                        $datas: I_S043002_5_edit!
                        $datas1: [I_S043002_5_list1!]!
                        $datas2: [I_S043002_5_list2!]!
                    ) {
                        mgrInsert_S043002_5_fullin(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argEdit,
                    datas1: argList1,
                    datas2: argList2,
                },
            });
            console.log(
                "mgrInsert_S043002_5 call succeed: " +
                    data.mgrInsert_S043002_5_fullin,
            );
            return data.mgrInsert_S043002_5_fullin;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_STS_PARTIN(argEdit, argList1, argList2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S043002_5_partin(
                        $datas: I_S043002_5_edit!
                        $datas1: [I_S043002_5_list1!]!
                        $datas2: [I_S043002_5_list2!]!
                    ) {
                        mgrInsert_S043002_5_partin(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argEdit,
                    datas1: argList1,
                    datas2: argList2,
                },
            });
            console.log(
                "mgrInsert_S043002_5 call succeed: " +
                    data.mgrInsert_S043002_5_partin,
            );
            return data.mgrInsert_S043002_5_partin;
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
                    mutation MgrDelete_S043002_5($datas: I_S043002_5_1!) {
                        mgrDelete_S043002_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S043002_5;
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
                    query MgrQueryS043002_1_CODE {
                        mgrQueryS043002_1_CODE {
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
                            PAYER {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS043002_1_CODE;
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
                    query MgrQueryS043002_1_CODE2($data: I_S043002_CODE!) {
                        mgrQueryS043002_1_CODE2(data: $data) {
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
            return data.mgrQueryS043002_1_CODE2;
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
                    query MgrQueryS043002_LIST_1($data: I_S043002_LIST_1!) {
                        mgrQueryS043002_LIST_1(data: $data) {
                            PU_STATUS
                            REG_USER
                            BUYER_CD
                            BUYER_NAME
                            PU_CD
                            PO_CD
                            VENDOR_NAME
                            VENDOR_TYPE
                            OVERSHORT_RATE
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
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043002_LIST_1;
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
                    query MgrQueryS043002_LIST_2($data: I_S043002_LIST_2!) {
                        mgrQueryS043002_LIST_2(data: $data) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MRP_QTY
                            STOCK_QTY
                            MOQ_QTY
                            LEFTOVER_QTY
                            PO_QTY0
                            PO_QTY
                            STSIN_QTY
                            FOC_QTY
                            SHIP_QTY
                            CURR_CD
                            MASTER_PRICE
                            DIFF_PRICE
                            PO_PRICE
                            SURCHARGE_AMT
                            SURCHARGE_PRICE
                            SURCHARGE_REMARK
                            OVERSHORT_RATE
                            BILL_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043002_LIST_2;
        } catch (e) {
            return e;
        }
    }
}
