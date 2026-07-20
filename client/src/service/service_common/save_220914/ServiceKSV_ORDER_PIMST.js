/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_PIMST {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_PIMST {
                        allQueryKSV_ORDER_PIMST {
                            id
                            PI_CD
                            MESSERS
                            ADDR1
                            ADDR2
                            CONSIGNEE
                            CADDR1
                            CADDR2
                            PRICE_TERM
                            DESTINATION
                            PORT
                            BANK_CD
                            PAY_TYPE_CD
                            BVT_FLAG
                            PI_REMARK1
                            PI_REMARK2
                            PI_REMARK3
                            PI_REMARK4
                            PI_REMARK5
                            PI_REMARK6
                            PI_REMARK7
                            PI_REMARK8
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            PAY_RULE
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_PIMST:",
                JSON.stringify(data.allQueryKSV_ORDER_PIMST.length),
            );
            return data.allQueryKSV_ORDER_PIMST;
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
                    query MgrKsvOrderPimstQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderPimstQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PI_CD
                            MESSERS
                            ADDR1
                            ADDR2
                            CONSIGNEE
                            CADDR1
                            CADDR2
                            PRICE_TERM
                            DESTINATION
                            PORT
                            BANK_CD
                            PAY_TYPE_CD
                            BVT_FLAG
                            PI_REMARK1
                            PI_REMARK2
                            PI_REMARK3
                            PI_REMARK4
                            PI_REMARK5
                            PI_REMARK6
                            PI_REMARK7
                            PI_REMARK8
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            PAY_RULE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_PIMST:",
                JSON.stringify(data.mgrKsvOrderPimstQuery.length),
            );
            return data.mgrKsvOrderPimstQuery;
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
                    mutation CreateKSV_ORDER_PIMST(
                        $piCd: String
                        $messers: String
                        $addr1: String
                        $addr2: String
                        $consignee: String
                        $caddr1: String
                        $caddr2: String
                        $priceTerm: String
                        $destination: String
                        $port: String
                        $bankCd: String
                        $payTypeCd: String
                        $bvtFlag: String
                        $piRemark1: String
                        $piRemark2: String
                        $piRemark3: String
                        $piRemark4: String
                        $piRemark5: String
                        $piRemark6: String
                        $piRemark7: String
                        $piRemark8: String
                        $yy: Int
                        $seq: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $payRule: Int
                    ) {
                        createKSV_ORDER_PIMST(
                            PI_CD: $piCd
                            MESSERS: $messers
                            ADDR1: $addr1
                            ADDR2: $addr2
                            CONSIGNEE: $consignee
                            CADDR1: $caddr1
                            CADDR2: $caddr2
                            PRICE_TERM: $priceTerm
                            DESTINATION: $destination
                            PORT: $port
                            BANK_CD: $bankCd
                            PAY_TYPE_CD: $payTypeCd
                            BVT_FLAG: $bvtFlag
                            PI_REMARK1: $piRemark1
                            PI_REMARK2: $piRemark2
                            PI_REMARK3: $piRemark3
                            PI_REMARK4: $piRemark4
                            PI_REMARK5: $piRemark5
                            PI_REMARK6: $piRemark6
                            PI_REMARK7: $piRemark7
                            PI_REMARK8: $piRemark8
                            YY: $yy
                            SEQ: $seq
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            PAY_RULE: $payRule
                        ) {
                            PI_CD
                            MESSERS
                            ADDR1
                            ADDR2
                            CONSIGNEE
                            CADDR1
                            CADDR2
                            PRICE_TERM
                            DESTINATION
                            PORT
                            BANK_CD
                            PAY_TYPE_CD
                            BVT_FLAG
                            PI_REMARK1
                            PI_REMARK2
                            PI_REMARK3
                            PI_REMARK4
                            PI_REMARK5
                            PI_REMARK6
                            PI_REMARK7
                            PI_REMARK8
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            PAY_RULE
                        }
                    }
                `,
                variables: {
                    piCd: argData.PI_CD,
                    messers: argData.MESSERS,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    consignee: argData.CONSIGNEE,
                    caddr1: argData.CADDR1,
                    caddr2: argData.CADDR2,
                    priceTerm: argData.PRICE_TERM,
                    destination: argData.DESTINATION,
                    port: argData.PORT,
                    bankCd: argData.BANK_CD,
                    payTypeCd: argData.PAY_TYPE_CD,
                    bvtFlag: argData.BVT_FLAG,
                    piRemark1: argData.PI_REMARK1,
                    piRemark2: argData.PI_REMARK2,
                    piRemark3: argData.PI_REMARK3,
                    piRemark4: argData.PI_REMARK4,
                    piRemark5: argData.PI_REMARK5,
                    piRemark6: argData.PI_REMARK6,
                    piRemark7: argData.PI_REMARK7,
                    piRemark8: argData.PI_REMARK8,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    payRule: argData.PAY_RULE,
                },
            });
            console.log(
                "KSV_ORDER_PIMST INSERT:",
                JSON.stringify(data.createKSV_ORDER_PIMST),
            );
            return data.createKSV_ORDER_PIMST;
        } catch (e) {
            console.log("KSV_ORDER_PIMST INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_PIMST(
                        $updateKsvOrderPimstId: Int!
                        $piCd: String
                        $messers: String
                        $addr1: String
                        $addr2: String
                        $consignee: String
                        $caddr1: String
                        $caddr2: String
                        $priceTerm: String
                        $destination: String
                        $port: String
                        $bankCd: String
                        $payTypeCd: String
                        $bvtFlag: String
                        $piRemark1: String
                        $piRemark2: String
                        $piRemark3: String
                        $piRemark4: String
                        $piRemark5: String
                        $piRemark6: String
                        $piRemark7: String
                        $piRemark8: String
                        $yy: Int
                        $seq: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $payRule: Int
                    ) {
                        updateKSV_ORDER_PIMST(
                            id: $updateKsvOrderPimstId
                            PI_CD: $piCd
                            MESSERS: $messers
                            ADDR1: $addr1
                            ADDR2: $addr2
                            CONSIGNEE: $consignee
                            CADDR1: $caddr1
                            CADDR2: $caddr2
                            PRICE_TERM: $priceTerm
                            DESTINATION: $destination
                            PORT: $port
                            BANK_CD: $bankCd
                            PAY_TYPE_CD: $payTypeCd
                            BVT_FLAG: $bvtFlag
                            PI_REMARK1: $piRemark1
                            PI_REMARK2: $piRemark2
                            PI_REMARK3: $piRemark3
                            PI_REMARK4: $piRemark4
                            PI_REMARK5: $piRemark5
                            PI_REMARK6: $piRemark6
                            PI_REMARK7: $piRemark7
                            PI_REMARK8: $piRemark8
                            YY: $yy
                            SEQ: $seq
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            PAY_RULE: $payRule
                        ) {
                            id
                            PI_CD
                            MESSERS
                            ADDR1
                            ADDR2
                            CONSIGNEE
                            CADDR1
                            CADDR2
                            PRICE_TERM
                            DESTINATION
                            PORT
                            BANK_CD
                            PAY_TYPE_CD
                            BVT_FLAG
                            PI_REMARK1
                            PI_REMARK2
                            PI_REMARK3
                            PI_REMARK4
                            PI_REMARK5
                            PI_REMARK6
                            PI_REMARK7
                            PI_REMARK8
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            PAY_RULE
                        }
                    }
                `,
                variables: {
                    updateKsvOrderPimstId: argData.id,
                    piCd: argData.PI_CD,
                    messers: argData.MESSERS,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    consignee: argData.CONSIGNEE,
                    caddr1: argData.CADDR1,
                    caddr2: argData.CADDR2,
                    priceTerm: argData.PRICE_TERM,
                    destination: argData.DESTINATION,
                    port: argData.PORT,
                    bankCd: argData.BANK_CD,
                    payTypeCd: argData.PAY_TYPE_CD,
                    bvtFlag: argData.BVT_FLAG,
                    piRemark1: argData.PI_REMARK1,
                    piRemark2: argData.PI_REMARK2,
                    piRemark3: argData.PI_REMARK3,
                    piRemark4: argData.PI_REMARK4,
                    piRemark5: argData.PI_REMARK5,
                    piRemark6: argData.PI_REMARK6,
                    piRemark7: argData.PI_REMARK7,
                    piRemark8: argData.PI_REMARK8,
                    yy: argData.YY,
                    seq: argData.SEQ,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    payRule: argData.PAY_RULE,
                },
            });
            console.log(
                "KSV_ORDER_PIMST UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_PIMST),
            );
            return data.updateKSV_ORDER_PIMST;
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
                    mutation DeleteKSV_ORDER_PIMST(
                        $deleteKsvOrderPimstId: Int!
                    ) {
                        deleteKSV_ORDER_PIMST(id: $deleteKsvOrderPimstId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderPimstId: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_PIMST DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_PIMST),
            );
            return data.deleteKSV_ORDER_PIMST;
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
                    mutation MgrKsvOrderPimstDeletes(
                        $ids: [InputMgrKsvOrderPimstDeletes!]!
                    ) {
                        mgrKsvOrderPimstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_PIMST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
