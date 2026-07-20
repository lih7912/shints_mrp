/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_ACC_CODE {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_ACC_CODE {
                        allQueryKZZ_ACC_CODE {
                            id
                            CD_SEQ
                            CD_DS
                            NM_DS
                            CD_CS_KR
                            NM_CS_KR
                            CD_CS_OV
                            NM_CS_OV
                        }
                    }
                `,
            });
            console.log(
                "KZZ_ACC_CODE:",
                JSON.stringify(data.allQueryKZZ_ACC_CODE.length),
            );
            return data.allQueryKZZ_ACC_CODE;
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
                    query MgrKzzAccCodeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzAccCodeQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CD_SEQ
                            CD_DS
                            NM_DS
                            CD_CS_KR
                            NM_CS_KR
                            CD_CS_OV
                            NM_CS_OV
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_ACC_CODE:",
                JSON.stringify(data.mgrKzzAccCodeQuery.length),
            );
            return data.mgrKzzAccCodeQuery;
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
                    mutation CreateKZZ_ACC_CODE(
                        $cdSeq: Int
                        $cdDs: Int
                        $nmDs: String
                        $cdCsKr: Int
                        $nmCsKr: String
                        $cdCsOv: Int
                        $nmCsOv: String
                    ) {
                        createKZZ_ACC_CODE(
                            CD_SEQ: $cdSeq
                            CD_DS: $cdDs
                            NM_DS: $nmDs
                            CD_CS_KR: $cdCsKr
                            NM_CS_KR: $nmCsKr
                            CD_CS_OV: $cdCsOv
                            NM_CS_OV: $nmCsOv
                        ) {
                            CD_SEQ
                            CD_DS
                            NM_DS
                            CD_CS_KR
                            NM_CS_KR
                            CD_CS_OV
                            NM_CS_OV
                        }
                    }
                `,
                variables: {
                    cdSeq: argData.CD_SEQ,
                    cdDs: argData.CD_DS,
                    nmDs: argData.NM_DS,
                    cdCsKr: argData.CD_CS_KR,
                    nmCsKr: argData.NM_CS_KR,
                    cdCsOv: argData.CD_CS_OV,
                    nmCsOv: argData.NM_CS_OV,
                },
            });
            console.log(
                "KZZ_ACC_CODE INSERT:",
                JSON.stringify(data.createKZZ_ACC_CODE),
            );
            return data.createKZZ_ACC_CODE;
        } catch (e) {
            console.log("KZZ_ACC_CODE INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_ACC_CODE(
                        $updateKzzAccCodeId: Int!
                        $cdSeq: Int
                        $cdDs: Int
                        $nmDs: String
                        $cdCsKr: Int
                        $nmCsKr: String
                        $cdCsOv: Int
                        $nmCsOv: String
                    ) {
                        updateKZZ_ACC_CODE(
                            id: $updateKzzAccCodeId
                            CD_SEQ: $cdSeq
                            CD_DS: $cdDs
                            NM_DS: $nmDs
                            CD_CS_KR: $cdCsKr
                            NM_CS_KR: $nmCsKr
                            CD_CS_OV: $cdCsOv
                            NM_CS_OV: $nmCsOv
                        ) {
                            id
                            CD_SEQ
                            CD_DS
                            NM_DS
                            CD_CS_KR
                            NM_CS_KR
                            CD_CS_OV
                            NM_CS_OV
                        }
                    }
                `,
                variables: {
                    updateKzzAccCodeId: argData.id,
                    cdSeq: argData.CD_SEQ,
                    cdDs: argData.CD_DS,
                    nmDs: argData.NM_DS,
                    cdCsKr: argData.CD_CS_KR,
                    nmCsKr: argData.NM_CS_KR,
                    cdCsOv: argData.CD_CS_OV,
                    nmCsOv: argData.NM_CS_OV,
                },
            });
            console.log(
                "KZZ_ACC_CODE UPDATE:",
                JSON.stringify(data.updateKZZ_ACC_CODE),
            );
            return data.updateKZZ_ACC_CODE;
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
                    mutation DeleteKZZ_ACC_CODE($deleteKzzAccCodeId: Int!) {
                        deleteKZZ_ACC_CODE(id: $deleteKzzAccCodeId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzAccCodeId: argData.id,
                },
            });
            console.log(
                "KZZ_ACC_CODE DELETE:",
                JSON.stringify(data.deleteKZZ_ACC_CODE),
            );
            return data.deleteKZZ_ACC_CODE;
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
                    mutation MgrKzzAccCodeDeletes(
                        $ids: [InputMgrKzzAccCodeDeletes!]!
                    ) {
                        mgrKzzAccCodeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_ACC_CODE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
