// MGR_S0411_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0411_5 = gql`
    input I_S0411_5 {
        PO_CD: String
        ORDER_CD: String
        VENDOR_NAME: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        IN_DATE: String
        INFAC_QTY: Float
        REMAIN_QTY: Float
        OUT_QTY: Float
        IN_TYPE_NAME: String
        MATL_CD: String
        IN_TYPE: String
        PO_SEQ: Int
        MRP_SEQ: Int
        IN_DATETIME: String
        REG_USER: String
        VENDOR_CD: String
        VENDOR_TYPE: String
        MATL_SEQ: Int
    }

    input I_S0411_5_1 {
        FROM_TYPE: String
        TO_TYPE: String
        DELIVERY_TYPE: String
        OUT_DATE: String
        CD_QTY: String
        CT_NO: String
        REASON_TYPE: String
        WEIGHT_CBM: String
        CHARGE1: String
        CHARGE2: String
        REMARK: String
        PL_NO: String
        SENDOR: String
        RECEIVER: String
        IS_STOCKOUT: String
        STOCKOUT_PO_CD: String
        USER_ID: String
    }

    type Ret_S0411_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrInsert_S0411_5(
            datas: [I_S0411_5!]!
            datas1: I_S0411_5_1!
        ): [Ret_S0411_5!]!
    }
`;

export default moduleTypedefs_S0411_5;
