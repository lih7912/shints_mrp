// MGR_@@TNAME@@.typeDefs.js

// 데이터 형식(typeDefs) 지정하기 위한 gql 불러오기
import { gql } from 'apollo-server';

// export default 활용해 gql typeDefs 내보내기
const moduleTypedefs_S041205_PACK_CONFIRM = gql`
    input I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT {
        ETD: String
        ETA: String
    }

    type Ret_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT {
        id: Int!
        CODE: String!
    }

    type Mutation {
        mgrInsert_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
            datas: [I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
        ): [Ret_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
        mgrUpdate_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
            datas: [I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
        ): [Ret_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
        mgrDelete_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT(
            datas: [I_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
        ): [Ret_S041205_PACK_CONFIRM_EDT_KSV_STOCK_OUT!]!
    }
`;

export default moduleTypedefs_S041205_PACK_CONFIRM;
