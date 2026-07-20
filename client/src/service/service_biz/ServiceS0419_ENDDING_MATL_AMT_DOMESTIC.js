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

const pickS0419_5_1 = (item = {}) => ({
    IN_DATE: item.IN_DATE,
    STSIN_CD: item.STSIN_CD,
    IN_QTY: item.IN_QTY,
    LC_QTY: item.LC_QTY,
    BUYER_NAME: item.BUYER_NAME,
    BUYER_CD: item.BUYER_CD,
    PU_CD: item.PU_CD,
    PO_CD2: item.PO_CD2,
    VENDOR_CD: item.VENDOR_CD,
    VENDOR_NAME: item.VENDOR_NAME,
    VENDOR_TYPE: item.VENDOR_TYPE,
    TARGET_ETA: item.TARGET_ETA,
    READY_DATE: item.READY_DATE,
    PAY_DATE: item.PAY_DATE,
    CURR_CD: item.CURR_CD,
    DEPOSIT_AMT: item.DEPOSIT_AMT,
    LC_FLAG: item.LC_FLAG,
    LC_AMT: item.LC_AMT,
    PO_AMT: item.PO_AMT,
    PAY_AMT: item.PAY_AMT,
    PAY_BANK: item.PAY_BANK,
    PURCHARGER: item.PURCHARGER,
    BILL_CD: item.BILL_CD,
    END_AMT: item.END_AMT,
    BAL_AMT: item.BAL_AMT,
    PUR_APP: item.PUR_APP,
    TT_FLAG: item.TT_FLAG,
    PUR_FACTORY: item.PUR_FACTORY,
    END_DATE: item.END_DATE,
    PAY_REPORT: item.PAY_REPORT,
    COMPANY_CODE: item.COMPANY_CODE,
    PAY_PRICE: item.PAY_PRICE,
});

const pickS0419_5_2 = (item = {}) => ({
    BILL_CD: item.BILL_CD,
    VENDOR_CD: item.VENDOR_CD,
    PAY_BANK: item.PAY_BANK,
    REG_USER: item.REG_USER,
    INVOICE_DATE: item.INVOICE_DATE,
    CURR_CD: item.CURR_CD,
    PO_AMT: item.PO_AMT,
    DEPOSIT_AMT: item.DEPOSIT_AMT,
    DEBIT_AMT: item.DEBIT_AMT,
    DISCOUNT_AMT: item.DISCOUNT_AMT,
    PAY_DATE: item.PAY_DATE,
    VAT_AMT: item.VAT_AMT,
    PAY_AMT: item.PAY_AMT,
    END_AMT: item.END_AMT,
    TAX_KIND: item.TAX_KIND,
    IS_TT: item.IS_TT,
    IS_LC: item.IS_LC,
    PUR_FACTORY: item.PUR_FACTORY,
    INVOICE_NO: item.INVOICE_NO,
});

