/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0414_INVOICE_QRY_MATL {
    // SERVICE: TBL_KSV_MATL_INVOICE

    async mgrQuery_CODE(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0414_CODE($data: I_S0414_1!) {
                        mgrQueryS0414_CODE(data: $data) {
                            DELIVERY_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_NAME
                                FACTORY_CD
                            }
                            PAYMENT_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TRADE_TYPE {
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
            console.log(
                "mgrQueryS0414_CODE:" +
                    data.mgrQueryS0414_CODE.FACTORY_CD.length,
            );
            return data.mgrQueryS0414_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_INVOICE(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0414_2($data: I_S0414_2!) {
                        mgrQueryS0414_2(data: $data) {
                            INVOICE_NO
                            OUT_DATE
                            PACK_CD
                            PO_AMT
                            DELIVERY_TYPE_N
                            DELIVERY_WON
                            WON_AMT
                            DELIVERY_AMT
                            FACTORY_NAME
                            LICENSE_NO
                            LICENSE_DATE
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log("mgrQueryS0414_2:" + data.mgrQueryS0414_2.length);
            return data.mgrQueryS0414_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_INVOICE_PO(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0414_2_1($data: I_S0414_2_1!) {
                        mgrQueryS0414_2_1(data: $data) {
                            INVOICE_NO
                            PO_CD
                            PO_AMT
                            DELIVERY_AMT
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log("mgrQueryS0414_2_1:" + data.mgrQueryS0414_2_1.length);
            return data.mgrQueryS0414_2_1;
        } catch (e) {
            return e;
        }
    }
}
