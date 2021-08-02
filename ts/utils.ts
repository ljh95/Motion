/** Image 가져오기 */
export async function makeImageDom(url, articleLeftDom) {
  const imgDom = document.createElement('img');
  imgDom.className = 'article-img';

  try {
    if(url === '') {
      const res = await fetch('https://picsum.photos/700/400');
  
      if(res.ok){
        imgDom.src = res.url;
    }
    } else {
      imgDom.src = url;
    }
  } catch (error) {
    return new Error(`fetch Image error!: ${error}`)
  }
  articleLeftDom.appendChild(imgDom);
}

/** Video 가져오기 */
export async function makeVideoDom(url, articleLeftDom) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=${url}&format=json`);
    const iframeUrl = await res.json();
    articleLeftDom.innerHTML = iframeUrl.html.replace("200", '350').replace("113", "200");
  } catch (error) {
    return new Error(`fetch Video error!: ${error}`)
  }
}