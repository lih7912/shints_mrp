/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_WEB_REQ_RESULT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_WEB_REQ_RESULT {
                        allQuerySSV_WEB_REQ_RESULT {
                            id
                            web_req_no
                            return_cd
                            remark
                        }
                    }
                `,
            });
            console.log(
                "SSV_WEB_REQ_RESULT:",
                JSON.stringify(data.allQuerySSV_WEB_REQ_RESULT.length),
            );
            return data.allQuerySSV_WEB_REQ_RESULT;
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
                    query MgrSsvWebReqResultQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvWebReqResultQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            web_req_no
                            return_cd
                            remark
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_WEB_REQ_RESULT:",
                JSON.stringify(data.mgrSsvWebReqResultQuery.length),
            );
            return data.mgrSsvWebReqResultQuery;
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
                    mutation CreateSSV_WEB_REQ_RESULT(
                        $webReqNo: String
                        $returnCd: String
                        $remark: String
                    ) {
                        createSSV_WEB_REQ_RESULT(
                            web_req_no: $webReqNo
                            return_cd: $returnCd
                            remark: $remark
                        ) {
                            web_req_no
                            return_cd
                            remark
                        }
                    }
                `,
                variables: {
                    webReqNo: argData.web_req_no,
                    returnCd: argData.return_cd,
                    remark: argData.remark,
                },
            });
            console.log(
                "SSV_WEB_REQ_RESULT INSERT:",
                JSON.stringify(data.createSSV_WEB_REQ_RESULT),
            );
            return data.createSSV_WEB_REQ_RESULT;
        } catch (e) {
            console.log("SSV_WEB_REQ_RESULT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_WEB_REQ_RESULT(
                        $updateSsvWebReqResultId: Int!
                        $webReqNo: String
                        $returnCd: String
                        $remark: String
                    ) {
                        updateSSV_WEB_REQ_RESULT(
                            id: $updateSsvWebReqResultId
                            web_req_no: $webReqNo
                            return_cd: $returnCd
                            remark: $remark
                        ) {
                            id
                            web_req_no
                            return_cd
                            remark
                        }
                    }
                `,
                variables: {
                    updateSsvWebReqResultId: argData.id,
                    webReqNo: argData.web_req_no,
                    returnCd: argData.return_cd,
                    remark: argData.remark,
                },
            });
            console.log(
                "SSV_WEB_REQ_RESULT UPDATE:",
                JSON.stringify(data.updateSSV_WEB_REQ_RESULT),
            );
            return data.updateSSV_WEB_REQ_RESULT;
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
                    mutation DeleteSSV_WEB_REQ_RESULT(
                        $deleteSsvWebReqResultId: Int!
                    ) {
                        deleteSSV_WEB_REQ_RESULT(id: $deleteSsvWebReqResultId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvWebReqResultId: argData.id,
                },
            });
            console.log(
                "SSV_WEB_REQ_RESULT DELETE:",
                JSON.stringify(data.deleteSSV_WEB_REQ_RESULT),
            );
            return data.deleteSSV_WEB_REQ_RESULT;
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
                    mutation MgrSsvWebReqResultDeletes(
                        $ids: [InputMgrSsvWebReqResultDeletes!]!
                    ) {
                        mgrSsvWebReqResultDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_WEB_REQ_RESULT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
