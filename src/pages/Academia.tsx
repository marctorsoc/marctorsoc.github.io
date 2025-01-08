import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Post } from '../types/Post';
import { PostCard } from '../components/PostCard';
import { getAllPosts } from '../utils/markdownUtils';
import HeroImage from '../components/HeroImage';

const markdown = `
<p style="text-align: justify;">
I developed a PhD in Wireless Communications during four years 
(2011-2015). Prior to that, while finishing my M.Sc 
(2006-2011), I became an intern (2009-2011) at the 
Signal Theory and Communications (TSC)
<a href="https://spcom.upc.edu/">group</a> 
of the Universitat Politècnica de Catalunya (UPC), 
in Barcelona.
</p>
  
<div style="text-align: justify;">
All papers produced during and after my PhD, as well as my
 thesis, can be found my Google Scholar page (see below), 
 with most of them also available at <a href="https://arxiv.org/">arXiv</a>.
</div>

Journal papers:

- M. Torrellas, A. Agustin de Dios, J. Vidal and O. Muñoz Medina, *"The DoF of the 3user MIMO Interference Channel"*, IEEE Transactions on Communications, September 2014. <a href="https://arxiv.org/pdf/1407.8359">PDF</a>.
- M. Torrellas, A. Agustin de Dios and J. Vidal, *"Achievable DoF-delay Trade-offs for the K-user MIMO Interference channel with delayed CSIT"*, IEEE Transactions on Information Theory, October 2016. <a href="https://arxiv.org/pdf/1504.05498">PDF</a>.
- M. Torrellas, A. Agustin de Dios, J. Vidal, *"On the Degrees of Freedom of the MISO Interference Broadcast Channel with Delayed CSIT"*, submitted to Transactions on Information Theory, November 2019. <a href="https://arxiv.org/pdf/1403.7012">PDF</a>

Other resources:
* [PhD Thesis](/content/marcPhd.pdf)
* [Poster PhD Thesis](/content/poster_tesi.pdf)
* [Google Scholar](https://scholar.google.es/citations?user=__4XCdYAAAAJ)
`;

export default function Academia() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(fetchedPosts => {
        const academicPosts = fetchedPosts.filter(post => 
          post.categories.includes('Academia')
        );
        setPosts(academicPosts);
      })
      .catch(err => {
        console.error('Error loading posts:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <HeroImage src="/content/academia.png" />
      
      <div className="max-w-4xl mx-auto pt-8">
        <div className="prose dark:prose-invert max-w-none mb-12">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {loading && (
          <div className="text-gray-600 dark:text-gray-400 mb-4">
            Loading posts...
          </div>
        )}

        {error && (
          <div className="text-red-600 dark:text-red-400 mb-4">
            Error loading posts: {error}
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-1">
            {posts.map(post => (
              <PostCard key={post.permalink} post={post} showFullContent={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 