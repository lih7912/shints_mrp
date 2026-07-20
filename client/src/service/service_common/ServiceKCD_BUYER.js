/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKCD_BUYER {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BUYER {
                        allQueryKCD_BUYER {
                            id
                            BUYER_CD
                            BUYER_NAME
                            BUYER_ABBR
                            BUYER_TEAM
                            SHINTS_USER
                            USER_NAME
                            EMAIL
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            COMM_FLAG
                            SALES_TEAM
                            NAT_CD
                            BANK_CD
                            STS_FLAG
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            NEOE_BUYER_CD_MOM
                            NEOE_BUYER_CD
                            NEOE_A23
                            loss_flag
                            glove_flag
                            MOM_CD
                            BUYER_TYPE
                            PAY_RULE
                        }
                    }
                `,
            });
            console.log(
                "KCD_BUYER:",
                JSON.stringify(data.allQueryKCD_BUYER.length),
            );
            return data.allQueryKCD_BUYER;
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
                    query MgrKcdBuyerQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBuyerQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            BUYER_NAME
                            BUYER_ABBR
                            BUYER_TEAM
                            SHINTS_USER
                            USER_NAME
                            EMAIL
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            COMM_FLAG
                            SALES_TEAM
                            NAT_CD
                            BANK_CD
                            STS_FLAG
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            NEOE_BUYER_CD_MOM
                            NEOE_BUYER_CD
                            NEOE_A23
                            loss_flag
                            glove_flag
                            MOM_CD
                            BUYER_TYPE
                            PAY_RULE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BUYER:",
                JSON.stringify(data.mgrKcdBuyerQuery.length),
            );
            return data.mgrKcdBuyerQuery;
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
                    mutation CreateKCD_BUYER(
                        $buyerCd: String
                        $buyerName: String
                        $buyerAbbr: String
                        $buyerTeam: String
                        $shintsUser: String
                        $userName: String
                        $email: String
                        $telNo: String
                        $faxNo: String
                        $zipNo: String
                        $addr1: String
                        $addr2: String
                        $commFlag: String
                        $salesTeam: String
                        $natCd: String
                        $bankCd: String
                        $stsFlag: String
                        $bvtFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $neoeBuyerCdMom: String
                        $neoeBuyerCd: String
                        $neoeA23: String
                        $lossFlag: String
                        $gloveFlag: String
                        $momCd: String
                        $buyerType: String
                        $payRule: String
                    ) {
                        createKCD_BUYER(
                            BUYER_CD: $buyerCd
                            BUYER_NAME: $buyerName
                            BUYER_ABBR: $buyerAbbr
                            BUYER_TEAM: $buyerTeam
                            SHINTS_USER: $shintsUser
                            USER_NAME: $userName
                            EMAIL: $email
                            TEL_NO: $telNo
                            FAX_NO: $faxNo
                            ZIP_NO: $zipNo
                            ADDR1: $addr1
                            ADDR2: $addr2
                            COMM_FLAG: $commFlag
                            SALES_TEAM: $salesTeam
                            NAT_CD: $natCd
                            BANK_CD: $bankCd
                            STS_FLAG: $stsFlag
                            BVT_FLAG: $bvtFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            NEOE_BUYER_CD_MOM: $neoeBuyerCdMom
                            NEOE_BUYER_CD: $neoeBuyerCd
                            NEOE_A23: $neoeA23
                            loss_flag: $lossFlag
                            glove_flag: $gloveFlag
                            MOM_CD: $momCd
                            BUYER_TYPE: $buyerType
                            PAY_RULE: $payRule
                        ) {
                            BUYER_CD
                            BUYER_NAME
                            BUYER_ABBR
                            BUYER_TEAM
                            SHINTS_USER
                            USER_NAME
                            EMAIL
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            COMM_FLAG
                            SALES_TEAM
                            NAT_CD
                            BANK_CD
                            STS_FLAG
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            NEOE_BUYER_CD_MOM
                            NEOE_BUYER_CD
                            NEOE_A23
                            loss_flag
                            glove_flag
                            MOM_CD
                            BUYER_TYPE
                            PAY_RULE
                        }
                    }
                `,
                variables: {
                    buyerCd: argData.BUYER_CD,
                    buyerName: argData.BUYER_NAME,
                    buyerAbbr: argData.BUYER_ABBR,
                    buyerTeam: argData.BUYER_TEAM,
                    shintsUser: argData.SHINTS_USER,
                    userName: argData.USER_NAME,
                    email: argData.EMAIL,
                    telNo: argData.TEL_NO,
                    faxNo: argData.FAX_NO,
                    zipNo: argData.ZIP_NO,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    commFlag: argData.COMM_FLAG,
                    salesTeam: argData.SALES_TEAM,
                    natCd: argData.NAT_CD,
                    bankCd: argData.BANK_CD,
                    stsFlag: argData.STS_FLAG,
                    bvtFlag: argData.BVT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    neoeBuyerCdMom: argData.NEOE_BUYER_CD_MOM,
                    neoeBuyerCd: argData.NEOE_BUYER_CD,
                    neoeA23: argData.NEOE_A23,
                    lossFlag: argData.loss_flag,
                    gloveFlag: argData.glove_flag,
                    momCd: argData.MOM_CD,
                    buyerType: argData.BUYER_TYPE,
                    payRule: argData.PAY_RULE,
                },
            });
            console.log(
                "KCD_BUYER INSERT:",
                JSON.stringify(data.createKCD_BUYER),
            );
            return data.createKCD_BUYER;
        } catch (e) {
            console.log("KCD_BUYER INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_BUYER(
                        $updateKcdBuyerId: Int!
                        $buyerCd: String
                        $buyerName: String
                        $buyerAbbr: String
                        $buyerTeam: String
                        $shintsUser: String
                        $userName: String
                        $email: String
                        $telNo: String
                        $faxNo: String
                        $zipNo: String
                        $addr1: String
                        $addr2: String
                        $commFlag: String
                        $salesTeam: String
                        $natCd: String
                        $bankCd: String
                        $stsFlag: String
                        $bvtFlag: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $neoeBuyerCdMom: String
                        $neoeBuyerCd: String
                        $neoeA23: String
                        $lossFlag: String
                        $gloveFlag: String
                        $momCd: String
                        $buyerType: String
                        $payRule: String
                    ) {
                        updateKCD_BUYER(
                            id: $updateKcdBuyerId
                            BUYER_CD: $buyerCd
                            BUYER_NAME: $buyerName
                            BUYER_ABBR: $buyerAbbr
                            BUYER_TEAM: $buyerTeam
                            SHINTS_USER: $shintsUser
                            USER_NAME: $userName
                            EMAIL: $email
                            TEL_NO: $telNo
                            FAX_NO: $faxNo
                            ZIP_NO: $zipNo
                            ADDR1: $addr1
                            ADDR2: $addr2
                            COMM_FLAG: $commFlag
                            SALES_TEAM: $salesTeam
                            NAT_CD: $natCd
                            BANK_CD: $bankCd
                            STS_FLAG: $stsFlag
                            BVT_FLAG: $bvtFlag
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            NEOE_BUYER_CD_MOM: $neoeBuyerCdMom
                            NEOE_BUYER_CD: $neoeBuyerCd
                            NEOE_A23: $neoeA23
                            loss_flag: $lossFlag
                            glove_flag: $gloveFlag
                            MOM_CD: $momCd
                            BUYER_TYPE: $buyerType
                            PAY_RULE: $payRule
                        ) {
                            id
                            BUYER_CD
                            BUYER_NAME
                            BUYER_ABBR
                            BUYER_TEAM
                            SHINTS_USER
                            USER_NAME
                            EMAIL
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            COMM_FLAG
                            SALES_TEAM
                            NAT_CD
                            BANK_CD
                            STS_FLAG
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            NEOE_BUYER_CD_MOM
                            NEOE_BUYER_CD
                            NEOE_A23
                            loss_flag
                            glove_flag
                            MOM_CD
                            BUYER_TYPE
                            PAY_RULE
                        }
                    }
                `,
                variables: {
                    updateKcdBuyerId: argData.id,
                    buyerCd: argData.BUYER_CD,
                    buyerName: argData.BUYER_NAME,
                    buyerAbbr: argData.BUYER_ABBR,
                    buyerTeam: argData.BUYER_TEAM,
                    shintsUser: argData.SHINTS_USER,
                    userName: argData.USER_NAME,
                    email: argData.EMAIL,
                    telNo: argData.TEL_NO,
                    faxNo: argData.FAX_NO,
                    zipNo: argData.ZIP_NO,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    commFlag: argData.COMM_FLAG,
                    salesTeam: argData.SALES_TEAM,
                    natCd: argData.NAT_CD,
                    bankCd: argData.BANK_CD,
                    stsFlag: argData.STS_FLAG,
                    bvtFlag: argData.BVT_FLAG,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    neoeBuyerCdMom: argData.NEOE_BUYER_CD_MOM,
                    neoeBuyerCd: argData.NEOE_BUYER_CD,
                    neoeA23: argData.NEOE_A23,
                    lossFlag: argData.loss_flag,
                    gloveFlag: argData.glove_flag,
                    momCd: argData.MOM_CD,
                    buyerType: argData.BUYER_TYPE,
                    payRule: argData.PAY_RULE,
                },
            });
            console.log(
                "KCD_BUYER UPDATE:",
                JSON.stringify(data.updateKCD_BUYER),
            );
            return data.updateKCD_BUYER;
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
                    mutation DeleteKCD_BUYER($deleteKcdBuyerId: Int!) {
                        deleteKCD_BUYER(id: $deleteKcdBuyerId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBuyerId: argData.id,
                },
            });
            console.log(
                "KCD_BUYER DELETE:",
                JSON.stringify(data.deleteKCD_BUYER),
            );
            return data.deleteKCD_BUYER;
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
                    mutation MgrKcdBuyerDeletes(
                        $ids: [InputMgrKcdBuyerDeletes!]!
                    ) {
                        mgrKcdBuyerDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BUYER DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
