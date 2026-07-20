/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MST_TEMP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MST_TEMP {
                        allQueryKSV_ORDER_MST_TEMP {
                            id
                            ORDER_CD
                            STYLE_CD
                            TOT_CNT
                            SIZE_GROUP
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MST_TEMP:",
                JSON.stringify(data.allQueryKSV_ORDER_MST_TEMP.length),
            );
            return data.allQueryKSV_ORDER_MST_TEMP;
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
                    query MgrKsvOrderMstTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMstTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            STYLE_CD
                            TOT_CNT
                            SIZE_GROUP
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MST_TEMP:",
                JSON.stringify(data.mgrKsvOrderMstTempQuery.length),
            );
            return data.mgrKsvOrderMstTempQuery;
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
                    mutation CreateKSV_ORDER_MST_TEMP(
                        $orderCd: String
                        $styleCd: String
                        $totCnt: Int
                        $sizeGroup: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_MST_TEMP(
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            TOT_CNT: $totCnt
                            SIZE_GROUP: $sizeGroup
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            STYLE_CD
                            TOT_CNT
                            SIZE_GROUP
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    totCnt: argData.TOT_CNT,
                    sizeGroup: argData.SIZE_GROUP,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_MST_TEMP INSERT:",
                JSON.stringify(data.createKSV_ORDER_MST_TEMP),
            );
            return data.createKSV_ORDER_MST_TEMP;
        } catch (e) {
            console.log("KSV_ORDER_MST_TEMP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_MST_TEMP(
                        $updateKsvOrderMstTempId: Int!
                        $orderCd: String
                        $styleCd: String
                        $totCnt: Int
                        $sizeGroup: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_MST_TEMP(
                            id: $updateKsvOrderMstTempId
                            ORDER_CD: $orderCd
                            STYLE_CD: $styleCd
                            TOT_CNT: $totCnt
                            SIZE_GROUP: $sizeGroup
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            STYLE_CD
                            TOT_CNT
                            SIZE_GROUP
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMstTempId: argData.id,
                    orderCd: argData.ORDER_CD,
                    styleCd: argData.STYLE_CD,
                    totCnt: argData.TOT_CNT,
                    sizeGroup: argData.SIZE_GROUP,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_MST_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MST_TEMP),
            );
            return data.updateKSV_ORDER_MST_TEMP;
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
                    mutation DeleteKSV_ORDER_MST_TEMP(
                        $deleteKsvOrderMstTempId: Int!
                    ) {
                        deleteKSV_ORDER_MST_TEMP(id: $deleteKsvOrderMstTempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMstTempId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MST_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MST_TEMP),
            );
            return data.deleteKSV_ORDER_MST_TEMP;
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
                    mutation MgrKsvOrderMstTempDeletes(
                        $ids: [InputMgrKsvOrderMstTempDeletes!]!
                    ) {
                        mgrKsvOrderMstTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MST_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
