/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_FACIN_ORDER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_FACIN_ORDER {
                        allQueryKSV_STOCK_FACIN_ORDER {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            TOT_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                            PAY_PRICE
                            PAY_CURR_CD
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER:",
                JSON.stringify(data.allQueryKSV_STOCK_FACIN_ORDER.length),
            );
            return data.allQueryKSV_STOCK_FACIN_ORDER;
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
                    query MgrKsvStockFacinOrderQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockFacinOrderQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            TOT_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                            PAY_PRICE
                            PAY_CURR_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER:",
                JSON.stringify(data.mgrKsvStockFacinOrderQuery.length),
            );
            return data.mgrKsvStockFacinOrderQuery;
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
                    mutation CreateKSV_STOCK_FACIN_ORDER(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inQty: Float
                        $totQty: Float
                        $inDate: String
                        $regUser: String
                        $regDatetime: String
                        $payPrice: Float
                        $payCurrCd: String
                    ) {
                        createKSV_STOCK_FACIN_ORDER(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_QTY: $inQty
                            TOT_QTY: $totQty
                            IN_DATE: $inDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PAY_PRICE: $payPrice
                            PAY_CURR_CD: $payCurrCd
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            TOT_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                            PAY_PRICE
                            PAY_CURR_CD
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    inQty: argData.IN_QTY,
                    totQty: argData.TOT_QTY,
                    inDate: argData.IN_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    payPrice: argData.PAY_PRICE,
                    payCurrCd: argData.PAY_CURR_CD,
                },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER INSERT:",
                JSON.stringify(data.createKSV_STOCK_FACIN_ORDER),
            );
            return data.createKSV_STOCK_FACIN_ORDER;
        } catch (e) {
            console.log(
                "KSV_STOCK_FACIN_ORDER INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_STOCK_FACIN_ORDER(
                        $updateKsvStockFacinOrderId: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inQty: Float
                        $totQty: Float
                        $inDate: String
                        $regUser: String
                        $regDatetime: String
                        $payPrice: Float
                        $payCurrCd: String
                    ) {
                        updateKSV_STOCK_FACIN_ORDER(
                            id: $updateKsvStockFacinOrderId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_QTY: $inQty
                            TOT_QTY: $totQty
                            IN_DATE: $inDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PAY_PRICE: $payPrice
                            PAY_CURR_CD: $payCurrCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            TOT_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                            PAY_PRICE
                            PAY_CURR_CD
                        }
                    }
                `,
                variables: {
                    updateKsvStockFacinOrderId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    inQty: argData.IN_QTY,
                    totQty: argData.TOT_QTY,
                    inDate: argData.IN_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    payPrice: argData.PAY_PRICE,
                    payCurrCd: argData.PAY_CURR_CD,
                },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_FACIN_ORDER),
            );
            return data.updateKSV_STOCK_FACIN_ORDER;
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
                    mutation DeleteKSV_STOCK_FACIN_ORDER(
                        $deleteKsvStockFacinOrderId: Int!
                    ) {
                        deleteKSV_STOCK_FACIN_ORDER(
                            id: $deleteKsvStockFacinOrderId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockFacinOrderId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_FACIN_ORDER),
            );
            return data.deleteKSV_STOCK_FACIN_ORDER;
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
                    mutation MgrKsvStockFacinOrderDeletes(
                        $ids: [InputMgrKsvStockFacinOrderDeletes!]!
                    ) {
                        mgrKsvStockFacinOrderDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_FACIN_ORDER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
