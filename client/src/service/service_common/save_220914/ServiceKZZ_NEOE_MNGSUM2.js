/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_NEOE_MNGSUM2 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_NEOE_MNGSUM2 {
                        allQueryKZZ_NEOE_MNGSUM2 {
                            id
                            NO_DOCU
                            DT_ACCT
                            CD_ACCT
                            NM_NOTE
                            AM_CR
                            CD_MNGD1
                            NM_MNGD1
                            CD_MNGD2
                            NM_MNGD2
                            CD_MNGD3
                            NM_PUMM
                            SANG
                            USER_ID
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KZZ_NEOE_MNGSUM2:",
                JSON.stringify(data.allQueryKZZ_NEOE_MNGSUM2.length),
            );
            return data.allQueryKZZ_NEOE_MNGSUM2;
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
                    query MgrKzzNeoeMngsum2Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzNeoeMngsum2Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            NO_DOCU
                            DT_ACCT
                            CD_ACCT
                            NM_NOTE
                            AM_CR
                            CD_MNGD1
                            NM_MNGD1
                            CD_MNGD2
                            NM_MNGD2
                            CD_MNGD3
                            NM_PUMM
                            SANG
                            USER_ID
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_NEOE_MNGSUM2:",
                JSON.stringify(data.mgrKzzNeoeMngsum2Query.length),
            );
            return data.mgrKzzNeoeMngsum2Query;
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
                    mutation CreateKZZ_NEOE_MNGSUM2(
                        $noDocu: String
                        $dtAcct: String
                        $cdAcct: String
                        $nmNote: String
                        $amCr: String
                        $cdMngd1: String
                        $nmMngd1: String
                        $cdMngd2: String
                        $nmMngd2: String
                        $cdMngd3: String
                        $nmPumm: String
                        $sang: String
                        $userId: String
                        $regDatetime: String
                    ) {
                        createKZZ_NEOE_MNGSUM2(
                            NO_DOCU: $noDocu
                            DT_ACCT: $dtAcct
                            CD_ACCT: $cdAcct
                            NM_NOTE: $nmNote
                            AM_CR: $amCr
                            CD_MNGD1: $cdMngd1
                            NM_MNGD1: $nmMngd1
                            CD_MNGD2: $cdMngd2
                            NM_MNGD2: $nmMngd2
                            CD_MNGD3: $cdMngd3
                            NM_PUMM: $nmPumm
                            SANG: $sang
                            USER_ID: $userId
                            REG_DATETIME: $regDatetime
                        ) {
                            NO_DOCU
                            DT_ACCT
                            CD_ACCT
                            NM_NOTE
                            AM_CR
                            CD_MNGD1
                            NM_MNGD1
                            CD_MNGD2
                            NM_MNGD2
                            CD_MNGD3
                            NM_PUMM
                            SANG
                            USER_ID
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    noDocu: argData.NO_DOCU,
                    dtAcct: argData.DT_ACCT,
                    cdAcct: argData.CD_ACCT,
                    nmNote: argData.NM_NOTE,
                    amCr: argData.AM_CR,
                    cdMngd1: argData.CD_MNGD1,
                    nmMngd1: argData.NM_MNGD1,
                    cdMngd2: argData.CD_MNGD2,
                    nmMngd2: argData.NM_MNGD2,
                    cdMngd3: argData.CD_MNGD3,
                    nmPumm: argData.NM_PUMM,
                    sang: argData.SANG,
                    userId: argData.USER_ID,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM2 INSERT:",
                JSON.stringify(data.createKZZ_NEOE_MNGSUM2),
            );
            return data.createKZZ_NEOE_MNGSUM2;
        } catch (e) {
            console.log("KZZ_NEOE_MNGSUM2 INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_NEOE_MNGSUM2(
                        $updateKzzNeoeMngsum2Id: Int!
                        $noDocu: String
                        $dtAcct: String
                        $cdAcct: String
                        $nmNote: String
                        $amCr: String
                        $cdMngd1: String
                        $nmMngd1: String
                        $cdMngd2: String
                        $nmMngd2: String
                        $cdMngd3: String
                        $nmPumm: String
                        $sang: String
                        $userId: String
                        $regDatetime: String
                    ) {
                        updateKZZ_NEOE_MNGSUM2(
                            id: $updateKzzNeoeMngsum2Id
                            NO_DOCU: $noDocu
                            DT_ACCT: $dtAcct
                            CD_ACCT: $cdAcct
                            NM_NOTE: $nmNote
                            AM_CR: $amCr
                            CD_MNGD1: $cdMngd1
                            NM_MNGD1: $nmMngd1
                            CD_MNGD2: $cdMngd2
                            NM_MNGD2: $nmMngd2
                            CD_MNGD3: $cdMngd3
                            NM_PUMM: $nmPumm
                            SANG: $sang
                            USER_ID: $userId
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            NO_DOCU
                            DT_ACCT
                            CD_ACCT
                            NM_NOTE
                            AM_CR
                            CD_MNGD1
                            NM_MNGD1
                            CD_MNGD2
                            NM_MNGD2
                            CD_MNGD3
                            NM_PUMM
                            SANG
                            USER_ID
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKzzNeoeMngsum2Id: argData.id,
                    noDocu: argData.NO_DOCU,
                    dtAcct: argData.DT_ACCT,
                    cdAcct: argData.CD_ACCT,
                    nmNote: argData.NM_NOTE,
                    amCr: argData.AM_CR,
                    cdMngd1: argData.CD_MNGD1,
                    nmMngd1: argData.NM_MNGD1,
                    cdMngd2: argData.CD_MNGD2,
                    nmMngd2: argData.NM_MNGD2,
                    cdMngd3: argData.CD_MNGD3,
                    nmPumm: argData.NM_PUMM,
                    sang: argData.SANG,
                    userId: argData.USER_ID,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM2 UPDATE:",
                JSON.stringify(data.updateKZZ_NEOE_MNGSUM2),
            );
            return data.updateKZZ_NEOE_MNGSUM2;
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
                    mutation DeleteKZZ_NEOE_MNGSUM2(
                        $deleteKzzNeoeMngsum2Id: Int!
                    ) {
                        deleteKZZ_NEOE_MNGSUM2(id: $deleteKzzNeoeMngsum2Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzNeoeMngsum2Id: argData.id,
                },
            });
            console.log(
                "KZZ_NEOE_MNGSUM2 DELETE:",
                JSON.stringify(data.deleteKZZ_NEOE_MNGSUM2),
            );
            return data.deleteKZZ_NEOE_MNGSUM2;
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
                    mutation MgrKzzNeoeMngsum2Deletes(
                        $ids: [InputMgrKzzNeoeMngsum2Deletes!]!
                    ) {
                        mgrKzzNeoeMngsum2Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_NEOE_MNGSUM2 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
