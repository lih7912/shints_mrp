/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_ETC {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_ETC {
                        allQueryKSV_ORDER_ETC {
                            id
                            ORDER_CD
                            LINE_CHARGE
                            FREIGHT_CHARGE
                            ETC_CHARGE
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_ETC:",
                JSON.stringify(data.allQueryKSV_ORDER_ETC.length),
            );
            return data.allQueryKSV_ORDER_ETC;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderEtcQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderEtcQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            LINE_CHARGE
                            FREIGHT_CHARGE
                            ETC_CHARGE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_ETC:",
                JSON.stringify(data.mgrKsvOrderEtcQuery.length),
            );
            return data.mgrKsvOrderEtcQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_ORDER_ETC(
                        $orderCd: String
                        $lineCharge: Float
                        $freightCharge: Float
                        $etcCharge: Float
                    ) {
                        createKSV_ORDER_ETC(
                            ORDER_CD: $orderCd
                            LINE_CHARGE: $lineCharge
                            FREIGHT_CHARGE: $freightCharge
                            ETC_CHARGE: $etcCharge
                        ) {
                            ORDER_CD
                            LINE_CHARGE
                            FREIGHT_CHARGE
                            ETC_CHARGE
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    lineCharge: argData.LINE_CHARGE,
                    freightCharge: argData.FREIGHT_CHARGE,
                    etcCharge: argData.ETC_CHARGE,
                },
            });
            console.log(
                "KSV_ORDER_ETC INSERT:",
                JSON.stringify(data.createKSV_ORDER_ETC),
            );
            return data.createKSV_ORDER_ETC;
        } catch (e) {
            console.log("KSV_ORDER_ETC INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_ETC(
                        $updateKsvOrderEtcId: Int!
                        $orderCd: String
                        $lineCharge: Float
                        $freightCharge: Float
                        $etcCharge: Float
                    ) {
                        updateKSV_ORDER_ETC(
                            id: $updateKsvOrderEtcId
                            ORDER_CD: $orderCd
                            LINE_CHARGE: $lineCharge
                            FREIGHT_CHARGE: $freightCharge
                            ETC_CHARGE: $etcCharge
                        ) {
                            id
                            ORDER_CD
                            LINE_CHARGE
                            FREIGHT_CHARGE
                            ETC_CHARGE
                        }
                    }
                `,
                variables: {
                    updateKsvOrderEtcId: argData.id,
                    orderCd: argData.ORDER_CD,
                    lineCharge: argData.LINE_CHARGE,
                    freightCharge: argData.FREIGHT_CHARGE,
                    etcCharge: argData.ETC_CHARGE,
                },
            });
            console.log(
                "KSV_ORDER_ETC UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_ETC),
            );
            return data.updateKSV_ORDER_ETC;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_ORDER_ETC($deleteKsvOrderEtcId: Int!) {
                        deleteKSV_ORDER_ETC(id: $deleteKsvOrderEtcId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderEtcId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_ETC DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_ETC),
            );
            return data.deleteKSV_ORDER_ETC;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                    mutation MgrKsvOrderEtcDeletes(
                        $ids: [InputMgrKsvOrderEtcDeletes!]!
                    ) {
                        mgrKsvOrderEtcDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_ETC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
