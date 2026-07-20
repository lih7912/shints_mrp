/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_NEOE_MNGSUM1 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_NEOE_MNGSUM1 {
                        allQueryKZZ_NEOE_MNGSUM1 {
                            id
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_NEOE_MNGSUM1:",
                JSON.stringify(data.allQueryKZZ_NEOE_MNGSUM1.length),
            );
            return data.allQueryKZZ_NEOE_MNGSUM1;
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
                    query MgrKzzNeoeMngsum1Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzNeoeMngsum1Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_NEOE_MNGSUM1:",
                JSON.stringify(data.mgrKzzNeoeMngsum1Query.length),
            );
            return data.mgrKzzNeoeMngsum1Query;
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
                    mutation CreateKZZ_NEOE_MNGSUM1(
                        $userId: String
                        $cdAcct: String
                        $nmAcct: String
                        $cdCode: String
                        $nmCc: String
                        $amAmt: Float
                        $seq: String
                        $regDatetime: String
                    ) {
                        createKZZ_NEOE_MNGSUM1(
                            USER_ID: $userId
                            CD_ACCT: $cdAcct
                            NM_ACCT: $nmAcct
                            CD_CODE: $cdCode
                            NM_CC: $nmCc
                            AM_AMT: $amAmt
                            SEQ: $seq
                            REG_DATETIME: $regDatetime
                        ) {
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    cdAcct: argData.CD_ACCT,
                    nmAcct: argData.NM_ACCT,
                    cdCode: argData.CD_CODE,
                    nmCc: argData.NM_CC,
                    amAmt: argData.AM_AMT,
                    seq: argData.SEQ,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM1 INSERT:",
                JSON.stringify(data.createKZZ_NEOE_MNGSUM1),
            );
            return data.createKZZ_NEOE_MNGSUM1;
        } catch (e) {
            console.log("KZZ_NEOE_MNGSUM1 INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_NEOE_MNGSUM1(
                        $updateKzzNeoeMngsum1Id: Int!
                        $userId: String
                        $cdAcct: String
                        $nmAcct: String
                        $cdCode: String
                        $nmCc: String
                        $amAmt: Float
                        $seq: String
                        $regDatetime: String
                    ) {
                        updateKZZ_NEOE_MNGSUM1(
                            id: $updateKzzNeoeMngsum1Id
                            USER_ID: $userId
                            CD_ACCT: $cdAcct
                            NM_ACCT: $nmAcct
                            CD_CODE: $cdCode
                            NM_CC: $nmCc
                            AM_AMT: $amAmt
                            SEQ: $seq
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            USER_ID
                            CD_ACCT
                            NM_ACCT
                            CD_CODE
                            NM_CC
                            AM_AMT
                            SEQ
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzNeoeMngsum1Id: argData.id,
                    userId: argData.USER_ID,
                    cdAcct: argData.CD_ACCT,
                    nmAcct: argData.NM_ACCT,
                    cdCode: argData.CD_CODE,
                    nmCc: argData.NM_CC,
                    amAmt: argData.AM_AMT,
                    seq: argData.SEQ,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM1 UPDATE:",
                JSON.stringify(data.updateKZZ_NEOE_MNGSUM1),
            );
            return data.updateKZZ_NEOE_MNGSUM1;
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
                    mutation DeleteKZZ_NEOE_MNGSUM1(
                        $deleteKzzNeoeMngsum1Id: Int!
                    ) {
                        deleteKZZ_NEOE_MNGSUM1(id: $deleteKzzNeoeMngsum1Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzNeoeMngsum1Id: argData.id,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM1 DELETE:",
                JSON.stringify(data.deleteKZZ_NEOE_MNGSUM1),
            );
            return data.deleteKZZ_NEOE_MNGSUM1;
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
                    mutation MgrKzzNeoeMngsum1Deletes(
                        $ids: [InputMgrKzzNeoeMngsum1Deletes!]!
                    ) {
                        mgrKzzNeoeMngsum1Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_NEOE_MNGSUM1 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
