import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data);
    setLoading(true);

    const response = await fetch("/api/getImage", {
      method: "POST",
      body: JSON.stringify({ prompt: dataObj.prompt, type: dataObj.type }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const imgUrl = result.data[0].url;
    const imgId = imgUrl.replace(/(^"|"$)/g, "");
    setData(imgId);
    setLoading(false);
  };
  return (
    <div className="">
      <Head>
        <title>imageAI</title>
        <meta name="description" content="Create artworks in a click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-center text-2xl md:text-4xl mt-[3rem]">
          <Link href="/">Artwork AI 🖼</Link>
          <button
            title="currently in beta , responses may vary"
            className="border-2 text-xl rounded-full mx-5 px-3 py-1 text-[#00ffc8] border-[#00ffc8] beta"
          >
            beta
          </button>
        </h1>
        <h2 className="text-[0.8rem] md:text-lg text-center my-[2rem] mx-5 text-pink-400">
          Generate Artwork with help of AI
        </h2>
        <form onSubmit={handleSubmit} className="my-5 text-center">
          <input
            type="text"
            className="text-center text-sm md:text-2xl py-4 px-2 md:px-8 mt-10 mb-5 mx-2 md:mx-5"
            name="prompt"
            required
            placeholder="Dog as Astronaut in Space"
          />
          <select
            name="type"
            id="type"
            className="text-xl py-2 px-2 text-center"
          >
            <option value="Realistic">Realistic</option>
            <option value="Cartoon">Cartoon</option>
            <option value="Painting">Painting</option>
          </select>
          <br />
          <button
            type="submit"
            className="my-5 bg-white text-black py-3 px-7 sm:text-xl rounded-full font-bold border-2 border-white hover:bg-black hover:text-white text-sm"
          >
            Submit
          </button>
        </form>
        {loading && (
          <p className="text-center my-5 10">Generating your image...</p>
        )}
        {data && (
          <div className="flex justify-center">
            <div className="flex justify-center my-10 border-2 w-[700px] py-10 mx-5">
              <img src={`${data}`} alt="Make a request" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
