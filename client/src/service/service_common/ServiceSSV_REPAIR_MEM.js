/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceSSV_REPAIR_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_REPAIR_MEM {
                        allQuerySSV_REPAIR_MEM {
                            id
                            REPAIR_NO
                            REQ_NO
                            IN_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            IN_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            OUT_QTY
                            AGENT_CD
                            WARE_CD
                            REMARK
                            REPAIR_STATUS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SSV_REPAIR_MEM:",
                JSON.stringify(data.allQuerySSV_REPAIR_MEM.length),
            );
            return data.allQuerySSV_REPAIR_MEM;
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
                    query MgrSsvRepairMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvRepairMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REPAIR_NO
                            REQ_NO
                            IN_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            IN_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            OUT_QTY
                            AGENT_CD
                            WARE_CD
                            REMARK
                            REPAIR_STATUS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_REPAIR_MEM:",
                JSON.stringify(data.mgrSsvRepairMemQuery.length),
            );
            return data.mgrSsvRepairMemQuery;
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
                    mutation CreateSSV_REPAIR_MEM(
                        $repairNo: String
                        $reqNo: String
                        $inDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $inQty: Int
                        $repairPrice: Int
                        $totAmt: Int
                        $outQty: Int
                        $agentCd: String
                        $wareCd: String
                        $remark: String
                        $repairStatus: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createSSV_REPAIR_MEM(
                            REPAIR_NO: $repairNo
                            REQ_NO: $reqNo
                            IN_DATE: $inDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            IN_QTY: $inQty
                            REPAIR_PRICE: $repairPrice
                            TOT_AMT: $totAmt
                            OUT_QTY: $outQty
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            REMARK: $remark
                            REPAIR_STATUS: $repairStatus
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            REPAIR_NO
                            REQ_NO
                            IN_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            IN_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            OUT_QTY
                            AGENT_CD
                            WARE_CD
                            REMARK
                            REPAIR_STATUS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    repairNo: argData.REPAIR_NO,
                    reqNo: argData.REQ_NO,
                    inDate: argData.IN_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    inQty: argData.IN_QTY,
                    repairPrice: argData.REPAIR_PRICE,
                    totAmt: argData.TOT_AMT,
                    outQty: argData.OUT_QTY,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    remark: argData.REMARK,
                    repairStatus: argData.REPAIR_STATUS,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_REPAIR_MEM INSERT:",
                JSON.stringify(data.createSSV_REPAIR_MEM),
            );
            return data.createSSV_REPAIR_MEM;
        } catch (e) {
            console.log("SSV_REPAIR_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateSSV_REPAIR_MEM(
                        $updateSsvRepairMemId: Int!
                        $repairNo: String
                        $reqNo: String
                        $inDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $inQty: Int
                        $repairPrice: Int
                        $totAmt: Int
                        $outQty: Int
                        $agentCd: String
                        $wareCd: String
                        $remark: String
                        $repairStatus: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateSSV_REPAIR_MEM(
                            id: $updateSsvRepairMemId
                            REPAIR_NO: $repairNo
                            REQ_NO: $reqNo
                            IN_DATE: $inDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            IN_QTY: $inQty
                            REPAIR_PRICE: $repairPrice
                            TOT_AMT: $totAmt
                            OUT_QTY: $outQty
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            REMARK: $remark
                            REPAIR_STATUS: $repairStatus
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            REPAIR_NO
                            REQ_NO
                            IN_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            IN_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            OUT_QTY
                            AGENT_CD
                            WARE_CD
                            REMARK
                            REPAIR_STATUS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateSsvRepairMemId: argData.id,
                    repairNo: argData.REPAIR_NO,
                    reqNo: argData.REQ_NO,
                    inDate: argData.IN_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    inQty: argData.IN_QTY,
                    repairPrice: argData.REPAIR_PRICE,
                    totAmt: argData.TOT_AMT,
                    outQty: argData.OUT_QTY,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    remark: argData.REMARK,
                    repairStatus: argData.REPAIR_STATUS,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_REPAIR_MEM UPDATE:",
                JSON.stringify(data.updateSSV_REPAIR_MEM),
            );
            return data.updateSSV_REPAIR_MEM;
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
                    mutation DeleteSSV_REPAIR_MEM($deleteSsvRepairMemId: Int!) {
                        deleteSSV_REPAIR_MEM(id: $deleteSsvRepairMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvRepairMemId: argData.id,
                },
            });
            console.log(
                "SSV_REPAIR_MEM DELETE:",
                JSON.stringify(data.deleteSSV_REPAIR_MEM),
            );
            return data.deleteSSV_REPAIR_MEM;
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
                    mutation MgrSsvRepairMemDeletes(
                        $ids: [InputMgrSsvRepairMemDeletes!]!
                    ) {
                        mgrSsvRepairMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_REPAIR_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
