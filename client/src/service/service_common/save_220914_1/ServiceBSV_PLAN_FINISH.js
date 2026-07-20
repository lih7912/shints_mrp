/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceBSV_PLAN_FINISH {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryBSV_PLAN_FINISH {
                        allQueryBSV_PLAN_FINISH {
                            id
                            plan_seq
                            USER_ID
                            SEQ
                            JOB_CD
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            STYLE_NAME
                            QTY
                            ACT_QTY
                            CONN_QTY
                            PRE_ORDER_CD
                            NR
                            MW
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            PART_WORK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            M_ETA
                            M_ETA_LIMIT
                            MD_BAL
                            S_ETA
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            BVT_KIND_NAME
                            FOB
                            EXP_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            SEWING
                            WORK_HOURS
                            STD_DAYS
                            LINE_DAYS
                            LINE
                            LINE_START_DATE
                            LINE_CAPA
                            LINE_GRADE
                            LINE_FIX
                            PLAN_FIX
                            REPEAT_CAPA
                            PLAN_USER
                            END_CONFIRM
                            END_USER
                            ORG_SEW_FROM
                            ORG_SEW_TO
                            EXFACTRY_DATE
                            PROD_RATE
                            CONFIRMED
                            STD_SEWING
                            LINE_SEWING
                            FIXED
                            SQ
                            PM
                            SQ_COM
                            ORG_LINE_CAPA
                            UPDATE_ITEM
                            TP_KOR
                            DTP
                            CAPABOOK_IDX
                        }
                    }
                `,
            });
            console.log(
                "BSV_PLAN_FINISH:",
                JSON.stringify(data.allQueryBSV_PLAN_FINISH.length),
            );
            return data.allQueryBSV_PLAN_FINISH;
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
                    query MgrBsvPlanFinishQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrBsvPlanFinishQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            plan_seq
                            USER_ID
                            SEQ
                            JOB_CD
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            STYLE_NAME
                            QTY
                            ACT_QTY
                            CONN_QTY
                            PRE_ORDER_CD
                            NR
                            MW
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            PART_WORK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            M_ETA
                            M_ETA_LIMIT
                            MD_BAL
                            S_ETA
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            BVT_KIND_NAME
                            FOB
                            EXP_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            SEWING
                            WORK_HOURS
                            STD_DAYS
                            LINE_DAYS
                            LINE
                            LINE_START_DATE
                            LINE_CAPA
                            LINE_GRADE
                            LINE_FIX
                            PLAN_FIX
                            REPEAT_CAPA
                            PLAN_USER
                            END_CONFIRM
                            END_USER
                            ORG_SEW_FROM
                            ORG_SEW_TO
                            EXFACTRY_DATE
                            PROD_RATE
                            CONFIRMED
                            STD_SEWING
                            LINE_SEWING
                            FIXED
                            SQ
                            PM
                            SQ_COM
                            ORG_LINE_CAPA
                            UPDATE_ITEM
                            TP_KOR
                            DTP
                            CAPABOOK_IDX
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "BSV_PLAN_FINISH:",
                JSON.stringify(data.mgrBsvPlanFinishQuery.length),
            );
            return data.mgrBsvPlanFinishQuery;
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
                    mutation CreateBSV_PLAN_FINISH(
                        $planSeq: Int!
                        $userId: String
                        $seq: Int
                        $jobCd: String
                        $inDate: String
                        $buyerCd: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $styleName: String
                        $qty: Int
                        $actQty: Int
                        $connQty: Int
                        $preOrderCd: String
                        $nr: String
                        $mw: String
                        $embro: String
                        $tp: String
                        $sp: String
                        $lthr: String
                        $g: String
                        $w: String
                        $s: String
                        $fnd: String
                        $dl: String
                        $partWork: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $down: String
                        $cut: String
                        $mEta: String
                        $mEtaLimit: String
                        $mdBal: Int
                        $sEta: String
                        $sd: String
                        $sdBal: Int
                        $kind: String
                        $bvtKind: String
                        $bvtKindName: String
                        $fob: Float
                        $expCmpt: Float
                        $timeCheck: String
                        $cutting: String
                        $sewInput: String
                        $sewFrom: String
                        $sewTo: String
                        $sewing: Int
                        $workHours: Float
                        $stdDays: Float
                        $lineDays: Float
                        $line: String
                        $lineStartDate: String
                        $lineCapa: Float
                        $lineGrade: Float
                        $lineFix: String
                        $planFix: String
                        $repeatCapa: Float
                        $planUser: String
                        $endConfirm: String
                        $endUser: String
                        $orgSewFrom: String
                        $orgSewTo: String
                        $exfactryDate: String
                        $prodRate: Float
                        $confirmed: String
                        $stdSewing: Float
                        $lineSewing: Float
                        $fixed: Float
                        $sq: Float
                        $pm: Float
                        $sqCom: Float
                        $orgLineCapa: Float
                        $updateItem: String
                        $tpKor: String
                        $dtp: String
                        $capabookIdx: String
                    ) {
                        createBSV_PLAN_FINISH(
                            plan_seq: $planSeq
                            USER_ID: $userId
                            SEQ: $seq
                            JOB_CD: $jobCd
                            IN_DATE: $inDate
                            BUYER_CD: $buyerCd
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            STYLE_NAME: $styleName
                            QTY: $qty
                            ACT_QTY: $actQty
                            CONN_QTY: $connQty
                            PRE_ORDER_CD: $preOrderCd
                            NR: $nr
                            MW: $mw
                            EMBRO: $embro
                            TP: $tp
                            SP: $sp
                            LTHR: $lthr
                            G: $g
                            W: $w
                            S: $s
                            FND: $fnd
                            DL: $dl
                            PART_WORK: $partWork
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            DOWN: $down
                            CUT: $cut
                            M_ETA: $mEta
                            M_ETA_LIMIT: $mEtaLimit
                            MD_BAL: $mdBal
                            S_ETA: $sEta
                            SD: $sd
                            SD_BAL: $sdBal
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            BVT_KIND_NAME: $bvtKindName
                            FOB: $fob
                            EXP_CMPT: $expCmpt
                            TIME_CHECK: $timeCheck
                            CUTTING: $cutting
                            SEW_INPUT: $sewInput
                            SEW_FROM: $sewFrom
                            SEW_TO: $sewTo
                            SEWING: $sewing
                            WORK_HOURS: $workHours
                            STD_DAYS: $stdDays
                            LINE_DAYS: $lineDays
                            LINE: $line
                            LINE_START_DATE: $lineStartDate
                            LINE_CAPA: $lineCapa
                            LINE_GRADE: $lineGrade
                            LINE_FIX: $lineFix
                            PLAN_FIX: $planFix
                            REPEAT_CAPA: $repeatCapa
                            PLAN_USER: $planUser
                            END_CONFIRM: $endConfirm
                            END_USER: $endUser
                            ORG_SEW_FROM: $orgSewFrom
                            ORG_SEW_TO: $orgSewTo
                            EXFACTRY_DATE: $exfactryDate
                            PROD_RATE: $prodRate
                            CONFIRMED: $confirmed
                            STD_SEWING: $stdSewing
                            LINE_SEWING: $lineSewing
                            FIXED: $fixed
                            SQ: $sq
                            PM: $pm
                            SQ_COM: $sqCom
                            ORG_LINE_CAPA: $orgLineCapa
                            UPDATE_ITEM: $updateItem
                            TP_KOR: $tpKor
                            DTP: $dtp
                            CAPABOOK_IDX: $capabookIdx
                        ) {
                            plan_seq
                            USER_ID
                            SEQ
                            JOB_CD
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            STYLE_NAME
                            QTY
                            ACT_QTY
                            CONN_QTY
                            PRE_ORDER_CD
                            NR
                            MW
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            PART_WORK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            M_ETA
                            M_ETA_LIMIT
                            MD_BAL
                            S_ETA
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            BVT_KIND_NAME
                            FOB
                            EXP_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            SEWING
                            WORK_HOURS
                            STD_DAYS
                            LINE_DAYS
                            LINE
                            LINE_START_DATE
                            LINE_CAPA
                            LINE_GRADE
                            LINE_FIX
                            PLAN_FIX
                            REPEAT_CAPA
                            PLAN_USER
                            END_CONFIRM
                            END_USER
                            ORG_SEW_FROM
                            ORG_SEW_TO
                            EXFACTRY_DATE
                            PROD_RATE
                            CONFIRMED
                            STD_SEWING
                            LINE_SEWING
                            FIXED
                            SQ
                            PM
                            SQ_COM
                            ORG_LINE_CAPA
                            UPDATE_ITEM
                            TP_KOR
                            DTP
                            CAPABOOK_IDX
                        }
                    }
                `,
                variables: {
                    planSeq: argData.plan_seq,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    jobCd: argData.JOB_CD,
                    inDate: argData.IN_DATE,
                    buyerCd: argData.BUYER_CD,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    styleName: argData.STYLE_NAME,
                    qty: argData.QTY,
                    actQty: argData.ACT_QTY,
                    connQty: argData.CONN_QTY,
                    preOrderCd: argData.PRE_ORDER_CD,
                    nr: argData.NR,
                    mw: argData.MW,
                    embro: argData.EMBRO,
                    tp: argData.TP,
                    sp: argData.SP,
                    lthr: argData.LTHR,
                    g: argData.G,
                    w: argData.W,
                    s: argData.S,
                    fnd: argData.FND,
                    dl: argData.DL,
                    partWork: argData.PART_WORK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    down: argData.DOWN,
                    cut: argData.CUT,
                    mEta: argData.M_ETA,
                    mEtaLimit: argData.M_ETA_LIMIT,
                    mdBal: argData.MD_BAL,
                    sEta: argData.S_ETA,
                    sd: argData.SD,
                    sdBal: argData.SD_BAL,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    bvtKindName: argData.BVT_KIND_NAME,
                    fob: argData.FOB,
                    expCmpt: argData.EXP_CMPT,
                    timeCheck: argData.TIME_CHECK,
                    cutting: argData.CUTTING,
                    sewInput: argData.SEW_INPUT,
                    sewFrom: argData.SEW_FROM,
                    sewTo: argData.SEW_TO,
                    sewing: argData.SEWING,
                    workHours: argData.WORK_HOURS,
                    stdDays: argData.STD_DAYS,
                    lineDays: argData.LINE_DAYS,
                    line: argData.LINE,
                    lineStartDate: argData.LINE_START_DATE,
                    lineCapa: argData.LINE_CAPA,
                    lineGrade: argData.LINE_GRADE,
                    lineFix: argData.LINE_FIX,
                    planFix: argData.PLAN_FIX,
                    repeatCapa: argData.REPEAT_CAPA,
                    planUser: argData.PLAN_USER,
                    endConfirm: argData.END_CONFIRM,
                    endUser: argData.END_USER,
                    orgSewFrom: argData.ORG_SEW_FROM,
                    orgSewTo: argData.ORG_SEW_TO,
                    exfactryDate: argData.EXFACTRY_DATE,
                    prodRate: argData.PROD_RATE,
                    confirmed: argData.CONFIRMED,
                    stdSewing: argData.STD_SEWING,
                    lineSewing: argData.LINE_SEWING,
                    fixed: argData.FIXED,
                    sq: argData.SQ,
                    pm: argData.PM,
                    sqCom: argData.SQ_COM,
                    orgLineCapa: argData.ORG_LINE_CAPA,
                    updateItem: argData.UPDATE_ITEM,
                    tpKor: argData.TP_KOR,
                    dtp: argData.DTP,
                    capabookIdx: argData.CAPABOOK_IDX,
                },
            });
            console.log(
                "BSV_PLAN_FINISH INSERT:",
                JSON.stringify(data.createBSV_PLAN_FINISH),
            );
            return data.createBSV_PLAN_FINISH;
        } catch (e) {
            console.log("BSV_PLAN_FINISH INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateBSV_PLAN_FINISH(
                        $updateBsvPlanFinishId: Int!
                        $planSeq: Int!
                        $userId: String
                        $seq: Int
                        $jobCd: String
                        $inDate: String
                        $buyerCd: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $styleName: String
                        $qty: Int
                        $actQty: Int
                        $connQty: Int
                        $preOrderCd: String
                        $nr: String
                        $mw: String
                        $embro: String
                        $tp: String
                        $sp: String
                        $lthr: String
                        $g: String
                        $w: String
                        $s: String
                        $fnd: String
                        $dl: String
                        $partWork: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $down: String
                        $cut: String
                        $mEta: String
                        $mEtaLimit: String
                        $mdBal: Int
                        $sEta: String
                        $sd: String
                        $sdBal: Int
                        $kind: String
                        $bvtKind: String
                        $bvtKindName: String
                        $fob: Float
                        $expCmpt: Float
                        $timeCheck: String
                        $cutting: String
                        $sewInput: String
                        $sewFrom: String
                        $sewTo: String
                        $sewing: Int
                        $workHours: Float
                        $stdDays: Float
                        $lineDays: Float
                        $line: String
                        $lineStartDate: String
                        $lineCapa: Float
                        $lineGrade: Float
                        $lineFix: String
                        $planFix: String
                        $repeatCapa: Float
                        $planUser: String
                        $endConfirm: String
                        $endUser: String
                        $orgSewFrom: String
                        $orgSewTo: String
                        $exfactryDate: String
                        $prodRate: Float
                        $confirmed: String
                        $stdSewing: Float
                        $lineSewing: Float
                        $fixed: Float
                        $sq: Float
                        $pm: Float
                        $sqCom: Float
                        $orgLineCapa: Float
                        $updateItem: String
                        $tpKor: String
                        $dtp: String
                        $capabookIdx: String
                    ) {
                        updateBSV_PLAN_FINISH(
                            id: $updateBsvPlanFinishId
                            plan_seq: $planSeq
                            USER_ID: $userId
                            SEQ: $seq
                            JOB_CD: $jobCd
                            IN_DATE: $inDate
                            BUYER_CD: $buyerCd
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            STYLE_NAME: $styleName
                            QTY: $qty
                            ACT_QTY: $actQty
                            CONN_QTY: $connQty
                            PRE_ORDER_CD: $preOrderCd
                            NR: $nr
                            MW: $mw
                            EMBRO: $embro
                            TP: $tp
                            SP: $sp
                            LTHR: $lthr
                            G: $g
                            W: $w
                            S: $s
                            FND: $fnd
                            DL: $dl
                            PART_WORK: $partWork
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            DOWN: $down
                            CUT: $cut
                            M_ETA: $mEta
                            M_ETA_LIMIT: $mEtaLimit
                            MD_BAL: $mdBal
                            S_ETA: $sEta
                            SD: $sd
                            SD_BAL: $sdBal
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            BVT_KIND_NAME: $bvtKindName
                            FOB: $fob
                            EXP_CMPT: $expCmpt
                            TIME_CHECK: $timeCheck
                            CUTTING: $cutting
                            SEW_INPUT: $sewInput
                            SEW_FROM: $sewFrom
                            SEW_TO: $sewTo
                            SEWING: $sewing
                            WORK_HOURS: $workHours
                            STD_DAYS: $stdDays
                            LINE_DAYS: $lineDays
                            LINE: $line
                            LINE_START_DATE: $lineStartDate
                            LINE_CAPA: $lineCapa
                            LINE_GRADE: $lineGrade
                            LINE_FIX: $lineFix
                            PLAN_FIX: $planFix
                            REPEAT_CAPA: $repeatCapa
                            PLAN_USER: $planUser
                            END_CONFIRM: $endConfirm
                            END_USER: $endUser
                            ORG_SEW_FROM: $orgSewFrom
                            ORG_SEW_TO: $orgSewTo
                            EXFACTRY_DATE: $exfactryDate
                            PROD_RATE: $prodRate
                            CONFIRMED: $confirmed
                            STD_SEWING: $stdSewing
                            LINE_SEWING: $lineSewing
                            FIXED: $fixed
                            SQ: $sq
                            PM: $pm
                            SQ_COM: $sqCom
                            ORG_LINE_CAPA: $orgLineCapa
                            UPDATE_ITEM: $updateItem
                            TP_KOR: $tpKor
                            DTP: $dtp
                            CAPABOOK_IDX: $capabookIdx
                        ) {
                            id
                            plan_seq
                            USER_ID
                            SEQ
                            JOB_CD
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            STYLE_NAME
                            QTY
                            ACT_QTY
                            CONN_QTY
                            PRE_ORDER_CD
                            NR
                            MW
                            EMBRO
                            TP
                            SP
                            LTHR
                            G
                            W
                            S
                            FND
                            DL
                            PART_WORK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            M_ETA
                            M_ETA_LIMIT
                            MD_BAL
                            S_ETA
                            SD
                            SD_BAL
                            KIND
                            BVT_KIND
                            BVT_KIND_NAME
                            FOB
                            EXP_CMPT
                            TIME_CHECK
                            CUTTING
                            SEW_INPUT
                            SEW_FROM
                            SEW_TO
                            SEWING
                            WORK_HOURS
                            STD_DAYS
                            LINE_DAYS
                            LINE
                            LINE_START_DATE
                            LINE_CAPA
                            LINE_GRADE
                            LINE_FIX
                            PLAN_FIX
                            REPEAT_CAPA
                            PLAN_USER
                            END_CONFIRM
                            END_USER
                            ORG_SEW_FROM
                            ORG_SEW_TO
                            EXFACTRY_DATE
                            PROD_RATE
                            CONFIRMED
                            STD_SEWING
                            LINE_SEWING
                            FIXED
                            SQ
                            PM
                            SQ_COM
                            ORG_LINE_CAPA
                            UPDATE_ITEM
                            TP_KOR
                            DTP
                            CAPABOOK_IDX
                        }
                    }
                `,
                variables: {
                    updateBsvPlanFinishId: argData.id,
                    planSeq: argData.plan_seq,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    jobCd: argData.JOB_CD,
                    inDate: argData.IN_DATE,
                    buyerCd: argData.BUYER_CD,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    styleName: argData.STYLE_NAME,
                    qty: argData.QTY,
                    actQty: argData.ACT_QTY,
                    connQty: argData.CONN_QTY,
                    preOrderCd: argData.PRE_ORDER_CD,
                    nr: argData.NR,
                    mw: argData.MW,
                    embro: argData.EMBRO,
                    tp: argData.TP,
                    sp: argData.SP,
                    lthr: argData.LTHR,
                    g: argData.G,
                    w: argData.W,
                    s: argData.S,
                    fnd: argData.FND,
                    dl: argData.DL,
                    partWork: argData.PART_WORK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    down: argData.DOWN,
                    cut: argData.CUT,
                    mEta: argData.M_ETA,
                    mEtaLimit: argData.M_ETA_LIMIT,
                    mdBal: argData.MD_BAL,
                    sEta: argData.S_ETA,
                    sd: argData.SD,
                    sdBal: argData.SD_BAL,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    bvtKindName: argData.BVT_KIND_NAME,
                    fob: argData.FOB,
                    expCmpt: argData.EXP_CMPT,
                    timeCheck: argData.TIME_CHECK,
                    cutting: argData.CUTTING,
                    sewInput: argData.SEW_INPUT,
                    sewFrom: argData.SEW_FROM,
                    sewTo: argData.SEW_TO,
                    sewing: argData.SEWING,
                    workHours: argData.WORK_HOURS,
                    stdDays: argData.STD_DAYS,
                    lineDays: argData.LINE_DAYS,
                    line: argData.LINE,
                    lineStartDate: argData.LINE_START_DATE,
                    lineCapa: argData.LINE_CAPA,
                    lineGrade: argData.LINE_GRADE,
                    lineFix: argData.LINE_FIX,
                    planFix: argData.PLAN_FIX,
                    repeatCapa: argData.REPEAT_CAPA,
                    planUser: argData.PLAN_USER,
                    endConfirm: argData.END_CONFIRM,
                    endUser: argData.END_USER,
                    orgSewFrom: argData.ORG_SEW_FROM,
                    orgSewTo: argData.ORG_SEW_TO,
                    exfactryDate: argData.EXFACTRY_DATE,
                    prodRate: argData.PROD_RATE,
                    confirmed: argData.CONFIRMED,
                    stdSewing: argData.STD_SEWING,
                    lineSewing: argData.LINE_SEWING,
                    fixed: argData.FIXED,
                    sq: argData.SQ,
                    pm: argData.PM,
                    sqCom: argData.SQ_COM,
                    orgLineCapa: argData.ORG_LINE_CAPA,
                    updateItem: argData.UPDATE_ITEM,
                    tpKor: argData.TP_KOR,
                    dtp: argData.DTP,
                    capabookIdx: argData.CAPABOOK_IDX,
                },
            });
            console.log(
                "BSV_PLAN_FINISH UPDATE:",
                JSON.stringify(data.updateBSV_PLAN_FINISH),
            );
            return data.updateBSV_PLAN_FINISH;
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
                    mutation DeleteBSV_PLAN_FINISH(
                        $deleteBsvPlanFinishId: Int!
                    ) {
                        deleteBSV_PLAN_FINISH(id: $deleteBsvPlanFinishId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteBsvPlanFinishId: argData.id,
                },
            });
            console.log(
                "BSV_PLAN_FINISH DELETE:",
                JSON.stringify(data.deleteBSV_PLAN_FINISH),
            );
            return data.deleteBSV_PLAN_FINISH;
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
                    mutation MgrBsvPlanFinishDeletes(
                        $ids: [InputMgrBsvPlanFinishDeletes!]!
                    ) {
                        mgrBsvPlanFinishDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("BSV_PLAN_FINISH DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
