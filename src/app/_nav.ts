import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [
  {
    name: 'Liste des sujets',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Ajouter un sujet',
    url: '/subjectForm',
    icon: 'icon-plus'
  },
  {
    name: 'Profil',
    url: '/userProfile',
    icon: 'icon-user'
  },
  {
    name: 'Liste des utilisateurs',
    url: '/listusers',
    icon: 'icon-people'
  },
  {
    name: 'Candidatures',
    url: '/collabdashboard',
    icon: 'icon-pie-chart'
  }
];
