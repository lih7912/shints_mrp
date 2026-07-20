/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_SHIPPACK {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_SHIPPACK {
                        allQueryKSV_ORDER_SHIPPACK {
                            id
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            NAT_CD
                            SHIP_CNT
                            SIZE_CNT
                            CTNO_FROM
                            CTNO_TO
                            CTNO_QTY
                            NW
                            GW
                            CBM
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_SHIPPACK:",
                JSON.stringify(data.allQueryKSV_ORDER_SHIPPACK.length),
            );
            return data.allQueryKSV_ORDER_SHIPPACK;
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
                    query MgrKsvOrderShippackQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderShippackQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            NAT_CD
                            SHIP_CNT
                            SIZE_CNT
                            CTNO_FROM
                            CTNO_TO
                            CTNO_QTY
                            NW
                            GW
                            CBM
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_SHIPPACK:",
                JSON.stringify(data.mgrKsvOrderShippackQuery.length),
            );
            return data.mgrKsvOrderShippackQuery;
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
                    mutation CreateKSV_ORDER_SHIPPACK(
                        $invoiceNo: String
                        $orderCd: String
                        $prodCd: String
                        $shipDate: String
                        $shipPtype: String
                        $deliveryType: String
                        $natCd: String
                        $shipCnt: Int
                        $sizeCnt: String
                        $ctnoFrom: Int
                        $ctnoTo: Int
                        $ctnoQty: Int
                        $nw: Float
                        $gw: Float
                        $cbm: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_SHIPPACK(
                            INVOICE_NO: $invoiceNo
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SHIP_DATE: $shipDate
                            SHIP_PTYPE: $shipPtype
                            DELIVERY_TYPE: $deliveryType
                            NAT_CD: $natCd
                            SHIP_CNT: $shipCnt
                            SIZE_CNT: $sizeCnt
                            CTNO_FROM: $ctnoFrom
                            CTNO_TO: $ctnoTo
                            CTNO_QTY: $ctnoQty
                            NW: $nw
                            GW: $gw
                            CBM: $cbm
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            NAT_CD
                            SHIP_CNT
                            SIZE_CNT
                            CTNO_FROM
                            CTNO_TO
                            CTNO_QTY
                            NW
                            GW
                            CBM
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.INVOICE_NO,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    shipDate: argData.SHIP_DATE,
                    shipPtype: argData.SHIP_PTYPE,
                    deliveryType: argData.DELIVERY_TYPE,
                    natCd: argData.NAT_CD,
                    shipCnt: argData.SHIP_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    ctnoFrom: argData.CTNO_FROM,
                    ctnoTo: argData.CTNO_TO,
                    ctnoQty: argData.CTNO_QTY,
                    nw: argData.NW,
                    gw: argData.GW,
                    cbm: argData.CBM,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIPPACK INSERT:",
                JSON.stringify(data.createKSV_ORDER_SHIPPACK),
            );
            return data.createKSV_ORDER_SHIPPACK;
        } catch (e) {
            console.log("KSV_ORDER_SHIPPACK INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_SHIPPACK(
                        $updateKsvOrderShippackId: Int!
                        $invoiceNo: String
                        $orderCd: String
                        $prodCd: String
                        $shipDate: String
                        $shipPtype: String
                        $deliveryType: String
                        $natCd: String
                        $shipCnt: Int
                        $sizeCnt: String
                        $ctnoFrom: Int
                        $ctnoTo: Int
                        $ctnoQty: Int
                        $nw: Float
                        $gw: Float
                        $cbm: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_SHIPPACK(
                            id: $updateKsvOrderShippackId
                            INVOICE_NO: $invoiceNo
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SHIP_DATE: $shipDate
                            SHIP_PTYPE: $shipPtype
                            DELIVERY_TYPE: $deliveryType
                            NAT_CD: $natCd
                            SHIP_CNT: $shipCnt
                            SIZE_CNT: $sizeCnt
                            CTNO_FROM: $ctnoFrom
                            CTNO_TO: $ctnoTo
                            CTNO_QTY: $ctnoQty
                            NW: $nw
                            GW: $gw
                            CBM: $cbm
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            INVOICE_NO
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            DELIVERY_TYPE
                            NAT_CD
                            SHIP_CNT
                            SIZE_CNT
                            CTNO_FROM
                            CTNO_TO
                            CTNO_QTY
                            NW
                            GW
                            CBM
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderShippackId: argData.id,
                    invoiceNo: argData.INVOICE_NO,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    shipDate: argData.SHIP_DATE,
                    shipPtype: argData.SHIP_PTYPE,
                    deliveryType: argData.DELIVERY_TYPE,
                    natCd: argData.NAT_CD,
                    shipCnt: argData.SHIP_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    ctnoFrom: argData.CTNO_FROM,
                    ctnoTo: argData.CTNO_TO,
                    ctnoQty: argData.CTNO_QTY,
                    nw: argData.NW,
                    gw: argData.GW,
                    cbm: argData.CBM,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIPPACK UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_SHIPPACK),
            );
            return data.updateKSV_ORDER_SHIPPACK;
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
                    mutation DeleteKSV_ORDER_SHIPPACK(
                        $deleteKsvOrderShippackId: Int!
                    ) {
                        deleteKSV_ORDER_SHIPPACK(
                            id: $deleteKsvOrderShippackId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderShippackId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_SHIPPACK DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_SHIPPACK),
            );
            return data.deleteKSV_ORDER_SHIPPACK;
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
                    mutation MgrKsvOrderShippackDeletes(
                        $ids: [InputMgrKsvOrderShippackDeletes!]!
                    ) {
                        mgrKsvOrderShippackDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_SHIPPACK DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
