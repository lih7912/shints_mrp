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

export class ServiceS030512_PO_MAKE_MRP_FIRST {
    // SERVICE: TBL_KSV_PO_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }
    async makeMRP(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030512_MRP_MAKE(
                        $datas: [I_S030512_MRP_MAKE!]!
                    ) {
                        mgrInsert_S030512_MRP_MAKE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030512_MRP_MAKE,
            );
            return data.mgrInsert_S030512_MRP_MAKE;
        } catch (e) {
            console.log("async mgrInsert_S030512_MRP_MAKE  call error: ");
            return e;
        }
    }

    async saveMRP(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030512_MRP_SAVE(
                        $datas: [I_S030512_MRP_SAVE!]!
                    ) {
                        mgrInsert_S030512_MRP_SAVE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S030512_MRP_SAVE,
            );
            return data.mgrInsert_S030512_MRP_SAVE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrQuery_CURRENT_MRP(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030512_2($data: I_S030512_2!) {
                        mgrQueryS030512_2(data: $data) {
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            USE_PO_TYPE_NAME
                            PO_QTY
                            MATL_PRICE
                            CURR_CD
                            VENDOR_NAME
                            COL1
                            MRP_SEQ
                            MATL_SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "mgrQueryS030512_current_mrp:" + data.mgrQueryS030512_2.length,
            );
            return data.mgrQueryS030512_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_NEW_MRP(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS030512_1($data: I_S030512_1!) {
                        mgrQueryS030512_1(data: $data) {
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            USE_PO_TYPE
                            USE_PO_TYPE_NAME
                            PO_QTY
                            MATL_PRICE
                            CURR_CD
                            VENDOR_NAME
                            MRP_SEQ
                            MATL_SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "mgrQueryS030512_New_mrp:" + data.mgrQueryS030512_1.length,
            );
            return data.mgrQueryS030512_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryCODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S030512_PO_MAKE_MRP_FIRST_CODE {
                        mgrQuery_S030512_PO_MAKE_MRP_FIRST_CODE {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                                BUYER_ABBR
                                BUYER_TEAM
                                SHINTS_USER
                                USER_NAME
                                EMAIL
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                COMM_FLAG
                                SALES_TEAM
                                NAT_CD
                                BANK_CD
                                STS_FLAG
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                NEOE_BUYER_CD_MOM
                                NEOE_BUYER_CD
                                NEOE_A23
                                loss_flag
                                glove_flag
                                MOM_CD
                                BUYER_TYPE
                                PAY_RULE
                                id
                            }
                            PO_STATUS {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_TYPE {
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
            console.log(
                "marQuery_S030512_PO_MAKE_MRP_FIRST_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S030512_PO_MAKE_MRP_FIRST_CODE.BUYER_CD
                        .length,
            );
            return data.mgrQuery_S030512_PO_MAKE_MRP_FIRST_CODE;
        } catch (e) {
            return e;
        }
    }
}
