import type { NextPage } from "next";
import Board from "../components/Board.server";
import Head from "next/head";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game of Life Online</title>
      </Head>
      <Board />
    </>
  );
};

export default Index;
