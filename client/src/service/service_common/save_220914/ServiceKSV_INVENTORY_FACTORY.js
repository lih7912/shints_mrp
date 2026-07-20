/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_INVENTORY_FACTORY {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_INVENTORY_FACTORY {
                        allQueryKSV_INVENTORY_FACTORY {
                            id
                            SEQ
                            ORDER_CD
                            FINISH_QTY
                            INVENTORY_DATE
                        }
                    }
                `,
            });
            console.log(
                "KSV_INVENTORY_FACTORY:",
                JSON.stringify(data.allQueryKSV_INVENTORY_FACTORY.length),
            );
            return data.allQueryKSV_INVENTORY_FACTORY;
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
                    query MgrKsvInventoryFactoryQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvInventoryFactoryQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            SEQ
                            ORDER_CD
                            FINISH_QTY
                            INVENTORY_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_INVENTORY_FACTORY:",
                JSON.stringify(data.mgrKsvInventoryFactoryQuery.length),
            );
            return data.mgrKsvInventoryFactoryQuery;
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
                    mutation CreateKSV_INVENTORY_FACTORY(
                        $seq: Int
                        $orderCd: String
                        $finishQty: Int
                        $inventoryDate: String
                    ) {
                        createKSV_INVENTORY_FACTORY(
                            SEQ: $seq
                            ORDER_CD: $orderCd
                            FINISH_QTY: $finishQty
                            INVENTORY_DATE: $inventoryDate
                        ) {
                            SEQ
                            ORDER_CD
                            FINISH_QTY
                            INVENTORY_DATE
                        }
                    }
                `,
                variables: {
                    seq: argData.SEQ,
                    orderCd: argData.ORDER_CD,
                    finishQty: argData.FINISH_QTY,
                    inventoryDate: argData.INVENTORY_DATE,
                },
            });
            console.log(
                "KSV_INVENTORY_FACTORY INSERT:",
                JSON.stringify(data.createKSV_INVENTORY_FACTORY),
            );
            return data.createKSV_INVENTORY_FACTORY;
        } catch (e) {
            console.log(
                "KSV_INVENTORY_FACTORY INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_INVENTORY_FACTORY(
                        $updateKsvInventoryFactoryId: Int!
                        $seq: Int
                        $orderCd: String
                        $finishQty: Int
                        $inventoryDate: String
                    ) {
                        updateKSV_INVENTORY_FACTORY(
                            id: $updateKsvInventoryFactoryId
                            SEQ: $seq
                            ORDER_CD: $orderCd
                            FINISH_QTY: $finishQty
                            INVENTORY_DATE: $inventoryDate
                        ) {
                            id
                            SEQ
                            ORDER_CD
                            FINISH_QTY
                            INVENTORY_DATE
                        }
                    }
                `,
                variables: {
                    updateKsvInventoryFactoryId: argData.id,
                    seq: argData.SEQ,
                    orderCd: argData.ORDER_CD,
                    finishQty: argData.FINISH_QTY,
                    inventoryDate: argData.INVENTORY_DATE,
                },
            });
            console.log(
                "KSV_INVENTORY_FACTORY UPDATE:",
                JSON.stringify(data.updateKSV_INVENTORY_FACTORY),
            );
            return data.updateKSV_INVENTORY_FACTORY;
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
                    mutation DeleteKSV_INVENTORY_FACTORY(
                        $deleteKsvInventoryFactoryId: Int!
                    ) {
                        deleteKSV_INVENTORY_FACTORY(
                            id: $deleteKsvInventoryFactoryId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvInventoryFactoryId: argData.id,
                },
            });
            console.log(
                "KSV_INVENTORY_FACTORY DELETE:",
                JSON.stringify(data.deleteKSV_INVENTORY_FACTORY),
            );
            return data.deleteKSV_INVENTORY_FACTORY;
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
                    mutation MgrKsvInventoryFactoryDeletes(
                        $ids: [InputMgrKsvInventoryFactoryDeletes!]!
                    ) {
                        mgrKsvInventoryFactoryDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_INVENTORY_FACTORY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
