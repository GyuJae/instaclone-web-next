# Instagram clone Web
![background](https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/874cb7f8-fa41-4b83-e80b-3aa8e5f4b100/public)

- **Deploy URL** <br/> https://tranquil-moxie-b25f5b.netlify.app/
- **Github Repository URL** <br/> https://github.com/GyuJae/instaclone-web-next
- **BackEnd Github Repository URL** <br/>https://github.com/GyuJae/instagramclone_backend
- **Native App Repository URL** <br/> https://github.com/GyuJae/instaclone-native

## ๐  ์ฌ์ดํธ ๊ธฐ๋ฅ ์๊ฐ

### SSR(NextJS) + Apollo Client

- NextJS๋ฅผ ์ด์ฉํ์ฌ Graphql API๋ฅผ SSR ํ์๋ค.
- SSR๋ก ์ธํด path ์ด๋ ๋ก๋ฉ์๊ฐ์ด ๊ธธ์ด์ ธ NextJS Router ๊ธฐ๋ฅ์ ์ด์ฉํ์ฌ route ์ด๋์ ๋ก๋ฉ ํ๋ฉด์ ๋ณด์ฌ์ฃผ์๋ค.
``` ts
import Router from 'next/router';

useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);
```

### Iron Session + Auth 

- login ์ jwt token์ iron session์ ์ ์ฅํ์ฌ SSR์์ AUTH ๊ธฐ๋ฅ์ ์ฌ์ฉํ์๋ค.
```ts
export const getServerSideProps: GetServerSideProps = withSsrSession(async ({ req, query }) => {
  if (!req.session.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {},
  });
})
```

### Apllo Cache
- Apollo Cache๋ฅผ ์ด์ฉํ์ฌ cache์ ์ ์ฅ๋ ๋ฐ์ดํฐ๋ฅผ ์๋์ผ๋ก ์กฐ์ํ์ฌ ์๋ฒ์์ ํต์  ์์ด ์ค์๊ฐ์ผ๋ก ๋ฐ์ดํฐ๋ฅผ ๋ณ๊ฒฝ ๋๋ ์ถ๊ฐํ์๋ค. 

```ts
const [toggleLikeMutate, { loading, error }] = useMutation<IToggleLikeMutation, IToggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        input: {
          postId,
        },
      },
      update: (cache, { data }) => {
        if (data?.toggleLike.ok) {
          const POST_ID = `PostEntity:${postId}`;
          cache.modify({
            id: POST_ID,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likeCount(prev) {
                if (isLiked) {
                  return prev - 1;
                }
                return prev + 1;
              },
            },
          });
        }
      },
    }
  );
```