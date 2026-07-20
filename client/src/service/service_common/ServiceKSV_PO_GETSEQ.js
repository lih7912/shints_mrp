/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceKSV_PO_GETSEQ {
    async getDatas() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_GETSEQ {
                        allQueryKSV_PO_GETSEQ {
                            id
                            PO
                            YY
                            SEQ
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_GETSEQ:",
                JSON.stringify(data.allQueryKSV_PO_GETSEQ.length),
            );
            return data.allQueryKSV_PO_GETSEQ;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvPoGetseqQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoGetseqQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO
                            YY
                            SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_GETSEQ:",
                JSON.stringify(data.mgrKsvPoGetseqQuery.length),
            );
            return data.mgrKsvPoGetseqQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_PO_GETSEQ(
                        $po: String
                        $yy: Int
                        $seq: Int
                    ) {
                        createKSV_PO_GETSEQ(PO: $po, YY: $yy, SEQ: $seq) {
                            PO
                            YY
                            SEQ
                        }
                    }
                `,
                variables: {
                    po: argData.PO,
                    yy: argData.YY,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KSV_PO_GETSEQ INSERT:",
                JSON.stringify(data.createKSV_PO_GETSEQ),
            );
            return data.createKSV_PO_GETSEQ;
        } catch (e) {
            console.log("KSV_PO_GETSEQ INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PO_GETSEQ(
                        $updateKsvPoGetseqId: Int!
                        $po: String
                        $yy: Int
                        $seq: Int
                    ) {
                        updateKSV_PO_GETSEQ(
                            id: $updateKsvPoGetseqId
                            PO: $po
                            YY: $yy
                            SEQ: $seq
                        ) {
                            id
                            PO
                            YY
                            SEQ
                        }
                    }
                `,
                variables: {
                    updateKsvPoGetseqId: argData.id,
                    po: argData.PO,
                    yy: argData.YY,
                    seq: argData.SEQ,
                },
            });
            console.log(
                "KSV_PO_GETSEQ UPDATE:",
                JSON.stringify(data.updateKSV_PO_GETSEQ),
            );
            return data.updateKSV_PO_GETSEQ;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_PO_GETSEQ($deleteKsvPoGetseqId: Int!) {
                        deleteKSV_PO_GETSEQ(id: $deleteKsvPoGetseqId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoGetseqId: argData.id,
                },
            });
            console.log(
                "KSV_PO_GETSEQ DELETE:",
                JSON.stringify(data.deleteKSV_PO_GETSEQ),
            );
            return data.deleteKSV_PO_GETSEQ;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

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
                    mutation MgrKsvPoGetseqDeletes(
                        $ids: [InputMgrKsvPoGetseqDeletes!]!
                    ) {
                        mgrKsvPoGetseqDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_GETSEQ DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
