/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_SHIP_PRODUCT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_SHIP_PRODUCT {
                        allQueryKSV_ORDER_SHIP_PRODUCT {
                            id
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE0
                            SHIP_DATE
                            EXFACTORY
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_CNT
                            SIZE_CNT
                            NAT_CD
                            FC_BILL_PRICE
                            FC_BILL_FLAG
                            FC_BILL_DATE
                            FC_CHK_FLAG
                            FC_CHK_USER
                            FC_CHK_DATETIME
                            CM_BILL_PRICE
                            CM_BILL_FLAG
                            CM_BILL_DATE
                            INVOICE_NO
                            TRADE_CHK_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_SHIP_PRODUCT:",
                JSON.stringify(data.allQueryKSV_ORDER_SHIP_PRODUCT.length),
            );
            return data.allQueryKSV_ORDER_SHIP_PRODUCT;
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
                    query MgrKsvOrderShipProductQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderShipProductQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE0
                            SHIP_DATE
                            EXFACTORY
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_CNT
                            SIZE_CNT
                            NAT_CD
                            FC_BILL_PRICE
                            FC_BILL_FLAG
                            FC_BILL_DATE
                            FC_CHK_FLAG
                            FC_CHK_USER
                            FC_CHK_DATETIME
                            CM_BILL_PRICE
                            CM_BILL_FLAG
                            CM_BILL_DATE
                            INVOICE_NO
                            TRADE_CHK_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_SHIP_PRODUCT:",
                JSON.stringify(data.mgrKsvOrderShipProductQuery.length),
            );
            return data.mgrKsvOrderShipProductQuery;
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
                    mutation CreateKSV_ORDER_SHIP_PRODUCT(
                        $orderCd: String
                        $prodCd: String
                        $shipDate0: String
                        $shipDate: String
                        $exfactory: String
                        $shipPtype: String
                        $deliveryType: String
                        $shipCnt: Int
                        $sizeCnt: String
                        $natCd: String
                        $fcBillPrice: Float
                        $fcBillFlag: String
                        $fcBillDate: String
                        $fcChkFlag: String
                        $fcChkUser: String
                        $fcChkDatetime: String
                        $cmBillPrice: Float
                        $cmBillFlag: String
                        $cmBillDate: String
                        $invoiceNo: String
                        $tradeChkFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_SHIP_PRODUCT(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SHIP_DATE0: $shipDate0
                            SHIP_DATE: $shipDate
                            EXFACTORY: $exfactory
                            SHIP_PTYPE: $shipPtype
                            DELIVERY_TYPE: $deliveryType
                            SHIP_CNT: $shipCnt
                            SIZE_CNT: $sizeCnt
                            NAT_CD: $natCd
                            FC_BILL_PRICE: $fcBillPrice
                            FC_BILL_FLAG: $fcBillFlag
                            FC_BILL_DATE: $fcBillDate
                            FC_CHK_FLAG: $fcChkFlag
                            FC_CHK_USER: $fcChkUser
                            FC_CHK_DATETIME: $fcChkDatetime
                            CM_BILL_PRICE: $cmBillPrice
                            CM_BILL_FLAG: $cmBillFlag
                            CM_BILL_DATE: $cmBillDate
                            INVOICE_NO: $invoiceNo
                            TRADE_CHK_FLAG: $tradeChkFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE0
                            SHIP_DATE
                            EXFACTORY
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_CNT
                            SIZE_CNT
                            NAT_CD
                            FC_BILL_PRICE
                            FC_BILL_FLAG
                            FC_BILL_DATE
                            FC_CHK_FLAG
                            FC_CHK_USER
                            FC_CHK_DATETIME
                            CM_BILL_PRICE
                            CM_BILL_FLAG
                            CM_BILL_DATE
                            INVOICE_NO
                            TRADE_CHK_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    shipDate0: argData.SHIP_DATE0,
                    shipDate: argData.SHIP_DATE,
                    exfactory: argData.EXFACTORY,
                    shipPtype: argData.SHIP_PTYPE,
                    deliveryType: argData.DELIVERY_TYPE,
                    shipCnt: argData.SHIP_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    natCd: argData.NAT_CD,
                    fcBillPrice: argData.FC_BILL_PRICE,
                    fcBillFlag: argData.FC_BILL_FLAG,
                    fcBillDate: argData.FC_BILL_DATE,
                    fcChkFlag: argData.FC_CHK_FLAG,
                    fcChkUser: argData.FC_CHK_USER,
                    fcChkDatetime: argData.FC_CHK_DATETIME,
                    cmBillPrice: argData.CM_BILL_PRICE,
                    cmBillFlag: argData.CM_BILL_FLAG,
                    cmBillDate: argData.CM_BILL_DATE,
                    invoiceNo: argData.INVOICE_NO,
                    tradeChkFlag: argData.TRADE_CHK_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_PRODUCT INSERT:",
                JSON.stringify(data.createKSV_ORDER_SHIP_PRODUCT),
            );
            return data.createKSV_ORDER_SHIP_PRODUCT;
        } catch (e) {
            console.log(
                "KSV_ORDER_SHIP_PRODUCT INSERT ERROR:",
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
                    mutation UpdateKSV_ORDER_SHIP_PRODUCT(
                        $updateKsvOrderShipProductId: Int!
                        $orderCd: String
                        $prodCd: String
                        $shipDate0: String
                        $shipDate: String
                        $exfactory: String
                        $shipPtype: String
                        $deliveryType: String
                        $shipCnt: Int
                        $sizeCnt: String
                        $natCd: String
                        $fcBillPrice: Float
                        $fcBillFlag: String
                        $fcBillDate: String
                        $fcChkFlag: String
                        $fcChkUser: String
                        $fcChkDatetime: String
                        $cmBillPrice: Float
                        $cmBillFlag: String
                        $cmBillDate: String
                        $invoiceNo: String
                        $tradeChkFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_SHIP_PRODUCT(
                            id: $updateKsvOrderShipProductId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SHIP_DATE0: $shipDate0
                            SHIP_DATE: $shipDate
                            EXFACTORY: $exfactory
                            SHIP_PTYPE: $shipPtype
                            DELIVERY_TYPE: $deliveryType
                            SHIP_CNT: $shipCnt
                            SIZE_CNT: $sizeCnt
                            NAT_CD: $natCd
                            FC_BILL_PRICE: $fcBillPrice
                            FC_BILL_FLAG: $fcBillFlag
                            FC_BILL_DATE: $fcBillDate
                            FC_CHK_FLAG: $fcChkFlag
                            FC_CHK_USER: $fcChkUser
                            FC_CHK_DATETIME: $fcChkDatetime
                            CM_BILL_PRICE: $cmBillPrice
                            CM_BILL_FLAG: $cmBillFlag
                            CM_BILL_DATE: $cmBillDate
                            INVOICE_NO: $invoiceNo
                            TRADE_CHK_FLAG: $tradeChkFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE0
                            SHIP_DATE
                            EXFACTORY
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            SHIP_CNT
                            SIZE_CNT
                            NAT_CD
                            FC_BILL_PRICE
                            FC_BILL_FLAG
                            FC_BILL_DATE
                            FC_CHK_FLAG
                            FC_CHK_USER
                            FC_CHK_DATETIME
                            CM_BILL_PRICE
                            CM_BILL_FLAG
                            CM_BILL_DATE
                            INVOICE_NO
                            TRADE_CHK_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderShipProductId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    shipDate0: argData.SHIP_DATE0,
                    shipDate: argData.SHIP_DATE,
                    exfactory: argData.EXFACTORY,
                    shipPtype: argData.SHIP_PTYPE,
                    deliveryType: argData.DELIVERY_TYPE,
                    shipCnt: argData.SHIP_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    natCd: argData.NAT_CD,
                    fcBillPrice: argData.FC_BILL_PRICE,
                    fcBillFlag: argData.FC_BILL_FLAG,
                    fcBillDate: argData.FC_BILL_DATE,
                    fcChkFlag: argData.FC_CHK_FLAG,
                    fcChkUser: argData.FC_CHK_USER,
                    fcChkDatetime: argData.FC_CHK_DATETIME,
                    cmBillPrice: argData.CM_BILL_PRICE,
                    cmBillFlag: argData.CM_BILL_FLAG,
                    cmBillDate: argData.CM_BILL_DATE,
                    invoiceNo: argData.INVOICE_NO,
                    tradeChkFlag: argData.TRADE_CHK_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_PRODUCT UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_SHIP_PRODUCT),
            );
            return data.updateKSV_ORDER_SHIP_PRODUCT;
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
                    mutation DeleteKSV_ORDER_SHIP_PRODUCT(
                        $deleteKsvOrderShipProductId: Int!
                    ) {
                        deleteKSV_ORDER_SHIP_PRODUCT(
                            id: $deleteKsvOrderShipProductId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderShipProductId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_PRODUCT DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_SHIP_PRODUCT),
            );
            return data.deleteKSV_ORDER_SHIP_PRODUCT;
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
                    mutation MgrKsvOrderShipProductDeletes(
                        $ids: [InputMgrKsvOrderShipProductDeletes!]!
                    ) {
                        mgrKsvOrderShipProductDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_ORDER_SHIP_PRODUCT DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
