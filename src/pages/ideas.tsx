import Layout from "@components/Layout"
import CONFIG from "../../site.config"
import { NextPageWithLayout } from "./_app"
import { TPosts, TTags } from "../types"
import IdeasPage from "../containers/Ideas"

type Props = {
  tags: TTags
  posts: TPosts
}

const GPTPage: NextPageWithLayout<Props> = () => {
  return <IdeasPage />
}

GPTPage.getLayout = function getlayout(page) {
  return (
    <Layout
      metaConfig={{
        title: CONFIG.blog.title,
        description: CONFIG.blog.description,
        type: "website",
        url: CONFIG.link,
      }}
    >
      {page}
    </Layout>
  )
}

export default GPTPage
