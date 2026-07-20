import { gql } from 'apollo-server';

const moduleTypedefs_S0436_5 = gql`
    input I_S0436_5 {
        SHIPMENT_CD: String
        SAVE_TYPE: String
        LOCAL_PAY_IMPORT_COST: String
        HQ_PAY_IMPORT_COST: String
        IMPORT_COST_PAID: String
        IMPORT_COST_PAID_LOCAL: String
        CURR_CD: String
        CURR_CD_LOCAL: String
        CHK_SHINTS: String
        CHK_BVT: String
        CHK_ETP: String
        CHK_OTHER: String
        DUTY_COST: String
    }

    type Ret_S0436_5 {
        CODE: String
        id: Int
    }

    type Mutation {
        mgrUpdate_S0436_5(datas: I_S0436_5!): [Ret_S0436_5!]!
    }
`;

export default moduleTypedefs_S0436_5;
