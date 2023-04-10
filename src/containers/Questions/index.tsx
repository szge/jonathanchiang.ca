import Image from "next/image"
import React from "react"

const Topics = [
  "Love",
  "Meaning",
  "Family",
  "Friends",
  "Culture",
  "Childhood",
  "Career",
  "Media",
  "Fun",
  "Miscellaneous",
] as const
type TopicsType = (typeof Topics)[number]
const questions: { [key in TopicsType]: string[] } = {
  Love: [
    "Have you ever been in love? If yes, what was it like? If no, what do you think it would be like?",
    "What are the values that you look for in a partner?",
    "What is the difference between a romantic and a platonic relationship?",
    "What have you learned from your relationships?",
    'Do you have a "type"? If yes, what is it? Why do you think you have this type? Do you think it is good to have your type?',
    "What deeply attracts you to someone? What repels you?",
    "If you don't have kids, do you want to have kids? If you do have kids, what do you think about your decision?",
    "Where do your ideas about love come from? What pieces of media have influenced your ideas about love?",
    "To what extent do you think men and women can be friends?",
    "What are your thoughts on friends with benefits? Is it possible to have a friends with benefits relationship without feelings getting involved?",
    "What are your thoughts on open relationships? Do you think they are a good idea? Why or why not? What about polyamory?",
    "What are your thoughts on marriage? What are your thoughts on divorce?",
    "What are your thoughts on cheating? Can a relationship survive cheating? Why do people cheat?",
    "What are your thoughts on dating apps?",
    "What is your sexual orientation? Is sexual orientation a choice? Is there a difference between heterosexual and queer relationships?",
  ],
  Meaning: [
    "Where does meaning come from?",
    "What do you think the meaning of your life is?",
    "How important is happiness in life?",
    "What are your biggest goals this year?",
    "Have you ever experienced a moment that made you question the meaning of life?",
    "Do you believe in God? Why or why not?",
    "What role do you think community or social connections play in finding meaning?",
    "Have you ever had a spiritual experience? If yes, what was it like?",
    "Does the search for meaning require us to embrace suffering or struggle?",
  ],
  Family: [
    "What countries are your earliest ancestors from? What were their lives like?",
    "What family and cultural traditions have been passed down to you?",
    "What family traditions did you least enjoy growing up? Do you still see them the same way?",
    "What are the personalities of your mother and father? What parts of your personality do you think you inherited from them? What parts are different and why?",
    "What values do your parents have? Why do they have these values?",
    "What phrases do your parents or grandparents use often?",
    "What superstitions do your parents or grandparents have?",
    "How did your parents meet?",
    "Do you have siblings? If yes, What is your relationship like with them? Were you jealous of them growing up? If no, do you wish you had siblings?",
    "Where did your family take vacations? What are your favorite memories from those vacations?",
    "What were the dinner conversations like at your house when you were growing up?",
    "What did your parents fight about?",
  ],
  Friends: [
    "What makes a good friend?",
    "Is it more important to have friends who are similar to you or different from you? Why?",
    "Do you consider yourself introverted or extroverted? How do you think you ended up this way?",
  ],
  Culture: [
    "Is it important to feel connected to your culture? Why or why not?",
  ],
  Childhood: [
    "What is your first memory?",
    "What is your favorite childhood memory?",
    "What did you daydream about as a child?",
    "What were your hobbies growing up? Do you still have the same hobbies?",
    "What particular colours, smells, or textures stand out to you from your childhood?",
    "What do you miss about your childhood home? What don't you miss?",
    "Who did you admire growing up? Did you have any mentors?",
    "What did you think you were going to be when you grew up? How did that turn out?",
    "What do you understand now about your childhood that you didn't understand then?",
  ],
  Career: [
    "What is important to you in a career? Do you value money, prestige, or fulfillment?",
    "What would a meaningful career look like to you?",
    "Would you ever want to start a business or side hustle? What would you do?",
    "Would you rather spend money on experiences and things right now or save it for the future?",
    "Would you rather have a job working for someone else or be self-employed? Why?",
    "Would you rather have a job working with people like sales or working with things like engineering?",
  ],
  Media: [
    "What kind of music do you listen to? How does it make you feel?",
    "What does your favourite song mean to you? Why do you like it? What makes a good piece of music?",
    "How has your taste in music changed over time?",
    "What is your favourite movie? Why do you like it? What makes a good movie?",
    "What is your favourite book? Why do you like it? What makes a good book?",
    "What's the most powerful idea you've ever gotten from a book?",
  ],
  Fun: [
    "What is your favourite food?",
    "What did you get away with that your parents never found out about?",
    "What is a crazy fact about the topic you're most passionate about?",
    "If you could travel anywhere in history, where would you go?",
    "What are you in the top 1% of?",
    "What fact exploded your brain?",
  ],
  Miscellaneous: [
    "What is the best piece of advice you've ever gotten?",
    "What advice would you give your younger self?",
    "Have you ever stolen anything? Why? How do you feel about it?",
    "What is the hardest thing you've ever done?",
    "Do you have regrets?",
    "What is on your bucket list?",
    "What is the biggest lie you've ever been told?",
    "What is the biggest lie you've ever told?",
    "What is the most embarrassing thing that has ever happened to you?",
    "What is something you have never told anyone?",
    "What are you thankful for right now?",
    "What's your favourite quote?",
    "What are you most curious about?",
    "What things do you think about the most?",
    "What is the relationship between gender and sex? Do the differences between men and women come more from society or biology?",
  ],
}

