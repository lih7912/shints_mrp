// MGR_S040102_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S040102_2_1 = gql`
    type T_S040102_2_PU_MEM {
        PU_CD: String
        PU_SEQ: String
        PO_CD: String
        PO_SEQ: String
        SEND_DATETIME: String
        SEND_FILENAME: String
        SEND_FILEURL: String
        SEND_USER: String
        SEND_KIND: String
    }

    type T_S040102_2_1 {
        PU_STATUS: String
        PU_CD: String
        VENDOR_CD: String
        VENDOR_NAME: String
        VENDOR_TYPE: String
        VENDOR_TYPE_N: String
        REG_USER: String
        BUYER_CD: String
        BUYER_NAME: String
        PAY_TERM: String
        PO_CD2: String
        MRP_DATE: String
        NORMI: String
        OVER_SHORT: String
        TARGET_ETA: String
        CURR_CD: String
        PI_NO: String
        ORDER_DATE: String
        PAY_AMT: String
        PI_FILE: String
        PI_FILE_URL: String
        DUE_DATE: String
        BILL_TO: String
        EX_FACTORY: String
        PAY_DATE: String
        PLACE_CD: String
        SHIP_TO: String
        ORIGIN_PORT: String
        TRADE_TERM: String
        DEBIT_AMT: String
        LC_AMT: String
        DEPOSIT_AMT: String
        GW: String
    }

    input I_S040102_2_1 {
        PU_CD: String
    }

    type Query {
        mgrQueryS040102_2_1(data: I_S040102_2_1!): [T_S040102_2_1!]!
        mgrQueryS040102_2_PU_MEM(data: I_S040102_2_1!): [T_S040102_2_PU_MEM!]!
        mgrQueryS040102_2_PU_MEM_bak(
            data: I_S040102_2_1!
        ): [T_S040102_2_PU_MEM!]!
    }
`;

export default moduleTypedefs_S040102_2_1;
