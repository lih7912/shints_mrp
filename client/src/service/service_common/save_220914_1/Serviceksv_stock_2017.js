/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Serviceksv_stock_2017 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryksv_stock_2017 {
                        allQueryksv_stock_2017 {
                            id
                            matl_cd
                            curr_cd
                            matl_price
                            stock_qty
                            remark
                            remark2
                            po_cd
                            tot_won
                            factory_cd
                        }
                    }
                `,
            });
            console.log(
                "ksv_stock_2017:",
                JSON.stringify(data.allQueryksv_stock_2017.length),
            );
            return data.allQueryksv_stock_2017;
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
                    query MgrKsvStock2017Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStock2017Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            matl_cd
                            curr_cd
                            matl_price
                            stock_qty
                            remark
                            remark2
                            po_cd
                            tot_won
                            factory_cd
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "ksv_stock_2017:",
                JSON.stringify(data.mgrKsvStock2017Query.length),
            );
            return data.mgrKsvStock2017Query;
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
                    mutation Createksv_stock_2017(
                        $matlCd: String
                        $currCd: String
                        $matlPrice: Float
                        $stockQty: Float
                        $remark: String
                        $remark2: String
                        $poCd: String
                        $totWon: Float
                        $factoryCd: String
                    ) {
                        createksv_stock_2017(
                            matl_cd: $matlCd
                            curr_cd: $currCd
                            matl_price: $matlPrice
                            stock_qty: $stockQty
                            remark: $remark
                            remark2: $remark2
                            po_cd: $poCd
                            tot_won: $totWon
                            factory_cd: $factoryCd
                        ) {
                            matl_cd
                            curr_cd
                            matl_price
                            stock_qty
                            remark
                            remark2
                            po_cd
                            tot_won
                            factory_cd
                        }
                    }
                `,
                variables: {
                    matlCd: argData.matl_cd,
                    currCd: argData.curr_cd,
                    matlPrice: argData.matl_price,
                    stockQty: argData.stock_qty,
                    remark: argData.remark,
                    remark2: argData.remark2,
                    poCd: argData.po_cd,
                    totWon: argData.tot_won,
                    factoryCd: argData.factory_cd,
                },
            });
            console.log(
                "ksv_stock_2017 INSERT:",
                JSON.stringify(data.createksv_stock_2017),
            );
            return data.createksv_stock_2017;
        } catch (e) {
            console.log("ksv_stock_2017 INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updateksv_stock_2017(
                        $updateKsvStock2017Id: Int!
                        $matlCd: String
                        $currCd: String
                        $matlPrice: Float
                        $stockQty: Float
                        $remark: String
                        $remark2: String
                        $poCd: String
                        $totWon: Float
                        $factoryCd: String
                    ) {
                        updateksv_stock_2017(
                            id: $updateKsvStock2017Id
                            matl_cd: $matlCd
                            curr_cd: $currCd
                            matl_price: $matlPrice
                            stock_qty: $stockQty
                            remark: $remark
                            remark2: $remark2
                            po_cd: $poCd
                            tot_won: $totWon
                            factory_cd: $factoryCd
                        ) {
                            id
                            matl_cd
                            curr_cd
                            matl_price
                            stock_qty
                            remark
                            remark2
                            po_cd
                            tot_won
                            factory_cd
                        }
                    }
                `,
                variables: {
                    updateKsvStock2017Id: argData.id,
                    matlCd: argData.matl_cd,
                    currCd: argData.curr_cd,
                    matlPrice: argData.matl_price,
                    stockQty: argData.stock_qty,
                    remark: argData.remark,
                    remark2: argData.remark2,
                    poCd: argData.po_cd,
                    totWon: argData.tot_won,
                    factoryCd: argData.factory_cd,
                },
            });
            console.log(
                "ksv_stock_2017 UPDATE:",
                JSON.stringify(data.updateksv_stock_2017),
            );
            return data.updateksv_stock_2017;
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
                    mutation Deleteksv_stock_2017($deleteKsvStock2017Id: Int!) {
                        deleteksv_stock_2017(id: $deleteKsvStock2017Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStock2017Id: argData.id,
                },
            });
            console.log(
                "ksv_stock_2017 DELETE:",
                JSON.stringify(data.deleteksv_stock_2017),
            );
            return data.deleteksv_stock_2017;
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
                    mutation MgrKsvStock2017Deletes(
                        $ids: [InputMgrKsvStock2017Deletes!]!
                    ) {
                        mgrKsvStock2017Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("ksv_stock_2017 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
