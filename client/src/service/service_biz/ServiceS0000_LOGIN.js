/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import apolloOption from "../../assets/env_graphql";

export class ServiceS0000_LOGIN {
    // SERVICE: EDT_KCD_USER
    async mgrQuery_USER_CHECK(argQRY_KCD_USER_CHECK) {
        var tHeader = {};
        tHeader.authorization = "AFTEST:AFTEA";
        tHeader.clientname = "LOGIN";

        apolloOption.cache = new InMemoryCache();
        apolloOption.headers = { ...tHeader };
        const client = new ApolloClient(apolloOption);

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QmgrQueryTBL_KCD_USER_CHECK(
                        $data: I_S0111_KCD_USER_CHECK!
                    ) {
                        mgrQuery_S0111_KCD_USER_CHECK(data: $data) {
                            USER_ID
                            PASSWD
                            USER_NAME
                            FACTORY_NAME
                            FACTORY_CD
                            PART
                            RANK
                            EMAIL
                            TEL_NO
                            STATUS_CD
                            company_code
                        }
                    }
                `,
                variables: {
                    data: argQRY_KCD_USER_CHECK,
                },
            });
            // console.log("marQuery_S0000_LOGIN_TBL_KCD_USER:" + data.mgrQuery_S0000_LOGIN_TBL_KCD_USER.length );
            return data.mgrQuery_S0111_KCD_USER_CHECK;
        } catch (e) {
            return e;
        }
    }
}
