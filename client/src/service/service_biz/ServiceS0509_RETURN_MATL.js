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

export class ServiceS0509_RETURN_MATL {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_RETURN_MATL(argInputData, argEditData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0509_5_RETURN_MATL(
                        $datas: [I_S0509_5!]!
                        $datas1: I_S0509_5_1!
                    ) {
                        mgrInsert_S0509_5_RETURN_MATL(
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
                    datas1: argEditData,
                },
            });
            return data.mgrInsert_S0509_5_RETURN_MATL;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_RETURN_NOTHING(argInputData, argEditData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0509_5_RETURN_NOTHING(
                        $datas: [I_S0509_5!]!
                        $datas1: I_S0509_5_1!
                    ) {
                        mgrInsert_S0509_5_RETURN_NOTHING(
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
                    datas1: argEditData,
                },
            });
            return data.mgrInsert_S0509_5_RETURN_NOTHING;
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
                    mutation MgrInsert_S0509_5_1(
                        $datas: [I_S0509_5_1!]!
                        $datas1: [I_S0509_5_2!]!
                    ) {
                        mgrInsert_S0509_5_1(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0509_5_1;
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
                    mutation MgrDelete_S0509_5($datas: I_S0509_5_1!) {
                        mgrDelete_S0509_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            return data.mgrDelete_S0509_5;
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
                    query MgrQueryS0509_1_CODE($data: I_S0509_CODE!) {
                        mgrQueryS0509_1_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            ORDER_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PO_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PURPOSE {
                                CD_CODE
                                CD_NAME
                            }
                            FACOUT_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PUR_FACTORY {
                                CD_CODE
                                CD_NAME
                            }
                            PAY_TYPE {
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
            return data.mgrQueryS0509_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE_DETAIL(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0509_1_CODE_DETAIL($data: I_S0509_CODE!) {
                        mgrQueryS0509_1_CODE_DETAIL(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            ORDER_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PO_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PURPOSE {
                                CD_CODE
                                CD_NAME
                            }
                            PUR_FACTORY {
                                CD_CODE
                                CD_NAME
                            }
                            PAY_TYPE {
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
            return data.mgrQueryS0509_1_CODE_DETAIL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE_DETAIL2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0509_1_DETAIL2($data: I_S0509_CODE!) {
                        mgrQueryS0509_1_DETAIL2(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            ORDER_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PO_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PURPOSE {
                                CD_CODE
                                CD_NAME
                            }
                            PUR_FACTORY {
                                CD_CODE
                                CD_NAME
                            }
                            PAY_TYPE {
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
            return data.mgrQueryS0509_1_CODE_DETAIL2;
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
                    query MgrQueryS0509_1_CODE2($data: I_S0509_CODE!) {
                        mgrQueryS0509_1_CODE2(data: $data) {
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
            return data.mgrQueryS0509_1_CODE2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE0(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0509_1_CODE0($data: I_S0509_CODE0!) {
                        mgrQueryS0509_1_CODE0(data: $data) {
                            ORDER_CD {
                                CD_CODE
                                CD_NAME
                            }
                            PO_CD {
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
            return data.mgrQueryS0509_1_CODE0;
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
                    query MgrQueryS0509_2($data: I_S0509_2!) {
                        mgrQueryS0509_2(data: $data) {
                            PO_CD
                            ORDER_CD
                            MATL_CD
                            PU_CD
                            PO_QTY2
                            PO_QTY
                            MRP_QTY
                            PO_SEQ
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            MATL_NAME
                            VENDOR_NAME
                            COLOR
                            SPEC
                            UNIT
                            CURR_CD
                            MASTER_PRICE
                            OUTFAC_QTY2
                            LINEOUT_QTY
                            RETURN_QTY
                            STOCK_QTY
                            LOST_QTY
                            BAL_QTY
                            VENDOR_CD
                            REMARK
                            FACOUT_ARRAY {
                                OUT_NAME
                                OUT_QTY
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0509_2;
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
                    query MgrQueryS0509_2_1($data: I_S0509_4_2!) {
                        mgrQueryS0509_2_1(data: $data) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            PO_QTY
                            IN_QTY
                            OUT_QTY
                            INFAC_QTY
                            OUTFAC_QTY
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            FACTORY_CD
                            DIFF_PO_TYPE
                            DIFF_QTY
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            TEMP_PRICE
                            PAY_EXP_DATE
                            MIN_ORDER
                            vendor_cd
                            lc_qty
                            min_conf_user
                            min_conf_datetime
                            min_stock_idx
                            PU_CD
                            MOQ
                            PO_QTY2
                            CURR_CD
                            MASTER_PRICE
                            FREIGHT_PRICE
                            OTHER_PRICE
                            SURCHARGE_REMARK
                            PO_PRICE
                            MOQ_PRICE
                            LEFTOVER_QTY
                            FOC_QTY
                            MOQ_STOCK_IDX
                            FOC_STOCK_IDX
                            LEFTOVER_STOCK_IDX
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0509_4_2;
        } catch (e) {
            return e;
        }
    }
}
