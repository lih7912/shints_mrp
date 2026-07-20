/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_SHIP_PLAN {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_SHIP_PLAN {
                        allQueryKSV_ORDER_SHIP_PLAN {
                            id
                            ORDER_CD
                            POSS_DATE
                            TERM_DATE
                            PLAN_QTY
                            TERM
                            END_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_SHIP_PLAN:",
                JSON.stringify(data.allQueryKSV_ORDER_SHIP_PLAN.length),
            );
            return data.allQueryKSV_ORDER_SHIP_PLAN;
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
                    query MgrKsvOrderShipPlanQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderShipPlanQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            POSS_DATE
                            TERM_DATE
                            PLAN_QTY
                            TERM
                            END_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_SHIP_PLAN:",
                JSON.stringify(data.mgrKsvOrderShipPlanQuery.length),
            );
            return data.mgrKsvOrderShipPlanQuery;
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
                    mutation CreateKSV_ORDER_SHIP_PLAN(
                        $orderCd: String
                        $possDate: String
                        $termDate: String
                        $planQty: Int
                        $term: String
                        $endFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_SHIP_PLAN(
                            ORDER_CD: $orderCd
                            POSS_DATE: $possDate
                            TERM_DATE: $termDate
                            PLAN_QTY: $planQty
                            TERM: $term
                            END_FLAG: $endFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            POSS_DATE
                            TERM_DATE
                            PLAN_QTY
                            TERM
                            END_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    possDate: argData.POSS_DATE,
                    termDate: argData.TERM_DATE,
                    planQty: argData.PLAN_QTY,
                    term: argData.TERM,
                    endFlag: argData.END_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_PLAN INSERT:",
                JSON.stringify(data.createKSV_ORDER_SHIP_PLAN),
            );
            return data.createKSV_ORDER_SHIP_PLAN;
        } catch (e) {
            console.log("KSV_ORDER_SHIP_PLAN INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_SHIP_PLAN(
                        $updateKsvOrderShipPlanId: Int!
                        $orderCd: String
                        $possDate: String
                        $termDate: String
                        $planQty: Int
                        $term: String
                        $endFlag: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_SHIP_PLAN(
                            id: $updateKsvOrderShipPlanId
                            ORDER_CD: $orderCd
                            POSS_DATE: $possDate
                            TERM_DATE: $termDate
                            PLAN_QTY: $planQty
                            TERM: $term
                            END_FLAG: $endFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            POSS_DATE
                            TERM_DATE
                            PLAN_QTY
                            TERM
                            END_FLAG
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvOrderShipPlanId: argData.id,
                    orderCd: argData.ORDER_CD,
                    possDate: argData.POSS_DATE,
                    termDate: argData.TERM_DATE,
                    planQty: argData.PLAN_QTY,
                    term: argData.TERM,
                    endFlag: argData.END_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_PLAN UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_SHIP_PLAN),
            );
            return data.updateKSV_ORDER_SHIP_PLAN;
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
                    mutation DeleteKSV_ORDER_SHIP_PLAN(
                        $deleteKsvOrderShipPlanId: Int!
                    ) {
                        deleteKSV_ORDER_SHIP_PLAN(
                            id: $deleteKsvOrderShipPlanId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderShipPlanId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_SHIP_PLAN DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_SHIP_PLAN),
            );
            return data.deleteKSV_ORDER_SHIP_PLAN;
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
                    mutation MgrKsvOrderShipPlanDeletes(
                        $ids: [InputMgrKsvOrderShipPlanDeletes!]!
                    ) {
                        mgrKsvOrderShipPlanDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_SHIP_PLAN DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
