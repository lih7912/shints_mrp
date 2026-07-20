/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_FREIGHT_BUYER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_FREIGHT_BUYER {
                        allQueryKZZ_FREIGHT_BUYER {
                            id
                            BUYER_CD
                            DEPARTURE
                            SENDER
                            DESTINATION
                            RECEIVER
                            DELAY_REASON
                            CHARGE_KIND
                            CHARGE_CODE
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KZZ_FREIGHT_BUYER:",
                JSON.stringify(data.allQueryKZZ_FREIGHT_BUYER.length),
            );
            return data.allQueryKZZ_FREIGHT_BUYER;
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
                    query MgrKzzFreightBuyerQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzFreightBuyerQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            DEPARTURE
                            SENDER
                            DESTINATION
                            RECEIVER
                            DELAY_REASON
                            CHARGE_KIND
                            CHARGE_CODE
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_FREIGHT_BUYER:",
                JSON.stringify(data.mgrKzzFreightBuyerQuery.length),
            );
            return data.mgrKzzFreightBuyerQuery;
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
                    mutation CreateKZZ_FREIGHT_BUYER(
                        $buyerCd: String
                        $departure: String
                        $sender: String
                        $destination: String
                        $receiver: String
                        $delayReason: String
                        $chargeKind: String
                        $chargeCode: String
                        $regUser: String
                    ) {
                        createKZZ_FREIGHT_BUYER(
                            BUYER_CD: $buyerCd
                            DEPARTURE: $departure
                            SENDER: $sender
                            DESTINATION: $destination
                            RECEIVER: $receiver
                            DELAY_REASON: $delayReason
                            CHARGE_KIND: $chargeKind
                            CHARGE_CODE: $chargeCode
                            REG_USER: $regUser
                        ) {
                            BUYER_CD
                            DEPARTURE
                            SENDER
                            DESTINATION
                            RECEIVER
                            DELAY_REASON
                            CHARGE_KIND
                            CHARGE_CODE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    departure: argData.DEPARTURE,
                    sender: argData.SENDER,
                    destination: argData.DESTINATION,
                    receiver: argData.RECEIVER,
                    delayReason: argData.DELAY_REASON,
                    chargeKind: argData.CHARGE_KIND,
                    chargeCode: argData.CHARGE_CODE,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KZZ_FREIGHT_BUYER INSERT:",
                JSON.stringify(data.createKZZ_FREIGHT_BUYER),
            );
            return data.createKZZ_FREIGHT_BUYER;
        } catch (e) {
            console.log("KZZ_FREIGHT_BUYER INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_FREIGHT_BUYER(
                        $updateKzzFreightBuyerId: Int!
                        $buyerCd: String
                        $departure: String
                        $sender: String
                        $destination: String
                        $receiver: String
                        $delayReason: String
                        $chargeKind: String
                        $chargeCode: String
                        $regUser: String
                    ) {
                        updateKZZ_FREIGHT_BUYER(
                            id: $updateKzzFreightBuyerId
                            BUYER_CD: $buyerCd
                            DEPARTURE: $departure
                            SENDER: $sender
                            DESTINATION: $destination
                            RECEIVER: $receiver
                            DELAY_REASON: $delayReason
                            CHARGE_KIND: $chargeKind
                            CHARGE_CODE: $chargeCode
                            REG_USER: $regUser
                        ) {
                            id
                            BUYER_CD
                            DEPARTURE
                            SENDER
                            DESTINATION
                            RECEIVER
                            DELAY_REASON
                            CHARGE_KIND
                            CHARGE_CODE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKzzFreightBuyerId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    departure: argData.DEPARTURE,
                    sender: argData.SENDER,
                    destination: argData.DESTINATION,
                    receiver: argData.RECEIVER,
                    delayReason: argData.DELAY_REASON,
                    chargeKind: argData.CHARGE_KIND,
                    chargeCode: argData.CHARGE_CODE,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KZZ_FREIGHT_BUYER UPDATE:",
                JSON.stringify(data.updateKZZ_FREIGHT_BUYER),
            );
            return data.updateKZZ_FREIGHT_BUYER;
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
                    mutation DeleteKZZ_FREIGHT_BUYER(
                        $deleteKzzFreightBuyerId: Int!
                    ) {
                        deleteKZZ_FREIGHT_BUYER(id: $deleteKzzFreightBuyerId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzFreightBuyerId: argData.id,
                },
            });
            console.log(
                "KZZ_FREIGHT_BUYER DELETE:",
                JSON.stringify(data.deleteKZZ_FREIGHT_BUYER),
            );
            return data.deleteKZZ_FREIGHT_BUYER;
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
                    mutation MgrKzzFreightBuyerDeletes(
                        $ids: [InputMgrKzzFreightBuyerDeletes!]!
                    ) {
                        mgrKzzFreightBuyerDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_FREIGHT_BUYER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
