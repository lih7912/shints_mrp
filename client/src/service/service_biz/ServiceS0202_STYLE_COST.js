/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0202_STYLE_COST {
    // SERVICE: EDT_STYLE_COST
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_STYLE_COST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0202_STYLE_COST_EDT_STYLE_COST(
                        $datas: [I_S0202_STYLE_COST_EDT_STYLE_COST!]!
                    ) {
                        mgrInsert_S0202_STYLE_COST_EDT_STYLE_COST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0202_STYLE_COST_EDT_STYLE_COST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_STYLE_COST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0202_STYLE_COST_EDT_STYLE_COST(
                        $datas: [I_S0202_STYLE_COST_EDT_STYLE_COST!]!
                    ) {
                        mgrUpdate_S0202_STYLE_COST_EDT_STYLE_COST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0202_STYLE_COST_EDT_STYLE_COST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_STYLE_COST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0202_STYLE_COST_EDT_STYLE_COST(
                        $datas: [I_S0202_STYLE_COST_EDT_STYLE_COST!]!
                    ) {
                        mgrDelete_S0202_STYLE_COST_EDT_STYLE_COST(
                            datas: $datas
                        ) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0202_STYLE_COST_EDT_STYLE_COST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_STYLE

    async mgrQueryTBL_KCD_STYLE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_STYLE(
                        $data: I_S0202_STYLE_COST_QRY_KCD_STYLE!
                    ) {
                        mgrQuery_S0202_STYLE_COST_TBL_KCD_STYLE(data: $data) {
                            STYLE_NAME
                            STYLE_CD
                            BUYER_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "marQuery_S0202_STYLE_COST_TBL_KCD_STYLE:" +
                    data.mgrQuery_S0202_STYLE_COST_TBL_KCD_STYLE.length,
            );
            return data.mgrQuery_S0202_STYLE_COST_TBL_KCD_STYLE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_SIZE_GROUP_BY_BUYER(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0202_SIZE_GROUP_BY_BUYER(
                        $data: I_S0202_SIZE_GROUP_BY_BUYER!
                    ) {
                        mgrQuery_S0202_SIZE_GROUP_BY_BUYER(data: $data) {
                            SIZE_MEMBER
                            SIZE_GROUP
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0202_SIZE_GROUP_BY_BUYER;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_PROD_MST

    async mgrQueryTBL_KSV_PROD_MST(argQRY_KSV_PROD_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_PROD_MST(
                        $data: I_S0202_STYLE_COST_QRY_KSV_PROD_MST!
                    ) {
                        mgrQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST(
                            data: $data
                        ) {
                            PROD_TYPE_NAME
                            COLOR
                            COLLECTION
                            PROD_UNIT
                            PROD_CD
                            PROD_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_PROD_MST,
                },
            });
            console.log(
                "marQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST:" +
                    data.mgrQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST.length,
            );
            return data.mgrQuery_S0202_STYLE_COST_TBL_KSV_PROD_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_STYLE

    async mgrQuery_STYLE_COST_CODE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0202_STYLE_COST_CODE(
                        $data: I_S0202_STYLE_COST_QRY_KCD_STYLE!
                    ) {
                        mgrQuery_S0202_STYLE_COST_CODE(data: $data) {
                            SIZE_MST {
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_CNT
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                id
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            USE_SIZE {
                                USE_SIZE
                                USE_SIZE_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "marQuery_S0202_STYLE_COST_TBL_KCD_STYLE:" +
                    data.mgrQuery_S0202_STYLE_COST_CODE.SIZE_MST.length,
            );
            return data.mgrQuery_S0202_STYLE_COST_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_STYLE_CODE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0202_STYLE_CODE(
                        $data: I_S0202_STYLE_COST_QRY_KCD_STYLE!
                    ) {
                        mgrQuery_S0202_STYLE_CODE(data: $data) {
                            STYLE_CD {
                                STYLE_CD
                                STYLE_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            // console.log("marQuery_S0202_STYLE_COST_TBL_KCD_STYLE:" + data.mgrQuery_S0202_STYLE_COST_CODE.SIZE_MST.length );
            return data.mgrQuery_S0202_STYLE_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_1(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0202_REPORT_1(
                        $data1: I_S0202_REPORT_1!
                        $data2: [I_S0202_REPORT_1_1!]!
                    ) {
                        mgrQuery_S0202_REPORT_1(data1: $data1, data2: $data2) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data1: argIn1,
                    data2: argIn2,
                },
            });
            // console.log("marQuery_S0202_STYLE_COST_TBL_KCD_STYLE:" + data.mgrQuery_S0202_STYLE_COST_CODE.SIZE_MST.length );
            return data.mgrQuery_S0202_REPORT_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_2(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0202_REPORT_2(
                        $data1: I_S0202_REPORT_1!
                        $data2: [I_S0202_REPORT_1_1!]!
                    ) {
                        mgrQuery_S0202_REPORT_2(data1: $data1, data2: $data2) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data1: argIn1,
                    data2: argIn2,
                },
            });
            // console.log("marQuery_S0202_STYLE_COST_TBL_KCD_STYLE:" + data.mgrQuery_S0202_STYLE_COST_CODE.SIZE_MST.length );
            return data.mgrQuery_S0202_REPORT_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_REPORT_3(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0202_REPORT_3(
                        $data1: I_S0202_REPORT_1!
                        $data2: [I_S0202_REPORT_1_1!]!
                    ) {
                        mgrQuery_S0202_REPORT_3(data1: $data1, data2: $data2) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data1: argIn1,
                    data2: argIn2,
                },
            });
            // console.log("marQuery_S0202_STYLE_COST_TBL_KCD_STYLE:" + data.mgrQuery_S0202_STYLE_COST_CODE.SIZE_MST.length );
            return data.mgrQuery_S0202_REPORT_3;
        } catch (e) {
            return e;
        }
    }
}
