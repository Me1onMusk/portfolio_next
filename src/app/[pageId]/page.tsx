
import Render from '@/components/notion/render';
import { NotionAPI } from 'notion-client'; 
import 'react-notion-x/src/styles.css';         //notion 테마 스타일링 (필수)

const Page = async({ params }: { params: Promise<{ pageId: string }> }) => {
    
    const notion = new NotionAPI();
    const pageId = (await params).pageId;

    if (!pageId)
        return <div>잘못된 페이지 ID입니다.</div>;

    try {
        const recordMap = await notion.getPage(pageId); // 세부 페이지 데이터 가져오기

        return <Render recordMap={recordMap} />;  //데이터를 Render 컴포넌트에 전달
    } catch (error) {
        return <div>페이지를 불러오는 데 오류가 발생했습니다.</div>;
    }
};

export default Page;
