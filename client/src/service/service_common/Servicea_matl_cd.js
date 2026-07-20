/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicea_matl_cd {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_matl_cd {
                        allQuerya_matl_cd {
                            id
                            matl_cd
                            price
                            curr_cd
                            matl_name
                            spec
                            color
                        }
                    }
                `,
            });
            console.log(
                "a_matl_cd:",
                JSON.stringify(data.allQuerya_matl_cd.length),
            );
            return data.allQuerya_matl_cd;
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
                    query MgrAMatlCdQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAMatlCdQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            matl_cd
                            price
                            curr_cd
                            matl_name
                            spec
                            color
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_matl_cd:",
                JSON.stringify(data.mgrAMatlCdQuery.length),
            );
            return data.mgrAMatlCdQuery;
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
                    mutation Createa_matl_cd(
                        $matlCd: String
                        $price: Float
                        $currCd: String
                        $matlName: String
                        $spec: String
                        $color: String
                    ) {
                        createa_matl_cd(
                            matl_cd: $matlCd
                            price: $price
                            curr_cd: $currCd
                            matl_name: $matlName
                            spec: $spec
                            color: $color
                        ) {
                            matl_cd
                            price
                            curr_cd
                            matl_name
                            spec
                            color
                        }
                    }
                `,
                variables: {
                    matlCd: argData.matl_cd,
                    price: argData.price,
                    currCd: argData.curr_cd,
                    matlName: argData.matl_name,
                    spec: argData.spec,
                    color: argData.color,
                },
            });
            console.log(
                "a_matl_cd INSERT:",
                JSON.stringify(data.createa_matl_cd),
            );
            return data.createa_matl_cd;
        } catch (e) {
            console.log("a_matl_cd INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatea_matl_cd(
                        $updateAMatlCdId: Int!
                        $matlCd: String
                        $price: Float
                        $currCd: String
                        $matlName: String
                        $spec: String
                        $color: String
                    ) {
                        updatea_matl_cd(
                            id: $updateAMatlCdId
                            matl_cd: $matlCd
                            price: $price
                            curr_cd: $currCd
                            matl_name: $matlName
                            spec: $spec
                            color: $color
                        ) {
                            id
                            matl_cd
                            price
                            curr_cd
                            matl_name
                            spec
                            color
                        }
                    }
                `,
                variables: {
                    updateAMatlCdId: argData.id,
                    matlCd: argData.matl_cd,
                    price: argData.price,
                    currCd: argData.curr_cd,
                    matlName: argData.matl_name,
                    spec: argData.spec,
                    color: argData.color,
                },
            });
            console.log(
                "a_matl_cd UPDATE:",
                JSON.stringify(data.updatea_matl_cd),
            );
            return data.updatea_matl_cd;
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
                    mutation Deletea_matl_cd($deleteAMatlCdId: Int!) {
                        deletea_matl_cd(id: $deleteAMatlCdId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAMatlCdId: argData.id,
                },
            });
            console.log(
                "a_matl_cd DELETE:",
                JSON.stringify(data.deletea_matl_cd),
            );
            return data.deletea_matl_cd;
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
                    mutation MgrAMatlCdDeletes(
                        $ids: [InputMgrAMatlCdDeletes!]!
                    ) {
                        mgrAMatlCdDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_matl_cd DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
