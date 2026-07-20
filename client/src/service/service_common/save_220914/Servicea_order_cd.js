/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_order_cd {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_order_cd {
                        allQuerya_order_cd {
                            id
                            po_cd
                            order_cd
                            krw_amt
                            usd_amt
                            fob
                            order_cd1
                            neoe_no
                            neoe_line
                            pay_report
                            seq
                        }
                    }
                `,
            });
            console.log(
                "a_order_cd:",
                JSON.stringify(data.allQuerya_order_cd.length),
            );
            return data.allQuerya_order_cd;
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
                    query MgrAOrderCdQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAOrderCdQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            order_cd
                            krw_amt
                            usd_amt
                            fob
                            order_cd1
                            neoe_no
                            neoe_line
                            pay_report
                            seq
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "a_order_cd:",
                JSON.stringify(data.mgrAOrderCdQuery.length),
            );
            return data.mgrAOrderCdQuery;
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
                    mutation Createa_order_cd(
                        $poCd: String
                        $orderCd: String
                        $krwAmt: Float
                        $usdAmt: Float
                        $fob: String
                        $orderCd1: String
                        $neoeNo: String
                        $neoeLine: Int
                        $payReport: String
                        $seq: Int
                    ) {
                        createa_order_cd(
                            po_cd: $poCd
                            order_cd: $orderCd
                            krw_amt: $krwAmt
                            usd_amt: $usdAmt
                            fob: $fob
                            order_cd1: $orderCd1
                            neoe_no: $neoeNo
                            neoe_line: $neoeLine
                            pay_report: $payReport
                            seq: $seq
                        ) {
                            po_cd
                            order_cd
                            krw_amt
                            usd_amt
                            fob
                            order_cd1
                            neoe_no
                            neoe_line
                            pay_report
                            seq
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    orderCd: argData.order_cd,
                    krwAmt: argData.krw_amt,
                    usdAmt: argData.usd_amt,
                    fob: argData.fob,
                    orderCd1: argData.order_cd1,
                    neoeNo: argData.neoe_no,
                    neoeLine: argData.neoe_line,
                    payReport: argData.pay_report,
                    seq: argData.seq,
                },
            });
            console.log(
                "a_order_cd INSERT:",
                JSON.stringify(data.createa_order_cd),
            );
            return data.createa_order_cd;
        } catch (e) {
            console.log("a_order_cd INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_order_cd(
                        $updateAOrderCdId: Int!
                        $poCd: String
                        $orderCd: String
                        $krwAmt: Float
                        $usdAmt: Float
                        $fob: String
                        $orderCd1: String
                        $neoeNo: String
                        $neoeLine: Int
                        $payReport: String
                        $seq: Int
                    ) {
                        updatea_order_cd(
                            id: $updateAOrderCdId
                            po_cd: $poCd
                            order_cd: $orderCd
                            krw_amt: $krwAmt
                            usd_amt: $usdAmt
                            fob: $fob
                            order_cd1: $orderCd1
                            neoe_no: $neoeNo
                            neoe_line: $neoeLine
                            pay_report: $payReport
                            seq: $seq
                        ) {
                            id
                            po_cd
                            order_cd
                            krw_amt
                            usd_amt
                            fob
                            order_cd1
                            neoe_no
                            neoe_line
                            pay_report
                            seq
                        }
                    }
                `,
                variables: {
                    updateAOrderCdId: argData.id,
                    poCd: argData.po_cd,
                    orderCd: argData.order_cd,
                    krwAmt: argData.krw_amt,
                    usdAmt: argData.usd_amt,
                    fob: argData.fob,
                    orderCd1: argData.order_cd1,
                    neoeNo: argData.neoe_no,
                    neoeLine: argData.neoe_line,
                    payReport: argData.pay_report,
                    seq: argData.seq,
                },
            });
            console.log(
                "a_order_cd UPDATE:",
                JSON.stringify(data.updatea_order_cd),
            );
            return data.updatea_order_cd;
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
                    mutation Deletea_order_cd($deleteAOrderCdId: Int!) {
                        deletea_order_cd(id: $deleteAOrderCdId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAOrderCdId: argData.id,
                },
            });
            console.log(
                "a_order_cd DELETE:",
                JSON.stringify(data.deletea_order_cd),
            );
            return data.deletea_order_cd;
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
                    mutation MgrAOrderCdDeletes(
                        $ids: [InputMgrAOrderCdDeletes!]!
                    ) {
                        mgrAOrderCdDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_order_cd DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
