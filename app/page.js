"use client";
import React from "react";
import { useState, useEffect } from "react";
import { createClient, fetchExchange } from "urql";

const Page = () => {
  const [openseaData, setOpenseaData] = useState([]);
  const [myData, setMyData] = useState([]);

  const openseaQueryUrl = `https://gateway.thegraph.com/api/591352066024286c95ffc6ba9892d09e/subgraphs/id/G1F2huam7aLSd2JYjxnofXmqkQjT5K2fRjdfapwiik9c`;

  const myQueryUrl = "https://api.studio.thegraph.com/query/50939/testing/v0.1";
  const openseaQuery = `{
    collections(first: 5) {
      id
      name
      symbol
      totalSupply
    }
  }`;

  const myQuery = `{
    numbers(first: 5) {
      id
      param0
      blockNumber
      blockTimestamp
    }
  }`;

  const openseaClient = createClient({
    url: openseaQueryUrl,
    exchanges: [fetchExchange],
  });

  const myClient = createClient({
    url: myQueryUrl,
    exchanges: [fetchExchange],
  });

  useEffect(() => {
    const fetchData = async () => {
      const openseaQueryData = await openseaClient
        .query(openseaQuery)
        .toPromise();
      const myQueryData = await myClient.query(myQuery).toPromise();
      setOpenseaData(openseaQueryData.data.collections);
      setMyData(myQueryData.data.numbers);
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
      {openseaData.map((collections) => {
        return (
          <div key={collections.id} className="flex justify-between">
            <div>{collections.name}</div>
            <div>{collections.symbol}</div>
          </div>
        );
      })}

      <h1 className="font-bold text-3xl text-center mb-5">
        My Testing Subgraph
      </h1>
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl">Number</h2>
        <h2 className="font-semibold text-2xl">Timestamp</h2>
      </div>
      {myData.map((numbers) => {
        return (
          <div key={numbers.id} className="flex justify-between">
            <div>{numbers.param0}</div>
            <div>{numbers.blockTimestamp}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
