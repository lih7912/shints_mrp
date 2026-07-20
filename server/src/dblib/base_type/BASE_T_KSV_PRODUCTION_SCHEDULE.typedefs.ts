// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_PRODUCTION_SCHEDULE = gql`
    type BASE_QRY_KSV_PRODUCTION_SCHEDULE {
        A: String
        B: String
        C: String
        D: String
        E: String
        F: String
        G: String
        H: Int
        I: Int
        J: String
        K: String
        L: Int
        M: String
        N: Int
        O: String
        P: String
        Q: String
        R: String
        S: String
        T: String
        U: Int
        V: String
        W: String
        X: String
        Y: String
        Z: String
        AA: String
        AB: String
        AC: String
        AD: String
        AE: String
        AF: String
        AG: String
        AH: String
        AI: String
        AJ: Int
        AK: Float
        AL: Float
        AM: Int
        AN: Float
        AO: Float
        BC: Float
        BD: Float
        BE: Float
        BF: Float
        BG: Float
        id: Int
    }

    input BASE_INPUT_KSV_PRODUCTION_SCHEDULE {
        A: String
        B: String
        C: String
        D: String
        E: String
        F: String
        G: String
        H: Int
        I: Int
        J: String
        K: String
        L: Int
        M: String
        N: Int
        O: String
        P: String
        Q: String
        R: String
        S: String
        T: String
        U: Int
        V: String
        W: String
        X: String
        Y: String
        Z: String
        AA: String
        AB: String
        AC: String
        AD: String
        AE: String
        AF: String
        AG: String
        AH: String
        AI: String
        AJ: Int
        AK: Float
        AL: Float
        AM: Int
        AN: Float
        AO: Float
        BC: Float
        BD: Float
        BE: Float
        BF: Float
        BG: Float
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_PRODUCTION_SCHEDULE;
