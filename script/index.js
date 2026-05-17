const createElement=(arr)=>{
    const htmlElements=arr.map(el=> `<span class="btn">${el}</span>`)
    return(htmlElements.join(" "))

}
const manageSpinner=(status)=>{
  if(status== true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("word-container").classList.add("hidden")

  }else{
    document.getElementById("word-container").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
   

  }

}

const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then((json)=>displayLesson(json.data))
}
const removeActive=()=>{
  const lessonButton=document.querySelectorAll(".lesson-btn")
  console.log(lessonButton)
  lessonButton.forEach(btn=>{
    btn.classList.remove("active")
  })

}


const loadLevelWord=(id)=>{
  manageSpinner(true)
    const uri=`https://openapi.programming-hero.com/api/level/${id}`; 
    fetch(uri)
    .then(res=>res.json())
    .then(data=>{
      removeActive()
     const clickbtn=document.getElementById(`lesson-btn-${id}`);
     console.log(clickbtn)
     clickbtn.classList.add("active")
      displayLevelWord(data.data)
    })
}
const loadWordDetail= async(id)=>{

  const url=`https://openapi.programming-hero.com/api/word/${id}`

  const res=await fetch(url);
  const details= await res.json();
  displayLoadWord(details.data)


}
const displayLoadWord=(word)=>{
  console.log(word)
  const DetailsContainer=document.getElementById('details-container')
DetailsContainer.innerHTML=`
 <div>
      <h2 class="text-2xl font-bold">${word.word}( <i class="fa-classic fa-solid fa-microphone"></i>    : ${word.pronunciation})</h2>
    </div>
    <div>
      <h2 class=" font-bold">Meaning</h2>
      <p>${word.meaning} </p>
    </div>
    <div>
      <h2 class=" font-bold">Example</h2>
      <p>${word.sentence}</p>
    </div>
    <div>
      <h2 class=" font-bold">সমার্থক শব্দ গুলো</h2>
      <div>${createElement(word.synonyms)}
 
    </div>

    </div>`
  document.getElementById('my_modal_5').showModal()
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
      manageSpinner(false)
      return;
    }
     words.forEach(word=>{
        // console.log(word)
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
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid  fa-circle-info" ></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid   fa-volume-high"></i></button>

        </div>


      </div>
        `
        wordContainer.append(card)
     })
     manageSpinner(false)
}
const displayLesson=(lessons)=>{
    // console.log(lessons)
    const levelContainer=document.getElementById('level-container')
    levelContainer.innerHTML= ' ';
    for(let lesson of lessons){
        console.log(lesson)
        const btnDiv=document.createElement("div")
        btnDiv.innerHTML=`
        <button id="lesson-btn-${lesson.level_no
}"
         onClick="loadLevelWord(${lesson.level_no
})" class="btn btn-outline  lesson-btn  btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no
} </button>
        `
        levelContainer.append(btnDiv)
    }

}
loadLesson()

document.getElementById("btn-search").addEventListener("click",()=>{
  const Input=document.getElementById("input-search")
  const SearchValue=Input.value.trim().toLowerCase();
  console.log(SearchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res=>res.json())
  .then(data=>{
    const allword=data.data
    console.log(allword)
    const filterWord=allword.filter(word=>word.word.toLowerCase().includes(SearchValue))
    displayLevelWord(filterWord)
  })
})

