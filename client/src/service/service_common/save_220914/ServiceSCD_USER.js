/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_USER {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_USER {
                        allQuerySCD_USER {
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
                            MOBILE_NO
                        }
                    }
                `,
            });
            console.log(
                "SCD_USER:",
                JSON.stringify(data.allQuerySCD_USER.length),
            );
            return data.allQuerySCD_USER;
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
                    query MgrScdUserQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdUserQuery(
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
                            MOBILE_NO
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_USER:",
                JSON.stringify(data.mgrScdUserQuery.length),
            );
            return data.mgrScdUserQuery;
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
                    mutation CreateSCD_USER(
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
                        $mobileNo: String
                    ) {
                        createSCD_USER(
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
                            MOBILE_NO: $mobileNo
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
                            MOBILE_NO
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
                    mobileNo: argData.MOBILE_NO,
                },
            });
            console.log(
                "SCD_USER INSERT:",
                JSON.stringify(data.createSCD_USER),
            );
            return data.createSCD_USER;
        } catch (e) {
            console.log("SCD_USER INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_USER(
                        $updateScdUserId: Int!
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
                        $mobileNo: String
                    ) {
                        updateSCD_USER(
                            id: $updateScdUserId
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
                            MOBILE_NO: $mobileNo
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
                            MOBILE_NO
                        }
                    }
                `,
                variables: {
                    updateScdUserId: argData.id,
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
                    mobileNo: argData.MOBILE_NO,
                },
            });
            console.log(
                "SCD_USER UPDATE:",
                JSON.stringify(data.updateSCD_USER),
            );
            return data.updateSCD_USER;
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
                    mutation DeleteSCD_USER($deleteScdUserId: Int!) {
                        deleteSCD_USER(id: $deleteScdUserId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdUserId: argData.id,
                },
            });
            console.log(
                "SCD_USER DELETE:",
                JSON.stringify(data.deleteSCD_USER),
            );
            return data.deleteSCD_USER;
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
                    mutation MgrScdUserDeletes(
                        $ids: [InputMgrScdUserDeletes!]!
                    ) {
                        mgrScdUserDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_USER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
