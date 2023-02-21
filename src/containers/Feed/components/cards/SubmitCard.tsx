import CONFIG from "site.config"
import Image from "next/image"
import React from "react"

const SubmitCard: React.FC = () => {
  return (
    <>
      <div className="p-1 mb-3 dark:text-white">⌨️ Submit</div>
      <div className="w-full md:p-4 rounded-2xl bg-white dark:bg-zinc-700">
          <div className="text-sm">
            Contact me through email or my socials if you would like to submit a piece of content as a guest contributor.
          </div>
      </div>
    </>
  )
}

export default SubmitCard
