/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_STOCK_OUT_SCHMEM {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_OUT_SCHMEM {
                        allQueryKSV_STOCK_OUT_SCHMEM {
                            id
                            OUT_DATE
                            OUT_SEQ
                            MEM_SEQ
                            READY_DATE
                            PO_CD
                            BUYER_CD
                            VENDOR_CD
                            ITEM
                            WEIGHT
                            CBM
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_OUT_SCHMEM:",
                JSON.stringify(data.allQueryKSV_STOCK_OUT_SCHMEM.length),
            );
            return data.allQueryKSV_STOCK_OUT_SCHMEM;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvStockOutSchmemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockOutSchmemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            OUT_DATE
                            OUT_SEQ
                            MEM_SEQ
                            READY_DATE
                            PO_CD
                            BUYER_CD
                            VENDOR_CD
                            ITEM
                            WEIGHT
                            CBM
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_OUT_SCHMEM:",
                JSON.stringify(data.mgrKsvStockOutSchmemQuery.length),
            );
            return data.mgrKsvStockOutSchmemQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_STOCK_OUT_SCHMEM(
                        $outDate: String
                        $outSeq: Int
                        $memSeq: Int
                        $readyDate: String
                        $poCd: String
                        $buyerCd: String
                        $vendorCd: String
                        $item: String
                        $weight: Float
                        $cbm: Float
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_STOCK_OUT_SCHMEM(
                            OUT_DATE: $outDate
                            OUT_SEQ: $outSeq
                            MEM_SEQ: $memSeq
                            READY_DATE: $readyDate
                            PO_CD: $poCd
                            BUYER_CD: $buyerCd
                            VENDOR_CD: $vendorCd
                            ITEM: $item
                            WEIGHT: $weight
                            CBM: $cbm
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            OUT_DATE
                            OUT_SEQ
                            MEM_SEQ
                            READY_DATE
                            PO_CD
                            BUYER_CD
                            VENDOR_CD
                            ITEM
                            WEIGHT
                            CBM
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    outDate: argData.OUT_DATE,
                    outSeq: argData.OUT_SEQ,
                    memSeq: argData.MEM_SEQ,
                    readyDate: argData.READY_DATE,
                    poCd: argData.PO_CD,
                    buyerCd: argData.BUYER_CD,
                    vendorCd: argData.VENDOR_CD,
                    item: argData.ITEM,
                    weight: argData.WEIGHT,
                    cbm: argData.CBM,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_OUT_SCHMEM INSERT:",
                JSON.stringify(data.createKSV_STOCK_OUT_SCHMEM),
            );
            return data.createKSV_STOCK_OUT_SCHMEM;
        } catch (e) {
            console.log(
                "KSV_STOCK_OUT_SCHMEM INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_STOCK_OUT_SCHMEM(
                        $updateKsvStockOutSchmemId: Int!
                        $outDate: String
                        $outSeq: Int
                        $memSeq: Int
                        $readyDate: String
                        $poCd: String
                        $buyerCd: String
                        $vendorCd: String
                        $item: String
                        $weight: Float
                        $cbm: Float
                        $remark: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_STOCK_OUT_SCHMEM(
                            id: $updateKsvStockOutSchmemId
                            OUT_DATE: $outDate
                            OUT_SEQ: $outSeq
                            MEM_SEQ: $memSeq
                            READY_DATE: $readyDate
                            PO_CD: $poCd
                            BUYER_CD: $buyerCd
                            VENDOR_CD: $vendorCd
                            ITEM: $item
                            WEIGHT: $weight
                            CBM: $cbm
                            REMARK: $remark
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            OUT_DATE
                            OUT_SEQ
                            MEM_SEQ
                            READY_DATE
                            PO_CD
                            BUYER_CD
                            VENDOR_CD
                            ITEM
                            WEIGHT
                            CBM
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvStockOutSchmemId: argData.id,
                    outDate: argData.OUT_DATE,
                    outSeq: argData.OUT_SEQ,
                    memSeq: argData.MEM_SEQ,
                    readyDate: argData.READY_DATE,
                    poCd: argData.PO_CD,
                    buyerCd: argData.BUYER_CD,
                    vendorCd: argData.VENDOR_CD,
                    item: argData.ITEM,
                    weight: argData.WEIGHT,
                    cbm: argData.CBM,
                    remark: argData.REMARK,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_OUT_SCHMEM UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_OUT_SCHMEM),
            );
            return data.updateKSV_STOCK_OUT_SCHMEM;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_STOCK_OUT_SCHMEM(
                        $deleteKsvStockOutSchmemId: Int!
                    ) {
                        deleteKSV_STOCK_OUT_SCHMEM(
                            id: $deleteKsvStockOutSchmemId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockOutSchmemId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_OUT_SCHMEM DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_OUT_SCHMEM),
            );
            return data.deleteKSV_STOCK_OUT_SCHMEM;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                    mutation MgrKsvStockOutSchmemDeletes(
                        $ids: [InputMgrKsvStockOutSchmemDeletes!]!
                    ) {
                        mgrKsvStockOutSchmemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_STOCK_OUT_SCHMEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
