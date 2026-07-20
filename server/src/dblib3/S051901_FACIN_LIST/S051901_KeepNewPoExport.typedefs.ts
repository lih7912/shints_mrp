// S051901_KeepNewPoExport.typeDefs.ts

import { gql } from 'apollo-server';

const moduleTypedefs_S051901_KeepNewPoExport = gql`
    input I_S051901_KeepNewPoExport {
        ATA: String
        BUYER_CD: String
        VENDOR_NAME: String
        USER_ID: String
        PO_CD: String
        OLD_PON: String
        KEEP_NEW_PO: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        SHORTAGE_QTY: String
        DEFECT_QTY: String
        MOQ: Float
        STATUS_CD_N: String
        DELIVERY: String
        LOCATION: String
    }

    type Ret_S051901_KeepNewPoExport {
        id: Int
        CODE: String
    }

    type Query {
        mgrExport_S051901_KeepNewPO(
            datas: [I_S051901_KeepNewPoExport!]!
        ): [Ret_S051901_KeepNewPoExport!]!
    }
`;

export default moduleTypedefs_S051901_KeepNewPoExport;
