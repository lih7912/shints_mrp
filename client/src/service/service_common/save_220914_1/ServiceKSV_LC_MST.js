/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_LC_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_LC_MST {
                        allQueryKSV_LC_MST {
                            id
                            LC_NO
                            VENDOR_CD
                            BANK_CD
                            LC_TYPE
                            LC_OPEN_AMT
                            LC_OPEN_WON
                            LC_BANK_TERM
                            TOLERANCE
                            REMAIN_AMT
                            REMAIN_WON
                            BANK_WON
                            BPAY_WON
                            SHIP_DATE
                            END_DATE
                            CURR_CD
                            CURR_DATE
                            EXCH_RATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_LC_MST:",
                JSON.stringify(data.allQueryKSV_LC_MST.length),
            );
            return data.allQueryKSV_LC_MST;
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
                    query MgrKsvLcMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvLcMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            LC_NO
                            VENDOR_CD
                            BANK_CD
                            LC_TYPE
                            LC_OPEN_AMT
                            LC_OPEN_WON
                            LC_BANK_TERM
                            TOLERANCE
                            REMAIN_AMT
                            REMAIN_WON
                            BANK_WON
                            BPAY_WON
                            SHIP_DATE
                            END_DATE
                            CURR_CD
                            CURR_DATE
                            EXCH_RATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_LC_MST:",
                JSON.stringify(data.mgrKsvLcMstQuery.length),
            );
            return data.mgrKsvLcMstQuery;
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
                    mutation CreateKSV_LC_MST(
                        $lcNo: String
                        $vendorCd: String
                        $bankCd: String
                        $lcType: String
                        $lcOpenAmt: Float
                        $lcOpenWon: Float
                        $lcBankTerm: String
                        $tolerance: Int
                        $remainAmt: Float
                        $remainWon: Float
                        $bankWon: Float
                        $bpayWon: Float
                        $shipDate: String
                        $endDate: String
                        $currCd: String
                        $currDate: String
                        $exchRate: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_LC_MST(
                            LC_NO: $lcNo
                            VENDOR_CD: $vendorCd
                            BANK_CD: $bankCd
                            LC_TYPE: $lcType
                            LC_OPEN_AMT: $lcOpenAmt
                            LC_OPEN_WON: $lcOpenWon
                            LC_BANK_TERM: $lcBankTerm
                            TOLERANCE: $tolerance
                            REMAIN_AMT: $remainAmt
                            REMAIN_WON: $remainWon
                            BANK_WON: $bankWon
                            BPAY_WON: $bpayWon
                            SHIP_DATE: $shipDate
                            END_DATE: $endDate
                            CURR_CD: $currCd
                            CURR_DATE: $currDate
                            EXCH_RATE: $exchRate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            LC_NO
                            VENDOR_CD
                            BANK_CD
                            LC_TYPE
                            LC_OPEN_AMT
                            LC_OPEN_WON
                            LC_BANK_TERM
                            TOLERANCE
                            REMAIN_AMT
                            REMAIN_WON
                            BANK_WON
                            BPAY_WON
                            SHIP_DATE
                            END_DATE
                            CURR_CD
                            CURR_DATE
                            EXCH_RATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    lcNo: argData.LC_NO,
                    vendorCd: argData.VENDOR_CD,
                    bankCd: argData.BANK_CD,
                    lcType: argData.LC_TYPE,
                    lcOpenAmt: argData.LC_OPEN_AMT,
                    lcOpenWon: argData.LC_OPEN_WON,
                    lcBankTerm: argData.LC_BANK_TERM,
                    tolerance: argData.TOLERANCE,
                    remainAmt: argData.REMAIN_AMT,
                    remainWon: argData.REMAIN_WON,
                    bankWon: argData.BANK_WON,
                    bpayWon: argData.BPAY_WON,
                    shipDate: argData.SHIP_DATE,
                    endDate: argData.END_DATE,
                    currCd: argData.CURR_CD,
                    currDate: argData.CURR_DATE,
                    exchRate: argData.EXCH_RATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_LC_MST INSERT:",
                JSON.stringify(data.createKSV_LC_MST),
            );
            return data.createKSV_LC_MST;
        } catch (e) {
            console.log("KSV_LC_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_LC_MST(
                        $updateKsvLcMstId: Int!
                        $lcNo: String
                        $vendorCd: String
                        $bankCd: String
                        $lcType: String
                        $lcOpenAmt: Float
                        $lcOpenWon: Float
                        $lcBankTerm: String
                        $tolerance: Int
                        $remainAmt: Float
                        $remainWon: Float
                        $bankWon: Float
                        $bpayWon: Float
                        $shipDate: String
                        $endDate: String
                        $currCd: String
                        $currDate: String
                        $exchRate: Float
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_LC_MST(
                            id: $updateKsvLcMstId
                            LC_NO: $lcNo
                            VENDOR_CD: $vendorCd
                            BANK_CD: $bankCd
                            LC_TYPE: $lcType
                            LC_OPEN_AMT: $lcOpenAmt
                            LC_OPEN_WON: $lcOpenWon
                            LC_BANK_TERM: $lcBankTerm
                            TOLERANCE: $tolerance
                            REMAIN_AMT: $remainAmt
                            REMAIN_WON: $remainWon
                            BANK_WON: $bankWon
                            BPAY_WON: $bpayWon
                            SHIP_DATE: $shipDate
                            END_DATE: $endDate
                            CURR_CD: $currCd
                            CURR_DATE: $currDate
                            EXCH_RATE: $exchRate
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            LC_NO
                            VENDOR_CD
                            BANK_CD
                            LC_TYPE
                            LC_OPEN_AMT
                            LC_OPEN_WON
                            LC_BANK_TERM
                            TOLERANCE
                            REMAIN_AMT
                            REMAIN_WON
                            BANK_WON
                            BPAY_WON
                            SHIP_DATE
                            END_DATE
                            CURR_CD
                            CURR_DATE
                            EXCH_RATE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvLcMstId: argData.id,
                    lcNo: argData.LC_NO,
                    vendorCd: argData.VENDOR_CD,
                    bankCd: argData.BANK_CD,
                    lcType: argData.LC_TYPE,
                    lcOpenAmt: argData.LC_OPEN_AMT,
                    lcOpenWon: argData.LC_OPEN_WON,
                    lcBankTerm: argData.LC_BANK_TERM,
                    tolerance: argData.TOLERANCE,
                    remainAmt: argData.REMAIN_AMT,
                    remainWon: argData.REMAIN_WON,
                    bankWon: argData.BANK_WON,
                    bpayWon: argData.BPAY_WON,
                    shipDate: argData.SHIP_DATE,
                    endDate: argData.END_DATE,
                    currCd: argData.CURR_CD,
                    currDate: argData.CURR_DATE,
                    exchRate: argData.EXCH_RATE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_LC_MST UPDATE:",
                JSON.stringify(data.updateKSV_LC_MST),
            );
            return data.updateKSV_LC_MST;
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
                    mutation DeleteKSV_LC_MST($deleteKsvLcMstId: Int!) {
                        deleteKSV_LC_MST(id: $deleteKsvLcMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvLcMstId: argData.id,
                },
            });
            console.log(
                "KSV_LC_MST DELETE:",
                JSON.stringify(data.deleteKSV_LC_MST),
            );
            return data.deleteKSV_LC_MST;
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
                    mutation MgrKsvLcMstDeletes(
                        $ids: [InputMgrKsvLcMstDeletes!]!
                    ) {
                        mgrKsvLcMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_LC_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
