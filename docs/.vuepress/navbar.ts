import { defineNavbarConfig } from 'vuepress-theme-plume'


export const navbar = defineNavbarConfig([
  { text: '首页', link: '/',icon: 'material-symbols:home-outline' },
  { text: '博客', link: '/blog/', icon: 'material-symbols:article-outline' },
  { text: '标签', link: '/blog/tags/', icon: 'material-symbols:label-outline' },
  { text: '归档', link: '/blog/archives/', icon: 'material-symbols:archive-outline' },
  { text: '分类', link: '/blog/categories/', icon: 'material-symbols:label-outline' },
  { text: '项目', link: '/notes/项目/xiang.md', icon: 'material-symbols:code-outline' },
  {
    text: '前段笔记',
    items: [
      {
        text: '前端基础',
       
        items: [
          { text: 'HTML', link: '/notes/HTML+CSS/html.md' },
          { text: 'CSS', link: '/notes/HTML+CSS/css.md' },
          { text: 'JS基础', link: '/notes/JS/js基础.md'},
          { text: 'JS进阶', link: '/notes/JS/js进阶.md'},
          { text: 'JS高级', link: '/notes/JS/js高级.md'},
        ],
       },
      { text: 'Ajax', link: '/notes/AJAX/axios.md' },
      { text: 'Vue', link: '/notes/Vue/Vue2_3.md' },
      { text: 'TypeScript', link: '/notes/TypeScript/ts基础.md' },
      { text: 'Git', link: '/notes/Git/git.md' },
      { text: 'NodeJS基础', link: '/notes/NodeJS/node.md' },
      { text: 'React', 
        items: [
          { text: 'React基础', link: '/notes/React/react基础.md' },
          { text: 'React进阶', link: '/notes/React/react进阶.md' },
          { text: 'React高级', link: '/notes/React/react高阶.md' },
        ],
      },
      
    ],
    icon: 'material-symbols:note-add-outline',
  },
])
