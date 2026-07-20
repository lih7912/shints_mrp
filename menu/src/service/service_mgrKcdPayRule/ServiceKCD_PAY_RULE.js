import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_PAY_RULE {
    async getDatasKCD_PAY_RULE() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_PAY_RULE {
                        allQueryKCD_PAY_RULE {
                            id
                            SEQ
                            CD_CODE
                            REMARK
                            RATE
                            FLAG
                            TERM
                            FN
                            YN_DEFAULT
                            DAYS1
                            PERCENT1
                            DAYS2
                            PERCENT2
                            DAYS3
                            PERCENT3
                        }
                    }
                `,
                variables: {},
            });
            console.log("KCD_PAY_RULE:", error);
            console.log(
                "KCD_PAY_RULE:",
                JSON.stringify(data.allQueryKCD_PAY_RULE.length),
            );
            return data.allQueryKCD_PAY_RULE;
        } catch (e) {
            return e;
        }
    }
}
