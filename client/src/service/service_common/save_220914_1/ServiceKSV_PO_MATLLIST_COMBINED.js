/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MATLLIST_COMBINED {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MATLLIST_COMBINED {
                        allQueryKSV_PO_MATLLIST_COMBINED {
                            id
                            PO_CD
                            VENDOR_CD
                            PR_NUM
                            MATL_CD
                            MATL_SEQ
                            TOT_CNT
                            ORD_CNT
                            ORD_AMT
                            NEED_CNT
                            REG_USER
                            REG_DATETIME
                            STOCK_QTY
                            REMARK
                            MCARD_QTY
                            SAMPLE_QTY
                            ACT_CON
                            MIS_LINE
                            SHORTAGE
                            remark_bvt
                            OTHER_QTY
                            ERR_QTY
                            stock_move
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MATLLIST_COMBINED:",
                JSON.stringify(data.allQueryKSV_PO_MATLLIST_COMBINED.length),
            );
            return data.allQueryKSV_PO_MATLLIST_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoMatllistCombinedQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMatllistCombinedQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            VENDOR_CD
                            PR_NUM
                            MATL_CD
                            MATL_SEQ
                            TOT_CNT
                            ORD_CNT
                            ORD_AMT
                            NEED_CNT
                            REG_USER
                            REG_DATETIME
                            STOCK_QTY
                            REMARK
                            MCARD_QTY
                            SAMPLE_QTY
                            ACT_CON
                            MIS_LINE
                            SHORTAGE
                            remark_bvt
                            OTHER_QTY
                            ERR_QTY
                            stock_move
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MATLLIST_COMBINED:",
                JSON.stringify(data.mgrKsvPoMatllistCombinedQuery.length),
            );
            return data.mgrKsvPoMatllistCombinedQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_PO_MATLLIST_COMBINED(
                        $poCd: String
                        $vendorCd: String
                        $prNum: String
                        $matlCd: String
                        $matlSeq: Int
                        $totCnt: String
                        $ordCnt: String
                        $ordAmt: String
                        $needCnt: String
                        $regUser: String
                        $regDatetime: String
                        $stockQty: Int
                        $remark: String
                        $mcardQty: Int
                        $sampleQty: Int
                        $actCon: Int
                        $misLine: Int
                        $shortage: Int
                        $remarkBvt: String
                        $otherQty: Int
                        $errQty: Int
                        $stockMove: Int
                    ) {
                        createKSV_PO_MATLLIST_COMBINED(
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                            PR_NUM: $prNum
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            TOT_CNT: $totCnt
                            ORD_CNT: $ordCnt
                            ORD_AMT: $ordAmt
                            NEED_CNT: $needCnt
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            STOCK_QTY: $stockQty
                            REMARK: $remark
                            MCARD_QTY: $mcardQty
                            SAMPLE_QTY: $sampleQty
                            ACT_CON: $actCon
                            MIS_LINE: $misLine
                            SHORTAGE: $shortage
                            remark_bvt: $remarkBvt
                            OTHER_QTY: $otherQty
                            ERR_QTY: $errQty
                            stock_move: $stockMove
                        ) {
                            PO_CD
                            VENDOR_CD
                            PR_NUM
                            MATL_CD
                            MATL_SEQ
                            TOT_CNT
                            ORD_CNT
                            ORD_AMT
                            NEED_CNT
                            REG_USER
                            REG_DATETIME
                            STOCK_QTY
                            REMARK
                            MCARD_QTY
                            SAMPLE_QTY
                            ACT_CON
                            MIS_LINE
                            SHORTAGE
                            remark_bvt
                            OTHER_QTY
                            ERR_QTY
                            stock_move
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    vendorCd: argData.VENDOR_CD,
                    prNum: argData.PR_NUM,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    totCnt: argData.TOT_CNT,
                    ordCnt: argData.ORD_CNT,
                    ordAmt: argData.ORD_AMT,
                    needCnt: argData.NEED_CNT,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stockQty: argData.STOCK_QTY,
                    remark: argData.REMARK,
                    mcardQty: argData.MCARD_QTY,
                    sampleQty: argData.SAMPLE_QTY,
                    actCon: argData.ACT_CON,
                    misLine: argData.MIS_LINE,
                    shortage: argData.SHORTAGE,
                    remarkBvt: argData.remark_bvt,
                    otherQty: argData.OTHER_QTY,
                    errQty: argData.ERR_QTY,
                    stockMove: argData.stock_move,
                },
            });
            console.log(
                "KSV_PO_MATLLIST_COMBINED INSERT:",
                JSON.stringify(data.createKSV_PO_MATLLIST_COMBINED),
            );
            return data.createKSV_PO_MATLLIST_COMBINED;
        } catch (e) {
            console.log(
                "KSV_PO_MATLLIST_COMBINED INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_MATLLIST_COMBINED(
                        $updateKsvPoMatllistCombinedId: Int!
                        $poCd: String
                        $vendorCd: String
                        $prNum: String
                        $matlCd: String
                        $matlSeq: Int
                        $totCnt: String
                        $ordCnt: String
                        $ordAmt: String
                        $needCnt: String
                        $regUser: String
                        $regDatetime: String
                        $stockQty: Int
                        $remark: String
                        $mcardQty: Int
                        $sampleQty: Int
                        $actCon: Int
                        $misLine: Int
                        $shortage: Int
                        $remarkBvt: String
                        $otherQty: Int
                        $errQty: Int
                        $stockMove: Int
                    ) {
                        updateKSV_PO_MATLLIST_COMBINED(
                            id: $updateKsvPoMatllistCombinedId
                            PO_CD: $poCd
                            VENDOR_CD: $vendorCd
                            PR_NUM: $prNum
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            TOT_CNT: $totCnt
                            ORD_CNT: $ordCnt
                            ORD_AMT: $ordAmt
                            NEED_CNT: $needCnt
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            STOCK_QTY: $stockQty
                            REMARK: $remark
                            MCARD_QTY: $mcardQty
                            SAMPLE_QTY: $sampleQty
                            ACT_CON: $actCon
                            MIS_LINE: $misLine
                            SHORTAGE: $shortage
                            remark_bvt: $remarkBvt
                            OTHER_QTY: $otherQty
                            ERR_QTY: $errQty
                            stock_move: $stockMove
                        ) {
                            id
                            PO_CD
                            VENDOR_CD
                            PR_NUM
                            MATL_CD
                            MATL_SEQ
                            TOT_CNT
                            ORD_CNT
                            ORD_AMT
                            NEED_CNT
                            REG_USER
                            REG_DATETIME
                            STOCK_QTY
                            REMARK
                            MCARD_QTY
                            SAMPLE_QTY
                            ACT_CON
                            MIS_LINE
                            SHORTAGE
                            remark_bvt
                            OTHER_QTY
                            ERR_QTY
                            stock_move
                        }
                    }
                `,
                variables: {
                    updateKsvPoMatllistCombinedId: argData.id,
                    poCd: argData.PO_CD,
                    vendorCd: argData.VENDOR_CD,
                    prNum: argData.PR_NUM,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    totCnt: argData.TOT_CNT,
                    ordCnt: argData.ORD_CNT,
                    ordAmt: argData.ORD_AMT,
                    needCnt: argData.NEED_CNT,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stockQty: argData.STOCK_QTY,
                    remark: argData.REMARK,
                    mcardQty: argData.MCARD_QTY,
                    sampleQty: argData.SAMPLE_QTY,
                    actCon: argData.ACT_CON,
                    misLine: argData.MIS_LINE,
                    shortage: argData.SHORTAGE,
                    remarkBvt: argData.remark_bvt,
                    otherQty: argData.OTHER_QTY,
                    errQty: argData.ERR_QTY,
                    stockMove: argData.stock_move,
                },
            });
            console.log(
                "KSV_PO_MATLLIST_COMBINED UPDATE:",
                JSON.stringify(data.updateKSV_PO_MATLLIST_COMBINED),
            );
            return data.updateKSV_PO_MATLLIST_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_PO_MATLLIST_COMBINED(
                        $deleteKsvPoMatllistCombinedId: Int!
                    ) {
                        deleteKSV_PO_MATLLIST_COMBINED(
                            id: $deleteKsvPoMatllistCombinedId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMatllistCombinedId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MATLLIST_COMBINED DELETE:",
                JSON.stringify(data.deleteKSV_PO_MATLLIST_COMBINED),
            );
            return data.deleteKSV_PO_MATLLIST_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
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
                    mutation MgrKsvPoMatllistCombinedDeletes(
                        $ids: [InputMgrKsvPoMatllistCombinedDeletes!]!
                    ) {
                        mgrKsvPoMatllistCombinedDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_PO_MATLLIST_COMBINED DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
