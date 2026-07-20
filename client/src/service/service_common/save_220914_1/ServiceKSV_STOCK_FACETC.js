/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_FACETC {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_FACETC {
                        allQueryKSV_STOCK_FACETC {
                            id
                            PO_CD
                            MATL_CD
                            ETC_TYPE
                            ETC_DATE
                            ETC_QTY
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_FACETC:",
                JSON.stringify(data.allQueryKSV_STOCK_FACETC.length),
            );
            return data.allQueryKSV_STOCK_FACETC;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockFacetcQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockFacetcQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            ETC_TYPE
                            ETC_DATE
                            ETC_QTY
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_FACETC:",
                JSON.stringify(data.mgrKsvStockFacetcQuery.length),
            );
            return data.mgrKsvStockFacetcQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_STOCK_FACETC(
                        $poCd: String
                        $matlCd: String
                        $etcType: String
                        $etcDate: String
                        $etcQty: Float
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        createKSV_STOCK_FACETC(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            ETC_TYPE: $etcType
                            ETC_DATE: $etcDate
                            ETC_QTY: $etcQty
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                        ) {
                            PO_CD
                            MATL_CD
                            ETC_TYPE
                            ETC_DATE
                            ETC_QTY
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    etcType: argData.ETC_TYPE,
                    etcDate: argData.ETC_DATE,
                    etcQty: argData.ETC_QTY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KSV_STOCK_FACETC INSERT:",
                JSON.stringify(data.createKSV_STOCK_FACETC),
            );
            return data.createKSV_STOCK_FACETC;
        } catch (e) {
            console.log("KSV_STOCK_FACETC INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_STOCK_FACETC(
                        $updateKsvStockFacetcId: Int!
                        $poCd: String
                        $matlCd: String
                        $etcType: String
                        $etcDate: String
                        $etcQty: Float
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        updateKSV_STOCK_FACETC(
                            id: $updateKsvStockFacetcId
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            ETC_TYPE: $etcType
                            ETC_DATE: $etcDate
                            ETC_QTY: $etcQty
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            ETC_TYPE
                            ETC_DATE
                            ETC_QTY
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    updateKsvStockFacetcId: argData.id,
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    etcType: argData.ETC_TYPE,
                    etcDate: argData.ETC_DATE,
                    etcQty: argData.ETC_QTY,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KSV_STOCK_FACETC UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_FACETC),
            );
            return data.updateKSV_STOCK_FACETC;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_STOCK_FACETC(
                        $deleteKsvStockFacetcId: Int!
                    ) {
                        deleteKSV_STOCK_FACETC(id: $deleteKsvStockFacetcId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockFacetcId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_FACETC DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_FACETC),
            );
            return data.deleteKSV_STOCK_FACETC;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
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
                    mutation MgrKsvStockFacetcDeletes(
                        $ids: [InputMgrKsvStockFacetcDeletes!]!
                    ) {
                        mgrKsvStockFacetcDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_FACETC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
