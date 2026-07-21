/* eslint-disable */
import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import apolloOption from "../../assets/env_graphql";
import { ServiceLib } from "../service_lib/ServiceLib";

export class ServiceS0914_FAC_IN_OUT_MANAGER {
    client;

    constructor() {
        const serviceLib = new ServiceLib();
        this.client = serviceLib.getApolloClient();
    }

    //--------------------------------------------------
    // 공통: 코드 조회 (Buyer 등)
    //--------------------------------------------------
    async getBuyerCd() {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_getBuyerCd {
                        mgrQuery_S0914_getBuyerCd {
                            BUYER {
                                id
                                BUYER_NAME
                                BUYER_CD
                            }
                        }
                    }
                `,
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_getCode BUYER length:",
                data.mgrQuery_S0914_getBuyerCd.BUYER.length,
            );

            return data.mgrQuery_S0914_getBuyerCd;
        } catch (e) {
            console.error("getBuyerCd error:", e);
            return e;
        }
    }

    async getPoCd(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_getPoCd(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_getPoCd(data: $data) {
                            PO_CD {
                                id
                                PO_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argFilter,
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_getCode PO_CD length:",
                data.mgrQuery_S0914_getPoCd.PO_CD.length,
            );

            return data.mgrQuery_S0914_getPoCd;
        } catch (e) {
            console.error("getPoCd error:", e);
            return e;
        }
    }

    async getOrderCd(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_getOrderCd(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_getOrderCd(data: $data) {
                            ORDER_CD {
                                id
                                ORDER_CD
                            }
                        }
                    }
                `,
                variables: {
                    data: argFilter,
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_getCode ORDER length:",
                data.mgrQuery_S0914_getOrderCd.ORDER_CD.length,
            );

            return data.mgrQuery_S0914_getOrderCd;
        } catch (e) {
            console.error("getOrderCd error:", e);
            return e;
        }
    }

    //--------------------------------------------------
    // 1. 상단 메인 그리드 (topList)
    //    AFColumn field 기준
    //--------------------------------------------------
    async getTopList(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_TopList(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_TopList(data: $data) {
                            id
                            PO_CD
                            VENDOR_NAME
                            MATL_CD
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            MRPQTY
                            STSIN
                            STSOUT
                            ERROR
                            SHIPQTY
                            STOCK
                            FACIN
                            SHORTOVER
                            DEFECT
                            DEFECT_A
                            MAINUSE
                            OTHER
                            TABLE_SHORT
                            KEEP_STOCK
                            MOVE_STOCK
                            LOST
                            LINE_RETURN
                            FACOUT
                            REMAIN_E
                            REMAIN_A
                            DELAYREMARK
                            REMARK_BVT
                            PRICE
                            MOQ
                            MRP1
                            USE1
                            MRP2
                            USE2
                            MRP3
                            USE3
                            DATAS {
                                ORDER_CD
                                ORDER_QTY
                                MAIN_USE
                            }
                        }
                    }
                `,
                variables: {
                    data: argFilter, // 예: { BUYER: 'ALL', PO: '...', ORDER_NO: '...' }
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_TopList length:",
                data.mgrQuery_S0914_TopList.length,
            );

            return data.mgrQuery_S0914_TopList;
        } catch (e) {
            console.error("getTopList error:", e);
            return e;
        }
    }

    //--------------------------------------------------
    // 2. 하단 좌측 그리드 (bottomLeftList)
    //    AFColumn field 기준
    //--------------------------------------------------
    async getBottomLeftList(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_BottomLeftList(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_BottomLeftList(data: $data) {
                            id
                            SHIPMENTCD
                            PACKCD
                            ATA
                            DELIVERY
                            BLNO
                            CTNO
                            UNIT
                            SHIPQTY
                            SHORTOVER
                            DEFECT
                            FACINQTY
                            LOCATION
                            MC
                            STSOUT_DATE
                        }
                    }
                `,
                variables: {
                    data: argFilter,
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_BottomLeftList length:",
                data.mgrQuery_S0914_BottomLeftList.length,
            );

            return data.mgrQuery_S0914_BottomLeftList;
        } catch (e) {
            console.error("getBottomLeftList error:", e);
            return e;
        }
    }

    //--------------------------------------------------
    // 3. 하단 우측 그리드 (bottomRightList)
    //    AFColumn field 기준
    //--------------------------------------------------
    async getBottomRightList(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_BottomRightList(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_BottomRightList(data: $data) {
                            id
                            OUTDATE
                            UNIT
                            OUTQTY
                            PURPOSE
                            purpose: PURPOSE
                            REMARK
                            ORDER_CD
                        }
                    }
                `,
                variables: {
                    data: argFilter,
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_BottomRightList length:",
                data.mgrQuery_S0914_BottomRightList.length,
            );

            return data.mgrQuery_S0914_BottomRightList;
        } catch (e) {
            console.error("getBottomRightList error:", e);
            return e;
        }
    }

    async getBottomMOQList(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_BottomMOQList(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_BottomMOQList(data: $data) {
                            id
                            USE_PO_CD
                            USE_ORDER_CD
                            USE_QTY
                            USE_DATETIME
                        }
                    }
                `,
                variables: {
                    data: argFilter,
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_BottomRightList length:",
                data.mgrQuery_S0914_BottomMOQList.length,
            );

            return data.mgrQuery_S0914_BottomMOQList;
        } catch (e) {
            console.error("getBottomMOQList error:", e);
            return e;
        }
    }

    async getStockUseList(argFilter) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_StockUseList(
                        $data: I_S0914_FAC_IN_OUT_MANAGER!
                    ) {
                        mgrQuery_S0914_StockUseList(data: $data) {
                            id
                            WARE_NAME
                            PO_CD
                            PO_SEQ
                            USE_ORDER_CD
                            ORDER_CD
                            EMPTY_COL
                            MATL_CD
                            VENDOR_NAME
                            MATL_NAME
                            COLOR
                            SPEC
                            UNIT
                            RACK
                            LOCATION
                            USE_QTY
                            STOCK_QTY
                            STOCK_IDX
                        }
                    }
                `,
                variables: {
                    data: argFilter,
                },
                fetchPolicy: "no-cache",
            });

            console.log(
                "mgrQuery_S0914_StockUseList length:",
                data.mgrQuery_S0914_StockUseList.length,
            );

            return data.mgrQuery_S0914_StockUseList;
        } catch (e) {
            console.error("getStockUseList error:", e);
            return e;
        }
    }

    async updateRemarkBvt(argData) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.mutate({
                mutation: gql`
                    mutation MmgrUpdate_S0914_RemarkBvt(
                        $data: I_S0914_UPDATE_REMARK_BVT!
                    ) {
                        mgrUpdate_S0914_RemarkBvt(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: argData,
                },
            });

            return data.mgrUpdate_S0914_RemarkBvt;
        } catch (e) {
            console.error("updateRemarkBvt error:", e);
            return e;
        }
    }

    async exportReport(args) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT(
                        $data: I_S0914_FAC_IN_OUT_MANAGER_REPORT!
                    ) {
                        mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: args,
                },
                fetchPolicy: "no-cache",
            });

            if (!data || !data.mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT) {
                throw new Error(
                    "mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT returned no data.",
                );
            }

            return data.mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT;
        } catch (e) {
            console.error("FAC_IN_OUT_MANAGER_REPORT error:", e);
            return e;
        }
    }

    async exportReport2(args) {
        apolloOption.cache = new InMemoryCache();

        try {
            const { data } = await this.client.query({
                query: gql`
                    query QmgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2(
                        $data: I_S0914_FAC_IN_OUT_MANAGER_REPORT!
                    ) {
                        mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2(data: $data) {
                            id
                            CODE
                        }
                    }
                `,
                variables: {
                    data: args,
                },
                fetchPolicy: "no-cache",
            });

            if (!data || !data.mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2) {
                throw new Error(
                    "mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2 returned no data.",
                );
            }

            return data.mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2;
        } catch (e) {
            console.error("FAC_IN_OUT_MANAGER_REPORT2 error:", e);
            return e;
        }
    }
}
