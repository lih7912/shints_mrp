/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0416_MATL_DELAY_REPORT {
    // SERVICE: TBL_KSV_PO_MATL_LIST
    async mgrInsert_INSERT_DELAY(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0416_5($datas: [I_S0416_5!]!) {
                        mgrInsert_S0416_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0416_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0416_CODE($data: I_S0416_1!) {
                        mgrQueryS0416_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            DELAY_REASON {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            DELIVERY2 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            FARE_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            MATL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                PO_CD
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
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log("mgrQueryS0416_CODE:" + data.mgrQueryS0416_CODE.length);
            return data.mgrQueryS0416_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_DELAY(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0416_2_1($data: I_S0416_2_1!) {
                        mgrQueryS0416_2_1(data: $data) {
                            REG_DATE
                            PO_CD
                            BUYER_CD
                            PO_CONF_DATE
                            PLAN_ETD
                            PLAN_ETA
                            VENDOR_NAME
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            NEED_QTY
                            REMAIN_QTY
                            DELAY_REASON
                            REMARK
                            EX_IN_DATE
                            CUT_DATE
                            ETA
                            ETD
                            DELIVERY_TYPE
                            FARE_TYPE
                            MATL_CD1
                            SEQ
                            PO_CONF_DATE2
                            ORIGINAL_ETD2
                            ORIGINAL_ETDA
                            SHIP_QTY
                            END_FLAG
                            EX_IN_DATE1
                            UPD_USER
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log("mgrQueryS0416_2_1:" + data.mgrQueryS0416_2_1.length);
            return data.mgrQueryS0416_2_1;
        } catch (e) {
            return e;
        }
    }
}
