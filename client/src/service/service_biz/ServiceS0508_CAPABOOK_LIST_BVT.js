/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0508_CAPABOOK_LIST_BVT {
    // SERVICE: EDT_KSV_CAPABOOK_MEM
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: EDT_KSV_CAPABOOK_MEM
    async mgrUpdate_END_PRODUCTION(argRetArray, argRetArray1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_5_END_PRODUCTION(
                        $datas: [I_S0508_5_END_PRODUCTION!]!
                        $datas1: [I_S0508_5_END_PRODUCTION2!]!
                    ) {
                        mgrUpdate_S0508_5_END_PRODUCTION(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                    datas1: argRetArray1,
                },
            });
            return data.mgrUpdate_S0508_5_END_PRODUCTION;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KSV_CAPABOOK_MEM
    async mgrUpdate_END_CANCEL(argRetArray, argRetArray1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_5_END_CANCEL(
                        $datas: [I_S0508_5_END_PRODUCTION!]!
                        $datas1: [I_S0508_5_END_PRODUCTION2!]!
                    ) {
                        mgrUpdate_S0508_5_END_CANCEL(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                    datas1: argRetArray1,
                },
            });
            return data.mgrUpdate_S0508_5_END_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsertEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrInsert_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrInsert_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrUpdate_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrUpdate_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateCAPA_END(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END(
                        $datas: [I_S0508_CAPABOOK_LIST_BVT_CAPA_END!]!
                    ) {
                        mgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END(
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
            return data.mgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateCAPA_END_CANCEL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END_CANCEL(
                        $datas: [I_S0508_CAPABOOK_LIST_BVT_CAPA_END!]!
                    ) {
                        mgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END_CANCEL(
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
            return data.mgrUpdate_S0508_CAPABOOK_LIST_BVT_CAPA_END_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrDelete_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrDelete_S0508_CAPABOOK_LIST_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM
    async mgrQueryCAPABOOK_DATE(argQRY_CAPABOOK_DATE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0508_CAPABOOK_LIST_BVT_DATE(
                        $userId: String!
                    ) {
                        mgrQuery_S0508_CAPABOOK_LIST_BVT_DATE(
                            USER_ID: $userId
                        ) {
                            BOOK_DATE_BVT
                            BOOK_DATE_ETP
                            NEW_DATE_BVT
                            NEW_DATE_ETP
                            BOOK_DATE_SAMPLE_BVT
                            NEW_DATE_SAMPLE_BVT
                            BOOK_DATE_SAMPLE_ETP
                            NEW_DATE_SAMPLE_ETP
                            BVT_KIND {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            NR {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            FACTORY_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: {
                    userId: argQRY_CAPABOOK_DATE,
                },
            });
            console.log("Service call =>");
            console.log(data.mgrQuery_S0508_CAPABOOK_LIST_BVT_DATE);
            return data.mgrQuery_S0508_CAPABOOK_LIST_BVT_DATE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ALL_LIST(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0508_ALL_LIST($data: I_S0508_ALL_LIST!) {
                        mgrQuery_S0508_ALL_LIST(data: $data) {
                            KIND
                            USER_ID
                            BOOK_DATE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0508_ALL_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_CAPABOOK_MEM(argQRY_KSV_CAPABOOK_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM(
                        $data: I_S0508_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
                    ) {
                        mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM(
                            data: $data
                        ) {
                            JOB_CD
                            IN_DATE
                            BOOK_DATE
                            BUYER_NAME
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            NR
                            QTY
                            MW
                            SHIP_DATE
                            S_ETA
                            M_ETA
                            SD
                            FOB
                            EXP_CMPT
                            NEGO_TYPE
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            FTP
                            DTP
                            LAZE
                            BVT_KIND
                            SEQ
                            REMARK
                            END_PRODUCTION_DATE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_CAPABOOK_MEM,
                },
            });
            console.log(
                "marQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM:" +
                    data.mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM
                        .length,
            );
            return data.mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM1

    async mgrQueryTBL_KSV_CAPABOOK_MEM1(argQRY_KSV_CAPABOOK_MEM1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM1(
                        $data: I_S0508_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM1!
                    ) {
                        mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1(
                            data: $data
                        ) {
                            JOB_CD
                            IN_DATE
                            BOOK_DATE
                            BUYER_NAME
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            NR
                            QTY
                            MW
                            SHIP_DATE
                            S_ETA
                            M_ETA
                            SD
                            FOB
                            EXP_CMPT
                            NEGO_TYPE
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            FTP
                            DTP
                            LAZE
                            BVT_KIND
                            SEQ
                            REMARK
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_CAPABOOK_MEM1,
                },
            });
            console.log(
                "marQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1:" +
                    data.mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1
                        .length,
            );
            return data.mgrQuery_S0508_CAPABOOK_LIST_BVT_TBL_KSV_CAPABOOK_MEM1;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryCAPABOOK_CODE(argQRY_CAPABOOK_DATE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0508_CODE($userId: String!) {
                        mgrQuery_S0508_CODE(USER_ID: $userId) {
                            CAPA_USER {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                        }
                    }
                `,
                variables: {
                    userId: argQRY_CAPABOOK_DATE,
                },
            });
            return data.mgrQuery_S0508_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PRINT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0508_EXCEL_PRINT(
                        $data: I_S0508_CAPABOOK_LIST_BVT_QRY_KSV_CAPABOOK_MEM!
                    ) {
                        mgrQuery_S0508_EXCEL_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0508_EXCEL_PRINT;
        } catch (e) {
            return e;
        }
    }
}
