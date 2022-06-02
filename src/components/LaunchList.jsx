import axios from 'axios'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import LaunchItem from './LaunchItem'
import Loader from './Loader'
const baseURL = 'https://api.spacexdata.com/v4/launches/query/'

export default function LaunchList() {
  const [list, setList] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios
      .post(baseURL, {
        query: {},
        options: {
          page: page,
          limit: 5,
          sort: {
            flight_number: 'desc',
          },
        },
      })
      .then((response) => {
        setList(response.data.docs)
        setPage(response.data.nextPage)
        setHasMore(response.data.hasNextPage)
      })
  }, [])

  if (!list) return null

  const fetchMoreData = () => {
    console.log('fetch more')
    axios
      .post(baseURL, {
        query: {},
        options: {
          page: page,
          limit: 5,
          sort: {
            flight_number: 'desc',
          },
        },
      })
      .then((response) => {
        setPage(response.data.nextPage)
        setList([...list, ...response.data.docs])
        setHasMore(response.data.hasNextPage)
      })
    return list
  }
  console.log(list.length)

  return (
    <div className="flex flex-col justify-center items-center">
      <InfiniteScroll
        dataLength={list.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more data</b>
          </p>
        }
      >
        {list.map((item, index) => (
          <LaunchItem
            key={index}
            id={item.flight_number}
            launchName={item.name}
            failures={item.failures}
            success={item.success ? 'success' : 'no launch information'}
            image={
              item.links.flickr.original[0]
                ? item.links.flickr.original[0]
                : 'https://farm2.staticflickr.com/1460/24382360351_9b1f2fcabc_o.jpg'
            }
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}
