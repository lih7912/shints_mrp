// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_DEBIT_COST = gql`
    type BASE_QRY_KZZ_DEBIT_COST {
        DEBIT_CD: String
        SEQ: Int
        YY: Int
        CRDB_CD: String
        STYLE_CD: String
        BUYER_CD: String
        DEBIT_AMOUNT: Float
        CURR_CD: String
        FACTORY_CD: String
        REMARK: String
        REF_NO: String
        PRE_FLAG: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KZZ_DEBIT_COST {
        DEBIT_CD: String
        SEQ: Int
        YY: Int
        CRDB_CD: String
        STYLE_CD: String
        BUYER_CD: String
        DEBIT_AMOUNT: Float
        CURR_CD: String
        FACTORY_CD: String
        REMARK: String
        REF_NO: String
        PRE_FLAG: String
        END_FLAG: String
        END_DATE: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_DEBIT_COST;
