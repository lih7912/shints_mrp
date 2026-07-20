/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CRDB_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CRDB_MEM {
                        allQueryKSV_CRDB_MEM {
                            id
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            MANAGE_DATE
                            PRE_FLAG
                            END_TYPE
                            VAT
                        }
                    }
                `,
            });
            console.log(
                "KSV_CRDB_MEM:",
                JSON.stringify(data.allQueryKSV_CRDB_MEM.length),
            );
            return data.allQueryKSV_CRDB_MEM;
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
                    query MgrKsvCrdbMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCrdbMemQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            MANAGE_DATE
                            PRE_FLAG
                            END_TYPE
                            VAT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CRDB_MEM:",
                JSON.stringify(data.mgrKsvCrdbMemQuery.length),
            );
            return data.mgrKsvCrdbMemQuery;
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
                    mutation CreateKSV_CRDB_MEM(
                        $crdbCd: String
                        $endDate: String
                        $crdbAmt: Float
                        $refNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $manageDate: String
                        $preFlag: String
                        $endType: String
                        $vat: Float
                    ) {
                        createKSV_CRDB_MEM(
                            CRDB_CD: $crdbCd
                            END_DATE: $endDate
                            CRDB_AMT: $crdbAmt
                            REF_NO: $refNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            MANAGE_DATE: $manageDate
                            PRE_FLAG: $preFlag
                            END_TYPE: $endType
                            VAT: $vat
                        ) {
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            MANAGE_DATE
                            PRE_FLAG
                            END_TYPE
                            VAT
                        }
                    }
                `,
                variables: {
                    crdbCd: argData.CRDB_CD,
                    endDate: argData.END_DATE,
                    crdbAmt: argData.CRDB_AMT,
                    refNo: argData.REF_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    manageDate: argData.MANAGE_DATE,
                    preFlag: argData.PRE_FLAG,
                    endType: argData.END_TYPE,
                    vat: argData.VAT,
                },
            });
            console.log(
                "KSV_CRDB_MEM INSERT:",
                JSON.stringify(data.createKSV_CRDB_MEM),
            );
            return data.createKSV_CRDB_MEM;
        } catch (e) {
            console.log("KSV_CRDB_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CRDB_MEM(
                        $updateKsvCrdbMemId: Int!
                        $crdbCd: String
                        $endDate: String
                        $crdbAmt: Float
                        $refNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $manageDate: String
                        $preFlag: String
                        $endType: String
                        $vat: Float
                    ) {
                        updateKSV_CRDB_MEM(
                            id: $updateKsvCrdbMemId
                            CRDB_CD: $crdbCd
                            END_DATE: $endDate
                            CRDB_AMT: $crdbAmt
                            REF_NO: $refNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            MANAGE_DATE: $manageDate
                            PRE_FLAG: $preFlag
                            END_TYPE: $endType
                            VAT: $vat
                        ) {
                            id
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            MANAGE_DATE
                            PRE_FLAG
                            END_TYPE
                            VAT
                        }
                    }
                `,
                variables: {
                    updateKsvCrdbMemId: argData.id,
                    crdbCd: argData.CRDB_CD,
                    endDate: argData.END_DATE,
                    crdbAmt: argData.CRDB_AMT,
                    refNo: argData.REF_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    manageDate: argData.MANAGE_DATE,
                    preFlag: argData.PRE_FLAG,
                    endType: argData.END_TYPE,
                    vat: argData.VAT,
                },
            });
            console.log(
                "KSV_CRDB_MEM UPDATE:",
                JSON.stringify(data.updateKSV_CRDB_MEM),
            );
            return data.updateKSV_CRDB_MEM;
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
                    mutation DeleteKSV_CRDB_MEM($deleteKsvCrdbMemId: Int!) {
                        deleteKSV_CRDB_MEM(id: $deleteKsvCrdbMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCrdbMemId: argData.id,
                },
            });
            console.log(
                "KSV_CRDB_MEM DELETE:",
                JSON.stringify(data.deleteKSV_CRDB_MEM),
            );
            return data.deleteKSV_CRDB_MEM;
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
                    mutation MgrKsvCrdbMemDeletes(
                        $ids: [InputMgrKsvCrdbMemDeletes!]!
                    ) {
                        mgrKsvCrdbMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CRDB_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
