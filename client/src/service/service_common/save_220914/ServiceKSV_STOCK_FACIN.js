/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_FACIN {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_FACIN {
                        allQueryKSV_STOCK_FACIN {
                            id
                            PO_CD
                            IN_DATE
                            MATL_CD
                            IN_QTY
                            ERR_QTY
                            DELIVERY
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_FACIN:",
                JSON.stringify(data.allQueryKSV_STOCK_FACIN.length),
            );
            return data.allQueryKSV_STOCK_FACIN;
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
                    query MgrKsvStockFacinQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockFacinQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            IN_DATE
                            MATL_CD
                            IN_QTY
                            ERR_QTY
                            DELIVERY
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_FACIN:",
                JSON.stringify(data.mgrKsvStockFacinQuery.length),
            );
            return data.mgrKsvStockFacinQuery;
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
                    mutation CreateKSV_STOCK_FACIN(
                        $poCd: String
                        $inDate: String
                        $matlCd: String
                        $inQty: Float
                        $errQty: Float
                        $delivery: String
                        $location: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_STOCK_FACIN(
                            PO_CD: $poCd
                            IN_DATE: $inDate
                            MATL_CD: $matlCd
                            IN_QTY: $inQty
                            ERR_QTY: $errQty
                            DELIVERY: $delivery
                            LOCATION: $location
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            IN_DATE
                            MATL_CD
                            IN_QTY
                            ERR_QTY
                            DELIVERY
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    inDate: argData.IN_DATE,
                    matlCd: argData.MATL_CD,
                    inQty: argData.IN_QTY,
                    errQty: argData.ERR_QTY,
                    delivery: argData.DELIVERY,
                    location: argData.LOCATION,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_FACIN INSERT:",
                JSON.stringify(data.createKSV_STOCK_FACIN),
            );
            return data.createKSV_STOCK_FACIN;
        } catch (e) {
            console.log("KSV_STOCK_FACIN INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_STOCK_FACIN(
                        $updateKsvStockFacinId: Int!
                        $poCd: String
                        $inDate: String
                        $matlCd: String
                        $inQty: Float
                        $errQty: Float
                        $delivery: String
                        $location: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_STOCK_FACIN(
                            id: $updateKsvStockFacinId
                            PO_CD: $poCd
                            IN_DATE: $inDate
                            MATL_CD: $matlCd
                            IN_QTY: $inQty
                            ERR_QTY: $errQty
                            DELIVERY: $delivery
                            LOCATION: $location
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            IN_DATE
                            MATL_CD
                            IN_QTY
                            ERR_QTY
                            DELIVERY
                            LOCATION
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvStockFacinId: argData.id,
                    poCd: argData.PO_CD,
                    inDate: argData.IN_DATE,
                    matlCd: argData.MATL_CD,
                    inQty: argData.IN_QTY,
                    errQty: argData.ERR_QTY,
                    delivery: argData.DELIVERY,
                    location: argData.LOCATION,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_FACIN UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_FACIN),
            );
            return data.updateKSV_STOCK_FACIN;
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
                    mutation DeleteKSV_STOCK_FACIN(
                        $deleteKsvStockFacinId: Int!
                    ) {
                        deleteKSV_STOCK_FACIN(id: $deleteKsvStockFacinId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockFacinId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_FACIN DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_FACIN),
            );
            return data.deleteKSV_STOCK_FACIN;
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
                    mutation MgrKsvStockFacinDeletes(
                        $ids: [InputMgrKsvStockFacinDeletes!]!
                    ) {
                        mgrKsvStockFacinDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_FACIN DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
