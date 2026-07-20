/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_PLACE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_PLACE {
                        allQueryKCD_PLACE {
                            id
                            PLACE_CD
                            PLACE_NAME
                            PLACE_TYPE
                            DELIVERY_TYPE
                            USER_NAME
                            TEL_NO
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
                "KCD_PLACE:",
                JSON.stringify(data.allQueryKCD_PLACE.length),
            );
            return data.allQueryKCD_PLACE;
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
                    query MgrKcdPlaceQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdPlaceQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PLACE_CD
                            PLACE_NAME
                            PLACE_TYPE
                            DELIVERY_TYPE
                            USER_NAME
                            TEL_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KCD_PLACE:",
                JSON.stringify(data.mgrKcdPlaceQuery.length),
            );
            return data.mgrKcdPlaceQuery;
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
                    mutation CreateKCD_PLACE(
                        $placeCd: String
                        $placeName: String
                        $placeType: String
                        $deliveryType: String
                        $userName: String
                        $telNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        createKCD_PLACE(
                            PLACE_CD: $placeCd
                            PLACE_NAME: $placeName
                            PLACE_TYPE: $placeType
                            DELIVERY_TYPE: $deliveryType
                            USER_NAME: $userName
                            TEL_NO: $telNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            PLACE_CD
                            PLACE_NAME
                            PLACE_TYPE
                            DELIVERY_TYPE
                            USER_NAME
                            TEL_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    placeCd: argData.PLACE_CD,
                    placeName: argData.PLACE_NAME,
                    placeType: argData.PLACE_TYPE,
                    deliveryType: argData.DELIVERY_TYPE,
                    userName: argData.USER_NAME,
                    telNo: argData.TEL_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_PLACE INSERT:",
                JSON.stringify(data.createKCD_PLACE),
            );
            return data.createKCD_PLACE;
        } catch (e) {
            console.log("KCD_PLACE INSERT ERROR:", JSON.stringify(e));
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
                    mutation UpdateKCD_PLACE(
                        $updateKcdPlaceId: Int!
                        $placeCd: String
                        $placeName: String
                        $placeType: String
                        $deliveryType: String
                        $userName: String
                        $telNo: String
                        $statusCd: String
                        $regUser: String
                        $regDatetime: String
                        $updUser: String
                        $updDatetime: String
                    ) {
                        updateKCD_PLACE(
                            id: $updateKcdPlaceId
                            PLACE_CD: $placeCd
                            PLACE_NAME: $placeName
                            PLACE_TYPE: $placeType
                            DELIVERY_TYPE: $deliveryType
                            USER_NAME: $userName
                            TEL_NO: $telNo
                            STATUS_CD: $statusCd
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                            UPD_USER: $updUser
                            UPD_DATETIME: $updDatetime
                        ) {
                            id
                            PLACE_CD
                            PLACE_NAME
                            PLACE_TYPE
                            DELIVERY_TYPE
                            USER_NAME
                            TEL_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKcdPlaceId: argData.id,
                    placeCd: argData.PLACE_CD,
                    placeName: argData.PLACE_NAME,
                    placeType: argData.PLACE_TYPE,
                    deliveryType: argData.DELIVERY_TYPE,
                    userName: argData.USER_NAME,
                    telNo: argData.TEL_NO,
                    statusCd: argData.STATUS_CD,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                    updUser: argData.UPD_USER,
                    updDatetime: argData.UPD_DATETIME,
                },
            });
            console.log(
                "KCD_PLACE UPDATE:",
                JSON.stringify(data.updateKCD_PLACE),
            );
            return data.updateKCD_PLACE;
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
                    mutation DeleteKCD_PLACE($deleteKcdPlaceId: Int!) {
                        deleteKCD_PLACE(id: $deleteKcdPlaceId) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKcdPlaceId: argData.id,
                },
            });
            console.log(
                "KCD_PLACE DELETE:",
                JSON.stringify(data.deleteKCD_PLACE),
            );
            return data.deleteKCD_PLACE;
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
                    mutation MgrKcdPlaceDeletes(
                        $ids: [InputMgrKcdPlaceDeletes!]!
                    ) {
                        mgrKcdPlaceDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_PLACE DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
