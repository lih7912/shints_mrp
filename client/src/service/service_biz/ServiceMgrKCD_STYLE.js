/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_STYLE {
    async getDatasByLimit(qrySkip, qryTake) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdStyleQueryAll($skip: Int!, $take: Int!) {
                        mgrKcdStyleQueryAll(SKIP: $skip, TAKE: $take) {
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
                variables: { skip: qrySkip, take: qryTake },
            });
            console.log(
                "MGR_KCD_STYLE:",
                JSON.stringify(data.mgrKcdStyleQueryAll.length),
            );
            return data.mgrKcdStyleQueryAll;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qryStyleName, qryBuyerCd, qryBvtKind) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdStyleQuery(
                        $styleName: String!
                        $buyerCd: String!
                        $bvtKind: String!
                    ) {
                        mgrKcdStyleQuery(
                            STYLE_NAME: $styleName
                            BUYER_CD: $buyerCd
                            BVT_KIND: $bvtKind
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
                            STATUS_NAME
                            BVT_KIND_NAME
                            BUYER_NAME
                            COLOR_CNT
                        }
                    }
                `,
                variables: {
                    styleName: qryStyleName,
                    buyerCd: qryBuyerCd,
                    bvtKind: qryBvtKind,
                },
            });
            console.log(
                "MGR_KCD_STYLE:",
                JSON.stringify(data.mgrKcdStyleQuery.length),
            );
            return data.mgrKcdStyleQuery;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParamKSV_PROD_MST(qryStyleCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvProdMstQueryByCd($styleCd: String!) {
                        mgrKsvProdMstQueryByCd(STYLE_CD: $styleCd) {
                            id
                            PROD_CD
                            STYLE_CD
                            PROD_TYPE
                            COLOR
                            PROD_UNIT
                            COLLECTION
                            YY
                            SEQ
                            SIZE_LOSS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { styleCd: qryStyleCd },
            });
            console.log(
                "MGR_KCD_STYLE_KSV_PROD_MST:" +
                    qryStyleCd +
                    "," +
                    JSON.stringify(data.mgrKsvProdMstQueryByCd.length),
            );
            return data.mgrKsvProdMstQueryByCd;
        } catch (e) {
            return e;
        }
    }

    async getDataOne(qryId) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                variables: { oneQueryKcdStyleId: qryId },
            });
            console.log(
                "MGR_KCD_STYLE:",
                JSON.stringify(data.oneQueryKCD_STYLE.id),
            );
            return data.oneQueryKCD_STYLE.id;
        } catch (e) {
            return e;
        }
    }

    async createsData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tInputs = {};
        tInputs.datas = argDatas;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKcdStyleCreates(
                        $datas: [InputMgrKcdStyleCreates!]!
                    ) {
                        mgrKcdStyleCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_STYLE CREATES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }

    async createsDataKSV_PROD_MST(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        var tInputs = {};
        tInputs.datas = argDatas;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvProdMstCreates(
                        $datas: [InputMgrKsvProdMstCreates!]!
                    ) {
                        mgrKsvProdMstCreates(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KCD_STYLE :KSV_PROD_MST:  CREATES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
