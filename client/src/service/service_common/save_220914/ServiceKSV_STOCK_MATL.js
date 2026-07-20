/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_MATL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_MATL {
                        allQueryKSV_STOCK_MATL {
                            id
                            STOCK_IDX
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            OUT_QTY
                            FACTORY_CD
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            ORG_STOCK_IDX
                            GROUP_CD
                            REASON_REMARK
                            PLAN_REMARK
                            move_flag
                            temp
                            DEBIT_CD
                            root_idx
                            EXP_DATE
                            REMARK0
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_MATL:",
                JSON.stringify(data.allQueryKSV_STOCK_MATL.length),
            );
            return data.allQueryKSV_STOCK_MATL;
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
                    query MgrKsvStockMatlQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockMatlQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STOCK_IDX
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            OUT_QTY
                            FACTORY_CD
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            ORG_STOCK_IDX
                            GROUP_CD
                            REASON_REMARK
                            PLAN_REMARK
                            move_flag
                            temp
                            DEBIT_CD
                            root_idx
                            EXP_DATE
                            REMARK0
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_MATL:",
                JSON.stringify(data.mgrKsvStockMatlQuery.length),
            );
            return data.mgrKsvStockMatlQuery;
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
                    mutation CreateKSV_STOCK_MATL(
                        $stockIdx: String
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $stockQty: Float
                        $remainQty: Float
                        $useQty: Float
                        $outQty: Float
                        $factoryCd: String
                        $stockStatus: String
                        $stockDate: String
                        $wareCd: String
                        $wareDate: String
                        $wareQty: Float
                        $rack: String
                        $location: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                        $orgStockIdx: String
                        $groupCd: String
                        $reasonRemark: String
                        $planRemark: String
                        $moveFlag: String
                        $temp: String
                        $debitCd: String
                        $rootIdx: String
                        $expDate: String
                        $remark0: String
                    ) {
                        createKSV_STOCK_MATL(
                            STOCK_IDX: $stockIdx
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            STOCK_QTY: $stockQty
                            REMAIN_QTY: $remainQty
                            USE_QTY: $useQty
                            OUT_QTY: $outQty
                            FACTORY_CD: $factoryCd
                            STOCK_STATUS: $stockStatus
                            STOCK_DATE: $stockDate
                            WARE_CD: $wareCd
                            WARE_DATE: $wareDate
                            WARE_QTY: $wareQty
                            RACK: $rack
                            LOCATION: $location
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                            ORG_STOCK_IDX: $orgStockIdx
                            GROUP_CD: $groupCd
                            REASON_REMARK: $reasonRemark
                            PLAN_REMARK: $planRemark
                            move_flag: $moveFlag
                            temp: $temp
                            DEBIT_CD: $debitCd
                            root_idx: $rootIdx
                            EXP_DATE: $expDate
                            REMARK0: $remark0
                        ) {
                            STOCK_IDX
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            OUT_QTY
                            FACTORY_CD
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            ORG_STOCK_IDX
                            GROUP_CD
                            REASON_REMARK
                            PLAN_REMARK
                            move_flag
                            temp
                            DEBIT_CD
                            root_idx
                            EXP_DATE
                            REMARK0
                        }
                    }
                `,
                variables: {
                    stockIdx: argData.STOCK_IDX,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    stockQty: argData.STOCK_QTY,
                    remainQty: argData.REMAIN_QTY,
                    useQty: argData.USE_QTY,
                    outQty: argData.OUT_QTY,
                    factoryCd: argData.FACTORY_CD,
                    stockStatus: argData.STOCK_STATUS,
                    stockDate: argData.STOCK_DATE,
                    wareCd: argData.WARE_CD,
                    wareDate: argData.WARE_DATE,
                    wareQty: argData.WARE_QTY,
                    rack: argData.RACK,
                    location: argData.LOCATION,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                    orgStockIdx: argData.ORG_STOCK_IDX,
                    groupCd: argData.GROUP_CD,
                    reasonRemark: argData.REASON_REMARK,
                    planRemark: argData.PLAN_REMARK,
                    moveFlag: argData.move_flag,
                    temp: argData.temp,
                    debitCd: argData.DEBIT_CD,
                    rootIdx: argData.root_idx,
                    expDate: argData.EXP_DATE,
                    remark0: argData.REMARK0,
                },
            });
            console.log(
                "KSV_STOCK_MATL INSERT:",
                JSON.stringify(data.createKSV_STOCK_MATL),
            );
            return data.createKSV_STOCK_MATL;
        } catch (e) {
            console.log("KSV_STOCK_MATL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_MATL(
                        $updateKsvStockMatlId: Int!
                        $stockIdx: String
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $stockQty: Float
                        $remainQty: Float
                        $useQty: Float
                        $outQty: Float
                        $factoryCd: String
                        $stockStatus: String
                        $stockDate: String
                        $wareCd: String
                        $wareDate: String
                        $wareQty: Float
                        $rack: String
                        $location: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                        $orgStockIdx: String
                        $groupCd: String
                        $reasonRemark: String
                        $planRemark: String
                        $moveFlag: String
                        $temp: String
                        $debitCd: String
                        $rootIdx: String
                        $expDate: String
                        $remark0: String
                    ) {
                        updateKSV_STOCK_MATL(
                            id: $updateKsvStockMatlId
                            STOCK_IDX: $stockIdx
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            STOCK_QTY: $stockQty
                            REMAIN_QTY: $remainQty
                            USE_QTY: $useQty
                            OUT_QTY: $outQty
                            FACTORY_CD: $factoryCd
                            STOCK_STATUS: $stockStatus
                            STOCK_DATE: $stockDate
                            WARE_CD: $wareCd
                            WARE_DATE: $wareDate
                            WARE_QTY: $wareQty
                            RACK: $rack
                            LOCATION: $location
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                            ORG_STOCK_IDX: $orgStockIdx
                            GROUP_CD: $groupCd
                            REASON_REMARK: $reasonRemark
                            PLAN_REMARK: $planRemark
                            move_flag: $moveFlag
                            temp: $temp
                            DEBIT_CD: $debitCd
                            root_idx: $rootIdx
                            EXP_DATE: $expDate
                            REMARK0: $remark0
                        ) {
                            id
                            STOCK_IDX
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            STOCK_QTY
                            REMAIN_QTY
                            USE_QTY
                            OUT_QTY
                            FACTORY_CD
                            STOCK_STATUS
                            STOCK_DATE
                            WARE_CD
                            WARE_DATE
                            WARE_QTY
                            RACK
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            ORG_STOCK_IDX
                            GROUP_CD
                            REASON_REMARK
                            PLAN_REMARK
                            move_flag
                            temp
                            DEBIT_CD
                            root_idx
                            EXP_DATE
                            REMARK0
                        }
                    }
                `,
                variables: {
                    updateKsvStockMatlId: argData.id,
                    stockIdx: argData.STOCK_IDX,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    stockQty: argData.STOCK_QTY,
                    remainQty: argData.REMAIN_QTY,
                    useQty: argData.USE_QTY,
                    outQty: argData.OUT_QTY,
                    factoryCd: argData.FACTORY_CD,
                    stockStatus: argData.STOCK_STATUS,
                    stockDate: argData.STOCK_DATE,
                    wareCd: argData.WARE_CD,
                    wareDate: argData.WARE_DATE,
                    wareQty: argData.WARE_QTY,
                    rack: argData.RACK,
                    location: argData.LOCATION,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                    orgStockIdx: argData.ORG_STOCK_IDX,
                    groupCd: argData.GROUP_CD,
                    reasonRemark: argData.REASON_REMARK,
                    planRemark: argData.PLAN_REMARK,
                    moveFlag: argData.move_flag,
                    temp: argData.temp,
                    debitCd: argData.DEBIT_CD,
                    rootIdx: argData.root_idx,
                    expDate: argData.EXP_DATE,
                    remark0: argData.REMARK0,
                },
            });
            console.log(
                "KSV_STOCK_MATL UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_MATL),
            );
            return data.updateKSV_STOCK_MATL;
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
                    mutation DeleteKSV_STOCK_MATL($deleteKsvStockMatlId: Int!) {
                        deleteKSV_STOCK_MATL(id: $deleteKsvStockMatlId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockMatlId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_MATL DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_MATL),
            );
            return data.deleteKSV_STOCK_MATL;
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
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.ids = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvStockMatlDeletes(
                        $ids: [InputMgrKsvStockMatlDeletes!]!
                    ) {
                        mgrKsvStockMatlDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_MATL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
