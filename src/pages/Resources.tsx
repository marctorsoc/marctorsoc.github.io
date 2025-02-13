import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import HeroImage from '../components/HeroImage';

const markdown = `
In this section, you'll find various resources that I've collected and created over time. These include study materials, notes, and useful links for different topics.

### Technical Resources

* <a href="https://docs.google.com/presentation/d/1abzvRA6VQyMPIfuLVh43QgDdgH-7XgnfE7v73kxNYWw/edit?usp=sharing">Machine Learning</a>
* <a href="https://docs.google.com/presentation/d/14B0zzok1l1Zl-lUTigtAKubvBdVwBQfxhh1XWADHCRo/edit?usp=sharing">NLP</a>
* <a href="https://docs.google.com/presentation/d/1EhUGzJlXeU0T1RZiDByrt9szTwanSFvTtFziHTyVFCk/edit?usp=sharing">Algorithms and coding</a>
* <a href="https://docs.google.com/presentation/d/1ugNBNu3AcacuTo5aGWleNnYK5JqrubO_AUpDDRh-yWM/edit?usp=sharing">Maths</a>
* <a href="https://docs.google.com/document/d/1_2iLYl4Jt9O4WU-AqZ4jYWluYUWTDx74kZfajKt6-_M/edit">SQL</a>

These notes do not pretend to be exhaustive and are continuously updated as I discover new concepts or better ways to explain them.

### Language Learning Resources

* [LinguaQuest](https://play.google.com/store/apps/details?id=com.marc.torsoc.linguaquest) - My app to help learning Lithuanian and other languages
* [Lithuanian Notes](https://docs.google.com/document/d/10_oMegG_znrgvay_M33PTWF6XIIypNG_Tji44IWA2eo/edit#heading=h.1nihs4t9nrtp)
* [Lithuanian Flash Cards](https://www.brainscape.com/p/3P84P-LH-AAWC6)
* [Cooljugator](https://cooljugator.com/lt) - Useful conjugation tool for many languages
`;

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <HeroImage src="/content/divulgation.png" />
      
      <div className="max-w-4xl mx-auto pt-8">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
