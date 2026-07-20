/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgr1KCD_BANK {
    async mgr1KsvOrderMstQuery(argOrderCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KsvOrderMstQuery($orderCd: String!) {
                        mgr1KsvOrderMstQuery(ORDER_CD: $orderCd) {
                            T_KSV_ORDER_MST {
                                id
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                            }
                            T_KSV_ORDER_MST_DZ {
                                id
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                            }
                            T_KSV_ORDER_MST_CHILD {
                                id
                                ORDER_CD
                                STYLE_CD
                                ORDER_TYPE
                                YY
                                SEQ
                                TOT_CNT
                                ADD_CNT
                                AVR_PRICE
                                FC_BEF
                                FC_PRICE
                                MATL_AMT
                                ETC_AMT
                                COMMISSION
                                COMM1
                                COMM2
                                OVER_FLAG
                                OVER_QTY
                                OVER_AMT
                                OVER_BILL
                                CURR_CD
                                USD_PRICE
                                ORDER_DATE
                                DUE_DATE
                                MATL_DUE_DATE
                                NAT_CD
                                FACTORY_CD
                                SIZE_GROUP
                                ORDER_FLAG
                                SAMPLE_FLAG
                                MATL_SALE_FLAG
                                FAC_LC_FLAG
                                FAC_TT_FLAG
                                ORDER_STATUS
                                END_DATETIME
                                REMARK
                                REF_ORDER_NO
                                REF_NO
                                REF_Q_OUTER
                                REF_Q_LINER
                                REF_ORDER_REQ
                                REF_COLOR1
                                REF_COLOR2
                                REF_SIZE1
                                REF_SIZE2
                                REF_QTY1
                                REF_QTY2
                                MATL_PAY_FLAG
                                MATL_PAY_USER
                                MATL_PAY_DATETIME
                                FC_NEGO_TYPE
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                                APPROVAL_USER
                                APPROVAL_DATETIME
                                brand
                                season
                                krw_flag
                                krw_matl_amt
                                margin
                                frt_check
                                category
                                ORG_DUE_DATE
                                BUYER_TEAM
                                SAMPLE_COST_FLAG
                                DL_FLAG
                                TRADE_PRICE
                                LINE_CHARGE_PRICE
                                DUTY
                                mid_size1
                                mid_size2
                                mid_size3
                                mid_size4
                                END_STATUS
                                FC_PRICE2
                                CANCEL_DATETIME
                                PO_MATL_AMT
                            }
                            T_KSV_ORDER_MEM {
                                id
                                ORDER_CD
                                PROD_CD
                                ADD_FLAG
                                PRICE
                                TOT_CNT
                                SIZE_CNT
                                OLD_PROD_CD
                                end_price
                                barcode
                                MID_SIZE
                                MID_SIZE_QTY
                                SIZE_LOSS
                            }
                        }
                    }
                `,
                variables: {
                    orderCd: argOrderCd,
                },
            });
            console.log(
                "MGR1_KCD_BANK_CODE:" +
                    data.mgr1KsvOrderMstQuery.T_KSV_ORDER_MST.length,
            );
            return data.mgr1KsvOrderMstQuery;
        } catch (e) {
            return e;
        }
    }

    async mgr1KsvOrderMstStyle(argStyleName) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KsvOrderMstStyle($styleName: String!) {
                        mgr1KsvOrderMstStyle(STYLE_NAME: $styleName) {
                            id
                            DL
                            STYLE_CD
                            STYLE_NAME
                            BUYER_CD
                            BUYER_NAME
                        }
                    }
                `,
                variables: {
                    styleName: argStyleName,
                },
            });
            console.log(
                "MGR1_KCD_BANK_CODE:" + data.mgr1KsvOrderMstStyle.length,
            );
            return data.mgr1KsvOrderMstStyle;
        } catch (e) {
            return e;
        }
    }

    async mgr1KsvOrderMstSizeMem(argSizeGroup) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KsvOrderMstSizeMem($sizeGroup: String!) {
                        mgr1KsvOrderMstSizeMem(SIZE_GROUP: $sizeGroup) {
                            id
                            SIZE_GROUP
                            SIZE_SEQ
                            SIZE_VAL
                            UNIT_RATE
                        }
                    }
                `,
                variables: {
                    sizeGroup: argSizeGroup,
                },
            });
            console.log(
                "MGR1_KCD_BANK_CODE:" + data.mgr1KsvOrderMstSizeMem.length,
            );
            return data.mgr1KsvOrderMstSizeMem;
        } catch (e) {
            return e;
        }
    }

    async mgr1KsvOrderMstCode(argKind1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KsvOrderMstCode($kind1: String!) {
                        mgr1KsvOrderMstCode(KIND1: $kind1) {
                            T_KCD_CODE_STYLE_DL {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_FACTORY {
                                id
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
                            }
                            T_KCD_CODE_CURR_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_NATION {
                                id
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                            }
                            T_KCD_SIZE_MST {
                                id
                                SIZE_GROUP
                                SIZE_MEMBER
                                SIZE_CNT
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                UPD_USER
                                UPD_DATETIME
                            }
                        }
                    }
                `,
                variables: { kind1: argKind1 },
            });
            return data.mgr1KsvOrderMstCode;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdSizeMst(argSizeGroup, argStatusCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdSizeMst(
                        $sizeGroup: String!
                        $statusCd: String!
                    ) {
                        mgr1KcdSizeMst(
                            SIZE_GROUP: $sizeGroup
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            SIZE_GROUP
                            SIZE_MEMBER
                            SIZE_CNT
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                        }
                    }
                `,
                variables: {
                    sizeGroup: argSizeGroup,
                    statusCd: argStatusCd,
                },
            });
            console.log("MGR1_KCD_BUYER:" + data.mgr1KcdSizeMst.length);
            return data.mgr1KcdSizeMst;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerCreditRating(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyerCreditRating($buyerCd: String!) {
                        mgr1KcdBuyerCreditRating(BUYER_CD: $buyerCd) {
                            id
                            BUYER_CD
                            CREDIT_RATING
                            CREDIT_EXPIRE
                            REG_DATETIME
                            REG_USER
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            console.log(
                "MGR1_KCD_BANK:" + data.mgr1KcdBuyerCreditRating.length,
            );
            return data.mgr1KcdBuyerCreditRating;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerTeamInfo(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyerTeamInfo($buyerCd: String!) {
                        mgr1KcdBuyerTeamInfo(BUYER_CD: $buyerCd) {
                            id
                            col1
                            col2
                            col3
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            console.log("MGR1_KCD_BANK:" + data.mgr1KcdBuyerTeamInfo.length);
            return data.mgr1KcdBuyerTeamInfo;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerFile(argBuyerCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyerFile($buyerCd: String!) {
                        mgr1KcdBuyerFile(BUYER_CD: $buyerCd) {
                            id
                            file1
                            file2
                            file3
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                },
            });
            console.log("MGR1_KCD_BANK:" + data.mgr1KcdBuyerFile.length);
            return data.mgr1KcdBuyerFile;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerBank(argBankCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyerBank($bankCd: String!) {
                        mgr1KcdBuyerBank(BANK_CD: $bankCd) {
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
                        }
                    }
                `,
                variables: {
                    bankCd: argBankCd,
                },
            });
            console.log("MGR1_KCD_BANK:" + data.mgr1KcdBuyerBank.length);
            return data.mgr1KcdBuyerBank;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerUser(argBuyerTeam) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyerUser($buyerTeam: String!) {
                        mgr1KcdBuyerUser(BUYER_TEAM: $buyerTeam) {
                            id
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_CD
                            PART
                            RANK1
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
                    }
                `,
                variables: {
                    buyerTeam: argBuyerTeam,
                },
            });
            console.log("MGR1_KCD_BUYER:" + data.mgr1KcdBuyerUser.length);
            return data.mgr1KcdBuyerUser;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyer(
        argBuyerCd,
        argBuyerName,
        argStatusCd,
        argOrderDateS,
        argOrderDateE,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyer(
                        $buyerCd: String!
                        $buyerName: String!
                        $statusCd: String!
                        $orderDateS: String!
                        $orderDateE: String!
                    ) {
                        mgr1KcdBuyer(
                            BUYER_CD: $buyerCd
                            BUYER_NAME: $buyerName
                            STATUS_CD: $statusCd
                            ORDER_DATE_S: $orderDateS
                            ORDER_DATE_E: $orderDateE
                        ) {
                            id
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
                            SHIP_ADDR1
                            SHIP_ADDR2
                            SHIP_ADDR3
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
                            STATUS_NAME
                            BUYER_TYPE_NAME
                            BUYER_TEAM_NAME
                            BUYER_TEAM_NEOE_NAME
                            NAT_NAME
                            PAY_RULE_NAME
                            BANK_NAME
                            ACCOUNT_NAME
                            ACCOUNT_NO
                        }
                    }
                `,
                variables: {
                    buyerCd: argBuyerCd,
                    buyerName: argBuyerName,
                    statusCd: argStatusCd,
                    orderDateS: argOrderDateS,
                    orderDateE: argOrderDateE,
                },
            });
            console.log("MGR1_KCD_BUYER:" + data.mgr1KcdBuyer.length);
            return data.mgr1KcdBuyer;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdVendor(
        argVendorName,
        argMatlType,
        argVendorType,
        argStatusCd,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdVendor(
                        $vendorCd: String!
                        $vendorName: String!
                        $matlType: String!
                        $statusCd: String!
                    ) {
                        mgr1KcdVendor(
                            VENDOR_CD: $vendorCd
                            VENDOR_NAME: $vendorName
                            MATL_TYPE: $matlType
                            STATUS_CD: $statusCd
                        ) {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            USER_TAX
                            PART
                            RANK1
                            EMAIL
                            EMAIL_TAX
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
                            VENDOR_TYPE_1
                            VENDOR_MATL_TYPE_1
                            NAT_NAME
                            STATUS_NAME
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                        }
                    }
                `,
                variables: {
                    vendorCd: argVendorType,
                    vendorName: argVendorName,
                    matlType: argMatlType,
                    statusCd: argStatusCd,
                },
            });
            console.log("MGR1_KCD_BANK_CODE:" + data.mgr1KcdVendor.length);
            return data.mgr1KcdVendor;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdVendorCode(argKind1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdVendorCode($kind1: String!) {
                        mgr1KcdVendorCode(KIND1: $kind1) {
                            T_KCD_VENDOR_STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_VENDOR_MATL_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_VENDOR_VENDOR_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_VENDOR_VENDOR_MATL_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_VENDOR_NAT_CD {
                                id
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                            }
                            T_KCD_VENDOR_PERMIT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_VENDOR_PAY_TERM {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: { kind1: argKind1 },
            });
            console.log(
                "MGR1_KCD_BANK_CODE:" +
                    data.mgr1KcdVendorCode.T_KCD_VENDOR_STATUS_CD.length,
            );
            return data.mgr1KcdVendorCode;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerCode(argKind1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBuyerCode($kind1: String!) {
                        mgr1KcdBuyerCode(KIND1: $kind1) {
                            T_KCD_BUYER_BANK_CD {
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
                            }
                            T_KCD_BUYER_STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_BUYER_TYPE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_BUYER_TEAM {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_BUYER_TEAM_NEOE {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_BUYER_NAT_CD {
                                id
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                            }
                            T_KCD_BUYER_PAY_RULE {
                                id
                                SEQ
                                CD_CODE
                                REMARK
                                RATE
                                FLAG
                                TERM
                                FN
                                YN_DEFAULT
                                DAYS1
                                PERCENT1
                                DAYS2
                                PERCENT2
                                DAYS3
                                PERCENT3
                            }
                            T_KCD_BUYER_CREDIT {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: { kind1: argKind1 },
            });
            console.log(
                "MGR1_KCD_BANK_CODE:" +
                    data.mgr1KcdBuyerCode.T_KCD_BUYER_STATUS_CD.length,
            );
            return data.mgr1KcdBuyerCode;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBankSave(argsKCD_BANK, argVENDOR_CD) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Mgr1KcdBankSave($datas: TMgr1KCD_BANK!) {
                        mgr1KcdBankSave(datas: $datas)
                    }
                `,
                variables: {
                    datas: {
                        VENDOR_CD: argVENDOR_CD,
                        data: {
                            ACCOUNT_NAME: argsKCD_BANK.ACCOUNT_NAME,
                            ACCOUNT_NO: argsKCD_BANK.ACCOUNT_NO,
                            ADDR1: "",
                            ADDR2: "",
                            BANK_BRANCH: "",
                            BANK_CD: argsKCD_BANK.BANK_CD,
                            BANK_NAME: argsKCD_BANK.BANK_NAME,
                            BANK_TYPE: "",
                            BANK_TYPE1: argsKCD_BANK.BANK_TYPE1,
                            REG_DATETIME: "",
                            REG_USER: argsKCD_BANK.REG_USER,
                            SFTCODE: argsKCD_BANK.SFTCODE,
                            STATUS_CD: argsKCD_BANK.STATUS_CD,
                            UPD_DATETIME: "",
                            UPD_USER: argsKCD_BANK.UPD_USER,
                            id: argsKCD_BANK.id,
                        },
                    },
                },
            });
            return data.mgr1KcdBankSave;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdSizeMstSave(argsKCD_SIZE_MST) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Mgr1KcdSizeMstSave($datas: TMgr1KCD_SIZE_MST!) {
                        mgr1KcdSizeMstSave(datas: $datas)
                    }
                `,
                variables: {
                    datas: {
                        data: {
                            BUYER_CD: argsKCD_SIZE_MST.BUYER_CD,
                            REG_DATETIME: argsKCD_SIZE_MST.REG_DATETIME,
                            REG_USER: argsKCD_SIZE_MST.REG_USER,
                            SIZE_CNT: argsKCD_SIZE_MST.SIZE_CNT,
                            SIZE_GROUP: argsKCD_SIZE_MST.SIZE_GROUP,
                            SIZE_MEMBER: argsKCD_SIZE_MST.SIZE_MEMBER,
                            STATUS_CD: argsKCD_SIZE_MST.STATUS_CD,
                            UPD_DATETIME: argsKCD_SIZE_MST.UPD_DATETIME,
                            UPD_USER: argsKCD_SIZE_MST.UPD_USER,
                            id: argsKCD_SIZE_MST.id,
                        },
                    },
                },
            });
            return data.mgr1KcdSizeMstSave;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBankCode(argKind1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBankCode1($kind1: String!) {
                        mgr1KcdBankCode1(KIND1: $kind1) {
                            T_KCD_CODE_STATUS_CD {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                            T_KCD_CODE_BANK_TYPE1 {
                                id
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                            }
                        }
                    }
                `,
                variables: { kind1: argKind1 },
            });
            console.log(
                "MGR1_KCD_BANK_CODE:" +
                    data.mgr1KcdBankCode1.T_KCD_CODE_STATUS_CD.length,
            );
            return data.mgr1KcdBankCode1;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBank(argBankCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBank($bankCd: String!) {
                        mgr1KcdBank(BANK_CD: $bankCd) {
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
                        }
                    }
                `,
                variables: { bankCd: argBankCd },
            });
            console.log("MGR1_KCD_BANK:" + data.mgr1KcdBank.length);
            return data.mgr1KcdBank;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBankVendor(argVendorCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdBankVendor($vendorCd: String!) {
                        mgr1KcdBankVendor(VENDOR_CD: $vendorCd) {
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
                        }
                    }
                `,
                variables: { vendorCd: argVendorCd },
            });
            console.log("MGR1_KCD_BANK:" + data.mgr1KcdBankVendor.length);
            return data.mgr1KcdBankVendor;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdVendorBank(argBankCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query Mgr1KcdVendorBank($bankCd: String!) {
                        mgr1KcdVendorBank(BANK_CD: $bankCd) {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            USER_TAX
                            PART
                            RANK1
                            EMAIL
                            EMAIL_TAX
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
                            VENDOR_TYPE_1
                            VENDOR_MATL_TYPE_1
                            NAT_NAME
                            STATUS_NAME
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                        }
                    }
                `,
                variables: { bankCd: argBankCd },
            });
            console.log("MGR1_KCD_BANK:" + data.mgr1KcdVendorBank.length);
            return data.mgr1KcdVendorBank;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdVendorSave(argsKCD_VENDOR) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Mgr1KcdVendorSave($datas: TMgr1KCD_VENDOR!) {
                        mgr1KcdVendorSave(datas: $datas)
                    }
                `,
                variables: {
                    datas: {
                        data: {
                            ADDR1: argsKCD_VENDOR.ADDR1,
                            ADDR2: argsKCD_VENDOR.ADDR2,
                            APPROKEY: argsKCD_VENDOR.APPROKEY,
                            BANK1: argsKCD_VENDOR.BANK1,
                            BANK2: argsKCD_VENDOR.BANK2,
                            BANK_CD: argsKCD_VENDOR.BANK_CD,
                            BANK_CD2: argsKCD_VENDOR.BANK_CD2,
                            BANK_CD3: argsKCD_VENDOR.BANK_CD3,
                            EMAIL: argsKCD_VENDOR.EMAIL,
                            EMAIL_TAX: argsKCD_VENDOR.EMAIL_TAX,
                            USER_TAX: argsKCD_VENDOR.USER_TAX,
                            FAX_NO: argsKCD_VENDOR.FAX_NO,
                            INVOICE_NAME: argsKCD_VENDOR.INVOICE_NAME,
                            GW: argsKCD_VENDOR.GW,
                            LEAD_TIME: argsKCD_VENDOR.LEAD_TIME,
                            NAT_CD: argsKCD_VENDOR.NAT_CD,
                            NEOE_NO: argsKCD_VENDOR.NEOE_NO,
                            PART: argsKCD_VENDOR.PART,
                            PAY_TERM: argsKCD_VENDOR.PAY_TERM,
                            PAY_TYPE: argsKCD_VENDOR.PAY_TYPE,
                            PERMIT: argsKCD_VENDOR.PERMIT,
                            PRESIDENT: argsKCD_VENDOR.PRESIDENT,
                            RANK1: argsKCD_VENDOR.RANK1,
                            REG_DATETIME: argsKCD_VENDOR.REG_DATETIME,
                            REG_NO: argsKCD_VENDOR.REG_NO,
                            REG_USER: argsKCD_VENDOR.REG_USER,
                            REMARK: argsKCD_VENDOR.REMARK,
                            SHINTS_USER: argsKCD_VENDOR.SHINTS_USER,
                            STATUS_CD: argsKCD_VENDOR.STATUS_CD,
                            TEL_NO: argsKCD_VENDOR.TEL_NO,
                            UPD_DATETIME: argsKCD_VENDOR.UPD_UPDATETIME,
                            UPD_USER: argsKCD_VENDOR.UPD_USER,
                            USER_NAME: argsKCD_VENDOR.USER_NAME,
                            VENDOR_CD: argsKCD_VENDOR.VENDOR_CD,
                            VENDOR_MATL_TYPE: argsKCD_VENDOR.VENDOR_MATL_TYPE,
                            VENDOR_NAME: argsKCD_VENDOR.VENDOR_NAME,
                            VENDOR_TYPE: argsKCD_VENDOR.VENDOR_TYPE,
                            ZIP_NO: argsKCD_VENDOR.ZIP_NO,
                            id: argsKCD_VENDOR.id,
                        },
                    },
                },
            });
            return data.mgr1KcdVendorSave;
        } catch (e) {
            return e;
        }
    }

    async mgr1KsvOrderMstSaveInsert(
        argOrderMst,
        argsOrderMem,
        argBuyerCd,
        argFactoryName,
        argCombined,
    ) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Mgr1KsvOrderMstSaveInsert(
                        $datamst: I_KSV_ORDER_MST!
                        $datamem: [I_KSV_ORDER_MEM!]!
                        $buyerCd: String!
                        $factoryName: String!
                        $combined: String!
                    ) {
                        mgr1KsvOrderMstSaveInsert(
                            datamst: $datamst
                            datamem: $datamem
                            BUYER_CD: $buyerCd
                            FACTORY_NAME: $factoryName
                            COMBINED: $combined
                        )
                    }
                `,
                variables: {
                    datamst: argOrderMst,
                    datamem: argsOrderMem,
                    buyerCd: argBuyerCd,
                    factoryName: argFactoryName,
                    combined: argCombined,
                },
            });
            return data.mgr1KsvOrderMstSaveInsert;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerSave(argKCD_BUYER) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Mgr1KcdBuyerSave($datas: TMgr1KCD_BUYER!) {
                        mgr1KcdBuyerSave(datas: $datas)
                    }
                `,
                variables: {
                    datas: {
                        data: {
                            BANK_CD: argKCD_BUYER.BANK_CD,
                            BUYER_ABBR: argKCD_BUYER.BUYER_ABBR,
                            ADDR1: argKCD_BUYER.ADDR1,
                            BUYER_CD: argKCD_BUYER.BUYER_CD,
                            BUYER_NAME: argKCD_BUYER.BUYER_NAME,
                            BUYER_TEAM: argKCD_BUYER.BUYER_TEAM,
                            BUYER_TYPE: argKCD_BUYER.BUYER_TYPE,
                            EMAIL: argKCD_BUYER.EMAIL,
                            FAX_NO: argKCD_BUYER.TEL_NO,
                            MOM_CD: argKCD_BUYER.MOM_CD,
                            NAT_CD: argKCD_BUYER.NAT_CD,
                            NEOE_BUYER_CD: argKCD_BUYER.NEOE_BUYER_CD,
                            NEOE_BUYER_CD_MOM: argKCD_BUYER.NEOE_BUYER_CD_MOM,
                            PAY_RULE: argKCD_BUYER.PAY_RULE,
                            REG_USER: argKCD_BUYER.REG_USER,
                            SHINTS_USER: argKCD_BUYER.SHINTS_USER,
                            SHIP_ADDR1: argKCD_BUYER.SHIP_ADDR1,
                            SHIP_ADDR3: argKCD_BUYER.SHIP_ADDR2,
                            SHIP_ADDR2: argKCD_BUYER.SHIP_ADDR3,
                            STATUS_CD: argKCD_BUYER.STATUS_CD,
                            TEL_NO: argKCD_BUYER.TEL_NO,
                            UPD_USER: argKCD_BUYER.UPD_USER,
                            USER_NAME: argKCD_BUYER.USER_NAME,
                            id: argKCD_BUYER.id,
                        },
                    },
                },
            });
            return data.mgr1KcdBuyerSave;
        } catch (e) {
            return e;
        }
    }

    async mgr1KcdBuyerCreditRatingSave(argKCD_BUYER_CREDIT_RATING) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation Mgr1KcdBuyerCreditRatingSave(
                        $datas: TMgr1KCD_BUYER_CREDIT_RATING!
                    ) {
                        mgr1KcdBuyerCreditRatingSave(datas: $datas)
                    }
                `,
                variables: {
                    datas: {
                        data: {
                            BUYER_CD: argKCD_BUYER_CREDIT_RATING.BUYER_CD,
                            CREDIT_EXPIRE:
                                argKCD_BUYER_CREDIT_RATING.CREDIT_EXPIRE,
                            CREDIT_RATING:
                                argKCD_BUYER_CREDIT_RATING.CREDIT_RATING,
                            REG_DATETIME:
                                argKCD_BUYER_CREDIT_RATING.REG_DATETIME,
                            REG_USER: argKCD_BUYER_CREDIT_RATING.REG_USER,
                            id: argKCD_BUYER_CREDIT_RATING.id,
                        },
                    },
                },
            });
            return data.mgr1KcdBuyerCreditRatingSave;
        } catch (e) {
            return e;
        }
    }
}
