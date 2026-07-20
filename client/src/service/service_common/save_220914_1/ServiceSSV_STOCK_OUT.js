/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_STOCK_OUT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_STOCK_OUT {
                        allQuerySSV_STOCK_OUT {
                            id
                            OUT_NO
                            REQ_NO
                            AGENT_CD
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
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
                "SSV_STOCK_OUT:",
                JSON.stringify(data.allQuerySSV_STOCK_OUT.length),
            );
            return data.allQuerySSV_STOCK_OUT;
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
                    query MgrSsvStockOutQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvStockOutQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            OUT_NO
                            REQ_NO
                            AGENT_CD
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
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
                "SSV_STOCK_OUT:",
                JSON.stringify(data.mgrSsvStockOutQuery.length),
            );
            return data.mgrSsvStockOutQuery;
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
                    mutation CreateSSV_STOCK_OUT(
                        $outNo: String
                        $reqNo: String
                        $agentCd: String
                        $outDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $outQty: Int
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $etcAmt: Int
                        $outType: String
                        $outStatus: String
                        $stockType: String
                        $wareCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $saleFee: Int
                        $payDate: String
                        $saleFlag: Int
                    ) {
                        createSSV_STOCK_OUT(
                            OUT_NO: $outNo
                            REQ_NO: $reqNo
                            AGENT_CD: $agentCd
                            OUT_DATE: $outDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            OUT_QTY: $outQty
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            ETC_AMT: $etcAmt
                            OUT_TYPE: $outType
                            OUT_STATUS: $outStatus
                            STOCK_TYPE: $stockType
                            WARE_CD: $wareCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            sale_fee: $saleFee
                            pay_date: $payDate
                            sale_flag: $saleFlag
                        ) {
                            OUT_NO
                            REQ_NO
                            AGENT_CD
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
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
                    outNo: argData.OUT_NO,
                    reqNo: argData.REQ_NO,
                    agentCd: argData.AGENT_CD,
                    outDate: argData.OUT_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    outQty: argData.OUT_QTY,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    etcAmt: argData.ETC_AMT,
                    outType: argData.OUT_TYPE,
                    outStatus: argData.OUT_STATUS,
                    stockType: argData.STOCK_TYPE,
                    wareCd: argData.WARE_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    saleFee: argData.sale_fee,
                    payDate: argData.pay_date,
                    saleFlag: argData.sale_flag,
                },
            });
            console.log(
                "SSV_STOCK_OUT INSERT:",
                JSON.stringify(data.createSSV_STOCK_OUT),
            );
            return data.createSSV_STOCK_OUT;
        } catch (e) {
            console.log("SSV_STOCK_OUT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_STOCK_OUT(
                        $updateSsvStockOutId: Int!
                        $outNo: String
                        $reqNo: String
                        $agentCd: String
                        $outDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $outQty: Int
                        $endPrice: Int
                        $saleRate: Int
                        $salePrice: Int
                        $totAmt: Int
                        $etcAmt: Int
                        $outType: String
                        $outStatus: String
                        $stockType: String
                        $wareCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $saleFee: Int
                        $payDate: String
                        $saleFlag: Int
                    ) {
                        updateSSV_STOCK_OUT(
                            id: $updateSsvStockOutId
                            OUT_NO: $outNo
                            REQ_NO: $reqNo
                            AGENT_CD: $agentCd
                            OUT_DATE: $outDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            OUT_QTY: $outQty
                            END_PRICE: $endPrice
                            SALE_RATE: $saleRate
                            SALE_PRICE: $salePrice
                            TOT_AMT: $totAmt
                            ETC_AMT: $etcAmt
                            OUT_TYPE: $outType
                            OUT_STATUS: $outStatus
                            STOCK_TYPE: $stockType
                            WARE_CD: $wareCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            sale_fee: $saleFee
                            pay_date: $payDate
                            sale_flag: $saleFlag
                        ) {
                            id
                            OUT_NO
                            REQ_NO
                            AGENT_CD
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            END_PRICE
                            SALE_RATE
                            SALE_PRICE
                            TOT_AMT
                            ETC_AMT
                            OUT_TYPE
                            OUT_STATUS
                            STOCK_TYPE
                            WARE_CD
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
                    updateSsvStockOutId: argData.id,
                    outNo: argData.OUT_NO,
                    reqNo: argData.REQ_NO,
                    agentCd: argData.AGENT_CD,
                    outDate: argData.OUT_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    outQty: argData.OUT_QTY,
                    endPrice: argData.END_PRICE,
                    saleRate: argData.SALE_RATE,
                    salePrice: argData.SALE_PRICE,
                    totAmt: argData.TOT_AMT,
                    etcAmt: argData.ETC_AMT,
                    outType: argData.OUT_TYPE,
                    outStatus: argData.OUT_STATUS,
                    stockType: argData.STOCK_TYPE,
                    wareCd: argData.WARE_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    saleFee: argData.sale_fee,
                    payDate: argData.pay_date,
                    saleFlag: argData.sale_flag,
                },
            });
            console.log(
                "SSV_STOCK_OUT UPDATE:",
                JSON.stringify(data.updateSSV_STOCK_OUT),
            );
            return data.updateSSV_STOCK_OUT;
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
                    mutation DeleteSSV_STOCK_OUT($deleteSsvStockOutId: Int!) {
                        deleteSSV_STOCK_OUT(id: $deleteSsvStockOutId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvStockOutId: argData.id,
                },
            });
            console.log(
                "SSV_STOCK_OUT DELETE:",
                JSON.stringify(data.deleteSSV_STOCK_OUT),
            );
            return data.deleteSSV_STOCK_OUT;
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
                    mutation MgrSsvStockOutDeletes(
                        $ids: [InputMgrSsvStockOutDeletes!]!
                    ) {
                        mgrSsvStockOutDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_STOCK_OUT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
