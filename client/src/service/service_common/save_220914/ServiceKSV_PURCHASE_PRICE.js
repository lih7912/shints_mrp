/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PURCHASE_PRICE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PURCHASE_PRICE {
                        allQueryKSV_PURCHASE_PRICE {
                            id
                            PUR_CD
                            PRICE
                            VENDOR_NAME
                            COUNTRY
                            PUR_STATUS
                            INCOTERMS
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_PURCHASE_PRICE:",
                JSON.stringify(data.allQueryKSV_PURCHASE_PRICE.length),
            );
            return data.allQueryKSV_PURCHASE_PRICE;
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
                    query MgrKsvPurchasePriceQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvPurchasePriceQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PUR_CD
                            PRICE
                            VENDOR_NAME
                            COUNTRY
                            PUR_STATUS
                            INCOTERMS
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PURCHASE_PRICE:",
                JSON.stringify(data.mgrKsvPurchasePriceQuery.length),
            );
            return data.mgrKsvPurchasePriceQuery;
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
                    mutation CreateKSV_PURCHASE_PRICE(
                        $purCd: String
                        $price: Float
                        $vendorName: String
                        $country: String
                        $purStatus: String
                        $incoterms: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_PURCHASE_PRICE(
                            PUR_CD: $purCd
                            PRICE: $price
                            VENDOR_NAME: $vendorName
                            COUNTRY: $country
                            PUR_STATUS: $purStatus
                            INCOTERMS: $incoterms
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            PUR_CD
                            PRICE
                            VENDOR_NAME
                            COUNTRY
                            PUR_STATUS
                            INCOTERMS
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    purCd: argData.PUR_CD,
                    price: argData.PRICE,
                    vendorName: argData.VENDOR_NAME,
                    country: argData.COUNTRY,
                    purStatus: argData.PUR_STATUS,
                    incoterms: argData.INCOTERMS,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PURCHASE_PRICE INSERT:",
                JSON.stringify(data.createKSV_PURCHASE_PRICE),
            );
            return data.createKSV_PURCHASE_PRICE;
        } catch (e) {
            console.log("KSV_PURCHASE_PRICE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKSV_PURCHASE_PRICE(
                        $updateKsvPurchasePriceId: Int!
                        $purCd: String
                        $price: Float
                        $vendorName: String
                        $country: String
                        $purStatus: String
                        $incoterms: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_PURCHASE_PRICE(
                            id: $updateKsvPurchasePriceId
                            PUR_CD: $purCd
                            PRICE: $price
                            VENDOR_NAME: $vendorName
                            COUNTRY: $country
                            PUR_STATUS: $purStatus
                            INCOTERMS: $incoterms
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            PUR_CD
                            PRICE
                            VENDOR_NAME
                            COUNTRY
                            PUR_STATUS
                            INCOTERMS
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvPurchasePriceId: argData.id,
                    purCd: argData.PUR_CD,
                    price: argData.PRICE,
                    vendorName: argData.VENDOR_NAME,
                    country: argData.COUNTRY,
                    purStatus: argData.PUR_STATUS,
                    incoterms: argData.INCOTERMS,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_PURCHASE_PRICE UPDATE:",
                JSON.stringify(data.updateKSV_PURCHASE_PRICE),
            );
            return data.updateKSV_PURCHASE_PRICE;
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
                    mutation DeleteKSV_PURCHASE_PRICE(
                        $deleteKsvPurchasePriceId: Int!
                    ) {
                        deleteKSV_PURCHASE_PRICE(
                            id: $deleteKsvPurchasePriceId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvPurchasePriceId: argData.id,
                },
            });
            console.log(
                "KSV_PURCHASE_PRICE DELETE:",
                JSON.stringify(data.deleteKSV_PURCHASE_PRICE),
            );
            return data.deleteKSV_PURCHASE_PRICE;
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
                    mutation MgrKsvPurchasePriceDeletes(
                        $ids: [InputMgrKsvPurchasePriceDeletes!]!
                    ) {
                        mgrKsvPurchasePriceDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KSV_PURCHASE_PRICE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
