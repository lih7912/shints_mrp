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

export class ServiceS0434_SHIPMENT_MANAGER {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrDelete_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0434_5($datas: [I_S0434_5!]!) {
                        mgrDelete_S0434_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0434_5;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_SINGAPORE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0434_5_SINGAPORE(
                        $datas: [I_S0434_5!]!
                    ) {
                        mgrInsert_S0434_5_SINGAPORE(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0434_5_SINGAPORE;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_FIX(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0434_5_FIX($datas: [I_S0434_5!]!) {
                        mgrInsert_S0434_5_FIX(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0434_5_FIX;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_END(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0434_5_END($datas: [I_S0434_5_1!]!) {
                        mgrInsert_S0434_5_END(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0434_5_END;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_ETD_BY_TRADLINX(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0434_5_ETD_SYNC($datas: [I_S0434_5_2!]!) {
                        mgrInsert_S0434_5_ETD_SYNC(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0434_5_ETD_SYNC;
        } catch (e) {
            console.log("async mgrInsert_S0434_5_ETD_SYNC call error: ");
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
                    query MgrQueryS0434_1_CODE {
                        mgrQueryS0434_1_CODE {
                            STATUS_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            ORIGIN_PORT {
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
                            DESTINATION {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0434_1_CODE;
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
                    query MgrQueryS0434_3_1($data: I_S0434_3_1!) {
                        mgrQueryS0434_3_1(data: $data) {
                            SHIPMENT_CD
                            STATUS_CD
                            STATUS_N
                            ETD
                            SHIP_MODE
                            SHIP_LINE
                            PLACE_CD
                            SHIP_MODE_N
                            ORG_ORIGIN_PORT
                            ORG_DESTINATION
                            DESTINATION
                            IS_SINGAPORE
                            BL_NO
                            ETA
                            SHIPPING_COST
                            SHIPPING_COST_CURR
                            IMPORT_COST
                            S_WEIGHT
                            S_CBM
                            SHIPGO_STATUS
                            SHIPGO_ETA
                            SHIPGO_ETC1
                            SHIPGO_ETC2
                            SHIPGO_ETC3
                            SHIPGO_ETC4
                            SHIPGO_ETC5
                            UPD_DATETIME
                            TRACKING_ID
                            FIX_FLAG
                            BL_FILE
                            REMARK
                            INVOICE_NO
                            TRADLINX_STATUS
                            TRADLINX_POL_NAME
                            TRADLINX_ETD
                            TRADLINX_ATD
                            TRADLINX_POD_NAME
                            TRADLINX_ETA
                            TRADLINX_ATA
                            TRADLINX_UPDATE_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0434_3_1;
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
                    query MgrQueryS0434_3_2($data: I_S0434_3_2!) {
                        mgrQueryS0434_3_2(data: $data) {
                            PU_CD
                            STSOUT_CD
                            PACK_CD
                            INVOICE_NO
                            TRADE_TERM
                            READY_DATE
                            ETA
                            ORIGIN_PORT
                            DESTINATION
                            CT_QTY
                            CBM
                            WEIGHT
                            VENDOR_CD
                            BUYER_CD
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0434_3_2;
        } catch (e) {
            return e;
        }
    }
}
