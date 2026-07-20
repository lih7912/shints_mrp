/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_MENU {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_MENU {
                        allQueryKCD_MENU {
                            id
                            MENU_ID
                            MENU_NUM
                            MENU_NAME
                            DEVELOPER
                            EXP_DATE
                            END_DATE
                            FAC_FLAG
                            GROUP_CD
                            STATUS_CD
                        }
                    }
                `,
            });
            console.log(
                "KCD_MENU:",
                JSON.stringify(data.allQueryKCD_MENU.length),
            );
            return data.allQueryKCD_MENU;
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
                    query MgrKcdMenuQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdMenuQuery(
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
                            GROUP_CD
                            STATUS_CD
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_MENU:",
                JSON.stringify(data.mgrKcdMenuQuery.length),
            );
            return data.mgrKcdMenuQuery;
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
                    mutation CreateKCD_MENU(
                        $menuId: String
                        $menuNum: Int
                        $menuName: String
                        $developer: String
                        $expDate: String
                        $endDate: String
                        $facFlag: String
                        $groupCd: Int
                        $statusCd: Int
                    ) {
                        createKCD_MENU(
                            MENU_ID: $menuId
                            MENU_NUM: $menuNum
                            MENU_NAME: $menuName
                            DEVELOPER: $developer
                            EXP_DATE: $expDate
                            END_DATE: $endDate
                            FAC_FLAG: $facFlag
                            GROUP_CD: $groupCd
                            STATUS_CD: $statusCd
                        ) {
                            MENU_ID
                            MENU_NUM
                            MENU_NAME
                            DEVELOPER
                            EXP_DATE
                            END_DATE
                            FAC_FLAG
                            GROUP_CD
                            STATUS_CD
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
                    groupCd: argData.GROUP_CD,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "KCD_MENU INSERT:",
                JSON.stringify(data.createKCD_MENU),
            );
            return data.createKCD_MENU;
        } catch (e) {
            console.log("KCD_MENU INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_MENU(
                        $updateKcdMenuId: Int!
                        $menuId: String
                        $menuNum: Int
                        $menuName: String
                        $developer: String
                        $expDate: String
                        $endDate: String
                        $facFlag: String
                        $groupCd: Int
                        $statusCd: Int
                    ) {
                        updateKCD_MENU(
                            id: $updateKcdMenuId
                            MENU_ID: $menuId
                            MENU_NUM: $menuNum
                            MENU_NAME: $menuName
                            DEVELOPER: $developer
                            EXP_DATE: $expDate
                            END_DATE: $endDate
                            FAC_FLAG: $facFlag
                            GROUP_CD: $groupCd
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
                            GROUP_CD
                            STATUS_CD
                        }
                    }
                `,
                variables: {
                    updateKcdMenuId: argData.id,
                    menuId: argData.MENU_ID,
                    menuNum: argData.MENU_NUM,
                    menuName: argData.MENU_NAME,
                    developer: argData.DEVELOPER,
                    expDate: argData.EXP_DATE,
                    endDate: argData.END_DATE,
                    facFlag: argData.FAC_FLAG,
                    groupCd: argData.GROUP_CD,
                    statusCd: argData.STATUS_CD,
                },
            });
            console.log(
                "KCD_MENU UPDATE:",
                JSON.stringify(data.updateKCD_MENU),
            );
            return data.updateKCD_MENU;
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
                    mutation DeleteKCD_MENU($deleteKcdMenuId: Int!) {
                        deleteKCD_MENU(id: $deleteKcdMenuId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdMenuId: argData.id,
                },
            });
            console.log(
                "KCD_MENU DELETE:",
                JSON.stringify(data.deleteKCD_MENU),
            );
            return data.deleteKCD_MENU;
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
                    mutation MgrKcdMenuDeletes(
                        $ids: [InputMgrKcdMenuDeletes!]!
                    ) {
                        mgrKcdMenuDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_MENU DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
