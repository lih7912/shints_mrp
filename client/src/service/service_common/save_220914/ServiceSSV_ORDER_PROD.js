/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_ORDER_PROD {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_ORDER_PROD {
                        allQuerySSV_ORDER_PROD {
                            id
                            ORDER_CD
                            PROD_DATE
                            PROD_STEP
                            SIZE
                            SIZE_SEQ
                            PROD_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SSV_ORDER_PROD:",
                JSON.stringify(data.allQuerySSV_ORDER_PROD.length),
            );
            return data.allQuerySSV_ORDER_PROD;
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
                    query MgrSsvOrderProdQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvOrderProdQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_DATE
                            PROD_STEP
                            SIZE
                            SIZE_SEQ
                            PROD_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_ORDER_PROD:",
                JSON.stringify(data.mgrSsvOrderProdQuery.length),
            );
            return data.mgrSsvOrderProdQuery;
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
                    mutation CreateSSV_ORDER_PROD(
                        $orderCd: String
                        $prodDate: String
                        $prodStep: String
                        $size: String
                        $sizeSeq: Int
                        $prodCnt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createSSV_ORDER_PROD(
                            ORDER_CD: $orderCd
                            PROD_DATE: $prodDate
                            PROD_STEP: $prodStep
                            SIZE: $size
                            SIZE_SEQ: $sizeSeq
                            PROD_CNT: $prodCnt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            PROD_DATE
                            PROD_STEP
                            SIZE
                            SIZE_SEQ
                            PROD_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodDate: argData.PROD_DATE,
                    prodStep: argData.PROD_STEP,
                    size: argData.SIZE,
                    sizeSeq: argData.SIZE_SEQ,
                    prodCnt: argData.PROD_CNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_ORDER_PROD INSERT:",
                JSON.stringify(data.createSSV_ORDER_PROD),
            );
            return data.createSSV_ORDER_PROD;
        } catch (e) {
            console.log("SSV_ORDER_PROD INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_ORDER_PROD(
                        $updateSsvOrderProdId: Int!
                        $orderCd: String
                        $prodDate: String
                        $prodStep: String
                        $size: String
                        $sizeSeq: Int
                        $prodCnt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateSSV_ORDER_PROD(
                            id: $updateSsvOrderProdId
                            ORDER_CD: $orderCd
                            PROD_DATE: $prodDate
                            PROD_STEP: $prodStep
                            SIZE: $size
                            SIZE_SEQ: $sizeSeq
                            PROD_CNT: $prodCnt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            PROD_DATE
                            PROD_STEP
                            SIZE
                            SIZE_SEQ
                            PROD_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateSsvOrderProdId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodDate: argData.PROD_DATE,
                    prodStep: argData.PROD_STEP,
                    size: argData.SIZE,
                    sizeSeq: argData.SIZE_SEQ,
                    prodCnt: argData.PROD_CNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_ORDER_PROD UPDATE:",
                JSON.stringify(data.updateSSV_ORDER_PROD),
            );
            return data.updateSSV_ORDER_PROD;
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
                    mutation DeleteSSV_ORDER_PROD($deleteSsvOrderProdId: Int!) {
                        deleteSSV_ORDER_PROD(id: $deleteSsvOrderProdId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvOrderProdId: argData.id,
                },
            });
            console.log(
                "SSV_ORDER_PROD DELETE:",
                JSON.stringify(data.deleteSSV_ORDER_PROD),
            );
            return data.deleteSSV_ORDER_PROD;
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
                    mutation MgrSsvOrderProdDeletes(
                        $ids: [InputMgrSsvOrderProdDeletes!]!
                    ) {
                        mgrSsvOrderProdDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_ORDER_PROD DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
