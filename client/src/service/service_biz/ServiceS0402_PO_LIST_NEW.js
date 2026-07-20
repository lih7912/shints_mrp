/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0402_PO_LIST_NEW {
    // SERVICE: TBL_KSV_PO_MRP

    async mgrQueryPoFix(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrPoFix_S0402_3($datas: [I_S0402_3!]!) {
                        mgrPoFix_S0402_3(datas: $datas) {
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
                "mgrPoFix_S0402_3  call succeed: " + data.mgrPoFix_S0402_3,
            );
            return data.mgrPoFix_S0402_3;
        } catch (e) {
            console.log("mgrPoFix_S0402_3 call error: ");
            return e;
        }
    }

    async mgrQueryTBL_KSV_PO_MRP(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0402_1($data: I_S0402_1!) {
                        mgrQueryS0402_1(data: $data) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            VENDOR_NAME
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            USE_PO_TYPE_NAME
                            USE_QTY
                            DIFF_QTY
                            COL1
                            COL2
                            PO_QTY
                            ADJ_PO_QTY
                            DIFF_PO_TYPE_NAME
                            UNIT
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            MRP_SEQ
                            MATL_SEQ
                            REG_DATETIME
                            USE_PO_TYPE
                            DIFF_PO_TYPE
                            PO_MATL_CD
                            VENDOR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log("mgrQueryS0402_1:" + data.mgrQueryS0402_1.length);
            return data.mgrQueryS0402_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MRP1

    async mgrQueryTBL_KSV_PO_MRP1(argQRY_KSV_PO_MRP1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0402_2($data: I_S0402_2!) {
                        mgrQueryS0402_2(data: $data) {
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            COL1
                            ORG_PO_SEQ
                            PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE_NAME
                            COL2
                            REMARK
                            VENDOR_NAME
                            DIFF_PO_TYPE
                            MRP_SEQ
                            MATL_SEQ
                            STOCK_IDX
                            SEQ_COMMENT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP1,
                },
            });
            console.log("mgrQueryS0402_2:" + data.mgrQueryS0402_2.length);
            return data.mgrQueryS0402_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0402_1_CODE {
                        mgrQueryS0402_1_CODE {
                            MATL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_SEQ
                                PO_STATUS
                                PO_CD
                            }
                            VENDOR_TYPE {
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
                "mgrQueryS0402_1_CODE:" +
                    data.mgrQueryS0402_1_CODE.PO_CD.length,
            );
            return data.mgrQueryS0402_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE2(argQRY_KSV_PO_MRP1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0402_1_CODE2($data: I_S0402_1!) {
                        mgrQueryS0402_1_CODE2(data: $data) {
                            PO_STATUS {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_SEQ {
                                PO_CD
                                PO_SEQ
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
                    data: argQRY_KSV_PO_MRP1,
                },
            });
            console.log(
                "mgrQueryS0402_1_CODE2:" +
                    data.mgrQueryS0402_1_CODE2.PO_SEQ.length,
            );
            return data.mgrQueryS0402_1_CODE2;
        } catch (e) {
            return e;
        }
    }
}
