/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_OUT_TEMP_PERMIT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_OUT_TEMP_PERMIT {
                        allQueryKSV_STOCK_OUT_TEMP_PERMIT {
                            id
                            PACK_CD
                            VENDOR_CD
                            PERMIT
                            SAVE_FLAG
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT:",
                JSON.stringify(data.allQueryKSV_STOCK_OUT_TEMP_PERMIT.length),
            );
            return data.allQueryKSV_STOCK_OUT_TEMP_PERMIT;
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
                    query MgrKsvStockOutTempPermitQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockOutTempPermitQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PACK_CD
                            VENDOR_CD
                            PERMIT
                            SAVE_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT:",
                JSON.stringify(data.mgrKsvStockOutTempPermitQuery.length),
            );
            return data.mgrKsvStockOutTempPermitQuery;
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
                    mutation CreateKSV_STOCK_OUT_TEMP_PERMIT(
                        $packCd: String
                        $vendorCd: String
                        $permit: String
                        $saveFlag: String
                    ) {
                        createKSV_STOCK_OUT_TEMP_PERMIT(
                            PACK_CD: $packCd
                            VENDOR_CD: $vendorCd
                            PERMIT: $permit
                            SAVE_FLAG: $saveFlag
                        ) {
                            PACK_CD
                            VENDOR_CD
                            PERMIT
                            SAVE_FLAG
                        }
                    }
                `,
                variables: {
                    packCd: argData.PACK_CD,
                    vendorCd: argData.VENDOR_CD,
                    permit: argData.PERMIT,
                    saveFlag: argData.SAVE_FLAG,
                },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT INSERT:",
                JSON.stringify(data.createKSV_STOCK_OUT_TEMP_PERMIT),
            );
            return data.createKSV_STOCK_OUT_TEMP_PERMIT;
        } catch (e) {
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT INSERT ERROR:",
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
                    mutation UpdateKSV_STOCK_OUT_TEMP_PERMIT(
                        $updateKsvStockOutTempPermitId: Int!
                        $packCd: String
                        $vendorCd: String
                        $permit: String
                        $saveFlag: String
                    ) {
                        updateKSV_STOCK_OUT_TEMP_PERMIT(
                            id: $updateKsvStockOutTempPermitId
                            PACK_CD: $packCd
                            VENDOR_CD: $vendorCd
                            PERMIT: $permit
                            SAVE_FLAG: $saveFlag
                        ) {
                            id
                            PACK_CD
                            VENDOR_CD
                            PERMIT
                            SAVE_FLAG
                        }
                    }
                `,
                variables: {
                    updateKsvStockOutTempPermitId: argData.id,
                    packCd: argData.PACK_CD,
                    vendorCd: argData.VENDOR_CD,
                    permit: argData.PERMIT,
                    saveFlag: argData.SAVE_FLAG,
                },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_OUT_TEMP_PERMIT),
            );
            return data.updateKSV_STOCK_OUT_TEMP_PERMIT;
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
                    mutation DeleteKSV_STOCK_OUT_TEMP_PERMIT(
                        $deleteKsvStockOutTempPermitId: Int!
                    ) {
                        deleteKSV_STOCK_OUT_TEMP_PERMIT(
                            id: $deleteKsvStockOutTempPermitId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockOutTempPermitId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_OUT_TEMP_PERMIT),
            );
            return data.deleteKSV_STOCK_OUT_TEMP_PERMIT;
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
                    mutation MgrKsvStockOutTempPermitDeletes(
                        $ids: [InputMgrKsvStockOutTempPermitDeletes!]!
                    ) {
                        mgrKsvStockOutTempPermitDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_STOCK_OUT_TEMP_PERMIT DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
