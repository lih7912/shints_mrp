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

export class ServiceS0521_STOCK_RECORD_NEW {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_STOCK_MOVE(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0521_5(
                        $datas: I_S0521_5!
                        $datas1: [I_S0521_5_1!]!
                        $datas2: I_S0521_5_2!
                    ) {
                        mgrInsert_S0521_5(
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
                    datas: argInputData,
                    datas1: argInputData1,
                    datas2: argInputData2,
                },
            });
            return data.mgrInsert_S0521_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_ADD_SHIP(argInputData, argInputData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0521_5_ADD_SHIP(
                        $datas: I_S0521_5!
                        $datas1: [I_S0521_5_1!]!
                    ) {
                        mgrInsert_S0521_5_ADD_SHIP(
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
            return data.mgrInsert_S0521_5_ADD_SHIP;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0521_5($datas: I_S0521_5!) {
                        mgrDelete_S0521_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0521_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_SHIPMENT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0521_5($datas: I_S0521_5!) {
                        mgrUpdate_S0521_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0521_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_SHIPMENT_TRACKING(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0521_5_1($datas: I_S0521_5_1!) {
                        mgrUpdate_S0521_5_1(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0521_5_1;
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
                    query MgrQueryS0521_1_CODE {
                        mgrQueryS0521_1_CODE {
                            PO_CD {
                                CD_CODE
                                CD_NAME
                            }
                            ORDER_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                id
                            }
                            BUYER_CD {
                                BUYER_NAME
                                BUYER_CD
                            }
                            OWNER_SHIP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            REASON_MAKE {
                                CD_CODE
                                CD_NAME
                            }
                            AUTHORITY {
                                CD_CODE
                                CD_NAME
                            }
                            CONDITION {
                                CD_CODE
                                CD_NAME
                            }
                            MANAGER {
                                CD_CODE
                                CD_NAME
                            }
                            PURPOSE {
                                CD_CODE
                                CD_NAME
                            }
                            REMARK {
                                CD_CODE
                                CD_NAME
                            }
                            FACTORY {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                        }
                    }
                `,
            });
            return data.mgrQueryS0521_1_CODE;
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
                    query MgrQueryS0521_2($data: I_S0521_2!) {
                        mgrQueryS0521_2(data: $data) {
                            PO_CD
                            MATL_CD
                            SUPPLIER
                            ORDER_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            STOCK_QTY
                            REMAIN_QTY
                            STOCK_STATUS
                            RACK
                            LOCATION
                            REASON_REMARK
                            REMARK
                            REMARK0
                            VENDOR_NAME
                            MATL_SEQ
                            STOCK_IDX
                            ROOT_IDX
                            WAITING_QTY
                            STOCK_STATUS_2
                            OWNER_SHIP
                            REASON_MAKE
                            AUTHORITY
                            CONDITION
                            MANAGER
                            PURPOSE
                            STOCK_DATE
                            CHARGER
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0521_2;
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
                    query MgrQueryS0521_3_1($data: I_S0521_3_1!) {
                        mgrQueryS0521_3_1(data: $data) {
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
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0521_3_1;
        } catch (e) {
            return e;
        }
    }
}
