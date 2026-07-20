/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MEM {
                        allQueryKSV_ORDER_MEM {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            barcode
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MEM:",
                JSON.stringify(data.allQueryKSV_ORDER_MEM.length),
            );
            return data.allQueryKSV_ORDER_MEM;
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
                    query MgrKsvOrderMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            barcode
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MEM:",
                JSON.stringify(data.mgrKsvOrderMemQuery.length),
            );
            return data.mgrKsvOrderMemQuery;
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
                    mutation CreateKSV_ORDER_MEM(
                        $orderCd: String
                        $prodCd: String
                        $addFlag: String
                        $price: Float
                        $totCnt: Int
                        $sizeCnt: String
                        $oldProdCd: String
                        $endPrice: Float
                        $barcode: String
                        $midSize: String
                        $midSizeQty: Int
                        $sizeLoss: String
                    ) {
                        createKSV_ORDER_MEM(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ADD_FLAG: $addFlag
                            PRICE: $price
                            TOT_CNT: $totCnt
                            SIZE_CNT: $sizeCnt
                            OLD_PROD_CD: $oldProdCd
                            end_price: $endPrice
                            barcode: $barcode
                            MID_SIZE: $midSize
                            MID_SIZE_QTY: $midSizeQty
                            SIZE_LOSS: $sizeLoss
                        ) {
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            barcode
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    addFlag: argData.ADD_FLAG,
                    price: argData.PRICE,
                    totCnt: argData.TOT_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    oldProdCd: argData.OLD_PROD_CD,
                    endPrice: argData.end_price,
                    barcode: argData.barcode,
                    midSize: argData.MID_SIZE,
                    midSizeQty: argData.MID_SIZE_QTY,
                    sizeLoss: argData.SIZE_LOSS,
                },
            });
            console.log(
                "KSV_ORDER_MEM INSERT:",
                JSON.stringify(data.createKSV_ORDER_MEM),
            );
            return data.createKSV_ORDER_MEM;
        } catch (e) {
            console.log("KSV_ORDER_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_MEM(
                        $updateKsvOrderMemId: Int!
                        $orderCd: String
                        $prodCd: String
                        $addFlag: String
                        $price: Float
                        $totCnt: Int
                        $sizeCnt: String
                        $oldProdCd: String
                        $endPrice: Float
                        $barcode: String
                        $midSize: String
                        $midSizeQty: Int
                        $sizeLoss: String
                    ) {
                        updateKSV_ORDER_MEM(
                            id: $updateKsvOrderMemId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ADD_FLAG: $addFlag
                            PRICE: $price
                            TOT_CNT: $totCnt
                            SIZE_CNT: $sizeCnt
                            OLD_PROD_CD: $oldProdCd
                            end_price: $endPrice
                            barcode: $barcode
                            MID_SIZE: $midSize
                            MID_SIZE_QTY: $midSizeQty
                            SIZE_LOSS: $sizeLoss
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            barcode
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMemId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    addFlag: argData.ADD_FLAG,
                    price: argData.PRICE,
                    totCnt: argData.TOT_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    oldProdCd: argData.OLD_PROD_CD,
                    endPrice: argData.end_price,
                    barcode: argData.barcode,
                    midSize: argData.MID_SIZE,
                    midSizeQty: argData.MID_SIZE_QTY,
                    sizeLoss: argData.SIZE_LOSS,
                },
            });
            console.log(
                "KSV_ORDER_MEM UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MEM),
            );
            return data.updateKSV_ORDER_MEM;
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
                    mutation DeleteKSV_ORDER_MEM($deleteKsvOrderMemId: Int!) {
                        deleteKSV_ORDER_MEM(id: $deleteKsvOrderMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMemId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MEM DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MEM),
            );
            return data.deleteKSV_ORDER_MEM;
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
                    mutation MgrKsvOrderMemDeletes(
                        $ids: [InputMgrKsvOrderMemDeletes!]!
                    ) {
                        mgrKsvOrderMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
