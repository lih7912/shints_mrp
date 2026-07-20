// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_BASE_a_stock_update = gql`
    type BASE_QRY_a_stock_update {
        stock_idx: String
        remark: String
        exp_date: String
        reason_remark: String
        plan_remark: String
        rack: String
        debit_cd: String
        id: Int
    }

    input BASE_INPUT_a_stock_update {
        stock_idx: String
        remark: String
        exp_date: String
        reason_remark: String
        plan_remark: String
        rack: String
        debit_cd: String
        id: Int
    }
`;

export default moduleTypedefs_BASE_a_stock_update;
