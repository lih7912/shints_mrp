/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_OUT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_OUT {
                        allQueryKSV_STOCK_OUT {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            OUT_DATETIME
                            OUT_QTY
                            OUT_TYPE
                            OUT_STATUS
                            OUT_FACTORY_CD
                            PACK_CD
                            DELIVERY_TYPE
                            SHIP_DATE
                            ETA
                            CT_QTY
                            CT_NO
                            REMARK
                            DEBIT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            out_from
                            facin_user
                            facin_datetime
                            HIS_NO
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_OUT:",
                JSON.stringify(data.allQueryKSV_STOCK_OUT.length),
            );
            return data.allQueryKSV_STOCK_OUT;
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
                    query MgrKsvStockOutQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockOutQuery(
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
                            IN_DATETIME
                            OUT_DATETIME
                            OUT_QTY
                            OUT_TYPE
                            OUT_STATUS
                            OUT_FACTORY_CD
                            PACK_CD
                            DELIVERY_TYPE
                            SHIP_DATE
                            ETA
                            CT_QTY
                            CT_NO
                            REMARK
                            DEBIT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            out_from
                            facin_user
                            facin_datetime
                            HIS_NO
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_OUT:",
                JSON.stringify(data.mgrKsvStockOutQuery.length),
            );
            return data.mgrKsvStockOutQuery;
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
                    mutation CreateKSV_STOCK_OUT(
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inDatetime: String
                        $outDatetime: String
                        $outQty: Float
                        $outType: String
                        $outStatus: String
                        $outFactoryCd: String
                        $packCd: String
                        $deliveryType: String
                        $shipDate: String
                        $eta: String
                        $ctQty: Int
                        $ctNo: String
                        $remark: String
                        $debitCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $stockIdx: String
                        $outFrom: String
                        $facinUser: String
                        $facinDatetime: String
                        $hisNo: String
                    ) {
                        createKSV_STOCK_OUT(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_DATETIME: $inDatetime
                            OUT_DATETIME: $outDatetime
                            OUT_QTY: $outQty
                            OUT_TYPE: $outType
                            OUT_STATUS: $outStatus
                            OUT_FACTORY_CD: $outFactoryCd
                            PACK_CD: $packCd
                            DELIVERY_TYPE: $deliveryType
                            SHIP_DATE: $shipDate
                            ETA: $eta
                            CT_QTY: $ctQty
                            CT_NO: $ctNo
                            REMARK: $remark
                            DEBIT_CD: $debitCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            stock_idx: $stockIdx
                            out_from: $outFrom
                            facin_user: $facinUser
                            facin_datetime: $facinDatetime
                            HIS_NO: $hisNo
                        ) {
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            OUT_DATETIME
                            OUT_QTY
                            OUT_TYPE
                            OUT_STATUS
                            OUT_FACTORY_CD
                            PACK_CD
                            DELIVERY_TYPE
                            SHIP_DATE
                            ETA
                            CT_QTY
                            CT_NO
                            REMARK
                            DEBIT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            out_from
                            facin_user
                            facin_datetime
                            HIS_NO
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
                    inDatetime: argData.IN_DATETIME,
                    outDatetime: argData.OUT_DATETIME,
                    outQty: argData.OUT_QTY,
                    outType: argData.OUT_TYPE,
                    outStatus: argData.OUT_STATUS,
                    outFactoryCd: argData.OUT_FACTORY_CD,
                    packCd: argData.PACK_CD,
                    deliveryType: argData.DELIVERY_TYPE,
                    shipDate: argData.SHIP_DATE,
                    eta: argData.ETA,
                    ctQty: argData.CT_QTY,
                    ctNo: argData.CT_NO,
                    remark: argData.REMARK,
                    debitCd: argData.DEBIT_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stockIdx: argData.stock_idx,
                    outFrom: argData.out_from,
                    facinUser: argData.facin_user,
                    facinDatetime: argData.facin_datetime,
                    hisNo: argData.HIS_NO,
                },
            });
            console.log(
                "KSV_STOCK_OUT INSERT:",
                JSON.stringify(data.createKSV_STOCK_OUT),
            );
            return data.createKSV_STOCK_OUT;
        } catch (e) {
            console.log("KSV_STOCK_OUT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_OUT(
                        $updateKsvStockOutId: Int!
                        $poCd: String
                        $poSeq: Int
                        $orderCd: String
                        $matlCd: String
                        $mrpSeq: Int
                        $matlSeq: Int
                        $inDatetime: String
                        $outDatetime: String
                        $outQty: Float
                        $outType: String
                        $outStatus: String
                        $outFactoryCd: String
                        $packCd: String
                        $deliveryType: String
                        $shipDate: String
                        $eta: String
                        $ctQty: Int
                        $ctNo: String
                        $remark: String
                        $debitCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $stockIdx: String
                        $outFrom: String
                        $facinUser: String
                        $facinDatetime: String
                        $hisNo: String
                    ) {
                        updateKSV_STOCK_OUT(
                            id: $updateKsvStockOutId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            ORDER_CD: $orderCd
                            MATL_CD: $matlCd
                            MRP_SEQ: $mrpSeq
                            MATL_SEQ: $matlSeq
                            IN_DATETIME: $inDatetime
                            OUT_DATETIME: $outDatetime
                            OUT_QTY: $outQty
                            OUT_TYPE: $outType
                            OUT_STATUS: $outStatus
                            OUT_FACTORY_CD: $outFactoryCd
                            PACK_CD: $packCd
                            DELIVERY_TYPE: $deliveryType
                            SHIP_DATE: $shipDate
                            ETA: $eta
                            CT_QTY: $ctQty
                            CT_NO: $ctNo
                            REMARK: $remark
                            DEBIT_CD: $debitCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            stock_idx: $stockIdx
                            out_from: $outFrom
                            facin_user: $facinUser
                            facin_datetime: $facinDatetime
                            HIS_NO: $hisNo
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            ORDER_CD
                            MATL_CD
                            MRP_SEQ
                            MATL_SEQ
                            IN_DATETIME
                            OUT_DATETIME
                            OUT_QTY
                            OUT_TYPE
                            OUT_STATUS
                            OUT_FACTORY_CD
                            PACK_CD
                            DELIVERY_TYPE
                            SHIP_DATE
                            ETA
                            CT_QTY
                            CT_NO
                            REMARK
                            DEBIT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            stock_idx
                            out_from
                            facin_user
                            facin_datetime
                            HIS_NO
                        }
                    }
                `,
                variables: {
                    updateKsvStockOutId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    orderCd: argData.ORDER_CD,
                    matlCd: argData.MATL_CD,
                    mrpSeq: argData.MRP_SEQ,
                    matlSeq: argData.MATL_SEQ,
                    inDatetime: argData.IN_DATETIME,
                    outDatetime: argData.OUT_DATETIME,
                    outQty: argData.OUT_QTY,
                    outType: argData.OUT_TYPE,
                    outStatus: argData.OUT_STATUS,
                    outFactoryCd: argData.OUT_FACTORY_CD,
                    packCd: argData.PACK_CD,
                    deliveryType: argData.DELIVERY_TYPE,
                    shipDate: argData.SHIP_DATE,
                    eta: argData.ETA,
                    ctQty: argData.CT_QTY,
                    ctNo: argData.CT_NO,
                    remark: argData.REMARK,
                    debitCd: argData.DEBIT_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stockIdx: argData.stock_idx,
                    outFrom: argData.out_from,
                    facinUser: argData.facin_user,
                    facinDatetime: argData.facin_datetime,
                    hisNo: argData.HIS_NO,
                },
            });
            console.log(
                "KSV_STOCK_OUT UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_OUT),
            );
            return data.updateKSV_STOCK_OUT;
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
                    mutation DeleteKSV_STOCK_OUT($deleteKsvStockOutId: Int!) {
                        deleteKSV_STOCK_OUT(id: $deleteKsvStockOutId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockOutId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_OUT DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_OUT),
            );
            return data.deleteKSV_STOCK_OUT;
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
                    mutation MgrKsvStockOutDeletes(
                        $ids: [InputMgrKsvStockOutDeletes!]!
                    ) {
                        mgrKsvStockOutDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_OUT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
