/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PU_POOL {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PU_POOL {
                        allQueryKSV_PU_POOL {
                            id
                            PO_CD
                            PO_SEQ
                            IN_DATE
                            PU_CD
                            BUYER_CD
                            VENDOR_CD
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PU_POOL:",
                JSON.stringify(data.allQueryKSV_PU_POOL.length),
            );
            return data.allQueryKSV_PU_POOL;
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
                    query MgrKsvPuPoolQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPuPoolQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            IN_DATE
                            PU_CD
                            BUYER_CD
                            VENDOR_CD
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PU_POOL:",
                JSON.stringify(data.mgrKsvPuPoolQuery.length),
            );
            return data.mgrKsvPuPoolQuery;
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
                    mutation CreateKSV_PU_POOL(
                        $poCd: String
                        $poSeq: Int
                        $inDate: String
                        $puCd: String
                        $buyerCd: String
                        $vendorCd: String
                        $factoryCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_PU_POOL(
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            IN_DATE: $inDate
                            PU_CD: $puCd
                            BUYER_CD: $buyerCd
                            VENDOR_CD: $vendorCd
                            FACTORY_CD: $factoryCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PO_CD
                            PO_SEQ
                            IN_DATE
                            PU_CD
                            BUYER_CD
                            VENDOR_CD
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    inDate: argData.IN_DATE,
                    puCd: argData.PU_CD,
                    buyerCd: argData.BUYER_CD,
                    vendorCd: argData.VENDOR_CD,
                    factoryCd: argData.FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PU_POOL INSERT:",
                JSON.stringify(data.createKSV_PU_POOL),
            );
            return data.createKSV_PU_POOL;
        } catch (e) {
            console.log("KSV_PU_POOL INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PU_POOL(
                        $updateKsvPuPoolId: Int!
                        $poCd: String
                        $poSeq: Int
                        $inDate: String
                        $puCd: String
                        $buyerCd: String
                        $vendorCd: String
                        $factoryCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_PU_POOL(
                            id: $updateKsvPuPoolId
                            PO_CD: $poCd
                            PO_SEQ: $poSeq
                            IN_DATE: $inDate
                            PU_CD: $puCd
                            BUYER_CD: $buyerCd
                            VENDOR_CD: $vendorCd
                            FACTORY_CD: $factoryCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PO_CD
                            PO_SEQ
                            IN_DATE
                            PU_CD
                            BUYER_CD
                            VENDOR_CD
                            FACTORY_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPuPoolId: argData.id,
                    poCd: argData.PO_CD,
                    poSeq: argData.PO_SEQ,
                    inDate: argData.IN_DATE,
                    puCd: argData.PU_CD,
                    buyerCd: argData.BUYER_CD,
                    vendorCd: argData.VENDOR_CD,
                    factoryCd: argData.FACTORY_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PU_POOL UPDATE:",
                JSON.stringify(data.updateKSV_PU_POOL),
            );
            return data.updateKSV_PU_POOL;
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
                    mutation DeleteKSV_PU_POOL($deleteKsvPuPoolId: Int!) {
                        deleteKSV_PU_POOL(id: $deleteKsvPuPoolId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPuPoolId: argData.id,
                },
            });
            console.log(
                "KSV_PU_POOL DELETE:",
                JSON.stringify(data.deleteKSV_PU_POOL),
            );
            return data.deleteKSV_PU_POOL;
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
                    mutation MgrKsvPuPoolDeletes(
                        $ids: [InputMgrKsvPuPoolDeletes!]!
                    ) {
                        mgrKsvPuPoolDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PU_POOL DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
