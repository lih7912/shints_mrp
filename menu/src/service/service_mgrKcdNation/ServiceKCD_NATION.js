import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_NATION {
    async getDatasKCD_NATION() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_NATION {
                        allQueryKCD_NATION {
                            id
                            NAT_CD
                            NAT_NAME
                            STATUS_CD
                            REG_USER
                            REG_DATETIME
                            NAT_IDX
                        }
                    }
                `,
                variables: {},
            });
            console.log("KCD_NATION:", error);
            console.log(
                "KCD_NATION:",
                JSON.stringify(data.allQueryKCD_NATION.length),
            );
            return data.allQueryKCD_NATION;
        } catch (e) {
            return e;
        }
    }
}
