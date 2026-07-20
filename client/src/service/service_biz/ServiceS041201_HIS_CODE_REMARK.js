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

export class ServiceS041201_HIS_CODE_REMARK {
    // SERVICE: EDT_KSV_STOCK_OUT
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    async mgrInsert_HS_CODE(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S041201_5($datas: [I_S041201_5!]!) {
                        mgrInsert_S041201_5(datas: $datas) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas: argRetArray,
                },
            });
            return data.mgrInsert_S041201_5;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT(
                        $datas: [I_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrUpdate_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT(
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
            return data.mgrUpdate_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_STOCK_OUT(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrDelete_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT(
                        $datas: [I_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT!]!
                    ) {
                        mgrDelete_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT(
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
            return data.mgrDelete_S041201_HIS_CODE_REMARK_EDT_KSV_STOCK_OUT;
        } catch (e) {
            return e;
        }
    }

    //

    async mgrQuery_CODE(argQRY_KCD_STYLE) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS041201_CODE($data: I_S041201_1!) {
                        mgrQueryS041201_CODE(data: $data) {
                            HS_CODE {
                                HS_NO
                                HS_CD
                                HS_NAME
                                id
                            }
                            HS_COMP {
                                MATL_CD
                                MATL_NAME
                                VENDOR_CD
                                MATL_TYPE
                                SEQ
                                COLOR
                                SPEC
                                UNIT
                                HS_CD
                                WEIGHT
                                BOX_UNIT
                                COUNTRY
                                ADD_RATE
                                ADD_AMT
                                PERMIT_COMPO1
                                PERMIT_COMPO2
                                PERMIT_COMPO3
                                PERMIT_DETAIL
                                COUNT_FLAG
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                BVT_MATL_NAME
                                MATL_TYPE2
                                WIDTH
                                old_vendor_cd
                                rep_matl_cd
                                add_loss
                                id
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_STYLE,
                },
            });
            console.log(
                "mgrQueryS041201_CODE:" +
                    data.mgrQueryS041201_CODE.HS_CODE.length,
            );
            return data.mgrQueryS041201_CODE;
        } catch (e) {
            return e;
        }
    }
}
