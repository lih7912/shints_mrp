/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_CAPASAMPLE_PATTERN_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPASAMPLE_PATTERN_MEM {
                        allQueryKSV_CAPASAMPLE_PATTERN_MEM {
                            id
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            STYLE_CD
                            COLOR
                            USE_SIZE
                            QTY
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
                            SD
                            S_ETA
                            P_ETA
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                        }
                    }
                `,
            });
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM:",
                JSON.stringify(data.allQueryKSV_CAPASAMPLE_PATTERN_MEM.length),
            );
            return data.allQueryKSV_CAPASAMPLE_PATTERN_MEM;
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
                    query MgrKsvCapasamplePatternMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapasamplePatternMemQuery(
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
                            STYLE_CD
                            COLOR
                            USE_SIZE
                            QTY
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
                            SD
                            S_ETA
                            P_ETA
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM:",
                JSON.stringify(data.mgrKsvCapasamplePatternMemQuery.length),
            );
            return data.mgrKsvCapasamplePatternMemQuery;
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
                    mutation CreateKSV_CAPASAMPLE_PATTERN_MEM(
                        $bookDate: String
                        $userId: String
                        $seq: Int
                        $jobCd: String
                        $month: Int
                        $inDate: String
                        $buyerCd: String
                        $styleCd: String
                        $color: String
                        $useSize: String
                        $qty: Int
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
                        $sd: String
                        $sEta: String
                        $pEta: String
                        $remark: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                    ) {
                        createKSV_CAPASAMPLE_PATTERN_MEM(
                            BOOK_DATE: $bookDate
                            USER_ID: $userId
                            SEQ: $seq
                            JOB_CD: $jobCd
                            MONTH: $month
                            IN_DATE: $inDate
                            BUYER_CD: $buyerCd
                            STYLE_CD: $styleCd
                            COLOR: $color
                            USE_SIZE: $useSize
                            QTY: $qty
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
                            SD: $sd
                            S_ETA: $sEta
                            P_ETA: $pEta
                            REMARK: $remark
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                        ) {
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            STYLE_CD
                            COLOR
                            USE_SIZE
                            QTY
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
                            SD
                            S_ETA
                            P_ETA
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
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
                    styleCd: argData.STYLE_CD,
                    color: argData.COLOR,
                    useSize: argData.USE_SIZE,
                    qty: argData.QTY,
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
                    sd: argData.SD,
                    sEta: argData.S_ETA,
                    pEta: argData.P_ETA,
                    remark: argData.REMARK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM INSERT:",
                JSON.stringify(data.createKSV_CAPASAMPLE_PATTERN_MEM),
            );
            return data.createKSV_CAPASAMPLE_PATTERN_MEM;
        } catch (e) {
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM INSERT ERROR:",
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
                    mutation UpdateKSV_CAPASAMPLE_PATTERN_MEM(
                        $updateKsvCapasamplePatternMemId: Int!
                        $bookDate: String
                        $userId: String
                        $seq: Int
                        $jobCd: String
                        $month: Int
                        $inDate: String
                        $buyerCd: String
                        $styleCd: String
                        $color: String
                        $useSize: String
                        $qty: Int
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
                        $sd: String
                        $sEta: String
                        $pEta: String
                        $remark: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                    ) {
                        updateKSV_CAPASAMPLE_PATTERN_MEM(
                            id: $updateKsvCapasamplePatternMemId
                            BOOK_DATE: $bookDate
                            USER_ID: $userId
                            SEQ: $seq
                            JOB_CD: $jobCd
                            MONTH: $month
                            IN_DATE: $inDate
                            BUYER_CD: $buyerCd
                            STYLE_CD: $styleCd
                            COLOR: $color
                            USE_SIZE: $useSize
                            QTY: $qty
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
                            SD: $sd
                            S_ETA: $sEta
                            P_ETA: $pEta
                            REMARK: $remark
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                        ) {
                            id
                            BOOK_DATE
                            USER_ID
                            SEQ
                            JOB_CD
                            MONTH
                            IN_DATE
                            BUYER_CD
                            STYLE_CD
                            COLOR
                            USE_SIZE
                            QTY
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
                            SD
                            S_ETA
                            P_ETA
                            REMARK
                            TPR
                            EMBOSSING
                            WASHING
                        }
                    }
                `,
                variables: {
                    updateKsvCapasamplePatternMemId: argData.id,
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    jobCd: argData.JOB_CD,
                    month: argData.MONTH,
                    inDate: argData.IN_DATE,
                    buyerCd: argData.BUYER_CD,
                    styleCd: argData.STYLE_CD,
                    color: argData.COLOR,
                    useSize: argData.USE_SIZE,
                    qty: argData.QTY,
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
                    sd: argData.SD,
                    sEta: argData.S_ETA,
                    pEta: argData.P_ETA,
                    remark: argData.REMARK,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM UPDATE:",
                JSON.stringify(data.updateKSV_CAPASAMPLE_PATTERN_MEM),
            );
            return data.updateKSV_CAPASAMPLE_PATTERN_MEM;
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
                    mutation DeleteKSV_CAPASAMPLE_PATTERN_MEM(
                        $deleteKsvCapasamplePatternMemId: Int!
                    ) {
                        deleteKSV_CAPASAMPLE_PATTERN_MEM(
                            id: $deleteKsvCapasamplePatternMemId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapasamplePatternMemId: argData.id,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM DELETE:",
                JSON.stringify(data.deleteKSV_CAPASAMPLE_PATTERN_MEM),
            );
            return data.deleteKSV_CAPASAMPLE_PATTERN_MEM;
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
                    mutation MgrKsvCapasamplePatternMemDeletes(
                        $ids: [InputMgrKsvCapasamplePatternMemDeletes!]!
                    ) {
                        mgrKsvCapasamplePatternMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_CAPASAMPLE_PATTERN_MEM DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
