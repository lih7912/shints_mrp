// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KZZ_EXCEL = gql`
    type BASE_QRY_KZZ_EXCEL {
        USER_ID: String
        EX_SEQ: Int
        EX_TYPE: String
        EX00: String
        EX01: String
        EX02: String
        EX03: String
        EX04: String
        EX05: String
        EX06: String
        EX07: String
        EX08: String
        EX09: String
        EX10: String
        EX11: String
        EX12: String
        EX13: String
        EX14: String
        EX15: String
        EX16: String
        EX17: String
        EX18: String
        EX19: String
        EX20: String
        EX21: String
        EX22: String
        EX23: String
        EX24: String
        EX25: String
        EX26: String
        EX27: String
        EX28: String
        EX29: String
        EX30: String
        EX31: String
        EX32: String
        EX33: String
        EX34: String
        EX35: String
        EX36: String
        EX37: String
        id: Int
    }

    input BASE_INPUT_KZZ_EXCEL {
        USER_ID: String
        EX_SEQ: Int
        EX_TYPE: String
        EX00: String
        EX01: String
        EX02: String
        EX03: String
        EX04: String
        EX05: String
        EX06: String
        EX07: String
        EX08: String
        EX09: String
        EX10: String
        EX11: String
        EX12: String
        EX13: String
        EX14: String
        EX15: String
        EX16: String
        EX17: String
        EX18: String
        EX19: String
        EX20: String
        EX21: String
        EX22: String
        EX23: String
        EX24: String
        EX25: String
        EX26: String
        EX27: String
        EX28: String
        EX29: String
        EX30: String
        EX31: String
        EX32: String
        EX33: String
        EX34: String
        EX35: String
        EX36: String
        EX37: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KZZ_EXCEL;
