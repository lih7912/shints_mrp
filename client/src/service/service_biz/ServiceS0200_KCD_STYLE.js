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

export class ServiceS0200_KCD_STYLE {
    // SERVICE: EDT_KCD_FACTORY

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgr1KcdStyleSave(argsKCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation mgrInsert_KCD_STYLE_SAVE(
                        $datas: I_S0200_KCD_STYLE_IN!
                    ) {
                        mgrInsert_KCD_STYLE_SAVE(datas: $datas) {
                            STYLE_CD
                        }
                    }
                `,
                variables: {
                    datas: {
                        data: {
                            id: argsKCD_STYLE.id,
                            BUYER_CD: argsKCD_STYLE.BUYER_CD,
                            BVT_FLAG: argsKCD_STYLE.BVT_FLAG,
                            BVT_KIND: argsKCD_STYLE.BVT_KIND,
                            CUT: argsKCD_STYLE.CUT,
                            DL: argsKCD_STYLE.DL,
                            DOWN: argsKCD_STYLE.DOWN,
                            DTP: argsKCD_STYLE.DTP,
                            EMBOSSING: argsKCD_STYLE.EMBOSSING,
                            EMBRO: argsKCD_STYLE.EMBRO,
                            FND: argsKCD_STYLE.FND,
                            FTP: argsKCD_STYLE.FTP,
                            G: argsKCD_STYLE.G,
                            W: argsKCD_STYLE.W,
                            KIND: argsKCD_STYLE.KIND,
                            LAZE: argsKCD_STYLE.LAZE,
                            LTHR: argsKCD_STYLE.LTHR,
                            MW: argsKCD_STYLE.MW,
                            REG_USER: argsKCD_STYLE.REG_USER,
                            S: argsKCD_STYLE.S,
                            SP: argsKCD_STYLE.SP,
                            STATUS_CD: argsKCD_STYLE.STATUS_CD,
                            STYLE_CD: argsKCD_STYLE.STYLE_CD,
                            STYLE_NAME: argsKCD_STYLE.STYLE_NAME,
                            TP: argsKCD_STYLE.TP,
                            TPR: argsKCD_STYLE.TPR,
                            UPD_USER: argsKCD_STYLE.UPD_USER,
                            WASHING: argsKCD_STYLE.WASHING,
                            PURPOSE: argsKCD_STYLE.PURPOSE,
                            FABRIC: argsKCD_STYLE.FABRIC,
                            STYLE_UNIT: argsKCD_STYLE.STYLE_UNIT,
                            imgURL: argsKCD_STYLE.imgURL,
                            objectName: argsKCD_STYLE.objectName,
                            fileName: argsKCD_STYLE.fileName,
                        },
                    },
                },
            });
            return data.mgrInsert_KCD_STYLE_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdStyleDelete(styleCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation mgrDelete_KCD_STYLE($styleCd: String!) {
                        mgrDelete_KCD_STYLE(STYLE_CD: $styleCd) {
                            STYLE_CD
                        }
                    }
                `,
                variables: {
                    styleCd: styleCd,
                },
            });
            return data.mgrDelete_KCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgr1KsvProdMstSave(argsKsvProdMst, argsBuyerCd, argOpMode) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_KSV_PROD_MST_SAVE(
                        $datas: [I_S0200_KSV_PROD_MST!]!
                        $buyerCd: String!
                        $opmode: String!
                    ) {
                        mgrInsert_KSV_PROD_MST_SAVE(
                            datas: $datas
                            BUYER_CD: $buyerCd
                            opmode: $opmode
                        ) {
                            STYLE_CD
                        }
                    }
                `,
                variables: {
                    datas: argsKsvProdMst,
                    buyerCd: argsBuyerCd,
                    opmode: argOpMode,
                },
            });
            return data.mgrInsert_KSV_PROD_MST_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgr1KsvProdMstDelete(argsKsvProdMst) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_KSV_PROD_MST(
                        $datas: [I_S0200_KSV_PROD_MST!]!
                    ) {
                        mgrDelete_KSV_PROD_MST(datas: $datas) {
                            STYLE_CD
                        }
                    }
                `,
                variables: {
                    datas: argsKsvProdMst,
                },
            });
            return data.mgrDelete_KSV_PROD_MST;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdStyleChild(argStyleCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0200_KCD_STYLE_CHILD($styleCd: String!) {
                        mgrQuery_S0200_KCD_STYLE_CHILD(STYLE_CD: $styleCd) {
                            id
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
                            STYLE_UNIT
                            PURPOSE
                            FABRIC
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
                            BUYER_NAME
                            STATUS_NAME
                            COLOR_CNT
                            PURPOSE_NAME
                            FABRIC_NAME
                        }
                    }
                `,
                variables: {
                    styleCd: argStyleCd,
                },
            });
            return data.mgrQuery_S0200_KCD_STYLE_CHILD;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdStyleImage(argStyleCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0200_KCD_STYLE_IMAGE($styleCd: String!) {
                        mgrQuery_S0200_KCD_STYLE_IMAGE(STYLE_CD: $styleCd) {
                            IMAGE_NAME
                        }
                    }
                `,
                variables: {
                    styleCd: argStyleCd,
                },
            });
            return data.mgrQuery_S0200_KCD_STYLE_IMAGE;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdStyleKsvProdMst(argStyleCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0200_KSV_PROD_MST($styleCd: String!) {
                        mgrQuery_S0200_KSV_PROD_MST(STYLE_CD: $styleCd) {
                            PROD_CD
                            STYLE_CD
                            PROD_TYPE
                            PROD_TYPE_N
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
                        }
                    }
                `,
                variables: {
                    styleCd: argStyleCd,
                },
            });
            return data.mgrQuery_S0200_KSV_PROD_MST;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdStyle(argStyleName, argBuyerName, argKind) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQuery_S0200_KCD_STYLE(
                        $styleName: String!
                        $buyerName: String!
                        $kind: String!
                    ) {
                        mgrQuery_S0200_KCD_STYLE(
                            STYLE_NAME: $styleName
                            BUYER_NAME: $buyerName
                            KIND: $kind
                        ) {
                            id
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
                            STYLE_UNIT
                            PURPOSE
                            FABRIC
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
                            BUYER_NAME
                            STATUS_NAME
                            PURPOSE_NAME
                            FABRIC_NAME
                            COLOR_CNT
                            fileName
                            fileUrl
                            objectName
                        }
                    }
                `,
                variables: {
                    styleName: argStyleName,
                    buyerName: argBuyerName,
                    kind: argKind,
                },
            });
            return data.mgrQuery_S0200_KCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdStyleCode(argKind1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0200_KCD_STYLE_CODE($kind1: String!) {
                        mgrQuery_S0200_KCD_STYLE_CODE(KIND1: $kind1) {
                            T_KCD_STYLE_STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_BUYER {
                                id
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
                                SHIP_ADDR1
                                SHIP_ADDR2
                                SHIP_ADDR3
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
                            }
                            T_KCD_STYLE_UNIT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_PURPOSE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_FABRIC {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_KIND {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_DL {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_MW {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_EMBRO {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_TP {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_SP {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_LTHR {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_G {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_W {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_LAZE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_S {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_FND {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_EMBOSSING {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_WASHING {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_CUT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_FTP {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_DTP {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_DOWN {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_PROD_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_STYLE_SAMPLE_USAGE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: { kind1: argKind1 },
            });
            return data.mgrQuery_S0200_KCD_STYLE_CODE;
        } catch (e) {
            return e;
        }
    }
}
