/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_TEMP21 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_TEMP21 {
                        allQueryKSV_ORDER_TEMP21 {
                            id
                            USER_ID
                            HEADER01
                            HEADER02
                            HEADER03
                            HEADER04
                            HEADER05
                            HEADER06
                            HEADER07
                            HEADER08
                            HEADER09
                            HEADER10
                            HEADER11
                            HEADER12
                            HEADER13
                            HEADER14
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_TEMP21:",
                JSON.stringify(data.allQueryKSV_ORDER_TEMP21.length),
            );
            return data.allQueryKSV_ORDER_TEMP21;
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
                    query MgrKsvOrderTemp21Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderTemp21Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            HEADER01
                            HEADER02
                            HEADER03
                            HEADER04
                            HEADER05
                            HEADER06
                            HEADER07
                            HEADER08
                            HEADER09
                            HEADER10
                            HEADER11
                            HEADER12
                            HEADER13
                            HEADER14
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_TEMP21:",
                JSON.stringify(data.mgrKsvOrderTemp21Query.length),
            );
            return data.mgrKsvOrderTemp21Query;
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
                    mutation CreateKSV_ORDER_TEMP21(
                        $userId: String
                        $header01: String
                        $header02: String
                        $header03: String
                        $header04: String
                        $header05: String
                        $header06: String
                        $header07: String
                        $header08: String
                        $header09: String
                        $header10: String
                        $header11: String
                        $header12: String
                        $header13: String
                        $header14: String
                    ) {
                        createKSV_ORDER_TEMP21(
                            USER_ID: $userId
                            HEADER01: $header01
                            HEADER02: $header02
                            HEADER03: $header03
                            HEADER04: $header04
                            HEADER05: $header05
                            HEADER06: $header06
                            HEADER07: $header07
                            HEADER08: $header08
                            HEADER09: $header09
                            HEADER10: $header10
                            HEADER11: $header11
                            HEADER12: $header12
                            HEADER13: $header13
                            HEADER14: $header14
                        ) {
                            USER_ID
                            HEADER01
                            HEADER02
                            HEADER03
                            HEADER04
                            HEADER05
                            HEADER06
                            HEADER07
                            HEADER08
                            HEADER09
                            HEADER10
                            HEADER11
                            HEADER12
                            HEADER13
                            HEADER14
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    header01: argData.HEADER01,
                    header02: argData.HEADER02,
                    header03: argData.HEADER03,
                    header04: argData.HEADER04,
                    header05: argData.HEADER05,
                    header06: argData.HEADER06,
                    header07: argData.HEADER07,
                    header08: argData.HEADER08,
                    header09: argData.HEADER09,
                    header10: argData.HEADER10,
                    header11: argData.HEADER11,
                    header12: argData.HEADER12,
                    header13: argData.HEADER13,
                    header14: argData.HEADER14,
                },
            });
            console.log(
                "KSV_ORDER_TEMP21 INSERT:",
                JSON.stringify(data.createKSV_ORDER_TEMP21),
            );
            return data.createKSV_ORDER_TEMP21;
        } catch (e) {
            console.log("KSV_ORDER_TEMP21 INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_TEMP21(
                        $updateKsvOrderTemp21Id: Int!
                        $userId: String
                        $header01: String
                        $header02: String
                        $header03: String
                        $header04: String
                        $header05: String
                        $header06: String
                        $header07: String
                        $header08: String
                        $header09: String
                        $header10: String
                        $header11: String
                        $header12: String
                        $header13: String
                        $header14: String
                    ) {
                        updateKSV_ORDER_TEMP21(
                            id: $updateKsvOrderTemp21Id
                            USER_ID: $userId
                            HEADER01: $header01
                            HEADER02: $header02
                            HEADER03: $header03
                            HEADER04: $header04
                            HEADER05: $header05
                            HEADER06: $header06
                            HEADER07: $header07
                            HEADER08: $header08
                            HEADER09: $header09
                            HEADER10: $header10
                            HEADER11: $header11
                            HEADER12: $header12
                            HEADER13: $header13
                            HEADER14: $header14
                        ) {
                            id
                            USER_ID
                            HEADER01
                            HEADER02
                            HEADER03
                            HEADER04
                            HEADER05
                            HEADER06
                            HEADER07
                            HEADER08
                            HEADER09
                            HEADER10
                            HEADER11
                            HEADER12
                            HEADER13
                            HEADER14
                        }
                    }
                `,
                variables: {
                    updateKsvOrderTemp21Id: argData.id,
                    userId: argData.USER_ID,
                    header01: argData.HEADER01,
                    header02: argData.HEADER02,
                    header03: argData.HEADER03,
                    header04: argData.HEADER04,
                    header05: argData.HEADER05,
                    header06: argData.HEADER06,
                    header07: argData.HEADER07,
                    header08: argData.HEADER08,
                    header09: argData.HEADER09,
                    header10: argData.HEADER10,
                    header11: argData.HEADER11,
                    header12: argData.HEADER12,
                    header13: argData.HEADER13,
                    header14: argData.HEADER14,
                },
            });
            console.log(
                "KSV_ORDER_TEMP21 UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_TEMP21),
            );
            return data.updateKSV_ORDER_TEMP21;
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
                    mutation DeleteKSV_ORDER_TEMP21(
                        $deleteKsvOrderTemp21Id: Int!
                    ) {
                        deleteKSV_ORDER_TEMP21(id: $deleteKsvOrderTemp21Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderTemp21Id: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_TEMP21 DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_TEMP21),
            );
            return data.deleteKSV_ORDER_TEMP21;
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
                    mutation MgrKsvOrderTemp21Deletes(
                        $ids: [InputMgrKsvOrderTemp21Deletes!]!
                    ) {
                        mgrKsvOrderTemp21Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_TEMP21 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
