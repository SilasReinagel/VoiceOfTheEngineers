import Home from './Pages/Home.svelte';
import Vision from './Pages/Vision.svelte';
import Theme from './Themes/brand-theme-carvana';

const DefaultPage = Home;
export const pages = [
  { path: '/', href: '/', name: 'Home', component: DefaultPage, showInMainNav: true },
  { path: '/vision', href: '/vision', name: 'Vision', component: Vision, showInMainNav: true }
];

const hasCompanyName = !!Theme.companyName && Theme.companyName.length > 0;
const siteName = hasCompanyName 
  ? `Voice of ${Theme.companyName}'s ${Theme.groupName}` 
  : `Voice of the ${Theme.groupName}`;
const owner = hasCompanyName ? Theme.companyName : 'Voice of the Engineers';
const site = ({
    name: siteName,
    owner: owner,
    slogan: 'We are great at business!',
    logo: Theme.logo,
    logoMobile: Theme.logo,
    backgroundInlineStyle: Theme.backgroundInlineStyle
  });

export const commentsEnabled = false;

export default site;