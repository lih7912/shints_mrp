/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_MAIL_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_MAIL_LOG {
                        allQueryKSV_MAIL_LOG {
                            id
                            USER_ID
                            PO_CD
                            PO_SEQ
                            VENDOR_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
            });
            console.log(
                "KSV_MAIL_LOG:",
                JSON.stringify(data.allQueryKSV_MAIL_LOG.length),
            );
            return data.allQueryKSV_MAIL_LOG;
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
                    query MgrKsvMailLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvMailLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            PO_CD
                            PO_SEQ
                            VENDOR_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_MAIL_LOG:",
                JSON.stringify(data.mgrKsvMailLogQuery.length),
            );
            return data.mgrKsvMailLogQuery;
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
                    mutation CreateKSV_MAIL_LOG(
                        $userId: String
                        $poCd: String
                        $poSeq: Int
                        $vendorCd: String
                        $sendEmail: String
                        $sendDatetime: String
                        $sendFlag: String
                        $sendFilename: String
                    ) {
                        createKSV_MAIL_LOG(
                            USER_ID: $userId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            VENDOR_CD: $vendorCd
                            SEND_EMAIL: $sendEmail
                            SEND_DATETIME: $sendDatetime
                            SEND_FLAG: $sendFlag
                            SEND_FILENAME: $sendFilename
                        ) {
                            USER_ID
                            PO_CD
                            PO_SEQ
                            VENDOR_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    vendorCd: argData.VENDOR_CD,
                    sendEmail: argData.SEND_EMAIL,
                    sendDatetime: argData.SEND_DATETIME,
                    sendFlag: argData.SEND_FLAG,
                    sendFilename: argData.SEND_FILENAME,
                },
            });
            console.log(
                "KSV_MAIL_LOG INSERT:",
                JSON.stringify(data.createKSV_MAIL_LOG),
            );
            return data.createKSV_MAIL_LOG;
        } catch (e) {
            console.log("KSV_MAIL_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_MAIL_LOG(
                        $updateKsvMailLogId: Int!
                        $userId: String
                        $poCd: String
                        $poSeq: Int
                        $vendorCd: String
                        $sendEmail: String
                        $sendDatetime: String
                        $sendFlag: String
                        $sendFilename: String
                    ) {
                        updateKSV_MAIL_LOG(
                            id: $updateKsvMailLogId
                            USER_ID: $userId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            VENDOR_CD: $vendorCd
                            SEND_EMAIL: $sendEmail
                            SEND_DATETIME: $sendDatetime
                            SEND_FLAG: $sendFlag
                            SEND_FILENAME: $sendFilename
                        ) {
                            id
                            USER_ID
                            PO_CD
                            PO_SEQ
                            VENDOR_CD
                            SEND_EMAIL
                            SEND_DATETIME
                            SEND_FLAG
                            SEND_FILENAME
                        }
                    }
                `,
                variables: {
                    updateKsvMailLogId: argData.id,
                    userId: argData.USER_ID,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    vendorCd: argData.VENDOR_CD,
                    sendEmail: argData.SEND_EMAIL,
                    sendDatetime: argData.SEND_DATETIME,
                    sendFlag: argData.SEND_FLAG,
                    sendFilename: argData.SEND_FILENAME,
                },
            });
            console.log(
                "KSV_MAIL_LOG UPDATE:",
                JSON.stringify(data.updateKSV_MAIL_LOG),
            );
            return data.updateKSV_MAIL_LOG;
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
                    mutation DeleteKSV_MAIL_LOG($deleteKsvMailLogId: Int!) {
                        deleteKSV_MAIL_LOG(id: $deleteKsvMailLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvMailLogId: argData.id,
                },
            });
            console.log(
                "KSV_MAIL_LOG DELETE:",
                JSON.stringify(data.deleteKSV_MAIL_LOG),
            );
            return data.deleteKSV_MAIL_LOG;
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
                    mutation MgrKsvMailLogDeletes(
                        $ids: [InputMgrKsvMailLogDeletes!]!
                    ) {
                        mgrKsvMailLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_MAIL_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
