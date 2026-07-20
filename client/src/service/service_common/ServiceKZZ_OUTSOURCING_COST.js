/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_OUTSOURCING_COST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_OUTSOURCING_COST {
                        allQueryKZZ_OUTSOURCING_COST {
                            id
                            OUTSOURCING_CD
                            SEQ
                            YY
                            ORDER_CD
                            ORDER_QTY
                            STYLE_CD
                            SUB_PATT_COST
                            SUB_SEW_COST
                            SUB_WELDING_COST
                            CURR_CD
                            BUYER_CD
                            REMARK
                            CONFIRM_FLAG
                            SHIP_DATE
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_OUTSOURCING_COST:",
                JSON.stringify(data.allQueryKZZ_OUTSOURCING_COST.length),
            );
            return data.allQueryKZZ_OUTSOURCING_COST;
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
                    query MgrKzzOutsourcingCostQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzOutsourcingCostQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            OUTSOURCING_CD
                            SEQ
                            YY
                            ORDER_CD
                            ORDER_QTY
                            STYLE_CD
                            SUB_PATT_COST
                            SUB_SEW_COST
                            SUB_WELDING_COST
                            CURR_CD
                            BUYER_CD
                            REMARK
                            CONFIRM_FLAG
                            SHIP_DATE
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_OUTSOURCING_COST:",
                JSON.stringify(data.mgrKzzOutsourcingCostQuery.length),
            );
            return data.mgrKzzOutsourcingCostQuery;
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
                    mutation CreateKZZ_OUTSOURCING_COST(
                        $outsourcingCd: String
                        $seq: Int
                        $yy: Int
                        $orderCd: String
                        $orderQty: Float
                        $styleCd: String
                        $subPattCost: Float
                        $subSewCost: Float
                        $subWeldingCost: Float
                        $currCd: String
                        $buyerCd: String
                        $remark: String
                        $confirmFlag: String
                        $shipDate: String
                        $endFlag: String
                        $endDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_OUTSOURCING_COST(
                            OUTSOURCING_CD: $outsourcingCd
                            SEQ: $seq
                            YY: $yy
                            ORDER_CD: $orderCd
                            ORDER_QTY: $orderQty
                            STYLE_CD: $styleCd
                            SUB_PATT_COST: $subPattCost
                            SUB_SEW_COST: $subSewCost
                            SUB_WELDING_COST: $subWeldingCost
                            CURR_CD: $currCd
                            BUYER_CD: $buyerCd
                            REMARK: $remark
                            CONFIRM_FLAG: $confirmFlag
                            SHIP_DATE: $shipDate
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            OUTSOURCING_CD
                            SEQ
                            YY
                            ORDER_CD
                            ORDER_QTY
                            STYLE_CD
                            SUB_PATT_COST
                            SUB_SEW_COST
                            SUB_WELDING_COST
                            CURR_CD
                            BUYER_CD
                            REMARK
                            CONFIRM_FLAG
                            SHIP_DATE
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    outsourcingCd: argData.OUTSOURCING_CD,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    orderCd: argData.ORDER_CD,
                    orderQty: argData.ORDER_QTY,
                    styleCd: argData.STYLE_CD,
                    subPattCost: argData.SUB_PATT_COST,
                    subSewCost: argData.SUB_SEW_COST,
                    subWeldingCost: argData.SUB_WELDING_COST,
                    currCd: argData.CURR_CD,
                    buyerCd: argData.BUYER_CD,
                    remark: argData.REMARK,
                    confirmFlag: argData.CONFIRM_FLAG,
                    shipDate: argData.SHIP_DATE,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_OUTSOURCING_COST INSERT:",
                JSON.stringify(data.createKZZ_OUTSOURCING_COST),
            );
            return data.createKZZ_OUTSOURCING_COST;
        } catch (e) {
            console.log(
                "KZZ_OUTSOURCING_COST INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_OUTSOURCING_COST(
                        $updateKzzOutsourcingCostId: Int!
                        $outsourcingCd: String
                        $seq: Int
                        $yy: Int
                        $orderCd: String
                        $orderQty: Float
                        $styleCd: String
                        $subPattCost: Float
                        $subSewCost: Float
                        $subWeldingCost: Float
                        $currCd: String
                        $buyerCd: String
                        $remark: String
                        $confirmFlag: String
                        $shipDate: String
                        $endFlag: String
                        $endDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_OUTSOURCING_COST(
                            id: $updateKzzOutsourcingCostId
                            OUTSOURCING_CD: $outsourcingCd
                            SEQ: $seq
                            YY: $yy
                            ORDER_CD: $orderCd
                            ORDER_QTY: $orderQty
                            STYLE_CD: $styleCd
                            SUB_PATT_COST: $subPattCost
                            SUB_SEW_COST: $subSewCost
                            SUB_WELDING_COST: $subWeldingCost
                            CURR_CD: $currCd
                            BUYER_CD: $buyerCd
                            REMARK: $remark
                            CONFIRM_FLAG: $confirmFlag
                            SHIP_DATE: $shipDate
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            OUTSOURCING_CD
                            SEQ
                            YY
                            ORDER_CD
                            ORDER_QTY
                            STYLE_CD
                            SUB_PATT_COST
                            SUB_SEW_COST
                            SUB_WELDING_COST
                            CURR_CD
                            BUYER_CD
                            REMARK
                            CONFIRM_FLAG
                            SHIP_DATE
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzOutsourcingCostId: argData.id,
                    outsourcingCd: argData.OUTSOURCING_CD,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    orderCd: argData.ORDER_CD,
                    orderQty: argData.ORDER_QTY,
                    styleCd: argData.STYLE_CD,
                    subPattCost: argData.SUB_PATT_COST,
                    subSewCost: argData.SUB_SEW_COST,
                    subWeldingCost: argData.SUB_WELDING_COST,
                    currCd: argData.CURR_CD,
                    buyerCd: argData.BUYER_CD,
                    remark: argData.REMARK,
                    confirmFlag: argData.CONFIRM_FLAG,
                    shipDate: argData.SHIP_DATE,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_OUTSOURCING_COST UPDATE:",
                JSON.stringify(data.updateKZZ_OUTSOURCING_COST),
            );
            return data.updateKZZ_OUTSOURCING_COST;
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
                    mutation DeleteKZZ_OUTSOURCING_COST(
                        $deleteKzzOutsourcingCostId: Int!
                    ) {
                        deleteKZZ_OUTSOURCING_COST(
                            id: $deleteKzzOutsourcingCostId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzOutsourcingCostId: argData.id,
                },
            });
            console.log(
                "KZZ_OUTSOURCING_COST DELETE:",
                JSON.stringify(data.deleteKZZ_OUTSOURCING_COST),
            );
            return data.deleteKZZ_OUTSOURCING_COST;
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
                    mutation MgrKzzOutsourcingCostDeletes(
                        $ids: [InputMgrKzzOutsourcingCostDeletes!]!
                    ) {
                        mgrKzzOutsourcingCostDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_OUTSOURCING_COST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
