/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PO_REASON {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PO_REASON {
                        allQueryKSV_PO_REASON {
                            id
                            PO_CD
                            PO_SEQ
                            BUYER
                            SALES
                            MATL
                            CAD
                            MRP
                            MRP2
                            ETC
                            SEQ_COMMENT
                            SEQ_REASON
                            APPROVAL
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PO_REASON:",
                JSON.stringify(data.allQueryKSV_PO_REASON.length),
            );
            return data.allQueryKSV_PO_REASON;
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
                    query MgrKsvPoReasonQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPoReasonQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            BUYER
                            SALES
                            MATL
                            CAD
                            MRP
                            MRP2
                            ETC
                            SEQ_COMMENT
                            SEQ_REASON
                            APPROVAL
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PO_REASON:",
                JSON.stringify(data.mgrKsvPoReasonQuery.length),
            );
            return data.mgrKsvPoReasonQuery;
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
                    mutation CreateKSV_PO_REASON(
                        $poCd: String
                        $poSeq: Int
                        $buyer: String
                        $sales: String
                        $matl: String
                        $cad: String
                        $mrp: String
                        $mrp2: String
                        $etc: String
                        $seqComment: String
                        $seqReason: String
                        $approval: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_PO_REASON(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            BUYER: $buyer
                            SALES: $sales
                            MATL: $matl
                            CAD: $cad
                            MRP: $mrp
                            MRP2: $mrp2
                            ETC: $etc
                            SEQ_COMMENT: $seqComment
                            SEQ_REASON: $seqReason
                            APPROVAL: $approval
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            PO_SEQ
                            BUYER
                            SALES
                            MATL
                            CAD
                            MRP
                            MRP2
                            ETC
                            SEQ_COMMENT
                            SEQ_REASON
                            APPROVAL
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    buyer: argData.BUYER,
                    sales: argData.SALES,
                    matl: argData.MATL,
                    cad: argData.CAD,
                    mrp: argData.MRP,
                    mrp2: argData.MRP2,
                    etc: argData.ETC,
                    seqComment: argData.SEQ_COMMENT,
                    seqReason: argData.SEQ_REASON,
                    approval: argData.APPROVAL,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PO_REASON INSERT:",
                JSON.stringify(data.createKSV_PO_REASON),
            );
            return data.createKSV_PO_REASON;
        } catch (e) {
            console.log("KSV_PO_REASON INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PO_REASON(
                        $updateKsvPoReasonId: Int!
                        $poCd: String
                        $poSeq: Int
                        $buyer: String
                        $sales: String
                        $matl: String
                        $cad: String
                        $mrp: String
                        $mrp2: String
                        $etc: String
                        $seqComment: String
                        $seqReason: String
                        $approval: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_PO_REASON(
                            id: $updateKsvPoReasonId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            BUYER: $buyer
                            SALES: $sales
                            MATL: $matl
                            CAD: $cad
                            MRP: $mrp
                            MRP2: $mrp2
                            ETC: $etc
                            SEQ_COMMENT: $seqComment
                            SEQ_REASON: $seqReason
                            APPROVAL: $approval
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            BUYER
                            SALES
                            MATL
                            CAD
                            MRP
                            MRP2
                            ETC
                            SEQ_COMMENT
                            SEQ_REASON
                            APPROVAL
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPoReasonId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    buyer: argData.BUYER,
                    sales: argData.SALES,
                    matl: argData.MATL,
                    cad: argData.CAD,
                    mrp: argData.MRP,
                    mrp2: argData.MRP2,
                    etc: argData.ETC,
                    seqComment: argData.SEQ_COMMENT,
                    seqReason: argData.SEQ_REASON,
                    approval: argData.APPROVAL,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PO_REASON UPDATE:",
                JSON.stringify(data.updateKSV_PO_REASON),
            );
            return data.updateKSV_PO_REASON;
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
                    mutation DeleteKSV_PO_REASON($deleteKsvPoReasonId: Int!) {
                        deleteKSV_PO_REASON(id: $deleteKsvPoReasonId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPoReasonId: argData.id,
                },
            });
            console.log(
                "KSV_PO_REASON DELETE:",
                JSON.stringify(data.deleteKSV_PO_REASON),
            );
            return data.deleteKSV_PO_REASON;
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
                    mutation MgrKsvPoReasonDeletes(
                        $ids: [InputMgrKsvPoReasonDeletes!]!
                    ) {
                        mgrKsvPoReasonDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PO_REASON DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
