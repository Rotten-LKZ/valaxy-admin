import { defineStore } from 'pinia'
import { ref } from 'vue'
import sendRequest from '@/utils/request'

interface Article {
  title: string
  filename: string
  content: string
}

export const useArticleStore = defineStore('article', () => {
  const isInit = ref(false)
  const articles = ref([] as Article[])

  async function init() {
    if (!isInit.value) {
      isInit.value = true
      articles.value = await getArticle()
    }
  }

  async function getArticle(): Promise<Article[]> {
    const resp = sendRequest(await window.API.article.get())
    return resp.articles
  }

  async function addArticle(title: string, filename: string, content: string): Promise<boolean> {
    filename = `${filename}.md`
    await init()
    const resp = sendRequest(await window.API.article.add(title, filename, content))
    if (resp.status)
      articles.value.push({ title, filename, content })
    return resp.status
  }

  async function delArticle(filename: string): Promise<boolean> {
    await init()
    const resp = sendRequest(await window.API.article.del(filename))
    if (resp.status)
      articles.value = articles.value.filter(article => article.filename !== filename)
    return resp.status
  }

  async function updateArticle(title: string, filename: string, content: string): Promise<boolean> {
    filename = `${filename}.md`
    await init()
    const resp = sendRequest(await window.API.article.update(title, filename, content))
    if (resp.status)
      articles.value = articles.value.map(article => article.filename === filename ? { title, filename, content } : article)
    return resp.status
  }

  return { isInit, articles, init, getArticle, addArticle, delArticle, updateArticle }
})
