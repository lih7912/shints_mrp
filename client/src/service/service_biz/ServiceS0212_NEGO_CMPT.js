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

export class ServiceS0212_NEGO_CMPT {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: EDT_KSV_ORDER_CMPT
    async mgrInsert_NEGO_PRESENT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0212_NEGO_PRESENT(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrInsert_S0212_NEGO_PRESENT(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0212_NEGO_PRESENT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_NEGO_GET_PHERQDL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0212_NEGO_GET_PHERQDL(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrInsert_S0212_NEGO_GET_PHERQDL(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0212_NEGO_GET_PHERQDL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_NEGO_ACCEPT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0212_NEGO_ACCEPT(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrInsert_S0212_NEGO_ACCEPT(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0212_NEGO_ACCEPT;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_NEGO_CANCEL(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0212_NEGO_CANCEL(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrInsert_S0212_NEGO_CANCEL(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0212_NEGO_CANCEL;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_NEGO_RESET(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0212_NEGO_RESET(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrInsert_S0212_NEGO_RESET(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0212_NEGO_RESET;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_CMPT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrUpdate_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT(
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
            return data.mgrUpdate_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_CMPT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT(
                        $datas: [I_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT!]!
                    ) {
                        mgrDelete_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT(
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
            return data.mgrDelete_S0212_NEGO_CMPT_EDT_KSV_ORDER_CMPT;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_CMPT
    async mgrQueryTBL_KSV_ORDER_CMPT_CODE(argQRY_KSV_ORDER_CMPT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0212_NEGO_CMPT_CODE {
                        mgrQuery_S0212_NEGO_CMPT_CODE {
                            FACTORY_CD {
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
                                id
                            }
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                                BUYER_ABBR
                                BUYER_TEAM
                                SHINTS_USER
                                USER_NAME
                                EMAIL
                                TEL_NO
                                FAX_NO
                                ZIP_NO
                                ADDR1
                                ADDR2
                                COMM_FLAG
                                SALES_TEAM
                                NAT_CD
                                BANK_CD
                                STS_FLAG
                                BVT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                NEOE_BUYER_CD_MOM
                                NEOE_BUYER_CD
                                NEOE_A23
                                loss_flag
                                glove_flag
                                MOM_CD
                                BUYER_TYPE
                                PAY_RULE
                                id
                            }
                            NEGO_TYPE {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            PO_CD {
                                id
                                PO_CD
                                PO_STATUS
                                PO_STATUS_NAME
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0212_NEGO_CMPT_CODE:" +
                    data.mgrQuery_S0212_NEGO_CMPT_CODE.PO_CD.length,
            );
            return data.mgrQuery_S0212_NEGO_CMPT_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KSV_ORDER_CMPT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0212_LIST_1(
                        $data: I_S0212_NEGO_CMPT_QRY_KSV_ORDER_CMPT!
                    ) {
                        mgrQuery_S0212_LIST_1(data: $data) {
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            STYLE_CD
                            DUE_DATE
                            TOT_CNT
                            PRICE
                            LOC
                            CMPT
                            SCREEN_PRINT
                            HEAT_SILICON
                            EMBROIDERY
                            TPR
                            WELDING
                            QUILTING
                            DIGITAL_PRINT
                            LABEL_PRINT
                            SUB_TOTAL_COST
                            LOCAL
                            LINE_CHARGE
                            TOTAL_COST
                            NEGO_TYPE_N
                            REMARK
                            NEGO_TYPE
                            STS_CMPT
                            ORDER_STATUS
                            NEGO_SEQ
                            FACTORY_CD
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_CMPT,
                },
            });
            return data.mgrQuery_S0212_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_NEGO_HISTORY(argQRY_KSV_ORDER_CMPT) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_NEGO_HISTORY($data: I_S0212_NEGO_HISTORY!) {
                        mgrQuery_S0212_NEGO_HISTORY(data: $data) {
                            NEGO_SEQ
                            CMPT
                            CD_NAME
                            STS_CMPT
                            REMARK
                            REG_USER
                            REG_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_CMPT,
                },
            });
            return data.mgrQuery_S0212_NEGO_HISTORY;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_EXCEL_PRINT(argData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0212_EXCEL_PRINT(
                        $data: I_S0212_EXCEL_PRINT!
                    ) {
                        mgrQuery_S0212_EXCEL_PRINT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQuery_S0212_EXCEL_PRINT;
        } catch (e) {
            return e;
        }
    }
}
