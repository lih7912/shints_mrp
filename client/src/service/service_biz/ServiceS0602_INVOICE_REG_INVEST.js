/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0602_INVOICE_REG_INVEST {
    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsertEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST(
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
            return data.mgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST(
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
            return data.mgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST(
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
            return data.mgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KSV_INVOICE_MST1
    async mgrInsertEDT_KSV_INVOICE_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1(
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
            return data.mgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1(
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
            return data.mgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1(
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
            return data.mgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KSV_INVOICE_MST2
    async mgrInsertEDT_KSV_INVOICE_MST2(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2!]!
                    ) {
                        mgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2(
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
            return data.mgrInsert_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_INVOICE_MST2(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2!]!
                    ) {
                        mgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2(
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
            return data.mgrUpdate_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_INVOICE_MST2(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2(
                        $datas: [I_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2!]!
                    ) {
                        mgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2(
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
            return data.mgrDelete_S0602_INVOICE_REG_INVEST_EDT_KSV_INVOICE_MST2;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST

    async mgrQueryTBL_KSV_INVOICE_MST(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST(
                        $data: I_S0602_INVOICE_REG_INVEST_QRY_KSV_INVOICE_MST!
                    ) {
                        mgrQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST(
                            data: $data
                        ) {
                            BUYER_NAME
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            SHIP_QTY
                            FOB
                            S_PRICE
                            SHIP_PRICE
                            SHIP_AMT
                            FACTORY_NAME
                            INVOICE_NO
                            SEQ
                            EXFACTORY
                            SHIP_DATE
                            SHIP_PTTYPE
                            NAT_CD
                            DELIVERY_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            console.log(
                "marQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST:" +
                    data.mgrQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST
                        .length,
            );
            return data.mgrQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQueryTBL_KSV_INVOICE_MST1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_INVOICE_MST1(
                        $data: I_S0602_INVOICE_REG_INVEST_QRY_KSV_INVOICE_MST1!
                    ) {
                        mgrQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST1(
                            data: $data
                        ) {
                            BUYER_NAME
                            NAT_NAME
                            INVOICE_NO
                            PO_CD
                            ORDER_CD
                            STYLE_NAME
                            SHIP_PROD_TYPE
                            DELIVERY_TYPE
                            SHIP_QTY
                            FOB
                            FACTORY_NAME
                            FACTORY_CD
                            NAT_CD
                            DELIVERY_TYPE
                            SHIP_PTTYPE
                            SHIP_DATE
                            ORDER_STATUS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            console.log(
                "marQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST1:" +
                    data.mgrQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST1
                        .length,
            );
            return data.mgrQuery_S0602_INVOICE_REG_INVEST_TBL_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }
}
