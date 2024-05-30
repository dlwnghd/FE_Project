import NumberBar from '@/components/numberBar/NumberBar'
import SearchBar from '@/components/searchBar/SearchBar'
import Tap from '@/components/tap/Tap'
import { dummyAnnouncementData } from '@/constants/announcement.dummy'
import { dropDown } from '@/constants/dropDown'
import { tapList } from '@/constants/tapList'

export default function Page({ params }: { params: { post: string } }) {
  return (
    <div>
      <h1>{params.post[0]} 페이지</h1>
      <SearchBar
        id="test1"
        placeholder="검색어를 입력해주세요"
        dropDown={dropDown}
      />
      <SearchBar
        id="test2"
        placeholder="검색어를 입력해주세요"
      />
      <Tap tapList={tapList} />
      <NumberBar
        totalPages={dummyAnnouncementData.totalPages}
        pageNumber={Number(params.post[1])}
      />
    </div>
  )
}
