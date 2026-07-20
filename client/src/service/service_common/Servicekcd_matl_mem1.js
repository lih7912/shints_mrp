/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicekcd_matl_mem1 {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerykcd_matl_mem1 {
                        allQuerykcd_matl_mem1 {
                            id
                            matl_no
                            matl_cd
                            matl_price
                        }
                    }
                `,
            });
            console.log(
                "kcd_matl_mem1:",
                JSON.stringify(data.allQuerykcd_matl_mem1.length),
            );
            return data.allQuerykcd_matl_mem1;
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
                    query MgrKcdMatlMem1Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlMem1Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            matl_no
                            matl_cd
                            matl_price
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "kcd_matl_mem1:",
                JSON.stringify(data.mgrKcdMatlMem1Query.length),
            );
            return data.mgrKcdMatlMem1Query;
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
                    mutation Createkcd_matl_mem1(
                        $matlNo: Int
                        $matlCd: String
                        $matlPrice: Float
                    ) {
                        createkcd_matl_mem1(
                            matl_no: $matlNo
                            matl_cd: $matlCd
                            matl_price: $matlPrice
                        ) {
                            matl_no
                            matl_cd
                            matl_price
                        }
                    }
                `,
                variables: {
                    matlNo: argData.matl_no,
                    matlCd: argData.matl_cd,
                    matlPrice: argData.matl_price,
                },
            });
            console.log(
                "kcd_matl_mem1 INSERT:",
                JSON.stringify(data.createkcd_matl_mem1),
            );
            return data.createkcd_matl_mem1;
        } catch (e) {
            console.log("kcd_matl_mem1 INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatekcd_matl_mem1(
                        $updateKcdMatlMem1Id: Int!
                        $matlNo: Int
                        $matlCd: String
                        $matlPrice: Float
                    ) {
                        updatekcd_matl_mem1(
                            id: $updateKcdMatlMem1Id
                            matl_no: $matlNo
                            matl_cd: $matlCd
                            matl_price: $matlPrice
                        ) {
                            id
                            matl_no
                            matl_cd
                            matl_price
                        }
                    }
                `,
                variables: {
                    updateKcdMatlMem1Id: argData.id,
                    matlNo: argData.matl_no,
                    matlCd: argData.matl_cd,
                    matlPrice: argData.matl_price,
                },
            });
            console.log(
                "kcd_matl_mem1 UPDATE:",
                JSON.stringify(data.updatekcd_matl_mem1),
            );
            return data.updatekcd_matl_mem1;
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
                    mutation Deletekcd_matl_mem1($deleteKcdMatlMem1Id: Int!) {
                        deletekcd_matl_mem1(id: $deleteKcdMatlMem1Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlMem1Id: argData.id,
                },
            });
            console.log(
                "kcd_matl_mem1 DELETE:",
                JSON.stringify(data.deletekcd_matl_mem1),
            );
            return data.deletekcd_matl_mem1;
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
                    mutation MgrKcdMatlMem1Deletes(
                        $ids: [InputMgrKcdMatlMem1Deletes!]!
                    ) {
                        mgrKcdMatlMem1Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("kcd_matl_mem1 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
