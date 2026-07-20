/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_FACTORY_WARE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_FACTORY_WARE {
                        allQueryKCD_FACTORY_WARE {
                            id
                            FACTORY_CD
                            WARE_CD
                            WARE_NAME
                            WARE_SIZE
                            WARE_COM
                            WARE_FARE
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KCD_FACTORY_WARE:",
                JSON.stringify(data.allQueryKCD_FACTORY_WARE.length),
            );
            return data.allQueryKCD_FACTORY_WARE;
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
                    query MgrKcdFactoryWareQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdFactoryWareQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            FACTORY_CD
                            WARE_CD
                            WARE_NAME
                            WARE_SIZE
                            WARE_COM
                            WARE_FARE
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_FACTORY_WARE:",
                JSON.stringify(data.mgrKcdFactoryWareQuery.length),
            );
            return data.mgrKcdFactoryWareQuery;
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
                    mutation CreateKCD_FACTORY_WARE(
                        $factoryCd: String
                        $wareCd: String
                        $wareName: String
                        $wareSize: String
                        $wareCom: String
                        $wareFare: Int
                        $currCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKCD_FACTORY_WARE(
                            FACTORY_CD: $factoryCd
                            WARE_CD: $wareCd
                            WARE_NAME: $wareName
                            WARE_SIZE: $wareSize
                            WARE_COM: $wareCom
                            WARE_FARE: $wareFare
                            CURR_CD: $currCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            FACTORY_CD
                            WARE_CD
                            WARE_NAME
                            WARE_SIZE
                            WARE_COM
                            WARE_FARE
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    factoryCd: argData.FACTORY_CD,
                    wareCd: argData.WARE_CD,
                    wareName: argData.WARE_NAME,
                    wareSize: argData.WARE_SIZE,
                    wareCom: argData.WARE_COM,
                    wareFare: argData.WARE_FARE,
                    currCd: argData.CURR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KCD_FACTORY_WARE INSERT:",
                JSON.stringify(data.createKCD_FACTORY_WARE),
            );
            return data.createKCD_FACTORY_WARE;
        } catch (e) {
            console.log("KCD_FACTORY_WARE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_FACTORY_WARE(
                        $updateKcdFactoryWareId: Int!
                        $factoryCd: String
                        $wareCd: String
                        $wareName: String
                        $wareSize: String
                        $wareCom: String
                        $wareFare: Int
                        $currCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKCD_FACTORY_WARE(
                            id: $updateKcdFactoryWareId
                            FACTORY_CD: $factoryCd
                            WARE_CD: $wareCd
                            WARE_NAME: $wareName
                            WARE_SIZE: $wareSize
                            WARE_COM: $wareCom
                            WARE_FARE: $wareFare
                            CURR_CD: $currCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            FACTORY_CD
                            WARE_CD
                            WARE_NAME
                            WARE_SIZE
                            WARE_COM
                            WARE_FARE
                            CURR_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdFactoryWareId: argData.id,
                    factoryCd: argData.FACTORY_CD,
                    wareCd: argData.WARE_CD,
                    wareName: argData.WARE_NAME,
                    wareSize: argData.WARE_SIZE,
                    wareCom: argData.WARE_COM,
                    wareFare: argData.WARE_FARE,
                    currCd: argData.CURR_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KCD_FACTORY_WARE UPDATE:",
                JSON.stringify(data.updateKCD_FACTORY_WARE),
            );
            return data.updateKCD_FACTORY_WARE;
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
                    mutation DeleteKCD_FACTORY_WARE(
                        $deleteKcdFactoryWareId: Int!
                    ) {
                        deleteKCD_FACTORY_WARE(id: $deleteKcdFactoryWareId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdFactoryWareId: argData.id,
                },
            });
            console.log(
                "KCD_FACTORY_WARE DELETE:",
                JSON.stringify(data.deleteKCD_FACTORY_WARE),
            );
            return data.deleteKCD_FACTORY_WARE;
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
                    mutation MgrKcdFactoryWareDeletes(
                        $ids: [InputMgrKcdFactoryWareDeletes!]!
                    ) {
                        mgrKcdFactoryWareDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_FACTORY_WARE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
