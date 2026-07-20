/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_LOG {
                        allQueryKSV_PO_LOG {
                            id
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            FIX_FLAG
                            PO_LOG_TYPE
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_LOG:",
                JSON.stringify(data.allQueryKSV_PO_LOG.length),
            );
            return data.allQueryKSV_PO_LOG;
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
                    query MgrKsvPoLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            FIX_FLAG
                            PO_LOG_TYPE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_LOG:",
                JSON.stringify(data.mgrKsvPoLogQuery.length),
            );
            return data.mgrKsvPoLogQuery;
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
                    mutation CreateKSV_PO_LOG(
                        $poCd: String
                        $poSeq: Int
                        $regUser: String
                        $regDatetime: String
                        $fixFlag: String
                        $poLogType: String
                    ) {
                        createKSV_PO_LOG(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            FIX_FLAG: $fixFlag
                            PO_LOG_TYPE: $poLogType
                        ) {
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            FIX_FLAG
                            PO_LOG_TYPE
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    fixFlag: argData.FIX_FLAG,
                    poLogType: argData.PO_LOG_TYPE,
                },
            });
            console.log(
                "KSV_PO_LOG INSERT:",
                JSON.stringify(data.createKSV_PO_LOG),
            );
            return data.createKSV_PO_LOG;
        } catch (e) {
            console.log("KSV_PO_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_LOG(
                        $updateKsvPoLogId: Int!
                        $poCd: String
                        $poSeq: Int
                        $regUser: String
                        $regDatetime: String
                        $fixFlag: String
                        $poLogType: String
                    ) {
                        updateKSV_PO_LOG(
                            id: $updateKsvPoLogId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            FIX_FLAG: $fixFlag
                            PO_LOG_TYPE: $poLogType
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            REG_USER
                            REG_DATETIME
                            FIX_FLAG
                            PO_LOG_TYPE
                        }
                    }
                `,
                variables: {
                    updateKsvPoLogId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    fixFlag: argData.FIX_FLAG,
                    poLogType: argData.PO_LOG_TYPE,
                },
            });
            console.log(
                "KSV_PO_LOG UPDATE:",
                JSON.stringify(data.updateKSV_PO_LOG),
            );
            return data.updateKSV_PO_LOG;
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
                    mutation DeleteKSV_PO_LOG($deleteKsvPoLogId: Int!) {
                        deleteKSV_PO_LOG(id: $deleteKsvPoLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoLogId: argData.id,
                },
            });
            console.log(
                "KSV_PO_LOG DELETE:",
                JSON.stringify(data.deleteKSV_PO_LOG),
            );
            return data.deleteKSV_PO_LOG;
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
                    mutation MgrKsvPoLogDeletes(
                        $ids: [InputMgrKsvPoLogDeletes!]!
                    ) {
                        mgrKsvPoLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
