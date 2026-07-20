/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_AGENT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_AGENT {
                        allQuerySCD_AGENT {
                            id
                            AGENT_CD
                            AGENT_NAME
                            AGENT_TYPE
                            AGENT_TYPE2
                            PAY_TYPE
                            SALE_RATE
                            BUSINESS_NO
                            BUSINESS_TYPE1
                            BUSINESS_TYPE2
                            PRESIDENT
                            USER_NAME
                            TEL_NO
                            PART
                            RANK1
                            FAX_NO
                            MOBILE_NO
                            AREA1
                            AREA2
                            AREA3
                            EMAIL
                            SHINTS_USER
                            KB_ACCOUNT_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "SCD_AGENT:",
                JSON.stringify(data.allQuerySCD_AGENT.length),
            );
            return data.allQuerySCD_AGENT;
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
                    query MgrScdAgentQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdAgentQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            AGENT_CD
                            AGENT_NAME
                            AGENT_TYPE
                            AGENT_TYPE2
                            PAY_TYPE
                            SALE_RATE
                            BUSINESS_NO
                            BUSINESS_TYPE1
                            BUSINESS_TYPE2
                            PRESIDENT
                            USER_NAME
                            TEL_NO
                            PART
                            RANK1
                            FAX_NO
                            MOBILE_NO
                            AREA1
                            AREA2
                            AREA3
                            EMAIL
                            SHINTS_USER
                            KB_ACCOUNT_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_AGENT:",
                JSON.stringify(data.mgrScdAgentQuery.length),
            );
            return data.mgrScdAgentQuery;
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
                    mutation CreateSCD_AGENT(
                        $agentCd: String
                        $agentName: String
                        $agentType: String
                        $agentType2: String
                        $payType: String
                        $saleRate: Int
                        $businessNo: String
                        $businessType1: String
                        $businessType2: String
                        $president: String
                        $userName: String
                        $telNo: String
                        $part: String
                        $rank1: String
                        $faxNo: String
                        $mobileNo: String
                        $area1: String
                        $area2: String
                        $area3: String
                        $email: String
                        $shintsUser: String
                        $kbAccountNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createSCD_AGENT(
                            AGENT_CD: $agentCd
                            AGENT_NAME: $agentName
                            AGENT_TYPE: $agentType
                            AGENT_TYPE2: $agentType2
                            PAY_TYPE: $payType
                            SALE_RATE: $saleRate
                            BUSINESS_NO: $businessNo
                            BUSINESS_TYPE1: $businessType1
                            BUSINESS_TYPE2: $businessType2
                            PRESIDENT: $president
                            USER_NAME: $userName
                            TEL_NO: $telNo
                            PART: $part
                            RANK1: $rank1
                            FAX_NO: $faxNo
                            MOBILE_NO: $mobileNo
                            AREA1: $area1
                            AREA2: $area2
                            AREA3: $area3
                            EMAIL: $email
                            SHINTS_USER: $shintsUser
                            KB_ACCOUNT_NO: $kbAccountNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            AGENT_CD
                            AGENT_NAME
                            AGENT_TYPE
                            AGENT_TYPE2
                            PAY_TYPE
                            SALE_RATE
                            BUSINESS_NO
                            BUSINESS_TYPE1
                            BUSINESS_TYPE2
                            PRESIDENT
                            USER_NAME
                            TEL_NO
                            PART
                            RANK1
                            FAX_NO
                            MOBILE_NO
                            AREA1
                            AREA2
                            AREA3
                            EMAIL
                            SHINTS_USER
                            KB_ACCOUNT_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    agentCd: argData.AGENT_CD,
                    agentName: argData.AGENT_NAME,
                    agentType: argData.AGENT_TYPE,
                    agentType2: argData.AGENT_TYPE2,
                    payType: argData.PAY_TYPE,
                    saleRate: argData.SALE_RATE,
                    businessNo: argData.BUSINESS_NO,
                    businessType1: argData.BUSINESS_TYPE1,
                    businessType2: argData.BUSINESS_TYPE2,
                    president: argData.PRESIDENT,
                    userName: argData.USER_NAME,
                    telNo: argData.TEL_NO,
                    part: argData.PART,
                    rank1: argData.RANK1,
                    faxNo: argData.FAX_NO,
                    mobileNo: argData.MOBILE_NO,
                    area1: argData.AREA1,
                    area2: argData.AREA2,
                    area3: argData.AREA3,
                    email: argData.EMAIL,
                    shintsUser: argData.SHINTS_USER,
                    kbAccountNo: argData.KB_ACCOUNT_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "SCD_AGENT INSERT:",
                JSON.stringify(data.createSCD_AGENT),
            );
            return data.createSCD_AGENT;
        } catch (e) {
            console.log("SCD_AGENT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_AGENT(
                        $updateScdAgentId: Int!
                        $agentCd: String
                        $agentName: String
                        $agentType: String
                        $agentType2: String
                        $payType: String
                        $saleRate: Int
                        $businessNo: String
                        $businessType1: String
                        $businessType2: String
                        $president: String
                        $userName: String
                        $telNo: String
                        $part: String
                        $rank1: String
                        $faxNo: String
                        $mobileNo: String
                        $area1: String
                        $area2: String
                        $area3: String
                        $email: String
                        $shintsUser: String
                        $kbAccountNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateSCD_AGENT(
                            id: $updateScdAgentId
                            AGENT_CD: $agentCd
                            AGENT_NAME: $agentName
                            AGENT_TYPE: $agentType
                            AGENT_TYPE2: $agentType2
                            PAY_TYPE: $payType
                            SALE_RATE: $saleRate
                            BUSINESS_NO: $businessNo
                            BUSINESS_TYPE1: $businessType1
                            BUSINESS_TYPE2: $businessType2
                            PRESIDENT: $president
                            USER_NAME: $userName
                            TEL_NO: $telNo
                            PART: $part
                            RANK1: $rank1
                            FAX_NO: $faxNo
                            MOBILE_NO: $mobileNo
                            AREA1: $area1
                            AREA2: $area2
                            AREA3: $area3
                            EMAIL: $email
                            SHINTS_USER: $shintsUser
                            KB_ACCOUNT_NO: $kbAccountNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            AGENT_CD
                            AGENT_NAME
                            AGENT_TYPE
                            AGENT_TYPE2
                            PAY_TYPE
                            SALE_RATE
                            BUSINESS_NO
                            BUSINESS_TYPE1
                            BUSINESS_TYPE2
                            PRESIDENT
                            USER_NAME
                            TEL_NO
                            PART
                            RANK1
                            FAX_NO
                            MOBILE_NO
                            AREA1
                            AREA2
                            AREA3
                            EMAIL
                            SHINTS_USER
                            KB_ACCOUNT_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateScdAgentId: argData.id,
                    agentCd: argData.AGENT_CD,
                    agentName: argData.AGENT_NAME,
                    agentType: argData.AGENT_TYPE,
                    agentType2: argData.AGENT_TYPE2,
                    payType: argData.PAY_TYPE,
                    saleRate: argData.SALE_RATE,
                    businessNo: argData.BUSINESS_NO,
                    businessType1: argData.BUSINESS_TYPE1,
                    businessType2: argData.BUSINESS_TYPE2,
                    president: argData.PRESIDENT,
                    userName: argData.USER_NAME,
                    telNo: argData.TEL_NO,
                    part: argData.PART,
                    rank1: argData.RANK1,
                    faxNo: argData.FAX_NO,
                    mobileNo: argData.MOBILE_NO,
                    area1: argData.AREA1,
                    area2: argData.AREA2,
                    area3: argData.AREA3,
                    email: argData.EMAIL,
                    shintsUser: argData.SHINTS_USER,
                    kbAccountNo: argData.KB_ACCOUNT_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "SCD_AGENT UPDATE:",
                JSON.stringify(data.updateSCD_AGENT),
            );
            return data.updateSCD_AGENT;
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
                    mutation DeleteSCD_AGENT($deleteScdAgentId: Int!) {
                        deleteSCD_AGENT(id: $deleteScdAgentId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdAgentId: argData.id,
                },
            });
            console.log(
                "SCD_AGENT DELETE:",
                JSON.stringify(data.deleteSCD_AGENT),
            );
            return data.deleteSCD_AGENT;
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
                    mutation MgrScdAgentDeletes(
                        $ids: [InputMgrScdAgentDeletes!]!
                    ) {
                        mgrScdAgentDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_AGENT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
