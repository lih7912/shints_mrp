/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_ship_amt {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_ship_amt {
                        allQuerya_ship_amt {
                            id
                            buyer_cd
                            buyer_name
                            cd_name
                            amount
                        }
                    }
                `,
            });
            console.log(
                "a_ship_amt:",
                JSON.stringify(data.allQuerya_ship_amt.length),
            );
            return data.allQuerya_ship_amt;
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
                    query MgrAShipAmtQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAShipAmtQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            buyer_cd
                            buyer_name
                            cd_name
                            amount
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_ship_amt:",
                JSON.stringify(data.mgrAShipAmtQuery.length),
            );
            return data.mgrAShipAmtQuery;
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
                    mutation Createa_ship_amt(
                        $buyerCd: String
                        $buyerName: String
                        $cdName: String
                        $amount: Float
                    ) {
                        createa_ship_amt(
                            buyer_cd: $buyerCd
                            buyer_name: $buyerName
                            cd_name: $cdName
                            amount: $amount
                        ) {
                            buyer_cd
                            buyer_name
                            cd_name
                            amount
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.buyer_cd,
                    buyerName: argData.buyer_name,
                    cdName: argData.cd_name,
                    amount: argData.amount,
                },
            });
            console.log(
                "a_ship_amt INSERT:",
                JSON.stringify(data.createa_ship_amt),
            );
            return data.createa_ship_amt;
        } catch (e) {
            console.log("a_ship_amt INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_ship_amt(
                        $updateAShipAmtId: Int!
                        $buyerCd: String
                        $buyerName: String
                        $cdName: String
                        $amount: Float
                    ) {
                        updatea_ship_amt(
                            id: $updateAShipAmtId
                            buyer_cd: $buyerCd
                            buyer_name: $buyerName
                            cd_name: $cdName
                            amount: $amount
                        ) {
                            id
                            buyer_cd
                            buyer_name
                            cd_name
                            amount
                        }
                    }
                `,
                variables: {
                    updateAShipAmtId: argData.id,
                    buyerCd: argData.buyer_cd,
                    buyerName: argData.buyer_name,
                    cdName: argData.cd_name,
                    amount: argData.amount,
                },
            });
            console.log(
                "a_ship_amt UPDATE:",
                JSON.stringify(data.updatea_ship_amt),
            );
            return data.updatea_ship_amt;
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
                    mutation Deletea_ship_amt($deleteAShipAmtId: Int!) {
                        deletea_ship_amt(id: $deleteAShipAmtId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAShipAmtId: argData.id,
                },
            });
            console.log(
                "a_ship_amt DELETE:",
                JSON.stringify(data.deletea_ship_amt),
            );
            return data.deletea_ship_amt;
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
                    mutation MgrAShipAmtDeletes(
                        $ids: [InputMgrAShipAmtDeletes!]!
                    ) {
                        mgrAShipAmtDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_ship_amt DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
