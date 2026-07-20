/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS041206_SEA_FREIGHT {
    async mgrInsert_INSERT_SEA_FREIGHT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041206_5_0($datas: I_S041206_5_0!) {
                        mgrInsert_S041206_5_0(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S041206_5_0;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_SEA_FREIGHT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041206_5($datas: [I_S041206_5!]!) {
                        mgrInsert_S041206_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S041206_5;
        } catch (e) {
            return e;
        }
    }

    //

    async mgrQuery_CODE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS041206_CODE($data: I_S041206_1!) {
                        mgrQueryS041206_CODE(data: $data) {
                            VENDOR {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            REASON_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CHARGE1 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BUYER_CD {
                                BUYER_NAME
                                BUYER_CD
                            }
                            BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                                FACTORY_NAME2
                                USER_NAME
                                EMAIL
                                COUNTRY
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                PORT
                                AIRPORT
                                NAT_CD
                                BANK_CD
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                tag_po
                                tag_order
                                place_cd
                                PACK_NAME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "mgrQueryS041206_CODE:" + data.mgrQueryS041206_CODE.length,
            );
            return data.mgrQueryS041206_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_SEA_FREIGHT(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS041206_1($data: I_S041206_1!) {
                        mgrQueryS041206_1(data: $data) {
                            data {
                                BUYER_CD
                                DELAY_REASON_N
                                DELAY_REASON
                                CHARGE_KIND_N
                                CHARGE_KIND
                                BUYER_TEAM_N
                                BUYER_TEAM
                                FRT_PERCENT
                                AMOUNT
                                CURR_CD
                                PERCENT_FLAG
                                DISTRIBUTE_FLAG
                                FRT_FLAG
                            }
                            message
                            tot_amt
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log("mgrQueryS041206_1:" + data.mgrQueryS041206_1.length);
            return data.mgrQueryS041206_1;
        } catch (e) {
            return e;
        }
    }
}
