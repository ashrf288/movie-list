let form=document.getElementById('form');
let tableHeader=['#','Img','Name','Release']
let table=document.getElementById('resultTable');
let tr=document.createElement('tr');
table.appendChild(tr);
let id=0;
let tf=document.createElement('tfoot');
let clear=document.getElementById('reset')
for (let i=0;i<tableHeader.length;i++){
    let th=document.createElement('th');
    th.textContent=tableHeader[i];
    tr.appendChild(th);
}

clear.addEventListener('click',()=>{
    return(
        Movie.all=[],
        localStorage.setItem('old',JSON.stringify(Movie.all)),
        location.reload()
         

        )  
} )




form.addEventListener('submit',handler)



function Movie(name,type,date){
  this.name=name;
  this.type=type;
  this.img=this.getPic();
  this.date=date;
  Movie.all.push(this)
}
Movie.all=[]


Movie.prototype.getPic=function(){
    let src=`./img/${this.type}.png`;
    return src
}

Movie.prototype.render=function(){
    id++;
    let tr1=document.createElement('tr')
    id %2==0? tr1.style.background='#A2DBFA':tr1.style.background='#77ACF1'
   
    table.appendChild(tr1)
    let td1=document.createElement('td');
    td1.classList.add('td1');
    td1.textContent='x';
    tr1.appendChild(td1);
    td=document.createElement('img');
    td.setAttribute('src',this.img);
    tr1.appendChild(td)
    let td2=document.createElement('td');
    td2.textContent=this.name;
    tr1.appendChild(td2);
    td=document.createElement('td');
    td.textContent=this.date;
    tr1.appendChild(td);
    // td=document.createElement('td');
    // td.textContent=this.type;
    // tr1.appendChild(td)
    
 
   
    td1.addEventListener('click',remove)

    function remove(){
        id--;
        table.removeChild(tr1);
       console.log(td2.textContent)
       let index=Movie.all.findIndex(function(movie){
        return movie.name===td2.textContent  
   })
   Movie.all.splice(index,1);
   localStorage.setItem('old',JSON.stringify(Movie.all))

   tf.removeChild(td3);
   tf.removeChild(td4);

    createFooter()
    }
 
    
}


function handler(eve){
eve.preventDefault();

let name=eve.target.name.value;
let type=eve.target.type.value.toLowerCase();
let date = eve.target.date.value;
console.log(type)

let movie=new Movie(name,type,date)

tf.removeChild(td3);
tf.removeChild(td4);
movie.render()
createFooter()

localStorage.setItem('old',JSON.stringify(Movie.all))

}



function getData(){
    let data=JSON.parse(localStorage.getItem('old'));
    if(data){
        for(let j=0;j<data.length;j++){
            let movie=new Movie(data[j].name,data[j].type,data[j].date);
            movie.render()
           
        }
       
        
    }
}
getData()


createFooter()
function createFooter(){
   
table.appendChild(tf)

td3=document.createElement('td');
tf.appendChild(td3);
td3.textContent='Quantitiy'
td4=document.createElement('td');
console.log(Movie.all.length)
td4.textContent=Movie.all.length;
tf.appendChild(td4)

}
