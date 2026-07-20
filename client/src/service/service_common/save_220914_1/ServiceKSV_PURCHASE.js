/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PURCHASE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PURCHASE {
                        allQueryKSV_PURCHASE {
                            id
                            PUR_CD
                            PUR_STATUS
                            PUR_PART
                            ITEM
                            SPEC
                            UNIT
                            QTY
                            S_VENDOR_NAME
                            S_COUNTRY
                            S_PRICE
                            INCOTERMS
                            CONFIRMATION
                            ORDER_DATE
                            S_INV_NO
                            PO_RECEIVED_DATE
                            SALES_CONT_NO
                            SALES_CONT_DATE
                            S_METHOD
                            PUR_KIND
                            PI_ETP_DATE
                            BANK_PERMIT
                            BANK_PERMIT_DATE
                            ADVANCE_DATE
                            BALANCE_DATE
                            S_DOC_DRAFT_DATE
                            S_DOC_CONFIRM_DATE
                            ON_BOARD_DATE
                            S_DOC_ETP_DATE
                            S_DOC_TRACK_NO
                            CONTAINER_NO
                            BL_NUMBER
                            ARRIVAL_DATE
                            REMARK
                            REG_USER
                            REG_DATETIME
                            DUE_DATE
                        }
                    }
                `,
            });
            console.log(
                "KSV_PURCHASE:",
                JSON.stringify(data.allQueryKSV_PURCHASE.length),
            );
            return data.allQueryKSV_PURCHASE;
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
                    query MgrKsvPurchaseQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPurchaseQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PUR_CD
                            PUR_STATUS
                            PUR_PART
                            ITEM
                            SPEC
                            UNIT
                            QTY
                            S_VENDOR_NAME
                            S_COUNTRY
                            S_PRICE
                            INCOTERMS
                            CONFIRMATION
                            ORDER_DATE
                            S_INV_NO
                            PO_RECEIVED_DATE
                            SALES_CONT_NO
                            SALES_CONT_DATE
                            S_METHOD
                            PUR_KIND
                            PI_ETP_DATE
                            BANK_PERMIT
                            BANK_PERMIT_DATE
                            ADVANCE_DATE
                            BALANCE_DATE
                            S_DOC_DRAFT_DATE
                            S_DOC_CONFIRM_DATE
                            ON_BOARD_DATE
                            S_DOC_ETP_DATE
                            S_DOC_TRACK_NO
                            CONTAINER_NO
                            BL_NUMBER
                            ARRIVAL_DATE
                            REMARK
                            REG_USER
                            REG_DATETIME
                            DUE_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PURCHASE:",
                JSON.stringify(data.mgrKsvPurchaseQuery.length),
            );
            return data.mgrKsvPurchaseQuery;
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
                    mutation CreateKSV_PURCHASE(
                        $purCd: String
                        $purStatus: String
                        $purPart: String
                        $item: String
                        $spec: String
                        $unit: String
                        $qty: Int
                        $sVendorName: String
                        $sCountry: String
                        $sPrice: Float
                        $incoterms: String
                        $confirmation: String
                        $orderDate: String
                        $sInvNo: String
                        $poReceivedDate: String
                        $salesContNo: String
                        $salesContDate: String
                        $sMethod: String
                        $purKind: String
                        $piEtpDate: String
                        $bankPermit: String
                        $bankPermitDate: String
                        $advanceDate: String
                        $balanceDate: String
                        $sDocDraftDate: String
                        $sDocConfirmDate: String
                        $onBoardDate: String
                        $sDocEtpDate: String
                        $sDocTrackNo: String
                        $containerNo: String
                        $blNumber: String
                        $arrivalDate: String
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                        $dueDate: String
                    ) {
                        createKSV_PURCHASE(
                            PUR_CD: $purCd
                            PUR_STATUS: $purStatus
                            PUR_PART: $purPart
                            ITEM: $item
                            SPEC: $spec
                            UNIT: $unit
                            QTY: $qty
                            S_VENDOR_NAME: $sVendorName
                            S_COUNTRY: $sCountry
                            S_PRICE: $sPrice
                            INCOTERMS: $incoterms
                            CONFIRMATION: $confirmation
                            ORDER_DATE: $orderDate
                            S_INV_NO: $sInvNo
                            PO_RECEIVED_DATE: $poReceivedDate
                            SALES_CONT_NO: $salesContNo
                            SALES_CONT_DATE: $salesContDate
                            S_METHOD: $sMethod
                            PUR_KIND: $purKind
                            PI_ETP_DATE: $piEtpDate
                            BANK_PERMIT: $bankPermit
                            BANK_PERMIT_DATE: $bankPermitDate
                            ADVANCE_DATE: $advanceDate
                            BALANCE_DATE: $balanceDate
                            S_DOC_DRAFT_DATE: $sDocDraftDate
                            S_DOC_CONFIRM_DATE: $sDocConfirmDate
                            ON_BOARD_DATE: $onBoardDate
                            S_DOC_ETP_DATE: $sDocEtpDate
                            S_DOC_TRACK_NO: $sDocTrackNo
                            CONTAINER_NO: $containerNo
                            BL_NUMBER: $blNumber
                            ARRIVAL_DATE: $arrivalDate
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            DUE_DATE: $dueDate
                        ) {
                            PUR_CD
                            PUR_STATUS
                            PUR_PART
                            ITEM
                            SPEC
                            UNIT
                            QTY
                            S_VENDOR_NAME
                            S_COUNTRY
                            S_PRICE
                            INCOTERMS
                            CONFIRMATION
                            ORDER_DATE
                            S_INV_NO
                            PO_RECEIVED_DATE
                            SALES_CONT_NO
                            SALES_CONT_DATE
                            S_METHOD
                            PUR_KIND
                            PI_ETP_DATE
                            BANK_PERMIT
                            BANK_PERMIT_DATE
                            ADVANCE_DATE
                            BALANCE_DATE
                            S_DOC_DRAFT_DATE
                            S_DOC_CONFIRM_DATE
                            ON_BOARD_DATE
                            S_DOC_ETP_DATE
                            S_DOC_TRACK_NO
                            CONTAINER_NO
                            BL_NUMBER
                            ARRIVAL_DATE
                            REMARK
                            REG_USER
                            REG_DATETIME
                            DUE_DATE
                        }
                    }
                `,
                variables: {
                    purCd: argData.PUR_CD,
                    purStatus: argData.PUR_STATUS,
                    purPart: argData.PUR_PART,
                    item: argData.ITEM,
                    spec: argData.SPEC,
                    unit: argData.UNIT,
                    qty: argData.QTY,
                    sVendorName: argData.S_VENDOR_NAME,
                    sCountry: argData.S_COUNTRY,
                    sPrice: argData.S_PRICE,
                    incoterms: argData.INCOTERMS,
                    confirmation: argData.CONFIRMATION,
                    orderDate: argData.ORDER_DATE,
                    sInvNo: argData.S_INV_NO,
                    poReceivedDate: argData.PO_RECEIVED_DATE,
                    salesContNo: argData.SALES_CONT_NO,
                    salesContDate: argData.SALES_CONT_DATE,
                    sMethod: argData.S_METHOD,
                    purKind: argData.PUR_KIND,
                    piEtpDate: argData.PI_ETP_DATE,
                    bankPermit: argData.BANK_PERMIT,
                    bankPermitDate: argData.BANK_PERMIT_DATE,
                    advanceDate: argData.ADVANCE_DATE,
                    balanceDate: argData.BALANCE_DATE,
                    sDocDraftDate: argData.S_DOC_DRAFT_DATE,
                    sDocConfirmDate: argData.S_DOC_CONFIRM_DATE,
                    onBoardDate: argData.ON_BOARD_DATE,
                    sDocEtpDate: argData.S_DOC_ETP_DATE,
                    sDocTrackNo: argData.S_DOC_TRACK_NO,
                    containerNo: argData.CONTAINER_NO,
                    blNumber: argData.BL_NUMBER,
                    arrivalDate: argData.ARRIVAL_DATE,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    dueDate: argData.DUE_DATE,
                },
            });
            console.log(
                "KSV_PURCHASE INSERT:",
                JSON.stringify(data.createKSV_PURCHASE),
            );
            return data.createKSV_PURCHASE;
        } catch (e) {
            console.log("KSV_PURCHASE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PURCHASE(
                        $updateKsvPurchaseId: Int!
                        $purCd: String
                        $purStatus: String
                        $purPart: String
                        $item: String
                        $spec: String
                        $unit: String
                        $qty: Int
                        $sVendorName: String
                        $sCountry: String
                        $sPrice: Float
                        $incoterms: String
                        $confirmation: String
                        $orderDate: String
                        $sInvNo: String
                        $poReceivedDate: String
                        $salesContNo: String
                        $salesContDate: String
                        $sMethod: String
                        $purKind: String
                        $piEtpDate: String
                        $bankPermit: String
                        $bankPermitDate: String
                        $advanceDate: String
                        $balanceDate: String
                        $sDocDraftDate: String
                        $sDocConfirmDate: String
                        $onBoardDate: String
                        $sDocEtpDate: String
                        $sDocTrackNo: String
                        $containerNo: String
                        $blNumber: String
                        $arrivalDate: String
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                        $dueDate: String
                    ) {
                        updateKSV_PURCHASE(
                            id: $updateKsvPurchaseId
                            PUR_CD: $purCd
                            PUR_STATUS: $purStatus
                            PUR_PART: $purPart
                            ITEM: $item
                            SPEC: $spec
                            UNIT: $unit
                            QTY: $qty
                            S_VENDOR_NAME: $sVendorName
                            S_COUNTRY: $sCountry
                            S_PRICE: $sPrice
                            INCOTERMS: $incoterms
                            CONFIRMATION: $confirmation
                            ORDER_DATE: $orderDate
                            S_INV_NO: $sInvNo
                            PO_RECEIVED_DATE: $poReceivedDate
                            SALES_CONT_NO: $salesContNo
                            SALES_CONT_DATE: $salesContDate
                            S_METHOD: $sMethod
                            PUR_KIND: $purKind
                            PI_ETP_DATE: $piEtpDate
                            BANK_PERMIT: $bankPermit
                            BANK_PERMIT_DATE: $bankPermitDate
                            ADVANCE_DATE: $advanceDate
                            BALANCE_DATE: $balanceDate
                            S_DOC_DRAFT_DATE: $sDocDraftDate
                            S_DOC_CONFIRM_DATE: $sDocConfirmDate
                            ON_BOARD_DATE: $onBoardDate
                            S_DOC_ETP_DATE: $sDocEtpDate
                            S_DOC_TRACK_NO: $sDocTrackNo
                            CONTAINER_NO: $containerNo
                            BL_NUMBER: $blNumber
                            ARRIVAL_DATE: $arrivalDate
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            DUE_DATE: $dueDate
                        ) {
                            id
                            PUR_CD
                            PUR_STATUS
                            PUR_PART
                            ITEM
                            SPEC
                            UNIT
                            QTY
                            S_VENDOR_NAME
                            S_COUNTRY
                            S_PRICE
                            INCOTERMS
                            CONFIRMATION
                            ORDER_DATE
                            S_INV_NO
                            PO_RECEIVED_DATE
                            SALES_CONT_NO
                            SALES_CONT_DATE
                            S_METHOD
                            PUR_KIND
                            PI_ETP_DATE
                            BANK_PERMIT
                            BANK_PERMIT_DATE
                            ADVANCE_DATE
                            BALANCE_DATE
                            S_DOC_DRAFT_DATE
                            S_DOC_CONFIRM_DATE
                            ON_BOARD_DATE
                            S_DOC_ETP_DATE
                            S_DOC_TRACK_NO
                            CONTAINER_NO
                            BL_NUMBER
                            ARRIVAL_DATE
                            REMARK
                            REG_USER
                            REG_DATETIME
                            DUE_DATE
                        }
                    }
                `,
                variables: {
                    updateKsvPurchaseId: argData.id,
                    purCd: argData.PUR_CD,
                    purStatus: argData.PUR_STATUS,
                    purPart: argData.PUR_PART,
                    item: argData.ITEM,
                    spec: argData.SPEC,
                    unit: argData.UNIT,
                    qty: argData.QTY,
                    sVendorName: argData.S_VENDOR_NAME,
                    sCountry: argData.S_COUNTRY,
                    sPrice: argData.S_PRICE,
                    incoterms: argData.INCOTERMS,
                    confirmation: argData.CONFIRMATION,
                    orderDate: argData.ORDER_DATE,
                    sInvNo: argData.S_INV_NO,
                    poReceivedDate: argData.PO_RECEIVED_DATE,
                    salesContNo: argData.SALES_CONT_NO,
                    salesContDate: argData.SALES_CONT_DATE,
                    sMethod: argData.S_METHOD,
                    purKind: argData.PUR_KIND,
                    piEtpDate: argData.PI_ETP_DATE,
                    bankPermit: argData.BANK_PERMIT,
                    bankPermitDate: argData.BANK_PERMIT_DATE,
                    advanceDate: argData.ADVANCE_DATE,
                    balanceDate: argData.BALANCE_DATE,
                    sDocDraftDate: argData.S_DOC_DRAFT_DATE,
                    sDocConfirmDate: argData.S_DOC_CONFIRM_DATE,
                    onBoardDate: argData.ON_BOARD_DATE,
                    sDocEtpDate: argData.S_DOC_ETP_DATE,
                    sDocTrackNo: argData.S_DOC_TRACK_NO,
                    containerNo: argData.CONTAINER_NO,
                    blNumber: argData.BL_NUMBER,
                    arrivalDate: argData.ARRIVAL_DATE,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    dueDate: argData.DUE_DATE,
                },
            });
            console.log(
                "KSV_PURCHASE UPDATE:",
                JSON.stringify(data.updateKSV_PURCHASE),
            );
            return data.updateKSV_PURCHASE;
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
                    mutation DeleteKSV_PURCHASE($deleteKsvPurchaseId: Int!) {
                        deleteKSV_PURCHASE(id: $deleteKsvPurchaseId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPurchaseId: argData.id,
                },
            });
            console.log(
                "KSV_PURCHASE DELETE:",
                JSON.stringify(data.deleteKSV_PURCHASE),
            );
            return data.deleteKSV_PURCHASE;
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
                    mutation MgrKsvPurchaseDeletes(
                        $ids: [InputMgrKsvPurchaseDeletes!]!
                    ) {
                        mgrKsvPurchaseDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PURCHASE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
