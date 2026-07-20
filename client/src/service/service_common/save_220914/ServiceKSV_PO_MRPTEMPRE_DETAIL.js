/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRPTEMPRE_DETAIL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPTEMPRE_DETAIL {
                        allQueryKSV_PO_MRPTEMPRE_DETAIL {
                            id
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            DIFF_RE_TYPE
                            DIFF_RE_QTY
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                            bef_po_qty
                            use_stock_qty
                            stock_idx
                            root_idx
                            factory_cd
                            org_po_seq
                            po_matl_cd
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL:",
                JSON.stringify(data.allQueryKSV_PO_MRPTEMPRE_DETAIL.length),
            );
            return data.allQueryKSV_PO_MRPTEMPRE_DETAIL;
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
                    query MgrKsvPoMrptempreDetailQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrptempreDetailQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            DIFF_RE_TYPE
                            DIFF_RE_QTY
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                            bef_po_qty
                            use_stock_qty
                            stock_idx
                            root_idx
                            factory_cd
                            org_po_seq
                            po_matl_cd
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL:",
                JSON.stringify(data.mgrKsvPoMrptempreDetailQuery.length),
            );
            return data.mgrKsvPoMrptempreDetailQuery;
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
                    mutation CreateKSV_PO_MRPTEMPRE_DETAIL(
                        $userId: String
                        $seq: Int
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $diffReType: String
                        $diffReQty: Float
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $totAmt: Float
                        $useSize: String
                        $befPoQty: Float
                        $useStockQty: Float
                        $stockIdx: String
                        $rootIdx: String
                        $factoryCd: String
                        $orgPoSeq: Int
                        $poMatlCd: String
                    ) {
                        createKSV_PO_MRPTEMPRE_DETAIL(
                            USER_ID: $userId
                            SEQ: $seq
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            DIFF_RE_TYPE: $diffReType
                            DIFF_RE_QTY: $diffReQty
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            USE_SIZE: $useSize
                            bef_po_qty: $befPoQty
                            use_stock_qty: $useStockQty
                            stock_idx: $stockIdx
                            root_idx: $rootIdx
                            factory_cd: $factoryCd
                            org_po_seq: $orgPoSeq
                            po_matl_cd: $poMatlCd
                        ) {
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            DIFF_RE_TYPE
                            DIFF_RE_QTY
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                            bef_po_qty
                            use_stock_qty
                            stock_idx
                            root_idx
                            factory_cd
                            org_po_seq
                            po_matl_cd
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    diffReType: argData.DIFF_RE_TYPE,
                    diffReQty: argData.DIFF_RE_QTY,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    useSize: argData.USE_SIZE,
                    befPoQty: argData.bef_po_qty,
                    useStockQty: argData.use_stock_qty,
                    stockIdx: argData.stock_idx,
                    rootIdx: argData.root_idx,
                    factoryCd: argData.factory_cd,
                    orgPoSeq: argData.org_po_seq,
                    poMatlCd: argData.po_matl_cd,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL INSERT:",
                JSON.stringify(data.createKSV_PO_MRPTEMPRE_DETAIL),
            );
            return data.createKSV_PO_MRPTEMPRE_DETAIL;
        } catch (e) {
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL INSERT ERROR:",
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
                    mutation UpdateKSV_PO_MRPTEMPRE_DETAIL(
                        $updateKsvPoMrptempreDetailId: Int!
                        $userId: String
                        $seq: Int
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $diffReType: String
                        $diffReQty: Float
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $totAmt: Float
                        $useSize: String
                        $befPoQty: Float
                        $useStockQty: Float
                        $stockIdx: String
                        $rootIdx: String
                        $factoryCd: String
                        $orgPoSeq: Int
                        $poMatlCd: String
                    ) {
                        updateKSV_PO_MRPTEMPRE_DETAIL(
                            id: $updateKsvPoMrptempreDetailId
                            USER_ID: $userId
                            SEQ: $seq
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            DIFF_RE_TYPE: $diffReType
                            DIFF_RE_QTY: $diffReQty
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            USE_SIZE: $useSize
                            bef_po_qty: $befPoQty
                            use_stock_qty: $useStockQty
                            stock_idx: $stockIdx
                            root_idx: $rootIdx
                            factory_cd: $factoryCd
                            org_po_seq: $orgPoSeq
                            po_matl_cd: $poMatlCd
                        ) {
                            id
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            DIFF_RE_TYPE
                            DIFF_RE_QTY
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                            bef_po_qty
                            use_stock_qty
                            stock_idx
                            root_idx
                            factory_cd
                            org_po_seq
                            po_matl_cd
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrptempreDetailId: argData.id,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    diffReType: argData.DIFF_RE_TYPE,
                    diffReQty: argData.DIFF_RE_QTY,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    useSize: argData.USE_SIZE,
                    befPoQty: argData.bef_po_qty,
                    useStockQty: argData.use_stock_qty,
                    stockIdx: argData.stock_idx,
                    rootIdx: argData.root_idx,
                    factoryCd: argData.factory_cd,
                    orgPoSeq: argData.org_po_seq,
                    poMatlCd: argData.po_matl_cd,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPTEMPRE_DETAIL),
            );
            return data.updateKSV_PO_MRPTEMPRE_DETAIL;
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
                    mutation DeleteKSV_PO_MRPTEMPRE_DETAIL(
                        $deleteKsvPoMrptempreDetailId: Int!
                    ) {
                        deleteKSV_PO_MRPTEMPRE_DETAIL(
                            id: $deleteKsvPoMrptempreDetailId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrptempreDetailId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPTEMPRE_DETAIL),
            );
            return data.deleteKSV_PO_MRPTEMPRE_DETAIL;
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
                    mutation MgrKsvPoMrptempreDetailDeletes(
                        $ids: [InputMgrKsvPoMrptempreDetailDeletes!]!
                    ) {
                        mgrKsvPoMrptempreDetailDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_PO_MRPTEMPRE_DETAIL DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
