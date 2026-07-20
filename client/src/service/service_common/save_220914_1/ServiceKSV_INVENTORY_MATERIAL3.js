/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVENTORY_MATERIAL3 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVENTORY_MATERIAL3 {
                        allQueryKSV_INVENTORY_MATERIAL3 {
                            id
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            MOQ_QTY
                            STOCK_USE_QTY
                            ESO_QTY
                            STOCK_MOVE_QTY
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVENTORY_MATERIAL3:",
                JSON.stringify(data.allQueryKSV_INVENTORY_MATERIAL3.length),
            );
            return data.allQueryKSV_INVENTORY_MATERIAL3;
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
                    query MgrKsvInventoryMaterial3Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInventoryMaterial3Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            MOQ_QTY
                            STOCK_USE_QTY
                            ESO_QTY
                            STOCK_MOVE_QTY
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL3:",
                JSON.stringify(data.mgrKsvInventoryMaterial3Query.length),
            );
            return data.mgrKsvInventoryMaterial3Query;
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
                    mutation CreateKSV_INVENTORY_MATERIAL3(
                        $poCd: String
                        $matlCd: String
                        $facInQtyPeriod: Float
                        $payPrice: Float
                        $payCurrCd: String
                        $moqQty: Float
                        $stockUseQty: Float
                        $esoQty: Float
                        $stockMoveQty: Float
                        $facInQty: Float
                        $facOutQty: Float
                        $productQty: Float
                        $finishQty: Float
                        $regUser: String
                        $regDatetime: String
                        $updDatetime: String
                    ) {
                        createKSV_INVENTORY_MATERIAL3(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            FAC_IN_QTY_PERIOD: $facInQtyPeriod
                            PAY_PRICE: $payPrice
                            PAY_CURR_CD: $payCurrCd
                            MOQ_QTY: $moqQty
                            STOCK_USE_QTY: $stockUseQty
                            ESO_QTY: $esoQty
                            STOCK_MOVE_QTY: $stockMoveQty
                            FAC_IN_QTY: $facInQty
                            FAC_OUT_QTY: $facOutQty
                            PRODUCT_QTY: $productQty
                            FINISH_QTY: $finishQty
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_DATETIME: $updDatetime
                        ) {
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            MOQ_QTY
                            STOCK_USE_QTY
                            ESO_QTY
                            STOCK_MOVE_QTY
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    facInQtyPeriod: argData.FAC_IN_QTY_PERIOD,
                    payPrice: argData.PAY_PRICE,
                    payCurrCd: argData.PAY_CURR_CD,
                    moqQty: argData.MOQ_QTY,
                    stockUseQty: argData.STOCK_USE_QTY,
                    esoQty: argData.ESO_QTY,
                    stockMoveQty: argData.STOCK_MOVE_QTY,
                    facInQty: argData.FAC_IN_QTY,
                    facOutQty: argData.FAC_OUT_QTY,
                    productQty: argData.PRODUCT_QTY,
                    finishQty: argData.FINISH_QTY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL3 INSERT:",
                JSON.stringify(data.createKSV_INVENTORY_MATERIAL3),
            );
            return data.createKSV_INVENTORY_MATERIAL3;
        } catch (e) {
            console.log(
                "KSV_INVENTORY_MATERIAL3 INSERT ERROR:",
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
                    mutation UpdateKSV_INVENTORY_MATERIAL3(
                        $updateKsvInventoryMaterial3Id: Int!
                        $poCd: String
                        $matlCd: String
                        $facInQtyPeriod: Float
                        $payPrice: Float
                        $payCurrCd: String
                        $moqQty: Float
                        $stockUseQty: Float
                        $esoQty: Float
                        $stockMoveQty: Float
                        $facInQty: Float
                        $facOutQty: Float
                        $productQty: Float
                        $finishQty: Float
                        $regUser: String
                        $regDatetime: String
                        $updDatetime: String
                    ) {
                        updateKSV_INVENTORY_MATERIAL3(
                            id: $updateKsvInventoryMaterial3Id
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            FAC_IN_QTY_PERIOD: $facInQtyPeriod
                            PAY_PRICE: $payPrice
                            PAY_CURR_CD: $payCurrCd
                            MOQ_QTY: $moqQty
                            STOCK_USE_QTY: $stockUseQty
                            ESO_QTY: $esoQty
                            STOCK_MOVE_QTY: $stockMoveQty
                            FAC_IN_QTY: $facInQty
                            FAC_OUT_QTY: $facOutQty
                            PRODUCT_QTY: $productQty
                            FINISH_QTY: $finishQty
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            MOQ_QTY
                            STOCK_USE_QTY
                            ESO_QTY
                            STOCK_MOVE_QTY
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvInventoryMaterial3Id: argData.id,
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    facInQtyPeriod: argData.FAC_IN_QTY_PERIOD,
                    payPrice: argData.PAY_PRICE,
                    payCurrCd: argData.PAY_CURR_CD,
                    moqQty: argData.MOQ_QTY,
                    stockUseQty: argData.STOCK_USE_QTY,
                    esoQty: argData.ESO_QTY,
                    stockMoveQty: argData.STOCK_MOVE_QTY,
                    facInQty: argData.FAC_IN_QTY,
                    facOutQty: argData.FAC_OUT_QTY,
                    productQty: argData.PRODUCT_QTY,
                    finishQty: argData.FINISH_QTY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL3 UPDATE:",
                JSON.stringify(data.updateKSV_INVENTORY_MATERIAL3),
            );
            return data.updateKSV_INVENTORY_MATERIAL3;
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
                    mutation DeleteKSV_INVENTORY_MATERIAL3(
                        $deleteKsvInventoryMaterial3Id: Int!
                    ) {
                        deleteKSV_INVENTORY_MATERIAL3(
                            id: $deleteKsvInventoryMaterial3Id
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInventoryMaterial3Id: argData.id,
                },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL3 DELETE:",
                JSON.stringify(data.deleteKSV_INVENTORY_MATERIAL3),
            );
            return data.deleteKSV_INVENTORY_MATERIAL3;
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
                    mutation MgrKsvInventoryMaterial3Deletes(
                        $ids: [InputMgrKsvInventoryMaterial3Deletes!]!
                    ) {
                        mgrKsvInventoryMaterial3Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_INVENTORY_MATERIAL3 DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
