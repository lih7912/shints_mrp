/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_STOCK_FACIN_ORDER2 {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_FACIN_ORDER2 {
                        allQueryKSV_STOCK_FACIN_ORDER2 {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER2:",
                JSON.stringify(data.allQueryKSV_STOCK_FACIN_ORDER2.length),
            );
            return data.allQueryKSV_STOCK_FACIN_ORDER2;
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
                    query MgrKsvStockFacinOrder2Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockFacinOrder2Query(
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
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER2:",
                JSON.stringify(data.mgrKsvStockFacinOrder2Query.length),
            );
            return data.mgrKsvStockFacinOrder2Query;
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
                    mutation CreateKSV_STOCK_FACIN_ORDER2(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inQty: Float
                        $inDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_STOCK_FACIN_ORDER2(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_QTY: $inQty
                            IN_DATE: $inDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
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
                    inDate: argData.IN_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER2 INSERT:",
                JSON.stringify(data.createKSV_STOCK_FACIN_ORDER2),
            );
            return data.createKSV_STOCK_FACIN_ORDER2;
        } catch (e) {
            console.log(
                "KSV_STOCK_FACIN_ORDER2 INSERT ERROR:",
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
                    mutation UpdateKSV_STOCK_FACIN_ORDER2(
                        $updateKsvStockFacinOrder2Id: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inQty: Float
                        $inDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_STOCK_FACIN_ORDER2(
                            id: $updateKsvStockFacinOrder2Id
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_QTY: $inQty
                            IN_DATE: $inDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_QTY
                            IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvStockFacinOrder2Id: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    inQty: argData.IN_QTY,
                    inDate: argData.IN_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER2 UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_FACIN_ORDER2),
            );
            return data.updateKSV_STOCK_FACIN_ORDER2;
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
                    mutation DeleteKSV_STOCK_FACIN_ORDER2(
                        $deleteKsvStockFacinOrder2Id: Int!
                    ) {
                        deleteKSV_STOCK_FACIN_ORDER2(
                            id: $deleteKsvStockFacinOrder2Id
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockFacinOrder2Id: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER2 DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_FACIN_ORDER2),
            );
            return data.deleteKSV_STOCK_FACIN_ORDER2;
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
                    mutation MgrKsvStockFacinOrder2Deletes(
                        $ids: [InputMgrKsvStockFacinOrder2Deletes!]!
                    ) {
                        mgrKsvStockFacinOrder2Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_STOCK_FACIN_ORDER2 DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
