/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_PAY_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_PAY_MST {
                        allQuerySSV_PAY_MST {
                            id
                            PAY_IDX
                            AGENT_CD
                            PAY_DATE
                            PAY_AMT
                            IN_AMT
                            REM_AMT
                            PAY_STATUS
                            TAX_ISSUE_FLAG
                            TAX_NO
                            ISSUE_DATE
                            ISSUE_USER
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                            docu_no
                        }
                    }
                `,
            });
            console.log(
                "SSV_PAY_MST:",
                JSON.stringify(data.allQuerySSV_PAY_MST.length),
            );
            return data.allQuerySSV_PAY_MST;
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
                    query MgrSsvPayMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvPayMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PAY_IDX
                            AGENT_CD
                            PAY_DATE
                            PAY_AMT
                            IN_AMT
                            REM_AMT
                            PAY_STATUS
                            TAX_ISSUE_FLAG
                            TAX_NO
                            ISSUE_DATE
                            ISSUE_USER
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                            docu_no
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_PAY_MST:",
                JSON.stringify(data.mgrSsvPayMstQuery.length),
            );
            return data.mgrSsvPayMstQuery;
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
                    mutation CreateSSV_PAY_MST(
                        $payIdx: Int!
                        $agentCd: String
                        $payDate: String
                        $payAmt: Float
                        $inAmt: Float
                        $remAmt: Float
                        $payStatus: String
                        $taxIssueFlag: String
                        $taxNo: String
                        $issueDate: String
                        $issueUser: String
                        $remark: String
                        $statusCd: String!
                        $regUser: String
                        $regDatetime: String
                        $shintsUser: String
                        $docuNo: String
                    ) {
                        createSSV_PAY_MST(
                            PAY_IDX: $payIdx
                            AGENT_CD: $agentCd
                            PAY_DATE: $payDate
                            PAY_AMT: $payAmt
                            IN_AMT: $inAmt
                            REM_AMT: $remAmt
                            PAY_STATUS: $payStatus
                            TAX_ISSUE_FLAG: $taxIssueFlag
                            TAX_NO: $taxNo
                            ISSUE_DATE: $issueDate
                            ISSUE_USER: $issueUser
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            shints_user: $shintsUser
                            docu_no: $docuNo
                        ) {
                            PAY_IDX
                            AGENT_CD
                            PAY_DATE
                            PAY_AMT
                            IN_AMT
                            REM_AMT
                            PAY_STATUS
                            TAX_ISSUE_FLAG
                            TAX_NO
                            ISSUE_DATE
                            ISSUE_USER
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                            docu_no
                        }
                    }
                `,
                variables: {
                    payIdx: argData.PAY_IDX,
                    agentCd: argData.AGENT_CD,
                    payDate: argData.PAY_DATE,
                    payAmt: argData.PAY_AMT,
                    inAmt: argData.IN_AMT,
                    remAmt: argData.REM_AMT,
                    payStatus: argData.PAY_STATUS,
                    taxIssueFlag: argData.TAX_ISSUE_FLAG,
                    taxNo: argData.TAX_NO,
                    issueDate: argData.ISSUE_DATE,
                    issueUser: argData.ISSUE_USER,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    shintsUser: argData.shints_user,
                    docuNo: argData.docu_no,
                },
            });
            console.log(
                "SSV_PAY_MST INSERT:",
                JSON.stringify(data.createSSV_PAY_MST),
            );
            return data.createSSV_PAY_MST;
        } catch (e) {
            console.log("SSV_PAY_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_PAY_MST(
                        $updateSsvPayMstId: Int!
                        $payIdx: Int!
                        $agentCd: String
                        $payDate: String
                        $payAmt: Float
                        $inAmt: Float
                        $remAmt: Float
                        $payStatus: String
                        $taxIssueFlag: String
                        $taxNo: String
                        $issueDate: String
                        $issueUser: String
                        $remark: String
                        $statusCd: String!
                        $regUser: String
                        $regDatetime: String
                        $shintsUser: String
                        $docuNo: String
                    ) {
                        updateSSV_PAY_MST(
                            id: $updateSsvPayMstId
                            PAY_IDX: $payIdx
                            AGENT_CD: $agentCd
                            PAY_DATE: $payDate
                            PAY_AMT: $payAmt
                            IN_AMT: $inAmt
                            REM_AMT: $remAmt
                            PAY_STATUS: $payStatus
                            TAX_ISSUE_FLAG: $taxIssueFlag
                            TAX_NO: $taxNo
                            ISSUE_DATE: $issueDate
                            ISSUE_USER: $issueUser
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            shints_user: $shintsUser
                            docu_no: $docuNo
                        ) {
                            id
                            PAY_IDX
                            AGENT_CD
                            PAY_DATE
                            PAY_AMT
                            IN_AMT
                            REM_AMT
                            PAY_STATUS
                            TAX_ISSUE_FLAG
                            TAX_NO
                            ISSUE_DATE
                            ISSUE_USER
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            shints_user
                            docu_no
                        }
                    }
                `,
                variables: {
                    updateSsvPayMstId: argData.id,
                    payIdx: argData.PAY_IDX,
                    agentCd: argData.AGENT_CD,
                    payDate: argData.PAY_DATE,
                    payAmt: argData.PAY_AMT,
                    inAmt: argData.IN_AMT,
                    remAmt: argData.REM_AMT,
                    payStatus: argData.PAY_STATUS,
                    taxIssueFlag: argData.TAX_ISSUE_FLAG,
                    taxNo: argData.TAX_NO,
                    issueDate: argData.ISSUE_DATE,
                    issueUser: argData.ISSUE_USER,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    shintsUser: argData.shints_user,
                    docuNo: argData.docu_no,
                },
            });
            console.log(
                "SSV_PAY_MST UPDATE:",
                JSON.stringify(data.updateSSV_PAY_MST),
            );
            return data.updateSSV_PAY_MST;
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
                    mutation DeleteSSV_PAY_MST($deleteSsvPayMstId: Int!) {
                        deleteSSV_PAY_MST(id: $deleteSsvPayMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvPayMstId: argData.id,
                },
            });
            console.log(
                "SSV_PAY_MST DELETE:",
                JSON.stringify(data.deleteSSV_PAY_MST),
            );
            return data.deleteSSV_PAY_MST;
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
                    mutation MgrSsvPayMstDeletes(
                        $ids: [InputMgrSsvPayMstDeletes!]!
                    ) {
                        mgrSsvPayMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_PAY_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
