/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0417_MATL_FREIGHT {
    // SERVICE: EDT_KSV_PO_MATL_LIST
    async mgrInsert_INSERT_MATL_FREIGHT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0417_5($datas: [I_S0417_5!]!) {
                        mgrInsert_S0417_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0417_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_ADD_EXPRESS(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0417_5_1(
                        $datas: [I_S0417_5!]!
                        $datas1: I_S0417_5_1!
                    ) {
                        mgrInsert_S0417_5_1(datas: $datas, datas1: $datas1) {
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
            return data.mgrInsert_S0417_5_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MATL_LIST

    async mgrQuery_CODE(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0417_CODE($data: I_S0417_1!) {
                        mgrQueryS0417_CODE(data: $data) {
                            AIR_CHARGE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            AREA_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BL_NO {
                                BL_NO
                            }
                            BL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DELAY_REASON {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DEPARTURE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DESTINATION {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DESTINATION2 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            EXPRESS_CHARGE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FRT_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FRT_TYPE2 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            MW {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PARCEL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_CD
                            }
                            RECEIVER {
                                RECEIVER_ID
                                USER_NAME
                                FACTORY_CD
                                id
                            }
                            SENDER {
                                USER_ID
                                USER_NAME
                            }
                            TRADE_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            UNIT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            CHARGE_KIND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_TEAM {
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
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0417_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_FIND(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0417_1($data: I_S0417_1_1!) {
                        mgrQueryS0417_1(data: $data) {
                            COL1
                            COL2
                            COL3
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log("mgrQueryS0417_1_1:" + data.mgrQueryS0417_1.length);
            return data.mgrQueryS0417_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_MATL_FREIGHT(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0417_2_1($data: I_S0417_2_1!) {
                        mgrQueryS0417_2_1(data: $data) {
                            FRT_DATE
                            TRADE_TYPE_N
                            COL
                            CONFIRM_CHECK
                            DEPARTURE_N
                            DESTINATION_N
                            SENDER
                            RECEIVER
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            SPEC
                            QTY
                            WEIGHT
                            AMOUNT
                            CURR_CD
                            DELAY_REASON_N
                            FRT_TYPE_N
                            AREA_TYPE_N
                            PARCEL_TYPE_N
                            BL_NO
                            COL2
                            COL3
                            REMARK
                            STYLE_NAME
                            MATL_CD
                            WEIGHT_NET
                            NET
                            VAT
                            ADP_CHECK
                            INVOICE_NO
                            CHARGE_KIND
                            CHARGE_CODE
                            REG_USER
                            REG_DATETIME
                            TRADE_TYPE
                            DESTINATION
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            UNIT
                            PRICE
                            MW
                            GARMENT_COMPO
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            MATL_NAME
                            COLOR
                            FRT_IDX
                            COL4
                            DEPARTURE
                            DELAY_REASON
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log("mgrQueryS0417_2_1:" + data.mgrQueryS0417_2_1.length);
            return data.mgrQueryS0417_2_1;
        } catch (e) {
            return e;
        }
    }
}
