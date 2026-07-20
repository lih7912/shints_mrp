/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_NSR_ORGAMT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_NSR_ORGAMT {
                        allQuerySCD_NSR_ORGAMT {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
                        }
                    }
                `,
            });
            console.log(
                "SCD_NSR_ORGAMT:",
                JSON.stringify(data.allQuerySCD_NSR_ORGAMT.length),
            );
            return data.allQuerySCD_NSR_ORGAMT;
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
                    query MgrScdNsrOrgamtQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdNsrOrgamtQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_NSR_ORGAMT:",
                JSON.stringify(data.mgrScdNsrOrgamtQuery.length),
            );
            return data.mgrScdNsrOrgamtQuery;
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
                    mutation CreateSCD_NSR_ORGAMT(
                        $styleCd: String
                        $styleName: String
                        $buyerCd: String
                    ) {
                        createSCD_NSR_ORGAMT(
                            STYLE_CD: $styleCd
                            STYLE_NAME: $styleName
                            BUYER_CD: $buyerCd
                        ) {
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    styleCd: argData.STYLE_CD,
                    styleName: argData.STYLE_NAME,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "SCD_NSR_ORGAMT INSERT:",
                JSON.stringify(data.createSCD_NSR_ORGAMT),
            );
            return data.createSCD_NSR_ORGAMT;
        } catch (e) {
            console.log("SCD_NSR_ORGAMT INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_NSR_ORGAMT(
                        $updateScdNsrOrgamtId: Int!
                        $styleCd: String
                        $styleName: String
                        $buyerCd: String
                    ) {
                        updateSCD_NSR_ORGAMT(
                            id: $updateScdNsrOrgamtId
                            STYLE_CD: $styleCd
                            STYLE_NAME: $styleName
                            BUYER_CD: $buyerCd
                        ) {
                            id
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    updateScdNsrOrgamtId: argData.id,
                    styleCd: argData.STYLE_CD,
                    styleName: argData.STYLE_NAME,
                    buyerCd: argData.BUYER_CD,
                },
            });
            console.log(
                "SCD_NSR_ORGAMT UPDATE:",
                JSON.stringify(data.updateSCD_NSR_ORGAMT),
            );
            return data.updateSCD_NSR_ORGAMT;
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
                    mutation DeleteSCD_NSR_ORGAMT($deleteScdNsrOrgamtId: Int!) {
                        deleteSCD_NSR_ORGAMT(id: $deleteScdNsrOrgamtId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdNsrOrgamtId: argData.id,
                },
            });
            console.log(
                "SCD_NSR_ORGAMT DELETE:",
                JSON.stringify(data.deleteSCD_NSR_ORGAMT),
            );
            return data.deleteSCD_NSR_ORGAMT;
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
                    mutation MgrScdNsrOrgamtDeletes(
                        $ids: [InputMgrScdNsrOrgamtDeletes!]!
                    ) {
                        mgrScdNsrOrgamtDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_NSR_ORGAMT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
