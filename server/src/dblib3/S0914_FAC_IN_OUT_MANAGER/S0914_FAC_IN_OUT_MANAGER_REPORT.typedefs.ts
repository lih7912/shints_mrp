import { gql } from 'apollo-server-express';

const typeDefs = gql`
    input I_S0914_FAC_IN_OUT_MANAGER_REPORT {
        PO_CD: String
        ORDER_CD: String
        SUPPLIER: String
        DESCRIPTION: String
        UNIT: String
        MATL_CD: String
        COLOR: String
        SPEC: String
    }

    type O_S0914_FAC_IN_OUT_MANAGER_REPORT {
        id: String
        CODE: String
    }

    # Query 정의
    type Query {
        mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT(
            data: I_S0914_FAC_IN_OUT_MANAGER_REPORT!
        ): [O_S0914_FAC_IN_OUT_MANAGER_REPORT!]!
        mgrQuery_S0914_FAC_IN_OUT_MANAGER_REPORT2(
            data: I_S0914_FAC_IN_OUT_MANAGER_REPORT!
        ): [O_S0914_FAC_IN_OUT_MANAGER_REPORT!]!
    }
`;

export default typeDefs;
