/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CAPASAMPLE_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPASAMPLE_MST {
                        allQueryKSV_CAPASAMPLE_MST {
                            id
                            BOOK_DATE
                            USER_ID
                            STATUS_CD
                            PLAN_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_CAPASAMPLE_MST:",
                JSON.stringify(data.allQueryKSV_CAPASAMPLE_MST.length),
            );
            return data.allQueryKSV_CAPASAMPLE_MST;
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
                    query MgrKsvCapasampleMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapasampleMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BOOK_DATE
                            USER_ID
                            STATUS_CD
                            PLAN_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CAPASAMPLE_MST:",
                JSON.stringify(data.mgrKsvCapasampleMstQuery.length),
            );
            return data.mgrKsvCapasampleMstQuery;
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
                    mutation CreateKSV_CAPASAMPLE_MST(
                        $bookDate: String
                        $userId: String
                        $statusCd: String
                        $planFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_CAPASAMPLE_MST(
                            BOOK_DATE: $bookDate
                            USER_ID: $userId
                            STATUS_CD: $statusCd
                            PLAN_FLAG: $planFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            BOOK_DATE
                            USER_ID
                            STATUS_CD
                            PLAN_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    statusCd: argData.STATUS_CD,
                    planFlag: argData.PLAN_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MST INSERT:",
                JSON.stringify(data.createKSV_CAPASAMPLE_MST),
            );
            return data.createKSV_CAPASAMPLE_MST;
        } catch (e) {
            console.log("KSV_CAPASAMPLE_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CAPASAMPLE_MST(
                        $updateKsvCapasampleMstId: Int!
                        $bookDate: String
                        $userId: String
                        $statusCd: String
                        $planFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_CAPASAMPLE_MST(
                            id: $updateKsvCapasampleMstId
                            BOOK_DATE: $bookDate
                            USER_ID: $userId
                            STATUS_CD: $statusCd
                            PLAN_FLAG: $planFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            BOOK_DATE
                            USER_ID
                            STATUS_CD
                            PLAN_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvCapasampleMstId: argData.id,
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    statusCd: argData.STATUS_CD,
                    planFlag: argData.PLAN_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MST UPDATE:",
                JSON.stringify(data.updateKSV_CAPASAMPLE_MST),
            );
            return data.updateKSV_CAPASAMPLE_MST;
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
                    mutation DeleteKSV_CAPASAMPLE_MST(
                        $deleteKsvCapasampleMstId: Int!
                    ) {
                        deleteKSV_CAPASAMPLE_MST(
                            id: $deleteKsvCapasampleMstId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapasampleMstId: argData.id,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MST DELETE:",
                JSON.stringify(data.deleteKSV_CAPASAMPLE_MST),
            );
            return data.deleteKSV_CAPASAMPLE_MST;
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
                    mutation MgrKsvCapasampleMstDeletes(
                        $ids: [InputMgrKsvCapasampleMstDeletes!]!
                    ) {
                        mgrKsvCapasampleMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CAPASAMPLE_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
