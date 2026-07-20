/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_MRP_COMBINED {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MRP_COMBINED {
                        allQueryKSV_ORDER_MRP_COMBINED {
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
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MRP_COMBINED:",
                JSON.stringify(data.allQueryKSV_ORDER_MRP_COMBINED.length),
            );
            return data.allQueryKSV_ORDER_MRP_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvOrderMrpCombinedQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMrpCombinedQuery(
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
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MRP_COMBINED:",
                JSON.stringify(data.mgrKsvOrderMrpCombinedQuery.length),
            );
            return data.mgrKsvOrderMrpCombinedQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_ORDER_MRP_COMBINED(
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
                    ) {
                        createKSV_ORDER_MRP_COMBINED(
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
                },
            });
            console.log(
                "KSV_ORDER_MRP_COMBINED INSERT:",
                JSON.stringify(data.createKSV_ORDER_MRP_COMBINED),
            );
            return data.createKSV_ORDER_MRP_COMBINED;
        } catch (e) {
            console.log(
                "KSV_ORDER_MRP_COMBINED INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_ORDER_MRP_COMBINED(
                        $updateKsvOrderMrpCombinedId: Int!
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
                    ) {
                        updateKSV_ORDER_MRP_COMBINED(
                            id: $updateKsvOrderMrpCombinedId
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
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMrpCombinedId: argData.id,
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
                },
            });
            console.log(
                "KSV_ORDER_MRP_COMBINED UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MRP_COMBINED),
            );
            return data.updateKSV_ORDER_MRP_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_ORDER_MRP_COMBINED(
                        $deleteKsvOrderMrpCombinedId: Int!
                    ) {
                        deleteKSV_ORDER_MRP_COMBINED(
                            id: $deleteKsvOrderMrpCombinedId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMrpCombinedId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MRP_COMBINED DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MRP_COMBINED),
            );
            return data.deleteKSV_ORDER_MRP_COMBINED;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

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
                    mutation MgrKsvOrderMrpCombinedDeletes(
                        $ids: [InputMgrKsvOrderMrpCombinedDeletes!]!
                    ) {
                        mgrKsvOrderMrpCombinedDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_ORDER_MRP_COMBINED DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
