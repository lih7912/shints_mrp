/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_PAY_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_PAY_MEM {
                        allQuerySSV_PAY_MEM {
                            id
                            PAY_IDX
                            PAYM_IDX
                            AGENT_CD
                            PAY_DATE
                            IN_DATE
                            IN_AMT
                            PAY_STATUS
                            PAY_TYPE
                            PAY_USER
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                        }
                    }
                `,
            });
            console.log(
                "SSV_PAY_MEM:",
                JSON.stringify(data.allQuerySSV_PAY_MEM.length),
            );
            return data.allQuerySSV_PAY_MEM;
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
                    query MgrSsvPayMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvPayMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PAY_IDX
                            PAYM_IDX
                            AGENT_CD
                            PAY_DATE
                            IN_DATE
                            IN_AMT
                            PAY_STATUS
                            PAY_TYPE
                            PAY_USER
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_PAY_MEM:",
                JSON.stringify(data.mgrSsvPayMemQuery.length),
            );
            return data.mgrSsvPayMemQuery;
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
                    mutation CreateSSV_PAY_MEM(
                        $payIdx: Int
                        $paymIdx: Int!
                        $agentCd: String
                        $payDate: String
                        $inDate: String
                        $inAmt: Float
                        $payStatus: String
                        $payType: String
                        $payUser: String
                        $bankCd: String
                        $statusCd: String!
                        $regUser: String
                        $regDatetime: String
                        $shintsUser: String
                    ) {
                        createSSV_PAY_MEM(
                            PAY_IDX: $payIdx
                            PAYM_IDX: $paymIdx
                            AGENT_CD: $agentCd
                            PAY_DATE: $payDate
                            IN_DATE: $inDate
                            IN_AMT: $inAmt
                            PAY_STATUS: $payStatus
                            PAY_TYPE: $payType
                            PAY_USER: $payUser
                            BANK_CD: $bankCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            shints_user: $shintsUser
                        ) {
                            PAY_IDX
                            PAYM_IDX
                            AGENT_CD
                            PAY_DATE
                            IN_DATE
                            IN_AMT
                            PAY_STATUS
                            PAY_TYPE
                            PAY_USER
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                        }
                    }
                `,
                variables: {
                    payIdx: argData.PAY_IDX,
                    paymIdx: argData.PAYM_IDX,
                    agentCd: argData.AGENT_CD,
                    payDate: argData.PAY_DATE,
                    inDate: argData.IN_DATE,
                    inAmt: argData.IN_AMT,
                    payStatus: argData.PAY_STATUS,
                    payType: argData.PAY_TYPE,
                    payUser: argData.PAY_USER,
                    bankCd: argData.BANK_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    shintsUser: argData.shints_user,
                },
            });
            console.log(
                "SSV_PAY_MEM INSERT:",
                JSON.stringify(data.createSSV_PAY_MEM),
            );
            return data.createSSV_PAY_MEM;
        } catch (e) {
            console.log("SSV_PAY_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_PAY_MEM(
                        $updateSsvPayMemId: Int!
                        $payIdx: Int
                        $paymIdx: Int!
                        $agentCd: String
                        $payDate: String
                        $inDate: String
                        $inAmt: Float
                        $payStatus: String
                        $payType: String
                        $payUser: String
                        $bankCd: String
                        $statusCd: String!
                        $regUser: String
                        $regDatetime: String
                        $shintsUser: String
                    ) {
                        updateSSV_PAY_MEM(
                            id: $updateSsvPayMemId
                            PAY_IDX: $payIdx
                            PAYM_IDX: $paymIdx
                            AGENT_CD: $agentCd
                            PAY_DATE: $payDate
                            IN_DATE: $inDate
                            IN_AMT: $inAmt
                            PAY_STATUS: $payStatus
                            PAY_TYPE: $payType
                            PAY_USER: $payUser
                            BANK_CD: $bankCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            shints_user: $shintsUser
                        ) {
                            id
                            PAY_IDX
                            PAYM_IDX
                            AGENT_CD
                            PAY_DATE
                            IN_DATE
                            IN_AMT
                            PAY_STATUS
                            PAY_TYPE
                            PAY_USER
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                        }
                    }
                `,
                variables: {
                    updateSsvPayMemId: argData.id,
                    payIdx: argData.PAY_IDX,
                    paymIdx: argData.PAYM_IDX,
                    agentCd: argData.AGENT_CD,
                    payDate: argData.PAY_DATE,
                    inDate: argData.IN_DATE,
                    inAmt: argData.IN_AMT,
                    payStatus: argData.PAY_STATUS,
                    payType: argData.PAY_TYPE,
                    payUser: argData.PAY_USER,
                    bankCd: argData.BANK_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    shintsUser: argData.shints_user,
                },
            });
            console.log(
                "SSV_PAY_MEM UPDATE:",
                JSON.stringify(data.updateSSV_PAY_MEM),
            );
            return data.updateSSV_PAY_MEM;
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
                    mutation DeleteSSV_PAY_MEM($deleteSsvPayMemId: Int!) {
                        deleteSSV_PAY_MEM(id: $deleteSsvPayMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvPayMemId: argData.id,
                },
            });
            console.log(
                "SSV_PAY_MEM DELETE:",
                JSON.stringify(data.deleteSSV_PAY_MEM),
            );
            return data.deleteSSV_PAY_MEM;
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
                    mutation MgrSsvPayMemDeletes(
                        $ids: [InputMgrSsvPayMemDeletes!]!
                    ) {
                        mgrSsvPayMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_PAY_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
