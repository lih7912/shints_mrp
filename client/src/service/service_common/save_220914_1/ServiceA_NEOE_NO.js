/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceA_NEOE_NO {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryA_NEOE_NO {
                        allQueryA_NEOE_NO {
                            id
                            PO_CD
                            ORDER_CD
                            KRW_AMOUNT
                            USD_AMOUNT
                            NEOE_NO
                            NEOE_LINE
                            FAC_LC_FLAG
                            TYPE
                            REG_USER
                            REG_DATETIME
                            VENDOR_CD
                            MINOVER_CD
                            PAY_REPORT
                        }
                    }
                `,
            });
            console.log(
                "A_NEOE_NO:",
                JSON.stringify(data.allQueryA_NEOE_NO.length),
            );
            return data.allQueryA_NEOE_NO;
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
                    query MgrANeoeNoQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrANeoeNoQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            KRW_AMOUNT
                            USD_AMOUNT
                            NEOE_NO
                            NEOE_LINE
                            FAC_LC_FLAG
                            TYPE
                            REG_USER
                            REG_DATETIME
                            VENDOR_CD
                            MINOVER_CD
                            PAY_REPORT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "A_NEOE_NO:",
                JSON.stringify(data.mgrANeoeNoQuery.length),
            );
            return data.mgrANeoeNoQuery;
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
                    mutation CreateA_NEOE_NO(
                        $poCd: String
                        $orderCd: String
                        $krwAmount: Float
                        $usdAmount: Float
                        $neoeNo: String
                        $neoeLine: String
                        $facLcFlag: String
                        $type: String
                        $regUser: String
                        $regDatetime: String
                        $vendorCd: String
                        $minoverCd: String
                        $payReport: String
                    ) {
                        createA_NEOE_NO(
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            KRW_AMOUNT: $krwAmount
                            USD_AMOUNT: $usdAmount
                            NEOE_NO: $neoeNo
                            NEOE_LINE: $neoeLine
                            FAC_LC_FLAG: $facLcFlag
                            TYPE: $type
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            VENDOR_CD: $vendorCd
                            MINOVER_CD: $minoverCd
                            PAY_REPORT: $payReport
                        ) {
                            PO_CD
                            ORDER_CD
                            KRW_AMOUNT
                            USD_AMOUNT
                            NEOE_NO
                            NEOE_LINE
                            FAC_LC_FLAG
                            TYPE
                            REG_USER
                            REG_DATETIME
                            VENDOR_CD
                            MINOVER_CD
                            PAY_REPORT
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    krwAmount: argData.KRW_AMOUNT,
                    usdAmount: argData.USD_AMOUNT,
                    neoeNo: argData.NEOE_NO,
                    neoeLine: argData.NEOE_LINE,
                    facLcFlag: argData.FAC_LC_FLAG,
                    type: argData.TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    vendorCd: argData.VENDOR_CD,
                    minoverCd: argData.MINOVER_CD,
                    payReport: argData.PAY_REPORT,
                },
            });
            console.log(
                "A_NEOE_NO INSERT:",
                JSON.stringify(data.createA_NEOE_NO),
            );
            return data.createA_NEOE_NO;
        } catch (e) {
            console.log("A_NEOE_NO INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateA_NEOE_NO(
                        $updateANeoeNoId: Int!
                        $poCd: String
                        $orderCd: String
                        $krwAmount: Float
                        $usdAmount: Float
                        $neoeNo: String
                        $neoeLine: String
                        $facLcFlag: String
                        $type: String
                        $regUser: String
                        $regDatetime: String
                        $vendorCd: String
                        $minoverCd: String
                        $payReport: String
                    ) {
                        updateA_NEOE_NO(
                            id: $updateANeoeNoId
                            PO_CD: $poCd
                            ORDER_CD: $orderCd
                            KRW_AMOUNT: $krwAmount
                            USD_AMOUNT: $usdAmount
                            NEOE_NO: $neoeNo
                            NEOE_LINE: $neoeLine
                            FAC_LC_FLAG: $facLcFlag
                            TYPE: $type
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            VENDOR_CD: $vendorCd
                            MINOVER_CD: $minoverCd
                            PAY_REPORT: $payReport
                        ) {
                            id
                            PO_CD
                            ORDER_CD
                            KRW_AMOUNT
                            USD_AMOUNT
                            NEOE_NO
                            NEOE_LINE
                            FAC_LC_FLAG
                            TYPE
                            REG_USER
                            REG_DATETIME
                            VENDOR_CD
                            MINOVER_CD
                            PAY_REPORT
                        }
                    }
                `,
                variables: {
                    updateANeoeNoId: argData.id,
                    poCd: argData.PO_CD,
                    orderCd: argData.ORDER_CD,
                    krwAmount: argData.KRW_AMOUNT,
                    usdAmount: argData.USD_AMOUNT,
                    neoeNo: argData.NEOE_NO,
                    neoeLine: argData.NEOE_LINE,
                    facLcFlag: argData.FAC_LC_FLAG,
                    type: argData.TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    vendorCd: argData.VENDOR_CD,
                    minoverCd: argData.MINOVER_CD,
                    payReport: argData.PAY_REPORT,
                },
            });
            console.log(
                "A_NEOE_NO UPDATE:",
                JSON.stringify(data.updateA_NEOE_NO),
            );
            return data.updateA_NEOE_NO;
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
                    mutation DeleteA_NEOE_NO($deleteANeoeNoId: Int!) {
                        deleteA_NEOE_NO(id: $deleteANeoeNoId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteANeoeNoId: argData.id,
                },
            });
            console.log(
                "A_NEOE_NO DELETE:",
                JSON.stringify(data.deleteA_NEOE_NO),
            );
            return data.deleteA_NEOE_NO;
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
                    mutation MgrANeoeNoDeletes(
                        $ids: [InputMgrANeoeNoDeletes!]!
                    ) {
                        mgrANeoeNoDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("A_NEOE_NO DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
