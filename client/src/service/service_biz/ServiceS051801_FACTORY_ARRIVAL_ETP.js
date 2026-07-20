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

export class ServiceS051801_FACTORY_ARRIVAL_ETP {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_CUSTOMER_NO(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S051801_5_CUSTOMER_NO(
                        $datas: I_S051801_5_0!
                        $datas1: [I_S051801_5!]!
                    ) {
                        mgrUpdate_S051801_5_CUSTOMER_NO(
                            datas: $datas
                            datas1: $datas1
                        ) {
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
            return data.mgrUpdate_S051801_5_CUSTOMER_NO;
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
                    query MgrQueryS051801_1_CODE {
                        mgrQueryS051801_1_CODE {
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
            return data.mgrQueryS051801_1_CODE;
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
                    query MgrQueryS051801_3_1($data: I_S051801_3_1!) {
                        mgrQueryS051801_3_1(data: $data) {
                            ATA
                            CLEARANCE_NO
                            SHIPMENT_CD
                            STATUS_CD
                            REG_DATETIME
                            SHIP_MODE
                            ORG_ORIGIN_PORT
                            ORG_DESTINATION
                            DESTINATION
                            IS_SINGAPORE
                            BL_NO
                            ETA
                            SHIPPING_COST
                            IMPORT_COST
                            S_WEIGHT
                            S_CBM
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS051801_3_1;
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
                    query MgrQueryS051801_3_2($data: I_S051801_3_2!) {
                        mgrQueryS051801_3_2(data: $data) {
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
            return data.mgrQueryS051801_3_2;
        } catch (e) {
            return e;
        }
    }
}
