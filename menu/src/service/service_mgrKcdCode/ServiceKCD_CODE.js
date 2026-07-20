import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_CODE {
    async getDatasKCD_CODE_GROUP(argGroup) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        const qry_code = argGroup;

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QryGroupKCD_CODE($cdGroup: String!) {
                        qryGroupKCD_CODE(CD_GROUP: $cdGroup) {
                            id
                            CD_GROUP
                            CD_CODE
                            CD_NAME
                            CD_FLAG
                        }
                    }
                `,
                variables: { cdGroup: qry_code },
            });
            console.log("KCD_CODE_STATUS_CD:", error);
            console.log(
                "KCD_CODE_STATUS_CD:",
                JSON.stringify(data.qryGroupKCD_CODE.length),
            );
            return data.qryGroupKCD_CODE;
        } catch (e) {
            return e;
        }
    }
}
