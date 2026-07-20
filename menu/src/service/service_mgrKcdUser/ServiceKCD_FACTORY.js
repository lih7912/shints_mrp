import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_FACTORY {
    async getDatasKCD_FACTORY() {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKCD_FACTORY {
                        allQueryKCD_FACTORY {
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
                        }
                    }
                `,
                variables: {},
            });
            // console.log("KCD_FACTORY:", error);
            console.log("KCD_FACTORY:", data.allQueryKCD_FACTORY.length);
            return data.allQueryKCD_FACTORY;
        } catch (e) {
            console.log("KCD_FACTORY ERROR:", JSON.stringify(e));
            return e;
        }
    }
}
