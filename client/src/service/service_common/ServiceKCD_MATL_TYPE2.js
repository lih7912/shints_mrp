/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_MATL_TYPE2 {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MATL_TYPE2 {
                        allQueryKCD_MATL_TYPE2 {
                            id
                            SEQ
                            MATL_TYPE2
                            BVT_MATL_NAME
                        }
                    }
                `,
            });
            console.log(
                "KCD_MATL_TYPE2:",
                JSON.stringify(data.allQueryKCD_MATL_TYPE2.length),
            );
            return data.allQueryKCD_MATL_TYPE2;
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
                    query MgrKcdMatlType2Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlType2Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            SEQ
                            MATL_TYPE2
                            BVT_MATL_NAME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MATL_TYPE2:",
                JSON.stringify(data.mgrKcdMatlType2Query.length),
            );
            return data.mgrKcdMatlType2Query;
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
                    mutation CreateKCD_MATL_TYPE2(
                        $seq: String
                        $matlType2: String
                        $bvtMatlName: String
                    ) {
                        createKCD_MATL_TYPE2(
                            SEQ: $seq
                            MATL_TYPE2: $matlType2
                            BVT_MATL_NAME: $bvtMatlName
                        ) {
                            SEQ
                            MATL_TYPE2
                            BVT_MATL_NAME
                        }
                    }
                `,
                variables: {
                    seq: argData.SEQ,
                    matlType2: argData.MATL_TYPE2,
                    bvtMatlName: argData.BVT_MATL_NAME,
                },
            });
            console.log(
                "KCD_MATL_TYPE2 INSERT:",
                JSON.stringify(data.createKCD_MATL_TYPE2),
            );
            return data.createKCD_MATL_TYPE2;
        } catch (e) {
            console.log("KCD_MATL_TYPE2 INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_MATL_TYPE2(
                        $updateKcdMatlType2Id: Int!
                        $seq: String
                        $matlType2: String
                        $bvtMatlName: String
                    ) {
                        updateKCD_MATL_TYPE2(
                            id: $updateKcdMatlType2Id
                            SEQ: $seq
                            MATL_TYPE2: $matlType2
                            BVT_MATL_NAME: $bvtMatlName
                        ) {
                            id
                            SEQ
                            MATL_TYPE2
                            BVT_MATL_NAME
                        }
                    }
                `,
                variables: {
                    updateKcdMatlType2Id: argData.id,
                    seq: argData.SEQ,
                    matlType2: argData.MATL_TYPE2,
                    bvtMatlName: argData.BVT_MATL_NAME,
                },
            });
            console.log(
                "KCD_MATL_TYPE2 UPDATE:",
                JSON.stringify(data.updateKCD_MATL_TYPE2),
            );
            return data.updateKCD_MATL_TYPE2;
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
                    mutation DeleteKCD_MATL_TYPE2($deleteKcdMatlType2Id: Int!) {
                        deleteKCD_MATL_TYPE2(id: $deleteKcdMatlType2Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlType2Id: argData.id,
                },
            });
            console.log(
                "KCD_MATL_TYPE2 DELETE:",
                JSON.stringify(data.deleteKCD_MATL_TYPE2),
            );
            return data.deleteKCD_MATL_TYPE2;
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
                    mutation MgrKcdMatlType2Deletes(
                        $ids: [InputMgrKcdMatlType2Deletes!]!
                    ) {
                        mgrKcdMatlType2Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_TYPE2 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
