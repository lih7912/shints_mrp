/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MATLLIST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MATLLIST {
                        allQueryKSV_PO_MATLLIST {
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
                            EXP_DATE
                            ETD
                            ETA
                            DELIVERY
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MATLLIST:",
                JSON.stringify(data.allQueryKSV_PO_MATLLIST.length),
            );
            return data.allQueryKSV_PO_MATLLIST;
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
                    query MgrKsvPoMatllistQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMatllistQuery(
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
                            EXP_DATE
                            ETD
                            ETA
                            DELIVERY
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MATLLIST:",
                JSON.stringify(data.mgrKsvPoMatllistQuery.length),
            );
            return data.mgrKsvPoMatllistQuery;
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
                    mutation CreateKSV_PO_MATLLIST(
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
                        $expDate: String
                        $etd: String
                        $eta: String
                        $delivery: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKSV_PO_MATLLIST(
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
                            EXP_DATE: $expDate
                            ETD: $etd
                            ETA: $eta
                            DELIVERY: $delivery
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
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
                            EXP_DATE
                            ETD
                            ETA
                            DELIVERY
                            UPD_USER
                            UPD_DATETIME
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
                    expDate: argData.EXP_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    delivery: argData.DELIVERY,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_PO_MATLLIST INSERT:",
                JSON.stringify(data.createKSV_PO_MATLLIST),
            );
            return data.createKSV_PO_MATLLIST;
        } catch (e) {
            console.log("KSV_PO_MATLLIST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MATLLIST(
                        $updateKsvPoMatllistId: Int!
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
                        $expDate: String
                        $etd: String
                        $eta: String
                        $delivery: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKSV_PO_MATLLIST(
                            id: $updateKsvPoMatllistId
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
                            EXP_DATE: $expDate
                            ETD: $etd
                            ETA: $eta
                            DELIVERY: $delivery
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
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
                            EXP_DATE
                            ETD
                            ETA
                            DELIVERY
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPoMatllistId: argData.id,
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
                    expDate: argData.EXP_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    delivery: argData.DELIVERY,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_PO_MATLLIST UPDATE:",
                JSON.stringify(data.updateKSV_PO_MATLLIST),
            );
            return data.updateKSV_PO_MATLLIST;
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
                    mutation DeleteKSV_PO_MATLLIST(
                        $deleteKsvPoMatllistId: Int!
                    ) {
                        deleteKSV_PO_MATLLIST(id: $deleteKsvPoMatllistId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMatllistId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MATLLIST DELETE:",
                JSON.stringify(data.deleteKSV_PO_MATLLIST),
            );
            return data.deleteKSV_PO_MATLLIST;
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
                    mutation MgrKsvPoMatllistDeletes(
                        $ids: [InputMgrKsvPoMatllistDeletes!]!
                    ) {
                        mgrKsvPoMatllistDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MATLLIST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
