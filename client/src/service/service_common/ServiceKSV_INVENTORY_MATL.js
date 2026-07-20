/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_INVENTORY_MATL {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVENTORY_MATL {
                        allQueryKSV_INVENTORY_MATL {
                            id
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            PO_AMOUNT
                            PO_METER
                            IN_METER
                            IN_AMOUNT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVENTORY_MATL:",
                JSON.stringify(data.allQueryKSV_INVENTORY_MATL.length),
            );
            return data.allQueryKSV_INVENTORY_MATL;
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
                    query MgrKsvInventoryMatlQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInventoryMatlQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            PO_AMOUNT
                            PO_METER
                            IN_METER
                            IN_AMOUNT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVENTORY_MATL:",
                JSON.stringify(data.mgrKsvInventoryMatlQuery.length),
            );
            return data.mgrKsvInventoryMatlQuery;
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
                    mutation CreateKSV_INVENTORY_MATL(
                        $poCd: String
                        $orderCd: String
                        $dateFrom: String
                        $dateTo: String
                        $poAmount: Float
                        $poMeter: Float
                        $inMeter: Float
                        $inAmount: Float
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_INVENTORY_MATL(
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            DATE_FROM: $dateFrom
                            DATE_TO: $dateTo
                            PO_AMOUNT: $poAmount
                            PO_METER: $poMeter
                            IN_METER: $inMeter
                            IN_AMOUNT: $inAmount
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            PO_AMOUNT
                            PO_METER
                            IN_METER
                            IN_AMOUNT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    dateFrom: argData.DATE_FROM,
                    dateTo: argData.DATE_TO,
                    poAmount: argData.PO_AMOUNT,
                    poMeter: argData.PO_METER,
                    inMeter: argData.IN_METER,
                    inAmount: argData.IN_AMOUNT,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_INVENTORY_MATL INSERT:",
                JSON.stringify(data.createKSV_INVENTORY_MATL),
            );
            return data.createKSV_INVENTORY_MATL;
        } catch (e) {
            console.log("KSV_INVENTORY_MATL INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVENTORY_MATL(
                        $updateKsvInventoryMatlId: Int!
                        $poCd: String
                        $orderCd: String
                        $dateFrom: String
                        $dateTo: String
                        $poAmount: Float
                        $poMeter: Float
                        $inMeter: Float
                        $inAmount: Float
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_INVENTORY_MATL(
                            id: $updateKsvInventoryMatlId
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            DATE_FROM: $dateFrom
                            DATE_TO: $dateTo
                            PO_AMOUNT: $poAmount
                            PO_METER: $poMeter
                            IN_METER: $inMeter
                            IN_AMOUNT: $inAmount
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            PO_AMOUNT
                            PO_METER
                            IN_METER
                            IN_AMOUNT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvInventoryMatlId: argData.id,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    dateFrom: argData.DATE_FROM,
                    dateTo: argData.DATE_TO,
                    poAmount: argData.PO_AMOUNT,
                    poMeter: argData.PO_METER,
                    inMeter: argData.IN_METER,
                    inAmount: argData.IN_AMOUNT,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_INVENTORY_MATL UPDATE:",
                JSON.stringify(data.updateKSV_INVENTORY_MATL),
            );
            return data.updateKSV_INVENTORY_MATL;
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
                    mutation DeleteKSV_INVENTORY_MATL(
                        $deleteKsvInventoryMatlId: Int!
                    ) {
                        deleteKSV_INVENTORY_MATL(
                            id: $deleteKsvInventoryMatlId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInventoryMatlId: argData.id,
                },
            });
            console.log(
                "KSV_INVENTORY_MATL DELETE:",
                JSON.stringify(data.deleteKSV_INVENTORY_MATL),
            );
            return data.deleteKSV_INVENTORY_MATL;
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
                    mutation MgrKsvInventoryMatlDeletes(
                        $ids: [InputMgrKsvInventoryMatlDeletes!]!
                    ) {
                        mgrKsvInventoryMatlDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVENTORY_MATL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
