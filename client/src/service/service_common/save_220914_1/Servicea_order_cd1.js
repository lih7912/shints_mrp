/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_order_cd1 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_order_cd1 {
                        allQuerya_order_cd1 {
                            id
                            old_order_cd
                            new_order_cd1
                            new_buyer_cd
                        }
                    }
                `,
            });
            console.log(
                "a_order_cd1:",
                JSON.stringify(data.allQuerya_order_cd1.length),
            );
            return data.allQuerya_order_cd1;
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
                    query MgrAOrderCd1Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAOrderCd1Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            old_order_cd
                            new_order_cd1
                            new_buyer_cd
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_order_cd1:",
                JSON.stringify(data.mgrAOrderCd1Query.length),
            );
            return data.mgrAOrderCd1Query;
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
                    mutation Createa_order_cd1(
                        $oldOrderCd: String
                        $newOrderCd1: String
                        $newBuyerCd: String
                    ) {
                        createa_order_cd1(
                            old_order_cd: $oldOrderCd
                            new_order_cd1: $newOrderCd1
                            new_buyer_cd: $newBuyerCd
                        ) {
                            old_order_cd
                            new_order_cd1
                            new_buyer_cd
                        }
                    }
                `,
                variables: {
                    oldOrderCd: argData.old_order_cd,
                    newOrderCd1: argData.new_order_cd1,
                    newBuyerCd: argData.new_buyer_cd,
                },
            });
            console.log(
                "a_order_cd1 INSERT:",
                JSON.stringify(data.createa_order_cd1),
            );
            return data.createa_order_cd1;
        } catch (e) {
            console.log("a_order_cd1 INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_order_cd1(
                        $updateAOrderCd1Id: Int!
                        $oldOrderCd: String
                        $newOrderCd1: String
                        $newBuyerCd: String
                    ) {
                        updatea_order_cd1(
                            id: $updateAOrderCd1Id
                            old_order_cd: $oldOrderCd
                            new_order_cd1: $newOrderCd1
                            new_buyer_cd: $newBuyerCd
                        ) {
                            id
                            old_order_cd
                            new_order_cd1
                            new_buyer_cd
                        }
                    }
                `,
                variables: {
                    updateAOrderCd1Id: argData.id,
                    oldOrderCd: argData.old_order_cd,
                    newOrderCd1: argData.new_order_cd1,
                    newBuyerCd: argData.new_buyer_cd,
                },
            });
            console.log(
                "a_order_cd1 UPDATE:",
                JSON.stringify(data.updatea_order_cd1),
            );
            return data.updatea_order_cd1;
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
                    mutation Deletea_order_cd1($deleteAOrderCd1Id: Int!) {
                        deletea_order_cd1(id: $deleteAOrderCd1Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAOrderCd1Id: argData.id,
                },
            });
            console.log(
                "a_order_cd1 DELETE:",
                JSON.stringify(data.deletea_order_cd1),
            );
            return data.deletea_order_cd1;
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
                    mutation MgrAOrderCd1Deletes(
                        $ids: [InputMgrAOrderCd1Deletes!]!
                    ) {
                        mgrAOrderCd1Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_order_cd1 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
