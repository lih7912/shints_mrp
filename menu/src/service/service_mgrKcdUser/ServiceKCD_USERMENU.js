import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKCD_USERMENU {
    async qryUserIdKCD_USERMENU(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query QryUserIdKCD_USERMENU($userId: String!) {
                        qryUserIdKCD_USERMENU(USER_ID: $userId) {
                            id
                            USER_ID
                            MENU_ID
                            AUTH_FLAG
                            UPD_FLAG
                            MENU_NAME
                        }
                    }
                `,
                variables: { userId: argData.USER_ID },
            });
            console.log(
                "qryUserIdKCD_USERMENU:",
                JSON.stringify(data.qryUserIdKCD_USERMENU.length),
            );
            return data.qryUserIdKCD_USERMENU;
        } catch (e) {
            return e;
        }
    }

    async insertsDataKCD_USERMENU(argUserId, argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:4000/graphql",
            cache: new InMemoryCache(),
        });

        var tObjs = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tOne = argDatas[tIdx];
            var tOneObj = {};
            tOneObj.USER_ID = argUserId;
            tOneObj.MENU_ID = tOne.MENU_ID;
            tOneObj.AUTH_FLAG = tOne.AUTH_FLAG;
            tOneObj.UPD_FLAG = tOne.UPD_FLAG;
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.datas = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKcdUserMenuInserts(
                        $datas: [InputMgrKcdUserMenuInserts!]!
                    ) {
                        mgrKcdUserMenuInserts(datas: $datas) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log("KCD_USERMENU DELETES:", JSON.stringify(data));
            return data;
        } catch (e) {
            return e;
        }
    }
}
