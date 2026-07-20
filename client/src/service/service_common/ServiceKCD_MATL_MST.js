/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_MATL_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MATL_MST {
                        allQueryKCD_MATL_MST {
                            id
                            MATL_CD
                            MATL_NAME
                            VENDOR_CD
                            MATL_TYPE
                            SEQ
                            COLOR
                            SPEC
                            UNIT
                            HS_CD
                            WEIGHT
                            BOX_UNIT
                            COUNTRY
                            ADD_RATE
                            ADD_AMT
                            PERMIT_COMPO1
                            PERMIT_COMPO2
                            PERMIT_COMPO3
                            PERMIT_DETAIL
                            COUNT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BVT_MATL_NAME
                            MATL_TYPE2
                            WIDTH
                            old_vendor_cd
                            rep_matl_cd
                            add_loss
                        }
                    }
                `,
            });
            console.log(
                "KCD_MATL_MST:",
                JSON.stringify(data.allQueryKCD_MATL_MST.length),
            );
            return data.allQueryKCD_MATL_MST;
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
                    query MgrKcdMatlMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMatlMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MATL_CD
                            MATL_NAME
                            VENDOR_CD
                            MATL_TYPE
                            SEQ
                            COLOR
                            SPEC
                            UNIT
                            HS_CD
                            WEIGHT
                            BOX_UNIT
                            COUNTRY
                            ADD_RATE
                            ADD_AMT
                            PERMIT_COMPO1
                            PERMIT_COMPO2
                            PERMIT_COMPO3
                            PERMIT_DETAIL
                            COUNT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BVT_MATL_NAME
                            MATL_TYPE2
                            WIDTH
                            old_vendor_cd
                            rep_matl_cd
                            add_loss
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MATL_MST:",
                JSON.stringify(data.mgrKcdMatlMstQuery.length),
            );
            return data.mgrKcdMatlMstQuery;
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
                    mutation CreateKCD_MATL_MST(
                        $matlCd: String
                        $matlName: String
                        $vendorCd: String
                        $matlType: String
                        $seq: Int
                        $color: String
                        $spec: String
                        $unit: String
                        $hsCd: String
                        $weight: Float
                        $boxUnit: String
                        $country: String
                        $addRate: Float
                        $addAmt: Float
                        $permitCompo1: String
                        $permitCompo2: String
                        $permitCompo3: String
                        $permitDetail: String
                        $countFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $bvtMatlName: String
                        $matlType2: String
                        $width: String
                        $oldVendorCd: String
                        $repMatlCd: String
                        $addLoss: Float
                    ) {
                        createKCD_MATL_MST(
                            MATL_CD: $matlCd
                            MATL_NAME: $matlName
                            VENDOR_CD: $vendorCd
                            MATL_TYPE: $matlType
                            SEQ: $seq
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                            HS_CD: $hsCd
                            WEIGHT: $weight
                            BOX_UNIT: $boxUnit
                            COUNTRY: $country
                            ADD_RATE: $addRate
                            ADD_AMT: $addAmt
                            PERMIT_COMPO1: $permitCompo1
                            PERMIT_COMPO2: $permitCompo2
                            PERMIT_COMPO3: $permitCompo3
                            PERMIT_DETAIL: $permitDetail
                            COUNT_FLAG: $countFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            BVT_MATL_NAME: $bvtMatlName
                            MATL_TYPE2: $matlType2
                            WIDTH: $width
                            old_vendor_cd: $oldVendorCd
                            rep_matl_cd: $repMatlCd
                            add_loss: $addLoss
                        ) {
                            MATL_CD
                            MATL_NAME
                            VENDOR_CD
                            MATL_TYPE
                            SEQ
                            COLOR
                            SPEC
                            UNIT
                            HS_CD
                            WEIGHT
                            BOX_UNIT
                            COUNTRY
                            ADD_RATE
                            ADD_AMT
                            PERMIT_COMPO1
                            PERMIT_COMPO2
                            PERMIT_COMPO3
                            PERMIT_DETAIL
                            COUNT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BVT_MATL_NAME
                            MATL_TYPE2
                            WIDTH
                            old_vendor_cd
                            rep_matl_cd
                            add_loss
                        }
                    }
                `,
                variables: {
                    matlCd: argData.MATL_CD,
                    matlName: argData.MATL_NAME,
                    vendorCd: argData.VENDOR_CD,
                    matlType: argData.MATL_TYPE,
                    seq: argData.SEQ,
                    color: argData.COLOR,
                    spec: argData.SPEC,
                    unit: argData.UNIT,
                    hsCd: argData.HS_CD,
                    weight: argData.WEIGHT,
                    boxUnit: argData.BOX_UNIT,
                    country: argData.COUNTRY,
                    addRate: argData.ADD_RATE,
                    addAmt: argData.ADD_AMT,
                    permitCompo1: argData.PERMIT_COMPO1,
                    permitCompo2: argData.PERMIT_COMPO2,
                    permitCompo3: argData.PERMIT_COMPO3,
                    permitDetail: argData.PERMIT_DETAIL,
                    countFlag: argData.COUNT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    bvtMatlName: argData.BVT_MATL_NAME,
                    matlType2: argData.MATL_TYPE2,
                    width: argData.WIDTH,
                    oldVendorCd: argData.old_vendor_cd,
                    repMatlCd: argData.rep_matl_cd,
                    addLoss: argData.add_loss,
                },
            });
            console.log(
                "KCD_MATL_MST INSERT:",
                JSON.stringify(data.createKCD_MATL_MST),
            );
            return data.createKCD_MATL_MST;
        } catch (e) {
            console.log("KCD_MATL_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_MATL_MST(
                        $updateKcdMatlMstId: Int!
                        $matlCd: String
                        $matlName: String
                        $vendorCd: String
                        $matlType: String
                        $seq: Int
                        $color: String
                        $spec: String
                        $unit: String
                        $hsCd: String
                        $weight: Float
                        $boxUnit: String
                        $country: String
                        $addRate: Float
                        $addAmt: Float
                        $permitCompo1: String
                        $permitCompo2: String
                        $permitCompo3: String
                        $permitDetail: String
                        $countFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $bvtMatlName: String
                        $matlType2: String
                        $width: String
                        $oldVendorCd: String
                        $repMatlCd: String
                        $addLoss: Float
                    ) {
                        updateKCD_MATL_MST(
                            id: $updateKcdMatlMstId
                            MATL_CD: $matlCd
                            MATL_NAME: $matlName
                            VENDOR_CD: $vendorCd
                            MATL_TYPE: $matlType
                            SEQ: $seq
                            COLOR: $color
                            SPEC: $spec
                            UNIT: $unit
                            HS_CD: $hsCd
                            WEIGHT: $weight
                            BOX_UNIT: $boxUnit
                            COUNTRY: $country
                            ADD_RATE: $addRate
                            ADD_AMT: $addAmt
                            PERMIT_COMPO1: $permitCompo1
                            PERMIT_COMPO2: $permitCompo2
                            PERMIT_COMPO3: $permitCompo3
                            PERMIT_DETAIL: $permitDetail
                            COUNT_FLAG: $countFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            BVT_MATL_NAME: $bvtMatlName
                            MATL_TYPE2: $matlType2
                            WIDTH: $width
                            old_vendor_cd: $oldVendorCd
                            rep_matl_cd: $repMatlCd
                            add_loss: $addLoss
                        ) {
                            id
                            MATL_CD
                            MATL_NAME
                            VENDOR_CD
                            MATL_TYPE
                            SEQ
                            COLOR
                            SPEC
                            UNIT
                            HS_CD
                            WEIGHT
                            BOX_UNIT
                            COUNTRY
                            ADD_RATE
                            ADD_AMT
                            PERMIT_COMPO1
                            PERMIT_COMPO2
                            PERMIT_COMPO3
                            PERMIT_DETAIL
                            COUNT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BVT_MATL_NAME
                            MATL_TYPE2
                            WIDTH
                            old_vendor_cd
                            rep_matl_cd
                            add_loss
                        }
                    }
                `,
                variables: {
                    updateKcdMatlMstId: argData.id,
                    matlCd: argData.MATL_CD,
                    matlName: argData.MATL_NAME,
                    vendorCd: argData.VENDOR_CD,
                    matlType: argData.MATL_TYPE,
                    seq: argData.SEQ,
                    color: argData.COLOR,
                    spec: argData.SPEC,
                    unit: argData.UNIT,
                    hsCd: argData.HS_CD,
                    weight: argData.WEIGHT,
                    boxUnit: argData.BOX_UNIT,
                    country: argData.COUNTRY,
                    addRate: argData.ADD_RATE,
                    addAmt: argData.ADD_AMT,
                    permitCompo1: argData.PERMIT_COMPO1,
                    permitCompo2: argData.PERMIT_COMPO2,
                    permitCompo3: argData.PERMIT_COMPO3,
                    permitDetail: argData.PERMIT_DETAIL,
                    countFlag: argData.COUNT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    bvtMatlName: argData.BVT_MATL_NAME,
                    matlType2: argData.MATL_TYPE2,
                    width: argData.WIDTH,
                    oldVendorCd: argData.old_vendor_cd,
                    repMatlCd: argData.rep_matl_cd,
                    addLoss: argData.add_loss,
                },
            });
            console.log(
                "KCD_MATL_MST UPDATE:",
                JSON.stringify(data.updateKCD_MATL_MST),
            );
            return data.updateKCD_MATL_MST;
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
                    mutation DeleteKCD_MATL_MST($deleteKcdMatlMstId: Int!) {
                        deleteKCD_MATL_MST(id: $deleteKcdMatlMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMatlMstId: argData.id,
                },
            });
            console.log(
                "KCD_MATL_MST DELETE:",
                JSON.stringify(data.deleteKCD_MATL_MST),
            );
            return data.deleteKCD_MATL_MST;
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
                    mutation MgrKcdMatlMstDeletes(
                        $ids: [InputMgrKcdMatlMstDeletes!]!
                    ) {
                        mgrKcdMatlMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MATL_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
