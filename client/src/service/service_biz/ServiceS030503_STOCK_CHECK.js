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

export class ServiceS030503_STOCK_CHECK {
    // SERVICE: TBL_KCD_MATL_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrUseStock_N_1(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUseStock_S030503_3_N_1($datas: I_S030503_3!) {
                        mgrUseStock_S030503_3_N_1(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrUseStock_S030503_3  call succeed: " +
                    data.mgrUseStock_S030503_3,
            );
            return data.mgrUseStock_S030503_3_N_1;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUseStock_1_N(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUseStock_S030503_3_1_N($datas: I_S030503_3!) {
                        mgrUseStock_S030503_3_1_N(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrUseStock_S030503_3  call succeed: " +
                    data.mgrUseStock_S030503_3,
            );
            return data.mgrUseStock_S030503_3_1_N;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUseStock_N_N(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUseStock_S030503_3_N_N($datas: I_S030503_3!) {
                        mgrUseStock_S030503_3_N_N(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrUseStock_S030503_3  call succeed: " +
                    data.mgrUseStock_S030503_3,
            );
            return data.mgrUseStock_S030503_3_N_N;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrStockCancel(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrStockCancel_S030503_3($datas: I_S030503_3!) {
                        mgrStockCancel_S030503_3(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrStockCancel_S030503_3;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrAutoUseStock(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrAutoUseStock_S030503_3($datas: I_S030503_3_0!) {
                        mgrAutoUseStock_S030503_3(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrUseStock_S030503_3  call succeed: " + data.mgrAutoUseStock_S030503_3);
            return data.mgrAutoUseStock_S030503_3;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrConfirmUseStock(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrConfirmUseStock_S030503_3(
                        $datas: I_S030503_3_1!
                    ) {
                        mgrConfirmUseStock_S030503_3(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrConfirmUseStock_S030503_3  call succeed: " +
                    data.mgrConfirmUseStock_S030503_3,
            );
            return data.mgrConfirmUseStock_S030503_3;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrQueryTBL_KCD_MATL_MST(argQRY_KCD_MATL_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030503_2($data: I_S030503_2!) {
                        mgrQueryS030503_2(data: $data) {
                            PO_CD
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            RACK
                            LOCATION
                            REMAIN_QTY
                            VENDOR_NAME
                            STOCK_STATUS
                            FACTORY_NAME
                            FACTORY_NAME2
                            FACTORY_CD
                            REMARK
                            PLAN_REMARK
                            REASON_REMARK
                            PO_SEQ
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            STOCK_IDX
                            ORG_STOCK_IDX
                            ROOT_IDX
                            MATL_TYPE
                            MATL_TYPE2
                            MATL_TYPE_N
                            MATL_TYPE2_N
                            AUTHORITY
                            STOCK_STATUS_N
                            USE_QTY
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MST,
                },
            });
            console.log("mgrQueryS030503_2:" + data.mgrQueryS030503_2.length);
            return data.mgrQueryS030503_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryFactoryByStockIdx(stockIdx) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030503_2_FACTORY_BY_STOCK_IDX(
                        $data: I_S030503_2!
                    ) {
                        mgrQueryS030503_2_FACTORY_BY_STOCK_IDX(data: $data) {
                            FACTORY_CD
                            FACTORY_NAME2
                            STOCK_IDX
                        }
                    }
                `,
                variables: {
                    data: {
                        PO_CD: "",
                        MATL_CD: "",
                        MATL_NAME: "",
                        COLOR: "",
                        RACK: "",
                        FACTORY_CD: "",
                        SPEC: "",
                        VENDOR_CD: "",
                        MATL_KIND2: "",
                        STATUS_CD: "",
                        STOCK_IDX: stockIdx || "",
                    },
                },
                fetchPolicy: "no-cache",
            });

            return data.mgrQueryS030503_2_FACTORY_BY_STOCK_IDX;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MEM

    async mgrQueryTBL_KSV_PO_MST(argQRY_KSV_ORDER_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030503($data: I_S030503!) {
                        mgrQueryS030503(data: $data) {
                            ORDER_CD
                            STYLE_NAME
                            BUYER_NAME
                            TOT_CNT
                            DUE_DATE
                            FACTORY_NAME
                            FACTORY_CD
                            PO_LOG_TYPE
                            PO_LOG_TYPE_N
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MEM,
                },
            });
            console.log("mgrQueryS030503:" + data.mgrQueryS030503.length);
            return data.mgrQueryS030503;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_ORDER_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030503_CODE($data: I_S030503!) {
                        mgrQueryS030503_CODE(data: $data) {
                            PO_SEQ {
                                PO_SEQ
                                PO_SEQ_N
                            }
                            PO_MST {
                                PO_CD
                                PO_SEQ
                                PO_STATUS
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
                            PO_STATUS {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_LOG_TYPE {
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
                            TYPE2 {
                                SEQ
                                MATL_TYPE2
                                BVT_MATL_NAME
                                id
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                                INVOICE_NAME
                                VENDOR_TYPE
                                SHINTS_USER
                                REG_NO
                                PRESIDENT
                                USER_NAME
                                PART
                                RANK
                                EMAIL
                                TEL_NO
                                FAX_NO
                                PAY_TYPE
                                PAY_TERM
                                LEAD_TIME
                                BANK_CD
                                NAT_CD
                                ZIP_NO
                                ADDR1
                                ADDR2
                                STATUS_CD
                                PERMIT
                                VENDOR_MATL_TYPE
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                BANK1
                                BANK2
                                GW
                                APPROKEY
                                BANK_CD2
                                BANK_CD3
                                NEOE_NO
                                REMARK
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MEM,
                },
            });
            console.log(
                "mgrQueryS030503_CODE:" +
                    data.mgrQueryS030503_CODE.VENDOR_CD.length,
            );
            return data.mgrQueryS030503_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST

    async mgrQueryTBL_KSV_PO_MRP(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030503_1($data: I_S030503_1!) {
                        mgrQueryS030503_1(data: $data) {
                            PO_SEQ 
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            PO_MATL_CD
                            USE_PO_TYPE_N
                            USE_QTY
                            PO_QTY
                            SUM_QTY
                            VENDOR_NAME
                            STOCK_CHK
                            MRP_SEQ
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            PO_MRP_SEQ
                            REG_DATETIME
                            STOCK_IDX
                            RACK
                            ROOT_IDX
                            FACTORY_CD
                            NEW_FACTORY_CD
                            MATL_KIND2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log("mgrQueryS030503_1:" + data.mgrQueryS030503_1.length);
            return data.mgrQueryS030503_1;
        } catch (e) {
            return e;
        }
    }
}
