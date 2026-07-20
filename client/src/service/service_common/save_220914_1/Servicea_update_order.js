/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_update_order {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_update_order {
                        allQuerya_update_order {
                            id
                            invoice_no
                            order_cd
                            ship_date
                        }
                    }
                `,
            });
            console.log(
                "a_update_order:",
                JSON.stringify(data.allQuerya_update_order.length),
            );
            return data.allQuerya_update_order;
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
                    query MgrAUpdateOrderQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAUpdateOrderQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            invoice_no
                            order_cd
                            ship_date
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_update_order:",
                JSON.stringify(data.mgrAUpdateOrderQuery.length),
            );
            return data.mgrAUpdateOrderQuery;
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
                    mutation Createa_update_order(
                        $invoiceNo: String
                        $orderCd: String
                        $shipDate: String
                    ) {
                        createa_update_order(
                            invoice_no: $invoiceNo
                            order_cd: $orderCd
                            ship_date: $shipDate
                        ) {
                            invoice_no
                            order_cd
                            ship_date
                        }
                    }
                `,
                variables: {
                    invoiceNo: argData.invoice_no,
                    orderCd: argData.order_cd,
                    shipDate: argData.ship_date,
                },
            });
            console.log(
                "a_update_order INSERT:",
                JSON.stringify(data.createa_update_order),
            );
            return data.createa_update_order;
        } catch (e) {
            console.log("a_update_order INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_update_order(
                        $updateAUpdateOrderId: Int!
                        $invoiceNo: String
                        $orderCd: String
                        $shipDate: String
                    ) {
                        updatea_update_order(
                            id: $updateAUpdateOrderId
                            invoice_no: $invoiceNo
                            order_cd: $orderCd
                            ship_date: $shipDate
                        ) {
                            id
                            invoice_no
                            order_cd
                            ship_date
                        }
                    }
                `,
                variables: {
                    updateAUpdateOrderId: argData.id,
                    invoiceNo: argData.invoice_no,
                    orderCd: argData.order_cd,
                    shipDate: argData.ship_date,
                },
            });
            console.log(
                "a_update_order UPDATE:",
                JSON.stringify(data.updatea_update_order),
            );
            return data.updatea_update_order;
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
                    mutation Deletea_update_order($deleteAUpdateOrderId: Int!) {
                        deletea_update_order(id: $deleteAUpdateOrderId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAUpdateOrderId: argData.id,
                },
            });
            console.log(
                "a_update_order DELETE:",
                JSON.stringify(data.deletea_update_order),
            );
            return data.deletea_update_order;
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
                    mutation MgrAUpdateOrderDeletes(
                        $ids: [InputMgrAUpdateOrderDeletes!]!
                    ) {
                        mgrAUpdateOrderDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_update_order DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
