/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_CAPABOOK_PLAN {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPABOOK_PLAN {
                        allQueryKSV_CAPABOOK_PLAN {
                            id
                            USER_ID
                            SEQ
                            BOOK_DATE
                            JOB_CD
                            LINE
                            LINE_STATUS
                            LINE_SEQ
                            ORDER_SEQ
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
                            ACT_QTY
                            NR
                            MW
                            CAT
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            M_ETA
                            MD_BAL
                            FOB
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            FIX_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            DAY_QTY
                            WORK_PCS
                            WORK_HOURS
                            PT_CHECK
                            LEADER_KIND
                            LEADER_QTY
                            PROD_MANAGER
                            SALES_MANAGER
                            BOM
                            FIX
                            PRO
                            DEL
                            EXP_TOT_HOURS
                            LINE_CHARGE
                            EXP_TOT_CHARGE
                            EXP_LAB_COST
                            FIX_AMT
                            REMARK
                            DAYS
                            DSUM
                        }
                    }
                `,
            });
            console.log(
                "KSV_CAPABOOK_PLAN:",
                JSON.stringify(data.allQueryKSV_CAPABOOK_PLAN.length),
            );
            return data.allQueryKSV_CAPABOOK_PLAN;
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
                    query MgrKsvCapabookPlanQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapabookPlanQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            SEQ
                            BOOK_DATE
                            JOB_CD
                            LINE
                            LINE_STATUS
                            LINE_SEQ
                            ORDER_SEQ
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
                            ACT_QTY
                            NR
                            MW
                            CAT
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            M_ETA
                            MD_BAL
                            FOB
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            FIX_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            DAY_QTY
                            WORK_PCS
                            WORK_HOURS
                            PT_CHECK
                            LEADER_KIND
                            LEADER_QTY
                            PROD_MANAGER
                            SALES_MANAGER
                            BOM
                            FIX
                            PRO
                            DEL
                            EXP_TOT_HOURS
                            LINE_CHARGE
                            EXP_TOT_CHARGE
                            EXP_LAB_COST
                            FIX_AMT
                            REMARK
                            DAYS
                            DSUM
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CAPABOOK_PLAN:",
                JSON.stringify(data.mgrKsvCapabookPlanQuery.length),
            );
            return data.mgrKsvCapabookPlanQuery;
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
                    mutation CreateKSV_CAPABOOK_PLAN(
                        $userId: String
                        $seq: Int
                        $bookDate: String
                        $jobCd: String
                        $line: String
                        $lineStatus: String
                        $lineSeq: Int
                        $orderSeq: Int
                        $buyerCd: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $qty: Int
                        $actQty: Int
                        $nr: String
                        $mw: String
                        $cat: String
                        $embro: String
                        $tp: String
                        $sp: String
                        $lthr: String
                        $g: String
                        $w: String
                        $s: String
                        $fnd: String
                        $dl: String
                        $mEta: String
                        $mdBal: String
                        $fob: Float
                        $sd: String
                        $sdBal: String
                        $kind: String
                        $bvtKind: String
                        $sEta: String
                        $expCmpt: Float
                        $fixCmpt: Float
                        $timeCheck: String
                        $cutting: String
                        $sewInput: String
                        $sewFrom: String
                        $sewTo: String
                        $dayQty: String
                        $workPcs: String
                        $workHours: String
                        $ptCheck: String
                        $leaderKind: String
                        $leaderQty: String
                        $prodManager: String
                        $salesManager: String
                        $bom: String
                        $fix: String
                        $pro: String
                        $del: String
                        $expTotHours: Float
                        $lineCharge: Float
                        $expTotCharge: Float
                        $expLabCost: Float
                        $fixAmt: Float
                        $remark: String
                        $days: Float
                        $dsum: Float
                    ) {
                        createKSV_CAPABOOK_PLAN(
                            USER_ID: $userId
                            SEQ: $seq
                            BOOK_DATE: $bookDate
                            JOB_CD: $jobCd
                            LINE: $line
                            LINE_STATUS: $lineStatus
                            LINE_SEQ: $lineSeq
                            ORDER_SEQ: $orderSeq
                            BUYER_CD: $buyerCd
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            QTY: $qty
                            ACT_QTY: $actQty
                            NR: $nr
                            MW: $mw
                            CAT: $cat
                            EMBRO: $embro
                            TP: $tp
                            SP: $sp
                            LTHR: $lthr
                            G: $g
                            W: $w
                            S: $s
                            FND: $fnd
                            DL: $dl
                            M_ETA: $mEta
                            MD_BAL: $mdBal
                            FOB: $fob
                            SD: $sd
                            SD_BAL: $sdBal
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            S_ETA: $sEta
                            EXP_CMPT: $expCmpt
                            FIX_CMPT: $fixCmpt
                            TIME_CHECK: $timeCheck
                            CUTTING: $cutting
                            SEW_INPUT: $sewInput
                            SEW_FROM: $sewFrom
                            SEW_TO: $sewTo
                            DAY_QTY: $dayQty
                            WORK_PCS: $workPcs
                            WORK_HOURS: $workHours
                            PT_CHECK: $ptCheck
                            LEADER_KIND: $leaderKind
                            LEADER_QTY: $leaderQty
                            PROD_MANAGER: $prodManager
                            SALES_MANAGER: $salesManager
                            BOM: $bom
                            FIX: $fix
                            PRO: $pro
                            DEL: $del
                            EXP_TOT_HOURS: $expTotHours
                            LINE_CHARGE: $lineCharge
                            EXP_TOT_CHARGE: $expTotCharge
                            EXP_LAB_COST: $expLabCost
                            FIX_AMT: $fixAmt
                            REMARK: $remark
                            DAYS: $days
                            DSUM: $dsum
                        ) {
                            USER_ID
                            SEQ
                            BOOK_DATE
                            JOB_CD
                            LINE
                            LINE_STATUS
                            LINE_SEQ
                            ORDER_SEQ
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
                            ACT_QTY
                            NR
                            MW
                            CAT
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            M_ETA
                            MD_BAL
                            FOB
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            FIX_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            DAY_QTY
                            WORK_PCS
                            WORK_HOURS
                            PT_CHECK
                            LEADER_KIND
                            LEADER_QTY
                            PROD_MANAGER
                            SALES_MANAGER
                            BOM
                            FIX
                            PRO
                            DEL
                            EXP_TOT_HOURS
                            LINE_CHARGE
                            EXP_TOT_CHARGE
                            EXP_LAB_COST
                            FIX_AMT
                            REMARK
                            DAYS
                            DSUM
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    bookDate: argData.BOOK_DATE,
                    jobCd: argData.JOB_CD,
                    line: argData.LINE,
                    lineStatus: argData.LINE_STATUS,
                    lineSeq: argData.LINE_SEQ,
                    orderSeq: argData.ORDER_SEQ,
                    buyerCd: argData.BUYER_CD,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    qty: argData.QTY,
                    actQty: argData.ACT_QTY,
                    nr: argData.NR,
                    mw: argData.MW,
                    cat: argData.CAT,
                    embro: argData.EMBRO,
                    tp: argData.TP,
                    sp: argData.SP,
                    lthr: argData.LTHR,
                    g: argData.G,
                    w: argData.W,
                    s: argData.S,
                    fnd: argData.FND,
                    dl: argData.DL,
                    mEta: argData.M_ETA,
                    mdBal: argData.MD_BAL,
                    fob: argData.FOB,
                    sd: argData.SD,
                    sdBal: argData.SD_BAL,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    sEta: argData.S_ETA,
                    expCmpt: argData.EXP_CMPT,
                    fixCmpt: argData.FIX_CMPT,
                    timeCheck: argData.TIME_CHECK,
                    cutting: argData.CUTTING,
                    sewInput: argData.SEW_INPUT,
                    sewFrom: argData.SEW_FROM,
                    sewTo: argData.SEW_TO,
                    dayQty: argData.DAY_QTY,
                    workPcs: argData.WORK_PCS,
                    workHours: argData.WORK_HOURS,
                    ptCheck: argData.PT_CHECK,
                    leaderKind: argData.LEADER_KIND,
                    leaderQty: argData.LEADER_QTY,
                    prodManager: argData.PROD_MANAGER,
                    salesManager: argData.SALES_MANAGER,
                    bom: argData.BOM,
                    fix: argData.FIX,
                    pro: argData.PRO,
                    del: argData.DEL,
                    expTotHours: argData.EXP_TOT_HOURS,
                    lineCharge: argData.LINE_CHARGE,
                    expTotCharge: argData.EXP_TOT_CHARGE,
                    expLabCost: argData.EXP_LAB_COST,
                    fixAmt: argData.FIX_AMT,
                    remark: argData.REMARK,
                    days: argData.DAYS,
                    dsum: argData.DSUM,
                },
            });
            console.log(
                "KSV_CAPABOOK_PLAN INSERT:",
                JSON.stringify(data.createKSV_CAPABOOK_PLAN),
            );
            return data.createKSV_CAPABOOK_PLAN;
        } catch (e) {
            console.log("KSV_CAPABOOK_PLAN INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_CAPABOOK_PLAN(
                        $updateKsvCapabookPlanId: Int!
                        $userId: String
                        $seq: Int
                        $bookDate: String
                        $jobCd: String
                        $line: String
                        $lineStatus: String
                        $lineSeq: Int
                        $orderSeq: Int
                        $buyerCd: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $qty: Int
                        $actQty: Int
                        $nr: String
                        $mw: String
                        $cat: String
                        $embro: String
                        $tp: String
                        $sp: String
                        $lthr: String
                        $g: String
                        $w: String
                        $s: String
                        $fnd: String
                        $dl: String
                        $mEta: String
                        $mdBal: String
                        $fob: Float
                        $sd: String
                        $sdBal: String
                        $kind: String
                        $bvtKind: String
                        $sEta: String
                        $expCmpt: Float
                        $fixCmpt: Float
                        $timeCheck: String
                        $cutting: String
                        $sewInput: String
                        $sewFrom: String
                        $sewTo: String
                        $dayQty: String
                        $workPcs: String
                        $workHours: String
                        $ptCheck: String
                        $leaderKind: String
                        $leaderQty: String
                        $prodManager: String
                        $salesManager: String
                        $bom: String
                        $fix: String
                        $pro: String
                        $del: String
                        $expTotHours: Float
                        $lineCharge: Float
                        $expTotCharge: Float
                        $expLabCost: Float
                        $fixAmt: Float
                        $remark: String
                        $days: Float
                        $dsum: Float
                    ) {
                        updateKSV_CAPABOOK_PLAN(
                            id: $updateKsvCapabookPlanId
                            USER_ID: $userId
                            SEQ: $seq
                            BOOK_DATE: $bookDate
                            JOB_CD: $jobCd
                            LINE: $line
                            LINE_STATUS: $lineStatus
                            LINE_SEQ: $lineSeq
                            ORDER_SEQ: $orderSeq
                            BUYER_CD: $buyerCd
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            QTY: $qty
                            ACT_QTY: $actQty
                            NR: $nr
                            MW: $mw
                            CAT: $cat
                            EMBRO: $embro
                            TP: $tp
                            SP: $sp
                            LTHR: $lthr
                            G: $g
                            W: $w
                            S: $s
                            FND: $fnd
                            DL: $dl
                            M_ETA: $mEta
                            MD_BAL: $mdBal
                            FOB: $fob
                            SD: $sd
                            SD_BAL: $sdBal
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            S_ETA: $sEta
                            EXP_CMPT: $expCmpt
                            FIX_CMPT: $fixCmpt
                            TIME_CHECK: $timeCheck
                            CUTTING: $cutting
                            SEW_INPUT: $sewInput
                            SEW_FROM: $sewFrom
                            SEW_TO: $sewTo
                            DAY_QTY: $dayQty
                            WORK_PCS: $workPcs
                            WORK_HOURS: $workHours
                            PT_CHECK: $ptCheck
                            LEADER_KIND: $leaderKind
                            LEADER_QTY: $leaderQty
                            PROD_MANAGER: $prodManager
                            SALES_MANAGER: $salesManager
                            BOM: $bom
                            FIX: $fix
                            PRO: $pro
                            DEL: $del
                            EXP_TOT_HOURS: $expTotHours
                            LINE_CHARGE: $lineCharge
                            EXP_TOT_CHARGE: $expTotCharge
                            EXP_LAB_COST: $expLabCost
                            FIX_AMT: $fixAmt
                            REMARK: $remark
                            DAYS: $days
                            DSUM: $dsum
                        ) {
                            id
                            USER_ID
                            SEQ
                            BOOK_DATE
                            JOB_CD
                            LINE
                            LINE_STATUS
                            LINE_SEQ
                            ORDER_SEQ
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
                            ACT_QTY
                            NR
                            MW
                            CAT
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            M_ETA
                            MD_BAL
                            FOB
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            FIX_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            DAY_QTY
                            WORK_PCS
                            WORK_HOURS
                            PT_CHECK
                            LEADER_KIND
                            LEADER_QTY
                            PROD_MANAGER
                            SALES_MANAGER
                            BOM
                            FIX
                            PRO
                            DEL
                            EXP_TOT_HOURS
                            LINE_CHARGE
                            EXP_TOT_CHARGE
                            EXP_LAB_COST
                            FIX_AMT
                            REMARK
                            DAYS
                            DSUM
                        }
                    }
                `,
                variables: {
                    updateKsvCapabookPlanId: argData.id,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    bookDate: argData.BOOK_DATE,
                    jobCd: argData.JOB_CD,
                    line: argData.LINE,
                    lineStatus: argData.LINE_STATUS,
                    lineSeq: argData.LINE_SEQ,
                    orderSeq: argData.ORDER_SEQ,
                    buyerCd: argData.BUYER_CD,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    qty: argData.QTY,
                    actQty: argData.ACT_QTY,
                    nr: argData.NR,
                    mw: argData.MW,
                    cat: argData.CAT,
                    embro: argData.EMBRO,
                    tp: argData.TP,
                    sp: argData.SP,
                    lthr: argData.LTHR,
                    g: argData.G,
                    w: argData.W,
                    s: argData.S,
                    fnd: argData.FND,
                    dl: argData.DL,
                    mEta: argData.M_ETA,
                    mdBal: argData.MD_BAL,
                    fob: argData.FOB,
                    sd: argData.SD,
                    sdBal: argData.SD_BAL,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    sEta: argData.S_ETA,
                    expCmpt: argData.EXP_CMPT,
                    fixCmpt: argData.FIX_CMPT,
                    timeCheck: argData.TIME_CHECK,
                    cutting: argData.CUTTING,
                    sewInput: argData.SEW_INPUT,
                    sewFrom: argData.SEW_FROM,
                    sewTo: argData.SEW_TO,
                    dayQty: argData.DAY_QTY,
                    workPcs: argData.WORK_PCS,
                    workHours: argData.WORK_HOURS,
                    ptCheck: argData.PT_CHECK,
                    leaderKind: argData.LEADER_KIND,
                    leaderQty: argData.LEADER_QTY,
                    prodManager: argData.PROD_MANAGER,
                    salesManager: argData.SALES_MANAGER,
                    bom: argData.BOM,
                    fix: argData.FIX,
                    pro: argData.PRO,
                    del: argData.DEL,
                    expTotHours: argData.EXP_TOT_HOURS,
                    lineCharge: argData.LINE_CHARGE,
                    expTotCharge: argData.EXP_TOT_CHARGE,
                    expLabCost: argData.EXP_LAB_COST,
                    fixAmt: argData.FIX_AMT,
                    remark: argData.REMARK,
                    days: argData.DAYS,
                    dsum: argData.DSUM,
                },
            });
            console.log(
                "KSV_CAPABOOK_PLAN UPDATE:",
                JSON.stringify(data.updateKSV_CAPABOOK_PLAN),
            );
            return data.updateKSV_CAPABOOK_PLAN;
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
                    mutation DeleteKSV_CAPABOOK_PLAN(
                        $deleteKsvCapabookPlanId: Int!
                    ) {
                        deleteKSV_CAPABOOK_PLAN(id: $deleteKsvCapabookPlanId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapabookPlanId: argData.id,
                },
            });
            console.log(
                "KSV_CAPABOOK_PLAN DELETE:",
                JSON.stringify(data.deleteKSV_CAPABOOK_PLAN),
            );
            return data.deleteKSV_CAPABOOK_PLAN;
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
                    mutation MgrKsvCapabookPlanDeletes(
                        $ids: [InputMgrKsvCapabookPlanDeletes!]!
                    ) {
                        mgrKsvCapabookPlanDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CAPABOOK_PLAN DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
