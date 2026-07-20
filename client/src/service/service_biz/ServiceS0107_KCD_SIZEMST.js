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

export class ServiceS0107_KCD_SIZEMST {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsert_INSERT_SIZEMST(argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0107_5($datas1: I_S0107_SIZE_MST!) {
                        mgrInsert_S0107_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0107_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_SIZEMST(argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0107_5($datas1: I_S0107_SIZE_MST!) {
                        mgrUpdate_S0107_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrUpdate_S0107_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_SIZEMST(argData1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0107_5($datas1: I_S0107_SIZE_MST!) {
                        mgrDelete_S0107_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrDelete_S0107_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0107_CODE($data: I_S0107_1!) {
                        mgrQueryS0107_CODE(data: $data) {
                            BUYER_CD {
                                BUYER_CD
                                BUYER_NAME
                            }
                            STATUS_CD {
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
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0107_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0107_1($data: I_S0107_1!) {
                        mgrQueryS0107_1(data: $data) {
                            SIZE_GROUP
                            SIZE_GROUP_NAME
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            BUYER_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            id
                            STATUS_CD_N
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0107_1;
        } catch (e) {
            return e;
        }
    }
}
