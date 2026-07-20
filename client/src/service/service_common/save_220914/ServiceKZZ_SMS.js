/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_SMS {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_SMS {
                        allQueryKZZ_SMS {
                            id
                            sms_seq
                            rcv_number
                            msg
                            reg_datetime
                            reg_user
                            status
                        }
                    }
                `,
            });
            console.log(
                "KZZ_SMS:",
                JSON.stringify(data.allQueryKZZ_SMS.length),
            );
            return data.allQueryKZZ_SMS;
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
                    query MgrKzzSmsQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzSmsQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            sms_seq
                            rcv_number
                            msg
                            reg_datetime
                            reg_user
                            status
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("KZZ_SMS:", JSON.stringify(data.mgrKzzSmsQuery.length));
            return data.mgrKzzSmsQuery;
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
                    mutation CreateKZZ_SMS(
                        $smsSeq: Int!
                        $rcvNumber: String
                        $msg: String
                        $regDatetime: String
                        $regUser: String
                        $status: String
                    ) {
                        createKZZ_SMS(
                            sms_seq: $smsSeq
                            rcv_number: $rcvNumber
                            msg: $msg
                            reg_datetime: $regDatetime
                            reg_user: $regUser
                            status: $status
                        ) {
                            sms_seq
                            rcv_number
                            msg
                            reg_datetime
                            reg_user
                            status
                        }
                    }
                `,
                variables: {
                    smsSeq: argData.sms_seq,
                    rcvNumber: argData.rcv_number,
                    msg: argData.msg,
                    regDatetime: argData.reg_datetime,
                    regUser: argData.reg_user,
                    status: argData.status,
                },
            });
            console.log("KZZ_SMS INSERT:", JSON.stringify(data.createKZZ_SMS));
            return data.createKZZ_SMS;
        } catch (e) {
            console.log("KZZ_SMS INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_SMS(
                        $updateKzzSmsId: Int!
                        $smsSeq: Int!
                        $rcvNumber: String
                        $msg: String
                        $regDatetime: String
                        $regUser: String
                        $status: String
                    ) {
                        updateKZZ_SMS(
                            id: $updateKzzSmsId
                            sms_seq: $smsSeq
                            rcv_number: $rcvNumber
                            msg: $msg
                            reg_datetime: $regDatetime
                            reg_user: $regUser
                            status: $status
                        ) {
                            id
                            sms_seq
                            rcv_number
                            msg
                            reg_datetime
                            reg_user
                            status
                        }
                    }
                `,
                variables: {
                    updateKzzSmsId: argData.id,
                    smsSeq: argData.sms_seq,
                    rcvNumber: argData.rcv_number,
                    msg: argData.msg,
                    regDatetime: argData.reg_datetime,
                    regUser: argData.reg_user,
                    status: argData.status,
                },
            });
            console.log("KZZ_SMS UPDATE:", JSON.stringify(data.updateKZZ_SMS));
            return data.updateKZZ_SMS;
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
                    mutation DeleteKZZ_SMS($deleteKzzSmsId: Int!) {
                        deleteKZZ_SMS(id: $deleteKzzSmsId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzSmsId: argData.id,
                },
            });
            console.log("KZZ_SMS DELETE:", JSON.stringify(data.deleteKZZ_SMS));
            return data.deleteKZZ_SMS;
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
                    mutation MgrKzzSmsDeletes($ids: [InputMgrKzzSmsDeletes!]!) {
                        mgrKzzSmsDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_SMS DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
