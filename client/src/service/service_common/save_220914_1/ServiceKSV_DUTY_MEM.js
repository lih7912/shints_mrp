/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_DUTY_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_DUTY_MEM {
                        allQueryKSV_DUTY_MEM {
                            id
                            INCOME_NO
                            EXPORT_DATE
                            EXPORT_NO
                            RETURN_DATE
                            RETURN_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_DUTY_MEM:",
                JSON.stringify(data.allQueryKSV_DUTY_MEM.length),
            );
            return data.allQueryKSV_DUTY_MEM;
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
                    query MgrKsvDutyMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvDutyMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INCOME_NO
                            EXPORT_DATE
                            EXPORT_NO
                            RETURN_DATE
                            RETURN_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_DUTY_MEM:",
                JSON.stringify(data.mgrKsvDutyMemQuery.length),
            );
            return data.mgrKsvDutyMemQuery;
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
                    mutation CreateKSV_DUTY_MEM(
                        $incomeNo: String
                        $exportDate: String
                        $exportNo: String
                        $returnDate: String
                        $returnAmt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_DUTY_MEM(
                            INCOME_NO: $incomeNo
                            EXPORT_DATE: $exportDate
                            EXPORT_NO: $exportNo
                            RETURN_DATE: $returnDate
                            RETURN_AMT: $returnAmt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            INCOME_NO
                            EXPORT_DATE
                            EXPORT_NO
                            RETURN_DATE
                            RETURN_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    incomeNo: argData.INCOME_NO,
                    exportDate: argData.EXPORT_DATE,
                    exportNo: argData.EXPORT_NO,
                    returnDate: argData.RETURN_DATE,
                    returnAmt: argData.RETURN_AMT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_DUTY_MEM INSERT:",
                JSON.stringify(data.createKSV_DUTY_MEM),
            );
            return data.createKSV_DUTY_MEM;
        } catch (e) {
            console.log("KSV_DUTY_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_DUTY_MEM(
                        $updateKsvDutyMemId: Int!
                        $incomeNo: String
                        $exportDate: String
                        $exportNo: String
                        $returnDate: String
                        $returnAmt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_DUTY_MEM(
                            id: $updateKsvDutyMemId
                            INCOME_NO: $incomeNo
                            EXPORT_DATE: $exportDate
                            EXPORT_NO: $exportNo
                            RETURN_DATE: $returnDate
                            RETURN_AMT: $returnAmt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            INCOME_NO
                            EXPORT_DATE
                            EXPORT_NO
                            RETURN_DATE
                            RETURN_AMT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvDutyMemId: argData.id,
                    incomeNo: argData.INCOME_NO,
                    exportDate: argData.EXPORT_DATE,
                    exportNo: argData.EXPORT_NO,
                    returnDate: argData.RETURN_DATE,
                    returnAmt: argData.RETURN_AMT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_DUTY_MEM UPDATE:",
                JSON.stringify(data.updateKSV_DUTY_MEM),
            );
            return data.updateKSV_DUTY_MEM;
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
                    mutation DeleteKSV_DUTY_MEM($deleteKsvDutyMemId: Int!) {
                        deleteKSV_DUTY_MEM(id: $deleteKsvDutyMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvDutyMemId: argData.id,
                },
            });
            console.log(
                "KSV_DUTY_MEM DELETE:",
                JSON.stringify(data.deleteKSV_DUTY_MEM),
            );
            return data.deleteKSV_DUTY_MEM;
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
                    mutation MgrKsvDutyMemDeletes(
                        $ids: [InputMgrKsvDutyMemDeletes!]!
                    ) {
                        mgrKsvDutyMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_DUTY_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
