/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_MEM_QTY {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MEM_QTY {
                        allQueryKSV_ORDER_MEM_QTY {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            SIZE_GROUP
                            CONF_USER
                            CONF_DATETIME
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MEM_QTY:",
                JSON.stringify(data.allQueryKSV_ORDER_MEM_QTY.length),
            );
            return data.allQueryKSV_ORDER_MEM_QTY;
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
                    query MgrKsvOrderMemQtyQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMemQtyQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            SIZE_GROUP
                            CONF_USER
                            CONF_DATETIME
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MEM_QTY:",
                JSON.stringify(data.mgrKsvOrderMemQtyQuery.length),
            );
            return data.mgrKsvOrderMemQtyQuery;
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
                    mutation CreateKSV_ORDER_MEM_QTY(
                        $orderCd: String
                        $prodCd: String
                        $addFlag: String
                        $price: Float
                        $totCnt: Int
                        $sizeCnt: String
                        $sizeGroup: String
                        $confUser: String
                        $confDatetime: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_MEM_QTY(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ADD_FLAG: $addFlag
                            PRICE: $price
                            TOT_CNT: $totCnt
                            SIZE_CNT: $sizeCnt
                            SIZE_GROUP: $sizeGroup
                            CONF_USER: $confUser
                            CONF_DATETIME: $confDatetime
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            SIZE_GROUP
                            CONF_USER
                            CONF_DATETIME
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    addFlag: argData.ADD_FLAG,
                    price: argData.PRICE,
                    totCnt: argData.TOT_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    sizeGroup: argData.SIZE_GROUP,
                    confUser: argData.CONF_USER,
                    confDatetime: argData.CONF_DATETIME,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_MEM_QTY INSERT:",
                JSON.stringify(data.createKSV_ORDER_MEM_QTY),
            );
            return data.createKSV_ORDER_MEM_QTY;
        } catch (e) {
            console.log("KSV_ORDER_MEM_QTY INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_MEM_QTY(
                        $updateKsvOrderMemQtyId: Int!
                        $orderCd: String
                        $prodCd: String
                        $addFlag: String
                        $price: Float
                        $totCnt: Int
                        $sizeCnt: String
                        $sizeGroup: String
                        $confUser: String
                        $confDatetime: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_MEM_QTY(
                            id: $updateKsvOrderMemQtyId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ADD_FLAG: $addFlag
                            PRICE: $price
                            TOT_CNT: $totCnt
                            SIZE_CNT: $sizeCnt
                            SIZE_GROUP: $sizeGroup
                            CONF_USER: $confUser
                            CONF_DATETIME: $confDatetime
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            ADD_FLAG
                            PRICE
                            TOT_CNT
                            SIZE_CNT
                            SIZE_GROUP
                            CONF_USER
                            CONF_DATETIME
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMemQtyId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    addFlag: argData.ADD_FLAG,
                    price: argData.PRICE,
                    totCnt: argData.TOT_CNT,
                    sizeCnt: argData.SIZE_CNT,
                    sizeGroup: argData.SIZE_GROUP,
                    confUser: argData.CONF_USER,
                    confDatetime: argData.CONF_DATETIME,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_MEM_QTY UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MEM_QTY),
            );
            return data.updateKSV_ORDER_MEM_QTY;
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
                    mutation DeleteKSV_ORDER_MEM_QTY(
                        $deleteKsvOrderMemQtyId: Int!
                    ) {
                        deleteKSV_ORDER_MEM_QTY(id: $deleteKsvOrderMemQtyId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMemQtyId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MEM_QTY DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MEM_QTY),
            );
            return data.deleteKSV_ORDER_MEM_QTY;
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
                    mutation MgrKsvOrderMemQtyDeletes(
                        $ids: [InputMgrKsvOrderMemQtyDeletes!]!
                    ) {
                        mgrKsvOrderMemQtyDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MEM_QTY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
