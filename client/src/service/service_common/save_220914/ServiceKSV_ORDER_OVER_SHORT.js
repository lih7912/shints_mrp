/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_OVER_SHORT {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_OVER_SHORT {
                        allQueryKSV_ORDER_OVER_SHORT {
                            id
                            ORDER_CD
                            VMD_QTY
                            VMD_SUB_QTY
                            SMD_QTY
                            CONFIRM_FLAG
                            CONFIRM_AMT
                            STS_COMMENT
                            BVT_COMMENT
                            CONFIRM_USER
                            CONFIRM_DATETIME
                            END_FLAG
                            END_DATE
                            SUP_QTY
                            BUYER_QTY
                            STS_QTY
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_OVER_SHORT:",
                JSON.stringify(data.allQueryKSV_ORDER_OVER_SHORT.length),
            );
            return data.allQueryKSV_ORDER_OVER_SHORT;
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
                    query MgrKsvOrderOverShortQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderOverShortQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            ORDER_CD
                            VMD_QTY
                            VMD_SUB_QTY
                            SMD_QTY
                            CONFIRM_FLAG
                            CONFIRM_AMT
                            STS_COMMENT
                            BVT_COMMENT
                            CONFIRM_USER
                            CONFIRM_DATETIME
                            END_FLAG
                            END_DATE
                            SUP_QTY
                            BUYER_QTY
                            STS_QTY
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_OVER_SHORT:",
                JSON.stringify(data.mgrKsvOrderOverShortQuery.length),
            );
            return data.mgrKsvOrderOverShortQuery;
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
                    mutation CreateKSV_ORDER_OVER_SHORT(
                        $orderCd: String
                        $vmdQty: String
                        $vmdSubQty: String
                        $smdQty: String
                        $confirmFlag: String
                        $confirmAmt: String
                        $stsComment: String
                        $bvtComment: String
                        $confirmUser: String
                        $confirmDatetime: String
                        $endFlag: String
                        $endDate: String
                        $supQty: String
                        $buyerQty: String
                        $stsQty: String
                    ) {
                        createKSV_ORDER_OVER_SHORT(
                            ORDER_CD: $orderCd
                            VMD_QTY: $vmdQty
                            VMD_SUB_QTY: $vmdSubQty
                            SMD_QTY: $smdQty
                            CONFIRM_FLAG: $confirmFlag
                            CONFIRM_AMT: $confirmAmt
                            STS_COMMENT: $stsComment
                            BVT_COMMENT: $bvtComment
                            CONFIRM_USER: $confirmUser
                            CONFIRM_DATETIME: $confirmDatetime
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            SUP_QTY: $supQty
                            BUYER_QTY: $buyerQty
                            STS_QTY: $stsQty
                        ) {
                            ORDER_CD
                            VMD_QTY
                            VMD_SUB_QTY
                            SMD_QTY
                            CONFIRM_FLAG
                            CONFIRM_AMT
                            STS_COMMENT
                            BVT_COMMENT
                            CONFIRM_USER
                            CONFIRM_DATETIME
                            END_FLAG
                            END_DATE
                            SUP_QTY
                            BUYER_QTY
                            STS_QTY
                        }
                    }
                `,
                variables: {
                    orderCd: argData.ORDER_CD,
                    vmdQty: argData.VMD_QTY,
                    vmdSubQty: argData.VMD_SUB_QTY,
                    smdQty: argData.SMD_QTY,
                    confirmFlag: argData.CONFIRM_FLAG,
                    confirmAmt: argData.CONFIRM_AMT,
                    stsComment: argData.STS_COMMENT,
                    bvtComment: argData.BVT_COMMENT,
                    confirmUser: argData.CONFIRM_USER,
                    confirmDatetime: argData.CONFIRM_DATETIME,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    supQty: argData.SUP_QTY,
                    buyerQty: argData.BUYER_QTY,
                    stsQty: argData.STS_QTY,
                },
            });
            console.log(
                "KSV_ORDER_OVER_SHORT INSERT:",
                JSON.stringify(data.createKSV_ORDER_OVER_SHORT),
            );
            return data.createKSV_ORDER_OVER_SHORT;
        } catch (e) {
            console.log(
                "KSV_ORDER_OVER_SHORT INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_ORDER_OVER_SHORT(
                        $updateKsvOrderOverShortId: Int!
                        $orderCd: String
                        $vmdQty: String
                        $vmdSubQty: String
                        $smdQty: String
                        $confirmFlag: String
                        $confirmAmt: String
                        $stsComment: String
                        $bvtComment: String
                        $confirmUser: String
                        $confirmDatetime: String
                        $endFlag: String
                        $endDate: String
                        $supQty: String
                        $buyerQty: String
                        $stsQty: String
                    ) {
                        updateKSV_ORDER_OVER_SHORT(
                            id: $updateKsvOrderOverShortId
                            ORDER_CD: $orderCd
                            VMD_QTY: $vmdQty
                            VMD_SUB_QTY: $vmdSubQty
                            SMD_QTY: $smdQty
                            CONFIRM_FLAG: $confirmFlag
                            CONFIRM_AMT: $confirmAmt
                            STS_COMMENT: $stsComment
                            BVT_COMMENT: $bvtComment
                            CONFIRM_USER: $confirmUser
                            CONFIRM_DATETIME: $confirmDatetime
                            END_FLAG: $endFlag
                            END_DATE: $endDate
                            SUP_QTY: $supQty
                            BUYER_QTY: $buyerQty
                            STS_QTY: $stsQty
                        ) {
                            id
                            ORDER_CD
                            VMD_QTY
                            VMD_SUB_QTY
                            SMD_QTY
                            CONFIRM_FLAG
                            CONFIRM_AMT
                            STS_COMMENT
                            BVT_COMMENT
                            CONFIRM_USER
                            CONFIRM_DATETIME
                            END_FLAG
                            END_DATE
                            SUP_QTY
                            BUYER_QTY
                            STS_QTY
                        }
                    }
                `,
                variables: {
                    updateKsvOrderOverShortId: argData.id,
                    orderCd: argData.ORDER_CD,
                    vmdQty: argData.VMD_QTY,
                    vmdSubQty: argData.VMD_SUB_QTY,
                    smdQty: argData.SMD_QTY,
                    confirmFlag: argData.CONFIRM_FLAG,
                    confirmAmt: argData.CONFIRM_AMT,
                    stsComment: argData.STS_COMMENT,
                    bvtComment: argData.BVT_COMMENT,
                    confirmUser: argData.CONFIRM_USER,
                    confirmDatetime: argData.CONFIRM_DATETIME,
                    endFlag: argData.END_FLAG,
                    endDate: argData.END_DATE,
                    supQty: argData.SUP_QTY,
                    buyerQty: argData.BUYER_QTY,
                    stsQty: argData.STS_QTY,
                },
            });
            console.log(
                "KSV_ORDER_OVER_SHORT UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_OVER_SHORT),
            );
            return data.updateKSV_ORDER_OVER_SHORT;
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
                    mutation DeleteKSV_ORDER_OVER_SHORT(
                        $deleteKsvOrderOverShortId: Int!
                    ) {
                        deleteKSV_ORDER_OVER_SHORT(
                            id: $deleteKsvOrderOverShortId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderOverShortId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_OVER_SHORT DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_OVER_SHORT),
            );
            return data.deleteKSV_ORDER_OVER_SHORT;
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
                    mutation MgrKsvOrderOverShortDeletes(
                        $ids: [InputMgrKsvOrderOverShortDeletes!]!
                    ) {
                        mgrKsvOrderOverShortDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_OVER_SHORT DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
