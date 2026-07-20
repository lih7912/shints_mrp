/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_PIMEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PIMEM {
                        allQueryKSV_ORDER_PIMEM {
                            id
                            PI_CD
                            ORDER_CD
                            FOB
                            QTY
                            SEQ
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_PIMEM:",
                JSON.stringify(data.allQueryKSV_ORDER_PIMEM.length),
            );
            return data.allQueryKSV_ORDER_PIMEM;
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
                    query MgrKsvOrderPimemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderPimemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PI_CD
                            ORDER_CD
                            FOB
                            QTY
                            SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_PIMEM:",
                JSON.stringify(data.mgrKsvOrderPimemQuery.length),
            );
            return data.mgrKsvOrderPimemQuery;
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
                    mutation CreateKSV_ORDER_PIMEM(
                        $piCd: String
                        $orderCd: String
                        $fob: Float
                        $qty: Int
                        $seq: Int
                    ) {
                        createKSV_ORDER_PIMEM(
                            PI_CD: $piCd
                            ORDER_CD: $orderCd
                            FOB: $fob
                            QTY: $qty
                            SEQ: $seq
                        ) {
                            PI_CD
                            ORDER_CD
                            FOB
                            QTY
                            SEQ
                        }
                    }
                `,
                variables: {
                    piCd: argData.PI_CD,
                    orderCd: argData.ORDER_CD,
                    fob: argData.FOB,
                    qty: argData.QTY,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KSV_ORDER_PIMEM INSERT:",
                JSON.stringify(data.createKSV_ORDER_PIMEM),
            );
            return data.createKSV_ORDER_PIMEM;
        } catch (e) {
            console.log("KSV_ORDER_PIMEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_PIMEM(
                        $updateKsvOrderPimemId: Int!
                        $piCd: String
                        $orderCd: String
                        $fob: Float
                        $qty: Int
                        $seq: Int
                    ) {
                        updateKSV_ORDER_PIMEM(
                            id: $updateKsvOrderPimemId
                            PI_CD: $piCd
                            ORDER_CD: $orderCd
                            FOB: $fob
                            QTY: $qty
                            SEQ: $seq
                        ) {
                            id
                            PI_CD
                            ORDER_CD
                            FOB
                            QTY
                            SEQ
                        }
                    }
                `,
                variables: {
                    updateKsvOrderPimemId: argData.id,
                    piCd: argData.PI_CD,
                    orderCd: argData.ORDER_CD,
                    fob: argData.FOB,
                    qty: argData.QTY,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KSV_ORDER_PIMEM UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PIMEM),
            );
            return data.updateKSV_ORDER_PIMEM;
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
                    mutation DeleteKSV_ORDER_PIMEM(
                        $deleteKsvOrderPimemId: Int!
                    ) {
                        deleteKSV_ORDER_PIMEM(id: $deleteKsvOrderPimemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderPimemId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PIMEM DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PIMEM),
            );
            return data.deleteKSV_ORDER_PIMEM;
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
                    mutation MgrKsvOrderPimemDeletes(
                        $ids: [InputMgrKsvOrderPimemDeletes!]!
                    ) {
                        mgrKsvOrderPimemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_PIMEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
