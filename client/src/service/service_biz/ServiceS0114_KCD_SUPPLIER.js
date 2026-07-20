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

export class ServiceS0114_KCD_SUPPLIER {
    // SERVICE: TBL_KCD_FACTORY

    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrQueryTBL_KCD_VENDOR(argQRY_KCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0114_1($data: I_S0114_1!) {
                        mgrQueryS0114_1(data: $data) {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE_NAME
                            VENDOR_TYPE
                            VENDOR_MATL_TYPE_NAME
                            VENDOR_MATL_TYPE
                            GW_STATUS_NAME
                            GW
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            NAT_NAME
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_NAME
                            STATUS_CD
                            REG_USER
                            UPD_USER
                            PERMIT
                            APPROKEY
                            NEOE_NO
                            LEAD_TIME
                            REMARK
                            OVERSHORT_RATE
                            imgURL
                            fileName
                            objectName
                            payCondition
                            NSR_TR_CD
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            console.log("mgrQueryS0114_1:" + data.mgrQueryS0114_1.length);
            return data.mgrQueryS0114_1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KCD_FACTORY

    async mgrQueryTBL_KCD_VENDOR_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0114_KCD_VENDOR_CODE {
                        mgrQuery_S0114_KCD_VENDOR_CODE {
                            STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            VENDOR_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            PAY_TERM {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            PERMIT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            VENDOR_MATL_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            NAT_CD {
                                id
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                            }
                            SHINTS_USER {
                                id
                                USER_ID
                                PASSWD
                                USER_NAME
                                FACTORY_CD
                                PART
                                RANK
                                EMAIL
                                USER_LEVEL
                                STATUS_CD
                                AUTH_KEY
                                ID_RSA
                                TEL_NO
                                EXCEL
                                BUYER_TEAM
                                CELLULAR
                                EMP_NO
                            }
                            GW_STATUS {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            OVERSHORT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
            });
            console.log(
                "mgrQuery_S0114_KCD_SUPPLIER_CODE:" +
                    data.mgrQuery_S0114_KCD_VENDOR_CODE.STATUS_CD.length,
            );
            return data.mgrQuery_S0114_KCD_VENDOR_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryTBL_KCD_BANK_VENDOR(argVENDOR_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQuery_S0114_KCD_BANK_VENDOR($vendorCd: String!) {
                        mgrQuery_S0114_KCD_BANK_VENDOR(VENDOR_CD: $vendorCd) {
                            id
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            BANK_TYPE1
                            FILENAME
                            GW
                            GW_N
                        }
                    }
                `,
                variables: {
                    vendorCd: argVENDOR_CD,
                },
            });
            console.log(
                "mgrQuery_S0114_KCD_SUPPLIER_CODE:" +
                    data.mgrQuery_S0114_KCD_BANK_VENDOR.length,
            );
            return data.mgrQuery_S0114_KCD_BANK_VENDOR;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_S0114_KCD_VENDOR_SAVE(argKCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0114_KCD_VENDOR_SAVE(
                        $datas: I_S0114_KCD_VENDOR_SAVE!
                    ) {
                        mgrInsert_S0114_KCD_VENDOR_SAVE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argKCD_VENDOR,
                },
            });
            return data.mgrInsert_S0114_KCD_VENDOR_SAVE;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_S0114_KCD_VENDOR_DELETE(argKCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0114_KCD_VENDOR_DELETE(
                        $datas: I_S0114_KCD_VENDOR_SAVE!
                    ) {
                        mgrInsert_S0114_KCD_VENDOR_DELETE(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argKCD_VENDOR,
                },
            });

            return data.mgrInsert_S0114_KCD_VENDOR_DELETE;
        } catch (err) {
            return err;
        }
    }
}
