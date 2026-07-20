/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_DEBIT_COST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_DEBIT_COST {
                        allQueryKZZ_DEBIT_COST {
                            id
                            DEBIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            DEBIT_AMOUNT
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
                "KZZ_DEBIT_COST:",
                JSON.stringify(data.allQueryKZZ_DEBIT_COST.length),
            );
            return data.allQueryKZZ_DEBIT_COST;
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
                    query MgrKzzDebitCostQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzDebitCostQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            DEBIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            DEBIT_AMOUNT
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
                "KZZ_DEBIT_COST:",
                JSON.stringify(data.mgrKzzDebitCostQuery.length),
            );
            return data.mgrKzzDebitCostQuery;
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
                    mutation CreateKZZ_DEBIT_COST(
                        $debitCd: String
                        $seq: Int
                        $yy: Int
                        $crdbCd: String
                        $styleCd: String
                        $buyerCd: String
                        $debitAmount: Float
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
                        createKZZ_DEBIT_COST(
                            DEBIT_CD: $debitCd
                            SEQ: $seq
                            YY: $yy
                            CRDB_CD: $crdbCd
                            STYLE_CD: $styleCd
                            BUYER_CD: $buyerCd
                            DEBIT_AMOUNT: $debitAmount
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
                            DEBIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            DEBIT_AMOUNT
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
                    debitCd: argData.DEBIT_CD,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    crdbCd: argData.CRDB_CD,
                    styleCd: argData.STYLE_CD,
                    buyerCd: argData.BUYER_CD,
                    debitAmount: argData.DEBIT_AMOUNT,
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
                "KZZ_DEBIT_COST INSERT:",
                JSON.stringify(data.createKZZ_DEBIT_COST),
            );
            return data.createKZZ_DEBIT_COST;
        } catch (e) {
            console.log("KZZ_DEBIT_COST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_DEBIT_COST(
                        $updateKzzDebitCostId: Int!
                        $debitCd: String
                        $seq: Int
                        $yy: Int
                        $crdbCd: String
                        $styleCd: String
                        $buyerCd: String
                        $debitAmount: Float
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
                        updateKZZ_DEBIT_COST(
                            id: $updateKzzDebitCostId
                            DEBIT_CD: $debitCd
                            SEQ: $seq
                            YY: $yy
                            CRDB_CD: $crdbCd
                            STYLE_CD: $styleCd
                            BUYER_CD: $buyerCd
                            DEBIT_AMOUNT: $debitAmount
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
                            DEBIT_CD
                            SEQ
                            YY
                            CRDB_CD
                            STYLE_CD
                            BUYER_CD
                            DEBIT_AMOUNT
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
                    updateKzzDebitCostId: argData.id,
                    debitCd: argData.DEBIT_CD,
                    seq: argData.SEQ,
                    yy: argData.YY,
                    crdbCd: argData.CRDB_CD,
                    styleCd: argData.STYLE_CD,
                    buyerCd: argData.BUYER_CD,
                    debitAmount: argData.DEBIT_AMOUNT,
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
                "KZZ_DEBIT_COST UPDATE:",
                JSON.stringify(data.updateKZZ_DEBIT_COST),
            );
            return data.updateKZZ_DEBIT_COST;
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
                    mutation DeleteKZZ_DEBIT_COST($deleteKzzDebitCostId: Int!) {
                        deleteKZZ_DEBIT_COST(id: $deleteKzzDebitCostId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzDebitCostId: argData.id,
                },
            });
            console.log(
                "KZZ_DEBIT_COST DELETE:",
                JSON.stringify(data.deleteKZZ_DEBIT_COST),
            );
            return data.deleteKZZ_DEBIT_COST;
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
                    mutation MgrKzzDebitCostDeletes(
                        $ids: [InputMgrKzzDebitCostDeletes!]!
                    ) {
                        mgrKzzDebitCostDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_DEBIT_COST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
