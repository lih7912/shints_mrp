/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BVTLINE_YYMM {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BVTLINE_YYMM {
                        allQueryKCD_BVTLINE_YYMM {
                            id
                            LINE_CD
                            YYMM
                            LINE_CNT
                        }
                    }
                `,
            });
            console.log(
                "KCD_BVTLINE_YYMM:",
                JSON.stringify(data.allQueryKCD_BVTLINE_YYMM.length),
            );
            return data.allQueryKCD_BVTLINE_YYMM;
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
                    query MgrKcdBvtlineYymmQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBvtlineYymmQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            LINE_CD
                            YYMM
                            LINE_CNT
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BVTLINE_YYMM:",
                JSON.stringify(data.mgrKcdBvtlineYymmQuery.length),
            );
            return data.mgrKcdBvtlineYymmQuery;
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
                    mutation CreateKCD_BVTLINE_YYMM(
                        $lineCd: String
                        $yymm: String
                        $lineCnt: Int
                    ) {
                        createKCD_BVTLINE_YYMM(
                            LINE_CD: $lineCd
                            YYMM: $yymm
                            LINE_CNT: $lineCnt
                        ) {
                            LINE_CD
                            YYMM
                            LINE_CNT
                        }
                    }
                `,
                variables: {
                    lineCd: argData.LINE_CD,
                    yymm: argData.YYMM,
                    lineCnt: argData.LINE_CNT,
                },
            });
            console.log(
                "KCD_BVTLINE_YYMM INSERT:",
                JSON.stringify(data.createKCD_BVTLINE_YYMM),
            );
            return data.createKCD_BVTLINE_YYMM;
        } catch (e) {
            console.log("KCD_BVTLINE_YYMM INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_BVTLINE_YYMM(
                        $updateKcdBvtlineYymmId: Int!
                        $lineCd: String
                        $yymm: String
                        $lineCnt: Int
                    ) {
                        updateKCD_BVTLINE_YYMM(
                            id: $updateKcdBvtlineYymmId
                            LINE_CD: $lineCd
                            YYMM: $yymm
                            LINE_CNT: $lineCnt
                        ) {
                            id
                            LINE_CD
                            YYMM
                            LINE_CNT
                        }
                    }
                `,
                variables: {
                    updateKcdBvtlineYymmId: argData.id,
                    lineCd: argData.LINE_CD,
                    yymm: argData.YYMM,
                    lineCnt: argData.LINE_CNT,
                },
            });
            console.log(
                "KCD_BVTLINE_YYMM UPDATE:",
                JSON.stringify(data.updateKCD_BVTLINE_YYMM),
            );
            return data.updateKCD_BVTLINE_YYMM;
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
                    mutation DeleteKCD_BVTLINE_YYMM(
                        $deleteKcdBvtlineYymmId: Int!
                    ) {
                        deleteKCD_BVTLINE_YYMM(id: $deleteKcdBvtlineYymmId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBvtlineYymmId: argData.id,
                },
            });
            console.log(
                "KCD_BVTLINE_YYMM DELETE:",
                JSON.stringify(data.deleteKCD_BVTLINE_YYMM),
            );
            return data.deleteKCD_BVTLINE_YYMM;
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
                    mutation MgrKcdBvtlineYymmDeletes(
                        $ids: [InputMgrKcdBvtlineYymmDeletes!]!
                    ) {
                        mgrKcdBvtlineYymmDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BVTLINE_YYMM DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
