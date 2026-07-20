/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import apolloOption_neoe from "../../assets/env_graphql_neoe";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0113_KCD_BUYER {
    // SERVICE: EDT_KCD_FACTORY

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_NEOE_CODE(argData) {
        apolloOption_neoe.cache = new InMemoryCache();
        const client_neoe = new ApolloClient(apolloOption_neoe);

        try {
            const { loading, error, data } = await client_neoe.query({
                query: gql`
                    query MgrQueryneoe_code($data: I_neoe_code!) {
                        mgrQueryneoe_code(data: $data) {
                            nm_mngd
                            cd_mngd
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryneoe_code;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_NEOE_INFO(argData) {
        apolloOption_neoe.cache = new InMemoryCache();
        const client_neoe = new ApolloClient(apolloOption_neoe);

        try {
            const { loading, error, data } = await client_neoe.query({
                query: gql`
                    query MgrQuery_neoe_info($data: I_NEOE_INFO!) {
                        mgrQuery_neoe_info(data: $data) {
                            MA_CODEDTL {
                                cd_field
                                cd_sysdef
                                nm_sysdef
                            }
                            MA_EXCHANGE {
                                curr_sour
                                rate_base
                            }
                            FI_MNGD {
                                cd_mngd
                                nm_mngd
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_neoe_info;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_CREDIT_RATING(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_BUYER_CREDIT_RATING(
                        $buyerCd: String!
                    ) {
                        mgrQuery_S0113_BUYER_CREDIT_RATING(BUYER_CD: $buyerCd) {
                            id
                            BUYER_CD
                            CREDIT_RATING
                            CREDIT_EXPIRE
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            return data.mgrQuery_S0113_BUYER_CREDIT_RATING;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_TEAMINFO(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_BUYER_TEAMINFO($buyerCd: String!) {
                        mgrQuery_S0113_BUYER_TEAMINFO(BUYER_CD: $buyerCd) {
                            BUYER_CD
                            FACTORY
                            TEAM
                            USER_ID
                            USER_NAME
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            return data.mgrQuery_S0113_BUYER_TEAMINFO;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_FILEINFO(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_BUYER_FILEINFO($buyerCd: String!) {
                        mgrQuery_S0113_BUYER_FILEINFO(BUYER_CD: $buyerCd) {
                            id
                            KIND
                            FILE_KEY
                            TITLE
                            NAME
                            URL
                            OBJECT_NAME
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            return data.mgrQuery_S0113_BUYER_FILEINFO;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_FILE(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_BUYER_FILE($buyerCd: String!) {
                        mgrQuery_S0113_BUYER_FILE(BUYER_CD: $buyerCd) {
                            id
                            file1
                            file2
                            file3
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            return data.mgrQuery_S0113_BUYER_FILE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_BANK(argBankCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_BUYER_BANK($bankCd: String!) {
                        mgrQuery_S0113_BUYER_BANK(BANK_CD: $bankCd) {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            BANK_TYPE1
                        }
                    }
                `,
                variables: {
                    bankCd: argBankCd,
                },
            });
            return data.mgrQuery_S0113_BUYER_BANK;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_USER(argBuyerTeam) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query mgrQuery_S0113_BUYER_USER($buyerTeam: String!) {
                        mgrQuery_S0113_BUYER_USER(BUYER_TEAM: $buyerTeam) {
                            id
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_CD
                            PART
                            RANK
                            EMAIL
                            USER_LEVEL
                            STATUS_CD
                            AUTH_KEY
                            ID_RSA
                            TEL_NO
                            EXCEL
                            BUYER_TEAM
                            CELLULAR
                            EMP_NO
                        }
                    }
                `,
                variables: {
                    buyerTeam: argBuyerTeam,
                },
            });
            return data.mgrQuery_S0113_BUYER_USER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_INFO(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_BUYER($data: I_S0113_1!) {
                        mgrQuery_S0113_BUYER(data: $data) {
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
                            STATUS_NAME
                            BUYER_TYPE_NAME
                            BUYER_TEAM_NAME
                            BUYER_TEAM_NEOE_NAME
                            NAT_NAME
                            PAY_RULE_NAME
                            BANK_NAME
                            ACCOUNT_NAME
                            ACCOUNT_NO
                            COMPANY_NAME
                            CREDIT_CURR
                            CREDIT_AMT
                            CREDIT_DATE
                            TOLERANCE
                            REPRESENTATIVE
                            SHIP_ADDR1
                            SHIP_ADDR2
                            SHIP_ADDR3
                            BUYER_TEAM
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0113_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_BUYER_CODE(argKind1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0113_CODE($kind1: String!) {
                        mgrQuery_S0113_CODE(KIND1: $kind1) {
                            T_KCD_BUYER_BANK_CD {
                                id
                                BANK_CD
                                BANK_NAME
                                ACCOUNT_NO
                                ACCOUNT_NAME
                                SFTCODE
                                ADDR1
                                ADDR2
                                BANK_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                BANK_BRANCH
                                BANK_TYPE1
                            }
                            T_KCD_BUYER_LOSS_FLAG {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_BUYER_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_BUYER_TEAM {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_BUYER_TEAM_NEOE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_NAT_CD {
                                id
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                            }
                            T_KCD_BUYER_PAY_RULE {
                                CD_CODE
                                CD_NAME
                            }
                            T_KCD_BUYER_CREDIT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_CREDIT_CURR {
                                id
                                CD_CODE
                                CD_NAME
                            }
                            T_KCD_BUYER_TOLERANCE {
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
            return data.mgrQuery_S0113_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_SAVE(argKCD_BUYER) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0113_BUYER_SAVE(
                        $datas: I_S0113_BUYER_SAVE!
                    ) {
                        mgrInsert_S0113_BUYER_SAVE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argKCD_BUYER,
                },
            });
            return data.mgrInsert_S0113_BUYER_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_DELETE(argKCD_BUYER) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0113_BUYER_DELETE(
                        $datas: I_S0113_BUYER_SAVE!
                    ) {
                        mgrInsert_S0113_BUYER_DELETE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argKCD_BUYER,
                },
            });

            console.log(data);
            return data.mgrInsert_S0113_BUYER_DELETE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_CREDIT_RATING_SAVE(argKCD_BUYER_CREDIT_RATING) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0113_BUYER_CREDIT_RATING_SAVE(
                        $datas: I_S0113_BUYER_SAVE!
                    ) {
                        mgrInsert_S0113_BUYER_CREDIT_RATING_SAVE(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argKCD_BUYER_CREDIT_RATING,
                },
            });
            return data.mgrInsert_S0113_BUYER_CREDIT_RATING_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_TEAM_INFO_SAVE(
        argKCD_BUYER_CREDIT_RATING,
        argBuyerCd,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0113_BUYER_TEAM_INFO_SAVE(
                        $datas: [I_S0113_BUYER_TEAM_INFO_SAVE!]!
                        $datas1: String!
                    ) {
                        mgrInsert_S0113_BUYER_TEAM_INFO_SAVE(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argKCD_BUYER_CREDIT_RATING,
                    datas1: argBuyerCd,
                },
            });
            return data.mgrInsert_S0113_BUYER_TEAM_INFO_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BUYER_FILE_INFO_SAVE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0113_BUYER_FILE_INFO_SAVE(
                        $datas: I_S0113_BUYER_FILE_INFO_SAVE!
                    ) {
                        mgrInsert_S0113_BUYER_FILE_INFO_SAVE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrInsert_S0113_BUYER_FILE_INFO_SAVE;
        } catch (e) {
            return e;
        }
    }
}
