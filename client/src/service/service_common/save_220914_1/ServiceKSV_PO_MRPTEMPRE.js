/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MRPTEMPRE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MRPTEMPRE {
                        allQueryKSV_PO_MRPTEMPRE {
                            id
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            NEW_QTY
                            BEF_QTY
                            DIFF_QTY
                            STOCK_QTY
                            DIFF_PO_TYPE
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MRPTEMPRE:",
                JSON.stringify(data.allQueryKSV_PO_MRPTEMPRE.length),
            );
            return data.allQueryKSV_PO_MRPTEMPRE;
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
                    query MgrKsvPoMrptempreQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMrptempreQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            NEW_QTY
                            BEF_QTY
                            DIFF_QTY
                            STOCK_QTY
                            DIFF_PO_TYPE
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MRPTEMPRE:",
                JSON.stringify(data.mgrKsvPoMrptempreQuery.length),
            );
            return data.mgrKsvPoMrptempreQuery;
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
                    mutation CreateKSV_PO_MRPTEMPRE(
                        $userId: String
                        $seq: Int
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $newQty: Float
                        $befQty: Float
                        $diffQty: Float
                        $stockQty: Float
                        $diffPoType: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $totAmt: Float
                        $useSize: String
                    ) {
                        createKSV_PO_MRPTEMPRE(
                            USER_ID: $userId
                            SEQ: $seq
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            NEW_QTY: $newQty
                            BEF_QTY: $befQty
                            DIFF_QTY: $diffQty
                            STOCK_QTY: $stockQty
                            DIFF_PO_TYPE: $diffPoType
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            USE_SIZE: $useSize
                        ) {
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            NEW_QTY
                            BEF_QTY
                            DIFF_QTY
                            STOCK_QTY
                            DIFF_PO_TYPE
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    newQty: argData.NEW_QTY,
                    befQty: argData.BEF_QTY,
                    diffQty: argData.DIFF_QTY,
                    stockQty: argData.STOCK_QTY,
                    diffPoType: argData.DIFF_PO_TYPE,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    useSize: argData.USE_SIZE,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPRE INSERT:",
                JSON.stringify(data.createKSV_PO_MRPTEMPRE),
            );
            return data.createKSV_PO_MRPTEMPRE;
        } catch (e) {
            console.log("KSV_PO_MRPTEMPRE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MRPTEMPRE(
                        $updateKsvPoMrptempreId: Int!
                        $userId: String
                        $seq: Int
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $newQty: Float
                        $befQty: Float
                        $diffQty: Float
                        $stockQty: Float
                        $diffPoType: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $totAmt: Float
                        $useSize: String
                    ) {
                        updateKSV_PO_MRPTEMPRE(
                            id: $updateKsvPoMrptempreId
                            USER_ID: $userId
                            SEQ: $seq
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            NEW_QTY: $newQty
                            BEF_QTY: $befQty
                            DIFF_QTY: $diffQty
                            STOCK_QTY: $stockQty
                            DIFF_PO_TYPE: $diffPoType
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            TOT_AMT: $totAmt
                            USE_SIZE: $useSize
                        ) {
                            id
                            USER_ID
                            SEQ
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            NEW_QTY
                            BEF_QTY
                            DIFF_QTY
                            STOCK_QTY
                            DIFF_PO_TYPE
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            TOT_AMT
                            USE_SIZE
                        }
                    }
                `,
                variables: {
                    updateKsvPoMrptempreId: argData.id,
                    userId: argData.USER_ID,
                    seq: argData.SEQ,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    newQty: argData.NEW_QTY,
                    befQty: argData.BEF_QTY,
                    diffQty: argData.DIFF_QTY,
                    stockQty: argData.STOCK_QTY,
                    diffPoType: argData.DIFF_PO_TYPE,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    totAmt: argData.TOT_AMT,
                    useSize: argData.USE_SIZE,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPRE UPDATE:",
                JSON.stringify(data.updateKSV_PO_MRPTEMPRE),
            );
            return data.updateKSV_PO_MRPTEMPRE;
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
                    mutation DeleteKSV_PO_MRPTEMPRE(
                        $deleteKsvPoMrptempreId: Int!
                    ) {
                        deleteKSV_PO_MRPTEMPRE(id: $deleteKsvPoMrptempreId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMrptempreId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MRPTEMPRE DELETE:",
                JSON.stringify(data.deleteKSV_PO_MRPTEMPRE),
            );
            return data.deleteKSV_PO_MRPTEMPRE;
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
                    mutation MgrKsvPoMrptempreDeletes(
                        $ids: [InputMgrKsvPoMrptempreDeletes!]!
                    ) {
                        mgrKsvPoMrptempreDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MRPTEMPRE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
