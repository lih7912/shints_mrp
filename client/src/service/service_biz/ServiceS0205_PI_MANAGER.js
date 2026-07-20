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

export class ServiceS0205_PI_MANAGER {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_PI_MST(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0205_5(
                        $datas: I_S0205_5_1!
                        $datas1: [I_S0205_5_2!]!
                    ) {
                        mgrInsert_S0205_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            console.log(
                "mgrInsert_S0205_5 call succeed: " + data.mgrInsert_S0205_5,
            );
            return data.mgrInsert_S0205_5;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrInsert_FILE_INFO(argIn1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0205_5_FILE_INFO(
                        $datas: I_S0205_5_FILE_INFO!
                    ) {
                        mgrInsert_S0205_5_FILE_INFO(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                },
            });
            return data.mgrInsert_S0205_5_FILE_INFO;
        } catch (e) {
            console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrUpdate_PI_MST(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0205_5(
                        $datas: I_S0205_5_1!
                        $datas1: [I_S0205_5_2!]!
                    ) {
                        mgrUpdate_S0205_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            // console.log("mgrInsert_S0205_5 call succeed: " + data.mgrInsert_S0205_5);
            return data.mgrUpdate_S0205_5;
        } catch (e) {
            // console.log("async mgrUpdate_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    async mgrDelete_PI_MST(argIn1, argIn2) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0205_5(
                        $datas: I_S0205_5_1!
                        $datas1: [I_S0205_5_2!]!
                    ) {
                        mgrDelete_S0205_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argIn1,
                    datas1: argIn2,
                },
            });
            // console.log("mgrInsert_S0205_5 call succeed: " + data.mgrInsert_S0205_5);
            return data.mgrDelete_S0205_5;
        } catch (e) {
            // console.log("async mgrInsert_KSV_ORDER_MST  call error: ");
            return e;
        }
    }

    // SERVICE: TBL_KCD_VENDOR

    async mgrQuery_CODE(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0205_1_CODE($data: I_S0205_CODE!) {
                        mgrQueryS0205_1_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            PI_ORIGIN {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            STATUS_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TOLENCE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            ORIGIN_PORT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            LOADING_PORT {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PART_SHIP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            TRANS_SHIP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0205_1_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0205_2_1($data: I_S0205_2_1!) {
                        mgrQueryS0205_2_1(data: $data) {
                            PI_CD
                            MESSERS
                            ADDR1
                            ADDR2
                            CONSIGNEE
                            CADDR1
                            CADDR2
                            PRICE_TERM
                            DESTINATION
                            PORT
                            BANK_CD
                            PAY_TYPE_CD
                            BVT_FLAG
                            PI_REMARK1
                            PI_REMARK2
                            PI_REMARK3
                            PI_REMARK4
                            PI_REMARK5
                            PI_REMARK6
                            PI_REMARK7
                            PI_REMARK8
                            YY
                            SEQ
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            PAY_RULE
                            id
                            BUYER_CD
                            QTY
                            AMT
                            BUYER_NAME
                            STATUS_NAME
                            FILE_NAME
                            FILE_URL
                            FILE_OBJECT
                            SHIP_ADDR1
                            SHIP_ADDR2
                            SHIP_ADDR3
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0205_2_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_1(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0205_4_1($data: I_S0205_4_1!) {
                        mgrQueryS0205_4_1(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                            NAT_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0205_4_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PI_PRINT(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0205_EXCEL_PI_PRINT($data: I_S0205_4_1!) {
                        mgrQueryS0205_EXCEL_PI_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0205_EXCEL_PI_PRINT;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_2(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0205_4_2($data: I_S0205_4_2!) {
                        mgrQueryS0205_4_2(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                            NAT_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0205_4_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2_3(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0205_4_3($data: I_S0205_4_3!) {
                        mgrQueryS0205_4_3(data: $data) {
                            REF_ORDER_NO
                            PO_CD
                            BUYER_NAME
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            TOT_CNT
                            UNIT
                            PRICE_TERM
                            AVR_PRICE
                            AMT
                            CURR_CD
                            DUE_DATE
                            ORDER_CD2
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0205_4_3;
        } catch (e) {
            return e;
        }
    }
}
