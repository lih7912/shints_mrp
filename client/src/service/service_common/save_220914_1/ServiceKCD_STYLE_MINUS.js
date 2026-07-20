/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_STYLE_MINUS {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_STYLE_MINUS {
                        allQueryKCD_STYLE_MINUS {
                            id
                            STYLE_CD
                            PROD_CD
                            SIZE_SEQ
                            SIZE_VAL
                            MINUS_LIMIT
                            EXP_DATE
                        }
                    }
                `,
            });
            console.log(
                "KCD_STYLE_MINUS:",
                JSON.stringify(data.allQueryKCD_STYLE_MINUS.length),
            );
            return data.allQueryKCD_STYLE_MINUS;
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
                    query MgrKcdStyleMinusQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdStyleMinusQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STYLE_CD
                            PROD_CD
                            SIZE_SEQ
                            SIZE_VAL
                            MINUS_LIMIT
                            EXP_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_STYLE_MINUS:",
                JSON.stringify(data.mgrKcdStyleMinusQuery.length),
            );
            return data.mgrKcdStyleMinusQuery;
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
                    mutation CreateKCD_STYLE_MINUS(
                        $styleCd: String
                        $prodCd: String
                        $sizeSeq: Int
                        $sizeVal: String
                        $minusLimit: Int
                        $expDate: String
                    ) {
                        createKCD_STYLE_MINUS(
                            STYLE_CD: $styleCd
                            PROD_CD: $prodCd
                            SIZE_SEQ: $sizeSeq
                            SIZE_VAL: $sizeVal
                            MINUS_LIMIT: $minusLimit
                            EXP_DATE: $expDate
                        ) {
                            STYLE_CD
                            PROD_CD
                            SIZE_SEQ
                            SIZE_VAL
                            MINUS_LIMIT
                            EXP_DATE
                        }
                    }
                `,
                variables: {
                    styleCd: argData.STYLE_CD,
                    prodCd: argData.PROD_CD,
                    sizeSeq: argData.SIZE_SEQ,
                    sizeVal: argData.SIZE_VAL,
                    minusLimit: argData.MINUS_LIMIT,
                    expDate: argData.EXP_DATE,
                },
            });
            console.log(
                "KCD_STYLE_MINUS INSERT:",
                JSON.stringify(data.createKCD_STYLE_MINUS),
            );
            return data.createKCD_STYLE_MINUS;
        } catch (e) {
            console.log("KCD_STYLE_MINUS INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_STYLE_MINUS(
                        $updateKcdStyleMinusId: Int!
                        $styleCd: String
                        $prodCd: String
                        $sizeSeq: Int
                        $sizeVal: String
                        $minusLimit: Int
                        $expDate: String
                    ) {
                        updateKCD_STYLE_MINUS(
                            id: $updateKcdStyleMinusId
                            STYLE_CD: $styleCd
                            PROD_CD: $prodCd
                            SIZE_SEQ: $sizeSeq
                            SIZE_VAL: $sizeVal
                            MINUS_LIMIT: $minusLimit
                            EXP_DATE: $expDate
                        ) {
                            id
                            STYLE_CD
                            PROD_CD
                            SIZE_SEQ
                            SIZE_VAL
                            MINUS_LIMIT
                            EXP_DATE
                        }
                    }
                `,
                variables: {
                    updateKcdStyleMinusId: argData.id,
                    styleCd: argData.STYLE_CD,
                    prodCd: argData.PROD_CD,
                    sizeSeq: argData.SIZE_SEQ,
                    sizeVal: argData.SIZE_VAL,
                    minusLimit: argData.MINUS_LIMIT,
                    expDate: argData.EXP_DATE,
                },
            });
            console.log(
                "KCD_STYLE_MINUS UPDATE:",
                JSON.stringify(data.updateKCD_STYLE_MINUS),
            );
            return data.updateKCD_STYLE_MINUS;
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
                    mutation DeleteKCD_STYLE_MINUS(
                        $deleteKcdStyleMinusId: Int!
                    ) {
                        deleteKCD_STYLE_MINUS(id: $deleteKcdStyleMinusId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdStyleMinusId: argData.id,
                },
            });
            console.log(
                "KCD_STYLE_MINUS DELETE:",
                JSON.stringify(data.deleteKCD_STYLE_MINUS),
            );
            return data.deleteKCD_STYLE_MINUS;
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
                    mutation MgrKcdStyleMinusDeletes(
                        $ids: [InputMgrKcdStyleMinusDeletes!]!
                    ) {
                        mgrKcdStyleMinusDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_STYLE_MINUS DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
