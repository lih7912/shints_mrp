/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_FACOUT_TEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_FACOUT_TEMP {
                        allQueryKSV_STOCK_FACOUT_TEMP {
                            id
                            po_cd
                            matl_cd
                            out_qty
                            reg_user
                            etc_type
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_FACOUT_TEMP:",
                JSON.stringify(data.allQueryKSV_STOCK_FACOUT_TEMP.length),
            );
            return data.allQueryKSV_STOCK_FACOUT_TEMP;
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
                    query MgrKsvStockFacoutTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockFacoutTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            matl_cd
                            out_qty
                            reg_user
                            etc_type
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_FACOUT_TEMP:",
                JSON.stringify(data.mgrKsvStockFacoutTempQuery.length),
            );
            return data.mgrKsvStockFacoutTempQuery;
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
                    mutation CreateKSV_STOCK_FACOUT_TEMP(
                        $poCd: String
                        $matlCd: String
                        $outQty: Float
                        $regUser: String
                        $etcType: String
                    ) {
                        createKSV_STOCK_FACOUT_TEMP(
                            po_cd: $poCd
                            matl_cd: $matlCd
                            out_qty: $outQty
                            reg_user: $regUser
                            etc_type: $etcType
                        ) {
                            po_cd
                            matl_cd
                            out_qty
                            reg_user
                            etc_type
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    outQty: argData.out_qty,
                    regUser: argData.reg_user,
                    etcType: argData.etc_type,
                },
            });
            console.log(
                "KSV_STOCK_FACOUT_TEMP INSERT:",
                JSON.stringify(data.createKSV_STOCK_FACOUT_TEMP),
            );
            return data.createKSV_STOCK_FACOUT_TEMP;
        } catch (e) {
            console.log(
                "KSV_STOCK_FACOUT_TEMP INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_STOCK_FACOUT_TEMP(
                        $updateKsvStockFacoutTempId: Int!
                        $poCd: String
                        $matlCd: String
                        $outQty: Float
                        $regUser: String
                        $etcType: String
                    ) {
                        updateKSV_STOCK_FACOUT_TEMP(
                            id: $updateKsvStockFacoutTempId
                            po_cd: $poCd
                            matl_cd: $matlCd
                            out_qty: $outQty
                            reg_user: $regUser
                            etc_type: $etcType
                        ) {
                            id
                            po_cd
                            matl_cd
                            out_qty
                            reg_user
                            etc_type
                        }
                    }
                `,
                variables: {
                    updateKsvStockFacoutTempId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    outQty: argData.out_qty,
                    regUser: argData.reg_user,
                    etcType: argData.etc_type,
                },
            });
            console.log(
                "KSV_STOCK_FACOUT_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_FACOUT_TEMP),
            );
            return data.updateKSV_STOCK_FACOUT_TEMP;
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
                    mutation DeleteKSV_STOCK_FACOUT_TEMP(
                        $deleteKsvStockFacoutTempId: Int!
                    ) {
                        deleteKSV_STOCK_FACOUT_TEMP(
                            id: $deleteKsvStockFacoutTempId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockFacoutTempId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_FACOUT_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_FACOUT_TEMP),
            );
            return data.deleteKSV_STOCK_FACOUT_TEMP;
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
                    mutation MgrKsvStockFacoutTempDeletes(
                        $ids: [InputMgrKsvStockFacoutTempDeletes!]!
                    ) {
                        mgrKsvStockFacoutTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_FACOUT_TEMP DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
