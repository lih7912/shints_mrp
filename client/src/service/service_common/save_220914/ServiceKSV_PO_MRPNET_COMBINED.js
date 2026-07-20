/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRPNET_COMBINED {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPNET_COMBINED {
                        allQueryKSV_PO_MRPNET_COMBINED {
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
                            COUNTRY
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPNET_COMBINED:",
                JSON.stringify(data.allQueryKSV_PO_MRPNET_COMBINED.length),
            );
            return data.allQueryKSV_PO_MRPNET_COMBINED;
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
                    query MgrKsvPoMrpnetCombinedQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrpnetCombinedQuery(
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
                            COUNTRY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPNET_COMBINED:",
                JSON.stringify(data.mgrKsvPoMrpnetCombinedQuery.length),
            );
            return data.mgrKsvPoMrpnetCombinedQuery;
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
                    mutation CreateKSV_PO_MRPNET_COMBINED(
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
                    ) {
                        createKSV_PO_MRPNET_COMBINED(
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
                            COUNTRY
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
                    country: argData.COUNTRY,
                },
            });
            console.log(
                "KSV_PO_MRPNET_COMBINED INSERT:",
                JSON.stringify(data.createKSV_PO_MRPNET_COMBINED),
            );
            return data.createKSV_PO_MRPNET_COMBINED;
        } catch (e) {
            console.log(
                "KSV_PO_MRPNET_COMBINED INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_PO_MRPNET_COMBINED(
                        $updateKsvPoMrpnetCombinedId: Int!
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
                    ) {
                        updateKSV_PO_MRPNET_COMBINED(
                            id: $updateKsvPoMrpnetCombinedId
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
                            COUNTRY
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrpnetCombinedId: argData.id,
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
                },
            });
            console.log(
                "KSV_PO_MRPNET_COMBINED UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPNET_COMBINED),
            );
            return data.updateKSV_PO_MRPNET_COMBINED;
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
                    mutation DeleteKSV_PO_MRPNET_COMBINED(
                        $deleteKsvPoMrpnetCombinedId: Int!
                    ) {
                        deleteKSV_PO_MRPNET_COMBINED(
                            id: $deleteKsvPoMrpnetCombinedId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrpnetCombinedId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPNET_COMBINED DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPNET_COMBINED),
            );
            return data.deleteKSV_PO_MRPNET_COMBINED;
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
                    mutation MgrKsvPoMrpnetCombinedDeletes(
                        $ids: [InputMgrKsvPoMrpnetCombinedDeletes!]!
                    ) {
                        mgrKsvPoMrpnetCombinedDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_PO_MRPNET_COMBINED DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
