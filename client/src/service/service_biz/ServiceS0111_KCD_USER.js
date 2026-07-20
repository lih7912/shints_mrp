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

export class ServiceS0111_KCD_USER {
    // SERVICE: EDT_KCD_USER

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsertEDT_KCD_USER(argRetArray) {
        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0111_KCD_USER_EDT_KCD_USER(
                        $datas: [I_S0111_KCD_USER_EDT_KCD_USER!]!
                    ) {
                        mgrInsert_S0111_KCD_USER_EDT_KCD_USER(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S0111_KCD_USER_EDT_KCD_USER;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KCD_USER(argRetArray) {
        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0111_KCD_USER_EDT_KCD_USER(
                        $datas: [I_S0111_KCD_USER_EDT_KCD_USER!]!
                    ) {
                        mgrUpdate_S0111_KCD_USER_EDT_KCD_USER(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrUpdate_S0111_KCD_USER_EDT_KCD_USER;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KCD_USER(argRetArray) {
        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0111_KCD_USER_EDT_KCD_USER(
                        $datas: [I_S0111_KCD_USER_EDT_KCD_USER!]!
                    ) {
                        mgrDelete_S0111_KCD_USER_EDT_KCD_USER(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrDelete_S0111_KCD_USER_EDT_KCD_USER;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_USER

    async mgrQueryTBL_KCD_USER(argQRY_KCD_USER) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_USER(
                        $data: I_S0111_KCD_USER_QRY_KCD_USER!
                    ) {
                        mgrQuery_S0111_KCD_USER_TBL_KCD_USER(data: $data) {
                            id
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_NAME
                            FACTORY_CD
                            PART_NAME
                            PART
                            RANK_NAME
                            RANK
                            EMAIL
                            TEL_NO
                            CELLULAR
                            EMP_NO
                            BUYER_TEAM
                            USER_LEVEL
                            STATUS_NAME
                            STATUS_CD
                            company_code
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_USER,
                },
            });
            console.log(
                "mgrQuery_S0111_KCD_USER_TBL_KCD_USER:" +
                    data.mgrQuery_S0111_KCD_USER_TBL_KCD_USER.length,
            );
            return data.mgrQuery_S0111_KCD_USER_TBL_KCD_USER;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_USERMENU

    async mgrQueryTBL_KCD_USERMENU(argQRY_KCD_USERMENU) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_USERMENU(
                        $data: I_S0111_KCD_USER_QRY_KCD_USERMENU!
                    ) {
                        mgrQuery_S0111_KCD_USER_TBL_KCD_USERMENU(data: $data) {
                            USER_ID
                            MENU_ID
                            MENU_NAME
                            AUTH_FLAG
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_USERMENU,
                },
            });
            console.log(
                "mgrQuery_S0111_KCD_USER_TBL_KCD_USERMENU:" +
                    data.mgrQuery_S0111_KCD_USER_TBL_KCD_USERMENU.length,
            );
            return data.mgrQuery_S0111_KCD_USER_TBL_KCD_USERMENU;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_USER_BUYER(argQRY_KCD_USER_BUYER) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_USER_BUYER(
                        $data: I_S0111_KCD_USER_QRY_KCD_USER_BUYER!
                    ) {
                        mgrQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER(
                            data: $data
                        ) {
                            id
                            BUYER_CD
                            FACTORY
                            TEAM
                            USER_ID
                            USER_NAME
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_USER_BUYER,
                },
            });
            console.log(
                "mgrQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER:" +
                    data.mgrQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER.length,
            );
            return data.mgrQuery_S0111_KCD_USER_TBL_KCD_USER_BUYER;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_USER_CODE() {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0111_KCD_USER_CODE {
                        mgrQuery_S0111_KCD_USER_CODE {
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
                            STATUS_CD {
                                CD_NAME
                                CD_GROUP
                                CD_CODE
                                CD_FLAG
                                id
                            }
                            PART {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            RANK {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0111_KCD_USER_CODE:" +
                    data.mgrQuery_S0111_KCD_USER_CODE.STATUS_CD.length,
            );
            return data.mgrQuery_S0111_KCD_USER_CODE;
        } catch (e) {
            return e;
        }
    }
}
