/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS040202_ORDER_SHEET {
    // SERVICE: EDT_KSV_PO_MRP
    async mgrQuery_PoPlan(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrPoPlan_S040202_4($datas: [I_S040202_4!]!) {
                        mgrPoPlan_S040202_4(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrPoPlan_S040202_4;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_PO_MRP(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S040202_ORDER_SHEET_EDT_KSV_PO_MRP(
                        $datas: [I_S040202_ORDER_SHEET_EDT_KSV_PO_MRP!]!
                    ) {
                        mgrUpdate_S040202_ORDER_SHEET_EDT_KSV_PO_MRP(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S040202_ORDER_SHEET_EDT_KSV_PO_MRP;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_PO_MRP(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S040202_ORDER_SHEET_EDT_KSV_PO_MRP(
                        $datas: [I_S040202_ORDER_SHEET_EDT_KSV_PO_MRP!]!
                    ) {
                        mgrDelete_S040202_ORDER_SHEET_EDT_KSV_PO_MRP(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S040202_ORDER_SHEET_EDT_KSV_PO_MRP;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_USER

    async mgrQuery_ORDER_LIST(argQRY_KCD_USER) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040202_3_1($data: I_S040202_3_1!) {
                        mgrQueryS040202_3_1(data: $data) {
                            VENDOR_NAME
                            END_DATE
                            COL1
                            EMAIL
                            COL2
                            COL3
                            VENDOR_CD
                            VENDOR_TYPE
                            COL4
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_USER,
                },
            });
            console.log(
                "mgrQueryS040202_3_1:" + data.mgrQueryS040202_3_1.length,
            );
            return data.mgrQueryS040202_3_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MRP

    async mgrQuery_CODE(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040202_CODE($data: I_S040202_3_1!) {
                        mgrQueryS040202_CODE(data: $data) {
                            PLACE_CD {
                                PLACE_CD
                                PLACE_NAME
                                PLACE_TYPE
                                DELIVERY_TYPE
                                USER_NAME
                                TEL_NO
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                            PO_SEQ {
                                PO_CD
                                PO_SEQ
                                BUYER_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log(
                "mgrQueryS040202_CODE:" +
                    data.mgrQueryS040202_CODE.PO_SEQ.length,
            );
            return data.mgrQueryS040202_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE2(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS040202_CODE2($data: I_S040202_3_1!) {
                        mgrQueryS040202_CODE2(data: $data) {
                            MD_LIST {
                                EMAIL
                                MD
                            }
                            PLAN {
                                PO_CD
                                PO_SEQ
                                PO_TYPE
                                PO_DATE
                                PO_STATUS
                                MATL_DUE_DATE
                                PROD_DUE_DATE
                                PO_CONF_DATE
                                PLACE_CD
                                CURR_DATE
                                FACTORY_CD
                                DELIVERY_TYPE
                                YY
                                SEQ
                                PO_USER_MAIN
                                PO_USER_SUB
                                CLOSE_FLAG
                                CLOSE_USER
                                CLOSE_DATETIME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                REMARK
                                PLAN_FLAG
                                PLAN_ETD
                                PLAN_ETA
                                BVT_FLAG
                                ENTRY
                                ENTRY_DATE
                                NEW_FLAG
                                STOCK_MOVE_DATE
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log(
                "mgrQueryS040202_CODE2:" +
                    data.mgrQueryS040202_CODE2.MD_LIST.length,
            );
            return data.mgrQueryS040202_CODE2;
        } catch (e) {
            return e;
        }
    }
}
