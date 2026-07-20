/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class Servicea_po_cd {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerya_po_cd {
                        allQuerya_po_cd {
                            id
                            po_cd
                            matl_cd
                            pay_curr_cd
                            pay_price
                            po_qty
                        }
                    }
                `,
            });
            console.log(
                "a_po_cd:",
                JSON.stringify(data.allQuerya_po_cd.length),
            );
            return data.allQuerya_po_cd;
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
                    query MgrAPoCdQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrAPoCdQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            po_cd
                            matl_cd
                            pay_curr_cd
                            pay_price
                            po_qty
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log("a_po_cd:", JSON.stringify(data.mgrAPoCdQuery.length));
            return data.mgrAPoCdQuery;
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
                    mutation Createa_po_cd(
                        $poCd: String
                        $matlCd: String
                        $payCurrCd: String
                        $payPrice: Float
                        $poQty: Float
                    ) {
                        createa_po_cd(
                            po_cd: $poCd
                            matl_cd: $matlCd
                            pay_curr_cd: $payCurrCd
                            pay_price: $payPrice
                            po_qty: $poQty
                        ) {
                            po_cd
                            matl_cd
                            pay_curr_cd
                            pay_price
                            po_qty
                        }
                    }
                `,
                variables: {
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    payCurrCd: argData.pay_curr_cd,
                    payPrice: argData.pay_price,
                    poQty: argData.po_qty,
                },
            });
            console.log("a_po_cd INSERT:", JSON.stringify(data.createa_po_cd));
            return data.createa_po_cd;
        } catch (e) {
            console.log("a_po_cd INSERT ERROR:", JSON.stringify(e));
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
                    mutation Updatea_po_cd(
                        $updateAPoCdId: Int!
                        $poCd: String
                        $matlCd: String
                        $payCurrCd: String
                        $payPrice: Float
                        $poQty: Float
                    ) {
                        updatea_po_cd(
                            id: $updateAPoCdId
                            po_cd: $poCd
                            matl_cd: $matlCd
                            pay_curr_cd: $payCurrCd
                            pay_price: $payPrice
                            po_qty: $poQty
                        ) {
                            id
                            po_cd
                            matl_cd
                            pay_curr_cd
                            pay_price
                            po_qty
                        }
                    }
                `,
                variables: {
                    updateAPoCdId: argData.id,
                    poCd: argData.po_cd,
                    matlCd: argData.matl_cd,
                    payCurrCd: argData.pay_curr_cd,
                    payPrice: argData.pay_price,
                    poQty: argData.po_qty,
                },
            });
            console.log("a_po_cd UPDATE:", JSON.stringify(data.updatea_po_cd));
            return data.updatea_po_cd;
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
                    mutation Deletea_po_cd($deleteAPoCdId: Int!) {
                        deletea_po_cd(id: $deleteAPoCdId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteAPoCdId: argData.id,
                },
            });
            console.log("a_po_cd DELETE:", JSON.stringify(data.deletea_po_cd));
            return data.deletea_po_cd;
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
                    mutation MgrAPoCdDeletes($ids: [InputMgrAPoCdDeletes!]!) {
                        mgrAPoCdDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("a_po_cd DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
