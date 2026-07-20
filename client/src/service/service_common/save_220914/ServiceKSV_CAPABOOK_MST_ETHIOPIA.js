/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CAPABOOK_MST_ETHIOPIA {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPABOOK_MST_ETHIOPIA {
                        allQueryKSV_CAPABOOK_MST_ETHIOPIA {
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
                "KSV_CAPABOOK_MST_ETHIOPIA:",
                JSON.stringify(data.allQueryKSV_CAPABOOK_MST_ETHIOPIA.length),
            );
            return data.allQueryKSV_CAPABOOK_MST_ETHIOPIA;
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
                    query MgrKsvCapabookMstEthiopiaQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapabookMstEthiopiaQuery(
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
                "KSV_CAPABOOK_MST_ETHIOPIA:",
                JSON.stringify(data.mgrKsvCapabookMstEthiopiaQuery.length),
            );
            return data.mgrKsvCapabookMstEthiopiaQuery;
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
                    mutation CreateKSV_CAPABOOK_MST_ETHIOPIA(
                        $bookDate: String
                        $userId: String
                        $statusCd: String
                        $planFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_CAPABOOK_MST_ETHIOPIA(
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
                "KSV_CAPABOOK_MST_ETHIOPIA INSERT:",
                JSON.stringify(data.createKSV_CAPABOOK_MST_ETHIOPIA),
            );
            return data.createKSV_CAPABOOK_MST_ETHIOPIA;
        } catch (e) {
            console.log(
                "KSV_CAPABOOK_MST_ETHIOPIA INSERT ERROR:",
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
                    mutation UpdateKSV_CAPABOOK_MST_ETHIOPIA(
                        $updateKsvCapabookMstEthiopiaId: Int!
                        $bookDate: String
                        $userId: String
                        $statusCd: String
                        $planFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_CAPABOOK_MST_ETHIOPIA(
                            id: $updateKsvCapabookMstEthiopiaId
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
                    updateKsvCapabookMstEthiopiaId: argData.id,
                    bookDate: argData.BOOK_DATE,
                    userId: argData.USER_ID,
                    statusCd: argData.STATUS_CD,
                    planFlag: argData.PLAN_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_CAPABOOK_MST_ETHIOPIA UPDATE:",
                JSON.stringify(data.updateKSV_CAPABOOK_MST_ETHIOPIA),
            );
            return data.updateKSV_CAPABOOK_MST_ETHIOPIA;
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
                    mutation DeleteKSV_CAPABOOK_MST_ETHIOPIA(
                        $deleteKsvCapabookMstEthiopiaId: Int!
                    ) {
                        deleteKSV_CAPABOOK_MST_ETHIOPIA(
                            id: $deleteKsvCapabookMstEthiopiaId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapabookMstEthiopiaId: argData.id,
                },
            });
            console.log(
                "KSV_CAPABOOK_MST_ETHIOPIA DELETE:",
                JSON.stringify(data.deleteKSV_CAPABOOK_MST_ETHIOPIA),
            );
            return data.deleteKSV_CAPABOOK_MST_ETHIOPIA;
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
                    mutation MgrKsvCapabookMstEthiopiaDeletes(
                        $ids: [InputMgrKsvCapabookMstEthiopiaDeletes!]!
                    ) {
                        mgrKsvCapabookMstEthiopiaDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_CAPABOOK_MST_ETHIOPIA DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
