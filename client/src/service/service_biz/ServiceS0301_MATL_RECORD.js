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

export class ServiceS0301_MATL_RECORD {
    // SERVICE: EDT_KCD_MATL_MEM
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async process_BATCH_PRICE(argData, argData2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_BATCH_PRICE(
                        $datas: [I_S0301_BATCH_PRICE!]!
                        $datas1: I_S0301_BATCH_PRICE2!
                    ) {
                        mgrInsert_S0301_BATCH_PRICE(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData2,
                },
            });
            return data.mgrInsert_S0301_BATCH_PRICE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsertEDT_KCD_MATL_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
                    ) {
                        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
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
            return data.mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_MATL_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
                    ) {
                        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
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
            return data.mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_MATL_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MEM!]!
                    ) {
                        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MEM(
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
            return data.mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KCD_MATL_MST
    async mgrInsertEDT_KCD_MATL_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
                    ) {
                        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
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
            return data.mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_MATL_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
                    ) {
                        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
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
            return data.mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_MATL_MST_MULTI(argRetArray, argRetArray2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
                        $datas1: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI!]!
                    ) {
                        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI(
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
                    datas1: argRetArray2,
                },
            });
            return data.mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST_MULTI;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_ETC_UPDATE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_ETC_UPDATE(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
                    ) {
                        mgrUpdate_S0301_ETC_UPDATE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0301_ETC_UPDATE;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_MATL_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST!]!
                    ) {
                        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST(
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
            return data.mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KCD_MATL_MST1
    async mgrInsertEDT_KCD_MATL_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
                    ) {
                        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
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
            return data.mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_MATL_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
                    ) {
                        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
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
            return data.mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_MATL_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_MST1!]!
                    ) {
                        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST1(
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
            return data.mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_MST1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KCD_MATL_SALE
    async mgrInsertEDT_KCD_MATL_SALE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
                    ) {
                        mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
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
            return data.mgrInsert_S0301_MATL_RECORD_EDT_KCD_MATL_SALE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_MATL_SALE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
                    ) {
                        mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
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
            return data.mgrUpdate_S0301_MATL_RECORD_EDT_KCD_MATL_SALE;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_MATL_SALE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
                        $datas: [I_S0301_MATL_RECORD_EDT_KCD_MATL_SALE!]!
                    ) {
                        mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_SALE(
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
            return data.mgrDelete_S0301_MATL_RECORD_EDT_KCD_MATL_SALE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_MATL_MEM

    async mgrQueryCODE(argQRY_KCD_MATL_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0301_MATL_RECORD_CODE {
                        mgrQuery_S0301_MATL_RECORD_CODE {
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                                INVOICE_NAME
                                VENDOR_TYPE
                                SHINTS_USER
                                REG_NO
                                PRESIDENT
                                USER_NAME
                                PART
                                RANK
                                EMAIL
                                TEL_NO
                                FAX_NO
                                PAY_TYPE
                                PAY_TERM
                                LEAD_TIME
                                BANK_CD
                                NAT_CD
                                ZIP_NO
                                ADDR1
                                ADDR2
                                STATUS_CD
                                PERMIT
                                VENDOR_MATL_TYPE
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                BANK1
                                BANK2
                                GW
                                APPROKEY
                                BANK_CD2
                                BANK_CD3
                                NEOE_NO
                                REMARK
                                id
                            }
                            PRICE_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            MATL_CONF_FLAG {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            STATUS_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            MATL_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            MATL_UNIT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            BOX_UNIT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            COMP {
                                CD_CODE
                                CD_NAME
                            }
                            HS_CD {
                                HS_NAME
                                HS_NO
                            }
                            KIND2 {
                                SEQ
                                MATL_TYPE2
                                BVT_MATL_NAME
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MEM,
                },
            });
            console.log(
                "mgrQuery_S0301_MATL_RECORD_CODE:" +
                    data.mgrQuery_S0301_MATL_RECORD_CODE.KIND2.length,
            );
            return data.mgrQuery_S0301_MATL_RECORD_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_VENDOR(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0301_QRY_VENDOR(
                        $data: I_S0301_QRY_VENDOR!
                    ) {
                        mgrQuery_S0301_QRY_VENDOR(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0301_QRY_VENDOR;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_STYLE_LIST(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0301_QRY_STYLE_LIST(
                        $data: I_S0301_QRY_STYLE_LIST!
                    ) {
                        mgrQuery_S0301_QRY_STYLE_LIST(data: $data) {
                            matl_cd
                            prod_cd
                            style_name
                            net
                            loss
                            use_size
                            remark
                            order_cd
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0301_QRY_STYLE_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_REMARK_LIST(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0301_QRY_REMARK_LIST(
                        $data: I_S0301_QRY_REMARK_LIST!
                    ) {
                        mgrQuery_S0301_QRY_REMARK_LIST(data: $data) {
                            upd_user
                            upd_datetime
                            update_remark
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0301_QRY_REMARK_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_BATCH_SAVE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0301_QRY_BATCH_SAVE(
                        $data: I_S0301_QRY_BATCH_SAVE!
                    ) {
                        mgrQuery_S0301_QRY_BATCH_SAVE(data: $data) {
                            MATL_TYPE2
                            MATL_TYPE2_NAME
                            MATL_CD
                            MATL_TYPE
                            MATL_TYPE_NAME
                            VENDOR_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_UNIT_NAME
                            MATL_PRICE
                            CURR_CD
                            S_MATL_PRICE
                            S_CURR_CD
                            WEIGHT
                            BOX_UNIT
                            BOX_UNIT_NAME
                            STATUS_CD
                            STATUS_CD_NAME
                            UPD_USER
                            REG_USER
                            VENDOR_TYPE
                            HS_CD
                            ADD_RATE
                            ADD_AMT
                            ADD_LOSS
                            REG_DATETIME
                            PRICE_TYPE
                            rep_matl_cd
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0301_QRY_BATCH_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_MATL_MEM(argQRY_KCD_MATL_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_MATL_MEM(
                        $data: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
                    ) {
                        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM(
                            data: $data
                        ) {
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            UPD_USER
                            REG_DATETIME
                            UPD_DATETIME
                            UPDATE_REASON
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MEM,
                },
            });
            console.log(
                "marQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM:" +
                    data.mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM.length,
            );
            return data.mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_MATL_MST

    async mgrQueryTBL_KCD_MATL_MST(argQRY_KCD_MATL_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_MATL_MST(
                        $data: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
                    ) {
                        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MST(
                            data: $data
                        ) {
                            message
                            datas {
                                MATL_TYPE2
                                MATL_TYPE2_NAME
                                MATL_CD
                                MATL_TYPE
                                MATL_TYPE_NAME
                                VENDOR_CD
                                VENDOR_NAME
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                MATL_UNIT_NAME
                                MATL_PRICE
                                CURR_CD
                                S_MATL_PRICE
                                S_CURR_CD
                                WEIGHT
                                BOX_UNIT
                                BOX_UNIT_NAME
                                STATUS_CD
                                STATUS_CD_NAME
                                VENDOR_STATUS_CD
                                UPD_USER
                                REG_USER
                                VENDOR_TYPE
                                HS_CD
                                V_COMP
                                OFFER_SPEC
                                COMP1
                                COMP1_P
                                COMP2
                                COMP2_P
                                COMP3
                                COMP3_P
                                COMP4
                                COMP4_P
                                ADD_RATE
                                ADD_AMT
                                ADD_LOSS
                                REG_DATETIME
                                PRICE_TYPE
                                rep_matl_cd
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MST,
                },
            });
            return data.mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_MATL_SALE

    async mgrQueryTBL_KCD_MATL_SALE(argQRY_KCD_MATL_SALE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_MATL_SALE(
                        $data: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
                    ) {
                        mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE(
                            data: $data
                        ) {
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            UPD_USER
                            REG_DATETIME
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_SALE,
                },
            });
            console.log(
                "marQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE:" +
                    data.mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE.length,
            );
            return data.mgrQuery_S0301_MATL_RECORD_TBL_KCD_MATL_SALE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_SET_MOMCODE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_SET_MOMCODE(
                        $datas: I_S0301_MATL_RECORD_QRY_KCD_MATL_MST!
                        $datas1: [I_S0301_SET_MOMCODE!]!
                    ) {
                        mgrUpdate_S0301_SET_MOMCODE(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrUpdate_S0301_SET_MOMCODE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BATCH_SAVE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_BATCH_SAVE(
                        $datas: I_S0301_BATCH_SAVE1!
                        $datas1: [I_S0301_BATCH_SAVE2!]!
                    ) {
                        mgrInsert_S0301_BATCH_SAVE(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0301_BATCH_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BATCH_UPDATE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_BATCH_UPDATE(
                        $datas: I_S0301_BATCH_UPDATE1!
                        $datas1: [I_S0301_BATCH_UPDATE2!]!
                    ) {
                        mgrInsert_S0301_BATCH_UPDATE(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0301_BATCH_UPDATE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_BATCH_DELETE(argData, argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0301_BATCH_DELETE(
                        $datas: I_S0301_BATCH_UPDATE1!
                        $datas1: [I_S0301_BATCH_UPDATE2!]!
                    ) {
                        mgrInsert_S0301_BATCH_DELETE(
                            datas: $datas
                            datas1: $datas1
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argData,
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0301_BATCH_DELETE;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdate_REMARK(argDatas) {
        console.log("mgrUpdate_REMARK start");
        try {
            const { data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0301_REMARK(
                        $datas: [I_S0301_REMARK!]!
                    ) {
                        mgrUpdate_S0301_REMARK(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argDatas,
                },
            });

            return data.mgrUpdate_S0301_REMARK;
        } catch (e) {
            return e;
        }
    }
}
