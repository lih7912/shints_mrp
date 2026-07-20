/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_RECEIVER {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_RECEIVER {
                        allQueryKCD_RECEIVER {
                            id
                            RECEIVER_ID
                            USER_NAME
                            FACTORY_CD
                        }
                    }
                `,
            });
            console.log(
                "KCD_RECEIVER:",
                JSON.stringify(data.allQueryKCD_RECEIVER.length),
            );
            return data.allQueryKCD_RECEIVER;
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
                    query MgrKcdReceiverQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdReceiverQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            RECEIVER_ID
                            USER_NAME
                            FACTORY_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_RECEIVER:",
                JSON.stringify(data.mgrKcdReceiverQuery.length),
            );
            return data.mgrKcdReceiverQuery;
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
                    mutation CreateKCD_RECEIVER(
                        $receiverId: String
                        $userName: String
                        $factoryCd: String
                    ) {
                        createKCD_RECEIVER(
                            RECEIVER_ID: $receiverId
                            USER_NAME: $userName
                            FACTORY_CD: $factoryCd
                        ) {
                            RECEIVER_ID
                            USER_NAME
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    receiverId: argData.RECEIVER_ID,
                    userName: argData.USER_NAME,
                    factoryCd: argData.FACTORY_CD,
                },
            });
            console.log(
                "KCD_RECEIVER INSERT:",
                JSON.stringify(data.createKCD_RECEIVER),
            );
            return data.createKCD_RECEIVER;
        } catch (e) {
            console.log("KCD_RECEIVER INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_RECEIVER(
                        $updateKcdReceiverId: Int!
                        $receiverId: String
                        $userName: String
                        $factoryCd: String
                    ) {
                        updateKCD_RECEIVER(
                            id: $updateKcdReceiverId
                            RECEIVER_ID: $receiverId
                            USER_NAME: $userName
                            FACTORY_CD: $factoryCd
                        ) {
                            id
                            RECEIVER_ID
                            USER_NAME
                            FACTORY_CD
                        }
                    }
                `,
                variables: {
                    updateKcdReceiverId: argData.id,
                    receiverId: argData.RECEIVER_ID,
                    userName: argData.USER_NAME,
                    factoryCd: argData.FACTORY_CD,
                },
            });
            console.log(
                "KCD_RECEIVER UPDATE:",
                JSON.stringify(data.updateKCD_RECEIVER),
            );
            return data.updateKCD_RECEIVER;
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
                    mutation DeleteKCD_RECEIVER($deleteKcdReceiverId: Int!) {
                        deleteKCD_RECEIVER(id: $deleteKcdReceiverId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdReceiverId: argData.id,
                },
            });
            console.log(
                "KCD_RECEIVER DELETE:",
                JSON.stringify(data.deleteKCD_RECEIVER),
            );
            return data.deleteKCD_RECEIVER;
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
                    mutation MgrKcdReceiverDeletes(
                        $ids: [InputMgrKcdReceiverDeletes!]!
                    ) {
                        mgrKcdReceiverDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_RECEIVER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
