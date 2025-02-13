import katex from 'katex';
import 'katex/dist/katex.min.css';

function Math({ children, inline = false }: { children: string, inline?: boolean }) {
  let html = '';
  try {
    html = katex.renderToString(children, {
      displayMode: !inline,
      throwOnError: false,
      trust: true,
      strict: false,
      fleqn: false,
      output: 'html',
      maxSize: 10,
      maxExpand: 1000,
      globalGroup: true,
      macros: {
        "\\RR": "\\mathbb{R}",
        "\\NN": "\\mathbb{N}",
        "\\ZZ": "\\mathbb{Z}"
      }
    });
  } catch (error) {
    console.error('KaTeX render error:', error, 'Input LaTeX:', children);
    html = `<span class="katex-error" style="color: #cc0000;">${children}</span>`;
  }

  return inline ? (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  ) : (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="katex-display"
      style={{
        margin: '0 auto',
        textAlign: 'center',
        overflowX: 'auto',
        maxWidth: '100%',
      }}
    />
  );
}

export default Math;
