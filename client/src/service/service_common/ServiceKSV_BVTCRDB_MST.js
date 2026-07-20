/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_BVTCRDB_MST {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_BVTCRDB_MST {
                        allQueryKSV_BVTCRDB_MST {
                            id
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            END_DATE
                            MESSER_CD
                            BUYER_CD
                            ATTENTION
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_BVTCRDB_MST:",
                JSON.stringify(data.allQueryKSV_BVTCRDB_MST.length),
            );
            return data.allQueryKSV_BVTCRDB_MST;
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
                    query MgrKsvBvtcrdbMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvBvtcrdbMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            END_DATE
                            MESSER_CD
                            BUYER_CD
                            ATTENTION
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_BVTCRDB_MST:",
                JSON.stringify(data.mgrKsvBvtcrdbMstQuery.length),
            );
            return data.mgrKsvBvtcrdbMstQuery;
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
                    mutation CreateKSV_BVTCRDB_MST(
                        $crdbCd: String
                        $crdbType: String
                        $crdbDate: String
                        $endDate: String
                        $messerCd: String
                        $buyerCd: String
                        $attention: String
                        $crdbAmt: Float
                        $currCd: String
                        $bankCd: String
                        $title: String
                        $remark: String
                        $yy: Int
                        $seq: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_BVTCRDB_MST(
                            CRDB_CD: $crdbCd
                            CRDB_TYPE: $crdbType
                            CRDB_DATE: $crdbDate
                            END_DATE: $endDate
                            MESSER_CD: $messerCd
                            BUYER_CD: $buyerCd
                            ATTENTION: $attention
                            CRDB_AMT: $crdbAmt
                            CURR_CD: $currCd
                            BANK_CD: $bankCd
                            TITLE: $title
                            REMARK: $remark
                            YY: $yy
                            SEQ: $seq
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            END_DATE
                            MESSER_CD
                            BUYER_CD
                            ATTENTION
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    crdbCd: argData.CRDB_CD,
                    crdbType: argData.CRDB_TYPE,
                    crdbDate: argData.CRDB_DATE,
                    endDate: argData.END_DATE,
                    messerCd: argData.MESSER_CD,
                    buyerCd: argData.BUYER_CD,
                    attention: argData.ATTENTION,
                    crdbAmt: argData.CRDB_AMT,
                    currCd: argData.CURR_CD,
                    bankCd: argData.BANK_CD,
                    title: argData.TITLE,
                    remark: argData.REMARK,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_BVTCRDB_MST INSERT:",
                JSON.stringify(data.createKSV_BVTCRDB_MST),
            );
            return data.createKSV_BVTCRDB_MST;
        } catch (e) {
            console.log("KSV_BVTCRDB_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_BVTCRDB_MST(
                        $updateKsvBvtcrdbMstId: Int!
                        $crdbCd: String
                        $crdbType: String
                        $crdbDate: String
                        $endDate: String
                        $messerCd: String
                        $buyerCd: String
                        $attention: String
                        $crdbAmt: Float
                        $currCd: String
                        $bankCd: String
                        $title: String
                        $remark: String
                        $yy: Int
                        $seq: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_BVTCRDB_MST(
                            id: $updateKsvBvtcrdbMstId
                            CRDB_CD: $crdbCd
                            CRDB_TYPE: $crdbType
                            CRDB_DATE: $crdbDate
                            END_DATE: $endDate
                            MESSER_CD: $messerCd
                            BUYER_CD: $buyerCd
                            ATTENTION: $attention
                            CRDB_AMT: $crdbAmt
                            CURR_CD: $currCd
                            BANK_CD: $bankCd
                            TITLE: $title
                            REMARK: $remark
                            YY: $yy
                            SEQ: $seq
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            CRDB_CD
                            CRDB_TYPE
                            CRDB_DATE
                            END_DATE
                            MESSER_CD
                            BUYER_CD
                            ATTENTION
                            CRDB_AMT
                            CURR_CD
                            BANK_CD
                            TITLE
                            REMARK
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvBvtcrdbMstId: argData.id,
                    crdbCd: argData.CRDB_CD,
                    crdbType: argData.CRDB_TYPE,
                    crdbDate: argData.CRDB_DATE,
                    endDate: argData.END_DATE,
                    messerCd: argData.MESSER_CD,
                    buyerCd: argData.BUYER_CD,
                    attention: argData.ATTENTION,
                    crdbAmt: argData.CRDB_AMT,
                    currCd: argData.CURR_CD,
                    bankCd: argData.BANK_CD,
                    title: argData.TITLE,
                    remark: argData.REMARK,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_BVTCRDB_MST UPDATE:",
                JSON.stringify(data.updateKSV_BVTCRDB_MST),
            );
            return data.updateKSV_BVTCRDB_MST;
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
                    mutation DeleteKSV_BVTCRDB_MST(
                        $deleteKsvBvtcrdbMstId: Int!
                    ) {
                        deleteKSV_BVTCRDB_MST(id: $deleteKsvBvtcrdbMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvBvtcrdbMstId: argData.id,
                },
            });
            console.log(
                "KSV_BVTCRDB_MST DELETE:",
                JSON.stringify(data.deleteKSV_BVTCRDB_MST),
            );
            return data.deleteKSV_BVTCRDB_MST;
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
                    mutation MgrKsvBvtcrdbMstDeletes(
                        $ids: [InputMgrKsvBvtcrdbMstDeletes!]!
                    ) {
                        mgrKsvBvtcrdbMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_BVTCRDB_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
