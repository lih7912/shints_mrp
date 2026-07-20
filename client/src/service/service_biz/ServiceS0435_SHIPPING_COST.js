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

export class ServiceS0435_SHIPPING_COST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_SHIPPING_COST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0435_5($datas: I_S0435_5!) {
                        mgrUpdate_S0435_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0435_5;
        } catch (e) {
            console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrCancel_SHIPPING_COST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {   
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrCancel_S0435_5($datas: I_S0435_5!) {
                        mgrCancel_S0435_5(datas: $datas) {
                            CODE    
                            id      
                        }
                    }
                `,      
                variables: {
                    datas: argInputData,
                },      
            });     
            return data.mgrCancel_S0435_5;
        } catch (e) {
            console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
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
                    query MgrQueryS0435_1_CODE {
                        mgrQueryS0435_1_CODE {
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
                            CURR_CD {
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
                            PAYER {
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
            return data.mgrQueryS0435_1_CODE;
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
                    query MgrQueryS0435_3_1($data: I_S0435_3_1!) {
                        mgrQueryS0435_3_1(data: $data) {
                            SHIPMENT_CD
                            STATUS_CD
                            REG_DATETIME
                            SHIP_MODE
                            ORIGIN_PORT
                            DESTINATION
                            BL_NO
                            ETA
                            ETD
                            SHIPPING_COST
                            IMPORT_COST
                            DUTY_COST
                            SHIPPING_COST_CURR
                            IMPORT_COST_CURR
                            SHIPPING_COST_PAID
                            IMPORT_COST_PAID
                            S_WEIGHT
                            S_CBM
                            REMARK
                            INVOICE_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0435_3_1;
        } catch (e) {
            return e;
        }
    }
}
