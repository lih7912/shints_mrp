/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_SHIP_TEMP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_SHIP_TEMP {
                        allQueryKSV_ORDER_SHIP_TEMP {
                            id
                            INVOICE_NO_TEMP
                            ORDER_CD
                            SHIP_DATE
                            SHIP_MODE
                            SHIP_TYPE
                            EXPORT_LICENSE
                            MOVEMENT
                            TERMS_DELIVERY
                            NAT_CD
                            CONTAINER_REQUEST
                            DESTINATION
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_SHIP_TEMP:",
                JSON.stringify(data.allQueryKSV_ORDER_SHIP_TEMP.length),
            );
            return data.allQueryKSV_ORDER_SHIP_TEMP;
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
                    query MgrKsvOrderShipTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderShipTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INVOICE_NO_TEMP
                            ORDER_CD
                            SHIP_DATE
                            SHIP_MODE
                            SHIP_TYPE
                            EXPORT_LICENSE
                            MOVEMENT
                            TERMS_DELIVERY
                            NAT_CD
                            CONTAINER_REQUEST
                            DESTINATION
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_SHIP_TEMP:",
                JSON.stringify(data.mgrKsvOrderShipTempQuery.length),
            );
            return data.mgrKsvOrderShipTempQuery;
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
                    mutation CreateKSV_ORDER_SHIP_TEMP(
                        $invoiceNoTemp: String
                        $orderCd: String
                        $shipDate: String
                        $shipMode: String
                        $shipType: String
                        $exportLicense: String
                        $movement: String
                        $termsDelivery: String
                        $natCd: String
                        $containerRequest: String
                        $destination: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_SHIP_TEMP(
                            INVOICE_NO_TEMP: $invoiceNoTemp
                            ORDER_CD: $orderCd
                            SHIP_DATE: $shipDate
                            SHIP_MODE: $shipMode
                            SHIP_TYPE: $shipType
                            EXPORT_LICENSE: $exportLicense
                            MOVEMENT: $movement
                            TERMS_DELIVERY: $termsDelivery
                            NAT_CD: $natCd
                            CONTAINER_REQUEST: $containerRequest
                            DESTINATION: $destination
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            INVOICE_NO_TEMP
                            ORDER_CD
                            SHIP_DATE
                            SHIP_MODE
                            SHIP_TYPE
                            EXPORT_LICENSE
                            MOVEMENT
                            TERMS_DELIVERY
                            NAT_CD
                            CONTAINER_REQUEST
                            DESTINATION
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    invoiceNoTemp: argData.INVOICE_NO_TEMP,
                    orderCd: argData.ORDER_CD,
                    shipDate: argData.SHIP_DATE,
                    shipMode: argData.SHIP_MODE,
                    shipType: argData.SHIP_TYPE,
                    exportLicense: argData.EXPORT_LICENSE,
                    movement: argData.MOVEMENT,
                    termsDelivery: argData.TERMS_DELIVERY,
                    natCd: argData.NAT_CD,
                    containerRequest: argData.CONTAINER_REQUEST,
                    destination: argData.DESTINATION,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_TEMP INSERT:",
                JSON.stringify(data.createKSV_ORDER_SHIP_TEMP),
            );
            return data.createKSV_ORDER_SHIP_TEMP;
        } catch (e) {
            console.log("KSV_ORDER_SHIP_TEMP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_SHIP_TEMP(
                        $updateKsvOrderShipTempId: Int!
                        $invoiceNoTemp: String
                        $orderCd: String
                        $shipDate: String
                        $shipMode: String
                        $shipType: String
                        $exportLicense: String
                        $movement: String
                        $termsDelivery: String
                        $natCd: String
                        $containerRequest: String
                        $destination: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_SHIP_TEMP(
                            id: $updateKsvOrderShipTempId
                            INVOICE_NO_TEMP: $invoiceNoTemp
                            ORDER_CD: $orderCd
                            SHIP_DATE: $shipDate
                            SHIP_MODE: $shipMode
                            SHIP_TYPE: $shipType
                            EXPORT_LICENSE: $exportLicense
                            MOVEMENT: $movement
                            TERMS_DELIVERY: $termsDelivery
                            NAT_CD: $natCd
                            CONTAINER_REQUEST: $containerRequest
                            DESTINATION: $destination
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            INVOICE_NO_TEMP
                            ORDER_CD
                            SHIP_DATE
                            SHIP_MODE
                            SHIP_TYPE
                            EXPORT_LICENSE
                            MOVEMENT
                            TERMS_DELIVERY
                            NAT_CD
                            CONTAINER_REQUEST
                            DESTINATION
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderShipTempId: argData.id,
                    invoiceNoTemp: argData.INVOICE_NO_TEMP,
                    orderCd: argData.ORDER_CD,
                    shipDate: argData.SHIP_DATE,
                    shipMode: argData.SHIP_MODE,
                    shipType: argData.SHIP_TYPE,
                    exportLicense: argData.EXPORT_LICENSE,
                    movement: argData.MOVEMENT,
                    termsDelivery: argData.TERMS_DELIVERY,
                    natCd: argData.NAT_CD,
                    containerRequest: argData.CONTAINER_REQUEST,
                    destination: argData.DESTINATION,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_SHIP_TEMP),
            );
            return data.updateKSV_ORDER_SHIP_TEMP;
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
                    mutation DeleteKSV_ORDER_SHIP_TEMP(
                        $deleteKsvOrderShipTempId: Int!
                    ) {
                        deleteKSV_ORDER_SHIP_TEMP(
                            id: $deleteKsvOrderShipTempId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderShipTempId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_SHIP_TEMP),
            );
            return data.deleteKSV_ORDER_SHIP_TEMP;
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
                    mutation MgrKsvOrderShipTempDeletes(
                        $ids: [InputMgrKsvOrderShipTempDeletes!]!
                    ) {
                        mgrKsvOrderShipTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_SHIP_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
