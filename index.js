console.log('Connected!')
const COHORT= '2309-FTB-ET-WEB-FT';
const API='https://fsa-crud-2aa9294fe819.herokuapp.com/api' + COHORT;

const state={
    events:[]
}

const partyList= document.getElementById('party-list');
const partyFrom=document.getElementById('party-form');

async function createEvent(event){
    event.preventDefault();
   
    try {
        const response= await fetch(API+'/events',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON,stringfy({
                name:document.getElementById('name').value,
                description: document.getElementById('description').value,
                date :`$(document.getElementById('date).value}:00.000Z`,
                location:document.getElementById('location').value,
            })
        }); getEvents();
    } catch(err){
        console.error(err);
    }
}
partyFrom.addEventListener('submit',createEvent) ;

async function getData(){
    try{
        const response= await fetch(API+'/events');
        const json= await response.json();
        state.events(json.data);
        render()
    }
catch(err){console.error(err);}
}

function render(){
    const events= state.events.map((event)=>{
        const article= document.createElement('article');
        const deleteBin= document.createElement('button');
        deleteBin.innerText='X'
        deleteBin.addEventListener('click',async()=>{
            try {
                const response= await fetch(API+ `/events/${event.id}`, {
                    method: "DELETE"
                });
                console.log("deleted!")
                getEvents();
            } catch(err) {
                console.error(err);
            }
        
    });
    article.innerHTML = `
        <h3>${event.name}</h3>
        <address>${event.location}</address>`
        article.append(deleteBtn);

        return article;
    });

    partyList.replaceChildren(...events);
}

getData();