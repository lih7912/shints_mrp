// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KCD_MATL_MEM = gql`
    type BASE_QRY_KCD_MATL_MEM {
        MATL_CD: String
        MATL_SEQ: Int
        MATL_PRICE: Float
        CURR_CD: String
        CONF_FLAG: String
        PRICE_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        matl_mprice: Float
        REMARK: String
        id: Int
    }

    input BASE_INPUT_KCD_MATL_MEM {
        MATL_CD: String
        MATL_SEQ: Int
        MATL_PRICE: Float
        CURR_CD: String
        CONF_FLAG: String
        PRICE_TYPE: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        matl_mprice: Float
        REMARK: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_KCD_MATL_MEM;
