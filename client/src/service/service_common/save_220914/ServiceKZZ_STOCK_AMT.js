/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_STOCK_AMT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_STOCK_AMT {
                        allQueryKZZ_STOCK_AMT {
                            id
                            YYMM
                            FACTORY_CD
                            BUYER_CD
                            CURR_CD
                            CURR_SEQ
                            BEF_AMT
                            IN_AMT
                            OUT_AMT
                            TOT_AMT
                        }
                    }
                `,
            });
            console.log(
                "KZZ_STOCK_AMT:",
                JSON.stringify(data.allQueryKZZ_STOCK_AMT.length),
            );
            return data.allQueryKZZ_STOCK_AMT;
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
                    query MgrKzzStockAmtQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzStockAmtQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            YYMM
                            FACTORY_CD
                            BUYER_CD
                            CURR_CD
                            CURR_SEQ
                            BEF_AMT
                            IN_AMT
                            OUT_AMT
                            TOT_AMT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_STOCK_AMT:",
                JSON.stringify(data.mgrKzzStockAmtQuery.length),
            );
            return data.mgrKzzStockAmtQuery;
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
                    mutation CreateKZZ_STOCK_AMT(
                        $yymm: String
                        $factoryCd: String
                        $buyerCd: String
                        $currCd: String
                        $currSeq: Int
                        $befAmt: Float
                        $inAmt: Float
                        $outAmt: Float
                        $totAmt: Float
                    ) {
                        createKZZ_STOCK_AMT(
                            YYMM: $yymm
                            FACTORY_CD: $factoryCd
                            BUYER_CD: $buyerCd
                            CURR_CD: $currCd
                            CURR_SEQ: $currSeq
                            BEF_AMT: $befAmt
                            IN_AMT: $inAmt
                            OUT_AMT: $outAmt
                            TOT_AMT: $totAmt
                        ) {
                            YYMM
                            FACTORY_CD
                            BUYER_CD
                            CURR_CD
                            CURR_SEQ
                            BEF_AMT
                            IN_AMT
                            OUT_AMT
                            TOT_AMT
                        }
                    }
                `,
                variables: {
                    yymm: argData.YYMM,
                    factoryCd: argData.FACTORY_CD,
                    buyerCd: argData.BUYER_CD,
                    currCd: argData.CURR_CD,
                    currSeq: argData.CURR_SEQ,
                    befAmt: argData.BEF_AMT,
                    inAmt: argData.IN_AMT,
                    outAmt: argData.OUT_AMT,
                    totAmt: argData.TOT_AMT,
                },
            });
            console.log(
                "KZZ_STOCK_AMT INSERT:",
                JSON.stringify(data.createKZZ_STOCK_AMT),
            );
            return data.createKZZ_STOCK_AMT;
        } catch (e) {
            console.log("KZZ_STOCK_AMT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_STOCK_AMT(
                        $updateKzzStockAmtId: Int!
                        $yymm: String
                        $factoryCd: String
                        $buyerCd: String
                        $currCd: String
                        $currSeq: Int
                        $befAmt: Float
                        $inAmt: Float
                        $outAmt: Float
                        $totAmt: Float
                    ) {
                        updateKZZ_STOCK_AMT(
                            id: $updateKzzStockAmtId
                            YYMM: $yymm
                            FACTORY_CD: $factoryCd
                            BUYER_CD: $buyerCd
                            CURR_CD: $currCd
                            CURR_SEQ: $currSeq
                            BEF_AMT: $befAmt
                            IN_AMT: $inAmt
                            OUT_AMT: $outAmt
                            TOT_AMT: $totAmt
                        ) {
                            id
                            YYMM
                            FACTORY_CD
                            BUYER_CD
                            CURR_CD
                            CURR_SEQ
                            BEF_AMT
                            IN_AMT
                            OUT_AMT
                            TOT_AMT
                        }
                    }
                `,
                variables: {
                    updateKzzStockAmtId: argData.id,
                    yymm: argData.YYMM,
                    factoryCd: argData.FACTORY_CD,
                    buyerCd: argData.BUYER_CD,
                    currCd: argData.CURR_CD,
                    currSeq: argData.CURR_SEQ,
                    befAmt: argData.BEF_AMT,
                    inAmt: argData.IN_AMT,
                    outAmt: argData.OUT_AMT,
                    totAmt: argData.TOT_AMT,
                },
            });
            console.log(
                "KZZ_STOCK_AMT UPDATE:",
                JSON.stringify(data.updateKZZ_STOCK_AMT),
            );
            return data.updateKZZ_STOCK_AMT;
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
                    mutation DeleteKZZ_STOCK_AMT($deleteKzzStockAmtId: Int!) {
                        deleteKZZ_STOCK_AMT(id: $deleteKzzStockAmtId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzStockAmtId: argData.id,
                },
            });
            console.log(
                "KZZ_STOCK_AMT DELETE:",
                JSON.stringify(data.deleteKZZ_STOCK_AMT),
            );
            return data.deleteKZZ_STOCK_AMT;
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
                    mutation MgrKzzStockAmtDeletes(
                        $ids: [InputMgrKzzStockAmtDeletes!]!
                    ) {
                        mgrKzzStockAmtDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_STOCK_AMT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
