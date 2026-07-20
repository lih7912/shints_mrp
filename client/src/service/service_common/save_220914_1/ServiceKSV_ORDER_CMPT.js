/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_CMPT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_CMPT {
                        allQueryKSV_ORDER_CMPT {
                            id
                            ORDER_CD
                            NEGO_SEQ
                            NEGO_TYPE
                            BVT_CMPT
                            STS_CMPT
                            REMARK
                            REG_USER
                            REG_DATETIME
                            BVT_SCREEN_PRINT
                            BVT_HEAT_SILICON
                            BVT_EMBROIDERY
                            BVT_TPR
                            BVT_WELDING
                            BVT_QUILTING
                            BVT_DIGITAL_PRINT
                            BVT_LINE_CHARGE
                            BVT_LABEL_PRINT
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_CMPT:",
                JSON.stringify(data.allQueryKSV_ORDER_CMPT.length),
            );
            return data.allQueryKSV_ORDER_CMPT;
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
                    query MgrKsvOrderCmptQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderCmptQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            NEGO_SEQ
                            NEGO_TYPE
                            BVT_CMPT
                            STS_CMPT
                            REMARK
                            REG_USER
                            REG_DATETIME
                            BVT_SCREEN_PRINT
                            BVT_HEAT_SILICON
                            BVT_EMBROIDERY
                            BVT_TPR
                            BVT_WELDING
                            BVT_QUILTING
                            BVT_DIGITAL_PRINT
                            BVT_LINE_CHARGE
                            BVT_LABEL_PRINT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_CMPT:",
                JSON.stringify(data.mgrKsvOrderCmptQuery.length),
            );
            return data.mgrKsvOrderCmptQuery;
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
                    mutation CreateKSV_ORDER_CMPT(
                        $orderCd: String
                        $negoSeq: Int
                        $negoType: String
                        $bvtCmpt: Float
                        $stsCmpt: Float
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                        $bvtScreenPrint: Float
                        $bvtHeatSilicon: Float
                        $bvtEmbroidery: Float
                        $bvtTpr: Float
                        $bvtWelding: Float
                        $bvtQuilting: Float
                        $bvtDigitalPrint: Float
                        $bvtLineCharge: Float
                        $bvtLabelPrint: Float
                    ) {
                        createKSV_ORDER_CMPT(
                            ORDER_CD: $orderCd
                            NEGO_SEQ: $negoSeq
                            NEGO_TYPE: $negoType
                            BVT_CMPT: $bvtCmpt
                            STS_CMPT: $stsCmpt
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            BVT_SCREEN_PRINT: $bvtScreenPrint
                            BVT_HEAT_SILICON: $bvtHeatSilicon
                            BVT_EMBROIDERY: $bvtEmbroidery
                            BVT_TPR: $bvtTpr
                            BVT_WELDING: $bvtWelding
                            BVT_QUILTING: $bvtQuilting
                            BVT_DIGITAL_PRINT: $bvtDigitalPrint
                            BVT_LINE_CHARGE: $bvtLineCharge
                            BVT_LABEL_PRINT: $bvtLabelPrint
                        ) {
                            ORDER_CD
                            NEGO_SEQ
                            NEGO_TYPE
                            BVT_CMPT
                            STS_CMPT
                            REMARK
                            REG_USER
                            REG_DATETIME
                            BVT_SCREEN_PRINT
                            BVT_HEAT_SILICON
                            BVT_EMBROIDERY
                            BVT_TPR
                            BVT_WELDING
                            BVT_QUILTING
                            BVT_DIGITAL_PRINT
                            BVT_LINE_CHARGE
                            BVT_LABEL_PRINT
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    negoSeq: argData.NEGO_SEQ,
                    negoType: argData.NEGO_TYPE,
                    bvtCmpt: argData.BVT_CMPT,
                    stsCmpt: argData.STS_CMPT,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    bvtScreenPrint: argData.BVT_SCREEN_PRINT,
                    bvtHeatSilicon: argData.BVT_HEAT_SILICON,
                    bvtEmbroidery: argData.BVT_EMBROIDERY,
                    bvtTpr: argData.BVT_TPR,
                    bvtWelding: argData.BVT_WELDING,
                    bvtQuilting: argData.BVT_QUILTING,
                    bvtDigitalPrint: argData.BVT_DIGITAL_PRINT,
                    bvtLineCharge: argData.BVT_LINE_CHARGE,
                    bvtLabelPrint: argData.BVT_LABEL_PRINT,
                },
            });
            console.log(
                "KSV_ORDER_CMPT INSERT:",
                JSON.stringify(data.createKSV_ORDER_CMPT),
            );
            return data.createKSV_ORDER_CMPT;
        } catch (e) {
            console.log("KSV_ORDER_CMPT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_CMPT(
                        $updateKsvOrderCmptId: Int!
                        $orderCd: String
                        $negoSeq: Int
                        $negoType: String
                        $bvtCmpt: Float
                        $stsCmpt: Float
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                        $bvtScreenPrint: Float
                        $bvtHeatSilicon: Float
                        $bvtEmbroidery: Float
                        $bvtTpr: Float
                        $bvtWelding: Float
                        $bvtQuilting: Float
                        $bvtDigitalPrint: Float
                        $bvtLineCharge: Float
                        $bvtLabelPrint: Float
                    ) {
                        updateKSV_ORDER_CMPT(
                            id: $updateKsvOrderCmptId
                            ORDER_CD: $orderCd
                            NEGO_SEQ: $negoSeq
                            NEGO_TYPE: $negoType
                            BVT_CMPT: $bvtCmpt
                            STS_CMPT: $stsCmpt
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            BVT_SCREEN_PRINT: $bvtScreenPrint
                            BVT_HEAT_SILICON: $bvtHeatSilicon
                            BVT_EMBROIDERY: $bvtEmbroidery
                            BVT_TPR: $bvtTpr
                            BVT_WELDING: $bvtWelding
                            BVT_QUILTING: $bvtQuilting
                            BVT_DIGITAL_PRINT: $bvtDigitalPrint
                            BVT_LINE_CHARGE: $bvtLineCharge
                            BVT_LABEL_PRINT: $bvtLabelPrint
                        ) {
                            id
                            ORDER_CD
                            NEGO_SEQ
                            NEGO_TYPE
                            BVT_CMPT
                            STS_CMPT
                            REMARK
                            REG_USER
                            REG_DATETIME
                            BVT_SCREEN_PRINT
                            BVT_HEAT_SILICON
                            BVT_EMBROIDERY
                            BVT_TPR
                            BVT_WELDING
                            BVT_QUILTING
                            BVT_DIGITAL_PRINT
                            BVT_LINE_CHARGE
                            BVT_LABEL_PRINT
                        }
                    }
                `,
                variables: {
                    updateKsvOrderCmptId: argData.id,
                    orderCd: argData.ORDER_CD,
                    negoSeq: argData.NEGO_SEQ,
                    negoType: argData.NEGO_TYPE,
                    bvtCmpt: argData.BVT_CMPT,
                    stsCmpt: argData.STS_CMPT,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    bvtScreenPrint: argData.BVT_SCREEN_PRINT,
                    bvtHeatSilicon: argData.BVT_HEAT_SILICON,
                    bvtEmbroidery: argData.BVT_EMBROIDERY,
                    bvtTpr: argData.BVT_TPR,
                    bvtWelding: argData.BVT_WELDING,
                    bvtQuilting: argData.BVT_QUILTING,
                    bvtDigitalPrint: argData.BVT_DIGITAL_PRINT,
                    bvtLineCharge: argData.BVT_LINE_CHARGE,
                    bvtLabelPrint: argData.BVT_LABEL_PRINT,
                },
            });
            console.log(
                "KSV_ORDER_CMPT UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_CMPT),
            );
            return data.updateKSV_ORDER_CMPT;
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
                    mutation DeleteKSV_ORDER_CMPT($deleteKsvOrderCmptId: Int!) {
                        deleteKSV_ORDER_CMPT(id: $deleteKsvOrderCmptId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderCmptId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_CMPT DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_CMPT),
            );
            return data.deleteKSV_ORDER_CMPT;
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
                    mutation MgrKsvOrderCmptDeletes(
                        $ids: [InputMgrKsvOrderCmptDeletes!]!
                    ) {
                        mgrKsvOrderCmptDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_CMPT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
