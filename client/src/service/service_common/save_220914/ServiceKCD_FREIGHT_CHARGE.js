/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_FREIGHT_CHARGE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_FREIGHT_CHARGE {
                        allQueryKCD_FREIGHT_CHARGE {
                            id
                            CHARGE_GROUP
                            CHARGE_WEIGHT
                            CHARGE
                        }
                    }
                `,
            });
            console.log(
                "KCD_FREIGHT_CHARGE:",
                JSON.stringify(data.allQueryKCD_FREIGHT_CHARGE.length),
            );
            return data.allQueryKCD_FREIGHT_CHARGE;
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
                    query MgrKcdFreightChargeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdFreightChargeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CHARGE_GROUP
                            CHARGE_WEIGHT
                            CHARGE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_FREIGHT_CHARGE:",
                JSON.stringify(data.mgrKcdFreightChargeQuery.length),
            );
            return data.mgrKcdFreightChargeQuery;
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
                    mutation CreateKCD_FREIGHT_CHARGE(
                        $chargeGroup: String
                        $chargeWeight: Float
                        $charge: Float
                    ) {
                        createKCD_FREIGHT_CHARGE(
                            CHARGE_GROUP: $chargeGroup
                            CHARGE_WEIGHT: $chargeWeight
                            CHARGE: $charge
                        ) {
                            CHARGE_GROUP
                            CHARGE_WEIGHT
                            CHARGE
                        }
                    }
                `,
                variables: {
                    chargeGroup: argData.CHARGE_GROUP,
                    chargeWeight: argData.CHARGE_WEIGHT,
                    charge: argData.CHARGE,
                },
            });
            console.log(
                "KCD_FREIGHT_CHARGE INSERT:",
                JSON.stringify(data.createKCD_FREIGHT_CHARGE),
            );
            return data.createKCD_FREIGHT_CHARGE;
        } catch (e) {
            console.log("KCD_FREIGHT_CHARGE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_FREIGHT_CHARGE(
                        $updateKcdFreightChargeId: Int!
                        $chargeGroup: String
                        $chargeWeight: Float
                        $charge: Float
                    ) {
                        updateKCD_FREIGHT_CHARGE(
                            id: $updateKcdFreightChargeId
                            CHARGE_GROUP: $chargeGroup
                            CHARGE_WEIGHT: $chargeWeight
                            CHARGE: $charge
                        ) {
                            id
                            CHARGE_GROUP
                            CHARGE_WEIGHT
                            CHARGE
                        }
                    }
                `,
                variables: {
                    updateKcdFreightChargeId: argData.id,
                    chargeGroup: argData.CHARGE_GROUP,
                    chargeWeight: argData.CHARGE_WEIGHT,
                    charge: argData.CHARGE,
                },
            });
            console.log(
                "KCD_FREIGHT_CHARGE UPDATE:",
                JSON.stringify(data.updateKCD_FREIGHT_CHARGE),
            );
            return data.updateKCD_FREIGHT_CHARGE;
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
                    mutation DeleteKCD_FREIGHT_CHARGE(
                        $deleteKcdFreightChargeId: Int!
                    ) {
                        deleteKCD_FREIGHT_CHARGE(
                            id: $deleteKcdFreightChargeId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdFreightChargeId: argData.id,
                },
            });
            console.log(
                "KCD_FREIGHT_CHARGE DELETE:",
                JSON.stringify(data.deleteKCD_FREIGHT_CHARGE),
            );
            return data.deleteKCD_FREIGHT_CHARGE;
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
                    mutation MgrKcdFreightChargeDeletes(
                        $ids: [InputMgrKcdFreightChargeDeletes!]!
                    ) {
                        mgrKcdFreightChargeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_FREIGHT_CHARGE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
