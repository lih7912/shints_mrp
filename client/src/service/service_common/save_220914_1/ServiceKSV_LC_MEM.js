/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_LC_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_LC_MEM {
                        allQueryKSV_LC_MEM {
                            id
                            LC_NO
                            PAY_DATE
                            PAY_AMT
                            CURR_DATE
                            EXCH_RATE
                            PAY_WON
                            REMAIN_AMT
                            BANK_WON
                            BPAY_WON
                            BPAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_LC_MEM:",
                JSON.stringify(data.allQueryKSV_LC_MEM.length),
            );
            return data.allQueryKSV_LC_MEM;
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
                    query MgrKsvLcMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvLcMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            LC_NO
                            PAY_DATE
                            PAY_AMT
                            CURR_DATE
                            EXCH_RATE
                            PAY_WON
                            REMAIN_AMT
                            BANK_WON
                            BPAY_WON
                            BPAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_LC_MEM:",
                JSON.stringify(data.mgrKsvLcMemQuery.length),
            );
            return data.mgrKsvLcMemQuery;
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
                    mutation CreateKSV_LC_MEM(
                        $lcNo: String
                        $payDate: String
                        $payAmt: Float
                        $currDate: String
                        $exchRate: Float
                        $payWon: Float
                        $remainAmt: Float
                        $bankWon: Float
                        $bpayWon: Float
                        $bpayDate: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_LC_MEM(
                            LC_NO: $lcNo
                            PAY_DATE: $payDate
                            PAY_AMT: $payAmt
                            CURR_DATE: $currDate
                            EXCH_RATE: $exchRate
                            PAY_WON: $payWon
                            REMAIN_AMT: $remainAmt
                            BANK_WON: $bankWon
                            BPAY_WON: $bpayWon
                            BPAY_DATE: $bpayDate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            LC_NO
                            PAY_DATE
                            PAY_AMT
                            CURR_DATE
                            EXCH_RATE
                            PAY_WON
                            REMAIN_AMT
                            BANK_WON
                            BPAY_WON
                            BPAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    lcNo: argData.LC_NO,
                    payDate: argData.PAY_DATE,
                    payAmt: argData.PAY_AMT,
                    currDate: argData.CURR_DATE,
                    exchRate: argData.EXCH_RATE,
                    payWon: argData.PAY_WON,
                    remainAmt: argData.REMAIN_AMT,
                    bankWon: argData.BANK_WON,
                    bpayWon: argData.BPAY_WON,
                    bpayDate: argData.BPAY_DATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_LC_MEM INSERT:",
                JSON.stringify(data.createKSV_LC_MEM),
            );
            return data.createKSV_LC_MEM;
        } catch (e) {
            console.log("KSV_LC_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_LC_MEM(
                        $updateKsvLcMemId: Int!
                        $lcNo: String
                        $payDate: String
                        $payAmt: Float
                        $currDate: String
                        $exchRate: Float
                        $payWon: Float
                        $remainAmt: Float
                        $bankWon: Float
                        $bpayWon: Float
                        $bpayDate: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_LC_MEM(
                            id: $updateKsvLcMemId
                            LC_NO: $lcNo
                            PAY_DATE: $payDate
                            PAY_AMT: $payAmt
                            CURR_DATE: $currDate
                            EXCH_RATE: $exchRate
                            PAY_WON: $payWon
                            REMAIN_AMT: $remainAmt
                            BANK_WON: $bankWon
                            BPAY_WON: $bpayWon
                            BPAY_DATE: $bpayDate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            LC_NO
                            PAY_DATE
                            PAY_AMT
                            CURR_DATE
                            EXCH_RATE
                            PAY_WON
                            REMAIN_AMT
                            BANK_WON
                            BPAY_WON
                            BPAY_DATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvLcMemId: argData.id,
                    lcNo: argData.LC_NO,
                    payDate: argData.PAY_DATE,
                    payAmt: argData.PAY_AMT,
                    currDate: argData.CURR_DATE,
                    exchRate: argData.EXCH_RATE,
                    payWon: argData.PAY_WON,
                    remainAmt: argData.REMAIN_AMT,
                    bankWon: argData.BANK_WON,
                    bpayWon: argData.BPAY_WON,
                    bpayDate: argData.BPAY_DATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_LC_MEM UPDATE:",
                JSON.stringify(data.updateKSV_LC_MEM),
            );
            return data.updateKSV_LC_MEM;
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
                    mutation DeleteKSV_LC_MEM($deleteKsvLcMemId: Int!) {
                        deleteKSV_LC_MEM(id: $deleteKsvLcMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvLcMemId: argData.id,
                },
            });
            console.log(
                "KSV_LC_MEM DELETE:",
                JSON.stringify(data.deleteKSV_LC_MEM),
            );
            return data.deleteKSV_LC_MEM;
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
                    mutation MgrKsvLcMemDeletes(
                        $ids: [InputMgrKsvLcMemDeletes!]!
                    ) {
                        mgrKsvLcMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_LC_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
