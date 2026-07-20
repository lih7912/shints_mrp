/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_STYLE {
    async getDataOne(argId) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query OneQueryKCD_STYLE($oneQueryKcdStyleId: Int!) {
                        oneQueryKCD_STYLE(id: $oneQueryKcdStyleId) {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
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
                            DOWN
                            CUT
                            KIND
                            BVT_KIND
                            YY
                            SEQ
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            TPR
                            EMBOSSING
                            WASHING
                            style_kname
                            ss_direct_rate
                            ss_extra_rate
                            ss_retail_rate
                            ss_web_rate
                            ss_nsr_rate
                            ss_webex_rate
                            minus_limit
                            in_exp_date
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: { oneQueryKcdStyleId: argId },
            });
            console.log("KCD_STYLE:", JSON.stringify(data.oneQueryKCD_STYLE));
            return data.oneQueryKCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_STYLE {
                        allQueryKCD_STYLE {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
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
                            DOWN
                            CUT
                            KIND
                            BVT_KIND
                            YY
                            SEQ
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            TPR
                            EMBOSSING
                            WASHING
                            style_kname
                            ss_direct_rate
                            ss_extra_rate
                            ss_retail_rate
                            ss_web_rate
                            ss_nsr_rate
                            ss_webex_rate
                            minus_limit
                            in_exp_date
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
            });
            console.log(
                "KCD_STYLE:",
                JSON.stringify(data.allQueryKCD_STYLE.length),
            );
            return data.allQueryKCD_STYLE;
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
                    query MgrKcdStyleQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdStyleQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
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
                            DOWN
                            CUT
                            KIND
                            BVT_KIND
                            YY
                            SEQ
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            TPR
                            EMBOSSING
                            WASHING
                            style_kname
                            ss_direct_rate
                            ss_extra_rate
                            ss_retail_rate
                            ss_web_rate
                            ss_nsr_rate
                            ss_webex_rate
                            minus_limit
                            in_exp_date
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_STYLE:",
                JSON.stringify(data.mgrKcdStyleQuery.length),
            );
            return data.mgrKcdStyleQuery;
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
                    mutation CreateKCD_STYLE(
                        $styleCd: String
                        $styleName: String
                        $buyerCd: String
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
                        $down: String
                        $cut: String
                        $kind: String
                        $bvtKind: String
                        $yy: Int
                        $seq: Int
                        $bvtFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $styleKname: String
                        $ssDirectRate: String
                        $ssExtraRate: String
                        $ssRetailRate: String
                        $ssWebRate: String
                        $ssNsrRate: String
                        $ssWebexRate: String
                        $minusLimit: Int
                        $inExpDate: String
                        $ftp: String
                        $dtp: String
                        $laze: String
                    ) {
                        createKCD_STYLE(
                            STYLE_CD: $styleCd
                            STYLE_NAME: $styleName
                            BUYER_CD: $buyerCd
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
                            DOWN: $down
                            CUT: $cut
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            YY: $yy
                            SEQ: $seq
                            BVT_FLAG: $bvtFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            style_kname: $styleKname
                            ss_direct_rate: $ssDirectRate
                            ss_extra_rate: $ssExtraRate
                            ss_retail_rate: $ssRetailRate
                            ss_web_rate: $ssWebRate
                            ss_nsr_rate: $ssNsrRate
                            ss_webex_rate: $ssWebexRate
                            minus_limit: $minusLimit
                            in_exp_date: $inExpDate
                            FTP: $ftp
                            DTP: $dtp
                            LAZE: $laze
                        ) {
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
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
                            DOWN
                            CUT
                            KIND
                            BVT_KIND
                            YY
                            SEQ
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            TPR
                            EMBOSSING
                            WASHING
                            style_kname
                            ss_direct_rate
                            ss_extra_rate
                            ss_retail_rate
                            ss_web_rate
                            ss_nsr_rate
                            ss_webex_rate
                            minus_limit
                            in_exp_date
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: {
                    styleCd: argData.STYLE_CD,
                    styleName: argData.STYLE_NAME,
                    buyerCd: argData.BUYER_CD,
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
                    down: argData.DOWN,
                    cut: argData.CUT,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    bvtFlag: argData.BVT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    styleKname: argData.style_kname,
                    ssDirectRate: argData.ss_direct_rate,
                    ssExtraRate: argData.ss_extra_rate,
                    ssRetailRate: argData.ss_retail_rate,
                    ssWebRate: argData.ss_web_rate,
                    ssNsrRate: argData.ss_nsr_rate,
                    ssWebexRate: argData.ss_webex_rate,
                    minusLimit: argData.minus_limit,
                    inExpDate: argData.in_exp_date,
                    ftp: argData.FTP,
                    dtp: argData.DTP,
                    laze: argData.LAZE,
                },
            });
            console.log(
                "KCD_STYLE INSERT:",
                JSON.stringify(data.createKCD_STYLE),
            );
            return data.createKCD_STYLE;
        } catch (e) {
            console.log("KCD_STYLE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_STYLE(
                        $updateKcdStyleId: Int!
                        $styleCd: String
                        $styleName: String
                        $buyerCd: String
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
                        $down: String
                        $cut: String
                        $kind: String
                        $bvtKind: String
                        $yy: Int
                        $seq: Int
                        $bvtFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $tpr: Int
                        $embossing: String
                        $washing: String
                        $styleKname: String
                        $ssDirectRate: String
                        $ssExtraRate: String
                        $ssRetailRate: String
                        $ssWebRate: String
                        $ssNsrRate: String
                        $ssWebexRate: String
                        $minusLimit: Int
                        $inExpDate: String
                        $ftp: String
                        $dtp: String
                        $laze: String
                    ) {
                        updateKCD_STYLE(
                            id: $updateKcdStyleId
                            STYLE_CD: $styleCd
                            STYLE_NAME: $styleName
                            BUYER_CD: $buyerCd
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
                            DOWN: $down
                            CUT: $cut
                            KIND: $kind
                            BVT_KIND: $bvtKind
                            YY: $yy
                            SEQ: $seq
                            BVT_FLAG: $bvtFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            TPR: $tpr
                            EMBOSSING: $embossing
                            WASHING: $washing
                            style_kname: $styleKname
                            ss_direct_rate: $ssDirectRate
                            ss_extra_rate: $ssExtraRate
                            ss_retail_rate: $ssRetailRate
                            ss_web_rate: $ssWebRate
                            ss_nsr_rate: $ssNsrRate
                            ss_webex_rate: $ssWebexRate
                            minus_limit: $minusLimit
                            in_exp_date: $inExpDate
                            FTP: $ftp
                            DTP: $dtp
                            LAZE: $laze
                        ) {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
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
                            DOWN
                            CUT
                            KIND
                            BVT_KIND
                            YY
                            SEQ
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            TPR
                            EMBOSSING
                            WASHING
                            style_kname
                            ss_direct_rate
                            ss_extra_rate
                            ss_retail_rate
                            ss_web_rate
                            ss_nsr_rate
                            ss_webex_rate
                            minus_limit
                            in_exp_date
                            FTP
                            DTP
                            LAZE
                        }
                    }
                `,
                variables: {
                    updateKcdStyleId: argData.id,
                    styleCd: argData.STYLE_CD,
                    styleName: argData.STYLE_NAME,
                    buyerCd: argData.BUYER_CD,
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
                    down: argData.DOWN,
                    cut: argData.CUT,
                    kind: argData.KIND,
                    bvtKind: argData.BVT_KIND,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    bvtFlag: argData.BVT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    tpr: argData.TPR,
                    embossing: argData.EMBOSSING,
                    washing: argData.WASHING,
                    styleKname: argData.style_kname,
                    ssDirectRate: argData.ss_direct_rate,
                    ssExtraRate: argData.ss_extra_rate,
                    ssRetailRate: argData.ss_retail_rate,
                    ssWebRate: argData.ss_web_rate,
                    ssNsrRate: argData.ss_nsr_rate,
                    ssWebexRate: argData.ss_webex_rate,
                    minusLimit: argData.minus_limit,
                    inExpDate: argData.in_exp_date,
                    ftp: argData.FTP,
                    dtp: argData.DTP,
                    laze: argData.LAZE,
                },
            });
            console.log(
                "KCD_STYLE UPDATE:",
                JSON.stringify(data.updateKCD_STYLE),
            );
            return data.updateKCD_STYLE;
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
                    mutation DeleteKCD_STYLE($deleteKcdStyleId: Int!) {
                        deleteKCD_STYLE(id: $deleteKcdStyleId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdStyleId: argData.id,
                },
            });
            console.log(
                "KCD_STYLE DELETE:",
                JSON.stringify(data.deleteKCD_STYLE),
            );
            return data.deleteKCD_STYLE;
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
            tOneObj.STYLE_CD = tOne.STYLE_CD;
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.ids = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKcdStyleDeletes(
                        $ids: [InputMgrKcdStyleDeletes!]!
                    ) {
                        mgrKcdStyleDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_STYLE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
