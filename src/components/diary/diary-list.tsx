
'use client'; 

import { useState } from "react";
import Button from "./button"; 
import DiaryItem from "./diary-item"; 
import { useRouter } from "next/navigation";

export default function DiaryList({ data }) { 

    const router = useRouter();
    const [ sortType, setSortType ] = useState("latest");  
    const onChangeSortType = (e) => { setSortType(e.target.value); }; 

    const getSortedData = () => {
        return data.toSorted((a, b) => { 
            if(sortType === 'oldest') return Number(a.createdDate) - Number(b.createdDate); 
            else return Number(b.createdDate) - Number(a.createdDate); 
        });  //복사본 정렬 
    };

    const sortedData = getSortedData(); 
    
    return( 
        <div className="flex flex-col items-center"> 
            <div className="flex mt-5 mb-5 gap-5"> 
                <select 
                    onChange={ onChangeSortType }
                    className="border rounded-lg">
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select> 
                <Button 
                    onClick={ () => router.push('/project/emotion-diary/new') }
                    text={ '새로운 일기쓰기' }
                    type={ 'POSITIVE' } /> 
            </div> 
            <div> 
                { sortedData.map((item) => <DiaryItem key={item.id} {...item} />) }
            </div> 
        </div>
    );
};
