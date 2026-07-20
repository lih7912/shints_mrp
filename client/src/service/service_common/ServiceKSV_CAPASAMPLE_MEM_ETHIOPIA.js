/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_CAPASAMPLE_MEM_ETHIOPIA {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPASAMPLE_MEM_ETHIOPIA {
                        allQueryKSV_CAPASAMPLE_MEM_ETHIOPIA {
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
                "KSV_CAPASAMPLE_MEM_ETHIOPIA:",
                JSON.stringify(data.allQueryKSV_CAPASAMPLE_MEM_ETHIOPIA.length),
            );
            return data.allQueryKSV_CAPASAMPLE_MEM_ETHIOPIA;
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
                    query MgrKsvCapasampleMemEthiopiaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapasampleMemEthiopiaQuery(
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
                "KSV_CAPASAMPLE_MEM_ETHIOPIA:",
                JSON.stringify(data.mgrKsvCapasampleMemEthiopiaQuery.length),
            );
            return data.mgrKsvCapasampleMemEthiopiaQuery;
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
                    mutation CreateKSV_CAPASAMPLE_MEM_ETHIOPIA(
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
                        createKSV_CAPASAMPLE_MEM_ETHIOPIA(
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
                "KSV_CAPASAMPLE_MEM_ETHIOPIA INSERT:",
                JSON.stringify(data.createKSV_CAPASAMPLE_MEM_ETHIOPIA),
            );
            return data.createKSV_CAPASAMPLE_MEM_ETHIOPIA;
        } catch (e) {
            console.log(
                "KSV_CAPASAMPLE_MEM_ETHIOPIA INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_CAPASAMPLE_MEM_ETHIOPIA(
                        $updateKsvCapasampleMemEthiopiaId: Int!
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
                        updateKSV_CAPASAMPLE_MEM_ETHIOPIA(
                            id: $updateKsvCapasampleMemEthiopiaId
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
                    updateKsvCapasampleMemEthiopiaId: argData.id,
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
                "KSV_CAPASAMPLE_MEM_ETHIOPIA UPDATE:",
                JSON.stringify(data.updateKSV_CAPASAMPLE_MEM_ETHIOPIA),
            );
            return data.updateKSV_CAPASAMPLE_MEM_ETHIOPIA;
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
                    mutation DeleteKSV_CAPASAMPLE_MEM_ETHIOPIA(
                        $deleteKsvCapasampleMemEthiopiaId: Int!
                    ) {
                        deleteKSV_CAPASAMPLE_MEM_ETHIOPIA(
                            id: $deleteKsvCapasampleMemEthiopiaId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapasampleMemEthiopiaId: argData.id,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MEM_ETHIOPIA DELETE:",
                JSON.stringify(data.deleteKSV_CAPASAMPLE_MEM_ETHIOPIA),
            );
            return data.deleteKSV_CAPASAMPLE_MEM_ETHIOPIA;
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
                    mutation MgrKsvCapasampleMemEthiopiaDeletes(
                        $ids: [InputMgrKsvCapasampleMemEthiopiaDeletes!]!
                    ) {
                        mgrKsvCapasampleMemEthiopiaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_CAPASAMPLE_MEM_ETHIOPIA DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
