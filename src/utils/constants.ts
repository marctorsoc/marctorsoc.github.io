export const POSTS_PER_PAGE = 5;

export const categoryColors: { [key: string]: string } = {
  'Off-topic': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'Academia': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Work': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Maths': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'Dev tools': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', 
  'Coding puzzles': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', 
  'AI': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300'
};

export const CATEGORIES = Object.keys(categoryColors); 
