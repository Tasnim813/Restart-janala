const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then((json)=>displayLesson(json.data))
}
const displayLesson=(lessons)=>{
    console.log(lessons)
    const levelContainer=document.getElementById('level-container')
    for(let lesson of lessons){
        const btnDiv=document.createElement("div")
        btnDiv.innerHTML=`
        `
    }

}
loadLesson()