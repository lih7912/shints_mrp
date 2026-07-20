/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PU_GETSEQ {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PU_GETSEQ {
                        allQueryKSV_PU_GETSEQ {
                            id
                            PU
                            YY
                            SEQ
                        }
                    }
                `,
            });
            console.log(
                "KSV_PU_GETSEQ:",
                JSON.stringify(data.allQueryKSV_PU_GETSEQ.length),
            );
            return data.allQueryKSV_PU_GETSEQ;
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
                    query MgrKsvPuGetseqQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPuGetseqQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PU
                            YY
                            SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PU_GETSEQ:",
                JSON.stringify(data.mgrKsvPuGetseqQuery.length),
            );
            return data.mgrKsvPuGetseqQuery;
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
                    mutation CreateKSV_PU_GETSEQ(
                        $pu: String
                        $yy: Int
                        $seq: Int
                    ) {
                        createKSV_PU_GETSEQ(PU: $pu, YY: $yy, SEQ: $seq) {
                            PU
                            YY
                            SEQ
                        }
                    }
                `,
                variables: {
                    pu: argData.PU,
                    yy: argData.YY,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KSV_PU_GETSEQ INSERT:",
                JSON.stringify(data.createKSV_PU_GETSEQ),
            );
            return data.createKSV_PU_GETSEQ;
        } catch (e) {
            console.log("KSV_PU_GETSEQ INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PU_GETSEQ(
                        $updateKsvPuGetseqId: Int!
                        $pu: String
                        $yy: Int
                        $seq: Int
                    ) {
                        updateKSV_PU_GETSEQ(
                            id: $updateKsvPuGetseqId
                            PU: $pu
                            YY: $yy
                            SEQ: $seq
                        ) {
                            id
                            PU
                            YY
                            SEQ
                        }
                    }
                `,
                variables: {
                    updateKsvPuGetseqId: argData.id,
                    pu: argData.PU,
                    yy: argData.YY,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KSV_PU_GETSEQ UPDATE:",
                JSON.stringify(data.updateKSV_PU_GETSEQ),
            );
            return data.updateKSV_PU_GETSEQ;
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
                    mutation DeleteKSV_PU_GETSEQ($deleteKsvPuGetseqId: Int!) {
                        deleteKSV_PU_GETSEQ(id: $deleteKsvPuGetseqId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPuGetseqId: argData.id,
                },
            });
            console.log(
                "KSV_PU_GETSEQ DELETE:",
                JSON.stringify(data.deleteKSV_PU_GETSEQ),
            );
            return data.deleteKSV_PU_GETSEQ;
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
                    mutation MgrKsvPuGetseqDeletes(
                        $ids: [InputMgrKsvPuGetseqDeletes!]!
                    ) {
                        mgrKsvPuGetseqDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PU_GETSEQ DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
