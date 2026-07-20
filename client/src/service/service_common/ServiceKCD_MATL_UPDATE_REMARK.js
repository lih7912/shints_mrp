/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_MATL_UPDATE_REMARK {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MATL_UPDATE_REMARK {
                        allQueryKCD_MATL_UPDATE_REMARK {
                            id
                            MATL_CD
                            UPDATE_REMARK
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KCD_MATL_UPDATE_REMARK:",
                JSON.stringify(data.allQueryKCD_MATL_UPDATE_REMARK.length),
            );
            return data.allQueryKCD_MATL_UPDATE_REMARK;
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
                    query MgrKcdMatlUpdateRemarkQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlUpdateRemarkQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_CD
                            UPDATE_REMARK
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MATL_UPDATE_REMARK:",
                JSON.stringify(data.mgrKcdMatlUpdateRemarkQuery.length),
            );
            return data.mgrKcdMatlUpdateRemarkQuery;
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
                    mutation CreateKCD_MATL_UPDATE_REMARK(
                        $matlCd: String
                        $updateRemark: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKCD_MATL_UPDATE_REMARK(
                            MATL_CD: $matlCd
                            UPDATE_REMARK: $updateRemark
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            MATL_CD
                            UPDATE_REMARK
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    matlCd: argData.MATL_CD,
                    updateRemark: argData.UPDATE_REMARK,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_MATL_UPDATE_REMARK INSERT:",
                JSON.stringify(data.createKCD_MATL_UPDATE_REMARK),
            );
            return data.createKCD_MATL_UPDATE_REMARK;
        } catch (e) {
            console.log(
                "KCD_MATL_UPDATE_REMARK INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_MATL_UPDATE_REMARK(
                        $updateKcdMatlUpdateRemarkId: Int!
                        $matlCd: String
                        $updateRemark: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKCD_MATL_UPDATE_REMARK(
                            id: $updateKcdMatlUpdateRemarkId
                            MATL_CD: $matlCd
                            UPDATE_REMARK: $updateRemark
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            MATL_CD
                            UPDATE_REMARK
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdMatlUpdateRemarkId: argData.id,
                    matlCd: argData.MATL_CD,
                    updateRemark: argData.UPDATE_REMARK,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_MATL_UPDATE_REMARK UPDATE:",
                JSON.stringify(data.updateKCD_MATL_UPDATE_REMARK),
            );
            return data.updateKCD_MATL_UPDATE_REMARK;
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
                    mutation DeleteKCD_MATL_UPDATE_REMARK(
                        $deleteKcdMatlUpdateRemarkId: Int!
                    ) {
                        deleteKCD_MATL_UPDATE_REMARK(
                            id: $deleteKcdMatlUpdateRemarkId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlUpdateRemarkId: argData.id,
                },
            });
            console.log(
                "KCD_MATL_UPDATE_REMARK DELETE:",
                JSON.stringify(data.deleteKCD_MATL_UPDATE_REMARK),
            );
            return data.deleteKCD_MATL_UPDATE_REMARK;
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
                    mutation MgrKcdMatlUpdateRemarkDeletes(
                        $ids: [InputMgrKcdMatlUpdateRemarkDeletes!]!
                    ) {
                        mgrKcdMatlUpdateRemarkDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KCD_MATL_UPDATE_REMARK DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
