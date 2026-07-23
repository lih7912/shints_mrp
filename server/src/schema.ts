// schema.js
// import path from 'path';
// const __dirname = path.resolve();


// typeDefs, resolver 파일 합칠때 사용
import { makeExecutableSchema } from '@graphql-tools/schema';

// 조건 만족하는 파일 불러올때 사용
import { loadFilesSync } from '@graphql-tools/load-files';

// typeDefs는 typeDefs끼리, resolvers는 resolvers끼리 합칠때 사용
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

/*
  loadFilesSync로, 현재폴더(__dirname)에 있는, 모든폴더(**) 속,
  typeDefs.js로 끝나는 모든파일(*) 불러오기
*/
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typedefs.ts`);

/*
  loadFilesSync로, 현재폴더(__dirname)에 있는, 모든폴더(**) 속,
  queries.js와 mutations.js로 끝나는 모든파일(*) 불러오기
*/
const ext = __filename.endsWith('.ts') ? 'ts' : 'js';

const loadedTypes = loadFilesSync(
    `${__dirname}/**/*.typedefs.${ext}`
);

const loadedResolvers = loadFilesSync(
    `${__dirname}/**/*.{queries,mutations}.${ext}`,
    {
        ignoreIndex: true,
        extractExports: (mod: any) => mod.default ?? mod.resolvers ?? mod,
    },
);

// 불러온 typeDefs 합치기
const typeDefs = mergeTypeDefs(loadedTypes);

// 불러온 Queries, Mutations 합치기
const resolvers = mergeResolvers(loadedResolvers);

// 합쳐진 typeDefs, resolvers로 Schema 만들기
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// 서버를 띄우기 직전
//console.log(JSON.stringify(Object.keys((resolvers as any)?.Query || {}), null, 2));

// export defult로 최종 Schema 내보내기
export default schema;
