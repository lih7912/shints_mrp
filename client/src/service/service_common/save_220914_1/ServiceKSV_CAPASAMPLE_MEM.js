/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CAPASAMPLE_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPASAMPLE_MEM {
                        allQueryKSV_CAPASAMPLE_MEM {
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
                            STS_QTY
                            COLOR
                            USE_SIZE
                            USAGE
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
                            M_ETA
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            P_ETA
                            STOCK_FLAG
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            CUT
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
            });
            console.log(
                "KSV_CAPASAMPLE_MEM:",
                JSON.stringify(data.allQueryKSV_CAPASAMPLE_MEM.length),
            );
            return data.allQueryKSV_CAPASAMPLE_MEM;
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
                    query MgrKsvCapasampleMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapasampleMemQuery(
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
                            STS_QTY
                            COLOR
                            USE_SIZE
                            USAGE
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
                            M_ETA
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            P_ETA
                            STOCK_FLAG
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            CUT
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CAPASAMPLE_MEM:",
                JSON.stringify(data.mgrKsvCapasampleMemQuery.length),
            );
            return data.mgrKsvCapasampleMemQuery;
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
                    mutation CreateKSV_CAPASAMPLE_MEM(
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
                        $stsQty: Int
                        $color: String
                        $useSize: String
                        $usage: String
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
                        $mEta: String
                        $sd: String
                        $kind: String
                        $bvtKind: String
                        $sEta: String
                        $pEta: String
                        $stockFlag: String
                        $expCmpt: Float
                        $remark: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $cut: String
                        $ftp: String
                        $dtp: String
                        $laze: String
                    ) {
                        createKSV_CAPASAMPLE_MEM(
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
                            STS_QTY: $stsQty
                            COLOR: $color
                            USE_SIZE: $useSize
                            USAGE: $usage
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
                            M_ETA: $mEta
                            SD: $sd
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            S_ETA: $sEta
                            P_ETA: $pEta
                            STOCK_FLAG: $stockFlag
                            EXP_CMPT: $expCmpt
                            REMARK: $remark
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            CUT: $cut
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
                            STS_QTY
                            COLOR
                            USE_SIZE
                            USAGE
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
                            M_ETA
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            P_ETA
                            STOCK_FLAG
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            CUT
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
                    stsQty: argData.STS_QTY,
                    color: argData.COLOR,
                    useSize: argData.USE_SIZE,
                    usage: argData.USAGE,
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
                    mEta: argData.M_ETA,
                    sd: argData.SD,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    sEta: argData.S_ETA,
                    pEta: argData.P_ETA,
                    stockFlag: argData.STOCK_FLAG,
                    expCmpt: argData.EXP_CMPT,
                    remark: argData.REMARK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    cut: argData.CUT,
                    ftp: argData.FTP,
                    dtp: argData.DTP,
                    laze: argData.LAZE,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MEM INSERT:",
                JSON.stringify(data.createKSV_CAPASAMPLE_MEM),
            );
            return data.createKSV_CAPASAMPLE_MEM;
        } catch (e) {
            console.log("KSV_CAPASAMPLE_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CAPASAMPLE_MEM(
                        $updateKsvCapasampleMemId: Int!
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
                        $stsQty: Int
                        $color: String
                        $useSize: String
                        $usage: String
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
                        $mEta: String
                        $sd: String
                        $kind: String
                        $bvtKind: String
                        $sEta: String
                        $pEta: String
                        $stockFlag: String
                        $expCmpt: Float
                        $remark: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $cut: String
                        $ftp: String
                        $dtp: String
                        $laze: String
                    ) {
                        updateKSV_CAPASAMPLE_MEM(
                            id: $updateKsvCapasampleMemId
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
                            STS_QTY: $stsQty
                            COLOR: $color
                            USE_SIZE: $useSize
                            USAGE: $usage
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
                            M_ETA: $mEta
                            SD: $sd
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            S_ETA: $sEta
                            P_ETA: $pEta
                            STOCK_FLAG: $stockFlag
                            EXP_CMPT: $expCmpt
                            REMARK: $remark
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            CUT: $cut
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
                            STS_QTY
                            COLOR
                            USE_SIZE
                            USAGE
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
                            M_ETA
                            SD
                            KIND
                            BVT_KIND
                            S_ETA
                            P_ETA
                            STOCK_FLAG
                            EXP_CMPT
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                            CUT
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: {
                    updateKsvCapasampleMemId: argData.id,
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
                    stsQty: argData.STS_QTY,
                    color: argData.COLOR,
                    useSize: argData.USE_SIZE,
                    usage: argData.USAGE,
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
                    mEta: argData.M_ETA,
                    sd: argData.SD,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    sEta: argData.S_ETA,
                    pEta: argData.P_ETA,
                    stockFlag: argData.STOCK_FLAG,
                    expCmpt: argData.EXP_CMPT,
                    remark: argData.REMARK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    cut: argData.CUT,
                    ftp: argData.FTP,
                    dtp: argData.DTP,
                    laze: argData.LAZE,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MEM UPDATE:",
                JSON.stringify(data.updateKSV_CAPASAMPLE_MEM),
            );
            return data.updateKSV_CAPASAMPLE_MEM;
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
                    mutation DeleteKSV_CAPASAMPLE_MEM(
                        $deleteKsvCapasampleMemId: Int!
                    ) {
                        deleteKSV_CAPASAMPLE_MEM(
                            id: $deleteKsvCapasampleMemId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapasampleMemId: argData.id,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MEM DELETE:",
                JSON.stringify(data.deleteKSV_CAPASAMPLE_MEM),
            );
            return data.deleteKSV_CAPASAMPLE_MEM;
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
                    mutation MgrKsvCapasampleMemDeletes(
                        $ids: [InputMgrKsvCapasampleMemDeletes!]!
                    ) {
                        mgrKsvCapasampleMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CAPASAMPLE_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
