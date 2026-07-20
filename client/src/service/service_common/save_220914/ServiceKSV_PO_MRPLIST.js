/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRPLIST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPLIST {
                        allQueryKSV_PO_MRPLIST {
                            id
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
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPLIST:",
                JSON.stringify(data.allQueryKSV_PO_MRPLIST.length),
            );
            return data.allQueryKSV_PO_MRPLIST;
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
                    query MgrKsvPoMrplistQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrplistQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
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
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPLIST:",
                JSON.stringify(data.mgrKsvPoMrplistQuery.length),
            );
            return data.mgrKsvPoMrplistQuery;
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
                    mutation CreateKSV_PO_MRPLIST(
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
                    ) {
                        createKSV_PO_MRPLIST(
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
                        ) {
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
                        }
                    }
                `,
                variables: {
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
                },
            });
            console.log(
                "KSV_PO_MRPLIST INSERT:",
                JSON.stringify(data.createKSV_PO_MRPLIST),
            );
            return data.createKSV_PO_MRPLIST;
        } catch (e) {
            console.log("KSV_PO_MRPLIST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MRPLIST(
                        $updateKsvPoMrplistId: Int!
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
                    ) {
                        updateKSV_PO_MRPLIST(
                            id: $updateKsvPoMrplistId
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
                        ) {
                            id
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
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrplistId: argData.id,
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
                },
            });
            console.log(
                "KSV_PO_MRPLIST UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPLIST),
            );
            return data.updateKSV_PO_MRPLIST;
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
                    mutation DeleteKSV_PO_MRPLIST($deleteKsvPoMrplistId: Int!) {
                        deleteKSV_PO_MRPLIST(id: $deleteKsvPoMrplistId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrplistId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPLIST DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPLIST),
            );
            return data.deleteKSV_PO_MRPLIST;
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
                    mutation MgrKsvPoMrplistDeletes(
                        $ids: [InputMgrKsvPoMrplistDeletes!]!
                    ) {
                        mgrKsvPoMrplistDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRPLIST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
