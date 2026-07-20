/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Serviceksv_stock_2015 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryksv_stock_2015 {
                        allQueryksv_stock_2015 {
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
                "ksv_stock_2015:",
                JSON.stringify(data.allQueryksv_stock_2015.length),
            );
            return data.allQueryksv_stock_2015;
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
                    query MgrKsvStock2015Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStock2015Query(
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
                "ksv_stock_2015:",
                JSON.stringify(data.mgrKsvStock2015Query.length),
            );
            return data.mgrKsvStock2015Query;
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
                    mutation Createksv_stock_2015(
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
                        createksv_stock_2015(
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
                "ksv_stock_2015 INSERT:",
                JSON.stringify(data.createksv_stock_2015),
            );
            return data.createksv_stock_2015;
        } catch (e) {
            console.log("ksv_stock_2015 INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updateksv_stock_2015(
                        $updateKsvStock2015Id: Int!
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
                        updateksv_stock_2015(
                            id: $updateKsvStock2015Id
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
                    updateKsvStock2015Id: argData.id,
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
                "ksv_stock_2015 UPDATE:",
                JSON.stringify(data.updateksv_stock_2015),
            );
            return data.updateksv_stock_2015;
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
                    mutation Deleteksv_stock_2015($deleteKsvStock2015Id: Int!) {
                        deleteksv_stock_2015(id: $deleteKsvStock2015Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStock2015Id: argData.id,
                },
            });
            console.log(
                "ksv_stock_2015 DELETE:",
                JSON.stringify(data.deleteksv_stock_2015),
            );
            return data.deleteksv_stock_2015;
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
                    mutation MgrKsvStock2015Deletes(
                        $ids: [InputMgrKsvStock2015Deletes!]!
                    ) {
                        mgrKsvStock2015Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("ksv_stock_2015 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
