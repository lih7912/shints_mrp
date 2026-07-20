/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_FACOUT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_FACOUT {
                        allQueryKSV_STOCK_FACOUT {
                            id
                            PO_CD
                            OUT_DATE
                            ORDER_CD
                            MATL_CD
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            remark
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_FACOUT:",
                JSON.stringify(data.allQueryKSV_STOCK_FACOUT.length),
            );
            return data.allQueryKSV_STOCK_FACOUT;
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
                    query MgrKsvStockFacoutQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockFacoutQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            OUT_DATE
                            ORDER_CD
                            MATL_CD
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            remark
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_FACOUT:",
                JSON.stringify(data.mgrKsvStockFacoutQuery.length),
            );
            return data.mgrKsvStockFacoutQuery;
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
                    mutation CreateKSV_STOCK_FACOUT(
                        $poCd: String
                        $outDate: String
                        $orderCd: String
                        $matlCd: String
                        $outQty: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        createKSV_STOCK_FACOUT(
                            PO_CD: $poCd
                            OUT_DATE: $outDate
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            OUT_QTY: $outQty
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            remark: $remark
                        ) {
                            PO_CD
                            OUT_DATE
                            ORDER_CD
                            MATL_CD
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            remark
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    outDate: argData.OUT_DATE,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    outQty: argData.OUT_QTY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.remark,
                },
            });
            console.log(
                "KSV_STOCK_FACOUT INSERT:",
                JSON.stringify(data.createKSV_STOCK_FACOUT),
            );
            return data.createKSV_STOCK_FACOUT;
        } catch (e) {
            console.log("KSV_STOCK_FACOUT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_FACOUT(
                        $updateKsvStockFacoutId: Int!
                        $poCd: String
                        $outDate: String
                        $orderCd: String
                        $matlCd: String
                        $outQty: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        updateKSV_STOCK_FACOUT(
                            id: $updateKsvStockFacoutId
                            PO_CD: $poCd
                            OUT_DATE: $outDate
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            OUT_QTY: $outQty
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            remark: $remark
                        ) {
                            id
                            PO_CD
                            OUT_DATE
                            ORDER_CD
                            MATL_CD
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            remark
                        }
                    }
                `,
                variables: {
                    updateKsvStockFacoutId: argData.id,
                    poCd: argData.PO_CD,
                    outDate: argData.OUT_DATE,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    outQty: argData.OUT_QTY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.remark,
                },
            });
            console.log(
                "KSV_STOCK_FACOUT UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_FACOUT),
            );
            return data.updateKSV_STOCK_FACOUT;
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
                    mutation DeleteKSV_STOCK_FACOUT(
                        $deleteKsvStockFacoutId: Int!
                    ) {
                        deleteKSV_STOCK_FACOUT(id: $deleteKsvStockFacoutId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockFacoutId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_FACOUT DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_FACOUT),
            );
            return data.deleteKSV_STOCK_FACOUT;
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
                    mutation MgrKsvStockFacoutDeletes(
                        $ids: [InputMgrKsvStockFacoutDeletes!]!
                    ) {
                        mgrKsvStockFacoutDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_FACOUT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
