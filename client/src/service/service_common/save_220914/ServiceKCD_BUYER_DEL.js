/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BUYER_DEL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER_DEL {
                        allQueryKCD_BUYER_DEL {
                            id
                            BUYER_CD
                            flag
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER_DEL:",
                JSON.stringify(data.allQueryKCD_BUYER_DEL.length),
            );
            return data.allQueryKCD_BUYER_DEL;
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
                    query MgrKcdBuyerDelQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerDelQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            flag
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER_DEL:",
                JSON.stringify(data.mgrKcdBuyerDelQuery.length),
            );
            return data.mgrKcdBuyerDelQuery;
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
                    mutation CreateKCD_BUYER_DEL(
                        $buyerCd: String
                        $flag: String
                    ) {
                        createKCD_BUYER_DEL(BUYER_CD: $buyerCd, flag: $flag) {
                            BUYER_CD
                            flag
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    flag: argData.flag,
                },
            });
            console.log(
                "KCD_BUYER_DEL INSERT:",
                JSON.stringify(data.createKCD_BUYER_DEL),
            );
            return data.createKCD_BUYER_DEL;
        } catch (e) {
            console.log("KCD_BUYER_DEL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_BUYER_DEL(
                        $updateKcdBuyerDelId: Int!
                        $buyerCd: String
                        $flag: String
                    ) {
                        updateKCD_BUYER_DEL(
                            id: $updateKcdBuyerDelId
                            BUYER_CD: $buyerCd
                            flag: $flag
                        ) {
                            id
                            BUYER_CD
                            flag
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerDelId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    flag: argData.flag,
                },
            });
            console.log(
                "KCD_BUYER_DEL UPDATE:",
                JSON.stringify(data.updateKCD_BUYER_DEL),
            );
            return data.updateKCD_BUYER_DEL;
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
                    mutation DeleteKCD_BUYER_DEL($deleteKcdBuyerDelId: Int!) {
                        deleteKCD_BUYER_DEL(id: $deleteKcdBuyerDelId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerDelId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER_DEL DELETE:",
                JSON.stringify(data.deleteKCD_BUYER_DEL),
            );
            return data.deleteKCD_BUYER_DEL;
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
                    mutation MgrKcdBuyerDelDeletes(
                        $ids: [InputMgrKcdBuyerDelDeletes!]!
                    ) {
                        mgrKcdBuyerDelDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BUYER_DEL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
