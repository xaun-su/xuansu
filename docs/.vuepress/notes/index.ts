import { defineNotesConfig } from 'vuepress-theme-plume'
import html from './html.ts'
import ajax from './ajax.ts'
import vue from './vue.ts'
import react from './React.ts'
import node from './NodeJS.ts'
import typescript from './TypeScript.ts'
import git from './git.ts'

export default defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/notes/',
  link: '/',
  // 在这里添加 note 配置
  notes: [ 
    html,
    ajax,
    vue,
    react,
    node,
    typescript,
    git
  ]
})