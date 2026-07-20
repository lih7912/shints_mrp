/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PO_MATLLISTTEMP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MATLLISTTEMP {
                        allQueryKSV_PO_MATLLISTTEMP {
                            id
                            USER_ID
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
                "KSV_PO_MATLLISTTEMP:",
                JSON.stringify(data.allQueryKSV_PO_MATLLISTTEMP.length),
            );
            return data.allQueryKSV_PO_MATLLISTTEMP;
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
                    query MgrKsvPoMatllisttempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMatllisttempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
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
                "KSV_PO_MATLLISTTEMP:",
                JSON.stringify(data.mgrKsvPoMatllisttempQuery.length),
            );
            return data.mgrKsvPoMatllisttempQuery;
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
                    mutation CreateKSV_PO_MATLLISTTEMP(
                        $userId: String
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
                        createKSV_PO_MATLLISTTEMP(
                            USER_ID: $userId
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
                            USER_ID
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
                    userId: argData.USER_ID,
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
                "KSV_PO_MATLLISTTEMP INSERT:",
                JSON.stringify(data.createKSV_PO_MATLLISTTEMP),
            );
            return data.createKSV_PO_MATLLISTTEMP;
        } catch (e) {
            console.log("KSV_PO_MATLLISTTEMP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_MATLLISTTEMP(
                        $updateKsvPoMatllisttempId: Int!
                        $userId: String
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
                        updateKSV_PO_MATLLISTTEMP(
                            id: $updateKsvPoMatllisttempId
                            USER_ID: $userId
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
                            USER_ID
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
                    updateKsvPoMatllisttempId: argData.id,
                    userId: argData.USER_ID,
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
                "KSV_PO_MATLLISTTEMP UPDATE:",
                JSON.stringify(data.updateKSV_PO_MATLLISTTEMP),
            );
            return data.updateKSV_PO_MATLLISTTEMP;
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
                    mutation DeleteKSV_PO_MATLLISTTEMP(
                        $deleteKsvPoMatllisttempId: Int!
                    ) {
                        deleteKSV_PO_MATLLISTTEMP(
                            id: $deleteKsvPoMatllisttempId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMatllisttempId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MATLLISTTEMP DELETE:",
                JSON.stringify(data.deleteKSV_PO_MATLLISTTEMP),
            );
            return data.deleteKSV_PO_MATLLISTTEMP;
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
                    mutation MgrKsvPoMatllisttempDeletes(
                        $ids: [InputMgrKsvPoMatllisttempDeletes!]!
                    ) {
                        mgrKsvPoMatllisttempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MATLLISTTEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
