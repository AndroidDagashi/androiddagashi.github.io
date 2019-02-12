import MarkdownIt from "markdown-it";

export default (_, inject) => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  const defualtRenderer =
    md.renderer.rules.link_open ||
    ((tokens, idx, options, _env, self) => {
      return self.renderToken(tokens, idx, options);
    });

  // eslint-disable-next-line @typescript-eslint/camelcase
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]);
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank";
    }

    return defualtRenderer(tokens, idx, options, env, self);
  };

  inject("md", md);
};
