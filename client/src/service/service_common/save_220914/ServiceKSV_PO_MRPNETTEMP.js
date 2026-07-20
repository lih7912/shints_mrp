/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRPNETTEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPNETTEMP {
                        allQueryKSV_PO_MRPNETTEMP {
                            id
                            USER_ID
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
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
                            COUNTRY
                            BVT_REMARK
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPNETTEMP:",
                JSON.stringify(data.allQueryKSV_PO_MRPNETTEMP.length),
            );
            return data.allQueryKSV_PO_MRPNETTEMP;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMrpnettempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrpnettempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
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
                            COUNTRY
                            BVT_REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPNETTEMP:",
                JSON.stringify(data.mgrKsvPoMrpnettempQuery.length),
            );
            return data.mgrKsvPoMrpnettempQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_PO_MRPNETTEMP(
                        $userId: String
                        $poCd: String
                        $orderCd: String
                        $prodCd: String
                        $addFlag: String
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
                        $country: String
                        $bvtRemark: String
                    ) {
                        createKSV_PO_MRPNETTEMP(
                            USER_ID: $userId
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ADD_FLAG: $addFlag
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
                            COUNTRY: $country
                            BVT_REMARK: $bvtRemark
                        ) {
                            USER_ID
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
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
                            COUNTRY
                            BVT_REMARK
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    addFlag: argData.ADD_FLAG,
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
                    country: argData.COUNTRY,
                    bvtRemark: argData.BVT_REMARK,
                },
            });
            console.log(
                "KSV_PO_MRPNETTEMP INSERT:",
                JSON.stringify(data.createKSV_PO_MRPNETTEMP),
            );
            return data.createKSV_PO_MRPNETTEMP;
        } catch (e) {
            console.log("KSV_PO_MRPNETTEMP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_MRPNETTEMP(
                        $updateKsvPoMrpnettempId: Int!
                        $userId: String
                        $poCd: String
                        $orderCd: String
                        $prodCd: String
                        $addFlag: String
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
                        $country: String
                        $bvtRemark: String
                    ) {
                        updateKSV_PO_MRPNETTEMP(
                            id: $updateKsvPoMrpnettempId
                            USER_ID: $userId
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ADD_FLAG: $addFlag
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
                            COUNTRY: $country
                            BVT_REMARK: $bvtRemark
                        ) {
                            id
                            USER_ID
                            PO_CD
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
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
                            COUNTRY
                            BVT_REMARK
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrpnettempId: argData.id,
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    addFlag: argData.ADD_FLAG,
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
                    country: argData.COUNTRY,
                    bvtRemark: argData.BVT_REMARK,
                },
            });
            console.log(
                "KSV_PO_MRPNETTEMP UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPNETTEMP),
            );
            return data.updateKSV_PO_MRPNETTEMP;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_PO_MRPNETTEMP(
                        $deleteKsvPoMrpnettempId: Int!
                    ) {
                        deleteKSV_PO_MRPNETTEMP(id: $deleteKsvPoMrpnettempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrpnettempId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPNETTEMP DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPNETTEMP),
            );
            return data.deleteKSV_PO_MRPNETTEMP;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

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
                    mutation MgrKsvPoMrpnettempDeletes(
                        $ids: [InputMgrKsvPoMrpnettempDeletes!]!
                    ) {
                        mgrKsvPoMrpnettempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRPNETTEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
