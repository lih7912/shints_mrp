/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0404_PO_LIST {
    // SERVICE: EDT_KSV_PO_MATLLIST
    async mgrInsertEDT_KSV_PO_MATLLIST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0404_PO_LIST_EDT_KSV_PO_MATLLIST(
                        $datas: [I_S0404_PO_LIST_EDT_KSV_PO_MATLLIST!]!
                    ) {
                        mgrInsert_S0404_PO_LIST_EDT_KSV_PO_MATLLIST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0404_PO_LIST_EDT_KSV_PO_MATLLIST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_PO_MATLLIST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0404_PO_LIST_EDT_KSV_PO_MATLLIST(
                        $datas: [I_S0404_PO_LIST_EDT_KSV_PO_MATLLIST!]!
                    ) {
                        mgrUpdate_S0404_PO_LIST_EDT_KSV_PO_MATLLIST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0404_PO_LIST_EDT_KSV_PO_MATLLIST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_PO_MATLLIST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0404_PO_LIST_EDT_KSV_PO_MATLLIST(
                        $datas: [I_S0404_PO_LIST_EDT_KSV_PO_MATLLIST!]!
                    ) {
                        mgrDelete_S0404_PO_LIST_EDT_KSV_PO_MATLLIST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0404_PO_LIST_EDT_KSV_PO_MATLLIST;
        } catch (e) {
            return e;
        }
    }
    // SERVICE: TBL_KSV_PO_MATLLIST

    async mgrQueryTBL_KSV_PO_MATLLIST(argQRY_KSV_PO_MATLLIST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0404_1($data: I_S0404_1!) {
                        mgrQueryS0404_1(data: $data) {
                            REG_USER
                            VENDOR_NAME
                            PR_NUM
                            MATL_CD
                            COLOR
                            MATL_NAME
                            SPEC
                            UNIT
                            TOT_CNT
                            STOCK_QTY
                            COL1
                            REMARK
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MATLLIST,
                },
            });
            console.log("mgrQueryS0404_1:" + data.mgrQueryS0404_1.length);
            return data.mgrQueryS0404_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_PO_MATLLIST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0404_CODE($data: I_S0404_1!) {
                        mgrQueryS0404_CODE(data: $data) {
                            BUYER_CD {
                                COM_NAME
                                COM_CD
                            }
                            FACTORY_CD {
                                FACTORY_CD
                                FACTORY_NAME
                            }
                            PO_CD {
                                PO_CD
                                PO_STATUS
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MATLLIST,
                },
            });
            console.log(
                "mgrQueryS0404_CODE:" + data.mgrQueryS0404_CODE.PO_CD.length,
            );
            return data.mgrQueryS0404_CODE;
        } catch (e) {
            return e;
        }
    }
}
