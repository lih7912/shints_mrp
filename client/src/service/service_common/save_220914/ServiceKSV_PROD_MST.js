/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PROD_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PROD_MST {
                        allQueryKSV_PROD_MST {
                            id
                            PROD_CD
                            STYLE_CD
                            PROD_TYPE
                            COLOR
                            PROD_UNIT
                            COLLECTION
                            YY
                            SEQ
                            SIZE_LOSS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PROD_MST:",
                JSON.stringify(data.allQueryKSV_PROD_MST.length),
            );
            return data.allQueryKSV_PROD_MST;
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
                    query MgrKsvProdMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvProdMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PROD_CD
                            STYLE_CD
                            PROD_TYPE
                            COLOR
                            PROD_UNIT
                            COLLECTION
                            YY
                            SEQ
                            SIZE_LOSS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PROD_MST:",
                JSON.stringify(data.mgrKsvProdMstQuery.length),
            );
            return data.mgrKsvProdMstQuery;
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
                    mutation CreateKSV_PROD_MST(
                        $prodCd: String
                        $styleCd: String
                        $prodType: String
                        $color: String
                        $prodUnit: String
                        $collection: String
                        $yy: Int
                        $seq: Int
                        $sizeLoss: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKSV_PROD_MST(
                            PROD_CD: $prodCd
                            STYLE_CD: $styleCd
                            PROD_TYPE: $prodType
                            COLOR: $color
                            PROD_UNIT: $prodUnit
                            COLLECTION: $collection
                            YY: $yy
                            SEQ: $seq
                            SIZE_LOSS: $sizeLoss
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            PROD_CD
                            STYLE_CD
                            PROD_TYPE
                            COLOR
                            PROD_UNIT
                            COLLECTION
                            YY
                            SEQ
                            SIZE_LOSS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    prodCd: argData.PROD_CD,
                    styleCd: argData.STYLE_CD,
                    prodType: argData.PROD_TYPE,
                    color: argData.COLOR,
                    prodUnit: argData.PROD_UNIT,
                    collection: argData.COLLECTION,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    sizeLoss: argData.SIZE_LOSS,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_PROD_MST INSERT:",
                JSON.stringify(data.createKSV_PROD_MST),
            );
            return data.createKSV_PROD_MST;
        } catch (e) {
            console.log("KSV_PROD_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PROD_MST(
                        $updateKsvProdMstId: Int!
                        $prodCd: String
                        $styleCd: String
                        $prodType: String
                        $color: String
                        $prodUnit: String
                        $collection: String
                        $yy: Int
                        $seq: Int
                        $sizeLoss: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKSV_PROD_MST(
                            id: $updateKsvProdMstId
                            PROD_CD: $prodCd
                            STYLE_CD: $styleCd
                            PROD_TYPE: $prodType
                            COLOR: $color
                            PROD_UNIT: $prodUnit
                            COLLECTION: $collection
                            YY: $yy
                            SEQ: $seq
                            SIZE_LOSS: $sizeLoss
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            PROD_CD
                            STYLE_CD
                            PROD_TYPE
                            COLOR
                            PROD_UNIT
                            COLLECTION
                            YY
                            SEQ
                            SIZE_LOSS
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvProdMstId: argData.id,
                    prodCd: argData.PROD_CD,
                    styleCd: argData.STYLE_CD,
                    prodType: argData.PROD_TYPE,
                    color: argData.COLOR,
                    prodUnit: argData.PROD_UNIT,
                    collection: argData.COLLECTION,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    sizeLoss: argData.SIZE_LOSS,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KSV_PROD_MST UPDATE:",
                JSON.stringify(data.updateKSV_PROD_MST),
            );
            return data.updateKSV_PROD_MST;
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
                    mutation DeleteKSV_PROD_MST($deleteKsvProdMstId: Int!) {
                        deleteKSV_PROD_MST(id: $deleteKsvProdMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvProdMstId: argData.id,
                },
            });
            console.log(
                "KSV_PROD_MST DELETE:",
                JSON.stringify(data.deleteKSV_PROD_MST),
            );
            return data.deleteKSV_PROD_MST;
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
                    mutation MgrKsvProdMstDeletes(
                        $ids: [InputMgrKsvProdMstDeletes!]!
                    ) {
                        mgrKsvProdMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PROD_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
