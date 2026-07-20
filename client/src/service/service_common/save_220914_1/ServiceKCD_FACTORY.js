/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_FACTORY {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_FACTORY {
                        allQueryKCD_FACTORY {
                            id
                            FACTORY_CD
                            FACTORY_NAME
                            FACTORY_NAME2
                            USER_NAME
                            EMAIL
                            COUNTRY
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            PORT
                            AIRPORT
                            NAT_CD
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            tag_po
                            tag_order
                            place_cd
                            PACK_NAME
                        }
                    }
                `,
            });
            console.log(
                "KCD_FACTORY:",
                JSON.stringify(data.allQueryKCD_FACTORY.length),
            );
            return data.allQueryKCD_FACTORY;
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
                    query MgrKcdFactoryQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdFactoryQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            FACTORY_CD
                            FACTORY_NAME
                            FACTORY_NAME2
                            USER_NAME
                            EMAIL
                            COUNTRY
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            PORT
                            AIRPORT
                            NAT_CD
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            tag_po
                            tag_order
                            place_cd
                            PACK_NAME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_FACTORY:",
                JSON.stringify(data.mgrKcdFactoryQuery.length),
            );
            return data.mgrKcdFactoryQuery;
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
                    mutation CreateKCD_FACTORY(
                        $factoryCd: String
                        $factoryName: String
                        $factoryName2: String
                        $userName: String
                        $email: String
                        $country: String
                        $telNo: String
                        $faxNo: String
                        $zipNo: String
                        $addr1: String
                        $addr2: String
                        $port: String
                        $airport: String
                        $natCd: String
                        $bankCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $tagPo: String
                        $tagOrder: String
                        $placeCd: String
                        $packName: String
                    ) {
                        createKCD_FACTORY(
                            FACTORY_CD: $factoryCd
                            FACTORY_NAME: $factoryName
                            FACTORY_NAME2: $factoryName2
                            USER_NAME: $userName
                            EMAIL: $email
                            COUNTRY: $country
                            TEL_NO: $telNo
                            FAX_NO: $faxNo
                            ZIP_NO: $zipNo
                            ADDR1: $addr1
                            ADDR2: $addr2
                            PORT: $port
                            AIRPORT: $airport
                            NAT_CD: $natCd
                            BANK_CD: $bankCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            tag_po: $tagPo
                            tag_order: $tagOrder
                            place_cd: $placeCd
                            PACK_NAME: $packName
                        ) {
                            FACTORY_CD
                            FACTORY_NAME
                            FACTORY_NAME2
                            USER_NAME
                            EMAIL
                            COUNTRY
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            PORT
                            AIRPORT
                            NAT_CD
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            tag_po
                            tag_order
                            place_cd
                            PACK_NAME
                        }
                    }
                `,
                variables: {
                    factoryCd: argData.FACTORY_CD,
                    factoryName: argData.FACTORY_NAME,
                    factoryName2: argData.FACTORY_NAME2,
                    userName: argData.USER_NAME,
                    email: argData.EMAIL,
                    country: argData.COUNTRY,
                    telNo: argData.TEL_NO,
                    faxNo: argData.FAX_NO,
                    zipNo: argData.ZIP_NO,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    port: argData.PORT,
                    airport: argData.AIRPORT,
                    natCd: argData.NAT_CD,
                    bankCd: argData.BANK_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    tagPo: argData.tag_po,
                    tagOrder: argData.tag_order,
                    placeCd: argData.place_cd,
                    packName: argData.PACK_NAME,
                },
            });
            console.log(
                "KCD_FACTORY INSERT:",
                JSON.stringify(data.createKCD_FACTORY),
            );
            return data.createKCD_FACTORY;
        } catch (e) {
            console.log("KCD_FACTORY INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_FACTORY(
                        $updateKcdFactoryId: Int!
                        $factoryCd: String
                        $factoryName: String
                        $factoryName2: String
                        $userName: String
                        $email: String
                        $country: String
                        $telNo: String
                        $faxNo: String
                        $zipNo: String
                        $addr1: String
                        $addr2: String
                        $port: String
                        $airport: String
                        $natCd: String
                        $bankCd: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                        $tagPo: String
                        $tagOrder: String
                        $placeCd: String
                        $packName: String
                    ) {
                        updateKCD_FACTORY(
                            id: $updateKcdFactoryId
                            FACTORY_CD: $factoryCd
                            FACTORY_NAME: $factoryName
                            FACTORY_NAME2: $factoryName2
                            USER_NAME: $userName
                            EMAIL: $email
                            COUNTRY: $country
                            TEL_NO: $telNo
                            FAX_NO: $faxNo
                            ZIP_NO: $zipNo
                            ADDR1: $addr1
                            ADDR2: $addr2
                            PORT: $port
                            AIRPORT: $airport
                            NAT_CD: $natCd
                            BANK_CD: $bankCd
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                            tag_po: $tagPo
                            tag_order: $tagOrder
                            place_cd: $placeCd
                            PACK_NAME: $packName
                        ) {
                            id
                            FACTORY_CD
                            FACTORY_NAME
                            FACTORY_NAME2
                            USER_NAME
                            EMAIL
                            COUNTRY
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            PORT
                            AIRPORT
                            NAT_CD
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            tag_po
                            tag_order
                            place_cd
                            PACK_NAME
                        }
                    }
                `,
                variables: {
                    updateKcdFactoryId: argData.id,
                    factoryCd: argData.FACTORY_CD,
                    factoryName: argData.FACTORY_NAME,
                    factoryName2: argData.FACTORY_NAME2,
                    userName: argData.USER_NAME,
                    email: argData.EMAIL,
                    country: argData.COUNTRY,
                    telNo: argData.TEL_NO,
                    faxNo: argData.FAX_NO,
                    zipNo: argData.ZIP_NO,
                    addr1: argData.ADDR1,
                    addr2: argData.ADDR2,
                    port: argData.PORT,
                    airport: argData.AIRPORT,
                    natCd: argData.NAT_CD,
                    bankCd: argData.BANK_CD,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                    tagPo: argData.tag_po,
                    tagOrder: argData.tag_order,
                    placeCd: argData.place_cd,
                    packName: argData.PACK_NAME,
                },
            });
            console.log(
                "KCD_FACTORY UPDATE:",
                JSON.stringify(data.updateKCD_FACTORY),
            );
            return data.updateKCD_FACTORY;
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
                    mutation DeleteKCD_FACTORY($deleteKcdFactoryId: Int!) {
                        deleteKCD_FACTORY(id: $deleteKcdFactoryId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdFactoryId: argData.id,
                },
            });
            console.log(
                "KCD_FACTORY DELETE:",
                JSON.stringify(data.deleteKCD_FACTORY),
            );
            return data.deleteKCD_FACTORY;
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
                    mutation MgrKcdFactoryDeletes(
                        $ids: [InputMgrKcdFactoryDeletes!]!
                    ) {
                        mgrKcdFactoryDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_FACTORY DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
