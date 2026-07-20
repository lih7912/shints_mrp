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

export class ServiceS030510_PO_MAKE_MRP {
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
                    mutation MgrInsert_S030510_MRP_MAKE(
                        $datas: [I_S030510_MRP_MAKE!]!
                    ) {
                        mgrInsert_S030510_MRP_MAKE(datas: $datas) {
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
                    data.mgrInsert_S030510_MRP_MAKE,
            );
            return data.mgrInsert_S030510_MRP_MAKE;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async saveMRP(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S030510_MRP_SAVE(
                        $datas: [I_S030510_MRP_SAVE!]!
                    ) {
                        mgrInsert_S030510_MRP_SAVE(datas: $datas) {
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
                    data.mgrInsert_S030510_MRP_SAVE,
            );
            return data.mgrInsert_S030510_MRP_SAVE;
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
                    query MgrQueryS030510_2($data: I_S030510_2!) {
                        mgrQueryS030510_2(data: $data) {
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
                "mgrQueryS030510_current_mrp:" + data.mgrQueryS030510_2.length,
            );
            return data.mgrQueryS030510_2;
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
                    query MgrQueryS030510_1($data: I_S030510_1!) {
                        mgrQueryS030510_1(data: $data) {
                            PO_MRP {
                                CHECK
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
                            MAX_SEQ
                            NEW_SEQ
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "mgrQueryS030510_New_mrp:" + data.mgrQueryS030510_1.length,
            );
            return data.mgrQueryS030510_1;
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
                    query MgrQuery_S030510_PO_MAKE_MRP_CODE {
                        mgrQuery_S030510_PO_MAKE_MRP_CODE {
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
                "marQuery_S030510_PO_MAKE_MRP_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S030510_PO_MAKE_MRP_CODE.BUYER_CD.length,
            );
            return data.mgrQuery_S030510_PO_MAKE_MRP_CODE;
        } catch (e) {
            return e;
        }
    }

    async queryMrpWorkStatus(poCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_MRP_WORK_STATUS($PO_CD: String!) {
                        mgrQuery_MRP_WORK_STATUS(PO_CD: $PO_CD) {
                            work_status
                            po_cd
                        }
                    }
                `,
                variables: {
                    PO_CD: poCd,
                },
            });
            console.log("MRP Work Status Query Result:", data.mgrQuery_MRP_WORK_STATUS);
            return data.mgrQuery_MRP_WORK_STATUS;
        } catch (e) {
            console.error("MRP Work Status Query Error:", e);
            // 에러를 객체로 반환하되 length 속성을 가지도록
            if (e.networkError) {
                console.error("Network Error:", e.networkError);
            }
            if (e.graphQLErrors) {
                console.error("GraphQL Errors:", e.graphQLErrors);
            }
            return null; // null을 반환해서 폴링 로직에서 처리
        }
    }
}
