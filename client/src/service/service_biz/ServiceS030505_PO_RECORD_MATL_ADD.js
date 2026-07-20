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

export class ServiceS030505_PO_RECORD_MATL_ADD {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrAddPo(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrAddPo_S030505_03(
                        $datas: I_S030505_03!
                        $datas1: [I_S030505_03_1!]!
                    ) {
                        mgrAddPo_S030505_03(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            console.log(
                "mgrAddPo_S030505_03  call succeed: " +
                    data.mgrAddPo_S030505_03,
            );
            return data.mgrAddPo_S030505_03;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdatePo(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdatePo_S030505_03(
                        $datas: I_S030505_03!
                        $datas1: [I_S030505_03_1!]!
                    ) {
                        mgrUpdatePo_S030505_03(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrUpdatePo_S030505_03;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrMaterialRemove(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrMaterialRemove_S030505_03(
                        $datas: I_S030505_03!
                        $datas1: [I_S030505_03_1!]!
                    ) {
                        mgrMaterialRemove_S030505_03(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrMaterialRemove_S030505_03;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDeletePo(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDeletePo_S030505_03(
                        $datas: I_S030505_03!
                        $datas1: [I_S030505_03_1!]!
                    ) {
                        mgrDeletePo_S030505_03(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrDeletePo_S030505_03;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST1

    async mgrQuery_LIST_1(argQRY_KSV_ORDER_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS030505_LIST_1($data: I_S030505_01!) {
                        mgrQueryS030505_LIST_1(data: $data) {
                            PO_MRP {
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                MATL_PRICE
                                CURR_CD
                                UNIT
                                STOCK_QTY
                                PO_QTY
                                PO_TYPE_NAME
                                REASON_TYPE
                                FARE_TYPE
                                REMARK
                                VENDOR_NAME
                                STOCK_STATUS
                                USE_PO_TYPE
                                USE_PO_CD
                                USE_PO_SEQ
                                USE_ORDER_CD
                                USE_MRP_SEQ
                                USE_MATL_SEQ
                                MATL_SEQ
                                FACTORY_CD
                                STOCK_IDX
                                REMARK2
                                PLAN_REMARK
                                VENDOR_CD
                                ORDER_CD
                            }
                            DELIVERY_TYPE {
                                FACTORY_CD
                                FACTORY_NAME
                                DELIVERY_TYPE
                                DELIVERY_TYPE_N
                                CURR_DATE
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST1,
                },
            });
            return data.mgrQueryS030505_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_VENDOR(argQRY_KSV_ORDER_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS030505_01_CODE_VENDOR(
                        $data: I_S030505_01_CODE_VENDOR!
                    ) {
                        mgrQueryS030505_01_CODE_VENDOR(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST1,
                },
            });
            return data.mgrQueryS030505_01_CODE_VENDOR;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_ORDER_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS030505_01_CODE($data: I_S030505_01_CODE!) {
                        mgrQueryS030505_01_CODE(data: $data) {
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            FARE_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            REASON_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            DELIVERY_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                                FACTORY_NAME2
                                USER_NAME
                                EMAIL
                                COUNTRY
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                PORT
                                AIRPORT
                                NAT_CD
                                BANK_CD
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                tag_po
                                tag_order
                                place_cd
                                PACK_NAME
                                id
                            }
                            ORDER_CD {
                                ORDER_CD
                            }
                            PO_CD {
                                PO_CD
                                PO_SEQ
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST1,
                },
            });
            console.log(
                "mgrQueryS030505_01_CODE:" +
                    data.mgrQueryS030505_01_CODE.length,
            );
            return data.mgrQueryS030505_01_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_R_MST

    async mgrQueryTBL_KCD_MATL_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS030505_02($data: I_S030505_02!) {
                        mgrQueryS030505_02(data: $data) {
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            STOCK_QTY
                            PO_QTY
                            PO_TYPE_NAME
                            REASON_TYPE
                            FARE_TYPE
                            REMARK
                            VENDOR_NAME
                            STOCK_STATUS
                            USE_PO_TYPE
                            USE_PO_CD
                            USE_PO_SEQ
                            USE_ORDER_CD
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            MATL_SEQ
                            FACTORY_CD
                            STOCK_IDX
                            REMARK2
                            PLAN_REMARK
                            VENDOR_CD
                            ORDER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log("mgrQueryS030505_02:" + data.mgrQueryS030505_02.length);
            return data.mgrQueryS030505_02;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_MATL_MST2(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS030505_02_1($data: I_S030505_02_1!) {
                        mgrQueryS030505_02_1(data: $data) {
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            STOCK_QTY
                            PO_QTY
                            PO_TYPE_NAME
                            REASON_TYPE
                            FARE_TYPE
                            REMARK
                            VENDOR_NAME
                            STOCK_STATUS
                            USE_PO_TYPE
                            USE_PO_CD
                            USE_PO_SEQ
                            USE_ORDER_CD
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            MATL_SEQ
                            FACTORY_CD
                            STOCK_IDX
                            REMARK2
                            PLAN_REMARK
                            VENDOR_CD
                            ORDER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "mgrQueryS030505_02:" + data.mgrQueryS030505_02_1.length,
            );
            return data.mgrQueryS030505_02_1;
        } catch (e) {
            return e;
        }
    }
}
