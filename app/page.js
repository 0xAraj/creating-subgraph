"use client";
import React from "react";
import { useState, useEffect } from "react";
import { createClient, fetchExchange } from "urql";

const Page = () => {
  const [data, setData] = useState([]);

  const QueryUrl = `https://gateway.thegraph.com/api/591352066024286c95ffc6ba9892d09e/subgraphs/id/G1F2huam7aLSd2JYjxnofXmqkQjT5K2fRjdfapwiik9c`;
  const query = `{
    collections(first: 5) {
      id
      name
      symbol
      totalSupply
    }
  }`;

  const client = createClient({
    url: QueryUrl,
    exchanges: [fetchExchange],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query(query).toPromise();
      setData(data.collections);
      console.log(data.collections);
    };
    fetchData();
  }, []);
  return (
    <div className="w-2/3 mx-auto">
      <h1 className="font-bold text-3xl text-center mb-5">
        OpenSea Seaport Ethereum Subgraph
      </h1>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Name</h2>
        <h2 className="font-semibold text-2xl">Symbol</h2>
      </div>
      {data.map((collections) => {
        return (
          <div key={collections.id} className="flex justify-between">
            <div>{collections.name}</div>
            <div>{collections.symbol}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
