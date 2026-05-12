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
    // wordContainer.innerHTML=" ";
     words.forEach(word=>{
        const card=document.createElement("div")
        card.innerHTML=`
        <p>cat</p>
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