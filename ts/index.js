const mainDom = document.querySelector("main");
const modalContainerDom = document.querySelector(".modal-container");
const imageBtn = document.querySelector(".image-btn");
const modalXBtn = document.querySelector('.x-box');
const modalAddBtn = document.querySelector('.modal-add-btn');
const modalTitle = document.querySelector('#title');
const modalBody = document.querySelector('#body');
console.log(modalBody);
imageBtn.addEventListener("click", clickImageBtn)
modalXBtn.addEventListener('click', closeModal);
modalAddBtn.addEventListener('click', addImageEvet);
modalBody.addEventListener('keyup', (e) => {
  console.log(e.target.value);
})


function addImageEvet() {
  const articleDom = document.createElement("article");
  const articleDomStyle = {
    display: 'flex',
  
    width: '650px',
    height: '200px',
  
    margin: '5px 0',
    
  
    border: 'none',
    'border-radius': '1px',
    'box-shadow': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  }
  
  const articleLeftDom = document.createElement("div");
  const articleLeftDomStyle = {
    width: '350px',
    height: '200px',
  }
  const imgDom = document.createElement('img');
  const imgDomStyle = {
    width: '100%',
    height: '100%',
  
    'object-fit': 'cover',
  }
  imgDom.src = "https://i.picsum.photos/id/280/700/400.jpg?hmac=nHWc6v-sI6HlGXANdRAktZ16ris00u0EN_oL0MOEAG0";
  addStyle(imgDom, imgDomStyle);
  articleLeftDom.appendChild(imgDom);
  
  addStyle(articleLeftDom, articleLeftDomStyle);
  articleDom.appendChild(articleLeftDom);
  
  const articleRight = document.createElement('div');
  const articleRightStyle = {
    display: 'flex',  
    width: '300px',
    height: '200px',
  }
  const articleBody = document.createElement('div');
  const articleBodyStyle = {
    width: '274px',
  }
  articleBody.innerHTML = 'Image'
  articleBody.style.color = '#ffe498';
  
  addStyle(articleBody, articleBodyStyle);
  articleRight.appendChild(articleBody);
  
  const articleCloseBtn = document.createElement('div');
  const articleCloseBtnStyle = {
    width: '24px',
    display: 'flex',
    'align-items': 'center',
    cursor: 'pointer',
  }
  const closeBtn = document.createElement('h1');
  closeBtn.innerHTML = 'X';
  closeBtn.style.color = 'red';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.addEventListener('click', deleteCurrentArticle)
  articleCloseBtn.appendChild(closeBtn);

  addStyle(articleCloseBtn, articleCloseBtnStyle);

  articleRight.appendChild(articleCloseBtn)
  
  addStyle(articleRight, articleRightStyle);
  articleDom.appendChild(articleRight);
  
  addStyle(articleDom, articleDomStyle);
  mainDom.appendChild(articleDom)
  
  closeModal();
}

function clickImageBtn() {
  modalContainerDom.style.display = 'flex';
}

function closeModal() {
  modalContainerDom.style.display = 'none';
}

function deleteCurrentArticle(e) {
  const article = e.target.parentElement.parentElement.parentElement;
  mainDom.removeChild(article)
}




function addStyle(dom, styleObj) {
  for(let st in styleObj){
    dom.style[st] = styleObj[st];
  }
}