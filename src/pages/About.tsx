import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ProfileSidebar from '../components/ProfileSidebar';
import HeroImage from '../components/HeroImage';

const markdown = `
Beyond a PhD and work, *a man has many faces*. Here some curious facts about me:

- I was born in Barcelona and, like many Catalans, I'm a big fan of FC Barcelona - 
we call it "Barça." Fun fact: the city is "Barna" for us locals. Oh, and please 
don't refer to "Real Madrid" as "Real"; for us, it's simply "Madrid.

- As you might have noticed, I identify as Catalan and I am a big proponent of 
the Catalan language. I also believe we would be better off
as an independent country. But I also think that the base case scenario would be 
Europe as a federation of regions, with a strong European Union.
And I support the Spanish National football team. Yeah, we all have contradictions.

- Speaking of contradictions, I adopted a vegan diet back in 2014. Over
the years, it has evolved into something more flexitarian, if you want to assign me a label. 
I avoid meat entirely, but I might consume fish or dairy products every now and then, especially 
in social settings, to avoid being difficult.

- For over 10 years, I was part of a Scouts organization. First as a kid, then as a monitor.
It was a truly transformative experience that shaped my values, and I cannot recommend it enough.

- In 2017, after a 5 years degree and 4 years of PhD, all in Barcelona, I decided to move abroad 
to the UK for work. It was a one-way journey, not knowing when, or if I would return. 
I was even close to moving, though it finally did not happen. After 5 years abroad, I returned to
Barcelona as a choice, but cannot recommend enough the experience of living abroad. 
`;

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <HeroImage src="/content/offtopic2.jpg" />
      
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
          
          <div className="w-full">
            <ProfileSidebar/>
          </div>
      </div>
  );
}