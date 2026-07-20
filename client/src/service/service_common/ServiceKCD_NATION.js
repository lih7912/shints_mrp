/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_NATION {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_NATION {
                        allQueryKCD_NATION {
                            id
                            NAT_CD
                            NAT_NAME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NAT_IDX
                        }
                    }
                `,
            });
            console.log(
                "KCD_NATION:",
                JSON.stringify(data.allQueryKCD_NATION.length),
            );
            return data.allQueryKCD_NATION;
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
                    query MgrKcdNationQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdNationQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            NAT_CD
                            NAT_NAME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NAT_IDX
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_NATION:",
                JSON.stringify(data.mgrKcdNationQuery.length),
            );
            return data.mgrKcdNationQuery;
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
                    mutation CreateKCD_NATION(
                        $natCd: String
                        $natName: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $natIdx: String
                    ) {
                        createKCD_NATION(
                            NAT_CD: $natCd
                            NAT_NAME: $natName
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            NAT_IDX: $natIdx
                        ) {
                            NAT_CD
                            NAT_NAME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NAT_IDX
                        }
                    }
                `,
                variables: {
                    natCd: argData.NAT_CD,
                    natName: argData.NAT_NAME,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    natIdx: argData.NAT_IDX,
                },
            });
            console.log(
                "KCD_NATION INSERT:",
                JSON.stringify(data.createKCD_NATION),
            );
            return data.createKCD_NATION;
        } catch (e) {
            console.log("KCD_NATION INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_NATION(
                        $updateKcdNationId: Int!
                        $natCd: String
                        $natName: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $natIdx: String
                    ) {
                        updateKCD_NATION(
                            id: $updateKcdNationId
                            NAT_CD: $natCd
                            NAT_NAME: $natName
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            NAT_IDX: $natIdx
                        ) {
                            id
                            NAT_CD
                            NAT_NAME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NAT_IDX
                        }
                    }
                `,
                variables: {
                    updateKcdNationId: argData.id,
                    natCd: argData.NAT_CD,
                    natName: argData.NAT_NAME,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    natIdx: argData.NAT_IDX,
                },
            });
            console.log(
                "KCD_NATION UPDATE:",
                JSON.stringify(data.updateKCD_NATION),
            );
            return data.updateKCD_NATION;
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
                    mutation DeleteKCD_NATION($deleteKcdNationId: Int!) {
                        deleteKCD_NATION(id: $deleteKcdNationId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdNationId: argData.id,
                },
            });
            console.log(
                "KCD_NATION DELETE:",
                JSON.stringify(data.deleteKCD_NATION),
            );
            return data.deleteKCD_NATION;
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
                    mutation MgrKcdNationDeletes(
                        $ids: [InputMgrKcdNationDeletes!]!
                    ) {
                        mgrKcdNationDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_NATION DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
