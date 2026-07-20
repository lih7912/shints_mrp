/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVENTORY_ORDER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVENTORY_ORDER {
                        allQueryKSV_INVENTORY_ORDER {
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
                "KSV_INVENTORY_ORDER:",
                JSON.stringify(data.allQueryKSV_INVENTORY_ORDER.length),
            );
            return data.allQueryKSV_INVENTORY_ORDER;
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
                    query MgrKsvInventoryOrderQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInventoryOrderQuery(
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
                "KSV_INVENTORY_ORDER:",
                JSON.stringify(data.mgrKsvInventoryOrderQuery.length),
            );
            return data.mgrKsvInventoryOrderQuery;
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
                    mutation CreateKSV_INVENTORY_ORDER(
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
                        createKSV_INVENTORY_ORDER(
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
                "KSV_INVENTORY_ORDER INSERT:",
                JSON.stringify(data.createKSV_INVENTORY_ORDER),
            );
            return data.createKSV_INVENTORY_ORDER;
        } catch (e) {
            console.log("KSV_INVENTORY_ORDER INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_INVENTORY_ORDER(
                        $updateKsvInventoryOrderId: Int!
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
                        updateKSV_INVENTORY_ORDER(
                            id: $updateKsvInventoryOrderId
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
                    updateKsvInventoryOrderId: argData.id,
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
                "KSV_INVENTORY_ORDER UPDATE:",
                JSON.stringify(data.updateKSV_INVENTORY_ORDER),
            );
            return data.updateKSV_INVENTORY_ORDER;
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
                    mutation DeleteKSV_INVENTORY_ORDER(
                        $deleteKsvInventoryOrderId: Int!
                    ) {
                        deleteKSV_INVENTORY_ORDER(
                            id: $deleteKsvInventoryOrderId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInventoryOrderId: argData.id,
                },
            });
            console.log(
                "KSV_INVENTORY_ORDER DELETE:",
                JSON.stringify(data.deleteKSV_INVENTORY_ORDER),
            );
            return data.deleteKSV_INVENTORY_ORDER;
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
                    mutation MgrKsvInventoryOrderDeletes(
                        $ids: [InputMgrKsvInventoryOrderDeletes!]!
                    ) {
                        mgrKsvInventoryOrderDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVENTORY_ORDER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
