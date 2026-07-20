/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_MID_SIZE_TEMP {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_MID_SIZE_TEMP {
                        allQueryKSV_ORDER_MID_SIZE_TEMP {
                            id
                            USER_ID
                            PROD_CD
                            SIZE_VAL
                            SIZE_QTY
                            SIZE_SEQ
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP:",
                JSON.stringify(data.allQueryKSV_ORDER_MID_SIZE_TEMP.length),
            );
            return data.allQueryKSV_ORDER_MID_SIZE_TEMP;
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
                    query MgrKsvOrderMidSizeTempQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderMidSizeTempQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            PROD_CD
                            SIZE_VAL
                            SIZE_QTY
                            SIZE_SEQ
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP:",
                JSON.stringify(data.mgrKsvOrderMidSizeTempQuery.length),
            );
            return data.mgrKsvOrderMidSizeTempQuery;
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
                    mutation CreateKSV_ORDER_MID_SIZE_TEMP(
                        $userId: String
                        $prodCd: String
                        $sizeVal: String
                        $sizeQty: Int
                        $sizeSeq: Int
                    ) {
                        createKSV_ORDER_MID_SIZE_TEMP(
                            USER_ID: $userId
                            PROD_CD: $prodCd
                            SIZE_VAL: $sizeVal
                            SIZE_QTY: $sizeQty
                            SIZE_SEQ: $sizeSeq
                        ) {
                            USER_ID
                            PROD_CD
                            SIZE_VAL
                            SIZE_QTY
                            SIZE_SEQ
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    prodCd: argData.PROD_CD,
                    sizeVal: argData.SIZE_VAL,
                    sizeQty: argData.SIZE_QTY,
                    sizeSeq: argData.SIZE_SEQ,
                },
            });
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP INSERT:",
                JSON.stringify(data.createKSV_ORDER_MID_SIZE_TEMP),
            );
            return data.createKSV_ORDER_MID_SIZE_TEMP;
        } catch (e) {
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_ORDER_MID_SIZE_TEMP(
                        $updateKsvOrderMidSizeTempId: Int!
                        $userId: String
                        $prodCd: String
                        $sizeVal: String
                        $sizeQty: Int
                        $sizeSeq: Int
                    ) {
                        updateKSV_ORDER_MID_SIZE_TEMP(
                            id: $updateKsvOrderMidSizeTempId
                            USER_ID: $userId
                            PROD_CD: $prodCd
                            SIZE_VAL: $sizeVal
                            SIZE_QTY: $sizeQty
                            SIZE_SEQ: $sizeSeq
                        ) {
                            id
                            USER_ID
                            PROD_CD
                            SIZE_VAL
                            SIZE_QTY
                            SIZE_SEQ
                        }
                    }
                `,
                variables: {
                    updateKsvOrderMidSizeTempId: argData.id,
                    userId: argData.USER_ID,
                    prodCd: argData.PROD_CD,
                    sizeVal: argData.SIZE_VAL,
                    sizeQty: argData.SIZE_QTY,
                    sizeSeq: argData.SIZE_SEQ,
                },
            });
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_MID_SIZE_TEMP),
            );
            return data.updateKSV_ORDER_MID_SIZE_TEMP;
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
                    mutation DeleteKSV_ORDER_MID_SIZE_TEMP(
                        $deleteKsvOrderMidSizeTempId: Int!
                    ) {
                        deleteKSV_ORDER_MID_SIZE_TEMP(
                            id: $deleteKsvOrderMidSizeTempId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderMidSizeTempId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_MID_SIZE_TEMP),
            );
            return data.deleteKSV_ORDER_MID_SIZE_TEMP;
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
                    mutation MgrKsvOrderMidSizeTempDeletes(
                        $ids: [InputMgrKsvOrderMidSizeTempDeletes!]!
                    ) {
                        mgrKsvOrderMidSizeTempDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_ORDER_MID_SIZE_TEMP DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
