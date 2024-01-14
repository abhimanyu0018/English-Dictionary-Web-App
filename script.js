const input = document.querySelector('#input');



//event on search 

document.querySelector('#search-btn').
addEventListener('click',()=>{
    console.log(input.value)
    if(input.value == ''){
        let p = document.createElement('p');
        p.textContent = `Enter a valid word`;
        document.querySelector('.details').innerHTML = ``;
        document.querySelector('.details').style.display = "block";
        document.querySelector('.details').appendChild(p)
    }
    else{
        fetchApi(input.value);
    }

    
})

function fetchApi(word){
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url).then(
        response => response.json()
    ).then(
        result => data(result,word)
    ).catch(
        ()=>{
            console.log("not found")
            const p = document.createElement('p');
            
            p.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`
            
            document.querySelector('.error').classList.remove('hidden');
            

            document.querySelector('.details').classList.add('hidden');
            document.querySelector('.error').appendChild(p)
            
        }
    );

}

function data(result,word){

    const wordPhonetic =  result[0].phonetic;
    const wordDefinition = result[0].meanings[0].definitions[0].definition;
    let wordExample;
    

    if(result[0].meanings[0].definitions[0].example){
        wordExample = result[0].meanings[0].definitions[0].example;
    } else
    {
        // console.log('example is not found')
        wordExample = "example is not found";
    }

    printOnWed(word,wordPhonetic,wordDefinition,wordExample)
}

function printOnWed(word,wordPhonetic,wordDefinition,wordExample){  
    
    // const meaningTag = document.createElement('p')
    // const exampleTag = document.createElement('p')
    document.querySelector('.details').classList.remove('hidden')

    document.querySelector('.error').classList.add('hidden')

    //word appending in h2 
    document.querySelector('.word').textContent = word;

    document.querySelector('.vocal').textContent = wordPhonetic;
    
    // meaningTag.textContent = wordDefinition;
    document.querySelector('.meaning').textContent = wordDefinition;

    // exampleTag.textContent= wordExample;
    document.querySelector('.example').textContent = wordExample;




}
