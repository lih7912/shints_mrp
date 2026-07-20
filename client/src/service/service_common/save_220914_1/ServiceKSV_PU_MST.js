/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PU_MST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PU_MST {
                        allQueryKSV_PU_MST {
                            id
                            PU_CD
                            VENDOR_CD
                            BUYER_CD
                            FACTORY_CD
                            PU_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PU_MST:",
                JSON.stringify(data.allQueryKSV_PU_MST.length),
            );
            return data.allQueryKSV_PU_MST;
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
                    query MgrKsvPuMstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPuMstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PU_CD
                            VENDOR_CD
                            BUYER_CD
                            FACTORY_CD
                            PU_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PU_MST:",
                JSON.stringify(data.mgrKsvPuMstQuery.length),
            );
            return data.mgrKsvPuMstQuery;
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
                    mutation CreateKSV_PU_MST(
                        $puCd: String
                        $vendorCd: String
                        $buyerCd: String
                        $factoryCd: String
                        $puDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_PU_MST(
                            PU_CD: $puCd
                            VENDOR_CD: $vendorCd
                            BUYER_CD: $buyerCd
                            FACTORY_CD: $factoryCd
                            PU_DATE: $puDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PU_CD
                            VENDOR_CD
                            BUYER_CD
                            FACTORY_CD
                            PU_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    puCd: argData.PU_CD,
                    vendorCd: argData.VENDOR_CD,
                    buyerCd: argData.BUYER_CD,
                    factoryCd: argData.FACTORY_CD,
                    puDate: argData.PU_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PU_MST INSERT:",
                JSON.stringify(data.createKSV_PU_MST),
            );
            return data.createKSV_PU_MST;
        } catch (e) {
            console.log("KSV_PU_MST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PU_MST(
                        $updateKsvPuMstId: Int!
                        $puCd: String
                        $vendorCd: String
                        $buyerCd: String
                        $factoryCd: String
                        $puDate: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_PU_MST(
                            id: $updateKsvPuMstId
                            PU_CD: $puCd
                            VENDOR_CD: $vendorCd
                            BUYER_CD: $buyerCd
                            FACTORY_CD: $factoryCd
                            PU_DATE: $puDate
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PU_CD
                            VENDOR_CD
                            BUYER_CD
                            FACTORY_CD
                            PU_DATE
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPuMstId: argData.id,
                    puCd: argData.PU_CD,
                    vendorCd: argData.VENDOR_CD,
                    buyerCd: argData.BUYER_CD,
                    factoryCd: argData.FACTORY_CD,
                    puDate: argData.PU_DATE,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PU_MST UPDATE:",
                JSON.stringify(data.updateKSV_PU_MST),
            );
            return data.updateKSV_PU_MST;
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
                    mutation DeleteKSV_PU_MST($deleteKsvPuMstId: Int!) {
                        deleteKSV_PU_MST(id: $deleteKsvPuMstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPuMstId: argData.id,
                },
            });
            console.log(
                "KSV_PU_MST DELETE:",
                JSON.stringify(data.deleteKSV_PU_MST),
            );
            return data.deleteKSV_PU_MST;
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
                    mutation MgrKsvPuMstDeletes(
                        $ids: [InputMgrKsvPuMstDeletes!]!
                    ) {
                        mgrKsvPuMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PU_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
