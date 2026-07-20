/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_MST {
                        allQueryKSV_PO_MST {
                            id
                            PO_CD
                            PO_SEQ
                            PO_TYPE
                            PO_DATE
                            PO_STATUS
                            MATL_DUE_DATE
                            PROD_DUE_DATE
                            PO_CONF_DATE
                            PLACE_CD
                            CURR_DATE
                            FACTORY_CD
                            DELIVERY_TYPE
                            YY
                            SEQ
                            PO_USER_MAIN
                            PO_USER_SUB
                            CLOSE_FLAG
                            CLOSE_USER
                            CLOSE_DATETIME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            PLAN_FLAG
                            PLAN_ETD
                            PLAN_ETA
                            BVT_FLAG
                            ENTRY
                            ENTRY_DATE
                            NEW_FLAG
                            STOCK_MOVE_DATE
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_MST:",
                JSON.stringify(data.allQueryKSV_PO_MST.length),
            );
            return data.allQueryKSV_PO_MST;
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
                    query MgrKsvPoMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            PO_TYPE
                            PO_DATE
                            PO_STATUS
                            MATL_DUE_DATE
                            PROD_DUE_DATE
                            PO_CONF_DATE
                            PLACE_CD
                            CURR_DATE
                            FACTORY_CD
                            DELIVERY_TYPE
                            YY
                            SEQ
                            PO_USER_MAIN
                            PO_USER_SUB
                            CLOSE_FLAG
                            CLOSE_USER
                            CLOSE_DATETIME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            PLAN_FLAG
                            PLAN_ETD
                            PLAN_ETA
                            BVT_FLAG
                            ENTRY
                            ENTRY_DATE
                            NEW_FLAG
                            STOCK_MOVE_DATE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_MST:",
                JSON.stringify(data.mgrKsvPoMstQuery.length),
            );
            return data.mgrKsvPoMstQuery;
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
                    mutation CreateKSV_PO_MST(
                        $poCd: String
                        $poSeq: Int
                        $poType: String
                        $poDate: String
                        $poStatus: String
                        $matlDueDate: String
                        $prodDueDate: String
                        $poConfDate: String
                        $placeCd: String
                        $currDate: String
                        $factoryCd: String
                        $deliveryType: String
                        $yy: Int
                        $seq: Int
                        $poUserMain: String
                        $poUserSub: String
                        $closeFlag: String
                        $closeUser: String
                        $closeDatetime: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                        $planFlag: String
                        $planEtd: String
                        $planEta: String
                        $bvtFlag: String
                        $entry: String
                        $entryDate: String
                        $newFlag: String
                        $stockMoveDate: String
                    ) {
                        createKSV_PO_MST(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            PO_TYPE: $poType
                            PO_DATE: $poDate
                            PO_STATUS: $poStatus
                            MATL_DUE_DATE: $matlDueDate
                            PROD_DUE_DATE: $prodDueDate
                            PO_CONF_DATE: $poConfDate
                            PLACE_CD: $placeCd
                            CURR_DATE: $currDate
                            FACTORY_CD: $factoryCd
                            DELIVERY_TYPE: $deliveryType
                            YY: $yy
                            SEQ: $seq
                            PO_USER_MAIN: $poUserMain
                            PO_USER_SUB: $poUserSub
                            CLOSE_FLAG: $closeFlag
                            CLOSE_USER: $closeUser
                            CLOSE_DATETIME: $closeDatetime
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                            PLAN_FLAG: $planFlag
                            PLAN_ETD: $planEtd
                            PLAN_ETA: $planEta
                            BVT_FLAG: $bvtFlag
                            ENTRY: $entry
                            ENTRY_DATE: $entryDate
                            NEW_FLAG: $newFlag
                            STOCK_MOVE_DATE: $stockMoveDate
                        ) {
                            PO_CD
                            PO_SEQ
                            PO_TYPE
                            PO_DATE
                            PO_STATUS
                            MATL_DUE_DATE
                            PROD_DUE_DATE
                            PO_CONF_DATE
                            PLACE_CD
                            CURR_DATE
                            FACTORY_CD
                            DELIVERY_TYPE
                            YY
                            SEQ
                            PO_USER_MAIN
                            PO_USER_SUB
                            CLOSE_FLAG
                            CLOSE_USER
                            CLOSE_DATETIME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            PLAN_FLAG
                            PLAN_ETD
                            PLAN_ETA
                            BVT_FLAG
                            ENTRY
                            ENTRY_DATE
                            NEW_FLAG
                            STOCK_MOVE_DATE
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    poType: argData.PO_TYPE,
                    poDate: argData.PO_DATE,
                    poStatus: argData.PO_STATUS,
                    matlDueDate: argData.MATL_DUE_DATE,
                    prodDueDate: argData.PROD_DUE_DATE,
                    poConfDate: argData.PO_CONF_DATE,
                    placeCd: argData.PLACE_CD,
                    currDate: argData.CURR_DATE,
                    factoryCd: argData.FACTORY_CD,
                    deliveryType: argData.DELIVERY_TYPE,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    poUserMain: argData.PO_USER_MAIN,
                    poUserSub: argData.PO_USER_SUB,
                    closeFlag: argData.CLOSE_FLAG,
                    closeUser: argData.CLOSE_USER,
                    closeDatetime: argData.CLOSE_DATETIME,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                    planFlag: argData.PLAN_FLAG,
                    planEtd: argData.PLAN_ETD,
                    planEta: argData.PLAN_ETA,
                    bvtFlag: argData.BVT_FLAG,
                    entry: argData.ENTRY,
                    entryDate: argData.ENTRY_DATE,
                    newFlag: argData.NEW_FLAG,
                    stockMoveDate: argData.STOCK_MOVE_DATE,
                },
            });
            console.log(
                "KSV_PO_MST INSERT:",
                JSON.stringify(data.createKSV_PO_MST),
            );
            return data.createKSV_PO_MST;
        } catch (e) {
            console.log("KSV_PO_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_MST(
                        $updateKsvPoMstId: Int!
                        $poCd: String
                        $poSeq: Int
                        $poType: String
                        $poDate: String
                        $poStatus: String
                        $matlDueDate: String
                        $prodDueDate: String
                        $poConfDate: String
                        $placeCd: String
                        $currDate: String
                        $factoryCd: String
                        $deliveryType: String
                        $yy: Int
                        $seq: Int
                        $poUserMain: String
                        $poUserSub: String
                        $closeFlag: String
                        $closeUser: String
                        $closeDatetime: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $remark: String
                        $planFlag: String
                        $planEtd: String
                        $planEta: String
                        $bvtFlag: String
                        $entry: String
                        $entryDate: String
                        $newFlag: String
                        $stockMoveDate: String
                    ) {
                        updateKSV_PO_MST(
                            id: $updateKsvPoMstId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            PO_TYPE: $poType
                            PO_DATE: $poDate
                            PO_STATUS: $poStatus
                            MATL_DUE_DATE: $matlDueDate
                            PROD_DUE_DATE: $prodDueDate
                            PO_CONF_DATE: $poConfDate
                            PLACE_CD: $placeCd
                            CURR_DATE: $currDate
                            FACTORY_CD: $factoryCd
                            DELIVERY_TYPE: $deliveryType
                            YY: $yy
                            SEQ: $seq
                            PO_USER_MAIN: $poUserMain
                            PO_USER_SUB: $poUserSub
                            CLOSE_FLAG: $closeFlag
                            CLOSE_USER: $closeUser
                            CLOSE_DATETIME: $closeDatetime
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            REMARK: $remark
                            PLAN_FLAG: $planFlag
                            PLAN_ETD: $planEtd
                            PLAN_ETA: $planEta
                            BVT_FLAG: $bvtFlag
                            ENTRY: $entry
                            ENTRY_DATE: $entryDate
                            NEW_FLAG: $newFlag
                            STOCK_MOVE_DATE: $stockMoveDate
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            PO_TYPE
                            PO_DATE
                            PO_STATUS
                            MATL_DUE_DATE
                            PROD_DUE_DATE
                            PO_CONF_DATE
                            PLACE_CD
                            CURR_DATE
                            FACTORY_CD
                            DELIVERY_TYPE
                            YY
                            SEQ
                            PO_USER_MAIN
                            PO_USER_SUB
                            CLOSE_FLAG
                            CLOSE_USER
                            CLOSE_DATETIME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            REMARK
                            PLAN_FLAG
                            PLAN_ETD
                            PLAN_ETA
                            BVT_FLAG
                            ENTRY
                            ENTRY_DATE
                            NEW_FLAG
                            STOCK_MOVE_DATE
                        }
                    }
                `,
                variables: {
                    updateKsvPoMstId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    poType: argData.PO_TYPE,
                    poDate: argData.PO_DATE,
                    poStatus: argData.PO_STATUS,
                    matlDueDate: argData.MATL_DUE_DATE,
                    prodDueDate: argData.PROD_DUE_DATE,
                    poConfDate: argData.PO_CONF_DATE,
                    placeCd: argData.PLACE_CD,
                    currDate: argData.CURR_DATE,
                    factoryCd: argData.FACTORY_CD,
                    deliveryType: argData.DELIVERY_TYPE,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    poUserMain: argData.PO_USER_MAIN,
                    poUserSub: argData.PO_USER_SUB,
                    closeFlag: argData.CLOSE_FLAG,
                    closeUser: argData.CLOSE_USER,
                    closeDatetime: argData.CLOSE_DATETIME,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    remark: argData.REMARK,
                    planFlag: argData.PLAN_FLAG,
                    planEtd: argData.PLAN_ETD,
                    planEta: argData.PLAN_ETA,
                    bvtFlag: argData.BVT_FLAG,
                    entry: argData.ENTRY,
                    entryDate: argData.ENTRY_DATE,
                    newFlag: argData.NEW_FLAG,
                    stockMoveDate: argData.STOCK_MOVE_DATE,
                },
            });
            console.log(
                "KSV_PO_MST UPDATE:",
                JSON.stringify(data.updateKSV_PO_MST),
            );
            return data.updateKSV_PO_MST;
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
                    mutation DeleteKSV_PO_MST($deleteKsvPoMstId: Int!) {
                        deleteKSV_PO_MST(id: $deleteKsvPoMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoMstId: argData.id,
                },
            });
            console.log(
                "KSV_PO_MST DELETE:",
                JSON.stringify(data.deleteKSV_PO_MST),
            );
            return data.deleteKSV_PO_MST;
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
                    mutation MgrKsvPoMstDeletes(
                        $ids: [InputMgrKsvPoMstDeletes!]!
                    ) {
                        mgrKsvPoMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
