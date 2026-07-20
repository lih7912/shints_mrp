/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CAPASAMPLE_MST_ETHIOPIA {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPASAMPLE_MST_ETHIOPIA {
                        allQueryKSV_CAPASAMPLE_MST_ETHIOPIA {
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
                "KSV_CAPASAMPLE_MST_ETHIOPIA:",
                JSON.stringify(data.allQueryKSV_CAPASAMPLE_MST_ETHIOPIA.length),
            );
            return data.allQueryKSV_CAPASAMPLE_MST_ETHIOPIA;
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
                    query MgrKsvCapasampleMstEthiopiaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapasampleMstEthiopiaQuery(
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
                "KSV_CAPASAMPLE_MST_ETHIOPIA:",
                JSON.stringify(data.mgrKsvCapasampleMstEthiopiaQuery.length),
            );
            return data.mgrKsvCapasampleMstEthiopiaQuery;
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
                    mutation CreateKSV_CAPASAMPLE_MST_ETHIOPIA(
                        $bookDate: String
                        $userId: String
                        $statusCd: String
                        $planFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_CAPASAMPLE_MST_ETHIOPIA(
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
                "KSV_CAPASAMPLE_MST_ETHIOPIA INSERT:",
                JSON.stringify(data.createKSV_CAPASAMPLE_MST_ETHIOPIA),
            );
            return data.createKSV_CAPASAMPLE_MST_ETHIOPIA;
        } catch (e) {
            console.log(
                "KSV_CAPASAMPLE_MST_ETHIOPIA INSERT ERROR:",
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
                    mutation UpdateKSV_CAPASAMPLE_MST_ETHIOPIA(
                        $updateKsvCapasampleMstEthiopiaId: Int!
                        $bookDate: String
                        $userId: String
                        $statusCd: String
                        $planFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_CAPASAMPLE_MST_ETHIOPIA(
                            id: $updateKsvCapasampleMstEthiopiaId
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
                    updateKsvCapasampleMstEthiopiaId: argData.id,
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    statusCd: argData.STATUS_CD,
                    planFlag: argData.PLAN_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MST_ETHIOPIA UPDATE:",
                JSON.stringify(data.updateKSV_CAPASAMPLE_MST_ETHIOPIA),
            );
            return data.updateKSV_CAPASAMPLE_MST_ETHIOPIA;
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
                    mutation DeleteKSV_CAPASAMPLE_MST_ETHIOPIA(
                        $deleteKsvCapasampleMstEthiopiaId: Int!
                    ) {
                        deleteKSV_CAPASAMPLE_MST_ETHIOPIA(
                            id: $deleteKsvCapasampleMstEthiopiaId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapasampleMstEthiopiaId: argData.id,
                },
            });
            console.log(
                "KSV_CAPASAMPLE_MST_ETHIOPIA DELETE:",
                JSON.stringify(data.deleteKSV_CAPASAMPLE_MST_ETHIOPIA),
            );
            return data.deleteKSV_CAPASAMPLE_MST_ETHIOPIA;
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
                    mutation MgrKsvCapasampleMstEthiopiaDeletes(
                        $ids: [InputMgrKsvCapasampleMstEthiopiaDeletes!]!
                    ) {
                        mgrKsvCapasampleMstEthiopiaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_CAPASAMPLE_MST_ETHIOPIA DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
