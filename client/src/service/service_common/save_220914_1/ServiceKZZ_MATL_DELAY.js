/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_MATL_DELAY {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_MATL_DELAY {
                        allQueryKZZ_MATL_DELAY {
                            id
                            SEQ
                            PO_CD
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            END_FLAG
                            BUYER_CD
                            EX_IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_MATL_DELAY:",
                JSON.stringify(data.allQueryKZZ_MATL_DELAY.length),
            );
            return data.allQueryKZZ_MATL_DELAY;
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
                    query MgrKzzMatlDelayQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzMatlDelayQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            SEQ
                            PO_CD
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            END_FLAG
                            BUYER_CD
                            EX_IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_MATL_DELAY:",
                JSON.stringify(data.mgrKzzMatlDelayQuery.length),
            );
            return data.mgrKzzMatlDelayQuery;
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
                    mutation CreateKZZ_MATL_DELAY(
                        $seq: Int
                        $poCd: String
                        $matlCd: String
                        $poConfDate: String
                        $orgEtd: String
                        $orgEta: String
                        $needQty: Float
                        $remainQty: Float
                        $shipQty: Float
                        $cutDate: String
                        $etd: String
                        $eta: String
                        $delayReason: String
                        $deliveryType: String
                        $fareType: String
                        $remark: String
                        $endFlag: String
                        $buyerCd: String
                        $exInDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_MATL_DELAY(
                            SEQ: $seq
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            PO_CONF_DATE: $poConfDate
                            ORG_ETD: $orgEtd
                            ORG_ETA: $orgEta
                            NEED_QTY: $needQty
                            REMAIN_QTY: $remainQty
                            SHIP_QTY: $shipQty
                            CUT_DATE: $cutDate
                            ETD: $etd
                            ETA: $eta
                            DELAY_REASON: $delayReason
                            DELIVERY_TYPE: $deliveryType
                            FARE_TYPE: $fareType
                            REMARK: $remark
                            END_FLAG: $endFlag
                            BUYER_CD: $buyerCd
                            EX_IN_DATE: $exInDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            SEQ
                            PO_CD
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            END_FLAG
                            BUYER_CD
                            EX_IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    seq: argData.SEQ,
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    poConfDate: argData.PO_CONF_DATE,
                    orgEtd: argData.ORG_ETD,
                    orgEta: argData.ORG_ETA,
                    needQty: argData.NEED_QTY,
                    remainQty: argData.REMAIN_QTY,
                    shipQty: argData.SHIP_QTY,
                    cutDate: argData.CUT_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    delayReason: argData.DELAY_REASON,
                    deliveryType: argData.DELIVERY_TYPE,
                    fareType: argData.FARE_TYPE,
                    remark: argData.REMARK,
                    endFlag: argData.END_FLAG,
                    buyerCd: argData.BUYER_CD,
                    exInDate: argData.EX_IN_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_MATL_DELAY INSERT:",
                JSON.stringify(data.createKZZ_MATL_DELAY),
            );
            return data.createKZZ_MATL_DELAY;
        } catch (e) {
            console.log("KZZ_MATL_DELAY INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_MATL_DELAY(
                        $updateKzzMatlDelayId: Int!
                        $seq: Int
                        $poCd: String
                        $matlCd: String
                        $poConfDate: String
                        $orgEtd: String
                        $orgEta: String
                        $needQty: Float
                        $remainQty: Float
                        $shipQty: Float
                        $cutDate: String
                        $etd: String
                        $eta: String
                        $delayReason: String
                        $deliveryType: String
                        $fareType: String
                        $remark: String
                        $endFlag: String
                        $buyerCd: String
                        $exInDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_MATL_DELAY(
                            id: $updateKzzMatlDelayId
                            SEQ: $seq
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            PO_CONF_DATE: $poConfDate
                            ORG_ETD: $orgEtd
                            ORG_ETA: $orgEta
                            NEED_QTY: $needQty
                            REMAIN_QTY: $remainQty
                            SHIP_QTY: $shipQty
                            CUT_DATE: $cutDate
                            ETD: $etd
                            ETA: $eta
                            DELAY_REASON: $delayReason
                            DELIVERY_TYPE: $deliveryType
                            FARE_TYPE: $fareType
                            REMARK: $remark
                            END_FLAG: $endFlag
                            BUYER_CD: $buyerCd
                            EX_IN_DATE: $exInDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            SEQ
                            PO_CD
                            MATL_CD
                            PO_CONF_DATE
                            ORG_ETD
                            ORG_ETA
                            NEED_QTY
                            REMAIN_QTY
                            SHIP_QTY
                            CUT_DATE
                            ETD
                            ETA
                            DELAY_REASON
                            DELIVERY_TYPE
                            FARE_TYPE
                            REMARK
                            END_FLAG
                            BUYER_CD
                            EX_IN_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzMatlDelayId: argData.id,
                    seq: argData.SEQ,
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    poConfDate: argData.PO_CONF_DATE,
                    orgEtd: argData.ORG_ETD,
                    orgEta: argData.ORG_ETA,
                    needQty: argData.NEED_QTY,
                    remainQty: argData.REMAIN_QTY,
                    shipQty: argData.SHIP_QTY,
                    cutDate: argData.CUT_DATE,
                    etd: argData.ETD,
                    eta: argData.ETA,
                    delayReason: argData.DELAY_REASON,
                    deliveryType: argData.DELIVERY_TYPE,
                    fareType: argData.FARE_TYPE,
                    remark: argData.REMARK,
                    endFlag: argData.END_FLAG,
                    buyerCd: argData.BUYER_CD,
                    exInDate: argData.EX_IN_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_MATL_DELAY UPDATE:",
                JSON.stringify(data.updateKZZ_MATL_DELAY),
            );
            return data.updateKZZ_MATL_DELAY;
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
                    mutation DeleteKZZ_MATL_DELAY($deleteKzzMatlDelayId: Int!) {
                        deleteKZZ_MATL_DELAY(id: $deleteKzzMatlDelayId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzMatlDelayId: argData.id,
                },
            });
            console.log(
                "KZZ_MATL_DELAY DELETE:",
                JSON.stringify(data.deleteKZZ_MATL_DELAY),
            );
            return data.deleteKZZ_MATL_DELAY;
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
                    mutation MgrKzzMatlDelayDeletes(
                        $ids: [InputMgrKzzMatlDelayDeletes!]!
                    ) {
                        mgrKzzMatlDelayDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_MATL_DELAY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
