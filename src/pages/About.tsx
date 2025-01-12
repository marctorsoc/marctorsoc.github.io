import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ProfileSidebar from '../components/ProfileSidebar';
import HeroImage from '../components/HeroImage';

const markdown = `
Please find some resources to know more about my PhD:

  * [PhD Thesis](/content/marcPhd.pdf)
  * [PhD Thesis poster](/content/poster_tesi.pdf)

and you might find some other profiles by clicking on the icons on the rigth hand side.

Some open source projects I have collaborated in:

  * [globality-black](https://github.com/globality-corp/globality-black): 
  creator and former maintainer.
  [Presentation](https://docs.google.com/presentation/d/1Lp0jLSI5YJYOXEntxSvaHeOALAlndlgu/edit?usp=sharing&ouid=102083878154902570127&rtpof=true&sd=true)
  * [hyperopt](https://github.com/hyperopt/hyperopt/): former co-maintainer
  * [scikit-learn](https://github.com/scikit-learn/scikit-learn): 
  [12613](https://github.com/scikit-learn/scikit-learn/pull/12613),
  [14900](https://github.com/scikit-learn/scikit-learn/pull/14900)


And last, but not least, [LinguaQuest](https://play.google.com/store/apps/details?id=com.marc.torsoc.linguaquest), 
  a language learning app I developed and published to Google Play.
`;

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <HeroImage src="/content/llac.jpg" />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className="md:w-1/3 flex flex-col justify-center">
            <ProfileSidebar/>
          </div>
        </div>
      </div>
    </div>
  );
} 