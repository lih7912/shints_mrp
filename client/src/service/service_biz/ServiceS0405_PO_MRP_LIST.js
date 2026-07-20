/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0405_PO_MRP_LIST {
    // SERVICE: TBL_KSV_PO_MEM

    async mgrQuery_CODE(argQRY_KSV_PO_MATLLIST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0405_CODE($data: I_S0405_1!) {
                        mgrQueryS0405_CODE(data: $data) {
                            PO_CD {
                                PO_CD
                                PO_STATUS
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MATLLIST,
                },
            });
            console.log(
                "mgrQueryS0404_CODE:" + data.mgrQueryS0405_CODE.BUYER_CD.length,
            );
            return data.mgrQueryS0405_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_PO_MEM(argQRY_KSV_PO_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0405_1($data: I_S0405_1!) {
                        mgrQueryS0405_1(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            BUYER_NAME
                            DUE_DATE
                            TOT_CNT
                            COL1
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MEM,
                },
            });
            console.log("mgrQueryS0405_1:" + data.mgrQueryS0405_1.length);
            return data.mgrQueryS0405_1;
        } catch (e) {
            return e;
        }
    }
}
