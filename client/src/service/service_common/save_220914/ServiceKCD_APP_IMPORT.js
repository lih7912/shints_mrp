/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_APP_IMPORT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_APP_IMPORT {
                        allQueryKCD_APP_IMPORT {
                            id
                            PAY_REPORT
                            LC_REPORT
                            SEQ
                            CURR_CD
                            AMT
                            PAY_DATE
                            VENDOR_CD
                            NEOE_NO
                            NEOE_CD
                            LC_FLAG
                            SINYONG
                            NEOE_LINE
                            REG_USER
                        }
                    }
                `,
            });
            console.log(
                "KCD_APP_IMPORT:",
                JSON.stringify(data.allQueryKCD_APP_IMPORT.length),
            );
            return data.allQueryKCD_APP_IMPORT;
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
                    query MgrKcdAppImportQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdAppImportQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PAY_REPORT
                            LC_REPORT
                            SEQ
                            CURR_CD
                            AMT
                            PAY_DATE
                            VENDOR_CD
                            NEOE_NO
                            NEOE_CD
                            LC_FLAG
                            SINYONG
                            NEOE_LINE
                            REG_USER
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_APP_IMPORT:",
                JSON.stringify(data.mgrKcdAppImportQuery.length),
            );
            return data.mgrKcdAppImportQuery;
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
                    mutation CreateKCD_APP_IMPORT(
                        $payReport: String!
                        $lcReport: String
                        $seq: Int
                        $currCd: String
                        $amt: Float
                        $payDate: String
                        $vendorCd: String
                        $neoeNo: String
                        $neoeCd: String
                        $lcFlag: String
                        $sinyong: String
                        $neoeLine: Int
                        $regUser: String
                    ) {
                        createKCD_APP_IMPORT(
                            PAY_REPORT: $payReport
                            LC_REPORT: $lcReport
                            SEQ: $seq
                            CURR_CD: $currCd
                            AMT: $amt
                            PAY_DATE: $payDate
                            VENDOR_CD: $vendorCd
                            NEOE_NO: $neoeNo
                            NEOE_CD: $neoeCd
                            LC_FLAG: $lcFlag
                            SINYONG: $sinyong
                            NEOE_LINE: $neoeLine
                            REG_USER: $regUser
                        ) {
                            PAY_REPORT
                            LC_REPORT
                            SEQ
                            CURR_CD
                            AMT
                            PAY_DATE
                            VENDOR_CD
                            NEOE_NO
                            NEOE_CD
                            LC_FLAG
                            SINYONG
                            NEOE_LINE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    payReport: argData.PAY_REPORT,
                    lcReport: argData.LC_REPORT,
                    seq: argData.SEQ,
                    currCd: argData.CURR_CD,
                    amt: argData.AMT,
                    payDate: argData.PAY_DATE,
                    vendorCd: argData.VENDOR_CD,
                    neoeNo: argData.NEOE_NO,
                    neoeCd: argData.NEOE_CD,
                    lcFlag: argData.LC_FLAG,
                    sinyong: argData.SINYONG,
                    neoeLine: argData.NEOE_LINE,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KCD_APP_IMPORT INSERT:",
                JSON.stringify(data.createKCD_APP_IMPORT),
            );
            return data.createKCD_APP_IMPORT;
        } catch (e) {
            console.log("KCD_APP_IMPORT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_APP_IMPORT(
                        $updateKcdAppImportId: Int!
                        $payReport: String!
                        $lcReport: String
                        $seq: Int
                        $currCd: String
                        $amt: Float
                        $payDate: String
                        $vendorCd: String
                        $neoeNo: String
                        $neoeCd: String
                        $lcFlag: String
                        $sinyong: String
                        $neoeLine: Int
                        $regUser: String
                    ) {
                        updateKCD_APP_IMPORT(
                            id: $updateKcdAppImportId
                            PAY_REPORT: $payReport
                            LC_REPORT: $lcReport
                            SEQ: $seq
                            CURR_CD: $currCd
                            AMT: $amt
                            PAY_DATE: $payDate
                            VENDOR_CD: $vendorCd
                            NEOE_NO: $neoeNo
                            NEOE_CD: $neoeCd
                            LC_FLAG: $lcFlag
                            SINYONG: $sinyong
                            NEOE_LINE: $neoeLine
                            REG_USER: $regUser
                        ) {
                            id
                            PAY_REPORT
                            LC_REPORT
                            SEQ
                            CURR_CD
                            AMT
                            PAY_DATE
                            VENDOR_CD
                            NEOE_NO
                            NEOE_CD
                            LC_FLAG
                            SINYONG
                            NEOE_LINE
                            REG_USER
                        }
                    }
                `,
                variables: {
                    updateKcdAppImportId: argData.id,
                    payReport: argData.PAY_REPORT,
                    lcReport: argData.LC_REPORT,
                    seq: argData.SEQ,
                    currCd: argData.CURR_CD,
                    amt: argData.AMT,
                    payDate: argData.PAY_DATE,
                    vendorCd: argData.VENDOR_CD,
                    neoeNo: argData.NEOE_NO,
                    neoeCd: argData.NEOE_CD,
                    lcFlag: argData.LC_FLAG,
                    sinyong: argData.SINYONG,
                    neoeLine: argData.NEOE_LINE,
                    regUser: argData.REG_USER,
                },
            });
            console.log(
                "KCD_APP_IMPORT UPDATE:",
                JSON.stringify(data.updateKCD_APP_IMPORT),
            );
            return data.updateKCD_APP_IMPORT;
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
                    mutation DeleteKCD_APP_IMPORT($deleteKcdAppImportId: Int!) {
                        deleteKCD_APP_IMPORT(id: $deleteKcdAppImportId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdAppImportId: argData.id,
                },
            });
            console.log(
                "KCD_APP_IMPORT DELETE:",
                JSON.stringify(data.deleteKCD_APP_IMPORT),
            );
            return data.deleteKCD_APP_IMPORT;
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
                    mutation MgrKcdAppImportDeletes(
                        $ids: [InputMgrKcdAppImportDeletes!]!
                    ) {
                        mgrKcdAppImportDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_APP_IMPORT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
