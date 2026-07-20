/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_IN {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_IN {
                        allQueryKSV_PO_IN {
                            id
                            PO_CD
                            MATL_CD
                            ORDER_CD
                            QTY_TYPE
                            QTY
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_IN:",
                JSON.stringify(data.allQueryKSV_PO_IN.length),
            );
            return data.allQueryKSV_PO_IN;
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
                    query MgrKsvPoInQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoInQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            ORDER_CD
                            QTY_TYPE
                            QTY
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_IN:",
                JSON.stringify(data.mgrKsvPoInQuery.length),
            );
            return data.mgrKsvPoInQuery;
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
                    mutation CreateKSV_PO_IN(
                        $poCd: String
                        $matlCd: String
                        $orderCd: String
                        $qtyType: String
                        $qty: Float
                        $confFlag: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        createKSV_PO_IN(
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            ORDER_CD: $orderCd
                            QTY_TYPE: $qtyType
                            QTY: $qty
                            CONF_FLAG: $confFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                        ) {
                            PO_CD
                            MATL_CD
                            ORDER_CD
                            QTY_TYPE
                            QTY
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    orderCd: argData.ORDER_CD,
                    qtyType: argData.QTY_TYPE,
                    qty: argData.QTY,
                    confFlag: argData.CONF_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KSV_PO_IN INSERT:",
                JSON.stringify(data.createKSV_PO_IN),
            );
            return data.createKSV_PO_IN;
        } catch (e) {
            console.log("KSV_PO_IN INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_IN(
                        $updateKsvPoInId: Int!
                        $poCd: String
                        $matlCd: String
                        $orderCd: String
                        $qtyType: String
                        $qty: Float
                        $confFlag: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                    ) {
                        updateKSV_PO_IN(
                            id: $updateKsvPoInId
                            PO_CD: $poCd
                            MATL_CD: $matlCd
                            ORDER_CD: $orderCd
                            QTY_TYPE: $qtyType
                            QTY: $qty
                            CONF_FLAG: $confFlag
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                        ) {
                            id
                            PO_CD
                            MATL_CD
                            ORDER_CD
                            QTY_TYPE
                            QTY
                            CONF_FLAG
                            REG_USER
                            REG_DATETIME
                            REMARK
                        }
                    }
                `,
                variables: {
                    updateKsvPoInId: argData.id,
                    poCd: argData.PO_CD,
                    matlCd: argData.MATL_CD,
                    orderCd: argData.ORDER_CD,
                    qtyType: argData.QTY_TYPE,
                    qty: argData.QTY,
                    confFlag: argData.CONF_FLAG,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KSV_PO_IN UPDATE:",
                JSON.stringify(data.updateKSV_PO_IN),
            );
            return data.updateKSV_PO_IN;
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
                    mutation DeleteKSV_PO_IN($deleteKsvPoInId: Int!) {
                        deleteKSV_PO_IN(id: $deleteKsvPoInId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoInId: argData.id,
                },
            });
            console.log(
                "KSV_PO_IN DELETE:",
                JSON.stringify(data.deleteKSV_PO_IN),
            );
            return data.deleteKSV_PO_IN;
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
                    mutation MgrKsvPoInDeletes(
                        $ids: [InputMgrKsvPoInDeletes!]!
                    ) {
                        mgrKsvPoInDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_IN DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
