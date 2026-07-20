/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_STOCK_OUT_SCHEDULE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_STOCK_OUT_SCHEDULE {
                        allQueryKSV_STOCK_OUT_SCHEDULE {
                            id
                            OUT_DATE
                            OUT_SEQ
                            DEPARTURE
                            ARRIVAL
                            FRT_TYPE
                            ETA
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
            });
            console.log(
                "KSV_STOCK_OUT_SCHEDULE:",
                JSON.stringify(data.allQueryKSV_STOCK_OUT_SCHEDULE.length),
            );
            return data.allQueryKSV_STOCK_OUT_SCHEDULE;
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
                    query MgrKsvStockOutScheduleQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvStockOutScheduleQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            OUT_DATE
                            OUT_SEQ
                            DEPARTURE
                            ARRIVAL
                            FRT_TYPE
                            ETA
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_STOCK_OUT_SCHEDULE:",
                JSON.stringify(data.mgrKsvStockOutScheduleQuery.length),
            );
            return data.mgrKsvStockOutScheduleQuery;
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
                    mutation CreateKSV_STOCK_OUT_SCHEDULE(
                        $outDate: String
                        $outSeq: Int
                        $departure: String
                        $arrival: String
                        $frtType: String
                        $eta: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        createKSV_STOCK_OUT_SCHEDULE(
                            OUT_DATE: $outDate
                            OUT_SEQ: $outSeq
                            DEPARTURE: $departure
                            ARRIVAL: $arrival
                            FRT_TYPE: $frtType
                            ETA: $eta
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            OUT_DATE
                            OUT_SEQ
                            DEPARTURE
                            ARRIVAL
                            FRT_TYPE
                            ETA
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    outDate: argData.OUT_DATE,
                    outSeq: argData.OUT_SEQ,
                    departure: argData.DEPARTURE,
                    arrival: argData.ARRIVAL,
                    frtType: argData.FRT_TYPE,
                    eta: argData.ETA,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_OUT_SCHEDULE INSERT:",
                JSON.stringify(data.createKSV_STOCK_OUT_SCHEDULE),
            );
            return data.createKSV_STOCK_OUT_SCHEDULE;
        } catch (e) {
            console.log(
                "KSV_STOCK_OUT_SCHEDULE INSERT ERROR:",
                JSON.stringify(e),
            );
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
                    mutation UpdateKSV_STOCK_OUT_SCHEDULE(
                        $updateKsvStockOutScheduleId: Int!
                        $outDate: String
                        $outSeq: Int
                        $departure: String
                        $arrival: String
                        $frtType: String
                        $eta: String
                        $regUser: String
                        $regDatetime: String
                    ) {
                        updateKSV_STOCK_OUT_SCHEDULE(
                            id: $updateKsvStockOutScheduleId
                            OUT_DATE: $outDate
                            OUT_SEQ: $outSeq
                            DEPARTURE: $departure
                            ARRIVAL: $arrival
                            FRT_TYPE: $frtType
                            ETA: $eta
                            REG_USER: $regUser
                            REG_DATETIME: $regDatetime
                        ) {
                            id
                            OUT_DATE
                            OUT_SEQ
                            DEPARTURE
                            ARRIVAL
                            FRT_TYPE
                            ETA
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    updateKsvStockOutScheduleId: argData.id,
                    outDate: argData.OUT_DATE,
                    outSeq: argData.OUT_SEQ,
                    departure: argData.DEPARTURE,
                    arrival: argData.ARRIVAL,
                    frtType: argData.FRT_TYPE,
                    eta: argData.ETA,
                    regUser: argData.REG_USER,
                    regDatetime: argData.REG_DATETIME,
                },
            });
            console.log(
                "KSV_STOCK_OUT_SCHEDULE UPDATE:",
                JSON.stringify(data.updateKSV_STOCK_OUT_SCHEDULE),
            );
            return data.updateKSV_STOCK_OUT_SCHEDULE;
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
                    mutation DeleteKSV_STOCK_OUT_SCHEDULE(
                        $deleteKsvStockOutScheduleId: Int!
                    ) {
                        deleteKSV_STOCK_OUT_SCHEDULE(
                            id: $deleteKsvStockOutScheduleId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvStockOutScheduleId: argData.id,
                },
            });
            console.log(
                "KSV_STOCK_OUT_SCHEDULE DELETE:",
                JSON.stringify(data.deleteKSV_STOCK_OUT_SCHEDULE),
            );
            return data.deleteKSV_STOCK_OUT_SCHEDULE;
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
                    mutation MgrKsvStockOutScheduleDeletes(
                        $ids: [InputMgrKsvStockOutScheduleDeletes!]!
                    ) {
                        mgrKsvStockOutScheduleDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_STOCK_OUT_SCHEDULE DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
