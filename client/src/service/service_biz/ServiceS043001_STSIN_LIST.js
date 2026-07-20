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

export class ServiceS043001_STSIN_LIST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrDelete_CANCEL_STSIN(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S043001_5($datas: [I_S043001_5_1!]!) {
                        mgrDelete_S043001_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S043001_5;
        } catch (e) {
            console.log("async MgrDelete_S043001_5  call error: ");
            return e;
        }
    }

    async mgrUpdate_Leader_Confirm(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043001_Leader_Confirm(
                        $datas: [I_S043001_5_1!]!
                    ) {
                        mgrUpdate_S043001_Leader_Confirm(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S043001_Leader_Confirm;
        } catch (e) {
            console.log("async MgrUpdate_S043001_Leader_Confirm  call error: ");
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
                    query MgrQueryS043001_1_CODE {
                        mgrQueryS043001_1_CODE {
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
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
                        }
                    }
                `,
            });
            return data.mgrQueryS043001_1_CODE;
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
                    query MgrQueryS043001_1_CODE2($data: I_S043001_CODE!) {
                        mgrQueryS043001_1_CODE2(data: $data) {
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
            return data.mgrQueryS043001_1_CODE2;
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
                    query MgrQueryS043001_3_1($data: I_S043001_3_1!) {
                        mgrQueryS043001_3_1(data: $data) {
                            PU_CD
                            BUYER_CD
                            PO_CD
                            VENDOR_CD
                            VENDOR_NAME
                            MATL_TYPE
                            CURR_CD
                            S_AMT
                            S_PO_QTY
                            S_IN_QTY
                            S_OUT_QTY
                            PAY_TYPE
                            EXP_DELIVERY_DATE
                            PAY_DATE
                            TARGET_ETA
                            FACTORY_CD
                            TRADE_TERM
                            STSIN_CD
                            PAYER
                            END_FLAG
                            END_DATE
                            BILL_FLAG
                            BILL_DATE
                            CALC_FLAG
                            IN_QTY
                            IN_PRICE
                            IN_CURR_CD
                            IN_AMT
                            S_IN_QTY1
                            STSIN_AMT
                            MOQ_AMT
                            SURCHARGE_AMT
                            OVERSHORT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043001_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043001_LIST_2($data: I_S043001_LIST_2!) {
                        mgrQueryS043001_LIST_2(data: $data) {
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
            return data.mgrQueryS043001_LIST_2;
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
                    query MgrQueryS043001_4_2($data: I_S043001_4_2!) {
                        mgrQueryS043001_4_2(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                            PU_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            IN_DATETIME
                            REG_USER
                            BUYER_CD
                            MATL_TYPE
                            TRADE_TERM
                            BILL_TO
                            CURR_CD
                            EX_FACTORY
                            PAY_DATE
                            PAY_TERM
                            PAY_CONDITION
                            OVERSHORT
                            STSIN_CD
                            PO_CD
                            STSIN_QTY
                            LC_QTY
                            OVER_QTY
                            FOC_QTY
                            MOQ_QTY
                            STSIN_AMT
                            S_WEIGHT
                            PO_AMT
                            PO_QTY
                            STOCK_AMT
                            MOQ_AMT
                            SURCHARGE_AMT
                            OVERSHORT_NAME
                            STSIN_TYPE
                            LEADER_CONFIRM
                            MOQ_CONFIRM
                            SURCHARGE_CONFIRM
                            PO_PRICE
                            PAY_PRICE
                            ORG_PO_PRICE
                            ORG_PAY_PRICE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043001_4_2;
        } catch (e) {
            return e;
        }
    }
}
