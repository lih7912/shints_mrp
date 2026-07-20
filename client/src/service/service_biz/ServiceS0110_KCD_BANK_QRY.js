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

export class ServiceS0110_KCD_BANK_QRY {
    // SERVICE: EDT_KSV_INVOICE_MST
    async mgrInsert_INSERT_BANK(argData1) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0110_5($datas1: INPUT_S0110_5_3!) {
                        mgrInsert_S0110_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrInsert_S0110_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_BANK(argData1) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0110_5($datas1: INPUT_S0110_5_3!) {
                        mgrUpdate_S0110_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrUpdate_S0110_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_UPDATE_VENDOR(argData1, argData2) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S0110_5_1(
                        $datas1: INPUT_S0110_5_3!
                        $datas2: INPUT_S0110_5_1!
                    ) {
                        mgrUpdate_S0110_5_1(datas1: $datas1, datas2: $datas2) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                    datas2: argData2,
                },
            });
            return data.mgrUpdate_S0110_5_1;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_BANK(argData1) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0110_5($datas1: INPUT_S0110_5_2!) {
                        mgrDelete_S0110_5(datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas1: argData1,
                },
            });
            return data.mgrDelete_S0110_5;
        } catch (e) {
            return e;
        }
    }

    async mgrInsert_DELETE_VENDOR(argData) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S0110_5_1($datas: INPUT_S0110_5_2!) {
                        mgrDelete_S0110_5_1(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argData,
                },
            });
            return data.mgrDelete_S0110_5_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_KSV_INVOICE_MST) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0110_CODE($data: I_S0110_1!) {
                        mgrQueryS0110_CODE(data: $data) {
                            BANK_TYPE1 {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            QRY_STATUS_CD {
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
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST,
                },
            });
            return data.mgrQueryS0110_CODE;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_INVOICE_MST1

    async mgrQuery_LIST_1(argQRY_KSV_INVOICE_MST1) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0110_1($data: I_S0110_1!) {
                        mgrQueryS0110_1(data: $data) {
                            BANK_CD
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            SFTCODE
                            ADDR1
                            ADDR2
                            BANK_TYPE
                            BANK_TYPE1
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK_BRANCH
                            id
                            FILE_NAME
                            STATUS_CD_N
                            fileName
                            fileUrl
                            objectName
                            bank_typeName
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0110_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_2(argQRY_KSV_INVOICE_MST1) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0110_2($data: I_S0110_2!) {
                        mgrQueryS0110_2(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                            id
                            VENDOR_TYPE_N
                            GW_N
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0110_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_3(argQRY_KSV_INVOICE_MST1) {
        const serviceLib = new ServiceLib();
        const client = serviceLib.getApolloClient();

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQueryS0110_3($data: I_S0110_3!) {
                        mgrQueryS0110_3(data: $data) {
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                            id
                            VENDOR_TYPE_N
                            GW_N
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_INVOICE_MST1,
                },
            });
            return data.mgrQueryS0110_3;
        } catch (e) {
            return e;
        }
    }
}
