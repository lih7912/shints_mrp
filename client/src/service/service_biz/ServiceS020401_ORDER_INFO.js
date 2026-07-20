/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS020401_ORDER_INFO {
    // SERVICE: EDT_KSV_ORDER_MST
    async mgrInsert_INSERT_CAPA(argInputData) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020602_INSERT_CAPA(
                        $datas: I_S020602_INSERT_CAPA!
                    ) {
                        mgrInsert_S020602_INSERT_CAPA(datas: $datas) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    datas: argInputData,
                },
            });
            // console.log("async mgrInsert_KSV_ORDER_MST  call succeed: " + data.mgrInsert_S020602_ORDER_REG);
            return data.mgrInsert_S020602_INSERT_CAPA;
        } catch (e) {
            console.log("async mgrInsert_S020602_INSERT_CAPA  call error: ");
            return e;
        }
    }

    async mgrInsertEDT_KSV_ORDER_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
                    ) {
                        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
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
            return data.mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
                    ) {
                        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
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
            return data.mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_MST(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST!]!
                    ) {
                        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST(
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
            return data.mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST;
        } catch (e) {
            return e;
        }
    }
    // SERVICE: EDT_KSV_ORDER_MST1
    async mgrInsertEDT_KSV_ORDER_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
                    ) {
                        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
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
            return data.mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
                    ) {
                        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
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
            return data.mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_MST1(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1!]!
                    ) {
                        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1(
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
            return data.mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST1;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KSV_ORDER_MST2
    async mgrInsertEDT_KSV_ORDER_MST2(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
                    ) {
                        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
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
            return data.mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_MST2(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
                    ) {
                        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
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
            return data.mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_MST2(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2!]!
                    ) {
                        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2(
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
            return data.mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST2;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: EDT_KSV_ORDER_MST3
    async mgrInsertEDT_KSV_ORDER_MST3(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
                    ) {
                        mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
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
            return data.mgrInsert_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3;
        } catch (e) {
            return e;
        }
    }

    async mgrUpdateEDT_KSV_ORDER_MST3(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
                    ) {
                        mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
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
            return data.mgrUpdate_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3;
        } catch (e) {
            return e;
        }
    }

    async mgrDeleteEDT_KSV_ORDER_MST3(argRetArray) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
                        $datas: [I_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3!]!
                    ) {
                        mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3(
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
            return data.mgrDelete_S020401_ORDER_INFO_EDT_KSV_ORDER_MST3;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MEM

    async mgrQueryTBL_KSV_ORDER_MEM(argQRY_KSV_ORDER_MEM) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MEM(
                        $data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM!
                    ) {
                        mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM(
                            data: $data
                        ) {
                            PROD_CD
                            ADD_FLAG
                            COLOR
                            TOT_CNT
                            PRICE
                            SIZE_CNT
                            OLD_PROD_CD
                            end_price
                            MID_SIZE
                            MID_SIZE_QTY
                            SIZE_LOSS
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MEM,
                },
            });
            console.log(
                "marQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM:" +
                    data.mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM.length,
            );
            return data.mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM;
        } catch (e) {
            return e;
        }
    }

    // SERVICE: TBL_KSV_ORDER_MEM1

    async mgrQueryTBL_KSV_ORDER_MEM1(argQRY_KSV_ORDER_MEM1) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KSV_ORDER_MEM1(
                        $data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM1!
                    ) {
                        mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1(
                            data: $data
                        ) {
                            INVOICE_DATE
                            SHIP_PROD_TYPE
                            SHIP_QTY
                            SALE_PRICE
                            INVOICE_NO
                        }
                    }
                `,
                variables: {
                    data: argQRY_KSV_ORDER_MEM1,
                },
            });
            console.log(
                "marQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1:" +
                    data.mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1.length,
            );
            return data.mgrQuery_S020401_ORDER_INFO_TBL_KSV_ORDER_MEM1;
        } catch (e) {
            return e;
        }
    }

    async mgrQueryORDER_INFO(argQRY_ORDER_INFO) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S020401_ORDER_INFO_QRY1(
                        $data: I_S020401_ORDER_INFO_QRY_KSV_ORDER_MEM!
                    ) {
                        mgrQuery_S020401_ORDER_INFO_QRY1(data: $data) {
                            ORDER_MST {
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
                                id
                                STYLE_NAME
                                ORDER_STATUS_NAME
                                BUYER_NAME
                                SIZE_MEMBER
                            }
                            ORDER_CMPT {
                                ORDER_CMPT
                            }
                            PO {
                                PO_CD
                                PO_SEQ
                                ORDER_CD
                                CONS_F
                                CONS_A
                                id
                            }
                            SHIP_CNT {
                                SUM_SHIP_CNT
                            }
                            SAMPLE_COST {
                                SAMPLE_CD
                                SEQ
                                YY
                                SAMPLE_SEQ
                                ORDER_CD
                                ORDER_QTY
                                STYLE_CD
                                WORK_TYPE
                                REPAIR_QTY
                                PATT_USER
                                PATT_COST
                                PATT_GRADE
                                PATT_REMARK
                                SEW_USER
                                SEW_COST
                                SEW_GRADE
                                SEW_REMARK
                                WELDING_COST
                                SUB_PATT_COST
                                SUB_SEW_COST
                                SUB_WELDING_COST
                                BUYER_CD
                                ETC_AMOUNT
                                REMARK
                                CONFIRM_FLAG
                                PATT_LOSS
                                PATT_LOSS_TIME
                                SEW_LOSS
                                SEW_LOSS_TIME
                                SAMPLE_END_FLAG
                                SAMPLE_END_DATE
                                END_FLAG
                                END_DATE
                                REG_USER
                                REG_DATETIME
                                PATT_FLAG
                                SEW_FLAG
                                WELDING_FLAG
                                PATT3D_USER
                                WORK3D_USER
                                COLOR3D_QTY
                                PATT3D_COST
                                WORK3D_COST
                                SAMPLE_STEP
                                SAMPLE_ROUND
                                SAMPLE_REASON
                                CUTTING_USER
                                COMPLETE_USER
                            }
                            ORDER_MST_ARRAY {
                                ORDER_CD
                                NAT_CD
                                DUE_DATE
                                TOT_QTY
                                ORDER_MEM {
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
                                    id
                                    COLOR
                                }
                            }
                            ORDER_MEM {
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
                                id
                                COLOR
                            }
                            INVOICE_MEM {
                                SHIP_DATE
                                SHIP_TYPE_NAME
                                SHIP_QTY
                                SALES_PRICE
                                INVOICE_NO
                                DELIVERY_TYPE_NAME
                                SHIP_PRICE
                                SHIP_DATE1
                            }
                            CODE_FACTORY_CD {
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
                            CODE_NAT_CD {
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
                            }
                            CODE_PATT_USER {
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
                                id
                            }
                            CODE_SEW_USER {
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
                                id
                            }
                            CODE_BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_STEP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_ROUND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CODE_SAMPLE_REASON {
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
                    data: argQRY_ORDER_INFO,
                },
            });
            console.log(
                "marQueryORDER_INFO:" +
                    data.mgrQuery_S020401_ORDER_INFO_QRY1.ORDER_MST.length,
            );

            var tOneOrderMst =
                data.mgrQuery_S020401_ORDER_INFO_QRY1.ORDER_MST[0];

            var tSizeArray = [];
            var tSizeCols = tOneOrderMst.SIZE_MEMBER.split(",");
            console.log("marQueryORDER_INFO(Size_member):" + tSizeCols.length);

            var tArray = [];
            var tIdx = 0;
            for (
                tIdx = 0;
                tIdx < data.mgrQuery_S020401_ORDER_INFO_QRY1.ORDER_MEM.length;
                tIdx++
            ) {
                var tOneObj = {
                    ...data.mgrQuery_S020401_ORDER_INFO_QRY1.ORDER_MEM[tIdx],
                };

                var tIdx1 = 0;
                for (tIdx1 = 0; tIdx1 < tSizeCols.length; tIdx1++) {
                    var tSizeColName = "SIZE_COL_" + tSizeCols[tIdx1];
                    var tSizeColValue = parseInt(
                        tOneObj.SIZE_CNT.substring(tIdx1 * 6, tIdx1 * 6 + 6),
                    );
                    tOneObj[`${tSizeColName}`] = tSizeColValue;
                }
                tArray.push(tOneObj);
            }
            console.log("marQueryORDER_INFO(Data-1):" + tArray.length);

            var tWObj = { ...data.mgrQuery_S020401_ORDER_INFO_QRY1 };
            tWObj.ORDER_MEM1 = tArray;

            console.log("marQueryORDER_INFO:" + tWObj.ORDER_MST.length);

            return tWObj;
        } catch (e) {
            console.log("marQueryORDER_INFO error:" + e.message);
            return e;
        }
    }

    async mgrQueryORDER_INFO_CODE() {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrQuery_S020401_ORDER_INFO_CODE {
                        mgrQuery_S020401_ORDER_INFO_CODE {
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
                            NAT_CD {
                                NAT_CD
                                NAT_NAME
                                STATUS_CD
                                REG_USER
                                REG_DATETIME
                                NAT_IDX
                                id
                            }
                            PATT_USER {
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
                                id
                            }
                            SEW_USER {
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
                                id
                            }
                            BUYER_TEAM {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            CURR_CD {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SAMPLE_STEP {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SAMPLE_ROUND {
                                CD_GROUP
                                CD_CODE
                                CD_NAME
                                CD_FLAG
                                id
                            }
                            SAMPLE_REASON {
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
                "marQueryORDER_INFO:" +
                    data.mgrQuery_S020401_ORDER_INFO_CODE.FACTORY_CD.length,
            );
            return data.mgrQuery_S020401_ORDER_INFO_CODE;
        } catch (e) {
            return e;
        }
    }
}
