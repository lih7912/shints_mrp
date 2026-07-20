/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_FREIGHT {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_FREIGHT {
                        allQueryKZZ_FREIGHT {
                            id
                            FRT_IDX
                            FRT_DATE
                            TRADE_TYPE
                            DEPARTURE
                            DESTINATION
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            MATL_CD
                            QTY
                            WEIGHT
                            WEIGHT_NET
                            AMOUNT
                            CURR_CD
                            NET
                            VAT
                            ADP_CHECK
                            BL_NO
                            INVOICE_NO
                            SENDER
                            RECEIVER
                            SPEC
                            REMARK
                            REG_USER
                            REG_DATETIME
                            UNIT
                            PRICE
                            MW
                            GARMENT_COMPO
                            CONFIRM_CHECK
                            DELAY_REASON
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            CHARGE_KIND
                            CHARGE_CODE
                            buyer_cd
                            AIR_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KZZ_FREIGHT:",
                JSON.stringify(data.allQueryKZZ_FREIGHT.length),
            );
            return data.allQueryKZZ_FREIGHT;
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
                    query MgrKzzFreightQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzFreightQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            FRT_IDX
                            FRT_DATE
                            TRADE_TYPE
                            DEPARTURE
                            DESTINATION
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            MATL_CD
                            QTY
                            WEIGHT
                            WEIGHT_NET
                            AMOUNT
                            CURR_CD
                            NET
                            VAT
                            ADP_CHECK
                            BL_NO
                            INVOICE_NO
                            SENDER
                            RECEIVER
                            SPEC
                            REMARK
                            REG_USER
                            REG_DATETIME
                            UNIT
                            PRICE
                            MW
                            GARMENT_COMPO
                            CONFIRM_CHECK
                            DELAY_REASON
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            CHARGE_KIND
                            CHARGE_CODE
                            buyer_cd
                            AIR_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_FREIGHT:",
                JSON.stringify(data.mgrKzzFreightQuery.length),
            );
            return data.mgrKzzFreightQuery;
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
                    mutation CreateKZZ_FREIGHT(
                        $frtIdx: Int!
                        $frtDate: String
                        $tradeType: String
                        $departure: String
                        $destination: String
                        $frtType: String
                        $areaType: String
                        $matlType: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $matlCd: String
                        $qty: Float
                        $weight: Float
                        $weightNet: Float
                        $amount: Float
                        $currCd: String!
                        $net: Float
                        $vat: Float
                        $adpCheck: String
                        $blNo: String
                        $invoiceNo: String
                        $sender: String
                        $receiver: String
                        $spec: String
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                        $unit: String
                        $price: Float
                        $mw: String
                        $garmentCompo: String
                        $confirmCheck: String
                        $delayReason: String
                        $poSeq: Int
                        $mrpSeq: Int
                        $inDatetime: String
                        $chargeKind: String
                        $chargeCode: String
                        $buyerCd: String
                        $airFlag: String
                    ) {
                        createKZZ_FREIGHT(
                            FRT_IDX: $frtIdx
                            FRT_DATE: $frtDate
                            TRADE_TYPE: $tradeType
                            DEPARTURE: $departure
                            DESTINATION: $destination
                            FRT_TYPE: $frtType
                            AREA_TYPE: $areaType
                            MATL_TYPE: $matlType
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            MATL_CD: $matlCd
                            QTY: $qty
                            WEIGHT: $weight
                            WEIGHT_NET: $weightNet
                            AMOUNT: $amount
                            CURR_CD: $currCd
                            NET: $net
                            VAT: $vat
                            ADP_CHECK: $adpCheck
                            BL_NO: $blNo
                            INVOICE_NO: $invoiceNo
                            SENDER: $sender
                            RECEIVER: $receiver
                            SPEC: $spec
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UNIT: $unit
                            PRICE: $price
                            MW: $mw
                            GARMENT_COMPO: $garmentCompo
                            CONFIRM_CHECK: $confirmCheck
                            DELAY_REASON: $delayReason
                            PO_SEQ: $poSeq
                            MRP_SEQ: $mrpSeq
                            IN_DATETIME: $inDatetime
                            CHARGE_KIND: $chargeKind
                            CHARGE_CODE: $chargeCode
                            buyer_cd: $buyerCd
                            AIR_FLAG: $airFlag
                        ) {
                            FRT_IDX
                            FRT_DATE
                            TRADE_TYPE
                            DEPARTURE
                            DESTINATION
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            MATL_CD
                            QTY
                            WEIGHT
                            WEIGHT_NET
                            AMOUNT
                            CURR_CD
                            NET
                            VAT
                            ADP_CHECK
                            BL_NO
                            INVOICE_NO
                            SENDER
                            RECEIVER
                            SPEC
                            REMARK
                            REG_USER
                            REG_DATETIME
                            UNIT
                            PRICE
                            MW
                            GARMENT_COMPO
                            CONFIRM_CHECK
                            DELAY_REASON
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            CHARGE_KIND
                            CHARGE_CODE
                            buyer_cd
                            AIR_FLAG
                        }
                    }
                `,
                variables: {
                    frtIdx: argData.FRT_IDX,
                    frtDate: argData.FRT_DATE,
                    tradeType: argData.TRADE_TYPE,
                    departure: argData.DEPARTURE,
                    destination: argData.DESTINATION,
                    frtType: argData.FRT_TYPE,
                    areaType: argData.AREA_TYPE,
                    matlType: argData.MATL_TYPE,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    matlCd: argData.MATL_CD,
                    qty: argData.QTY,
                    weight: argData.WEIGHT,
                    weightNet: argData.WEIGHT_NET,
                    amount: argData.AMOUNT,
                    currCd: argData.CURR_CD,
                    net: argData.NET,
                    vat: argData.VAT,
                    adpCheck: argData.ADP_CHECK,
                    blNo: argData.BL_NO,
                    invoiceNo: argData.INVOICE_NO,
                    sender: argData.SENDER,
                    receiver: argData.RECEIVER,
                    spec: argData.SPEC,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    unit: argData.UNIT,
                    price: argData.PRICE,
                    mw: argData.MW,
                    garmentCompo: argData.GARMENT_COMPO,
                    confirmCheck: argData.CONFIRM_CHECK,
                    delayReason: argData.DELAY_REASON,
                    poSeq: argData.PO_SEQ,
                    mrpSeq: argData.MRP_SEQ,
                    inDatetime: argData.IN_DATETIME,
                    chargeKind: argData.CHARGE_KIND,
                    chargeCode: argData.CHARGE_CODE,
                    buyerCd: argData.buyer_cd,
                    airFlag: argData.AIR_FLAG,
                },
            });
            console.log(
                "KZZ_FREIGHT INSERT:",
                JSON.stringify(data.createKZZ_FREIGHT),
            );
            return data.createKZZ_FREIGHT;
        } catch (e) {
            console.log("KZZ_FREIGHT INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_FREIGHT(
                        $updateKzzFreightId: Int!
                        $frtIdx: Int!
                        $frtDate: String
                        $tradeType: String
                        $departure: String
                        $destination: String
                        $frtType: String
                        $areaType: String
                        $matlType: String
                        $poCd: String
                        $orderCd: String
                        $styleCd: String
                        $matlCd: String
                        $qty: Float
                        $weight: Float
                        $weightNet: Float
                        $amount: Float
                        $currCd: String!
                        $net: Float
                        $vat: Float
                        $adpCheck: String
                        $blNo: String
                        $invoiceNo: String
                        $sender: String
                        $receiver: String
                        $spec: String
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                        $unit: String
                        $price: Float
                        $mw: String
                        $garmentCompo: String
                        $confirmCheck: String
                        $delayReason: String
                        $poSeq: Int
                        $mrpSeq: Int
                        $inDatetime: String
                        $chargeKind: String
                        $chargeCode: String
                        $buyerCd: String
                        $airFlag: String
                    ) {
                        updateKZZ_FREIGHT(
                            id: $updateKzzFreightId
                            FRT_IDX: $frtIdx
                            FRT_DATE: $frtDate
                            TRADE_TYPE: $tradeType
                            DEPARTURE: $departure
                            DESTINATION: $destination
                            FRT_TYPE: $frtType
                            AREA_TYPE: $areaType
                            MATL_TYPE: $matlType
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            MATL_CD: $matlCd
                            QTY: $qty
                            WEIGHT: $weight
                            WEIGHT_NET: $weightNet
                            AMOUNT: $amount
                            CURR_CD: $currCd
                            NET: $net
                            VAT: $vat
                            ADP_CHECK: $adpCheck
                            BL_NO: $blNo
                            INVOICE_NO: $invoiceNo
                            SENDER: $sender
                            RECEIVER: $receiver
                            SPEC: $spec
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UNIT: $unit
                            PRICE: $price
                            MW: $mw
                            GARMENT_COMPO: $garmentCompo
                            CONFIRM_CHECK: $confirmCheck
                            DELAY_REASON: $delayReason
                            PO_SEQ: $poSeq
                            MRP_SEQ: $mrpSeq
                            IN_DATETIME: $inDatetime
                            CHARGE_KIND: $chargeKind
                            CHARGE_CODE: $chargeCode
                            buyer_cd: $buyerCd
                            AIR_FLAG: $airFlag
                        ) {
                            id
                            FRT_IDX
                            FRT_DATE
                            TRADE_TYPE
                            DEPARTURE
                            DESTINATION
                            FRT_TYPE
                            AREA_TYPE
                            MATL_TYPE
                            PO_CD
                            ORDER_CD
                            STYLE_CD
                            MATL_CD
                            QTY
                            WEIGHT
                            WEIGHT_NET
                            AMOUNT
                            CURR_CD
                            NET
                            VAT
                            ADP_CHECK
                            BL_NO
                            INVOICE_NO
                            SENDER
                            RECEIVER
                            SPEC
                            REMARK
                            REG_USER
                            REG_DATETIME
                            UNIT
                            PRICE
                            MW
                            GARMENT_COMPO
                            CONFIRM_CHECK
                            DELAY_REASON
                            PO_SEQ
                            MRP_SEQ
                            IN_DATETIME
                            CHARGE_KIND
                            CHARGE_CODE
                            buyer_cd
                            AIR_FLAG
                        }
                    }
                `,
                variables: {
                    updateKzzFreightId: argData.id,
                    frtIdx: argData.FRT_IDX,
                    frtDate: argData.FRT_DATE,
                    tradeType: argData.TRADE_TYPE,
                    departure: argData.DEPARTURE,
                    destination: argData.DESTINATION,
                    frtType: argData.FRT_TYPE,
                    areaType: argData.AREA_TYPE,
                    matlType: argData.MATL_TYPE,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    matlCd: argData.MATL_CD,
                    qty: argData.QTY,
                    weight: argData.WEIGHT,
                    weightNet: argData.WEIGHT_NET,
                    amount: argData.AMOUNT,
                    currCd: argData.CURR_CD,
                    net: argData.NET,
                    vat: argData.VAT,
                    adpCheck: argData.ADP_CHECK,
                    blNo: argData.BL_NO,
                    invoiceNo: argData.INVOICE_NO,
                    sender: argData.SENDER,
                    receiver: argData.RECEIVER,
                    spec: argData.SPEC,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    unit: argData.UNIT,
                    price: argData.PRICE,
                    mw: argData.MW,
                    garmentCompo: argData.GARMENT_COMPO,
                    confirmCheck: argData.CONFIRM_CHECK,
                    delayReason: argData.DELAY_REASON,
                    poSeq: argData.PO_SEQ,
                    mrpSeq: argData.MRP_SEQ,
                    inDatetime: argData.IN_DATETIME,
                    chargeKind: argData.CHARGE_KIND,
                    chargeCode: argData.CHARGE_CODE,
                    buyerCd: argData.buyer_cd,
                    airFlag: argData.AIR_FLAG,
                },
            });
            console.log(
                "KZZ_FREIGHT UPDATE:",
                JSON.stringify(data.updateKZZ_FREIGHT),
            );
            return data.updateKZZ_FREIGHT;
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
                    mutation DeleteKZZ_FREIGHT($deleteKzzFreightId: Int!) {
                        deleteKZZ_FREIGHT(id: $deleteKzzFreightId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzFreightId: argData.id,
                },
            });
            console.log(
                "KZZ_FREIGHT DELETE:",
                JSON.stringify(data.deleteKZZ_FREIGHT),
            );
            return data.deleteKZZ_FREIGHT;
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
                    mutation MgrKzzFreightDeletes(
                        $ids: [InputMgrKzzFreightDeletes!]!
                    ) {
                        mgrKzzFreightDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_FREIGHT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
