import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_VENDOR {
    async qryBankCdKCD_VENDOR(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QryBankCdKCD_VENDOR($bankCd: String!) {
                        qryBankCdKCD_VENDOR(BANK_CD: $bankCd) {
                            id
                            VENDOR_CD
                            VENDOR_NAME
                            INVOICE_NAME
                            VENDOR_TYPE
                            SHINTS_USER
                            REG_NO
                            PRESIDENT
                            USER_NAME
                            PART
                            RANK1
                            EMAIL
                            TEL_NO
                            FAX_NO
                            PAY_TYPE
                            PAY_TERM
                            LEAD_TIME
                            BANK_CD
                            NAT_CD
                            ZIP_NO
                            ADDR1
                            ADDR2
                            STATUS_CD
                            PERMIT
                            VENDOR_MATL_TYPE
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            BANK1
                            BANK2
                            GW
                            APPROKEY
                            BANK_CD2
                            BANK_CD3
                            NEOE_NO
                            REMARK
                        }
                    }
                `,
                variables: { bankCd: argData.BANK_CD },
            });
            console.log(
                "qryBankCdKCD_VENDOR:",
                JSON.stringify(data.qryBankCdKCD_VENDOR.length),
            );
            return data.qryBankCdKCD_VENDOR;
        } catch (e) {
            return e;
        }
    }
}