// Have a LLM generate ideas for AI alignment research
const QuestionsPage: React.FC = () => {
  const [questionText, setQuestionText] = React.useState("Example question")
  const [allTopics, setAllTopics] = React.useState(true)
  const [topics, setTopics] = React.useState<{ [key in TopicsType]: boolean }>({
    Love: true,
    Meaning: true,
    Family: true,
    Friends: true,
    Culture: true,
    Childhood: true,
    Career: true,
    Media: true,
    Fun: true,
    Miscellaneous: true,
  })
  const [showHistory, setShowHistory] = React.useState(false)
  const toggleHistory = () => setShowHistory(!showHistory)
  const [history, setHistory] = React.useState<string[]>([])

  function generateQuestion() {
    // instead of selecting a topic, select a question from all topics
    const selectedQuestions = Object.keys(questions)
      .filter((topic) => topics[topic as TopicsType])
      .map((topic) => questions[topic as TopicsType])
      .flat()
    const question_index = Math.floor(Math.random() * selectedQuestions.length)
    const question = selectedQuestions[question_index]
    // get topic from question
    const topic = Object.keys(questions).find((topic) =>
      questions[topic as TopicsType].includes(question)
    )
    // console.log(selectedQuestions.length, question_index)
    const text = topic + ": " + question
    setQuestionText(text)
    setHistory([text, ...history])
  }

  return (
    <div
      className={`m-auto max-w-4xl bg-white dark:bg-zinc-700 rounded-3xl py-6 px-6 shadow-md`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100">
            FAQ - Fun Authentic Questions!
          </h2>
          <h2 className="italic text-sm text-gray-500 font-medium mb-2 text-black dark:text-gray-100">
            I created this because I think that the simple act of listening to
            another person is one of the greatest gifts you can give someone
            (and yourself!). Sit down with a stranger, friend, family member, or
            lover and get in the mood for some meaningful conversation. Pick the
            topics you&apos;d like to talk about and ask each other a question!
            Inspired by{" "}
            <a
              href="https://welivedeeply.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              Live Deeply
            </a>
            .
          </h2>
        </div>
        <ButtonGroup
          allTopics={allTopics}
          setAllTopics={setAllTopics}
          topics={topics}
          setTopics={setTopics}
        />

        <a
          onClick={generateQuestion}
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer select-none"
        >
          🤔 Generate a Question
        </a>

        <div
          className={`w-full justify-between items-center py-4 bg-opacity-60 px-4 max-w-4xl bg-gray-300 rounded-3xl`}
        >
          <div className="font-bold text-center">{questionText}</div>
        </div>

        <div className="flex flex-col w-full select-none">
          <h2
            className="text-md text-gray-500 font-medium mb-2 text-black dark:text-gray-100 cursor-pointer"
            onClick={() => toggleHistory()}
          >
            Toggle History
          </h2>
        </div>

        {showHistory && (
          <div
            className={`w-full justify-between items-center py-4 bg-opacity-60 px-4 max-w-4xl bg-gray-300 rounded-3xl`}
          >
            <div className="font-bold text-left">
              {history.map((question, index) => (
                <div key={index}>{question}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ButtonGroup: React.FC<{
  allTopics: boolean
  setAllTopics: React.Dispatch<React.SetStateAction<boolean>>
  topics: { [key in TopicsType]: boolean }
  setTopics: React.Dispatch<
    React.SetStateAction<{ [key in TopicsType]: boolean }>
  >
}> = (props) => {
  const childButtons = (
    <div className="flex flex-wrap gap-2">
      <Button
        key={0}
        selected={props.allTopics}
        type="All"
        onClick={() => {
          props.setAllTopics(!props.allTopics)
          props.setTopics({
            Love: true,
            Meaning: true,
            Family: true,
            Friends: true,
            Culture: true,
            Childhood: true,
            Career: true,
            Media: true,
            Fun: true,
            Miscellaneous: true,
          })
        }}
      />
      {Topics.map((topic, index) => (
        <Button
          key={index + 1}
          selected={props.topics[topic]}
          type={topic}
          onClick={() => {
            if (props.allTopics) {
              const newTopics = { ...props.topics }
              Object.keys(newTopics).forEach((key) => {
                newTopics[key as TopicsType] = false
              })
              newTopics[topic] = true
              props.setTopics(newTopics)
            } else {
              props.setTopics({
                ...props.topics,
                [topic]: !props.topics[topic],
              })
            }
            props.setAllTopics(false)
          }}
          disabled={props.allTopics}
        />
      ))}
    </div>
  )

  return <div className="flex flex-col items-center gap-5">{childButtons}</div>
}

const Button: React.FC<{
  selected: boolean
  type: TopicsType | "All"
  onClick: () => void
  disabled?: boolean
}> = (props) => {
  return (
    <button
      type="button"
      className={
        props.selected
          ? props.disabled
            ? "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ring-2 ring-gray-300"
            : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ring-2 ring-blue-700"
          : "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
      }
      onClick={props.onClick}
    >
      {props.type}
    </button>
  )
}

export default QuestionsPage
