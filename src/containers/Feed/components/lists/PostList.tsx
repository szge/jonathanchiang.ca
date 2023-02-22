import PostCard from '@components/PostCard'
import { TPosts, TTags } from '@/src/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {
  q: string
  tags: TTags
  posts: TPosts
}

export const PinnedPostList: React.FC<Props> = ({ q, posts, tags }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    setFilteredPosts(() => {
      let filteredPosts = posts
      // keyword
      filteredPosts = filteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(' ') : ''
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      filteredPosts = filteredPosts.filter(
        (post) => post && post.tags && post.tags.includes("Pinned")
      )

      return filteredPosts
    })
  }, [q])

  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && (
          null
        )}
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}

export const PostList: React.FC<Props> = ({ q, posts, tags }) => {
  const router = useRouter()
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const currentTag = `${router.query.tag || ``}` || 'All'
  const currentOrder = `${router.query.order || ``}` || 'desc'

  useEffect(() => {
    setFilteredPosts(() => {
      let filteredPosts = posts
      // keyword
      filteredPosts = filteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(' ') : ''
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      // tag
      if (currentTag !== 'All') {
        filteredPosts = filteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        )
      }
      // order
      if (currentOrder !== 'desc') {
        filteredPosts = filteredPosts.reverse()
      }

      return filteredPosts
    })
  }, [q, currentTag, currentOrder])

  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">Nothing! 😺</p>
        )}
        {filteredPosts.slice(0, 20).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostList
