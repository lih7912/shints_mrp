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

export class ServiceS043101_STSOUT_LIST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrDelete_CANCEL_STSOUT(argInputData, argInputData1, argInputData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S043101_5(
                        $datas: [I_S043101_5_3!]!
                        $datas1: [I_S043101_5_3_1!]!
                        $datas2: String!
                    ) {
                        mgrDelete_S043101_5(
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
            // console.log("mgrInsert_S043101_5 call succeed: " + data.mgrDelete_S043101_5);
            return data.mgrDelete_S043101_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_UPDATE_STSOUT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S043101_5($datas: I_S043101_5_3!) {
                        mgrUpdate_S043101_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("mgrInsert_S043101_5 call succeed: " + data.mgrDelete_S043101_5);
            return data.mgrUpdate_S043101_5;
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
                    mutation MgrInsert_S043101_5_1(
                        $datas: [I_S043101_5_1!]!
                        $datas1: [I_S043101_5_2!]!
                    ) {
                        mgrInsert_S043101_5_1(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S043101_5_1;
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
                    mutation MgrDelete_S043101_5($datas: I_S043101_5_1!) {
                        mgrDelete_S043101_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S043101_5;
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
                    query MgrQueryS043101_1_CODE {
                        mgrQueryS043101_1_CODE {
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
                        }
                    }
                `,
            });
            return data.mgrQueryS043101_1_CODE;
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
                    query MgrQueryS043101_1_CODE2($data: I_S043101_CODE!) {
                        mgrQueryS043101_1_CODE2(data: $data) {
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
            return data.mgrQueryS043101_1_CODE2;
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
                    query MgrQueryS043101_3_1($data: I_S043101_3_1!) {
                        mgrQueryS043101_3_1(data: $data) {
                            PU_CD
                            STSOUT_CD
                            STSIN_CD
                            PACK_CD
                            INVOICE_NO
                            TRADE_TERM
                            READY_DATE
                            ETA
                            ORIGIN_PORT
                            DESTINATION
                            CT_QTY
                            CT_NO
                            CBM
                            WEIGHT
                            GROSS_WEIGHT
                            VENDOR_CD
                            VENDOR_NAME
                            BUYER_CD
                            BUYER_NAME
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043101_3_1;
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
                    query MgrQueryS043101_4_1($data: I_S043101_4_1!) {
                        mgrQueryS043101_4_1(data: $data) {
                            PU_CD
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
                            PO_QTY
                            IN_QTY
                            SHIP_QTY
                            STSOUT_CD
                            SHIPMENT_CD
                            OUT_QTY
                            OUT_QTY2
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
                            BUYER_CD
                            BUYER_NAME
                            VENDOR_CD
                            VENDOR_NAME
                            WEIGHT
                            CT_NO
                            CT_QTY
                            REMARK
                            IN_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043101_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043101_4_1_EXCEL($data: I_S043101_3_1!) {
                        mgrQueryS043101_4_1_EXCEL(data: $data) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043101_4_1_EXCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS043101_4_1_EXCEL2($data: I_S043101_3_1!) {
                        mgrQueryS043101_4_1_EXCEL2(data: $data) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS043101_4_1_EXCEL2;
        } catch (e) {
            return e;
        }
    }
}
