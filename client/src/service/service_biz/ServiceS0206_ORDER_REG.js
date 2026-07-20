/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0206_ORDER_REG {
    // SERVICE: EDT_KSV_ORDER_MST
    async mgrInsert_KSV_ORDER_MST(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0206_ORDER_REG(
                        $datas: I_S0206_ORDER_REG_SAVE!
                    ) {
                        mgrInsert_S0206_ORDER_REG(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            console.log(
                "async mgrInsert_KSV_ORDER_MST  call succeed: " +
                    data.mgrInsert_S0206_ORDER_REG,
            );
            return data.mgrInsert_S0206_ORDER_REG;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    //

    async mgrQueryORDER_REG_QRY(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0206_ORDER_REG_QRY(
                        $data: I_S0206_ORDER_REG_QRY!
                    ) {
                        mgrQuery_S0206_ORDER_REG_QRY(data: $data) {
                            CODE_STYLE_CD {
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
                            CODE_FACTORY_CD {
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
                            CODE_BUYER_CD {
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
                            CODE_NAT_CD {
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
                            }
                            CODE_CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_STEP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_ROUND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_REASON {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SIZE_MST {
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_CNT
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            console.log(
                "marQueryORDER_REG_QRY:" +
                    data.mgrQuery_S0206_ORDER_REG_QRY.CODE_FACTORY_CD.length,
            );
            return data.mgrQuery_S0206_ORDER_REG_QRY;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_REG_QRY_STYLE_INFO(argQry) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0206_ORDER_REG_QRY_KCD_STYLE_INFO(
                        $data: I_S0206_ORDER_REG_QRY_KCD_STYLE_INFO!
                    ) {
                        mgrQuery_S0206_ORDER_REG_QRY_KCD_STYLE_INFO(
                            data: $data
                        ) {
                            STYLE_CD {
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
                            BUYER_CD {
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
                            PROD_MST {
                                PROD_CD
                                STYLE_CD
                                PROD_TYPE
                                COLOR
                                PROD_UNIT
                                COLLECTION
                                YY
                                SEQ
                                SIZE_LOSS
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQry,
                },
            });
            console.log(
                "marQueryORDER_REG_QRY_STYLE_INFO:" +
                    data.mgrQuery_S0206_ORDER_REG_QRY_KCD_STYLE_INFO.STYLE_CD
                        .length,
            );
            return data.mgrQuery_S0206_ORDER_REG_QRY_KCD_STYLE_INFO;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_FILE_INFO_SAVE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0206_BUYER_FILE_INFO_SAVE(
                        $datas: I_S0206_BUYER_FILE_INFO_SAVE!
                    ) {
                        mgrInsert_S0206_BUYER_FILE_INFO_SAVE(datas: $datas)
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0206_BUYER_FILE_INFO_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_FILEINFO(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S0206_BUYER_FILEINFO($buyerCd: String!) {
                        mgrQuery_S0206_BUYER_FILEINFO(BUYER_CD: $buyerCd) {
                            id
                            col1
                            col2
                            col3
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            return data.mgrQuery_S0206_BUYER_FILEINFO;
        } catch (e) {
            return e;
        }
    }
}
