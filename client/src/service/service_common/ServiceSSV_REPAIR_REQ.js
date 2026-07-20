/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceSSV_REPAIR_REQ {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_REPAIR_REQ {
                        allQuerySSV_REPAIR_REQ {
                            id
                            REQ_NO
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            AGENT_CD
                            WARE_CD
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SSV_REPAIR_REQ:",
                JSON.stringify(data.allQuerySSV_REPAIR_REQ.length),
            );
            return data.allQuerySSV_REPAIR_REQ;
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
                    query MgrSsvRepairReqQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvRepairReqQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REQ_NO
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            AGENT_CD
                            WARE_CD
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_REPAIR_REQ:",
                JSON.stringify(data.mgrSsvRepairReqQuery.length),
            );
            return data.mgrSsvRepairReqQuery;
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
                    mutation CreateSSV_REPAIR_REQ(
                        $reqNo: String
                        $reqDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $reqQty: Int
                        $repairPrice: Int
                        $totAmt: Int
                        $agentCd: String
                        $wareCd: String
                        $remark: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createSSV_REPAIR_REQ(
                            REQ_NO: $reqNo
                            REQ_DATE: $reqDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            REQ_QTY: $reqQty
                            REPAIR_PRICE: $repairPrice
                            TOT_AMT: $totAmt
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            REQ_NO
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            AGENT_CD
                            WARE_CD
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    reqNo: argData.REQ_NO,
                    reqDate: argData.REQ_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    reqQty: argData.REQ_QTY,
                    repairPrice: argData.REPAIR_PRICE,
                    totAmt: argData.TOT_AMT,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_REPAIR_REQ INSERT:",
                JSON.stringify(data.createSSV_REPAIR_REQ),
            );
            return data.createSSV_REPAIR_REQ;
        } catch (e) {
            console.log("SSV_REPAIR_REQ INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateSSV_REPAIR_REQ(
                        $updateSsvRepairReqId: Int!
                        $reqNo: String
                        $reqDate: String
                        $orderCd: String
                        $prodCd: String
                        $size: String
                        $reqQty: Int
                        $repairPrice: Int
                        $totAmt: Int
                        $agentCd: String
                        $wareCd: String
                        $remark: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateSSV_REPAIR_REQ(
                            id: $updateSsvRepairReqId
                            REQ_NO: $reqNo
                            REQ_DATE: $reqDate
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SIZE: $size
                            REQ_QTY: $reqQty
                            REPAIR_PRICE: $repairPrice
                            TOT_AMT: $totAmt
                            AGENT_CD: $agentCd
                            WARE_CD: $wareCd
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            REQ_NO
                            REQ_DATE
                            ORDER_CD
                            PROD_CD
                            SIZE
                            REQ_QTY
                            REPAIR_PRICE
                            TOT_AMT
                            AGENT_CD
                            WARE_CD
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateSsvRepairReqId: argData.id,
                    reqNo: argData.REQ_NO,
                    reqDate: argData.REQ_DATE,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    size: argData.SIZE,
                    reqQty: argData.REQ_QTY,
                    repairPrice: argData.REPAIR_PRICE,
                    totAmt: argData.TOT_AMT,
                    agentCd: argData.AGENT_CD,
                    wareCd: argData.WARE_CD,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_REPAIR_REQ UPDATE:",
                JSON.stringify(data.updateSSV_REPAIR_REQ),
            );
            return data.updateSSV_REPAIR_REQ;
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
                    mutation DeleteSSV_REPAIR_REQ($deleteSsvRepairReqId: Int!) {
                        deleteSSV_REPAIR_REQ(id: $deleteSsvRepairReqId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvRepairReqId: argData.id,
                },
            });
            console.log(
                "SSV_REPAIR_REQ DELETE:",
                JSON.stringify(data.deleteSSV_REPAIR_REQ),
            );
            return data.deleteSSV_REPAIR_REQ;
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
                    mutation MgrSsvRepairReqDeletes(
                        $ids: [InputMgrSsvRepairReqDeletes!]!
                    ) {
                        mgrSsvRepairReqDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_REPAIR_REQ DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
