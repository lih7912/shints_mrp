// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_BVTCRDB_MST = gql`
    type BASE_QRY_KSV_BVTCRDB_MST {
        CRDB_CD: String
        CRDB_TYPE: String
        CRDB_DATE: String
        END_DATE: String
        MESSER_CD: String
        BUYER_CD: String
        ATTENTION: String
        CRDB_AMT: Float
        CURR_CD: String
        BANK_CD: String
        TITLE: String
        REMARK: String
        YY: Int
        SEQ: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_BVTCRDB_MST {
        CRDB_CD: String
        CRDB_TYPE: String
        CRDB_DATE: String
        END_DATE: String
        MESSER_CD: String
        BUYER_CD: String
        ATTENTION: String
        CRDB_AMT: Float
        CURR_CD: String
        BANK_CD: String
        TITLE: String
        REMARK: String
        YY: Int
        SEQ: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_BVTCRDB_MST;
