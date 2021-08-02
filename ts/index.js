import { makeImageDom, makeVideoDom } from './utils.js';

const mainDom = document.querySelector("main");
const modalXBtn = document.querySelector('.x-box');
const modalAddBtn = document.querySelector('.modal-add-btn');
const modalTitle = document.querySelector('#title');
const modalUrl = document.querySelector('#url');
const modalBodyLabel = document.querySelector('.modal-body-label');


let currentMode = 'IMAGE'; // IMAGE, VIDEO, NOTE, TASK

const buttonList = document.querySelector('.header-btns');
buttonList.addEventListener('click', (e) => {
  const type = e.target.dataset.type
  
  if(type) {
    currentMode = type;
    if(type === 'NOTE' || type ===  'TASK'){
      modalBodyLabel.innerText = 'Body'
    } else {
      modalBodyLabel.innerText = 'URL'
    }
    clickBtn();
  }
})

modalXBtn.children[0].addEventListener('click', closeModal);
modalAddBtn.addEventListener('click', () => modalAddBtnEvent(modalTitle, modalUrl, mainDom));


/** 특정 Article 추가 버튼 눌렀을 때 */
/** dom add */
function modalAddBtnEvent(modalTitle, modalUrl, mainDom) {
  const title = modalTitle.value;
  const value = modalUrl.value;
  
  const articleDom = document.createElement("article");
  articleDom.className = 'article';
  switch (currentMode) {
    case 'IMAGE':
      addLeftArticle(value, articleDom);
      addRightArticle(title, articleDom);
      break;
    case 'VIDEO':
      addLeftArticle(value, articleDom);
      addRightArticle(title, articleDom);
      break;
    case 'NOTE':
      addMainArticle(title, value, articleDom);
      break;
    case 'TASK':
      addMainArticle(title, value, articleDom);
      break;
  }

  mainDom.appendChild(articleDom)

  modalTitle.value = '';
  modalUrl.value = '';
  closeModal();
}


/** Image, Video Left추가 */
function addLeftArticle(url, articleDom) {
  const articleLeftDom = document.createElement("div");
  articleLeftDom.className = 'article-left';

  if(currentMode === 'IMAGE')
    makeImageDom(url, articleLeftDom);
  else if(currentMode === 'VIDEO')
    makeVideoDom(url, articleLeftDom);

  articleDom.appendChild(articleLeftDom);
}

/** Image, Video right Article */
function addRightArticle(title, articleDom) {
  const articleRight = document.createElement('div');
  articleRight.className = 'article-right';

  const articleBody = document.createElement('div');
  articleBody.className = 'article-body';
  
  articleBody.innerHTML = title !== '' ? title : 'default';
  articleRight.appendChild(articleBody);
  addXBtn(articleRight);

  articleDom.appendChild(articleRight);
}

/** Task나 Note  */
function addMainArticle(title, body, articleDom) {
  const articleMainDom = document.createElement('div');
  articleMainDom.className = 'article-main';

  if(currentMode === 'TASK') {
    articleMainDom.style.height = '140px';
  }

  addSubArticle(title, body, articleMainDom);
  articleDom.appendChild(articleMainDom);

  addXBtn(articleDom);
}

/** Task, Note SubArticle */
function addSubArticle(title, body, articleDom) {
  const titleDom = document.createElement('h3');
  titleDom.className = 'article-main-title';
  titleDom.innerText = title;
  articleDom.appendChild(titleDom);

  const bodyDom = document.createElement('p');
  if(currentMode === 'NOTE') {
    bodyDom.className = 'article-main-body';
    bodyDom.innerText = body;
  }
  else if(currentMode === 'TASK'){
    bodyDom.className = 'article-main-task'
    bodyDom.innerText = '■ ' + body;
  }
  articleDom.appendChild(bodyDom);
}

/** X: 삭제 Button 추가하기 */
function addXBtn(parentElement) {
  const articleCloseBtn = document.createElement('div');
  articleCloseBtn.className = 'article-close-btn';

  const closeBtn = document.createElement('h1');
  closeBtn.className = 'article-close-btn-text'
  closeBtn.innerText = 'X';
  closeBtn.dataset.type = currentMode;
  closeBtn.addEventListener('click', deleteCurrentArticle);
  articleCloseBtn.appendChild(closeBtn);

  parentElement.appendChild(articleCloseBtn);
}

/** select modal */
const modalContainerDom = document.querySelector(".modal-container");
function clickBtn() {
  modalContainerDom.style.display = 'flex';
}

function closeModal() {
  modalContainerDom.style.display = 'none';
}

/** 현재 클릭한 article 지우기 */
function deleteCurrentArticle(e) {
  let article;
  if(e.target.dataset.type === 'IMAGE' || e.target.dataset.type === 'VIDEO')
    article = e.target.parentElement.parentElement.parentElement;
  else {
    article = e.target.parentElement.parentElement;
  }
  mainDom.removeChild(article)
}

/** ESC로 모달창 닫기 */
window.addEventListener('keydown', e => {
  if(e.key === 'Escape') {
    modalTitle.value = '';
    modalUrl.value = '';
    closeModal();
  }
})