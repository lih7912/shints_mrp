/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceSCD_MENU {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQuerySCD_MENU {
                        allQuerySCD_MENU {
                            id
                            MENU_ID
                            MENU_NUM
                            MENU_NAME
                            DEVELOPER
                            EXP_DATE
                            END_DATE
                            FAC_FLAG
                        }
                    }
                `,
            });
            console.log(
                "SCD_MENU:",
                JSON.stringify(data.allQuerySCD_MENU.length),
            );
            return data.allQuerySCD_MENU;
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
                    query MgrScdMenuQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrScdMenuQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            MENU_ID
                            MENU_NUM
                            MENU_NAME
                            DEVELOPER
                            EXP_DATE
                            END_DATE
                            FAC_FLAG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "SCD_MENU:",
                JSON.stringify(data.mgrScdMenuQuery.length),
            );
            return data.mgrScdMenuQuery;
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
                    mutation CreateSCD_MENU(
                        $menuId: String
                        $menuNum: Int
                        $menuName: String
                        $developer: String
                        $expDate: String
                        $endDate: String
                        $facFlag: String
                    ) {
                        createSCD_MENU(
                            MENU_ID: $menuId
                            MENU_NUM: $menuNum
                            MENU_NAME: $menuName
                            DEVELOPER: $developer
                            EXP_DATE: $expDate
                            END_DATE: $endDate
                            FAC_FLAG: $facFlag
                        ) {
                            MENU_ID
                            MENU_NUM
                            MENU_NAME
                            DEVELOPER
                            EXP_DATE
                            END_DATE
                            FAC_FLAG
                        }
                    }
                `,
                variables: {
                    menuId: argData.MENU_ID,
                    menuNum: argData.MENU_NUM,
                    menuName: argData.MENU_NAME,
                    developer: argData.DEVELOPER,
                    expDate: argData.EXP_DATE,
                    endDate: argData.END_DATE,
                    facFlag: argData.FAC_FLAG,
                },
            });
            console.log(
                "SCD_MENU INSERT:",
                JSON.stringify(data.createSCD_MENU),
            );
            return data.createSCD_MENU;
        } catch (e) {
            console.log("SCD_MENU INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateSCD_MENU(
                        $updateScdMenuId: Int!
                        $menuId: String
                        $menuNum: Int
                        $menuName: String
                        $developer: String
                        $expDate: String
                        $endDate: String
                        $facFlag: String
                    ) {
                        updateSCD_MENU(
                            id: $updateScdMenuId
                            MENU_ID: $menuId
                            MENU_NUM: $menuNum
                            MENU_NAME: $menuName
                            DEVELOPER: $developer
                            EXP_DATE: $expDate
                            END_DATE: $endDate
                            FAC_FLAG: $facFlag
                        ) {
                            id
                            MENU_ID
                            MENU_NUM
                            MENU_NAME
                            DEVELOPER
                            EXP_DATE
                            END_DATE
                            FAC_FLAG
                        }
                    }
                `,
                variables: {
                    updateScdMenuId: argData.id,
                    menuId: argData.MENU_ID,
                    menuNum: argData.MENU_NUM,
                    menuName: argData.MENU_NAME,
                    developer: argData.DEVELOPER,
                    expDate: argData.EXP_DATE,
                    endDate: argData.END_DATE,
                    facFlag: argData.FAC_FLAG,
                },
            });
            console.log(
                "SCD_MENU UPDATE:",
                JSON.stringify(data.updateSCD_MENU),
            );
            return data.updateSCD_MENU;
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
                    mutation DeleteSCD_MENU($deleteScdMenuId: Int!) {
                        deleteSCD_MENU(id: $deleteScdMenuId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteScdMenuId: argData.id,
                },
            });
            console.log(
                "SCD_MENU DELETE:",
                JSON.stringify(data.deleteSCD_MENU),
            );
            return data.deleteSCD_MENU;
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
                    mutation MgrScdMenuDeletes(
                        $ids: [InputMgrScdMenuDeletes!]!
                    ) {
                        mgrScdMenuDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("SCD_MENU DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
