/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_GWCODE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_GWCODE {
                        allQueryKCD_GWCODE {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                        }
                    }
                `,
            });
            console.log(
                "KCD_GWCODE:",
                JSON.stringify(data.allQueryKCD_GWCODE.length),
            );
            return data.allQueryKCD_GWCODE;
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
                    query MgrKcdGwcodeQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdGwcodeQuery(
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
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_GWCODE:",
                JSON.stringify(data.mgrKcdGwcodeQuery.length),
            );
            return data.mgrKcdGwcodeQuery;
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
                    mutation CreateKCD_GWCODE(
                        $approkey: String!
                        $docNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                    ) {
                        createKCD_GWCODE(
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                        ) {
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
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
                },
            });
            console.log(
                "KCD_GWCODE INSERT:",
                JSON.stringify(data.createKCD_GWCODE),
            );
            return data.createKCD_GWCODE;
        } catch (e) {
            console.log("KCD_GWCODE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_GWCODE(
                        $updateKcdGwcodeId: Int!
                        $approkey: String!
                        $docNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $year: String
                    ) {
                        updateKCD_GWCODE(
                            id: $updateKcdGwcodeId
                            APPROKEY: $approkey
                            DOC_NO: $docNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            YEAR: $year
                        ) {
                            id
                            APPROKEY
                            DOC_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            YEAR
                        }
                    }
                `,
                variables: {
                    updateKcdGwcodeId: argData.id,
                    approkey: argData.APPROKEY,
                    docNo: argData.DOC_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    year: argData.YEAR,
                },
            });
            console.log(
                "KCD_GWCODE UPDATE:",
                JSON.stringify(data.updateKCD_GWCODE),
            );
            return data.updateKCD_GWCODE;
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
                    mutation DeleteKCD_GWCODE($deleteKcdGwcodeId: Int!) {
                        deleteKCD_GWCODE(id: $deleteKcdGwcodeId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdGwcodeId: argData.id,
                },
            });
            console.log(
                "KCD_GWCODE DELETE:",
                JSON.stringify(data.deleteKCD_GWCODE),
            );
            return data.deleteKCD_GWCODE;
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
                    mutation MgrKcdGwcodeDeletes(
                        $ids: [InputMgrKcdGwcodeDeletes!]!
                    ) {
                        mgrKcdGwcodeDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_GWCODE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
