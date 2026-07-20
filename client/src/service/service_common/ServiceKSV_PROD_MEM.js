/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PROD_MEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PROD_MEM {
                        allQueryKSV_PROD_MEM {
                            id
                            PROD_CD
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
                            MRP_CHECK
                            BVT_REMARK
                            VERSION
                            DL_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KSV_PROD_MEM:",
                JSON.stringify(data.allQueryKSV_PROD_MEM.length),
            );
            return data.allQueryKSV_PROD_MEM;
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
                    query MgrKsvProdMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvProdMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PROD_CD
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
                            MRP_CHECK
                            BVT_REMARK
                            VERSION
                            DL_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PROD_MEM:",
                JSON.stringify(data.mgrKsvProdMemQuery.length),
            );
            return data.mgrKsvProdMemQuery;
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
                    mutation CreateKSV_PROD_MEM(
                        $prodCd: String
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
                        $mrpCheck: String
                        $bvtRemark: String
                        $version: String
                        $dlFlag: String
                    ) {
                        createKSV_PROD_MEM(
                            PROD_CD: $prodCd
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
                            MRP_CHECK: $mrpCheck
                            BVT_REMARK: $bvtRemark
                            VERSION: $version
                            DL_FLAG: $dlFlag
                        ) {
                            PROD_CD
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
                            MRP_CHECK
                            BVT_REMARK
                            VERSION
                            DL_FLAG
                        }
                    }
                `,
                variables: {
                    prodCd: argData.PROD_CD,
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
                    mrpCheck: argData.MRP_CHECK,
                    bvtRemark: argData.BVT_REMARK,
                    version: argData.VERSION,
                    dlFlag: argData.DL_FLAG,
                },
            });
            console.log(
                "KSV_PROD_MEM INSERT:",
                JSON.stringify(data.createKSV_PROD_MEM),
            );
            return data.createKSV_PROD_MEM;
        } catch (e) {
            console.log("KSV_PROD_MEM INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PROD_MEM(
                        $updateKsvProdMemId: Int!
                        $prodCd: String
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
                        $mrpCheck: String
                        $bvtRemark: String
                        $version: String
                        $dlFlag: String
                    ) {
                        updateKSV_PROD_MEM(
                            id: $updateKsvProdMemId
                            PROD_CD: $prodCd
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
                            MRP_CHECK: $mrpCheck
                            BVT_REMARK: $bvtRemark
                            VERSION: $version
                            DL_FLAG: $dlFlag
                        ) {
                            id
                            PROD_CD
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
                            MRP_CHECK
                            BVT_REMARK
                            VERSION
                            DL_FLAG
                        }
                    }
                `,
                variables: {
                    updateKsvProdMemId: argData.id,
                    prodCd: argData.PROD_CD,
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
                    mrpCheck: argData.MRP_CHECK,
                    bvtRemark: argData.BVT_REMARK,
                    version: argData.VERSION,
                    dlFlag: argData.DL_FLAG,
                },
            });
            console.log(
                "KSV_PROD_MEM UPDATE:",
                JSON.stringify(data.updateKSV_PROD_MEM),
            );
            return data.updateKSV_PROD_MEM;
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
                    mutation DeleteKSV_PROD_MEM($deleteKsvProdMemId: Int!) {
                        deleteKSV_PROD_MEM(id: $deleteKsvProdMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvProdMemId: argData.id,
                },
            });
            console.log(
                "KSV_PROD_MEM DELETE:",
                JSON.stringify(data.deleteKSV_PROD_MEM),
            );
            return data.deleteKSV_PROD_MEM;
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
                    mutation MgrKsvProdMemDeletes(
                        $ids: [InputMgrKsvProdMemDeletes!]!
                    ) {
                        mgrKsvProdMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PROD_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
