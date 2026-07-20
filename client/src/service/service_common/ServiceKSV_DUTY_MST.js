/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_DUTY_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_DUTY_MST {
                        allQueryKSV_DUTY_MST {
                            id
                            INCOME_NO
                            INCOME_DATE
                            VENDOR_CD
                            VENDOR_NAME
                            ITEM
                            DUTY_AMT
                            RETURN_AMT
                            END_FLAG
                            NO_RET_FLAG
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_DUTY_MST:",
                JSON.stringify(data.allQueryKSV_DUTY_MST.length),
            );
            return data.allQueryKSV_DUTY_MST;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvDutyMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvDutyMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            INCOME_NO
                            INCOME_DATE
                            VENDOR_CD
                            VENDOR_NAME
                            ITEM
                            DUTY_AMT
                            RETURN_AMT
                            END_FLAG
                            NO_RET_FLAG
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_DUTY_MST:",
                JSON.stringify(data.mgrKsvDutyMstQuery.length),
            );
            return data.mgrKsvDutyMstQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_DUTY_MST(
                        $incomeNo: String
                        $incomeDate: String
                        $vendorCd: String
                        $vendorName: String
                        $item: String
                        $dutyAmt: Int
                        $returnAmt: Int
                        $endFlag: String
                        $noRetFlag: String
                        $remark: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_DUTY_MST(
                            INCOME_NO: $incomeNo
                            INCOME_DATE: $incomeDate
                            VENDOR_CD: $vendorCd
                            VENDOR_NAME: $vendorName
                            ITEM: $item
                            DUTY_AMT: $dutyAmt
                            RETURN_AMT: $returnAmt
                            END_FLAG: $endFlag
                            NO_RET_FLAG: $noRetFlag
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            INCOME_NO
                            INCOME_DATE
                            VENDOR_CD
                            VENDOR_NAME
                            ITEM
                            DUTY_AMT
                            RETURN_AMT
                            END_FLAG
                            NO_RET_FLAG
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    incomeNo: argData.INCOME_NO,
                    incomeDate: argData.INCOME_DATE,
                    vendorCd: argData.VENDOR_CD,
                    vendorName: argData.VENDOR_NAME,
                    item: argData.ITEM,
                    dutyAmt: argData.DUTY_AMT,
                    returnAmt: argData.RETURN_AMT,
                    endFlag: argData.END_FLAG,
                    noRetFlag: argData.NO_RET_FLAG,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_DUTY_MST INSERT:",
                JSON.stringify(data.createKSV_DUTY_MST),
            );
            return data.createKSV_DUTY_MST;
        } catch (e) {
            console.log("KSV_DUTY_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_DUTY_MST(
                        $updateKsvDutyMstId: Int!
                        $incomeNo: String
                        $incomeDate: String
                        $vendorCd: String
                        $vendorName: String
                        $item: String
                        $dutyAmt: Int
                        $returnAmt: Int
                        $endFlag: String
                        $noRetFlag: String
                        $remark: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_DUTY_MST(
                            id: $updateKsvDutyMstId
                            INCOME_NO: $incomeNo
                            INCOME_DATE: $incomeDate
                            VENDOR_CD: $vendorCd
                            VENDOR_NAME: $vendorName
                            ITEM: $item
                            DUTY_AMT: $dutyAmt
                            RETURN_AMT: $returnAmt
                            END_FLAG: $endFlag
                            NO_RET_FLAG: $noRetFlag
                            REMARK: $remark
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            INCOME_NO
                            INCOME_DATE
                            VENDOR_CD
                            VENDOR_NAME
                            ITEM
                            DUTY_AMT
                            RETURN_AMT
                            END_FLAG
                            NO_RET_FLAG
                            REMARK
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvDutyMstId: argData.id,
                    incomeNo: argData.INCOME_NO,
                    incomeDate: argData.INCOME_DATE,
                    vendorCd: argData.VENDOR_CD,
                    vendorName: argData.VENDOR_NAME,
                    item: argData.ITEM,
                    dutyAmt: argData.DUTY_AMT,
                    returnAmt: argData.RETURN_AMT,
                    endFlag: argData.END_FLAG,
                    noRetFlag: argData.NO_RET_FLAG,
                    remark: argData.REMARK,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_DUTY_MST UPDATE:",
                JSON.stringify(data.updateKSV_DUTY_MST),
            );
            return data.updateKSV_DUTY_MST;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_DUTY_MST($deleteKsvDutyMstId: Int!) {
                        deleteKSV_DUTY_MST(id: $deleteKsvDutyMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvDutyMstId: argData.id,
                },
            });
            console.log(
                "KSV_DUTY_MST DELETE:",
                JSON.stringify(data.deleteKSV_DUTY_MST),
            );
            return data.deleteKSV_DUTY_MST;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                    mutation MgrKsvDutyMstDeletes(
                        $ids: [InputMgrKsvDutyMstDeletes!]!
                    ) {
                        mgrKsvDutyMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_DUTY_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
