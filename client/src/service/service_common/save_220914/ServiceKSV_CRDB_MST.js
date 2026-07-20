/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CRDB_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CRDB_MST {
                        allQueryKSV_CRDB_MST {
                            id
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            CRDB_SEQ
                            END_DATE
                            MESSER_CD
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            CONF_USER
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            PO_CD
                            ORDER_CD
                            REMARK_S
                            CIP
                            BUYER_CD
                            PAYMENT_PLAN
                            DEBIT_TYPE
                            DOCU_NO
                            CHARGER
                            LINK_TO
                            END_TYPE
                            VAT
                            FROM_CD
                            DEBIT_BL_NO
                            TRANSPORTATION
                            FREIGHT_TERM
                            CBM
                            WEIGHT
                        }
                    }
                `,
            });
            console.log(
                "KSV_CRDB_MST:",
                JSON.stringify(data.allQueryKSV_CRDB_MST.length),
            );
            return data.allQueryKSV_CRDB_MST;
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
                    query MgrKsvCrdbMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCrdbMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            CRDB_SEQ
                            END_DATE
                            MESSER_CD
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            CONF_USER
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            PO_CD
                            ORDER_CD
                            REMARK_S
                            CIP
                            BUYER_CD
                            PAYMENT_PLAN
                            DEBIT_TYPE
                            DOCU_NO
                            CHARGER
                            LINK_TO
                            END_TYPE
                            VAT
                            FROM_CD
                            DEBIT_BL_NO
                            TRANSPORTATION
                            FREIGHT_TERM
                            CBM
                            WEIGHT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CRDB_MST:",
                JSON.stringify(data.mgrKsvCrdbMstQuery.length),
            );
            return data.mgrKsvCrdbMstQuery;
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
                    mutation CreateKSV_CRDB_MST(
                        $crdbCd: String
                        $crdbType: String
                        $crdbDate: String
                        $crdbSeq: Int
                        $endDate: String
                        $messerCd: String
                        $crdbAmt: Float
                        $currCd: String
                        $bankCd: String
                        $title: String
                        $remark: String
                        $yy: Int
                        $seq: Int
                        $statusCd: String
                        $confUser: String
                        $confFlag: String
                        $regUser: String
                        $regDatetime: String
                        $poCd: String
                        $orderCd: String
                        $remarkS: String
                        $cip: String
                        $buyerCd: String
                        $paymentPlan: String
                        $debitType: String
                        $docuNo: String
                        $charger: String
                        $linkTo: String
                        $endType: String
                        $vat: Float
                        $fromCd: String
                        $debitBlNo: String
                        $transportation: String
                        $freightTerm: String
                        $cbm: Float
                        $weight: Float
                    ) {
                        createKSV_CRDB_MST(
                            CRDB_CD: $crdbCd
                            CRDB_TYPE: $crdbType
                            CRDB_DATE: $crdbDate
                            CRDB_SEQ: $crdbSeq
                            END_DATE: $endDate
                            MESSER_CD: $messerCd
                            CRDB_AMT: $crdbAmt
                            CURR_CD: $currCd
                            BANK_CD: $bankCd
                            TITLE: $title
                            REMARK: $remark
                            YY: $yy
                            SEQ: $seq
                            STATUS_CD: $statusCd
                            CONF_USER: $confUser
                            CONF_FLAG: $confFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            REMARK_S: $remarkS
                            CIP: $cip
                            BUYER_CD: $buyerCd
                            PAYMENT_PLAN: $paymentPlan
                            DEBIT_TYPE: $debitType
                            DOCU_NO: $docuNo
                            CHARGER: $charger
                            LINK_TO: $linkTo
                            END_TYPE: $endType
                            VAT: $vat
                            FROM_CD: $fromCd
                            DEBIT_BL_NO: $debitBlNo
                            TRANSPORTATION: $transportation
                            FREIGHT_TERM: $freightTerm
                            CBM: $cbm
                            WEIGHT: $weight
                        ) {
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            CRDB_SEQ
                            END_DATE
                            MESSER_CD
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            CONF_USER
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            PO_CD
                            ORDER_CD
                            REMARK_S
                            CIP
                            BUYER_CD
                            PAYMENT_PLAN
                            DEBIT_TYPE
                            DOCU_NO
                            CHARGER
                            LINK_TO
                            END_TYPE
                            VAT
                            FROM_CD
                            DEBIT_BL_NO
                            TRANSPORTATION
                            FREIGHT_TERM
                            CBM
                            WEIGHT
                        }
                    }
                `,
                variables: {
                    crdbCd: argData.CRDB_CD,
                    crdbType: argData.CRDB_TYPE,
                    crdbDate: argData.CRDB_DATE,
                    crdbSeq: argData.CRDB_SEQ,
                    endDate: argData.END_DATE,
                    messerCd: argData.MESSER_CD,
                    crdbAmt: argData.CRDB_AMT,
                    currCd: argData.CURR_CD,
                    bankCd: argData.BANK_CD,
                    title: argData.TITLE,
                    remark: argData.REMARK,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    statusCd: argData.STATUS_CD,
                    confUser: argData.CONF_USER,
                    confFlag: argData.CONF_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    remarkS: argData.REMARK_S,
                    cip: argData.CIP,
                    buyerCd: argData.BUYER_CD,
                    paymentPlan: argData.PAYMENT_PLAN,
                    debitType: argData.DEBIT_TYPE,
                    docuNo: argData.DOCU_NO,
                    charger: argData.CHARGER,
                    linkTo: argData.LINK_TO,
                    endType: argData.END_TYPE,
                    vat: argData.VAT,
                    fromCd: argData.FROM_CD,
                    debitBlNo: argData.DEBIT_BL_NO,
                    transportation: argData.TRANSPORTATION,
                    freightTerm: argData.FREIGHT_TERM,
                    cbm: argData.CBM,
                    weight: argData.WEIGHT,
                },
            });
            console.log(
                "KSV_CRDB_MST INSERT:",
                JSON.stringify(data.createKSV_CRDB_MST),
            );
            return data.createKSV_CRDB_MST;
        } catch (e) {
            console.log("KSV_CRDB_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CRDB_MST(
                        $updateKsvCrdbMstId: Int!
                        $crdbCd: String
                        $crdbType: String
                        $crdbDate: String
                        $crdbSeq: Int
                        $endDate: String
                        $messerCd: String
                        $crdbAmt: Float
                        $currCd: String
                        $bankCd: String
                        $title: String
                        $remark: String
                        $yy: Int
                        $seq: Int
                        $statusCd: String
                        $confUser: String
                        $confFlag: String
                        $regUser: String
                        $regDatetime: String
                        $poCd: String
                        $orderCd: String
                        $remarkS: String
                        $cip: String
                        $buyerCd: String
                        $paymentPlan: String
                        $debitType: String
                        $docuNo: String
                        $charger: String
                        $linkTo: String
                        $endType: String
                        $vat: Float
                        $fromCd: String
                        $debitBlNo: String
                        $transportation: String
                        $freightTerm: String
                        $cbm: Float
                        $weight: Float
                    ) {
                        updateKSV_CRDB_MST(
                            id: $updateKsvCrdbMstId
                            CRDB_CD: $crdbCd
                            CRDB_TYPE: $crdbType
                            CRDB_DATE: $crdbDate
                            CRDB_SEQ: $crdbSeq
                            END_DATE: $endDate
                            MESSER_CD: $messerCd
                            CRDB_AMT: $crdbAmt
                            CURR_CD: $currCd
                            BANK_CD: $bankCd
                            TITLE: $title
                            REMARK: $remark
                            YY: $yy
                            SEQ: $seq
                            STATUS_CD: $statusCd
                            CONF_USER: $confUser
                            CONF_FLAG: $confFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            REMARK_S: $remarkS
                            CIP: $cip
                            BUYER_CD: $buyerCd
                            PAYMENT_PLAN: $paymentPlan
                            DEBIT_TYPE: $debitType
                            DOCU_NO: $docuNo
                            CHARGER: $charger
                            LINK_TO: $linkTo
                            END_TYPE: $endType
                            VAT: $vat
                            FROM_CD: $fromCd
                            DEBIT_BL_NO: $debitBlNo
                            TRANSPORTATION: $transportation
                            FREIGHT_TERM: $freightTerm
                            CBM: $cbm
                            WEIGHT: $weight
                        ) {
                            id
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            CRDB_SEQ
                            END_DATE
                            MESSER_CD
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            CONF_USER
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            PO_CD
                            ORDER_CD
                            REMARK_S
                            CIP
                            BUYER_CD
                            PAYMENT_PLAN
                            DEBIT_TYPE
                            DOCU_NO
                            CHARGER
                            LINK_TO
                            END_TYPE
                            VAT
                            FROM_CD
                            DEBIT_BL_NO
                            TRANSPORTATION
                            FREIGHT_TERM
                            CBM
                            WEIGHT
                        }
                    }
                `,
                variables: {
                    updateKsvCrdbMstId: argData.id,
                    crdbCd: argData.CRDB_CD,
                    crdbType: argData.CRDB_TYPE,
                    crdbDate: argData.CRDB_DATE,
                    crdbSeq: argData.CRDB_SEQ,
                    endDate: argData.END_DATE,
                    messerCd: argData.MESSER_CD,
                    crdbAmt: argData.CRDB_AMT,
                    currCd: argData.CURR_CD,
                    bankCd: argData.BANK_CD,
                    title: argData.TITLE,
                    remark: argData.REMARK,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    statusCd: argData.STATUS_CD,
                    confUser: argData.CONF_USER,
                    confFlag: argData.CONF_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    remarkS: argData.REMARK_S,
                    cip: argData.CIP,
                    buyerCd: argData.BUYER_CD,
                    paymentPlan: argData.PAYMENT_PLAN,
                    debitType: argData.DEBIT_TYPE,
                    docuNo: argData.DOCU_NO,
                    charger: argData.CHARGER,
                    linkTo: argData.LINK_TO,
                    endType: argData.END_TYPE,
                    vat: argData.VAT,
                    fromCd: argData.FROM_CD,
                    debitBlNo: argData.DEBIT_BL_NO,
                    transportation: argData.TRANSPORTATION,
                    freightTerm: argData.FREIGHT_TERM,
                    cbm: argData.CBM,
                    weight: argData.WEIGHT,
                },
            });
            console.log(
                "KSV_CRDB_MST UPDATE:",
                JSON.stringify(data.updateKSV_CRDB_MST),
            );
            return data.updateKSV_CRDB_MST;
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
                    mutation DeleteKSV_CRDB_MST($deleteKsvCrdbMstId: Int!) {
                        deleteKSV_CRDB_MST(id: $deleteKsvCrdbMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCrdbMstId: argData.id,
                },
            });
            console.log(
                "KSV_CRDB_MST DELETE:",
                JSON.stringify(data.deleteKSV_CRDB_MST),
            );
            return data.deleteKSV_CRDB_MST;
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
                    mutation MgrKsvCrdbMstDeletes(
                        $ids: [InputMgrKsvCrdbMstDeletes!]!
                    ) {
                        mgrKsvCrdbMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CRDB_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
