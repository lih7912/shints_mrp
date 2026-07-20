/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceSSV_STOCK_RET {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_STOCK_RET {
                        allQuerySSV_STOCK_RET {
                            id
                            RET_IDX
                            RET_REQ_NO
                            ORDER_CD
                            PROD_CD
                            SIZE
                            RET_QTY
                            RET_DATETIME
                            STOCK_TYPE
                            IN_TYPE
                            AGENT_CD
                            WARE_CD
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            sale_fee
                            pay_date
                            sale_flag
                        }
                    }
                `,
            });
            console.log(
                "SSV_STOCK_RET:",
                JSON.stringify(data.allQuerySSV_STOCK_RET.length),
            );
            return data.allQuerySSV_STOCK_RET;
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
                    query MgrSsvStockRetQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvStockRetQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            RET_IDX
                            RET_REQ_NO
                            ORDER_CD
                            PROD_CD
                            SIZE
                            RET_QTY
                            RET_DATETIME
                            STOCK_TYPE
                            IN_TYPE
                            AGENT_CD
                            WARE_CD
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            sale_fee
                            pay_date
                            sale_flag
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_STOCK_RET:",
                JSON.stringify(data.mgrSsvStockRetQuery.length),
            );
            return data.mgrSsvStockRetQuery;
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
                    mutation CreateSSV_STOCK_RET(
                        $retIdx: Int!
                        $retReqNo: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $retQty: Int
                        $retDatetime: String
                        $stockType: String
                        $inType: String
                        $agentCd: String
                        $wareCd: String
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $saleFee: Int
                        $payDate: String
                        $saleFlag: String
                    ) {
                        createSSV_STOCK_RET(
                            RET_IDX: $retIdx
                            RET_REQ_NO: $retReqNo
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            RET_QTY: $retQty
                            RET_DATETIME: $retDatetime
                            STOCK_TYPE: $stockType
                            IN_TYPE: $inType
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            sale_fee: $saleFee
                            pay_date: $payDate
                            sale_flag: $saleFlag
                        ) {
                            RET_IDX
                            RET_REQ_NO
                            ORDER_CD
                            PROD_CD
                            SIZE
                            RET_QTY
                            RET_DATETIME
                            STOCK_TYPE
                            IN_TYPE
                            AGENT_CD
                            WARE_CD
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            sale_fee
                            pay_date
                            sale_flag
                        }
                    }
                `,
                variables: {
                    retIdx: argData.RET_IDX,
                    retReqNo: argData.RET_REQ_NO,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    retQty: argData.RET_QTY,
                    retDatetime: argData.RET_DATETIME,
                    stockType: argData.STOCK_TYPE,
                    inType: argData.IN_TYPE,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    saleFee: argData.sale_fee,
                    payDate: argData.pay_date,
                    saleFlag: argData.sale_flag,
                },
            });
            console.log(
                "SSV_STOCK_RET INSERT:",
                JSON.stringify(data.createSSV_STOCK_RET),
            );
            return data.createSSV_STOCK_RET;
        } catch (e) {
            console.log("SSV_STOCK_RET INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateSSV_STOCK_RET(
                        $updateSsvStockRetId: Int!
                        $retIdx: Int!
                        $retReqNo: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $retQty: Int
                        $retDatetime: String
                        $stockType: String
                        $inType: String
                        $agentCd: String
                        $wareCd: String
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $saleFee: Int
                        $payDate: String
                        $saleFlag: String
                    ) {
                        updateSSV_STOCK_RET(
                            id: $updateSsvStockRetId
                            RET_IDX: $retIdx
                            RET_REQ_NO: $retReqNo
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            RET_QTY: $retQty
                            RET_DATETIME: $retDatetime
                            STOCK_TYPE: $stockType
                            IN_TYPE: $inType
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            sale_fee: $saleFee
                            pay_date: $payDate
                            sale_flag: $saleFlag
                        ) {
                            id
                            RET_IDX
                            RET_REQ_NO
                            ORDER_CD
                            PROD_CD
                            SIZE
                            RET_QTY
                            RET_DATETIME
                            STOCK_TYPE
                            IN_TYPE
                            AGENT_CD
                            WARE_CD
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            sale_fee
                            pay_date
                            sale_flag
                        }
                    }
                `,
                variables: {
                    updateSsvStockRetId: argData.id,
                    retIdx: argData.RET_IDX,
                    retReqNo: argData.RET_REQ_NO,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    retQty: argData.RET_QTY,
                    retDatetime: argData.RET_DATETIME,
                    stockType: argData.STOCK_TYPE,
                    inType: argData.IN_TYPE,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    saleFee: argData.sale_fee,
                    payDate: argData.pay_date,
                    saleFlag: argData.sale_flag,
                },
            });
            console.log(
                "SSV_STOCK_RET UPDATE:",
                JSON.stringify(data.updateSSV_STOCK_RET),
            );
            return data.updateSSV_STOCK_RET;
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
                    mutation DeleteSSV_STOCK_RET($deleteSsvStockRetId: Int!) {
                        deleteSSV_STOCK_RET(id: $deleteSsvStockRetId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvStockRetId: argData.id,
                },
            });
            console.log(
                "SSV_STOCK_RET DELETE:",
                JSON.stringify(data.deleteSSV_STOCK_RET),
            );
            return data.deleteSSV_STOCK_RET;
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
                    mutation MgrSsvStockRetDeletes(
                        $ids: [InputMgrSsvStockRetDeletes!]!
                    ) {
                        mgrSsvStockRetDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_STOCK_RET DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
