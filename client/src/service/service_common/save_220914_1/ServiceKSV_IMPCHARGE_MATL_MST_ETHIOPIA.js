/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_IMPCHARGE_MATL_MST_ETHIOPIA {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_IMPCHARGE_MATL_MST_ETHIOPIA {
                        allQueryKSV_IMPCHARGE_MATL_MST_ETHIOPIA {
                            id
                            IMPORT_NO
                            BUYER_CD
                            INVOICE_NO
                            SUPPLIER_NAME
                            DELIVERY_TYPE
                            BL_NO
                            ETD
                            ETA
                            FACTORY_ETA
                            PO_NO
                            SHIPPING_GOODS
                            DECLEARANCE_DATE
                            CAPITALIZATION
                            SENDING_DATE
                            SALES_CONTACT_NO
                            REF
                            REMARK
                            ORD_AMT
                            CURR_CD
                            FREIGHT_TYPE
                            FREIGHT_COST
                            DUTY
                            VAT
                            TRANSPORTATION_FEE
                            RETURN_COST
                            CLEARANCE_FEE
                            INSPECTION_FEE
                            PORT_HANDLING_CHARGE
                            SCANING_FEE
                            DISBURSMENT_FEE
                            CONTAINER_BOND_FEE
                            DEMURRAGE_FEE
                            STORAGE_FEE
                            TERMINAL_CHARGE
                            SPECIAL_CHARGE
                            REF_CHARGE
                            IMPORT_REMARK
                            IMPORT_COST
                            IMPORT_COST_DATE
                            FREIGHT_AMT
                            FREIGHT_AMT_DATE
                            LOCAL_CHG_AMT
                            LOCAL_CHG_AMT_DATE
                            DUTY_AMT
                            DUTY_AMT_DATE
                            STATUS_CD
                            GROSS_WEIGHT
                            MEASUREMENT
                            AIR_RATE
                            ETP_FROM
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA:",
                JSON.stringify(
                    data.allQueryKSV_IMPCHARGE_MATL_MST_ETHIOPIA.length,
                ),
            );
            return data.allQueryKSV_IMPCHARGE_MATL_MST_ETHIOPIA;
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
                    query MgrKsvImpchargeMatlMstEthiopiaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvImpchargeMatlMstEthiopiaQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            IMPORT_NO
                            BUYER_CD
                            INVOICE_NO
                            SUPPLIER_NAME
                            DELIVERY_TYPE
                            BL_NO
                            ETD
                            ETA
                            FACTORY_ETA
                            PO_NO
                            SHIPPING_GOODS
                            DECLEARANCE_DATE
                            CAPITALIZATION
                            SENDING_DATE
                            SALES_CONTACT_NO
                            REF
                            REMARK
                            ORD_AMT
                            CURR_CD
                            FREIGHT_TYPE
                            FREIGHT_COST
                            DUTY
                            VAT
                            TRANSPORTATION_FEE
                            RETURN_COST
                            CLEARANCE_FEE
                            INSPECTION_FEE
                            PORT_HANDLING_CHARGE
                            SCANING_FEE
                            DISBURSMENT_FEE
                            CONTAINER_BOND_FEE
                            DEMURRAGE_FEE
                            STORAGE_FEE
                            TERMINAL_CHARGE
                            SPECIAL_CHARGE
                            REF_CHARGE
                            IMPORT_REMARK
                            IMPORT_COST
                            IMPORT_COST_DATE
                            FREIGHT_AMT
                            FREIGHT_AMT_DATE
                            LOCAL_CHG_AMT
                            LOCAL_CHG_AMT_DATE
                            DUTY_AMT
                            DUTY_AMT_DATE
                            STATUS_CD
                            GROSS_WEIGHT
                            MEASUREMENT
                            AIR_RATE
                            ETP_FROM
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA:",
                JSON.stringify(data.mgrKsvImpchargeMatlMstEthiopiaQuery.length),
            );
            return data.mgrKsvImpchargeMatlMstEthiopiaQuery;
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
                    mutation CreateKSV_IMPCHARGE_MATL_MST_ETHIOPIA(
                        $importNo: String
                        $buyerCd: String
                        $invoiceNo: String
                        $supplierName: String
                        $deliveryType: String
                        $blNo: String
                        $etd: String
                        $eta: String
                        $factoryEta: String
                        $poNo: String
                        $shippingGoods: String
                        $declearanceDate: String
                        $capitalization: String
                        $sendingDate: String
                        $salesContactNo: String
                        $ref: String
                        $remark: String
                        $ordAmt: Float
                        $currCd: String
                        $freightType: String
                        $freightCost: Float
                        $duty: Float
                        $vat: Float
                        $transportationFee: Float
                        $returnCost: Float
                        $clearanceFee: Float
                        $inspectionFee: Float
                        $portHandlingCharge: Float
                        $scaningFee: Float
                        $disbursmentFee: Float
                        $containerBondFee: Float
                        $demurrageFee: Float
                        $storageFee: Float
                        $terminalCharge: Float
                        $specialCharge: Float
                        $refCharge: Float
                        $importRemark: String
                        $importCost: Float
                        $importCostDate: String
                        $freightAmt: Float
                        $freightAmtDate: String
                        $localChgAmt: Float
                        $localChgAmtDate: String
                        $dutyAmt: Float
                        $dutyAmtDate: String
                        $statusCd: String
                        $grossWeight: Float
                        $measurement: Float
                        $airRate: Float
                        $etpFrom: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_IMPCHARGE_MATL_MST_ETHIOPIA(
                            IMPORT_NO: $importNo
                            BUYER_CD: $buyerCd
                            INVOICE_NO: $invoiceNo
                            SUPPLIER_NAME: $supplierName
                            DELIVERY_TYPE: $deliveryType
                            BL_NO: $blNo
                            ETD: $etd
                            ETA: $eta
                            FACTORY_ETA: $factoryEta
                            PO_NO: $poNo
                            SHIPPING_GOODS: $shippingGoods
                            DECLEARANCE_DATE: $declearanceDate
                            CAPITALIZATION: $capitalization
                            SENDING_DATE: $sendingDate
                            SALES_CONTACT_NO: $salesContactNo
                            REF: $ref
                            REMARK: $remark
                            ORD_AMT: $ordAmt
                            CURR_CD: $currCd
                            FREIGHT_TYPE: $freightType
                            FREIGHT_COST: $freightCost
                            DUTY: $duty
                            VAT: $vat
                            TRANSPORTATION_FEE: $transportationFee
                            RETURN_COST: $returnCost
                            CLEARANCE_FEE: $clearanceFee
                            INSPECTION_FEE: $inspectionFee
                            PORT_HANDLING_CHARGE: $portHandlingCharge
                            SCANING_FEE: $scaningFee
                            DISBURSMENT_FEE: $disbursmentFee
                            CONTAINER_BOND_FEE: $containerBondFee
                            DEMURRAGE_FEE: $demurrageFee
                            STORAGE_FEE: $storageFee
                            TERMINAL_CHARGE: $terminalCharge
                            SPECIAL_CHARGE: $specialCharge
                            REF_CHARGE: $refCharge
                            IMPORT_REMARK: $importRemark
                            IMPORT_COST: $importCost
                            IMPORT_COST_DATE: $importCostDate
                            FREIGHT_AMT: $freightAmt
                            FREIGHT_AMT_DATE: $freightAmtDate
                            LOCAL_CHG_AMT: $localChgAmt
                            LOCAL_CHG_AMT_DATE: $localChgAmtDate
                            DUTY_AMT: $dutyAmt
                            DUTY_AMT_DATE: $dutyAmtDate
                            STATUS_CD: $statusCd
                            GROSS_WEIGHT: $grossWeight
                            MEASUREMENT: $measurement
                            AIR_RATE: $airRate
                            ETP_FROM: $etpFrom
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            IMPORT_NO
                            BUYER_CD
                            INVOICE_NO
                            SUPPLIER_NAME
                            DELIVERY_TYPE
                            BL_NO
                            ETD
                            ETA
                            FACTORY_ETA
                            PO_NO
                            SHIPPING_GOODS
                            DECLEARANCE_DATE
                            CAPITALIZATION
                            SENDING_DATE
                            SALES_CONTACT_NO
                            REF
                            REMARK
                            ORD_AMT
                            CURR_CD
                            FREIGHT_TYPE
                            FREIGHT_COST
                            DUTY
                            VAT
                            TRANSPORTATION_FEE
                            RETURN_COST
                            CLEARANCE_FEE
                            INSPECTION_FEE
                            PORT_HANDLING_CHARGE
                            SCANING_FEE
                            DISBURSMENT_FEE
                            CONTAINER_BOND_FEE
                            DEMURRAGE_FEE
                            STORAGE_FEE
                            TERMINAL_CHARGE
                            SPECIAL_CHARGE
                            REF_CHARGE
                            IMPORT_REMARK
                            IMPORT_COST
                            IMPORT_COST_DATE
                            FREIGHT_AMT
                            FREIGHT_AMT_DATE
                            LOCAL_CHG_AMT
                            LOCAL_CHG_AMT_DATE
                            DUTY_AMT
                            DUTY_AMT_DATE
                            STATUS_CD
                            GROSS_WEIGHT
                            MEASUREMENT
                            AIR_RATE
                            ETP_FROM
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    importNo: argData.IMPORT_NO,
                    buyerCd: argData.BUYER_CD,
                    invoiceNo: argData.INVOICE_NO,
                    supplierName: argData.SUPPLIER_NAME,
                    deliveryType: argData.DELIVERY_TYPE,
                    blNo: argData.BL_NO,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    factoryEta: argData.FACTORY_ETA,
                    poNo: argData.PO_NO,
                    shippingGoods: argData.SHIPPING_GOODS,
                    declearanceDate: argData.DECLEARANCE_DATE,
                    capitalization: argData.CAPITALIZATION,
                    sendingDate: argData.SENDING_DATE,
                    salesContactNo: argData.SALES_CONTACT_NO,
                    ref: argData.REF,
                    remark: argData.REMARK,
                    ordAmt: argData.ORD_AMT,
                    currCd: argData.CURR_CD,
                    freightType: argData.FREIGHT_TYPE,
                    freightCost: argData.FREIGHT_COST,
                    duty: argData.DUTY,
                    vat: argData.VAT,
                    transportationFee: argData.TRANSPORTATION_FEE,
                    returnCost: argData.RETURN_COST,
                    clearanceFee: argData.CLEARANCE_FEE,
                    inspectionFee: argData.INSPECTION_FEE,
                    portHandlingCharge: argData.PORT_HANDLING_CHARGE,
                    scaningFee: argData.SCANING_FEE,
                    disbursmentFee: argData.DISBURSMENT_FEE,
                    containerBondFee: argData.CONTAINER_BOND_FEE,
                    demurrageFee: argData.DEMURRAGE_FEE,
                    storageFee: argData.STORAGE_FEE,
                    terminalCharge: argData.TERMINAL_CHARGE,
                    specialCharge: argData.SPECIAL_CHARGE,
                    refCharge: argData.REF_CHARGE,
                    importRemark: argData.IMPORT_REMARK,
                    importCost: argData.IMPORT_COST,
                    importCostDate: argData.IMPORT_COST_DATE,
                    freightAmt: argData.FREIGHT_AMT,
                    freightAmtDate: argData.FREIGHT_AMT_DATE,
                    localChgAmt: argData.LOCAL_CHG_AMT,
                    localChgAmtDate: argData.LOCAL_CHG_AMT_DATE,
                    dutyAmt: argData.DUTY_AMT,
                    dutyAmtDate: argData.DUTY_AMT_DATE,
                    statusCd: argData.STATUS_CD,
                    grossWeight: argData.GROSS_WEIGHT,
                    measurement: argData.MEASUREMENT,
                    airRate: argData.AIR_RATE,
                    etpFrom: argData.ETP_FROM,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA INSERT:",
                JSON.stringify(data.createKSV_IMPCHARGE_MATL_MST_ETHIOPIA),
            );
            return data.createKSV_IMPCHARGE_MATL_MST_ETHIOPIA;
        } catch (e) {
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA INSERT ERROR:",
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
                    mutation UpdateKSV_IMPCHARGE_MATL_MST_ETHIOPIA(
                        $updateKsvImpchargeMatlMstEthiopiaId: Int!
                        $importNo: String
                        $buyerCd: String
                        $invoiceNo: String
                        $supplierName: String
                        $deliveryType: String
                        $blNo: String
                        $etd: String
                        $eta: String
                        $factoryEta: String
                        $poNo: String
                        $shippingGoods: String
                        $declearanceDate: String
                        $capitalization: String
                        $sendingDate: String
                        $salesContactNo: String
                        $ref: String
                        $remark: String
                        $ordAmt: Float
                        $currCd: String
                        $freightType: String
                        $freightCost: Float
                        $duty: Float
                        $vat: Float
                        $transportationFee: Float
                        $returnCost: Float
                        $clearanceFee: Float
                        $inspectionFee: Float
                        $portHandlingCharge: Float
                        $scaningFee: Float
                        $disbursmentFee: Float
                        $containerBondFee: Float
                        $demurrageFee: Float
                        $storageFee: Float
                        $terminalCharge: Float
                        $specialCharge: Float
                        $refCharge: Float
                        $importRemark: String
                        $importCost: Float
                        $importCostDate: String
                        $freightAmt: Float
                        $freightAmtDate: String
                        $localChgAmt: Float
                        $localChgAmtDate: String
                        $dutyAmt: Float
                        $dutyAmtDate: String
                        $statusCd: String
                        $grossWeight: Float
                        $measurement: Float
                        $airRate: Float
                        $etpFrom: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_IMPCHARGE_MATL_MST_ETHIOPIA(
                            id: $updateKsvImpchargeMatlMstEthiopiaId
                            IMPORT_NO: $importNo
                            BUYER_CD: $buyerCd
                            INVOICE_NO: $invoiceNo
                            SUPPLIER_NAME: $supplierName
                            DELIVERY_TYPE: $deliveryType
                            BL_NO: $blNo
                            ETD: $etd
                            ETA: $eta
                            FACTORY_ETA: $factoryEta
                            PO_NO: $poNo
                            SHIPPING_GOODS: $shippingGoods
                            DECLEARANCE_DATE: $declearanceDate
                            CAPITALIZATION: $capitalization
                            SENDING_DATE: $sendingDate
                            SALES_CONTACT_NO: $salesContactNo
                            REF: $ref
                            REMARK: $remark
                            ORD_AMT: $ordAmt
                            CURR_CD: $currCd
                            FREIGHT_TYPE: $freightType
                            FREIGHT_COST: $freightCost
                            DUTY: $duty
                            VAT: $vat
                            TRANSPORTATION_FEE: $transportationFee
                            RETURN_COST: $returnCost
                            CLEARANCE_FEE: $clearanceFee
                            INSPECTION_FEE: $inspectionFee
                            PORT_HANDLING_CHARGE: $portHandlingCharge
                            SCANING_FEE: $scaningFee
                            DISBURSMENT_FEE: $disbursmentFee
                            CONTAINER_BOND_FEE: $containerBondFee
                            DEMURRAGE_FEE: $demurrageFee
                            STORAGE_FEE: $storageFee
                            TERMINAL_CHARGE: $terminalCharge
                            SPECIAL_CHARGE: $specialCharge
                            REF_CHARGE: $refCharge
                            IMPORT_REMARK: $importRemark
                            IMPORT_COST: $importCost
                            IMPORT_COST_DATE: $importCostDate
                            FREIGHT_AMT: $freightAmt
                            FREIGHT_AMT_DATE: $freightAmtDate
                            LOCAL_CHG_AMT: $localChgAmt
                            LOCAL_CHG_AMT_DATE: $localChgAmtDate
                            DUTY_AMT: $dutyAmt
                            DUTY_AMT_DATE: $dutyAmtDate
                            STATUS_CD: $statusCd
                            GROSS_WEIGHT: $grossWeight
                            MEASUREMENT: $measurement
                            AIR_RATE: $airRate
                            ETP_FROM: $etpFrom
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            IMPORT_NO
                            BUYER_CD
                            INVOICE_NO
                            SUPPLIER_NAME
                            DELIVERY_TYPE
                            BL_NO
                            ETD
                            ETA
                            FACTORY_ETA
                            PO_NO
                            SHIPPING_GOODS
                            DECLEARANCE_DATE
                            CAPITALIZATION
                            SENDING_DATE
                            SALES_CONTACT_NO
                            REF
                            REMARK
                            ORD_AMT
                            CURR_CD
                            FREIGHT_TYPE
                            FREIGHT_COST
                            DUTY
                            VAT
                            TRANSPORTATION_FEE
                            RETURN_COST
                            CLEARANCE_FEE
                            INSPECTION_FEE
                            PORT_HANDLING_CHARGE
                            SCANING_FEE
                            DISBURSMENT_FEE
                            CONTAINER_BOND_FEE
                            DEMURRAGE_FEE
                            STORAGE_FEE
                            TERMINAL_CHARGE
                            SPECIAL_CHARGE
                            REF_CHARGE
                            IMPORT_REMARK
                            IMPORT_COST
                            IMPORT_COST_DATE
                            FREIGHT_AMT
                            FREIGHT_AMT_DATE
                            LOCAL_CHG_AMT
                            LOCAL_CHG_AMT_DATE
                            DUTY_AMT
                            DUTY_AMT_DATE
                            STATUS_CD
                            GROSS_WEIGHT
                            MEASUREMENT
                            AIR_RATE
                            ETP_FROM
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvImpchargeMatlMstEthiopiaId: argData.id,
                    importNo: argData.IMPORT_NO,
                    buyerCd: argData.BUYER_CD,
                    invoiceNo: argData.INVOICE_NO,
                    supplierName: argData.SUPPLIER_NAME,
                    deliveryType: argData.DELIVERY_TYPE,
                    blNo: argData.BL_NO,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    factoryEta: argData.FACTORY_ETA,
                    poNo: argData.PO_NO,
                    shippingGoods: argData.SHIPPING_GOODS,
                    declearanceDate: argData.DECLEARANCE_DATE,
                    capitalization: argData.CAPITALIZATION,
                    sendingDate: argData.SENDING_DATE,
                    salesContactNo: argData.SALES_CONTACT_NO,
                    ref: argData.REF,
                    remark: argData.REMARK,
                    ordAmt: argData.ORD_AMT,
                    currCd: argData.CURR_CD,
                    freightType: argData.FREIGHT_TYPE,
                    freightCost: argData.FREIGHT_COST,
                    duty: argData.DUTY,
                    vat: argData.VAT,
                    transportationFee: argData.TRANSPORTATION_FEE,
                    returnCost: argData.RETURN_COST,
                    clearanceFee: argData.CLEARANCE_FEE,
                    inspectionFee: argData.INSPECTION_FEE,
                    portHandlingCharge: argData.PORT_HANDLING_CHARGE,
                    scaningFee: argData.SCANING_FEE,
                    disbursmentFee: argData.DISBURSMENT_FEE,
                    containerBondFee: argData.CONTAINER_BOND_FEE,
                    demurrageFee: argData.DEMURRAGE_FEE,
                    storageFee: argData.STORAGE_FEE,
                    terminalCharge: argData.TERMINAL_CHARGE,
                    specialCharge: argData.SPECIAL_CHARGE,
                    refCharge: argData.REF_CHARGE,
                    importRemark: argData.IMPORT_REMARK,
                    importCost: argData.IMPORT_COST,
                    importCostDate: argData.IMPORT_COST_DATE,
                    freightAmt: argData.FREIGHT_AMT,
                    freightAmtDate: argData.FREIGHT_AMT_DATE,
                    localChgAmt: argData.LOCAL_CHG_AMT,
                    localChgAmtDate: argData.LOCAL_CHG_AMT_DATE,
                    dutyAmt: argData.DUTY_AMT,
                    dutyAmtDate: argData.DUTY_AMT_DATE,
                    statusCd: argData.STATUS_CD,
                    grossWeight: argData.GROSS_WEIGHT,
                    measurement: argData.MEASUREMENT,
                    airRate: argData.AIR_RATE,
                    etpFrom: argData.ETP_FROM,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA UPDATE:",
                JSON.stringify(data.updateKSV_IMPCHARGE_MATL_MST_ETHIOPIA),
            );
            return data.updateKSV_IMPCHARGE_MATL_MST_ETHIOPIA;
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
                    mutation DeleteKSV_IMPCHARGE_MATL_MST_ETHIOPIA(
                        $deleteKsvImpchargeMatlMstEthiopiaId: Int!
                    ) {
                        deleteKSV_IMPCHARGE_MATL_MST_ETHIOPIA(
                            id: $deleteKsvImpchargeMatlMstEthiopiaId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvImpchargeMatlMstEthiopiaId: argData.id,
                },
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA DELETE:",
                JSON.stringify(data.deleteKSV_IMPCHARGE_MATL_MST_ETHIOPIA),
            );
            return data.deleteKSV_IMPCHARGE_MATL_MST_ETHIOPIA;
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
                    mutation MgrKsvImpchargeMatlMstEthiopiaDeletes(
                        $ids: [InputMgrKsvImpchargeMatlMstEthiopiaDeletes!]!
                    ) {
                        mgrKsvImpchargeMatlMstEthiopiaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_IMPCHARGE_MATL_MST_ETHIOPIA DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
