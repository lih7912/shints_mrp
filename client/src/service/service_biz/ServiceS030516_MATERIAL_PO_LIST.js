/* eslint-disable */
import {
    ApolloClient,
    InMemoryCache,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS030516_MATERIAL_PO_LIST {
    client;
    constructor() {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQuery_CODE(argData) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrQueryS030516_CODE($data: I_S030516_CODE!) {
                        mgrQueryS030516_CODE(data: $data) {
                            MATL_TYPE { CD_CODE CD_NAME }
                            VENDOR_TYPE { CD_CODE CD_NAME }
                            BUYER_CD { BUYER_CD BUYER_NAME }
                            PO_CD { PO_CD }
                            VENDOR_CD { VENDOR_CD VENDOR_NAME }
                        }
                    }
                `,
                variables: { data: argData },
            });
            return data.mgrQueryS030516_CODE;
        } catch (e) { return e; }
    }

    async mgrQuery_PO_BY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrQueryS030516_PO_BY_BUYER($data: I_S030516_PO_BY_BUYER!) {
                        mgrQueryS030516_PO_BY_BUYER(data: $data) {
                            PO_CD
                        }
                    }
                `,
                variables: { data: argData },
            });
            return data.mgrQueryS030516_PO_BY_BUYER;
        } catch (e) { return e; }
    }

    async mgrQuery_VENDOR_BY_PO(argData) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrQueryS030516_VENDOR_BY_PO($data: I_S030516_VENDOR_BY_PO!) {
                        mgrQueryS030516_VENDOR_BY_PO(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                        }
                    }
                `,
                variables: { data: argData },
            });
            return data.mgrQueryS030516_VENDOR_BY_PO;
        } catch (e) { return e; }
    }

    async mgrQuery_LIST_1(argData) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrQueryS030516_LIST_1($data: I_S030516_LIST_1!) {
                        mgrQueryS030516_LIST_1(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MATL_CD
                            CURR_CD
                            MATL_PRICE
                            TOT_AMT
                            EXP_USEQTY
                            EXP_POQTY
                            ORDER_DATE
                            MATL_DUE_DATE
                        }
                    }
                `,
                variables: { data: argData },
            });
            return data.mgrQueryS030516_LIST_1;
        } catch (e) { return e; }
    }

    async mgrQuery_LIST_1_COUNT(argData) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrQueryS030516_LIST_1_COUNT($data: I_S030516_LIST_1!) {
                        mgrQueryS030516_LIST_1_COUNT(data: $data) {
                            ROW_CNT
                        }
                    }
                `,
                variables: { data: argData },
            });
            return data.mgrQueryS030516_LIST_1_COUNT;
        } catch (e) { return e; }
    }

    async mgrQuery_Report(argData) {
        apolloOption.cache = new InMemoryCache();
        try {
            const { data } = await this.client.query({
                query: gql`
                    query MgrQueryS030516_REPORT($data: I_S030516_LIST_1!) {
                        mgrQueryS030516_REPORT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: { data: argData },
            });
            return data.mgrQueryS030516_REPORT;
        } catch (e) { return e; }
    }

    // Backward-compatible alias for pages expecting uppercase method naming.
    async mgrQuery_REPORT(argData) {
        return await this.mgrQuery_Report(argData);
    }

    async download_FULL_DATA(argData) {
        return await this.mgrQuery_Report(argData);
    }
}
