/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceMgrKCD_PLACE {
    async getDatasByParam(qryName, qryStatusCd) {
        apolloOption.cache = new InMemoryCache();
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKcdCustomerPlaceQuery(
                        $customerName: String!
                        $statusCd: String!
                    ) {
                        mgrKcdCustomerPlaceQuery(
                            CUSTOMER_NAME: $customerName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            PLACE_CD
                            PLACE_NAME
                            PLACE_TYPE
                            DELIVERY_TYPE
                            USER_NAME
                            TEL_NO
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            UPD_USER
                            UPD_DATETIME
                            STATUS_NAME
                        }
                    }
                `,
                variables: { customerName: qryName, statusCd: qryStatusCd },
            });
            console.log(
                "MGR_KCD_PLACE:",
                JSON.stringify(data.mgrKcdCustomerPlaceQuery.length),
            );
            return data.mgrKcdCustomerPlaceQuery;
        } catch (e) {
            return e;
        }
    }
}
