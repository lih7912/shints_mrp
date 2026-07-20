/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0609_MANAGE_RETURN_TAX {
    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsertEDT_KSV_INVOICE_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST(
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
            return data.mgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST;
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
                    mutation MgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST(
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
            return data.mgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST;
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
                    mutation MgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST!]!
                    ) {
                        mgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST(
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
            return data.mgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST;
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
                    mutation MgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1(
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
            return data.mgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1;
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
                    mutation MgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1(
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
            return data.mgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1;
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
                    mutation MgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1!]!
                    ) {
                        mgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1(
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
            return data.mgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST1;
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
                    mutation MgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2!]!
                    ) {
                        mgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2(
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
            return data.mgrInsert_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2;
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
                    mutation MgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2!]!
                    ) {
                        mgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2(
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
            return data.mgrUpdate_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2;
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
                    mutation MgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2(
                        $datas: [I_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2!]!
                    ) {
                        mgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2(
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
            return data.mgrDelete_S0609_MANAGE_RETURN_TAX_EDT_KSV_INVOICE_MST2;
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
                        $data: I_S0609_MANAGE_RETURN_TAX_QRY_KSV_INVOICE_MST!
                    ) {
                        mgrQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST(
                            data: $data
                        ) {
                            TAX_NO
                            VENDOR_NAME
                            ITEM_NAME
                            IMPORT_DATE
                            TAX_AMT
                            RETURN_AMT
                            IS_RETURN
                            REASION
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            console.log(
                "marQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST:" +
                    data.mgrQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST
                        .length,
            );
            return data.mgrQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST;
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
                        $data: I_S0609_MANAGE_RETURN_TAX_QRY_KSV_INVOICE_MST1!
                    ) {
                        mgrQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST1(
                            data: $data
                        ) {
                            IN_DATE
                            EXPORT_INVOICE_NO
                            RETURN_DATE
                            RETURN_TAX
                            TAX_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            console.log(
                "marQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST1:" +
                    data.mgrQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST1
                        .length,
            );
            return data.mgrQuery_S0609_MANAGE_RETURN_TAX_TBL_KSV_INVOICE_MST1;
        } catch (e) {
            return e;
        }
    }
}
