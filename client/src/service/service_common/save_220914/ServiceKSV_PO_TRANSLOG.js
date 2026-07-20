/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_TRANSLOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_TRANSLOG {
                        allQueryKSV_PO_TRANSLOG {
                            id
                            PO_CD
                            FACTORY_CD
                            NEW_PO_CD
                            NEW_FACTORY_CD
                            TRANS_TYPE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_TRANSLOG:",
                JSON.stringify(data.allQueryKSV_PO_TRANSLOG.length),
            );
            return data.allQueryKSV_PO_TRANSLOG;
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
                    query MgrKsvPoTranslogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoTranslogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            FACTORY_CD
                            NEW_PO_CD
                            NEW_FACTORY_CD
                            TRANS_TYPE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_TRANSLOG:",
                JSON.stringify(data.mgrKsvPoTranslogQuery.length),
            );
            return data.mgrKsvPoTranslogQuery;
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
                    mutation CreateKSV_PO_TRANSLOG(
                        $poCd: String
                        $factoryCd: String
                        $newPoCd: String
                        $newFactoryCd: String
                        $transType: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_PO_TRANSLOG(
                            PO_CD: $poCd
                            FACTORY_CD: $factoryCd
                            NEW_PO_CD: $newPoCd
                            NEW_FACTORY_CD: $newFactoryCd
                            TRANS_TYPE: $transType
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            FACTORY_CD
                            NEW_PO_CD
                            NEW_FACTORY_CD
                            TRANS_TYPE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    factoryCd: argData.FACTORY_CD,
                    newPoCd: argData.NEW_PO_CD,
                    newFactoryCd: argData.NEW_FACTORY_CD,
                    transType: argData.TRANS_TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PO_TRANSLOG INSERT:",
                JSON.stringify(data.createKSV_PO_TRANSLOG),
            );
            return data.createKSV_PO_TRANSLOG;
        } catch (e) {
            console.log("KSV_PO_TRANSLOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_TRANSLOG(
                        $updateKsvPoTranslogId: Int!
                        $poCd: String
                        $factoryCd: String
                        $newPoCd: String
                        $newFactoryCd: String
                        $transType: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_PO_TRANSLOG(
                            id: $updateKsvPoTranslogId
                            PO_CD: $poCd
                            FACTORY_CD: $factoryCd
                            NEW_PO_CD: $newPoCd
                            NEW_FACTORY_CD: $newFactoryCd
                            TRANS_TYPE: $transType
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            FACTORY_CD
                            NEW_PO_CD
                            NEW_FACTORY_CD
                            TRANS_TYPE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPoTranslogId: argData.id,
                    poCd: argData.PO_CD,
                    factoryCd: argData.FACTORY_CD,
                    newPoCd: argData.NEW_PO_CD,
                    newFactoryCd: argData.NEW_FACTORY_CD,
                    transType: argData.TRANS_TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PO_TRANSLOG UPDATE:",
                JSON.stringify(data.updateKSV_PO_TRANSLOG),
            );
            return data.updateKSV_PO_TRANSLOG;
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
                    mutation DeleteKSV_PO_TRANSLOG(
                        $deleteKsvPoTranslogId: Int!
                    ) {
                        deleteKSV_PO_TRANSLOG(id: $deleteKsvPoTranslogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoTranslogId: argData.id,
                },
            });
            console.log(
                "KSV_PO_TRANSLOG DELETE:",
                JSON.stringify(data.deleteKSV_PO_TRANSLOG),
            );
            return data.deleteKSV_PO_TRANSLOG;
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
                    mutation MgrKsvPoTranslogDeletes(
                        $ids: [InputMgrKsvPoTranslogDeletes!]!
                    ) {
                        mgrKsvPoTranslogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_TRANSLOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
