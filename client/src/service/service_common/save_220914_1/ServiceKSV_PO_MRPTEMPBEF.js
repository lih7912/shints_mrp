/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRPTEMPBEF {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPTEMPBEF {
                        allQueryKSV_PO_MRPTEMPBEF {
                            id
                            USER_ID
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            MRP_SEQ
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PO_MATL_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPTEMPBEF:",
                JSON.stringify(data.allQueryKSV_PO_MRPTEMPBEF.length),
            );
            return data.allQueryKSV_PO_MRPTEMPBEF;
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
                    query MgrKsvPoMrptempbefQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrptempbefQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            MRP_SEQ
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PO_MATL_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPTEMPBEF:",
                JSON.stringify(data.mgrKsvPoMrptempbefQuery.length),
            );
            return data.mgrKsvPoMrptempbefQuery;
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
                    mutation CreateKSV_PO_MRPTEMPBEF(
                        $userId: String
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $mrpSeq: Int
                        $useSize: String
                        $useQty: Float
                        $poQty: Float
                        $befPoQty: Float
                        $diffQty: Float
                        $diffPoType: String
                        $changeReason: String
                        $usePoType: String
                        $currCd: String
                        $totAmt: Float
                        $currDate: String
                        $usdAmt: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $poMatlCd: String
                    ) {
                        createKSV_PO_MRPTEMPBEF(
                            USER_ID: $userId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            MRP_SEQ: $mrpSeq
                            USE_SIZE: $useSize
                            USE_QTY: $useQty
                            PO_QTY: $poQty
                            BEF_PO_QTY: $befPoQty
                            DIFF_QTY: $diffQty
                            DIFF_PO_TYPE: $diffPoType
                            CHANGE_REASON: $changeReason
                            USE_PO_TYPE: $usePoType
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            CURR_DATE: $currDate
                            USD_AMT: $usdAmt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PO_MATL_CD: $poMatlCd
                        ) {
                            USER_ID
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            MRP_SEQ
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PO_MATL_CD
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    mrpSeq: argData.MRP_SEQ,
                    useSize: argData.USE_SIZE,
                    useQty: argData.USE_QTY,
                    poQty: argData.PO_QTY,
                    befPoQty: argData.BEF_PO_QTY,
                    diffQty: argData.DIFF_QTY,
                    diffPoType: argData.DIFF_PO_TYPE,
                    changeReason: argData.CHANGE_REASON,
                    usePoType: argData.USE_PO_TYPE,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    currDate: argData.CURR_DATE,
                    usdAmt: argData.USD_AMT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    poMatlCd: argData.PO_MATL_CD,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPBEF INSERT:",
                JSON.stringify(data.createKSV_PO_MRPTEMPBEF),
            );
            return data.createKSV_PO_MRPTEMPBEF;
        } catch (e) {
            console.log("KSV_PO_MRPTEMPBEF INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MRPTEMPBEF(
                        $updateKsvPoMrptempbefId: Int!
                        $userId: String
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $mrpSeq: Int
                        $useSize: String
                        $useQty: Float
                        $poQty: Float
                        $befPoQty: Float
                        $diffQty: Float
                        $diffPoType: String
                        $changeReason: String
                        $usePoType: String
                        $currCd: String
                        $totAmt: Float
                        $currDate: String
                        $usdAmt: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $poMatlCd: String
                    ) {
                        updateKSV_PO_MRPTEMPBEF(
                            id: $updateKsvPoMrptempbefId
                            USER_ID: $userId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            MRP_SEQ: $mrpSeq
                            USE_SIZE: $useSize
                            USE_QTY: $useQty
                            PO_QTY: $poQty
                            BEF_PO_QTY: $befPoQty
                            DIFF_QTY: $diffQty
                            DIFF_PO_TYPE: $diffPoType
                            CHANGE_REASON: $changeReason
                            USE_PO_TYPE: $usePoType
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            CURR_DATE: $currDate
                            USD_AMT: $usdAmt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PO_MATL_CD: $poMatlCd
                        ) {
                            id
                            USER_ID
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            MRP_SEQ
                            USE_SIZE
                            USE_QTY
                            PO_QTY
                            BEF_PO_QTY
                            DIFF_QTY
                            DIFF_PO_TYPE
                            CHANGE_REASON
                            USE_PO_TYPE
                            CURR_CD
                            TOT_AMT
                            CURR_DATE
                            USD_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            PO_MATL_CD
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrptempbefId: argData.id,
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    mrpSeq: argData.MRP_SEQ,
                    useSize: argData.USE_SIZE,
                    useQty: argData.USE_QTY,
                    poQty: argData.PO_QTY,
                    befPoQty: argData.BEF_PO_QTY,
                    diffQty: argData.DIFF_QTY,
                    diffPoType: argData.DIFF_PO_TYPE,
                    changeReason: argData.CHANGE_REASON,
                    usePoType: argData.USE_PO_TYPE,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    currDate: argData.CURR_DATE,
                    usdAmt: argData.USD_AMT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    poMatlCd: argData.PO_MATL_CD,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPBEF UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPTEMPBEF),
            );
            return data.updateKSV_PO_MRPTEMPBEF;
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
                    mutation DeleteKSV_PO_MRPTEMPBEF(
                        $deleteKsvPoMrptempbefId: Int!
                    ) {
                        deleteKSV_PO_MRPTEMPBEF(id: $deleteKsvPoMrptempbefId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrptempbefId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPBEF DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPTEMPBEF),
            );
            return data.deleteKSV_PO_MRPTEMPBEF;
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
                    mutation MgrKsvPoMrptempbefDeletes(
                        $ids: [InputMgrKsvPoMrptempbefDeletes!]!
                    ) {
                        mgrKsvPoMrptempbefDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRPTEMPBEF DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
