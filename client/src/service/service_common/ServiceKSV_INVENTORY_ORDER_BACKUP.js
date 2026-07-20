/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_INVENTORY_ORDER_BACKUP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVENTORY_ORDER_BACKUP {
                        allQueryKSV_INVENTORY_ORDER_BACKUP {
                            id
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            BEF_AMOUNT
                            INPUT_AMOUNT
                            INPUT_AMOUNT_KRW
                            FAC_IN_AMOUNT
                            FAC_IN_AMOUNT_KRW
                            REG_USER
                            REG_DATETIME
                            ORIGINAL_AMOUNT_KRW
                            PRODUCT_AMOUNT_KRW
                            STOCK_AMOUNT_KRW
                            FAC_LC_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP:",
                JSON.stringify(data.allQueryKSV_INVENTORY_ORDER_BACKUP.length),
            );
            return data.allQueryKSV_INVENTORY_ORDER_BACKUP;
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
                    query MgrKsvInventoryOrderBackupQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInventoryOrderBackupQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            BEF_AMOUNT
                            INPUT_AMOUNT
                            INPUT_AMOUNT_KRW
                            FAC_IN_AMOUNT
                            FAC_IN_AMOUNT_KRW
                            REG_USER
                            REG_DATETIME
                            ORIGINAL_AMOUNT_KRW
                            PRODUCT_AMOUNT_KRW
                            STOCK_AMOUNT_KRW
                            FAC_LC_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP:",
                JSON.stringify(data.mgrKsvInventoryOrderBackupQuery.length),
            );
            return data.mgrKsvInventoryOrderBackupQuery;
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
                    mutation CreateKSV_INVENTORY_ORDER_BACKUP(
                        $poCd: String
                        $orderCd: String
                        $dateFrom: String
                        $dateTo: String
                        $befAmount: Float
                        $inputAmount: Float
                        $inputAmountKrw: Float
                        $facInAmount: Float
                        $facInAmountKrw: Float
                        $regUser: String
                        $regDatetime: String
                        $originalAmountKrw: Float
                        $productAmountKrw: Float
                        $stockAmountKrw: Float
                        $facLcFlag: String
                    ) {
                        createKSV_INVENTORY_ORDER_BACKUP(
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            DATE_FROM: $dateFrom
                            DATE_TO: $dateTo
                            BEF_AMOUNT: $befAmount
                            INPUT_AMOUNT: $inputAmount
                            INPUT_AMOUNT_KRW: $inputAmountKrw
                            FAC_IN_AMOUNT: $facInAmount
                            FAC_IN_AMOUNT_KRW: $facInAmountKrw
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            ORIGINAL_AMOUNT_KRW: $originalAmountKrw
                            PRODUCT_AMOUNT_KRW: $productAmountKrw
                            STOCK_AMOUNT_KRW: $stockAmountKrw
                            FAC_LC_FLAG: $facLcFlag
                        ) {
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            BEF_AMOUNT
                            INPUT_AMOUNT
                            INPUT_AMOUNT_KRW
                            FAC_IN_AMOUNT
                            FAC_IN_AMOUNT_KRW
                            REG_USER
                            REG_DATETIME
                            ORIGINAL_AMOUNT_KRW
                            PRODUCT_AMOUNT_KRW
                            STOCK_AMOUNT_KRW
                            FAC_LC_FLAG
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    dateFrom: argData.DATE_FROM,
                    dateTo: argData.DATE_TO,
                    befAmount: argData.BEF_AMOUNT,
                    inputAmount: argData.INPUT_AMOUNT,
                    inputAmountKrw: argData.INPUT_AMOUNT_KRW,
                    facInAmount: argData.FAC_IN_AMOUNT,
                    facInAmountKrw: argData.FAC_IN_AMOUNT_KRW,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    originalAmountKrw: argData.ORIGINAL_AMOUNT_KRW,
                    productAmountKrw: argData.PRODUCT_AMOUNT_KRW,
                    stockAmountKrw: argData.STOCK_AMOUNT_KRW,
                    facLcFlag: argData.FAC_LC_FLAG,
                },
            });
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP INSERT:",
                JSON.stringify(data.createKSV_INVENTORY_ORDER_BACKUP),
            );
            return data.createKSV_INVENTORY_ORDER_BACKUP;
        } catch (e) {
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_INVENTORY_ORDER_BACKUP(
                        $updateKsvInventoryOrderBackupId: Int!
                        $poCd: String
                        $orderCd: String
                        $dateFrom: String
                        $dateTo: String
                        $befAmount: Float
                        $inputAmount: Float
                        $inputAmountKrw: Float
                        $facInAmount: Float
                        $facInAmountKrw: Float
                        $regUser: String
                        $regDatetime: String
                        $originalAmountKrw: Float
                        $productAmountKrw: Float
                        $stockAmountKrw: Float
                        $facLcFlag: String
                    ) {
                        updateKSV_INVENTORY_ORDER_BACKUP(
                            id: $updateKsvInventoryOrderBackupId
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            DATE_FROM: $dateFrom
                            DATE_TO: $dateTo
                            BEF_AMOUNT: $befAmount
                            INPUT_AMOUNT: $inputAmount
                            INPUT_AMOUNT_KRW: $inputAmountKrw
                            FAC_IN_AMOUNT: $facInAmount
                            FAC_IN_AMOUNT_KRW: $facInAmountKrw
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            ORIGINAL_AMOUNT_KRW: $originalAmountKrw
                            PRODUCT_AMOUNT_KRW: $productAmountKrw
                            STOCK_AMOUNT_KRW: $stockAmountKrw
                            FAC_LC_FLAG: $facLcFlag
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            DATE_FROM
                            DATE_TO
                            BEF_AMOUNT
                            INPUT_AMOUNT
                            INPUT_AMOUNT_KRW
                            FAC_IN_AMOUNT
                            FAC_IN_AMOUNT_KRW
                            REG_USER
                            REG_DATETIME
                            ORIGINAL_AMOUNT_KRW
                            PRODUCT_AMOUNT_KRW
                            STOCK_AMOUNT_KRW
                            FAC_LC_FLAG
                        }
                    }
                `,
                variables: {
                    updateKsvInventoryOrderBackupId: argData.id,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    dateFrom: argData.DATE_FROM,
                    dateTo: argData.DATE_TO,
                    befAmount: argData.BEF_AMOUNT,
                    inputAmount: argData.INPUT_AMOUNT,
                    inputAmountKrw: argData.INPUT_AMOUNT_KRW,
                    facInAmount: argData.FAC_IN_AMOUNT,
                    facInAmountKrw: argData.FAC_IN_AMOUNT_KRW,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    originalAmountKrw: argData.ORIGINAL_AMOUNT_KRW,
                    productAmountKrw: argData.PRODUCT_AMOUNT_KRW,
                    stockAmountKrw: argData.STOCK_AMOUNT_KRW,
                    facLcFlag: argData.FAC_LC_FLAG,
                },
            });
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP UPDATE:",
                JSON.stringify(data.updateKSV_INVENTORY_ORDER_BACKUP),
            );
            return data.updateKSV_INVENTORY_ORDER_BACKUP;
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
                    mutation DeleteKSV_INVENTORY_ORDER_BACKUP(
                        $deleteKsvInventoryOrderBackupId: Int!
                    ) {
                        deleteKSV_INVENTORY_ORDER_BACKUP(
                            id: $deleteKsvInventoryOrderBackupId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInventoryOrderBackupId: argData.id,
                },
            });
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP DELETE:",
                JSON.stringify(data.deleteKSV_INVENTORY_ORDER_BACKUP),
            );
            return data.deleteKSV_INVENTORY_ORDER_BACKUP;
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
                    mutation MgrKsvInventoryOrderBackupDeletes(
                        $ids: [InputMgrKsvInventoryOrderBackupDeletes!]!
                    ) {
                        mgrKsvInventoryOrderBackupDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_INVENTORY_ORDER_BACKUP DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
