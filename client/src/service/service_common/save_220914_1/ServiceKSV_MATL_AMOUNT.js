/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_MATL_AMOUNT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_MATL_AMOUNT {
                        allQueryKSV_MATL_AMOUNT {
                            id
                            ORDER_CD
                            ORDER_AMT
                            DUE_DATE
                            DELIVERY_DATE
                            REG_USER
                            ETD_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KSV_MATL_AMOUNT:",
                JSON.stringify(data.allQueryKSV_MATL_AMOUNT.length),
            );
            return data.allQueryKSV_MATL_AMOUNT;
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
                    query MgrKsvMatlAmountQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvMatlAmountQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            ORDER_AMT
                            DUE_DATE
                            DELIVERY_DATE
                            REG_USER
                            ETD_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_MATL_AMOUNT:",
                JSON.stringify(data.mgrKsvMatlAmountQuery.length),
            );
            return data.mgrKsvMatlAmountQuery;
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
                    mutation CreateKSV_MATL_AMOUNT(
                        $orderCd: String
                        $orderAmt: Float
                        $dueDate: String
                        $deliveryDate: String
                        $regUser: String
                        $etdFlag: String
                    ) {
                        createKSV_MATL_AMOUNT(
                            ORDER_CD: $orderCd
                            ORDER_AMT: $orderAmt
                            DUE_DATE: $dueDate
                            DELIVERY_DATE: $deliveryDate
                            REG_USER: $regUser
                            ETD_FLAG: $etdFlag
                        ) {
                            ORDER_CD
                            ORDER_AMT
                            DUE_DATE
                            DELIVERY_DATE
                            REG_USER
                            ETD_FLAG
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    orderAmt: argData.ORDER_AMT,
                    dueDate: argData.DUE_DATE,
                    deliveryDate: argData.DELIVERY_DATE,
                    regUser: argData.REG_USER,
                    etdFlag: argData.ETD_FLAG,
                },
            });
            console.log(
                "KSV_MATL_AMOUNT INSERT:",
                JSON.stringify(data.createKSV_MATL_AMOUNT),
            );
            return data.createKSV_MATL_AMOUNT;
        } catch (e) {
            console.log("KSV_MATL_AMOUNT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_MATL_AMOUNT(
                        $updateKsvMatlAmountId: Int!
                        $orderCd: String
                        $orderAmt: Float
                        $dueDate: String
                        $deliveryDate: String
                        $regUser: String
                        $etdFlag: String
                    ) {
                        updateKSV_MATL_AMOUNT(
                            id: $updateKsvMatlAmountId
                            ORDER_CD: $orderCd
                            ORDER_AMT: $orderAmt
                            DUE_DATE: $dueDate
                            DELIVERY_DATE: $deliveryDate
                            REG_USER: $regUser
                            ETD_FLAG: $etdFlag
                        ) {
                            id
                            ORDER_CD
                            ORDER_AMT
                            DUE_DATE
                            DELIVERY_DATE
                            REG_USER
                            ETD_FLAG
                        }
                    }
                `,
                variables: {
                    updateKsvMatlAmountId: argData.id,
                    orderCd: argData.ORDER_CD,
                    orderAmt: argData.ORDER_AMT,
                    dueDate: argData.DUE_DATE,
                    deliveryDate: argData.DELIVERY_DATE,
                    regUser: argData.REG_USER,
                    etdFlag: argData.ETD_FLAG,
                },
            });
            console.log(
                "KSV_MATL_AMOUNT UPDATE:",
                JSON.stringify(data.updateKSV_MATL_AMOUNT),
            );
            return data.updateKSV_MATL_AMOUNT;
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
                    mutation DeleteKSV_MATL_AMOUNT(
                        $deleteKsvMatlAmountId: Int!
                    ) {
                        deleteKSV_MATL_AMOUNT(id: $deleteKsvMatlAmountId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvMatlAmountId: argData.id,
                },
            });
            console.log(
                "KSV_MATL_AMOUNT DELETE:",
                JSON.stringify(data.deleteKSV_MATL_AMOUNT),
            );
            return data.deleteKSV_MATL_AMOUNT;
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
                    mutation MgrKsvMatlAmountDeletes(
                        $ids: [InputMgrKsvMatlAmountDeletes!]!
                    ) {
                        mgrKsvMatlAmountDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_MATL_AMOUNT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
