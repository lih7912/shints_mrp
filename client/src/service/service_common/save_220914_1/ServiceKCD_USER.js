/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_USER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_USER {
                        allQueryKCD_USER {
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
                            BUYER_TEAM
                            CELLULAR
                            EMP_NO
                        }
                    }
                `,
            });
            console.log(
                "KCD_USER:",
                JSON.stringify(data.allQueryKCD_USER.length),
            );
            return data.allQueryKCD_USER;
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
                    query MgrKcdUserQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdUserQuery(
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
                            BUYER_TEAM
                            CELLULAR
                            EMP_NO
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_USER:",
                JSON.stringify(data.mgrKcdUserQuery.length),
            );
            return data.mgrKcdUserQuery;
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
                    mutation CreateKCD_USER(
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
                        $buyerTeam: String
                        $cellular: String
                        $empNo: String
                    ) {
                        createKCD_USER(
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
                            BUYER_TEAM: $buyerTeam
                            CELLULAR: $cellular
                            EMP_NO: $empNo
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
                            BUYER_TEAM
                            CELLULAR
                            EMP_NO
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
                    buyerTeam: argData.BUYER_TEAM,
                    cellular: argData.CELLULAR,
                    empNo: argData.EMP_NO,
                },
            });
            console.log(
                "KCD_USER INSERT:",
                JSON.stringify(data.createKCD_USER),
            );
            return data.createKCD_USER;
        } catch (e) {
            console.log("KCD_USER INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_USER(
                        $updateKcdUserId: Int!
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
                        $buyerTeam: String
                        $cellular: String
                        $empNo: String
                    ) {
                        updateKCD_USER(
                            id: $updateKcdUserId
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
                            BUYER_TEAM: $buyerTeam
                            CELLULAR: $cellular
                            EMP_NO: $empNo
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
                            BUYER_TEAM
                            CELLULAR
                            EMP_NO
                        }
                    }
                `,
                variables: {
                    updateKcdUserId: argData.id,
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
                    buyerTeam: argData.BUYER_TEAM,
                    cellular: argData.CELLULAR,
                    empNo: argData.EMP_NO,
                },
            });
            console.log(
                "KCD_USER UPDATE:",
                JSON.stringify(data.updateKCD_USER),
            );
            return data.updateKCD_USER;
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
                    mutation DeleteKCD_USER($deleteKcdUserId: Int!) {
                        deleteKCD_USER(id: $deleteKcdUserId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdUserId: argData.id,
                },
            });
            console.log(
                "KCD_USER DELETE:",
                JSON.stringify(data.deleteKCD_USER),
            );
            return data.deleteKCD_USER;
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
                    mutation MgrKcdUserDeletes(
                        $ids: [InputMgrKcdUserDeletes!]!
                    ) {
                        mgrKcdUserDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_USER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
