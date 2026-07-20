/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CAPABOOK_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPABOOK_MEM {
                        allQueryKSV_CAPABOOK_MEM {
                            id
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
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
                            FOB
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            ORG_USER_ID
                            SEND_DATETIME
                            CAPABOOK_IDX
                            SEND_FLAG
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
            });
            console.log(
                "KSV_CAPABOOK_MEM:",
                JSON.stringify(data.allQueryKSV_CAPABOOK_MEM.length),
            );
            return data.allQueryKSV_CAPABOOK_MEM;
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
                    query MgrKsvCapabookMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapabookMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
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
                            FOB
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            ORG_USER_ID
                            SEND_DATETIME
                            CAPABOOK_IDX
                            SEND_FLAG
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CAPABOOK_MEM:",
                JSON.stringify(data.mgrKsvCapabookMemQuery.length),
            );
            return data.mgrKsvCapabookMemQuery;
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
                    mutation CreateKSV_CAPABOOK_MEM(
                        $bookDate: String
                        $userId: String
                        $seq: Int
                        $jobCd: String
                        $month: Int
                        $inDate: String
                        $buyerCd: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $qty: Int
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
                        $fob: Float
                        $sd: String
                        $kind: String
                        $bvtKind: String
                        $sEta: String
                        $expCmpt: Float
                        $remark: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $down: String
                        $cut: String
                        $orgUserId: String
                        $sendDatetime: String
                        $capabookIdx: String
                        $sendFlag: String
                        $ftp: String
                        $dtp: String
                        $laze: String
                    ) {
                        createKSV_CAPABOOK_MEM(
                            BOOK_DATE: $bookDate
                            USER_ID: $userId
                            SEQ: $seq
                            JOB_CD: $jobCd
                            MONTH: $month
                            IN_DATE: $inDate
                            BUYER_CD: $buyerCd
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            QTY: $qty
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
                            FOB: $fob
                            SD: $sd
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            S_ETA: $sEta
                            EXP_CMPT: $expCmpt
                            REMARK: $remark
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            DOWN: $down
                            CUT: $cut
                            ORG_USER_ID: $orgUserId
                            SEND_DATETIME: $sendDatetime
                            CAPABOOK_IDX: $capabookIdx
                            SEND_FLAG: $sendFlag
                            FTP: $ftp
                            DTP: $dtp
                            LAZE: $laze
                        ) {
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
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
                            FOB
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            ORG_USER_ID
                            SEND_DATETIME
                            CAPABOOK_IDX
                            SEND_FLAG
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: {
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    jobCd: argData.JOB_CD,
                    month: argData.MONTH,
                    inDate: argData.IN_DATE,
                    buyerCd: argData.BUYER_CD,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    qty: argData.QTY,
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
                    fob: argData.FOB,
                    sd: argData.SD,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    sEta: argData.S_ETA,
                    expCmpt: argData.EXP_CMPT,
                    remark: argData.REMARK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    down: argData.DOWN,
                    cut: argData.CUT,
                    orgUserId: argData.ORG_USER_ID,
                    sendDatetime: argData.SEND_DATETIME,
                    capabookIdx: argData.CAPABOOK_IDX,
                    sendFlag: argData.SEND_FLAG,
                    ftp: argData.FTP,
                    dtp: argData.DTP,
                    laze: argData.LAZE,
                },
            });
            console.log(
                "KSV_CAPABOOK_MEM INSERT:",
                JSON.stringify(data.createKSV_CAPABOOK_MEM),
            );
            return data.createKSV_CAPABOOK_MEM;
        } catch (e) {
            console.log("KSV_CAPABOOK_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CAPABOOK_MEM(
                        $updateKsvCapabookMemId: Int!
                        $bookDate: String
                        $userId: String
                        $seq: Int
                        $jobCd: String
                        $month: Int
                        $inDate: String
                        $buyerCd: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $qty: Int
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
                        $fob: Float
                        $sd: String
                        $kind: String
                        $bvtKind: String
                        $sEta: String
                        $expCmpt: Float
                        $remark: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $down: String
                        $cut: String
                        $orgUserId: String
                        $sendDatetime: String
                        $capabookIdx: String
                        $sendFlag: String
                        $ftp: String
                        $dtp: String
                        $laze: String
                    ) {
                        updateKSV_CAPABOOK_MEM(
                            id: $updateKsvCapabookMemId
                            BOOK_DATE: $bookDate
                            USER_ID: $userId
                            SEQ: $seq
                            JOB_CD: $jobCd
                            MONTH: $month
                            IN_DATE: $inDate
                            BUYER_CD: $buyerCd
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            QTY: $qty
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
                            FOB: $fob
                            SD: $sd
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            S_ETA: $sEta
                            EXP_CMPT: $expCmpt
                            REMARK: $remark
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            DOWN: $down
                            CUT: $cut
                            ORG_USER_ID: $orgUserId
                            SEND_DATETIME: $sendDatetime
                            CAPABOOK_IDX: $capabookIdx
                            SEND_FLAG: $sendFlag
                            FTP: $ftp
                            DTP: $dtp
                            LAZE: $laze
                        ) {
                            id
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            QTY
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
                            FOB
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            DOWN
                            CUT
                            ORG_USER_ID
                            SEND_DATETIME
                            CAPABOOK_IDX
                            SEND_FLAG
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: {
                    updateKsvCapabookMemId: argData.id,
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    jobCd: argData.JOB_CD,
                    month: argData.MONTH,
                    inDate: argData.IN_DATE,
                    buyerCd: argData.BUYER_CD,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    qty: argData.QTY,
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
                    fob: argData.FOB,
                    sd: argData.SD,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    sEta: argData.S_ETA,
                    expCmpt: argData.EXP_CMPT,
                    remark: argData.REMARK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    down: argData.DOWN,
                    cut: argData.CUT,
                    orgUserId: argData.ORG_USER_ID,
                    sendDatetime: argData.SEND_DATETIME,
                    capabookIdx: argData.CAPABOOK_IDX,
                    sendFlag: argData.SEND_FLAG,
                    ftp: argData.FTP,
                    dtp: argData.DTP,
                    laze: argData.LAZE,
                },
            });
            console.log(
                "KSV_CAPABOOK_MEM UPDATE:",
                JSON.stringify(data.updateKSV_CAPABOOK_MEM),
            );
            return data.updateKSV_CAPABOOK_MEM;
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
                    mutation DeleteKSV_CAPABOOK_MEM(
                        $deleteKsvCapabookMemId: Int!
                    ) {
                        deleteKSV_CAPABOOK_MEM(id: $deleteKsvCapabookMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapabookMemId: argData.id,
                },
            });
            console.log(
                "KSV_CAPABOOK_MEM DELETE:",
                JSON.stringify(data.deleteKSV_CAPABOOK_MEM),
            );
            return data.deleteKSV_CAPABOOK_MEM;
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
                    mutation MgrKsvCapabookMemDeletes(
                        $ids: [InputMgrKsvCapabookMemDeletes!]!
                    ) {
                        mgrKsvCapabookMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CAPABOOK_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
