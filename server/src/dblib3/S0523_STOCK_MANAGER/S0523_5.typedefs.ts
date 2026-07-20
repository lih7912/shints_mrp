// MGR_S0523_4_one.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S0523_5 = gql`
    input I_S0523_5 {
        STOCK_DATE: String
        CHARGER: String
        OWNER_SHIP: String
        REASON_MAKE: String
        AUTHORITY: String
        CONDITION: String
        MANAGER: String
        REMARK: String
        REASON_REMARK: String
        PLAN_REMARK: String
        PURPOSE: String
        RACK: String
        LOCATION: String
        WARE_CD: String
        DEBIT_DATE: String
        DEBIT_AMT: String
        DEFECT_QTY: String
        FACTORY_CD: String
        STOCK_IDX: String
        BUYER_CD: String
        STOCK_PRICE: String
        CHANGE_QTY: String
        STOCK_STATUS_1:String
        STOCK_STATUS_S:String
    }

    input I_S0523_5_BATCH {
        STOCK_IDX: String
    }

    type Ret_S0523_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S0523_5_STOCK_UPDATE(datas: I_S0523_5!): [Ret_S0523_5!]!
        mgrUpdate_S0523_5_UPDATE_QTY(datas: I_S0523_5!): [Ret_S0523_5!]!
        mgrUpdate_S0523_5_BATCH_UPDATE(
            datas: I_S0523_5!
            datas1: [I_S0523_5_BATCH!]!
        ): [Ret_S0523_5!]!
        mgrUpdate_S0523_5_DEFECT_UPDATE(datas: I_S0523_5!): [Ret_S0523_5!]!
        mgrUpdate_S0523_5_FACTORY_UPDATE(datas: I_S0523_5!): [Ret_S0523_5!]!
    }
`;

export default moduleTypedefs_S0523_5;
