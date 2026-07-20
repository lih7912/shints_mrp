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

export class ServiceS0302_MATL_SEARCH {
    // SERVICE: TBL_KCD_MATL_MST

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQueryTBL_KCD_MATL_MST(argQRY_KCD_MATL_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_MATL_MST(
                        $data: I_S0302_MATL_SEARCH_QRY_KCD_MATL_MST!
                    ) {
                        mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST(
                            data: $data
                        ) {
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
                            UNIT_NAME
                            MATL_PRICE
                            CURR_CD
                            S_MATL_PRICE
                            S_CURR_CD
                            WEIGHT
                            BOX_UNIT
                            BOX_UNIT_NAME
                            STATUS_CD
                            STATUS_NAME
                            UPD_USER
                            REG_USER
                            VENDOR_TYPE
                            HS_CD
                            ADD_RATE
                            ADD_AMT
                            ADD_LOSS
                            REG_DATETIME
                            STATUS_CD_NAME
                            VENDOR_STATUS_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MST,
                },
            });
            console.log(
                "marQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST:" +
                    data.mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST.length,
            );
            return data.mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_MATL_MST1

    async mgrQueryTBL_KCD_MATL_MST1(argQRY_KCD_MATL_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_MATL_MST1(
                        $data: I_S0302_MATL_SEARCH_QRY_KCD_MATL_MST!
                    ) {
                        mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1(
                            data: $data
                        ) {
                            MATL_CD
                            PROD_CD
                            STYLE_NAME
                            NET
                            LOSS
                            USE_SIZE
                            REMARK
                            ORDER_CD
                            PO_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MST1,
                },
            });
            console.log(
                "marQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1:" +
                    data.mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1.length,
            );
            return data.mgrQuery_S0302_MATL_SEARCH_TBL_KCD_MATL_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL(argQRY_KCD_MATL_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_EXCEL($data: I_S0302_EXCEL!) {
                        mgrQuery_S0302_EXCEL(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_MATL_MST1,
                },
            });
            return data.mgrQuery_S0302_EXCEL;
        } catch (e) {
            return e;
        }
    }
}
