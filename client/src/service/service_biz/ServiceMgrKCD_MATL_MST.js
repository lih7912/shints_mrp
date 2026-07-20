/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_MATL_MST {
    async getDatasMaxSeq() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdMatlMstMaxSeq {
                        mgrKcdMatlMstMaxSeq {
                            MAX_SEQ
                        }
                    }
                `,
            });
            console.log(
                "MGR_KCD_MATL_MST(MAX_SEQ):",
                JSON.stringify(data.mgrKcdMatlMstMaxSeq),
            );
            return data.mgrKcdMatlMstMaxSeq[0].MAX_SEQ;
        } catch (e) {
            return e;
        }
    }

    async getDatasDetail(
        qryMATL_CD,
        qryMATL_NAME,
        qryCOLOR,
        qrySPEC,
        qryVENDOR_NAME,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdMatlMstQueryDetail(
                        $matlName: String!
                        $vendorName: String!
                        $spec: String!
                        $matlCd: String!
                        $color: String!
                    ) {
                        mgrKcdMatlMstQueryDetail(
                            MATL_NAME: $matlName
                            VENDOR_NAME: $vendorName
                            SPEC: $spec
                            MATL_CD: $matlCd
                            COLOR: $color
                        ) {
                            id
                            MATL_CD
                            MATL_NAME
                            VENDOR_CD
                            MATL_TYPE
                            SEQ
                            COLOR
                            SPEC
                            UNIT
                            HS_CD
                            WEIGHT
                            BOX_UNIT
                            COUNTRY
                            ADD_RATE
                            ADD_AMT
                            PERMIT_COMPO1
                            PERMIT_COMPO2
                            PERMIT_COMPO3
                            PERMIT_DETAIL
                            COUNT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BVT_MATL_NAME
                            MATL_TYPE2
                            WIDTH
                            old_vendor_cd
                            rep_matl_cd
                            add_loss
                            VENDOR_NAME
                            STATUS_NAME
                            MATL_TYPE_NAME
                            MATL_PRICE
                            MATL_PRICE_CURR
                            MATL_PRICE_SALE
                            MATL_PRICE_SALE_CURR
                        }
                    }
                `,
                variables: {
                    matlName: qryMATL_NAME,
                    vendorName: qryVENDOR_NAME,
                    spec: qrySPEC,
                    matlCd: qryMATL_CD,
                    color: qryCOLOR,
                },
            });
            console.log(
                "MGR_KCD_MATL_MST(mgrKcdMatlMstQueryDetail):",
                JSON.stringify(data.mgrKcdMatlMstQueryDetail),
            );
            return data.mgrKcdMatlMstQueryDetail;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qryName, qryVendorCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdMatlMstQuery(
                        $name: String!
                        $vendorCd: String!
                    ) {
                        mgrKcdMatlMstQuery(NAME: $name, VENDOR_CD: $vendorCd) {
                            id
                            MATL_CD
                            MATL_NAME
                            VENDOR_CD
                            MATL_TYPE
                            SEQ
                            COLOR
                            SPEC
                            UNIT
                            HS_CD
                            WEIGHT
                            BOX_UNIT
                            COUNTRY
                            ADD_RATE
                            ADD_AMT
                            PERMIT_COMPO1
                            PERMIT_COMPO2
                            PERMIT_COMPO3
                            PERMIT_DETAIL
                            COUNT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BVT_MATL_NAME
                            MATL_TYPE2
                            WIDTH
                            old_vendor_cd
                            rep_matl_cd
                            add_loss
                            VENDOR_NAME
                            STATUS_NAME
                            MATL_TYPE_NAME
                            MATL_PRICE
                            MATL_PRICE_CURR
                            MATL_PRICE_SALE
                            MATL_PRICE_SALE_CURR
                        }
                    }
                `,
                variables: { name: qryName, vendorCd: qryVendorCd },
            });
            console.log(
                "MGR_KCD_MATL_MST:",
                JSON.stringify(data.mgrKcdMatlMstQuery.length),
            );
            return data.mgrKcdMatlMstQuery;
        } catch (e) {
            return e;
        }
    }

    async createsData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tInputs = {};
        tInputs.datas = argDatas;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKcdMatlMstCreates(
                        $datas: [InputMgrKcdMatlMstCreates!]!
                    ) {
                        mgrKcdMatlMstCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_MST CREATES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
