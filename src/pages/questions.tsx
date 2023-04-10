import Layout from "@components/Layout"
import CONFIG from "../../site.config"
import { NextPageWithLayout } from "./_app"
import { TPosts, TTags } from "../types"
import QuestionsPage from "../containers/Questions"

type Props = {
  tags: TTags
  posts: TPosts
}

const QPage: NextPageWithLayout<Props> = () => {
  return <QuestionsPage />
}

QPage.getLayout = function getlayout(page) {
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

export default QPage
