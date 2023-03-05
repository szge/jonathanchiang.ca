import Image from "next/image"
import React from "react"

type Props = {
  errorType?: "NOT_FOUND" | "UNKNOWN"
}
// Have a LLM generate ideas for AI alignment research
const IdeasPage: React.FC<Props> = ({ errorType }) => {
  const [responses, setResponses] = React.useState<string[]>([
    "Hello hello test test",
    "4",
  ])

  const generateIdea = () => {
    console.log("clicked");
    setResponses([...responses, "5"]);
  }

  return (
    <div
      className={`m-auto max-w-4xl bg-white dark:bg-zinc-700 rounded-3xl py-6 px-6 shadow-md`}
    >
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">Use a model to generate ideas for AI alignment research!</h2>
        <a onClick={generateIdea} className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer select-none">
          💡 Generate a New Idea
        </a>
        {responses.slice(0).reverse().map((response, index) => {
          return (
            <div
              key={index} 
              className={`w-full h-6 flex flex-row justify-between items-center mb-2 py-8 bg-opacity-60 px-4 max-w-4xl bg-gray-300 rounded-3xl`}
            >
                {response}
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default IdeasPage
