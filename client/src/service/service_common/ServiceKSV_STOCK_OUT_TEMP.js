/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_STOCK_OUT_TEMP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_OUT_TEMP {
                        allQueryKSV_STOCK_OUT_TEMP {
                            id
                            PACK_CD
                            VENDOR_CD
                            CT_QTY
                            CT_NO
                            PO_CD
                            REMARK
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_OUT_TEMP:",
                JSON.stringify(data.allQueryKSV_STOCK_OUT_TEMP.length),
            );
            return data.allQueryKSV_STOCK_OUT_TEMP;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockOutTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PACK_CD
                            VENDOR_CD
                            CT_QTY
                            CT_NO
                            PO_CD
                            REMARK
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP:",
                JSON.stringify(data.mgrKsvStockOutTempQuery.length),
            );
            return data.mgrKsvStockOutTempQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_STOCK_OUT_TEMP(
                        $packCd: String
                        $vendorCd: String
                        $ctQty: Int
                        $ctNo: String
                        $poCd: String
                        $remark: String
                        $regUser: String
                    ) {
                        createKSV_STOCK_OUT_TEMP(
                            PACK_CD: $packCd
                            VENDOR_CD: $vendorCd
                            CT_QTY: $ctQty
                            CT_NO: $ctNo
                            PO_CD: $poCd
                            REMARK: $remark
                            REG_USER: $regUser
                        ) {
                            PACK_CD
                            VENDOR_CD
                            CT_QTY
                            CT_NO
                            PO_CD
                            REMARK
                            REG_USER
                        }
                    }
                `,
                variables: {
                    packCd: argData.PACK_CD,
                    vendorCd: argData.VENDOR_CD,
                    ctQty: argData.CT_QTY,
                    ctNo: argData.CT_NO,
                    poCd: argData.PO_CD,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP INSERT:",
                JSON.stringify(data.createKSV_STOCK_OUT_TEMP),
            );
            return data.createKSV_STOCK_OUT_TEMP;
        } catch (e) {
            console.log("KSV_STOCK_OUT_TEMP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_STOCK_OUT_TEMP(
                        $updateKsvStockOutTempId: Int!
                        $packCd: String
                        $vendorCd: String
                        $ctQty: Int
                        $ctNo: String
                        $poCd: String
                        $remark: String
                        $regUser: String
                    ) {
                        updateKSV_STOCK_OUT_TEMP(
                            id: $updateKsvStockOutTempId
                            PACK_CD: $packCd
                            VENDOR_CD: $vendorCd
                            CT_QTY: $ctQty
                            CT_NO: $ctNo
                            PO_CD: $poCd
                            REMARK: $remark
                            REG_USER: $regUser
                        ) {
                            id
                            PACK_CD
                            VENDOR_CD
                            CT_QTY
                            CT_NO
                            PO_CD
                            REMARK
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKsvStockOutTempId: argData.id,
                    packCd: argData.PACK_CD,
                    vendorCd: argData.VENDOR_CD,
                    ctQty: argData.CT_QTY,
                    ctNo: argData.CT_NO,
                    poCd: argData.PO_CD,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_OUT_TEMP),
            );
            return data.updateKSV_STOCK_OUT_TEMP;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_STOCK_OUT_TEMP(
                        $deleteKsvStockOutTempId: Int!
                    ) {
                        deleteKSV_STOCK_OUT_TEMP(id: $deleteKsvStockOutTempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockOutTempId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_OUT_TEMP),
            );
            return data.deleteKSV_STOCK_OUT_TEMP;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tObjs = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tOne = argDatas[tIdx];
            var tOneObj = {};
            tOneObj.id = tOne.id;
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.ids = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvStockOutTempDeletes(
                        $ids: [InputMgrKsvStockOutTempDeletes!]!
                    ) {
                        mgrKsvStockOutTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_OUT_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
