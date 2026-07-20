/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKZZ_ACC_DATA {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_ACC_DATA {
                        allQueryKZZ_ACC_DATA {
                            id
                            CD_SEQ
                            CD_STATUS
                            DT_DOCUMENT
                            DT_REQUEST
                            DT_ACTUAL
                            CD_CC
                            CD_ACCT
                            NM_CURR
                            AMT
                            VAT
                            TOT
                            MIN
                            ACTUAL
                            CD_SUPPLIER
                            NM_REMARK
                            NM_ACTOPTION
                            NM_ACTREMARK
                            ID_REG
                            DT_REG
                            CD_PART
                            ID_UPD
                            DT_UPD
                            ID_GW
                            DT_GW
                            ID_END
                            DT_END
                            ID_SEND
                            DT_SEND
                            CD_TAX
                            CD_PAY_TYPE
                            CD_REQUEST_TYPE
                            CD_GW
                            CD_BILL
                            CD_ACDOC
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            BANK_BRANCH
                        }
                    }
                `,
            });
            console.log(
                "KZZ_ACC_DATA:",
                JSON.stringify(data.allQueryKZZ_ACC_DATA.length),
            );
            return data.allQueryKZZ_ACC_DATA;
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
                    query MgrKzzAccDataQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzAccDataQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CD_SEQ
                            CD_STATUS
                            DT_DOCUMENT
                            DT_REQUEST
                            DT_ACTUAL
                            CD_CC
                            CD_ACCT
                            NM_CURR
                            AMT
                            VAT
                            TOT
                            MIN
                            ACTUAL
                            CD_SUPPLIER
                            NM_REMARK
                            NM_ACTOPTION
                            NM_ACTREMARK
                            ID_REG
                            DT_REG
                            CD_PART
                            ID_UPD
                            DT_UPD
                            ID_GW
                            DT_GW
                            ID_END
                            DT_END
                            ID_SEND
                            DT_SEND
                            CD_TAX
                            CD_PAY_TYPE
                            CD_REQUEST_TYPE
                            CD_GW
                            CD_BILL
                            CD_ACDOC
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            BANK_BRANCH
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_ACC_DATA:",
                JSON.stringify(data.mgrKzzAccDataQuery.length),
            );
            return data.mgrKzzAccDataQuery;
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
                    mutation CreateKZZ_ACC_DATA(
                        $cdSeq: Int!
                        $cdStatus: Int
                        $dtDocument: String
                        $dtRequest: String
                        $dtActual: String
                        $cdCc: String
                        $cdAcct: String
                        $nmCurr: String
                        $amt: Float
                        $vat: Float
                        $tot: Float
                        $min: Float
                        $actual: Float
                        $cdSupplier: String
                        $nmRemark: String
                        $nmActoption: String
                        $nmActremark: String
                        $idReg: String
                        $dtReg: String
                        $cdPart: String
                        $idUpd: String
                        $dtUpd: String
                        $idGw: String
                        $dtGw: String
                        $idEnd: String
                        $dtEnd: String
                        $idSend: String
                        $dtSend: String
                        $cdTax: Int
                        $cdPayType: Int
                        $cdRequestType: Int
                        $cdGw: String
                        $cdBill: String
                        $cdAcdoc: String
                        $bankCd: String
                        $bankName: String
                        $accountNo: String
                        $accountName: String
                        $sftcode: String
                        $bankBranch: String
                    ) {
                        createKZZ_ACC_DATA(
                            CD_SEQ: $cdSeq
                            CD_STATUS: $cdStatus
                            DT_DOCUMENT: $dtDocument
                            DT_REQUEST: $dtRequest
                            DT_ACTUAL: $dtActual
                            CD_CC: $cdCc
                            CD_ACCT: $cdAcct
                            NM_CURR: $nmCurr
                            AMT: $amt
                            VAT: $vat
                            TOT: $tot
                            MIN: $min
                            ACTUAL: $actual
                            CD_SUPPLIER: $cdSupplier
                            NM_REMARK: $nmRemark
                            NM_ACTOPTION: $nmActoption
                            NM_ACTREMARK: $nmActremark
                            ID_REG: $idReg
                            DT_REG: $dtReg
                            CD_PART: $cdPart
                            ID_UPD: $idUpd
                            DT_UPD: $dtUpd
                            ID_GW: $idGw
                            DT_GW: $dtGw
                            ID_END: $idEnd
                            DT_END: $dtEnd
                            ID_SEND: $idSend
                            DT_SEND: $dtSend
                            CD_TAX: $cdTax
                            CD_PAY_TYPE: $cdPayType
                            CD_REQUEST_TYPE: $cdRequestType
                            CD_GW: $cdGw
                            CD_BILL: $cdBill
                            CD_ACDOC: $cdAcdoc
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            ACCOUNT_NO: $accountNo
                            ACCOUNT_NAME: $accountName
                            SFTCODE: $sftcode
                            BANK_BRANCH: $bankBranch
                        ) {
                            CD_SEQ
                            CD_STATUS
                            DT_DOCUMENT
                            DT_REQUEST
                            DT_ACTUAL
                            CD_CC
                            CD_ACCT
                            NM_CURR
                            AMT
                            VAT
                            TOT
                            MIN
                            ACTUAL
                            CD_SUPPLIER
                            NM_REMARK
                            NM_ACTOPTION
                            NM_ACTREMARK
                            ID_REG
                            DT_REG
                            CD_PART
                            ID_UPD
                            DT_UPD
                            ID_GW
                            DT_GW
                            ID_END
                            DT_END
                            ID_SEND
                            DT_SEND
                            CD_TAX
                            CD_PAY_TYPE
                            CD_REQUEST_TYPE
                            CD_GW
                            CD_BILL
                            CD_ACDOC
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            BANK_BRANCH
                        }
                    }
                `,
                variables: {
                    cdSeq: argData.CD_SEQ,
                    cdStatus: argData.CD_STATUS,
                    dtDocument: argData.DT_DOCUMENT,
                    dtRequest: argData.DT_REQUEST,
                    dtActual: argData.DT_ACTUAL,
                    cdCc: argData.CD_CC,
                    cdAcct: argData.CD_ACCT,
                    nmCurr: argData.NM_CURR,
                    amt: argData.AMT,
                    vat: argData.VAT,
                    tot: argData.TOT,
                    min: argData.MIN,
                    actual: argData.ACTUAL,
                    cdSupplier: argData.CD_SUPPLIER,
                    nmRemark: argData.NM_REMARK,
                    nmActoption: argData.NM_ACTOPTION,
                    nmActremark: argData.NM_ACTREMARK,
                    idReg: argData.ID_REG,
                    dtReg: argData.DT_REG,
                    cdPart: argData.CD_PART,
                    idUpd: argData.ID_UPD,
                    dtUpd: argData.DT_UPD,
                    idGw: argData.ID_GW,
                    dtGw: argData.DT_GW,
                    idEnd: argData.ID_END,
                    dtEnd: argData.DT_END,
                    idSend: argData.ID_SEND,
                    dtSend: argData.DT_SEND,
                    cdTax: argData.CD_TAX,
                    cdPayType: argData.CD_PAY_TYPE,
                    cdRequestType: argData.CD_REQUEST_TYPE,
                    cdGw: argData.CD_GW,
                    cdBill: argData.CD_BILL,
                    cdAcdoc: argData.CD_ACDOC,
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    accountNo: argData.ACCOUNT_NO,
                    accountName: argData.ACCOUNT_NAME,
                    sftcode: argData.SFTCODE,
                    bankBranch: argData.BANK_BRANCH,
                },
            });
            console.log(
                "KZZ_ACC_DATA INSERT:",
                JSON.stringify(data.createKZZ_ACC_DATA),
            );
            return data.createKZZ_ACC_DATA;
        } catch (e) {
            console.log("KZZ_ACC_DATA INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKZZ_ACC_DATA(
                        $updateKzzAccDataId: Int!
                        $cdSeq: Int!
                        $cdStatus: Int
                        $dtDocument: String
                        $dtRequest: String
                        $dtActual: String
                        $cdCc: String
                        $cdAcct: String
                        $nmCurr: String
                        $amt: Float
                        $vat: Float
                        $tot: Float
                        $min: Float
                        $actual: Float
                        $cdSupplier: String
                        $nmRemark: String
                        $nmActoption: String
                        $nmActremark: String
                        $idReg: String
                        $dtReg: String
                        $cdPart: String
                        $idUpd: String
                        $dtUpd: String
                        $idGw: String
                        $dtGw: String
                        $idEnd: String
                        $dtEnd: String
                        $idSend: String
                        $dtSend: String
                        $cdTax: Int
                        $cdPayType: Int
                        $cdRequestType: Int
                        $cdGw: String
                        $cdBill: String
                        $cdAcdoc: String
                        $bankCd: String
                        $bankName: String
                        $accountNo: String
                        $accountName: String
                        $sftcode: String
                        $bankBranch: String
                    ) {
                        updateKZZ_ACC_DATA(
                            id: $updateKzzAccDataId
                            CD_SEQ: $cdSeq
                            CD_STATUS: $cdStatus
                            DT_DOCUMENT: $dtDocument
                            DT_REQUEST: $dtRequest
                            DT_ACTUAL: $dtActual
                            CD_CC: $cdCc
                            CD_ACCT: $cdAcct
                            NM_CURR: $nmCurr
                            AMT: $amt
                            VAT: $vat
                            TOT: $tot
                            MIN: $min
                            ACTUAL: $actual
                            CD_SUPPLIER: $cdSupplier
                            NM_REMARK: $nmRemark
                            NM_ACTOPTION: $nmActoption
                            NM_ACTREMARK: $nmActremark
                            ID_REG: $idReg
                            DT_REG: $dtReg
                            CD_PART: $cdPart
                            ID_UPD: $idUpd
                            DT_UPD: $dtUpd
                            ID_GW: $idGw
                            DT_GW: $dtGw
                            ID_END: $idEnd
                            DT_END: $dtEnd
                            ID_SEND: $idSend
                            DT_SEND: $dtSend
                            CD_TAX: $cdTax
                            CD_PAY_TYPE: $cdPayType
                            CD_REQUEST_TYPE: $cdRequestType
                            CD_GW: $cdGw
                            CD_BILL: $cdBill
                            CD_ACDOC: $cdAcdoc
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            ACCOUNT_NO: $accountNo
                            ACCOUNT_NAME: $accountName
                            SFTCODE: $sftcode
                            BANK_BRANCH: $bankBranch
                        ) {
                            id
                            CD_SEQ
                            CD_STATUS
                            DT_DOCUMENT
                            DT_REQUEST
                            DT_ACTUAL
                            CD_CC
                            CD_ACCT
                            NM_CURR
                            AMT
                            VAT
                            TOT
                            MIN
                            ACTUAL
                            CD_SUPPLIER
                            NM_REMARK
                            NM_ACTOPTION
                            NM_ACTREMARK
                            ID_REG
                            DT_REG
                            CD_PART
                            ID_UPD
                            DT_UPD
                            ID_GW
                            DT_GW
                            ID_END
                            DT_END
                            ID_SEND
                            DT_SEND
                            CD_TAX
                            CD_PAY_TYPE
                            CD_REQUEST_TYPE
                            CD_GW
                            CD_BILL
                            CD_ACDOC
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            BANK_BRANCH
                        }
                    }
                `,
                variables: {
                    updateKzzAccDataId: argData.id,
                    cdSeq: argData.CD_SEQ,
                    cdStatus: argData.CD_STATUS,
                    dtDocument: argData.DT_DOCUMENT,
                    dtRequest: argData.DT_REQUEST,
                    dtActual: argData.DT_ACTUAL,
                    cdCc: argData.CD_CC,
                    cdAcct: argData.CD_ACCT,
                    nmCurr: argData.NM_CURR,
                    amt: argData.AMT,
                    vat: argData.VAT,
                    tot: argData.TOT,
                    min: argData.MIN,
                    actual: argData.ACTUAL,
                    cdSupplier: argData.CD_SUPPLIER,
                    nmRemark: argData.NM_REMARK,
                    nmActoption: argData.NM_ACTOPTION,
                    nmActremark: argData.NM_ACTREMARK,
                    idReg: argData.ID_REG,
                    dtReg: argData.DT_REG,
                    cdPart: argData.CD_PART,
                    idUpd: argData.ID_UPD,
                    dtUpd: argData.DT_UPD,
                    idGw: argData.ID_GW,
                    dtGw: argData.DT_GW,
                    idEnd: argData.ID_END,
                    dtEnd: argData.DT_END,
                    idSend: argData.ID_SEND,
                    dtSend: argData.DT_SEND,
                    cdTax: argData.CD_TAX,
                    cdPayType: argData.CD_PAY_TYPE,
                    cdRequestType: argData.CD_REQUEST_TYPE,
                    cdGw: argData.CD_GW,
                    cdBill: argData.CD_BILL,
                    cdAcdoc: argData.CD_ACDOC,
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    accountNo: argData.ACCOUNT_NO,
                    accountName: argData.ACCOUNT_NAME,
                    sftcode: argData.SFTCODE,
                    bankBranch: argData.BANK_BRANCH,
                },
            });
            console.log(
                "KZZ_ACC_DATA UPDATE:",
                JSON.stringify(data.updateKZZ_ACC_DATA),
            );
            return data.updateKZZ_ACC_DATA;
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
                    mutation DeleteKZZ_ACC_DATA($deleteKzzAccDataId: Int!) {
                        deleteKZZ_ACC_DATA(id: $deleteKzzAccDataId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzAccDataId: argData.id,
                },
            });
            console.log(
                "KZZ_ACC_DATA DELETE:",
                JSON.stringify(data.deleteKZZ_ACC_DATA),
            );
            return data.deleteKZZ_ACC_DATA;
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
                    mutation MgrKzzAccDataDeletes(
                        $ids: [InputMgrKzzAccDataDeletes!]!
                    ) {
                        mgrKzzAccDataDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_ACC_DATA DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