export class ServiceS0419_ENDDING_MATL_AMT_DOMESTIC {
    client;
    constructor(height, width) {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    // SERVICE: TBL_KSV_STOCK_IN
    async mgrInsert_ENDDING_MATL(argRetArray, argRetArray2) {
        try {
            const datas = Array.isArray(argRetArray)
                ? argRetArray.map(pickS0419_5_1)
                : [];
            const datas1 = pickS0419_5_2(argRetArray2);

            const { loading, error, data } = await this.client.mutate({
                mutation: gql`
                    mutation MgrInsert_S0419_5(
                        $datas: [I_S0419_5_1!]!
                        $datas1: I_S0419_5_2!
                    ) {
                        mgrInsert_S0419_5(datas: $datas, datas1: $datas1) {
                            CODE
                            id
                        }
                    }
                `,
                variables: {
                    datas,
                    datas1,
                },
            });
            return data.mgrInsert_S0419_5;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_CODE(argQRY_) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0419_CODE($data: I_S0419_1!) {
                        mgrQueryS0419_CODE(data: $data) {
                            BANK_CD {
                                BANK_NAME
                                BANK_CD
                            }
                            BUYER_CD {
                                BUYER_NAME
                                BUYER_CD
                            }
                            VENDOR_CD {
                                VENDOR_CD
                                VENDOR_NAME
                            }
                            TAX_KIND {
                                CD_CODE
                                CD_NAME
                            }
                            VENDOR_TYPE {
                                CD_CODE
                                CD_NAME
                            }
                            PUR_FACTORY {
                                WARE_CD
                                WARE_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0419_CODE;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_ENDDING_MATL(argQRY_) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0419_2($data: I_S0419_2!) {
                        mgrQueryS0419_2(data: $data) {
                            PO_CD
                            BUYER_CD
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            TOT_QTY
                            IN_QTY
                            IN_CURR_CD
                            IN_PRICE
                            PAY_CURR_CD
                            PAY_PRICE
                            MATL_PRICE
                            TT_FLAG
                            WARE_NAME
                            IN_AMT
                            END_FLAG
                            END_DATE
                            PAY_DATE
                            BILL_FLAG
                            BILL_DATE
                            VENDOR_NAME
                            PO_SEQ
                            ORDER_CD
                            MRP_SEQ
                            IN_DATETIME
                            MATL_SEQ
                            CALC_FLAG
                            VENDOR_CD
                            PUR_FACTORY
                            PAY_REPORT
                            VENDOR_TYPE
                        }
                    }
                `,
                variables: {
                    data: argQRY_,
                },
            });
            return data.mgrQueryS0419_2;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_1(argQRY_KCD_VENDOR) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0419_LIST_1($data: I_S0419_LIST_1!) {
                        mgrQueryS0419_LIST_1(data: $data) {
                            IN_DATE
                            STSIN_CD
                            PU_CD
                            BUYER_NAME
                            BUYER_CD
                            PU_CD
                            PO_CD2
                            VENDOR_CD
                            VENDOR_NAME
                            PAY_TERM
                            TARGET_ETA
                            READY_DATE
                            PAY_DATE
                            CURR_CD
                            DEPOSIT_AMT
                            LC_FLAG
                            LC_AMT
                            PO_AMT
                            PAY_AMT
                            END_AMT
                            PAY_BANK
                            PURCHARGER
                            VENDOR_TYPE
                            BILL_CD
                            PUR_APP
                            TT_FLAG
                            PUR_FACTORY
                            END_DATE
                            PAY_REPORT
                            IN_QTY
                            LC_QTY
                            COMPANY_CODE
                            PAY_BANK_ARRAY {
                                BANK_CD
                                BANK_NAME
                            }
                            BILL_MST {
                                PAY_DATE
                                PO_AMT
                                DEPOSIT_AMT
                                LC_AMT
                                DEBIT_AMT
                                DISCOUNT_AMT
                                VAT_AMT
                                PAY_AMT
                                PAY_BANK
                                TAX_KIND
                            }
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_VENDOR,
                },
            });
            return data.mgrQueryS0419_LIST_1;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_DETAIL(argData) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0419_LIST_DETAIL(
                        $data: [I_S0419_LIST_DETAIL!]!
                    ) {
                        mgrQueryS0419_LIST_DETAIL(data: $data) {
                            datas {
                                PU_CD
                                PO_CD
                                PO_SEQ
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                TOT_QTY
                                IN_QTY
                                LC_QTY
                                IN_CURR_CD
                                IN_PRICE
                                IN_DATETIME
                                PAY_DATE
                                END_FLAG
                                END_DATE
                                PAY_REPORT
                                CALC_FLAG
                                STSIN_CD
                                BILL_NO
                                TAX
                            }
                            datas1 {
                                DC_AMOUNT
                                DN_AMOUNT
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0419_LIST_DETAIL;
        } catch (e) {
            return e;
        }
    }

    async mgrQuery_LIST_INFO(argData) {
        try {
            const { loading, error, data } = await this.client.query({
                query: gql`
                    query MgrQueryS0419_LIST_INFO($data: I_S0419_LIST_INFO!) {
                        mgrQueryS0419_LIST_INFO(data: $data) {
                            BILL_LIST {
                                BUYER_CD
                                BUYER_NAME
                                PU_CD
                                PO_CD
                                VENDOR_CD
                                VENDOR_NAME
                                VENDOR_TYPE
                                MATL_CD
                                MATL_NAME
                                COLOR
                                SPEC
                                UNIT
                                CURR_CD
                                PO_QTY
                                PO_PRICE
                                PO_AMT
                                PAY_DATE
                                REG_USER
                                PAY_BANK
                                PAY_BANK2
                                INVOICE_DATE
                                VAT_AMT
                                PAY_AMT
                                PAYER
                                DEPOSIT_AMT
                                PU_AMT
                                DEPOSIT_RATE
                                LC_FLAG
                                LC_AMT
                                STSIN_CD
                                PERMIT
                                FACTORY_CD
                                PAY_REPORT
                            }
                            BILL_MST {
                                BILL_CD
                                INVOICE_DATE
                                PAY_DATE
                                CURR_CD
                                PO_AMT
                                DEPOSIT_AMT
                                LC_AMT
                                DEBIT_AMT
                                DISCOUNT_AMT
                                VAT_AMT
                                PAY_AMT
                                REG_USER
                                REG_DATETIME
                                TAX_KIND
                                VENDOR_CD
                                GW_STATUS
                                PAY_BANK
                            }
                            BANK_ARRAY {
                                BANK_CD
                                BANK_NAME
                            }
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });
            return data.mgrQueryS0419_LIST_INFO;
        } catch (e) {
            return e;
        }
    }
}
