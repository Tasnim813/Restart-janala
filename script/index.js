const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then((json)=>displayLesson(json.data))
}
const loadLevelWord=(id)=>{
  
    const uri=`https://openapi.programming-hero.com/api/level/${id}`; 
    fetch(uri)
    .then(res=>res.json())
    .then(data=>displayLevelWord(data.data))
}
const displayLevelWord=(words)=>{
   
    const wordContainer=document.getElementById("word-container")
    wordContainer.innerHTML=" ";
    if(words.length===0){
      wordContainer.innerHTML=`  <div class="text-center  col-span-full rounded-xl py-10 space-y-6">
      <img class="mx-auto" src="./assets/alert-error.png">
        <p class="text-xl font-medium font-bangla text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="font-bangla font-bold text-3xl">নেক্সট Lesson এ যান</p>
      </div>`;
      return;
    }
     words.forEach(word=>{
        console.log(word)
        const card=document.createElement("div")
        card.innerHTML=`
         <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="text-2xl font-bold">${word.word ? word.word :'No found'
}</h2>
        <p class="font-semibold">${word.meaning ? word.meaning : "Not Found"} /${word.pronunciation ? word.pronunciation :"Not Found"}</p>
        <div class="text-2xl font-medium font-bangla">
          "${word.pronunciation ? word.pronunciation : 'Not Found'} / ${word.meaning ? word.meaning : "Not Found"}"
        </div>
        <div class="flex justify-between text-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid  fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid   fa-volume-high"></i></button>

        </div>


      </div>
        `
        wordContainer.append(card)
     })
}
const displayLesson=(lessons)=>{
    console.log(lessons)
    const levelContainer=document.getElementById('level-container')
    levelContainer.innerHTML= ' ';
    for(let lesson of lessons){
        console.log(lesson)
        const btnDiv=document.createElement("div")
        btnDiv.innerHTML=`
        <button onClick="loadLevelWord(${lesson.level_no
})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no
} </button>
        `
        levelContainer.append(btnDiv)
    }

}
loadLesson()