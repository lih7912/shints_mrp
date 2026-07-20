/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_TEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_TEMP {
                        allQueryKSV_ORDER_TEMP {
                            id
                            USER_ID
                            ORDER_CD
                            BUYER
                            STYLE
                            FACTORY
                            DUE_DATE
                            SHIP_DATE
                            TOT_CNT
                            SHIP_CNT
                            USD_PRICE
                            ORD_AMT
                            FC_AMT
                            MATL_AMT
                            ETC_AMT
                            COMM_AMT
                            TOT_AMT
                            BUYER_TEAM
                            TYPE
                            PO_MATL_AMT
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_TEMP:",
                JSON.stringify(data.allQueryKSV_ORDER_TEMP.length),
            );
            return data.allQueryKSV_ORDER_TEMP;
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
                    query MgrKsvOrderTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            ORDER_CD
                            BUYER
                            STYLE
                            FACTORY
                            DUE_DATE
                            SHIP_DATE
                            TOT_CNT
                            SHIP_CNT
                            USD_PRICE
                            ORD_AMT
                            FC_AMT
                            MATL_AMT
                            ETC_AMT
                            COMM_AMT
                            TOT_AMT
                            BUYER_TEAM
                            TYPE
                            PO_MATL_AMT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_TEMP:",
                JSON.stringify(data.mgrKsvOrderTempQuery.length),
            );
            return data.mgrKsvOrderTempQuery;
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
                    mutation CreateKSV_ORDER_TEMP(
                        $userId: String
                        $orderCd: String
                        $buyer: String
                        $style: String
                        $factory: String
                        $dueDate: String
                        $shipDate: String
                        $totCnt: Float
                        $shipCnt: Float
                        $usdPrice: Float
                        $ordAmt: Float
                        $fcAmt: Float
                        $matlAmt: Float
                        $etcAmt: Float
                        $commAmt: Float
                        $totAmt: Float
                        $buyerTeam: String
                        $type: String
                        $poMatlAmt: Float
                    ) {
                        createKSV_ORDER_TEMP(
                            USER_ID: $userId
                            ORDER_CD: $orderCd
                            BUYER: $buyer
                            STYLE: $style
                            FACTORY: $factory
                            DUE_DATE: $dueDate
                            SHIP_DATE: $shipDate
                            TOT_CNT: $totCnt
                            SHIP_CNT: $shipCnt
                            USD_PRICE: $usdPrice
                            ORD_AMT: $ordAmt
                            FC_AMT: $fcAmt
                            MATL_AMT: $matlAmt
                            ETC_AMT: $etcAmt
                            COMM_AMT: $commAmt
                            TOT_AMT: $totAmt
                            BUYER_TEAM: $buyerTeam
                            TYPE: $type
                            PO_MATL_AMT: $poMatlAmt
                        ) {
                            USER_ID
                            ORDER_CD
                            BUYER
                            STYLE
                            FACTORY
                            DUE_DATE
                            SHIP_DATE
                            TOT_CNT
                            SHIP_CNT
                            USD_PRICE
                            ORD_AMT
                            FC_AMT
                            MATL_AMT
                            ETC_AMT
                            COMM_AMT
                            TOT_AMT
                            BUYER_TEAM
                            TYPE
                            PO_MATL_AMT
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    orderCd: argData.ORDER_CD,
                    buyer: argData.BUYER,
                    style: argData.STYLE,
                    factory: argData.FACTORY,
                    dueDate: argData.DUE_DATE,
                    shipDate: argData.SHIP_DATE,
                    totCnt: argData.TOT_CNT,
                    shipCnt: argData.SHIP_CNT,
                    usdPrice: argData.USD_PRICE,
                    ordAmt: argData.ORD_AMT,
                    fcAmt: argData.FC_AMT,
                    matlAmt: argData.MATL_AMT,
                    etcAmt: argData.ETC_AMT,
                    commAmt: argData.COMM_AMT,
                    totAmt: argData.TOT_AMT,
                    buyerTeam: argData.BUYER_TEAM,
                    type: argData.TYPE,
                    poMatlAmt: argData.PO_MATL_AMT,
                },
            });
            console.log(
                "KSV_ORDER_TEMP INSERT:",
                JSON.stringify(data.createKSV_ORDER_TEMP),
            );
            return data.createKSV_ORDER_TEMP;
        } catch (e) {
            console.log("KSV_ORDER_TEMP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_TEMP(
                        $updateKsvOrderTempId: Int!
                        $userId: String
                        $orderCd: String
                        $buyer: String
                        $style: String
                        $factory: String
                        $dueDate: String
                        $shipDate: String
                        $totCnt: Float
                        $shipCnt: Float
                        $usdPrice: Float
                        $ordAmt: Float
                        $fcAmt: Float
                        $matlAmt: Float
                        $etcAmt: Float
                        $commAmt: Float
                        $totAmt: Float
                        $buyerTeam: String
                        $type: String
                        $poMatlAmt: Float
                    ) {
                        updateKSV_ORDER_TEMP(
                            id: $updateKsvOrderTempId
                            USER_ID: $userId
                            ORDER_CD: $orderCd
                            BUYER: $buyer
                            STYLE: $style
                            FACTORY: $factory
                            DUE_DATE: $dueDate
                            SHIP_DATE: $shipDate
                            TOT_CNT: $totCnt
                            SHIP_CNT: $shipCnt
                            USD_PRICE: $usdPrice
                            ORD_AMT: $ordAmt
                            FC_AMT: $fcAmt
                            MATL_AMT: $matlAmt
                            ETC_AMT: $etcAmt
                            COMM_AMT: $commAmt
                            TOT_AMT: $totAmt
                            BUYER_TEAM: $buyerTeam
                            TYPE: $type
                            PO_MATL_AMT: $poMatlAmt
                        ) {
                            id
                            USER_ID
                            ORDER_CD
                            BUYER
                            STYLE
                            FACTORY
                            DUE_DATE
                            SHIP_DATE
                            TOT_CNT
                            SHIP_CNT
                            USD_PRICE
                            ORD_AMT
                            FC_AMT
                            MATL_AMT
                            ETC_AMT
                            COMM_AMT
                            TOT_AMT
                            BUYER_TEAM
                            TYPE
                            PO_MATL_AMT
                        }
                    }
                `,
                variables: {
                    updateKsvOrderTempId: argData.id,
                    userId: argData.USER_ID,
                    orderCd: argData.ORDER_CD,
                    buyer: argData.BUYER,
                    style: argData.STYLE,
                    factory: argData.FACTORY,
                    dueDate: argData.DUE_DATE,
                    shipDate: argData.SHIP_DATE,
                    totCnt: argData.TOT_CNT,
                    shipCnt: argData.SHIP_CNT,
                    usdPrice: argData.USD_PRICE,
                    ordAmt: argData.ORD_AMT,
                    fcAmt: argData.FC_AMT,
                    matlAmt: argData.MATL_AMT,
                    etcAmt: argData.ETC_AMT,
                    commAmt: argData.COMM_AMT,
                    totAmt: argData.TOT_AMT,
                    buyerTeam: argData.BUYER_TEAM,
                    type: argData.TYPE,
                    poMatlAmt: argData.PO_MATL_AMT,
                },
            });
            console.log(
                "KSV_ORDER_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_TEMP),
            );
            return data.updateKSV_ORDER_TEMP;
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
                    mutation DeleteKSV_ORDER_TEMP($deleteKsvOrderTempId: Int!) {
                        deleteKSV_ORDER_TEMP(id: $deleteKsvOrderTempId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderTempId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_TEMP),
            );
            return data.deleteKSV_ORDER_TEMP;
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
                    mutation MgrKsvOrderTempDeletes(
                        $ids: [InputMgrKsvOrderTempDeletes!]!
                    ) {
                        mgrKsvOrderTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
