import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/Link'

export default function pokemon({pokeman}) {
  return (
    <Layout title={pokeman.name}>
      <div className="border p-4 border-gray my-2 bg-gray-200 rounder-md">
        <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
        <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
        <p>
          <span className="font-bold mr-2">Weight: {pokeman.weight}</span>
        </p>
        <p>
          <span className="font-bold mr-2">Height: {pokeman.height}</span>
        </p>
        <h2 className="text-2xl mt-6 mb-2">Types</h2>
        {pokeman.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <p className="mt-top text-center">
          <Link href="/">
            <a className="text-2xl underline">Home</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  const id = params.id
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokeman = await res.json()
    const paddedIndex = ('00' + id).slice(-3)

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`
    pokeman.image = image

    return {
      props: {pokeman},
    }
  } catch (err) {
    console.log(err)
  }
}
