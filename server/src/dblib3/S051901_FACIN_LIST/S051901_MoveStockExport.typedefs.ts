// S051901_MoveStockExport.typeDefs.ts

import { gql } from 'apollo-server';

const moduleTypedefs_S051901_MoveStockExport = gql`
    input I_S051901_MoveStockExport {
        ATA: String
        BUYER_CD: String
        VENDOR_NAME: String
        PO_CD: String
        MATL_CD: String
        MATL_NAME: String
        COLOR: String
        SPEC: String
        UNIT: String
        STATUS_CD: String
        STATUS_CD_N: String
        FACIN_QTY: Float
        MOQ: Float
        DELIVERY: String
        LOCATION: String
        FACTORY_CD: String
    }

    type Ret_S051901_MoveStockExport {
        id: Int
        CODE: String
    }

    type Query {
        mgrExport_S051901_MoveStock(
            datas: [I_S051901_MoveStockExport!]!
        ): [Ret_S051901_MoveStockExport!]!
    }
`;

export default moduleTypedefs_S051901_MoveStockExport;