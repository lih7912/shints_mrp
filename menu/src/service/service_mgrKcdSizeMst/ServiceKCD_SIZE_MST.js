import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_SIZE_MST {
    async getDatasKCD_SIZE_MST() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_SIZE_MST {
                        allQueryKCD_SIZE_MST {
                            id
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KCD_SIZE_MST:",
                JSON.stringify(data.allQueryKCD_SIZE_MST.length),
            );
            return data.allQueryKCD_SIZE_MST;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParamKCD_SIZE_MST(qrySizeGroup, qrySizeMember) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdSizeMstQuery(
                        $sizeGroup: String!
                        $sizeMember: String!
                    ) {
                        mgrKcdSizeMstQuery(
                            SIZE_GROUP: $sizeGroup
                            SIZE_MEMBER: $sizeMember
                        ) {
                            id
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    sizeGroup: qrySizeGroup,
                    sizeMember: qrySizeMember,
                },
            });
            console.log(
                "KCD_SIZE_MST:",
                JSON.stringify(data.mgrKcdSizeMstQuery.length),
            );
            return data.mgrKcdSizeMstQuery;
        } catch (e) {
            return e;
        }
    }

    async createDataKCD_SIZE_MST(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        console.log("INPUT INSERT=<" + JSON.stringify(argData));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKCD_SIZE_MST(
                        $sizeGroup: String
                        $sizeMember: String
                        $sizeCnt: Int
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKCD_SIZE_MST(
                            SIZE_GROUP: $sizeGroup
                            SIZE_MEMBER: $sizeMember
                            SIZE_CNT: $sizeCnt
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    sizeGroup: argData.SIZE_GROUP,
                    sizeMember: argData.SIZE_MEMBER,
                    sizeCnt: argData.SIZE_CNT,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_SIZE_MST INSERT:",
                JSON.stringify(data.createKCD_SIZE_MST),
            );
            return data.createKCD_SIZE_MST;
        } catch (e) {
            console.log("KCD_SIZE_MST INSERT ERROR:", JSON.stringify(e));
            return e;
        }
    }

    async updateDataKCD_SIZE_MST(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKCD_SIZE_MST(
                        $updateKcdSizeMstId: Int!
                        $sizeGroup: String
                        $sizeMember: String
                        $statusCd: String
                        $sizeCnt: Int
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKCD_SIZE_MST(
                            id: $updateKcdSizeMstId
                            SIZE_GROUP: $sizeGroup
                            SIZE_MEMBER: $sizeMember
                            STATUS_CD: $statusCd
                            SIZE_CNT: $sizeCnt
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdSizeMstId: argData.id,
                    sizeGroup: argData.SIZE_GROUP,
                    sizeMember: argData.SIZE_MEMBER,
                    sizeCnt: argData.SIZE_CNT,
                    statusCd: argData.STATUS_CD,
                    REG_USER: argData.REG_USER,
                    REG_DATETIME: argData.REG_DATETIME,
                    UPD_USER: argData.UPD_USER,
                    UPD_DATETIME: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_SIZE_MST UPDATE:",
                JSON.stringify(data.updateKCD_SIZE_MST),
            );
            return data.updateKCD_SIZE_MST;
        } catch (e) {
            return e;
        }
    }

    async deleteDataKCD_SIZE_MST(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKCD_SIZE_MST($deleteKcdSizeMstId: Int!) {
                        deleteKCD_SIZE_MST(id: $deleteKcdSizeMstId) {
                            id
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    deleteKcdSizeMstId: argData.id,
                },
            });
            console.log(
                "KCD_SIZE_MST DELETE:",
                JSON.stringify(data.deleteKCD_SIZE_MST),
            );
            return data.deleteKCD_SIZE_MST;
        } catch (e) {
            return e;
        }
    }

    async deletesDataKCD_SIZE_MST(argDatas) {
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
                    mutation MgrKcdSizeMstDeletes(
                        $ids: [InputMgrKcdSizeMstDeletes!]!
                    ) {
                        mgrKcdSizeMstDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_SIZE_MST DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
