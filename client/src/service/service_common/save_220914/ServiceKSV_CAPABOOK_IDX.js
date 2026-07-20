/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_CAPABOOK_IDX {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_CAPABOOK_IDX {
                        allQueryKSV_CAPABOOK_IDX {
                            id
                            fac
                            idx
                        }
                    }
                `,
            });
            console.log(
                "KSV_CAPABOOK_IDX:",
                JSON.stringify(data.allQueryKSV_CAPABOOK_IDX.length),
            );
            return data.allQueryKSV_CAPABOOK_IDX;
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
                    query MgrKsvCapabookIdxQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvCapabookIdxQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            fac
                            idx
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_CAPABOOK_IDX:",
                JSON.stringify(data.mgrKsvCapabookIdxQuery.length),
            );
            return data.mgrKsvCapabookIdxQuery;
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
                    mutation CreateKSV_CAPABOOK_IDX($fac: String, $idx: Int) {
                        createKSV_CAPABOOK_IDX(fac: $fac, idx: $idx) {
                            fac
                            idx
                        }
                    }
                `,
                variables: {
                    fac: argData.fac,
                    idx: argData.idx,
                },
            });
            console.log(
                "KSV_CAPABOOK_IDX INSERT:",
                JSON.stringify(data.createKSV_CAPABOOK_IDX),
            );
            return data.createKSV_CAPABOOK_IDX;
        } catch (e) {
            console.log("KSV_CAPABOOK_IDX INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_CAPABOOK_IDX(
                        $updateKsvCapabookIdxId: Int!
                        $fac: String
                        $idx: Int
                    ) {
                        updateKSV_CAPABOOK_IDX(
                            id: $updateKsvCapabookIdxId
                            fac: $fac
                            idx: $idx
                        ) {
                            id
                            fac
                            idx
                        }
                    }
                `,
                variables: {
                    updateKsvCapabookIdxId: argData.id,
                    fac: argData.fac,
                    idx: argData.idx,
                },
            });
            console.log(
                "KSV_CAPABOOK_IDX UPDATE:",
                JSON.stringify(data.updateKSV_CAPABOOK_IDX),
            );
            return data.updateKSV_CAPABOOK_IDX;
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
                    mutation DeleteKSV_CAPABOOK_IDX(
                        $deleteKsvCapabookIdxId: Int!
                    ) {
                        deleteKSV_CAPABOOK_IDX(id: $deleteKsvCapabookIdxId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvCapabookIdxId: argData.id,
                },
            });
            console.log(
                "KSV_CAPABOOK_IDX DELETE:",
                JSON.stringify(data.deleteKSV_CAPABOOK_IDX),
            );
            return data.deleteKSV_CAPABOOK_IDX;
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
                    mutation MgrKsvCapabookIdxDeletes(
                        $ids: [InputMgrKsvCapabookIdxDeletes!]!
                    ) {
                        mgrKsvCapabookIdxDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_CAPABOOK_IDX DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
