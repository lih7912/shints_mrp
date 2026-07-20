/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_FREIGHT_CHARGE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_FREIGHT_CHARGE {
                        allQueryKZZ_FREIGHT_CHARGE {
                            id
                            FRT_TYPE
                            CHARGE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_FREIGHT_CHARGE:",
                JSON.stringify(data.allQueryKZZ_FREIGHT_CHARGE.length),
            );
            return data.allQueryKZZ_FREIGHT_CHARGE;
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
                    query MgrKzzFreightChargeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzFreightChargeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            FRT_TYPE
                            CHARGE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_FREIGHT_CHARGE:",
                JSON.stringify(data.mgrKzzFreightChargeQuery.length),
            );
            return data.mgrKzzFreightChargeQuery;
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
                    mutation CreateKZZ_FREIGHT_CHARGE(
                        $frtType: String
                        $charge: Float
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKZZ_FREIGHT_CHARGE(
                            FRT_TYPE: $frtType
                            CHARGE: $charge
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            FRT_TYPE
                            CHARGE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    frtType: argData.FRT_TYPE,
                    charge: argData.CHARGE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_FREIGHT_CHARGE INSERT:",
                JSON.stringify(data.createKZZ_FREIGHT_CHARGE),
            );
            return data.createKZZ_FREIGHT_CHARGE;
        } catch (e) {
            console.log("KZZ_FREIGHT_CHARGE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_FREIGHT_CHARGE(
                        $updateKzzFreightChargeId: Int!
                        $frtType: String
                        $charge: Float
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKZZ_FREIGHT_CHARGE(
                            id: $updateKzzFreightChargeId
                            FRT_TYPE: $frtType
                            CHARGE: $charge
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            FRT_TYPE
                            CHARGE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzFreightChargeId: argData.id,
                    frtType: argData.FRT_TYPE,
                    charge: argData.CHARGE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_FREIGHT_CHARGE UPDATE:",
                JSON.stringify(data.updateKZZ_FREIGHT_CHARGE),
            );
            return data.updateKZZ_FREIGHT_CHARGE;
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
                    mutation DeleteKZZ_FREIGHT_CHARGE(
                        $deleteKzzFreightChargeId: Int!
                    ) {
                        deleteKZZ_FREIGHT_CHARGE(
                            id: $deleteKzzFreightChargeId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzFreightChargeId: argData.id,
                },
            });
            console.log(
                "KZZ_FREIGHT_CHARGE DELETE:",
                JSON.stringify(data.deleteKZZ_FREIGHT_CHARGE),
            );
            return data.deleteKZZ_FREIGHT_CHARGE;
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
                    mutation MgrKzzFreightChargeDeletes(
                        $ids: [InputMgrKzzFreightChargeDeletes!]!
                    ) {
                        mgrKzzFreightChargeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_FREIGHT_CHARGE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
