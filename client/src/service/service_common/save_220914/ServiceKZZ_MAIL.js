/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_MAIL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_MAIL {
                        allQueryKZZ_MAIL {
                            id
                            REG_DATETIME
                            REG_USER
                            MAIL_HEADER
                            MAIL_BODY
                            MAIL_FROM
                            MAIL_TO
                            MAIL_CC
                            MAIL_BCC
                            STATUS
                        }
                    }
                `,
            });
            console.log(
                "KZZ_MAIL:",
                JSON.stringify(data.allQueryKZZ_MAIL.length),
            );
            return data.allQueryKZZ_MAIL;
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
                    query MgrKzzMailQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzMailQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            REG_DATETIME
                            REG_USER
                            MAIL_HEADER
                            MAIL_BODY
                            MAIL_FROM
                            MAIL_TO
                            MAIL_CC
                            MAIL_BCC
                            STATUS
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_MAIL:",
                JSON.stringify(data.mgrKzzMailQuery.length),
            );
            return data.mgrKzzMailQuery;
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
                    mutation CreateKZZ_MAIL(
                        $regDatetime: String
                        $regUser: String
                        $mailHeader: String
                        $mailBody: String
                        $mailFrom: String
                        $mailTo: String
                        $mailCc: String
                        $mailBcc: String
                        $status: Int
                    ) {
                        createKZZ_MAIL(
                            REG_DATETIME: $regDatetime
                            REG_USER: $regUser
                            MAIL_HEADER: $mailHeader
                            MAIL_BODY: $mailBody
                            MAIL_FROM: $mailFrom
                            MAIL_TO: $mailTo
                            MAIL_CC: $mailCc
                            MAIL_BCC: $mailBcc
                            STATUS: $status
                        ) {
                            REG_DATETIME
                            REG_USER
                            MAIL_HEADER
                            MAIL_BODY
                            MAIL_FROM
                            MAIL_TO
                            MAIL_CC
                            MAIL_BCC
                            STATUS
                        }
                    }
                `,
                variables: {
                    regDatetime: argData.REG_DATETIME,
                    regUser: argData.REG_USER,
                    mailHeader: argData.MAIL_HEADER,
                    mailBody: argData.MAIL_BODY,
                    mailFrom: argData.MAIL_FROM,
                    mailTo: argData.MAIL_TO,
                    mailCc: argData.MAIL_CC,
                    mailBcc: argData.MAIL_BCC,
                    status: argData.STATUS,
                },
            });
            console.log(
                "KZZ_MAIL INSERT:",
                JSON.stringify(data.createKZZ_MAIL),
            );
            return data.createKZZ_MAIL;
        } catch (e) {
            console.log("KZZ_MAIL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_MAIL(
                        $updateKzzMailId: Int!
                        $regDatetime: String
                        $regUser: String
                        $mailHeader: String
                        $mailBody: String
                        $mailFrom: String
                        $mailTo: String
                        $mailCc: String
                        $mailBcc: String
                        $status: Int
                    ) {
                        updateKZZ_MAIL(
                            id: $updateKzzMailId
                            REG_DATETIME: $regDatetime
                            REG_USER: $regUser
                            MAIL_HEADER: $mailHeader
                            MAIL_BODY: $mailBody
                            MAIL_FROM: $mailFrom
                            MAIL_TO: $mailTo
                            MAIL_CC: $mailCc
                            MAIL_BCC: $mailBcc
                            STATUS: $status
                        ) {
                            id
                            REG_DATETIME
                            REG_USER
                            MAIL_HEADER
                            MAIL_BODY
                            MAIL_FROM
                            MAIL_TO
                            MAIL_CC
                            MAIL_BCC
                            STATUS
                        }
                    }
                `,
                variables: {
                    updateKzzMailId: argData.id,
                    regDatetime: argData.REG_DATETIME,
                    regUser: argData.REG_USER,
                    mailHeader: argData.MAIL_HEADER,
                    mailBody: argData.MAIL_BODY,
                    mailFrom: argData.MAIL_FROM,
                    mailTo: argData.MAIL_TO,
                    mailCc: argData.MAIL_CC,
                    mailBcc: argData.MAIL_BCC,
                    status: argData.STATUS,
                },
            });
            console.log(
                "KZZ_MAIL UPDATE:",
                JSON.stringify(data.updateKZZ_MAIL),
            );
            return data.updateKZZ_MAIL;
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
                    mutation DeleteKZZ_MAIL($deleteKzzMailId: Int!) {
                        deleteKZZ_MAIL(id: $deleteKzzMailId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzMailId: argData.id,
                },
            });
            console.log(
                "KZZ_MAIL DELETE:",
                JSON.stringify(data.deleteKZZ_MAIL),
            );
            return data.deleteKZZ_MAIL;
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
                    mutation MgrKzzMailDeletes(
                        $ids: [InputMgrKzzMailDeletes!]!
                    ) {
                        mgrKzzMailDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_MAIL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
