/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_CREDIT_COST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_CREDIT_COST {
                        allQueryKZZ_CREDIT_COST {
                            id
                            CREDIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            CREDIT_AMOUNT
                            CURR_CD
                            FACTORY_CD
                            REMARK
                            REF_NO
                            PRE_FLAG
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_CREDIT_COST:",
                JSON.stringify(data.allQueryKZZ_CREDIT_COST.length),
            );
            return data.allQueryKZZ_CREDIT_COST;
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
                    query MgrKzzCreditCostQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzCreditCostQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CREDIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            CREDIT_AMOUNT
                            CURR_CD
                            FACTORY_CD
                            REMARK
                            REF_NO
                            PRE_FLAG
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
                "KZZ_CREDIT_COST:",
                JSON.stringify(data.mgrKzzCreditCostQuery.length),
            );
            return data.mgrKzzCreditCostQuery;
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
                    mutation CreateKZZ_CREDIT_COST(
                        $creditCd: String
                        $seq: Int
                        $yy: Int
                        $crdbCd: String
                        $styleCd: String
                        $buyerCd: String
                        $creditAmount: Float
                        $currCd: String
                        $factoryCd: String
                        $remark: String
                        $refNo: String
                        $preFlag: String
                        $endFlag: String
                        $endDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_CREDIT_COST(
                            CREDIT_CD: $creditCd
                            SEQ: $seq
                            YY: $yy
                            CRDB_CD: $crdbCd
                            STYLE_CD: $styleCd
                            BUYER_CD: $buyerCd
                            CREDIT_AMOUNT: $creditAmount
                            CURR_CD: $currCd
                            FACTORY_CD: $factoryCd
                            REMARK: $remark
                            REF_NO: $refNo
                            PRE_FLAG: $preFlag
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            CREDIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            CREDIT_AMOUNT
                            CURR_CD
                            FACTORY_CD
                            REMARK
                            REF_NO
                            PRE_FLAG
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    creditCd: argData.CREDIT_CD,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    crdbCd: argData.CRDB_CD,
                    styleCd: argData.STYLE_CD,
                    buyerCd: argData.BUYER_CD,
                    creditAmount: argData.CREDIT_AMOUNT,
                    currCd: argData.CURR_CD,
                    factoryCd: argData.FACTORY_CD,
                    remark: argData.REMARK,
                    refNo: argData.REF_NO,
                    preFlag: argData.PRE_FLAG,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_CREDIT_COST INSERT:",
                JSON.stringify(data.createKZZ_CREDIT_COST),
            );
            return data.createKZZ_CREDIT_COST;
        } catch (e) {
            console.log("KZZ_CREDIT_COST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_CREDIT_COST(
                        $updateKzzCreditCostId: Int!
                        $creditCd: String
                        $seq: Int
                        $yy: Int
                        $crdbCd: String
                        $styleCd: String
                        $buyerCd: String
                        $creditAmount: Float
                        $currCd: String
                        $factoryCd: String
                        $remark: String
                        $refNo: String
                        $preFlag: String
                        $endFlag: String
                        $endDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_CREDIT_COST(
                            id: $updateKzzCreditCostId
                            CREDIT_CD: $creditCd
                            SEQ: $seq
                            YY: $yy
                            CRDB_CD: $crdbCd
                            STYLE_CD: $styleCd
                            BUYER_CD: $buyerCd
                            CREDIT_AMOUNT: $creditAmount
                            CURR_CD: $currCd
                            FACTORY_CD: $factoryCd
                            REMARK: $remark
                            REF_NO: $refNo
                            PRE_FLAG: $preFlag
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            CREDIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            CREDIT_AMOUNT
                            CURR_CD
                            FACTORY_CD
                            REMARK
                            REF_NO
                            PRE_FLAG
                            END_FLAG
                            END_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzCreditCostId: argData.id,
                    creditCd: argData.CREDIT_CD,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    crdbCd: argData.CRDB_CD,
                    styleCd: argData.STYLE_CD,
                    buyerCd: argData.BUYER_CD,
                    creditAmount: argData.CREDIT_AMOUNT,
                    currCd: argData.CURR_CD,
                    factoryCd: argData.FACTORY_CD,
                    remark: argData.REMARK,
                    refNo: argData.REF_NO,
                    preFlag: argData.PRE_FLAG,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_CREDIT_COST UPDATE:",
                JSON.stringify(data.updateKZZ_CREDIT_COST),
            );
            return data.updateKZZ_CREDIT_COST;
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
                    mutation DeleteKZZ_CREDIT_COST(
                        $deleteKzzCreditCostId: Int!
                    ) {
                        deleteKZZ_CREDIT_COST(id: $deleteKzzCreditCostId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzCreditCostId: argData.id,
                },
            });
            console.log(
                "KZZ_CREDIT_COST DELETE:",
                JSON.stringify(data.deleteKZZ_CREDIT_COST),
            );
            return data.deleteKZZ_CREDIT_COST;
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
                    mutation MgrKzzCreditCostDeletes(
                        $ids: [InputMgrKzzCreditCostDeletes!]!
                    ) {
                        mgrKzzCreditCostDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_CREDIT_COST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
