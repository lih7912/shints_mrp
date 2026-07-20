/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0403_MATL_PO_LIST {
    // SERVICE: TBL_KSV_PO_MRP
    async mgrQuery_CODE(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0403_CODE($data: I_S0403_1!) {
                        mgrQueryS0403_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
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
                                BUYER_CD
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
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log("mgrQueryS0403_CODE:" + data.mgrQueryS0403_CODE.length);
            return data.mgrQueryS0403_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_PO_MRP(argQRY_KSV_PO_MRP) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0403_1($data: I_S0403_1!) {
                        mgrQueryS0403_1(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_CD
                            CURR_CD
                            MATL_PRICE
                            TOT_AMT
                            EXP_USEQTY
                            EXP_POQTY
                            PO_DATE
                            MATL_DUE_DATE
                            EXP_DIFF
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MRP,
                },
            });
            console.log("mgrQueryS0403_1:" + data.mgrQueryS0403_1.length);
            return data.mgrQueryS0403_1;
        } catch (e) {
            return e;
        }
    }
}
