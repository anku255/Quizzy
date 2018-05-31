import katex from 'katex';
import tmModule from './markdown-it-texmath/texmath';
import mdModule from 'markdown-it';
const tm = tmModule.use(katex);
const md = mdModule().use(tm, { delimiters: 'dollars' });

export default text => ({
  __html: md.render(text)
});
