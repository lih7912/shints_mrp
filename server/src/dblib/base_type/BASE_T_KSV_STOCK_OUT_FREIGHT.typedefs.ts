// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_KSV_STOCK_OUT_FREIGHT = gql`
    type BASE_QRY_KSV_STOCK_OUT_FREIGHT {
        PACK_CD: String
        BUYER_CD: String
        DELAY_REASON: String
        CHARGE_KIND: String
        BUYER_TEAM: String
        PART: String
        AMOUNT: String
        CURR_CD: String
        FRT_PERCENT: String
        PERCENT_FLAG: String
        DISTRIBUTE_FLAG: String
        FRT_FLAG: String
        COST: String
        COST_DISTRIBUTE: String
    }

    input BASE_INPUT_KSV_STOCK_OUT_FREIGHT {
        PACK_CD: String
        BUYER_CD: String
        DELAY_REASON: String
        CHARGE_KIND: String
        BUYER_TEAM: String
        PART: String
        AMOUNT: String
        CURR_CD: String
        FRT_PERCENT: String
        PERCENT_FLAG: String
        DISTRIBUTE_FLAG: String
        FRT_FLAG: String
        COST: String
        COST_DISTRIBUTE: String
    }
`;

export default moduleTypedefs_BASE_KSV_STOCK_OUT_FREIGHT;
