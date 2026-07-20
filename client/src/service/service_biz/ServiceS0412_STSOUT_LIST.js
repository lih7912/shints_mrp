/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0412_STSOUT_LIST {
    async mgrInsert_CHK_CT_QTY(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0412_5_CHK_CT_QTY(
                        $datas: [I_S0412_5!]!
                    ) {
                        mgrInsert_S0412_5_CHK_CT_QTY(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0412_5_CHK_CT_QTY;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_CONFIRM_PACK(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0412_5_CONFIRM_PACK(
                        $datas: [I_S0412_5_1!]!
                    ) {
                        mgrInsert_S0412_5_CONFIRM_PACK(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0412_5_CONFIRM_PACK;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_STOCK_OUT
    async mgrQuery_CODE(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);
        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0412_CODE($data: I_S0412_1!) {
                        mgrQueryS0412_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            HIS_NO {
                                HIS_NO
                            }
                            PACK_CD {
                                SHIP_DATE
                                PACK_CD
                            }
                            PO_CD {
                                PO_CD
                            }
                            USER_ID {
                                USER_ID
                                USER_NAME
                            }
                            VENDOR_CD {
                                VENDOR_NAME
                                VENDOR_CD
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
                variables: {
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log(
                "mgrQueryS0412_CODE:" + data.mgrQueryS0412_CODE.PO_CD.length,
            );
            return data.mgrQueryS0412_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_STOCK_OUT(argQRY_KSV_STOCK_OUT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);
        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0412_1($data: I_S0412_1!) {
                        mgrQueryS0412_1(data: $data) {
                            DATA1 {
                                PO_CD
                                ORDER_CD
                                VENDOR_NAME
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                SHIP_DATE
                                ETA
                                PACK_CD
                                HIS_NO
                                OUT_QTY
                                OUT_FROM
                                CT_QTY
                                CT_NO
                                REMARK
                                DELIVERY
                                IN_TYPE_NAME
                                MATL_CD
                                OUT_TYPE_NAME
                                DEBIT_CD
                                IN_TYPE
                                OUT_STATUS
                                PO_SEQ
                                MRP_SEQ
                                IN_DATETIME
                                OUT_DATETIME
                                VENDOR_CD
                                VENDOR_TYPE
                                REG_DATETIME
                                PACK_CONFIRM
                                STOCK_IDX
                            }
                            DATA2 {
                                PO_CD
                                ORDER_CD
                                VENDOR_NAME
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                SHIP_DATE
                                ETA
                                PACK_CD
                                HIS_NO
                                OUT_QTY
                                OUT_FROM
                                CT_QTY
                                CT_NO
                                REMARK
                                DELIVERY
                                IN_TYPE_NAME
                                MATL_CD
                                OUT_TYPE_NAME
                                DEBIT_CD
                                IN_TYPE
                                OUT_STATUS
                                PO_SEQ
                                MRP_SEQ
                                IN_DATETIME
                                OUT_DATETIME
                                VENDOR_CD
                                VENDOR_TYPE
                                REG_DATETIME
                                PACK_CONFIRM
                                STOCK_IDX
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_STOCK_OUT,
                },
            });
            console.log(
                "mgrQueryS0412_1T:" + data.mgrQueryS0412_1.DATA1.length,
            );
            return data.mgrQueryS0412_1;
        } catch (e) {
            return e;
        }
    }
}
