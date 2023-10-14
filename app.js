let win=document.querySelector('.win')
let lost=document.querySelector('.lose')
let tryAgain=document.querySelectorAll('.try_agin')
let game=document.querySelector('.game');
let timer=document.querySelector('.timer span');
let t=0;
win.style.display='none'
lost.style.display='none'


// >>>>>>>>>>>>>to enter name
let EnterYourName=prompt("what's your name?")
//to put the name or but Annonymous if he skip
if(EnterYourName===null||EnterYourName===""){
    document.querySelector('.info .name span').innerHTML="Annonymous"
}
else document.querySelector('.info .name span').innerHTML=EnterYourName;



//cards containe all children's game
let cards=Array.from(game.children);
//cards.length>how many element
//array(cards.length) > make empty array the size is same legnth of elements
//array(cards.length).keys()>to get numbers 0,1,2,.. until same number of length
//...array(cards.length) >TO GET INDEX NUMBES OOORRR  Array.from(array(cards.length).keys())

//>>>>>.shuffle function
function shuffle(array) { 
    let current=array.length,temp,random;
    while(current>0){
        random=Math.floor(Math.random()*current);
        current--;
        //1-take element from array 
        //2-change  this element to randome one 
        //3-change the randome elemeent to our element
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;   
    }
    return array;

 }


let orderRange=[...Array(cards.length).keys()]
//make it shuffle
shuffle(orderRange)
//put order operation to randome HOW??
//we make array containe randome number
//we pick these randome from for each and give each element the randome number
cards.forEach((card,index)=>{
    //add the order to shuffle them
    card.style.order=orderRange[index];
    //to make the pick card
    card.addEventListener('click',function () {
        
        flipCard(card);
      })
})

//>flipCard function
function flipCard(card) { 
    card.classList.add("flipped")
    let cardFlipped=Array.from(card.children)[1]
    cardFlipped.classList.add("flipped")
    let allFlippedCards= cards.filter(flippBlock=>flippBlock.classList.contains('flipped'))
    // console.log(allFlippedCards)
    if(allFlippedCards.length===2){
        //stop clicking 
        stopClicking();
        //check
        check(allFlippedCards[0],allFlippedCards[1])



    }
    let allFlippedCardsCorect= cards.filter(flippBlockRight=>flippBlockRight.classList.contains('has-matched'))
    if (allFlippedCardsCorect.length===16){
       win.style.display='block'
    } 
 }



//>>>stop clicking
 function stopClicking(){
    game.classList.add('no_clicking')
    setTimeout(()=>{
        //remove th class
        game.classList.remove('no_clicking')

    },1000)
 }

 //>>chechk
 function check( firstCard,secondCard){
    let tries=document.querySelector('.tries span')
    let triesLeft=document.querySelector('.tries_left span')


    if(firstCard.dataset.card===secondCard.dataset.card){
        console.log("we find match")
        //document.getElementById('succes').play();
        
        firstCard.classList.remove('flipped') 
        firstCard.classList.add('has-matched') 

        secondCard.classList.remove('flipped') 
        secondCard.classList.add('has-matched') 

        firstCard.children[1].classList.remove('flipped') 
        secondCard.children[1].classList.remove('flipped') 
        
        firstCard.children[1].classList.add('has-matched') 
        secondCard.children[1].classList.add('has-matched') 


    }
    else{
            tries.innerHTML=parseInt(tries.innerHTML)+1;
            triesLeft.innerHTML=parseInt(triesLeft.innerHTML)-1;
         
            
            if(+triesLeft.innerHTML==0){
                cards.forEach((card,index)=>{
                    card.classList.remove('has-matched');
                    cards[index].children[1].classList.remove('has-matched');
                    shuffle(orderRange);
                    cards.forEach((card,index)=>{
                        card.style.order=orderRange[index];
                        
                    })
                })

                lost.style.display='block'
                for (let index = 0; index < tryAgain.length; index++) {
                    
                    tryAgain[index].addEventListener('click',function(){
                        triesLeft.innerHTML=12;
        
                        lost.style.display='none';
                        
                    })
                }
               
                    

            }
            if(tries.innerHTML)
            setTimeout(()=>{
                firstCard.classList.remove('flipped') 
                firstCard.children[1].classList.remove('flipped') 

                secondCard.classList.remove('flipped')
                secondCard.children[1].classList.remove('flipped') 

            },1200)
            //document.getElementById('fill').play()
            
    }

 }
 
start()

 function start() {

    cards.forEach(card=>{
        card.classList.add("flipped")
        card.children[1].classList.add("flipped")
    })
    setTimeout(()=>{
        cards.forEach(card=>{
            card.classList.remove("flipped")
            card.children[1].classList.remove("flipped")
        })
        setInterval(() => {
            t++;
            console.log(t)
            timer.innerText     =t;
            },1000)
            
    },2000)
    
   }