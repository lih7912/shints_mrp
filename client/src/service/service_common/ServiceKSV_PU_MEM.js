/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PU_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PU_MEM {
                        allQueryKSV_PU_MEM {
                            id
                            PU_CD
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            STS_REMARK
                            READY_DATE
                            ETD
                            ETA
                            SHIP_WAY
                        }
                    }
                `,
            });
            console.log(
                "KSV_PU_MEM:",
                JSON.stringify(data.allQueryKSV_PU_MEM.length),
            );
            return data.allQueryKSV_PU_MEM;
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
                    query MgrKsvPuMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPuMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PU_CD
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            STS_REMARK
                            READY_DATE
                            ETD
                            ETA
                            SHIP_WAY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PU_MEM:",
                JSON.stringify(data.mgrKsvPuMemQuery.length),
            );
            return data.mgrKsvPuMemQuery;
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
                    mutation CreateKSV_PU_MEM(
                        $puCd: String
                        $poCd: String
                        $poSeq: Int
                        $regUser: String
                        $regDatetime: String
                        $stsRemark: String
                        $readyDate: String
                        $etd: String
                        $eta: String
                        $shipWay: String
                    ) {
                        createKSV_PU_MEM(
                            PU_CD: $puCd
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            STS_REMARK: $stsRemark
                            READY_DATE: $readyDate
                            ETD: $etd
                            ETA: $eta
                            SHIP_WAY: $shipWay
                        ) {
                            PU_CD
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            STS_REMARK
                            READY_DATE
                            ETD
                            ETA
                            SHIP_WAY
                        }
                    }
                `,
                variables: {
                    puCd: argData.PU_CD,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stsRemark: argData.STS_REMARK,
                    readyDate: argData.READY_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    shipWay: argData.SHIP_WAY,
                },
            });
            console.log(
                "KSV_PU_MEM INSERT:",
                JSON.stringify(data.createKSV_PU_MEM),
            );
            return data.createKSV_PU_MEM;
        } catch (e) {
            console.log("KSV_PU_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PU_MEM(
                        $updateKsvPuMemId: Int!
                        $puCd: String
                        $poCd: String
                        $poSeq: Int
                        $regUser: String
                        $regDatetime: String
                        $stsRemark: String
                        $readyDate: String
                        $etd: String
                        $eta: String
                        $shipWay: String
                    ) {
                        updateKSV_PU_MEM(
                            id: $updateKsvPuMemId
                            PU_CD: $puCd
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            STS_REMARK: $stsRemark
                            READY_DATE: $readyDate
                            ETD: $etd
                            ETA: $eta
                            SHIP_WAY: $shipWay
                        ) {
                            id
                            PU_CD
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            STS_REMARK
                            READY_DATE
                            ETD
                            ETA
                            SHIP_WAY
                        }
                    }
                `,
                variables: {
                    updateKsvPuMemId: argData.id,
                    puCd: argData.PU_CD,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    stsRemark: argData.STS_REMARK,
                    readyDate: argData.READY_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    shipWay: argData.SHIP_WAY,
                },
            });
            console.log(
                "KSV_PU_MEM UPDATE:",
                JSON.stringify(data.updateKSV_PU_MEM),
            );
            return data.updateKSV_PU_MEM;
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
                    mutation DeleteKSV_PU_MEM($deleteKsvPuMemId: Int!) {
                        deleteKSV_PU_MEM(id: $deleteKsvPuMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPuMemId: argData.id,
                },
            });
            console.log(
                "KSV_PU_MEM DELETE:",
                JSON.stringify(data.deleteKSV_PU_MEM),
            );
            return data.deleteKSV_PU_MEM;
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
                    mutation MgrKsvPuMemDeletes(
                        $ids: [InputMgrKsvPuMemDeletes!]!
                    ) {
                        mgrKsvPuMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PU_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
