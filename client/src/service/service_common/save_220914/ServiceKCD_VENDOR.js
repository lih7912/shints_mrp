/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_VENDOR {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_VENDOR {
                        allQueryKCD_VENDOR {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK1
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                        }
                    }
                `,
            });
            console.log(
                "KCD_VENDOR:",
                JSON.stringify(data.allQueryKCD_VENDOR.length),
            );
            return data.allQueryKCD_VENDOR;
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
                    query MgrKcdVendorQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdVendorQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK1
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_VENDOR:",
                JSON.stringify(data.mgrKcdVendorQuery.length),
            );
            return data.mgrKcdVendorQuery;
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
                    mutation CreateKCD_VENDOR(
                        $vendorCd: String
                        $vendorName: String
                        $invoiceName: String
                        $vendorType: String
                        $shintsUser: String
                        $regNo: String
                        $president: String
                        $userName: String
                        $part: String
                        $rank1: String
                        $email: String
                        $telNo: String
                        $faxNo: String
                        $payType: String
                        $payTerm: Int
                        $leadTime: String
                        $bankCd: String
                        $natCd: String
                        $zipNo: String
                        $addr1: String
                        $addr2: String
                        $statusCd: String
                        $permit: String
                        $vendorMatlType: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $bank1: String
                        $bank2: String
                        $gw: String
                        $approkey: String
                        $bankCd2: String
                        $bankCd3: String
                        $neoeNo: String
                        $remark: String
                    ) {
                        createKCD_VENDOR(
                            VENDOR_CD: $vendorCd
                            VENDOR_NAME: $vendorName
                            INVOICE_NAME: $invoiceName
                            VENDOR_TYPE: $vendorType
                            SHINTS_USER: $shintsUser
                            REG_NO: $regNo
                            PRESIDENT: $president
                            USER_NAME: $userName
                            PART: $part
                            RANK1: $rank1
                            EMAIL: $email
                            TEL_NO: $telNo
                            FAX_NO: $faxNo
                            PAY_TYPE: $payType
                            PAY_TERM: $payTerm
                            LEAD_TIME: $leadTime
                            BANK_CD: $bankCd
                            NAT_CD: $natCd
                            ZIP_NO: $zipNo
                            ADDR1: $addr1
                            ADDR2: $addr2
                            STATUS_CD: $statusCd
                            PERMIT: $permit
                            VENDOR_MATL_TYPE: $vendorMatlType
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            BANK1: $bank1
                            BANK2: $bank2
                            GW: $gw
                            APPROKEY: $approkey
                            BANK_CD2: $bankCd2
                            BANK_CD3: $bankCd3
                            NEOE_NO: $neoeNo
                            REMARK: $remark
                        ) {
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK1
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                        }
                    }
                `,
                variables: {
                    vendorCd: argData.VENDOR_CD,
                    vendorName: argData.VENDOR_NAME,
                    invoiceName: argData.INVOICE_NAME,
                    vendorType: argData.VENDOR_TYPE,
                    shintsUser: argData.SHINTS_USER,
                    regNo: argData.REG_NO,
                    president: argData.PRESIDENT,
                    userName: argData.USER_NAME,
                    part: argData.PART,
                    rank1: argData.RANK1,
                    email: argData.EMAIL,
                    telNo: argData.TEL_NO,
                    faxNo: argData.FAX_NO,
                    payType: argData.PAY_TYPE,
                    payTerm: argData.PAY_TERM,
                    leadTime: argData.LEAD_TIME,
                    bankCd: argData.BANK_CD,
                    natCd: argData.NAT_CD,
                    zipNo: argData.ZIP_NO,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    statusCd: argData.STATUS_CD,
                    permit: argData.PERMIT,
                    vendorMatlType: argData.VENDOR_MATL_TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    bank1: argData.BANK1,
                    bank2: argData.BANK2,
                    gw: argData.GW,
                    approkey: argData.APPROKEY,
                    bankCd2: argData.BANK_CD2,
                    bankCd3: argData.BANK_CD3,
                    neoeNo: argData.NEOE_NO,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KCD_VENDOR INSERT:",
                JSON.stringify(data.createKCD_VENDOR),
            );
            return data.createKCD_VENDOR;
        } catch (e) {
            console.log("KCD_VENDOR INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_VENDOR(
                        $updateKcdVendorId: Int!
                        $vendorCd: String
                        $vendorName: String
                        $invoiceName: String
                        $vendorType: String
                        $shintsUser: String
                        $regNo: String
                        $president: String
                        $userName: String
                        $part: String
                        $rank1: String
                        $email: String
                        $telNo: String
                        $faxNo: String
                        $payType: String
                        $payTerm: Int
                        $leadTime: String
                        $bankCd: String
                        $natCd: String
                        $zipNo: String
                        $addr1: String
                        $addr2: String
                        $statusCd: String
                        $permit: String
                        $vendorMatlType: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $bank1: String
                        $bank2: String
                        $gw: String
                        $approkey: String
                        $bankCd2: String
                        $bankCd3: String
                        $neoeNo: String
                        $remark: String
                    ) {
                        updateKCD_VENDOR(
                            id: $updateKcdVendorId
                            VENDOR_CD: $vendorCd
                            VENDOR_NAME: $vendorName
                            INVOICE_NAME: $invoiceName
                            VENDOR_TYPE: $vendorType
                            SHINTS_USER: $shintsUser
                            REG_NO: $regNo
                            PRESIDENT: $president
                            USER_NAME: $userName
                            PART: $part
                            RANK1: $rank1
                            EMAIL: $email
                            TEL_NO: $telNo
                            FAX_NO: $faxNo
                            PAY_TYPE: $payType
                            PAY_TERM: $payTerm
                            LEAD_TIME: $leadTime
                            BANK_CD: $bankCd
                            NAT_CD: $natCd
                            ZIP_NO: $zipNo
                            ADDR1: $addr1
                            ADDR2: $addr2
                            STATUS_CD: $statusCd
                            PERMIT: $permit
                            VENDOR_MATL_TYPE: $vendorMatlType
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            BANK1: $bank1
                            BANK2: $bank2
                            GW: $gw
                            APPROKEY: $approkey
                            BANK_CD2: $bankCd2
                            BANK_CD3: $bankCd3
                            NEOE_NO: $neoeNo
                            REMARK: $remark
                        ) {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK1
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                        }
                    }
                `,
                variables: {
                    updateKcdVendorId: argData.id,
                    vendorCd: argData.VENDOR_CD,
                    vendorName: argData.VENDOR_NAME,
                    invoiceName: argData.INVOICE_NAME,
                    vendorType: argData.VENDOR_TYPE,
                    shintsUser: argData.SHINTS_USER,
                    regNo: argData.REG_NO,
                    president: argData.PRESIDENT,
                    userName: argData.USER_NAME,
                    part: argData.PART,
                    rank1: argData.RANK1,
                    email: argData.EMAIL,
                    telNo: argData.TEL_NO,
                    faxNo: argData.FAX_NO,
                    payType: argData.PAY_TYPE,
                    payTerm: argData.PAY_TERM,
                    leadTime: argData.LEAD_TIME,
                    bankCd: argData.BANK_CD,
                    natCd: argData.NAT_CD,
                    zipNo: argData.ZIP_NO,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    statusCd: argData.STATUS_CD,
                    permit: argData.PERMIT,
                    vendorMatlType: argData.VENDOR_MATL_TYPE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    bank1: argData.BANK1,
                    bank2: argData.BANK2,
                    gw: argData.GW,
                    approkey: argData.APPROKEY,
                    bankCd2: argData.BANK_CD2,
                    bankCd3: argData.BANK_CD3,
                    neoeNo: argData.NEOE_NO,
                    remark: argData.REMARK,
                },
            });
            console.log(
                "KCD_VENDOR UPDATE:",
                JSON.stringify(data.updateKCD_VENDOR),
            );
            return data.updateKCD_VENDOR;
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
                    mutation DeleteKCD_VENDOR($deleteKcdVendorId: Int!) {
                        deleteKCD_VENDOR(id: $deleteKcdVendorId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdVendorId: argData.id,
                },
            });
            console.log(
                "KCD_VENDOR DELETE:",
                JSON.stringify(data.deleteKCD_VENDOR),
            );
            return data.deleteKCD_VENDOR;
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
                    mutation MgrKcdVendorDeletes(
                        $ids: [InputMgrKcdVendorDeletes!]!
                    ) {
                        mgrKcdVendorDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_VENDOR DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
