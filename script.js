let opacity = false;
let rainbow = true;
let color;


function randomRange(min, max){
    randomNumber = Math.floor(Math.random() * (max - min)) + min;
    return randomNumber;
}

function numberColumns(size){
    let numberOfColumns = '';
    for(let i = 0; i < size; i++){
        numberOfColumns += '1fr ';
    }
    return numberOfColumns;
}

function resetOptions(){
    opacity = false;
    rainbow = false;
    color = undefined;
}

function removeGrid(){
    let blocks = document.querySelectorAll('.grid');
    let box = document.querySelector('.box');
    for(let i = 0; i < blocks.length; i++){
        box.removeChild(blocks[i]);
    }
}

function resetGrid(){
    let blocks = Array.from(document.querySelectorAll('.grid'));
    blocks.forEach(block =>{
        block.style.removeProperty('opacity');
        block.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        block.classList.remove('opacity');
    })
}

function getColor(block){
    if(rainbow){
        block.classList.remove('opacity');
        block.style.removeProperty('opacity');
        let redValue = randomRange(0, 255);
        let greenValue = randomRange(0, 255);
        let blueValue = randomRange(0, 255);
        return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    }
    if(opacity){
        let classList = block.classList;
        for(let i = 0; i < classList.length; i++){
            if(block.style.opacity >= 1){
                return;
            }
            if (classList[i] === 'opacity'){
                let value = +block.style.opacity;
                value += 0.2;
                block.style.opacity = value;
            }
            else{
                block.classList.add('opacity');
            }
        }
        return 'rgb(0, 0, 0)';
    }
    if(color){
        block.classList.remove('opacity');
        block.style.removeProperty('opacity');
        return color;
    }
}

function makeGrid(size, box){
    for(let i = 0; i < size * size; i++){
        let a = document.createElement('div');
        a.className = 'grid';
        a.addEventListener('mouseover',()=>{
            a.style.backgroundColor = getColor(a);
        })
        box.appendChild(a);
    }
}

function main(){
    let box = document.querySelector('div');
    let slider = document.getElementById('slider');
    let size = document.getElementById('value');
    let reset = document.querySelector('#reset');

    reset.addEventListener('click', resetGrid);
    size.textContent = slider.value;
    box.style.gridTemplateColumns = numberColumns(16);
    makeGrid(16, box);
    slider.oninput = ()=> {
        size.textContent = slider.value;
        box.style.gridTemplateColumns = numberColumns(size.textContent);
        removeGrid();
        makeGrid(size.textContent, box);
    }
}


document.querySelector('#opacity').addEventListener('click', ()=>{
    resetOptions();
    opacity = true;
});
document.querySelector('#rainbow').addEventListener('click', ()=>{
    resetOptions();
    rainbow = true;
});
document.querySelector('#pick').oninput = ()=> {
    resetOptions();
    color = document.querySelector('#pick').value;
}

main();