/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0508_PRODUCTION_COMPLETE {
    // SERVICE: EDT_KSV_CAPABOOK_MEM
    async mgrInsertEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrInsert_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrInsert_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrUpdate_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrUpdate_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateCAPA_END(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_PRODUCTION_COMPLETE_CAPA_END(
                        $datas: [I_S0508_PRODUCTION_COMPLETE_CAPA_END!]!
                    ) {
                        mgrUpdate_S0508_PRODUCTION_COMPLETE_CAPA_END(
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
            return data.mgrUpdate_S0508_PRODUCTION_COMPLETE_CAPA_END;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateCAPA_END_CANCEL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0508_PRODUCTION_COMPLETE_CAPA_END_CANCEL(
                        $datas: [I_S0508_PRODUCTION_COMPLETE_CAPA_END!]!
                    ) {
                        mgrUpdate_S0508_PRODUCTION_COMPLETE_CAPA_END_CANCEL(
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
            return data.mgrUpdate_S0508_PRODUCTION_COMPLETE_CAPA_END_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrDelete_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrDelete_S0508_PRODUCTION_COMPLETE_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM
    async mgrQueryCAPABOOK_DATE(argQRY_CAPABOOK_DATE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0508_PRODUCTION_COMPLETE_DATE(
                        $userId: String!
                    ) {
                        mgrQuery_S0508_PRODUCTION_COMPLETE_DATE(
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
            console.log(data.mgrQuery_S0508_PRODUCTION_COMPLETE_DATE);
            return data.mgrQuery_S0508_PRODUCTION_COMPLETE_DATE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_CAPABOOK_MEM(argQRY_KSV_CAPABOOK_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM(
                        $data: I_S0508_PRODUCTION_COMPLETE_QRY_KSV_CAPABOOK_MEM!
                    ) {
                        mgrQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM(
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
                    data: argQRY_KSV_CAPABOOK_MEM,
                },
            });
            console.log(
                "marQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM:" +
                    data.mgrQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM
                        .length,
            );
            return data.mgrQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM1

    async mgrQueryTBL_KSV_CAPABOOK_MEM1(argQRY_KSV_CAPABOOK_MEM1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM1(
                        $data: I_S0508_PRODUCTION_COMPLETE_QRY_KSV_CAPABOOK_MEM1!
                    ) {
                        mgrQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM1(
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
                "marQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM1:" +
                    data
                        .mgrQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM1
                        .length,
            );
            return data.mgrQuery_S0508_PRODUCTION_COMPLETE_TBL_KSV_CAPABOOK_MEM1;
        } catch (e) {
            return e;
        }
    }
}
