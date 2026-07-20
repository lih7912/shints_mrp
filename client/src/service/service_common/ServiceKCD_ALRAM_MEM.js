/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_ALRAM_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_ALRAM_MEM {
                        allQueryKCD_ALRAM_MEM {
                            id
                            ALRAM_CD
                            SEQ
                            REPLACE_TYPE
                            REPLACE_BF
                            REPLACE_AF
                        }
                    }
                `,
            });
            console.log(
                "KCD_ALRAM_MEM:",
                JSON.stringify(data.allQueryKCD_ALRAM_MEM.length),
            );
            return data.allQueryKCD_ALRAM_MEM;
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
                    query MgrKcdAlramMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdAlramMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ALRAM_CD
                            SEQ
                            REPLACE_TYPE
                            REPLACE_BF
                            REPLACE_AF
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_ALRAM_MEM:",
                JSON.stringify(data.mgrKcdAlramMemQuery.length),
            );
            return data.mgrKcdAlramMemQuery;
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
                    mutation CreateKCD_ALRAM_MEM(
                        $alramCd: String!
                        $seq: String!
                        $replaceType: String
                        $replaceBf: String!
                        $replaceAf: String!
                    ) {
                        createKCD_ALRAM_MEM(
                            ALRAM_CD: $alramCd
                            SEQ: $seq
                            REPLACE_TYPE: $replaceType
                            REPLACE_BF: $replaceBf
                            REPLACE_AF: $replaceAf
                        ) {
                            ALRAM_CD
                            SEQ
                            REPLACE_TYPE
                            REPLACE_BF
                            REPLACE_AF
                        }
                    }
                `,
                variables: {
                    alramCd: argData.ALRAM_CD,
                    seq: argData.SEQ,
                    replaceType: argData.REPLACE_TYPE,
                    replaceBf: argData.REPLACE_BF,
                    replaceAf: argData.REPLACE_AF,
                },
            });
            console.log(
                "KCD_ALRAM_MEM INSERT:",
                JSON.stringify(data.createKCD_ALRAM_MEM),
            );
            return data.createKCD_ALRAM_MEM;
        } catch (e) {
            console.log("KCD_ALRAM_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_ALRAM_MEM(
                        $updateKcdAlramMemId: Int!
                        $alramCd: String!
                        $seq: String!
                        $replaceType: String
                        $replaceBf: String!
                        $replaceAf: String!
                    ) {
                        updateKCD_ALRAM_MEM(
                            id: $updateKcdAlramMemId
                            ALRAM_CD: $alramCd
                            SEQ: $seq
                            REPLACE_TYPE: $replaceType
                            REPLACE_BF: $replaceBf
                            REPLACE_AF: $replaceAf
                        ) {
                            id
                            ALRAM_CD
                            SEQ
                            REPLACE_TYPE
                            REPLACE_BF
                            REPLACE_AF
                        }
                    }
                `,
                variables: {
                    updateKcdAlramMemId: argData.id,
                    alramCd: argData.ALRAM_CD,
                    seq: argData.SEQ,
                    replaceType: argData.REPLACE_TYPE,
                    replaceBf: argData.REPLACE_BF,
                    replaceAf: argData.REPLACE_AF,
                },
            });
            console.log(
                "KCD_ALRAM_MEM UPDATE:",
                JSON.stringify(data.updateKCD_ALRAM_MEM),
            );
            return data.updateKCD_ALRAM_MEM;
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
                    mutation DeleteKCD_ALRAM_MEM($deleteKcdAlramMemId: Int!) {
                        deleteKCD_ALRAM_MEM(id: $deleteKcdAlramMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdAlramMemId: argData.id,
                },
            });
            console.log(
                "KCD_ALRAM_MEM DELETE:",
                JSON.stringify(data.deleteKCD_ALRAM_MEM),
            );
            return data.deleteKCD_ALRAM_MEM;
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
                    mutation MgrKcdAlramMemDeletes(
                        $ids: [InputMgrKcdAlramMemDeletes!]!
                    ) {
                        mgrKcdAlramMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_ALRAM_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
