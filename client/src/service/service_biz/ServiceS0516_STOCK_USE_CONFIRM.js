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

export class ServiceS0516_STOCK_USE_CONFIRM {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    //
    async mgrInsert_STOCK_CONFIRM(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0516_5_stock_confirm(
                        $datas: [I_S0516_5!]!
                    ) {
                        mgrInsert_S0516_5_stock_confirm(datas: $datas) {
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
                "mgrInsert_S0516_5 call succeed: " +
                    data.mgrInsert_S0516_5_stock_confirm,
            );
            return data.mgrInsert_S0516_5_stock_confirm;
        } catch (e) {
            console.log("async mgrInsert_Stock_Confirm  call error: ");
            return e;
        }
    }

    //
    async mgrInsert_STOCK_CONFIRM_PURCHASE(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0516_5_stock_confirm_purchase(
                        $datas: [I_S0516_5!]!
                    ) {
                        mgrInsert_S0516_5_stock_confirm_purchase(
                            datas: $datas
                        ) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrInsert_S0516_5_stock_confirm_purchase;
        } catch (e) {
            console.log("async mgrInsert_Stock_Confirm  call error: ");
            return e;
        }
    }

    async mgrUpdate_STOCK_CANCEL(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0516_5_stock_cancel(
                        $datas: [I_S0516_5!]!
                    ) {
                        mgrUpdate_S0516_5_stock_cancel(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrUpdate_S0516_5_stock_cancel;
        } catch (e) {
            console.log("async mgrUpdate_Stock_Cancel  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCk_USE

    async mgrQuery_CODE(argQRY_KSV_STOCK_USE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_CODE($data: I_S0516_1!) {
                        mgrQueryS0516_CODE(data: $data) {
                            PO_SEQ {
                                PO_SEQ
                            }
                            FACTORY_WARE {
                                FACTORY_CD
                                WARE_NAME
                            }
                            PO_CD {
                                PO_CD
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            CONDITION {
                                CD_CODE
                                CD_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE_PO_SEQ(argQRY_KSV_STOCK_USE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_CODE_PO_SEQ($data: I_S0516_1!) {
                        mgrQueryS0516_CODE_PO_SEQ(data: $data) {
                            PO_SEQ {
                                PO_SEQ
                            }
                            FACTORY_WARE {
                                FACTORY_CD
                                WARE_NAME
                            }
                            PO_CD {
                                PO_CD
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_CODE_PO_SEQ;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1_bak(argQRY_KSV_STOCK_USE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_2_2($data: I_S0516_2_2_0!) {
                        mgrQueryS0516_2_2(data: $data) {
                            WARE_NAME
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MRP_SEQ
                            MATL_CD2
                            MATL_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            STOCK_STATUS
                            RACK
                            LOCATION
                            USE_QTY
                            TOTAL_QTY
                            REAL_QTY
                            DEFECT_QTY2
                            LOSS_QTY2
                            CONF_FLAG
                            CONF_USER
                            CONF_DATETIME
                            USE_PO_CD
                            USE_ORDER_CD
                            USE_DATETIME
                            USE_PO_SEQ
                            USE_MRP_SEQ
                            USE_MATL_SEQ
                            FACTORY_CD
                            STOCK_IDX
                            ROOT_IDX
                            REQ_QTY
                            DEFECT_QTY
                            LOSS_QTY
                            REG_DATETIME
                            ORG_STOCK_IDX
                            RACK
                            LOCATION
                            ORG_QTY
                            WARE_NAME
                            ORG_PO_CD
                            ORG_PO_SEQ
                            ORG_MATL_CD
                            CONDITION
                            USE_DATE
                            HS_CODE
                            COMPOSITION
                            PRICE
                            WEIGHT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_2_2_0;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_STOCK_USE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_2_2($data: I_S0516_2_2_0!) {
                        mgrQueryS0516_2_2(data: $data) {
                            PO_CD
                            PO_SEQ
                            MATL_CD
                            ORDER_CD
                            MRP_SEQ
                            STOCK_IDX
                            USE_QTY
                            PO_QTY
                            DIFF_PO_TYPE
                            USE_PO_TYPE
                            STOCK_IDX2
                            USE_QTY2
                            CONF_FLAG
                            CONF_USER
                            REQ_QTY
                            OKUSE_QTY
                            DEFECT_QTY
                            SHORT_QTY
                            LOSS_QTY
                            BALANCE
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            NOTUSE_QTY
                            REASON
                            CANCEL_QTY
                            RACK
                            LOCATION
                            WARE_NAME
                            VENDOR_NAME
                            ORG_QTY
                            ORG_PO_CD
                            ORG_PO_SEQ
                            ORG_MATL_CD
                            CONDITION
                            USE_DATE
                            DELIVERY
                            HS_CODE
                            COMPOSITION
                            WEIGHT
                            PRICE
                            CURR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_2_2;
        } catch (e) {
            return e;
        }
    }

    async mgrExport_EXCEL(datasTBL_KSV_STOCK_USE) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_export_EXCEL(
                        $data: [I_S0516_export_STOCK_USE_LIST!]!
                    ) {
                        mgrQueryS0516_export_EXCEL(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: datasTBL_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_export_EXCEL;
        } catch (e) {
            console.log(
                "async mgrQueryS0516_export_EXCEL call error: ",
                e.message,
            );
            return e;
        }
    }

    async mgrExport_STOCK_USE_LIST(datasTBL_KSV_STOCK_USE) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_export_STOCK_USE_LIST(
                        $data: [I_S0516_export_STOCK_USE_LIST!]!
                    ) {
                        mgrQueryS0516_export_STOCK_USE_LIST(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: datasTBL_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_export_STOCK_USE_LIST;
        } catch (e) {
            console.log(
                "async mgrQueryS0516_export_STOCK_USE_LIST call error: ",
                e.message,
            );
            return e;
        }
    }

    async mgrExport_STOCK_CHECK_FORM(datasTBL_KSV_STOCK_USE) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_export_STOCK_CHECK_FORM(
                        $data: [I_S0516_export_STOCK_USE_LIST!]!
                    ) {
                        mgrQueryS0516_export_STOCK_CHECK_FORM(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: datasTBL_KSV_STOCK_USE,
                },
            });
            return data.mgrQueryS0516_export_STOCK_CHECK_FORM;
        } catch (e) {
            console.log(
                "async mgrQueryS0516_export_STOCK_CHECK_FORM call error: ",
                e.message,
            );
            return e;
        }
    }

    async mgrExport_EXCEL2(datasTBL_KSV_STOCK_USE2) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0516_export_EXCEL2(
                        $data: [I_S0516_export_ETP_EXCEL!]!
                    ) {
                        mgrQueryS0516_export_EXCEL2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: datasTBL_KSV_STOCK_USE2,
                },
            });
            return data.mgrQueryS0516_export_EXCEL2;
        } catch (e) {
            console.log(
                "async mgrQueryS0516_export_EXCEL2 call error: ",
                e.message,
            );
            return e;
        }
    }
}
