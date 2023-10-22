import { LuLayoutDashboard } from 'react-icons/lu'

export default [
  {
    name: 'Overview',
    url: '/',
    icon: LuLayoutDashboard,
  },
  {
    name: 'User Management',
    icon: LuLayoutDashboard,
    subMenu: [
      {
        name: 'Users',
        url: '/users',
        icon: LuLayoutDashboard
      },
      {
        name: 'Roles',
        url: '/users/roles',
        icon: LuLayoutDashboard
      }
    ]
  },
  {
    name: 'Store Management',
    icon: LuLayoutDashboard,
    subMenu: [
      {
        name: 'Outlets',
        url: '/outlets',
        icon: ''
      }, 
      {
        name: 'Products',
        url: '/products',
        icon: ''
      }, 
      {
        name: 'Categories',
        url: '/categories',
        icon: ''
      }, 
      {
        name: 'Sub Categories',
        url: '/sub-categories'
      }
    ]
  },
  {
    name: 'Activity Logs',
    icon: LuLayoutDashboard,
    subMenu: [
      {
        name: 'User Activity',
        url: '/logs/user-activituy',
        icon: ''
      },
      {
        name: 'Product Activities',
        url: '/logs/product-activities'
      }
    ]
  }
]