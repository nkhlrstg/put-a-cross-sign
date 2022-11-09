document.querySelector("html").style.height = document.documentElement.clientHeight + "px";

let h2 = document.querySelector('h2');
let aElem = document.querySelectorAll('a');
let span1 = document.querySelector('#span1');
let span2 = document.querySelector('#span2');
let span3 = document.querySelector('#span3');
let span4 = document.querySelector('#span4');
let circle = document.querySelectorAll('.circle');
let startBtn = document.querySelector('#start');
let imageContainer = document.querySelector('#image-container');
let wrongAudio = document.querySelector('#wrongAudio');
let rightAudio = document.querySelector('#rightAudio');
let qHeadAudio = document.querySelector('#qHeadAudio');


document.addEventListener('DOMContentLoaded', ()=>{

})  



h2.style.display = 'none';
imageContainer.style.display = 'none';
document.body.style.background = '#fff';
startBtn.addEventListener('click', ()=>{
  qHeadAudio.play();
  h2.style.display = 'block';
  imageContainer.style.display = 'flex';
  document.body.style.background = '#7fffd4';

  startBtn.style.display = 'none';
  document.querySelector('#image-container').style.height = document.documentElement.clientHeight  - document.querySelector("h2").clientHeight - 30 + "px";

})

window.onresize = () => {
  window.location.reload();
}

function vibration(duration = 200) {
  if (navigator) {
    navigator.vibrate(duration);
  }
}


fetch('data.json')
.then((response)=>{
    return response.json();
})
.then((data)=>{
  h2.textContent = data[0].heading_text;
  h2.style.backgroundColor = data[0].heading_bgColor;
  h2.style.color = data[0].heading_txtColor;
  span1.style.backgroundImage = `url('./assets/img/${data[1].question_image}')`;
  span2.style.backgroundImage = `url('./assets/img/${data[2].question_image}')`;
  span3.style.backgroundImage = `url('./assets/img/${data[3].question_image}')`;
  span4.style.backgroundImage = `url('./assets/img/${data[4].question_image}')`;
  for(i = 1; i < (data.length-1); i++){
    aElem[i - 1].classList.add(data[i].is_correct);
  }

  qHeadAudio.addEventListener('ended', ()=>{
    aElem.forEach((a)=>{
      a.addEventListener('click', ()=>{
        let circle_img = document.querySelector(`#${a.id} .circle-image`);
        if(a.className === 'yes'){
          rightAudio.play();
          circle_img.style.transform = 'scale(1)';
        }
        else{
          wrongAudio.play();
        }
      })
    })
  })



})


