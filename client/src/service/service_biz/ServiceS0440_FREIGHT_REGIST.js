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

export class ServiceS0440_FREIGHT_REGIST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_SHIPMENT(argInputData, argMatls) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0440_5(
                        $datas: I_S0440_5!
                        $datas1: [I_S0440_5_MATL!]!
                    ) {
                        mgrInsert_S0440_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argMatls,
                },
            });
            return data.mgrInsert_S0440_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_SHIPMENT(argInputData, argMatls) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0440_5(
                        $datas: I_S0440_5!
                        $datas1: [I_S0440_5_MATL!]!
                    ) {
                        mgrUpdate_S0440_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                    datas1: argMatls,
                },
            });
            return data.mgrUpdate_S0440_5;
        } catch (e) {
            console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0440_5($datas: [I_S0440_5_2!]!) {
                        mgrDelete_S0440_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0440_5;
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
                    query MgrQueryS0440_1_CODE {
                        mgrQueryS0440_1_CODE {
                            PAYMENT {
                                CD_CODE
                                CD_NAME
                            }
                            ORIGIN_PORT {
                                CD_CODE
                                CD_NAME
                            }
                            DESTINATION {
                                CD_CODE
                                CD_NAME
                            }
                            ORIGIN {
                                CD_CODE
                                CD_NAME
                            }
                            SHIP_LINE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                id
                            }
                            SHIP_MODE {
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
                            PLACE_CD {
                                PLACE_CD
                                PLACE_NAME
                                PLACE_TYPE
                                DELIVERY_TYPE
                                USER_NAME
                                TEL_NO
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                            USER_ID {
                                USER_NAME
                                USER_ID
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0440_1_CODE;
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
                    query MgrQueryS0440_2_1($data: I_S0440_2_1!) {
                        mgrQueryS0440_2_1(data: $data) {
                            SHIPMENT_CD
                            REG_USER
                            BUYER_CD
                            BUYER_NAME
                            PO_CD2
                            VENDOR_CD
                            VENDOR_NAME
                            TRADE_TERM
                            ORIGIN_PORT
                            EXP_DELIVERY_DATE
                            TARGET_ETA
                            CT_QTY
                            WEIGHT
                            CBM
                            PU_CD
                            STSOUT_CD
                            INVOICE_NO
                            READY_DATE
                            DESTINATION
                            SHIP_MODE
                            SHIP_MODE_N
                            REMARK
                            DESCRIPTION
                            SENDER
                            RECEIVER
                            BL_NO
                            AMOUNT
                            PAYMENT
                            TARGET_ETD
                            ORG_ORIGIN_PORT
                            ORG_DESTINATION
                            MATL_INFO {
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                MATL_PRICE
                                CURR_CD
                                UNIT
                                PO_QTY
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0440_2_1;
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
                    query MgrQueryS0440_3_1($data: I_S0440_3_1!) {
                        mgrQueryS0440_3_1(data: $data) {
                            id
                            SHIPMENT_CD
                            SHIP_MODE
                            PLACE_CD
                            ORIGIN_PORT
                            BL_NO
                            ETA
                            CONTAINER_NO
                            BL_FILE
                            PL_FILE
                            CI_FILE
                            DESTINATION
                            IS_SINGAPORE
                            COST
                            SHIP_LINE
                            STATUS_CD
                            SHIP_MODE_N
                            ETD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0440_3_1;
        } catch (e) {
            return e;
        }
    }
}
