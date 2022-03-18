import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'


export default function Home({ results }) {
  console.log(results);
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/** Header */}
      <Header></Header>
      {/** Nav */}
      <Nav></Nav>
      {/** Results */}
      <Results results={results}></Results>
    </div>
  )
}

// make this page only server side rendering
export async function getServerSideProps(context) {
  // precogemos de la url el parametro y creamos la peticion para esperarla y pasarsela como prosp
  const genre = context.query.genre;

  console.log(`https://api.themoviedb.org/3${
    requests[genre]?.url || requests.fetchTrending.url
  }`);

  const request = await fetch(`https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url}`)
  const {results} = await request.json();
  return {
    props: {
      results: results
    }
  }
}