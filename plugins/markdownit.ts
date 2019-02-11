import MarkdownIt from 'markdown-it';

export default (ctx, inject) => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  let defualtRenderer = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  // eslint-disable-next-line @typescript-eslint/camelcase
  md.renderer.rules.link_open = function (tokens, idx, options, env, self){
    let aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']);
    } else {
      tokens[idx].attrs[aIndex][1] = '_blank';
    }

    return defualtRenderer(tokens, idx, options, env, self);
  };

  inject('md', md);
};
