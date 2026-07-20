/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0210_CAPABOOK_RECORD_SAMPLE_BVT {
    // SERVICE: EDT_KSV_CAPABOOK_MEM
    async mgrInsertEDT_KSV_CAPABOOK_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrInsert_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrInsert_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM;
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
                    mutation MgrUpdate_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrUpdate_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrUpdate_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM;
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
                    mutation MgrDelete_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM(
                        $datas: [I_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM!]!
                    ) {
                        mgrDelete_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM(
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
            return data.mgrDelete_S0210_CAPABOOK_RECORD_SAMPLE_BVT_EDT_KSV_CAPABOOK_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_CAPABOOK_MEM

    async mgrQueryTBL_KSV_CAPABOOK_MEM(argQRY_KSV_CAPABOOK_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_CAPABOOK_MEM(
                        $data: I_S0210_CAPABOOK_RECORD_SAMPLE_BVT_QRY_KSV_CAPABOOK_MEM!
                    ) {
                        mgrQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM(
                            data: $data
                        ) {
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_NAME
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            NR
                            QTY
                            STS_QTY
                            COLOR
                            USE_SIZE
                            USAGE_NAME
                            USAGE
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
                "marQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM:" +
                    data
                        .mgrQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM
                        .length,
            );
            return data.mgrQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM;
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
                        $data: I_S0210_CAPABOOK_RECORD_SAMPLE_BVT_QRY_KSV_CAPABOOK_MEM1!
                    ) {
                        mgrQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM1(
                            data: $data
                        ) {
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_NAME
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            NR
                            QTY
                            STS_QTY
                            COLOR
                            USE_SIZE
                            USAGE_NAME
                            USAGE
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
                "marQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM1:" +
                    data
                        .mgrQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM1
                        .length,
            );
            return data.mgrQuery_S0210_CAPABOOK_RECORD_SAMPLE_BVT_TBL_KSV_CAPABOOK_MEM1;
        } catch (e) {
            return e;
        }
    }
}
