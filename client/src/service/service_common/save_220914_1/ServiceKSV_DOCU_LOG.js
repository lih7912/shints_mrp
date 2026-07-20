/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_DOCU_LOG {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_DOCU_LOG {
                        allQueryKSV_DOCU_LOG {
                            id
                            DOCU_NO
                            TAX_NO
                            AGENT_CD
                            NEOE_AGENT
                            START_DATE
                            END_DATE
                            ISSUE_DATE
                            TOT_AMT
                            ORG_AMT
                            VAT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_DOCU_LOG:",
                JSON.stringify(data.allQueryKSV_DOCU_LOG.length),
            );
            return data.allQueryKSV_DOCU_LOG;
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
                    query MgrKsvDocuLogQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvDocuLogQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            DOCU_NO
                            TAX_NO
                            AGENT_CD
                            NEOE_AGENT
                            START_DATE
                            END_DATE
                            ISSUE_DATE
                            TOT_AMT
                            ORG_AMT
                            VAT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_DOCU_LOG:",
                JSON.stringify(data.mgrKsvDocuLogQuery.length),
            );
            return data.mgrKsvDocuLogQuery;
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
                    mutation CreateKSV_DOCU_LOG(
                        $docuNo: String
                        $taxNo: String
                        $agentCd: String
                        $neoeAgent: String
                        $startDate: String!
                        $endDate: String
                        $issueDate: String
                        $totAmt: Float
                        $orgAmt: Float
                        $vat: Float
                        $regUser: String
                        $regDatetime: String!
                    ) {
                        createKSV_DOCU_LOG(
                            DOCU_NO: $docuNo
                            TAX_NO: $taxNo
                            AGENT_CD: $agentCd
                            NEOE_AGENT: $neoeAgent
                            START_DATE: $startDate
                            END_DATE: $endDate
                            ISSUE_DATE: $issueDate
                            TOT_AMT: $totAmt
                            ORG_AMT: $orgAmt
                            VAT: $vat
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            DOCU_NO
                            TAX_NO
                            AGENT_CD
                            NEOE_AGENT
                            START_DATE
                            END_DATE
                            ISSUE_DATE
                            TOT_AMT
                            ORG_AMT
                            VAT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    docuNo: argData.DOCU_NO,
                    taxNo: argData.TAX_NO,
                    agentCd: argData.AGENT_CD,
                    neoeAgent: argData.NEOE_AGENT,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                    issueDate: argData.ISSUE_DATE,
                    totAmt: argData.TOT_AMT,
                    orgAmt: argData.ORG_AMT,
                    vat: argData.VAT,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_DOCU_LOG INSERT:",
                JSON.stringify(data.createKSV_DOCU_LOG),
            );
            return data.createKSV_DOCU_LOG;
        } catch (e) {
            console.log("KSV_DOCU_LOG INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_DOCU_LOG(
                        $updateKsvDocuLogId: Int!
                        $docuNo: String
                        $taxNo: String
                        $agentCd: String
                        $neoeAgent: String
                        $startDate: String!
                        $endDate: String
                        $issueDate: String
                        $totAmt: Float
                        $orgAmt: Float
                        $vat: Float
                        $regUser: String
                        $regDatetime: String!
                    ) {
                        updateKSV_DOCU_LOG(
                            id: $updateKsvDocuLogId
                            DOCU_NO: $docuNo
                            TAX_NO: $taxNo
                            AGENT_CD: $agentCd
                            NEOE_AGENT: $neoeAgent
                            START_DATE: $startDate
                            END_DATE: $endDate
                            ISSUE_DATE: $issueDate
                            TOT_AMT: $totAmt
                            ORG_AMT: $orgAmt
                            VAT: $vat
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            DOCU_NO
                            TAX_NO
                            AGENT_CD
                            NEOE_AGENT
                            START_DATE
                            END_DATE
                            ISSUE_DATE
                            TOT_AMT
                            ORG_AMT
                            VAT
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvDocuLogId: argData.id,
                    docuNo: argData.DOCU_NO,
                    taxNo: argData.TAX_NO,
                    agentCd: argData.AGENT_CD,
                    neoeAgent: argData.NEOE_AGENT,
                    startDate: argData.START_DATE,
                    endDate: argData.END_DATE,
                    issueDate: argData.ISSUE_DATE,
                    totAmt: argData.TOT_AMT,
                    orgAmt: argData.ORG_AMT,
                    vat: argData.VAT,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_DOCU_LOG UPDATE:",
                JSON.stringify(data.updateKSV_DOCU_LOG),
            );
            return data.updateKSV_DOCU_LOG;
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
                    mutation DeleteKSV_DOCU_LOG($deleteKsvDocuLogId: Int!) {
                        deleteKSV_DOCU_LOG(id: $deleteKsvDocuLogId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvDocuLogId: argData.id,
                },
            });
            console.log(
                "KSV_DOCU_LOG DELETE:",
                JSON.stringify(data.deleteKSV_DOCU_LOG),
            );
            return data.deleteKSV_DOCU_LOG;
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
                    mutation MgrKsvDocuLogDeletes(
                        $ids: [InputMgrKsvDocuLogDeletes!]!
                    ) {
                        mgrKsvDocuLogDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_DOCU_LOG DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
