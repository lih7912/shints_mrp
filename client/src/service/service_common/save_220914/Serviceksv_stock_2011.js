/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Serviceksv_stock_2011 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryksv_stock_2011 {
                        allQueryksv_stock_2011 {
                            id
                            matl_cd
                            stock_qty
                            tot_won
                            sheet_no
                        }
                    }
                `,
            });
            console.log(
                "ksv_stock_2011:",
                JSON.stringify(data.allQueryksv_stock_2011.length),
            );
            return data.allQueryksv_stock_2011;
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
                    query MgrKsvStock2011Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStock2011Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            matl_cd
                            stock_qty
                            tot_won
                            sheet_no
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "ksv_stock_2011:",
                JSON.stringify(data.mgrKsvStock2011Query.length),
            );
            return data.mgrKsvStock2011Query;
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
                    mutation Createksv_stock_2011(
                        $matlCd: String
                        $stockQty: Float
                        $totWon: Float
                        $sheetNo: String
                    ) {
                        createksv_stock_2011(
                            matl_cd: $matlCd
                            stock_qty: $stockQty
                            tot_won: $totWon
                            sheet_no: $sheetNo
                        ) {
                            matl_cd
                            stock_qty
                            tot_won
                            sheet_no
                        }
                    }
                `,
                variables: {
                    matlCd: argData.matl_cd,
                    stockQty: argData.stock_qty,
                    totWon: argData.tot_won,
                    sheetNo: argData.sheet_no,
                },
            });
            console.log(
                "ksv_stock_2011 INSERT:",
                JSON.stringify(data.createksv_stock_2011),
            );
            return data.createksv_stock_2011;
        } catch (e) {
            console.log("ksv_stock_2011 INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updateksv_stock_2011(
                        $updateKsvStock2011Id: Int!
                        $matlCd: String
                        $stockQty: Float
                        $totWon: Float
                        $sheetNo: String
                    ) {
                        updateksv_stock_2011(
                            id: $updateKsvStock2011Id
                            matl_cd: $matlCd
                            stock_qty: $stockQty
                            tot_won: $totWon
                            sheet_no: $sheetNo
                        ) {
                            id
                            matl_cd
                            stock_qty
                            tot_won
                            sheet_no
                        }
                    }
                `,
                variables: {
                    updateKsvStock2011Id: argData.id,
                    matlCd: argData.matl_cd,
                    stockQty: argData.stock_qty,
                    totWon: argData.tot_won,
                    sheetNo: argData.sheet_no,
                },
            });
            console.log(
                "ksv_stock_2011 UPDATE:",
                JSON.stringify(data.updateksv_stock_2011),
            );
            return data.updateksv_stock_2011;
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
                    mutation Deleteksv_stock_2011($deleteKsvStock2011Id: Int!) {
                        deleteksv_stock_2011(id: $deleteKsvStock2011Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStock2011Id: argData.id,
                },
            });
            console.log(
                "ksv_stock_2011 DELETE:",
                JSON.stringify(data.deleteksv_stock_2011),
            );
            return data.deleteksv_stock_2011;
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
                    mutation MgrKsvStock2011Deletes(
                        $ids: [InputMgrKsvStock2011Deletes!]!
                    ) {
                        mgrKsvStock2011Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("ksv_stock_2011 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
