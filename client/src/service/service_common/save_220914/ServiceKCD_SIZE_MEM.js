/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_SIZE_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_SIZE_MEM {
                        allQueryKCD_SIZE_MEM {
                            id
                            SIZE_GROUP
                            SIZE_SEQ
                            SIZE_VAL
                            UNIT_RATE
                        }
                    }
                `,
            });
            console.log(
                "KCD_SIZE_MEM:",
                JSON.stringify(data.allQueryKCD_SIZE_MEM.length),
            );
            return data.allQueryKCD_SIZE_MEM;
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
                    query MgrKcdSizeMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdSizeMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            SIZE_GROUP
                            SIZE_SEQ
                            SIZE_VAL
                            UNIT_RATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_SIZE_MEM:",
                JSON.stringify(data.mgrKcdSizeMemQuery.length),
            );
            return data.mgrKcdSizeMemQuery;
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
                    mutation CreateKCD_SIZE_MEM(
                        $sizeGroup: String
                        $sizeSeq: Int
                        $sizeVal: String
                        $unitRate: Float
                    ) {
                        createKCD_SIZE_MEM(
                            SIZE_GROUP: $sizeGroup
                            SIZE_SEQ: $sizeSeq
                            SIZE_VAL: $sizeVal
                            UNIT_RATE: $unitRate
                        ) {
                            SIZE_GROUP
                            SIZE_SEQ
                            SIZE_VAL
                            UNIT_RATE
                        }
                    }
                `,
                variables: {
                    sizeGroup: argData.SIZE_GROUP,
                    sizeSeq: argData.SIZE_SEQ,
                    sizeVal: argData.SIZE_VAL,
                    unitRate: argData.UNIT_RATE,
                },
            });
            console.log(
                "KCD_SIZE_MEM INSERT:",
                JSON.stringify(data.createKCD_SIZE_MEM),
            );
            return data.createKCD_SIZE_MEM;
        } catch (e) {
            console.log("KCD_SIZE_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_SIZE_MEM(
                        $updateKcdSizeMemId: Int!
                        $sizeGroup: String
                        $sizeSeq: Int
                        $sizeVal: String
                        $unitRate: Float
                    ) {
                        updateKCD_SIZE_MEM(
                            id: $updateKcdSizeMemId
                            SIZE_GROUP: $sizeGroup
                            SIZE_SEQ: $sizeSeq
                            SIZE_VAL: $sizeVal
                            UNIT_RATE: $unitRate
                        ) {
                            id
                            SIZE_GROUP
                            SIZE_SEQ
                            SIZE_VAL
                            UNIT_RATE
                        }
                    }
                `,
                variables: {
                    updateKcdSizeMemId: argData.id,
                    sizeGroup: argData.SIZE_GROUP,
                    sizeSeq: argData.SIZE_SEQ,
                    sizeVal: argData.SIZE_VAL,
                    unitRate: argData.UNIT_RATE,
                },
            });
            console.log(
                "KCD_SIZE_MEM UPDATE:",
                JSON.stringify(data.updateKCD_SIZE_MEM),
            );
            return data.updateKCD_SIZE_MEM;
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
                    mutation DeleteKCD_SIZE_MEM($deleteKcdSizeMemId: Int!) {
                        deleteKCD_SIZE_MEM(id: $deleteKcdSizeMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdSizeMemId: argData.id,
                },
            });
            console.log(
                "KCD_SIZE_MEM DELETE:",
                JSON.stringify(data.deleteKCD_SIZE_MEM),
            );
            return data.deleteKCD_SIZE_MEM;
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
                    mutation MgrKcdSizeMemDeletes(
                        $ids: [InputMgrKcdSizeMemDeletes!]!
                    ) {
                        mgrKcdSizeMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_SIZE_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
