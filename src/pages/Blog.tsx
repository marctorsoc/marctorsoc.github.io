import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Post } from '../types/Post';
import { PostCard } from '../components/PostCard';
import { getAllPosts } from '../utils/markdownUtils';
import 'katex/dist/katex.min.css';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = ['Academia', 'AI', 'Coding','Maths', 'Off-topic', 'Work'];
const POSTS_PER_PAGE = 5;

// Add the same color mapping used in PostCard
const categoryColors: { [key: string]: string } = {
  'Off-topic': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'Academia': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Work': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Maths': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Coding': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  'AI': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'
};

const markdown = `
Welcome to my blog! Use the categories filter below to find posts that interest you.
`;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Initialize selected categories from URL parameter
  React.useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  // Initialize page from URL parameter
  React.useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  React.useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(fetchedPosts => {
        // Sort posts by date (newest first)
        const sortedPosts = fetchedPosts.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sortedPosts);
      })
      .catch(err => {
        console.error('Error loading posts:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPosts = React.useMemo(() => {
    if (selectedCategories.length === 0) return posts;
    return posts.filter(post => 
      post.categories.some(category => selectedCategories.includes(category))
    );
  }, [posts, selectedCategories]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      // Update URL parameters
      if (newCategories.length === 1) {
        setSearchParams({ category: newCategories[0] });
      } else if (newCategories.length === 0) {
        setSearchParams({});
      }
      
      return newCategories;
    });
  };

  const handlePageChange = (newPage: number) => {
    // Prevent default scroll to top behavior
    const currentPosition = window.scrollY;
    
    setCurrentPage(newPage);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', newPage.toString());
      return newParams;
    });

    // Restore scroll position after a short delay to ensure render is complete
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentPosition,
        behavior: 'instant'
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="prose dark:prose-invert max-w-none mb-8">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm, remarkMath]} 
            rehypePlugins={[rehypeRaw, rehypeKatex]}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {/* Categories filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                selectedCategories.includes(category)
                  ? categoryColors[category]
                  : 'bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
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

        {filteredPosts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-1">
              {paginatedPosts.map(post => (
                <PostCard key={post.permalink} post={post} showFullContent={false} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-8 h-8 rounded-full transition-colors ${
                        currentPage === i + 1
                          ? 'bg-gray-800 text-white dark:bg-white dark:text-black'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-600 dark:text-gray-400">
            No posts found for the selected categories.
          </div>
        )}
      </div>
    </div>
  );
}
