/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_GW_ETC {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_GW_ETC {
                        allQueryKCD_GW_ETC {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            DOCU_NO
                        }
                    }
                `,
            });
            console.log(
                "KCD_GW_ETC:",
                JSON.stringify(data.allQueryKCD_GW_ETC.length),
            );
            return data.allQueryKCD_GW_ETC;
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
                    query MgrKcdGwEtcQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdGwEtcQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            DOCU_NO
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_GW_ETC:",
                JSON.stringify(data.mgrKcdGwEtcQuery.length),
            );
            return data.mgrKcdGwEtcQuery;
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
                    mutation CreateKCD_GW_ETC(
                        $approkey: String!
                        $docNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                        $docuNo: String
                    ) {
                        createKCD_GW_ETC(
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                            DOCU_NO: $docuNo
                        ) {
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            DOCU_NO
                        }
                    }
                `,
                variables: {
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                    docuNo: argData.DOCU_NO,
                },
            });
            console.log(
                "KCD_GW_ETC INSERT:",
                JSON.stringify(data.createKCD_GW_ETC),
            );
            return data.createKCD_GW_ETC;
        } catch (e) {
            console.log("KCD_GW_ETC INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_GW_ETC(
                        $updateKcdGwEtcId: Int!
                        $approkey: String!
                        $docNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                        $docuNo: String
                    ) {
                        updateKCD_GW_ETC(
                            id: $updateKcdGwEtcId
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                            DOCU_NO: $docuNo
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                            DOCU_NO
                        }
                    }
                `,
                variables: {
                    updateKcdGwEtcId: argData.id,
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                    docuNo: argData.DOCU_NO,
                },
            });
            console.log(
                "KCD_GW_ETC UPDATE:",
                JSON.stringify(data.updateKCD_GW_ETC),
            );
            return data.updateKCD_GW_ETC;
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
                    mutation DeleteKCD_GW_ETC($deleteKcdGwEtcId: Int!) {
                        deleteKCD_GW_ETC(id: $deleteKcdGwEtcId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdGwEtcId: argData.id,
                },
            });
            console.log(
                "KCD_GW_ETC DELETE:",
                JSON.stringify(data.deleteKCD_GW_ETC),
            );
            return data.deleteKCD_GW_ETC;
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
                    mutation MgrKcdGwEtcDeletes(
                        $ids: [InputMgrKcdGwEtcDeletes!]!
                    ) {
                        mgrKcdGwEtcDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_GW_ETC DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
