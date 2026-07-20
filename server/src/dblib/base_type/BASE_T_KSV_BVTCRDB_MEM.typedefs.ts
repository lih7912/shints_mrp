// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_BVTCRDB_MEM = gql`
    type BASE_QRY_KSV_BVTCRDB_MEM {
        CRDB_CD: String
        END_DATE: String
        CRDB_AMT: Float
        REF_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }

    input BASE_INPUT_KSV_BVTCRDB_MEM {
        CRDB_CD: String
        END_DATE: String
        CRDB_AMT: Float
        REF_NO: String
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_BVTCRDB_MEM;
