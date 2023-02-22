import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { MdLocalPhone } from "react-icons/md";
import { RiUserVoiceFill } from "react-icons/ri";
import { RiCurrencyLine } from "react-icons/ri";

function App() {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const queryResult = await axios.post(
        "https://countries.trevorblades.com/graphql",
        {
          query: `query {
            countries {
              code
              name 
              native 
              phone 
              capital 
              currency 
              languages {
                name
                native
              }
              continent {
                name
              }
              emoji
              states {
                name
              }
            }
          }`,
        }
      );

      setData(queryResult.data.data.countries);
    };

    fetchData();
  }, []);

  const vitalData = data
    ?.filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item.code.toLowerCase().includes(search.toLowerCase());
    })
    .map((item) => {
      return {
        item,
      };
    });

  const handleClick = (e) => {
    setSearch(e.target.value);
    setShown(true);
    if (e.target.value === "") {
      setShown(false);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center mx-auto w-[320px] sm:mt-20 mt-10 bg-white  ">
        <h1 className="text-2xl mx-2 ">Countries</h1>
        <input
          className="px-10 border-black border-[3px] mt-5 mx-2 rounded-lg"
          placeholder="Search by country code"
          onChange={(e) => {
            handleClick(e);
          }}
        />

        {shown &&
          vitalData?.map((datas, i) => {
            return (
              <div
                key={i}
                className="border-black rounded-lg border-[3px] mt-5 p-5 mx-2"
              >
                <div className="flex">
                  {/* <img src={datas.item.emoji} alt="Img" /> */}
                  <img
                    className="w-12 h-12"
                    src={`https://www.countryflagicons.com/FLAT/48/${datas.item.code}.png`}
                  ></img>
                  <div className="flex flex-col ml-1">
                    <h2 className=" text-xl">{datas.item.name}</h2>
                    <h2 className=" text-base -mt-1">{datas.item.capital}</h2>
                  </div>
                  <h4 className="ml-16">{datas.item.continent.name}</h4>
                </div>
                <div className="flex gap-4 mt-3 ">
                  <h5 className="flex gap-1">
                    <MdLocalPhone className=" mt-1" />
                    {datas.item.phone}
                  </h5>
                  <h5 className="flex gap-1">
                    <RiCurrencyLine className=" mt-1" />
                    {datas.item.currency}
                  </h5>

                  <div className="flex gap-1  truncate ... w-[120px]">
                    <RiUserVoiceFill className="mt-1 w-4 h-4" />
                    {datas.item.languages.map((lang, index) => {
                      return <span key={index}>{lang.name},</span>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
