/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_USE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_USE {
                        allQueryKCD_USE {
                            id
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_CD
                            PART
                            RANK1
                            EMAIL
                            USER_LEVEL
                            STATUS_CD
                            AUTH_KEY
                            ID_RSA
                            TEL_NO
                            EXCEL
                        }
                    }
                `,
            });
            console.log(
                "KCD_USE:",
                JSON.stringify(data.allQueryKCD_USE.length),
            );
            return data.allQueryKCD_USE;
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
                    query MgrKcdUseQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdUseQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_CD
                            PART
                            RANK1
                            EMAIL
                            USER_LEVEL
                            STATUS_CD
                            AUTH_KEY
                            ID_RSA
                            TEL_NO
                            EXCEL
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("KCD_USE:", JSON.stringify(data.mgrKcdUseQuery.length));
            return data.mgrKcdUseQuery;
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
                    mutation CreateKCD_USE(
                        $userId: String!
                        $passwd: String!
                        $userName: String!
                        $factoryCd: String
                        $part: String
                        $rank1: String
                        $email: String
                        $userLevel: String!
                        $statusCd: String!
                        $authKey: String
                        $idRsa: String
                        $telNo: String
                        $excel: String
                    ) {
                        createKCD_USE(
                            USER_ID: $userId
                            PASSWD: $passwd
                            USER_NAME: $userName
                            FACTORY_CD: $factoryCd
                            PART: $part
                            RANK1: $rank1
                            EMAIL: $email
                            USER_LEVEL: $userLevel
                            STATUS_CD: $statusCd
                            AUTH_KEY: $authKey
                            ID_RSA: $idRsa
                            TEL_NO: $telNo
                            EXCEL: $excel
                        ) {
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_CD
                            PART
                            RANK1
                            EMAIL
                            USER_LEVEL
                            STATUS_CD
                            AUTH_KEY
                            ID_RSA
                            TEL_NO
                            EXCEL
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    passwd: argData.PASSWD,
                    userName: argData.USER_NAME,
                    factoryCd: argData.FACTORY_CD,
                    part: argData.PART,
                    rank1: argData.RANK1,
                    email: argData.EMAIL,
                    userLevel: argData.USER_LEVEL,
                    statusCd: argData.STATUS_CD,
                    authKey: argData.AUTH_KEY,
                    idRsa: argData.ID_RSA,
                    telNo: argData.TEL_NO,
                    excel: argData.EXCEL,
                },
            });
            console.log("KCD_USE INSERT:", JSON.stringify(data.createKCD_USE));
            return data.createKCD_USE;
        } catch (e) {
            console.log("KCD_USE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_USE(
                        $updateKcdUseId: Int!
                        $userId: String!
                        $passwd: String!
                        $userName: String!
                        $factoryCd: String
                        $part: String
                        $rank1: String
                        $email: String
                        $userLevel: String!
                        $statusCd: String!
                        $authKey: String
                        $idRsa: String
                        $telNo: String
                        $excel: String
                    ) {
                        updateKCD_USE(
                            id: $updateKcdUseId
                            USER_ID: $userId
                            PASSWD: $passwd
                            USER_NAME: $userName
                            FACTORY_CD: $factoryCd
                            PART: $part
                            RANK1: $rank1
                            EMAIL: $email
                            USER_LEVEL: $userLevel
                            STATUS_CD: $statusCd
                            AUTH_KEY: $authKey
                            ID_RSA: $idRsa
                            TEL_NO: $telNo
                            EXCEL: $excel
                        ) {
                            id
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_CD
                            PART
                            RANK1
                            EMAIL
                            USER_LEVEL
                            STATUS_CD
                            AUTH_KEY
                            ID_RSA
                            TEL_NO
                            EXCEL
                        }
                    }
                `,
                variables: {
                    updateKcdUseId: argData.id,
                    userId: argData.USER_ID,
                    passwd: argData.PASSWD,
                    userName: argData.USER_NAME,
                    factoryCd: argData.FACTORY_CD,
                    part: argData.PART,
                    rank1: argData.RANK1,
                    email: argData.EMAIL,
                    userLevel: argData.USER_LEVEL,
                    statusCd: argData.STATUS_CD,
                    authKey: argData.AUTH_KEY,
                    idRsa: argData.ID_RSA,
                    telNo: argData.TEL_NO,
                    excel: argData.EXCEL,
                },
            });
            console.log("KCD_USE UPDATE:", JSON.stringify(data.updateKCD_USE));
            return data.updateKCD_USE;
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
                    mutation DeleteKCD_USE($deleteKcdUseId: Int!) {
                        deleteKCD_USE(id: $deleteKcdUseId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdUseId: argData.id,
                },
            });
            console.log("KCD_USE DELETE:", JSON.stringify(data.deleteKCD_USE));
            return data.deleteKCD_USE;
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
                    mutation MgrKcdUseDeletes($ids: [InputMgrKcdUseDeletes!]!) {
                        mgrKcdUseDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_USE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
