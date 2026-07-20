/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_REPAIR_OUT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_REPAIR_OUT {
                        allQuerySSV_REPAIR_OUT {
                            id
                            REPAIR_NO
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SSV_REPAIR_OUT:",
                JSON.stringify(data.allQuerySSV_REPAIR_OUT.length),
            );
            return data.allQuerySSV_REPAIR_OUT;
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
                    query MgrSsvRepairOutQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvRepairOutQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REPAIR_NO
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_REPAIR_OUT:",
                JSON.stringify(data.mgrSsvRepairOutQuery.length),
            );
            return data.mgrSsvRepairOutQuery;
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
                    mutation CreateSSV_REPAIR_OUT(
                        $repairNo: String
                        $outDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $outQty: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createSSV_REPAIR_OUT(
                            REPAIR_NO: $repairNo
                            OUT_DATE: $outDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            OUT_QTY: $outQty
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            REPAIR_NO
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    repairNo: argData.REPAIR_NO,
                    outDate: argData.OUT_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    outQty: argData.OUT_QTY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_REPAIR_OUT INSERT:",
                JSON.stringify(data.createSSV_REPAIR_OUT),
            );
            return data.createSSV_REPAIR_OUT;
        } catch (e) {
            console.log("SSV_REPAIR_OUT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_REPAIR_OUT(
                        $updateSsvRepairOutId: Int!
                        $repairNo: String
                        $outDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $outQty: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateSSV_REPAIR_OUT(
                            id: $updateSsvRepairOutId
                            REPAIR_NO: $repairNo
                            OUT_DATE: $outDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            OUT_QTY: $outQty
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            REPAIR_NO
                            OUT_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            OUT_QTY
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateSsvRepairOutId: argData.id,
                    repairNo: argData.REPAIR_NO,
                    outDate: argData.OUT_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    outQty: argData.OUT_QTY,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_REPAIR_OUT UPDATE:",
                JSON.stringify(data.updateSSV_REPAIR_OUT),
            );
            return data.updateSSV_REPAIR_OUT;
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
                    mutation DeleteSSV_REPAIR_OUT($deleteSsvRepairOutId: Int!) {
                        deleteSSV_REPAIR_OUT(id: $deleteSsvRepairOutId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvRepairOutId: argData.id,
                },
            });
            console.log(
                "SSV_REPAIR_OUT DELETE:",
                JSON.stringify(data.deleteSSV_REPAIR_OUT),
            );
            return data.deleteSSV_REPAIR_OUT;
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
                    mutation MgrSsvRepairOutDeletes(
                        $ids: [InputMgrSsvRepairOutDeletes!]!
                    ) {
                        mgrSsvRepairOutDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_REPAIR_OUT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
