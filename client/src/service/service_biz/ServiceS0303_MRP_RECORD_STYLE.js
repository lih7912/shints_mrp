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

export class ServiceS0303_MRP_RECORD_STYLE {
    // SERVICE: EDT_KSV_PROD_MEM

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_ALL_ADD_MATERIAL(addArray, prodCds, argPosition) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_ADD_MATERIAL(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
                    ) {
                        mgrInsert_S0303_ALL_ADD_MATERIAL(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_ADD_MATERIAL;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL(addArray, prodCds, argPosition) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL_NET_LOSS(
        addArray,
        prodCds,
        argPosition,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL_NET_LOSS(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL_NET_LOSS(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL_NET_LOSS;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_UPDATE_SIZE_LOSS(addArray, prodCds, argPosition) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_UPDATE_SIZE_LOSS(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_UPDATE_SIZE_LOSS(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_UPDATE_SIZE_LOSS;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_CHANGE_VENDOR(addArray, prodCds, prodMems) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_CHANGE_VENDOR(
                        $datas: [I_S0303_CHANGE_VENDOR!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: [I_S0303_PROD_MEMS!]!
                    ) {
                        mgrInsert_S0303_CHANGE_VENDOR(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: prodMems,
                },
            });
            return data.mgrInsert_S0303_CHANGE_VENDOR;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL_MOVE_UP(
        addArray,
        prodCds,
        argPosition,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_UP(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_UP(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_UP;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL_MOVE_DOWN(
        addArray,
        prodCds,
        argPosition,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_DOWN(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_DOWN(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL_MOVE_DOWN;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL_SIZE_USAGE(
        addArray,
        prodCds,
        argPosition,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL_SIZE_USAGE(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL_SIZE_USAGE(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL_SIZE_USAGE;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL_DL_FLAG(
        addArray,
        prodCds,
        argPosition,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL_DL_FLAG(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL_DL_FLAG(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL_DL_FLAG;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS(
        addArray,
        prodCds,
        argPosition,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_UPDATE_ETC!
                    ) {
                        mgrInsert_S0303_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_UPDATE_MATERIAL_STD_LOSS_TO_LOSS;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_CHANGE_MATERIAL(addArray, prodCds, argPosition) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_CHANGE_MATERIAL(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
                    ) {
                        mgrInsert_S0303_ALL_CHANGE_MATERIAL(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_CHANGE_MATERIAL;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsert_ALL_DELETE_MATERIAL(addArray, prodCds, argPosition) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_ALL_DELETE_MATERIAL(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                        $datas1: [I_S0303_PROD_CDS!]!
                        $datas2: I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!
                    ) {
                        mgrInsert_S0303_ALL_DELETE_MATERIAL(
                            datas: $datas
                            datas1: $datas1
                            datas2: $datas2
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: addArray,
                    datas1: prodCds,
                    datas2: argPosition,
                },
            });
            return data.mgrInsert_S0303_ALL_DELETE_MATERIAL;
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async mgrInsertEDT_KSV_PROD_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                    ) {
                        mgrInsert_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
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
            return data.mgrInsert_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_PROD_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                    ) {
                        mgrUpdate_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
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
            return data.mgrUpdate_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_PROD_MEM(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
                        $datas: [I_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM!]!
                    ) {
                        mgrDelete_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM(
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
            return data.mgrDelete_S0303_MRP_RECORD_STYLE_EDT_KSV_PROD_MEM;
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
                        $data: I_S0303_MRP_RECORD_STYLE_QRY_KCD_MATL_MST!
                    ) {
                        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST(
                            data: $data
                        ) {
                            MATL_NAME
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            VENDOR_NAME
                            VENDOR_CD
                            MATL_CD
                            STATUS_CD
                            STATUS_NAME
                            ADD_LOSS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MST,
                },
            });
            console.log(
                "marQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST:" +
                    data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST
                        .length,
            );
            return data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_MATL_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_STYLE

    async mgrQueryTBL_KCD_STYLE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_STYLE(
                        $data: I_S0303_MRP_RECORD_STYLE_QRY_KCD_STYLE!
                    ) {
                        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE(
                            data: $data
                        ) {
                            STYLE_NAME
                            STYLE_CD
                            PROD_CNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "marQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE:" +
                    data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE.length,
            );
            return data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PROD_MEM

    async mgrQueryTBL_KSV_PROD_MEM(argQRY_KSV_PROD_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PROD_MEM(
                        $data: I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MEM!
                    ) {
                        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM(
                            data: $data
                        ) {
                            PROD_CD
                            VERSION
                            DL_FLAG
                            MRP_CHECK
                            MATL_TYPE2
                            MATL_TYPE2_N
                            MATL_NAME
                            MATL_CD
                            COLOR
                            SPEC
                            SALES_MATL_PRICE
                            SALES_CURR_CD
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            ADD_LOSS
                            USE_SIZE
                            REMARK
                            BVT_REMARK
                            COUNTRY
                            STD_NET
                            STD_LOSS
                            NET
                            LOSS
                            GROSS
                            VENDOR_NAME
                            VENDOR_CD
                            STD_GROSS
                            SEQ
                            S_FLAG
                            S_MATL_CD
                            S_USE_SIZE
                            S_REMARK
                            MATL_STATUS_CD
                            VENDOR_STATUS_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MEM,
                },
            });
            console.log(
                "marQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM:" +
                    data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM
                        .length,
            );
            return data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KSV_PROD_MEM_BY_USAGE(argQRY_KSV_PROD_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PROD_MEM_BY_USAGE(
                        $data: I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MEM_BY_USAGE!
                    ) {
                        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM_BY_USAGE(
                            data: $data
                        ) {
                            PROD_CD
                            PROD_CD_N
                            VERSION
                            DL_FLAG
                            MRP_CHECK
                            MATL_TYPE2
                            MATL_TYPE2_N
                            MATL_NAME
                            MATL_CD
                            COLOR
                            SPEC
                            MATL_PRICE
                            CURR_CD
                            UNIT
                            ADD_LOSS
                            USE_SIZE
                            REMARK
                            BVT_REMARK
                            COUNTRY
                            STD_NET
                            STD_LOSS
                            NET
                            LOSS
                            GROSS
                            VENDOR_NAME
                            VENDOR_CD
                            STD_GROSS
                            SEQ
                            S_FLAG
                            S_MATL_CD
                            S_USE_SIZE
                            S_REMARK
                            MATL_STATUS_CD
                            id
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MEM,
                },
            });
            return data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MEM_BY_USAGE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PROD_MST

    async mgrQueryTBL_KSV_PROD_MST(argQRY_KSV_PROD_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST(
                        $data: I_S0303_MRP_RECORD_STYLE_QRY_KSV_PROD_MST!
                    ) {
                        mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST(
                            data: $data
                        ) {
                            PROD_TYPE_NAME
                            COLOR
                            SIZE_LOSS
                            UPD_USER
                            UPD_DATETIME
                            COLLECTION
                            PROD_UNIT
                            PROD_CD
                            PROD_TYPE
                            REG_USER
                            REG_DATETIME
                            PROD_MEM_CNT
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MST,
                },
            });
            console.log(
                "marQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST:" +
                    data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST
                        .length,
            );
            return data.mgrQuery_S0303_MRP_RECORD_STYLE_TBL_KSV_PROD_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_STYLE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_QRY_STYLE($data: I_S0303_QRY_STYLE!) {
                        mgrQuery_S0303_QRY_STYLE(data: $data) {
                            STYLE_CD
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0303_QRY_STYLE;
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
                    query QmgrQuery_QRY_VENDOR($data: I_S0303_QRY_VENDOR!) {
                        mgrQuery_S0303_QRY_VENDOR(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0303_QRY_VENDOR;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_QRY_BUYER($data: I_S0303_QRY_BUYER!) {
                        mgrQuery_S0303_QRY_BUYER(data: $data) {
                            BUYER_CD
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0303_QRY_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_NATION(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_QRY_NATION($data: I_S0303_QRY_NATION!) {
                        mgrQuery_S0303_QRY_NATION(data: $data) {
                            NAT_CD
                            NAT_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0303_QRY_NATION;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_STYLE_BY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_QRY_STYLE_BY_BUYER(
                        $data: I_S0303_QRY_STYLE_BY_BUYER!
                    ) {
                        mgrQuery_S0303_QRY_STYLE_BY_BUYER(data: $data) {
                            STYLE_CD
                            STYLE_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0303_QRY_STYLE_BY_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_QRY_BUYER_BY_STYLE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_QRY_BUYER_BY_STYLE(
                        $data: I_S0303_QRY_BUYER_BY_STYLE!
                    ) {
                        mgrQuery_S0303_QRY_BUYER_BY_STYLE(data: $data) {
                            BUYER_CD
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0303_QRY_BUYER_BY_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXPORT_CONSUMPTION(
        selectedTBL_KCD_STYLE,
        selectedTBL_KSV_PROD_MEM,
    ) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_EXPORT_CONSUMPTION(
                        $data: DATA_EXPORT_CONSUMPTION!
                        $grid: [GRID_EXPORT_CONSUMPTION!]!
                    ) {
                        mgrQuery_S0303_EXPORT_CONSUMPTION(
                            data: $data
                            grid: $grid
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: selectedTBL_KCD_STYLE,
                    grid: selectedTBL_KSV_PROD_MEM,
                },
            });
            return data.mgrQuery_S0303_EXPORT_CONSUMPTION;
        } catch (e) {
            return e;
        }
    }
}
