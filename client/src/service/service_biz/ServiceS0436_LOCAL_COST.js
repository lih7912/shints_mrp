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

export class ServiceS0436_LOCAL_COST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUpdate_IMPORT_COST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0436_5($datas: I_S0436_5!) {
                        mgrUpdate_S0436_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0436_5;
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
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0436_1_CODE {
                        mgrQueryS0436_1_CODE {
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
                        }
                    }
                `,
            });
            return data.mgrQueryS0436_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0436_3_1($data: I_S0436_3_1!) {
                        mgrQueryS0436_3_1(data: $data) {
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

                            IMPORT_COST_LOCAL
                            IMPORT_COST_CURR_LOCAL
                            IMPORT_COST_PAID_LOCAL

                            CUSTOMS_NO
                            S_WEIGHT
                            S_CBM
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0436_3_1;
        } catch (e) {
            return e;
        }
    }
}
