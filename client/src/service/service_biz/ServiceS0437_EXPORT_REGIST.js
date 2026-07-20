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

export class ServiceS0437_EXPORT_REGIST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_EXPORT_REGIST(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0437_5(
                        $datas: [I_S0437_5!]!
                        $datas1: I_S0437_5_1!
                    ) {
                        mgrInsert_S0437_5(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0437_5;
        } catch (e) {
            console.log("async mgrDelete_KSV_ORDER_MST  call error: ");
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
                    query MgrQueryS0437_1_CODE {
                        mgrQueryS0437_1_CODE {
                            PAYMENT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
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
                        }
                    }
                `,
            });
            return data.mgrQueryS0437_1_CODE;
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
                    query MgrQueryS0437_3_3($data: I_S0437_3_1!) {
                        mgrQueryS0437_3_3(data: $data) {
                            STATUS
                            SHIP_DATE
                            ETD
                            SHIP_MODE
                            SHIP_MODE_N
                            CI_FILE
                            BL_FILE
                            STSOUT_CD
                            SHIPMENT_CD
                            INVOICE_NO
                            ORIGIN_PORT
                            DESTINATION
                            OUT_DATE
                            IN_CURR_CD
                            S_AMT
                            PAYMENT_TYPE
                            LICENSE_NO
                            LICENSE_DATE
                            DOCU_NO
                            PAYMENT_TYPE_N
                            BL_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0437_3_3;
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
                    query MgrQueryS0437_3_2($data: I_S0437_3_2!) {
                        mgrQueryS0437_3_2(data: $data) {
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
            return data.mgrQueryS0437_3_2;
        } catch (e) {
            return e;
        }
    }
}
