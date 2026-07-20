/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_BVTCRDB_MEM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_BVTCRDB_MEM {
                        allQueryKSV_BVTCRDB_MEM {
                            id
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_BVTCRDB_MEM:",
                JSON.stringify(data.allQueryKSV_BVTCRDB_MEM.length),
            );
            return data.allQueryKSV_BVTCRDB_MEM;
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
                    query MgrKsvBvtcrdbMemQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvBvtcrdbMemQuery(
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
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_BVTCRDB_MEM:",
                JSON.stringify(data.mgrKsvBvtcrdbMemQuery.length),
            );
            return data.mgrKsvBvtcrdbMemQuery;
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
                    mutation CreateKSV_BVTCRDB_MEM(
                        $crdbCd: String
                        $endDate: String
                        $crdbAmt: Float
                        $refNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_BVTCRDB_MEM(
                            CRDB_CD: $crdbCd
                            END_DATE: $endDate
                            CRDB_AMT: $crdbAmt
                            REF_NO: $refNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
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
                },
            });
            console.log(
                "KSV_BVTCRDB_MEM INSERT:",
                JSON.stringify(data.createKSV_BVTCRDB_MEM),
            );
            return data.createKSV_BVTCRDB_MEM;
        } catch (e) {
            console.log("KSV_BVTCRDB_MEM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_BVTCRDB_MEM(
                        $updateKsvBvtcrdbMemId: Int!
                        $crdbCd: String
                        $endDate: String
                        $crdbAmt: Float
                        $refNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_BVTCRDB_MEM(
                            id: $updateKsvBvtcrdbMemId
                            CRDB_CD: $crdbCd
                            END_DATE: $endDate
                            CRDB_AMT: $crdbAmt
                            REF_NO: $refNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            CRDB_CD
                            END_DATE
                            CRDB_AMT
                            REF_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvBvtcrdbMemId: argData.id,
                    crdbCd: argData.CRDB_CD,
                    endDate: argData.END_DATE,
                    crdbAmt: argData.CRDB_AMT,
                    refNo: argData.REF_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_BVTCRDB_MEM UPDATE:",
                JSON.stringify(data.updateKSV_BVTCRDB_MEM),
            );
            return data.updateKSV_BVTCRDB_MEM;
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
                    mutation DeleteKSV_BVTCRDB_MEM(
                        $deleteKsvBvtcrdbMemId: Int!
                    ) {
                        deleteKSV_BVTCRDB_MEM(id: $deleteKsvBvtcrdbMemId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvBvtcrdbMemId: argData.id,
                },
            });
            console.log(
                "KSV_BVTCRDB_MEM DELETE:",
                JSON.stringify(data.deleteKSV_BVTCRDB_MEM),
            );
            return data.deleteKSV_BVTCRDB_MEM;
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
                    mutation MgrKsvBvtcrdbMemDeletes(
                        $ids: [InputMgrKsvBvtcrdbMemDeletes!]!
                    ) {
                        mgrKsvBvtcrdbMemDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_BVTCRDB_MEM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
