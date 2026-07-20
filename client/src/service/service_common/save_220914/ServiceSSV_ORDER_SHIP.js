/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_ORDER_SHIP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_ORDER_SHIP {
                        allQuerySSV_ORDER_SHIP {
                            id
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            SIZE
                            SHIP_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SSV_ORDER_SHIP:",
                JSON.stringify(data.allQuerySSV_ORDER_SHIP.length),
            );
            return data.allQuerySSV_ORDER_SHIP;
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
                    query MgrSsvOrderShipQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvOrderShipQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            SIZE
                            SHIP_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_ORDER_SHIP:",
                JSON.stringify(data.mgrSsvOrderShipQuery.length),
            );
            return data.mgrSsvOrderShipQuery;
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
                    mutation CreateSSV_ORDER_SHIP(
                        $orderCd: String
                        $prodCd: String
                        $shipDate: String
                        $shipPtype: String
                        $size: String
                        $shipCnt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createSSV_ORDER_SHIP(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SHIP_DATE: $shipDate
                            SHIP_PTYPE: $shipPtype
                            SIZE: $size
                            SHIP_CNT: $shipCnt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            SIZE
                            SHIP_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    shipDate: argData.SHIP_DATE,
                    shipPtype: argData.SHIP_PTYPE,
                    size: argData.SIZE,
                    shipCnt: argData.SHIP_CNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_ORDER_SHIP INSERT:",
                JSON.stringify(data.createSSV_ORDER_SHIP),
            );
            return data.createSSV_ORDER_SHIP;
        } catch (e) {
            console.log("SSV_ORDER_SHIP INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_ORDER_SHIP(
                        $updateSsvOrderShipId: Int!
                        $orderCd: String
                        $prodCd: String
                        $shipDate: String
                        $shipPtype: String
                        $size: String
                        $shipCnt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateSSV_ORDER_SHIP(
                            id: $updateSsvOrderShipId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            SHIP_DATE: $shipDate
                            SHIP_PTYPE: $shipPtype
                            SIZE: $size
                            SHIP_CNT: $shipCnt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            SHIP_DATE
                            SHIP_PTYPE
                            SIZE
                            SHIP_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateSsvOrderShipId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    shipDate: argData.SHIP_DATE,
                    shipPtype: argData.SHIP_PTYPE,
                    size: argData.SIZE,
                    shipCnt: argData.SHIP_CNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "SSV_ORDER_SHIP UPDATE:",
                JSON.stringify(data.updateSSV_ORDER_SHIP),
            );
            return data.updateSSV_ORDER_SHIP;
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
                    mutation DeleteSSV_ORDER_SHIP($deleteSsvOrderShipId: Int!) {
                        deleteSSV_ORDER_SHIP(id: $deleteSsvOrderShipId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvOrderShipId: argData.id,
                },
            });
            console.log(
                "SSV_ORDER_SHIP DELETE:",
                JSON.stringify(data.deleteSSV_ORDER_SHIP),
            );
            return data.deleteSSV_ORDER_SHIP;
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
                    mutation MgrSsvOrderShipDeletes(
                        $ids: [InputMgrSsvOrderShipDeletes!]!
                    ) {
                        mgrSsvOrderShipDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_ORDER_SHIP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
