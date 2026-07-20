/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0410_STSIN_INPUT_LIST {
    // SERVICE: TBL_KSV_PO_MRP

    async mgrInsert_IMPORT_PAY_REPORT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0410_5($datas: [I_S0410_5!]!) {
                        mgrInsert_S0410_5(datas: $datas) {
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
                "mgrInsert_S0408_5 call succeed: " +
                    data.mgrInsert_S0410_5.length,
            );
            return data.mgrInsert_S0410_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_CONFIRM_PAY_REPORT(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0410_5_1($datas: [I_S0410_5!]!) {
                        mgrInsert_S0410_5_1(datas: $datas) {
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
                "mgrInsert_S0408_5 call succeed: " +
                    data.mgrInsert_S0410_5_1.length,
            );
            return data.mgrInsert_S0410_5_1;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0410_3_1($data: I_S0410_3!) {
                        mgrQueryS0410_3_1(data: $data) {
                            BILL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BILL_TYPE2 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PO_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            USER_ID {
                                USER_ID
                                USER_NAME
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            VENDOR_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BANK_CD {
                                BANK_CD
                                BANK_NAME
                                ACCOUNT_NO
                                ACCOUNT_NAME
                                SFTCODE
                                ADDR1
                                ADDR2
                                BANK_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                BANK_BRANCH
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log(
                "mgrQueryS0410_3_1:" + data.mgrQueryS0410_3_1.VENDOR_CD.length,
            );
            return data.mgrQueryS0410_3_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_STOCK_IN(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0410_3($data: I_S0410_3!) {
                        mgrQueryS0410_3(data: $data) {
                            PO_CD
                            ORDER_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            IN_QTY
                            TOT_QTY
                            LC_QTY
                            BILL_TYPE
                            IN_DATE
                            IN_TYPE_NAME
                            PAY_PRICE
                            PAY_CURR_CD
                            PAY_DATE
                            PAY_REPORT
                            LC_BILL_NO
                            MATL_CD
                            MIN_FLAG
                            STOCK_QTY
                            OUT_STATUS
                            OUT_QTY
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            BILL_FLAG
                            IN_TYPE
                            VENDOR_TYPE
                            STOCK_IDX
                            CALC_FLAG
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log("mgrQueryS0410_3:" + data.mgrQueryS0410_3.length);
            return data.mgrQueryS0410_3;
        } catch (e) {
            return e;
        }
    }
}
