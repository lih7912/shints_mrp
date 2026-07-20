/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_MATL_SALE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MATL_SALE {
                        allQueryKCD_MATL_SALE {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            REMARK
                        }
                    }
                `,
            });
            console.log(
                "KCD_MATL_SALE:",
                JSON.stringify(data.allQueryKCD_MATL_SALE.length),
            );
            return data.allQueryKCD_MATL_SALE;
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
                    query MgrKcdMatlSaleQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlSaleQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MATL_SALE:",
                JSON.stringify(data.mgrKcdMatlSaleQuery.length),
            );
            return data.mgrKcdMatlSaleQuery;
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
                    mutation CreateKCD_MATL_SALE(
                        $matlCd: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $remark: String
                    ) {
                        createKCD_MATL_SALE(
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            REMARK: $remark
                        ) {
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KCD_MATL_SALE INSERT:",
                JSON.stringify(data.createKCD_MATL_SALE),
            );
            return data.createKCD_MATL_SALE;
        } catch (e) {
            console.log("KCD_MATL_SALE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_MATL_SALE(
                        $updateKcdMatlSaleId: Int!
                        $matlCd: String
                        $matlSeq: Int
                        $matlPrice: Float
                        $currCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $remark: String
                    ) {
                        updateKCD_MATL_SALE(
                            id: $updateKcdMatlSaleId
                            MATL_CD: $matlCd
                            MATL_SEQ: $matlSeq
                            MATL_PRICE: $matlPrice
                            CURR_CD: $currCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            REMARK: $remark
                        ) {
                            id
                            MATL_CD
                            MATL_SEQ
                            MATL_PRICE
                            CURR_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    updateKcdMatlSaleId: argData.id,
                    matlCd: argData.MATL_CD,
                    matlSeq: argData.MATL_SEQ,
                    matlPrice: argData.MATL_PRICE,
                    currCd: argData.CURR_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KCD_MATL_SALE UPDATE:",
                JSON.stringify(data.updateKCD_MATL_SALE),
            );
            return data.updateKCD_MATL_SALE;
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
                    mutation DeleteKCD_MATL_SALE($deleteKcdMatlSaleId: Int!) {
                        deleteKCD_MATL_SALE(id: $deleteKcdMatlSaleId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlSaleId: argData.id,
                },
            });
            console.log(
                "KCD_MATL_SALE DELETE:",
                JSON.stringify(data.deleteKCD_MATL_SALE),
            );
            return data.deleteKCD_MATL_SALE;
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
                    mutation MgrKcdMatlSaleDeletes(
                        $ids: [InputMgrKcdMatlSaleDeletes!]!
                    ) {
                        mgrKcdMatlSaleDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_SALE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
