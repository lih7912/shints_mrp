/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_ORDER_MRP {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MRP {
                        allQueryKSV_ORDER_MRP {
                            id
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                            MATL_CD
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            SEQ
                            COUNTRY
                            REG_USER
                            REG_DATETIME
                            VERSION
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MRP:",
                JSON.stringify(data.allQueryKSV_ORDER_MRP.length),
            );
            return data.allQueryKSV_ORDER_MRP;
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
                    query MgrKsvOrderMrpQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMrpQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                            MATL_CD
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            SEQ
                            COUNTRY
                            REG_USER
                            REG_DATETIME
                            VERSION
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MRP:",
                JSON.stringify(data.mgrKsvOrderMrpQuery.length),
            );
            return data.mgrKsvOrderMrpQuery;
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
                    mutation CreateKSV_ORDER_MRP(
                        $orderCd: String
                        $prodCd: String
                        $orderMrpSeq: Int
                        $matlCd: String
                        $stdNet: Float
                        $stdLoss: Float
                        $stdGross: Float
                        $net: Float
                        $loss: Float
                        $gross: Float
                        $remark: String
                        $useSize: String
                        $seq: Int!
                        $country: String
                        $regUser: String
                        $regDatetime: String
                        $version: String
                    ) {
                        createKSV_ORDER_MRP(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ORDER_MRP_SEQ: $orderMrpSeq
                            MATL_CD: $matlCd
                            STD_NET: $stdNet
                            STD_LOSS: $stdLoss
                            STD_GROSS: $stdGross
                            NET: $net
                            LOSS: $loss
                            GROSS: $gross
                            REMARK: $remark
                            USE_SIZE: $useSize
                            SEQ: $seq
                            COUNTRY: $country
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            VERSION: $version
                        ) {
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                            MATL_CD
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            SEQ
                            COUNTRY
                            REG_USER
                            REG_DATETIME
                            VERSION
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    orderMrpSeq: argData.ORDER_MRP_SEQ,
                    matlCd: argData.MATL_CD,
                    stdNet: argData.STD_NET,
                    stdLoss: argData.STD_LOSS,
                    stdGross: argData.STD_GROSS,
                    net: argData.NET,
                    loss: argData.LOSS,
                    gross: argData.GROSS,
                    remark: argData.REMARK,
                    useSize: argData.USE_SIZE,
                    seq: argData.SEQ,
                    country: argData.COUNTRY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    version: argData.VERSION,
                },
            });
            console.log(
                "KSV_ORDER_MRP INSERT:",
                JSON.stringify(data.createKSV_ORDER_MRP),
            );
            return data.createKSV_ORDER_MRP;
        } catch (e) {
            console.log("KSV_ORDER_MRP INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_MRP(
                        $updateKsvOrderMrpId: Int!
                        $orderCd: String
                        $prodCd: String
                        $orderMrpSeq: Int
                        $matlCd: String
                        $stdNet: Float
                        $stdLoss: Float
                        $stdGross: Float
                        $net: Float
                        $loss: Float
                        $gross: Float
                        $remark: String
                        $useSize: String
                        $seq: Int!
                        $country: String
                        $regUser: String
                        $regDatetime: String
                        $version: String
                    ) {
                        updateKSV_ORDER_MRP(
                            id: $updateKsvOrderMrpId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            ORDER_MRP_SEQ: $orderMrpSeq
                            MATL_CD: $matlCd
                            STD_NET: $stdNet
                            STD_LOSS: $stdLoss
                            STD_GROSS: $stdGross
                            NET: $net
                            LOSS: $loss
                            GROSS: $gross
                            REMARK: $remark
                            USE_SIZE: $useSize
                            SEQ: $seq
                            COUNTRY: $country
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            VERSION: $version
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            ORDER_MRP_SEQ
                            MATL_CD
                            STD_NET
                            STD_LOSS
                            STD_GROSS
                            NET
                            LOSS
                            GROSS
                            REMARK
                            USE_SIZE
                            SEQ
                            COUNTRY
                            REG_USER
                            REG_DATETIME
                            VERSION
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMrpId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    orderMrpSeq: argData.ORDER_MRP_SEQ,
                    matlCd: argData.MATL_CD,
                    stdNet: argData.STD_NET,
                    stdLoss: argData.STD_LOSS,
                    stdGross: argData.STD_GROSS,
                    net: argData.NET,
                    loss: argData.LOSS,
                    gross: argData.GROSS,
                    remark: argData.REMARK,
                    useSize: argData.USE_SIZE,
                    seq: argData.SEQ,
                    country: argData.COUNTRY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    version: argData.VERSION,
                },
            });
            console.log(
                "KSV_ORDER_MRP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MRP),
            );
            return data.updateKSV_ORDER_MRP;
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
                    mutation DeleteKSV_ORDER_MRP($deleteKsvOrderMrpId: Int!) {
                        deleteKSV_ORDER_MRP(id: $deleteKsvOrderMrpId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMrpId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MRP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MRP),
            );
            return data.deleteKSV_ORDER_MRP;
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
                    mutation MgrKsvOrderMrpDeletes(
                        $ids: [InputMgrKsvOrderMrpDeletes!]!
                    ) {
                        mgrKsvOrderMrpDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_MRP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
