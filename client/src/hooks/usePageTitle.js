import { useEffect } from 'react';

/**
 * Updates the document title on every page.
 * @param {string} title - Page-level title (without brand suffix)
 */
const usePageTitle = (title) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title
      ? `${title} — Simple Restaurant`
      : 'Simple Restaurant — Premium Dining Experience';
    return () => { document.title = prev; };
  }, [title]);
};

export default usePageTitle;
