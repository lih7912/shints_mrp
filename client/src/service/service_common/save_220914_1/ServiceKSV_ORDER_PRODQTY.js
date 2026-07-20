/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_PRODQTY {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PRODQTY {
                        allQueryKSV_ORDER_PRODQTY {
                            id
                            yymm
                            order_cd
                            cut_qty
                            cur_qty
                            ship_tot
                            ship_qty
                            cmpt
                            line_cd
                            reg_user
                            reg_datetime
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_PRODQTY:",
                JSON.stringify(data.allQueryKSV_ORDER_PRODQTY.length),
            );
            return data.allQueryKSV_ORDER_PRODQTY;
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
                    query MgrKsvOrderProdqtyQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderProdqtyQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            yymm
                            order_cd
                            cut_qty
                            cur_qty
                            ship_tot
                            ship_qty
                            cmpt
                            line_cd
                            reg_user
                            reg_datetime
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_PRODQTY:",
                JSON.stringify(data.mgrKsvOrderProdqtyQuery.length),
            );
            return data.mgrKsvOrderProdqtyQuery;
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
                    mutation CreateKSV_ORDER_PRODQTY(
                        $yymm: String
                        $orderCd: String
                        $cutQty: Int
                        $curQty: Int
                        $shipTot: Int
                        $shipQty: Int
                        $cmpt: Float
                        $lineCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_ORDER_PRODQTY(
                            yymm: $yymm
                            order_cd: $orderCd
                            cut_qty: $cutQty
                            cur_qty: $curQty
                            ship_tot: $shipTot
                            ship_qty: $shipQty
                            cmpt: $cmpt
                            line_cd: $lineCd
                            reg_user: $regUser
                            reg_datetime: $regDatetime
                        ) {
                            yymm
                            order_cd
                            cut_qty
                            cur_qty
                            ship_tot
                            ship_qty
                            cmpt
                            line_cd
                            reg_user
                            reg_datetime
                        }
                    }
                `,
                variables: {
                    yymm: argData.yymm,
                    orderCd: argData.order_cd,
                    cutQty: argData.cut_qty,
                    curQty: argData.cur_qty,
                    shipTot: argData.ship_tot,
                    shipQty: argData.ship_qty,
                    cmpt: argData.cmpt,
                    lineCd: argData.line_cd,
                    regUser: argData.reg_user,
                    regDatetime: argData.reg_datetime,
                },
            });
            console.log(
                "KSV_ORDER_PRODQTY INSERT:",
                JSON.stringify(data.createKSV_ORDER_PRODQTY),
            );
            return data.createKSV_ORDER_PRODQTY;
        } catch (e) {
            console.log("KSV_ORDER_PRODQTY INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_PRODQTY(
                        $updateKsvOrderProdqtyId: Int!
                        $yymm: String
                        $orderCd: String
                        $cutQty: Int
                        $curQty: Int
                        $shipTot: Int
                        $shipQty: Int
                        $cmpt: Float
                        $lineCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_ORDER_PRODQTY(
                            id: $updateKsvOrderProdqtyId
                            yymm: $yymm
                            order_cd: $orderCd
                            cut_qty: $cutQty
                            cur_qty: $curQty
                            ship_tot: $shipTot
                            ship_qty: $shipQty
                            cmpt: $cmpt
                            line_cd: $lineCd
                            reg_user: $regUser
                            reg_datetime: $regDatetime
                        ) {
                            id
                            yymm
                            order_cd
                            cut_qty
                            cur_qty
                            ship_tot
                            ship_qty
                            cmpt
                            line_cd
                            reg_user
                            reg_datetime
                        }
                    }
                `,
                variables: {
                    updateKsvOrderProdqtyId: argData.id,
                    yymm: argData.yymm,
                    orderCd: argData.order_cd,
                    cutQty: argData.cut_qty,
                    curQty: argData.cur_qty,
                    shipTot: argData.ship_tot,
                    shipQty: argData.ship_qty,
                    cmpt: argData.cmpt,
                    lineCd: argData.line_cd,
                    regUser: argData.reg_user,
                    regDatetime: argData.reg_datetime,
                },
            });
            console.log(
                "KSV_ORDER_PRODQTY UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PRODQTY),
            );
            return data.updateKSV_ORDER_PRODQTY;
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
                    mutation DeleteKSV_ORDER_PRODQTY(
                        $deleteKsvOrderProdqtyId: Int!
                    ) {
                        deleteKSV_ORDER_PRODQTY(id: $deleteKsvOrderProdqtyId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderProdqtyId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PRODQTY DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PRODQTY),
            );
            return data.deleteKSV_ORDER_PRODQTY;
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
                    mutation MgrKsvOrderProdqtyDeletes(
                        $ids: [InputMgrKsvOrderProdqtyDeletes!]!
                    ) {
                        mgrKsvOrderProdqtyDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_PRODQTY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
