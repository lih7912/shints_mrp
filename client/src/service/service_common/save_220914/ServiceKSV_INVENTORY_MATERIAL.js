/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVENTORY_MATERIAL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVENTORY_MATERIAL {
                        allQueryKSV_INVENTORY_MATERIAL {
                            id
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVENTORY_MATERIAL:",
                JSON.stringify(data.allQueryKSV_INVENTORY_MATERIAL.length),
            );
            return data.allQueryKSV_INVENTORY_MATERIAL;
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
                    query MgrKsvInventoryMaterialQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInventoryMaterialQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL:",
                JSON.stringify(data.mgrKsvInventoryMaterialQuery.length),
            );
            return data.mgrKsvInventoryMaterialQuery;
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
                    mutation CreateKSV_INVENTORY_MATERIAL(
                        $poCd: String
                        $matlCd: String
                        $facInQtyPeriod: Float
                        $payPrice: Float
                        $payCurrCd: String
                        $facInQty: Float
                        $facOutQty: Float
                        $productQty: Float
                        $finishQty: Float
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_INVENTORY_MATERIAL(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            FAC_IN_QTY_PERIOD: $facInQtyPeriod
                            PAY_PRICE: $payPrice
                            PAY_CURR_CD: $payCurrCd
                            FAC_IN_QTY: $facInQty
                            FAC_OUT_QTY: $facOutQty
                            PRODUCT_QTY: $productQty
                            FINISH_QTY: $finishQty
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    facInQtyPeriod: argData.FAC_IN_QTY_PERIOD,
                    payPrice: argData.PAY_PRICE,
                    payCurrCd: argData.PAY_CURR_CD,
                    facInQty: argData.FAC_IN_QTY,
                    facOutQty: argData.FAC_OUT_QTY,
                    productQty: argData.PRODUCT_QTY,
                    finishQty: argData.FINISH_QTY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL INSERT:",
                JSON.stringify(data.createKSV_INVENTORY_MATERIAL),
            );
            return data.createKSV_INVENTORY_MATERIAL;
        } catch (e) {
            console.log(
                "KSV_INVENTORY_MATERIAL INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_INVENTORY_MATERIAL(
                        $updateKsvInventoryMaterialId: Int!
                        $poCd: String
                        $matlCd: String
                        $facInQtyPeriod: Float
                        $payPrice: Float
                        $payCurrCd: String
                        $facInQty: Float
                        $facOutQty: Float
                        $productQty: Float
                        $finishQty: Float
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_INVENTORY_MATERIAL(
                            id: $updateKsvInventoryMaterialId
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            FAC_IN_QTY_PERIOD: $facInQtyPeriod
                            PAY_PRICE: $payPrice
                            PAY_CURR_CD: $payCurrCd
                            FAC_IN_QTY: $facInQty
                            FAC_OUT_QTY: $facOutQty
                            PRODUCT_QTY: $productQty
                            FINISH_QTY: $finishQty
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            FAC_IN_QTY_PERIOD
                            PAY_PRICE
                            PAY_CURR_CD
                            FAC_IN_QTY
                            FAC_OUT_QTY
                            PRODUCT_QTY
                            FINISH_QTY
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvInventoryMaterialId: argData.id,
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    facInQtyPeriod: argData.FAC_IN_QTY_PERIOD,
                    payPrice: argData.PAY_PRICE,
                    payCurrCd: argData.PAY_CURR_CD,
                    facInQty: argData.FAC_IN_QTY,
                    facOutQty: argData.FAC_OUT_QTY,
                    productQty: argData.PRODUCT_QTY,
                    finishQty: argData.FINISH_QTY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL UPDATE:",
                JSON.stringify(data.updateKSV_INVENTORY_MATERIAL),
            );
            return data.updateKSV_INVENTORY_MATERIAL;
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
                    mutation DeleteKSV_INVENTORY_MATERIAL(
                        $deleteKsvInventoryMaterialId: Int!
                    ) {
                        deleteKSV_INVENTORY_MATERIAL(
                            id: $deleteKsvInventoryMaterialId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInventoryMaterialId: argData.id,
                },
            });
            console.log(
                "KSV_INVENTORY_MATERIAL DELETE:",
                JSON.stringify(data.deleteKSV_INVENTORY_MATERIAL),
            );
            return data.deleteKSV_INVENTORY_MATERIAL;
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
                    mutation MgrKsvInventoryMaterialDeletes(
                        $ids: [InputMgrKsvInventoryMaterialDeletes!]!
                    ) {
                        mgrKsvInventoryMaterialDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_INVENTORY_MATERIAL DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
