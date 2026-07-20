/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKZZ_MATL_AMT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKZZ_MATL_AMT {
                        allQueryKZZ_MATL_AMT {
                            id
                            USER_ID
                            VENDOR_CD
                            TOT_AMT
                            TOT_01
                            TOT_02
                            TOT_03
                            TOT_04
                            TOT_05
                            TOT_06
                            TOT_07
                            TOT_08
                            TOT_09
                            TOT_10
                            TOT_11
                            TOT_12
                        }
                    }
                `,
            });
            console.log(
                "KZZ_MATL_AMT:",
                JSON.stringify(data.allQueryKZZ_MATL_AMT.length),
            );
            return data.allQueryKZZ_MATL_AMT;
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
                    query MgrKzzMatlAmtQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKzzMatlAmtQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            VENDOR_CD
                            TOT_AMT
                            TOT_01
                            TOT_02
                            TOT_03
                            TOT_04
                            TOT_05
                            TOT_06
                            TOT_07
                            TOT_08
                            TOT_09
                            TOT_10
                            TOT_11
                            TOT_12
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KZZ_MATL_AMT:",
                JSON.stringify(data.mgrKzzMatlAmtQuery.length),
            );
            return data.mgrKzzMatlAmtQuery;
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
                    mutation CreateKZZ_MATL_AMT(
                        $userId: String
                        $vendorCd: String
                        $totAmt: Float
                        $tot01: Float
                        $tot02: Float
                        $tot03: Float
                        $tot04: Float
                        $tot05: Float
                        $tot06: Float
                        $tot07: Float
                        $tot08: Float
                        $tot09: Float
                        $tot10: Float
                        $tot11: Float
                        $tot12: Float
                    ) {
                        createKZZ_MATL_AMT(
                            USER_ID: $userId
                            VENDOR_CD: $vendorCd
                            TOT_AMT: $totAmt
                            TOT_01: $tot01
                            TOT_02: $tot02
                            TOT_03: $tot03
                            TOT_04: $tot04
                            TOT_05: $tot05
                            TOT_06: $tot06
                            TOT_07: $tot07
                            TOT_08: $tot08
                            TOT_09: $tot09
                            TOT_10: $tot10
                            TOT_11: $tot11
                            TOT_12: $tot12
                        ) {
                            USER_ID
                            VENDOR_CD
                            TOT_AMT
                            TOT_01
                            TOT_02
                            TOT_03
                            TOT_04
                            TOT_05
                            TOT_06
                            TOT_07
                            TOT_08
                            TOT_09
                            TOT_10
                            TOT_11
                            TOT_12
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    vendorCd: argData.VENDOR_CD,
                    totAmt: argData.TOT_AMT,
                    tot01: argData.TOT_01,
                    tot02: argData.TOT_02,
                    tot03: argData.TOT_03,
                    tot04: argData.TOT_04,
                    tot05: argData.TOT_05,
                    tot06: argData.TOT_06,
                    tot07: argData.TOT_07,
                    tot08: argData.TOT_08,
                    tot09: argData.TOT_09,
                    tot10: argData.TOT_10,
                    tot11: argData.TOT_11,
                    tot12: argData.TOT_12,
                },
            });
            console.log(
                "KZZ_MATL_AMT INSERT:",
                JSON.stringify(data.createKZZ_MATL_AMT),
            );
            return data.createKZZ_MATL_AMT;
        } catch (e) {
            console.log("KZZ_MATL_AMT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKZZ_MATL_AMT(
                        $updateKzzMatlAmtId: Int!
                        $userId: String
                        $vendorCd: String
                        $totAmt: Float
                        $tot01: Float
                        $tot02: Float
                        $tot03: Float
                        $tot04: Float
                        $tot05: Float
                        $tot06: Float
                        $tot07: Float
                        $tot08: Float
                        $tot09: Float
                        $tot10: Float
                        $tot11: Float
                        $tot12: Float
                    ) {
                        updateKZZ_MATL_AMT(
                            id: $updateKzzMatlAmtId
                            USER_ID: $userId
                            VENDOR_CD: $vendorCd
                            TOT_AMT: $totAmt
                            TOT_01: $tot01
                            TOT_02: $tot02
                            TOT_03: $tot03
                            TOT_04: $tot04
                            TOT_05: $tot05
                            TOT_06: $tot06
                            TOT_07: $tot07
                            TOT_08: $tot08
                            TOT_09: $tot09
                            TOT_10: $tot10
                            TOT_11: $tot11
                            TOT_12: $tot12
                        ) {
                            id
                            USER_ID
                            VENDOR_CD
                            TOT_AMT
                            TOT_01
                            TOT_02
                            TOT_03
                            TOT_04
                            TOT_05
                            TOT_06
                            TOT_07
                            TOT_08
                            TOT_09
                            TOT_10
                            TOT_11
                            TOT_12
                        }
                    }
                `,
                variables: {
                    updateKzzMatlAmtId: argData.id,
                    userId: argData.USER_ID,
                    vendorCd: argData.VENDOR_CD,
                    totAmt: argData.TOT_AMT,
                    tot01: argData.TOT_01,
                    tot02: argData.TOT_02,
                    tot03: argData.TOT_03,
                    tot04: argData.TOT_04,
                    tot05: argData.TOT_05,
                    tot06: argData.TOT_06,
                    tot07: argData.TOT_07,
                    tot08: argData.TOT_08,
                    tot09: argData.TOT_09,
                    tot10: argData.TOT_10,
                    tot11: argData.TOT_11,
                    tot12: argData.TOT_12,
                },
            });
            console.log(
                "KZZ_MATL_AMT UPDATE:",
                JSON.stringify(data.updateKZZ_MATL_AMT),
            );
            return data.updateKZZ_MATL_AMT;
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
                    mutation DeleteKZZ_MATL_AMT($deleteKzzMatlAmtId: Int!) {
                        deleteKZZ_MATL_AMT(id: $deleteKzzMatlAmtId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKzzMatlAmtId: argData.id,
                },
            });
            console.log(
                "KZZ_MATL_AMT DELETE:",
                JSON.stringify(data.deleteKZZ_MATL_AMT),
            );
            return data.deleteKZZ_MATL_AMT;
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
                    mutation MgrKzzMatlAmtDeletes(
                        $ids: [InputMgrKzzMatlAmtDeletes!]!
                    ) {
                        mgrKzzMatlAmtDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KZZ_MATL_AMT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
