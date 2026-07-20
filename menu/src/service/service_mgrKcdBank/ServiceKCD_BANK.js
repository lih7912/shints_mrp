import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_BANK {
    async getDatasKCD_BANK() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_BANK {
                        allQueryKCD_BANK {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            BANK_TYPE1
                        }
                    }
                `,
            });
            console.log(
                "KCD_BANK:",
                JSON.stringify(data.allQueryKCD_BANK.length),
            );
            return data.allQueryKCD_BANK;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParamKCD_BANK(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdBankQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdBankQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            BANK_TYPE1
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_BANK:",
                JSON.stringify(data.mgrKcdBankQuery.length),
            );
            return data.mgrKcdBankQuery;
        } catch (e) {
            return e;
        }
    }

    async createDataKCD_BANK(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKCD_BANK(
                        $bankCd: String
                        $bankName: String
                        $accountNo: String
                        $accountName: String
                        $sftcode: String
                        $addr1: String
                        $addr2: String
                        $bankType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $bankBranch: String
                        $bankType1: String
                    ) {
                        createKCD_BANK(
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            ACCOUNT_NO: $accountNo
                            ACCOUNT_NAME: $accountName
                            SFTCODE: $sftcode
                            ADDR1: $addr1
                            ADDR2: $addr2
                            BANK_TYPE: $bankType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            BANK_BRANCH: $bankBranch
                            BANK_TYPE1: $bankType1
                        ) {
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            BANK_TYPE1
                        }
                    }
                `,
                variables: {
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    accountNo: argData.ACCOUNT_NO,
                    accountName: argData.ACCOUNT_NAME,
                    sftcode: argData.SFTCODE,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    bankType: argData.BANK_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    bankBranch: argData.BANK_BRANCH,
                    bankType1: argData.BANK_TYPE1,
                },
            });
            console.log(
                "KCD_BANK INSERT:",
                JSON.stringify(data.createKCD_BANK),
            );
            return data.createKCD_BANK;
        } catch (e) {
            console.log("KCD_BANK INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateDataKCD_BANK(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_BANK(
                        $updateKcdBankId: Int!
                        $bankCd: String
                        $bankName: String
                        $accountNo: String
                        $accountName: String
                        $sftcode: String
                        $addr1: String
                        $addr2: String
                        $bankType: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $bankBranch: String
                        $bankType1: String
                    ) {
                        updateKCD_BANK(
                            id: $updateKcdBankId
                            BANK_CD: $bankCd
                            BANK_NAME: $bankName
                            ACCOUNT_NO: $accountNo
                            ACCOUNT_NAME: $accountName
                            SFTCODE: $sftcode
                            ADDR1: $addr1
                            ADDR2: $addr2
                            BANK_TYPE: $bankType
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            BANK_BRANCH: $bankBranch
                            BANK_TYPE1: $bankType1
                        ) {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            BANK_TYPE1
                        }
                    }
                `,
                variables: {
                    updateKcdBankId: argData.id,
                    bankCd: argData.BANK_CD,
                    bankName: argData.BANK_NAME,
                    accountNo: argData.ACCOUNT_NO,
                    accountName: argData.ACCOUNT_NAME,
                    sftcode: argData.SFTCODE,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    bankType: argData.BANK_TYPE,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    bankBranch: argData.BANK_BRANCH,
                    bankType1: argData.BANK_TYPE1,
                },
            });
            console.log(
                "KCD_BANK UPDATE:",
                JSON.stringify(data.updateKCD_BANK),
            );
            return data.updateKCD_BANK;
        } catch (e) {
            return e;
        }
    }

    async deleteDataKCD_BANK(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKCD_BANK($deleteKcdBankId: Int!) {
                        deleteKCD_BANK(id: $deleteKcdBankId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdBankId: argData.id,
                },
            });
            console.log(
                "KCD_BANK DELETE:",
                JSON.stringify(data.deleteKCD_BANK),
            );
            return data.deleteKCD_BANK;
        } catch (e) {
            return e;
        }
    }

    async deletesDataKCD_BANK(argDatas) {
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
                    mutation MgrKcdBankDeletes(
                        $ids: [InputMgrKcdBankDeletes!]!
                    ) {
                        mgrKcdBankDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_BANK DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }

    /*
    getProducts() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
*/
}
