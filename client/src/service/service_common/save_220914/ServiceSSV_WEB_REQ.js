/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_WEB_REQ {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_WEB_REQ {
                        allQuerySSV_WEB_REQ {
                            id
                            web_req_no
                            style_cd
                            prod_cd
                            size
                            sale_cnt
                            sale_price
                            reg_user
                            reg_datetime
                            status_cd
                            proc_datetime
                        }
                    }
                `,
            });
            console.log(
                "SSV_WEB_REQ:",
                JSON.stringify(data.allQuerySSV_WEB_REQ.length),
            );
            return data.allQuerySSV_WEB_REQ;
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
                    query MgrSsvWebReqQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvWebReqQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            web_req_no
                            style_cd
                            prod_cd
                            size
                            sale_cnt
                            sale_price
                            reg_user
                            reg_datetime
                            status_cd
                            proc_datetime
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_WEB_REQ:",
                JSON.stringify(data.mgrSsvWebReqQuery.length),
            );
            return data.mgrSsvWebReqQuery;
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
                    mutation CreateSSV_WEB_REQ(
                        $webReqNo: String
                        $styleCd: String
                        $prodCd: String
                        $size: String
                        $saleCnt: Int
                        $salePrice: Int
                        $regUser: String
                        $regDatetime: String
                        $statusCd: String
                        $procDatetime: String
                    ) {
                        createSSV_WEB_REQ(
                            web_req_no: $webReqNo
                            style_cd: $styleCd
                            prod_cd: $prodCd
                            size: $size
                            sale_cnt: $saleCnt
                            sale_price: $salePrice
                            reg_user: $regUser
                            reg_datetime: $regDatetime
                            status_cd: $statusCd
                            proc_datetime: $procDatetime
                        ) {
                            web_req_no
                            style_cd
                            prod_cd
                            size
                            sale_cnt
                            sale_price
                            reg_user
                            reg_datetime
                            status_cd
                            proc_datetime
                        }
                    }
                `,
                variables: {
                    webReqNo: argData.web_req_no,
                    styleCd: argData.style_cd,
                    prodCd: argData.prod_cd,
                    size: argData.size,
                    saleCnt: argData.sale_cnt,
                    salePrice: argData.sale_price,
                    regUser: argData.reg_user,
                    regDatetime: argData.reg_datetime,
                    statusCd: argData.status_cd,
                    procDatetime: argData.proc_datetime,
                },
            });
            console.log(
                "SSV_WEB_REQ INSERT:",
                JSON.stringify(data.createSSV_WEB_REQ),
            );
            return data.createSSV_WEB_REQ;
        } catch (e) {
            console.log("SSV_WEB_REQ INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_WEB_REQ(
                        $updateSsvWebReqId: Int!
                        $webReqNo: String
                        $styleCd: String
                        $prodCd: String
                        $size: String
                        $saleCnt: Int
                        $salePrice: Int
                        $regUser: String
                        $regDatetime: String
                        $statusCd: String
                        $procDatetime: String
                    ) {
                        updateSSV_WEB_REQ(
                            id: $updateSsvWebReqId
                            web_req_no: $webReqNo
                            style_cd: $styleCd
                            prod_cd: $prodCd
                            size: $size
                            sale_cnt: $saleCnt
                            sale_price: $salePrice
                            reg_user: $regUser
                            reg_datetime: $regDatetime
                            status_cd: $statusCd
                            proc_datetime: $procDatetime
                        ) {
                            id
                            web_req_no
                            style_cd
                            prod_cd
                            size
                            sale_cnt
                            sale_price
                            reg_user
                            reg_datetime
                            status_cd
                            proc_datetime
                        }
                    }
                `,
                variables: {
                    updateSsvWebReqId: argData.id,
                    webReqNo: argData.web_req_no,
                    styleCd: argData.style_cd,
                    prodCd: argData.prod_cd,
                    size: argData.size,
                    saleCnt: argData.sale_cnt,
                    salePrice: argData.sale_price,
                    regUser: argData.reg_user,
                    regDatetime: argData.reg_datetime,
                    statusCd: argData.status_cd,
                    procDatetime: argData.proc_datetime,
                },
            });
            console.log(
                "SSV_WEB_REQ UPDATE:",
                JSON.stringify(data.updateSSV_WEB_REQ),
            );
            return data.updateSSV_WEB_REQ;
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
                    mutation DeleteSSV_WEB_REQ($deleteSsvWebReqId: Int!) {
                        deleteSSV_WEB_REQ(id: $deleteSsvWebReqId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvWebReqId: argData.id,
                },
            });
            console.log(
                "SSV_WEB_REQ DELETE:",
                JSON.stringify(data.deleteSSV_WEB_REQ),
            );
            return data.deleteSSV_WEB_REQ;
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
                    mutation MgrSsvWebReqDeletes(
                        $ids: [InputMgrSsvWebReqDeletes!]!
                    ) {
                        mgrSsvWebReqDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_WEB_REQ DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
