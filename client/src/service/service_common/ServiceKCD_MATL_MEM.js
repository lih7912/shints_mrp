/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_MATL_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MATL_MEM {
                        allQueryKCD_MATL_MEM {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            matl_mprice
                            REMARK
                        }
                    }
                `,
            });
            console.log(
                "KCD_MATL_MEM:",
                JSON.stringify(data.allQueryKCD_MATL_MEM.length),
            );
            return data.allQueryKCD_MATL_MEM;
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
                    query MgrKcdMatlMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            matl_mprice
                            REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MATL_MEM:",
                JSON.stringify(data.mgrKcdMatlMemQuery.length),
            );
            return data.mgrKcdMatlMemQuery;
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
                    mutation CreateKCD_MATL_MEM(
                        $matlCd: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $confFlag: String
                        $priceType: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $matlMprice: Float
                        $remark: String
                    ) {
                        createKCD_MATL_MEM(
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            CONF_FLAG: $confFlag
                            PRICE_TYPE: $priceType
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            matl_mprice: $matlMprice
                            REMARK: $remark
                        ) {
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            matl_mprice
                            REMARK
                        }
                    }
                `,
                variables: {
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    confFlag: argData.CONF_FLAG,
                    priceType: argData.PRICE_TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    matlMprice: argData.matl_mprice,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KCD_MATL_MEM INSERT:",
                JSON.stringify(data.createKCD_MATL_MEM),
            );
            return data.createKCD_MATL_MEM;
        } catch (e) {
            console.log("KCD_MATL_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_MATL_MEM(
                        $updateKcdMatlMemId: Int!
                        $matlCd: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $confFlag: String
                        $priceType: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $matlMprice: Float
                        $remark: String
                    ) {
                        updateKCD_MATL_MEM(
                            id: $updateKcdMatlMemId
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            CONF_FLAG: $confFlag
                            PRICE_TYPE: $priceType
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            matl_mprice: $matlMprice
                            REMARK: $remark
                        ) {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            CONF_FLAG
                            PRICE_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            matl_mprice
                            REMARK
                        }
                    }
                `,
                variables: {
                    updateKcdMatlMemId: argData.id,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    confFlag: argData.CONF_FLAG,
                    priceType: argData.PRICE_TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    matlMprice: argData.matl_mprice,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KCD_MATL_MEM UPDATE:",
                JSON.stringify(data.updateKCD_MATL_MEM),
            );
            return data.updateKCD_MATL_MEM;
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
                    mutation DeleteKCD_MATL_MEM($deleteKcdMatlMemId: Int!) {
                        deleteKCD_MATL_MEM(id: $deleteKcdMatlMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlMemId: argData.id,
                },
            });
            console.log(
                "KCD_MATL_MEM DELETE:",
                JSON.stringify(data.deleteKCD_MATL_MEM),
            );
            return data.deleteKCD_MATL_MEM;
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
                    mutation MgrKcdMatlMemDeletes(
                        $ids: [InputMgrKcdMatlMemDeletes!]!
                    ) {
                        mgrKcdMatlMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
