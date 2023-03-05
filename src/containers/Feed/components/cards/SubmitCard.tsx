import CONFIG from "site.config"
import Image from "next/image"
import React from "react"
import {
  HiOutlineLightBulb
} from "react-icons/hi"

const SubmitCard: React.FC = () => {
  return (
    <>
      <div className="p-1 mb-3 dark:text-white">⌨️ Other</div>
      <ul className="rounded-2xl bg-white dark:bg-zinc-700 p-1 mb-9">
        <a
          href={`/ideas`}
          rel="noreferrer"
          target="_blank"
          className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-2xl cursor-pointer flex items-center gap-3 text-gray-500 dark:text-white hover:text-black dark:hover:text-white "
        >
          <HiOutlineLightBulb className="text-2xl" />
          <div className="text-sm">Alignment Ideas Generator</div>
        </a>
      </ul>
    </>
  )
}

export default SubmitCard
