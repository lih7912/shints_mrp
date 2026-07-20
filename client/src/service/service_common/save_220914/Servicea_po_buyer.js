/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_po_buyer {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_po_buyer {
                        allQuerya_po_buyer {
                            id
                            buyer_name
                            po_cd
                        }
                    }
                `,
            });
            console.log(
                "a_po_buyer:",
                JSON.stringify(data.allQuerya_po_buyer.length),
            );
            return data.allQuerya_po_buyer;
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
                    query MgrAPoBuyerQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAPoBuyerQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            buyer_name
                            po_cd
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_po_buyer:",
                JSON.stringify(data.mgrAPoBuyerQuery.length),
            );
            return data.mgrAPoBuyerQuery;
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
                    mutation Createa_po_buyer(
                        $buyerName: String
                        $poCd: String
                    ) {
                        createa_po_buyer(buyer_name: $buyerName, po_cd: $poCd) {
                            buyer_name
                            po_cd
                        }
                    }
                `,
                variables: {
                    buyerName: argData.buyer_name,
                    poCd: argData.po_cd,
                },
            });
            console.log(
                "a_po_buyer INSERT:",
                JSON.stringify(data.createa_po_buyer),
            );
            return data.createa_po_buyer;
        } catch (e) {
            console.log("a_po_buyer INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_po_buyer(
                        $updateAPoBuyerId: Int!
                        $buyerName: String
                        $poCd: String
                    ) {
                        updatea_po_buyer(
                            id: $updateAPoBuyerId
                            buyer_name: $buyerName
                            po_cd: $poCd
                        ) {
                            id
                            buyer_name
                            po_cd
                        }
                    }
                `,
                variables: {
                    updateAPoBuyerId: argData.id,
                    buyerName: argData.buyer_name,
                    poCd: argData.po_cd,
                },
            });
            console.log(
                "a_po_buyer UPDATE:",
                JSON.stringify(data.updatea_po_buyer),
            );
            return data.updatea_po_buyer;
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
                    mutation Deletea_po_buyer($deleteAPoBuyerId: Int!) {
                        deletea_po_buyer(id: $deleteAPoBuyerId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAPoBuyerId: argData.id,
                },
            });
            console.log(
                "a_po_buyer DELETE:",
                JSON.stringify(data.deletea_po_buyer),
            );
            return data.deletea_po_buyer;
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
                    mutation MgrAPoBuyerDeletes(
                        $ids: [InputMgrAPoBuyerDeletes!]!
                    ) {
                        mgrAPoBuyerDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_po_buyer DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
