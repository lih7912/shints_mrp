/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_FACTORY {
    async getDatasByParam(qryName, qryStatusCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdCustomerFactoryQuery(
                        $customerName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCustomerFactoryQuery(
                            CUSTOMER_NAME: $customerName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            FACTORY_CD
                            FACTORY_NAME
                            FACTORY_NAME2
                            USER_NAME
                            EMAIL
                            COUNTRY
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            PORT
                            AIRPORT
                            NAT_CD
                            BANK_CD
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            tag_po
                            tag_order
                            place_cd
                            PACK_NAME
                            NAT_NAME
                            STATUS_NAME
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                        }
                    }
                `,
                variables: { customerName: qryName, statusCd: qryStatusCd },
            });
            console.log(
                "MGR_KCD_FACTORY:",
                JSON.stringify(data.mgrKcdCustomerFactoryQuery.length),
            );
            return data.mgrKcdCustomerFactoryQuery;
        } catch (e) {
            return e;
        }
    }
}
