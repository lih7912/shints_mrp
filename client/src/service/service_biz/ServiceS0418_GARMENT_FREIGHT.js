/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0418_GARMENT_FREIGHT {
    // SERVICE: EDT_KSV_PO_MATL_LIST
    async mgrInsertEDT_KSV_PO_MATL_LIST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST(
                        $datas: [I_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST!]!
                    ) {
                        mgrInsert_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST(
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
            return data.mgrInsert_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_PO_MATL_LIST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST(
                        $datas: [I_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST!]!
                    ) {
                        mgrUpdate_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST(
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
            return data.mgrUpdate_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_PO_MATL_LIST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST(
                        $datas: [I_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST!]!
                    ) {
                        mgrDelete_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST(
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
            return data.mgrDelete_S0418_GARMENT_FREIGHT_EDT_KSV_PO_MATL_LIST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PO_MATL_LIST

    async mgrQueryTBL_KSV_PO_MATL_LIST(argQRY_) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PO_MATL_LIST(
                        $data: I_S0418_GARMENT_FREIGHT_QRY_!
                    ) {
                        mgrQuery_S0418_GARMENT_FREIGHT_TBL_KSV_PO_MATL_LIST(
                            data: $data
                        ) {
                            FRT_DATE
                            TRADE_TYPE
                            IS_OK
                            DEPARTURE
                            DESTINATION
                            SENDER
                            RECEIVER
                            BUYER
                            PO_CD
                            ORDER_CD
                            SPEC
                            Qty
                            WEIGHT
                            AMOUNT
                            CURR_CD
                            DELAY_REASON
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            BL_NO
                            REMARK
                            STYLE_NAME
                            MATL_CD
                            WEIGHT_NET
                            NET
                            VAT
                            ADP_CHECK
                            INVOICE_NO
                            CHARGE_KIND
                            cHARGE_CODE
                            REG_USER
                            REG_DATETIME
                            TRADE_TYPE
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            UNIT
                            PRICE
                            MW
                            GARMENT_COMPO
                            PO_SEQ
                            IN_DATETIME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            FRT_IDX
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            console.log(
                "marQuery_S0418_GARMENT_FREIGHT_TBL_KSV_PO_MATL_LIST:" +
                    data.mgrQuery_S0418_GARMENT_FREIGHT_TBL_KSV_PO_MATL_LIST
                        .length,
            );
            return data.mgrQuery_S0418_GARMENT_FREIGHT_TBL_KSV_PO_MATL_LIST;
        } catch (e) {
            return e;
        }
    }
}
