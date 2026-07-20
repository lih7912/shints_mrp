/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceSCD_BRAND {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_BRAND {
                        allQuerySCD_BRAND {
                            id
                            BRAND
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SCD_BRAND:",
                JSON.stringify(data.allQuerySCD_BRAND.length),
            );
            return data.allQuerySCD_BRAND;
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
                    query MgrScdBrandQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdBrandQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BRAND
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_BRAND:",
                JSON.stringify(data.mgrScdBrandQuery.length),
            );
            return data.mgrScdBrandQuery;
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
                    mutation CreateSCD_BRAND(
                        $brand: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createSCD_BRAND(
                            BRAND: $brand
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            BRAND
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    brand: argData.BRAND,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SCD_BRAND INSERT:",
                JSON.stringify(data.createSCD_BRAND),
            );
            return data.createSCD_BRAND;
        } catch (e) {
            console.log("SCD_BRAND INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateSCD_BRAND(
                        $updateScdBrandId: Int!
                        $brand: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateSCD_BRAND(
                            id: $updateScdBrandId
                            BRAND: $brand
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            BRAND
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateScdBrandId: argData.id,
                    brand: argData.BRAND,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SCD_BRAND UPDATE:",
                JSON.stringify(data.updateSCD_BRAND),
            );
            return data.updateSCD_BRAND;
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
                    mutation DeleteSCD_BRAND($deleteScdBrandId: Int!) {
                        deleteSCD_BRAND(id: $deleteScdBrandId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdBrandId: argData.id,
                },
            });
            console.log(
                "SCD_BRAND DELETE:",
                JSON.stringify(data.deleteSCD_BRAND),
            );
            return data.deleteSCD_BRAND;
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
                    mutation MgrScdBrandDeletes(
                        $ids: [InputMgrScdBrandDeletes!]!
                    ) {
                        mgrScdBrandDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_BRAND DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
