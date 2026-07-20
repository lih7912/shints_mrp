/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_ORDER_TEMP22 {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_ORDER_TEMP22 {
                        allQueryKSV_ORDER_TEMP22 {
                            id
                            USER_ID
                            BUYER
                            M01_ORD
                            M01_USE
                            M02_ORD
                            M02_USE
                            M03_ORD
                            M03_USE
                            M04_ORD
                            M04_USE
                            M05_ORD
                            M05_USE
                            M06_ORD
                            M06_USE
                            M07_ORD
                            M07_USE
                            M08_ORD
                            M08_USE
                            M09_ORD
                            M09_USE
                            M10_ORD
                            M10_USE
                            M11_ORD
                            M11_USE
                            M12_ORD
                            M12_USE
                            TOT_ORD
                            TOT_USE
                        }
                    }
                `,
            });
            console.log(
                "KSV_ORDER_TEMP22:",
                JSON.stringify(data.allQueryKSV_ORDER_TEMP22.length),
            );
            return data.allQueryKSV_ORDER_TEMP22;
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
                    query MgrKsvOrderTemp22Query(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvOrderTemp22Query(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            USER_ID
                            BUYER
                            M01_ORD
                            M01_USE
                            M02_ORD
                            M02_USE
                            M03_ORD
                            M03_USE
                            M04_ORD
                            M04_USE
                            M05_ORD
                            M05_USE
                            M06_ORD
                            M06_USE
                            M07_ORD
                            M07_USE
                            M08_ORD
                            M08_USE
                            M09_ORD
                            M09_USE
                            M10_ORD
                            M10_USE
                            M11_ORD
                            M11_USE
                            M12_ORD
                            M12_USE
                            TOT_ORD
                            TOT_USE
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_ORDER_TEMP22:",
                JSON.stringify(data.mgrKsvOrderTemp22Query.length),
            );
            return data.mgrKsvOrderTemp22Query;
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
                    mutation CreateKSV_ORDER_TEMP22(
                        $userId: String
                        $buyer: String
                        $m01Ord: Float
                        $m01Use: Float
                        $m02Ord: Float
                        $m02Use: Float
                        $m03Ord: Float
                        $m03Use: Float
                        $m04Ord: Float
                        $m04Use: Float
                        $m05Ord: Float
                        $m05Use: Float
                        $m06Ord: Float
                        $m06Use: Float
                        $m07Ord: Float
                        $m07Use: Float
                        $m08Ord: Float
                        $m08Use: Float
                        $m09Ord: Float
                        $m09Use: Float
                        $m10Ord: Float
                        $m10Use: Float
                        $m11Ord: Float
                        $m11Use: Float
                        $m12Ord: Float
                        $m12Use: Float
                        $totOrd: Float
                        $totUse: Float
                    ) {
                        createKSV_ORDER_TEMP22(
                            USER_ID: $userId
                            BUYER: $buyer
                            M01_ORD: $m01Ord
                            M01_USE: $m01Use
                            M02_ORD: $m02Ord
                            M02_USE: $m02Use
                            M03_ORD: $m03Ord
                            M03_USE: $m03Use
                            M04_ORD: $m04Ord
                            M04_USE: $m04Use
                            M05_ORD: $m05Ord
                            M05_USE: $m05Use
                            M06_ORD: $m06Ord
                            M06_USE: $m06Use
                            M07_ORD: $m07Ord
                            M07_USE: $m07Use
                            M08_ORD: $m08Ord
                            M08_USE: $m08Use
                            M09_ORD: $m09Ord
                            M09_USE: $m09Use
                            M10_ORD: $m10Ord
                            M10_USE: $m10Use
                            M11_ORD: $m11Ord
                            M11_USE: $m11Use
                            M12_ORD: $m12Ord
                            M12_USE: $m12Use
                            TOT_ORD: $totOrd
                            TOT_USE: $totUse
                        ) {
                            USER_ID
                            BUYER
                            M01_ORD
                            M01_USE
                            M02_ORD
                            M02_USE
                            M03_ORD
                            M03_USE
                            M04_ORD
                            M04_USE
                            M05_ORD
                            M05_USE
                            M06_ORD
                            M06_USE
                            M07_ORD
                            M07_USE
                            M08_ORD
                            M08_USE
                            M09_ORD
                            M09_USE
                            M10_ORD
                            M10_USE
                            M11_ORD
                            M11_USE
                            M12_ORD
                            M12_USE
                            TOT_ORD
                            TOT_USE
                        }
                    }
                `,
                variables: {
                    userId: argData.USER_ID,
                    buyer: argData.BUYER,
                    m01Ord: argData.M01_ORD,
                    m01Use: argData.M01_USE,
                    m02Ord: argData.M02_ORD,
                    m02Use: argData.M02_USE,
                    m03Ord: argData.M03_ORD,
                    m03Use: argData.M03_USE,
                    m04Ord: argData.M04_ORD,
                    m04Use: argData.M04_USE,
                    m05Ord: argData.M05_ORD,
                    m05Use: argData.M05_USE,
                    m06Ord: argData.M06_ORD,
                    m06Use: argData.M06_USE,
                    m07Ord: argData.M07_ORD,
                    m07Use: argData.M07_USE,
                    m08Ord: argData.M08_ORD,
                    m08Use: argData.M08_USE,
                    m09Ord: argData.M09_ORD,
                    m09Use: argData.M09_USE,
                    m10Ord: argData.M10_ORD,
                    m10Use: argData.M10_USE,
                    m11Ord: argData.M11_ORD,
                    m11Use: argData.M11_USE,
                    m12Ord: argData.M12_ORD,
                    m12Use: argData.M12_USE,
                    totOrd: argData.TOT_ORD,
                    totUse: argData.TOT_USE,
                },
            });
            console.log(
                "KSV_ORDER_TEMP22 INSERT:",
                JSON.stringify(data.createKSV_ORDER_TEMP22),
            );
            return data.createKSV_ORDER_TEMP22;
        } catch (e) {
            console.log("KSV_ORDER_TEMP22 INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_ORDER_TEMP22(
                        $updateKsvOrderTemp22Id: Int!
                        $userId: String
                        $buyer: String
                        $m01Ord: Float
                        $m01Use: Float
                        $m02Ord: Float
                        $m02Use: Float
                        $m03Ord: Float
                        $m03Use: Float
                        $m04Ord: Float
                        $m04Use: Float
                        $m05Ord: Float
                        $m05Use: Float
                        $m06Ord: Float
                        $m06Use: Float
                        $m07Ord: Float
                        $m07Use: Float
                        $m08Ord: Float
                        $m08Use: Float
                        $m09Ord: Float
                        $m09Use: Float
                        $m10Ord: Float
                        $m10Use: Float
                        $m11Ord: Float
                        $m11Use: Float
                        $m12Ord: Float
                        $m12Use: Float
                        $totOrd: Float
                        $totUse: Float
                    ) {
                        updateKSV_ORDER_TEMP22(
                            id: $updateKsvOrderTemp22Id
                            USER_ID: $userId
                            BUYER: $buyer
                            M01_ORD: $m01Ord
                            M01_USE: $m01Use
                            M02_ORD: $m02Ord
                            M02_USE: $m02Use
                            M03_ORD: $m03Ord
                            M03_USE: $m03Use
                            M04_ORD: $m04Ord
                            M04_USE: $m04Use
                            M05_ORD: $m05Ord
                            M05_USE: $m05Use
                            M06_ORD: $m06Ord
                            M06_USE: $m06Use
                            M07_ORD: $m07Ord
                            M07_USE: $m07Use
                            M08_ORD: $m08Ord
                            M08_USE: $m08Use
                            M09_ORD: $m09Ord
                            M09_USE: $m09Use
                            M10_ORD: $m10Ord
                            M10_USE: $m10Use
                            M11_ORD: $m11Ord
                            M11_USE: $m11Use
                            M12_ORD: $m12Ord
                            M12_USE: $m12Use
                            TOT_ORD: $totOrd
                            TOT_USE: $totUse
                        ) {
                            id
                            USER_ID
                            BUYER
                            M01_ORD
                            M01_USE
                            M02_ORD
                            M02_USE
                            M03_ORD
                            M03_USE
                            M04_ORD
                            M04_USE
                            M05_ORD
                            M05_USE
                            M06_ORD
                            M06_USE
                            M07_ORD
                            M07_USE
                            M08_ORD
                            M08_USE
                            M09_ORD
                            M09_USE
                            M10_ORD
                            M10_USE
                            M11_ORD
                            M11_USE
                            M12_ORD
                            M12_USE
                            TOT_ORD
                            TOT_USE
                        }
                    }
                `,
                variables: {
                    updateKsvOrderTemp22Id: argData.id,
                    userId: argData.USER_ID,
                    buyer: argData.BUYER,
                    m01Ord: argData.M01_ORD,
                    m01Use: argData.M01_USE,
                    m02Ord: argData.M02_ORD,
                    m02Use: argData.M02_USE,
                    m03Ord: argData.M03_ORD,
                    m03Use: argData.M03_USE,
                    m04Ord: argData.M04_ORD,
                    m04Use: argData.M04_USE,
                    m05Ord: argData.M05_ORD,
                    m05Use: argData.M05_USE,
                    m06Ord: argData.M06_ORD,
                    m06Use: argData.M06_USE,
                    m07Ord: argData.M07_ORD,
                    m07Use: argData.M07_USE,
                    m08Ord: argData.M08_ORD,
                    m08Use: argData.M08_USE,
                    m09Ord: argData.M09_ORD,
                    m09Use: argData.M09_USE,
                    m10Ord: argData.M10_ORD,
                    m10Use: argData.M10_USE,
                    m11Ord: argData.M11_ORD,
                    m11Use: argData.M11_USE,
                    m12Ord: argData.M12_ORD,
                    m12Use: argData.M12_USE,
                    totOrd: argData.TOT_ORD,
                    totUse: argData.TOT_USE,
                },
            });
            console.log(
                "KSV_ORDER_TEMP22 UPDATE:",
                JSON.stringify(data.updateKSV_ORDER_TEMP22),
            );
            return data.updateKSV_ORDER_TEMP22;
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
                    mutation DeleteKSV_ORDER_TEMP22(
                        $deleteKsvOrderTemp22Id: Int!
                    ) {
                        deleteKSV_ORDER_TEMP22(id: $deleteKsvOrderTemp22Id) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvOrderTemp22Id: argData.id,
                },
            });
            console.log(
                "KSV_ORDER_TEMP22 DELETE:",
                JSON.stringify(data.deleteKSV_ORDER_TEMP22),
            );
            return data.deleteKSV_ORDER_TEMP22;
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
                    mutation MgrKsvOrderTemp22Deletes(
                        $ids: [InputMgrKsvOrderTemp22Deletes!]!
                    ) {
                        mgrKsvOrderTemp22Deletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_ORDER_TEMP22 DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
