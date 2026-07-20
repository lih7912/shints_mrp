/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_BUYER {
    async getDatasByParam(qryName, qryStatusCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdCustomerBuyerQuery(
                        $customerName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCustomerBuyerQuery(
                            CUSTOMER_NAME: $customerName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            BUYER_CD
                            BUYER_NAME
                            BUYER_ABBR
                            BUYER_TEAM
                            SHINTS_USER
                            USER_NAME
                            EMAIL
                            TEL_NO
                            FAX_NO
                            ZIP_NO
                            ADDR1
                            ADDR2
                            COMM_FLAG
                            SALES_TEAM
                            NAT_CD
                            BANK_CD
                            STS_FLAG
                            BVT_FLAG
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            NEOE_BUYER_CD_MOM
                            NEOE_BUYER_CD
                            NEOE_A23
                            loss_flag
                            glove_flag
                            MOM_CD
                            BUYER_TYPE
                            PAY_RULE
                            CREDIT_RATING
                            NAT_NAME
                            STATUS_NAME
                            BANK_NAME
                            ACCOUNT_NO
                            ACCOUNT_NAME
                            PAY_RULE_NAME
                        }
                    }
                `,
                variables: { customerName: qryName, statusCd: qryStatusCd },
            });
            console.log(
                "MGR_KCD_BUYER:",
                JSON.stringify(data.mgrKcdCustomerBuyerQuery.length),
            );
            return data.mgrKcdCustomerBuyerQuery;
        } catch (e) {
            return e;
        }
    }
}
