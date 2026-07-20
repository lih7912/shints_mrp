/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0207_PO_REGIST {
    // SERVICE: EDT_KSV_ORDER_MST
    async mgrInsertEDT_KSV_ORDER_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
                        $datas: [I_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
                    ) {
                        mgrInsert_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
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
            return data.mgrInsert_S0207_PO_REGIST_EDT_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
                        $datas: [I_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
                    ) {
                        mgrUpdate_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
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
            return data.mgrUpdate_S0207_PO_REGIST_EDT_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
                        $datas: [I_S0207_PO_REGIST_EDT_KSV_ORDER_MST!]!
                    ) {
                        mgrDelete_S0207_PO_REGIST_EDT_KSV_ORDER_MST(
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
            return data.mgrDelete_S0207_PO_REGIST_EDT_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MST
    async mgrQueryTBL_KSV_ORDER_MST_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0207_PO_REGIST_CODE {
                        mgrQuery_S0207_PO_REGIST_CODE {
                            STYLE {
                                STYLE_CD
                                STYLE_NAME
                                BUYER_CD
                                MW
                                EMBRO
                                TP
                                SP
                                LTHR
                                G
                                W
                                S
                                FND
                                DL
                                DOWN
                                CUT
                                KIND
                                BVT_KIND
                                YY
                                SEQ
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                TPR
                                EMBOSSING
                                WASHING
                                style_kname
                                ss_direct_rate
                                ss_extra_rate
                                ss_retail_rate
                                ss_web_rate
                                ss_nsr_rate
                                ss_webex_rate
                                minus_limit
                                in_exp_date
                                FTP
                                DTP
                                LAZE
                                id
                            }
                            BUYER {
                                BUYER_CD
                                BUYER_NAME
                                BUYER_ABBR
                                BUYER_TEAM
                                SHINTS_USER
                                USER_NAME
                                EMAIL
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                COMM_FLAG
                                SALES_TEAM
                                NAT_CD
                                BANK_CD
                                STS_FLAG
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                NEOE_BUYER_CD_MOM
                                NEOE_BUYER_CD
                                NEOE_A23
                                loss_flag
                                glove_flag
                                MOM_CD
                                BUYER_TYPE
                                PAY_RULE
                                id
                            }
                        }
                    }
                `,
            });
            console.log(
                "marQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S0207_PO_REGIST_CODE.STYLE.length,
            );
            return data.mgrQuery_S0207_PO_REGIST_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_ORDER_MST(argQRY_KSV_ORDER_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST(
                        $data: I_S0207_PO_REGIST_QRY_KSV_PO_MST!
                    ) {
                        mgrQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST(
                            data: $data
                        ) {
                            ORDER_CD
                            STYLE_NAME
                            DUE_DATE
                            TOT_CNT
                            ORDER_STATUS_NAME
                            FACTORY_NAME
                            STYLE_CD
                            ORDER_STATUS
                            FACTORY_CD
                            SAMPLE_FLAG
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MST,
                },
            });
            console.log(
                "marQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST:" +
                    data.mgrQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST.length,
            );
            return data.mgrQuery_S0207_PO_REGIST_TBL_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }
    // SERVICE: TBL_KSV_PO_MST

    async mgrQueryTBL_KSV_PO_MST(argQRY_KSV_PO_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0207_PO_REGIST_TBL_KSV_PO_MST(
                        $data: I_S0207_PO_REGIST_QRY_KSV_PO_MST!
                    ) {
                        mgrQuery_S0207_PO_REGIST_TBL_KSV_PO_MST(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            DUE_DATE
                            TOT_CNT
                            ORDER_STATUS_NAME
                            FACTORY_NAME
                            STYLE_CD
                            ORDER_STATUS
                            FACTORY_CD
                            SAMPLE_FLAG
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PO_MST,
                },
            });
            console.log(
                "marQuery_S0207_PO_REGIST_TBL_KSV_PO_MST:" +
                    data.mgrQuery_S0207_PO_REGIST_TBL_KSV_PO_MST.length,
            );
            return data.mgrQuery_S0207_PO_REGIST_TBL_KSV_PO_MST;
        } catch (e) {
            return e;
        }
    }
}
