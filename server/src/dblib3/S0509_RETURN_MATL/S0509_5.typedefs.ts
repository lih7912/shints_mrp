// MGR_S0509_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0509_5 = gql`
    input I_S0509_5 {
        PO_CD: String
        ORDER_CD: String
        MATL_CD: String
        PU_CD: String
        PO_QTY2: String
        PO_QTY: String
        MRP_QTY: String
        PO_SEQ: String
        IN_QTY: String
        OUT_QTY: String
        INFAC_QTY: String
        OUTFAC_QTY: String
        MATL_NAME: String
        VENDOR_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        CURR_CD: String
        MASTER_PRICE: String
        OUTFAC_QTY2: String
        LINEOUT_QTY: String
        RETURN_QTY: String
        STOCK_QTY: String
        LOST_QTY: String
        BAL_QTY: String
        VENDOR_CD: String
        REMARK: String
    }

    input I_S0509_5_1 {
        REMARK: String
        OUT_DATE: String
        PURPOSE: String
    }

    type Ret_S0509_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0509_5_RETURN_MATL(
            datas: [I_S0509_5!]!
            datas1: I_S0509_5_1!
        ): [Ret_S0509_5!]!
        mgrInsert_S0509_5_RETURN_NOTHING(
            datas: [I_S0509_5!]!
            datas1: I_S0509_5_1!
        ): [Ret_S0509_5!]!
    }
`;

export default moduleTypedefs_S0509_5;
