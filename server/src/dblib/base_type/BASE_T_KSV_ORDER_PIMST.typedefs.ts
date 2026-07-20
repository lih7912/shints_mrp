// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_ORDER_PIMST = gql`
    type BASE_QRY_KSV_ORDER_PIMST {
        PI_CD: String
        MESSERS: String
        ADDR1: String
        ADDR2: String
        CONSIGNEE: String
        CADDR1: String
        CADDR2: String
        PRICE_TERM: String
        DESTINATION: String
        PORT: String
        BANK_CD: String
        PAY_TYPE_CD: String
        BVT_FLAG: String
        PI_REMARK1: String
        PI_REMARK2: String
        PI_REMARK3: String
        PI_REMARK4: String
        PI_REMARK5: String
        PI_REMARK6: String
        PI_REMARK7: String
        PI_REMARK8: String
        YY: Int
        SEQ: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        PAY_RULE: Int
        id: Int
    }

    input BASE_INPUT_KSV_ORDER_PIMST {
        PI_CD: String
        MESSERS: String
        ADDR1: String
        ADDR2: String
        CONSIGNEE: String
        CADDR1: String
        CADDR2: String
        PRICE_TERM: String
        DESTINATION: String
        PORT: String
        BANK_CD: String
        PAY_TYPE_CD: String
        BVT_FLAG: String
        PI_REMARK1: String
        PI_REMARK2: String
        PI_REMARK3: String
        PI_REMARK4: String
        PI_REMARK5: String
        PI_REMARK6: String
        PI_REMARK7: String
        PI_REMARK8: String
        YY: Int
        SEQ: Int
        STATUS_CD: String
        REG_USER: String
        REG_DATETIME: String
        UPD_USER: String
        UPD_DATETIME: String
        PAY_RULE: Int
        id: Int
    }
`;

export default moduleTypedefs_BASE_KSV_ORDER_PIMST;
