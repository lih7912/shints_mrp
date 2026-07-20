// MGR_AF_S001_2_1.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_AF_S001_2_1 = gql`
    type T_AF_S001_2_1_MEM {
        USER_ID: String
        HEIGHT: String
        AGE: String
        REG_DATETIME: String
        WORK_SEQ: String
        KIND: String
        KIND2: String
        TIME: String
        TEMP: String
        ECG: String
        RESULT: String
        LENG: String
        STEP: String
        SIZE: String
        PACE: String
        SIZE1: String
        ANG: String
        STRENGTH: String
        LEFT_ANG: String
        RESULT2: String
        EMG: String
        EMG_TIME: String
        CNT: String
        ETC1: String
        ETC2: String
        ETC3: String
        ETC4: String
        ETC5: String
    }

    type T_AF_S001_2_1_MST {
        USER_ID: String
        HEIGHT: String
        AGE: String
        REG_DATETIME: String
        KIND: String
        KIND2: String
        TIME: String
        TEMP: String
        ECG: String
        RESULT: String
        LENG: String
        STEP: String
        SIZE: String
        PACE: String
        SIZE1: String
        ANG: String
        STRENGTH: String
        LEFT_ANG: String
        RESULT2: String
        EMG: String
        EMG_TIME: String
        CNT: String
        ETC1: String
        ETC2: String
        ETC3: String
        ETC4: String
        ETC5: String
        MEMS: [T_AF_S001_2_1_MEM!]!
    }

    input I_AF_S001_2_1 {
        KIND: String
        KIND2: String
        REG_DATETIME: String
        USER_ID: String
    }

    type Query {
        mgrQueryAF_S001_2_1(data: I_AF_S001_2_1!): [T_AF_S001_2_1_MST!]!
    }
`;

export default moduleTypedefs_AF_S001_2_1;
