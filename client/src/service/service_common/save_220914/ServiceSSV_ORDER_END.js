/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSSV_ORDER_END {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySSV_ORDER_END {
                        allQuerySSV_ORDER_END {
                            id
                            ORDER_CD
                            PROD_CD
                            END_DATE
                            SIZE
                            CT_FROM
                            CT_TO
                            SIZE_SEQ
                            END_CNT
                            NAT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NET_WEIGHT
                            GROSS_WEIGHT
                            CBM
                        }
                    }
                `,
            });
            console.log(
                "SSV_ORDER_END:",
                JSON.stringify(data.allQuerySSV_ORDER_END.length),
            );
            return data.allQuerySSV_ORDER_END;
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
                    query MgrSsvOrderEndQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrSsvOrderEndQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            END_DATE
                            SIZE
                            CT_FROM
                            CT_TO
                            SIZE_SEQ
                            END_CNT
                            NAT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NET_WEIGHT
                            GROSS_WEIGHT
                            CBM
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SSV_ORDER_END:",
                JSON.stringify(data.mgrSsvOrderEndQuery.length),
            );
            return data.mgrSsvOrderEndQuery;
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
                    mutation CreateSSV_ORDER_END(
                        $orderCd: String
                        $prodCd: String
                        $endDate: String
                        $size: String
                        $ctFrom: Int
                        $ctTo: Int
                        $sizeSeq: Int
                        $endCnt: Int
                        $natCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $netWeight: Float
                        $grossWeight: Float
                        $cbm: Float
                    ) {
                        createSSV_ORDER_END(
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            END_DATE: $endDate
                            SIZE: $size
                            CT_FROM: $ctFrom
                            CT_TO: $ctTo
                            SIZE_SEQ: $sizeSeq
                            END_CNT: $endCnt
                            NAT_CD: $natCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            NET_WEIGHT: $netWeight
                            GROSS_WEIGHT: $grossWeight
                            CBM: $cbm
                        ) {
                            ORDER_CD
                            PROD_CD
                            END_DATE
                            SIZE
                            CT_FROM
                            CT_TO
                            SIZE_SEQ
                            END_CNT
                            NAT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NET_WEIGHT
                            GROSS_WEIGHT
                            CBM
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    endDate: argData.END_DATE,
                    size: argData.SIZE,
                    ctFrom: argData.CT_FROM,
                    ctTo: argData.CT_TO,
                    sizeSeq: argData.SIZE_SEQ,
                    endCnt: argData.END_CNT,
                    natCd: argData.NAT_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    netWeight: argData.NET_WEIGHT,
                    grossWeight: argData.GROSS_WEIGHT,
                    cbm: argData.CBM,
                },
            });
            console.log(
                "SSV_ORDER_END INSERT:",
                JSON.stringify(data.createSSV_ORDER_END),
            );
            return data.createSSV_ORDER_END;
        } catch (e) {
            console.log("SSV_ORDER_END INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSSV_ORDER_END(
                        $updateSsvOrderEndId: Int!
                        $orderCd: String
                        $prodCd: String
                        $endDate: String
                        $size: String
                        $ctFrom: Int
                        $ctTo: Int
                        $sizeSeq: Int
                        $endCnt: Int
                        $natCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $netWeight: Float
                        $grossWeight: Float
                        $cbm: Float
                    ) {
                        updateSSV_ORDER_END(
                            id: $updateSsvOrderEndId
                            ORDER_CD: $orderCd
                            PROD_CD: $prodCd
                            END_DATE: $endDate
                            SIZE: $size
                            CT_FROM: $ctFrom
                            CT_TO: $ctTo
                            SIZE_SEQ: $sizeSeq
                            END_CNT: $endCnt
                            NAT_CD: $natCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            NET_WEIGHT: $netWeight
                            GROSS_WEIGHT: $grossWeight
                            CBM: $cbm
                        ) {
                            id
                            ORDER_CD
                            PROD_CD
                            END_DATE
                            SIZE
                            CT_FROM
                            CT_TO
                            SIZE_SEQ
                            END_CNT
                            NAT_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NET_WEIGHT
                            GROSS_WEIGHT
                            CBM
                        }
                    }
                `,
                variables: {
                    updateSsvOrderEndId: argData.id,
                    orderCd: argData.ORDER_CD,
                    prodCd: argData.PROD_CD,
                    endDate: argData.END_DATE,
                    size: argData.SIZE,
                    ctFrom: argData.CT_FROM,
                    ctTo: argData.CT_TO,
                    sizeSeq: argData.SIZE_SEQ,
                    endCnt: argData.END_CNT,
                    natCd: argData.NAT_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    netWeight: argData.NET_WEIGHT,
                    grossWeight: argData.GROSS_WEIGHT,
                    cbm: argData.CBM,
                },
            });
            console.log(
                "SSV_ORDER_END UPDATE:",
                JSON.stringify(data.updateSSV_ORDER_END),
            );
            return data.updateSSV_ORDER_END;
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
                    mutation DeleteSSV_ORDER_END($deleteSsvOrderEndId: Int!) {
                        deleteSSV_ORDER_END(id: $deleteSsvOrderEndId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteSsvOrderEndId: argData.id,
                },
            });
            console.log(
                "SSV_ORDER_END DELETE:",
                JSON.stringify(data.deleteSSV_ORDER_END),
            );
            return data.deleteSSV_ORDER_END;
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
                    mutation MgrSsvOrderEndDeletes(
                        $ids: [InputMgrSsvOrderEndDeletes!]!
                    ) {
                        mgrSsvOrderEndDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SSV_ORDER_END DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
