/* eslint-disable */
import axios from "axios";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

export class ServiceKSV_PRODUCTION_SCHEDULE {
    async getDatas() {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query AllQueryKSV_PRODUCTION_SCHEDULE {
                        allQueryKSV_PRODUCTION_SCHEDULE {
                            id
                            A
                            B
                            C
                            D
                            E
                            F
                            G
                            H
                            I
                            J
                            K
                            L
                            M
                            N
                            O
                            P
                            Q
                            R
                            S
                            T
                            U
                            V
                            W
                            X
                            Y
                            Z
                            AA
                            AB
                            AC
                            AD
                            AE
                            AF
                            AG
                            AH
                            AI
                            AJ
                            AK
                            AL
                            AM
                            AN
                            AO
                            BC
                            BD
                            BE
                            BF
                            BG
                        }
                    }
                `,
            });
            console.log(
                "KSV_PRODUCTION_SCHEDULE:",
                JSON.stringify(data.allQueryKSV_PRODUCTION_SCHEDULE.length),
            );
            return data.allQueryKSV_PRODUCTION_SCHEDULE;
        } catch (e) {
            return e;
        }
    }

    async getDatasByParam(qrySearchString, qryStatus) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.query({
                query: gql`
                    query MgrKsvProductionScheduleQuery(
                        $bankName: String!
                        $statusCd: String!
                    ) {
                        mgrKsvProductionScheduleQuery(
                            BANK_NAME: $bankName
                            STATUS_CD: $statusCd
                        ) {
                            id
                            A
                            B
                            C
                            D
                            E
                            F
                            G
                            H
                            I
                            J
                            K
                            L
                            M
                            N
                            O
                            P
                            Q
                            R
                            S
                            T
                            U
                            V
                            W
                            X
                            Y
                            Z
                            AA
                            AB
                            AC
                            AD
                            AE
                            AF
                            AG
                            AH
                            AI
                            AJ
                            AK
                            AL
                            AM
                            AN
                            AO
                            BC
                            BD
                            BE
                            BF
                            BG
                        }
                    }
                `,
                variables: { bankName: qrySearchString, statusCd: qryStatus },
            });
            console.log(
                "KSV_PRODUCTION_SCHEDULE:",
                JSON.stringify(data.mgrKsvProductionScheduleQuery.length),
            );
            return data.mgrKsvProductionScheduleQuery;
        } catch (e) {
            return e;
        }
    }

    async createData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation CreateKSV_PRODUCTION_SCHEDULE(
                        $a: String
                        $b: String
                        $c: String
                        $d: String
                        $e: String
                        $f: String
                        $g: String
                        $h: Int
                        $i: Int
                        $j: String
                        $k: String
                        $l: Int
                        $m: String
                        $n: Int
                        $o: String
                        $p: String
                        $q: String
                        $r: String
                        $s: String
                        $t: String
                        $u: Int
                        $v: String
                        $w: String
                        $x: String
                        $y: String
                        $z: String
                        $aa: String
                        $ab: String
                        $ac: String
                        $ad: String
                        $ae: String
                        $af: String
                        $ag: String
                        $ah: String
                        $ai: String
                        $aj: Int
                        $ak: Float
                        $al: Float
                        $am: Int
                        $an: Float
                        $ao: Float
                        $bc: Float
                        $bd: Float
                        $be: Float
                        $bf: Float
                        $bg: Float
                    ) {
                        createKSV_PRODUCTION_SCHEDULE(
                            A: $a
                            B: $b
                            C: $c
                            D: $d
                            E: $e
                            F: $f
                            G: $g
                            H: $h
                            I: $i
                            J: $j
                            K: $k
                            L: $l
                            M: $m
                            N: $n
                            O: $o
                            P: $p
                            Q: $q
                            R: $r
                            S: $s
                            T: $t
                            U: $u
                            V: $v
                            W: $w
                            X: $x
                            Y: $y
                            Z: $z
                            AA: $aa
                            AB: $ab
                            AC: $ac
                            AD: $ad
                            AE: $ae
                            AF: $af
                            AG: $ag
                            AH: $ah
                            AI: $ai
                            AJ: $aj
                            AK: $ak
                            AL: $al
                            AM: $am
                            AN: $an
                            AO: $ao
                            BC: $bc
                            BD: $bd
                            BE: $be
                            BF: $bf
                            BG: $bg
                        ) {
                            A
                            B
                            C
                            D
                            E
                            F
                            G
                            H
                            I
                            J
                            K
                            L
                            M
                            N
                            O
                            P
                            Q
                            R
                            S
                            T
                            U
                            V
                            W
                            X
                            Y
                            Z
                            AA
                            AB
                            AC
                            AD
                            AE
                            AF
                            AG
                            AH
                            AI
                            AJ
                            AK
                            AL
                            AM
                            AN
                            AO
                            BC
                            BD
                            BE
                            BF
                            BG
                        }
                    }
                `,
                variables: {
                    a: argData.A,
                    b: argData.B,
                    c: argData.C,
                    d: argData.D,
                    e: argData.E,
                    f: argData.F,
                    g: argData.G,
                    h: argData.H,
                    i: argData.I,
                    j: argData.J,
                    k: argData.K,
                    l: argData.L,
                    m: argData.M,
                    n: argData.N,
                    o: argData.O,
                    p: argData.P,
                    q: argData.Q,
                    r: argData.R,
                    s: argData.S,
                    t: argData.T,
                    u: argData.U,
                    v: argData.V,
                    w: argData.W,
                    x: argData.X,
                    y: argData.Y,
                    z: argData.Z,
                    aa: argData.AA,
                    ab: argData.AB,
                    ac: argData.AC,
                    ad: argData.AD,
                    ae: argData.AE,
                    af: argData.AF,
                    ag: argData.AG,
                    ah: argData.AH,
                    ai: argData.AI,
                    aj: argData.AJ,
                    ak: argData.AK,
                    al: argData.AL,
                    am: argData.AM,
                    an: argData.AN,
                    ao: argData.AO,
                    bc: argData.BC,
                    bd: argData.BD,
                    be: argData.BE,
                    bf: argData.BF,
                    bg: argData.BG,
                },
            });
            console.log(
                "KSV_PRODUCTION_SCHEDULE INSERT:",
                JSON.stringify(data.createKSV_PRODUCTION_SCHEDULE),
            );
            return data.createKSV_PRODUCTION_SCHEDULE;
        } catch (e) {
            console.log(
                "KSV_PRODUCTION_SCHEDULE INSERT ERROR:",
                JSON.stringify(e),
            );
            return e;
        }
    }

    async updateData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation UpdateKSV_PRODUCTION_SCHEDULE(
                        $updateKsvProductionScheduleId: Int!
                        $a: String
                        $b: String
                        $c: String
                        $d: String
                        $e: String
                        $f: String
                        $g: String
                        $h: Int
                        $i: Int
                        $j: String
                        $k: String
                        $l: Int
                        $m: String
                        $n: Int
                        $o: String
                        $p: String
                        $q: String
                        $r: String
                        $s: String
                        $t: String
                        $u: Int
                        $v: String
                        $w: String
                        $x: String
                        $y: String
                        $z: String
                        $aa: String
                        $ab: String
                        $ac: String
                        $ad: String
                        $ae: String
                        $af: String
                        $ag: String
                        $ah: String
                        $ai: String
                        $aj: Int
                        $ak: Float
                        $al: Float
                        $am: Int
                        $an: Float
                        $ao: Float
                        $bc: Float
                        $bd: Float
                        $be: Float
                        $bf: Float
                        $bg: Float
                    ) {
                        updateKSV_PRODUCTION_SCHEDULE(
                            id: $updateKsvProductionScheduleId
                            A: $a
                            B: $b
                            C: $c
                            D: $d
                            E: $e
                            F: $f
                            G: $g
                            H: $h
                            I: $i
                            J: $j
                            K: $k
                            L: $l
                            M: $m
                            N: $n
                            O: $o
                            P: $p
                            Q: $q
                            R: $r
                            S: $s
                            T: $t
                            U: $u
                            V: $v
                            W: $w
                            X: $x
                            Y: $y
                            Z: $z
                            AA: $aa
                            AB: $ab
                            AC: $ac
                            AD: $ad
                            AE: $ae
                            AF: $af
                            AG: $ag
                            AH: $ah
                            AI: $ai
                            AJ: $aj
                            AK: $ak
                            AL: $al
                            AM: $am
                            AN: $an
                            AO: $ao
                            BC: $bc
                            BD: $bd
                            BE: $be
                            BF: $bf
                            BG: $bg
                        ) {
                            id
                            A
                            B
                            C
                            D
                            E
                            F
                            G
                            H
                            I
                            J
                            K
                            L
                            M
                            N
                            O
                            P
                            Q
                            R
                            S
                            T
                            U
                            V
                            W
                            X
                            Y
                            Z
                            AA
                            AB
                            AC
                            AD
                            AE
                            AF
                            AG
                            AH
                            AI
                            AJ
                            AK
                            AL
                            AM
                            AN
                            AO
                            BC
                            BD
                            BE
                            BF
                            BG
                        }
                    }
                `,
                variables: {
                    updateKsvProductionScheduleId: argData.id,
                    a: argData.A,
                    b: argData.B,
                    c: argData.C,
                    d: argData.D,
                    e: argData.E,
                    f: argData.F,
                    g: argData.G,
                    h: argData.H,
                    i: argData.I,
                    j: argData.J,
                    k: argData.K,
                    l: argData.L,
                    m: argData.M,
                    n: argData.N,
                    o: argData.O,
                    p: argData.P,
                    q: argData.Q,
                    r: argData.R,
                    s: argData.S,
                    t: argData.T,
                    u: argData.U,
                    v: argData.V,
                    w: argData.W,
                    x: argData.X,
                    y: argData.Y,
                    z: argData.Z,
                    aa: argData.AA,
                    ab: argData.AB,
                    ac: argData.AC,
                    ad: argData.AD,
                    ae: argData.AE,
                    af: argData.AF,
                    ag: argData.AG,
                    ah: argData.AH,
                    ai: argData.AI,
                    aj: argData.AJ,
                    ak: argData.AK,
                    al: argData.AL,
                    am: argData.AM,
                    an: argData.AN,
                    ao: argData.AO,
                    bc: argData.BC,
                    bd: argData.BD,
                    be: argData.BE,
                    bf: argData.BF,
                    bg: argData.BG,
                },
            });
            console.log(
                "KSV_PRODUCTION_SCHEDULE UPDATE:",
                JSON.stringify(data.updateKSV_PRODUCTION_SCHEDULE),
            );
            return data.updateKSV_PRODUCTION_SCHEDULE;
        } catch (e) {
            return e;
        }
    }

    async deleteData(argData) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation DeleteKSV_PRODUCTION_SCHEDULE(
                        $deleteKsvProductionScheduleId: Int!
                    ) {
                        deleteKSV_PRODUCTION_SCHEDULE(
                            id: $deleteKsvProductionScheduleId
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    deleteKsvProductionScheduleId: argData.id,
                },
            });
            console.log(
                "KSV_PRODUCTION_SCHEDULE DELETE:",
                JSON.stringify(data.deleteKSV_PRODUCTION_SCHEDULE),
            );
            return data.deleteKSV_PRODUCTION_SCHEDULE;
        } catch (e) {
            return e;
        }
    }

    async deletesData(argDatas) {
        const client = new ApolloClient({
            uri: "http://localhost:3202/graphql",
            cache: new InMemoryCache(),
        });

        var tObjs = [];
        var tIdx = 0;
        for (tIdx = 0; tIdx < argDatas.length; tIdx++) {
            var tOne = argDatas[tIdx];
            var tOneObj = {};
            tOneObj.id = tOne.id;
            tObjs.push(tOneObj);
        }
        var tInputs = {};
        tInputs.ids = tObjs;
        console.log(JSON.stringify(tInputs));

        try {
            const { loading, error, data } = await client.mutate({
                mutation: gql`
                    mutation MgrKsvProductionScheduleDeletes(
                        $ids: [InputMgrKsvProductionScheduleDeletes!]!
                    ) {
                        mgrKsvProductionScheduleDeletes(ids: $ids) {
                            count
                        }
                    }
                `,
                variables: tInputs,
            });
            console.log(
                "KSV_PRODUCTION_SCHEDULE DELETES:",
                JSON.stringify(data),
            );
            return data;
        } catch (e) {
            return e;
        }
    }
}
