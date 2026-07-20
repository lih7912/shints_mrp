/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_VENDOR {
    async getDatasByParam(qryName, qryStatusCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdCustomerVendorQuery(
                        $customerName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCustomerVendorQuery(
                            CUSTOMER_NAME: $customerName
                            STATUS_CD: $statusCd
                        ) {
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
                            NAT_NAME
                            STATUS_NAME
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            VENDOR_TYPE_1
                            VENDOR_MATL_TYPE_1
                        }
                    }
                `,
                variables: { customerName: qryName, statusCd: qryStatusCd },
            });
            console.log(
                "MGR_KCD_VENDOR:",
                JSON.stringify(data.mgrKcdCustomerVendorQuery.length),
            );
            return data.mgrKcdCustomerVendorQuery;
        } catch (e) {
            return e;
        }
    }
}
