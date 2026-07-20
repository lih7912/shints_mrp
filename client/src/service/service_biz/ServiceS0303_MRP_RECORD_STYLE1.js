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
}
