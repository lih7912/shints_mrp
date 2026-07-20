/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PO_MRPBVT {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPBVT {
                        allQueryKSV_PO_MRPBVT {
                            id
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            MATL_CD
                            MATL_SEQ
                            PROD_SEQ
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            ORD_CNT
                            NET_QTY
                            USE_QTY
                            VENDOR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPBVT:",
                JSON.stringify(data.allQueryKSV_PO_MRPBVT.length),
            );
            return data.allQueryKSV_PO_MRPBVT;
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
                    query MgrKsvPoMrpbvtQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrpbvtQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            MATL_CD
                            MATL_SEQ
                            PROD_SEQ
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            ORD_CNT
                            NET_QTY
                            USE_QTY
                            VENDOR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPBVT:",
                JSON.stringify(data.mgrKsvPoMrpbvtQuery.length),
            );
            return data.mgrKsvPoMrpbvtQuery;
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
                    mutation CreateKSV_PO_MRPBVT(
                        $poCd: String
                        $orderCd: String
                        $prodCd: String
                        $matlCd: String
                        $matlSeq: Int
                        $prodSeq: Int
                        $net: Float
                        $loss: Float
                        $gross: Float
                        $remark: String
                        $useSize: String
                        $ordCnt: Int
                        $netQty: Float
                        $useQty: Int
                        $vendorCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_PO_MRPBVT(
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            PROD_SEQ: $prodSeq
                            NET: $net
                            LOSS: $loss
                            GROSS: $gross
                            REMARK: $remark
                            USE_SIZE: $useSize
                            ORD_CNT: $ordCnt
                            NET_QTY: $netQty
                            USE_QTY: $useQty
                            VENDOR_CD: $vendorCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            MATL_CD
                            MATL_SEQ
                            PROD_SEQ
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            ORD_CNT
                            NET_QTY
                            USE_QTY
                            VENDOR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    prodSeq: argData.PROD_SEQ,
                    net: argData.NET,
                    loss: argData.LOSS,
                    gross: argData.GROSS,
                    remark: argData.REMARK,
                    useSize: argData.USE_SIZE,
                    ordCnt: argData.ORD_CNT,
                    netQty: argData.NET_QTY,
                    useQty: argData.USE_QTY,
                    vendorCd: argData.VENDOR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PO_MRPBVT INSERT:",
                JSON.stringify(data.createKSV_PO_MRPBVT),
            );
            return data.createKSV_PO_MRPBVT;
        } catch (e) {
            console.log("KSV_PO_MRPBVT INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_MRPBVT(
                        $updateKsvPoMrpbvtId: Int!
                        $poCd: String
                        $orderCd: String
                        $prodCd: String
                        $matlCd: String
                        $matlSeq: Int
                        $prodSeq: Int
                        $net: Float
                        $loss: Float
                        $gross: Float
                        $remark: String
                        $useSize: String
                        $ordCnt: Int
                        $netQty: Float
                        $useQty: Int
                        $vendorCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_PO_MRPBVT(
                            id: $updateKsvPoMrpbvtId
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            PROD_SEQ: $prodSeq
                            NET: $net
                            LOSS: $loss
                            GROSS: $gross
                            REMARK: $remark
                            USE_SIZE: $useSize
                            ORD_CNT: $ordCnt
                            NET_QTY: $netQty
                            USE_QTY: $useQty
                            VENDOR_CD: $vendorCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            MATL_CD
                            MATL_SEQ
                            PROD_SEQ
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            ORD_CNT
                            NET_QTY
                            USE_QTY
                            VENDOR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrpbvtId: argData.id,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    prodSeq: argData.PROD_SEQ,
                    net: argData.NET,
                    loss: argData.LOSS,
                    gross: argData.GROSS,
                    remark: argData.REMARK,
                    useSize: argData.USE_SIZE,
                    ordCnt: argData.ORD_CNT,
                    netQty: argData.NET_QTY,
                    useQty: argData.USE_QTY,
                    vendorCd: argData.VENDOR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PO_MRPBVT UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPBVT),
            );
            return data.updateKSV_PO_MRPBVT;
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
                    mutation DeleteKSV_PO_MRPBVT($deleteKsvPoMrpbvtId: Int!) {
                        deleteKSV_PO_MRPBVT(id: $deleteKsvPoMrpbvtId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrpbvtId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPBVT DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPBVT),
            );
            return data.deleteKSV_PO_MRPBVT;
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
                    mutation MgrKsvPoMrpbvtDeletes(
                        $ids: [InputMgrKsvPoMrpbvtDeletes!]!
                    ) {
                        mgrKsvPoMrpbvtDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRPBVT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
