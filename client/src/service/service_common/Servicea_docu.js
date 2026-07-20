/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class Servicea_docu {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_docu {
                        allQuerya_docu {
                            id
                            docu_no
                        }
                    }
                `,
            });
            console.log("a_docu:", JSON.stringify(data.allQuerya_docu.length));
            return data.allQuerya_docu;
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
                    query MgrADocuQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrADocuQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            docu_no
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("a_docu:", JSON.stringify(data.mgrADocuQuery.length));
            return data.mgrADocuQuery;
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
                    mutation Createa_docu($docuNo: String) {
                        createa_docu(docu_no: $docuNo) {
                            docu_no
                        }
                    }
                `,
                variables: {
                    docuNo: argData.docu_no,
                },
            });
            console.log("a_docu INSERT:", JSON.stringify(data.createa_docu));
            return data.createa_docu;
        } catch (e) {
            console.log("a_docu INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Updatea_docu(
                        $updateADocuId: Int!
                        $docuNo: String
                    ) {
                        updatea_docu(id: $updateADocuId, docu_no: $docuNo) {
                            id
                            docu_no
                        }
                    }
                `,
                variables: {
                    updateADocuId: argData.id,
                    docuNo: argData.docu_no,
                },
            });
            console.log("a_docu UPDATE:", JSON.stringify(data.updatea_docu));
            return data.updatea_docu;
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
                    mutation Deletea_docu($deleteADocuId: Int!) {
                        deletea_docu(id: $deleteADocuId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteADocuId: argData.id,
                },
            });
            console.log("a_docu DELETE:", JSON.stringify(data.deletea_docu));
            return data.deletea_docu;
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
                    mutation MgrADocuDeletes($ids: [InputMgrADocuDeletes!]!) {
                        mgrADocuDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_docu DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
