import FeedbackPage from './FeedbackPage';
import ChartsPage from './ChartsPage';
import SearchPage from './SearchPage';
import EmailsPage from './EmailsPage';
import ComplaintsPage from './ComplaintsPage';
import SignalsPage from './SignalsPage';
import ReferralsPage from './ReferralsPage';
import UsersPage from './UsersPage';

export interface Page {
  title: string
  path: string,
  element: JSX.Element
}

export const pagesMenuIndex: Page[] = [
  {
    title: 'Graphiques',
    path: '/graphs',
    element: <ChartsPage />
  },
  {
    title: 'Retours utilisateurs',
    path: '/feedbacks',
    element: <FeedbackPage />
  },
  {
    title: 'Plaintes',
    path: '/complaints',
    element: <ComplaintsPage />
  },
  {
    title: 'Recherche',
    path: '/search',
    element: <SearchPage />
  },
  {
    title: 'Newsletter',
    path: '/emails',
    element: <EmailsPage />
  },
  {
    title: 'Signalements',
    path: '/signals',
    element: <SignalsPage />
  },
  {
    title: 'Utilisateurs',
    path: '/users',
    element: <UsersPage />
  },
  {
    title: 'Parrainages',
    path: '/referrals',
    element: <ReferralsPage />
  }
];

