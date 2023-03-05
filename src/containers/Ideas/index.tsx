import Image from "next/image"
import { ChatCompletionResponseMessage } from "openai"
import React from "react"

type Props = {
  errorType?: "NOT_FOUND" | "UNKNOWN"
}

export type PromptModeType = "Philosophical" | "Technical"
export const TechnicalTopics = [
  "Any topic",
  "Supervised",
  "Unsupervised",
  "Deep learning",
  "Reinforcement learning",
  "NLP",
  "Computer vision",
  "Robotics",
  "Medical",
  "Neuromorphic computing",
  "CNNs",
  "RNNs",
  "LSTM",
  "Transformer",
  "Generative",
] as const
export type TechnicalTopicType = typeof TechnicalTopics[number]
interface ResponseType {
  type: PromptModeType
  topic: TechnicalTopicType
  content: string
}

// Have a LLM generate ideas for AI alignment research
const IdeasPage: React.FC<Props> = ({ errorType }) => {
  const [responses, setResponses] = React.useState<ResponseType[]>([])
  const [mode, setMode] = React.useState<PromptModeType>("Philosophical")
  const [topic, setTopic] = React.useState<TechnicalTopicType>("Any topic")
  const [buttonDisabled, setButtonDisabled] = React.useState(false)

  async function generateIdea() {
    setButtonDisabled(true);
    console.log("Generating idea...")
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mode: mode, topic: topic }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      } else {
        const responseMessage = data.result as ChatCompletionResponseMessage
        setResponses([
          ...responses,
          {
            type: mode,
            topic: topic,
            content: responseMessage.content,
          },
        ])
      }
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }

    setButtonDisabled(false);
  }

  return (
    <div
      className={`m-auto max-w-4xl bg-white dark:bg-zinc-700 rounded-3xl py-6 px-6 shadow-md`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100">
            Use a model to generate ideas for AI alignment research!
          </h2>
          <h2 className="italic text-sm text-gray-500 font-medium mb-2 text-black dark:text-gray-100">
            Please do not abuse the poor button. Give it time to respond before
            pressing it again.
          </h2>
        </div>
        <ButtonGroup
          mode={mode}
          setMode={setMode}
          currentTopic={topic}
          setTopic={setTopic}
        />
        {buttonDisabled ? (
          <a
            onClick={undefined}
            className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-not-allowed select-none opacity-50"
          >
            💡 Generate a Genius Idea
          </a>
        ) : (
          <a
            onClick={generateIdea}
            className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer select-none"
          >
            💡 Generate a Genius Idea
          </a>
        )}
        {responses
          .slice(0)
          .reverse()
          .map((response, index) => {
            return (
              <div
                key={index}
                className={`w-full justify-between items-center py-4 bg-opacity-60 px-4 max-w-4xl bg-gray-300 rounded-3xl`}
              >
                <div className="font-bold">{response.type}</div>
                <div className="">{response.content}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ButtonGroup: React.FC<{
  mode: PromptModeType
  setMode: React.Dispatch<React.SetStateAction<PromptModeType>>
  currentTopic: TechnicalTopicType
  setTopic: React.Dispatch<React.SetStateAction<TechnicalTopicType>>
}> = (props) => {
  const childButtons = (
    <div className="flex flex-wrap gap-2">
      {props.mode === "Philosophical"
        ? null
        : TechnicalTopics.map((topic, index) => (
            <TechnicalButton
              key={index}
              selected={topic == props.currentTopic}
              type={topic}
              setType={props.setTopic}
            />
          ))}
    </div>
  )

  if (props.mode === "Philosophical") {
    return (
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg bg-gray-100 text-blue-700 z-10 ring-2 ring-blue-700"
          onClick={() => {
            props.setMode("Philosophical")
          }}
        >
          Philosophical
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md"
          onClick={() => {
            props.setMode("Technical")
          }}
        >
          Technical
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center gap-5">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg"
            onClick={() => {
              props.setMode("Philosophical")
            }}
          >
            Philosophical
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md bg-gray-100 text-blue-700 z-10 ring-2 ring-blue-700"
            onClick={() => {
              props.setMode("Technical")
            }}
          >
            Technical
          </button>
        </div>
        {childButtons}
      </div>
    )
  }
}

const TechnicalButton: React.FC<{
  selected: boolean
  type: TechnicalTopicType
  setType: React.Dispatch<React.SetStateAction<TechnicalTopicType>>
}> = (props) => {
  return (
    <button
      type="button"
      className={
        props.selected
          ? "px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-gray-100 text-blue-700 z-10 ring-2 ring-blue-700"
          : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
      }
      onClick={() => {
        props.setType(props.type)
      }}
    >
      {props.type}
    </button>
  )
}

export default IdeasPage
